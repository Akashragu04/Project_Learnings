package com.intelizign.dmgcc.controllers.othermaster;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.intelizign.dmgcc.authendication.AzureUserInfo;
import com.intelizign.dmgcc.authendication.UserDetailsImpl;
import com.intelizign.dmgcc.models.ProjectModel;
import com.intelizign.dmgcc.models.SLAModel;
import com.intelizign.dmgcc.models.othermaster.SLAAccurals;
import com.intelizign.dmgcc.repositories.ProjectRepository;
import com.intelizign.dmgcc.repositories.SLAPreInvoiceRepository;
import com.intelizign.dmgcc.repositories.SLARepository;
import com.intelizign.dmgcc.response.AccuralsResponse;
import com.intelizign.dmgcc.response.AccuralsResponse.SLADatas;
import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.services.othermaster.AccuralsService;

@RestController
@RequestMapping("/accurals")
public class AccurualsController {
	@Autowired
	ProjectRepository projectRepository;

	@Autowired
	private AccuralsService accuralsService;

	@Autowired
	SLARepository slarepository;

	@Autowired
	AccuralsService accuralService;

	@Autowired
	SLAPreInvoiceRepository slaPreinvoiceRepository;

	@Autowired
	private AzureUserInfo azureUserInfo;

	public final Logger LOGGER = LogManager.getLogger(AccurualsController.class);

	@GetMapping("")
	public ResponseEntity<Object> getProjectAccurals(@RequestParam String Searchkeyword,
			@PageableDefault(size = 10, page = 0, sort = "id", direction = Direction.DESC) Pageable pageable,
			Authentication authentication) {

		try {
			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);
			List<ProjectModel> allprojectsList = new ArrayList<>();
			switch (userDetails.getRolename()) {
			case "FINANCE":
				allprojectsList = projectRepository.findAll(Searchkeyword);
				break;
			case "BUSINESS":
				allprojectsList = projectRepository.findAllByBusiness(Searchkeyword, userDetails.getShortid());
				break;
			default:
				LOGGER.error("User doesn't have the access ");
				return ResponseHandler.generateResponse("User doesn't have the access", true, HttpStatus.OK, null);

			}

			if (allprojectsList.isEmpty()) {
				return ResponseHandler.generateResponse("No Projects Found", false, HttpStatus.OK, null);
			}
			List<AccuralsResponse> all_accurals_data = accuralsService.getAccuralsDetails(allprojectsList);
			Page<AccuralsResponse> all_accurals_response = accuralsService.createPageFromList(all_accurals_data,
					pageable);

			return ResponseHandler.generateResponse("List of Accurals ", true, HttpStatus.OK, all_accurals_response);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get all projects: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					e.getStackTrace());
		}

	}

	@GetMapping("/getslabyproject/{project_id}")
	public ResponseEntity<Object> FindSLAEstimation(@PathVariable Long project_id) {
		try {
			return projectRepository.findById(project_id).map(project_data -> {
				List<SLADatas> sla_accurals = accuralsService.getSLADatsByProject(project_data);
				return ResponseHandler.generateResponse("List of SLA Details", true, HttpStatus.OK, sla_accurals);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: " + project_id + " Project ID Doesn't exist");
				return ResponseHandler.generateResponse(project_id + " Project ID Doesn't exist", false, HttpStatus.OK,
						null);
			});

		} catch (Exception e) {
			LOGGER.error("Exceptions happen!:Project ID " + project_id + " Doesn't exist DB Error: " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@GetMapping("/slaaccurals/{project_id}")
	public ResponseEntity<Object> getSlaAccurals(@PathVariable Long project_id) {
		try {
			return projectRepository.findById(project_id).map(project_data -> {
				List<SLAModel> sla_datas = slarepository.findByProject(project_id);
				List<SLAAccurals> sla_accurals = new ArrayList<>();

				if (sla_datas == null || sla_datas.isEmpty()) {
					return ResponseHandler.generateResponse("There is no SLA", false, HttpStatus.OK, null);
				}

				else {
					for (SLAModel sla : sla_datas) {
						SLAAccurals sla_accural;
						try {
							// get current preinvoice months by start and end date
							List<String> list_of_preinvoice_months = accuralService
									.getCurrentPreinvoiceMonthsByDate(sla);

							if (list_of_preinvoice_months == null || list_of_preinvoice_months.isEmpty()) {
								return ResponseHandler.generateResponse("SLA is not approved yet ", false,
										HttpStatus.OK, null);
							}

							else {
								sla_accural = accuralService.getAccuralsDetailsForSLA(sla, list_of_preinvoice_months);
								sla_accurals.add(sla_accural);
							}
						} catch (ParseException e) {
							e.printStackTrace();
						}
					}
					return ResponseHandler.generateResponse("List of SLA Accurals", true, HttpStatus.OK, sla_accurals);
				}
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: " + project_id + " Project ID Doesn't exist");
				return ResponseHandler.generateResponse(project_id + " Project ID Doesn't exist", false, HttpStatus.OK,
						null);
			});

		} catch (Exception e) {
			LOGGER.error("Exceptions happen!:Project ID " + project_id + " Doesn't exist DB Error: " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, e.getStackTrace());
		}

	}

	@PutMapping("/update")
	public ResponseEntity<Object> updateSLAAccurals(@RequestBody List<SLAAccurals> request_data) {
		try {
			List<SLAAccurals> all_saved_accurals = new ArrayList<>();

			request_data.stream().forEach(accural -> {
				SLAAccurals save_accuralsdata = accuralService.saveSLAAccurals(accural);
				all_saved_accurals.add(save_accuralsdata);
			});

			return ResponseHandler.generateResponse("Accurals Updated Successfully", true, HttpStatus.OK,
					all_saved_accurals);

		} catch (Exception e) {
			LOGGER.error("Exceptions happen!: While saving accurals data " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@GetMapping("accuralsexport")
	public ResponseEntity<Object> downloadaccuralsreport() {
		try {
			String file = accuralService.slaaccuralsExport();
			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + "sla_accurals_data.xlsx")
					.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
		}

		catch (Exception e) {
			LOGGER.error("Internal Server Error while downloading accurals report: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

}

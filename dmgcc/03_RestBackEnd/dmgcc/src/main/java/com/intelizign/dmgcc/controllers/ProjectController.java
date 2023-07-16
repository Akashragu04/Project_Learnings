package com.intelizign.dmgcc.controllers;

import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.intelizign.dmgcc.authendication.AzureUserInfo;
import com.intelizign.dmgcc.authendication.UserDetailsImpl;
import com.intelizign.dmgcc.models.ProjectModel;
import com.intelizign.dmgcc.models.SLAModel;
import com.intelizign.dmgcc.repositories.ProjectRepository;
import com.intelizign.dmgcc.repositories.SLAInvoiceRepository;
import com.intelizign.dmgcc.repositories.SLAPreInvoiceRepository;
import com.intelizign.dmgcc.repositories.SLARepository;
import com.intelizign.dmgcc.response.ProjectOverveiw;
import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.services.ProjectOverviewService;
import com.intelizign.dmgcc.services.ResourceReportService;

@RestController
@RequestMapping("/project")
public class ProjectController {

	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private SLARepository slaestimationrepo;

	@Autowired
	private SLAPreInvoiceRepository slaPreInvoiceRepository;

	@Autowired
	private SLAInvoiceRepository slaInvoiceRepository;

	@Autowired
	private ResourceReportService resourceReportService;

	@Autowired
	private ProjectOverviewService projectOverviewService;

	@Autowired
	private AzureUserInfo azureUserInfo;

	public final Logger LOGGER = LogManager.getLogger(ProjectController.class);

	private static final DecimalFormat doubleFormat = new DecimalFormat("0.00");

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public Map<String, String> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
		Map<String, String> errors = new HashMap<>();
		ex.getBindingResult().getFieldErrors()
				.forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
		return errors;
	}

	@GetMapping("/getprojectoverview/{project_id}")
	public ResponseEntity<Object> GetProjectOverview(@PathVariable(value = "project_id") Long project_id,
			@PageableDefault(size = 10, page = 0, sort = "id", direction = Direction.DESC) Pageable pageable) {
		try {
			return projectRepository.findById(project_id).map(projectData -> {
				Page<SLAModel> sladata = slaestimationrepo.findAllSLAbyProject(projectData, pageable);

				for (SLAModel sla : sladata) {
					Long preinvoice_value = slaPreInvoiceRepository.getTotalPreinvoiceValues(sla);
					if (preinvoice_value == null) {
						preinvoice_value = (long) 0;
					}
					Long invoice_value = slaInvoiceRepository.getTotalInvoiceValues(sla);
					if (invoice_value == null) {
						invoice_value = (long) 0;
					}
					sla.setInvoice_value(preinvoice_value);
					sla.setInvoice_percentage(Double.parseDouble(
							doubleFormat.format(((double) preinvoice_value / sla.getTotal_budget()) * 100)));
					sla.setPayments(invoice_value);
					sla.setPayments_percentage(Double
							.parseDouble(doubleFormat.format(((double) invoice_value / sla.getTotal_budget()) * 100)));
				}

				List<SLAModel> sladataziPagesize = slaestimationrepo.findAllSLAbyProject(projectData);

				// Additional Report Logic Begin

				ProjectOverveiw projectOverveiw = projectOverviewService.createProjectOverview(sladataziPagesize,
						projectData, sladata);

				return ResponseHandler.generateResponse("Projects Overview Reports", true, HttpStatus.OK,
						projectOverveiw);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: " + project_id + " Project ID Doesn't exist");
				return ResponseHandler.generateResponse(project_id + " Project ID Doesn't exist", false, HttpStatus.OK,
						null);
			});
		} catch (Exception e) {
			LOGGER.error("Internal Server Error:" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, e.fillInStackTrace());
		}

	}

	@GetMapping("/getprojectslist")
	public ResponseEntity<Object> getProjectsList(Authentication authentication) {
		try {
			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);
			String role = userDetails.getRolename();
			if (role.equalsIgnoreCase("admin")) {
				List<ProjectModel> projectlist = projectRepository.findAllbizcasesetup();
				return ResponseHandler.generateResponse("List of Projects", true, HttpStatus.OK, projectlist);
			} else {
				List<ProjectModel> projectlist = projectRepository
						.findByService_provider_shortid(userDetails.getShortid());
				return ResponseHandler.generateResponse("List of Projects", true, HttpStatus.OK, projectlist);
			}

		} catch (Exception e) {
			LOGGER.error("Internal Server Error:" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@GetMapping("/getproject")
	public ResponseEntity<Object> getProjectGrid(@RequestParam String Serachkeyword,
			@PageableDefault(size = 10, page = 0, sort = "id", direction = Direction.DESC) Pageable pageable,
			Authentication authentication) {
		try {
			Page<ProjectModel> projects = null;

			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);
			switch (userDetails.getRolename()) {
			case "ADMIN":
				projects = projectRepository.findByIsActive(true, Serachkeyword, pageable);
				break;
			case "BUSINESS":
				projects = projectRepository.findByIsActive(true, Serachkeyword, userDetails.getShortid(), pageable);
				break;
			}
			if (projects != null) {
				for (ProjectModel project : projects) {
					long preinvoice_total_value = 0;
					long invoice_total_value = 0;

					Long sla_total_value = slaestimationrepo.getTotalslaValues(project.getId());
					List<SLAModel> sla_list = slaestimationrepo.getSlaByProject(project);
					if (!sla_list.isEmpty()) {
						for (SLAModel slaData : sla_list) {
							Long preinvoice_value = slaPreInvoiceRepository.getTotalPreinvoiceValues(slaData);
							if (preinvoice_value == null) {
								preinvoice_value = (long) 0;
							}
							preinvoice_total_value += preinvoice_value;
							Long invoice_value = slaInvoiceRepository.getTotalInvoiceValues(slaData);
							if (invoice_value == null) {
								invoice_value = (long) 0;
							}
							invoice_total_value += invoice_value;
						}
						if (Boolean.TRUE.equals(slaestimationrepo.existByActive("active", project))) {
							project.setActive("Active");
						} else {
							project.setActive("Inactive");
						}

						project.setSla_value(sla_total_value);
						project.setInvoice_value(preinvoice_total_value);
						project.setPayment_value(invoice_total_value);
						project.setInvoice_persentage(Double.parseDouble(
								doubleFormat.format(((double) preinvoice_total_value / sla_total_value) * 100)));
						project.setPayment_persentage(Double.parseDouble(
								doubleFormat.format(((double) invoice_total_value / sla_total_value) * 100)));

						project.setAllocatable_resource(doubleFormat.format(resourceReportService
								.getAllocatableResource(project.getBizcase(), project.getId(), project)));
					} else {
						project.setAllocatable_resource("100.00");
						project.setAllocatable_resource_progress("SLA Not Created");
					}
				}

			}

			return ResponseHandler.generateResponse("List of Projects", true, HttpStatus.OK, projects);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error:" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@PostMapping("/createproject")
	public ResponseEntity<Object> createProject(@RequestBody ProjectModel projectmodel, Authentication authentication) {
		try {
			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);
			projectmodel.setCost_center(userDetails.getCost_center());
			projectmodel.setProject_id("PRO" + getRandomNumberString());
			projectmodel.setService_provider(userDetails.getEmp_name());
			projectmodel.setService_provider_shortid(userDetails.getShortid());
			projectmodel.setIsActive(true);
			projectmodel.setStatus("Active");
			ProjectModel savedprojectdata = projectRepository.save(projectmodel);
			return ResponseHandler.generateResponse("Project Created Successfully", true, HttpStatus.OK,
					savedprojectdata);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error:" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	public String getRandomNumberString() {
		Random rnd = new Random();
		int number = rnd.nextInt(9999999);

		// this will convert any number sequence into 6 character.
		return String.format("%07d", number);
	}

}

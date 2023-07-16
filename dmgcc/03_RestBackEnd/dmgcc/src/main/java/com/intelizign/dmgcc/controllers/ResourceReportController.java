package com.intelizign.dmgcc.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.intelizign.dmgcc.authendication.AzureUserInfo;
import com.intelizign.dmgcc.authendication.UserDetailsImpl;
import com.intelizign.dmgcc.models.G3CEmployeeMasterModel;
import com.intelizign.dmgcc.pojoclass.ResourceBaseCapacity;
import com.intelizign.dmgcc.pojoclass.ResourceReport;
import com.intelizign.dmgcc.repositories.G3CEmployeeRepository;
import com.intelizign.dmgcc.request.SkillsRequest;
import com.intelizign.dmgcc.response.ReportResponse;
import com.intelizign.dmgcc.response.ResourceReportView;
import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.services.ResourceAllocationService;
import com.intelizign.dmgcc.services.ResourceReportService;
import com.intelizign.dmgcc.utils.CustomFields;

@RestController
@RequestMapping("/resourcereport")
public class ResourceReportController {

	public final Logger LOGGER = LogManager.getLogger(ResourceReportController.class);

	@Autowired
	private G3CEmployeeRepository g3cEmployeeRepository;

	@Autowired
	private ResourceReportService resourceReportService;

	@Autowired
	private ResourceAllocationService resourceAllocationService;

	@Autowired
	private AzureUserInfo azureUserInfo;

	@GetMapping("/getresourcerecord")
	public ResponseEntity<Object> getResourceReport(@RequestParam String Searchkeyword,
			@PageableDefault(size = 10, page = 0, sort = "id", direction = Direction.DESC) Pageable pageable,
			@RequestParam(value = "costcenter") String cost_center, Authentication authentication) {
		try {

			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);
			switch (userDetails.getRolename()) {
			case "ADMIN", "HR":
				if (!cost_center.isBlank() || !cost_center.isEmpty()) {
					Page<ReportResponse> getresource = g3cEmployeeRepository.findReportByCostcenter(cost_center,
							Searchkeyword, pageable);
					return ResponseHandler.generateResponse("List of Resource Reports", true, HttpStatus.OK,
							getresource);
				} else {
					Page<ReportResponse> getresource = g3cEmployeeRepository.findAllForReport(Searchkeyword, pageable);
					return ResponseHandler.generateResponse("List of Resource Reports", true, HttpStatus.OK,
							getresource);
				}

			case "BUSINESS":
				if (!cost_center.isBlank() || !cost_center.isEmpty()) {
					Page<ReportResponse> getresource = g3cEmployeeRepository
							.findReportByCostcenter(userDetails.getCost_center(), Searchkeyword, pageable);
					return ResponseHandler.generateResponse("List of Resource Reports", true, HttpStatus.OK,
							getresource);
				}

				else {
					Page<ReportResponse> getresource = g3cEmployeeRepository.findAllForReport(Searchkeyword, pageable);
					return ResponseHandler.generateResponse("List of Resource Reports", true, HttpStatus.OK,
							getresource);
				}

			case "EMPLOYEE", "CUSTOMER", "FINANCE", "IT", "FACILITY":
				Page<ReportResponse> resources = g3cEmployeeRepository.findReportById(userDetails.getId(),
						Searchkeyword, pageable);

				return ResponseHandler.generateResponse("List of Resource Reports", true, HttpStatus.OK, resources);

			default:
				return ResponseHandler.generateResponse("Un_Authorized user", false, HttpStatus.OK, null);
			}

		} catch (Exception e) {
			LOGGER.error("Internal Server Error:" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@GetMapping("/getresource/{userid}")
	public ResponseEntity<Object> getResourceReport(@PathVariable(value = "userid") Long userid) {
		try {
			Optional<G3CEmployeeMasterModel> getresource = g3cEmployeeRepository.findById(userid);
			if (getresource.isPresent()) {

				ResourceReport resource_reports = resourceReportService.getResourcesReports(getresource.get());
				return ResponseHandler.generateResponse("Resource View", true, HttpStatus.OK, resource_reports);
			} else {
				return ResponseHandler.generateResponse("User not found", false, HttpStatus.OK, null);
			}
		} catch (Exception e) {
			LOGGER.error("Internal Server Error:" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@JsonView(CustomFields.MyResponseViews.class)
	@GetMapping("/getemployee")
	public ResponseEntity<Object> getUtlilization(@RequestParam(value = "cost_center") String cost_center,
			Authentication authentication) {
		try {
			List<G3CEmployeeMasterModel> employeelist = new ArrayList<>();

			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);
			switch (userDetails.getRolename()) {
			case "ADMIN":
				if (!cost_center.isBlank() || !cost_center.isEmpty()) {
					employeelist = g3cEmployeeRepository.findByCostcenter(cost_center);
				} else {
					employeelist = g3cEmployeeRepository.findAll();
				}
				break;
			case "BUSINESS":
				employeelist = g3cEmployeeRepository.findByCostcenter(userDetails.getCost_center());
				break;
			default:
				return ResponseHandler.generateResponse("Un_Authorized user", false, HttpStatus.OK, null);
			}
			return ResponseHandler.generateResponse("List of Employee", true, HttpStatus.OK, employeelist);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error:" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@GetMapping("/getutilizationreport")
	public ResponseEntity<Object> getUtlilizationforEmployee(@RequestParam String cost_center,
			@RequestParam String userid, Authentication authentication, Pageable pageable) {
		try {
			List<G3CEmployeeMasterModel> employeelist = new ArrayList<>();

			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);
			switch (userDetails.getRolename()) {
			case "ADMIN", "HR":
				if (!cost_center.isBlank() || !cost_center.isEmpty()) {
					if (userid != null && !userid.isEmpty())
						employeelist = g3cEmployeeRepository.findByCostcenterAndId(cost_center, Long.parseLong(userid));
					else {

						employeelist = g3cEmployeeRepository.findByCostcenter(cost_center);
					}
				} else {
					employeelist = g3cEmployeeRepository.findAll();
				}
				break;
			case "BUSINESS":
				if (userid != null && !userid.isEmpty())
					employeelist = g3cEmployeeRepository.findByCostcenterAndId(userDetails.getCost_center(),
							Long.parseLong(userid));
				else {

					employeelist = g3cEmployeeRepository.findByCostcenter(userDetails.getCost_center());
				}

				break;
			default:
				return ResponseHandler.generateResponse("Un_Authorized user", false, HttpStatus.OK, null);
			}

			if (!employeelist.isEmpty()) {
				ResourceReportView responceview = new ResourceReportView();
				responceview = resourceAllocationService.getResourceUtilizationVeiw(responceview, employeelist);
//				Pageable pageable = PageRequest.of(pageableReq.getPageNumber() - 1, pageableReq.getPageSize());
				Page<ResourceBaseCapacity> utilizationWithPaginatioon = resourceAllocationService
						.createPageFromList(responceview.getResourceview(), pageable);
				return ResponseHandler.generateResponse("List of Resource Reports", true, HttpStatus.OK,
						utilizationWithPaginatioon);
			} else {
				return ResponseHandler.generateResponse("Employee not found", false, HttpStatus.OK, null);
			}

		} catch (Exception e) {
			LOGGER.error("Internal Server Error:" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, e.getStackTrace());
		}

	}

	@PutMapping("/resourceupdate/{emp_id}")
	public ResponseEntity<Object> updateSkills(@PathVariable(value = "emp_id") Long emp_id,
			@RequestBody SkillsRequest skillsRequest) {
		try {
			return g3cEmployeeRepository.findById(emp_id).map(employee_data -> {

				employee_data.setSkills(skillsRequest);
				employee_data.setBench_resource(skillsRequest.getBench_resource());
				G3CEmployeeMasterModel updated_employee = g3cEmployeeRepository.save(employee_data);

				return ResponseHandler.generateResponse("Skills Updated Successfully", true, HttpStatus.OK,
						updated_employee);

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: " + emp_id + " Employee id Doesn't exist");
				return ResponseHandler.generateResponse(emp_id + " Employee id Doesn't exist", false, HttpStatus.OK,
						null);
			});

		} catch (Exception e) {
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin" + e.getMessage(),
					false, HttpStatus.OK, null);
		}
	}

}

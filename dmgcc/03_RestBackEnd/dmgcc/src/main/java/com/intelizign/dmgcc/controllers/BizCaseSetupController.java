package com.intelizign.dmgcc.controllers;

import java.text.DecimalFormat;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.intelizign.dmgcc.authendication.AzureUserInfo;
import com.intelizign.dmgcc.authendication.UserDetailsImpl;
import com.intelizign.dmgcc.dashboardreportingservices.BizCaseSetupReportService;
import com.intelizign.dmgcc.dashboardresponce.BizCaseSetupReport;
import com.intelizign.dmgcc.models.JDMappingModel;
import com.intelizign.dmgcc.models.businesscasemodels.BizCaseSetupModel;
import com.intelizign.dmgcc.models.businesscasemodels.BusinessCaseRequest;
import com.intelizign.dmgcc.repositories.BizCaseRequestRepository;
import com.intelizign.dmgcc.repositories.BizCaseSetupRepository;
import com.intelizign.dmgcc.repositories.JDMappingRepository;
import com.intelizign.dmgcc.repositories.ProjectRepository;
import com.intelizign.dmgcc.request.bizcase.SubModel;
import com.intelizign.dmgcc.response.BizcaseITUpdate;
import com.intelizign.dmgcc.response.JDMappingUpdation;
import com.intelizign.dmgcc.response.JdMappingDetails;
import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.services.BusinessSetupService;
import com.intelizign.dmgcc.services.EmailServiceImpl;

@RestController
@RequestMapping("/businesscasesetup")
public class BizCaseSetupController {

	@Autowired
	private BizCaseSetupRepository bizCaseSetupRepository;

	@Autowired
	private BizCaseRequestRepository bizCaseRequestRepository;

	@Autowired
	private EmailServiceImpl emailService;

	@Autowired
	private BusinessSetupService businessSetupService;

	@Autowired
	private JDMappingRepository jdmappingRepository;

	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private BizCaseSetupReportService bizcaseSetupReportService;

	@Autowired
	private AzureUserInfo azureUserInfo;

	public final Logger LOGGER = LogManager.getLogger(BizCaseSetupController.class);

	private static final DecimalFormat doubleFormat = new DecimalFormat("0.00");

	@GetMapping("/getbizdata")
	public ResponseEntity<Object> getBizcase() {
		try {
			List<BusinessCaseRequest> bizdata = bizCaseRequestRepository.findAll();
			return ResponseHandler.generateResponse("IT Infromation", true, HttpStatus.OK, bizdata);

		} catch (

		Exception e) {
			LOGGER.error("Internal Server Error while Biz_Id:" + e.getMessage());
			return ResponseHandler.generateResponse(e.getMessage(), false, HttpStatus.OK, null);
		}

	}

	@GetMapping("/getbizdata/{bizid}")
	public ResponseEntity<Object> getBizcaseData(@PathVariable(value = "bizid") Long bizid) {
		try {
			List<BusinessCaseRequest> bizdata = bizCaseRequestRepository.findAll();
			return ResponseHandler.generateResponse("IT Infromation", true, HttpStatus.OK, bizdata);

		} catch (

		Exception e) {
			LOGGER.error("Internal Server Error while Biz_Id:" + e.getMessage());
			return ResponseHandler.generateResponse(e.getMessage(), false, HttpStatus.OK, null);
		}

	}

	@GetMapping("/getbizcaseinfo/{bizid}")
	public ResponseEntity<Object> getBizcaseInformation(@PathVariable(value = "bizid") Long bizid,
			Authentication authentication) {
		try {

			BusinessCaseRequest bizcasedata = bizCaseRequestRepository.findbyid(bizid);
			if (bizcasedata != null) {
				UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
				if (userDetails == null)
					return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);
				String role = userDetails.getRolename();
				switch (role) {
				case "IT": {
					List<SubModel> it_info = bizcasedata.getIt_info();
					return ResponseHandler.generateResponse("IT Infromation", true, HttpStatus.OK, it_info);
				}
				case "HR": {

					return ResponseHandler.generateResponse("HR Infromation will update soon", true, HttpStatus.OK,
							null);

				}
				case "FACILITY": {
					List<SubModel> fac_info = bizcasedata.getFacility();
					return ResponseHandler.generateResponse("Facility Infromation", true, HttpStatus.OK, fac_info);
				}
				default:
					LOGGER.error("Exceptions happen!: User don't have access");
					return ResponseHandler.generateResponse("User don't have access", false, HttpStatus.OK, null);
				}
			} else {
				LOGGER.info("Exceptions happen!: Biz_Id " + bizid + " Doesn't exist");
				return ResponseHandler.generateResponse("Biz_Id " + bizid + " Doesn't exist", false, HttpStatus.OK,
						null);
			}

		} catch (

		Exception e) {
			LOGGER.error("Internal Server Error while Biz_Id:" + e.getMessage());
			return ResponseHandler.generateResponse(e.getMessage(), false, HttpStatus.OK, null);
		}

	}

	@GetMapping("/getbizcasesetupinfo/{Biz_Id}")
	public ResponseEntity<Object> getBizcaseSetup(@PathVariable(value = "Biz_Id") Long Biz_Id,
			Authentication authentication) {
		try {

			BusinessCaseRequest bizcasedata = bizCaseRequestRepository.findbyid(Biz_Id);
			if (bizcasedata != null) {
				BizCaseSetupModel bizcasesetupdata = bizcasedata.getBizcasesetup();
				if (bizcasesetupdata == null) {
					UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
					if (userDetails == null)
						return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);
					String role = userDetails.getRolename();
					switch (role) {
					case "IT": {
						BizcaseITUpdate itupdate = new BizcaseITUpdate();
						if (bizcasedata.getIt_info() != null && bizcasedata.getSystem_access() != null) {
							itupdate.setIt_info(bizcasedata.getIt_info());
							itupdate.setSystem_access_info(bizcasedata.getSystem_access());
						}
						return ResponseHandler.generateResponse("IT Infromation", true, HttpStatus.OK, itupdate);
					}
					case "HR": {
						List<JdMappingDetails> jddata = businessSetupService.getJDMappingInfo(bizcasedata);
						return ResponseHandler.generateResponse("HR Infromation ", true, HttpStatus.OK, jddata);

					}
					case "FACILITY": {
						List<SubModel> fac_info = bizcasedata.getFacility();
						return ResponseHandler.generateResponse("Facility Infromation", true, HttpStatus.OK, fac_info);
					}
					case "BUSINESS":
					case "ADMIN": {
						BizCaseSetupModel bizcse_setup = new BizCaseSetupModel();
						bizcse_setup.setIt_info(bizcasedata.getIt_info());
						bizcse_setup.setFacility_info(bizcasedata.getFacility());
						bizcse_setup.setSystem_access_info(bizcasedata.getSystem_access());
						bizcse_setup.setThird_party_cost_info(bizcasedata.getThirdparty_cost());
						bizcse_setup.setThird_party_services_info(bizcasedata.getThirdparty_service());

						return ResponseHandler.generateResponse("Bizcase Setup Infromation", true, HttpStatus.OK,
								bizcse_setup);
					}
					default:
						LOGGER.error("Exceptions happen!: User don't have access");
						return ResponseHandler.generateResponse("User don't have access", false, HttpStatus.OK, null);
					}
				}
				if (bizcasesetupdata != null && bizcasesetupdata.getIt_info() == null
						|| bizcasesetupdata.getSystem_access_info() == null
						|| bizcasesetupdata.getFacility_info() == null
						|| bizcasesetupdata.getThird_party_services_info() == null
						|| bizcasesetupdata.getThird_party_cost_info() == null) {
					UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
					if (userDetails == null)
						return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);
					switch (userDetails.getRolename()) {
					case "IT": {
						BizcaseITUpdate itupdate = new BizcaseITUpdate();
						if (bizcasedata.getIt_info() != null && bizcasedata.getSystem_access() != null) {
							itupdate.setIt_info(bizcasedata.getIt_info());
							itupdate.setSystem_access_info(bizcasedata.getSystem_access());
						}
						return ResponseHandler.generateResponse("IT Infromation", true, HttpStatus.OK, itupdate);
					}
					case "HR": {
						List<JdMappingDetails> jddata = businessSetupService.getJDMappingInfo(bizcasedata);
						return ResponseHandler.generateResponse("HR Infromation ", true, HttpStatus.OK, jddata);

					}
					case "FACILITY": {
						List<SubModel> fac_info = bizcasedata.getFacility();
						return ResponseHandler.generateResponse("Facility Infromation", true, HttpStatus.OK, fac_info);
					}
					case "BUSINESS":
					case "ADMIN": {
						BizCaseSetupModel bizcse_setup = new BizCaseSetupModel();
						bizcse_setup.setIt_info(bizcasedata.getIt_info());
						bizcse_setup.setFacility_info(bizcasedata.getFacility());
						bizcse_setup.setSystem_access_info(bizcasedata.getSystem_access());
						bizcse_setup.setThird_party_cost_info(bizcasedata.getThirdparty_cost());
						bizcse_setup.setThird_party_services_info(bizcasedata.getThirdparty_service());

						return ResponseHandler.generateResponse("Bizcase Setup Infromation", true, HttpStatus.OK,
								bizcse_setup);
					}
//					default:
//						LOGGER.error("Exceptions happen!: User don't have access");
//						return ResponseHandler.generateResponse("User don't have access", false, HttpStatus.OK, null);
					}
				}
				return ResponseHandler.generateResponse("Business Case Setup Data", true, HttpStatus.OK,
						bizcasesetupdata);
			} else {
				LOGGER.info("Exceptions happen!: Biz_Id " + Biz_Id + " Doesn't exist");
				return ResponseHandler.generateResponse("Biz_Id " + Biz_Id + " Doesn't exist", false, HttpStatus.OK,
						null);
			}

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while Biz_Id:" + e.getMessage());
			return ResponseHandler.generateResponse(e.getMessage(), false, HttpStatus.OK, null);
		}

	}

	@PostMapping("/{Biz_Id}")
	public ResponseEntity<Object> createBizcaseSetup(@PathVariable(value = "Biz_Id") Long Biz_Id,
			@RequestBody BizCaseSetupModel bizCaseSetupModel, Authentication authentication) {
		try {
			BusinessCaseRequest bizcasedata = bizCaseRequestRepository.findbyid(Biz_Id);
			if (bizcasedata != null) {
				UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
				if (userDetails == null)
					return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);
				String role = userDetails.getRolename();
				if (bizcasedata.getBizcasesetup() != null) {
					bizCaseSetupModel.setId(bizcasedata.getBizcasesetup().getId());
				}
				switch (role) {
				case "IT": {

					Integer itinfo_quantity = businessSetupService.getAverageOfOverallData(bizcasedata.getIt_info());
					Double itaverage = businessSetupService.getAverageOfUpdatedData(bizCaseSetupModel.getIt_data(),
							itinfo_quantity);
					bizCaseSetupModel.setBizcase(bizcasedata);
					bizCaseSetupModel.setIt_average(itaverage);
					bizCaseSetupModel.setTotal_average(
							businessSetupService.getTotalAverage(itaverage, bizCaseSetupModel.getFacility_average(),
									bizCaseSetupModel.getHr_average(), bizCaseSetupModel.getSystem_access_average(),
									bizCaseSetupModel.getThird_party_cost_average(),
									bizCaseSetupModel.getThird_party_services_average(), bizCaseSetupModel));
					bizCaseSetupRepository.save(bizCaseSetupModel);
					break;
				}
				case "HR": {

					return ResponseHandler.generateResponse("HR Infromation will update soon", true, HttpStatus.OK,
							null);

				}
				case "FACILITY": {
					Integer facinfo_quantity = businessSetupService.getAverageOfOverallData(bizcasedata.getFacility());
					Double faclity_average = businessSetupService
							.getAverageOfUpdatedData(bizCaseSetupModel.getFacility_data(), facinfo_quantity);

					bizCaseSetupModel.setBizcase(bizcasedata);
					bizCaseSetupModel.setFacility_average(faclity_average);
					bizCaseSetupModel.setTotal_average(
							businessSetupService.getTotalAverage(bizCaseSetupModel.getIt_average(), faclity_average,
									bizCaseSetupModel.getHr_average(), bizCaseSetupModel.getSystem_access_average(),
									bizCaseSetupModel.getThird_party_cost_average(),
									bizCaseSetupModel.getThird_party_services_average(), bizCaseSetupModel));
					bizCaseSetupRepository.save(bizCaseSetupModel);
					break;

				}

				default:
					LOGGER.error("Exceptions happen!: User don't have access");
					return ResponseHandler.generateResponse("User don't have access", false, HttpStatus.OK, null);

				}

				// Send mail to Business Manager
				Map<String, Object> biz_setup_model = new HashMap<>();
				biz_setup_model.put("reciverName", bizcasedata.getLead().getService_provider_contact_name());
				biz_setup_model.put("TeamName", role);
				emailService.sendBizCaseSetupMail(bizcasedata.getLead().getService_provider_email_id(),
						"G3C Business Case Setup Details Updated by " + role + " Team", biz_setup_model);

				return ResponseHandler.generateResponse("Business Case Setup Created Successfully", true, HttpStatus.OK,
						null);
			} else {
				LOGGER.info("Exceptions happen!: Biz_Id " + Biz_Id + " Doesn't exist");
				return ResponseHandler.generateResponse("Biz_Id " + Biz_Id + " Doesn't exist", false, HttpStatus.OK,
						null);
			}

		} catch (

		Exception e) {
			LOGGER.error("Internal Server Error while Biz_Id:" + e.getMessage());
			return ResponseHandler.generateResponse(e.getMessage(), false, HttpStatus.OK, null);
		}

	}

	@PutMapping("/{Biz_Id}")
	public ResponseEntity<Object> updateBizcaseSetup(@PathVariable(value = "Biz_Id") Long Biz_Id,
			@RequestBody BizCaseSetupModel bizCaseSetupModel, Authentication authentication) {
		try {
			BusinessCaseRequest bizcasedata = bizCaseRequestRepository.findbyid(Biz_Id);
			if (bizcasedata != null) {
				BizCaseSetupModel bizcasesetupdata = bizcasedata.getBizcasesetup();
				UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
				if (userDetails == null)
					return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);

				Map<String, Object> biz_setup_model = new HashMap<>();
				biz_setup_model.put("reciverName", bizcasedata.getLead().getService_provider_contact_name());
				biz_setup_model.put("TeamName", userDetails.getRolename());

				switch (userDetails.getRolename()) {
				case "IT": {
					// IT Update
					if (bizCaseSetupModel.getIt_data() != null) {
						Integer itinfo_quantity = businessSetupService
								.getAverageOfOverallData(bizcasedata.getIt_info());
						Double itaverage = businessSetupService.getAverageOfUpdatedData(bizCaseSetupModel.getIt_data(),
								itinfo_quantity);

						bizcasesetupdata.setIt_info(bizcasedata.getIt_info());
						bizcasesetupdata.setIt_data(bizCaseSetupModel.getIt_data());
						bizcasesetupdata.setIt_average(Double.valueOf(doubleFormat.format(itaverage)));
						bizcasesetupdata.setTotal_average(
								businessSetupService.getTotalAverage(itaverage, bizcasesetupdata.getFacility_average(),
										bizcasesetupdata.getHr_average(), bizCaseSetupModel.getSystem_access_average(),
										bizCaseSetupModel.getThird_party_cost_average(),
										bizCaseSetupModel.getThird_party_services_average(), bizcasesetupdata));
					}

					// System access Update

					if (bizCaseSetupModel.getSystem_access_data() != null) {
						Integer system_access_quantity = businessSetupService
								.getAverageOfOverallData(bizcasedata.getSystem_access());
						Double systm_access_average = businessSetupService.getAverageOfUpdatedData(
								bizCaseSetupModel.getSystem_access_data(), system_access_quantity);
						bizcasesetupdata.setSystem_access_info(bizcasedata.getSystem_access());
						bizcasesetupdata.setSystem_access_data(bizCaseSetupModel.getSystem_access_data());
						bizcasesetupdata
								.setSystem_access_average(Double.valueOf(doubleFormat.format(systm_access_average)));
						bizcasesetupdata
								.setTotal_average(businessSetupService.getTotalAverage(bizcasesetupdata.getIt_average(),
										bizcasesetupdata.getFacility_average(), bizcasesetupdata.getHr_average(),
										systm_access_average, bizCaseSetupModel.getThird_party_cost_average(),
										bizCaseSetupModel.getThird_party_services_average(), bizcasesetupdata));
					}

					BizCaseSetupModel updatebizcasesetupdata = bizCaseSetupRepository.save(bizcasesetupdata);

					// Send mail to Business Manager

					emailService.sendBizCaseSetupMail(bizcasedata.getLead().getService_provider_email_id(),
							"G3C Business Case Setup Details Updated by " + userDetails.getRolename() + " Team",
							biz_setup_model);
					return ResponseHandler.generateResponse("IT Infromation Updated Successfully", true, HttpStatus.OK,
							updatebizcasesetupdata);
				}
				case "HR": {

					return ResponseHandler.generateResponse("HR Infromation will update soon", true, HttpStatus.OK,
							null);

				}
				case "FACILITY": {
					Integer facinfo_quantity = businessSetupService.getAverageOfOverallData(bizcasedata.getFacility());
					Double faclity_average = businessSetupService
							.getAverageOfUpdatedData(bizCaseSetupModel.getFacility_data(), facinfo_quantity);

					bizcasesetupdata.setFacility_average(Double.valueOf(doubleFormat.format(faclity_average)));
					bizcasesetupdata.setFacility_info(bizCaseSetupModel.getFacility_info());
					bizcasesetupdata.setFacility_data(bizCaseSetupModel.getFacility_data());
					bizcasesetupdata.setTotal_average(
							businessSetupService.getTotalAverage(bizcasesetupdata.getIt_average(), faclity_average,
									bizcasesetupdata.getHr_average(), bizCaseSetupModel.getSystem_access_average(),
									bizCaseSetupModel.getThird_party_cost_average(),
									bizCaseSetupModel.getThird_party_services_average(), bizcasesetupdata));
					BizCaseSetupModel updatebizcasesetupdata = bizCaseSetupRepository.save(bizcasesetupdata);

					// Send mail to Business Manager
					emailService.sendBizCaseSetupMail(bizcasedata.getLead().getService_provider_email_id(),
							"G3C Business Case Setup Details Updated by " + userDetails.getRolename() + " Team",
							biz_setup_model);
					return ResponseHandler.generateResponse("Facility Infromation Updated Successfully", true,
							HttpStatus.OK, updatebizcasesetupdata);
				}

				case "BUSINESS": {
					// 3rd Party cost Update
					if (bizCaseSetupModel.getThird_party_cost_data() != null) {
						Integer third_cost_quantity = businessSetupService
								.getAverageOfOverallData(bizcasedata.getThirdparty_cost());
						Double third_cost_average = businessSetupService.getAverageOfUpdatedData(
								bizCaseSetupModel.getThird_party_cost_data(), third_cost_quantity);

						bizcasesetupdata.setThird_party_cost_info(bizcasedata.getThirdparty_cost());
						bizcasesetupdata.setThird_party_cost_data(bizCaseSetupModel.getThird_party_cost_data());
						bizcasesetupdata
								.setThird_party_cost_average(Double.valueOf(doubleFormat.format(third_cost_average)));
						bizcasesetupdata
								.setTotal_average(businessSetupService.getTotalAverage(bizcasesetupdata.getIt_average(),
										bizcasesetupdata.getFacility_average(), bizcasesetupdata.getHr_average(),
										bizCaseSetupModel.getSystem_access_average(), third_cost_average,
										bizCaseSetupModel.getThird_party_services_average(), bizcasesetupdata));
					}

					// System access Update

					if (bizCaseSetupModel.getThird_party_services_data() != null) {
						Integer third_service_quantity = businessSetupService
								.getAverageOfOverallData(bizcasedata.getThirdparty_service());
						Double third_service_average = businessSetupService.getAverageOfUpdatedData(
								bizCaseSetupModel.getThird_party_services_data(), third_service_quantity);
						bizcasesetupdata.setThird_party_services_info(bizcasedata.getThirdparty_service());
						bizcasesetupdata.setThird_party_services_data(bizCaseSetupModel.getThird_party_services_data());
						bizcasesetupdata.setThird_party_services_average(
								Double.valueOf(doubleFormat.format(third_service_average)));
						bizcasesetupdata.setTotal_average(businessSetupService.getTotalAverage(
								bizcasesetupdata.getIt_average(), bizcasesetupdata.getFacility_average(),
								bizcasesetupdata.getHr_average(), bizcasesetupdata.getSystem_access_average(),
								bizcasesetupdata.getThird_party_cost_average(), third_service_average,
								bizcasesetupdata));
					}
					BizCaseSetupModel updatebizcasesetupdata = bizCaseSetupRepository.save(bizcasesetupdata);

					// Send mail to Business Manager

					emailService.sendBizCaseSetupMail(bizcasedata.getLead().getService_provider_email_id(),
							"G3C Business Case Setup Details Updated by " + userDetails.getRolename() + " Team",
							biz_setup_model);
					return ResponseHandler.generateResponse("Third Party Infromation Updated Successfully", true,
							HttpStatus.OK, updatebizcasesetupdata);

				}
				default:
					LOGGER.error("Exceptions happen!: User don't have access");
					return ResponseHandler.generateResponse("User don't have access", false, HttpStatus.OK, null);
				}
			} else {

				LOGGER.info("Exceptions happen!: Biz_Id " + Biz_Id + " Doesn't exist");
				return ResponseHandler.generateResponse("Biz_Id " + Biz_Id + " Doesn't exist", false, HttpStatus.OK,
						null);
			}

		} catch (

		Exception e) {
			LOGGER.error("Internal Server Error while Biz_Id:" + e.getMessage());
			return ResponseHandler.generateResponse(e.getMessage(), false, HttpStatus.OK, null);
		}

	}

	@GetMapping("/bizcaseinfobyprojectid/{projectid}")
	public ResponseEntity<Object> bizcaseinfobyprojectid(@PathVariable(value = "projectid") Long projectid) {

		try {
			return businessSetupService.bizcaseinfobyprojectid(projectid);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while projectId:" + e.getMessage());
			return ResponseHandler.generateResponse(e.getMessage(), false, HttpStatus.OK, null);
		}
	}

	@GetMapping("/jddetails/{Request_id}")
	public ResponseEntity<Object> findAllJD(@PathVariable(value = "Request_id") Long Request_id) {
		try {
			return bizCaseRequestRepository.findById(Request_id).map(bizcasedata -> {
				List<JdMappingDetails> jddata = businessSetupService.getJDMappingInfo(bizcasedata);
				return ResponseHandler.generateResponse("JD Mapping Details", true, HttpStatus.OK, jddata);

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Biz ID  " + Request_id + " Doesn't exist");
				return ResponseHandler.generateResponse("Biz ID  " + Request_id + " Doesn't exist", false,
						HttpStatus.OK, null);
			});
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get JD all by bizid: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	@GetMapping("/getunhiredjd/{biz_id}/{level}")
	public ResponseEntity<Object> getUnhiredjd(@PathVariable Long biz_id, @PathVariable String level) {
		try {
			return bizCaseRequestRepository.findById(biz_id).map(bizcasedata -> {
				List<String> months_by_level = jdmappingRepository.findJDByLevel(level, biz_id);
				if (!months_by_level.isEmpty()) {
					List<JDMappingUpdation> hired_data = businessSetupService.getUnHiredJD(months_by_level, level,
							biz_id);
					return ResponseHandler.generateResponse("List of Un hired JD", true, HttpStatus.OK, hired_data);
				} else {
					return ResponseHandler.generateResponse("JD Doesn't Exist", false, HttpStatus.OK, null);
				}

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Biz ID  " + biz_id + " Doesn't exist");
				return ResponseHandler.generateResponse("Biz ID  " + biz_id + " Doesn't exist", false, HttpStatus.OK,
						null);
			});

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get un hired JD all by bizid: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	@PutMapping("/internalhire")
	public ResponseEntity<Object> hireInternal(@RequestBody List<JDMappingUpdation> hired_data) {
		try {
			List<JDMappingModel> updated_jd = businessSetupService.updateHireJDbyInternal(hired_data);
			List<JDMappingModel> saved_updated_jd = jdmappingRepository.saveAll(updated_jd);

			return ResponseHandler.generateResponse("List of Hired jd by Internal", true, HttpStatus.OK,
					saved_updated_jd);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get JD all by bizid: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	@GetMapping("/dashboard/{project_id}")
	public ResponseEntity<Object> getDashboardReport(@PathVariable(value = "project_id") Long project_id,
			@RequestParam(value = "reportType") String report_type) {
		try {
			return projectRepository.findById(project_id).map(projectData -> {
				List<JDMappingModel> manpowerData = jdmappingRepository
						.findJDByBizCaseId(projectData.getBizcase().getId());
				BizCaseSetupReport bizcaseSetupReport = new BizCaseSetupReport();
				if (projectData.getBizcase().getBizcasesetup() != null) {
					bizcaseSetupReport = bizcaseSetupReportService.getDashboardReport(bizcaseSetupReport, manpowerData,
							projectData.getBizcase().getBizcasesetup(), report_type);
				}
				return ResponseHandler.generateResponse("Bizcase Setup Dashboard Reports", true, HttpStatus.OK,
						bizcaseSetupReport);

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Project ID  " + project_id + " Doesn't exist");
				return ResponseHandler.generateResponse("Project ID  " + project_id + " Doesn't exist", false,
						HttpStatus.OK, null);
			});
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get bizcase dashboard report all by bizid: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					e.getStackTrace());
		}

	}

	@GetMapping("/test")
	public ResponseEntity<Object> test() {
		try {

			List<String> list = List.of("Mar-2014", "Apr-2012", "Jun-2014", "Jul-2012");
			DateTimeFormatter dtf = DateTimeFormatter.ofPattern("MMM-yyyy", Locale.ENGLISH);
			List<String> sorted = list.stream().map(s -> YearMonth.parse(s, dtf)).sorted().map(dtf::format).toList();

			return ResponseHandler.generateResponse("Biz ID  Doesn't exist", false, HttpStatus.OK, sorted);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get JD all by bizid: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}
}

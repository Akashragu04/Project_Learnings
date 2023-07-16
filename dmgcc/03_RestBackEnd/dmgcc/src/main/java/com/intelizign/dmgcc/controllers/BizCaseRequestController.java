package com.intelizign.dmgcc.controllers;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.regex.Pattern;

import javax.validation.Valid;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.intelizign.dmgcc.authendication.AzureUserInfo;
import com.intelizign.dmgcc.authendication.UserDetailsImpl;
import com.intelizign.dmgcc.models.CostCenterModel;
import com.intelizign.dmgcc.models.LeadConversionModel;
import com.intelizign.dmgcc.models.LeadRequestModel;
import com.intelizign.dmgcc.models.ProjectModel;
import com.intelizign.dmgcc.models.businesscasemodels.BusinessApprovalsModel;
import com.intelizign.dmgcc.models.businesscasemodels.BusinessCaseRequest;
import com.intelizign.dmgcc.notification.NotificationServices;
import com.intelizign.dmgcc.repositories.BizCaseRequestRepository;
import com.intelizign.dmgcc.repositories.BusinessApprovalsRepository;
import com.intelizign.dmgcc.repositories.CostCenterRepository;
import com.intelizign.dmgcc.repositories.LeadBusinessRepository;
import com.intelizign.dmgcc.repositories.LeadConversionRepository;
import com.intelizign.dmgcc.repositories.NotificationRepository;
import com.intelizign.dmgcc.repositories.ProjectRepository;
import com.intelizign.dmgcc.request.SupportingFiles;
import com.intelizign.dmgcc.request.bizcase.BizCaseApproval;
import com.intelizign.dmgcc.request.bizcase.Rampups;
import com.intelizign.dmgcc.request.bizcase.SubModel;
import com.intelizign.dmgcc.request.bizcase.WithoutBizCase;
import com.intelizign.dmgcc.request.bizcase.saveNotify;
import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.services.AuditingReport;
import com.intelizign.dmgcc.services.EmailServiceImpl;
import com.intelizign.dmgcc.services.FilesStorageServicePath;
import com.intelizign.dmgcc.services.TokenGeneratorService;
import com.intelizign.dmgcc.utils.CustomFields;

@RestController
@RequestMapping("/businesscaserequest")
public class BizCaseRequestController {

	@Autowired
	private Environment env;

	@Autowired
	SimpMessagingTemplate template;

	@Autowired
	FilesStorageServicePath storageServicepath;

	@Autowired
	ProjectRepository projectRepository;

	@Autowired
	private NotificationRepository notificationRepository;

	@Autowired
	private EmailServiceImpl emailService;

	@Autowired
	private AuditingReport auditingReport;

	@Autowired
	private CostCenterRepository costCenterRepository;

	@Autowired
	private TokenGeneratorService tokenGeneratorService;

	@Autowired
	private NotificationServices notificationServices;

	@Autowired
	private AzureUserInfo azureUserInfo;

	private final BizCaseRequestRepository bizcasereqrepo;

	private final LeadBusinessRepository leadreq_repository;

	private final BusinessApprovalsRepository bizcaseapprovalrepo;

	private final LeadConversionRepository leadConversionRepository;

	public final Logger LOGGER = LogManager.getLogger(BizCaseRequestController.class);

	BizCaseRequestController(BizCaseRequestRepository bizcasereqrepo, LeadBusinessRepository leadreq_repository,
			BusinessApprovalsRepository bizcaseapprovalrepo, LeadConversionRepository leadConversionRepository) {
		this.bizcasereqrepo = bizcasereqrepo;
		this.leadreq_repository = leadreq_repository;
		this.bizcaseapprovalrepo = bizcaseapprovalrepo;
		this.leadConversionRepository = leadConversionRepository;
	}

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public Map<String, String> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
		Map<String, String> errors = new HashMap<>();
		ex.getBindingResult().getFieldErrors()
				.forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));

		return errors;
	}

	@GetMapping("")
	public ResponseEntity<Object> findAllBizCaseRequest(@RequestParam String Serachkeyword,
			@PageableDefault(size = 10, page = 0, sort = "id", direction = Direction.DESC) Pageable pageable,
			Authentication authentication) {
		try {

			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);
			switch (userDetails.getRolename()) {
			case "ADMIN":
				Page<BusinessCaseRequest> allBizCaseRequestdata = bizcasereqrepo.findbySearchActive(true, Serachkeyword,
						pageable);
				for (BusinessCaseRequest currentbizcase : allBizCaseRequestdata)
					currentbizcase.setProject_name(currentbizcase.getLead().getProject_name());
				return ResponseHandler.generateResponse("List of Business Case Request", true, HttpStatus.OK,
						allBizCaseRequestdata);
			case "BUSINESS":
				Page<BusinessCaseRequest> BizCaseRequestdata = bizcasereqrepo.findbyCostcenterAndSearchActive(true,
						userDetails.getCost_center(), Serachkeyword, pageable);
				for (BusinessCaseRequest currentbizcase : BizCaseRequestdata)
					currentbizcase.setProject_name(currentbizcase.getLead().getProject_name());
				return ResponseHandler.generateResponse("List of Business Case Request", true, HttpStatus.OK,
						BizCaseRequestdata);
			case "IT", "HR", "FACILITY", "CUSTOMER", "FINANCE":
				Page<BusinessCaseRequest> dept_based_BizCaseRequestdata = bizcasereqrepo
						.findbyShortIdAndSearchActive(true, userDetails.getShortid(), Serachkeyword, pageable);
				for (BusinessCaseRequest currentbizcase : dept_based_BizCaseRequestdata)
					currentbizcase.setProject_name(currentbizcase.getLead().getProject_name());
				return ResponseHandler.generateResponse("List of Business Case Request", true, HttpStatus.OK,
						dept_based_BizCaseRequestdata);
			default:
				LOGGER.error("User doesn't have the access ");
				return ResponseHandler.generateResponse("User doesn't have the access", true, HttpStatus.OK, null);

			}

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while getall:" + e.getMessage());
			return ResponseHandler.generateResponse(e.getMessage(), false, HttpStatus.OK, null);
		}

	}

	@PostMapping("/{LeadId}")
	public ResponseEntity<Object> bizCaseReqLoadData(@PathVariable(value = "LeadId") Long LeadId,
			@Valid @RequestBody BusinessCaseRequest bizcasereq) {
		try {
			return leadreq_repository.findById(LeadId).map(lead -> {

				bizcasereq.setApproved_provider_Shortid(lead.getService_provider_short_id());
				bizcasereq.setApproved_receiver_Shortid(lead.getService_receiver_short_id());
				bizcasereq.setService_provider_approve(false);
				bizcasereq.setService_receiver_approve(false);
				bizcasereq.setProject_name(lead.getProject_name());
				bizcasereq.setLead(lead);
				bizcasereq.setCostcenter(lead.getService_provider_cost_center());
				bizcasereq.setActive(true);
				bizcasereq.setOverall_status(false);
				bizcasereq.setStatus("In Progress");

				long delay_count = ChronoUnit.DAYS.between(lead.getCreate_date(),
						LocalDateTime.now(ZoneId.of(env.getProperty("spring.app.timezone"))));

				LeadConversionModel leadConversionModel = new LeadConversionModel();
				leadConversionModel.setLevel_start_date(lead.getCreate_date());
				leadConversionModel
						.setLevel_end_date(LocalDateTime.now(ZoneId.of(env.getProperty("spring.app.timezone"))));
				leadConversionModel.setDelay_days(delay_count);
				leadConversionModel.setConversion_period("IL0 - IL1");
				leadConversionModel.setLead(lead);
				if (delay_count <= 5 && delay_count >= 0)
					leadConversionModel.setColour("rgb(0, 150, 30)");
				else if (delay_count <= 10 && delay_count >= 6)
					leadConversionModel.setColour("rgb(255, 205, 86)");
				else if (delay_count > 10)
					leadConversionModel.setColour("rgb(255, 99, 132)");
				else
					LOGGER.error("Exceptions happen!: Invalid Range: Days " + delay_count);

				leadConversionRepository.save(leadConversionModel);

				lead.setCreate_date(LocalDateTime.now(ZoneId.of(env.getProperty("spring.app.timezone"))));
				lead.setCategory_status("in progress");
				lead.setBizcasecreated(true);
				lead.setBizratecard(bizcasereq.getSla_business_case());
				leadreq_repository.save(lead);

				BusinessCaseRequest BizCaseinsertdata = bizcasereqrepo.save(bizcasereq);
				return ResponseHandler.generateResponse("Business Requirement Updated Successfully", true,
						HttpStatus.OK, BizCaseinsertdata);

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: LeadID " + LeadId + " Doesn't exist");
				return ResponseHandler.generateResponse("LeadID " + LeadId + " Doesn't exist", false, HttpStatus.OK,
						null);
			});

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while post by lead_id: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin, Error:" + e.getMessage(),
					false, HttpStatus.OK, null);
		}
	}

	@PostMapping("/withoutbizcase/{LeadId}")
	public ResponseEntity<Object> wihtoutBizCaseData(@PathVariable(value = "LeadId") Long LeadId,
			@RequestBody WithoutBizCase bizcaseinfo) {
		try {
			return leadreq_repository.findById(LeadId).map(lead -> {

				BusinessCaseRequest bizcasereq = new BusinessCaseRequest();
				bizcasereq.setApproved_provider_Shortid(lead.getService_provider_short_id());
				bizcasereq.setApproved_receiver_Shortid(lead.getService_receiver_short_id());
				bizcasereq.setService_provider_approve(true);
				bizcasereq.setService_receiver_approve(true);
				bizcasereq.setProject_name(lead.getProject_name());
				bizcasereq.setLead(lead);
				bizcasereq.setCostcenter(lead.getService_provider_cost_center());
				bizcasereq.setActive(false);
				bizcasereq.setOverall_status(true);
				bizcasereq.setStatus("Approved");
				bizcasereq.setWorking_hours((int) bizcaseinfo.getFte_count());
				bizcasereq.setSla_business_case(false);

				long delay_count = ChronoUnit.DAYS.between(lead.getCreate_date(),
						LocalDateTime.now(ZoneId.of(env.getProperty("spring.app.timezone"))));

				LeadConversionModel leadConversionModel = new LeadConversionModel();
				leadConversionModel.setLevel_start_date(lead.getCreate_date());
				leadConversionModel
						.setLevel_end_date(LocalDateTime.now(ZoneId.of(env.getProperty("spring.app.timezone"))));
				leadConversionModel.setDelay_days(delay_count);
				leadConversionModel.setConversion_period("IL0 - IL1");
				leadConversionModel.setLead(lead);
				if (delay_count <= 5 && delay_count >= 0)
					leadConversionModel.setColour("rgb(0, 150, 30)");
				else if (delay_count <= 10 && delay_count >= 6)
					leadConversionModel.setColour("rgb(255, 205, 86)");
				else if (delay_count > 10)
					leadConversionModel.setColour("rgb(255, 99, 132)");
				else
					LOGGER.error("Exceptions happen!: Invalid Range: Days " + delay_count);

				leadConversionRepository.save(leadConversionModel);

				leadConversionModel = new LeadConversionModel();
				leadConversionModel.setLevel_start_date(lead.getCreate_date());
				leadConversionModel
						.setLevel_end_date(LocalDateTime.now(ZoneId.of(env.getProperty("spring.app.timezone"))));
				leadConversionModel.setDelay_days(delay_count);
				leadConversionModel.setConversion_period("IL2 - IL3");
				if (delay_count <= 5 && delay_count >= 0)
					leadConversionModel.setColour("rgb(0, 150, 30)");
				else if (delay_count <= 10 && delay_count >= 6)
					leadConversionModel.setColour("rgb(255, 205, 86)");
				else if (delay_count > 10)
					leadConversionModel.setColour("rgb(255, 99, 132)");
				else
					LOGGER.error("Exceptions happen!: Invalid Range: Days " + delay_count);
				leadConversionModel.setLead(lead);
				leadConversionRepository.save(leadConversionModel);

				lead.setCreate_date(LocalDateTime.now(ZoneId.of(env.getProperty("spring.app.timezone"))));
				lead.setCategory_status("approved");
				lead.setBizcasecreated(true);
				lead.setBizratecard(bizcasereq.getSla_business_case());
				leadreq_repository.save(lead);

				BusinessCaseRequest BizCaseinsertdata = bizcasereqrepo.save(bizcasereq);

				// Create Project Details
				ProjectModel projectModel = new ProjectModel();
				projectModel.setProject_id("PRO" + getRandomNumberString());
				projectModel.setProject_name(lead.getProject_name());
				projectModel.setService_provider(lead.getService_provider_contact_name());
				projectModel.setService_provider_shortid(lead.getService_provider_short_id());
				projectModel.setService_receiver(lead.getService_receiver_contact_name());
				projectModel.setService_receiver_shortid(lead.getService_receiver_short_id());
				projectModel.setIsActive(true);
				projectModel.setStatus("Active");
				projectModel.setBizcase(BizCaseinsertdata);
				projectModel.setCost_center(BizCaseinsertdata.getCostcenter());
				projectModel.setWorking_hours(bizcaseinfo.getWorking_hours());
				projectModel.setTotal_fte_count(bizcaseinfo.getFte_count());
				projectRepository.save(projectModel);

				return ResponseHandler.generateResponse("Project Created Successfully", true, HttpStatus.OK,
						BizCaseinsertdata);

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: LeadID " + LeadId + " Doesn't exist");
				return ResponseHandler.generateResponse("LeadID " + LeadId + " Doesn't exist", false, HttpStatus.OK,
						null);
			});

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while post by lead_id: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin, Error:" + e.getMessage(),
					false, HttpStatus.OK, null);
		}
	}

	@PostMapping("/saveandnotifyfull/{LeadId}/{section}/{email}")
	public ResponseEntity<Object> bizCaseReqLoadData(@PathVariable(value = "LeadId") Long LeadId,
			@PathVariable(value = "section") String section, @PathVariable(value = "email") String email,
			@Valid @RequestBody BusinessCaseRequest bizcasereq, Authentication authentication) {
		try {
			Authentication userDetails = SecurityContextHolder.getContext().getAuthentication();
//			AzureTokenResponse userDetails = azureUserInfo.getUserInfo();
			return leadreq_repository.findById(LeadId).map(lead -> {

				bizcasereq.setApproved_provider_Shortid(lead.getService_provider_short_id());
				bizcasereq.setApproved_receiver_Shortid(lead.getService_receiver_short_id());
				bizcasereq.setService_provider_approve(false);
				bizcasereq.setService_receiver_approve(false);
				bizcasereq.setProject_name(lead.getProject_name());
				bizcasereq.setLead(lead);
				bizcasereq.setCostcenter(lead.getService_provider_cost_center());
				bizcasereq.setActive(true);
				bizcasereq.setOverall_status(false);
				bizcasereq.setStatus("In Progress");

				long delay_count = ChronoUnit.DAYS.between(lead.getCreate_date(),
						LocalDateTime.now(ZoneId.of(env.getProperty("spring.app.timezone"))));

				LeadConversionModel leadConversionModel = new LeadConversionModel();
				leadConversionModel.setLevel_start_date(lead.getCreate_date());
				leadConversionModel
						.setLevel_end_date(LocalDateTime.now(ZoneId.of(env.getProperty("spring.app.timezone"))));
				leadConversionModel.setDelay_days(delay_count);
				leadConversionModel.setConversion_period("IL0 - IL1");
				if (delay_count <= 5 && delay_count >= 0)
					leadConversionModel.setColour("rgb(0, 150, 30)");
				else if (delay_count <= 10 && delay_count >= 6)
					leadConversionModel.setColour("rgb(255, 205, 86)");
				else if (delay_count > 10)
					leadConversionModel.setColour("rgb(255, 99, 132)");
				else
					LOGGER.error("Exceptions happen!: Invalid Range: Days " + delay_count);
				leadConversionModel.setLead(lead);

				lead.setCreate_date(LocalDateTime.now(ZoneId.of(env.getProperty("spring.app.timezone"))));
				lead.setCategory_status("in progress");
				lead.setBizcasecreated(true);

				String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\." + "[a-zA-Z0-9_+&*-]+)*@" + "(?:[a-zA-Z0-9-]+\\.)+[a-z"
						+ "A-Z]{2,7}$";

				Pattern pat = Pattern.compile(emailRegex);
				if (email != null && !email.isEmpty() && pat.matcher(email).matches()) {
					Map<String, Object> it_model = new HashMap<>();
					if (section.equalsIgnoreCase("IT")) {
						// Sending Notifications
						String redirectUrl = env.getProperty("g3c.frontend.app") + "g3c-admin";

						bizcasereq.setIsitfilledbizcas(true);
						notificationServices.NotificationPojo(userDetails.getName(), bizcasereq.getIt_contact_person(),
								bizcasereq.getIt_shortid(), "New Task Assigned to you", "business/leads-monitoring");

						it_model.put("reciverName", bizcasereq.getIt_contact_person());
						it_model.put("businessManager", bizcasereq.getLead().getService_provider_contact_name());
						it_model.put("team", bizcasereq.getLead().getService_provider_department());
						it_model.put("redirectUrl", redirectUrl);

						emailService.sendSubModelMail(email,
								"G3C - " + bizcasereq.getProject_name() + " - Business Requirements Updated by IT Team",
								it_model);
					} else if (section.equalsIgnoreCase("FACILITY")) {

						// Sending Notifications
						String redirectUrl = env.getProperty("g3c.frontend.app") + "g3c-admin";

						notificationServices.NotificationPojo(userDetails.getName(), bizcasereq.getFac_contact_person(),
								bizcasereq.getFac_shortid(), "New Task Assigned to you", "business/leads-monitoring");

						it_model.put("reciverName", bizcasereq.getHr_contact_person());
						it_model.put("businessManager", bizcasereq.getLead().getService_provider_contact_name());
						it_model.put("team", bizcasereq.getLead().getService_provider_department());
						it_model.put("redirectUrl", redirectUrl);

						emailService.sendSubModelMail(email, "G3C - " + bizcasereq.getProject_name()
								+ " - Business Requirements Updated by Facility Team", it_model);
					} else {
						LOGGER.error("Mail is not sent Because Section Type invalid: " + section);
					}
				}

				leadConversionRepository.save(leadConversionModel);
				leadreq_repository.save(lead);
				BusinessCaseRequest BizCaseinsertdata = bizcasereqrepo.save(bizcasereq);
				return ResponseHandler.generateResponse("Business Requirement Updated Successfully", true,
						HttpStatus.OK, BizCaseinsertdata);

			}).orElseGet(() -> {
				return ResponseHandler.generateResponse("LeadID " + LeadId + " Doesn't exist", false, HttpStatus.OK,
						null);
			});

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while post by lead_id: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	@PostMapping("/update/{Id}")
	public ResponseEntity<Object> updateBizCaseReqData(@PathVariable(value = "Id") Long biz_id,
			@Valid @RequestBody BusinessCaseRequest updatebizcase, Authentication authentication) {
		try {
			return bizcasereqrepo.findById(biz_id).map(biz_data -> {

				return leadreq_repository.findById(biz_data.getLead().getId()).map(lead_data -> {
					UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
					if (userDetails == null)
						return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);
					updatebizcase.setId(biz_id);
					updatebizcase.setApproved_provider_Shortid(lead_data.getService_provider_short_id());
					updatebizcase.setApproved_receiver_Shortid(lead_data.getService_receiver_short_id());
					updatebizcase.setService_provider_approve(false);
					updatebizcase.setService_receiver_approve(false);
					updatebizcase.setProject_name(lead_data.getProject_name());
					updatebizcase.setActive(true);
					updatebizcase.setOverall_status(false);
					updatebizcase.setStatus("In Progress");
					updatebizcase.setLead(lead_data);
					updatebizcase.setCostcenter(lead_data.getService_provider_cost_center());
					if (userDetails.getRolename().equals("HR")) {
						updatebizcase.setIsassignfinance(false);
					}

					BusinessCaseRequest BizCaseinsertdata = bizcasereqrepo.save(updatebizcase);

					return ResponseHandler.generateResponse("Business Requirement Updated Successfully", true,
							HttpStatus.OK, BizCaseinsertdata);

				}).orElseGet(() -> {
					LOGGER.error("Exceptions happen!: LeadID Doesn't exist");
					return ResponseHandler.generateResponse("LeadID  Doesn't exist", false, HttpStatus.OK, null);
				});

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Biz ID " + biz_id + " Doesn't exist");
				return ResponseHandler.generateResponse("Biz ID " + biz_id + " Doesn't exist", false, HttpStatus.OK,
						null);
			});

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while post by lead_id: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	@PostMapping("/saveandnotify/{id}")
	public ResponseEntity<Object> updateBizCaseRequest(@Valid @RequestBody saveNotify bizcasesessionupdate,
			@PathVariable Long id, Authentication authentication) {
		try {
			List<SubModel> it_info_data = new ArrayList<>();
			List<SubModel> facility_info_data = new ArrayList<>();
			String positiveNumRegex = "\\d+(\\.\\d+)?";
			Pattern pat = Pattern.compile(positiveNumRegex);

			return bizcasereqrepo.findById(id).map(updatedata -> {
				String redirectUrl = env.getProperty("g3c.frontend.app") + "g3c-admin";

				switch (bizcasesessionupdate.getSession_name().toUpperCase()) {
				case "IT": {
					updatedata.setIt_contact_person(bizcasesessionupdate.getIt_contact_person());
					updatedata.setIt_shortid(bizcasesessionupdate.getIt_shortid());

					if (bizcasesessionupdate.getIt_info() != null && !bizcasesessionupdate.getIt_info().isEmpty()) {
						for (SubModel it_info : bizcasesessionupdate.getIt_info()) {
							if ((it_info.getCost() != null && !it_info.getCost().isEmpty()
									&& pat.matcher(it_info.getCost()).matches()) && it_info.getQuantity() != null
									&& !it_info.getQuantity().isEmpty()
									&& pat.matcher(it_info.getQuantity()).matches()) {
								it_info_data.add(it_info);
							} else {
								return ResponseHandler.generateResponse("Enter Only Positive Numbers", false,
										HttpStatus.OK, null);
							}
						}
					}

					updatedata.setIt_info(it_info_data);

					UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
					if (userDetails == null)
						return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);
					String role = userDetails.getRolename();
					if (role.equalsIgnoreCase("it")) {

						updatedata.setIsitfilledbizcas(true);
						// Sending Notification
						notificationServices.NotificationPojo(bizcasesessionupdate.getIt_contact_person(),
								updatedata.getLead().getService_provider_contact_name(),
								updatedata.getLead().getService_provider_short_id(),
								"IT Team filled Business Requirement", "business/leads-monitoring");

						// send mail to It contact person
						Map<String, Object> it_model = new HashMap<>();
						it_model.put("reciverName", updatedata.getLead().getService_provider_contact_name());
						it_model.put("businessManager", updatedata.getIt_contact_person());
						it_model.put("team", "IT Department");
						it_model.put("redirectUrl", redirectUrl);

						emailService.sendSubModelMail(updatedata.getLead().getService_provider_email_id(),
								"G3C - " + updatedata.getProject_name() + " - Business Requirements Updated by IT Team",
								it_model);

					} else {
						if (bizcasesessionupdate.getIt_email() != null && !bizcasesessionupdate.getIt_email().isEmpty()
								&& !bizcasesessionupdate.getIt_email().isBlank()) {

							// Sending Notification
							notificationServices.NotificationPojo(userDetails.getEmp_name(),
									bizcasesessionupdate.getIt_contact_person(), bizcasesessionupdate.getIt_shortid(),
									"Filled Business Requirement", "business/leads-monitoring");

							// send mail to It contact person
							Map<String, Object> it_model = new HashMap<>();
							it_model.put("reciverName", bizcasesessionupdate.getIt_contact_person());
							it_model.put("businessManager", updatedata.getLead().getService_provider_contact_name());
							it_model.put("team", updatedata.getLead().getService_provider_department());
							it_model.put("redirectUrl", redirectUrl);

							emailService.sendSubModelMail(bizcasesessionupdate.getIt_email(),"New Project in G3C – Update Requirements" ,
									it_model);
						}
					}

					break;

				}
				case "FACILITY": {

					updatedata.setFac_contact_person(bizcasesessionupdate.getFac_contact_person());
					updatedata.setFac_shortid(bizcasesessionupdate.getFac_shortid());

					if (bizcasesessionupdate.getFacility() != null && !bizcasesessionupdate.getFacility().isEmpty()) {
						for (SubModel facility_info : bizcasesessionupdate.getFacility()) {
							if ((facility_info.getCost() != null && !facility_info.getCost().isEmpty()
									&& pat.matcher(facility_info.getCost()).matches())
									&& facility_info.getQuantity() != null && !facility_info.getQuantity().isEmpty()
									&& pat.matcher(facility_info.getQuantity()).matches()) {
								facility_info_data.add(facility_info);
							} else {
								return ResponseHandler.generateResponse("Enter Only Positive Numbers", false,
										HttpStatus.OK, null);
							}
						}
					}

					updatedata.setFacility(facility_info_data);
					UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
					if (userDetails == null)
						return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);
					if (userDetails.getRolename().equalsIgnoreCase("facility")) {

						updatedata.setIsfacilityfilledbizcas(true);
						// Sending Notification
						notificationServices.NotificationPojo(bizcasesessionupdate.getFac_contact_person(),
								updatedata.getLead().getService_provider_contact_name(),
								updatedata.getLead().getService_provider_short_id(),
								"FACILITY Team filled Business Requirement", "business/leads-monitoring");

						// send mail to It contact person
						Map<String, Object> it_model = new HashMap<>();
						it_model.put("reciverName", updatedata.getLead().getService_provider_contact_name());
						it_model.put("businessManager", updatedata.getFac_contact_person());
						it_model.put("team", "Facility Department");
						it_model.put("redirectUrl", redirectUrl);

						emailService.sendSubModelMail(updatedata.getLead().getService_provider_email_id(), "G3C - "
								+ updatedata.getProject_name() + " - Business Requirements Updated by Facility Team",
								it_model);

					} else {
						if (bizcasesessionupdate.getFac_email() != null
								&& !bizcasesessionupdate.getFac_email().isEmpty()
								&& !bizcasesessionupdate.getFac_email().isBlank()) {

							// Sending Notification
							notificationServices.NotificationPojo(userDetails.getEmp_name(),
									bizcasesessionupdate.getFac_contact_person(), bizcasesessionupdate.getFac_shortid(),
									"Filled Business Requirement", "business/leads-monitoring");

							// send mail to Facility contact person
							Map<String, Object> facility_model = new HashMap<>();
							facility_model.put("reciverName", bizcasesessionupdate.getFac_contact_person());
							facility_model.put("businessManager",
									updatedata.getLead().getService_provider_contact_name());
							facility_model.put("team", updatedata.getLead().getService_provider_department());
							facility_model.put("redirectUrl", redirectUrl);

							emailService
									.sendSubModelMail(bizcasesessionupdate.getFac_email(),"New Project in G3C – Update Requirements", facility_model);
						}
					}

					break;

				}
				case "HR": {

					updatedata.setManpower_hiringcost(bizcasesessionupdate.getManpower_hiringcost());
					updatedata.setManpower_requirements(bizcasesessionupdate.getManpower_requirements());
					updatedata.setRampups(bizcasesessionupdate.getRampups());

					updatedata.setIs_agree(bizcasesessionupdate.getIs_agree());
					updatedata.setHr_contact_person(bizcasesessionupdate.getHr_contact_person());
					updatedata.setHr_shortid(bizcasesessionupdate.getHr_shortid());
					updatedata.setHr_rampups(bizcasesessionupdate.getHr_rampups());
//					int rampup_size = bizcasesessionupdate.getRampups().stream().map(Rampups::getProperties) // now it's a steam of properties
//							.filter(rs -> rs != null) // remove properties lists that are null
//							.mapToInt(List::size) // stream of list sizes
//							.sum();
//
//					int hrrampup_size = bizcasesessionupdate.getHr_rampups().stream().map(Rampups::getProperties) //  now it's a steam of properties
//							.filter(rs -> rs != null) // remove properties lists that are null
//							.mapToInt(List::size) // stream of list sizes
//							.sum();
//
//					if (hrrampup_size <= rampup_size) {
//						updatedata.setHr_rampups(bizcasesessionupdate.getHr_rampups());
//					}
//					else {
//						return ResponseHandler.generateResponse("Hr Ramup Total Size Sholud be Less Than Rampup Total Size", false,
//								HttpStatus.OK, null);
//					}

					bizcasesessionupdate.getRampups().stream()
							.map(e -> e.getProperties().stream().map(properties -> properties.getProperty_name()));

					UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
					if (userDetails == null)
						return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);
					if (userDetails.getRolename().equalsIgnoreCase("hr")) {

						updatedata.setIshrfilledbizcas(true);
						// Sending Notification
						notificationServices.NotificationPojo(bizcasesessionupdate.getHr_contact_person(),
								updatedata.getLead().getService_provider_contact_name(),
								updatedata.getLead().getService_provider_short_id(),
								"HR Team filled Business Requirement", "business/leads-monitoring");

						// send mail to It contact person
						Map<String, Object> it_model = new HashMap<>();
						it_model.put("reciverName", updatedata.getLead().getService_provider_contact_name());
						it_model.put("businessManager", updatedata.getHr_contact_person());
						it_model.put("team", "HR Department");
						it_model.put("redirectUrl", redirectUrl);

						emailService.sendSubModelMail(updatedata.getLead().getService_provider_email_id(),
								"G3C - " + updatedata.getProject_name() + " - Business Requirements Updated by HR Team",
								it_model);

					} else {
						if (bizcasesessionupdate.getHr_email() != null && !bizcasesessionupdate.getHr_email().isEmpty()
								&& !bizcasesessionupdate.getHr_email().isBlank()) {

							// Sending Notification
							notificationServices.NotificationPojo(userDetails.getEmp_name(),
									bizcasesessionupdate.getHr_contact_person(), bizcasesessionupdate.getHr_shortid(),
									"Filled Business Requirement", "business/leads-monitoring");

							// send mail to HR contact person
							Map<String, Object> hr_model = new HashMap<>();
							hr_model.put("reciverName", bizcasesessionupdate.getHr_contact_person());
							hr_model.put("businessManager", updatedata.getLead().getService_provider_contact_name());
							hr_model.put("team", updatedata.getLead().getService_provider_department());
							hr_model.put("redirectUrl", redirectUrl);

							emailService.sendSubModelMail(bizcasesessionupdate.getHr_email(), "New Project in G3C – Update Requirements",
									hr_model);
						}
					}

					break;

				}
				case "SYSTEM_ACCESS": {

					updatedata.setSystem_access(bizcasesessionupdate.getSystem_access());
					break;
				}
				case "THIRD_PARTY_SERVICE": {

					updatedata.setThirdparty_service(bizcasesessionupdate.getThirdparty_service());
					break;
				}
				case "THIRD_PARTY_COST": {

					updatedata.setThirdparty_cost(bizcasesessionupdate.getThirdparty_cost());
					break;
				}
				case "TRAVEL_COST": {

					updatedata.setTravel_cost(bizcasesessionupdate.getTravel_cost());
					break;
				}
				case "OTHER_COST": {

					updatedata.setOther_cost(bizcasesessionupdate.getOther_cost());
					break;
				}
				default:
					LOGGER.error("Exceptions happen!: Invalid Session Type " + bizcasesessionupdate.getSession_name()
							+ " Please provide valid session type");
					return ResponseHandler.generateResponse("Invalid Session Type "
							+ bizcasesessionupdate.getSession_name() + " Please provide valid session type", false,
							HttpStatus.OK, null);
				}
				bizcasereqrepo.save(updatedata);
				return ResponseHandler.generateResponse("Record Updated Successfully", true, HttpStatus.OK, updatedata);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: BizCaseID " + id + " Doesn't exist to Update Biz Case Information");
				return ResponseHandler.generateResponse(
						"BizCaseID " + id + " Doesn't exist to Update Biz Case Information", false, HttpStatus.OK,
						null);
			});
		} catch (Exception e) {
			LOGGER.error("Internal Server Error update lead_id:" + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<Object> findBizCaseRequest(@PathVariable Long id) {
		try {
			return bizcasereqrepo.findById(id).map(requestData -> {
				return ResponseHandler.generateResponse("Business Requirement Details", true, HttpStatus.OK,
						requestData);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: " + id + " BizCaseID Doesn't exist");
				return ResponseHandler.generateResponse(" BizCaseID Doesn't exist", false, HttpStatus.OK, null);
			});
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get by bizcase_id: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteBizCaseRequest(@PathVariable Long id) {
		try {
			return bizcasereqrepo.findById(id).map(updatedata -> {

				updatedata.setActive(false);
				bizcasereqrepo.save(updatedata);
				return ResponseHandler.generateResponse("Record Delete Successfully", true, HttpStatus.OK, null);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: BizCaseID " + id + " Doesn't exist to Delete Biz Case Information");
				return ResponseHandler.generateResponse(
						"BizCaseID " + id + " Doesn't exist to Delete Biz Case Information", false, HttpStatus.OK,
						null);
			});

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while dealte by bizcase_id:" + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	@GetMapping("/getiterationlevel/{id}")
	public ResponseEntity<Object> getIterationlevel(@PathVariable Long id) {
		try {
			LOGGER.info("Getting into Iteration Class");
			return auditingReport.findIterationReport(id);

		} catch (Exception e) {
			LOGGER.error("Erro While get Iteration:" + e.getLocalizedMessage());
			return ResponseHandler.generateResponse(e.getMessage(), false, HttpStatus.OK, e.getStackTrace());
		}
	}

	// Setting the HR or Business Rampup data
	@PutMapping("/setiterationrampup/{biz_id}")
	public ResponseEntity<Object> setIterationlevel(@PathVariable Long biz_id,
			@RequestBody List<Rampups> currentRampups) {
		try {
			return bizcasereqrepo.findById(biz_id).map(updatedata -> {

				updatedata.setRampups(currentRampups);
				bizcasereqrepo.save(updatedata);
				return ResponseHandler.generateResponse("Iteration Selected Successfully", true, HttpStatus.OK, null);
			}).orElseGet(() -> {
				LOGGER.error(
						"Exceptions happen!: BizCaseID " + biz_id + " Doesn't exist to Delete Biz Case Information");
				return ResponseHandler.generateResponse(
						"BizCaseID " + biz_id + " Doesn't exist to Delete Biz Case Information", false, HttpStatus.OK,
						null);
			});

		} catch (Exception e) {
			return ResponseHandler.generateResponse(e.getMessage(), false, HttpStatus.OK, null);
		}
	}

	@GetMapping("/lead/{LeadId}")
	public ResponseEntity<Object> findLeadBizCaseRequest(@PathVariable(value = "LeadId") Long LeadId,
			Pageable pageable) {
		try {
			Page<BusinessCaseRequest> BizCaseRequestdata = bizcasereqrepo.findByLeadId(LeadId, pageable);
			return ResponseHandler.generateResponse("List of Business Case Request based on Lead ID", true,
					HttpStatus.OK, BizCaseRequestdata);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get by lead_id:" + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	// Cost Center Service
	@GetMapping("/getcostcenter")
	public ResponseEntity<Object> getCostCenter(Authentication authentication) {
		try {

			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);

			List<CostCenterModel> CostCenterModels = new ArrayList<>();

			LOGGER.error("Cost Center: " + userDetails.getCost_center());
			Optional<CostCenterModel> costCenterModel = costCenterRepository
					.findByCostcenterByActive(userDetails.getCost_center(), true);

			if (costCenterModel.isPresent()) {
				CostCenterModels.add(costCenterModel.get());
			}
			return ResponseHandler.generateResponse("List of Cost centers", true, HttpStatus.OK, CostCenterModels);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get by lead_id:" + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	// biz case dropdown
	@JsonView(CustomFields.MyResponseViews.class)
	@GetMapping("/getbizinfo")
	public ResponseEntity<Object> getBizcaseData() {
		try {
			List<BusinessCaseRequest> bizdata = bizcasereqrepo.findAllByActive(true);
			return ResponseHandler.generateResponse("List of Bizcase Information", true, HttpStatus.OK, bizdata);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while Bizcase data:" + e.getMessage());
			return ResponseHandler.generateResponse(e.getMessage(), false, HttpStatus.OK, null);
		}

	}

	// biz case dropdown for Report Model
	@JsonView(CustomFields.MyResponseViews.class)
	@GetMapping("/getbizinforeport")
	public ResponseEntity<Object> getBizcaseDataReport() {
		try {
			List<BusinessCaseRequest> bizdata = bizcasereqrepo.findAllByActive(true);
			return ResponseHandler.generateResponse("List of Bizcase Information", true, HttpStatus.OK, bizdata);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while Bizcase data:" + e.getMessage());
			return ResponseHandler.generateResponse(e.getMessage(), false, HttpStatus.OK, null);
		}

	}

	// Approval Controls

	@GetMapping("/approval/{RequestId}")
	public ResponseEntity<Object> findAllApprovalsBizCaseRequest(@PathVariable(value = "RequestId") Long RequestId,
			Pageable pageable) {
		try {
			Page<BusinessApprovalsModel> BizCaseApprovaldata = bizcaseapprovalrepo.findByRequestId(pageable, RequestId);
			return ResponseHandler.generateResponse("List of Business Case Approvals", true, HttpStatus.OK,
					BizCaseApprovaldata);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get by approval_id:" + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	// Single Approval with FileUpload Option
	@RequestMapping(value = "/singalproviderapproval", method = RequestMethod.POST, consumes = {
			"multipart/form-data" })
	public ResponseEntity<Object> bizCaseApprovalData(@Valid @ModelAttribute BizCaseApproval bizcaseapproval,
			Authentication authentication) {
		try {
			List<SupportingFiles> supportingfiles = new ArrayList<>();
			return bizcasereqrepo.findById(bizcaseapproval.getBiz_case_id()).map(bizrequest -> {

				if (bizrequest.getOverall_status().equals(false)) {
					if (bizcaseapproval.getSupporting_files() != null) {

						Arrays.asList(bizcaseapproval.getSupporting_files()).stream().forEach(file -> {
							SupportingFiles currentFiles = new SupportingFiles();
							String filename = storageServicepath.save(file);
							currentFiles.setSupporting_files_name(filename);
							currentFiles.setSupporting_files_url(env.getProperty("hostname.name")
									+ "/api/businesscaserequest/attachmens/" + filename);
							supportingfiles.add(currentFiles);
						});
					}

					UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
					if (userDetails == null)
						return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);

					BusinessApprovalsModel bizcaseappdata = new BusinessApprovalsModel();
					bizcaseappdata.setShort_id(userDetails.getShortid());
					bizcaseappdata.setApprove_type("Single");
					bizcaseappdata.setApprove_sequence(false);
					bizcaseappdata.setApprover_name(userDetails.getUsername());
					bizcaseappdata.setApprover_email(userDetails.getEmail());
					bizcaseappdata.setApprover_description(bizcaseapproval.getApprover_description());
					bizcaseappdata.setSupporting_files(supportingfiles);
					bizcaseappdata
							.setRequest_date(LocalDateTime.now(ZoneId.of(env.getProperty("spring.app.timezone"))));
					bizcaseappdata.setRequest(bizrequest);
					bizcaseappdata.setEmail_status("Approved");
					bizcaseappdata.setStatus(true);

					bizrequest.setService_provider_approve(true);
					bizrequest.setService_receiver_approve(true);
					bizrequest.setOverall_status(true);
					bizrequest.setStatus("IO Number Not Mapped");
					bizrequest.setApproval_type("Single");

					long delay_count = ChronoUnit.DAYS.between(bizrequest.getLead().getCreate_date(),
							LocalDateTime.now(ZoneId.of(env.getProperty("spring.app.timezone"))));

					LeadConversionModel leadConversionModel = new LeadConversionModel();
					leadConversionModel.setLevel_start_date(bizrequest.getLead().getCreate_date());
					leadConversionModel
							.setLevel_end_date(LocalDateTime.now(ZoneId.of(env.getProperty("spring.app.timezone"))));
					leadConversionModel.setDelay_days(delay_count);
					leadConversionModel.setConversion_period("IL2 - IL3");
					if (delay_count <= 5 && delay_count >= 0)
						leadConversionModel.setColour("rgb(0, 150, 30)");
					else if (delay_count <= 10 && delay_count >= 6)
						leadConversionModel.setColour("rgb(255, 205, 86)");
					else if (delay_count > 10)
						leadConversionModel.setColour("rgb(255, 99, 132)");
					else
						LOGGER.error("Exceptions happen!: Invalid Range: Days " + delay_count);
					leadConversionModel.setLead(bizrequest.getLead());

					LeadRequestModel leadRequestModel = bizrequest.getLead();
					leadRequestModel
							.setCreate_date(LocalDateTime.now(ZoneId.of(env.getProperty("spring.app.timezone"))));
					leadRequestModel.setCategory_status("approved");

					// Create Project Details
					ProjectModel projectModel = new ProjectModel();
					projectModel.setProject_id("PRO" + getRandomNumberString());
					projectModel.setProject_name(leadRequestModel.getProject_name());
					projectModel.setService_provider(leadRequestModel.getService_provider_contact_name());
					projectModel.setService_provider_shortid(leadRequestModel.getService_provider_short_id());
					projectModel.setService_receiver(leadRequestModel.getService_receiver_contact_name());
					projectModel.setService_receiver_shortid(leadRequestModel.getService_receiver_short_id());
					projectModel.setCost_center(leadRequestModel.getService_provider_cost_center());
					projectModel.setTotal_fte_count(
							Long.parseLong(bizrequest.getManpower_requirements().get(0).getTotal()));
					projectModel.setWorking_hours(bizrequest.getWorking_hours());
					projectModel.setStatus("IO Number Not Mapped");
					projectModel.setBizcase(bizrequest);

					bizcasereqrepo.save(bizrequest);
					BusinessApprovalsModel BizCaseapprinsertdata = bizcaseapprovalrepo.save(bizcaseappdata);

					leadConversionRepository.save(leadConversionModel);
					leadreq_repository.save(leadRequestModel);
					projectRepository.save(projectModel);
					return ResponseHandler.generateResponse("Bussiness Case Approved Successfully", true, HttpStatus.OK,
							BizCaseapprinsertdata);
				} else {
					LOGGER.error("Exceptions happen!: Business is already approve ");
					return ResponseHandler.generateResponse("Business is already approve ", false, HttpStatus.OK, null);
				}

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: RequestId " + bizcaseapproval.getBiz_case_id() + " Doesn't exist");
				return ResponseHandler.generateResponse(
						"RequestId " + bizcaseapproval.getBiz_case_id() + " Doesn't exist", false, HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while singleapprovalrequest : " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					e.getStackTrace());
		}
	}

	public String getRandomNumberString() {
		Random rnd = new Random();
		int number = rnd.nextInt(9999999);

		// this will convert any number sequence into 6 character.
		return String.format("%07d", number);
	}

	// Multiple Approval without FileUpload Option
	@PostMapping(value = "/multiproviderapproval/{RequestId}")
	public ResponseEntity<Object> bizCaseApprovalDatas(@PathVariable(value = "RequestId") Long RequestId,
			@Valid @RequestBody List<BusinessApprovalsModel> bizcaseapproval) {
		try {
			return bizcasereqrepo.findById(RequestId).map(bizrequest -> {

//		    	        	if(bizrequest.getOverall_status().equals(false))
//		    	        	{
//		    	        		if(bizrequest.getApprovals().isEmpty())
//		    	        		{
				for (BusinessApprovalsModel bizdata : bizcaseapproval) {
					if (bizdata.getSequence_level() != null) {
						BusinessApprovalsModel bizcaseappdata = new BusinessApprovalsModel();
						bizcaseappdata.setShort_id(bizdata.getShort_id());
						bizcaseappdata.setApprove_type("Multi");
						bizcaseappdata.setApprove_sequence(true);
						bizcaseappdata.setSequence_level(bizdata.getSequence_level());
						bizcaseappdata.setApprover_name(bizdata.getApprover_name());
						bizcaseappdata.setApprover_email(bizdata.getApprover_email());
						bizcaseappdata
								.setRequest_date(LocalDateTime.now(ZoneId.of(env.getProperty("spring.app.timezone"))));
						bizcaseappdata.setEmail_status("Pending");
						bizcaseappdata.setRequest(bizrequest);
						bizcaseappdata.setStatus(false);
						BusinessApprovalsModel saveapprovedata = bizcaseapprovalrepo.save(bizcaseappdata);

						bizrequest.setApproval_type("Multi");
						bizcasereqrepo.save(bizrequest);

						if (bizdata.getSequence_level() == 1) {
							// Send Notification to User

							notificationServices.NotificationPojo("G3C Admin", bizdata.getApprover_name(),
									bizrequest.getApproved_receiver_Shortid(),
									"New Approve Request for Business Case Requirement", "business/leads-monitoring");

							String tokenString = tokenGeneratorService.gettokenforapproves(bizcaseappdata);
							String redirecturl = env.getProperty("g3c.frontend.app.domain") + bizrequest.getId() + "/"
									+ saveapprovedata.getId() + "/provider/" + tokenString;
							// Send Email to user
							if (bizdata.getApprover_name() == null) {

								return ResponseHandler.generateResponse("Approver Name Null", false, HttpStatus.OK,
										null);
							}
							Map<String, Object> approve_model = new HashMap<>();
							approve_model.put("reciverName", bizdata.getApprover_name());
							approve_model.put("redirecturl", redirecturl);
							approve_model.put("projectName", bizrequest.getLead().getProject_name());
							emailService.sendProviderApproveMail(bizdata.getApprover_email(),
									"G3C Business Case Approval" + " - " + bizrequest.getLead().getProject_name(),
									approve_model);
						}
					} else {

						return ResponseHandler.generateResponse("Please Provide Valid Approve Sequence", false,
								HttpStatus.OK, null);
					}

				}
				return ResponseHandler.generateResponse("Approve Mail Sent Successfully", true, HttpStatus.OK, null);
//		    	        		}
//		    	        		else
//		    	        		{
//			    	        		LOGGER.error("Exceptions happen!: Business is already created approve ");
//				    	    		return ResponseHandler.generateResponse("Business is already created approve ", false, HttpStatus.OK, null);
//		    	        		}
//			    		    	
//		    	        	}
//		    	        	else
//		    	        	{
//		    	        		LOGGER.error("Exceptions happen!: Business is already approve ");
//			    	    		return ResponseHandler.generateResponse("Business is already approve ", false, HttpStatus.OK, null);
//		    	        	}

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: RequestId " + RequestId + " Doesn't exist");
				return ResponseHandler.generateResponse("RequestId " + RequestId + " Doesn't exist", false,
						HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while multi provider approval : " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	@GetMapping("/resendemail/{id}")
	@ResponseBody
	public ResponseEntity<Object> resendEmailNotfication(@PathVariable Long id) {
		try {

			return bizcaseapprovalrepo.findById(id).map(approvaldata -> {

				if (approvaldata.getStatus().equals(false)) {
					String tokenString = tokenGeneratorService.gettokenforapproves(approvaldata);
					String redirecturl = "";
					if (approvaldata.getApprove_type().equalsIgnoreCase("Receiver")) {
						redirecturl = env.getProperty("g3c.frontend.app.domain") + approvaldata.getRequest().getId()
								+ "/" + approvaldata.getId() + "/receiver/" + tokenString;
					} else {
						redirecturl = env.getProperty("g3c.frontend.app.domain") + approvaldata.getRequest().getId()
								+ "/" + approvaldata.getId() + "/provider/" + tokenString;
					}

					Map<String, Object> approve_model = new HashMap<>();
					approve_model.put("reciverName", approvaldata.getApprover_name());
					approve_model.put("redirecturl", redirecturl);
					approve_model.put("projectName", approvaldata.getRequest().getLead().getProject_name());
					emailService.sendProviderApproveMail(approvaldata.getApprover_email(), "G3C Business Case Approval"
							+ " - " + approvaldata.getRequest().getLead().getProject_name(), approve_model);
					return ResponseHandler.generateResponse("E-Mail Notification Sent Successfully", true,
							HttpStatus.OK, null);
				} else {

					return ResponseHandler.generateResponse("This user already Approved", true, HttpStatus.OK, null);
				}

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Approve ID  " + id + " Doesn't exist");
				return ResponseHandler.generateResponse("Approve ID " + id + " Doesn't exist", false, HttpStatus.OK,
						null);
			});
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while multi provider approval : " + e.getMessage());
			return ResponseEntity.notFound().build();
		}

	}

	@GetMapping("/attachmens/{filename:.+}")
	@ResponseBody
	public ResponseEntity<Resource> getFile(@PathVariable String filename) {
		try {

			Resource file = storageServicepath.load(filename);
			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
					.body(file);
		} catch (Exception e) {
			LOGGER.error("File doesn't exist Error: " + e.getMessage());
			return ResponseEntity.notFound().build();
		}

	}

	@PutMapping("/removedocs/{id}/{filename}")
	public ResponseEntity<Object> removeAttachements(@PathVariable Long id, @PathVariable String filename) {
		try {

			return bizcaseapprovalrepo.findById(id).map(updatedata -> {

				for (SupportingFiles currentfile : updatedata.getSupporting_files()) {
					if (currentfile.getSupporting_files_name().equals(filename)) {
						updatedata.getSupporting_files().remove(currentfile);
						storageServicepath.delete(currentfile.getSupporting_files_name());
						break;
					}
				}
				bizcaseapprovalrepo.save(updatedata);

				return ResponseHandler.generateResponse("File Remove Successfully", true, HttpStatus.OK, null);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: ApprovalID " + id + " Doesn't exist to remove attachment");
				return ResponseHandler.generateResponse("ApprovalID " + id + " Doesn't exist to remove attachment",
						false, HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while removeDocs in ApprovalID: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	@PutMapping("/updatejdmapping/{id}")
	public ResponseEntity<Object> updatejdmapping(@PathVariable Long id, @RequestBody BusinessCaseRequest bizdata) {
		try {

			return bizcasereqrepo.findById(id).map(bizcasedata -> {

				Date date = new Date();

				SimpleDateFormat simpleDateFormat = new SimpleDateFormat();
				simpleDateFormat.applyPattern("yyyy");
				String format = simpleDateFormat.format(date);

				bizcasedata.setActiveIoNumber(bizdata.getActiveIoNumber());

				ProjectModel projectData = bizcasedata.getProject();

				if (projectData != null) {

					bizcasedata.getProject().setActiveIoNumber(bizdata.getActiveIoNumber());
					bizcasedata.getProject().setActiveIoYear(format);
					bizcasedata.getProject().setStatus("Approved");
					bizcasedata.setStatus("Approved");

				}

				bizcasereqrepo.save(bizcasedata);

				return ResponseHandler.generateResponse("IO Number Updated Successfully", true, HttpStatus.OK,
						bizcasedata);

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Business Case ID " + id + " Doesn't exist");
				return ResponseHandler.generateResponse("Business Case ID " + id + " Doesn't exist", false,
						HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while updating JD Mapping: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}
}

package com.intelizign.dmgcc.controllers;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

import javax.validation.Valid;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.BeanUtils;
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
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.intelizign.dmgcc.authendication.UserDetailsImpl;
import com.intelizign.dmgcc.models.FileUploadModel;
import com.intelizign.dmgcc.models.NotificationModel;
import com.intelizign.dmgcc.models.ProjectModel;
import com.intelizign.dmgcc.models.SLAApproval;
import com.intelizign.dmgcc.models.SLAInvoiceModel;
import com.intelizign.dmgcc.models.SLAModel;
import com.intelizign.dmgcc.models.SLAPreInvoiceModel;
import com.intelizign.dmgcc.models.othermaster.G3CMarketValueModel;
import com.intelizign.dmgcc.models.othermaster.MaterailCodeModel;
import com.intelizign.dmgcc.models.othermaster.MySccCostcenterModel;
import com.intelizign.dmgcc.notification.NotificationServices;
import com.intelizign.dmgcc.pojoclass.MySSCSLAModel;
import com.intelizign.dmgcc.pojoclass.SLAContacts;
import com.intelizign.dmgcc.pojoclass.SLATariffSheet;
import com.intelizign.dmgcc.pojoclass.SLAcycle;
import com.intelizign.dmgcc.repositories.FileUploadRepository;
import com.intelizign.dmgcc.repositories.NotificationRepository;
import com.intelizign.dmgcc.repositories.ProjectRepository;
import com.intelizign.dmgcc.repositories.SLAInvoiceRepository;
import com.intelizign.dmgcc.repositories.SLAPreInvoiceRepository;
import com.intelizign.dmgcc.repositories.SLARepository;
import com.intelizign.dmgcc.repositories.SLAapprovalRepository;
import com.intelizign.dmgcc.repositories.othermaster.G3CMarketValueRepository;
import com.intelizign.dmgcc.repositories.othermaster.MaterialCodeRepository;
import com.intelizign.dmgcc.repositories.othermaster.MySccCostcenterRepository;
import com.intelizign.dmgcc.request.C4Drequest;
import com.intelizign.dmgcc.request.PreInvoiceInforequest;
import com.intelizign.dmgcc.request.SLAPreInvoiceRequest;
import com.intelizign.dmgcc.request.SLARequest;
import com.intelizign.dmgcc.request.SupportingFiles;
import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.response.SLACreateResponse;
import com.intelizign.dmgcc.response.SLAPreInvoiceResponse;
import com.intelizign.dmgcc.response.myssc.MySSCSLAResponse;
import com.intelizign.dmgcc.services.C4DSLAService;
import com.intelizign.dmgcc.services.EmailServiceImpl;
import com.intelizign.dmgcc.services.FilesStorageServicePath;
import com.intelizign.dmgcc.services.MySSCAPIServices;
import com.intelizign.dmgcc.services.SLAPreInvoiceService;
import com.intelizign.dmgcc.services.SLASchedulerServices;
import com.intelizign.dmgcc.services.SLAService;
import com.intelizign.dmgcc.services.TokenGeneratorService;

@RestController
@RequestMapping("/sla")
public class SLAController {

	@Autowired
	private SLARepository slaRepository;

	@Autowired
	private SLAPreInvoiceRepository slaPreInvoiceRepository;

	@Autowired
	private SLAInvoiceRepository slaInvoiceRepository;

	@Autowired
	private SLAapprovalRepository slaApprovalRepository;

	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private SLAService slaservice;

	@Autowired
	private EmailServiceImpl emailService;

	@Autowired
	private TokenGeneratorService tokenGeneratorService;

	@Autowired
	FilesStorageServicePath storageServicepath;

	@Autowired
	C4DSLAService c4DSLAService;

	@Autowired
	private SLAPreInvoiceService preInvoiceService;

	@Autowired
	private Environment env;

	@Autowired
	private SLASchedulerServices slaSchedulerServices;

	@Autowired
	private FileUploadRepository fileUploadRepository;

	@Autowired
	private MaterialCodeRepository materialCodeRepository;

	@Autowired
	private MySccCostcenterRepository mySccCostcenterRepository;

	@Autowired
	private MySSCAPIServices mysscslaservice;

	@Autowired
	SimpMessagingTemplate template;

	@Autowired
	private NotificationRepository notificationRepository;

	@Autowired
	private NotificationServices notificationServices;

	@Autowired
	private G3CMarketValueRepository g3cMarketValueRepository;

	SLAModel sladata = new SLAModel();

	SLAPreInvoiceModel slaPreInvoiceModel = new SLAPreInvoiceModel();

	SLAPreInvoiceResponse slaPreInvoiceResponse = new SLAPreInvoiceResponse();

	public final Logger LOGGER = LogManager.getLogger(SLAController.class);

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public Map<String, String> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
		Map<String, String> errors = new HashMap<>();
		ex.getBindingResult().getFieldErrors()
				.forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
		return errors;
	}

	@GetMapping("")
	public ResponseEntity<Object> FindAllSLAEstimation(@RequestParam String Searchkeyword,
			@PageableDefault(size = 10, page = 0, sort = "id", direction = Direction.DESC) Pageable pageable) {
		try {
			Page<SLAModel> slaestimation = slaRepository.findByIsactive(true, Searchkeyword, pageable);
			return ResponseHandler.generateResponse("List of SLA", true, HttpStatus.OK, slaestimation);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error:" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@GetMapping("/{id}")
	public ResponseEntity<Object> FindSLAEstimation(@PathVariable Long id) {
		try {
			return slaRepository.findById(id).map(requestData -> {
				return ResponseHandler.generateResponse("SLA Found", true, HttpStatus.OK, requestData);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: " + id + " SLA ID Doesn't exist");
				return ResponseHandler.generateResponse(id + " SLA ID Doesn't exist", false, HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Exceptions happen!:SLA ID " + id + " Doesn't exist DB Error: " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@PostMapping("/c4dsla")
	public ResponseEntity<Object> createSLAAgreement(@RequestBody C4Drequest requestdata) {

		return c4DSLAService.createSLAAgreement(requestdata);

	}

	@PostMapping("/savec4dsla/{project_id}")
	public ResponseEntity<Object> SaveSLAAgreement(@PathVariable(value = "project_id") Long project_id,
			@RequestBody SLAModel sladata, Authentication authentication) {

		try {
			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);
			return projectRepository.findById(project_id).map(projectdata -> {
				sladata.setStatus("Approved");
				sladata.setProject(projectdata);
				sladata.setIs_c4dsla(true);
				sladata.setCreated_by(userDetails.getShortid());
				SLAModel saved_sladata = slaRepository.save(sladata);
				List<SLAcycle> slaCycles = slaservice.getSLAcycle(saved_sladata);
				saved_sladata.setInvoice_cycle(slaCycles);
				SLAModel c4d_saved_sladata = slaRepository.save(saved_sladata);

				MySSCSLAModel mySSSLAModel = new MySSCSLAModel();
				Optional<G3CMarketValueModel> g3cMarketValueModel = g3cMarketValueRepository.findById((long) 1);
				BeanUtils.copyProperties(sladata, mySSSLAModel);
				if (g3cMarketValueModel.isPresent()) {
					mySSSLAModel.setMark_value(g3cMarketValueModel.get().getMarkup_value());
				}
				mySSSLAModel.setFte(slaservice.findFTEValue(sladata.getSla_tariffsheet(), sladata.getContract_option(),
						projectdata));

				MySSCSLAResponse response_from_myssc = mysscslaservice.getSlaidfromMySSC(mySSSLAModel);
				if (response_from_myssc.getIsSuccess().equals(true) && response_from_myssc.getHttpStatusCode() == 200) {
					c4d_saved_sladata.setSlaid(response_from_myssc.getData().getSlaid());
					LOGGER.error("MySSC SLA Created");
				} else {
					slaRepository.deleteById(sladata.getId());
					return ResponseHandler.generateResponse("SLA Data not inserted in MySSC", false, HttpStatus.OK,
							response_from_myssc);
				}

				projectdata.setActive("Active");
				projectRepository.save(projectdata);
				return ResponseHandler.generateResponse("C4DSLA Saved Successfully", true, HttpStatus.OK,
						c4d_saved_sladata);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: ProjectID " + project_id + " Doesn't exist");
				return ResponseHandler.generateResponse("ProjectID " + project_id + " Doesn't exist", false,
						HttpStatus.OK, null);
			});

		} catch (Exception e) {
			if (sladata.getId() != 0) {
				slaRepository.delete(sladata);
				LOGGER.error("SLA Deleted");
			}
			LOGGER.error("Error while insert Record in SLA Creation" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, e.getStackTrace());
		}

	}

	@GetMapping("/getprojectdetails/{ProjectId}")
	public ResponseEntity<Object> getSlaDataToCreate(@PathVariable(value = "ProjectId") Long ProjectId) {
		try {
			return projectRepository.findById(ProjectId).map(projectdata -> {
				SLACreateResponse sla_response = slaservice.getSLADetailsToCreate(projectdata);
				return ResponseHandler.generateResponse("SLA Project Details", true, HttpStatus.OK, sla_response);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: ProjectID " + ProjectId + " Doesn't exist");
				return ResponseHandler.generateResponse("ProjectID " + ProjectId + " Doesn't exist", false,
						HttpStatus.OK, null);
			});

		} catch (Exception e) {

			LOGGER.error("Error while insert Record in SLA Creation" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	@PostMapping("/{ProjectId}")
	public ResponseEntity<Object> SLAEstimationLoadData(@PathVariable(value = "ProjectId") Long ProjectId,
			@Valid @RequestBody SLARequest slaRequest, Authentication authentication) {
		try {
			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);
			return projectRepository.findById(ProjectId).map(projectdata -> {
				sladata = new SLAModel();

				SLAModel slaModel = new SLAModel();
				String test_slaid = UUID.randomUUID().toString().replace("-", "").substring(16);
//				String test_slaid = "4428/0804-2-2023-04-08-018";
				slaModel.setSlaid(test_slaid);
				slaModel.setSlaname(slaRequest.getSlaname());
				slaModel.setCustomer_company(slaRequest.getCustomer_company());
				slaModel.setCustomer_name(slaRequest.getCustomer_name());
				slaModel.setCustomer_country(slaRequest.getCustomer_country());
				slaModel.setCustomer_address(slaRequest.getCustomer_address());
				slaModel.setCustomer_entity_code(slaRequest.getCustomer_entity_code());
				slaModel.setProject_name(projectdata.getProject_name());
				slaModel.setProject_code(projectdata.getProject_id());
				slaModel.setTeam(slaRequest.getTeam());
				slaModel.setProvider_name(slaRequest.getProvider_name());
				slaModel.setProvider_cost_center(projectdata.getCost_center());
				slaModel.setCurrency(slaRequest.getCurrency());
				slaModel.setStart_date(slaRequest.getStart_date());
				slaModel.setEnd_date(slaRequest.getEnd_date());
				slaModel.setEffective_date(slaRequest.getEffective_date());
				slaModel.setContract_status(slaRequest.getContract_status());
				slaModel.setContract_option(slaRequest.getContract_option());
				slaModel.setCustomer_cost_center(slaRequest.getCustomer_cost_center());
				slaModel.setCustomer_cost_center_manager(slaRequest.getCustomer_cost_center_manager());
				slaModel.setOrganization_type(slaRequest.getOrganization_type());
				slaModel.setService_description(slaRequest.getService_description());
				slaModel.setBilling_cycle(slaRequest.getBilling_cycle());
				slaModel.setSla_io(slaRequest.getSla_io());
				slaModel.setSla_po(slaRequest.getSla_po());
				slaModel.setSla_contacts(slaRequest.getSla_contacts());
				slaModel.setRevenue_cost_center(slaRequest.getRevenue_cost_center());
				slaModel.setProject(projectdata);
				slaModel.setCreated_by(userDetails.getShortid());
				// need to calculate total budget as per requirement

				List<SLATariffSheet> sla_tariffsheet = slaRequest.getSla_tariffsheet();
				double total_sla_tariff_value = slaservice.findSlaTotalBudget(sla_tariffsheet, slaRequest);

				slaModel.setSla_tariffsheet(sla_tariffsheet);
				slaModel.setTotal_budget((long) total_sla_tariff_value);
				slaModel.setIs_active(true);
				slaModel.setStatus("In-Progress");
				slaModel.setInvoice_status("Payment Not Initiated");
				DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
				LocalDate start_date = LocalDate.parse(slaRequest.getStart_date(), formatter);
				LocalDate end_date = LocalDate.parse(slaRequest.getEnd_date(), formatter);
				if (LocalDate.now().isAfter(start_date) && LocalDate.now().isBefore(end_date)) {
					slaModel.setActive("Active");
				} else {
					slaModel.setActive("Inactive");
				}
				slaModel.setSla_terms_and_conditions(slaRequest.getSla_terms_and_conditions());
				slaModel.setAttachments(slaRequest.getAttachments());
				sladata = slaRepository.save(slaModel);

				// MYSSC Service Calucalation

				LOGGER.error("SLA " + sladata);

				// MySSCSLAModel mySSSLAModel = new MySSCSLAModel();
				// Optional<G3CMarketValueModel> g3cMarketValueModel = g3cMarketValueRepository.findById((long) 1);
				// BeanUtils.copyProperties(slaModel, mySSSLAModel);
				// if (g3cMarketValueModel.isPresent()) {
				// 	mySSSLAModel.setMark_value(g3cMarketValueModel.get().getMarkup_value());
				// }

				// LOGGER.error("SLA " + mySSSLAModel.getMark_value());
				// mySSSLAModel
				// 		.setFte(slaservice.findFTEValue(sla_tariffsheet, slaRequest.getContract_option(), projectdata));

				// MySSCSLAResponse response_from_myssc = mysscslaservice.getSlaidfromMySSC(mySSSLAModel);
				// if (response_from_myssc.getIsSuccess().equals(true) && response_from_myssc.getHttpStatusCode() == 200) {
				// 	sladata.setSlaid(response_from_myssc.getData().getSlaid());
				// 	LOGGER.error("MySSC SLA Created");
				// } else {
				// 	slaRepository.deleteById(sladata.getId());
				// 	return ResponseHandler.generateResponse("SLA Data not inserted in MySSC", false, HttpStatus.OK,
				// 			response_from_myssc);
				// }

				List<SLAContacts> slacontacts = new ArrayList<>();
				for (SLAContacts slaReq : sladata.getSla_contacts()) {
					if (Boolean.TRUE.equals(slaReq.getIs_sla())) {
						slacontacts.add(slaReq);
					}
				}
				String outputFilename = sladata.getSlaid();
				String finaloutputfilename = outputFilename.replace("/", "_");
				try {
					slaservice.xhtmlToPdf(sladata, finaloutputfilename, slacontacts);
				} catch (Exception e) {
					e.printStackTrace();
				}

				FileUploadModel generatedFiles = new FileUploadModel();
				generatedFiles.setSupporting_files_name(finaloutputfilename + ".pdf");
				generatedFiles.setSupporting_files_url(env.getProperty("hostname.name")
						+ "/api/public/attachments?filename=" + finaloutputfilename + ".pdf");
				generatedFiles.setMapped(true);
				FileUploadModel mapped_pdf = fileUploadRepository.save(generatedFiles);

				SupportingFiles slapdf = new SupportingFiles();
				slapdf.setId(mapped_pdf.getId());
				slapdf.setSupporting_files_name(mapped_pdf.getSupporting_files_name());
				slapdf.setSupporting_files_url(mapped_pdf.getSupporting_files_url());

				sladata.setSla_argeement_document(slapdf);
				slaRepository.save(sladata);

				for (SupportingFiles sla_term : slaRequest.getSla_terms_and_conditions()) {
					FileUploadModel fileUploadModel = new FileUploadModel();
					fileUploadModel.setId(sla_term.getId());
					fileUploadModel.setSupporting_files_url(sla_term.getSupporting_files_url());
					fileUploadModel.setMapped(true);
					fileUploadRepository.save(fileUploadModel);
				}

				for (SLAContacts slaReq : slacontacts) {
					SLAApproval sla_approval = slaservice.slaApprovalsSave(slaReq, sladata.getId());
					sla_approval.setSla(sladata);
					slaApprovalRepository.save(sla_approval);
					SLAApproval slaApproveData = tokenGeneratorService.getTokenForSLA(sla_approval);
					String sla_token = slaApproveData.getSla_token();
					String redirecturl = env.getProperty("g3c.frontend.app") + "sla-approvals/" + slaApproveData.getId()
							+ "/" + sladata.getId() + "/" + sla_token;

					// Send Notification
					List<NotificationModel> listnotificationdataList = notificationRepository
							.findByShortidAndActive(slaReq.getShort_name(), true);
					NotificationModel newNotificationModel = new NotificationModel();
					newNotificationModel.setMessage("SLA Approval by Email");
					newNotificationModel.setSend_by("G3C Admin");
					newNotificationModel.setUrl("SLA/biz-case-sla");
					newNotificationModel.setSend_to(slaReq.getName());
					newNotificationModel
							.setCreate_date(LocalDateTime.now(ZoneId.of(env.getProperty("spring.app.timezone"))));
					newNotificationModel.setIs_active(true);
					newNotificationModel.setShortid(slaReq.getShort_name());
					notificationRepository.save(newNotificationModel);

					listnotificationdataList.add(newNotificationModel);
					template.convertAndSendToUser(slaReq.getShort_name(), "/messages", listnotificationdataList);

					notificationServices.NotificationPojo("G3C Admin", slaReq.getName(), slaReq.getShort_name(),
							"SLA Approval by Email", "SLA/biz-case-sla");

					// Send Email to user
					Map<String, Object> sla_approve_model = new HashMap<>();
					sla_approve_model.put("reciverName", slaReq.getName());
					sla_approve_model.put("redirecturl", redirecturl);
					System.out.println(redirecturl);
					emailService.sendSLAApproveMail(slaReq.getEmail(), "G3C SLA Approval", sla_approve_model, sladata,
							finaloutputfilename);
				}
				projectdata.setActive("Active");
				projectRepository.save(projectdata);

				return ResponseHandler.generateResponse("SLA Created Successfully", true, HttpStatus.OK, sladata);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: ProjectID " + ProjectId + " Doesn't exist");
				return ResponseHandler.generateResponse("ProjectID " + ProjectId + " Doesn't exist", false,
						HttpStatus.OK, null);
			});

		} catch (Exception e) {

			if (sladata.getId() != 0) {
				slaRepository.delete(sladata);
				LOGGER.error("SLA Deleted");
			}
			LOGGER.error("Error while insert Record in SLA Creation" + e.getMessage());
			return ResponseHandler.generateResponse("Error while insert Record in SLA Creation" + e.getMessage(), false,
					HttpStatus.OK, sladata);
		}
	}

	@PutMapping("/updatesla/{slaId}")
	public ResponseEntity<Object> updateSLA(@PathVariable(value = "slaId") Long slaId,
			@Valid @RequestBody SLARequest slaRequest, Authentication authentication) {
		try {
			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);
			return slaRepository.findById(slaId).map(slaModel -> {
				slaModel.setSlaname(slaRequest.getSlaname());
				slaModel.setCustomer_company(slaRequest.getCustomer_company());
				slaModel.setCustomer_name(slaRequest.getCustomer_name());
				slaModel.setCustomer_address(slaRequest.getCustomer_address());
				slaModel.setCustomer_entity_code(slaRequest.getCustomer_entity_code());
				slaModel.setTeam(slaRequest.getTeam());
				slaModel.setProvider_name(slaRequest.getProvider_name());
				slaModel.setCurrency(slaRequest.getCurrency());
				slaModel.setStart_date(slaRequest.getStart_date());
				slaModel.setEnd_date(slaRequest.getEnd_date());
				slaModel.setEffective_date(slaRequest.getEffective_date());
				slaModel.setContract_status(slaRequest.getContract_status());
				slaModel.setContract_option(slaRequest.getContract_option());
				slaModel.setCustomer_cost_center(slaRequest.getCustomer_cost_center());
				slaModel.setCustomer_cost_center_manager(slaRequest.getCustomer_cost_center_manager());
				slaModel.setOrganization_type(slaRequest.getOrganization_type());
				slaModel.setService_description(slaRequest.getService_description());
				slaModel.setBilling_cycle(slaRequest.getBilling_cycle());
				slaModel.setSla_io(slaRequest.getSla_io());
				slaModel.setSla_po(slaRequest.getSla_po());
				slaModel.setSla_contacts(slaRequest.getSla_contacts());
				slaModel.setRevenue_cost_center(slaRequest.getRevenue_cost_center());
				slaModel.setCreated_by(userDetails.getShortid());
				// need to calculate total budget as per requirement

				List<SLATariffSheet> sla_tariffsheet = slaRequest.getSla_tariffsheet();
				double total_sla_tariff_value = slaservice.findSlaTotalBudget(sla_tariffsheet, slaRequest);

				slaModel.setSla_tariffsheet(sla_tariffsheet);
				slaModel.setTotal_budget((long) total_sla_tariff_value);
				slaModel.setIs_active(true);
				slaModel.setStatus("In-Progress");
				slaModel.setInvoice_status("Payment Not Initiated");
				DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
				LocalDate start_date = LocalDate.parse(slaRequest.getStart_date(), formatter);
				LocalDate end_date = LocalDate.parse(slaRequest.getEnd_date(), formatter);
				if (LocalDate.now().isAfter(start_date) && LocalDate.now().isBefore(end_date)) {
					slaModel.setActive("Active");
				} else {
					slaModel.setActive("Inactive");
				}
				slaModel.setSla_terms_and_conditions(slaRequest.getSla_terms_and_conditions());
				slaModel.setAttachments(slaRequest.getAttachments());
				SLAModel sladata = slaRepository.save(slaModel);

				// MYSSC Service Calucalation

				LOGGER.error("SLA " + sladata);

//				MySSCSLAModel mySSSLAModel = new MySSCSLAModel();
//				Optional<G3CMarketValueModel> g3cMarketValueModel = g3cMarketValueRepository.findById((long) 1);
//				BeanUtils.copyProperties(slaModel, mySSSLAModel);
//				if (g3cMarketValueModel.isPresent()) {
//					mySSSLAModel.setMark_value(g3cMarketValueModel.get().getMarkup_value());
//				}
//				mySSSLAModel.setFte(slaservice.findFTEValue(sla_tariffsheet, slaRequest.getContract_option(),
//						slaModel.getProject()));
//				MySSCSLAResponse response_from_myssc = mysscslaservice.updateSla(mySSSLAModel);
//				if (response_from_myssc.getIsSuccess().equals(true) && response_from_myssc.getHttpStatusCode() == 200) {
//					sladata.setSlaid(response_from_myssc.getData().getSlaid());
//					LOGGER.error("MySSC SLA Created");
//				} else {
//					slaRepository.deleteById(sladata.getId());
//					return ResponseHandler.generateResponse("SLA not updated in MySSC", false, HttpStatus.OK,
//							response_from_myssc);
//				}

				List<SLAContacts> slacontacts = new ArrayList<>();
				for (SLAContacts slaReq : sladata.getSla_contacts()) {
					if (Boolean.TRUE.equals(slaReq.getIs_sla())) {
						slacontacts.add(slaReq);
					}
				}
				String outputFilename = sladata.getSlaid();
				String finaloutputfilename = outputFilename.replace("/", "_");
				try {
					slaservice.xhtmlToPdf(sladata, finaloutputfilename, slacontacts);
				} catch (Exception e) {
					e.printStackTrace();
				}

				FileUploadModel generatedFiles = new FileUploadModel();
				generatedFiles.setSupporting_files_name(finaloutputfilename + ".pdf");
				generatedFiles.setSupporting_files_url(env.getProperty("hostname.name")
						+ "/api/public/attachments?filename=" + finaloutputfilename + ".pdf");
				generatedFiles.setMapped(true);
				FileUploadModel mapped_pdf = fileUploadRepository.save(generatedFiles);

				SupportingFiles slapdf = new SupportingFiles();
				slapdf.setId(mapped_pdf.getId());
				slapdf.setSupporting_files_name(mapped_pdf.getSupporting_files_name());
				slapdf.setSupporting_files_url(mapped_pdf.getSupporting_files_url());

				sladata.setSla_argeement_document(slapdf);
				slaRepository.save(sladata);

				for (SupportingFiles sla_term : slaRequest.getSla_terms_and_conditions()) {
					FileUploadModel fileUploadModel = new FileUploadModel();
					fileUploadModel.setId(sla_term.getId());
					fileUploadModel.setSupporting_files_name(sla_term.getSupporting_files_name());
					fileUploadModel.setSupporting_files_url(sla_term.getSupporting_files_url());
					fileUploadModel.setMapped(true);
					fileUploadRepository.save(fileUploadModel);

				}

				for (SupportingFiles sla_attachment : slaRequest.getAttachments()) {
					FileUploadModel fileUploadModel = new FileUploadModel();
					fileUploadModel.setId(sla_attachment.getId());
					fileUploadModel.setSupporting_files_name(sla_attachment.getSupporting_files_name());
					fileUploadModel.setSupporting_files_url(sla_attachment.getSupporting_files_url());
					fileUploadModel.setMapped(true);
					fileUploadRepository.save(fileUploadModel);

				}

				for (SLAContacts slaReq : slacontacts) {
					SLAApproval sla_approval = slaservice.slaApprovalsSave(slaReq, sladata.getId());
					sla_approval.setSla(sladata);
					slaApprovalRepository.save(sla_approval);
					SLAApproval slaApproveData = tokenGeneratorService.getTokenForSLA(sla_approval);
					String sla_token = slaApproveData.getSla_token();
					String redirecturl = env.getProperty("g3c.frontend.app") + "sla-approvals/" + slaApproveData.getId()
							+ "/" + sladata.getId() + "/" + sla_token;

					// Send Notification

					notificationServices.NotificationPojo("G3C Admin", slaReq.getName(), slaReq.getShort_name(),
							"SLA Approval by Email", "SLA/biz-case-sla");

					// Send Email to user
					Map<String, Object> sla_approve_model = new HashMap<>();
					sla_approve_model.put("reciverName", slaReq.getName());
					sla_approve_model.put("redirecturl", redirecturl);
					emailService.sendSLAApproveMail(slaReq.getEmail(), "G3C SLA Approval", sla_approve_model, sladata,
							finaloutputfilename);
				}

				return ResponseHandler.generateResponse("SLA Updated Successfully", true, HttpStatus.OK, sladata);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: SLA ID " + slaId + " Doesn't exist");
				return ResponseHandler.generateResponse("SLA ID " + slaId + " Doesn't exist", false, HttpStatus.OK,
						null);
			});

		} catch (Exception e) {

			LOGGER.error("Error while insert Record in SLA Creation" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, e.getStackTrace());
		}
	}

	@PutMapping("/updatecontractoption/{sla_id}")
	public ResponseEntity<Object> UploadSLAContractStatus(@PathVariable Long sla_id,
			@Valid @RequestBody SLARequest slaRequest) {
		try {
			return slaRepository.findById(sla_id).map(slaupdatedata -> {
				slaupdatedata.setContract_status(slaRequest.getContract_status());
				SLAModel sladata = slaRepository.save(slaupdatedata);

				return ResponseHandler.generateResponse("SLA Contract Updated Successfully", true, HttpStatus.OK,
						sladata);

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: SLA ID " + sla_id + " Doesn't exist to Delete");
				return ResponseHandler.generateResponse("SLA ID " + sla_id + " Doesn't exist to Delete", false,
						HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Exceptions happen!: " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	@PutMapping("/updatecontacts/{sla_id}")
	public ResponseEntity<Object> UploadSLAContacts(@PathVariable Long sla_id,
			@Valid @RequestBody SLARequest slaRequest) {
		try {
			return slaRepository.findById(sla_id).map(slaupdatedata -> {
				slaupdatedata.setSla_contacts(slaRequest.getSla_contacts());
				SLAModel sladata = slaRepository.save(slaupdatedata);

				return ResponseHandler.generateResponse("SLA Contacts Updated Successfully", true, HttpStatus.OK,
						sladata);

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: SLA ID " + sla_id + " Doesn't exist to Delete");
				return ResponseHandler.generateResponse("SLA ID " + sla_id + " Doesn't exist to Delete", false,
						HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Exceptions happen!: " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Object> DeleteSLAEstimation(@PathVariable Long id) {
		try {
			return slaRepository.findById(id).map(updatedata -> {
				updatedata.setIs_active(false);
				slaRepository.save(updatedata);
				return ResponseHandler.generateResponse("Record Delete Successfully", true, HttpStatus.OK, null);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: SLA ID " + id + " Doesn't exist to Delete");
				return ResponseHandler.generateResponse("SLA ID " + id + " Doesn't exist to Delete", false,
						HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Exceptions happen!: " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	@GetMapping("/getslabyproject/{ProjectID}")
	public ResponseEntity<Object> FindLeadSLAEstimation(@PathVariable(value = "ProjectID") Long ProjectID,
			Pageable pageable) {
		try {
			Page<SLAModel> SLAEstimationdata = slaRepository.findByProjectId(ProjectID, pageable);
			return ResponseHandler.generateResponse("List of SLA Estimation based on Lead ID", true, HttpStatus.OK,
					SLAEstimationdata);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error:" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@PutMapping("/removeslatermsdocs/{id}/{doctype}/{filename}")
	public ResponseEntity<Object> removeAttachements(@PathVariable Long id, @PathVariable String doctype,
			@PathVariable String filename) {
		try {

			return slaRepository.findById(id).map(sladata -> {
				if (doctype.equalsIgnoreCase("sla_terms")) {
					for (SupportingFiles currentfile : sladata.getSla_terms_and_conditions()) {
						if (currentfile.getSupporting_files_name().equals(filename)) {
							sladata.getSla_terms_and_conditions().remove(currentfile);
							storageServicepath.delete(currentfile.getSupporting_files_name());
							break;
						}
					}
					slaRepository.save(sladata);

					return ResponseHandler.generateResponse("File Remove Successfully", true, HttpStatus.OK, null);
				} else if (doctype.equalsIgnoreCase("sla_attachement")) {
					for (SupportingFiles currentfile : sladata.getAttachments()) {
						if (currentfile.getSupporting_files_name().equals(filename)) {
							sladata.getAttachments().remove(currentfile);
							storageServicepath.delete(currentfile.getSupporting_files_name());
							break;
						}
					}
					slaRepository.save(sladata);

					return ResponseHandler.generateResponse("File Remove Successfully", true, HttpStatus.OK, null);
				} else {
					return ResponseHandler.generateResponse("Invalid Document Type Request", false, HttpStatus.OK,
							null);
				}

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: SLA ID " + id + " Doesn't exist to remove attachment");
				return ResponseHandler.generateResponse("SLA ID " + id + " Doesn't exist to remove attachment", false,
						HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while removeDocs: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
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

	@PutMapping("/closesla/{sla_id}")
	public ResponseEntity<Object> closeSLAEstimation(@PathVariable Long sla_id) {
		try {
			return slaRepository.findById(sla_id).map(updatedata -> {
				slaservice.closeSLA(updatedata);
				updatedata.setActive("closed");
				SLAModel sladata = slaRepository.save(updatedata);
				return ResponseHandler.generateResponse("Record Closed Successfully", true, HttpStatus.OK, sladata);

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: SLA ID " + sla_id + " Doesn't exist to Close");
				return ResponseHandler.generateResponse("SLA ID " + sla_id + " Doesn't exist to Close", false,
						HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Exceptions happen!: " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);

		}

	}

	// SLA PerInvoice

	@GetMapping("/slapreinvoice")
	public ResponseEntity<Object> FindAllSLAPreInvoice(@RequestParam String Searchkeyword,
			@PageableDefault(size = 10, page = 0, sort = "id", direction = Direction.DESC) Pageable pageable) {
		try {
			Page<SLAPreInvoiceModel> slaestimation = slaPreInvoiceRepository.findByActive(true, Searchkeyword,
					pageable);
			return ResponseHandler.generateResponse("List of SLA PreInvoice", true, HttpStatus.OK, slaestimation);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error:" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@GetMapping("/slapreinvoice/{id}")
	public ResponseEntity<Object> FindSLAPreInvoice(@PathVariable Long id) {
		try {
			return slaPreInvoiceRepository.findById(id).map(requestData -> {
				return ResponseHandler.generateResponse("SLA PreInvoice Found", true, HttpStatus.OK, requestData);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: " + id + " SLA PreInvoice ID Doesn't exist");
				return ResponseHandler.generateResponse(id + " SLA ID Doesn't exist", false, HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Exceptions happen!:SLA PreInvoice ID " + id + " Doesn't exist DB Error: " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@GetMapping("/slapreinvoicedropdown/{sla_id}")
	public ResponseEntity<Object> FindPreInvoiceBySLA(@PathVariable Long sla_id) {
		try {
			return slaRepository.findById(sla_id).map(requestData -> {
				List<SLAPreInvoiceModel> preinvoice = slaPreInvoiceRepository.findPreinvoicesBySla(requestData.getId());
				// Other preinvoices
				SLAPreInvoiceModel other_preinvoice = new SLAPreInvoiceModel();
				other_preinvoice.setId(null);
				other_preinvoice.setPreinvoice_period("Others");
				preinvoice.add(other_preinvoice);
				return ResponseHandler.generateResponse("SLA PreInvoice details", true, HttpStatus.OK, preinvoice);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: " + sla_id + " SLA PreInvoice ID Doesn't exist");
				return ResponseHandler.generateResponse(sla_id + " SLA ID Doesn't exist", false, HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Exceptions happen!:SLA  ID " + sla_id + " Doesn't exist DB Error: " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	@PostMapping("/slapreinvoiceinfo")
	public ResponseEntity<Object> getPreinvoiceInformation(@RequestBody PreInvoiceInforequest pre_req) {
		try {
			if (pre_req.getPre_id() == null) {
				return slaRepository.findById(pre_req.getSla_id()).map(sladata -> {
					SLAPreInvoiceModel slaPreInvoiceModel = new SLAPreInvoiceModel();
					slaPreInvoiceModel = preInvoiceService.setPreinvoiceDetailsFromSLA(slaPreInvoiceModel, sladata);
					slaPreInvoiceModel.setSla_preinvoice_tariffsheet(
							preInvoiceService.getOtherPreinvoiceTarrifSheet(sladata.getSla_tariffsheet(), sladata));

					return ResponseHandler.generateResponse("SLA PreInvoice Informations", true, HttpStatus.OK,
							slaPreInvoiceModel);

				}).orElseGet(() -> {
					LOGGER.error("Exceptions happen!: " + pre_req.getPre_id() + " SLA PreInvoice ID Doesn't exist");
					return ResponseHandler.generateResponse(pre_req.getPre_id() + " SLA ID Doesn't exist", false,
							HttpStatus.OK, null);
				});

			} else {
				return slaPreInvoiceRepository.findById(pre_req.getPre_id()).map(preinvoiceData -> {

					if (preinvoiceData.getPreinvoice_cycle() == 1) {
						preinvoiceData = preInvoiceService.setPreinvoiceDetailsFromSLA(preinvoiceData,
								preinvoiceData.getSla());
						preinvoiceData.setSla_preinvoice_tariffsheet(preInvoiceService.getPreinvoiceTarrifSheet(
								preinvoiceData.getSla().getSla_tariffsheet(), preinvoiceData));

						return ResponseHandler.generateResponse("SLA PreInvoice Informations", true, HttpStatus.OK,
								preinvoiceData);
					}

					else {
						if (slaPreInvoiceRepository.findActiveStatus(preinvoiceData.getPreinvoice_cycle() - 1,
								preinvoiceData.getSla().getId())) {
							preinvoiceData = preInvoiceService.setPreinvoiceDetailsFromSLA(preinvoiceData,
									preinvoiceData.getSla());
							preinvoiceData.setSla_preinvoice_tariffsheet(preInvoiceService.getPreinvoiceTarrifSheet(
									preinvoiceData.getSla().getSla_tariffsheet(), preinvoiceData));
							return ResponseHandler.generateResponse("SLA PreInvoice Informations", true, HttpStatus.OK,
									preinvoiceData);
						} else {
							return ResponseHandler.generateResponse("Previous Invoice is Pending", false, HttpStatus.OK,
									null);
						}
					}

				}).orElseGet(() -> {
					LOGGER.error("Exceptions happen!: " + pre_req.getPre_id() + " SLA PreInvoice ID Doesn't exist");
					return ResponseHandler.generateResponse(pre_req.getPre_id() + " SLA ID Doesn't exist", false,
							HttpStatus.OK, null);
				});
			}

		} catch (

		Exception e) {
			LOGGER.error("Exceptions happen!:SLA PreInvoice ID " + pre_req.getPre_id() + " Doesn't exist DB Error: "
					+ e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, e.getStackTrace());
		}

	}

	@PostMapping("/slapreinvoice/{SLAId}")
	public ResponseEntity<Object> SLAPreInvoiceLoadData(@PathVariable(value = "SLAId") Long SLAId,
			@Valid @RequestBody SLAPreInvoiceRequest slaPreInvoiceRequest, Authentication authentication) {
		try {
			return slaRepository.findById(SLAId).map(sladata -> {
				DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");

				UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

				slaPreInvoiceModel = new SLAPreInvoiceModel();
				if (!Objects.isNull(slaPreInvoiceRequest.getId())) {
					Optional<SLAPreInvoiceModel> getslaPreInvoiceModel = slaPreInvoiceRepository
							.findById(slaPreInvoiceRequest.getId());

					if (getslaPreInvoiceModel.isPresent()) {
						slaPreInvoiceModel = getslaPreInvoiceModel.get();

					} else {
						return ResponseHandler.generateResponse("Preinvoice Period Doesn't exist", false, HttpStatus.OK,
								null);
					}
				} else {
					if (slaPreInvoiceRepository.findMaxCylceBySla(SLAId) == null)
						slaPreInvoiceModel.setPreinvoice_cycle(0 + 1);
					else
						slaPreInvoiceModel.setPreinvoice_cycle(slaPreInvoiceRepository.findMaxCylceBySla(SLAId) + 1);
					slaPreInvoiceModel.setPreinvoice_period("Others");
				}

				// Calculate Pre-invoice total Budget
				double pre_invoice_total_amount = preInvoiceService
						.calculatePreInvoicetotalamount(slaPreInvoiceRequest.getSla_preinvoice_tariffsheet());
				if (pre_invoice_total_amount == 0.0)
					return ResponseHandler.generateResponse("PreInvoice amount Should not be 0", false, HttpStatus.OK,
							null);

				for (SupportingFiles sla_attachment : slaPreInvoiceRequest.getAttachments()) {
					FileUploadModel fileUploadModel = new FileUploadModel();
					fileUploadModel.setId(sla_attachment.getId());
					fileUploadModel.setSupporting_files_name(sla_attachment.getSupporting_files_name());
					fileUploadModel.setSupporting_files_url(sla_attachment.getSupporting_files_url());
					fileUploadModel.setMapped(true);
					fileUploadRepository.save(fileUploadModel);

				}

				String test_preid = UUID.randomUUID().toString().replace("-", "").substring(16);
				slaPreInvoiceModel.setCustomer(sladata.getCustomer_company());
				slaPreInvoiceModel.setSlaname(sladata.getSlaname());
				slaPreInvoiceModel.setProject_name(sladata.getSlaname());
				slaPreInvoiceModel.setCost_center(sladata.getCustomer_cost_center());
				slaPreInvoiceModel.setTeam(sladata.getTeam());
				slaPreInvoiceModel.setCurrency(sladata.getCurrency());
				slaPreInvoiceModel.setService_description(sladata.getService_description());
				slaPreInvoiceModel.setAddress(sladata.getCustomer_address());
				slaPreInvoiceModel.setBilling_cycle(sladata.getBilling_cycle());
				slaPreInvoiceModel.setPo_number(slaPreInvoiceRequest.getPo_number());
				slaPreInvoiceModel.setDate_of_service(slaPreInvoiceRequest.getDate_of_service());
				slaPreInvoiceModel.setRemarks(slaPreInvoiceRequest.getRemarks());
				slaPreInvoiceModel.setStart_date(slaPreInvoiceRequest.getStart_date());
				slaPreInvoiceModel.setEnd_date(slaPreInvoiceRequest.getEnd_date());
				slaPreInvoiceModel.setRemarks(slaPreInvoiceRequest.getRemarks());
				slaPreInvoiceModel.setFTE(slaPreInvoiceRequest.getFTE());
				slaPreInvoiceModel.setPreinvoiceid(test_preid);

				Long sla_total_budget = slaPreInvoiceRepository.getAvailableSlaBudget(sladata.getId());

				Long preinvoice_total_budget = slaPreInvoiceRequest.getSla_preinvoice_tariffsheet().stream()
						.mapToLong(traffic -> Integer.parseInt(traffic.getAmount() != null ? traffic.getAmount() : "0"))
						.sum();

				if (sla_total_budget == null) {
					sla_total_budget = (long) 0;
				}
				if (slaPreInvoiceRequest.getTotal_budget() > (sladata.getTotal_budget() - sla_total_budget)) {
					return ResponseHandler.generateResponse("Total budget exceeds SLA value", false, HttpStatus.OK,
							null);
				}
				slaPreInvoiceModel.setTotal_budget(preinvoice_total_budget);
				slaPreInvoiceModel.setFTE(slaPreInvoiceRequest.getFTE());
				slaPreInvoiceModel.setSla_preinvoice_tariffsheet(slaPreInvoiceRequest.getSla_preinvoice_tariffsheet());
				slaPreInvoiceModel.setTotal_budget((long) pre_invoice_total_amount);
				slaPreInvoiceModel.setFTE(slaPreInvoiceRequest.getFTE());
				slaPreInvoiceModel.setSla(sladata);
				slaPreInvoiceModel.setAttachments(slaPreInvoiceRequest.getAttachments());
				slaPreInvoiceModel.setActive(true);
				slaPreInvoiceModel.setPreinvoice_date(
						formatter.format(LocalDateTime.now(ZoneId.of(env.getProperty("spring.app.timezone")))));
				slaPreInvoiceModel.setStatus("In-Progress");
				slaPreInvoiceModel.setSla_contacts(sladata.getSla_contacts());

				SLAPreInvoiceResponse slaPreInvoiceResponse = preInvoiceService
						.getPreinvoiceDetailsForSsc(slaPreInvoiceModel, sladata, userDetails);

				SLAPreInvoiceModel slaepreinvoicedata = slaPreInvoiceRepository.save(slaPreInvoiceModel);

				// Integrating MySSC API

//				MySSCSLAPreInvoiceResponse response_from_myssc = mysscslaservice
//						.getSlaPreinvoiceIDfromMySSC(slaPreInvoiceResponse);
//				if (response_from_myssc.getIsSuccess().equals(true) && response_from_myssc.getHttpStatusCode() == 200) {
//					slaPreInvoiceModel.setPreinvoiceid(response_from_myssc.getData().getPreinvoiceid());
//					slaPreInvoiceModel.setSlaid(response_from_myssc.getData().getSlaid());
//					slaPreInvoiceRepository.save(slaPreInvoiceModel);
//				} else {
//					slaPreInvoiceModel.setActive(false);
//					slaPreInvoiceRepository.save(slaPreInvoiceModel);
//					return ResponseHandler.generateResponse("SLA Preinvoice Data not inserted in MySSC", false,
//							HttpStatus.OK, response_from_myssc);
//				}
//				 set invoice status of project and sla reused from scheduler

				slaSchedulerServices.setSLAInvoiceStatus();
				slaSchedulerServices.setProjectInvoiceStatus();

				return ResponseHandler.generateResponse("SLA PreInvoice Created Successfully", true, HttpStatus.OK,
						slaPreInvoiceResponse);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: SLAId " + SLAId + " Doesn't exist");
				return ResponseHandler.generateResponse("SLAId " + SLAId + " Doesn't exist", false, HttpStatus.OK,
						slaPreInvoiceResponse);
			});

		} catch (Exception e) {
//			if (slaPreInvoiceModel.getId() != 0) {
//				slaPreInvoiceRepository.delete(slaPreInvoiceModel);
//				LOGGER.error("Pre-Invoice Deleted");
//			}
			LOGGER.error("Error while insert Record in SLA PreInvoice Creation" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, e.getStackTrace());
		}
	}

	@PutMapping("/slapreinvoice/{SLAIPreId}")
	public ResponseEntity<Object> UpdateslaPreInvoiceLoadData(@PathVariable(value = "SLAIPreId") Long SLAIPreId,
			@Valid @RequestBody SLAPreInvoiceRequest slaPreInvoiceRequest) {
		try {
			return slaPreInvoiceRepository.findById(SLAIPreId).map(updateslaPreInvoiceModel -> {

				for (SupportingFiles sla_attachment : slaPreInvoiceRequest.getAttachments()) {
					FileUploadModel fileUploadModel = new FileUploadModel();
					fileUploadModel.setId(sla_attachment.getId());
					fileUploadModel.setSupporting_files_name(sla_attachment.getSupporting_files_name());
					fileUploadModel.setSupporting_files_url(sla_attachment.getSupporting_files_url());
					fileUploadModel.setMapped(true);
					fileUploadRepository.save(fileUploadModel);

				}

				updateslaPreInvoiceModel.setPo_number(slaPreInvoiceRequest.getPo_number());
				updateslaPreInvoiceModel.setDate_of_service(slaPreInvoiceRequest.getDate_of_service());
				updateslaPreInvoiceModel.setRemarks(slaPreInvoiceRequest.getRemarks());

				Long sla_total_budget = slaPreInvoiceRepository
						.getAvailableSlaBudget(updateslaPreInvoiceModel.getSla().getId(), SLAIPreId);
				if (sla_total_budget == null) {
					sla_total_budget = (long) 0;
				}

				if (slaPreInvoiceRequest
						.getTotal_budget() > (updateslaPreInvoiceModel.getSla().getTotal_budget() - sla_total_budget)) {
					return ResponseHandler.generateResponse("Total budget exceeds SLA value", false, HttpStatus.OK,
							null);
				}
				updateslaPreInvoiceModel.setTotal_budget(slaPreInvoiceRequest.getTotal_budget());
				updateslaPreInvoiceModel.setFTE(slaPreInvoiceRequest.getFTE());
				updateslaPreInvoiceModel
						.setSla_preinvoice_tariffsheet(slaPreInvoiceRequest.getSla_preinvoice_tariffsheet());
				updateslaPreInvoiceModel.setAttachments(slaPreInvoiceRequest.getAttachments());
				updateslaPreInvoiceModel.setActive(true);
				updateslaPreInvoiceModel.setStatus("In-Progress");

				SLAPreInvoiceModel slaepreinvoicedata = slaPreInvoiceRepository.save(updateslaPreInvoiceModel);

				// set invoice status of project and sla reused from scheduler

				slaSchedulerServices.setSLAInvoiceStatus();
				slaSchedulerServices.setProjectInvoiceStatus();
				return ResponseHandler.generateResponse("SLA PreInvoice Updated Successfully", true, HttpStatus.OK,
						slaepreinvoicedata);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: SLA PreInvoice Id " + SLAIPreId + " Doesn't exist");
				return ResponseHandler.generateResponse("SLA PreInvoice Id " + SLAIPreId + " Doesn't exist", false,
						HttpStatus.OK, null);
			});

		} catch (Exception e) {

			LOGGER.error("Error while insert Record in SLA PreInvoice Creation" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	@DeleteMapping("/slapreinvoice/{id}")
	public ResponseEntity<Object> DeleteSLAPreInvoice(@PathVariable Long id) {
		try {
			return slaPreInvoiceRepository.findById(id).map(updatedata -> {
				updatedata.setActive(false);
				slaPreInvoiceRepository.save(updatedata);
				return ResponseHandler.generateResponse("Record Delete Successfully", true, HttpStatus.OK, null);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: SLA ID " + id + " Doesn't exist to Delete");
				return ResponseHandler.generateResponse("SLA ID " + id + " Doesn't exist to Delete", false,
						HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Exceptions happen!: " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	@GetMapping("/slapreinvoicebysla/{SLAID}")
	public ResponseEntity<Object> FindSLAByPreInvoice(@PathVariable(value = "SLAID") Long SLAID, Pageable pageable) {
		try {
			Page<SLAPreInvoiceModel> slapreinvoice = slaPreInvoiceRepository.findBySlaId(SLAID, pageable);
			return ResponseHandler.generateResponse("List of SLA Estimation based on Lead ID", true, HttpStatus.OK,
					slapreinvoice);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error:" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@PutMapping("/removeslapreinvoicedocs/{id}/{doctype}/{filename}")

	public ResponseEntity<Object> removeSLAPreInvoiceAttachements(@PathVariable Long id,
			@PathVariable String filename) {
		try {

			return slaPreInvoiceRepository.findById(id).map(slapreinvoicedata -> {
				for (SupportingFiles currentfile : slapreinvoicedata.getAttachments()) {
					if (currentfile.getSupporting_files_name().equals(filename)) {
						slapreinvoicedata.getAttachments().remove(currentfile);
						storageServicepath.delete(currentfile.getSupporting_files_name());
						break;
					}
				}
				slaPreInvoiceRepository.save(slapreinvoicedata);

				return ResponseHandler.generateResponse("File Remove Successfully", true, HttpStatus.OK, null);

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: SLA PreInvoice ID " + id + " Doesn't exist to remove attachment");
				return ResponseHandler.generateResponse(
						"SLA PreInvoice ID " + id + " Doesn't exist to remove attachment", false, HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while removeDocs: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	// SLA Invoice Controls

	@GetMapping("/slainvoice")
	public ResponseEntity<Object> FindAllSLAInvoice(@RequestParam String Searchkeyword,
			@PageableDefault(size = 10, page = 0, sort = "id", direction = Direction.DESC) Pageable pageable) {
		try {
			Page<SLAInvoiceModel> slaestimation = slaInvoiceRepository.findByActive(true, Searchkeyword, pageable);
			return ResponseHandler.generateResponse("List of SLA Invoice", true, HttpStatus.OK, slaestimation);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error:" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@GetMapping("/slainvoice/{id}")
	public ResponseEntity<Object> FindSLAInvoice(@PathVariable Long id) {
		try {
			return slaInvoiceRepository.findById(id).map(requestData -> {
				return ResponseHandler.generateResponse("SLA Invoice Details", true, HttpStatus.OK, requestData);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: " + id + " SLA Invoice ID Doesn't exist");
				return ResponseHandler.generateResponse(id + " SLA ID Doesn't exist", false, HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Exceptions happen!:SLA Invoice ID " + id + " Doesn't exist DB Error: " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@PostMapping("/slainvoice/{SLAPreId}")
	public ResponseEntity<Object> SLAInvoiceLoadData(@PathVariable(value = "SLAPreId") Long SLAPreId,
			@Valid @RequestBody SLAInvoiceModel slaInvoiceModel) {
		try {
			return slaPreInvoiceRepository.findById(SLAPreId).map(slaPreInvoiceModel -> {
				if (slaInvoiceRepository.findByPreinvoice(slaPreInvoiceModel.getId()) != null) {
					return ResponseHandler.generateResponse("Invoice for this period is Already created", false,
							HttpStatus.OK, null);
				}
				if (slaPreInvoiceModel.getPreinvoice_cycle() != 1) {
					if (!slaPreInvoiceRepository.findPreinvoiceByCycle(slaPreInvoiceModel.getPreinvoice_cycle() - 1,
							slaPreInvoiceModel.getSla().getId()).getIs_invoiced()) {
						return ResponseHandler.generateResponse("Pleace complete previous invoice", false,
								HttpStatus.OK, null);
					}
				}
				if (Boolean.TRUE.equals(slaPreInvoiceModel.getActive())) {
					if (!slaInvoiceModel.getTotal_cost().equals(Double.valueOf(slaPreInvoiceModel.getTotal_budget()))) {
						return ResponseHandler.generateResponse("Invoice value does not matches total cost", false,
								HttpStatus.OK, null);
					}
					slaInvoiceModel.setSla(slaPreInvoiceModel.getSla());
					slaInvoiceModel.setSlapreinvoice(slaPreInvoiceModel);
					slaInvoiceModel.setActive(true);
					slaInvoiceModel.setSlaid(slaPreInvoiceModel.getSla().getSlaid());
					slaInvoiceModel.setInvoice_date(LocalDate.now().toString());
					slaInvoiceModel.setStatus("Completed");

					SLAInvoiceModel slaepreinvoicedata = slaInvoiceRepository.save(slaInvoiceModel);
					slaPreInvoiceModel.setIs_invoiced(true);
					slaPreInvoiceRepository.save(slaPreInvoiceModel);
					return ResponseHandler.generateResponse("SLA Invoice Successfully", true, HttpStatus.OK,
							slaepreinvoicedata);
				} else {
					return ResponseHandler.generateResponse("Please confirm whether preinvoice is created or not", true,
							HttpStatus.OK, null);
				}
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: SLA Pre-Invoice Id " + SLAPreId + " Doesn't exist");
				return ResponseHandler.generateResponse("SLA Invoce Id " + SLAPreId + " Doesn't exist", false,
						HttpStatus.OK, null);
			});

		} catch (Exception e) {

			LOGGER.error("Error while insert Record in SLA Invoce Creation" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	@PutMapping("/slainvoice/{SLAInvoId}")
	public ResponseEntity<Object> UpdateslaInvoiceLoadData(@PathVariable(value = "SLAInvoId") Long SLAInvoId,
			@Valid @RequestBody SLAInvoiceModel slaInvoiceRequest) {
		try {
			return slaInvoiceRepository.findById(SLAInvoId).map(slapreindata -> {

				slaInvoiceRequest.setId(slapreindata.getId());
				slaInvoiceRequest.setSla(slapreindata.getSla());
				slaInvoiceRequest.setSlapreinvoice(slapreindata.getSlapreinvoice());

				SLAInvoiceModel slaeinvoicedata = slaInvoiceRepository.save(slaInvoiceRequest);
				return ResponseHandler.generateResponse("SLA Invoice Updated Successfully", true, HttpStatus.OK,
						slaeinvoicedata);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: SLA Invoice Id " + SLAInvoId + " Doesn't exist");
				return ResponseHandler.generateResponse("SLA Invoice Id " + SLAInvoId + " Doesn't exist", false,
						HttpStatus.OK, null);
			});

		} catch (Exception e) {

			LOGGER.error("Error while insert Record in SLA Invoice Creation" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	@DeleteMapping("/slainvoice/{id}")
	public ResponseEntity<Object> DeleteSLAInvoice(@PathVariable Long id) {
		try {
			return slaInvoiceRepository.findById(id).map(updatedata -> {
				updatedata.setActive(false);
				slaInvoiceRepository.save(updatedata);
				return ResponseHandler.generateResponse("Record Delete Successfully", true, HttpStatus.OK, null);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: SLA ID " + id + " Doesn't exist to Delete");
				return ResponseHandler.generateResponse("SLA ID " + id + " Doesn't exist to Delete", false,
						HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Exceptions happen!: " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	@GetMapping("/slainvoicebysla/{SLAID}")
	public ResponseEntity<Object> FindSLAByInvoice(@PathVariable(value = "SLAID") Long SLAID, Pageable pageable) {
		try {
			Page<SLAInvoiceModel> slainvoice = slaInvoiceRepository.findBySlaId(SLAID, pageable);
			return ResponseHandler.generateResponse("List of SLA Invoice based on SLA ID", true, HttpStatus.OK,
					slainvoice);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error:" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@GetMapping("/getmaterialmodedata/{ProjectId}")
	public ResponseEntity<Object> getMaterialCodeData(@PathVariable(value = "ProjectId") long ProjectId) {

		try {
			Optional<ProjectModel> ProjectModel = projectRepository.findById(ProjectId);
			if (ProjectModel.isPresent()) {
				MySccCostcenterModel mySccCostcenterModel = mySccCostcenterRepository
						.findByCode(ProjectModel.get().getCost_center());
				if (mySccCostcenterModel != null) {
					List<MaterailCodeModel> MaterailCodedata = materialCodeRepository
							.findByCode(mySccCostcenterModel.getDepartment());
					return ResponseHandler.generateResponse("List Of MaterialCode Data Based Project ID  " + ProjectId,
							true, HttpStatus.OK, MaterailCodedata);
				} else {
					LOGGER.error(
							"Exceptions happen!:   {}  Costcenter and Department Doesn't exist for this Project ID In MaterialMaster",
							ProjectId);
					return ResponseHandler.generateResponse(
							"Costcenter and Department Doesn't exist for this Project ID In MaterialMaster "
									+ ProjectId,
							true, HttpStatus.OK, null);
				}
			}

			else {
				LOGGER.error("Exceptions happen!:   {}  ProjectID Doesn't exist ", ProjectId);
				return ResponseHandler.generateResponse(" Project ID doestn't exist  " + ProjectId, true, HttpStatus.OK,
						null);
			}
		} catch (Exception e) {
			LOGGER.error("Internal Server Error, Please contact G3C Admin  {} ", e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	// Get Approved and Non-approved SLA List
	@GetMapping("/getslaapprovestatus/{SLAID}")
	public ResponseEntity<Object> getSlaApproveStatus(@PathVariable(value = "SLAID") long SLAID) {

		try {
			Optional<SLAModel> slaData = slaRepository.findById(SLAID);

			if (slaData.isPresent()) {

				List<SLAApproval> slaApprovalDatas = slaApprovalRepository.getSLAcontacts(SLAID);

				return ResponseHandler.generateResponse("Approver Information", true, HttpStatus.OK, slaApprovalDatas);
			}

			else {
				LOGGER.error("Exceptions happen!:   {}  SLA Doesn't exist ", SLAID);
				return ResponseHandler.generateResponse("SLA ID doestn't exist  " + SLAID, true, HttpStatus.OK, null);
			}
		} catch (Exception e) {
			LOGGER.error("Internal Server Error, Please contact G3C Admin  {} ", e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	// Get Approved and Non-approved Pre-Invoice List
	@GetMapping("/getpreinvoiceapprovestatus/{PreinvoiceId}")
	public ResponseEntity<Object> getPreInvoiceApproveStatus(@PathVariable(value = "PreinvoiceId") long PreinvoiceId) {

		try {

			Optional<SLAPreInvoiceModel> slaPreinvoiceData = slaPreInvoiceRepository.findById(PreinvoiceId);

			if (slaPreinvoiceData.isPresent()) {

				List<SLAApproval> slaApprovalDatas = slaApprovalRepository.getSLAPreInvoicecontacts(PreinvoiceId);

				return ResponseHandler.generateResponse("SLA Pre-Invoice ID doesn't exist  " + PreinvoiceId, true,
						HttpStatus.OK, slaApprovalDatas);
			}

			else {
				LOGGER.error("Exceptions happen!:   {}  SLA Pre-Invoice Doesn't exist ", PreinvoiceId);
				return ResponseHandler.generateResponse("SLA Pre-Invoice ID doesn't exist  " + PreinvoiceId, true,
						HttpStatus.OK, null);
			}
		} catch (Exception e) {
			LOGGER.error("Internal Server Error, Please contact G3C Admin  {} ", e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

}

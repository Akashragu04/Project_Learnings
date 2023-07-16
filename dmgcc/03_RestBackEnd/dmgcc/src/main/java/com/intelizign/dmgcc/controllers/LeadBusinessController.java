package com.intelizign.dmgcc.controllers;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import javax.validation.Valid;

import org.apache.commons.io.FilenameUtils;
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
import org.springframework.web.multipart.MultipartFile;

import com.intelizign.dmgcc.authendication.AzureUserInfo;
import com.intelizign.dmgcc.authendication.UserDetailsImpl;
import com.intelizign.dmgcc.models.CostCenterModel;
import com.intelizign.dmgcc.models.LeadRequestModel;
import com.intelizign.dmgcc.notification.NotificationServices;
import com.intelizign.dmgcc.repositories.CostCenterRepository;
import com.intelizign.dmgcc.repositories.LeadBusinessRepository;
import com.intelizign.dmgcc.repositories.NotificationRepository;
import com.intelizign.dmgcc.request.LeadAverageRequest;
import com.intelizign.dmgcc.request.LeadRequest;
import com.intelizign.dmgcc.request.SupportingFiles;
import com.intelizign.dmgcc.response.LeadConversionReportWithProject;
import com.intelizign.dmgcc.response.LeadConversionReportWithProject.LeadConversionAverage;
import com.intelizign.dmgcc.response.LeadConversionReportWithProject.LeadData;
import com.intelizign.dmgcc.response.LeadStepOver;
import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.services.EmailServiceImpl;
import com.intelizign.dmgcc.services.FilesStorageServicePath;
import com.intelizign.dmgcc.services.LeadConversionAverageService;

@RestController
@RequestMapping("/leadrequest")
public class LeadBusinessController {

	@Autowired
	private Environment env;

	@Autowired
	FilesStorageServicePath storageServicepath;

	@Autowired
	SimpMessagingTemplate template;

	@Autowired
	private EmailServiceImpl notificationService;

	@Autowired
	NotificationRepository notificationRepository;

	@Autowired
	LeadConversionAverageService leadConversionAverageService;

	@Autowired
	CostCenterRepository costcenterRepository;

	private final LeadBusinessRepository leadreq_repository;

	@Autowired
	private AzureUserInfo azureUserInfo;

	@Autowired
	private NotificationServices notificationServices;

	private static int TenMegaBytes = 10 * 1024 * 1024;

	public final Logger LOGGER = LogManager.getLogger(LeadBusinessController.class);

	LeadBusinessController(LeadBusinessRepository leadreq_repository) {
		this.leadreq_repository = leadreq_repository;
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
	public ResponseEntity<Object> searchLeadRequest(@RequestParam String Serachkeyword,
			@PageableDefault(size = 10, page = 0, sort = "id", direction = Direction.DESC) Pageable pageable,
			Authentication authentication) {
		try {

			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);
			String email = String.valueOf(userDetails.getEmail());

			if (userDetails.getRolename().equalsIgnoreCase("admin")) {
				Page<LeadRequestModel> leaddataLeadRequestModels = leadreq_repository.findByactiveandsearchkey(true,
						Serachkeyword, pageable);
				return ResponseHandler.generateResponse("List of Lead Request", true, HttpStatus.OK,
						leaddataLeadRequestModels);
			} else if (userDetails.getRolename().equalsIgnoreCase("customer")
					|| userDetails.getRolename().equalsIgnoreCase("business")) {
				Page<LeadRequestModel> leaddataLeadRequestModels = leadreq_repository.Search(true, email, Serachkeyword,
						pageable);
				return ResponseHandler.generateResponse("List of Lead Request", true, HttpStatus.OK,
						leaddataLeadRequestModels);
			} else if (userDetails.getRolename().equalsIgnoreCase("hr")
					|| userDetails.getRolename().equalsIgnoreCase("it")
					|| userDetails.getRolename().equalsIgnoreCase("facility")
					|| userDetails.getRolename().equalsIgnoreCase("finance")) {
				Page<LeadRequestModel> leaddataLeadRequestModels = leadreq_repository.findByLeadAndBizcaseInfo(true,
						userDetails.getShortid(), Serachkeyword, pageable);
				return ResponseHandler.generateResponse("List of Lead Request", true, HttpStatus.OK,
						leaddataLeadRequestModels);
			} else {
				return ResponseHandler.generateResponse("List of Lead Request", false, HttpStatus.OK, null);
			}

		} catch (Exception e) {
			LOGGER.error("Internal Server Error getall  : " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@GetMapping("/getdate")
	public ResponseEntity<Object> dateformate() {
		try {

			LOGGER.error("Date Time : " + LocalDateTime.now(ZoneId.of(env.getProperty("spring.app.timezone"))));
			List<String> leaddepartment = costcenterRepository.getAllDepartment();
			return ResponseHandler.generateResponse("List of Lead Request", true, HttpStatus.OK, leaddepartment);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error getall : " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@GetMapping("/getdepartment")
	public ResponseEntity<Object> getLeadDepartment() {
		try {

			List<String> leaddepartment = costcenterRepository.getAllDepartment();
			return ResponseHandler.generateResponse("List of Lead Request", true, HttpStatus.OK, leaddepartment);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error getall : " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@RequestMapping(value = "", method = RequestMethod.POST, consumes = { "multipart/form-data" })
	public ResponseEntity<Object> formuploadFiles(@Valid @ModelAttribute LeadRequest Leadrequestdata,
			Authentication authentication) {
		try {
			List<SupportingFiles> files = new ArrayList<>();

			if (Leadrequestdata.getSupporting_files() != null) {
				for (MultipartFile file : Leadrequestdata.getSupporting_files()) {
					SupportingFiles currentFiles = new SupportingFiles();
					long file_size = file.getSize();

					if (file_size <= TenMegaBytes) {
						String filename = storageServicepath.save(file);
						currentFiles.setSupporting_files_name(filename);
						currentFiles.setSupporting_files_url(
								env.getProperty("hostname.name") + "/api/leadrequest/attachmens/" + filename);
						files.add(currentFiles);
					} else {
						return ResponseHandler.generateResponse("Each file size should be less than 10MB", false,
								HttpStatus.OK, null);
					}

				}
			}
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
			LeadRequestModel leadRequestModel = new LeadRequestModel();
			leadRequestModel.setCreate_date(LocalDateTime.now(ZoneId.of(env.getProperty("spring.app.timezone"))));
			leadRequestModel.setProject_name(Leadrequestdata.getProject_name());
			leadRequestModel.setRequest_date(LocalDate.parse(Leadrequestdata.getRequest_date(), formatter));
			leadRequestModel.setService_provider_short_id(Leadrequestdata.getService_provider_short_id());
			leadRequestModel.setService_provider_contact_name(Leadrequestdata.getService_provider_contact_name());
			leadRequestModel.setService_provider_department(Leadrequestdata.getService_provider_department());
			leadRequestModel.setService_provider_cost_center(Leadrequestdata.getService_provider_cost_center());
			leadRequestModel.setService_provider_email_id(Leadrequestdata.getService_provider_email_id());
			leadRequestModel.setService_receiver_short_id(Leadrequestdata.getService_receiver_short_id());
			leadRequestModel.setService_receiver_contact_name(Leadrequestdata.getService_receiver_contact_name());
			leadRequestModel.setService_receiver_department(Leadrequestdata.getService_receiver_department());
			leadRequestModel.setService_receiver_cost_center(Leadrequestdata.getService_receiver_cost_center());
			leadRequestModel.setService_receiver_email_id(Leadrequestdata.getService_receiver_email_id());
			leadRequestModel.setService_receiver_entity(Leadrequestdata.getService_receiver_entity());
			leadRequestModel.setShort_description(Leadrequestdata.getShort_description());
			leadRequestModel.setSupporting_files(files);
			leadRequestModel.setActive(true);

			if (leadRequestModel.getService_provider_email_id() != null
					&& !leadRequestModel.getService_provider_email_id().isEmpty()
					&& !leadRequestModel.getService_provider_email_id().isBlank()) {
				leadRequestModel.setCategory_name("Business Requirement");
				leadRequestModel.setCategory_status("not initiated");
				leadRequestModel.setIsasign(true);
			} else {
				leadRequestModel.setCategory_name("Provider");
				leadRequestModel.setCategory_status("not assigned");
				leadRequestModel.setIsasign(false);
			}

			LeadRequestModel leadRequestModelsaved = leadreq_repository.save(leadRequestModel);

			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);

			String role = userDetails.getRolename();

			String redirectUrl = env.getProperty("g3c.frontend.app") + "g3c-admin";

			switch (role) {
			case "CUSTOMER": {

				notificationServices.NotificationPojo("G3C Admin", "Admin", "ADMIN001",
						userDetails.getEmp_name() + " (Customer) has create Lead request", "business/leads-monitoring");

				// Send Mail to Admin
				Map<String, Object> Adminmodel = new HashMap<>();
				Adminmodel.put("adminname", "GCC Admin");
				Adminmodel.put("content1", "New Lead Request has been created.");
				Adminmodel.put("content2", "Kindly log into the G3C application to view the lead content in detail.");
				Adminmodel.put("aboutlink", "https://asia.daimlertruck.com/");
				Adminmodel.put("redirectUrl", redirectUrl);
				notificationService.sendLeadMail(env.getProperty("g3c.admin.email"), "G3C New Lead Request Created",
						Adminmodel);

				// Send Acknowledgement to Customer
				Map<String, Object> Customermodel = new HashMap<>();
				Customermodel.put("adminname", userDetails.getUsername());
				Customermodel.put("content1", "Thank you for reaching out to us!");
				Customermodel.put("content2", "We have received your request and our team will reach out to you soon");
				Customermodel.put("content3", "Looking forward...");
				Customermodel.put("content4",
						"Kindly log into the G3C application to view the lead content in detail.");
				Customermodel.put("redirectUrl", redirectUrl);
				Customermodel.put("aboutlink", "https://asia.daimlertruck.com/");
				notificationService.sendLeadMailToCustomer(userDetails.getEmail(), "G3C Leads Request Confirmation",
						Customermodel);

				if (leadRequestModel.getService_provider_email_id() != null
						&& !leadRequestModel.getService_provider_email_id().isEmpty()
						&& !leadRequestModel.getService_provider_email_id().isBlank()) {
					Map<String, Object> Providermodel = new HashMap<>();
					Providermodel.put("adminname", leadRequestModel.getService_provider_contact_name());
					Providermodel.put("content1",
							"New Lead Request has been created by "
									+ leadRequestModel.getService_receiver_contact_name() + " & "
									+ leadRequestModel.getService_receiver_entity());
					Providermodel.put("content2",
							"Kindly log into the G3C application to view the lead content in detail.");
					Providermodel.put("redirectUrl", redirectUrl);
					Providermodel.put("aboutlink", "https://asia.daimlertruck.com/");
					notificationService.sendLeadMail(Leadrequestdata.getService_provider_email_id(),
							"G3C New Lead Request Created", Providermodel);

					if (Leadrequestdata.getService_provider_short_id() != null) {

						notificationServices.NotificationPojo("G3C Admin",
								Leadrequestdata.getService_provider_contact_name(),
								Leadrequestdata.getService_provider_short_id(), "New Lead Request Assigned to you",
								"business/leads-monitoring");

					}
				}
				break;
			}
			case "BUSINESS": {

				notificationServices.NotificationPojo("G3C Admin", "Admin", "ADMIN001",
						userDetails.getEmp_name() + "(Business) has create Lead request", "business/leads-monitoring");

				// Send mail and notification to Admin
				Map<String, Object> Adminmodel = new HashMap<>();
				Adminmodel.put("adminname", "GCC Admin");
				Adminmodel.put("content1",
						"New Lead Request has been created by " + leadRequestModel.getService_provider_contact_name()
								+ " on behalf of " + leadRequestModel.getService_receiver_contact_name() + " & "
								+ leadRequestModel.getService_receiver_entity());
				Adminmodel.put("content2", "Kindly log into the G3C application to view the lead content in detail.");
				Adminmodel.put("redirectUrl", redirectUrl);
				Adminmodel.put("aboutlink", "https://asia.daimlertruck.com/");
				notificationService.sendLeadMail(env.getProperty("g3c.admin.email"), "G3C New Lead Request Created",
						Adminmodel);

				// Send mail to business if provide is not blank
				if (leadRequestModel.getService_provider_email_id() != null
						&& !leadRequestModel.getService_provider_email_id().isEmpty()
						&& !leadRequestModel.getService_provider_email_id().isBlank()) {
					Map<String, Object> Providermodel = new HashMap<>();
					Providermodel.put("adminname", leadRequestModel.getService_provider_contact_name());
					Providermodel.put("content1",
							"Thank you for creating the Lead on behalf of "
									+ leadRequestModel.getService_receiver_contact_name() + " & "
									+ leadRequestModel.getService_receiver_entity());
					Providermodel.put("content2",
							"Kindly log into the G3C application to view the lead content in detail.");
					Providermodel.put("redirectUrl", redirectUrl);
					Providermodel.put("aboutlink", "https://asia.daimlertruck.com/");
					notificationService.sendLeadMail(Leadrequestdata.getService_provider_email_id(),
							"G3C New Lead Request Assigned", Providermodel);

					if (Leadrequestdata.getService_provider_short_id() != null) {

						notificationServices.NotificationPojo("G3C Admin",
								Leadrequestdata.getService_provider_contact_name(),
								Leadrequestdata.getService_provider_short_id(), "New Lead Request Assigned to you",
								"business/leads-monitoring");

					}
				}

				// Send mail to customer
				if (leadRequestModel.getService_receiver_email_id() != null
						&& !leadRequestModel.getService_provider_email_id().isEmpty()
						&& !leadRequestModel.getService_provider_email_id().isBlank()) {
					Map<String, Object> Customermodel = new HashMap<>();
					Customermodel.put("adminname", leadRequestModel.getService_receiver_contact_name());
					Customermodel.put("content1",
							"We have a created new Enquiry on behalf of "
									+ leadRequestModel.getService_receiver_contact_name() + " & "
									+ leadRequestModel.getService_receiver_entity() + " by "
									+ leadRequestModel.getService_provider_contact_name());
					Customermodel.put("content2", "Kindly look into the G3C application to view the leads in detail.");
					Customermodel.put("redirectUrl", redirectUrl);
					Customermodel.put("aboutlink", "https://asia.daimlertruck.com/");
					notificationService.sendLeadMail(Leadrequestdata.getService_receiver_email_id(),
							"G3C New Lead Request Created", Customermodel);

					if (Leadrequestdata.getService_receiver_short_id() != null) {

						notificationServices.NotificationPojo("G3C Admin",
								Leadrequestdata.getService_receiver_contact_name(),
								Leadrequestdata.getService_receiver_short_id(), "New Lead Request Created",
								"business/leads-monitoring");
					}
				}

				break;
			}
			case "ADMIN": {
				String username = Leadrequestdata.getService_provider_contact_name();
				String message = userDetails.getEmp_name() + " (Admin) has create Lead request";
				template.convertAndSendToUser(username, "/messages", message);

				// Send mail to business if provide is not blank
				if (leadRequestModel.getService_provider_email_id() != null
						&& !leadRequestModel.getService_provider_email_id().isEmpty()
						&& !leadRequestModel.getService_provider_email_id().isBlank()) {
					Map<String, Object> Providermodel = new HashMap<>();
					Providermodel.put("adminname", leadRequestModel.getService_provider_contact_name());
					Providermodel.put("content1", "New Lead Request has been assigned to you.");
					Providermodel.put("content2", "Kindly look into the G3C application to view the leads in detail.");
					Providermodel.put("redirectUrl", redirectUrl);
					Providermodel.put("aboutlink", "https://asia.daimlertruck.com/");
					notificationService.sendLeadMail(Leadrequestdata.getService_provider_email_id(),
							"G3C New Lead Request Assigned ", Providermodel);

					if (Leadrequestdata.getService_provider_short_id() != null) {

						notificationServices.NotificationPojo("G3C Admin",
								Leadrequestdata.getService_provider_contact_name(),
								Leadrequestdata.getService_provider_short_id(), "New Lead Request Assigned to you",
								"business/leads-monitoring");

					}
				}

				// Send mail to customer
				if (leadRequestModel.getService_receiver_email_id() != null
						&& !leadRequestModel.getService_provider_email_id().isEmpty()
						&& !leadRequestModel.getService_provider_email_id().isBlank()) {
					Map<String, Object> Customermodel = new HashMap<>();
					Customermodel.put("adminname", leadRequestModel.getService_receiver_contact_name());
					Customermodel.put("content1", "New Lead Request has been created by Admin");
					Customermodel.put("content2", "Kindly look into the G3C application to view the leads in detail.");
					Customermodel.put("redirectUrl", redirectUrl);
					Customermodel.put("aboutlink", "https://asia.daimlertruck.com/");
					notificationService.sendLeadMail(Leadrequestdata.getService_receiver_email_id(),
							"G3C New Lead Request Created", Customermodel);

					if (Leadrequestdata.getService_receiver_short_id() != null) {

						notificationServices.NotificationPojo("G3C Admin",
								Leadrequestdata.getService_receiver_contact_name(),
								Leadrequestdata.getService_receiver_short_id(), "New Lead Request Created",
								"business/leads-monitoring");
					}
				}

				break;
			}
			default:
				throw new IllegalArgumentException("Notification is not send, Invalid role : " + role);
			}

			return ResponseHandler.generateResponse("New Business Created Successfully", true, HttpStatus.OK,
					leadRequestModelsaved);

		}

		catch (Exception e) {
			if (Leadrequestdata.getSupporting_files() != null) {
				Arrays.asList(Leadrequestdata.getSupporting_files()).stream()
						.forEach(file -> storageServicepath.delete(file.getOriginalFilename()));
			}
			LOGGER.error("Internal Server Error while multipart-post  : " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = { "multipart/form-data" })
	public ResponseEntity<Object> UpdateLeadRequest(@Valid @ModelAttribute LeadRequest leadupdatedata,
			@PathVariable Long id) {
		try {
			return leadreq_repository.findById(id).map(updatedata -> {

				List<SupportingFiles> files = updatedata.getSupporting_files();
				if (leadupdatedata.getSupporting_files() != null) {
					Arrays.asList(leadupdatedata.getSupporting_files()).stream().forEach(file -> {
						SupportingFiles currentFiles = new SupportingFiles();
						if (Boolean.FALSE.equals(storageServicepath.checkload(file.getOriginalFilename()))) {
							storageServicepath.save(file);
							currentFiles.setSupporting_files_name(file.getOriginalFilename());
							currentFiles.setSupporting_files_url(env.getProperty("hostname.name")
									+ "/api/leadrequest/attachmens/" + file.getOriginalFilename());
							files.add(currentFiles);
						} else {
							Random random = new Random();
							String version = Integer.toString(random.nextInt(900) + 100);
							String filename = file.getOriginalFilename()
									.replace(file.getOriginalFilename(),
											FilenameUtils.getBaseName(file.getOriginalFilename()).concat("_" + version)
													+ "." + FilenameUtils.getExtension(file.getOriginalFilename()))
									.toLowerCase();
							storageServicepath.duplicatesave(file, filename);
							currentFiles.setSupporting_files_name(filename);
							currentFiles.setSupporting_files_url(env.getProperty("hostname.name")
									+ "/api/leadrequest/attachmens/" + file.getOriginalFilename());
							files.add(currentFiles);
						}

					});
				}

				DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
				updatedata.setProject_name(leadupdatedata.getProject_name());
				updatedata.setRequest_date(LocalDate.parse(leadupdatedata.getRequest_date(), formatter));
				updatedata.setService_provider_short_id(leadupdatedata.getService_provider_short_id());
				updatedata.setService_provider_contact_name(leadupdatedata.getService_provider_contact_name());
				updatedata.setService_provider_department(leadupdatedata.getService_provider_department());
				updatedata.setService_provider_email_id(leadupdatedata.getService_provider_email_id());
				updatedata.setService_receiver_short_id(leadupdatedata.getService_receiver_short_id());
				updatedata.setService_receiver_contact_name(leadupdatedata.getService_receiver_contact_name());
				updatedata.setService_receiver_department(leadupdatedata.getService_receiver_department());
				updatedata.setService_receiver_email_id(leadupdatedata.getService_receiver_email_id());
				updatedata.setService_receiver_entity(leadupdatedata.getService_receiver_entity());
				updatedata.setShort_description(leadupdatedata.getShort_description());
				updatedata.setService_provider_cost_center(leadupdatedata.getService_provider_cost_center());
				updatedata.setService_receiver_cost_center(leadupdatedata.getService_receiver_cost_center());
				updatedata.setSupporting_files(files);
				updatedata.setActive(true);

				if (updatedata.getService_provider_email_id() != null
						&& !updatedata.getService_provider_email_id().isEmpty()
						&& !updatedata.getService_provider_email_id().isBlank()) {
					updatedata.setCategory_name("Business Requirement");
					updatedata.setCategory_status("not initiated");
					updatedata.setIsasign(true);
					updatedata.setCreate_date(LocalDateTime.now(ZoneId.of(env.getProperty("spring.app.timezone"))));
					// Send mail to business if provide is not blank
					Map<String, Object> Providermodel = new HashMap<>();
					Providermodel.put("adminname", "Business Manager");
					Providermodel.put("content1", "Lead Request has been assigned to you.");
					Providermodel.put("content2", "Kindly look into the G3C application to view the leads in detail");
					Providermodel.put("aboutlink", "https://asia.daimlertruck.com/");
					notificationService.sendLeadMail(updatedata.getService_provider_email_id(),
							"G3C Lead Request Assigned", Providermodel);

					notificationServices.NotificationPojo("G3C Admin", updatedata.getService_provider_contact_name(),
							updatedata.getService_provider_short_id(), "New Lead Request Assigned to you",
							"business/leads-monitoring");

				} else {
					updatedata.setCategory_name("Provider");
					updatedata.setCategory_status("not assigned");
					updatedata.setIsasign(false);
				}

				LeadRequestModel leadRequestModelsaved = leadreq_repository.save(updatedata);

				return ResponseHandler.generateResponse("Business Updated Successfully", true, HttpStatus.OK,
						leadRequestModelsaved);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: LeadID " + id + " Doesn't exist to Update Lead Information");
				return ResponseHandler.generateResponse("LeadID " + id + " Doesn't exist to Update Lead Information",
						false, HttpStatus.OK, null);
			});
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while mutlipart-put : " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	@PutMapping(value = "/assignuser/{id}")
	public ResponseEntity<Object> Update(@Valid @RequestBody LeadRequest leadupdatedata, @PathVariable Long id) {
		try {
			return leadreq_repository.findById(id).map(updatedata -> {
				updatedata.setService_provider_short_id(leadupdatedata.getService_provider_short_id());
				updatedata.setService_provider_contact_name(leadupdatedata.getService_provider_contact_name());
				updatedata.setService_provider_department(leadupdatedata.getService_provider_department());
				updatedata.setService_provider_email_id(leadupdatedata.getService_provider_email_id());
				updatedata.setService_provider_cost_center(leadupdatedata.getService_provider_cost_center());
				if (updatedata.getService_provider_email_id() != null
						&& !updatedata.getService_provider_email_id().isEmpty()
						&& !updatedata.getService_provider_email_id().isBlank()) {
					updatedata.setCategory_name("Business Requirement");
					updatedata.setCategory_status("not initiated");
					updatedata.setIsasign(true);
					updatedata.setCreate_date(LocalDateTime.now(ZoneId.of(env.getProperty("spring.app.timezone"))));
					// Send mail to business if provide is not blank

					Map<String, Object> Providermodel = new HashMap<>();
					Providermodel.put("adminname", "Business Manager");
					Providermodel.put("content1", "Lead Request has been assigned to you.");
					Providermodel.put("content2", "Kindly look into the G3C application to view the leads in detail");
					Providermodel.put("aboutlink", "https://asia.daimlertruck.com/");
					notificationService.sendLeadMail(updatedata.getService_provider_email_id(),
							"G3C Lead Request Assigned", Providermodel);

					notificationServices.NotificationPojo("G3C Admin", updatedata.getService_provider_contact_name(),
							updatedata.getService_provider_short_id(), "New Lead Request Assigned to you",
							"business/leads-monitoring");

				} else {
					updatedata.setCategory_name("Provider");
					updatedata.setCategory_status("not assigned");
					updatedata.setIsasign(false);
				}
				leadreq_repository.save(updatedata);

				return ResponseHandler.generateResponse(
						"Business Assigned to " + leadupdatedata.getService_provider_short_id() + " Successfully", true,
						HttpStatus.OK, updatedata);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: LeadID " + id + " Doesn't exist to Update Lead Information");
				return ResponseHandler.generateResponse("LeadID " + id + " Doesn't exist to Update Lead Information",
						false, HttpStatus.OK, null);
			});
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while assignuser: " + e.getMessage());
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

	@GetMapping("/{id}")
	public ResponseEntity<Object> FindBizRequest(@PathVariable Long id) {
		try {
			return leadreq_repository.findById(id).map(updatedata -> {
				return ResponseHandler.generateResponse("Lead Request Found", true, HttpStatus.OK, updatedata);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: " + id + " ID Doesn't exist");
				return ResponseHandler.generateResponse(id + " ID Doesn't exist", false, HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Internal Server Error getbyid  : " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Object> DeleteLeadRequest(@PathVariable Long id) {
		try {
			return leadreq_repository.findById(id).map(updatedata -> {

				updatedata.setActive(false);

				for (SupportingFiles currentfile : updatedata.getSupporting_files()) {
					storageServicepath.delete(currentfile.getSupporting_files_name());
				}

				updatedata.setSupporting_files(null);
				leadreq_repository.save(updatedata);

				return ResponseHandler.generateResponse("Record Delete Successfully", true, HttpStatus.OK, null);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: LeadID " + id + " Doesn't exist to Delete Lead Information");
				return ResponseHandler.generateResponse("LeadID " + id + " Doesn't exist to Delete Lead Information",
						false, HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while delete by id : " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	@PutMapping("/removedocs/{id}/{filename}")
	public ResponseEntity<Object> removeAttachements(@PathVariable Long id, @PathVariable String filename) {
		try {

			return leadreq_repository.findById(id).map(updatedata -> {

				for (SupportingFiles currentfile : updatedata.getSupporting_files()) {
					if (currentfile.getSupporting_files_name().equals(filename)) {
						updatedata.getSupporting_files().remove(currentfile);
						storageServicepath.delete(currentfile.getSupporting_files_name());
						break;
					}
				}
				leadreq_repository.save(updatedata);

				return ResponseHandler.generateResponse("File Remove Successfully", true, HttpStatus.OK, null);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: LeadID " + id + " Doesn't exist to remove attachment");
				return ResponseHandler.generateResponse("LeadID " + id + " Doesn't exist to remove attachment", false,
						HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while removeDocs: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	@PostMapping("/leadConversionAverage")
	public ResponseEntity<Object> calculateLeadConversionAverage(@RequestBody LeadAverageRequest leadAverageRequest) {
		try {

			Optional<CostCenterModel> getdepartment = costcenterRepository
					.findByTeamDep(leadAverageRequest.getDepartment());
			if (getdepartment.isPresent()) {
				CostCenterModel selected_costcenter = getdepartment.get();
				List<LeadRequestModel> leadsData = leadreq_repository
						.findByCostCenter(selected_costcenter.getCostcenter());
				List<LeadData> leadData = new ArrayList<>();

				for (LeadRequestModel data : leadsData) {
					LeadData newLeadData = leadConversionAverageService.getLeadsData(data);
					leadData.add(newLeadData);
				}

				if (leadsData.isEmpty()) {
					return ResponseHandler.generateResponse("No Data to Show", true, HttpStatus.OK, null);
				}
				Integer stage1 = leadreq_repository.findLeadConversionSum(selected_costcenter.getCostcenter(),
						"IL0 - IL1");
				Integer stage2 = leadreq_repository.findLeadConversionSum(selected_costcenter.getCostcenter(),
						"IL1 - IL2");
				Integer stage3 = leadreq_repository.findLeadConversionSum(selected_costcenter.getCostcenter(),
						"IL2 - IL3");

				if (stage1 == null) {
					stage1 = 0;
				}
				if (stage2 == null) {
					stage2 = 0;
				}
				if (stage3 == null) {
					stage3 = 0;
				}

				List<LeadConversionAverage> OverallLeadAvgData = leadConversionAverageService.leadConversionAverage(
						leadsData.size(), stage1, stage2, stage3, leadAverageRequest.getDepartment());

				LeadConversionReportWithProject averageWithProjects = new LeadConversionReportWithProject(
						OverallLeadAvgData, leadData);

				return ResponseHandler.generateResponse("List of Lead Conversion Average", true, HttpStatus.OK,
						averageWithProjects);
			} else {
				return ResponseHandler.generateResponse("Department Doesn't exist", true, HttpStatus.OK, null);
			}

		} catch (Exception e) {
			LOGGER.error("Internal Server Error getall : " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@GetMapping("/getoverallstatus/{id}")
	public ResponseEntity<Object> getOverallStatus(@PathVariable Long id) {
		try {
			ArrayList<LeadStepOver> overallStatus = new ArrayList<LeadStepOver>();
			return leadreq_repository.findById(id).map(leadReqdata -> {

				if (leadReqdata.getService_provider_short_id() != null) {
					LeadStepOver LeadReqStatus = leadConversionAverageService.stepOverStatus("Lead", "Completed",
							"Green");
					overallStatus.add(LeadReqStatus);

					if (leadReqdata.getBiz_id() == null) {
						// checking biz case req present or not
						LeadStepOver bizCaseReqStatus = leadConversionAverageService
								.stepOverStatus("Business Requirements", "Not-initiated", "Red");
						overallStatus.add(bizCaseReqStatus);

						LeadStepOver bizCaseApprovalStatus = leadConversionAverageService
								.stepOverStatus("Business Approvals", "Not-initiated", "Red");
						overallStatus.add(bizCaseApprovalStatus);

						LeadStepOver bizCaseSetupStatus = leadConversionAverageService.stepOverStatus("Business Setup",
								"Not-initiated", "Red");
						overallStatus.add(bizCaseSetupStatus);

						return ResponseHandler.generateResponse("lead overall status ", true, HttpStatus.OK,
								overallStatus);
					} else {
						// checking biz case req present or not
						if (leadReqdata.getBiz_id().getStatus().equalsIgnoreCase("Approved")) {
							LeadStepOver bizCaseReqStatus = leadConversionAverageService
									.stepOverStatus("Business Requirements", "Completed", "Green");
							overallStatus.add(bizCaseReqStatus);

							// checking biz approvals & setup present or not
							if (Boolean.TRUE.equals(leadReqdata.getBiz_id().getOverall_status())) {
								LeadStepOver bizCaseApprovalStatus = leadConversionAverageService
										.stepOverStatus("Business Approvals", "Completed", "Green");
								overallStatus.add(bizCaseApprovalStatus);

								if (leadReqdata.getBiz_id().getBizcasesetup() != null) {
									LeadStepOver bizCaseSetupStatus = leadConversionAverageService
											.stepOverStatus("Business Setup", "In-Progress", "Yellow");
									overallStatus.add(bizCaseSetupStatus);
								} else {
									LeadStepOver bizCaseSetupStatus = leadConversionAverageService
											.stepOverStatus("Business Setup", "Not-initiated", "Red");
									overallStatus.add(bizCaseSetupStatus);
								}

							} else {
								LeadStepOver bizCaseApprovalStatus = leadConversionAverageService
										.stepOverStatus("Business Approvals", "In-Progress", "Yellow");
								overallStatus.add(bizCaseApprovalStatus);

								LeadStepOver bizCaseSetupStatus = leadConversionAverageService
										.stepOverStatus("Business Setup", "Not-initiated", "Red");
								overallStatus.add(bizCaseSetupStatus);
							}
						} else {
							LeadStepOver bizCaseReqStatus = leadConversionAverageService
									.stepOverStatus("Business Requirements", "In-Progress", "Yellow");
							overallStatus.add(bizCaseReqStatus);

							LeadStepOver bizCaseApprovalStatus = leadConversionAverageService
									.stepOverStatus("Business Approvals", "Not-initiated", "Red");
							overallStatus.add(bizCaseApprovalStatus);

							LeadStepOver bizCaseSetupStatus = leadConversionAverageService
									.stepOverStatus("Business Setup", "Not-initiated", "Red");
							overallStatus.add(bizCaseSetupStatus);
						}

						return ResponseHandler.generateResponse("Stepover Final Status", true, HttpStatus.OK,
								overallStatus);
					}
				} else {
					LeadStepOver LeadReqStatus = leadConversionAverageService.stepOverStatus("Lead", "In-Progress",
							"Yellow");
					overallStatus.add(LeadReqStatus);

					LeadStepOver bizCaseReqStatus = leadConversionAverageService.stepOverStatus("Business Requirements",
							"Not-initiated", "Red");
					overallStatus.add(bizCaseReqStatus);

					LeadStepOver bizCaseApprovalStatus = leadConversionAverageService
							.stepOverStatus("Business Approvals", "Not-initiated", "Red");
					overallStatus.add(bizCaseApprovalStatus);

					LeadStepOver bizCaseSetupStatus = leadConversionAverageService.stepOverStatus("Business Setup",
							"Not-initiated", "Red");
					overallStatus.add(bizCaseSetupStatus);

					return ResponseHandler.generateResponse("lead overall status ", true, HttpStatus.OK, overallStatus);
				}
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: " + id + " ID Doesn't exist");
				return ResponseHandler.generateResponse(id + " ID Doesn't exist", false, HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Internal Server Error getbyid  : " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	// Send Email to Lead
	@GetMapping("/sendemailtolead")
	public ResponseEntity<Object> emailToLead(Authentication authentication) {

		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

		if (userDetails == null)
			return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);

		if (userDetails.getRolename().equals("ADMIN")) {

			List<LeadRequestModel> leadDatas = leadreq_repository.findAllByActive(true);

			for (LeadRequestModel leadData : leadDatas) {

				Map<String, Object> feedback__remainder = new HashMap<>();
				feedback__remainder.put("reciverName", leadData.getService_receiver_contact_name());
				notificationService.sendFeedBackRemainderMail(leadData.getService_receiver_email_id(),
						"G3C Project Feedback Reminder", feedback__remainder);
			}

			return ResponseHandler.generateResponse("Email has been successfully sent to all the Leads", true,
					HttpStatus.OK, null);

		}

		else {
			return ResponseHandler.generateResponse("Access Denied", false, HttpStatus.OK, null);
		}
	}

}

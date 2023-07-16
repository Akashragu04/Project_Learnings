package com.intelizign.dmgcc.controllers;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.Set;
import java.util.Timer;
import java.util.TimerTask;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.socket.config.WebSocketMessageBrokerStats;

import com.intelizign.dmgcc.authendication.AzureTokenResponse;
import com.intelizign.dmgcc.authendication.AzureUserInfo;
import com.intelizign.dmgcc.authendication.UserDetailsImpl;
import com.intelizign.dmgcc.models.ERole;
import com.intelizign.dmgcc.models.FileUploadModel;
import com.intelizign.dmgcc.models.G3CEmployeeMasterModel;
import com.intelizign.dmgcc.models.LeadConversionModel;
import com.intelizign.dmgcc.models.LeadRequestModel;
import com.intelizign.dmgcc.models.NotificationModel;
import com.intelizign.dmgcc.models.ProjectModel;
import com.intelizign.dmgcc.models.RefreshToken;
import com.intelizign.dmgcc.models.Role;
import com.intelizign.dmgcc.models.SLAApproval;
import com.intelizign.dmgcc.models.businesscasemodels.BusinessApprovalsModel;
import com.intelizign.dmgcc.models.businesscasemodels.BusinessCaseRequest;
import com.intelizign.dmgcc.notification.NotificationServices;
import com.intelizign.dmgcc.pojoclass.SLAContacts;
import com.intelizign.dmgcc.pojoclass.SLAcycle;
import com.intelizign.dmgcc.repositories.BizCaseRequestRepository;
import com.intelizign.dmgcc.repositories.BusinessApprovalsRepository;
import com.intelizign.dmgcc.repositories.FileUploadRepository;
import com.intelizign.dmgcc.repositories.G3CEmployeeRepository;
import com.intelizign.dmgcc.repositories.LeadBusinessRepository;
import com.intelizign.dmgcc.repositories.LeadConversionRepository;
import com.intelizign.dmgcc.repositories.NotificationRepository;
import com.intelizign.dmgcc.repositories.ProjectRepository;
import com.intelizign.dmgcc.repositories.RoleRepository;
import com.intelizign.dmgcc.repositories.SLAPreInvoiceRepository;
import com.intelizign.dmgcc.repositories.SLARepository;
import com.intelizign.dmgcc.repositories.SLAapprovalRepository;
import com.intelizign.dmgcc.request.SignupRequest;
import com.intelizign.dmgcc.request.SupportingFiles;
import com.intelizign.dmgcc.response.JwtResponse;
import com.intelizign.dmgcc.response.MessageResponse;
import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.response.TokenRefreshResponse;
import com.intelizign.dmgcc.response.myssc.MySSCInvoiceResponse;
import com.intelizign.dmgcc.response.myssc.MySSCSLAApprovedResponce;
import com.intelizign.dmgcc.services.EmailServiceImpl;
import com.intelizign.dmgcc.services.FilesStorageServicePath;
import com.intelizign.dmgcc.services.G3CEmployeeService;
import com.intelizign.dmgcc.services.MySSCAPIServices;
import com.intelizign.dmgcc.services.RefreshTokenService;
import com.intelizign.dmgcc.services.SLAService;
import com.intelizign.dmgcc.services.TokenGeneratorService;
import com.intelizign.dmgcc.services.UserDetailsServiceImpl;
import com.intelizign.dmgcc.utils.JwtUtils;
import com.intelizign.dmgcc.utils.TokenRefreshException;

@EnableAsync
@RestController
@RequestMapping("/auth")
public class AuthendicationController {

	@Autowired
	WebSocketMessageBrokerStats webSocketMessageBrokerStats;

	@Autowired
	G3CEmployeeRepository g3cEmployeeRepository;

	@Autowired
	SLARepository slaRepository;

	@Autowired
	SLAService slaservice;

	@Autowired
	SLAapprovalRepository slaApprovalRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	ProjectRepository projectRepository;

	@Autowired
	JwtUtils jwtUtils;

	@Autowired
	RefreshTokenService refreshTokenService;

	@Autowired
	private EmailServiceImpl notificationService;

	@Autowired
	private TokenGeneratorService forgotService;

	@Autowired
	private BizCaseRequestRepository bizcasereqrepo;

	@Autowired
	private BusinessApprovalsRepository bizcaseapprovalrepo;

	@Autowired
	private FileUploadRepository fileUploadRepository;

	@Autowired
	private LeadConversionRepository leadConversionRepository;

	@Autowired
	private LeadBusinessRepository leadreq_repository;

	@Autowired
	private NotificationRepository notificationRepository;

	@Autowired
	private TokenGeneratorService tokenGeneratorService;

	@Autowired
	SimpMessagingTemplate template;

	@Autowired
	EmailServiceImpl emailServiceImpl;

	@Autowired
	FilesStorageServicePath fileuploadservice;

	private String token = null;

	@Autowired
	private Environment env;

	@Autowired
	private MySSCAPIServices mysscslaservice;

	@Autowired
	private UserDetailsServiceImpl userDetailsService;

	@Autowired
	private AzureUserInfo azureUserInfo;

	@Autowired
	private NotificationServices notificationServices;

	@Autowired
	private SLAPreInvoiceRepository slaPreInvoiceReposito;

	public final Logger LOGGER = LogManager.getLogger(AuthendicationController.class);

	AuthendicationController(G3CEmployeeRepository g3cEmployeeRepository, RoleRepository roleRepository) {
		this.g3cEmployeeRepository = g3cEmployeeRepository;
		this.roleRepository = roleRepository;
	}

	@GetMapping("/signin")
	public ResponseEntity<Object> authenticateUser(HttpServletRequest request, HttpServletResponse response) {
		try {

			AzureTokenResponse result = azureUserInfo.getUserInfo(request);

			if (result != null) {

				Optional<G3CEmployeeMasterModel> userinfo = g3cEmployeeRepository.findUserByEmail(result.getEmail());

				G3CEmployeeMasterModel userDetailsinfo = new G3CEmployeeMasterModel();
				if (userinfo.isPresent()) {
					UserDetails userDetails = userDetailsService.loadUserByUsername(userinfo.get().getEmail());

					UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
							userDetails, null, userDetails.getAuthorities());
					authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

					SecurityContextHolder.getContext().setAuthentication(authentication);

					UserDetailsImpl userinfosecurity = (UserDetailsImpl) authentication.getPrincipal();

					String jwt = jwtUtils.generateJwtToken(userinfosecurity);

//					String roles = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList()
//							.get(0);

					RefreshToken newRefreshToken = refreshTokenService.createRefreshToken(userinfosecurity.getId());

					ResponseCookie tokencookie = ResponseCookie.from("token", jwt).httpOnly(false).secure(true)
							.domain(env.getProperty("newsletter.cookies.allow.domain")).path("/")
							.maxAge(7 * 24 * 60 * (long) 60).build();

					ResponseCookie refreshtokencookie = ResponseCookie.from("refreshtoken", newRefreshToken.getToken())
							.httpOnly(false).secure(true).domain(env.getProperty("newsletter.cookies.allow.domain"))
							.path("/").maxAge(7 * 24 * 60 * (long) 60).build();

					response.addHeader("Set-Cookie", tokencookie.toString());
					response.addHeader("Set-Cookie", refreshtokencookie.toString());

					userDetailsinfo = userinfo.get();

					// Get Notification Details to login user
					SendNotificationToLoginUser(userDetailsinfo.getShortid());

					return ResponseHandler.generateResponse("Login Successfully", true, HttpStatus.OK,
							new JwtResponse(userDetailsinfo.getId(), userDetailsinfo.getEmp_name(),
									userDetailsinfo.getEmail(), userDetailsinfo.getEmployee_code(),
									userDetailsinfo.getDesignation(), userDetailsinfo.getLevel(),
									userDetailsinfo.getGrade(), userDetailsinfo.getLocations(),
									userDetailsinfo.getSupporting_hr(), userDetailsinfo.getEmployement_status(),
									userDetailsinfo.getDate_of_join(), userDetailsinfo.getReport_to(),
									userDetailsinfo.getCategory(), userDetailsinfo.getRolename(),
									userDetailsinfo.getShortid(), false, userDetailsinfo.getEmp_name()));
				}
				return ResponseHandler.generateResponse("This is new user", true, HttpStatus.OK,
						new JwtResponse(userDetailsinfo.getId(), userDetailsinfo.getEmp_name(),
								userDetailsinfo.getEmail(), userDetailsinfo.getEmployee_code(),
								userDetailsinfo.getDesignation(), userDetailsinfo.getLevel(),
								userDetailsinfo.getGrade(), userDetailsinfo.getLocations(),
								userDetailsinfo.getSupporting_hr(), userDetailsinfo.getEmployement_status(),
								userDetailsinfo.getDate_of_join(), userDetailsinfo.getReport_to(),
								userDetailsinfo.getCategory(), userDetailsinfo.getRolename(),
								userDetailsinfo.getShortid(), true, userDetailsinfo.getEmp_name()));

			} else {
				return ResponseHandler.generateResponse("Error While Getting Azure User Info:", false, HttpStatus.OK,
						null);
			}

		} catch (Exception e) {
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin: " + e.getMessage(), false,
					HttpStatus.OK, null);

		}
	}

	@GetMapping("/createcustomer")
	public ResponseEntity<Object> CreateNewCustomer(HttpServletRequest request, HttpServletResponse response) {
		try {
			AzureTokenResponse result = azureUserInfo.getUserInfo(request);
			if (result != null) {

				G3CEmployeeMasterModel userDetailsinfo = createNewUser(result);

//				G3CEmployeeMasterModel userDetailsinfo = new G3CEmployeeMasterModel();
				UserDetails userDetails = userDetailsService.loadUserByUsername(userDetailsinfo.getEmail());

				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

				SecurityContextHolder.getContext().setAuthentication(authentication);

				UserDetailsImpl userinfosecurity = (UserDetailsImpl) authentication.getPrincipal();

				String jwt = jwtUtils.generateJwtToken(userinfosecurity);

//					String roles = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList()
//							.get(0);

				RefreshToken newRefreshToken = refreshTokenService.createRefreshToken(userinfosecurity.getId());

				ResponseCookie tokencookie = ResponseCookie.from("token", jwt).httpOnly(false).secure(true)
						.domain(env.getProperty("newsletter.cookies.allow.domain")).path("/")
						.maxAge(7 * 24 * 60 * (long) 60).build();

				ResponseCookie refreshtokencookie = ResponseCookie.from("refreshtoken", newRefreshToken.getToken())
						.httpOnly(false).secure(true).domain(env.getProperty("newsletter.cookies.allow.domain"))
						.path("/").maxAge(7 * 24 * 60 * (long) 60).build();

				response.addHeader("Set-Cookie", tokencookie.toString());
				response.addHeader("Set-Cookie", refreshtokencookie.toString());

				return ResponseHandler.generateResponse("Login Successfully", true, HttpStatus.OK,
						new JwtResponse(userDetailsinfo.getId(), userDetailsinfo.getEmp_name(),
								userDetailsinfo.getEmail(), userDetailsinfo.getEmployee_code(),
								userDetailsinfo.getDesignation(), userDetailsinfo.getLevel(),
								userDetailsinfo.getGrade(), userDetailsinfo.getLocations(),
								userDetailsinfo.getSupporting_hr(), userDetailsinfo.getEmployement_status(),
								userDetailsinfo.getDate_of_join(), userDetailsinfo.getReport_to(),
								userDetailsinfo.getCategory(), userDetailsinfo.getRolename(),
								userDetailsinfo.getShortid(), false, userDetailsinfo.getEmp_name()));

			} else {
				return ResponseHandler.generateResponse("Error While Getting Azure User Info:", false, HttpStatus.OK,
						null);
			}

		} catch (Exception e) {
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin: " + e.getMessage(), false,
					HttpStatus.OK, null);

		}
	}

	private G3CEmployeeMasterModel createNewUser(AzureTokenResponse newUserInfo) {

		G3CEmployeeMasterModel user = new G3CEmployeeMasterModel("Customer001", "Customer001", newUserInfo.getEmail(),
				newUserInfo.getName());
		if (g3cEmployeeRepository.existsByEmailOrShortid(newUserInfo.getEmail(), "CUSTOMER001"))
			return null;
		Set<Role> roles = new HashSet<>();

		Role cusRole = roleRepository.findByName(ERole.CUSTOMER)
				.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
		roles.add(cusRole);
		user.setRolename(cusRole.getName().toString());
		user.setShortid("CUSTOMER001");
		user.setDate_of_join(LocalDate.now());
		user.setEmployee_type("Internal Resource");
		user.setStatus(true);
		user.setRoles(roles);
		g3cEmployeeRepository.save(user);

		return user;
	}

	@Async
	private void SendNotificationToLoginUser(String shortid) {
		try {
			List<NotificationModel> notificationdataList = notificationRepository.findByShortidAndActive(shortid, true);
			if (!notificationdataList.isEmpty()) {
				new Timer().schedule(new TimerTask() {
					@Override
					public void run() {
						template.convertAndSendToUser(shortid, "/messages", notificationdataList);
						LOGGER.info("Notification Send Successfully");
					}
				}, 10000);
			} else {

				LOGGER.info("There is no active notification");
			}
		} catch (Exception e) {
			LOGGER.error("Notification Error: {}.", e.getMessage());
		}

	}

	@PostMapping("/signup")
	public ResponseEntity<Object> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		try {
			if (Boolean.TRUE.equals(g3cEmployeeRepository.existsByUsername(signUpRequest.getUsername()))) {
				LOGGER.error("Username is already taken!");
				return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
			}

			if (Boolean.TRUE.equals(g3cEmployeeRepository.existsByEmail(signUpRequest.getEmail()))) {
				LOGGER.error("Email is already in use!");
				return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
			}

			G3CEmployeeMasterModel user = new G3CEmployeeMasterModel(signUpRequest.getUsername(),
					signUpRequest.getPassword(), signUpRequest.getEmployee_code(), signUpRequest.getHrwt_code(),
					signUpRequest.getKim_no(), signUpRequest.getDesignation(), signUpRequest.getFunctions(),
					signUpRequest.getDepartment_id(), signUpRequest.getLevel(), signUpRequest.getGrade(),
					signUpRequest.getLocations(), signUpRequest.getSupporting_hr(),
					signUpRequest.getEmployement_status(), signUpRequest.getIndianexpat(),
					signUpRequest.getDate_of_join(), signUpRequest.getDate_of_leave(), signUpRequest.getSupv_id(),
					signUpRequest.getReport_to(), signUpRequest.getCost_center(), signUpRequest.getGet_mt_det(),
					signUpRequest.getEmail(), signUpRequest.getSub_function(), signUpRequest.getApprover1(),
					signUpRequest.getApprover_name(), signUpRequest.getCategory(), signUpRequest.getEmpl_class(),
					signUpRequest.getBusiness(), signUpRequest.getShortid(), signUpRequest.getDepartment(), true,
					signUpRequest.getEmp_name(), signUpRequest.getTotal_prior_experience(),
					signUpRequest.getExperience_dicv(), signUpRequest.getTotal_experience());

			String strRoles = signUpRequest.getRoles();
			Set<Role> roles = new HashSet<>();

			if (strRoles == null) {
				LOGGER.error("Employee Should have minimum one Role");
				return ResponseEntity.badRequest().body(new MessageResponse("Employee Should have minimum one Role"));
			} else {
				switch (strRoles) {
				case "business":
					Role busRole = roleRepository.findByName(ERole.BUSINESS)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(busRole);
					user.setRolename(busRole.getName().toString());

					break;
				case "customer":
					Role cusRole = roleRepository.findByName(ERole.CUSTOMER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(cusRole);
					user.setRolename(cusRole.getName().toString());

					break;
				case "facility":
					Role facRole = roleRepository.findByName(ERole.FACILITY)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(facRole);
					user.setRolename(facRole.getName().toString());

					break;
				case "hr":
					Role hrRole = roleRepository.findByName(ERole.HR)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(hrRole);
					user.setRolename(hrRole.getName().toString());

					break;
				case "it":
					Role itRole = roleRepository.findByName(ERole.IT)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(itRole);
					user.setRolename(itRole.getName().toString());

					break;
				case "finance":
					Role finRole = roleRepository.findByName(ERole.FINANCE)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(finRole);
					user.setRolename(finRole.getName().toString());

					break;
				case "employee":
					Role empRole = roleRepository.findByName(ERole.EMPLOYEE)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(empRole);
					user.setRolename(empRole.getName().toString());

					break;
				case "admin":
					Role adminRole = roleRepository.findByName(ERole.ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);
					user.setRolename(adminRole.getName().toString());

					break;
				default:

					LOGGER.error("Role is not found. Enter valid role");
					return ResponseHandler.generateResponse("Invalid Role: " + strRoles, false, HttpStatus.OK, null);
				}
			}

			user.setHrid(signUpRequest.getHrid());
			user.setStatus(true);
			user.setRoles(roles);
			g3cEmployeeRepository.save(user);

			return ResponseEntity.ok(new MessageResponse("User Registered Successfully!"));
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while signup: {}.", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	@PostMapping("/registeradmin")
	public ResponseEntity<Object> registerAdminUser(@RequestBody List<G3CEmployeeMasterModel> allsignUpRequest) {
		try {

			for (G3CEmployeeMasterModel signUpRequest : allsignUpRequest) {

				if (g3cEmployeeRepository.findByshortid(signUpRequest.getShortid()) == null) {

					if (Boolean.TRUE.equals(g3cEmployeeRepository.existsByEmail(signUpRequest.getEmail()))) {
						LOGGER.error("Email is already in use!");
						return ResponseHandler.generateResponse("Email  Already Exits", false, HttpStatus.OK, null);
					}
					G3CEmployeeMasterModel employee = new G3CEmployeeMasterModel();

					employee.setShortid(signUpRequest.getShortid());
					employee.setEmail(signUpRequest.getEmail());
					employee.setEmployee_code(signUpRequest.getEmployee_code());
					employee.setHrwt_code(signUpRequest.getHrwt_code());
					employee.setKim_no(signUpRequest.getKim_no());
					employee.setDesignation(signUpRequest.getDesignation());
					employee.setFunctions(signUpRequest.getFunctions());
					employee.setDepartment_id(signUpRequest.getDepartment_id());
					employee.setLevel(signUpRequest.getLevel());
					employee.setGrade(signUpRequest.getGrade());
					employee.setEmployement_status(signUpRequest.getEmployement_status());
					employee.setDate_of_leave(signUpRequest.getDate_of_leave());
					employee.setSupv_id(signUpRequest.getSupv_id());
					employee.setReport_to(signUpRequest.getReport_to());
					employee.setCost_center(signUpRequest.getCost_center());
					employee.setSub_function(signUpRequest.getSub_function());
					employee.setDepartment(signUpRequest.getDepartment());
					employee.setEmp_name(signUpRequest.getEmp_name());
					employee.setStatus_updated(signUpRequest.getStatus_updated());
					employee.setStatus_updated_datetime(signUpRequest.getStatus_updated_datetime());

					Set<Role> roles = new HashSet<>();

					Role cusRole = roleRepository.findByName(ERole.ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(cusRole);
					employee.setRolename(cusRole.getName().toString());

					employee.setRoles(roles);

					g3cEmployeeRepository.save(employee);
				}

				else {

					G3CEmployeeMasterModel employee = g3cEmployeeRepository.findByshortid(signUpRequest.getShortid());
					signUpRequest.setShortid(signUpRequest.getShortid());
					employee.setEmail(signUpRequest.getEmail());
					employee.setEmployee_code(signUpRequest.getEmployee_code());
					employee.setHrwt_code(signUpRequest.getHrwt_code());
					employee.setKim_no(signUpRequest.getKim_no());
					employee.setDesignation(signUpRequest.getDesignation());
					employee.setFunctions(signUpRequest.getFunctions());
					employee.setDepartment_id(signUpRequest.getDepartment_id());
					employee.setLevel(signUpRequest.getLevel());
					employee.setGrade(signUpRequest.getGrade());
					employee.setEmployement_status(signUpRequest.getEmployement_status());
					employee.setDate_of_leave(signUpRequest.getDate_of_leave());
					employee.setSupv_id(signUpRequest.getSupv_id());
					employee.setReport_to(signUpRequest.getReport_to());
					employee.setCost_center(signUpRequest.getCost_center());
					employee.setSub_function(signUpRequest.getSub_function());
					employee.setDepartment(signUpRequest.getDepartment());
					employee.setEmp_name(signUpRequest.getEmp_name());
					employee.setStatus_updated(signUpRequest.getStatus_updated());
					employee.setStatus_updated_datetime(signUpRequest.getStatus_updated_datetime());

					Set<Role> roles = new HashSet<>();

					Role cusRole = roleRepository.findByName(ERole.ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(cusRole);
					employee.setRolename(cusRole.getName().toString());

					employee.setRoles(roles);

					g3cEmployeeRepository.save(employee);

				}
			}
			return ResponseHandler.generateResponse("List of Employees inserted", true, HttpStatus.OK, null);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while registeralluser:" + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	@PutMapping("/setadmin")
	public ResponseEntity<Object> setUseradmin(@RequestParam String emailid) {
		try {
			Optional<G3CEmployeeMasterModel> adminuserexist = g3cEmployeeRepository.findUserByEmail(emailid);
			if (adminuserexist.isPresent()) {
				G3CEmployeeMasterModel adminuser = adminuserexist.get();
				Set<Role> roles = new HashSet<>();

				Role admin = roleRepository.findByName(ERole.ADMIN)
						.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
				roles.add(admin);
				adminuser.setRoles(roles);
				adminuser.setRolename("ADMIN");
				g3cEmployeeRepository.save(adminuser);
				return ResponseHandler.generateResponse("User has Admin Access now", true, HttpStatus.OK, null);
			} else

				return ResponseHandler.generateResponse("Email ID doesn't exist", false, HttpStatus.OK, null);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while registeralluser:" + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	@PostMapping("/signupmultiple")
	public ResponseEntity<Object> registermultiUsers(@Valid @RequestBody List<SignupRequest> allsignUpRequest) {
		try {
			for (SignupRequest signUpRequest : allsignUpRequest) {
				if (Boolean.TRUE.equals(g3cEmployeeRepository.existsByUsername(signUpRequest.getUsername()))) {
					LOGGER.error("Username is already taken!");
					return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
				}

				if (Boolean.TRUE.equals(g3cEmployeeRepository.existsByEmail(signUpRequest.getEmail()))) {
					LOGGER.error("Email is already in use!");
					return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
				}

				G3CEmployeeMasterModel user = new G3CEmployeeMasterModel(signUpRequest.getUsername(),
						signUpRequest.getPassword(), signUpRequest.getEmployee_code(), signUpRequest.getHrwt_code(),
						signUpRequest.getKim_no(), signUpRequest.getDesignation(), signUpRequest.getFunctions(),
						signUpRequest.getDepartment_id(), signUpRequest.getLevel(), signUpRequest.getGrade(),
						signUpRequest.getLocations(), signUpRequest.getSupporting_hr(),
						signUpRequest.getEmployement_status(), signUpRequest.getIndianexpat(),
						signUpRequest.getDate_of_join(), signUpRequest.getDate_of_leave(), signUpRequest.getSupv_id(),
						signUpRequest.getReport_to(), signUpRequest.getCost_center(), signUpRequest.getGet_mt_det(),
						signUpRequest.getEmail(), signUpRequest.getSub_function(), signUpRequest.getApprover1(),
						signUpRequest.getApprover_name(), signUpRequest.getCategory(), signUpRequest.getEmpl_class(),
						signUpRequest.getBusiness(), signUpRequest.getShortid(), signUpRequest.getDepartment(), true,
						signUpRequest.getEmp_name(), signUpRequest.getTotal_prior_experience(),
						signUpRequest.getExperience_dicv(), signUpRequest.getTotal_experience());

				String strRoles = signUpRequest.getRoles();
				Set<Role> roles = new HashSet<>();

				if (strRoles == null) {
					LOGGER.error("Employee Should have minimum one Role");
					return ResponseEntity.badRequest()
							.body(new MessageResponse("Employee Should have minimum one Role"));
				} else {
					switch (strRoles) {
					case "business":
						Role busRole = roleRepository.findByName(ERole.BUSINESS)
								.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
						roles.add(busRole);
						user.setRolename(busRole.getName().toString());

						break;
					case "customer":
						Role cusRole = roleRepository.findByName(ERole.CUSTOMER)
								.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
						roles.add(cusRole);
						user.setRolename(cusRole.getName().toString());

						break;
					case "facility":
						Role facRole = roleRepository.findByName(ERole.FACILITY)
								.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
						roles.add(facRole);
						user.setRolename(facRole.getName().toString());

						break;
					case "hr":
						Role hrRole = roleRepository.findByName(ERole.HR)
								.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
						roles.add(hrRole);
						user.setRolename(hrRole.getName().toString());

						break;
					case "it":
						Role itRole = roleRepository.findByName(ERole.IT)
								.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
						roles.add(itRole);
						user.setRolename(itRole.getName().toString());

						break;
					case "finance":
						Role finRole = roleRepository.findByName(ERole.FINANCE)
								.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
						roles.add(finRole);
						user.setRolename(finRole.getName().toString());

						break;
					case "employee":
						Role empRole = roleRepository.findByName(ERole.EMPLOYEE)
								.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
						roles.add(empRole);
						user.setRolename(empRole.getName().toString());

						break;
					case "admin":
						Role adminRole = roleRepository.findByName(ERole.ADMIN)
								.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
						roles.add(adminRole);
						user.setRolename(adminRole.getName().toString());

						break;
					default:

						LOGGER.error("Role is not found. Enter valid role");
					}
				}
				user.setHrid(signUpRequest.getHrid());
				user.setStatus(true);
				user.setRoles(roles);
				g3cEmployeeRepository.save(user);
			}

			return ResponseEntity.ok(new MessageResponse("User Registered Successfully!"));
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while signup: {}.", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	@PostMapping("/refreshtoken")
	public ResponseEntity<Object> refreshtoken(HttpServletRequest request, HttpServletResponse response) {
		try {

			String refreshToken = Arrays.stream(request.getCookies()).filter(c -> c.getName().equals("refreshtoken"))
					.findFirst().map(Cookie::getValue).orElse(null);

			return refreshTokenService.findByToken(refreshToken).map(refreshTokenService::verifyExpiration)
					.map(RefreshToken::getEmployee).map(user -> {
						String newToken = jwtUtils.generateTokenFromUsername(user.getUsername());

						ResponseCookie tokencookie = ResponseCookie.from("token", newToken).httpOnly(false).secure(true)
								.domain(env.getProperty("g3c.cookies.allow.domain")).path("/")
								.maxAge(7 * 24 * 60 * (long) 60).build();

						ResponseCookie refreshtokencookie = ResponseCookie.from("refreshtoken", refreshToken)
								.httpOnly(false).secure(true).domain(env.getProperty("g3c.cookies.allow.domain"))
								.path("/").maxAge(7 * 24 * 60 * (long) 60).build();

						// add cookie to response
						response.addHeader("Set-Cookie", tokencookie.toString());
						response.addHeader("Set-Cookie", refreshtokencookie.toString());

						return ResponseHandler.generateResponse("Token Refresh Successfully", true, HttpStatus.OK,
								new TokenRefreshResponse(token, refreshToken));
					}).orElseThrow(() -> new TokenRefreshException(refreshToken, "Refresh token is not in database!"));

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while refreshtoken: {}.", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	@GetMapping("/logout")
	public ResponseEntity<Object> logoutUser(HttpServletResponse response, HttpServletRequest request) {
		try {

			if (request.getCookies() != null) {
				token = Arrays.stream(request.getCookies()).filter(c -> c.getName().equals("token")).findFirst()
						.map(Cookie::getValue).orElse(null);

				refreshTokenService.deletetoken(token);

			}

			ResponseCookie tokencookie = ResponseCookie.from("token", null).httpOnly(false).secure(true)
					.domain(env.getProperty("g3c.cookies.allow.domain")).path("/").maxAge(0).build();

			ResponseCookie refreshtokencookie = ResponseCookie.from("refreshtoken", null).httpOnly(false).secure(true)
					.domain(env.getProperty("g3c.cookies.allow.domain")).path("/").maxAge(0).build();

			response.addHeader("Set-Cookie", tokencookie.toString());
			response.addHeader("Set-Cookie", refreshtokencookie.toString());

			return ResponseHandler.generateResponse("Logout successful!", true, HttpStatus.OK, null);
		} catch (Exception ex) {

			LOGGER.error("While logout : {}.", ex.getMessage());
			ResponseCookie tokencookie = ResponseCookie.from("token", null).httpOnly(false).secure(true)
					.domain(env.getProperty("g3c.cookies.allow.domain")).path("/").maxAge(0).build();

			ResponseCookie refreshtokencookie = ResponseCookie.from("refreshtoken", null).httpOnly(false).secure(true)
					.domain(env.getProperty("g3c.cookies.allow.domain")).path("/").maxAge(0).build();
			response.addHeader("Set-Cookie", tokencookie.toString());
			response.addHeader("Set-Cookie", refreshtokencookie.toString());

			return ResponseHandler.generateResponse("Logout successful!", true, HttpStatus.OK, null);
		}

	}

	@GetMapping("/forgotpassword")
	public ResponseEntity<Object> forgotPassword(@RequestParam("email") String email) {

		Optional<G3CEmployeeMasterModel> userOptional = Optional.ofNullable(g3cEmployeeRepository.findByEmail(email));

		if (!userOptional.isPresent()) {
			return ResponseHandler.generateResponse("Invalid Email ID!", false, HttpStatus.OK, null);
		}

		G3CEmployeeMasterModel currentuser = userOptional.get();
		String response = forgotService.forgotPassword(currentuser);

		try {
			Map<String, Object> model = new HashMap<>();
			model.put("providerName", "G3C Team");
			model.put("reciverName", currentuser.getUsername());
			model.put("passwordlink", env.getProperty("g3c.frontend.app.domain") + "reset-password/" + response);
			model.put("aboutlink", "https://asia.daimlertruck.com/");
			notificationService.sendForgetMail(email, model);

			return ResponseHandler.generateResponse("Reset Password link sent to registered email", true, HttpStatus.OK,
					null);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while forgetpassword:{}.", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	@GetMapping("/reset-password")
	public ResponseEntity<Object> resetPassword(@RequestParam String token, @RequestParam String password) {

		try {
			return forgotService.resetPassword(token, password);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while reset_password:{}.", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	// Bulk Insert
	@PostMapping("/insertrole")
	public ResponseEntity<Object> insertAll() {
		try {
			List<Role> roledataList = roleRepository.findAll();

			if (roledataList.isEmpty()) {

				Role Brole = new Role(1, ERole.BUSINESS);
				Role Crole = new Role(2, ERole.CUSTOMER);
				Role Frole = new Role(3, ERole.FACILITY);
				Role Hrole = new Role(4, ERole.HR);
				Role Irole = new Role(5, ERole.IT);
				Role Finrole = new Role(6, ERole.FINANCE);
				Role Erole = new Role(7, ERole.EMPLOYEE);
				Role Arole = new Role(8, ERole.ADMIN);
				roledataList.add(Brole);
				roledataList.add(Crole);
				roledataList.add(Frole);
				roledataList.add(Hrole);
				roledataList.add(Irole);
				roledataList.add(Finrole);
				roledataList.add(Erole);
				roledataList.add(Arole);

				roleRepository.saveAll(roledataList);

				return ResponseHandler.generateResponse("Role Added Successfully", true, HttpStatus.OK, null);

			} else {
				return ResponseHandler.generateResponse("Role Already Added", true, HttpStatus.OK, null);
			}
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while insertrole:{}.", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	@PostMapping("/registeralluser")
	public ResponseEntity<Object> registerAllUser() {
		try {
			List<G3CEmployeeMasterModel> employeedataList = g3cEmployeeRepository.findAll();

			if (employeedataList.isEmpty()) {
				LocalDate date1 = LocalDate.of(2019, 4, 27);
				LocalDate date2 = LocalDate.of(2020, 6, 29);
				LocalDate date3 = LocalDate.of(2015, 8, 15);
				LocalDate date4 = LocalDate.of(2015, 7, 5);
				LocalDate date5 = LocalDate.of(2015, 2, 9);
				LocalDate date6 = LocalDate.of(2015, 1, 30);
				LocalDate date7 = LocalDate.of(2015, 2, 9);

				Set<Role> busroles = new HashSet<>();
				Set<Role> cusroles = new HashSet<>();
				Set<Role> facroles = new HashSet<>();
				Set<Role> hrroles = new HashSet<>();
				Set<Role> itroles = new HashSet<>();
				Set<Role> finaceroles = new HashSet<>();
				Set<Role> employeeroles = new HashSet<>();
				Set<Role> adminroles = new HashSet<>();

				Role busRole = roleRepository.findByName(ERole.BUSINESS)
						.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
				Role cusRole = roleRepository.findByName(ERole.CUSTOMER)
						.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
				Role facRole = roleRepository.findByName(ERole.FACILITY)
						.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
				Role itRole = roleRepository.findByName(ERole.IT)
						.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
				Role hrRole = roleRepository.findByName(ERole.HR)
						.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
				Role financeRole = roleRepository.findByName(ERole.FINANCE)
						.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
				Role employeeRole = roleRepository.findByName(ERole.EMPLOYEE)
						.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
				Role adminRole = roleRepository.findByName(ERole.ADMIN)
						.orElseThrow(() -> new RuntimeException("Error: Role is not found."));

				busroles.add(busRole);
				cusroles.add(cusRole);
				facroles.add(facRole);
				itroles.add(itRole);
				hrroles.add(hrRole);
				finaceroles.add(financeRole);
				employeeroles.add(employeeRole);
				adminroles.add(adminRole);

				G3CEmployeeMasterModel busemp = new G3CEmployeeMasterModel("business", "business001", "EMP001",
						"HRT001", "10400", "Business Lead", "Business Manager", "BUS001", "3", "A", "India", "Willson",
						"Active", "4500", date1, null, "10001", "Suresh", "6366-5501", null,
						"g3cbusinessuser@sureshkrishnan2207gmail.onmicrosoft.com", null, "Approveruser",
						"Aprrover_Name", "G3C", null, "Yes", "BUS001", "Business Department", true, "User Business",
						"3", "2", "5");

				G3CEmployeeMasterModel cusemp = new G3CEmployeeMasterModel("customer", "customer001", "EMP002",
						"HRT002", "10500", "Customer Lead", "Customer Superant", "CUS001", "3", "A", "China", "Willson",
						"Active", "4501", date2, null, "10002", "Suresh", "6366-5501", null,
						"g3ccustomeruser@sureshkrishnan2207gmail.onmicrosoft.com", null, "Approveruser",
						"Aprrover_Name", "G3C", null, "Yes", "CUS001", "Customer Department", true, "User Customer",
						"3", "2", "5");

				G3CEmployeeMasterModel facemp = new G3CEmployeeMasterModel("facility", "facility001", "EMP003",
						"HRT003", "10600", "Facility Lead", "Facility Manager", "FAC001", "3", "A", "India", "Willson",
						"Active", "4502", date3, null, "10003", "Suresh", "6366-5501", null,
						"facility001@mailinator.com", null, "Approveruser", "Aprrover_Name", "G3C", null, "Yes",
						"FAC001", "Facility Department", true, "User Facility", "3", "2", "5");

				G3CEmployeeMasterModel hremp = new G3CEmployeeMasterModel("hr", "hr001", "EMP004", "HRT004", "10700",
						"HR Lead", "HR Manager", "HR001", "3", "A", "India", "Willson", "Active", "4503", date4, null,
						"10004", "Suresh", "6366-5501", null, "g3chruser@sureshkrishnan2207gmail.onmicrosoft.com", null,
						"Approveruser", "Aprrover_Name", "G3C", null, "Yes", "HR001", "HR Department", true, "User HR",
						"3", "2", "5");

				G3CEmployeeMasterModel itemp = new G3CEmployeeMasterModel("it", "it001", "EMP005", "HRT005", "10800",
						"IT Lead", "IT Manager", "IT001", "3", "A", "India", "Willson", "Active", "4504", date5, null,
						"10005", "Suresh", "6366-5501", null, "g3cituser@sureshkrishnan2207gmail.onmicrosoft.com", null,
						"Approveruser", "Aprrover_Name", "G3C", null, "Yes", "IT001", "IT Department", true, "User IT",
						"3", "2", "5");

				G3CEmployeeMasterModel finaceemp = new G3CEmployeeMasterModel("finance", "finance001", "EMP006",
						"HRT006", "10900", "Finance Lead", "Finance Manager", "OPR001", "3", "A", "India", "Willson",
						"Active", "4505", date6, null, "10006", "Suresh", "6366-5501", null,
						"g3cfinanceuser@sureshkrishnan2207gmail.onmicrosoft.com", null, "Approveruser", "Aprrover_Name",
						"G3C", null, "Yes", "FIN001", "Finance Department", true, "User Operation", "3", "2", "5");

				G3CEmployeeMasterModel employeeemp = new G3CEmployeeMasterModel("employee", "employee001", "EMP009",
						"HRT009", "10000", "Employee Lead", "Employee Manager", "EMP001", "3", "A", "India", "Willson",
						"Active", "4505", date6, null, "10006", "Suresh", "6366-5501", null,
						"employee001@mailinator.com", null, "Approveruser", "Aprrover_Name", "G3C", null, "Yes",
						"EMP001", "Employee Department", true, "User Operation", "3", "2", "5");

				G3CEmployeeMasterModel adminemp = new G3CEmployeeMasterModel("admin", "admin001", "EMP007", "HRT007",
						"10000", "Admin Lead", "Admin", "admin0001", "3", "A", "India", "Willson", "Active", "4505",
						date7, null, "10007", "Suresh", "6366-5501", null,
						"g3cadminuser@sureshkrishnan2207gmail.onmicrosoft.com", null, "Approveruser", "Aprrover_Name",
						"G3C", null, "Yes", "ADMIN001", "Admin Department", true, "User Admin", "3", "2", "5");

				busemp.setRoles(busroles);
				cusemp.setRoles(cusroles);
				facemp.setRoles(facroles);
				itemp.setRoles(itroles);
				hremp.setRoles(hrroles);
				finaceemp.setRoles(finaceroles);
				employeeemp.setRoles(employeeroles);
				adminemp.setRoles(adminroles);

				busemp.setRolename(busRole.getName().toString());
				cusemp.setRolename(cusRole.getName().toString());
				facemp.setRolename(facRole.getName().toString());
				itemp.setRolename(itRole.getName().toString());
				hremp.setRolename(hrRole.getName().toString());
				finaceemp.setRolename(financeRole.getName().toString());
				employeeemp.setRolename(employeeRole.getName().toString());
				adminemp.setRolename(adminRole.getName().toString());

				busemp.setHrid("Emp001");
				cusemp.setHrid("Emp002");
				facemp.setHrid("Emp003");
				itemp.setHrid("Emp004");
				hremp.setHrid("Emp005");
				finaceemp.setHrid("Emp006");
				employeeemp.setHrid("Emp007");
				adminemp.setHrid("Emp008");

				employeedataList.add(busemp);
				employeedataList.add(cusemp);
				employeedataList.add(facemp);
				employeedataList.add(itemp);
				employeedataList.add(hremp);
				employeedataList.add(finaceemp);
				employeedataList.add(employeeemp);
				employeedataList.add(adminemp);

				g3cEmployeeRepository.saveAll(employeedataList);
				return ResponseHandler.generateResponse("Employees Registered Successfully", true, HttpStatus.OK, null);

			} else {
				return ResponseHandler.generateResponse("Employees Already Registered", true, HttpStatus.OK, null);
			}
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while registeralluser:{}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	@PostMapping("/checkuploads")
	public ResponseEntity<Object> getnotificationcount(@RequestParam("file") MultipartFile file) {
		try {
			String filename = fileuploadservice.save(file);
			return ResponseHandler.generateResponse("File Upload Successfully", true, HttpStatus.OK, filename);

		} catch (Exception e) {

			LOGGER.error("Internal Server Error while registeralluser:{}.", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	@GetMapping("/attachments/{filename:.+}")
	@ResponseBody
	public ResponseEntity<Resource> getFile(@PathVariable String filename) {
		try {

			Resource file = fileuploadservice.load(filename);
			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
					.body(file);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while download JD document: {}.", e.getMessage());
			return ResponseEntity.notFound().build();
		}

	}
	// check notification

	@PostMapping("/notification")
	public ResponseEntity<Object> testNotification() {
		try {
//			template.convertAndSendToUser("kishore", "/messages", notificationMessage);
			// Send Mail to Admin

			Map<String, Object> Adminmodel = new HashMap<>();
			Adminmodel.put("adminname", "Admin");
			Adminmodel.put("content1", "New Lead Request has been created.");
			Adminmodel.put("content2", "Kindly look into the G3C application to view the leads in detail.");
			Adminmodel.put("aboutlink", "https://asia.daimlertruck.com/");
			notificationService.sendLeadMail("kishorekumar.b@intelizign.com", "G3C New Lead Request Created",
					Adminmodel);

			return ResponseHandler.generateResponse("Notification Sent Successfully: " + getRandomNumberString(), true,
					HttpStatus.OK, null);

		} catch (Exception e) {

			LOGGER.error("Internal Server Error while registeralluser:{}.", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	@PutMapping("/removenotification/{notificationid}")
	public ResponseEntity<Object> removeNotification(@PathVariable(value = "notificationid") Long notificationid) {
		try {
			return notificationRepository.findById(notificationid).map(updatedata -> {
				notificationRepository.deleteById(notificationid);
				return ResponseHandler.generateResponse("Notification Removed Successfully", true, HttpStatus.OK, null);

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Notification ID " + notificationid + " Doesn't exist");
				return ResponseHandler.generateResponse("Notification ID " + notificationid + " Doesn't exist", false,
						HttpStatus.OK, null);
			});

		} catch (Exception e) {

			LOGGER.error("Internal Server Error while remove notification:{}.", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					e.getMessage());
		}
	}

	// Update Approval
	@PutMapping(value = "/approvals/{RequestId}/{ApprovalID}/{Key}/{Token}")
	public ResponseEntity<Object> bizCaseApprovalData(@PathVariable(value = "RequestId") Long RequestId,
			@PathVariable(value = "ApprovalID") Long ApprovalID, @PathVariable(value = "Key") String Key,
			@PathVariable(value = "Token") String Token) {
		try {
			return bizcaseapprovalrepo.findById(ApprovalID).map(bizapproval ->

			bizcasereqrepo.findById(RequestId).map(bizrequest -> {

				if (Key.equalsIgnoreCase("provider")) {
					if (Boolean.TRUE.equals(tokenGeneratorService.validatetokenapprove(Token, bizapproval))) {
						bizapproval.setStatus(true);
						bizapproval.setEmail_status("Approved");
						bizapproval
								.setApproved_date(LocalDateTime.now(ZoneId.of(env.getProperty("spring.app.timezone"))));
						bizcaseapprovalrepo.save(bizapproval);
						List<BusinessApprovalsModel> Requestsseqstatus = bizcaseapprovalrepo
								.findByRequestIdAndsequence_levelAndstatus(bizrequest.getId(),
										bizapproval.getSequence_level(), false);
						if (Requestsseqstatus.isEmpty()) {
							List<BusinessApprovalsModel> Requestsseq = bizcaseapprovalrepo
									.findByRequestIdAndSequenceLevel(bizrequest.getId(),
											(bizapproval.getSequence_level() + 1));
							if (Requestsseq.isEmpty()) {
								LOGGER.info("Checking all request is approved");
								Boolean checkstatusBoolean = true;
								List<BusinessApprovalsModel> bizcasRequests = bizcaseapprovalrepo
										.findByRequestId(RequestId);
								for (BusinessApprovalsModel bizdata : bizcasRequests) {
									if (bizdata.getStatus().equals(false)) {
										checkstatusBoolean = false;
										LOGGER.info(
												"Something went wrong  {} is not approve the business case, Please check the logic",
												bizdata.getApprover_name());
									}
								}
								if (checkstatusBoolean.equals(true)) {

									bizrequest.setService_provider_approve(true);
									bizrequest.setStatus("IO Number Not Mapped");
									bizrequest.setService_receiver_approve(true);
									bizrequest.setOverall_status(true);

									long delay_count = ChronoUnit.DAYS.between(bizrequest.getLead().getCreate_date(),
											LocalDateTime.now(ZoneId.of(env.getProperty("spring.app.timezone"))));

									LeadConversionModel leadConversionModel = new LeadConversionModel();
									leadConversionModel.setLevel_start_date(bizrequest.getLead().getCreate_date());
									leadConversionModel.setLevel_end_date(
											LocalDateTime.now(ZoneId.of(env.getProperty("spring.app.timezone"))));
									leadConversionModel.setDelay_days(delay_count);
									leadConversionModel.setConversion_period("IL2 - IL3");
									if (delay_count <= 5 && delay_count >= 0)
										leadConversionModel.setColour("rgb(0, 150, 30)");
									else if (delay_count <= 10 && delay_count >= 6)
										leadConversionModel.setColour("rgb(255, 205, 86)");
									else if (delay_count > 10)
										leadConversionModel.setColour("rgb(255, 99, 132)");
									else
										LOGGER.error("Exceptions happen!: Invalid Range: Days {}. ", delay_count);
									leadConversionModel.setLead(bizrequest.getLead());
									leadConversionRepository.save(leadConversionModel);

									LeadRequestModel leadRequestModel = bizrequest.getLead();
									leadRequestModel.setCreate_date(
											LocalDateTime.now(ZoneId.of(env.getProperty("spring.app.timezone"))));
									leadRequestModel.setCategory_status("approved");
									leadreq_repository.save(leadRequestModel);

									// Create Project Details
									ProjectModel projectModel = new ProjectModel();
									projectModel.setProject_id("PRO" + getRandomNumberString());
									projectModel.setProject_name(leadRequestModel.getProject_name());
									projectModel.setCost_center(leadRequestModel.getService_provider_cost_center());
									projectModel
											.setService_provider(leadRequestModel.getService_provider_contact_name());
									projectModel.setService_provider_shortid(
											leadRequestModel.getService_provider_short_id());
									projectModel
											.setService_receiver(leadRequestModel.getService_receiver_contact_name());
									projectModel.setService_receiver_shortid(
											leadRequestModel.getService_receiver_short_id());
									projectModel.setIsActive(true);
									projectModel.setTotal_fte_count(
											Long.parseLong(bizrequest.getManpower_requirements().get(0).getTotal()));
									projectModel.setWorking_hours(bizrequest.getWorking_hours());
									projectModel.setStatus("IO Number Not Mapped");
									projectModel.setBizcase(bizrequest);
									projectRepository.save(projectModel);

									// Send Email Notification
									List<G3CEmployeeMasterModel> finance_list = g3cEmployeeRepository
											.findByRolename("FINANCE");
									if (!finance_list.isEmpty()) {
										for (G3CEmployeeMasterModel finance : finance_list) {
											// send mail to finance for IO Number mapping
											Map<String, Object> project_model = new HashMap<>();
											project_model.put("reciverName", finance.getEmp_name());
											project_model.put("projectName", projectModel.getProject_name());

											emailServiceImpl.sendFinanceMail(finance.getEmail(),
													"G3C New Project IO Mapping", project_model);

											// Send Notification
											notificationServices.NotificationPojo(
													bizrequest.getLead().getService_provider_contact_name(),
													finance.getEmp_name(), finance.getShortid(),
													"G3C New Approve Request for Business Case Requirement", null);
										}
									}

									BusinessCaseRequest BizCaseRequestModelsaved = bizcasereqrepo.save(bizrequest);

									List<BusinessApprovalsModel> approverDatas = bizcaseapprovalrepo
											.findByRequest(RequestId);

									if (!approverDatas.isEmpty()) {

										String redirectUrl = env.getProperty("g3c.frontend.app") + "g3c-admin";

										for (BusinessApprovalsModel bizdata : Requestsseq) {

											// Send confirmation notification for all the approver
											notificationServices.NotificationPojo("G3C Admin",
													bizdata.getApprover_name(), bizdata.getShort_id(),
													"G3C Business Case Approved", null);

											// Send confirmation mail for all the approver
											Map<String, Object> approve_model = new HashMap<>();
											approve_model.put("reciverName", bizdata.getApprover_name());
											approve_model.put("redirectUrl", redirectUrl);
											approve_model.put("projectName", bizdata.getRequest().getProject_name());
											notificationService
													.sendApprovalConfirmatinMail(bizdata.getApprover_email(),
															"G3C Business Case Approved - "
																	+ bizdata.getRequest().getProject_name(),
															approve_model);
										}
									}

									return ResponseHandler.generateResponse(
											"Business Requirement Approved Successfully", true, HttpStatus.OK,
											BizCaseRequestModelsaved);
								} else {
									LOGGER.info(
											"Something went wrong, Someone is not approve the business case, Please check the logic");
									return ResponseHandler.generateResponse(
											"Something went wrong, Someone is not approve the business case, Please check the logic",
											true, HttpStatus.OK, null);
								}
							} else {
								LOGGER.info("Business Case going to Next Level Approve");
								for (BusinessApprovalsModel bizdata : Requestsseq) {
									// send Mail and Notification for next sequence user

									notificationServices.NotificationPojo("G3C Admin", bizdata.getApprover_name(),
											bizdata.getShort_id(),
											"G3C New Approve Request for Business Case Requirement", null);

									bizdata.setRequest_date(
											LocalDateTime.now(ZoneId.of(env.getProperty("spring.app.timezone"))));
									bizcaseapprovalrepo.save(bizdata);

									String tokenString = tokenGeneratorService.gettokenforapproves(bizdata);
									String redirecturl = env.getProperty("g3c.frontend.app.domain") + RequestId + "/"
											+ bizdata.getId() + "/provider/" + tokenString;
									// Send Email to user
									Map<String, Object> approve_model = new HashMap<>();
									approve_model.put("reciverName", bizdata.getApprover_name());
									approve_model.put("redirecturl", redirecturl);
									notificationService.sendProviderApproveMail(bizdata.getApprover_email(),
											"G3C Business Case Approval", approve_model);
								}

							}
						} else
							LOGGER.info("In Sequence Level  {}  Approve is pending ", bizapproval.getSequence_level());

						return ResponseHandler.generateResponse("Business Requirement Approved Successfully", true,
								HttpStatus.OK, bizapproval);
					} else {
						return ResponseHandler.generateResponse("Token Expired", false, HttpStatus.OK, null);
					}

				} else {
					LOGGER.error("Error: Invalid Key for Approval");
					return ResponseHandler.generateResponse("Invalid Key for Approval", false, HttpStatus.OK, null);
				}
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: RequestId Doesn't exist   {}.", RequestId);
				return ResponseHandler.generateResponse("RequestId Doesn't exist  " + RequestId, false, HttpStatus.OK,
						null);
			})

			).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: ApprovalId  Doesn't exist {},", ApprovalID);
				return ResponseHandler.generateResponse("ApprovalId  Doesn't exist    " + ApprovalID, false,
						HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Internal Server Error approvals :{}. ", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	@PutMapping(value = "/sla/approvals/{ApprovalID}/{slaID}/{Token}")
	public ResponseEntity<Object> slaApprovalData(@PathVariable(value = "ApprovalID") Long ApprovalID,
			@PathVariable(value = "slaID") Long slaID, @PathVariable(value = "Token") String Token) {
		try {
			return slaRepository.findById(slaID).map(slaData ->

			slaApprovalRepository.findById(ApprovalID).map(approvalData -> {

				if (!Boolean.TRUE.equals(approvalData.getSla_approve())) {
					DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
					if (Boolean.TRUE.equals(tokenGeneratorService.validateSLAtokenapprove(Token, approvalData))) {
						approvalData.setSla_approve(true);
						approvalData.setSla_approve_date(
								LocalDateTime.now(ZoneId.of(env.getProperty("spring.app.timezone"))).format(formatter));
						slaApprovalRepository.save(approvalData);

						List<SLAApproval> approver_list = slaApprovalRepository.getNonApproverList(slaData.getId());

						if (approver_list.isEmpty()) {
							List<SLAApproval> sla_approvals = slaApprovalRepository.getSLAcontacts(slaData.getId());
							List<SLAContacts> slacontacts = new ArrayList<>();

							for (SLAApproval sla_approval_data : sla_approvals) {
								SLAContacts slacontact = new SLAContacts();
								slacontact.setCustomer_type(sla_approval_data.getCustomer_type());
								slacontact.setName(sla_approval_data.getName());
								slacontact.setApproved_date(sla_approval_data.getSla_approve_date());
								slacontacts.add(slacontact);
							}

							String outputFilename = slaData.getSlaid() + "-signed";
							String finaloutputfilename = outputFilename.replace("/", "_");
							try {
								slaservice.xhtmlToPdf(slaData, finaloutputfilename, slacontacts);
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

							slaData.setStatus("Approved");
							slaData.setSla_signed_argeement_document(slapdf);
							slaRepository.save(slaData);

							List<SLAcycle> slaCycles = slaservice.getSLAcycle(slaData);
							slaData.setInvoice_cycle(slaCycles);
							slaRepository.save(slaData);

//			 				Integrating MySSC API

							MySSCSLAApprovedResponce response_from_myssc = mysscslaservice
									.updateSLAApprovalToMySSC(slaData);
							if (response_from_myssc.getIsSuccess().equals(true)
									&& response_from_myssc.getHttpStatusCode() == 200) {
								LOGGER.info("SLA Approved and saved");
							} else {
								return ResponseHandler.generateResponse("SLA not Approved in MySSC", false,
										HttpStatus.OK, response_from_myssc);
							}

							return ResponseHandler.generateResponse("SLA Approved Successfully", true, HttpStatus.OK,
									null);
						} else {
							slaData.setStatus("In Progress");
							slaRepository.save(slaData);
							return ResponseHandler.generateResponse("SLA Approved Successfully", true, HttpStatus.OK,
									null);
						}
					} else {
						if (Boolean.TRUE.equals(approvalData.getSla_approve())) {
							return ResponseHandler.generateResponse("SLA is already approved", false, HttpStatus.OK,
									null);
						} else {
							return ResponseHandler.generateResponse("Invalid Token", false, HttpStatus.OK, null);
						}
					}
				} else {
					return ResponseHandler.generateResponse("SLA is already approved", false, HttpStatus.OK, null);
				}
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: ApprovalID  Doesn't exist  {}. ", ApprovalID);
				return ResponseHandler.generateResponse("RequestId " + ApprovalID + " Doesn't exist", false,
						HttpStatus.OK, null);
			})

			).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: slaID   Doesn't exist   {}. ", slaID);
				return ResponseHandler.generateResponse("slaID " + slaID + " Doesn't exist", false, HttpStatus.OK,
						null);
			});

		} catch (Exception e) {
			LOGGER.error("Internal Server Error approvals :   {}. ", e.getMessage());
			return ResponseHandler.generateResponse("Server Error in SLA, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	public String getRandomNumberString() {
		Random rnd = new Random();
		int number = rnd.nextInt(9999999);

		// this will convert any number sequence into 6 character.
		return String.format("%07d", number);
	}

	// Insert Employee Excel to Table
	@PostMapping("/hrwtupload")
	public ResponseEntity<Object> hrwtexcelimport(@RequestParam("file") MultipartFile file) {
		try {
			if (G3CEmployeeService.hasExcelFormat(file)) {
				List<G3CEmployeeMasterModel> employee = G3CEmployeeService.excelToDb(file.getInputStream(), file);
				g3cEmployeeRepository.saveAll(employee);
				return ResponseHandler.generateResponse("Hrwt File Uploaded Successfully", true, HttpStatus.OK, null);
			} else {
				LOGGER.error("Kindly upload an excel file!");
				return ResponseHandler.generateResponse("Kindly upload an excel file!", false, HttpStatus.OK, null);
			}
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while Uploading hrwt Excel file: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	@PostMapping("/removeaddhrwtupload")
	public ResponseEntity<Object> removehrwtexcelimport(@RequestParam("file") MultipartFile file) {
		try {
			if (G3CEmployeeService.hasExcelFormat(file)) {
				g3cEmployeeRepository.deleteAll();
				List<G3CEmployeeMasterModel> employee = G3CEmployeeService.excelToDb(file.getInputStream(), file);
				g3cEmployeeRepository.saveAll(employee);
				return ResponseHandler.generateResponse("Hrwt File Uploaded Successfully", true, HttpStatus.OK, null);
			} else {
				LOGGER.error("Kindly upload an excel file!");
				return ResponseHandler.generateResponse("Kindly upload an excel file!", false, HttpStatus.OK, null);
			}
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while Uploading hrwt Excel file: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	@GetMapping("/setutlizationforalluser")
	public ResponseEntity<Object> removehrwtexcelimport() {
		try {
			List<G3CEmployeeMasterModel> alluser = g3cEmployeeRepository.findAll();
			for (G3CEmployeeMasterModel currentuser : alluser) {
				currentuser.setCapacity(0);
				g3cEmployeeRepository.save(currentuser);
			}

			return ResponseHandler.generateResponse("Resource Capacity Updated", true, HttpStatus.OK, null);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while Resource Capacity: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	// Insert Employee Excel to Table
	@GetMapping("/checktoken")
	public ResponseEntity<Object> checktokendecode() {
		try {
//			List<String> preinvoice_id = slaPreInvoiceReposito.getUnApprovedPreinvoiceID();
			List<String> preinvoice_id = slaPreInvoiceReposito.getApprovedPreinvoiceID();
			if (!preinvoice_id.isEmpty()) {
				MySSCInvoiceResponse response_data = mysscslaservice.getInvoiceForPreinvoicefromMySSC(preinvoice_id);
				if (response_data.getIsSuccess().equals(true) && response_data.getHttpStatusCode() == 200
						&& !response_data.getData().isEmpty()) {
					slaservice.saveInvoiceData(response_data.getData());
				}

				return ResponseHandler.generateResponse("Response data", true, HttpStatus.OK, response_data);
			} else {
				return ResponseHandler.generateResponse("List is empty", true, HttpStatus.OK, null);
			}
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while Uploading hrwt Excel file: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}
//
//	private String callMicrosoftGraphMeEndpoint(String accessToken) {
//		RestTemplate restTemplate = new RestTemplate();
//		HttpHeaders headers = new HttpHeaders();
//		headers.setContentType(MediaType.APPLICATION_JSON);
//		headers.set("Authorization", "Bearer " + accessToken);
//		HttpEntity<String> entity = new HttpEntity<>(null, headers);
//		String result = restTemplate
//				.exchange("https://graph.microsoft.com/v1.0/me", HttpMethod.GET, entity, String.class).getBody();
//		return result;
//	}

}

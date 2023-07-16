package com.intelizign.dmgcc.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.intelizign.dmgcc.authendication.UserDetailsImpl;
import com.intelizign.dmgcc.models.ERole;
import com.intelizign.dmgcc.models.G3CEmployeeMasterModel;
import com.intelizign.dmgcc.models.JDMappingModel;
import com.intelizign.dmgcc.models.ProjectModel;
import com.intelizign.dmgcc.models.ResourceAllocationModel;
import com.intelizign.dmgcc.models.Role;
import com.intelizign.dmgcc.models.SLAModel;
import com.intelizign.dmgcc.models.TimesheetModel;
import com.intelizign.dmgcc.repositories.G3CEmployeeRepository;
import com.intelizign.dmgcc.repositories.JDMappingRepository;
import com.intelizign.dmgcc.repositories.ProjectRepository;
import com.intelizign.dmgcc.repositories.ResourceAllocationRepository;
import com.intelizign.dmgcc.repositories.RoleRepository;
import com.intelizign.dmgcc.repositories.SLARepository;
import com.intelizign.dmgcc.repositories.TimesheetRepository;
import com.intelizign.dmgcc.repositories.othermaster.CCDumpRepository;
import com.intelizign.dmgcc.repositories.othermaster.IODumpRepository;
import com.intelizign.dmgcc.request.CcDumpRpaRequest;
import com.intelizign.dmgcc.request.RpaHrwtRequest;
import com.intelizign.dmgcc.request.RpaIoDumpRequest;
import com.intelizign.dmgcc.request.RpaJdMappingRequest;
import com.intelizign.dmgcc.request.RpaTimeSheetRequest;
import com.intelizign.dmgcc.request.TimesheetRpaRequest;
import com.intelizign.dmgcc.response.JDHiredResponse;
import com.intelizign.dmgcc.response.JDTaleoResponse;
import com.intelizign.dmgcc.response.ResourceCaptinityResponse;
import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.response.RpaResourceResponse;
import com.intelizign.dmgcc.response.SlacaptinityResponse;
import com.intelizign.dmgcc.services.RpaResourceAuthenticationServices;

@RestController
@RequestMapping("/rpa")

public class RpaResourceController {

	@Autowired
	G3CEmployeeRepository g3cEmployeeRepository;

	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private ResourceAllocationRepository resourceAllocationRepository;

	@Autowired
	IODumpRepository ioDumpRepository;

	@Autowired
	CCDumpRepository ccDumpRepository;

	@Autowired
	private JDMappingRepository jdMappingRepository;

	@Autowired
	SLARepository slaRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	TimesheetRepository timesheetRepository;

	@Autowired
	RpaResourceAuthenticationServices rpaAuthentication;

	@Autowired
	private RpaResourceAuthenticationServices jwtUtils;

	@Autowired
	private Environment env;

	public final Logger LOGGER = LogManager.getLogger(RpaResourceController.class);

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public Map<String, String> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
		Map<String, String> errors = new HashMap<>();

		ex.getBindingResult().getFieldErrors()
				.forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));

		return errors;
	}

	// Get All user

	@GetMapping("/getalluser")
	public ResponseEntity<Object> FindAllEmployee(@RequestParam(required = false) String rpa_token) {
		try {
			if (jwtUtils.ValidateToken(rpa_token)) {

				List<G3CEmployeeMasterModel> employeeinfo = g3cEmployeeRepository.findAllByOrderById();

				List<RpaResourceResponse> employeeList = new ArrayList<>();

				for (G3CEmployeeMasterModel employees : employeeinfo) {

					RpaResourceResponse employee = new RpaResourceResponse();

					employee.setShortid(employees.getShortid());
					employee.setEmail(employees.getEmail());
					employee.setEmployee_code(employees.getEmployee_code());
					employee.setHrwt_code(employees.getHrwt_code());
					employee.setKim_no(employees.getKim_no());
					employee.setDesignation(employees.getDesignation());
					employee.setFunctions(employees.getFunctions());
					employee.setDepartment_id(employees.getDepartment_id());
					employee.setLevel(employees.getLevel());
					employee.setGrade(employees.getGrade());
					employee.setEmployement_status(employees.getEmployement_status());
					employee.setDate_of_leave(employees.getDate_of_leave());
					employee.setSupv_id(employees.getSupv_id());
					employee.setReport_to(employees.getReport_to());
					employee.setCost_center(employees.getCost_center());
					employee.setSub_function(employees.getSub_function());
					employee.setDepartment(employees.getDepartment());
					employee.setEmp_name(employees.getEmp_name());
					employee.setStatus_updated(employees.getStatus_updated());
					employee.setStatus_updated_datetime(employees.getStatus_updated_datetime());
					employee.setEmployee_supv_code(employees.getEmployee_supv_code());
					
					employeeList.add(employee);
				}

				return ResponseHandler.generateResponse("List of Employees Retrieved Successfully", true, HttpStatus.OK,
						employeeList);
			} else
				return ResponseHandler.generateResponse("Invalid Token", false, HttpStatus.OK, null);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get all G3CEmployee Employee data: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	@PostMapping("/hrwt")
	public ResponseEntity<Object> registerallUser(@RequestBody RpaHrwtRequest rpaSignupRequest) {
		try {

			if (jwtUtils.ValidateToken(rpaSignupRequest.getRpa_token())) {

				for (G3CEmployeeMasterModel signUpRequest : rpaSignupRequest.getRpa_datas()) {

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
						employee.setPassword("customer001");
						employee.setEmployee_type("Internal Resource");
						employee.setEmp_name(signUpRequest.getEmp_name());
						employee.setStatus_updated(signUpRequest.getStatus_updated());
						employee.setStatus_updated_datetime(signUpRequest.getStatus_updated_datetime());
						employee.setEmployee_supv_code(signUpRequest.getEmployee_supv_code());

						Set<Role> roles = new HashSet<>();

						Role cusRole = roleRepository.findByName(ERole.EMPLOYEE)
								.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
						roles.add(cusRole);
						employee.setRolename(cusRole.getName().toString());

						employee.setRoles(roles);

						g3cEmployeeRepository.save(employee);
					}

					else {

						G3CEmployeeMasterModel employee = g3cEmployeeRepository
								.findByshortid(signUpRequest.getShortid());
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
						employee.setPassword("customer001");
						employee.setEmployee_type("Internal Resource");
						employee.setEmp_name(signUpRequest.getEmp_name());
						employee.setStatus_updated(signUpRequest.getStatus_updated());
						employee.setStatus_updated_datetime(signUpRequest.getStatus_updated_datetime());

						Set<Role> roles = new HashSet<>();

						Role cusRole = roleRepository.findByName(ERole.EMPLOYEE)
								.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
						roles.add(cusRole);
						employee.setRolename(cusRole.getName().toString());

						employee.setRoles(roles);

						g3cEmployeeRepository.save(employee);

					}
				}

				return ResponseHandler.generateResponse("List of Employees inserted", true, HttpStatus.OK, null);
			}

			else
				return ResponseHandler.generateResponse("Invalid Token", false, HttpStatus.OK, null);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while registeralluser:" + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	// Add List of Io Dump
	@PostMapping("/iodumpbulkinsert")
	public ResponseEntity<Object> ListOfIoDump(@RequestBody RpaIoDumpRequest ioDumpDatas) {
		try {

			if (jwtUtils.ValidateToken(ioDumpDatas.getRpa_token())) {

				ioDumpRepository.saveAll(ioDumpDatas.getRpa_datas());

				return ResponseHandler.generateResponse("List of Io Dump Data Inserted Successfully", true,
						HttpStatus.OK, null);
			} else
				return ResponseHandler.generateResponse("Invalid Token", false, HttpStatus.OK, null);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while inserting all Io Dump data:" + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	// Add List of CC Dump
	@PostMapping("/ccdumpbulkinsert")
	public ResponseEntity<Object> ListOfCCDump(@RequestBody CcDumpRpaRequest ccDumpDatas) {
		try {

			if (jwtUtils.ValidateToken(ccDumpDatas.getRpa_token())) {

				ccDumpRepository.saveAll(ccDumpDatas.getRpa_datas());

				return ResponseHandler.generateResponse("List of CC Dump Inserted Successfully", true, HttpStatus.OK,
						null);
			}

			else
				return ResponseHandler.generateResponse("Invalid Token", false, HttpStatus.OK, null);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while inserting all CC dmp data:" + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	// Sla captinity
	@GetMapping("/getslacaptinity")
	public ResponseEntity<Object> getSlaCaptinity(@RequestParam(required = false) String rpa_token) {
		try {

			if (jwtUtils.ValidateToken(rpa_token)) {
				List<SLAModel> slalist = slaRepository.findAllActive();

				List<SlacaptinityResponse> slaCaptinity = new ArrayList<>();

				for (SLAModel sla : slalist) {
					SlacaptinityResponse captinity = new SlacaptinityResponse();

					captinity.setId(sla.getId());
					captinity.setProject_id(sla.getProject().getId());
					captinity.setProject_name(sla.getProject_name());
					captinity.setSlaid(sla.getSlaid());
					slaCaptinity.add(captinity);

				}

				return ResponseHandler.generateResponse("SLA Captinity Data Retrieved Successfully", true,
						HttpStatus.OK, slaCaptinity);
			}

			else
				return ResponseHandler.generateResponse("Invalid Token", false, HttpStatus.OK, null);
		} catch (Exception e) {
			LOGGER.error("Exceptions happen!:Error while getting sla captinity data" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	// Resources captinity and Project data
	@GetMapping("/getresourcecaptinity")
	public ResponseEntity<Object> getCaptinity(@RequestParam(required = false) String rpa_token) {
		try {

			if (jwtUtils.ValidateToken(rpa_token)) {

				List<ResourceAllocationModel> resourceAllocationModels = resourceAllocationRepository
						.findAllByOrderById();
				List<ResourceCaptinityResponse> resourceResponses = new ArrayList<>();
				for (ResourceAllocationModel resource : resourceAllocationModels) {
					ResourceCaptinityResponse resourceResponse = new ResourceCaptinityResponse();

					resourceResponse.setSlaid(resource.getSlaid());
					resourceResponse.setSla_name(resource.getSla_name());
					resourceResponse.setUserid(resource.getUserid());
					resourceResponse.setHrid(resource.getHrid());
					resourceResponse.setResource_name(resource.getResource_name());
					resourceResponse.setResource_email(resource.getResource_email());
					resourceResponse.setCapcity(resource.getCapcity());
					resourceResponse.setResource_shortid(resource.getResource_shortid());
					resourceResponse.setLevel(resource.getLevel());
					resourceResponses.add(resourceResponse);

				}

				return ResponseHandler.generateResponse("Resorce Captinity Data Retrieved Successfully", true,
						HttpStatus.OK, resourceResponses);

			}

			else
				return ResponseHandler.generateResponse("Invalid Token", false, HttpStatus.OK, null);
		} catch (Exception e) {
			LOGGER.error("Exceptions happen!:Error while getting resource captinity data" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	// timesheet post method
	@PostMapping("/rpatimesheet")
	public ResponseEntity<Object> createTimesheeet(@RequestBody TimesheetRpaRequest timesheetreqdata,
			Authentication authentication) {
		try {

			if (jwtUtils.ValidateToken(timesheetreqdata.getRpa_token())) {
				for (RpaTimeSheetRequest timesheetrequest : timesheetreqdata.getRpa_datas()) {
					TimesheetModel timesheetData = new TimesheetModel();
					ProjectModel projectData = projectRepository.findbyId(timesheetrequest.getProject_id());
					SLAModel slaData = slaRepository.findbyId(timesheetrequest.getSla_id());

					if (projectData == null) {
						return ResponseHandler.generateResponse("Project Id does not Exists", false, HttpStatus.OK,
								null);
					} else if (slaData == null) {

						return ResponseHandler.generateResponse("SLA Id does not Exists", false, HttpStatus.OK, null);

					} else {

						UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
						if (userDetails == null)
							return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);

						timesheetData.setTimesheet_date(timesheetrequest.getTimesheet_date());
						timesheetData.setName(timesheetrequest.getName());
						timesheetData.setWorking_hours(Double.valueOf(timesheetrequest.getWorking_hours()));
						timesheetData.setProject(projectData);

						timesheetData.setProject_name(projectData.getProject_name());
						timesheetData.setSla(slaData);

						timesheetData.setSlaid(slaData.getSlaid());
						timesheetData.setShort_id(timesheetrequest.getShort_id());
						Optional<G3CEmployeeMasterModel> user = g3cEmployeeRepository.findById(userDetails.getId());
						timesheetData.setActive(timesheetrequest.getActive());
						timesheetData.setStart_time(timesheetrequest.getStart_time());
						timesheetData.setEnd_time(timesheetrequest.getEnd_time());
						timesheetData.setTask_name(timesheetrequest.getTask_name());
						if (user.isPresent()) {
							timesheetData.setUser(user.get());
							timesheetData.setEmployee_type("Internal");
						}
						timesheetData.setComments(timesheetrequest.getComments());

						if (timesheetrequest.getWorkingtype().equalsIgnoreCase("working")) {
							timesheetData.setCaptinityleave(false);
							timesheetData.setWorkingtype("Working");
						} else {
							timesheetData.setCaptinityleave(true);
							timesheetData.setWorkingtype("Leave");
						}

					}
					timesheetRepository.save(timesheetData);

				}
				return ResponseHandler.generateResponse("Rpa Timesheet Created Successfully ", true, HttpStatus.OK,
						null);
			} else
				return ResponseHandler.generateResponse("Invalid Token", false, HttpStatus.OK, null);
		}

		catch (Exception e) {
			LOGGER.error("Exceptions happen!:Error while creating rpa timesheet data" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin" + e.getMessage(),
					false, HttpStatus.OK, null);
		}

	}

	@GetMapping("/gethrwt")
	public ResponseEntity<Object> getAllJDMapping(@RequestParam(required = false) String rpa_token) {
		try {

			if (jwtUtils.ValidateToken(rpa_token)) {

				List<JDMappingModel> jdMappingdata = jdMappingRepository.findAll();
				List<JDTaleoResponse> JdAllList = new ArrayList<>();

				jdMappingdata.stream().forEach(jdmodel -> {

					jdmodel.getHired_details().stream().forEach(hired -> {
						if (!hired.getUpdated_by().equals("INTERNAL")
								&& (hired.getUpdated_by().equals("TALEO") || hired.getUpdated_by().equals(""))
								&& hired.getStatus() != "Onboard") {
							JDTaleoResponse jdData = new JDTaleoResponse();
							jdData.setRequest_id(jdmodel.getRequest().getId());
							jdData.setMonthandyear(jdmodel.getMonthandyear());
							jdData.setPosition_code(jdmodel.getPosition_code());
							jdData.setHired_id(hired.getId());
							jdData.setHired_updated_by(hired.getUpdated_by());
							jdData.setHired_status(hired.getStatus());
							JdAllList.add(jdData);

						}
					});
				});

				return ResponseHandler.generateResponse("Hired details retrieved Successfully ", true, HttpStatus.OK,
						JdAllList);
			}

			else
				return ResponseHandler.generateResponse("Invalid Token", false, HttpStatus.OK, null);
		} catch (Exception e) {
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin" + e.getMessage(),
					false, HttpStatus.OK, null);
		}

	}

	@PutMapping("/updatejdmapping")
	public ResponseEntity<Object> updatejdmapping(@RequestBody RpaJdMappingRequest jdRequestdata) {
		try {

			if (jwtUtils.ValidateToken(jdRequestdata.getRpa_token())) {
				for (JDTaleoResponse request : jdRequestdata.getRpa_datas()) {

					JDMappingModel jdMapping = jdMappingRepository.findByRequestIdAndMonth(request.getRequest_id(),
							request.getMonthandyear(), request.getPosition_code());

					if (jdMapping == null) {
						return ResponseHandler.generateResponse("Request Id " + request.getRequest_id()
								+ "  or Month and Year " + request.getMonthandyear() + "  or Position Code "
								+ request.getPosition_code() + "  Doesn't Match", false, HttpStatus.OK, null);

					}
					List<JDHiredResponse> hiredData = jdMapping.getHired_details();

					hiredData.stream().forEach(a -> {
						if (a.getId().equals(request.getHired_id()) && a.getStatus() != request.getHired_status()) {
							a.setStatus(request.getHired_status());
							a.setUpdated_by("TALEO");
							a.setId(request.getHired_id());
						}

					});
					jdMapping.setHired_details(hiredData);
					jdMappingRepository.save(jdMapping);
				}
				return ResponseHandler.generateResponse("Updated Hired Resoures Successfully ", true, HttpStatus.OK,
						null);
			} else
				return ResponseHandler.generateResponse("Invalid Token", false, HttpStatus.OK, null);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while finding request id and month" + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	@GetMapping("/generatetoken")
	public ResponseEntity<Object> generatetoken(@RequestParam(name = "username") String username,
			@RequestParam(name = "password") String password) {

		if (username.equals(env.getProperty("rpa.username")) && password.equals(env.getProperty("rpa.password"))) {

			// Generate JWT Token

			String jwt = rpaAuthentication.generateTokenFromUsername(username);

			Map<String, String> tokenResponse = new HashMap<String, String>();

			tokenResponse.put("token", jwt);

			return ResponseHandler.generateResponse("Login Successfull", true, HttpStatus.OK, tokenResponse);

		} else
			return ResponseHandler.generateResponse("Invalid Credentials", false, HttpStatus.OK, null);
	}

}

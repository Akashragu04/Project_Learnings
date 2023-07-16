package com.intelizign.dmgcc.controllers;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonView;
import com.intelizign.dmgcc.authendication.AzureUserInfo;
import com.intelizign.dmgcc.authendication.UserDetailsImpl;
import com.intelizign.dmgcc.excelvalidation.ExcelValidation;
import com.intelizign.dmgcc.exception.ExcelExecption;
import com.intelizign.dmgcc.models.CostCenterModel;
import com.intelizign.dmgcc.models.G3CEmployeeMasterModel;
import com.intelizign.dmgcc.models.Role;
import com.intelizign.dmgcc.models.excel.ThirdPartyExcelData;
import com.intelizign.dmgcc.pojoclass.G3CEmployeeRole;
import com.intelizign.dmgcc.repositories.CostCenterRepository;
import com.intelizign.dmgcc.repositories.G3CEmployeeRepository;
import com.intelizign.dmgcc.repositories.NotificationRepository;
import com.intelizign.dmgcc.repositories.RoleRepository;
import com.intelizign.dmgcc.response.G3CResponse;
import com.intelizign.dmgcc.response.LeadCustomerAndBusiness;
import com.intelizign.dmgcc.response.MySSCLapServerResponce;
import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.services.G3CEmployeeService;
import com.intelizign.dmgcc.services.MySSCAPIServices;
import com.intelizign.dmgcc.utils.CustomFields;

import io.github.rushuat.ocell.document.Document;

@RestController
@RequestMapping("/employees")
public class G3CEmployeeController {

	@Autowired
	G3CEmployeeRepository g3cEmployeeRepository;

	@Autowired
	NotificationRepository notificationRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	CostCenterRepository costcenterRepository;

	@Autowired
	G3CEmployeeService g3cEmployeeService;

	@Autowired
	ExcelValidation validation;

	@Autowired
	private AzureUserInfo azureUserInfo;

	@Autowired
	private MySSCAPIServices mysscslaservice;

	@Autowired
	private Environment env;

	public final Logger LOGGER = LogManager.getLogger(G3CEmployeeController.class);

	G3CEmployeeController(G3CEmployeeRepository g3cEmployeeRepository) {
		this.g3cEmployeeRepository = g3cEmployeeRepository;
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
	public ResponseEntity<Object> FindAllEmployee(Pageable pageable) {
		try {

			Page<G3CEmployeeMasterModel> employeeinfo = g3cEmployeeRepository.findAll(pageable);
			return ResponseHandler.generateResponse("List of Employees", true, HttpStatus.OK, employeeinfo);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get all G3CEmployee: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	// to get employee dropdown
	@JsonView(CustomFields.MyResponseViews.class)
	@GetMapping("/getemployees")
	public ResponseEntity<Object> getEmployeeData() {
		try {
			List<G3CEmployeeMasterModel> employeedata = g3cEmployeeRepository.findAllByStatus(true);
			return ResponseHandler.generateResponse("List of Employees", true, HttpStatus.OK, employeedata);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while getting Employee data:" + e.getMessage());
			return ResponseHandler.generateResponse(e.getMessage(), false, HttpStatus.OK, null);
		}

	}
	// drop down for customer and business in Lead Creation

	@GetMapping("/getcustomerandbusiness")
	public ResponseEntity<Object> FindAllCustomerAndBusiness() {
		try {
			LeadCustomerAndBusiness customer_and_business = new LeadCustomerAndBusiness();
			customer_and_business.setCustomer(g3cEmployeeRepository.findAllCustomer());
			customer_and_business.setBusiness(g3cEmployeeRepository.findAllBusiness());
			return ResponseHandler.generateResponse("List of Customer and Business", true, HttpStatus.OK,
					customer_and_business);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get all G3CEmployee: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	@PutMapping("/deletethirdpartyemployee")
	public ResponseEntity<Object> deletEmployees(@RequestBody G3CEmployeeRole employee_role) {
		try {
			List<G3CEmployeeMasterModel> allemployees = new ArrayList<>();
			for (long userid : employee_role.getUser_id()) {
				Optional<G3CEmployeeMasterModel> g3cemployee = g3cEmployeeRepository.findById(userid);
				if (g3cemployee.isPresent()) {
					G3CEmployeeMasterModel employeeData = g3cemployee.get();
					employeeData.setStatus(false);
					allemployees.add(employeeData);
				} else {

					LOGGER.error("User id is not found. ");
					return ResponseHandler.generateResponse("Invalid User ID: " + userid, false, HttpStatus.OK, null);
				}
			}

			g3cEmployeeRepository.saveAll(allemployees);
			return ResponseHandler.generateResponse("Employee Deleted", true, HttpStatus.OK, employee_role);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get all G3CEmployee: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	@GetMapping("/thirdpartyresource")
	public ResponseEntity<Object> getThridPartyResource(
			@PageableDefault(size = 10, page = 0, sort = "id", direction = Direction.DESC) Pageable pageable,
			@RequestParam(required = false) String Serachkeyword, Authentication authentication) {
		try {

			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);
			switch (userDetails.getRolename()) {
			case "BUSINESS":
				Page<G3CEmployeeMasterModel> employeeinfo = g3cEmployeeRepository.findByEmployeetype(
						"Third Party Resource", userDetails.getCost_center(), true, Serachkeyword, pageable);
				return ResponseHandler.generateResponse("List of Third Party Employees", true, HttpStatus.OK,
						employeeinfo);
			case "HR":
				Page<G3CEmployeeMasterModel> allemployeeinfo = g3cEmployeeRepository
						.findByEmployeetype("Third Party Resource", Serachkeyword, pageable);
				return ResponseHandler.generateResponse("List of Third Party Employees", true, HttpStatus.OK,
						allemployeeinfo);

			default:
				LOGGER.error("User doesn't have the access ");
				return ResponseHandler.generateResponse("User doesn't have the access", true, HttpStatus.OK, null);

			}
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get all thirdparty Employee: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	@GetMapping("/checktokenvalid")
	public ResponseEntity<Object> FindAllEmployee(Authentication authentication) {
		try {
			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);
			return g3cEmployeeRepository.findById(userDetails.getId()).map(requestData -> {
				System.out.println(requestData);
				return ResponseHandler.generateResponse("Token Valid", true, HttpStatus.OK, requestData);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Invalid User ID");
				return ResponseHandler.generateResponse(" Exceptions happen!: Invalid User ID", false, HttpStatus.OK,
						null);
			});
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get all G3CEmployee: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	@GetMapping("/{id}")
	public ResponseEntity<Object> FindEmployee(@PathVariable Long id) {
		try {
			return g3cEmployeeRepository.findById(id).map(requestData -> {
				return ResponseHandler.generateResponse("Employee Found", true, HttpStatus.OK, requestData);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: " + id + " Employee Doesn't exist");
				return ResponseHandler.generateResponse(id + " Employee Doesn't exist", false, HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get G3CEmployee: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	@PostMapping("/addthirdpartyresource")
	public ResponseEntity<Object> addthirdpartyEmployee(@RequestBody G3CEmployeeMasterModel employee,
			HttpServletRequest request) {
		try {
			G3CEmployeeMasterModel manager = azureUserInfo.getUserFullInfo(request);
			if (manager == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);

			if (g3cEmployeeRepository.existsByEmailOrShortid(employee.getEmail(), employee.getShortid()))
				return ResponseHandler.generateResponse("User Already Exists", false, HttpStatus.OK, null);

			employee.setDepartment_id(manager.getDepartment_id());
			employee.setSupv_id(manager.getEmployee_code());
			employee.setCost_center(manager.getCost_center());
			employee.setApprover1(manager.getApprover1());
			employee.setApprover_name(manager.getApprover_name());
			employee.setDepartment(manager.getDepartment());
			employee.setEmployee_type("Third Party Resource");
			employee.setEmployee_code(employee.getHrid());
			employee.setHrid("ER" + employee.getHrid());
			employee.setEmployement_status("Active");
			employee.setDesignation(employee.getDesignation());
			G3CEmployeeMasterModel employeeModelsaved = g3cEmployeeRepository.save(employee);

			return ResponseHandler.generateResponse("Third Party Resource Created Successfully", true, HttpStatus.OK,
					employeeModelsaved);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while update G3CEmployee: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);

		}
	}

	@PostMapping(path = "/uploadthirdpartyresource", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<Object> uploadThirdpartyResource(@RequestParam("file") MultipartFile file,
			HttpServletRequest request) throws IOException {

		try {
			validation.validateDatabaseSheetFormat(file);
			G3CEmployeeMasterModel manager = azureUserInfo.getUserFullInfo(request);
			if (manager == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);
			List<String> errorlist = new ArrayList<>();
			g3cEmployeeService.saveThirdPartyResourceFromExcel(file, manager, errorlist);
			if (!errorlist.isEmpty()) {
				return ResponseHandler.generateResponse(errorlist.get(0), false, HttpStatus.OK, null);

			}

			return ResponseHandler.generateResponse("Excel file uploaded Successfully", true, HttpStatus.OK, errorlist);

		} catch (ExcelExecption e) {

			LOGGER.error(e.getMessage());
			Path filepath = Paths.get("./uploads/exceldata/" + file.getOriginalFilename());
			Files.deleteIfExists(filepath);

			LOGGER.error("Error while Creating .csv records " + e.getMessage());
			return ResponseHandler.generateResponse(e.getMessage(), false, HttpStatus.OK, null);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
			Path filepath = Paths.get("./uploads/exceldata/" + file.getOriginalFilename());
			Files.deleteIfExists(filepath);
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	@GetMapping("/downloadthirdpartyresource")
	public ResponseEntity<Resource> getFile() throws IOException {

		List<G3CEmployeeMasterModel> external_resources = g3cEmployeeRepository.findByExternalEmployee();
		List<ThirdPartyExcelData> exceldata = new ArrayList<>();
		if (external_resources != null) {
			external_resources.stream().forEach(elem -> {
				ThirdPartyExcelData thirdparty = new ThirdPartyExcelData();
				thirdparty.setShort_id(elem.getShortid());
				thirdparty.setHr_id(elem.getHrid());
				thirdparty.setFunctions(elem.getFunctions());
				thirdparty.setDesignation(elem.getDesignation());
				thirdparty.setEmail(elem.getEmail());
				thirdparty.setEmployee_name(elem.getEmp_name());
				thirdparty.setDate_of_joining(elem.getDate_of_join().toString());
				exceldata.add(thirdparty);
			});
		}

		String filename = "thirdpartyresource.xlsx";
		try (Document excel_document = new Document()) {
			excel_document.addSheet(exceldata);
			InputStream myInputStream = new ByteArrayInputStream(excel_document.toBytes());
			InputStreamResource file = new InputStreamResource(myInputStream);
			return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
					.contentType(MediaType.parseMediaType("application/vnd.ms-word")).body(file);
		}
	}

	@PutMapping("/updatethirdpartyresource/{id}")
	public ResponseEntity<Object> UpdateEmployee(@Valid @RequestBody G3CEmployeeMasterModel employeeupdatedata,
			@PathVariable Long id) {
		try {
			return g3cEmployeeRepository.findById(id).map(updatedata -> {
				if (updatedata.getEmployee_type().equalsIgnoreCase("Third Party Resource")) {
					updatedata.setShortid(updatedata.getShortid());
//					updatedata.setHrid("ER" + employeeupdatedata.getHrid());
					updatedata.setEmployee_code(employeeupdatedata.getEmployee_code());
					updatedata.setHrwt_code(employeeupdatedata.getHrwt_code());
					updatedata.setEmp_name(employeeupdatedata.getEmp_name());
					updatedata.setDesignation(employeeupdatedata.getDesignation());
					updatedata.setFunctions(employeeupdatedata.getFunctions());
					updatedata.setDepartment_id(employeeupdatedata.getDepartment_id());
					updatedata.setEmail(employeeupdatedata.getEmail());
					updatedata.setCategory(employeeupdatedata.getCategory());
					updatedata.setBusiness(employeeupdatedata.getBusiness());
					G3CEmployeeMasterModel employeeModelsaved = g3cEmployeeRepository.save(updatedata);

					return ResponseHandler.generateResponse("Record Updated Successfully", true, HttpStatus.OK,
							employeeModelsaved);
				} else {

					return ResponseHandler.generateResponse("EmployeeID " + id + " is not Third Party Resource", false,
							HttpStatus.OK, null);
				}

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: EmployeeID " + id + " Doesn't exist to Update Information");
				return ResponseHandler.generateResponse("EmployeeID " + id + " Doesn't exist to Update Information",
						false, HttpStatus.OK, null);
			});
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while update G3CEmployee: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);

		}
	}

	@GetMapping("/getusersbyshortid/{Shortid}")
	public ResponseEntity<Object> getEmployeebyshortid(@PathVariable String Shortid) {
		try {

			List<G3CEmployeeMasterModel> shortiduser = g3cEmployeeRepository.findByShortid(Shortid);
			return ResponseHandler.generateResponse("Employee Information", true, HttpStatus.OK, shortiduser);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get G3CEmployee by shortid: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);

		}
	}

	@GetMapping("/getuser")
	public ResponseEntity<Object> FindAllEmp() {
		try {
			List<G3CEmployeeMasterModel> employeeinfo = g3cEmployeeRepository.findAll();
			List<G3CResponse> employeeDetails = new ArrayList<>();
			employeeinfo.stream().forEach(employee -> {
				G3CResponse response = new G3CResponse();
				response.setEmp_name(employee.getEmp_name());
				response.setShortid(employee.getShortid());
				response.setId(employee.getId());
				response.setEmail(employee.getEmail());
				response.setCost_center(employee.getCost_center());
				response.setOrganization(employee.getCategory());
				response.setDesignation_level(employee.getDesignation());
				Optional<CostCenterModel> costcenter = costcenterRepository.findByCostcenter(employee.getCost_center());
				if (costcenter.isPresent()) {
					response.setDepartment(costcenter.get().getTeam_group());
				}
				employeeDetails.add(response);
			});
			return ResponseHandler.generateResponse("List of Employees", true, HttpStatus.OK, employeeDetails);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get all G3CEmployee: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	@JsonView(CustomFields.MyResponseViews.class)
	@GetMapping("/getuserbyrole/{userRole}")
	public ResponseEntity<Object> gethrUser(@PathVariable String userRole) {
		try {
			List<G3CEmployeeMasterModel> employeeinfo = g3cEmployeeRepository.findByRolename(userRole);
			return ResponseHandler.generateResponse("List of Employees", true, HttpStatus.OK, employeeinfo);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get all G3CEmployee: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	@GetMapping("/updatenotification/{id}")
	public ResponseEntity<Object> gethrUser(@PathVariable Long id) {
		try {
			return notificationRepository.findById(id).map(notifydata -> {
				notifydata.setIs_active(false);
				notificationRepository.save(notifydata);
				return ResponseHandler.generateResponse("Notification Updated", true, HttpStatus.OK, null);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: " + id + " Notification Doesn't exist");
				return ResponseHandler.generateResponse(id + " Notification Doesn't exist", false, HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get Notification: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	// To assign role seperately only after user Registration *****
	@PutMapping("assignrole")
	public ResponseEntity<Object> uploadUserRole(@Valid @RequestBody G3CEmployeeRole employee_role) {

		try {
			Optional<Role> role = roleRepository.findById(employee_role.getRole_id().intValue());
			Set<Role> roleData = new HashSet<>();
			if (role.isPresent()) {
				roleData.add(role.get());
			} else {
				return ResponseHandler.generateResponse("Role ID: " + employee_role.getRole_id() + " Not Found", false,
						HttpStatus.OK, null);
			}

			List<G3CEmployeeMasterModel> user_employees = new ArrayList<>();
			for (Long user_id : employee_role.getUser_id()) {
				Optional<G3CEmployeeMasterModel> employee = g3cEmployeeRepository.findById(user_id);
				if (employee.isPresent()) {
					G3CEmployeeMasterModel employeedata = employee.get();
					employeedata.setRolename(role.get().getName().toString());
					employeedata.setRoles(roleData);
					user_employees.add(employeedata);
				} else {
					return ResponseHandler.generateResponse("User " + user_id + " Not Found", false, HttpStatus.OK,
							null);
				}
			}

			g3cEmployeeRepository.saveAll(user_employees);
			return ResponseHandler.generateResponse("Employee roles assigned Succesfully", true, HttpStatus.OK, null);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while update role " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	// to get dropdown to get shortids based non role assigned users
	@GetMapping("/getuserswithoutrole")
	public ResponseEntity<Object> findEmptyRoleUsers() {
		try {
			List<G3CEmployeeMasterModel> employeeinfo = g3cEmployeeRepository.findAllByRolenameIsNull();
			return ResponseHandler.generateResponse("List of Employees", true, HttpStatus.OK, employeeinfo);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get all G3CEmployee: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	// to get role assigned users list pagination
	@GetMapping("/getuserswithrole")

	public ResponseEntity<Object> findAllUsersDatas(
			@PageableDefault(size = 10, page = 0, sort = "id", direction = Direction.DESC) Pageable pageable,
			@RequestParam String Searchkeyword) {
		try {
			Page<G3CEmployeeMasterModel> userDatas = g3cEmployeeRepository.findAllByRolenameNotNull(Searchkeyword,
					pageable);
			return ResponseHandler.generateResponse("Department datas found", true, HttpStatus.OK, userDatas);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get all Department Data: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	// To delete role seperately only after user Registration

	@DeleteMapping("/deleterole")
	public ResponseEntity<Object> deleteUserRole(@Valid @RequestBody G3CEmployeeRole employee_role) {

		try {

			Set<Role> rolesdata = new HashSet<>();
			List<Long> employeedetails = employee_role.getUser_id();
			for (long userid : employeedetails) {
				G3CEmployeeMasterModel g3cemployee = g3cEmployeeRepository.findById(userid).get();
				if (g3cemployee == null) {
					LOGGER.error("Role id is not found. ");
					return ResponseHandler.generateResponse("Invalid Role ID: " + employee_role, false, HttpStatus.OK,
							null);
				} else {
					g3cemployee.setRolename(null);
					g3cemployee.setRoles(rolesdata);
					g3cEmployeeRepository.save(g3cemployee);
				}
			}

			return ResponseHandler.generateResponse("Users Roles Deleted Successfully!", true, HttpStatus.OK, null);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error:" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	// Get All Roles for Dropdown
	@GetMapping("/getroles")
	public ResponseEntity<Object> findAllRoles() {
		try {
			List<Role> userRoles = roleRepository.findAll();
			return ResponseHandler.generateResponse("Lists of Roles", true, HttpStatus.OK, userRoles);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get all role Data: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	// Get Business Manager Grid
	@GetMapping("/getbussinessmanagergrid")
	public ResponseEntity<Object> findAllBussinessManager(
			@PageableDefault(size = 10, page = 0, sort = "id", direction = Direction.DESC) Pageable pageable,
			@RequestParam String Searchkeyword) {
		try {
			Page<G3CEmployeeMasterModel> userDatas = g3cEmployeeRepository.findBusinessManager(Searchkeyword, pageable);
			return ResponseHandler.generateResponse("List of Bussiness Managers", true, HttpStatus.OK, userDatas);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get Bussiness Managers: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	// Get Business Manager Dropdown
	@GetMapping("/getbussinessmanager/{userid}")
	public ResponseEntity<Object> findAllBussinessManagerDropdown(@PathVariable Long userid) {
		try {
			Optional<G3CEmployeeMasterModel> currentbusinessmanager = g3cEmployeeRepository.findById(userid);
			if (currentbusinessmanager.isPresent()) {

				List<G3CEmployeeMasterModel> userDatas = g3cEmployeeRepository.findAllBusinessManagers(userid,
						currentbusinessmanager.get().getCost_center());
				return ResponseHandler.generateResponse("List of Bussiness Managers", true, HttpStatus.OK, userDatas);
			} else {

				LOGGER.error("Bussuiness not found: " + userid);
				return ResponseHandler.generateResponse("Bussuiness not found", false, HttpStatus.OK, null);
			}
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get Bussiness Managers: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	// Change Business Owner for all Projects
	@GetMapping("/changebusinessmanager/{old_manager_id}/{new_manager_id}")
	public ResponseEntity<Object> changeBusinessOwner(@PathVariable Long old_manager_id,
			@PathVariable Long new_manager_id) {
		try {
			Optional<G3CEmployeeMasterModel> old_manager_data = g3cEmployeeRepository.findById(old_manager_id);
			Optional<G3CEmployeeMasterModel> new_manager_data = g3cEmployeeRepository.findById(new_manager_id);

			if (old_manager_data.isPresent() && new_manager_data.isPresent()) {
				if (old_manager_data.get().getRolename().equals("BUSINESS")
						&& new_manager_data.get().getRolename().equals("BUSINESS")
						&& old_manager_data.get().getCost_center().equals(new_manager_data.get().getCost_center())) {
					g3cEmployeeService.changeBusinessManager(old_manager_data.get(), new_manager_data.get());
					return ResponseHandler.generateResponse("Roles of Manager assigned Successfully", true,
							HttpStatus.OK, null);
				} else {
					return ResponseHandler.generateResponse("Roles MisMatches from the Selected User", true,
							HttpStatus.OK, null);
				}
			} else {
				return ResponseHandler.generateResponse("Manager Not found", true, HttpStatus.OK, null);
			}
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while changing Bussiness Managers: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	// Change Business Owner for all Projects
	@GetMapping("/getldapuser")
	@JsonView(CustomFields.MyResponseViews.class)
	public ResponseEntity<Object> changeBusinessOwner(@RequestParam String shortid) {
		try {
			if (env.getProperty("hostname.name") != null
					&& Boolean.TRUE.equals(Boolean.parseBoolean(env.getProperty("spring.ldap.user.config")))) {
				MySSCLapServerResponce response_from_myssc = mysscslaservice.getLDAPUsers(shortid);
				if (response_from_myssc.getIsSuccess().equals(true) && response_from_myssc.getHttpStatusCode() == 200) {
					return ResponseHandler.generateResponse("LDAP User List", true, HttpStatus.OK,
							response_from_myssc.getDatas());
				} else {
					return ResponseHandler.generateResponse(response_from_myssc.getStatusMessage(), false,
							HttpStatus.OK, response_from_myssc);
				}
			} else {
				List<G3CEmployeeMasterModel> customerlist = g3cEmployeeRepository.findAllCustomerShortid(shortid);
				return ResponseHandler.generateResponse("LDAP User List", true, HttpStatus.OK, customerlist);
			}

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while changing Bussiness Managers: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error:" + e.getMessage(), false, HttpStatus.OK, null);
		}
	}

}

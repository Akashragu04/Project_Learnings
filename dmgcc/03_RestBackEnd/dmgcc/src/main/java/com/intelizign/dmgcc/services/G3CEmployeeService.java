package com.intelizign.dmgcc.services;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.intelizign.dmgcc.models.ERole;
import com.intelizign.dmgcc.models.G3CEmployeeMasterModel;
import com.intelizign.dmgcc.models.LeadRequestModel;
import com.intelizign.dmgcc.models.ProjectModel;
import com.intelizign.dmgcc.models.Role;
import com.intelizign.dmgcc.models.SLAModel;
import com.intelizign.dmgcc.models.businesscasemodels.BusinessCaseRequest;
import com.intelizign.dmgcc.models.excel.ThirdPartyExcelData;
import com.intelizign.dmgcc.repositories.BizCaseRequestRepository;
import com.intelizign.dmgcc.repositories.G3CEmployeeRepository;
import com.intelizign.dmgcc.repositories.LeadBusinessRepository;
import com.intelizign.dmgcc.repositories.ProjectRepository;
import com.intelizign.dmgcc.repositories.RoleRepository;
import com.intelizign.dmgcc.repositories.SLARepository;
import com.poiji.bind.Poiji;

@Service
public class G3CEmployeeService {

	@Autowired
	private BizCaseRequestRepository bizcaseReqstRepository;

	@Autowired
	private static RoleRepository roleRepository;

	@Autowired
	private LeadBusinessRepository leadreq_repository;

	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private SLARepository slaRepository;

	@Autowired
	G3CEmployeeRepository g3cEmployeeRepository;

	G3CEmployeeService(RoleRepository roleRepository) {
		this.roleRepository = roleRepository;
	}

	public static String type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

	public void changeBusinessManager(G3CEmployeeMasterModel old_manager, G3CEmployeeMasterModel new_manager) {
		// Lead Module
		List<LeadRequestModel> leads_under_manager = leadreq_repository
				.findByServiceProviderEmail(old_manager.getEmail());
		if (!leads_under_manager.isEmpty()) {
			List<LeadRequestModel> leads_under_new_manager = changeManagerInLead(leads_under_manager, new_manager);
			leadreq_repository.saveAll(leads_under_new_manager);
		}
		// BizCase request
		List<BusinessCaseRequest> bizcase_under_manager = bizcaseReqstRepository
				.findByServiceProvider(old_manager.getShortid(), old_manager.getCost_center());
		if (!bizcase_under_manager.isEmpty()) {
			List<BusinessCaseRequest> bizcase_under_new_manager = changeMangerInBizcaseRequest(bizcase_under_manager,
					new_manager);
			bizcaseReqstRepository.saveAll(bizcase_under_new_manager);
		}
		// Project Module
		List<ProjectModel> projects_under_manager = projectRepository.findByServiceProvider(old_manager.getShortid());
		if (!projects_under_manager.isEmpty()) {
			List<ProjectModel> projects_under_new_manager = changeManagerInProject(projects_under_manager, new_manager);
			projectRepository.saveAll(projects_under_new_manager);
		}
		// SLA Module
		List<SLAModel> sla_under_manager = slaRepository.findByService_provider_shortid(old_manager.getShortid());
		if (!sla_under_manager.isEmpty()) {
			List<SLAModel> sla_under_new_manager = changeManagerInSLA(sla_under_manager, new_manager);
			slaRepository.saveAll(sla_under_new_manager);
		}

	}

	public List<LeadRequestModel> changeManagerInLead(List<LeadRequestModel> leads_under_manager,
			G3CEmployeeMasterModel new_manager) {
		List<LeadRequestModel> leads_under_new_manager = new ArrayList<>();
		for (LeadRequestModel leads : leads_under_manager) {
			leads.setService_provider_short_id(new_manager.getShortid());
			leads.setService_provider_contact_name(new_manager.getEmp_name());
			leads.setService_provider_email_id(new_manager.getEmail());
			leads.setService_provider_department(new_manager.getDepartment());
			leads_under_new_manager.add(leads);
		}
		return leads_under_new_manager;

	}

	public List<BusinessCaseRequest> changeMangerInBizcaseRequest(List<BusinessCaseRequest> bizcase_under_manager,
			G3CEmployeeMasterModel new_manager) {
		List<BusinessCaseRequest> bizcase_under_new_manager = new ArrayList<>();
		for (BusinessCaseRequest bizcase : bizcase_under_manager) {
			bizcase.setApproved_provider_Shortid(new_manager.getShortid());
			bizcase_under_new_manager.add(bizcase);
		}
		return bizcase_under_new_manager;
	}

	public List<ProjectModel> changeManagerInProject(List<ProjectModel> projects_under_manager,
			G3CEmployeeMasterModel new_manager) {
		List<ProjectModel> projects_under_new_manager = new ArrayList<>();
		for (ProjectModel project : projects_under_manager) {
			project.setService_provider_shortid(new_manager.getShortid());
			project.setService_provider(new_manager.getEmp_name());
			projects_under_new_manager.add(project);
		}
		return projects_under_new_manager;
	}

	public List<SLAModel> changeManagerInSLA(List<SLAModel> sla_under_manager, G3CEmployeeMasterModel new_manager) {
		List<SLAModel> sla_under_new_manager = new ArrayList<>();
		for (SLAModel sla : sla_under_manager) {
			sla.setProvider_name(new_manager.getEmp_name());
			sla_under_new_manager.add(sla);
		}
		return sla_under_new_manager;
	}

	public void saveThirdPartyResourceFromExcel(MultipartFile file, G3CEmployeeMasterModel manager,
			List<String> errorMessage) throws IOException {
		List<ThirdPartyExcelData> third_part_exceldata = new ArrayList<>();
		File directory = new File("./uploads/exceldata/");
		if (!directory.exists()) {
			directory.mkdir();
		}
		Path filepath = Paths.get("./uploads/exceldata/" + file.getOriginalFilename());
		Files.deleteIfExists(filepath);
		file.transferTo(filepath);
		File excel_file = new File(filepath.toString());
		third_part_exceldata = Poiji.fromExcel(excel_file, ThirdPartyExcelData.class);
		ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
		Validator validator = factory.getValidator();
		Set<ConstraintViolation<ThirdPartyExcelData>> violations = null;

		for (ThirdPartyExcelData data : third_part_exceldata) {
			violations = validator.validate(data);
			List<String> errors = new ArrayList<>();
			violations.stream().forEach(error -> {

				String errormessage = " Cannot be Null or Blank or Empty";

				if (StringUtils.equals(error.getPropertyPath().toString(), "date_of_joining")) {
					errormessage = " Cannot be Null or Blank or Empty or Format Mismatch(dd-mm-yyy)";
				}

				errors.add(StringUtils.capitalize(error.getPropertyPath().toString()) + errormessage);
			});

			if (g3cEmployeeRepository.existsByEmailOrShortid(data.getEmail(), data.getShort_id())) {
				errors.add("User Already Exists with " + data.getEmail());
			}
			List<String> commonErrors = errors.stream().distinct().collect(Collectors.toList());
			commonErrors.stream().forEach(errorMessage::add);
		}

		if (ObjectUtils.isEmpty(errorMessage)) {
			List<G3CEmployeeMasterModel> thirpartyemployees = new ArrayList<>();
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
			third_part_exceldata.stream().forEach(elem -> {
				G3CEmployeeMasterModel thirdpartyemployee = new G3CEmployeeMasterModel();
				Optional<G3CEmployeeMasterModel> emp_data = g3cEmployeeRepository.findByShortiD(elem.getShort_id());
				if (emp_data.isPresent()) {
					thirdpartyemployee = emp_data.get();
				}
				thirdpartyemployee.setDepartment_id(manager.getDepartment_id());
				thirdpartyemployee.setSupv_id(manager.getEmployee_code());
				thirdpartyemployee.setCost_center(manager.getCost_center());
				thirdpartyemployee.setApprover1(manager.getApprover1());
				thirdpartyemployee.setApprover_name(manager.getApprover_name());
				thirdpartyemployee.setDepartment(manager.getDepartment());
				thirdpartyemployee.setShortid(elem.getShort_id());
				thirdpartyemployee.setHrid(elem.getHr_id());
				thirdpartyemployee.setEmp_name(elem.getEmployee_name());
				thirdpartyemployee.setFunctions(elem.getFunctions());
				thirdpartyemployee.setDate_of_join(LocalDate.parse(elem.getDate_of_joining(), formatter));
				thirdpartyemployee.setEmail(elem.getEmail());
				thirdpartyemployee.setDesignation(elem.getDesignation());
				thirdpartyemployee.setEmployee_type("Third Party Resource");
				thirdpartyemployee.setEmployee_code("E001"); // sample
				thirpartyemployees.add(thirdpartyemployee);
			});
			g3cEmployeeRepository.saveAll(thirpartyemployees);

		}
		Files.deleteIfExists(filepath);

	}

	public static List<G3CEmployeeMasterModel> excelToDb(InputStream input, MultipartFile file) {
		try {
			Workbook workbook = new XSSFWorkbook(input);
			Sheet sheet = workbook.getSheet("Sheet1");

			Iterator<Row> rows = sheet.iterator();
			List<G3CEmployeeMasterModel> students = new ArrayList<>();
			int rowNumber = 0;
			while (rows.hasNext()) {
				Row currentRow = rows.next();
				// skip header
				if (rowNumber == 0) {
					rowNumber++;
					continue;
				}
				Iterator<Cell> cellsInRow = currentRow.iterator();
				G3CEmployeeMasterModel employee = new G3CEmployeeMasterModel();
				DataFormatter formatter = new DataFormatter();
				int cellIdx = 0;
				while (cellsInRow.hasNext()) {
					Cell currentCell = cellsInRow.next();
					switch (cellIdx) {
					case 0:
						employee.setEmployee_code(formatter.formatCellValue(currentCell));
						break;
					case 1:
						employee.setHrwt_code(formatter.formatCellValue(currentCell));
						break;
					case 2:
						employee.setKim_no(formatter.formatCellValue(currentCell));
						break;
					case 3:
						employee.setEmp_name(formatter.formatCellValue(currentCell));
						break;
					case 4:
						employee.setDesignation(formatter.formatCellValue(currentCell));
						break;
					case 5:
						employee.setFunctions(formatter.formatCellValue(currentCell));
						break;
					case 6:
						employee.setDepartment_id(formatter.formatCellValue(currentCell));
						break;
					case 7:
						employee.setDepartment(formatter.formatCellValue(currentCell));
						break;
					case 8:
						employee.setLevel(formatter.formatCellValue(currentCell));
						break;
					case 9:
						employee.setGrade(formatter.formatCellValue(currentCell));
						break;
					case 10:
						employee.setEmployement_status(formatter.formatCellValue(currentCell));
						break;
					case 11:
						if (currentCell.getCellType() != CellType.BLANK
								&& currentCell.getCellType() != CellType._NONE) {
							Date Date_of_leave = currentCell.getDateCellValue();
							employee.setDate_of_leave(convert(Date_of_leave));
						}
						break;
					case 12:
						employee.setEmployee_supv_code(formatter.formatCellValue(currentCell));
						break;
					case 13:
						employee.setSupv_id(formatter.formatCellValue(currentCell));
						break;
					case 14:
						employee.setReport_to(formatter.formatCellValue(currentCell));
						break;
					case 15:
						employee.setCost_center(formatter.formatCellValue(currentCell));
						break;
					case 16:
						employee.setEmail(formatter.formatCellValue(currentCell));
						break;
					case 17:
						employee.setShortid(formatter.formatCellValue(currentCell));
						break;
					case 18:
						employee.setSub_function(formatter.formatCellValue(currentCell));
						break;

					default:
						break;
					}
					cellIdx++;
				}

				Set<Role> memberroles = new HashSet<>();
				Role memberRole = roleRepository.findByName(ERole.EMPLOYEE)
						.orElseThrow(() -> new RuntimeException("Error: Role is not found."));

				memberroles.add(memberRole);
				employee.setRoles(memberroles);
				employee.setRolename(memberRole.getName().toString());
				students.add(employee);
			}
			workbook.close();
			return students;
		} catch (IOException e) {
			throw new RuntimeException("fail to parse Excel file: " + e.getMessage());
		}
	}

	public static LocalDate convert(Date date) {
		return date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
	}

	public static boolean hasExcelFormat(MultipartFile file) {
		if (!type.equals(file.getContentType())) {
			return false;
		}
		return true;
	}
}

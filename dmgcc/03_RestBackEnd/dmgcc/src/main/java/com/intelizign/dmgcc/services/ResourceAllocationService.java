package com.intelizign.dmgcc.services;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.intelizign.dmgcc.models.EmployeeCapacityReportModel;
import com.intelizign.dmgcc.models.G3CEmployeeMasterModel;
import com.intelizign.dmgcc.models.ProjectModel;
import com.intelizign.dmgcc.models.ResourceAllocationModel;
import com.intelizign.dmgcc.models.TimesheetModel;
import com.intelizign.dmgcc.models.landingpage.FeedBackModel;
import com.intelizign.dmgcc.pojoclass.ResourceBaseCapacity;
import com.intelizign.dmgcc.pojoclass.ResourceBaseProjectCapacity;
import com.intelizign.dmgcc.repositories.EmployeeCapacityReporRepository;
import com.intelizign.dmgcc.repositories.G3CEmployeeRepository;
import com.intelizign.dmgcc.repositories.ProjectRepository;
import com.intelizign.dmgcc.repositories.TimesheetRepository;
import com.intelizign.dmgcc.response.ResourceBasedViewResponse;
import com.intelizign.dmgcc.response.ResourceReportView;

@Service
@Transactional
public class ResourceAllocationService {

	public final Logger LOGGER = LogManager.getLogger(ResourceAllocationService.class);

	@Autowired
	private G3CEmployeeRepository g3cEmployeeRepository;

	@Autowired
	private EmployeeCapacityReporRepository employeeCapacityReporRepository;
	
	@Autowired
	private TimesheetRepository timesheetRepository;
	
	static String SHEET = "Sheet1";
	 

	private static final DecimalFormat floatFormat = new DecimalFormat("0.00");

	public ResourceReportView getResourceReportVeiw(ResourceReportView responceview,
			List<G3CEmployeeMasterModel> employeelist) {

		List<G3CEmployeeMasterModel> getavailableresource = g3cEmployeeRepository.findByAvailableResource();
		List<ResourceBasedViewResponse> resourceBasedViewResponses = new ArrayList<>();
		for (G3CEmployeeMasterModel currentEmployeeMasterModel : getavailableresource) {
			ResourceBasedViewResponse currentBasedViewResponse = new ResourceBasedViewResponse();
			currentBasedViewResponse.setId(currentEmployeeMasterModel.getId());
			currentBasedViewResponse.setLevel(currentEmployeeMasterModel.getLevel());
			currentBasedViewResponse.setHr_id(currentEmployeeMasterModel.getHrid());
			currentBasedViewResponse.setEmp_name(currentEmployeeMasterModel.getEmp_name());
			currentBasedViewResponse.setEmail(currentEmployeeMasterModel.getEmail());
			currentBasedViewResponse.setCapacity(currentEmployeeMasterModel.getCapacity());
			currentBasedViewResponse.setShortid(currentEmployeeMasterModel.getShortid());
			resourceBasedViewResponses.add(currentBasedViewResponse);
		}
		List<ResourceBaseCapacity> resourceBaseCapacitiesdata = new ArrayList<>();
		for (G3CEmployeeMasterModel currentEmployee : employeelist) {

			ResourceBaseCapacity resourceBaseCapacities = new ResourceBaseCapacity();
			List<ResourceBaseProjectCapacity> resourceBaseProjectCapacities = new ArrayList<>();
			for (ResourceAllocationModel resourceMappingModel : currentEmployee.getResource_mapping()) {

				resourceBaseCapacities.setHr_id(resourceMappingModel.getHrid());
				resourceBaseCapacities.setId(resourceMappingModel.getId());
				resourceBaseCapacities.setEmp_name(resourceMappingModel.getResource_name());
				resourceBaseCapacities.setLevel(resourceMappingModel.getLevel());
				resourceBaseCapacities.setUser_id(resourceMappingModel.getUserid());
				resourceBaseCapacities.setCurren_capacity(currentEmployee.getCapacity());

				ResourceBaseProjectCapacity resourceBaseProjectCapacity = new ResourceBaseProjectCapacity();

				resourceBaseProjectCapacity.setProject_code(resourceMappingModel.getProject().getProject_id());
				resourceBaseProjectCapacity.setProject_name(resourceMappingModel.getProject_name());
				resourceBaseProjectCapacity.setSla_code(resourceMappingModel.getSla().getSlaid());
				resourceBaseProjectCapacity.setSla_name(resourceMappingModel.getSla_name());
				resourceBaseProjectCapacity.setResource_capacity(resourceMappingModel.getCapcity());
				resourceBaseProjectCapacity.setResource_mapping_id(resourceMappingModel.getId());
				resourceBaseProjectCapacity.setSla_expiry_date(resourceMappingModel.getSla().getEnd_date());
				resourceBaseProjectCapacities.add(resourceBaseProjectCapacity);
			}
			resourceBaseCapacities.setProjectinfo(resourceBaseProjectCapacities);

			List<EmployeeCapacityReportModel> empcapacitydata = employeeCapacityReporRepository
					.findByUserinfoId(currentEmployee.getId());
			Float empavaerage = employeeCapacityReporRepository.findByAverageCapacity(currentEmployee.getId());

			resourceBaseCapacities.setEmployeecapacityreport(empcapacitydata);
			resourceBaseCapacities.setOverall_yearly_capacity(empavaerage);
			resourceBaseCapacitiesdata.add(resourceBaseCapacities);

		}
		responceview.setReportview("ResourceBasedView");
		responceview.setAvailableresource(resourceBasedViewResponses);
		responceview.setResourceview(resourceBaseCapacitiesdata);

		return responceview;
	}

	public ResourceReportView getResourceUtilizationVeiw(ResourceReportView responceview,
			List<G3CEmployeeMasterModel> employeelist) {

		List<ResourceBaseCapacity> resourceBaseCapacitiesdata = new ArrayList<>();
		for (G3CEmployeeMasterModel currentEmployee : employeelist) {

			ResourceBaseCapacity resourceBaseCapacities = new ResourceBaseCapacity();
			resourceBaseCapacities.setHr_id(currentEmployee.getHrid());
			resourceBaseCapacities.setId(currentEmployee.getId());
			resourceBaseCapacities.setEmp_name(currentEmployee.getEmp_name());
			resourceBaseCapacities.setLevel(currentEmployee.getLevel());
			resourceBaseCapacities.setUser_id(currentEmployee.getId());
			resourceBaseCapacities.setCurren_capacity(currentEmployee.getCapacity());

			List<ResourceBaseProjectCapacity> resourceBaseProjectCapacities = new ArrayList<>();
			for (ResourceAllocationModel resourceMappingModel : currentEmployee.getResource_mapping()) {

				ResourceBaseProjectCapacity resourceBaseProjectCapacity = new ResourceBaseProjectCapacity();

				resourceBaseProjectCapacity.setProject_code(resourceMappingModel.getProject().getProject_id());
				resourceBaseProjectCapacity.setProject_name(resourceMappingModel.getProject_name());
				resourceBaseProjectCapacity.setSla_code(resourceMappingModel.getSla().getSlaid());
				resourceBaseProjectCapacity.setSla_name(resourceMappingModel.getSla_name());
				resourceBaseProjectCapacity.setResource_capacity(resourceMappingModel.getCapcity());
				resourceBaseProjectCapacity.setResource_mapping_id(resourceMappingModel.getId());
				resourceBaseProjectCapacity.setSla_expiry_date(resourceMappingModel.getSla().getEnd_date());
				resourceBaseProjectCapacities.add(resourceBaseProjectCapacity);
			}
			resourceBaseCapacities.setProjectinfo(resourceBaseProjectCapacities);

			List<EmployeeCapacityReportModel> empcapacitydata = employeeCapacityReporRepository
					.findByUserinfoId(currentEmployee.getId());
			Float empavaerage = employeeCapacityReporRepository.findByAverageCapacity(currentEmployee.getId());

			resourceBaseCapacities.setEmployeecapacityreport(empcapacitydata);
			resourceBaseCapacities.setOverall_yearly_capacity(empavaerage);
			resourceBaseCapacitiesdata.add(resourceBaseCapacities);

		}
		responceview.setReportview("ResourceBasedView");
		responceview.setResourceview(resourceBaseCapacitiesdata);

		return responceview;
	}

	public String capinitiStatus(Boolean status) {

		if (status)
			return "Enabled";
		else
			return "Disabled";
	}

	public Page<ResourceBaseCapacity> createPageFromList(List<ResourceBaseCapacity> list, Pageable pageable) {
		if (list == null) {
			throw new IllegalArgumentException("To create a Page, the list mustn't be null!");
		}

		int startOfPage = pageable.getPageNumber() * pageable.getPageSize();
		if (startOfPage > list.size()) {
			return new PageImpl<>(new ArrayList<>(), pageable, 0);
		}

		int endOfPage = Math.min(startOfPage + pageable.getPageSize(), list.size());
		return new PageImpl<>(list.subList(startOfPage, endOfPage), pageable, list.size());
	}

	public String excelExporttoCapinti(ProjectModel projectData) {
		
		List<TimesheetModel> timesheetDatas = timesheetRepository.findByProject(projectData.getId());
		return capintiInfoToExcel(timesheetDatas);		
	}
	
	public String excelExporttoCapintiForEmployee(ProjectModel projectData, Long user_id) {
		List<TimesheetModel> timesheetDatas = timesheetRepository.findByProjectAndUser(projectData.getId(), user_id);
		return capintiInfoToExcel(timesheetDatas);		
	}
	
	private String capintiInfoToExcel(List<TimesheetModel> timesheetDatas) {


		String[] HEADERs = {"User Name", "Project", "Date", "Start Time", "End Time", "Working type", "Working Hours", "SLA#", "Task", "Comments"};

		try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
			Sheet sheet = workbook.createSheet(SHEET);

			// Header
			Row headerRow = sheet.createRow(0);
			CellStyle cellStyle = workbook.createCellStyle();
			for (int col = 0; col < HEADERs.length; col++) {
				Cell cell = headerRow.createCell(col);
				cell.setCellValue(HEADERs[col]);
				addBold(workbook, cellStyle, cell);
			}

			int rowIdx = 1;
			for (TimesheetModel timesheetData : timesheetDatas) {

				Row row = sheet.createRow(rowIdx);
				row.createCell(0).setCellValue(timesheetData.getName());
				row.createCell(1).setCellValue(timesheetData.getProject_name());
				row.createCell(2).setCellValue(timesheetData.getTimesheet_date());
				row.createCell(3).setCellValue(timesheetData.getStart_time());
				row.createCell(4).setCellValue(timesheetData.getEnd_time());
				row.createCell(5).setCellValue(timesheetData.getWorkingtype());
				row.createCell(6).setCellValue(timesheetData.getWorking_hours());
				row.createCell(7).setCellValue(timesheetData.getSlaid());
				row.createCell(8).setCellValue(timesheetData.getTask_name());
				row.createCell(9).setCellValue(timesheetData.getComments());
								
				rowIdx++;
			}
			workbook.write(out);

			String res = Base64.getEncoder().encodeToString(out.toByteArray());
			return res;
		} 
		
		catch (IOException e) {
			return null;
		}
	
	
	}


	private void addBold(Workbook workbook, CellStyle cellStyle, Cell cell) {
		Font font = workbook.createFont();
		font.setBold(true);
		cellStyle.setFont(font);
		cell.setCellStyle(cellStyle);
	}

}

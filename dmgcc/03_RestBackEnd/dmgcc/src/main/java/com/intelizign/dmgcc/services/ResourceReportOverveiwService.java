package com.intelizign.dmgcc.services;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.intelizign.dmgcc.models.CostCenterModel;
import com.intelizign.dmgcc.models.EmployeeCapacityReportModel;
import com.intelizign.dmgcc.models.G3CEmployeeMasterModel;
import com.intelizign.dmgcc.models.JDMappingModel;
import com.intelizign.dmgcc.models.ResourceAllocationModel;
import com.intelizign.dmgcc.models.businesscasemodels.BusinessCaseRequest;
import com.intelizign.dmgcc.pojoclass.FTERequirement;
import com.intelizign.dmgcc.pojoclass.ResourceBaseCapacity;
import com.intelizign.dmgcc.pojoclass.ResourceBaseProjectCapacity;
import com.intelizign.dmgcc.repositories.EmployeeCapacityReporRepository;
import com.intelizign.dmgcc.repositories.G3CEmployeeRepository;
import com.intelizign.dmgcc.repositories.JDMappingRepository;
import com.intelizign.dmgcc.response.CostCenterResponse;
import com.intelizign.dmgcc.response.JDHiredResponse;
import com.intelizign.dmgcc.response.ResourceOverviewReport;
import com.intelizign.dmgcc.response.ResourceOverviewReport.Employeeinfo;

@Service
@Transactional
public class ResourceReportOverveiwService {

	public final Logger LOGGER = LogManager.getLogger(ResourceReportOverveiwService.class);

	@Autowired
	private G3CEmployeeRepository g3cEmployeeRepository;

	@Autowired
	private JDMappingRepository jdRepository;

	@Autowired
	private EmployeeCapacityReporRepository employeeCapacityReporRepository;

	@Autowired
	private ResourceAllocationService resourceAllocationService;

	public ResourceOverviewReport getResourceOverviewReport(String cost_center, ResourceOverviewReport resource_report,
			List<BusinessCaseRequest> bizcase_datas, Pageable pageable) {
		List<Employeeinfo> totalpositionsdata = new ArrayList<>();
		List<G3CEmployeeMasterModel> total_position = new ArrayList<>();

		if (!cost_center.isBlank() || !cost_center.isEmpty()) {
			total_position = g3cEmployeeRepository.findOnlyByCostcenter(cost_center);
		} else {
			total_position = g3cEmployeeRepository.findAll();
		}

		if (!total_position.isEmpty()) {
			totalpositionsdata.addAll(getEmployeeInfoFromMasterModel(total_position, totalpositionsdata.size()));
		}

		// Approve Position Logics
		List<Employeeinfo> approvedpositionsdata = new ArrayList<>();

		for (BusinessCaseRequest biz_data : bizcase_datas) {
			List<JDMappingModel> fte_positions = jdRepository.findByRequestId(biz_data.getId());

			if (!fte_positions.isEmpty()) {
				approvedpositionsdata.addAll(getEmployeeInfoFromJDModel(fte_positions, 0));
				totalpositionsdata.addAll(getEmployeeInfoFromJDModel(fte_positions, totalpositionsdata.size()));
			}
		}
		// total position
		if (!totalpositionsdata.isEmpty()) {
			resource_report.setTotal_positions(totalpositionsdata.size());
		} else {
			resource_report.setTotal_positions(0);
		}
		resource_report.setTotal_positions_info(totalpositionsdata);

		// Approved positon
		resource_report.setApproved_positions(approvedpositionsdata.size());
		resource_report.setApproved_positions_info(approvedpositionsdata);

		// Open Position Calculation
		List<Employeeinfo> employee_openposition = new ArrayList<Employeeinfo>();

		for (BusinessCaseRequest biz_data : bizcase_datas) {
			List<JDMappingModel> open_position = jdRepository.findByRequestId(biz_data.getId());
			if (!open_position.isEmpty()) {
				employee_openposition
						.addAll(getUnhiredEmployeeInfoFromJDModel(open_position, employee_openposition.size()));
			}
		}
		if (!employee_openposition.isEmpty()) {
			resource_report.setOpen_positions(employee_openposition.size());
		} else {
			resource_report.setOpen_positions(0);
		}
		resource_report.setOpen_positions_info(employee_openposition);

		// with and without sla
		List<G3CEmployeeMasterModel> with_sla = new ArrayList<>();
		List<G3CEmployeeMasterModel> without_sla = new ArrayList<>();
		List<ResourceBaseCapacity> utilization_emp_info = new ArrayList<>();
		for (G3CEmployeeMasterModel employee_data : total_position) {
			if (!employee_data.getResource_mapping().isEmpty()) {
				with_sla.add(employee_data);
			} else {
				without_sla.add(employee_data);
			}
			ResourceBaseCapacity current_emp_data = new ResourceBaseCapacity();
			List<EmployeeCapacityReportModel> empcapacitydata = employeeCapacityReporRepository
					.findByUserinfoId(employee_data.getId());
			if (!employee_data.getResource_mapping().isEmpty()) {
				List<ResourceBaseProjectCapacity> resourceBaseProjectCapacities = new ArrayList<>();
				for (ResourceAllocationModel resourceMappingModel : employee_data.getResource_mapping()) {

					current_emp_data.setHr_id(resourceMappingModel.getHrid());
					current_emp_data.setId(resourceMappingModel.getId());
					current_emp_data.setEmp_name(resourceMappingModel.getResource_name());
					current_emp_data.setLevel(resourceMappingModel.getLevel());
					current_emp_data.setUser_id(resourceMappingModel.getUserid());
					current_emp_data.setCurren_capacity(employee_data.getCapacity());

					ResourceBaseProjectCapacity resourceBaseProjectCapacity = new ResourceBaseProjectCapacity();

					resourceBaseProjectCapacity.setProject_code(resourceMappingModel.getProject().getProject_id());
					resourceBaseProjectCapacity.setProject_name(resourceMappingModel.getProject_name());
					resourceBaseProjectCapacity.setSla_code(resourceMappingModel.getSla().getSlaid());
					resourceBaseProjectCapacity.setSla_name(resourceMappingModel.getSla_name());
					resourceBaseProjectCapacity.setResource_capacity(resourceMappingModel.getCapcity());
					resourceBaseProjectCapacity.setResource_mapping_id(resourceMappingModel.getId());
					resourceBaseProjectCapacities.add(resourceBaseProjectCapacity);
				}
				current_emp_data.setEmployeecapacityreport(empcapacitydata);
				current_emp_data.setProjectinfo(resourceBaseProjectCapacities);
				utilization_emp_info.add(current_emp_data);
			}

		}

		resource_report.setWith_sla(with_sla.size());
		resource_report.setWith_sla_info(getEmployeeInfoFromMasterModel(with_sla, 0));

		resource_report.setWithout_sla(without_sla.size());
		resource_report.setWithout_sla_info(getEmployeeInfoFromMasterModel(without_sla, 0));

		// utilization
		resource_report.setUtilization(g3cEmployeeRepository.findUtlizationByCostcenter(cost_center));

		// Utilization Data
		resource_report
				.setUtilization_emp_info(resourceAllocationService.createPageFromList(utilization_emp_info, pageable));
		return resource_report;
	}

	public List<Employeeinfo> getEmployeeInfoFromMasterModel(List<G3CEmployeeMasterModel> total_position, int id) {
		List<Employeeinfo> employeeInfos = new ArrayList<>();
		for (G3CEmployeeMasterModel employeeData : total_position) {
			Employeeinfo employeeInfo = new Employeeinfo();
			id += 1;
			employeeInfo.setId((long) id);
			employeeInfo.setHr_id(employeeData.getHrid());
			employeeInfo.setEmployee(employeeData.getEmp_name());
			employeeInfo.setProjectcode(employeeData.getResource_mapping().stream()
					.map(resource -> String.valueOf(resource.getProject().getProject_id()))
					.collect(Collectors.joining(", ")));
			employeeInfo.setProjectname(employeeData.getResource_mapping().stream()
					.map(ResourceAllocationModel::getProject_name).collect(Collectors.joining(", ")));
			employeeInfo.setSlaid(employeeData.getResource_mapping().stream()
					.map(resource -> String.valueOf(resource.getSla().getSlaid())).collect(Collectors.joining(", ")));
			employeeInfo.setUtilization(employeeData.getCapacity());
			employeeInfo.setEmployee_type(employeeData.getEmployee_type());
			employeeInfos.add(employeeInfo);
		}

		return employeeInfos;
	}

	public List<Employeeinfo> getEmployeeInfoFromJDModel(List<JDMappingModel> fte_positions, int id) {
		List<Employeeinfo> employeeInfos = new ArrayList<>();

		for (JDMappingModel jdData : fte_positions) {

			for (JDHiredResponse hired_status : jdData.getHired_details()) {
				Employeeinfo employeeInfo = new Employeeinfo();
				id += 1;
				employeeInfo.setId((long) id);
				employeeInfo.setRemarks(jdData.getRemarks());
				employeeInfo.setDue_date(jdData.getMonthandyear());
				employeeInfo.setStatus(hired_status.getStatus());
				employeeInfo.setPositioncode(jdData.getPosition_code());
				employeeInfo.setPostion(jdData.getJD().stream().findFirst().get().getJd_role());
				employeeInfos.add(employeeInfo);
			}

		}
		return employeeInfos;
	}

	public List<Employeeinfo> getUnhiredEmployeeInfoFromJDModel(List<JDMappingModel> fte_positions, int id) {
		List<Employeeinfo> employeeInfos = new ArrayList<>();

		for (JDMappingModel jdData : fte_positions) {

			for (JDHiredResponse hired_status : jdData.getHired_details()) {
				if (!hired_status.getStatus().equals("Onboard")) {
					Employeeinfo employeeInfo = new Employeeinfo();
					id += 1;
					employeeInfo.setId((long) id);
					employeeInfo.setRemarks(jdData.getRemarks());
					employeeInfo.setDue_date(jdData.getMonthandyear());
					employeeInfo.setStatus(hired_status.getStatus());
					employeeInfo.setPositioncode(jdData.getPosition_code());
					employeeInfo.setPostion(jdData.getJD().stream().findFirst().get().getJd_role());
					employeeInfos.add(employeeInfo);
				}
			}

		}
		return employeeInfos;
	}

	public FTERequirement getFTEData(String level, String total) {

		FTERequirement ftedata = new FTERequirement();
		ftedata.setLevel(level);
		ftedata.setFte(total);
		return ftedata;
	}

	public CostCenterResponse getCostCenterResponse(CostCenterModel costcenterdata) {
		CostCenterResponse costcenterResponse = new CostCenterResponse();
		costcenterResponse.setCost_center(costcenterdata.getCostcenter());
		costcenterResponse.setDepartment(costcenterdata.getTeam_group());
		costcenterResponse.setTeam(costcenterdata.getTeam());
		costcenterResponse.setManager(getMangerName(costcenterdata.getCostcenter()));

		return costcenterResponse;
	}

	public String getMangerName(String costcenter) {

		List<G3CEmployeeMasterModel> employees_by_costcenter = g3cEmployeeRepository
				.findByCostcenterAndManager(costcenter);

		if (!employees_by_costcenter.isEmpty()) {
//			StringBuilder managename = new StringBuilder(150);
//			employees_by_costcenter.stream().map(emp -> managename.append(emp.getEmp_name() + ", "));
			String managersname = employees_by_costcenter.stream().map(emp -> emp.getEmp_name())
					.collect(Collectors.joining(", "));
			System.out.println(managersname);
			return managersname;
//			return managersname.substring(0, managersname.length() - 2);
		} else {
			return "NA";
		}

	}

}

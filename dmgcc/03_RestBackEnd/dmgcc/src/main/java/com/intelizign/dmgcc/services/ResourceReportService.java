package com.intelizign.dmgcc.services;

import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.intelizign.dmgcc.models.EmployeeCapacityReportModel;
import com.intelizign.dmgcc.models.G3CEmployeeMasterModel;
import com.intelizign.dmgcc.models.ProjectModel;
import com.intelizign.dmgcc.models.ResourceAllocationModel;
import com.intelizign.dmgcc.models.SLAModel;
import com.intelizign.dmgcc.models.businesscasemodels.BusinessCaseRequest;
import com.intelizign.dmgcc.pojoclass.ResourceReport;
import com.intelizign.dmgcc.pojoclass.ResourceReport.SubResourceReport;
import com.intelizign.dmgcc.repositories.EmployeeCapacityReporRepository;
import com.intelizign.dmgcc.repositories.ResourceAllocationRepository;
import com.intelizign.dmgcc.repositories.TimesheetRepository;

@Service
@Transactional
public class ResourceReportService {

	@Autowired
	private EmployeeCapacityReporRepository employeeCapacityReporRepository;

	@Autowired
	private ResourceAllocationRepository resourceAllocationRepository;

	@Autowired
	private TimesheetRepository timesheetRepository;

	public final Logger LOGGER = LogManager.getLogger(ResourceReportService.class);

	private static final DecimalFormat doubleFormat = new DecimalFormat("0.00");

	public ResourceReport getResourcesReports(G3CEmployeeMasterModel employee_data) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");

		ResourceReport report = new ResourceReport();
		report.setUser(employee_data);
		List<EmployeeCapacityReportModel> empcapacitydata = employeeCapacityReporRepository
				.findByUserinfoId(employee_data.getId());
		Float empavaerage = employeeCapacityReporRepository.findByAverageCapacity(employee_data.getId());
		report.setEmpcapacitydata(empcapacitydata);
		report.setOverall_yearly_capacity(empavaerage);
		List<SubResourceReport> subresourcereport = new ArrayList<>();
		if (!employee_data.getResource_mapping().isEmpty()) {
			report.setUnder_project(true);
			boolean visibilty = false;
			Integer id = 1;
			for (ResourceAllocationModel resource_model : employee_data.getResource_mapping()) {
				SubResourceReport subreport = getSubResourceReport(resource_model.getSla());
				subreport.setId(id);
				subresourcereport.add(subreport);
				id++;
			}
			report.setVisibilty_of_next_sla(visibilty);
			report.setSla_reports(subresourcereport);
		} else {
			report.setUnder_project(false);
		}

		return report;

	}

	public SubResourceReport getSubResourceReport(SLAModel sladata) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
		SubResourceReport subreport = new SubResourceReport();
		subreport.setResource_status(true);
		subreport.setCurrent_project_name(sladata.getSlaname());
		subreport.setSla_start_date(sladata.getStart_date());
		subreport.setSla_end_date(sladata.getEnd_date());
		subreport.setSla_status(getSLAStatus(sladata.getActive()));
		LOGGER.info(LocalDate.parse(sladata.getEnd_date(), formatter));
		if (Boolean.TRUE.equals(sladata.getActive().equals("completed"))
				|| Boolean.TRUE.equals(sladata.getActive().equals("closed"))
				|| Boolean.TRUE.equals(sladata.getActive().equals("Inactive"))) {
			subreport.setN_end_sla_days((long) 0);
		} else {
			subreport.setN_end_sla_days(
					ChronoUnit.DAYS.between(LocalDate.now(), LocalDate.parse(sladata.getEnd_date(), formatter)));
		}
		Double billing_days = timesheetRepository.getBillingHoursForProject(sladata.getProject().getId(), true);
		if (billing_days != null) {
			subreport.setBilling_rate(billing_days);
		} else {
			subreport.setBilling_rate((double) 0);
		}
		Double leave_taken = timesheetRepository.getLEavesTakenForProjectAndSLA(sladata.getProject().getId(),
				sladata.getId(), false);
		if (leave_taken != null) {
			subreport.setEmployee_leave_taken(leave_taken);
			Integer working_hours = sladata.getProject().getBizcase().getWorking_hours();
			subreport.setLoss_of_billing_days(
					doubleFormat.format(leave_taken / ((working_hours == 0) ? 9 : working_hours)));
		} else {
			subreport.setEmployee_leave_taken((double) 0);
			subreport.setLoss_of_billing_days("0");
		}

		return subreport;
	}

	public String getSLAStatus(String status) {
		switch (status) {
		case "Active":
			return "Active";
		case "Inactive":
			return "Not-Started";
		case "completed":
			return "Completed";
		case "closed":
			return "Closed";
		default:
			return "NA";
		}
	}

	public Double getAllocatableResource(BusinessCaseRequest biz_data, Long project_id, ProjectModel project) {
		long total_fte = project.getTotal_fte_count();
		Double fte = Double.valueOf(total_fte);
		Integer allocated_capacity = resourceAllocationRepository.getCapacityByProject(project_id);
		allocated_capacity = allocated_capacity == null ? 0 : allocated_capacity;
		// allocation progress
		if (Objects.equals(total_fte, allocated_capacity)) {
			project.setAllocatable_resource_progress("Completed");
		} else if (allocated_capacity > 0) {
			project.setAllocatable_resource_progress("Partially Allocated");
		} else if (allocated_capacity == 0) {
			project.setAllocatable_resource_progress("Not Started");
		}

		if (allocated_capacity != null) {
			Double calculated_allocatedcapacity =  Double.parseDouble(doubleFormat.format((double) (allocated_capacity * 100 / total_fte))) ;
			return calculated_allocatedcapacity;
		}
			
		else {
			return 0.0;
		}
			
	}

	public Page<ProjectModel> getPaginationFromList(List<ProjectModel> list, Pageable pageable) {
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

	public void setBillableHours(Page<ProjectModel> projectdetails) {
		projectdetails.stream().forEach(project -> {
			Double billablehours = timesheetRepository.findBilledHoursbyProject(project.getId());
			project.setBillable_hours(billablehours);
		});

	}

}

package com.intelizign.dmgcc.services;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.intelizign.dmgcc.dashboardreportingservices.BizCaseSetupReportService;
import com.intelizign.dmgcc.dashboardreportingservices.MainDashboardService;
import com.intelizign.dmgcc.dashboardresponce.BarChartReport;
import com.intelizign.dmgcc.models.ProjectModel;
import com.intelizign.dmgcc.models.SLAModel;
import com.intelizign.dmgcc.models.TaskModel;
import com.intelizign.dmgcc.models.businesscasemodels.BizCaseSetupModel;
import com.intelizign.dmgcc.models.businesscasemodels.BusinessCaseRequest;
import com.intelizign.dmgcc.pojoclass.SLAcycle;
import com.intelizign.dmgcc.repositories.BizCaseRequestRepository;
import com.intelizign.dmgcc.repositories.JDMappingRepository;
import com.intelizign.dmgcc.repositories.ProjectRepository;
import com.intelizign.dmgcc.repositories.SLAInvoiceRepository;
import com.intelizign.dmgcc.repositories.SLARepository;
import com.intelizign.dmgcc.repositories.TaskRepository;
import com.intelizign.dmgcc.repositories.othermaster.IODumpRepository;
import com.intelizign.dmgcc.response.ProjectOverveiw;
import com.intelizign.dmgcc.response.ProjectOverveiw.ProjectOverviewBizCaseSetupReport;
import com.intelizign.dmgcc.response.ProjectOverveiw.ProjectReportDetails;
import com.intelizign.dmgcc.response.ProjectOverveiw.ProjectSlaReportDetails;

@Service
@Transactional
public class ProjectOverviewService {

	@Autowired
	private SLARepository slaestimationrepo;

	@Autowired
	private BizCaseRequestRepository bizcaseReqstRepository;

	@Autowired
	private SLAInvoiceRepository slaInvoiceRepository;

	@Autowired
	private TaskRepository taskRepository;

	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private IODumpRepository ioDumpRepository;

	@Autowired
	private JDMappingRepository jdmappingRepository;

	@Autowired
	private BizCaseSetupReportService bizcaseSetupReportService;

	@Autowired
	private MainDashboardService mainDashboardService;

	@Autowired
	private Environment env;

	DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

	public ProjectOverveiw createProjectOverview(List<SLAModel> sladataziPagesize, ProjectModel projectData,
			Page<SLAModel> sladata) {
		// TODO Auto-generated method stub

		List<BarChartReport> taskreports = new ArrayList<>();

		String red_colorcode = env.getProperty("g3c.chartreport.red");
		String green_colorcode = env.getProperty("g3c.chartreport.green");

		String darkcolur = env.getProperty("g3c.chartreport.dark");

		ProjectReportDetails projectDetails = new ProjectReportDetails();
		ProjectSlaReportDetails projectSlaReportDetails = new ProjectSlaReportDetails();

		projectDetails.setTotal_active_sla(slaestimationrepo.countsOfActiveInSla("active", projectData));
		projectDetails.setTotal_sla(sladataziPagesize.size());

		BusinessCaseRequest bizcase = bizcaseReqstRepository.findbyid(projectData.getBizcase().getId());
		projectDetails.setBusiness_case(bizcase.getSla_business_case());

		ProjectOverveiw projectOverveiw = new ProjectOverveiw();

		double bizcase_budget = 0;
		BusinessCaseRequest businessCaseRequest = bizcaseReqstRepository.findBizData(projectData.getId());

		if (businessCaseRequest.getBizcasereport() != null
				&& businessCaseRequest.getBizcasereport().getSla_total_estimation() != null) {
			bizcase_budget = businessCaseRequest.getBizcasereport().getSla_total_estimation().stream()
					.flatMap(e -> e.getProperties().stream())
					.filter(properties -> properties.getProperty_name()
							.equalsIgnoreCase("Total SLA Estimate With Markup"))
					.mapToDouble(properties -> Double.parseDouble(properties.getProperty_value())).sum();
		}
		Long totalslaamount = slaestimationrepo.getTotalslaValues(projectData.getId());
		projectSlaReportDetails.setBudget(bizcase_budget);
		projectSlaReportDetails.setSlavalue(Double.valueOf(totalslaamount));

		double delta = 0;
		delta = bizcase_budget - totalslaamount;
		projectSlaReportDetails.setDelta(delta);
		if (delta < 0)
			projectSlaReportDetails.setColor_code(red_colorcode);
		else
			projectSlaReportDetails.setColor_code(green_colorcode);

		projectDetails.setProjectSlaReportInfo(projectSlaReportDetails);

		// Active SLA, Billed & Billable hours

//		long active_sla = slaestimationrepo.countsOfActiveSlaAndProjectId(projectData.getId());
		List<BusinessCaseRequest> business_days = bizcaseReqstRepository.findBusinessDaysByProjectId(true,
				projectData.getId());
		long billable_hours = business_days.stream().flatMapToInt(property -> property.getBusiness_days().stream()
				.mapToInt(currentproperty -> currentproperty.getDays() * property.getWorking_hours())).sum();

		// Billable hours

		List<SLAModel> sla_details = slaestimationrepo.findAll();

		long working_hours1 = sla_details.stream().filter(sladetial -> Objects.nonNull(sladetial.getSla_tariffsheet()))
				.flatMapToInt(sladetial -> sladetial.getSla_tariffsheet().stream()
						.filter(traffic -> traffic.getMaterial_description().contains("Internal Manpower")
								&& traffic.getUnits().equalsIgnoreCase("Manhours"))
						.mapToInt(traffic -> Integer.parseInt(traffic.getRate())))
				.sum();

		long working_hours2 = sla_details.stream().filter(sladetial -> Objects.nonNull(sladetial.getSla_tariffsheet()))
				.flatMapToInt(sladetial -> sladetial.getSla_tariffsheet().stream()
						.filter(traffic -> traffic.getMaterial_description().contains("Internal Manpower")
								&& traffic.getUnits().equalsIgnoreCase("Mandays"))
						.mapToInt(traffic -> Integer.parseInt(traffic.getRate())
								* sladetial.getProject().getBizcase().getWorking_hours()))
				.sum();

		long billed_hours = working_hours1 + working_hours2;

		projectDetails.setBillable_hours(billable_hours);
		projectDetails.setBilled_hours(billed_hours);
		projectDetails.setSla_value(totalslaamount);

		Long invoice_raised = slaInvoiceRepository.getTotalInvoiceValuesByprojectByStatus(projectData.getId());
		Long payment_received = slaInvoiceRepository.getTotalPaymentByprojectByStatus(projectData.getId());

		projectDetails.setInvoice_raised(invoice_raised);
		projectDetails.setPayment_received(payment_received);

		List<TaskModel> tasks = taskRepository.getTasksByProjectid(projectData.getId());

		if (tasks != null) {
			long total_tasks_count = tasks.stream().count();
			long opentasks_count = tasks.stream().filter(f -> f.getTask_status().equalsIgnoreCase("open")).count();
			long inprogress_tasks_count = tasks.stream().filter(f -> f.getTask_status().equalsIgnoreCase("In Progress"))
					.count();
			long holdtasks_count = tasks.stream().filter(f -> f.getTask_status().equalsIgnoreCase("Hold")).count();
			long closedtasks_count = tasks.stream().filter(f -> f.getTask_status().equalsIgnoreCase("Closed")).count();

			BarChartReport total_taskreport = new BarChartReport();
			total_taskreport.setConversion_name("Total Tasks");
			total_taskreport.setCount(total_tasks_count);
			total_taskreport.setColour(darkcolur);

			BarChartReport open_taskreport = new BarChartReport();
			open_taskreport.setConversion_name("Open Tasks");
			open_taskreport.setCount(opentasks_count);
			open_taskreport.setColour(darkcolur);

			BarChartReport inprogress_taskreport = new BarChartReport();
			inprogress_taskreport.setConversion_name("In Progress Tasks");
			inprogress_taskreport.setCount(inprogress_tasks_count);
			inprogress_taskreport.setColour(darkcolur);

			BarChartReport hold_taskreport = new BarChartReport();
			hold_taskreport.setConversion_name("Hold Tasks");
			hold_taskreport.setCount(holdtasks_count);
			hold_taskreport.setColour(darkcolur);

			BarChartReport closed_taskreport = new BarChartReport();
			closed_taskreport.setConversion_name("Closed Tasks");
			closed_taskreport.setCount(closedtasks_count);
			closed_taskreport.setColour(darkcolur);

			taskreports.add(total_taskreport);
			taskreports.add(open_taskreport);
			taskreports.add(inprogress_taskreport);
			taskreports.add(hold_taskreport);
			taskreports.add(closed_taskreport);
			projectDetails.setTask_resport(taskreports);
		}

		String IONumber = projectRepository.findIONumberByProjectId(projectData.getId());
		double IODump = ioDumpRepository.findTotalAmountByIoNumber(IONumber);

		// get expense from accurals

		double expenseFromAccurals = mainDashboardService.getExpenseFromAccurals(Arrays.asList(projectData));

		projectDetails.setIo_expense_amount(IODump + expenseFromAccurals);

		if (projectData.getBizcase().getBizcasesetup() != null) {

			BizCaseSetupModel bizCaseSetupModel = projectData.getBizcase().getBizcasesetup();

			ProjectOverviewBizCaseSetupReport projectOverviewBizCaseSetupReport = new ProjectOverviewBizCaseSetupReport();

			projectOverviewBizCaseSetupReport.setOverall_project_status(bizCaseSetupModel.getTotal_average());
			projectOverviewBizCaseSetupReport.setManpower_precentage(bizCaseSetupModel.getHr_average());
			projectOverviewBizCaseSetupReport.setIt_infra_precentage(bizCaseSetupModel.getIt_average());
			projectOverviewBizCaseSetupReport.setFacility_precentage(bizCaseSetupModel.getFacility_average());
			projectOverviewBizCaseSetupReport.setSystem_access_precentage(bizCaseSetupModel.getSystem_access_average());
			projectOverviewBizCaseSetupReport
					.setThird_party_cost_precentage(bizCaseSetupModel.getThird_party_cost_average());
			projectOverviewBizCaseSetupReport
					.setThird_party_services_precentage(bizCaseSetupModel.getThird_party_services_average());

			projectDetails.setBizCaseSetupReport(projectOverviewBizCaseSetupReport);

		}

		// sla value getting using invoice_cyle count&total budget & getting sum of
		// pre_invoice amounts after end date+1 satisfies
		long slainvoice_count;
		long total_sla_value = 0;
		long totalsla_invoice_amount = 0;
		long preinvoice_amount = 0;

		Set<SLAModel> slaModels = projectData.getSla();
		LocalDate currentDate = LocalDate.now();
//				LocalDate nextcurrentDate =	currentDate.plusDays(1);
		int currentDate_month = currentDate.getMonthValue();

		List<Long> preinvoice_amounts = new ArrayList<>();
		for (SLAModel slaModel : slaModels) {
			long sla_value = 0;
			List<SLAcycle> slacycles = slaModel.getInvoice_cycle();
			long sla_total_budget = slaModel.getTotal_budget();

			if (slacycles != null) {
				slainvoice_count = slacycles.stream().count();
				preinvoice_amount = sla_total_budget / slainvoice_count;
			} else
				slainvoice_count = 0;

			preinvoice_amounts.add(preinvoice_amount);

			int preinvoice_add_count = 0;

			if (slacycles != null) {
				for (SLAcycle slacycle : slacycles) {
					LocalDate end_date = LocalDate.parse(slacycle.getEnd_date(), formatter);
					int end_date_month = end_date.getMonthValue();
					if (end_date_month <= currentDate_month) {
						preinvoice_add_count++;
					}
				}
			}
//			System.out.println("preinvoice_add_count : " +preinvoice_add_count);
			for (int i = 0; i < preinvoice_add_count; i++) {
				sla_value += preinvoice_amount;
			}

			total_sla_value += sla_value;

			// invoice raised calculation upto till date
//					long sla_invoice_amount = slaInvoiceRepository.getTotalInvoiceValuesBySLAByDate(slaModel.getId(),currentDate);
			long sla_invoice_amount = slaInvoiceRepository.getTotalInvoiceValuesBySLAAndStatus(slaModel.getId());
			totalsla_invoice_amount += sla_invoice_amount;
		}

		List<BarChartReport> sla_budget_invoice_payment = new ArrayList<>();
		BarChartReport budget = new BarChartReport();
		budget.setConversion_name("Budget");
		budget.setCount(bizcase_budget);
		budget.setColour(darkcolur);

		BarChartReport sla_value = new BarChartReport();
		sla_value.setConversion_name("SLA Value");
		sla_value.setCount(Double.valueOf(totalslaamount));
		sla_value.setColour(darkcolur);

		BarChartReport invoiced = new BarChartReport();
		invoiced.setConversion_name("Invoiced");
		invoiced.setCount(invoice_raised);
		invoiced.setColour(darkcolur);

		BarChartReport payment = new BarChartReport();
		payment.setConversion_name("Payment");
		payment.setCount(payment_received);
		payment.setColour(darkcolur);

		sla_budget_invoice_payment.add(budget);
		sla_budget_invoice_payment.add(sla_value);
		sla_budget_invoice_payment.add(invoiced);
		sla_budget_invoice_payment.add(payment);
		projectDetails.setSla_budget_invoice_payment(sla_budget_invoice_payment);
		projectDetails.setTotal_sla_value(total_sla_value);
		projectDetails.setTotalsla_invoice_amount(totalsla_invoice_amount);

		Double profitablity = (projectDetails.getInvoice_raised()
				- projectDetails.getIo_expense_amount() / projectDetails.getInvoice_raised()) * 100;
		projectDetails.setProject_profitablity(profitablity);

		projectOverveiw.setList_of_sla(sladata);
		projectOverveiw.setProject_details(projectDetails);
		projectOverveiw.setProject(projectData);

		return projectOverveiw;

	}

}

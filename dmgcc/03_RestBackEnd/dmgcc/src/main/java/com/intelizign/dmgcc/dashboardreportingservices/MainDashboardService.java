package com.intelizign.dmgcc.dashboardreportingservices;

import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.text.NumberFormat;
import java.text.ParseException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Objects;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import com.intelizign.dmgcc.dashboardresponce.BarChartReport;
import com.intelizign.dmgcc.dashboardresponce.MainDashboardReport;
import com.intelizign.dmgcc.dashboardresponce.PlanVsActualReport;
import com.intelizign.dmgcc.models.ProjectModel;
import com.intelizign.dmgcc.models.SLAInvoiceModel;
import com.intelizign.dmgcc.models.SLAModel;
import com.intelizign.dmgcc.models.SLAPreInvoiceModel;
import com.intelizign.dmgcc.models.businesscasemodels.BusinessCaseRequest;
import com.intelizign.dmgcc.models.othermaster.SLAAccurals;
import com.intelizign.dmgcc.repositories.BizCaseRequestRepository;
import com.intelizign.dmgcc.repositories.G3CEmployeeRepository;
import com.intelizign.dmgcc.repositories.LeadBusinessRepository;
import com.intelizign.dmgcc.repositories.LeadConversionRepository;
import com.intelizign.dmgcc.repositories.ProjectRepository;
import com.intelizign.dmgcc.repositories.SLAInvoiceRepository;
import com.intelizign.dmgcc.repositories.SLAPreInvoiceRepository;
import com.intelizign.dmgcc.repositories.SLARepository;
import com.intelizign.dmgcc.repositories.othermaster.CCDumpRepository;
import com.intelizign.dmgcc.repositories.othermaster.IODumpRepository;
import com.intelizign.dmgcc.repositories.othermaster.SLAAccuralsRepository;
import com.intelizign.dmgcc.services.othermaster.AccuralsService;

@Service
@Transactional
public class MainDashboardService {

	@Autowired
	private G3CEmployeeRepository g3cEmployeeRepository;

	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private BizCaseRequestRepository bizcasereqrepo;

	@Autowired
	private LeadConversionRepository leadConversionRepository;

	@Autowired
	private LeadBusinessRepository leadreq_repository;

	@Autowired
	private SLARepository slaRepository;

	@Autowired
	private SLAPreInvoiceRepository slaPreInvoiceRepository;

	@Autowired
	private SLAInvoiceRepository slaInvoiceRepository;

	@Autowired
	private IODumpRepository ioDumpRepository;

	@Autowired
	private CCDumpRepository ccDumpRepository;

	@Autowired
	private AccuralsService acuuralsService;

	@Autowired
	private SLAAccuralsRepository slaAccuralsRepository;

	@Autowired
	private Environment env;

	public final Logger LOGGER = LogManager.getLogger(MainDashboardService.class);

	private static final DecimalFormat df = new DecimalFormat("0.00");

	public MainDashboardReport generateMainDashboardReport(String costcenter) {

		LocalDate today_date = LocalDate.now();
		String current_year = String.valueOf(today_date.getYear());

		String light_colour = env.getProperty("g3c.chartreport.light");
		String dark_colur = env.getProperty("g3c.chartreport.dark");

		MainDashboardReport finalReport = new MainDashboardReport();

		if (costcenter.equalsIgnoreCase("all")) {
			// For All CostCenter

			// Revenue, Expense and EBIT Calculation
			List<String> IONumber = projectRepository.findIONumber(current_year);
			double IODump = ioDumpRepository.findTotalAmount(IONumber);
			double CCDump = ccDumpRepository.findTotalAmount();

			double total_revenue = slaInvoiceRepository.findInvoiceRaiseAmount();

			double total_revenue_crore = (slaInvoiceRepository.findInvoiceRaiseAmount()) / 10000000;

			// get expense from accurals

			double get_expense_from_accurals = getExpenseFromAccurals(projectRepository.findAll());

			double total_expense = IODump + CCDump + get_expense_from_accurals;

			double total_expense_crore = (IODump + CCDump) / 10000000;

			double total_ebit = total_revenue - total_expense;

			double total_ebit_crore = (total_revenue_crore - total_expense_crore);

			NumberFormat myFormatter = NumberFormat.getCurrencyInstance(new Locale("en", "IN"));

			String total_revenue_cr = df.format(total_revenue_crore) + " Cr";

			String total_expense_cr = df.format(total_expense_crore) + " Cr";

			String total_ebit_cr = df.format(total_ebit_crore) + " Cr";

			DecimalFormatSymbols decimalFormatSymbols = ((DecimalFormat) myFormatter).getDecimalFormatSymbols();

			decimalFormatSymbols.setCurrencySymbol("");

			((DecimalFormat) myFormatter).setDecimalFormatSymbols(decimalFormatSymbols);

			String total_revenue_cr_inr = myFormatter.format(total_revenue);

			String total_expense_cr_inr = myFormatter.format(total_expense);

			String total_ebit_cr_inr = myFormatter.format(total_ebit);

			DateTimeFormatter monthYearFormatter = DateTimeFormatter.ofPattern("MMM");
			List<PlanVsActualReport> revenueplanvsactual = new ArrayList<>();
			List<PlanVsActualReport> expenseplanvsactual = new ArrayList<>();
			List<PlanVsActualReport> ebitplanvsactual = new ArrayList<>();
			for (int i = 5; i >= 0; i--) {
				PlanVsActualReport currentmonthRevenue = new PlanVsActualReport();
				PlanVsActualReport currentmonthExpense = new PlanVsActualReport();
				PlanVsActualReport currentmonthebit = new PlanVsActualReport();

				LocalDate currentDate = LocalDate.now().minusMonths(i);
				String currentMonth = currentDate.format(monthYearFormatter);
				int month = currentDate.getMonthValue();
				int year = currentDate.getYear();

				double revenue_plan_amount = slaPreInvoiceRepository.findCurrentMonthRevenue(year, month);
				double revenue_acutual_amount = slaInvoiceRepository.findCurrentMonthRevenue(year, month);

				double expense_acutal_IODump = ioDumpRepository.findCurrentMonthExpense(year, month);
				double expense_acutal_CCDump = ccDumpRepository.findCurrentMonthExpense(year, month);

				double expense_actual_amount = expense_acutal_IODump + expense_acutal_CCDump;
				double expense_plan_amount = revenue_acutual_amount;

				currentmonthRevenue.setMonth(currentMonth);
				currentmonthRevenue.setActual(Math.round(revenue_acutual_amount));
				currentmonthRevenue.setPlan(Math.round(revenue_plan_amount));
				revenueplanvsactual.add(currentmonthRevenue);

				currentmonthExpense.setMonth(currentMonth);
				currentmonthExpense.setActual(Math.round(expense_actual_amount));
				currentmonthExpense.setPlan(Math.round(expense_plan_amount));
				expenseplanvsactual.add(currentmonthExpense);

//				EBIT Calculation Invoice Raise - Expense = EBIT(actual), SLA - Expense= Ebit(Plan)
				currentmonthebit.setMonth(currentMonth);
				currentmonthebit.setActual(Math.round(revenue_acutual_amount - expense_actual_amount));
				currentmonthebit.setPlan(Math.round(revenue_plan_amount - expense_plan_amount));
				ebitplanvsactual.add(currentmonthebit);
			}

			// Manpower Utilization Calculation
			List<BarChartReport> employee_capacity_report = new ArrayList<>();

			double allocated_capacity_avaerge = g3cEmployeeRepository.findEmpokyeeAvergae();
			double available_capacity_avaerge = 100 - allocated_capacity_avaerge;

			BarChartReport allocate_chart = new BarChartReport("Allocated Capacity",
					Math.round(allocated_capacity_avaerge), light_colour);
			BarChartReport available_chart = new BarChartReport("Available Capacity",
					Math.round(available_capacity_avaerge), dark_colur);
			employee_capacity_report.add(available_chart);
			employee_capacity_report.add(allocate_chart);

			// Invoice Status Calculation
			List<BarChartReport> invoice_report = new ArrayList<>();

			double invoiced_count = slaInvoiceRepository.findInvoicedCount();
			double pending_invoice_count = slaInvoiceRepository.findPendingInvoiceCount();

			BarChartReport invoiced_count_chart = new BarChartReport("Invoiced", invoiced_count, light_colour);
			BarChartReport pending_count_chart = new BarChartReport("Pending", pending_invoice_count, dark_colur);
			invoice_report.add(invoiced_count_chart);
			invoice_report.add(pending_count_chart);

			// Active SLA, Billed & Billable hours

			long active_sla = slaRepository.findActiveSLA();

			List<BusinessCaseRequest> business_days = bizcasereqrepo.findBusinessDays(true);
			long billable_hours = business_days.stream()
					.flatMapToInt(property -> property.getBusiness_days().stream()
							.mapToInt(currentproperty -> currentproperty.getDays() * property.getWorking_hours()))
					.sum();

			// Billable hours

			List<SLAModel> sla_details = slaRepository.findAll();

			long working_hours1 = sla_details.stream()
					.filter(sladetial -> Objects.nonNull(sladetial.getSla_tariffsheet()))
					.flatMapToInt(sladetial -> sladetial.getSla_tariffsheet().stream()
							.filter(traffic -> traffic.getMaterial_description().contains("Internal Manpower")
									&& traffic.getUnits().equalsIgnoreCase("Manhours"))
							.mapToInt(traffic -> Integer.parseInt(traffic.getRate())))
					.sum();

			long working_hours2 = sla_details.stream()
					.filter(sladetial -> Objects.nonNull(sladetial.getSla_tariffsheet()))
					.flatMapToInt(sladetial -> sladetial.getSla_tariffsheet().stream()
							.filter(traffic -> traffic.getMaterial_description().contains("Internal Manpower")
									&& traffic.getUnits().equalsIgnoreCase("Mandays"))
							.mapToInt(traffic -> Integer.parseInt(traffic.getRate())
									* sladetial.getProject().getBizcase().getWorking_hours()))
					.sum();

			long billed_hours = working_hours1 + working_hours2;

			// Leads, Biz Req, Biz Case Count Report
			long total_lead = leadreq_repository.count();
			long total_biz_req = bizcasereqrepo.count();
			long total_biz_case = bizcasereqrepo.findPLReport();

			// Lead Conversion Report

			double lead_conversion = leadConversionRepository.findLeadConversion("IL0 - IL1");
			double biz_req_conversion = leadConversionRepository.findLeadConversion("IL1 - IL2");
			double biz_approval_conversion = leadConversionRepository.findLeadConversion("IL2 - IL3");

			finalReport.setRevenue_count(total_revenue_cr);
			finalReport.setRevenue_count_inr(total_revenue_cr_inr);
			finalReport.setRevenue_report(revenueplanvsactual);
			finalReport.setExpense_count(total_expense_cr);
			finalReport.setExpense_count_inr(total_expense_cr_inr);
			finalReport.setExpense_report(expenseplanvsactual);
			finalReport.setEbit_count(total_ebit_cr);
			finalReport.setEbit_count_inr(total_ebit_cr_inr);
			finalReport.setEbit_report(ebitplanvsactual);
			finalReport.setManpower_utilization(employee_capacity_report);
			finalReport.setInvoice_status(invoice_report);
			finalReport.setActive_sla_count(active_sla);
			finalReport.setBillable_hours(billable_hours);
			finalReport.setBilled(billed_hours);
			finalReport.setLeads_count(total_lead);
			finalReport.setBiz_req_count(total_biz_req);
			finalReport.setBiz_case_count(total_biz_case);
			finalReport.setLeads_conversion_average(Math.round(lead_conversion));
			finalReport.setBiz_req_conversion_average(Math.round(biz_req_conversion));
			finalReport.setApproval_conversion_average(Math.round(biz_approval_conversion));

		} else {

			// For Particular CostCenter

			List<ProjectModel> isprojectavailable = projectRepository.checkProjectIsAvailable(costcenter);
			if (isprojectavailable.isEmpty()) {
				return null;
			}

			// Revenue, Expense and EBIT Calculation
			List<String> IONumber = projectRepository.findIONumberCostCenter(costcenter, current_year);
			double IODump = ioDumpRepository.findTotalAmountCostCenter(IONumber, costcenter);
			double CCDump = ccDumpRepository.findTotalAmountCostCenter(costcenter);

			List<SLAInvoiceModel> slaInvoiceDetails = slaInvoiceRepository.findAll();
			double total_revenue = (slaInvoiceDetails.stream().flatMapToDouble(slainvoice -> slainvoice.getSla()
					.getRevenue_cost_center().stream().filter(sla -> sla.getCost_center().equals(costcenter))
					.mapToDouble(slarevnue -> (slarevnue.getAllocate_percentage() / 100 * slainvoice.getTotal_cost())))
					.sum());

			// get expense from accurals

			double get_expense_from_accurals = getExpenseFromAccurals(isprojectavailable);

			double total_expense = (IODump + CCDump + get_expense_from_accurals);

			double total_ebit = total_revenue - total_expense;

			double total_revenue_crore = (slaInvoiceRepository.findInvoiceRaiseAmount()) / 10000000;
			double total_expense_crore = (IODump + CCDump) / 10000000;
			double total_ebit_crore = total_revenue_crore - total_expense_crore;

			NumberFormat myFormatter = NumberFormat.getCurrencyInstance(new Locale("en", "IN"));

			String total_revenue_cr = df.format(total_revenue_crore) + " Cr";

			String total_expense_cr = df.format(total_expense_crore) + " Cr";

			String total_ebit_cr = df.format(total_ebit_crore) + " Cr";

			DecimalFormatSymbols decimalFormatSymbols = ((DecimalFormat) myFormatter).getDecimalFormatSymbols();

			decimalFormatSymbols.setCurrencySymbol("");

			((DecimalFormat) myFormatter).setDecimalFormatSymbols(decimalFormatSymbols);

			String total_revenue_cr_inr = myFormatter.format(total_revenue);

			String total_expense_cr_inr = myFormatter.format(total_expense);

			String total_ebit_cr_inr = myFormatter.format(total_ebit);

			DateTimeFormatter monthYearFormatter = DateTimeFormatter.ofPattern("MMM");
			List<PlanVsActualReport> revenueplanvsactual = new ArrayList<>();
			List<PlanVsActualReport> expenseplanvsactual = new ArrayList<>();
			List<PlanVsActualReport> ebitplanvsactual = new ArrayList<>();
			for (int i = 5; i >= 0; i--) {
				PlanVsActualReport currentmonthRevenue = new PlanVsActualReport();
				PlanVsActualReport currentmonthExpense = new PlanVsActualReport();
				PlanVsActualReport currentmonthebit = new PlanVsActualReport();

				LocalDate currentDate = LocalDate.now().minusMonths(i);
				String currentMonth = currentDate.format(monthYearFormatter);
				int month = currentDate.getMonthValue();
				int year = currentDate.getYear();

				List<SLAPreInvoiceModel> revenue_plan_amount_list = slaPreInvoiceRepository
						.findCurrentMonthRevenueCostCenter(year, month);

				double revenue_plan_amount = revenue_plan_amount_list.stream()
						.flatMapToDouble(slapreinvoice -> slapreinvoice.getSla().getRevenue_cost_center().stream()
								.filter(sla -> sla.getCost_center().equals(costcenter))
								.mapToDouble(slarevnue -> (slarevnue.getAllocate_percentage() / 100
										* slapreinvoice.getTotal_budget())))
						.sum();

				List<SLAInvoiceModel> revenue_acutual_amount_list = slaInvoiceRepository
						.findCurrentMonthRevenueCostCenter(year, month);

				double revenue_acutual_amount = revenue_acutual_amount_list.stream()
						.flatMapToDouble(slainvoice -> slainvoice.getSla().getRevenue_cost_center().stream()
								.filter(sla -> sla.getCost_center().equals(costcenter))
								.mapToDouble(slarevnue -> (slarevnue.getAllocate_percentage() / 100
										* slainvoice.getTotal_cost())))
						.sum();

				double expense_acutal_IODump = ioDumpRepository.findCurrentMonthExpenseCostCenter(year, month,
						costcenter);
				double expense_acutal_CCDump = ccDumpRepository.findCurrentMonthExpenseCostCenter(year, month,
						costcenter);

				double expense_actual_amount = expense_acutal_IODump + expense_acutal_CCDump;
				double expense_plan_amount = revenue_acutual_amount;

				currentmonthRevenue.setMonth(currentMonth);
				currentmonthRevenue.setActual(Math.round(revenue_acutual_amount));
				currentmonthRevenue.setPlan(Math.round(revenue_plan_amount));
				revenueplanvsactual.add(currentmonthRevenue);

				currentmonthExpense.setMonth(currentMonth);
				currentmonthExpense.setActual(Math.round(expense_actual_amount));
				currentmonthExpense.setPlan(Math.round(expense_plan_amount));
				expenseplanvsactual.add(currentmonthExpense);

//				EBIT Calculation Invoice Raise - Expense = EBIT(actual), SLA - Expense= Ebit(Plan)
				currentmonthebit.setMonth(currentMonth);
				currentmonthebit.setActual(Math.round(revenue_acutual_amount - expense_actual_amount));
				currentmonthebit.setPlan(Math.round(revenue_plan_amount - expense_plan_amount));
				ebitplanvsactual.add(currentmonthebit);
			}

			// Manpower Utilization Calculation
			List<BarChartReport> employee_capacity_report = new ArrayList<>();

			double allocated_capacity_avaerge = g3cEmployeeRepository.findEmpokyeeAverageCostCenter(costcenter);
			double available_capacity_avaerge = 100 - allocated_capacity_avaerge;

			BarChartReport allocate_chart = new BarChartReport("Allocated Capacity",
					Math.round(allocated_capacity_avaerge), light_colour);
			BarChartReport available_chart = new BarChartReport("Available Capacity",
					Math.round(available_capacity_avaerge), dark_colur);
			employee_capacity_report.add(available_chart);
			employee_capacity_report.add(allocate_chart);

			// Invoice Status Calculation
			List<BarChartReport> invoice_report = new ArrayList<>();

			double invoiced_count = slaInvoiceDetails.stream()
					.flatMap(slainvoice -> slainvoice.getSla().getRevenue_cost_center().stream()
							.filter(sla -> sla.getCost_center().equals(costcenter)
									&& slainvoice.getStatus().equalsIgnoreCase("Invoiced")))
					.count();

			double pending_invoice_count = slaInvoiceDetails.size() - invoiced_count;

			BarChartReport invoiced_count_chart = new BarChartReport("Invoiced", invoiced_count, light_colour);
			BarChartReport pending_count_chart = new BarChartReport("Pending", pending_invoice_count, dark_colur);
			invoice_report.add(invoiced_count_chart);
			invoice_report.add(pending_count_chart);

			// Active SLA, Billed & Billable hours

			List<SLAModel> active_sla_list = slaRepository.findAllActive();

			long active_sla = active_sla_list.stream().flatMap(sla -> sla.getRevenue_cost_center().stream()
					.filter(revenue -> revenue.getCost_center().equals(costcenter))).count();

			List<BusinessCaseRequest> business_days = bizcasereqrepo.findBusinessDaysCostCenter(true, costcenter);
			long billable_hours = business_days.stream()
					.flatMapToInt(property -> property.getBusiness_days().stream()
							.mapToInt(currentproperty -> currentproperty.getDays() * property.getWorking_hours()))
					.sum();

			// Billable hours

			List<SLAModel> sla_details_all = slaRepository.findAll();

			List<SLAModel> cost_centersla_details = sla_details_all.stream()
					.filter(sla_info -> sla_info.getRevenue_cost_center().stream()
							.anyMatch(revenue_costcenter -> revenue_costcenter.getCost_center().equals(costcenter)))
					.collect(Collectors.toList());

			long working_hours1 = cost_centersla_details.stream()
					.filter(sladetial -> Objects.nonNull(sladetial.getSla_tariffsheet()))
					.flatMapToInt(sla_info -> sla_info.getSla_tariffsheet().stream()
							.filter(traffic -> traffic.getMaterial_description().contains("Internal Manpower")
									&& traffic.getUnits().equalsIgnoreCase("Manhours"))
							.mapToInt(traffic -> Integer.parseInt(traffic.getRate())))
					.sum();

			long working_hours2 = cost_centersla_details.stream()
					.filter(sladetial -> Objects.nonNull(sladetial.getSla_tariffsheet()))
					.flatMapToInt(sladetial -> sladetial.getSla_tariffsheet().stream()
							.filter(traffic -> traffic.getMaterial_description().contains("Internal Manpower")
									&& traffic.getUnits().equalsIgnoreCase("Mandays"))
							.mapToInt(traffic -> Integer.parseInt(traffic.getRate())
									* sladetial.getProject().getBizcase().getWorking_hours()))
					.sum();

			long billed_hours = working_hours1 + working_hours2;

			// Leads, Biz Req, Biz Case Count Report

			long total_lead = leadreq_repository.findLeadCostCenter(costcenter);
			long total_biz_req = bizcasereqrepo.findBizCaseCostCenter(costcenter);
			long total_biz_case = bizcasereqrepo.findPLReportCostCenter(costcenter);

			// Lead Conversion Report

			double lead_conversion = leadConversionRepository.findLeadConversionCostCenter("IL0 - IL1", costcenter);
			double biz_req_conversion = leadConversionRepository.findLeadConversionCostCenter("IL1 - IL2", costcenter);
			double biz_approval_conversion = leadConversionRepository.findLeadConversionCostCenter("IL2 - IL3",
					costcenter);

			finalReport.setRevenue_count(total_revenue_cr);
			finalReport.setRevenue_count_inr(total_revenue_cr_inr);
			finalReport.setRevenue_report(revenueplanvsactual);
			finalReport.setExpense_count(total_expense_cr);
			finalReport.setExpense_count_inr(total_expense_cr_inr);
			finalReport.setExpense_report(expenseplanvsactual);
			finalReport.setEbit_count(total_ebit_cr);
			finalReport.setEbit_count_inr(total_ebit_cr_inr);
			finalReport.setEbit_report(ebitplanvsactual);
			finalReport.setManpower_utilization(employee_capacity_report);
			finalReport.setInvoice_status(invoice_report);
			finalReport.setActive_sla_count(active_sla);
			finalReport.setBillable_hours(billable_hours);
			finalReport.setBilled(billed_hours);
			finalReport.setLeads_count(total_lead);
			finalReport.setBiz_req_count(total_biz_req);
			finalReport.setBiz_case_count(total_biz_case);
			finalReport.setLeads_conversion_average(Math.round(lead_conversion));
			finalReport.setBiz_req_conversion_average(Math.round(biz_req_conversion));
			finalReport.setApproval_conversion_average(Math.round(biz_approval_conversion));
		}
		return finalReport;
	}

	public double getExpenseFromAccurals(List<ProjectModel> projectsByCostcenter) {

		// sla and months to get non invoiced total from accurals
		HashMap<Long, List<String>> monthsAndSLA = new HashMap<Long, List<String>>();

		// get sla and months for expenses

		projectsByCostcenter.stream().forEach(project -> {

			// get sla's by project
			List<SLAModel> slaByProject = slaRepository.findByProject(project.getId());

			// get preinvoice for pending invoices
			slaByProject.stream().forEach(sla -> {
				List<SLAPreInvoiceModel> preInvoicesBySLA = slaPreInvoiceRepository.findBySlaID(sla.getId()).stream()
						.filter(preInvoice -> preInvoice.getActive().equals(true)
								&& preInvoice.getIs_invoiced().equals(false))
						.collect(Collectors.toList());

				// next preincoice if the preinvoice is not created
				if (preInvoicesBySLA.isEmpty()) {
					Integer max_cycle = slaPreInvoiceRepository.findMaxCylceByActiveSla(sla.getId());
					SLAPreInvoiceModel sla_preinvoice = new SLAPreInvoiceModel();
					if (max_cycle == null) {
						sla_preinvoice = slaPreInvoiceRepository.findPreinvoiceByCycle(1, sla.getId());
					} else {
						sla_preinvoice = slaPreInvoiceRepository.findPreinvoiceByCycle(max_cycle + 1, sla.getId());
						if (sla_preinvoice == null)
							sla_preinvoice = slaPreInvoiceRepository.findPreinvoiceByCycle(max_cycle, sla.getId());
					}
					if (sla_preinvoice != null)
						preInvoicesBySLA.add(sla_preinvoice);
				}

				List<String> months = new ArrayList<>();

				if (!preInvoicesBySLA.isEmpty()) {
					preInvoicesBySLA.stream().forEach(preInvoice -> {
						try {
							months.addAll(acuuralsService.getMonthsByDates(preInvoice.getStart_date(),
									preInvoice.getEnd_date(), false));
						} catch (ParseException e) {
							e.printStackTrace();
						}
					});

					// set months and sla
					monthsAndSLA.put(sla.getId(), months);
				}

			});
		});

		// get total expense from accural for non invoiced pre-invoices

		AtomicReference<Double> totalExpenseFromAccurals = new AtomicReference(Double.valueOf(0.0));

		monthsAndSLA.forEach((slaid, months) -> {
			SLAAccurals accuralBySLA = slaAccuralsRepository.FindBySLA(slaid);
			if (accuralBySLA != null) {
				months.stream().forEach(month -> {
					accuralBySLA.getAccurals_tarriff_data().stream().forEach(tarrif -> {
						if (tarrif.getTarrif_name().equals("Total")) {
							tarrif.getMonthly_datas().stream().forEach(tarrifMonth -> {
								if (tarrifMonth.getMonth().equals(month)) {
									double last_totalExpenseFromAccurals = totalExpenseFromAccurals.get();
									totalExpenseFromAccurals.set(
											last_totalExpenseFromAccurals + Double.valueOf(tarrifMonth.getValue()));

								}
							});
						}
					});
				});

			}

		});

		return totalExpenseFromAccurals.get();
	}

}

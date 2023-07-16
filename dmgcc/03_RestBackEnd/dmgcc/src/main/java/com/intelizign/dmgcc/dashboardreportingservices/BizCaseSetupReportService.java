package com.intelizign.dmgcc.dashboardreportingservices;

import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import com.intelizign.dmgcc.dashboardresponce.BarChartReport;
import com.intelizign.dmgcc.dashboardresponce.BizCaseSetupReport;
import com.intelizign.dmgcc.dashboardresponce.BizCaseSetupReport.ProjectSetupPlanVsActual;
import com.intelizign.dmgcc.dashboardresponce.BizCaseSetupReport.RecruitmentStatus;
import com.intelizign.dmgcc.dashboardresponce.PlanVsActualReport;
import com.intelizign.dmgcc.models.JDMappingModel;
import com.intelizign.dmgcc.models.businesscasemodels.BizCaseSetupModel;
import com.intelizign.dmgcc.pojoclass.bizcase.BizCaseSetupITAndFac;
import com.intelizign.dmgcc.request.bizcase.SubModel;
import com.intelizign.dmgcc.response.JDHiredResponse;

@Service
public class BizCaseSetupReportService {

	@Autowired
	private Environment env;

	private static final DecimalFormat doubleFormat = new DecimalFormat("0.00");

	public BizCaseSetupReport getDashboardReport(BizCaseSetupReport bizcaseSetupReport,
			List<JDMappingModel> manpowerData, BizCaseSetupModel bizcasesetup, String report_type) {
		BizCaseSetupReport bizcase_setup_report = new BizCaseSetupReport();

		// set all average values from bizcase setup model to bizcase setup report
		setBizcaseAverageReport(bizcase_setup_report, bizcasesetup);

		// get months from bizcase start date to current date
		List<String> months_till_now = getMonthsDetails(bizcasesetup.getBizcase().getBusiness_case_start_date());

		// get months past eight months
		List<String> past_eight_months = getMonthsDetails(LocalDate.now().minusMonths(7));

		// get all plan and actual for month wise
		List<PlanVsActualReport> over_manpower_report = getOverallReportTillNow(manpowerData, months_till_now);

		// filter plan and actual for past eight month from over all report
		List<PlanVsActualReport> past_eight_month__report = getPastEightMonthsReport(over_manpower_report,
				past_eight_months);

		// planVsActual backlog
		AtomicLong backlog = new AtomicLong();

		// generate plan vs actual from overall report
		List<BarChartReport> planVsacutal_report = getOverAllPlanVsActualGraphReport(over_manpower_report, backlog);
		bizcase_setup_report.setPlan_acutal_report(planVsacutal_report);
		bizcase_setup_report.setPlan_acutal_backlog(backlog.get());

		// MTD plan vs actual for past eight months
		List<PlanVsActualReport> mtd_past_eight_month__report = getMTDPlanVsActualLineGraphReport(
				past_eight_month__report);
		bizcase_setup_report.setMtd_plan_actual_report(mtd_past_eight_month__report);

		// recruitment status
		RecruitmentStatus recuritment_status = getRecruitmentStatus(manpowerData);
		bizcase_setup_report.setRecruitment_status(recuritment_status);

		// get IT plan vs actual report
		List<PlanVsActualReport> it_plan_actual_report = getITPlanVsActualReport(bizcasesetup.getIt_info(),
				bizcasesetup.getIt_data(), report_type);
		bizcase_setup_report.setIt_plan_actual_report(it_plan_actual_report);

		// get System Access plan vs actual report
		List<PlanVsActualReport> system_access_actual_report = getITPlanVsActualReport(
				bizcasesetup.getSystem_access_info(), bizcasesetup.getSystem_access_data(), report_type);
		bizcase_setup_report.setSystem_access_plan_actual_report(system_access_actual_report);

		// get Facilty plan vs actual report
		List<PlanVsActualReport> facility_actual_report = getITPlanVsActualReport(bizcasesetup.getFacility_info(),
				bizcasesetup.getFacility_data(), report_type);
		bizcase_setup_report.setFacility_plan_actual_report(facility_actual_report);

		// get 3rd Party Cost plan vs actual report
		List<PlanVsActualReport> third_part_cost_actual_report = getITPlanVsActualReport(
				bizcasesetup.getThird_party_cost_info(), bizcasesetup.getThird_party_cost_data(), report_type);
		bizcase_setup_report.setThird_party_cost_plan_actual_report(third_part_cost_actual_report);

		// get 3rd Party Cost plan vs actual report
		List<PlanVsActualReport> third_part_services_actual_report = getITPlanVsActualReport(
				bizcasesetup.getThird_party_services_info(), bizcasesetup.getThird_party_services_data(), report_type);
		bizcase_setup_report.setThird_party_services_plan_actual_report(third_part_services_actual_report);

		// get project setup plan vs actual
		ProjectSetupPlanVsActual project_setup_planVsactual = getProjectSetupPlanVsActual(bizcasesetup);
		bizcase_setup_report.setProject_setup_plan_actual_report(project_setup_planVsactual);

		return bizcase_setup_report;
	}

	private void setBizcaseAverageReport(BizCaseSetupReport bizcase_setup_report, BizCaseSetupModel bizcasesetup) {
		bizcase_setup_report.setOverall_project_status(bizcasesetup.getTotal_average());
		bizcase_setup_report.setManpower_precentage(bizcasesetup.getHr_average());
		bizcase_setup_report.setIt_infra_precentage(bizcasesetup.getIt_average());
		bizcase_setup_report.setFacility_precentage(bizcasesetup.getFacility_average());
		bizcase_setup_report.setSystem_access_precentage(bizcasesetup.getSystem_access_average());
		bizcase_setup_report.setThird_party_cost_precentage(bizcasesetup.getThird_party_cost_average());
		bizcase_setup_report.setThird_party_services_precentage(bizcasesetup.getThird_party_services_average());
	}

	public List<String> getMonthsDetails(LocalDate start_date) {
		DateTimeFormatter month_formatter = DateTimeFormatter.ofPattern("MMM");
		DateTimeFormatter month_and_year_formatter = DateTimeFormatter.ofPattern("MMMMYYYY");
		List<String> months_till_now = new ArrayList<>();
		LocalDate initail_date = start_date;
		while (true) {
			months_till_now.add(month_formatter.format(initail_date) + "-" + initail_date.getYear());
			if (month_and_year_formatter.format(initail_date)
					.equals(month_and_year_formatter.format(LocalDate.now()))) {
				break;
			}
			initail_date = initail_date.plusMonths(1);

		}

		return months_till_now;
	}

	private List<PlanVsActualReport> getOverallReportTillNow(List<JDMappingModel> manpowerData,
			List<String> months_till_now) {
		List<PlanVsActualReport> overall_report_for_manpower = new ArrayList<>();
		months_till_now.stream().forEach(gentared_month -> {
			Long plan = 0l;
			Long actual = 0l;
			for (JDMappingModel jdData : manpowerData) {
				if (jdData.getMonthandyear().equals(gentared_month)) {
					plan += Long.valueOf(jdData.getQuantity());
					for (JDHiredResponse hired_detail : jdData.getHired_details()) {
						if (hired_detail.getStatus().equals("Onboard")) {
							actual++;
						}
					}
				}
			}
			PlanVsActualReport planVsactual = new PlanVsActualReport();
			planVsactual.setMonth(gentared_month);
			planVsactual.setPlan(Double.valueOf(plan));
			planVsactual.setActual(Double.valueOf(actual));
			overall_report_for_manpower.add(planVsactual);
		});
		return overall_report_for_manpower;
	}

	private List<PlanVsActualReport> getPastEightMonthsReport(List<PlanVsActualReport> over_manpower_report,
			List<String> past_eight_months) {
		List<PlanVsActualReport> past_eight_month_reports = new ArrayList<>();
		past_eight_month_reports = over_manpower_report.stream()
				.filter(report_month -> past_eight_months.stream()
						.anyMatch(generated_month -> report_month.getMonth().equals(generated_month)))
				.collect(Collectors.toList());
		return past_eight_month_reports;
	}

	private List<BarChartReport> getOverAllPlanVsActualGraphReport(List<PlanVsActualReport> over_manpower_report,
			AtomicLong backlog) {
		List<BarChartReport> planVsacutal_report = new ArrayList<>();
		Long plan = 0l;
		Long actual = 0l;
		for (PlanVsActualReport planVsactual : over_manpower_report) {
			plan += Math.round(planVsactual.getPlan());
			actual += Math.round(planVsactual.getActual());
		}
		backlog.set(plan - actual);
		// colour code is pending
		BarChartReport planDetails = BarChartReport.builder().conversion_name("Plan").count(Double.valueOf(plan))
				.colour(env.getProperty("g3c.chartreport.dark")).build();
		planVsacutal_report.add(planDetails);

		BarChartReport actualDetails = BarChartReport.builder().conversion_name("Actual").count(Double.valueOf(actual))
				.colour(env.getProperty("g3c.chartreport.light")).build();
		planVsacutal_report.add(actualDetails);

		return planVsacutal_report;
	}

	private List<PlanVsActualReport> getMTDPlanVsActualLineGraphReport(
			List<PlanVsActualReport> past_eight_month__report) {
		List<PlanVsActualReport> mtd_planVsacutal_report = new ArrayList<>();
		Long cumulative_plan = 0l;
		Long cumulative_actual = 0l;
		for (PlanVsActualReport planVsactual : past_eight_month__report) {
			cumulative_plan += Math.round(planVsactual.getPlan());
			cumulative_actual += Math.round(planVsactual.getActual());
			planVsactual.setActual(cumulative_actual);
			planVsactual.setPlan(cumulative_plan);
			mtd_planVsacutal_report.add(planVsactual);
		}
		return mtd_planVsacutal_report;
	}

	private RecruitmentStatus getRecruitmentStatus(List<JDMappingModel> manpowerData) {
		RecruitmentStatus recruitment = new BizCaseSetupReport().new RecruitmentStatus();
		manpowerData.stream().forEach(mpdata -> {
			mpdata.getHired_details().stream().forEach(hireddetail -> {
				switch (hireddetail.getStatus()) {
				case "Sourcing":
					Long sourcing = recruitment.getSourcing();
					sourcing++;
					recruitment.setSourcing(sourcing);
					break;
				case "Shortlisted":
					Long shortlisted = recruitment.getShortlisted();
					shortlisted++;
					recruitment.setShortlisted(shortlisted);
					break;
				case "Interview":
					Long interveiw = recruitment.getInterview();
					interveiw++;
					recruitment.setInterview(interveiw);
					break;
				case "Offer Accepted":
					Long offer_accepted = recruitment.getOffer_accepted();
					offer_accepted++;
					recruitment.setOffer_accepted(offer_accepted);
					break;
				case "LOI":
					Long loi = recruitment.getLoi();
					loi++;
					recruitment.setLoi(loi);
					break;
				case "Onboard":
					Long onboard = recruitment.getOnboard();
					onboard++;
					recruitment.setOnboard(onboard);
					break;
				}
			});
		});
		return recruitment;
	}

	private List<PlanVsActualReport> getITPlanVsActualReport(List<SubModel> plan_info,
			List<BizCaseSetupITAndFac> actual_data, String report_type) {
		List<PlanVsActualReport> plan_actual_report = new ArrayList<>();
		List<String> descriptions = new ArrayList<>();
		if (plan_info != null && actual_data != null) {
			// get all decriptions from plan
			plan_info.stream().forEach(desc -> descriptions.add(desc.getDescription()));

			// get unique description from plan
			List<String> unique_descriptions = descriptions.stream().distinct().collect(Collectors.toList());

			unique_descriptions.stream().forEach(desc -> {
				Long total_plan = 0l;
				Long total_actual = 0l;
				if (plan_info != null) {
					for (SubModel plan : plan_info) {
						if (plan.getDescription().equals(desc)) {
							if (report_type.equalsIgnoreCase("Quantity"))
								if (!plan.getQuantity().isEmpty())
									total_plan += Long.valueOf(plan.getQuantity());
								else
									total_plan += 0;
							else if (report_type.equalsIgnoreCase("Cost"))
								total_plan += Long.valueOf(plan.getCost());
						}
					}
				}
				if (actual_data != null) {
					for (BizCaseSetupITAndFac actual : actual_data) {
						if (actual.getDescription().equals(desc)) {
							if (report_type.equalsIgnoreCase("Quantity"))
								total_actual += actual.getQuantity();
							else if (report_type.equalsIgnoreCase("Cost"))
								total_actual += actual.getCost();
						}
					}
				}
				PlanVsActualReport planVsActual = PlanVsActualReport.builder().plan(total_plan).actual(total_actual)
						.month(desc).build();
				plan_actual_report.add(planVsActual);
			});
		}
		return plan_actual_report;
	}

	private ProjectSetupPlanVsActual getProjectSetupPlanVsActual(BizCaseSetupModel bizcasesetup) {
		Long estimated_days = ChronoUnit.DAYS.between(bizcasesetup.getBizcase().getBusiness_case_start_date(),
				bizcasesetup.getBizcase().getBusiness_case_end_date());
		Long completed_days = 0l;
		LocalDate assumed_end_date = bizcasesetup.getManpower_hiring_completed_date();
		if (assumed_end_date == null) {
			assumed_end_date = LocalDate.now();
		}
		completed_days = ChronoUnit.DAYS.between(bizcasesetup.getBizcase().getBusiness_case_start_date(),
				assumed_end_date);
		ProjectSetupPlanVsActual planVsactual = new BizCaseSetupReport().new ProjectSetupPlanVsActual();
		planVsactual.setEstimated_days(estimated_days);
		planVsactual.setCompleted_days(completed_days);
		if (completed_days > estimated_days)
			planVsactual.setColour(env.getProperty("g3c.chartreport.red"));
		else
			planVsactual.setColour(env.getProperty("g3c.chartreport.green"));

		return planVsactual;
	}

}

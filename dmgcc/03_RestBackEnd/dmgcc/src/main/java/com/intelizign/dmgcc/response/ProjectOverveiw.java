package com.intelizign.dmgcc.response;

import java.util.List;

import org.springframework.data.domain.Page;

import com.intelizign.dmgcc.dashboardresponce.BarChartReport;
import com.intelizign.dmgcc.models.ProjectModel;
import com.intelizign.dmgcc.models.SLAModel;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProjectOverveiw {

	private ProjectReportDetails project_details;

	private Page<SLAModel> list_of_sla;

	private ProjectModel project;

	@Setter
	@Getter
	@AllArgsConstructor
	@NoArgsConstructor
	public static class ProjectReportDetails {

		private int total_active_sla;

		private int total_sla;

		private boolean business_case;

		private List<BarChartReport> sla_budget_invoice_payment;

		private ProjectSlaReportDetails projectSlaReportInfo;

		private List<BarChartReport> task_resport;

		private Long billable_hours;

		private Long billed_hours;

		private Long sla_value;

		private Long invoice_raised;

		private Long payment_received;

		private Double io_expense_amount;

		private String biz_case_setup;

		private ProjectOverviewBizCaseSetupReport bizCaseSetupReport;

		private Long total_sla_value;

		private Long totalsla_invoice_amount;

		private Double project_profitablity;

	}

	@Setter
	@Getter
	@AllArgsConstructor
	@NoArgsConstructor
	public static class ProjectSlaReportDetails {

		private Double budget;

		private Double slavalue;

		private Double delta;

		private String color_code;
	}

	@Setter
	@Getter
	@AllArgsConstructor
	@NoArgsConstructor
	public static class ProjectOverviewBizCaseSetupReport {

		private double overall_project_status;

		private double manpower_precentage;

		private double it_infra_precentage;

		private double facility_precentage;

		private double system_access_precentage;

		private double third_party_services_precentage;

		private double third_party_cost_precentage;
	}

}

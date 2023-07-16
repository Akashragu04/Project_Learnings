package com.intelizign.dmgcc.pojoclass.bizcase;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

import com.intelizign.dmgcc.pojoclass.BizCaseProfitLossChart;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BizCaseReport implements Serializable {

	private String project_name;

	private LocalDate business_case_start_date;

	private LocalDate business_case_end_date;

	private List<String> bizcase_yearly_information;

	private List<BizCaseReportCostInfo> cost_info;

	private List<BizCaseReportRevenueInfo> revenue_info;

	private List<BizCaseOtherServiceCalcInfo> manpower_cost_info;

	private List<BizCaseOtherServiceCalcInfo> copex_non_manpower_cost_info;

	private List<BizCaseOtherServiceCalcInfo> opex_non_manpower_cost_info;

	private List<BizCaseOtherServiceCalcInfo> other_cost_info;

	private List<BizCaseOtherServiceCalcInfo> transition_cost;

	private List<BizCaseSLAPayout> sla_payout_cost;

	private List<BizCaseOtherServiceCalcInfo> copex_sla_non_manpower_cost;

	private List<BizCaseOtherServiceCalcInfo> opex_sla_non_manpower_cost;

	private List<BizCaseOtherServiceCalcInfo> sla_total_estimation;

	private Double markup_value;

	private Double fx_risk;

	private Double wht_value;

	private BizCaseProfitLossChart graphReports;

	@Getter
	@Setter
	@NoArgsConstructor
	@AllArgsConstructor
	public static class GraphReport implements Serializable {

		private String name;

		private List<Double> value;

		private Double label;

		private Double total_revenue;

		private Double markup;

	}

}

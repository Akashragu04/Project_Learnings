package com.intelizign.dmgcc.pojoclass.bizcase;

import java.io.Serializable;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BizCaseReportRevenueInfo implements Serializable {

	private String year;

	private Integer billable_hours;

	private Double rate_card;

	private Integer other_costs;

	private Double markup;

	private Double inflaction;

	private Double sla_payout_cost;

	private Double net_profit_value;

	private Double ros;

	private Double customer_expense_cost;

	private Double customer_expense_saving;

	private Double fx_rist_cost;

	private Double wht_cost;

}

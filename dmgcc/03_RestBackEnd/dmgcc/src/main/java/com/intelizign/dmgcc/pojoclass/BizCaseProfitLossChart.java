package com.intelizign.dmgcc.pojoclass;

import java.io.Serializable;
import java.util.List;

import com.intelizign.dmgcc.pojoclass.bizcase.BizCaseReport.GraphReport;

public class BizCaseProfitLossChart implements Serializable {

	private String profit;
	private String profitability;
	private List<GraphReport> cost;
	private List<GraphReport> total_revenue;

	public String getProfit() {
		return profit;
	}

	public void setProfit(String profit) {
		this.profit = profit;
	}

	public String getProfitability() {
		return profitability;
	}

	public void setProfitability(String profitability) {
		this.profitability = profitability;
	}

	public List<GraphReport> getCost() {
		return cost;
	}

	public void setCost(List<GraphReport> cost) {
		this.cost = cost;
	}

	public List<GraphReport> getTotal_revenue() {
		return total_revenue;
	}

	public void setTotal_revenue(List<GraphReport> total_revenue) {
		this.total_revenue = total_revenue;
	}

	public BizCaseProfitLossChart() {
	}

}

package com.intelizign.dmgcc.dashboardresponce;

import java.text.DecimalFormat;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MainDashboardReport {

	private List<PlanVsActualReport> revenue_report;

	private List<PlanVsActualReport> expense_report;

	private List<PlanVsActualReport> ebit_report;

	private String revenue_count;

	private String expense_count;

	private String ebit_count;

	private String revenue_count_inr;

	private String expense_count_inr;

	private String ebit_count_inr;

	private List<BarChartReport> manpower_utilization;

	private List<BarChartReport> invoice_status;

	private long active_sla_count;

	private double billed;

	private long billable_hours;

	private long leads_count;

	private long biz_req_count;

	private long biz_case_count;

	private double leads_conversion_average;

	private double biz_req_conversion_average;

	private double approval_conversion_average;

	public void setRevenue_report(List<PlanVsActualReport> revenue_report) {
		this.revenue_report = revenue_report;
	}

	public void setExpense_report(List<PlanVsActualReport> expense_report) {
		this.expense_report = expense_report;
	}

	public void setEbit_report(List<PlanVsActualReport> ebit_report) {
		this.ebit_report = ebit_report;
	}

	public void setRevenue_count(String revenue_count) {
		this.revenue_count = revenue_count;
	}

	public void setExpense_count(String expense_count) {
		this.expense_count = expense_count;
	}

	public void setEbit_count(String ebit_count) {
		this.ebit_count = ebit_count;
	}

	public void setRevenue_count_inr(String revenue_count_inr) {
		this.revenue_count_inr = revenue_count_inr;
	}

	public void setExpense_count_inr(String expense_count_inr) {
		this.expense_count_inr = expense_count_inr;
	}

	public void setEbit_count_inr(String ebit_count_inr) {
		this.ebit_count_inr = ebit_count_inr;
	}

	public void setManpower_utilization(List<BarChartReport> manpower_utilization) {
		this.manpower_utilization = manpower_utilization;
	}

	public void setInvoice_status(List<BarChartReport> invoice_status) {
		this.invoice_status = invoice_status;
	}

	public void setActive_sla_count(long active_sla_count) {
		String formattedValue;
		if(active_sla_count % 1 == 0) {
			  // No digits after decimal
			formattedValue = String.format("%d", active_sla_count);
		}
		
		else {
			formattedValue = String.format("%.2d", active_sla_count);
		}
		this.active_sla_count = Long.parseLong(formattedValue);
	}

	public void setBilled(double billed) {
		String formattedValue;
		if(billed % 1 == 0) {
			  // No digits after decimal
			formattedValue = String.format("%f", billed);
		}
		
		else {
			formattedValue = String.format("%.2f", billed);
		}
		this.billed = Double.parseDouble(formattedValue);
	}

	public void setBillable_hours(long billable_hours) {
		String formattedValue;
		if(billable_hours % 1 == 0) {
			  // No digits after decimal
			formattedValue = String.format("%d", billable_hours);
		}
		
		else {
			formattedValue = String.format("%.2d", billable_hours);
		}
		this.billable_hours = Long.parseLong(formattedValue);
	}

	public void setLeads_count(long leads_count) {
		String formattedValue;
		if(leads_count % 1 == 0) {
			  // No digits after decimal
			formattedValue = String.format("%d", leads_count);
		}
		
		else {
			formattedValue = String.format("%.2d", leads_count);
		}
		this.leads_count = Long.parseLong(formattedValue);
	}

	public void setBiz_req_count(long biz_req_count) {
		String formattedValue;
		if(biz_req_count % 1 == 0) {
			  // No digits after decimal
			formattedValue = String.format("%d", biz_req_count);
		}
		
		else {
			formattedValue = String.format("%.2d", biz_req_count);
		}
		this.biz_req_count = Long.parseLong(formattedValue);
	}

	public void setBiz_case_count(long biz_case_count) {
		String formattedValue;
		if(biz_case_count % 1 == 0) {
			  // No digits after decimal
			formattedValue = String.format("%d", biz_case_count);
		}
		
		else {
			formattedValue = String.format("%.2d", biz_case_count);
		}
		this.biz_case_count = Long.parseLong(formattedValue);
	}

	public void setLeads_conversion_average(double leads_conversion_average) {
		String formattedValue;
		if(leads_conversion_average % 1 == 0) {
			  // No digits after decimal
			formattedValue = String.format("%f", leads_conversion_average);
		}
		
		else {
			formattedValue = String.format("%.2f", leads_conversion_average);
		}
		this.leads_conversion_average = Double.parseDouble(formattedValue);
	}

	public void setBiz_req_conversion_average(double biz_req_conversion_average) {
		String formattedValue;
		if(biz_req_conversion_average % 1 == 0) {
			  // No digits after decimal
			formattedValue = String.format("%f", biz_req_conversion_average);
		}
		
		else {
			formattedValue = String.format("%.2f", biz_req_conversion_average);
		}
		this.biz_req_conversion_average = Double.parseDouble(formattedValue);
	}

	public void setApproval_conversion_average(double approval_conversion_average) {
		String formattedValue;
		if(approval_conversion_average % 1 == 0) {
			  // No digits after decimal
			formattedValue = String.format("%f", approval_conversion_average);
		}
		
		else {
			formattedValue = String.format("%.2f", approval_conversion_average);
		}
		this.approval_conversion_average = Double.parseDouble(formattedValue);
	}
}

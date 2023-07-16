package com.intelizign.dmgcc.response;

import java.util.List;

public class SLAAccurals {

	private String sla_name;
	private String billing_cycle;
	private List<AccuralsMonthlyData> monthly_datas;

	public static class AccuralsMonthlyData {
		private String month;
		private String invoice_value;

		public String getMonth() {
			return month;
		}

		public void setMonth(String month) {
			this.month = month;
		}

		public String getInvoice_value() {
			return invoice_value;
		}

		public void setInvoice_value(String invoice_value) {
			this.invoice_value = invoice_value;
		}

	}

	public String getSla_name() {
		return sla_name;
	}

	public void setSla_name(String sla_name) {
		this.sla_name = sla_name;
	}

	public String getBilling_cycle() {
		return billing_cycle;
	}

	public void setBilling_cycle(String billing_cycle) {
		this.billing_cycle = billing_cycle;
	}

	public List<AccuralsMonthlyData> getMonthly_datas() {
		return monthly_datas;
	}

	public void setMonthly_datas(List<AccuralsMonthlyData> monthly_datas) {
		this.monthly_datas = monthly_datas;
	}

	public SLAAccurals() {
		super();
	}

}

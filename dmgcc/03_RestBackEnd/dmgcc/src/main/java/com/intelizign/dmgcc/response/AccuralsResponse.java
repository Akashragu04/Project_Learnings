package com.intelizign.dmgcc.response;

public class AccuralsResponse {
	private Long id;
	private String project_code;
	private String project_name;
	private String customer;
	private String status;
	private Long sla_value;
	private Long revenue_so_far;

	public static class SLADatas {
		private Long id;
		private String slaid;
		private String project_name;
		private String slaname;
		private String customer;
		private String billing_cycle;
		private String last_invoiced_date;
		private String invoice_revenue;
		private String total_revenue;
		private Boolean file_upload = true;

		public SLADatas() {
			super();
		}

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public Boolean getFile_upload() {
			return file_upload;
		}

		public void setFile_upload(Boolean file_upload) {
			this.file_upload = file_upload;
		}

		public String getSlaid() {
			return slaid;
		}

		public void setSlaid(String slaid) {
			this.slaid = slaid;
		}

		public String getProject_name() {
			return project_name;
		}

		public void setProject_name(String project_name) {
			this.project_name = project_name;
		}

		public String getSlaname() {
			return slaname;
		}

		public void setSlaname(String slaname) {
			this.slaname = slaname;
		}

		public String getCustomer() {
			return customer;
		}

		public void setCustomer(String customer) {
			this.customer = customer;
		}

		public String getBilling_cycle() {
			return billing_cycle;
		}

		public void setBilling_cycle(String billing_cycle) {
			this.billing_cycle = billing_cycle;
		}

		public String getLast_invoiced_date() {
			return last_invoiced_date;
		}

		public void setLast_invoiced_date(String last_invoiced_date) {
			this.last_invoiced_date = last_invoiced_date;
		}

		public String getInvoice_revenue() {
			return invoice_revenue;
		}

		public void setInvoice_revenue(String invoice_revenue) {
			this.invoice_revenue = invoice_revenue;
		}

		public String getTotal_revenue() {
			return total_revenue;
		}

		public void setTotal_revenue(String total_revenue) {
			this.total_revenue = total_revenue;
		}

	}

	public AccuralsResponse() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getProject_code() {
		return project_code;
	}

	public void setProject_code(String project_code) {
		this.project_code = project_code;
	}

	public String getProject_name() {
		return project_name;
	}

	public void setProject_name(String project_name) {
		this.project_name = project_name;
	}

	public String getCustomer() {
		return customer;
	}

	public void setCustomer(String customer) {
		this.customer = customer;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Long getSla_value() {
		return sla_value;
	}

	public void setSla_value(Long sla_value) {
		this.sla_value = sla_value;
	}

	public Long getRevenue_so_far() {
		return revenue_so_far;
	}

	public void setRevenue_so_far(Long revenue_so_far) {
		this.revenue_so_far = revenue_so_far;
	}

}

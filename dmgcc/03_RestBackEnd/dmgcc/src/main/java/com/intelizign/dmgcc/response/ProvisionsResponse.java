package com.intelizign.dmgcc.response;

public class ProvisionsResponse {

	private Long id;
	private String project_code;
	private String project_name;
	private String customer;
	private String status;
	private Long sla_value;
	private Double expense_so_far;
	
	public ProvisionsResponse() {
		super();
	}

	public static class ProvisionsSLADatas {
		private Long id;
		private String slaid;
		private String project_name;
		private String slaname;
		private String customer;
		private String billing_cycle;
		private String last_invoiced_date;
		private String invoice_expense;
		private String total_expense;
		private Boolean file_upload = true;
		public ProvisionsSLADatas() {
			super();
		}
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
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
		public String getInvoice_expense() {
			return invoice_expense;
		}
		public void setInvoice_expense(String invoice_expense) {
			this.invoice_expense = invoice_expense;
		}
		public String getTotal_expense() {
			return total_expense;
		}
		public void setTotal_expense(String total_expense) {
			this.total_expense = total_expense;
		}
		public Boolean getFile_upload() {
			return file_upload;
		}
		public void setFile_upload(Boolean file_upload) {
			this.file_upload = file_upload;
		}
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

	public Double getExpense_so_far() {
		return expense_so_far;
	}

	public void setExpense_so_far(Double expense_so_far) {
		this.expense_so_far = expense_so_far;
	}


}

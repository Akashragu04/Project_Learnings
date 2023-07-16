package com.intelizign.dmgcc.pojoclass;

import java.util.List;

import com.intelizign.dmgcc.models.EmployeeCapacityReportModel;
import com.intelizign.dmgcc.models.G3CEmployeeMasterModel;

public class ResourceReport {

	private Boolean under_project;

	private List<SubResourceReport> sla_reports;

	private G3CEmployeeMasterModel user;

	private Float overall_yearly_capacity;

	private List<EmployeeCapacityReportModel> empcapacitydata;

	private Boolean visibilty_of_next_sla = false;

	public static class SubResourceReport {

		private Integer id;

		private String current_project_name;

		private String sla_start_date;

		private String sla_end_date;

		private Boolean resource_status;

		private Double billing_rate;

		private Double employee_leave_taken;

		private String loss_of_billing_days;

		private Double total_loss_of_billing;

		private Long n_end_sla_days;

		private String sla_status;

		public Integer getId() {
			return id;
		}

		public void setId(Integer id) {
			this.id = id;
		}

		public String getCurrent_project_name() {
			return current_project_name;
		}

		public void setCurrent_project_name(String current_project_name) {
			this.current_project_name = current_project_name;
		}

		public String getSla_start_date() {
			return sla_start_date;
		}

		public void setSla_start_date(String sla_start_date) {
			this.sla_start_date = sla_start_date;
		}

		public String getSla_end_date() {
			return sla_end_date;
		}

		public void setSla_end_date(String sla_end_date) {
			this.sla_end_date = sla_end_date;
		}

		public Boolean getResource_status() {
			return resource_status;
		}

		public void setResource_status(Boolean resource_status) {
			this.resource_status = resource_status;
		}

		public Double getBilling_rate() {
			return billing_rate;
		}

		public void setBilling_rate(Double billing_rate) {

			if(billing_rate != null) {
				String formattedValue;
				if(billing_rate % 1 == 0) {
					  // No digits after decimal
					formattedValue = String.format("%f", billing_rate);
				}
				
				else {
					formattedValue = String.format("%.2f", billing_rate);
				}
				this.billing_rate = Double.parseDouble(formattedValue);
			}
			else {
				this.billing_rate = billing_rate ;
			}
		}

		public Double getEmployee_leave_taken() {
			return employee_leave_taken;
		}

		public void setEmployee_leave_taken(Double employee_leave_taken) {

			if(employee_leave_taken != null) {
				String formattedValue;
				if(employee_leave_taken % 1 == 0) {
					  // No digits after decimal
					formattedValue = String.format("%f", employee_leave_taken);
				}
				
				else {
					formattedValue = String.format("%.2f", employee_leave_taken);
				}
				this.employee_leave_taken = Double.parseDouble(formattedValue);
			}
			else {
				this.employee_leave_taken = employee_leave_taken ;
			}
		}

		public String getLoss_of_billing_days() {
			return loss_of_billing_days;
		}

		public void setLoss_of_billing_days(String loss_of_billing_days) {
			this.loss_of_billing_days = loss_of_billing_days;
		}

		public Double getTotal_loss_of_billing() {
			return total_loss_of_billing;
		}

		public void setTotal_loss_of_billing(Double total_loss_of_billing) {

			if(total_loss_of_billing != null) {
				String formattedValue;
				if(total_loss_of_billing % 1 == 0) {
					  // No digits after decimal
					formattedValue = String.format("%f", total_loss_of_billing);
				}
				
				else {
					formattedValue = String.format("%.2f", total_loss_of_billing);
				}
				this.total_loss_of_billing = Double.parseDouble(formattedValue);
			}
			else {
				this.total_loss_of_billing = total_loss_of_billing ; 
			}

		}

		public Long getN_end_sla_days() {
			return n_end_sla_days;
		}

		public void setN_end_sla_days(Long n_end_sla_days) {

			if(n_end_sla_days != null) {
				String formattedValue;
				if(n_end_sla_days % 1 == 0) {
					  // No digits after decimal
					formattedValue = String.format("%d", n_end_sla_days);
				}
				
				else {
					formattedValue = String.format("%.2d", n_end_sla_days);
				}
				this.n_end_sla_days = Long.parseLong(formattedValue);
			}
			else {
				this.n_end_sla_days = n_end_sla_days ;
			}
		}

		public String getSla_status() {
			return sla_status;
		}

		public void setSla_status(String sla_status) {
			this.sla_status = sla_status;
		}

	}

	public Boolean getUnder_project() {
		return under_project;
	}

	public void setUnder_project(Boolean under_project) {
		this.under_project = under_project;
	}

	public List<SubResourceReport> getSla_reports() {
		return sla_reports;
	}

	public void setSla_reports(List<SubResourceReport> sla_reports) {
		this.sla_reports = sla_reports;
	}

	public G3CEmployeeMasterModel getUser() {
		return user;
	}

	public void setUser(G3CEmployeeMasterModel user) {
		this.user = user;
	}

	public Float getOverall_yearly_capacity() {
		return overall_yearly_capacity;
	}

	public void setOverall_yearly_capacity(Float overall_yearly_capacity) {
		
		if(overall_yearly_capacity != null) {
			String formattedValue;
			if(overall_yearly_capacity % 1 == 0) {
				  // No digits after decimal
				formattedValue = String.format("%f", overall_yearly_capacity);
			}
			
			else {
				formattedValue = String.format("%.2f", overall_yearly_capacity);
			}
			this.overall_yearly_capacity = Float.parseFloat(formattedValue);
		}
		else {
			this.overall_yearly_capacity = overall_yearly_capacity ;
		}
		
	}

	public Boolean getVisibilty_of_next_sla() {
		return visibilty_of_next_sla;
	}

	public void setVisibilty_of_next_sla(Boolean visibilty_of_next_sla) {
		this.visibilty_of_next_sla = visibilty_of_next_sla;
	}

	public List<EmployeeCapacityReportModel> getEmpcapacitydata() {
		return empcapacitydata;
	}

	public void setEmpcapacitydata(List<EmployeeCapacityReportModel> empcapacitydata) {
		this.empcapacitydata = empcapacitydata;
	}

	public ResourceReport() {
		super();
	}

}

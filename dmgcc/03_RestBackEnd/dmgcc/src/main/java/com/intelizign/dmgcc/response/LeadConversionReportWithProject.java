package com.intelizign.dmgcc.response;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class LeadConversionReportWithProject {

	private List<LeadConversionAverage> average_report;

	private List<LeadData> leads_data;

	public List<LeadConversionAverage> getAverage_report() {
		return average_report;
	}

	public void setAverage_report(List<LeadConversionAverage> average_report) {
		this.average_report = average_report;
	}

	public List<LeadData> getLeads_data() {
		return leads_data;
	}

	public void setLeads_data(List<LeadData> leads_data) {
		this.leads_data = leads_data;
	}

	public LeadConversionReportWithProject() {
		super();
	}

	public LeadConversionReportWithProject(List<LeadConversionAverage> average_report, List<LeadData> leads_data) {
		super();
		this.average_report = average_report;
		this.leads_data = leads_data;
	}

	public static class LeadConversionAverage {

		private String conversion_period;

		private Double average;

		private String colour;

		private String department;

		public String getConversion_period() {
			return conversion_period;
		}

		public void setConversion_period(String conversion_period) {
			this.conversion_period = conversion_period;
		}

		public Double getAverage() {
			return average;
		}

		public void setAverage(Double average) {
			this.average = average;
		}

		public String getColour() {
			return colour;
		}

		public void setColour(String colour) {
			this.colour = colour;
		}

		public String getDepartment() {
			return department;
		}

		public void setDepartment(String department) {
			this.department = department;
		}

		public LeadConversionAverage() {
			super();
		}

	}

	public static class LeadData {

		private long id;

		private LocalDate request_date;

		private String service_receiver_short_id;

		private String service_receiver_contact_name;

		private String service_receiver_email_id;

		private String service_receiver_entity;

		private String service_receiver_department;

		private String project_name;

		private String short_description;

		private Boolean isasign;

		private String service_provider_short_id;

		private String service_provider_contact_name;

		private String service_provider_email_id;

		private String service_provider_department;

		private LocalDateTime create_date;

		private Boolean active;

		private String category_name;

		private String category_status;

		public long getId() {
			return id;
		}

		public void setId(long id) {
			this.id = id;
		}

		public LocalDate getRequest_date() {
			return request_date;
		}

		public void setRequest_date(LocalDate request_date) {
			this.request_date = request_date;
		}

		public String getService_receiver_short_id() {
			return service_receiver_short_id;
		}

		public void setService_receiver_short_id(String service_receiver_short_id) {
			this.service_receiver_short_id = service_receiver_short_id;
		}

		public String getService_receiver_contact_name() {
			return service_receiver_contact_name;
		}

		public void setService_receiver_contact_name(String service_receiver_contact_name) {
			this.service_receiver_contact_name = service_receiver_contact_name;
		}

		public String getService_receiver_email_id() {
			return service_receiver_email_id;
		}

		public void setService_receiver_email_id(String service_receiver_email_id) {
			this.service_receiver_email_id = service_receiver_email_id;
		}

		public String getService_receiver_entity() {
			return service_receiver_entity;
		}

		public void setService_receiver_entity(String service_receiver_entity) {
			this.service_receiver_entity = service_receiver_entity;
		}

		public String getService_receiver_department() {
			return service_receiver_department;
		}

		public void setService_receiver_department(String service_receiver_department) {
			this.service_receiver_department = service_receiver_department;
		}

		public String getProject_name() {
			return project_name;
		}

		public void setProject_name(String project_name) {
			this.project_name = project_name;
		}

		public String getShort_description() {
			return short_description;
		}

		public void setShort_description(String short_description) {
			this.short_description = short_description;
		}

		public Boolean getIsasign() {
			return isasign;
		}

		public void setIsasign(Boolean isasign) {
			this.isasign = isasign;
		}

		public String getService_provider_short_id() {
			return service_provider_short_id;
		}

		public void setService_provider_short_id(String service_provider_short_id) {
			this.service_provider_short_id = service_provider_short_id;
		}

		public String getService_provider_contact_name() {
			return service_provider_contact_name;
		}

		public void setService_provider_contact_name(String service_provider_contact_name) {
			this.service_provider_contact_name = service_provider_contact_name;
		}

		public String getService_provider_email_id() {
			return service_provider_email_id;
		}

		public void setService_provider_email_id(String service_provider_email_id) {
			this.service_provider_email_id = service_provider_email_id;
		}

		public String getService_provider_department() {
			return service_provider_department;
		}

		public void setService_provider_department(String service_provider_department) {
			this.service_provider_department = service_provider_department;
		}

		public LocalDateTime getCreate_date() {
			return create_date;
		}

		public void setCreate_date(LocalDateTime create_date) {
			this.create_date = create_date;
		}

		public Boolean getActive() {
			return active;
		}

		public void setActive(Boolean active) {
			this.active = active;
		}

		public String getCategory_name() {
			return category_name;
		}

		public void setCategory_name(String category_name) {
			this.category_name = category_name;
		}

		public String getCategory_status() {
			return category_status;
		}

		public void setCategory_status(String category_status) {
			this.category_status = category_status;
		}

	}

}

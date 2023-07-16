package com.intelizign.dmgcc.request;

import org.springframework.web.multipart.MultipartFile;

public class LeadRequest {

	private long id;

	private String request_date;

	private String service_receiver_short_id;

	private String service_receiver_contact_name;

	private String service_receiver_email_id;

	private String service_receiver_entity;

	private String project_name;

	private String short_description;

	private MultipartFile[] supporting_files;

	private String service_provider_short_id;

	private String service_provider_contact_name;

	private String service_provider_email_id;

	private String service_receiver_department;

	private String service_provider_department;

	private String service_receiver_cost_center;

	private String service_provider_cost_center;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getRequest_date() {
		return request_date;
	}

	public void setRequest_date(String request_date) {
		this.request_date = request_date;
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

	public MultipartFile[] getSupporting_files() {
		return supporting_files;
	}

	public void setSupporting_files(MultipartFile[] supporting_files) {
		this.supporting_files = supporting_files;
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

	public String getService_receiver_department() {
		return service_receiver_department;
	}

	public void setService_receiver_department(String service_receiver_department) {
		this.service_receiver_department = service_receiver_department;
	}

	public String getService_provider_department() {
		return service_provider_department;
	}

	public void setService_provider_department(String service_provider_department) {
		this.service_provider_department = service_provider_department;
	}

	public String getService_receiver_short_id() {
		return service_receiver_short_id;
	}

	public void setService_receiver_short_id(String service_receiver_short_id) {
		this.service_receiver_short_id = service_receiver_short_id;
	}

	public String getService_provider_short_id() {
		return service_provider_short_id;
	}

	public void setService_provider_short_id(String service_provider_short_id) {
		this.service_provider_short_id = service_provider_short_id;
	}

	public String getService_receiver_cost_center() {
		return service_receiver_cost_center;
	}

	public void setService_receiver_cost_center(String service_receiver_cost_center) {
		this.service_receiver_cost_center = service_receiver_cost_center;
	}

	public String getService_provider_cost_center() {
		return service_provider_cost_center;
	}

	public void setService_provider_cost_center(String service_provider_cost_center) {
		this.service_provider_cost_center = service_provider_cost_center;
	}

}

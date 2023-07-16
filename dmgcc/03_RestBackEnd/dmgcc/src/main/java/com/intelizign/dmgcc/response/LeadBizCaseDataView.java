package com.intelizign.dmgcc.response;

import com.intelizign.dmgcc.models.businesscasemodels.BusinessCaseRequest;

public class LeadBizCaseDataView {

	private long id;

	private String service_receiver_entity;

	private String service_receiver_contact_name;

	private String project_name;

	private String short_description;

	private BusinessCaseRequest businessCaseRequest;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getService_receiver_entity() {
		return service_receiver_entity;
	}

	public void setService_receiver_entity(String service_receiver_entity) {
		this.service_receiver_entity = service_receiver_entity;
	}

	public String getService_receiver_contact_name() {
		return service_receiver_contact_name;
	}

	public void setService_receiver_contact_name(String service_receiver_contact_name) {
		this.service_receiver_contact_name = service_receiver_contact_name;
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

	public BusinessCaseRequest getBusinessCaseRequest() {
		return businessCaseRequest;
	}

	public void setBusinessCaseRequest(BusinessCaseRequest businessCaseRequest) {
		this.businessCaseRequest = businessCaseRequest;
	}

	public LeadBizCaseDataView() {
		super();
	}

}

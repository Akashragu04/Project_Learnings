package com.intelizign.dmgcc.pojoclass;

public class ResourceBaseProjectCapacity {

	private Long resource_mapping_id;

	private String project_code;

	private String project_name;

	private String sla_code;

	private String sla_name;

	private Integer resource_capacity;

	private String sla_expiry_date;

	public Long getResource_mapping_id() {
		return resource_mapping_id;
	}

	public void setResource_mapping_id(Long resource_mapping_id) {
		this.resource_mapping_id = resource_mapping_id;
	}

	public ResourceBaseProjectCapacity() {
		super();
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

	public String getSla_code() {
		return sla_code;
	}

	public void setSla_code(String sla_code) {
		this.sla_code = sla_code;
	}

	public String getSla_name() {
		return sla_name;
	}

	public void setSla_name(String sla_name) {
		this.sla_name = sla_name;
	}

	public Integer getResource_capacity() {
		return resource_capacity;
	}

	public void setResource_capacity(Integer resource_capacity) {
		this.resource_capacity = resource_capacity;
	}

	public String getSla_expiry_date() {
		return sla_expiry_date;
	}

	public void setSla_expiry_date(String sla_expiry_date) {
		this.sla_expiry_date = sla_expiry_date;
	}

}

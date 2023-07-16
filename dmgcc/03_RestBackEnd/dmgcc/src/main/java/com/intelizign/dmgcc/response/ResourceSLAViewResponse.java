package com.intelizign.dmgcc.response;

import java.io.Serializable;
import java.util.Set;

import com.intelizign.dmgcc.models.ResourceAllocationModel;

public class ResourceSLAViewResponse implements Serializable {

	private long id;

	private String project_name;

	private String project_code;

	private String slaid;

	private String slaname;

	private Set<ResourceAllocationModel> resources;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getProject_name() {
		return project_name;
	}

	public void setProject_name(String project_name) {
		this.project_name = project_name;
	}

	public String getProject_code() {
		return project_code;
	}

	public void setProject_code(String project_code) {
		this.project_code = project_code;
	}

	public String getSlaid() {
		return slaid;
	}

	public void setSlaid(String slaid) {
		this.slaid = slaid;
	}

	public String getSlaname() {
		return slaname;
	}

	public void setSlaname(String slaname) {
		this.slaname = slaname;
	}

	public Set<ResourceAllocationModel> getResources() {
		return resources;
	}

	public void setResources(Set<ResourceAllocationModel> resources) {
		this.resources = resources;
	}

	public ResourceSLAViewResponse() {
		super();
	}

}

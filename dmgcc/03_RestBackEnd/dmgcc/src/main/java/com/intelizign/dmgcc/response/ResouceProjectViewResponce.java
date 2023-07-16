package com.intelizign.dmgcc.response;

import java.io.Serializable;
import java.util.List;

public class ResouceProjectViewResponce implements Serializable {

	private long id;

	private String project_name;

	private String project_code;

	private List<ResourceSLAViewResponse> sla;

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

	public List<ResourceSLAViewResponse> getSla() {
		return sla;
	}

	public void setSla(List<ResourceSLAViewResponse> sla) {
		this.sla = sla;
	}

	public ResouceProjectViewResponce() {
		super();
	}

}

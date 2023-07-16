package com.intelizign.dmgcc.request;

import java.util.List;

public class C4Drequest {

	private List<SupportingFiles> file;

	private Long project_id;

	private String billing_cycle;

	public List<SupportingFiles> getFile() {
		return file;
	}

	public void setFile(List<SupportingFiles> file) {
		this.file = file;
	}

	public Long getProject_id() {
		return project_id;
	}

	public void setProject_id(Long project_id) {
		this.project_id = project_id;
	}

	public String getBilling_cycle() {
		return billing_cycle;
	}

	public void setBilling_cycle(String billing_cycle) {
		this.billing_cycle = billing_cycle;
	}

}

package com.intelizign.dmgcc.response;

import java.io.Serializable;

public class JDHiredResponse implements Serializable {
	private Long id;
	private String updated_by = "";
	private String status = "";

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUpdated_by() {
		return updated_by;
	}

	public void setUpdated_by(String updated_by) {
		this.updated_by = updated_by;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}

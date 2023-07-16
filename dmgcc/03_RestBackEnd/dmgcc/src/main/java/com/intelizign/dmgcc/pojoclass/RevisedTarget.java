package com.intelizign.dmgcc.pojoclass;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonFormat;

public class RevisedTarget implements Serializable {

	@JsonFormat(pattern = "yyyy-MM-dd")
	private String revisedDate;

	private String description;

	public String getRevisedDate() {
		return revisedDate;
	}

	public void setRevisedDate(String revisedDate) {
		this.revisedDate = revisedDate;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public RevisedTarget() {
		super();
	}

}

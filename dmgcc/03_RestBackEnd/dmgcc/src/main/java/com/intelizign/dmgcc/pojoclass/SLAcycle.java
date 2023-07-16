package com.intelizign.dmgcc.pojoclass;

import java.io.Serializable;

public class SLAcycle implements Serializable {

	private String start_date;
	private String end_date;
	private String Status;

	public String getStart_date() {
		return start_date;
	}

	public void setStart_date(String start_date) {
		this.start_date = start_date;
	}

	public String getEnd_date() {
		return end_date;
	}

	public void setEnd_date(String end_date) {
		this.end_date = end_date;
	}

	public String getStatus() {
		return Status;
	}

	public void setStatus(String status) {
		Status = status;
	}

	public SLAcycle() {
		super();
	}

}

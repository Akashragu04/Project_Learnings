package com.intelizign.dmgcc.response;

import java.io.Serializable;

public class ResourceBasedViewResponse implements Serializable {

	private Long id;

	private String hr_id;

	private String emp_name;

	private String shortid;

	private String level;

	private Integer capacity;

	private String email;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getHr_id() {
		return hr_id;
	}

	public String getShortid() {
		return shortid;
	}

	public void setShortid(String shortid) {
		this.shortid = shortid;
	}

	public void setHr_id(String hr_id) {
		this.hr_id = hr_id;
	}

	public String getEmp_name() {
		return emp_name;
	}

	public void setEmp_name(String emp_name) {
		this.emp_name = emp_name;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public Integer getCapacity() {
		return capacity;
	}

	public void setCapacity(Integer capacity) {
		this.capacity = capacity;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public ResourceBasedViewResponse() {
		super();
	}

}

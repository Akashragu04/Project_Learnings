package com.intelizign.dmgcc.request;

import javax.validation.constraints.NotBlank;

public class G3CLoginRequest {

	
	@NotBlank
	private String empname;

	@NotBlank
	private String email;
	
	@NotBlank
	private String shortid;

	public String getEmpname() {
		return empname;
	}

	public void setEmpname(String empname) {
		this.empname = empname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getShortid() {
		return shortid;
	}

	public void setShortid(String shortid) {
		this.shortid = shortid;
	}
	
	
}

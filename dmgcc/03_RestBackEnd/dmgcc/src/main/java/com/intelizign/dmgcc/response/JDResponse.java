package com.intelizign.dmgcc.response;

import java.util.List;

import com.intelizign.dmgcc.models.JDModel;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class JDResponse {
	
	private String project_code;

	private String project_name;
	
	private List<JDModel> jd_information;

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

	public List<JDModel> getJd_information() {
		return jd_information;
	}

	public void setJd_information(List<JDModel> jd_information) {
		this.jd_information = jd_information;
	}
	
	 
	
}

package com.intelizign.dmgcc.pojoclass;

import java.util.List;

public class MaterialReport {
	private String project_name;
	private String project_code;
	private String slaName;
	private String slaCode;
	private List<DescripcitionAmount> descripcition_amount;
	
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
	public String getSlaName() {
		return slaName;
	}
	public void setSlaName(String slaName) {
		this.slaName = slaName;
	}
	public String getSlaCode() {
		return slaCode;
	}
	public void setSlaCode(String slaCode) {
		this.slaCode = slaCode;
	}
	public List<DescripcitionAmount> getDescripcition_amount() {
		return descripcition_amount;
	}
	public void setDescripcition_amount(List<DescripcitionAmount> descripcition_amount) {
		this.descripcition_amount = descripcition_amount;
	}
	 

}

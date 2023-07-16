package com.intelizign.dmgcc.response;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

public class RpaResourceResponse {
	private String shortid;

	private String email;
	
	private String employee_code;

	private String hrwt_code;

	private String kim_no;

	private String designation;

	private String functions;

	private String department_id;

	private String level;

	private String grade;

	private String employement_status;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate date_of_leave;

	private String supv_id;

	private String employee_supv_code;

	private String report_to;

	private String cost_center;

	private String sub_function;

	private String department;

	private String emp_name;

	private Boolean status_updated;

	private LocalDateTime status_updated_datetime;

	public String getShortid() {
		return shortid;
	}

	public void setShortid(String shortid) {
		this.shortid = shortid;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getEmployee_code() {
		return employee_code;
	}

	public void setEmployee_code(String employee_code) {
		this.employee_code = employee_code;
	}

	public String getHrwt_code() {
		return hrwt_code;
	}

	public void setHrwt_code(String hrwt_code) {
		this.hrwt_code = hrwt_code;
	}

	public String getKim_no() {
		return kim_no;
	}

	public void setKim_no(String kim_no) {
		this.kim_no = kim_no;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public String getFunctions() {
		return functions;
	}

	public void setFunctions(String functions) {
		this.functions = functions;
	}

	public String getDepartment_id() {
		return department_id;
	}

	public void setDepartment_id(String department_id) {
		this.department_id = department_id;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public String getGrade() {
		return grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}

	public String getEmployement_status() {
		return employement_status;
	}

	public void setEmployement_status(String employement_status) {
		this.employement_status = employement_status;
	}

	public LocalDate getDate_of_leave() {
		return date_of_leave;
	}

	public void setDate_of_leave(LocalDate date_of_leave) {
		this.date_of_leave = date_of_leave;
	}

	public String getSupv_id() {
		return supv_id;
	}

	public void setSupv_id(String supv_id) {
		this.supv_id = supv_id;
	}

	public String getEmployee_supv_code() {
		return employee_supv_code;
	}

	public void setEmployee_supv_code(String employee_supv_code) {
		this.employee_supv_code = employee_supv_code;
	}

	public String getReport_to() {
		return report_to;
	}

	public void setReport_to(String report_to) {
		this.report_to = report_to;
	}

	public String getCost_center() {
		return cost_center;
	}

	public void setCost_center(String cost_center) {
		this.cost_center = cost_center;
	}

	public String getSub_function() {
		return sub_function;
	}

	public void setSub_function(String sub_function) {
		this.sub_function = sub_function;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getEmp_name() {
		return emp_name;
	}

	public void setEmp_name(String emp_name) {
		this.emp_name = emp_name;
	}

	public Boolean getStatus_updated() {
		return status_updated;
	}

	public void setStatus_updated(Boolean status_updated) {
		this.status_updated = status_updated;
	}

	public LocalDateTime getStatus_updated_datetime() {
		return status_updated_datetime;
	}

	public void setStatus_updated_datetime(LocalDateTime status_updated_datetime) {
		this.status_updated_datetime = status_updated_datetime;
	}

	public RpaResourceResponse() {
		super();

	}


}

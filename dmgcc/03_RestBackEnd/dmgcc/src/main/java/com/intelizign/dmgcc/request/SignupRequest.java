package com.intelizign.dmgcc.request;

import java.time.LocalDate;

import javax.validation.constraints.Email;

import com.fasterxml.jackson.annotation.JsonFormat;

public class SignupRequest {

	private String username;

	private String shortid;

	private String hrid;

	private String password;

	private String employee_code;

	private String hrwt_code;

	private String kim_no;

	private String gender;

	private String designation;

	private String functions;

	private String department_id;

	private String level;

	private String grade;

	private String locations;

	private String supporting_hr;

	private String employement_status;

	private String indianexpat;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate date_of_join;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate date_of_leave;

	private String supv_id;

	private String report_to;

	private String cost_center;

	private String get_mt_det;

	@Email
	private String email;

	private String user_id;

	private String sub_function;

	private String approver1;

	private String approver_name;

	private String category;

	private String empl_class;

	private String business;

	private String department;

	private String rolename;

	private String roles;

	private String emp_name;

	private String age;

	private String total_prior_experience;

	private String experience_dicv;

	private String total_experience;

	public String getHrid() {
		return hrid;
	}

	public void setHrid(String hrid) {
		this.hrid = hrid;
	}

	public String getEmp_name() {
		return emp_name;
	}

	public void setEmp_name(String emp_name) {
		this.emp_name = emp_name;
	}

	public String getAge() {
		return age;
	}

	public void setAge(String age) {
		this.age = age;
	}

	public String getTotal_prior_experience() {
		return total_prior_experience;
	}

	public void setTotal_prior_experience(String total_prior_experience) {
		this.total_prior_experience = total_prior_experience;
	}

	public String getExperience_dicv() {
		return experience_dicv;
	}

	public void setExperience_dicv(String experience_dicv) {
		this.experience_dicv = experience_dicv;
	}

	public String getTotal_experience() {
		return total_experience;
	}

	public void setTotal_experience(String total_experience) {
		this.total_experience = total_experience;
	}

	public String getRolename() {
		return rolename;
	}

	public void setRolename(String rolename) {
		this.rolename = rolename;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getShortid() {
		return shortid;
	}

	public void setShortid(String shortid) {
		this.shortid = shortid;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
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

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
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

	public String getLocations() {
		return locations;
	}

	public void setLocations(String locations) {
		this.locations = locations;
	}

	public String getSupporting_hr() {
		return supporting_hr;
	}

	public void setSupporting_hr(String supporting_hr) {
		this.supporting_hr = supporting_hr;
	}

	public String getEmployement_status() {
		return employement_status;
	}

	public void setEmployement_status(String employement_status) {
		this.employement_status = employement_status;
	}

	public String getIndianexpat() {
		return indianexpat;
	}

	public void setIndianexpat(String indianexpat) {
		this.indianexpat = indianexpat;
	}

	public LocalDate getDate_of_join() {
		return date_of_join;
	}

	public void setDate_of_join(LocalDate date_of_join) {
		this.date_of_join = date_of_join;
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

	public String getGet_mt_det() {
		return get_mt_det;
	}

	public void setGet_mt_det(String get_mt_det) {
		this.get_mt_det = get_mt_det;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getSub_function() {
		return sub_function;
	}

	public void setSub_function(String sub_function) {
		this.sub_function = sub_function;
	}

	public String getApprover1() {
		return approver1;
	}

	public void setApprover1(String approver1) {
		this.approver1 = approver1;
	}

	public String getApprover_name() {
		return approver_name;
	}

	public void setApprover_name(String approver_name) {
		this.approver_name = approver_name;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getEmpl_class() {
		return empl_class;
	}

	public void setEmpl_class(String empl_class) {
		this.empl_class = empl_class;
	}

	public String getBusiness() {
		return business;
	}

	public void setBusiness(String business) {
		this.business = business;
	}

	public String getRoles() {
		return roles;
	}

	public void setRoles(String roles) {
		this.roles = roles;
	}

}
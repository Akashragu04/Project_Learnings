package com.intelizign.dmgcc.request;

import java.time.LocalDate;

public class RpaTimeSheetRequest {
	
	private String name;
	
	private LocalDate timesheet_date;

	 
	 private String working_hours;

	private Long project_id;

	private Long sla_id;

	 private String project_name;
	 
	 private String short_id;

	 private String sla_name;
	 
	 private String user_id;


	private String comments;

	private String employee_type="Intern";

	private String workingtype;
	
	private Boolean captinityleave;
	
	private String start_time;
	private String task_name;
	
	private Boolean active;
	
	private String end_time;
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	 

	public LocalDate getTimesheet_date() {
		return timesheet_date;
	}

	public void setTimesheet_date(LocalDate timesheet_date) {
		this.timesheet_date = timesheet_date;
	}

	public String getWorking_hours() {
		return working_hours;
	}

	public void setWorking_hours(String working_hours) {
		this.working_hours = working_hours;
	}

	public Long getProject_id() {
		return project_id;
	}

	public void setProject_id(Long project_id) {
		this.project_id = project_id;
	}

	public Long getSla_id() {
		return sla_id;
	}

	public void setSla_id(Long sla_id) {
		this.sla_id = sla_id;
	}

	public String getProject_name() {
		return project_name;
	}

	public void setProject_name(String project_name) {
		this.project_name = project_name;
	}

	public String getShort_id() {
		return short_id;
	}

	public void setShort_id(String short_id) {
		this.short_id = short_id;
	}

	public String getSla_name() {
		return sla_name;
	}

	public void setSla_name(String sla_name) {
		this.sla_name = sla_name;
	}

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public String getEmployee_type() {
		return employee_type;
	}

	public void setEmployee_type(String employee_type) {
		this.employee_type = employee_type;
	}

	public String getWorkingtype() {
		return workingtype;
	}

	public void setWorkingtype(String workingtype) {
		this.workingtype = workingtype;
	}

	public Boolean getCaptinityleave() {
		return captinityleave;
	}

	public void setCaptinityleave(Boolean captinityleave) {
		this.captinityleave = captinityleave;
	}

	public String getStart_time() {
		return start_time;
	}

	public void setStart_time(String start_time) {
		this.start_time = start_time;
	}

	public String getTask_name() {
		return task_name;
	}

	public void setTask_name(String task_name) {
		this.task_name = task_name;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public String getEnd_time() {
		return end_time;
	}

	public void setEnd_time(String end_time) {
		this.end_time = end_time;
	}

	 
	
	
	 

}

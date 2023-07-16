package com.intelizign.dmgcc.request;

public class TimeSheetRequest {

	private String timesheet_date;

	private String start_time;

	private String end_time;

	private String working_hours;

	private Long project;

	private Long sla;

	private Long task;

	private String comments;

	private String employee_type;

	private Boolean captinityleave;

	public TimeSheetRequest() {
		super();
	}

	public String getEmployee_type() {
		return employee_type;
	}

	public void setEmployee_type(String employee_type) {
		this.employee_type = employee_type;
	}

	public String getTimesheet_date() {
		return timesheet_date;
	}

	public void setTimesheet_date(String timesheet_date) {
		this.timesheet_date = timesheet_date;
	}

	public String getStart_time() {
		return start_time;
	}

	public void setStart_time(String start_time) {
		this.start_time = start_time;
	}

	public String getEnd_time() {
		return end_time;
	}

	public void setEnd_time(String end_time) {
		this.end_time = end_time;
	}

	public String getWorking_hours() {
		return working_hours;
	}

	public void setWorking_hours(String working_hours) {
		this.working_hours = working_hours;
	}

	public Long getProject() {
		return project;
	}

	public void setProject(Long project) {
		this.project = project;
	}

	public Long getSla() {
		return sla;
	}

	public void setSla(Long sla) {
		this.sla = sla;
	}

	public Long getTask() {
		return task;
	}

	public void setTask(Long task) {
		this.task = task;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public Boolean getCaptinityleave() {
		return captinityleave;
	}

	public void setCaptinityleave(Boolean captinityleave) {
		this.captinityleave = captinityleave;
	}

}

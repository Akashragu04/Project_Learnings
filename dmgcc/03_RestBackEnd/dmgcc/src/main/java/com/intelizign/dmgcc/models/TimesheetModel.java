package com.intelizign.dmgcc.models;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "timesheet")
public class TimesheetModel {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", updatable = false)
	private Long id;

	@Column(name = "timesheet_date", nullable = false)
	private LocalDate timesheet_date;

	@Column(name = "working_hours", nullable = false)
	private Double working_hours;

	@Column(name = "start_time", nullable = false)
	private String start_time;

	@Column(name = "end_time", nullable = false)
	private String end_time;

	@Column(name = "employee_type")
	private String employee_type;

	@Column(name = "comments")
	private String comments;

	@Column(name = "name")
	private String name;

	@Column(name = "short_id")
	private String short_id;

	@Column(name = "active")
	private Boolean active = true;

	@Column(name = "captinityleave")
	private Boolean captinityleave;

	@Column(name = "workingtype")
	private String workingtype;

	@ManyToOne(fetch = FetchType.LAZY, optional = true)
	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	@JoinColumn(nullable = true, name = "project_id")
	private ProjectModel project;

	@Column(name = "project_name")
	private String project_name;

	@ManyToOne(fetch = FetchType.LAZY, optional = true)
	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	@JoinColumn(nullable = true, name = "sla_id")
	private SLAModel sla;

	@Column(name = "slaid")
	private String slaid;

	@ManyToOne(fetch = FetchType.LAZY, optional = true)
	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	@JoinColumn(nullable = true, name = "task_id")
	private TaskModel task;

	@Column(name = "task_name")
	private String task_name = "";

	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	@JoinColumn(nullable = false, name = "user_id")
	private G3CEmployeeMasterModel user;

	public TimesheetModel() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getProject_name() {
		return project_name;
	}

	public void setProject_name(String project_name) {
		this.project_name = project_name;
	}

	public String getSlaid() {
		return slaid;
	}

	public void setSlaid(String slaid) {
		this.slaid = slaid;
	}

	public String getTask_name() {
		return task_name;
	}

	public void setTask_name(String task_name) {
		this.task_name = task_name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getShort_id() {
		return short_id;
	}

	public void setShort_id(String short_id) {
		this.short_id = short_id;
	}

	public LocalDate getTimesheet_date() {
		return timesheet_date;
	}

	public void setTimesheet_date(LocalDate timesheet_date) {
		this.timesheet_date = timesheet_date;
	}

	public Double getWorking_hours() {
		return working_hours;
	}

	public void setWorking_hours(Double working_hours) {
		this.working_hours = working_hours;
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

	public String getEmployee_type() {
		return employee_type;
	}

	public void setEmployee_type(String employee_type) {
		this.employee_type = employee_type;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public ProjectModel getProject() {
		return project;
	}

	public void setProject(ProjectModel project) {
		this.project = project;
	}

	public SLAModel getSla() {
		return sla;
	}

	public void setSla(SLAModel sla) {
		this.sla = sla;
	}

	public TaskModel getTask() {
		return task;
	}

	public void setTask(TaskModel task) {
		this.task = task;
	}

	public G3CEmployeeMasterModel getUser() {
		return user;
	}

	public void setUser(G3CEmployeeMasterModel user) {
		this.user = user;
	}

	public String getWorkingtype() {
		return workingtype;
	}

	public Boolean getCaptinityleave() {
		return captinityleave;
	}

	public void setCaptinityleave(Boolean captinityleave) {
		this.captinityleave = captinityleave;
	}

	public void setWorkingtype(String workingtype) {
		this.workingtype = workingtype;
	}

}

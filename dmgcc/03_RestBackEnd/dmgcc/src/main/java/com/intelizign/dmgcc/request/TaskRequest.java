package com.intelizign.dmgcc.request;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

public class TaskRequest {

	private Long project_id;

	private Long sla_id;

	private String taskid;

	private String taskname;

	@JsonFormat(pattern = "dd-MM-yyyy")
	private String tasktarget;

	private List<SupportingFiles> taskfile;

	private String taskdescription;

	private Long user_id;

	private String assigned_name;

	private String assigne_email;

	private String assigne_shortId;

	private Boolean accepted = false;

	private String task_status;

	private String billableHours;

	public TaskRequest() {
		super();
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

	public String getTaskid() {
		return taskid;
	}

	public void setTaskid(String taskid) {
		this.taskid = taskid;
	}

	public String getTaskname() {
		return taskname;
	}

	public void setTaskname(String taskname) {
		this.taskname = taskname;
	}

	public String getTasktarget() {
		return tasktarget;
	}

	public void setTasktarget(String tasktarget) {
		this.tasktarget = tasktarget;
	}

	public List<SupportingFiles> getTaskfile() {
		return taskfile;
	}

	public void setTaskfile(List<SupportingFiles> taskfile) {
		this.taskfile = taskfile;
	}

	public String getTaskdescription() {
		return taskdescription;
	}

	public void setTaskdescription(String taskdescription) {
		this.taskdescription = taskdescription;
	}

	public String getAssigned_name() {
		return assigned_name;
	}

	public void setAssigned_name(String assigned_name) {
		this.assigned_name = assigned_name;
	}

	public String getAssigne_email() {
		return assigne_email;
	}

	public void setAssigne_email(String assigne_email) {
		this.assigne_email = assigne_email;
	}

	public String getAssigne_shortId() {
		return assigne_shortId;
	}

	public void setAssigne_shortId(String assigne_shortId) {
		this.assigne_shortId = assigne_shortId;
	}

	public Boolean getAccepted() {
		return accepted;
	}

	public void setAccepted(Boolean accepted) {
		this.accepted = accepted;
	}

	public String getTask_status() {
		return task_status;
	}

	public void setTask_status(String task_status) {
		this.task_status = task_status;
	}

	public String getBillableHours() {
		return billableHours;
	}

	public void setBillableHours(String billableHours) {
		this.billableHours = billableHours;
	}

	public Long getUser_id() {
		return user_id;
	}

	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}

}

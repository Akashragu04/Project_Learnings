package com.intelizign.dmgcc.models;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.intelizign.dmgcc.pojoclass.RevisedTarget;
import com.intelizign.dmgcc.request.SupportingFiles;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;

@Entity
@Table(name = "task")
@TypeDefs({ @TypeDef(name = "jsonb", typeClass = JsonBinaryType.class) })
public class TaskModel implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, updatable = false)
	private Long id;

	@Column(name = "task_id", nullable = false)
	private String taskid;

	@Column(name = "task_name", nullable = false)
	private String taskname;

	@Column(name = "task_target", nullable = false)
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDateTime tasktarget;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<SupportingFiles> taskfile;

	@Column(name = "task_description")
	private String taskdescription;

	@Column(name = "assigned_name")
	private String assigned_name;

	@Column(name = "project_name")
	private String project_name;

	@Column(name = "assigne_email")
	private String assigne_email;

	@Column(name = "assigne_shortId")
	private String assigne_shortId;

	@Column(name = "accepted")
	private Boolean accepted = false;

	@Column(name = "task_status", nullable = true)
	private String task_status = "";

	@Column(name = "billable_hours", nullable = true)
	private String billableHours;

	@Column(name = "created_by")
	private String createdBy;

	@Column(name = "updated_by")
	private String updatedBy;

	@Column(name = "created_date")
	private LocalDate createdDate;

	@Column(name = "updated_date")
	private LocalDate updatedDate;

	@Column(name = "completed_date")
	private LocalDate completedDate;

	@Column(name = "reopen_by")
	private String reopenBy;

	@Column(name = "reopen_date")
	private LocalDate reopenDate;

	@Column(name = "reopen_comments")
	private String reopenComments;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<RevisedTarget> revisedTarget;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "project_id", nullable = true)
	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	private ProjectModel projectid;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "sla_id", nullable = true)
	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	private SLAModel slaid;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "assigne_info", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private G3CEmployeeMasterModel assigne;

	@Column(name = "active")
	private Boolean active = true;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAssigne_email() {
		return assigne_email;
	}

	public void setAssigne_email(String assigne_email) {
		this.assigne_email = assigne_email;
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

	public LocalDateTime getTasktarget() {
		return tasktarget;
	}

	public void setTasktarget(LocalDateTime tasktarget) {
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

	public String getAssigne_shortId() {
		return assigne_shortId;
	}

	public void setAssigne_shortId(String assigne_shortId) {
		this.assigne_shortId = assigne_shortId;
	}

	public G3CEmployeeMasterModel getAssigne() {
		return assigne;
	}

	public void setAssigne(G3CEmployeeMasterModel assigne) {
		this.assigne = assigne;
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

	public List<RevisedTarget> getRevisedTarget() {
		return revisedTarget;
	}

	public void setRevisedTarget(List<RevisedTarget> revisedTarget) {
		this.revisedTarget = revisedTarget;
	}

	public ProjectModel getProjectId() {
		return projectid;
	}

	public void setProjectId(ProjectModel projectId) {
		this.projectid = projectId;
	}

	public SLAModel getSlaId() {
		return slaid;
	}

	public void setSlaId(SLAModel slaId) {
		this.slaid = slaId;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public String getProject_name() {
		return project_name;
	}

	public void setProject_name(String project_name) {
		this.project_name = project_name;
	}

	public ProjectModel getProjectid() {
		return projectid;
	}

	public void setProjectid(ProjectModel projectid) {
		this.projectid = projectid;
	}

	public SLAModel getSlaid() {
		return slaid;
	}

	public void setSlaid(SLAModel slaid) {
		this.slaid = slaid;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public String getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}

	public LocalDate getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(LocalDate createdDate) {
		this.createdDate = createdDate;
	}

	public LocalDate getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(LocalDate updatedDate) {
		this.updatedDate = updatedDate;
	}

	public LocalDate getCompletedDate() {
		return completedDate;
	}

	public void setCompletedDate(LocalDate completedDate) {
		this.completedDate = completedDate;
	}

	public String getReopenComments() {
		return reopenComments;
	}

	public void setReopenComments(String reopenComments) {
		this.reopenComments = reopenComments;
	}

	public String getReopenBy() {
		return reopenBy;
	}

	public void setReopenBy(String reopenBy) {
		this.reopenBy = reopenBy;
	}

	public LocalDate getReopenDate() {
		return reopenDate;
	}

	public void setReopenDate(LocalDate reopenDate) {
		this.reopenDate = reopenDate;
	}

	public TaskModel() {
		super();
	}

}

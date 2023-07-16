package com.intelizign.dmgcc.models;

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
import org.hibernate.annotations.TypeDef;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;
import com.intelizign.dmgcc.utils.CustomFields;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;

@Entity
@Table(name = "resource_allocation")
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
public class ResourceAllocationModel {

	@JsonView(CustomFields.MyResponseViews.class)
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, updatable = false)
	private long id;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "project_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private ProjectModel project;

	@JsonView(CustomFields.MyResponseViews.class)
	@Column(name = "project_name")
	private String project_name;

	@JsonView(CustomFields.MyResponseViews.class)
	@Column(name = "projectid")
	private Long projectid;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "sla_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private SLAModel sla;

	@JsonView(CustomFields.MyResponseViews.class)
	@Column(name = "slaid")
	private Long slaid;

	@JsonView(CustomFields.MyResponseViews.class)
	@Column(name = "sla_name")
	private String sla_name;

	@JsonView(CustomFields.MyResponseViews.class)
	@Column(name = "userid")
	private long userid;

	@JsonView(CustomFields.MyResponseViews.class)
	@Column(name = "hrid")
	private String hrid;

	@JsonView(CustomFields.MyResponseViews.class)
	@Column(name = "resource_name")
	private String resource_name;

	@JsonView(CustomFields.MyResponseViews.class)
	@Column(name = "resource_email")
	private String resource_email;

	@JsonView(CustomFields.MyResponseViews.class)
	@Column(name = "resource_shortid")
	private String resource_shortid;

	@JsonView(CustomFields.MyResponseViews.class)
	@Column(name = "capcity")
	private Integer capcity;

	@JsonView(CustomFields.MyResponseViews.class)
	@Column(name = "level")
	private String level;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "user_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonBackReference
	private G3CEmployeeMasterModel user;

	public ResourceAllocationModel() {
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public ProjectModel getProject() {
		return project;
	}

	public String getResource_email() {
		return resource_email;
	}

	public void setResource_email(String resource_email) {
		this.resource_email = resource_email;
	}

	public String getResource_shortid() {
		return resource_shortid;
	}

	public void setResource_shortid(String resource_shortid) {
		this.resource_shortid = resource_shortid;
	}

	public void setProject(ProjectModel project) {
		this.project = project;
	}

	public String getProject_name() {
		return project_name;
	}

	public void setProject_name(String project_name) {
		this.project_name = project_name;
	}

	public SLAModel getSla() {
		return sla;
	}

	public void setSla(SLAModel sla) {
		this.sla = sla;
	}

	public String getSla_name() {
		return sla_name;
	}

	public void setSla_name(String sla_name) {
		this.sla_name = sla_name;
	}

	public long getUserid() {
		return userid;
	}

	public void setUserid(long userid) {
		this.userid = userid;
	}

	public String getHrid() {
		return hrid;
	}

	public void setHrid(String hrid) {
		this.hrid = hrid;
	}

	public String getResource_name() {
		return resource_name;
	}

	public void setResource_name(String resource_name) {
		this.resource_name = resource_name;
	}

	public Integer getCapcity() {
		return capcity;
	}

	public void setCapcity(Integer capcity) {
		this.capcity = capcity;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public G3CEmployeeMasterModel getUser() {
		return user;
	}

	public void setUser(G3CEmployeeMasterModel user) {
		this.user = user;
	}

	public Long getProjectid() {
		return projectid;
	}

	public void setProjectid(Long projectid) {
		this.projectid = projectid;
	}

	public Long getSlaid() {
		return slaid;
	}

	public void setSlaid(Long slaid) {
		this.slaid = slaid;
	}

}

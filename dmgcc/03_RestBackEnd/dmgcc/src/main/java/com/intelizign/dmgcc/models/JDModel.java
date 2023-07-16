package com.intelizign.dmgcc.models;

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

import com.fasterxml.jackson.annotation.JsonProperty;
import com.intelizign.dmgcc.models.businesscasemodels.BusinessCaseRequest;
import com.intelizign.dmgcc.request.SupportingFiles;

@Entity
@Table(name = "job_description")
public class JDModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, updatable = false)
	private long id;

	@Column(name = "jd_code")
	private String jd_code;

	@Column(name = "jd_role")
	private String jd_role;

	@Column(name = "upload_action")
	private String upload_action;

	@Column(name = "isuploaded")
	private Boolean isuploaded;

	@Column(name = "ismapped")
	private Boolean ismapped = false;

	@Column(name = "jd_description", columnDefinition = "TEXT")
	private String jd_description;

	@Column(name = "position_code")
	private String position_code;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<SupportingFiles> supporting_files;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@JoinColumn(name = "request_id")
	private BusinessCaseRequest request;

	public JDModel() {
		super();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getJd_code() {
		return jd_code;
	}

	public void setJd_code(String jd_code) {
		this.jd_code = jd_code;
	}

	public String getJd_role() {
		return jd_role;
	}

	public void setJd_role(String jd_role) {
		this.jd_role = jd_role;
	}

	public String getUpload_action() {
		return upload_action;
	}

	public void setUpload_action(String upload_action) {
		this.upload_action = upload_action;
	}

	public Boolean getIsuploaded() {
		return isuploaded;
	}

	public void setIsuploaded(Boolean isuploaded) {
		this.isuploaded = isuploaded;
	}

	public String getJd_description() {
		return jd_description;
	}

	public void setJd_description(String jd_description) {
		this.jd_description = jd_description;
	}

	public String getPosition_code() {
		return position_code;
	}

	public void setPosition_code(String position_code) {
		this.position_code = position_code;
	}

	public List<SupportingFiles> getSupporting_files() {
		return supporting_files;
	}

	public void setSupporting_files(List<SupportingFiles> supporting_files) {
		this.supporting_files = supporting_files;
	}

	public BusinessCaseRequest getRequest() {
		return request;
	}

	public void setRequest(BusinessCaseRequest request) {
		this.request = request;
	}

	public Boolean getIsmapped() {
		return ismapped;
	}

	public void setIsmapped(Boolean ismapped) {
		this.ismapped = ismapped;
	}

}

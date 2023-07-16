package com.intelizign.dmgcc.models.businesscasemodels;

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

import com.fasterxml.jackson.annotation.JsonProperty;
import com.intelizign.dmgcc.request.SupportingFiles;

@Entity
@Table(name = "biz_case_approval")
public class BusinessApprovalsModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, updatable = false)
	private long id;
	
	@Column(name = "short_id")
	private String short_id;
	
	@Column(name = "approve_type")
	private String approve_type;

	@Column(name = "approve_sequence")
	private Boolean approve_sequence;
	
	@Column(name = "sequence_level")
	private Integer sequence_level;
	
	@Column(name = "approver_name")
	private String approver_name;
	
	@Column(name = "approver_email")
	private String approver_email;
	
	@Column(name = "approver_description")
	private String approver_description;
	
	@Column(name = "approve_token")
	private String approve_token;
	
	@Column(name = "email_status")
	private String email_status;
	
	@Column(name = "request_date")
	private LocalDateTime request_date;
	
	@Column(name = "approved_date")
	private LocalDateTime approved_date;
	
	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<SupportingFiles> supporting_files;
	
	
	@Column(name = "status")
	private Boolean status;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@JoinColumn(name = "request_id")
	private BusinessCaseRequest request;
	
	
	public String getApprove_token() {
		return approve_token;
	}

	public void setApprove_token(String approve_token) {
		this.approve_token = approve_token;
	}
	
	public String getEmail_status() {
		return email_status;
	}

	public void setEmail_status(String email_status) {
		this.email_status = email_status;
	}

	public Boolean getApprove_sequence() {
		return approve_sequence;
	}

	public void setApprove_sequence(Boolean approve_sequence) {
		this.approve_sequence = approve_sequence;
	}

	public LocalDateTime getRequest_date() {
		return request_date;
	}

	public void setRequest_date(LocalDateTime request_date) {
		this.request_date = request_date;
	}

	public Integer getSequence_level() {
		return sequence_level;
	}

	public void setSequence_level(Integer sequence_level) {
		this.sequence_level = sequence_level;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getShort_id() {
		return short_id;
	}

	public void setShort_id(String short_id) {
		this.short_id = short_id;
	}

	public String getApprove_type() {
		return approve_type;
	}

	public void setApprove_type(String approve_type) {
		this.approve_type = approve_type;
	}

	public String getApprover_name() {
		return approver_name;
	}

	public void setApprover_name(String approver_name) {
		this.approver_name = approver_name;
	}

	public String getApprover_email() {
		return approver_email;
	}

	public void setApprover_email(String approver_email) {
		this.approver_email = approver_email;
	}

	public String getApprover_description() {
		return approver_description;
	}

	public void setApprover_description(String approver_description) {
		this.approver_description = approver_description;
	}

	public List<SupportingFiles> getSupporting_files() {
		return supporting_files;
	}

	public void setSupporting_files(List<SupportingFiles> supporting_files) {
		this.supporting_files = supporting_files;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

	public BusinessCaseRequest getRequest() {
		return request;
	}

	public void setRequest(BusinessCaseRequest request) {
		this.request = request;
	}

	public LocalDateTime getApproved_date() {
		return approved_date;
	}

	public void setApproved_date(LocalDateTime approved_date) {
		this.approved_date = approved_date;
	}
	
	
}

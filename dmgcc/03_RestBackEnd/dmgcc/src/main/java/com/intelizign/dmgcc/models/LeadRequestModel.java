package com.intelizign.dmgcc.models;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;
import org.hibernate.envers.Audited;
import org.hibernate.envers.NotAudited;
import org.hibernate.validator.constraints.Email;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.intelizign.dmgcc.models.businesscasemodels.BusinessCaseRequest;
import com.intelizign.dmgcc.request.SupportingFiles;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;

@Entity
@Audited(withModifiedFlag = true)
@Table(name = "Lead_Biz_Request")
@TypeDefs({ @TypeDef(name = "jsonb", typeClass = JsonBinaryType.class), })
public class LeadRequestModel implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, updatable = false)
	private long id;

	@Column(name = "request_date")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate request_date;

	@Column(name = "service_receiver_short_id")
	private String service_receiver_short_id;

	@Column(name = "service_receiver_contact_name")
	private String service_receiver_contact_name;

	@Column(name = "service_receiver_email_id")
	@Email(message = "Please provide a valid e-mail")
	private String service_receiver_email_id;

	@Column(name = "service_receiver_entity")
	private String service_receiver_entity;

	@Column(name = "service_receiver_department")
	private String service_receiver_department;

	@Column(name = "service_receiver_cost_center")
	private String service_receiver_cost_center;

	@Column(name = "project_name")
	private String project_name;

	@Column(name = "short_description")
	private String short_description;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<SupportingFiles> supporting_files;

	@Column(name = "isasign")
	private Boolean isasign;

	@Column(name = "service_provider_short_id")
	private String service_provider_short_id;

	@Column(name = "service_provider_contact_name")
	private String service_provider_contact_name;

	@Column(name = "service_provider_email_id")
	@Email(message = "Please provide a valid e-mail")
	private String service_provider_email_id;

	@Column(name = "service_provider_department")
	private String service_provider_department;

	@Column(name = "service_provider_cost_center")
	private String service_provider_cost_center;

	@Column(name = "create_date")
	private LocalDateTime create_date;

	@Column(name = "active")
	private Boolean active;

	@Column(name = "category_name")
	private String category_name;

	@Column(name = "category_status")
	private String category_status;

	@Column(name = "bizcasecreated")
	private Boolean bizcasecreated = false;

	@Column(name = "bizratecard")
	private Boolean bizratecard;

	@NotAudited
	@OneToMany(mappedBy = "lead", cascade = CascadeType.ALL)
	private Set<LeadConversionModel> leadconversionreport = new HashSet<>();

	@NotAudited
	@OneToOne(mappedBy = "lead", cascade = CascadeType.ALL)
	@JsonManagedReference
	private BusinessCaseRequest biz_id;

	public LeadRequestModel() {
	}

	public Boolean getBizcasecreated() {
		return bizcasecreated;
	}

	public void setBizcasecreated(Boolean bizcasecreated) {
		this.bizcasecreated = bizcasecreated;
	}

	public BusinessCaseRequest getBiz_id() {
		return biz_id;
	}

	public void setBiz_id(BusinessCaseRequest biz_id) {
		this.biz_id = biz_id;
	}

	public Boolean getBizratecard() {
		return bizratecard;
	}

	public void setBizratecard(Boolean bizratecard) {
		this.bizratecard = bizratecard;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Set<LeadConversionModel> getLeadconversionreport() {
		return leadconversionreport;
	}

	public void setLeadconversionreport(Set<LeadConversionModel> leadconversionreport) {
		this.leadconversionreport = leadconversionreport;
	}

	public LocalDateTime getCreate_date() {
		return create_date;
	}

	public void setCreate_date(LocalDateTime create_date) {
		this.create_date = create_date;
	}

	public String getService_receiver_cost_center() {
		return service_receiver_cost_center;
	}

	public void setService_receiver_cost_center(String service_receiver_cost_center) {
		this.service_receiver_cost_center = service_receiver_cost_center;
	}

	public String getService_provider_cost_center() {
		return service_provider_cost_center;
	}

	public void setService_provider_cost_center(String service_provider_cost_center) {
		this.service_provider_cost_center = service_provider_cost_center;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public LocalDate getRequest_date() {
		return request_date;
	}

	public void setRequest_date(LocalDate request_date) {
		this.request_date = request_date;
	}

	public String getService_receiver_contact_name() {
		return service_receiver_contact_name;
	}

	public void setService_receiver_contact_name(String service_receiver_contact_name) {
		this.service_receiver_contact_name = service_receiver_contact_name;
	}

	public String getService_receiver_email_id() {
		return service_receiver_email_id;
	}

	public void setService_receiver_email_id(String service_receiver_email_id) {
		this.service_receiver_email_id = service_receiver_email_id;
	}

	public String getService_receiver_entity() {
		return service_receiver_entity;
	}

	public void setService_receiver_entity(String service_receiver_entity) {
		this.service_receiver_entity = service_receiver_entity;
	}

	public String getProject_name() {
		return project_name;
	}

	public void setProject_name(String project_name) {
		this.project_name = project_name;
	}

	public String getShort_description() {
		return short_description;
	}

	public void setShort_description(String short_description) {
		this.short_description = short_description;
	}

	public List<SupportingFiles> getSupporting_files() {
		return supporting_files;
	}

	public void setSupporting_files(List<SupportingFiles> supporting_files) {
		this.supporting_files = supporting_files;
	}

	public String getService_provider_contact_name() {
		return service_provider_contact_name;
	}

	public void setService_provider_contact_name(String service_provider_contact_name) {
		this.service_provider_contact_name = service_provider_contact_name;
	}

	public String getService_provider_email_id() {
		return service_provider_email_id;
	}

	public void setService_provider_email_id(String service_provider_email_id) {
		this.service_provider_email_id = service_provider_email_id;
	}

	public String getService_receiver_department() {
		return service_receiver_department;
	}

	public void setService_receiver_department(String service_receiver_department) {
		this.service_receiver_department = service_receiver_department;
	}

	public String getService_provider_department() {
		return service_provider_department;
	}

	public void setService_provider_department(String service_provider_department) {
		this.service_provider_department = service_provider_department;
	}

	public String getService_receiver_short_id() {
		return service_receiver_short_id;
	}

	public void setService_receiver_short_id(String service_receiver_short_id) {
		this.service_receiver_short_id = service_receiver_short_id;
	}

	public String getService_provider_short_id() {
		return service_provider_short_id;
	}

	public void setService_provider_short_id(String service_provider_short_id) {
		this.service_provider_short_id = service_provider_short_id;
	}

	public Boolean getIsasign() {
		return isasign;
	}

	public void setIsasign(Boolean isasign) {
		this.isasign = isasign;
	}

	public String getCategory_name() {
		return category_name;
	}

	public void setCategory_name(String category_name) {
		this.category_name = category_name;
	}

	public String getCategory_status() {
		return category_status;
	}

	public void setCategory_status(String category_status) {
		this.category_status = category_status;
	}

}

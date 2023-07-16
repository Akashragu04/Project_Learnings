package com.intelizign.dmgcc.models;

import java.util.ArrayList;
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
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonView;
import com.intelizign.dmgcc.models.businesscasemodels.BusinessCaseRequest;
import com.intelizign.dmgcc.pojoclass.othermaster.IOMapping;
import com.intelizign.dmgcc.utils.CustomFields;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;

@Entity
@Table(name = "project_details")
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
public class ProjectModel {

	@JsonView(CustomFields.MyResponseViews.class)
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, updatable = false)
	private long id;

	@JsonView(CustomFields.MyResponseViews.class)
	@Column(name = "project_name", nullable = false, updatable = false)
	private String project_name;

	@JsonView(CustomFields.MyResponseViews.class)
	@Column(name = "project_id", nullable = false, updatable = false)
	private String project_id;

	@Column(name = "service_provider_shortid")
	private String service_provider_shortid;

	@Column(name = "service_receiver_shortid")
	private String service_receiver_shortid;

	@Column(name = "service_provider")
	private String service_provider;

	@JsonView(CustomFields.MyResponseViews.class)
	@Column(name = "service_receiver")
	private String service_receiver;

	@Column(name = "currency")
	private String currency;

	@Transient
	private Double billable_hours;

	@Column(name = "allocatable_resource")
	private String allocatable_resource;

	@Column(name = "allocatable_resource_progress")
	private String allocatable_resource_progress;

	@JsonView(CustomFields.MyResponseViews.class)
	@Column(name = "total_fte_count")
	private long total_fte_count = 0;

	@Column(name = "working_hours")
	private long working_hours;

	@Column(name = "sla_value")
	private Long sla_value = (long) 0;

	@Column(name = "invoice_value")
	private Long invoice_value = (long) 0;

	@Column(name = "invoice_persentage")
	private Double invoice_persentage = 0.0;

	@Column(name = "invoice_status")
	private String invoice_status;

	@Column(name = "payment_value")
	private Long payment_value = (long) 0;

	@Column(name = "payment_persentage")
	private Double payment_persentage = 0.0;

	@Column(name = "status")
	private String status = "Active";

	@Column(name = "active")
	private String active;

	@Column(name = "cost_center")
	private String cost_center;

	@Column(name = "is_active")
	private Boolean isActive = true;

	@Column(name = "is_new")
	private Boolean is_new = true;

	// @JsonView(CustomFields.MyResponseViews.class)
	@OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
	@Column(nullable = true)
	private Set<SLAModel> sla = new HashSet<>();

	@OneToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "biz_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonBackReference
	private BusinessCaseRequest bizcase;

	@JsonView(CustomFields.MyResponseViews.class)
	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<IOMapping> IoMapping = new ArrayList<>();

	@Column(name = "ioStatus")
	private String ioStatus;

	@JsonView(CustomFields.MyResponseViews.class)
	@Column(name = "activeIoNumber")
	private String activeIoNumber;

	@Column(name = "activeIoYear")
	private String activeIoYear;

	@Column(name = "IoMappingKey")
	private String IoMappingKey;

	@Column(name = "workinghrs")
	private Double workinghrs;

	public List<IOMapping> getIoMapping() {
		return IoMapping;
	}

	public void setIoMapping(List<IOMapping> ioMapping) {
		IoMapping = ioMapping;
	}

	public String getIoStatus() {
		return ioStatus;
	}

	public void setIoStatus(String ioStatus) {
		this.ioStatus = ioStatus;
	}

	public String getActiveIoNumber() {
		return activeIoNumber;
	}

	public void setActiveIoNumber(String activeIoNumber) {
		this.activeIoNumber = activeIoNumber;
	}

	public String getActiveIoYear() {
		return activeIoYear;
	}

	public void setActiveIoYear(String activeIoYear) {
		this.activeIoYear = activeIoYear;
	}

	public String getIoMappingKey() {
		return IoMappingKey;
	}

	public void setIoMappingKey(String ioMappingKey) {
		IoMappingKey = ioMappingKey;
	}

	public String getService_provider_shortid() {
		return service_provider_shortid;
	}

	public void setService_provider_shortid(String service_provider_shortid) {
		this.service_provider_shortid = service_provider_shortid;
	}

	public String getService_receiver_shortid() {
		return service_receiver_shortid;
	}

	public void setService_receiver_shortid(String service_receiver_shortid) {
		this.service_receiver_shortid = service_receiver_shortid;
	}

	public ProjectModel() {
		super();
	}

	public BusinessCaseRequest getBizcase() {
		return bizcase;
	}

	public void setBizcase(BusinessCaseRequest bizcase) {
		this.bizcase = bizcase;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getProject_name() {
		return project_name;
	}

	public void setProject_name(String project_name) {
		this.project_name = project_name;
	}

	public String getProject_id() {
		return project_id;
	}

	public void setProject_id(String project_id) {
		this.project_id = project_id;
	}

	public String getService_provider() {
		return service_provider;
	}

	public void setService_provider(String service_provider) {
		this.service_provider = service_provider;
	}

	public String getService_receiver() {
		return service_receiver;
	}

	public void setService_receiver(String service_receiver) {
		this.service_receiver = service_receiver;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public String getInvoice_status() {
		return invoice_status;
	}

	public void setInvoice_status(String invoice_status) {
		this.invoice_status = invoice_status;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Set<SLAModel> getSla() {
		return sla;
	}

	public void setSla(Set<SLAModel> sla) {
		this.sla = sla;
	}

	public Long getSla_value() {
		return sla_value;
	}

	public void setSla_value(Long sla_value) {
		this.sla_value = sla_value;
	}

	public Long getInvoice_value() {
		return invoice_value;
	}

	public void setInvoice_value(Long invoice_value) {
		this.invoice_value = invoice_value;
	}

	public Double getInvoice_persentage() {
		return invoice_persentage;
	}

	public void setInvoice_persentage(Double invoice_persentage) {
		this.invoice_persentage = invoice_persentage;
	}

	public Long getPayment_value() {
		return payment_value;
	}

	public void setPayment_value(Long payment_value) {
		this.payment_value = payment_value;
	}

	public Double getPayment_persentage() {
		return payment_persentage;
	}

	public void setPayment_persentage(Double payment_persentage) {
		this.payment_persentage = payment_persentage;
	}

	public String getActive() {
		return active;
	}

	public void setActive(String active) {
		this.active = active;
	}

	public Boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}

	public Boolean getIs_new() {
		return is_new;
	}

	public void setIs_new(Boolean is_new) {
		this.is_new = is_new;
	}

	public String getCost_center() {
		return cost_center;
	}

	public void setCost_center(String cost_center) {
		this.cost_center = cost_center;
	}

	public Double getWorkinghrs() {
		return workinghrs;
	}

	public void setWorkinghrs(Double workinghrs) {
		this.workinghrs = workinghrs;
	}

	public String getAllocatable_resource() {
		return allocatable_resource;
	}

	public void setAllocatable_resource(String allocatable_resource) {
		this.allocatable_resource = allocatable_resource;
	}

	public long getTotal_fte_count() {
		return total_fte_count;
	}

	public void setTotal_fte_count(long total_fte_count) {
		this.total_fte_count = total_fte_count;
	}

	public long getWorking_hours() {
		return working_hours;
	}

	public void setWorking_hours(long working_hours) {
		this.working_hours = working_hours;
	}

	public String getAllocatable_resource_progress() {
		return allocatable_resource_progress;
	}

	public void setAllocatable_resource_progress(String allocatable_resource_progress) {
		this.allocatable_resource_progress = allocatable_resource_progress;
	}

	public Double getBillable_hours() {
		return billable_hours;
	}

	public void setBillable_hours(Double billable_hours) {
		this.billable_hours = billable_hours;
	}

}

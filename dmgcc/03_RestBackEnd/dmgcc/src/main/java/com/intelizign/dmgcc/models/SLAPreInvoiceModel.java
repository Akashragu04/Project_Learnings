package com.intelizign.dmgcc.models;

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

import com.fasterxml.jackson.annotation.JsonProperty;
import com.intelizign.dmgcc.pojoclass.SLAContacts;
import com.intelizign.dmgcc.pojoclass.SLAPreInvoiceTariffSheet;
import com.intelizign.dmgcc.request.SupportingFiles;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;

@Entity
@Table(name = "sla_pre_invoice")
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
public class SLAPreInvoiceModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, updatable = false)
	private Long id;

	@Column(name = "slaid")
	private String slaid;

	@Column(name = "slaname")
	private String slaname;

	@Column(name = "preinvoiceid")
	private String preinvoiceid;

	@Column(name = "preinvoice_date")
	private String preinvoice_date;

	@Column(name = "team")
	private String team;

	@Column(name = "customer")
	private String customer;

	@Column(name = "project_name")
	private String project_name;

	@Column(name = "cost_center")
	private String cost_center;

	@Column(name = "currency")
	private String currency;

	@Column(name = "service_description")
	private String service_description;

	@Column(name = "address")
	private String address;

	@Column(name = "start_date")
	private String start_date;

	@Column(name = "end_date")
	private String end_date;

	@Column(name = "billing_cycle")
	private String billing_cycle;

	@Column(name = "po_number")
	private String po_number;

	@Column(name = "date_of_service")
	private String date_of_service;

	@Column(name = "remarks")
	private String remarks;

	@Column(name = "total_budget")
	private Long total_budget = (long) 0;

	@Column(name = "preinvoice_cycle")
	private Integer preinvoice_cycle;

	@Column(name = "preinvoice_period")
	private String preinvoice_period;

	@Column(name = "FTE")
	private String FTE;

	@Column(name = "status")
	private String status;

	@Column(name = "active")
	private Boolean active = false;

	@Column(name = "is_invoiced")
	private Boolean is_invoiced = false;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<SLAPreInvoiceTariffSheet> sla_preinvoice_tariffsheet;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<SupportingFiles> attachments;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<SLAContacts> sla_contacts;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "sla_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private SLAModel sla;
	
	@Column(name="created_date")
	private LocalDateTime created_on;

	public SLAPreInvoiceModel() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPreinvoiceid() {
		return preinvoiceid;
	}

	public void setPreinvoiceid(String preinvoiceid) {
		this.preinvoiceid = preinvoiceid;
	}

	public String getPreinvoice_date() {
		return preinvoice_date;
	}

	public void setPreinvoice_date(String preinvoice_date) {
		this.preinvoice_date = preinvoice_date;
	}

	public String getTeam() {
		return team;
	}

	public void setTeam(String team) {
		this.team = team;
	}

	public String getSlaid() {
		return slaid;
	}

	public void setSlaid(String slaid) {
		this.slaid = slaid;
	}

	public String getCustomer() {
		return customer;
	}

	public void setCustomer(String customer) {
		this.customer = customer;
	}

	public String getProject_name() {
		return project_name;
	}

	public void setProject_name(String project_name) {
		this.project_name = project_name;
	}

	public String getCost_center() {
		return cost_center;
	}

	public void setCost_center(String cost_center) {
		this.cost_center = cost_center;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public String getService_description() {
		return service_description;
	}

	public void setService_description(String service_description) {
		this.service_description = service_description;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getStart_date() {
		return start_date;
	}

	public void setStart_date(String start_date) {
		this.start_date = start_date;
	}

	public String getEnd_date() {
		return end_date;
	}

	public void setEnd_date(String end_date) {
		this.end_date = end_date;
	}

	public String getBilling_cycle() {
		return billing_cycle;
	}

	public void setBilling_cycle(String billing_cycle) {
		this.billing_cycle = billing_cycle;
	}

	public String getPo_number() {
		return po_number;
	}

	public void setPo_number(String po_number) {
		this.po_number = po_number;
	}

	public String getDate_of_service() {
		return date_of_service;
	}

	public void setDate_of_service(String date_of_service) {
		this.date_of_service = date_of_service;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public Long getTotal_budget() {
		return total_budget;
	}

	public void setTotal_budget(Long total_budget) {
		this.total_budget = total_budget;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public List<SLAPreInvoiceTariffSheet> getSla_preinvoice_tariffsheet() {
		return sla_preinvoice_tariffsheet;
	}

	public void setSla_preinvoice_tariffsheet(List<SLAPreInvoiceTariffSheet> sla_preinvoice_tariffsheet) {
		this.sla_preinvoice_tariffsheet = sla_preinvoice_tariffsheet;
	}

	public List<SupportingFiles> getAttachments() {
		return attachments;
	}

	public void setAttachments(List<SupportingFiles> attachments) {
		this.attachments = attachments;
	}

	public SLAModel getSla() {
		return sla;
	}

	public void setSla(SLAModel sla) {
		this.sla = sla;
	}

	public String getFTE() {
		return FTE;
	}

	public void setFTE(String fTE) {
		FTE = fTE;
	}

	public Integer getPreinvoice_cycle() {
		return preinvoice_cycle;
	}

	public void setPreinvoice_cycle(Integer preinvoice_cycle) {
		this.preinvoice_cycle = preinvoice_cycle;
	}

	public String getPreinvoice_period() {
		return preinvoice_period;
	}

	public void setPreinvoice_period(String preinvoice_period) {
		this.preinvoice_period = preinvoice_period;
	}

	public Boolean getIs_invoiced() {
		return is_invoiced;
	}

	public void setIs_invoiced(Boolean is_invoiced) {
		this.is_invoiced = is_invoiced;
	}

	public List<SLAContacts> getSla_contacts() {
		return sla_contacts;
	}

	public void setSla_contacts(List<SLAContacts> sla_contacts) {
		this.sla_contacts = sla_contacts;
	}

	public String getSlaname() {
		return slaname;
	}

	public void setSlaname(String slaname) {
		this.slaname = slaname;
	}

	public LocalDateTime getCreated_on() {
		return created_on;
	}

	public void setCreated_on(LocalDateTime created_on) {
		this.created_on = created_on;
	}

	
}

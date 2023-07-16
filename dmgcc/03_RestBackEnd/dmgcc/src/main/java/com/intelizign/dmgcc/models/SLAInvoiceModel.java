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
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.intelizign.dmgcc.pojoclass.SLAPreInvoiceTariffSheet;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;

@Entity
@Table(name = "sla_invoice")
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
public class SLAInvoiceModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, updatable = false)
	private long id;

	@Column(name = "invoice_id")
	private String invoice_id;

	@Column(name = "slaid")
	private String slaid;

	@Column(name = "preinvoice_id")
	private String preinvoice_id;

	@Column(name = "team")
	private String team;

	@Column(name = "customer")
	private String customer;

	@Column(name = "project_name")
	private String project_name;

	@Column(name = "date_of_service")
	private String date_of_service;

	@Column(name = "pre_invoice_date")
	private String pre_invoice_date;

	@Column(name = "sale_order")
	private String sale_order;

	@Column(name = "currency")
	private String currency;

	@Column(name = "invoice_value")
	private String invoice_value;

	@Column(name = "remarks")
	private String remarks;

	@Column(name = "user_id")
	private String user_id;

	@Column(name = "invoice_date")
	private String invoice_date;

	@Column(name = "invoice_no")
	private String invoice_no;

	@Column(name = "gst_invoice_no")
	private String gst_invoice_no;

	@Column(name = "xe_rate")
	private String xe_rate;

	@Column(name = "total_cost")
	private Double total_cost;

	@Column(name = "status")
	private String status = "";

	@Column(name = "active")
	private Boolean active;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<SLAPreInvoiceTariffSheet> sla_preinvoice_tariffsheet;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "sla_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private SLAModel sla;

	@OneToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "slapreinvoice_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private SLAPreInvoiceModel slapreinvoice;

	public SLAInvoiceModel() {
		super();
	}

	public String getInvoice_id() {
		return invoice_id;
	}

	public void setInvoice_id(String invoice_id) {
		this.invoice_id = invoice_id;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTeam() {
		return team;
	}

	public void setTeam(String team) {
		this.team = team;
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

	public String getDate_of_service() {
		return date_of_service;
	}

	public void setDate_of_service(String date_of_service) {
		this.date_of_service = date_of_service;
	}

	public String getSlaid() {
		return slaid;
	}

	public void setSlaid(String slaid) {
		this.slaid = slaid;
	}

	public String getPre_invoice_date() {
		return pre_invoice_date;
	}

	public void setPre_invoice_date(String pre_invoice_date) {
		this.pre_invoice_date = pre_invoice_date;
	}

	public String getSale_order() {
		return sale_order;
	}

	public void setSale_order(String sale_order) {
		this.sale_order = sale_order;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public String getInvoice_value() {
		return invoice_value;
	}

	public void setInvoice_value(String invoice_value) {
		this.invoice_value = invoice_value;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getInvoice_date() {
		return invoice_date;
	}

	public void setInvoice_date(String invoice_date) {
		this.invoice_date = invoice_date;
	}

	public String getInvoice_no() {
		return invoice_no;
	}

	public void setInvoice_no(String invoice_no) {
		this.invoice_no = invoice_no;
	}

	public String getGst_invoice_no() {
		return gst_invoice_no;
	}

	public void setGst_invoice_no(String gst_invoice_no) {
		this.gst_invoice_no = gst_invoice_no;
	}

	public String getXe_rate() {
		return xe_rate;
	}

	public void setXe_rate(String xe_rate) {
		this.xe_rate = xe_rate;
	}

	public Double getTotal_cost() {
		return total_cost;
	}

	public void setTotal_cost(Double total_cost) {
		this.total_cost = total_cost;
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

	public SLAModel getSla() {
		return sla;
	}

	public void setSla(SLAModel sla) {
		this.sla = sla;
	}

	public SLAPreInvoiceModel getSlapreinvoice() {
		return slapreinvoice;
	}

	public void setSlapreinvoice(SLAPreInvoiceModel slapreinvoice) {
		this.slapreinvoice = slapreinvoice;
	}

	public String getPreinvoice_id() {
		return preinvoice_id;
	}

	public void setPreinvoice_id(String preinvoice_id) {
		this.preinvoice_id = preinvoice_id;
	}

}

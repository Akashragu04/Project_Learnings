package com.intelizign.dmgcc.models;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "sla_approval")
public class SLAApproval {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, updatable = false)
	private Long id;

	@Column(name = "short_name")
	private String short_name;

	@Column(name = "name")
	private String name;

	@Column(name = "email")
	private String email;

	@Column(name = "customer_type")
	private String customer_type;

	@Column(name = "sla_token")
	private String sla_token;

	@Column(name = "mail_status")
	private String mail_status;

	@Column(name = "is_primary")
	private Boolean is_primary;

	@Column(name = "key_person")
	private Boolean key_person;

	@Column(name = "is_pre_invoice")
	private Boolean is_pre_invoice;

	@Column(name = "is_sla")
	private Boolean is_sla;

	@Column(name = "preinvoice_approve")
	private Boolean preinvoice_approve = false;

	@Column(name = "sla_approve")
	private Boolean sla_approve = false;

	@Column(name = "sla_approve_date")
	private String sla_approve_date;
	
	@Column(name = "preinvoice_approved_date")
	private String preinvoice_approved_date;
		
	@ManyToOne(fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "slapreinvoice_id", nullable = true)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private SLAPreInvoiceModel slapreinvoice;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "sla_id", nullable = false)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private SLAModel sla;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getShort_name() {
		return short_name;
	}

	public void setShort_name(String short_name) {
		this.short_name = short_name;
	}

	public String getSla_approve_date() {
		return sla_approve_date;
	}

	public void setSla_approve_date(String sla_approve_date) {
		this.sla_approve_date = sla_approve_date;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getCustomer_type() {
		return customer_type;
	}

	public void setCustomer_type(String customer_type) {
		this.customer_type = customer_type;
	}

	public String getSla_token() {
		return sla_token;
	}

	public void setSla_token(String sla_token) {
		this.sla_token = sla_token;
	}

	public String getMail_status() {
		return mail_status;
	}

	public void setMail_status(String mail_status) {
		this.mail_status = mail_status;
	}

	public Boolean getIs_primary() {
		return is_primary;
	}

	public void setIs_primary(Boolean is_primary) {
		this.is_primary = is_primary;
	}

	public Boolean getKey_person() {
		return key_person;
	}

	public void setKey_person(Boolean key_person) {
		this.key_person = key_person;
	}

	public Boolean getIs_pre_invoice() {
		return is_pre_invoice;
	}

	public void setIs_pre_invoice(Boolean is_pre_invoice) {
		this.is_pre_invoice = is_pre_invoice;
	}

	public Boolean getIs_sla() {
		return is_sla;
	}

	public void setIs_sla(Boolean is_sla) {
		this.is_sla = is_sla;
	}

	public Boolean getPreinvoice_approve() {
		return preinvoice_approve;
	}

	public void setPreinvoice_approve(Boolean preinvoice_approve) {
		this.preinvoice_approve = preinvoice_approve;
	}

	public Boolean getSla_approve() {
		return sla_approve;
	}

	public void setSla_approve(Boolean sla_approve) {
		this.sla_approve = sla_approve;
	}

	public SLAPreInvoiceModel getSlapreinvoice() {
		return slapreinvoice;
	}

	public void setSlapreinvoice(SLAPreInvoiceModel slapreinvoice) {
		this.slapreinvoice = slapreinvoice;
	}

	public SLAModel getSla() {
		return sla;
	}

	public void setSla(SLAModel sla) {
		this.sla = sla;
	}

	public SLAApproval() {
	}

	public String getPreinvoice_approved_date() {
		return preinvoice_approved_date;
	}

	public void setPreinvoice_approved_date(String preinvoice_approved_date) {
		this.preinvoice_approved_date = preinvoice_approved_date;
	}

	
}

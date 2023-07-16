package com.intelizign.dmgcc.request;

import java.util.List;

import com.intelizign.dmgcc.pojoclass.SLAPreInvoiceTariffSheet;

public class SLAPreInvoiceRequest {

	private Long id;

	private String slaid;

	private String customer;

	private String project_name;

	private String cost_center;

	private String currency;

	private String service_description;

	private String address;

	private String start_date;

	private String end_date;

	private String billing_cycle;

	private String po_number;

	private String date_of_service;

	private String remarks;

	private Long total_budget;

	private String FTE;

	private List<SLAPreInvoiceTariffSheet> sla_preinvoice_tariffsheet;

	private List<SupportingFiles> attachments;

	public SLAPreInvoiceRequest() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public String getFTE() {
		return FTE;
	}

	public void setFTE(String fTE) {
		FTE = fTE;
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

}

package com.intelizign.dmgcc.models;

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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;
import com.intelizign.dmgcc.pojoclass.RevenueCostCenterAllocation;
import com.intelizign.dmgcc.pojoclass.SLAContacts;
import com.intelizign.dmgcc.pojoclass.SLAIO;
import com.intelizign.dmgcc.pojoclass.SLAPO;
import com.intelizign.dmgcc.pojoclass.SLATariffSheet;
import com.intelizign.dmgcc.pojoclass.SLAcycle;
import com.intelizign.dmgcc.request.SupportingFiles;
import com.intelizign.dmgcc.utils.CustomFields;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;

@Entity
@Table(name = "sla_details")
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
public class SLAModel {

	@JsonView(CustomFields.MyResponseViews.class)
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, updatable = false)
	private long id;

	@JsonView(CustomFields.MyResponseViews.class)
	@Column(name = "slaid")
	private String slaid;

	@JsonView(CustomFields.MyResponseViews.class)
	@Column(name = "slaname")
	private String slaname;

	@Column(name = "customer_company")
	private String customer_company;

	@Column(name = "customer_name")
	private String customer_name;

	@Column(name = "customer_entity_code")
	private String customer_entity_code;

	@Column(name = "customer_country")
	private String customer_country;

	@Column(name = "customer_address", columnDefinition = "TEXT")
	private String customer_address;

	@Column(name = "provider_company")
	private String provider_company = "Daimler India Commercial Vehicles Pvt. Ltd";

	@Column(name = "provider_address", columnDefinition = "TEXT")
	private String provider_address = "SIPCOT Industrial Growth Centre, Oragadam, Mathur Post, Sriperumbudur Taluk, Kancheepuram District, ";

	@Column(name = "provider_postal_code")
	private String provider_postal_code = "602105 Chennai, India";

	@Column(name = "provider_name")
	private String provider_name;

	@JsonView(CustomFields.MyResponseViews.class)
	@Column(name = "project_name")
	private String project_name;

	@JsonView(CustomFields.MyResponseViews.class)
	@Column(name = "project_code")
	private String project_code;

	@Column(name = "team")
	private String team;

	@Column(name = "provider_cost_center")
	private String provider_cost_center;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<RevenueCostCenterAllocation> revenue_cost_center;

	@Column(name = "currency")
	private String currency;

	@Column(name = "start_date")
	private String start_date;

	@Column(name = "end_date")
	private String end_date;

	@Column(name = "effective_date")
	private String effective_date;

	@Column(name = "contract_status")
	private String contract_status;

	@Column(name = "contract_option")
	private String contract_option;

	@Column(name = "customer_cost_center")
	private String customer_cost_center;

	@Column(name = "customer_cost_center_manager")
	private String customer_cost_center_manager;

	@Column(name = "organization_type")
	private String organization_type;

	@Column(name = "service_description", columnDefinition = "TEXT")
	private String service_description;

	@Column(name = "billing_cycle")
	private String billing_cycle;

	@Column(name = "markup_value")
	private Long markup_value;

	@Column(name = "idle_hours")
	private Double idle_hours = 0d;

	@Column(name = "total_budget")
	private Long total_budget;

	@Column(name = "capnitienable")
	private Boolean capnitienable;

	@Column(name = "taskenable")
	private Boolean taskenable;

	@Column(name = "last_invoice_date")
	private String last_invoice_date;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<SLATariffSheet> sla_tariffsheet;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<SLAIO> sla_io;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<SLAPO> sla_po;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<SLAContacts> sla_contacts;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<SupportingFiles> sla_terms_and_conditions;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<SupportingFiles> attachments;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private SupportingFiles sla_argeement_document;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private SupportingFiles sla_signed_argeement_document;

	@Column(name = "status")
	private String status;

	@Column(name = "is_active")
	private Boolean is_active = true;

	@Column(name = "active")
	private String active;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<SLAcycle> invoice_cycle;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "project_id")
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private ProjectModel project;

	@OneToMany(mappedBy = "sla", cascade = CascadeType.ALL)
	@Column(nullable = false)
	private Set<SLAPreInvoiceModel> slapreinvoice = new HashSet<>();

	@OneToMany(mappedBy = "sla", cascade = CascadeType.ALL)
	@Column(nullable = false)
	private Set<SLAInvoiceModel> slainvoice = new HashSet<>();

	@JsonView(CustomFields.MyResponseViews.class)
	@OneToMany(mappedBy = "sla", cascade = CascadeType.ALL)
	@Column(nullable = false)
	private Set<ResourceAllocationModel> resources = new HashSet<>();

	// Report Fields
	@Column(name = "invoice_value")
	private Long invoice_value;

	@Column(name = "invoice_status")
	private String invoice_status;

	@Column(name = "invoice_percentage")
	private Double invoice_percentage;

	@Column(name = "payments")
	private Long payments;

	@Column(name = "payments_percentage")
	private Double payments_percentage;
	
	@Column(name = "created_by")
	private String created_by;
	
	@Column(name = "is_c4dsla")
	private Boolean is_c4dsla = false;
	
	

	public SLAModel() {
	}

	public long getId() {
		return id;
	}

	public String getLast_invoice_date() {
		return last_invoice_date;
	}

	public void setLast_invoice_date(String last_invoice_date) {
		this.last_invoice_date = last_invoice_date;
	}

	public String getCustomer_company() {
		return customer_company;
	}

	public void setCustomer_company(String customer_company) {
		this.customer_company = customer_company;
	}

	public String getCustomer_address() {
		return customer_address;
	}

	public void setCustomer_address(String customer_address) {
		this.customer_address = customer_address;
	}

	public String getProvider_company() {
		return provider_company;
	}

	public void setProvider_company(String provider_company) {
		this.provider_company = provider_company;
	}

	public String getProvider_address() {
		return provider_address;
	}

	public void setProvider_address(String provider_address) {
		this.provider_address = provider_address;
	}

	public String getProvider_postal_code() {
		return provider_postal_code;
	}

	public void setProvider_postal_code(String provider_postal_code) {
		this.provider_postal_code = provider_postal_code;
	}

	public String getProvider_name() {
		return provider_name;
	}

	public void setProvider_name(String provider_name) {
		this.provider_name = provider_name;
	}

	public String getProvider_cost_center() {
		return provider_cost_center;
	}

	public void setProvider_cost_center(String provider_cost_center) {
		this.provider_cost_center = provider_cost_center;
	}

	public Long getMarkup_value() {
		return markup_value;
	}

	public void setMarkup_value(Long markup_value) {
		this.markup_value = markup_value;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Long getInvoice_value() {
		return invoice_value;
	}

	public void setInvoice_value(Long invoice_value) {
		this.invoice_value = invoice_value;
	}

	public Double getInvoice_percentage() {
		return invoice_percentage;
	}

	public void setInvoice_percentage(Double invoice_percentage) {
		this.invoice_percentage = invoice_percentage;
	}

	public Long getPayments() {
		return payments;
	}

	public void setPayments(Long payments) {
		this.payments = payments;
	}

	public Double getPayments_percentage() {
		return payments_percentage;
	}

	public void setPayments_percentage(Double payments_percentage) {
		this.payments_percentage = payments_percentage;
	}

	public String getProject_name() {
		return project_name;
	}

	public void setProject_name(String project_name) {
		this.project_name = project_name;
	}

	public String getProject_code() {
		return project_code;
	}

	public void setProject_code(String project_code) {
		this.project_code = project_code;
	}

	public String getTeam() {
		return team;
	}

	public void setTeam(String team) {
		this.team = team;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
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

	public String getEffective_date() {
		return effective_date;
	}

	public void setEffective_date(String effective_date) {
		this.effective_date = effective_date;
	}

	public String getContract_status() {
		return contract_status;
	}

	public void setContract_status(String contract_status) {
		this.contract_status = contract_status;
	}

	public String getContract_option() {
		return contract_option;
	}

	public void setContract_option(String contract_option) {
		this.contract_option = contract_option;
	}

	public String getCustomer_cost_center() {
		return customer_cost_center;
	}

	public void setCustomer_cost_center(String customer_cost_center) {
		this.customer_cost_center = customer_cost_center;
	}

	public String getCustomer_cost_center_manager() {
		return customer_cost_center_manager;
	}

	public void setCustomer_cost_center_manager(String customer_cost_center_manager) {
		this.customer_cost_center_manager = customer_cost_center_manager;
	}

	public String getOrganization_type() {
		return organization_type;
	}

	public void setOrganization_type(String organization_type) {
		this.organization_type = organization_type;
	}

	public String getService_description() {
		return service_description;
	}

	public void setService_description(String service_description) {
		this.service_description = service_description;
	}

	public String getBilling_cycle() {
		return billing_cycle;
	}

	public void setBilling_cycle(String billing_cycle) {
		this.billing_cycle = billing_cycle;
	}

	public Long getTotal_budget() {
		return total_budget;
	}

	public void setTotal_budget(Long total_budget) {
		this.total_budget = total_budget;
	}

	public List<SLAIO> getSla_io() {
		return sla_io;
	}

	public void setSla_io(List<SLAIO> sla_io) {
		this.sla_io = sla_io;
	}

	public List<SLAPO> getSla_po() {
		return sla_po;
	}

	public void setSla_po(List<SLAPO> sla_po) {
		this.sla_po = sla_po;
	}

	public List<SLAContacts> getSla_contacts() {
		return sla_contacts;
	}

	public void setSla_contacts(List<SLAContacts> sla_contacts) {
		this.sla_contacts = sla_contacts;
	}

	public List<SupportingFiles> getSla_terms_and_conditions() {
		return sla_terms_and_conditions;
	}

	public void setSla_terms_and_conditions(List<SupportingFiles> sla_terms_and_conditions) {
		this.sla_terms_and_conditions = sla_terms_and_conditions;
	}

	public List<SupportingFiles> getAttachments() {
		return attachments;
	}

	public void setAttachments(List<SupportingFiles> attachments) {
		this.attachments = attachments;
	}

	public Boolean getIs_active() {
		return is_active;
	}

	public void setIs_active(Boolean is_active) {
		this.is_active = is_active;
	}

	public String getActive() {
		return active;
	}

	public void setActive(String active) {
		this.active = active;
	}

	public ProjectModel getProject() {
		return project;
	}

	public void setProject(ProjectModel project) {
		this.project = project;
	}

	public SupportingFiles getSla_argeement_document() {
		return sla_argeement_document;
	}

	public void setSla_argeement_document(SupportingFiles sla_argeement_document) {
		this.sla_argeement_document = sla_argeement_document;
	}

	public SupportingFiles getSla_signed_argeement_document() {
		return sla_signed_argeement_document;
	}

	public void setSla_signed_argeement_document(SupportingFiles sla_signed_argeement_document) {
		this.sla_signed_argeement_document = sla_signed_argeement_document;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getSlaid() {
		return slaid;
	}

	public void setSlaid(String slaid) {
		this.slaid = slaid;
	}

	public List<SLATariffSheet> getSla_tariffsheet() {
		return sla_tariffsheet;
	}

	public void setSla_tariffsheet(List<SLATariffSheet> sla_tariffsheet) {
		this.sla_tariffsheet = sla_tariffsheet;
	}

	public Set<SLAPreInvoiceModel> getSlapreinvoice() {
		return slapreinvoice;
	}

	public Set<SLAInvoiceModel> getSlainvoice() {
		return slainvoice;
	}

	public void setSlainvoice(Set<SLAInvoiceModel> slainvoice) {
		this.slainvoice = slainvoice;
	}

	public void setSlapreinvoice(Set<SLAPreInvoiceModel> slapreinvoice) {
		this.slapreinvoice = slapreinvoice;
	}

	public Boolean getCapnitienable() {
		return capnitienable;
	}

	public void setCapnitienable(Boolean capnitienable) {
		this.capnitienable = capnitienable;
	}

	public Boolean getTaskenable() {
		return taskenable;
	}

	public void setTaskenable(Boolean taskenable) {
		this.taskenable = taskenable;
	}

	public Set<ResourceAllocationModel> getResources() {
		return resources;
	}

	public void setResources(Set<ResourceAllocationModel> resources) {
		this.resources = resources;
	}

	public String getSlaname() {
		return slaname;
	}

	public void setSlaname(String slaname) {
		this.slaname = slaname;
	}

	public List<SLAcycle> getInvoice_cycle() {
		return invoice_cycle;
	}

	public void setInvoice_cycle(List<SLAcycle> invoice_cycle) {
		this.invoice_cycle = invoice_cycle;
	}

	public String getInvoice_status() {
		return invoice_status;
	}

	public void setInvoice_status(String invoice_status) {
		this.invoice_status = invoice_status;
	}

	public String getCustomer_name() {
		return customer_name;
	}

	public void setCustomer_name(String customer_name) {
		this.customer_name = customer_name;
	}

	public List<RevenueCostCenterAllocation> getRevenue_cost_center() {
		return revenue_cost_center;
	}

	public void setRevenue_cost_center(List<RevenueCostCenterAllocation> revenue_cost_center) {
		this.revenue_cost_center = revenue_cost_center;
	}

	public Double getIdle_hours() {
		return idle_hours;
	}

	public void setIdle_hours(Double idle_hours) {
		this.idle_hours = idle_hours;
	}

	public String getCustomer_country() {
		return customer_country;
	}

	public void setCustomer_country(String customer_country) {
		this.customer_country = customer_country;
	}

	public String getCreated_by() {
		return created_by;
	}

	public void setCreated_by(String created_by) {
		this.created_by = created_by;
	}

	public Boolean getIs_c4dsla() {
		return is_c4dsla;
	}

	public void setIs_c4dsla(Boolean is_c4dsla) {
		this.is_c4dsla = is_c4dsla;
	}

	public String getCustomer_entity_code() {
		return customer_entity_code;
	}

	public void setCustomer_entity_code(String customer_entity_code) {
		this.customer_entity_code = customer_entity_code;
	}

	

	
}

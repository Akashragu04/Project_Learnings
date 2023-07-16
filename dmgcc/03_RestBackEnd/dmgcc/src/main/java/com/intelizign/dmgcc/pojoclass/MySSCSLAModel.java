package com.intelizign.dmgcc.pojoclass;

import java.util.List;

import com.intelizign.dmgcc.request.SupportingFiles;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MySSCSLAModel {

	private long id;

	private String slaid;

	private String slaname;

	private String customer_name;

	private String customer_company;

	private String customer_entity_code;

	private String customer_country;

	private String customer_address;

	private String provider_name;

	private String project_name;

	private String team;

	private String provider_cost_center;

	private String currency;

	private String start_date;

	private String end_date;

	private String effective_date;

	private String contract_status;

	private String contract_option;

	private String organization_type;

	private String service_description;

	private String billing_cycle;

	private Long total_budget;

	private List<SLATariffSheet> sla_tariffsheet;

	private List<SLAIO> sla_io;

	private List<SLAPO> sla_po;

	private List<SLAContacts> sla_contacts;

	private List<SupportingFiles> sla_terms_and_conditions;

	private List<SupportingFiles> attachments;

	private SupportingFiles sla_argeement_document;

	private SupportingFiles sla_signed_argeement_document;

	private String status;

	private double mark_value;

	private double fte;

	private String created_by;

	private Boolean is_c4dsla = false;

	private String customer_cost_center;

	private String customer_cost_center_manager;

}

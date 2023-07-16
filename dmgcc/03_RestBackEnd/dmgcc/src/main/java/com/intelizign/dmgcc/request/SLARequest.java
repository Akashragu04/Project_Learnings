package com.intelizign.dmgcc.request;

import java.util.List;

import com.intelizign.dmgcc.pojoclass.RevenueCostCenterAllocation;
import com.intelizign.dmgcc.pojoclass.SLAContacts;
import com.intelizign.dmgcc.pojoclass.SLAIO;
import com.intelizign.dmgcc.pojoclass.SLAPO;
import com.intelizign.dmgcc.pojoclass.SLATariffSheet;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SLARequest {

	private long id;

	private String slaname;

	private String customer_company;

	private String customer_entity_code;

	private String customer_address;

	private String customer_country;

	private String customer_postal_code;

	private String customer_name;

	private String project_name;

	private String project_code;

	private String provider_name;

	private String team;

	private String provider_cost_center;

	private String currency;

	private String start_date;

	private String end_date;

	private String effective_date;

	private String contract_status;

	private String contract_option;

	private String customer_cost_center;

	private String customer_cost_center_manager;

	private String organization_type;

	private String service_description;

	private String billing_cycle;

	private Long total_budget;

	private List<RevenueCostCenterAllocation> revenue_cost_center;

	private List<SLATariffSheet> sla_tariffsheet;

	private List<SLAIO> sla_io;

	private List<SLAPO> sla_po;

	private List<SLAContacts> sla_contacts;

	private List<SupportingFiles> sla_terms_and_conditions;

	private List<SupportingFiles> attachments;

}

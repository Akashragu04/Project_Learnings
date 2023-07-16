package com.intelizign.dmgcc.request.bizcase;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class saveNotify {

	private String session_name;

	private String hr_contact_person;

	private String hr_shortid;

	private String hr_email;

	private Boolean is_agree;

	private String it_contact_person;

	private String it_shortid;

	private String it_email;

	private String fac_contact_person;

	private String fac_shortid;

	private String fac_email;

	private List<SubModel> it_info;

	private List<SubModel> facility;

	private List<SubModel> system_access;

	private List<SubModel> thirdparty_cost;

	private List<SubModel> thirdparty_service;

	private List<SubModel> travel_cost;

	private List<SubModel> other_cost;

	private List<Manpower_Requirements> manpower_requirements;

	private List<Manpower_Hiringcost> manpower_hiringcost;

	private List<Rampups> rampups;

	private List<Manpower_Requirements> hr_manpower_requirements;

	private List<Manpower_Hiringcost> hr_manpower_hiringcost;

	private List<Rampups> hr_rampups;

	private List<Rampups> customer_rampdown;

}

package com.intelizign.dmgcc.request.bizcase;

import java.time.LocalDate;
import java.util.List;

public class BizCasePreviewSaveRequest {

	private LocalDate business_case_start_date;

	private LocalDate business_case_end_date;

	private Boolean is_customer_rampdown;

	private Double man_power_inflation;

	private Double rate_card_inflation;

	private List<Manpower_Requirements> manpower_requirements;

	private List<Manpower_Hiringcost> manpower_hiringcost;

	private List<Rampups> rampups;

	private List<Rampups> customer_rampdown;

	public BizCasePreviewSaveRequest() {
		super();
	}

	public Boolean getIs_customer_rampdown() {
		return is_customer_rampdown;
	}

	public void setIs_customer_rampdown(Boolean is_customer_rampdown) {
		this.is_customer_rampdown = is_customer_rampdown;
	}

	public LocalDate getBusiness_case_start_date() {
		return business_case_start_date;
	}

	public void setBusiness_case_start_date(LocalDate business_case_start_date) {
		this.business_case_start_date = business_case_start_date;
	}

	public LocalDate getBusiness_case_end_date() {
		return business_case_end_date;
	}

	public void setBusiness_case_end_date(LocalDate business_case_end_date) {
		this.business_case_end_date = business_case_end_date;
	}

	public Double getMan_power_inflation() {
		return man_power_inflation;
	}

	public void setMan_power_inflation(Double man_power_inflation) {
		this.man_power_inflation = man_power_inflation;
	}

	public Double getRate_card_inflation() {
		return rate_card_inflation;
	}

	public void setRate_card_inflation(Double rate_card_inflation) {
		this.rate_card_inflation = rate_card_inflation;
	}

	public List<Manpower_Requirements> getManpower_requirements() {
		return manpower_requirements;
	}

	public void setManpower_requirements(List<Manpower_Requirements> manpower_requirements) {
		this.manpower_requirements = manpower_requirements;
	}

	public List<Manpower_Hiringcost> getManpower_hiringcost() {
		return manpower_hiringcost;
	}

	public void setManpower_hiringcost(List<Manpower_Hiringcost> manpower_hiringcost) {
		this.manpower_hiringcost = manpower_hiringcost;
	}

	public List<Rampups> getRampups() {
		return rampups;
	}

	public void setRampups(List<Rampups> rampups) {
		this.rampups = rampups;
	}

	public List<Rampups> getCustomer_rampdown() {
		return customer_rampdown;
	}

	public void setCustomer_rampdown(List<Rampups> customer_rampdown) {
		this.customer_rampdown = customer_rampdown;
	}

}

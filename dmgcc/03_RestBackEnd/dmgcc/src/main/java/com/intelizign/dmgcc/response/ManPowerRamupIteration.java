package com.intelizign.dmgcc.response;

import java.time.LocalDate;
import java.util.List;

import com.intelizign.dmgcc.pojoclass.bizcase.BizCaseReport;
import com.intelizign.dmgcc.request.bizcase.Manpower_Hiringcost;
import com.intelizign.dmgcc.request.bizcase.Manpower_Requirements;
import com.intelizign.dmgcc.request.bizcase.Rampups;

public class ManPowerRamupIteration {

	private int id;

	private String Overall_Iteration;

	private String Manpower_Iteration;

	private String Manpower_label;

	private Double rate_card_inflation;

	private Double manpower_inflation;

	private Boolean is_customer_rampdown;

	private LocalDate business_case_start_date;

	private LocalDate business_case_end_date;

	private List<Manpower_Requirements> manpower_requirements;

	private List<Manpower_Hiringcost> manpower_hiringcost;

	private List<Rampups> Manpower_Rampups;

	private List<Rampups> customer_rampdown;

	private BizCaseReport bizcasereport;

	public ManPowerRamupIteration() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Boolean getIs_customer_rampdown() {
		return is_customer_rampdown;
	}

	public void setIs_customer_rampdown(Boolean is_customer_rampdown) {
		this.is_customer_rampdown = is_customer_rampdown;
	}

	public Double getManpower_inflation() {
		return manpower_inflation;
	}

	public void setManpower_inflation(Double manpower_inflation) {
		this.manpower_inflation = manpower_inflation;
	}

	public Double getRate_card_inflation() {
		return rate_card_inflation;
	}

	public void setRate_card_inflation(Double rate_card_inflation) {
		this.rate_card_inflation = rate_card_inflation;
	}

	public String getOverall_Iteration() {
		return Overall_Iteration;
	}

	public void setOverall_Iteration(String overall_Iteration) {
		Overall_Iteration = overall_Iteration;
	}

	public String getManpower_Iteration() {
		return Manpower_Iteration;
	}

	public void setManpower_Iteration(String manpower_Iteration) {
		Manpower_Iteration = manpower_Iteration;
	}

	public List<Rampups> getManpower_Rampups() {
		return Manpower_Rampups;
	}

	public void setManpower_Rampups(List<Rampups> manpower_Rampups) {
		Manpower_Rampups = manpower_Rampups;
	}

	public String getManpower_label() {
		return Manpower_label;
	}

	public void setManpower_label(String manpower_label) {
		Manpower_label = manpower_label;
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

	public List<Rampups> getCustomer_rampdown() {
		return customer_rampdown;
	}

	public void setCustomer_rampdown(List<Rampups> customer_rampdown) {
		this.customer_rampdown = customer_rampdown;
	}

	public BizCaseReport getBizcasereport() {
		return bizcasereport;
	}

	public void setBizcasereport(BizCaseReport bizcasereport) {
		this.bizcasereport = bizcasereport;
	}

}

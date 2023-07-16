package com.intelizign.dmgcc.response;

import java.util.List;

import com.intelizign.dmgcc.models.G3CEmployeeMasterModel;

public class LeadCustomerAndBusiness {

	private List<G3CEmployeeMasterModel> customer;
	private List<G3CEmployeeMasterModel> business;

	public LeadCustomerAndBusiness() {
		super();
	}

	public List<G3CEmployeeMasterModel> getCustomer() {
		return customer;
	}

	public void setCustomer(List<G3CEmployeeMasterModel> customer) {
		this.customer = customer;
	}

	public List<G3CEmployeeMasterModel> getBusiness() {
		return business;
	}

	public void setBusiness(List<G3CEmployeeMasterModel> business) {
		this.business = business;
	}

}

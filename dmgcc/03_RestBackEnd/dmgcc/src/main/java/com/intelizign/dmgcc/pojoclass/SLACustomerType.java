package com.intelizign.dmgcc.pojoclass;

import java.util.List;

public class SLACustomerType {

	private List<SLAContacts> provider;

	private List<SLAContacts> customer;

	public List<SLAContacts> getProvider() {
		return provider;
	}

	public void setProvider(List<SLAContacts> provider) {
		this.provider = provider;
	}

	public List<SLAContacts> getCustomer() {
		return customer;
	}

	public void setCustomer(List<SLAContacts> customer) {
		this.customer = customer;
	}

	public SLACustomerType() {
		super();
	}

}

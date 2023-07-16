package com.intelizign.dmgcc.models.othermaster;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "Customer_Master_Data")
public class CustomerMasterModel {

	@Id
	@GenericGenerator(name = "id", strategy = "com.intelizign.dmgcc.utils.CustomerMasterConfig")
	@GeneratedValue(generator = "id")
	@Column(name = "id", nullable = false, updatable = false)
	private long id;
	
	@Column(name = "customer_name")
	private String customername;

	@Column(name = "customer_id")
	private String customerid;

	@Column(name = "short_name")
	private String shortname;

	@Column(name = "address")
	private String address;

	@Column(name = "telephone")
	private String telephone;

	@Column(name = "fax")
	private String fax;

	@Column(name = "code")
	private int code;

	@Column(name = "isActive")
	private boolean active;

	@Column(name = "country")
	private String country;

	@Column(name = "currency")
	private String currency;

	@Column(name = "genesis_code")
	private int genesiscode;

	@Column(name = "gstin")
	private String gstin;

	@Column(name = "state")
	private String state;

	public CustomerMasterModel() {
		super();

	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}



	public String getShortname() {
		return shortname;
	}

	public void setShortname(String shortname) {
		this.shortname = shortname;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}



	public String getCustomername() {
		return customername;
	}

	public void setCustomername(String customername) {
		this.customername = customername;
	}

	public String getCustomerid() {
		return customerid;
	}

	public void setCustomerid(String customerid) {
		this.customerid = customerid;
	}

	public int getGenesiscode() {
		return genesiscode;
	}

	public void setGenesiscode(int genesiscode) {
		this.genesiscode = genesiscode;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getGstin() {
		return gstin;
	}

	public void setGstin(String gstin) {
		this.gstin = gstin;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}
}

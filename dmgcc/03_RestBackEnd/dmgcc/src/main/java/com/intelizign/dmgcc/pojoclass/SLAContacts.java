package com.intelizign.dmgcc.pojoclass;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SLAContacts implements Serializable {

	private String short_name;

	private String name;

	private String email;

	private String customer_type;

	private Boolean primary = false;

	private Boolean key_person = false;

	private Boolean is_pre_invoice = false;

	private Boolean is_sla = false;

	private String approved_date = "";

	public String getShort_name() {
		return short_name;
	}

	public void setShort_name(String short_name) {
		this.short_name = short_name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getCustomer_type() {
		return customer_type;
	}

	public void setCustomer_type(String customer_type) {
		this.customer_type = customer_type;
	}

	public Boolean getPrimary() {
		return primary;
	}

	public void setPrimary(Boolean primary) {
		this.primary = primary;
	}

	public Boolean getKey_person() {
		return key_person;
	}

	public void setKey_person(Boolean key_person) {
		this.key_person = key_person;
	}

	public Boolean getIs_pre_invoice() {
		return is_pre_invoice;
	}

	public void setIs_pre_invoice(Boolean is_pre_invoice) {
		this.is_pre_invoice = is_pre_invoice;
	}

	public Boolean getIs_sla() {
		return is_sla;
	}

	public void setIs_sla(Boolean is_sla) {
		this.is_sla = is_sla;
	}

	public String getApproved_date() {
		return approved_date;
	}

	public void setApproved_date(String approved_date) {
		this.approved_date = approved_date;
	}

}

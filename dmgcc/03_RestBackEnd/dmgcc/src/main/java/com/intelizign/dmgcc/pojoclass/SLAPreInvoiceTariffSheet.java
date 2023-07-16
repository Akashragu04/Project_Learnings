package com.intelizign.dmgcc.pojoclass;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SLAPreInvoiceTariffSheet implements Serializable{

	
	private String material_description;
	
	private String units;
	
	private String quantity;
	
	private String rate;
	
	private String amount;
	
	private String markup_value;
	
	private String total_amount;
	
	private String budget_available;

	public String getMaterial_description() {
		return material_description;
	}

	public void setMaterial_description(String material_description) {
		this.material_description = material_description;
	}

	public String getUnits() {
		return units;
	}

	public void setUnits(String units) {
		this.units = units;
	}

	public String getRate() {
		return rate;
	}

	public void setRate(String rate) {
		this.rate = rate;
	}

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

	public String getMarkup_value() {
		return markup_value;
	}

	public void setMarkup_value(String markup_value) {
		this.markup_value = markup_value;
	}

	public String getQuantity() {
		return quantity;
	}

	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}

	public String getTotal_amount() {
		return total_amount;
	}

	public void setTotal_amount(String total_amount) {
		this.total_amount = total_amount;
	}

	public String getBudget_available() {
		return budget_available;
	}

	public void setBudget_available(String budget_available) {
		this.budget_available = budget_available;
	}
	
}

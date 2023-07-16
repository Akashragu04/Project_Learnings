package com.intelizign.dmgcc.request.bizcase;

import java.io.Serializable;
import java.time.LocalDate;

import javax.validation.constraints.Pattern;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubModel implements Serializable {

	private String description;
	private String remark;
	
//	@Pattern(regexp = "^[1-9][0-9]*\\\\.?[0-9]*$" , message = "This value must contain only positive numbers") 
	private String quantity;
	
//	@Pattern(regexp = "^[1-9][0-9]*\\\\.?[0-9]*$" , message = "This value must contain only positive numbers") 
	private String cost;
	private String cost_type;
	private String purchase_order;
	private String business_year;
	private String amortization;
	private LocalDate target_date;
	private Boolean isratecard = false;

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getAmortization() {
		return amortization;
	}

	public void setAmortization(String amortization) {
		this.amortization = amortization;
	}

	public Boolean getIsratecard() {
		return isratecard;
	}

	public void setIsratecard(Boolean isratecard) {
		this.isratecard = isratecard;
	}

	public String getBusiness_year() {
		return business_year;
	}

	public void setBusiness_year(String business_year) {
		this.business_year = business_year;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getQuantity() {
		return quantity;
	}

	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}

	public String getCost() {
		return cost;
	}

	public void setCost(String cost) {
		this.cost = cost;
	}

	public String getPurchase_order() {
		return purchase_order;
	}

	public void setPurchase_order(String purchase_order) {
		this.purchase_order = purchase_order;
	}

	public String getCost_type() {
		return cost_type;
	}

	public void setCost_type(String cost_type) {
		this.cost_type = cost_type;
	}

	public LocalDate getTarget_date() {
		return target_date;
	}

	public void setTarget_date(LocalDate target_date) {
		this.target_date = target_date;
	}

}

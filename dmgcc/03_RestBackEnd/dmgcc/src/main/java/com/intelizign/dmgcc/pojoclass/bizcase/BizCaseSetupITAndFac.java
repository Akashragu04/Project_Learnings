package com.intelizign.dmgcc.pojoclass.bizcase;

import java.io.Serializable;

public class BizCaseSetupITAndFac implements Serializable {

	private String description;

	private String remark_comment;

	private Long quantity;

	private Long remaining_quantity;

	private Long cost;

	private String cost_type;

	private String target_date;

	private String status_color;

	private String remark;

	private String business_year;

	public BizCaseSetupITAndFac() {
		super();
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getRemark_comment() {
		return remark_comment;
	}

	public void setRemark_comment(String remark_comment) {
		this.remark_comment = remark_comment;
	}

	public Long getQuantity() {
		return quantity;
	}

	public void setQuantity(Long quantity) {
		this.quantity = quantity;
	}

	public Long getRemaining_quantity() {
		return remaining_quantity;
	}

	public void setRemaining_quantity(Long remaining_quantity) {
		this.remaining_quantity = remaining_quantity;
	}

	public Long getCost() {
		return cost;
	}

	public void setCost(Long cost) {
		this.cost = cost;
	}

	public String getCost_type() {
		return cost_type;
	}

	public void setCost_type(String cost_type) {
		this.cost_type = cost_type;
	}

	public String getTarget_date() {
		return target_date;
	}

	public void setTarget_date(String target_date) {
		this.target_date = target_date;
	}

	public String getStatus_color() {
		return status_color;
	}

	public void setStatus_color(String status_color) {
		this.status_color = status_color;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getBusiness_year() {
		return business_year;
	}

	public void setBusiness_year(String business_year) {
		this.business_year = business_year;
	}

}

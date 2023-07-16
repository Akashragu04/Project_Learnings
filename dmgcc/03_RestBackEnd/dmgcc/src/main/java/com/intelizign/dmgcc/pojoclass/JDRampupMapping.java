package com.intelizign.dmgcc.pojoclass;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JDRampupMapping implements Serializable {

	private Integer quantity;

	private String remarks;

	private Boolean quantitydisabled;

	private Long jdcode;

	private String jdlist;

	private String status;

	private String position_code;

	public String getPosition_code() {
		return position_code;
	}

	public void setPosition_code(String position_code) {
		this.position_code = position_code;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public Long getJdcode() {
		return jdcode;
	}

	public void setJdcode(Long jdcode) {
		this.jdcode = jdcode;
	}

	public String getJdlist() {
		return jdlist;
	}

	public void setJdlist(String jdlist) {
		this.jdlist = jdlist;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Boolean getQuantitydisabled() {
		return quantitydisabled;
	}

	public void setQuantitydisabled(Boolean quantitydisabled) {
		this.quantitydisabled = quantitydisabled;
	}

}

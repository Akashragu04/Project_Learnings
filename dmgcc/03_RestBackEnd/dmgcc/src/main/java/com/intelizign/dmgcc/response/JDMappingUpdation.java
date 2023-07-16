package com.intelizign.dmgcc.response;

import java.io.Serializable;

public class JDMappingUpdation implements Serializable {

	private Long jd_id;

	private Long status_id;

	private String level;

	private String monthandyear;

	private String position_code;

	private String status;

	private String updated_by;

	public Long getJd_id() {
		return jd_id;
	}

	public void setJd_id(Long jd_id) {
		this.jd_id = jd_id;
	}

	public Long getStatus_id() {
		return status_id;
	}

	public void setStatus_id(Long status_id) {
		this.status_id = status_id;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public String getMonthandyear() {
		return monthandyear;
	}

	public void setMonthandyear(String monthandyear) {
		this.monthandyear = monthandyear;
	}

	public String getPosition_code() {
		return position_code;
	}

	public void setPosition_code(String position_code) {
		this.position_code = position_code;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getUpdated_by() {
		return updated_by;
	}

	public void setUpdated_by(String updated_by) {
		this.updated_by = updated_by;
	}

}

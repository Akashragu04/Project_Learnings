package com.intelizign.dmgcc.response;

public class JDTaleoResponse {
	
	private long request_id;
	private String monthandyear;  //"Mar-2001"
	private Long hired_id;
	private String hired_updated_by ;
	private String hired_status ;
	
	private String position_code;
	public long getRequest_id() {
		return request_id;
	}
	public void setRequest_id(long request_id) {
		this.request_id = request_id;
	}
	public String getMonthandyear() {
		return monthandyear;
	}
	public void setMonthandyear(String monthandyear) {
		this.monthandyear = monthandyear;
	}
	public Long getHired_id() {
		return hired_id;
	}
	public void setHired_id(Long hired_id) {
		this.hired_id = hired_id;
	}
	public String getHired_updated_by() {
		return hired_updated_by;
	}
	public void setHired_updated_by(String hired_updated_by) {
		this.hired_updated_by = hired_updated_by;
	}
	public String getHired_status() {
		return hired_status;
	}
	public void setHired_status(String hired_status) {
		this.hired_status = hired_status;
	}
	public String getPosition_code() {
		return position_code;
	}
	public void setPosition_code(String position_code) {
		this.position_code = position_code;
	}
	
	


}

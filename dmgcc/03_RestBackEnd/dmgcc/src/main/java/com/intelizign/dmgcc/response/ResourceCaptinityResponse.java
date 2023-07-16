package com.intelizign.dmgcc.response;

public class ResourceCaptinityResponse {
	
	
	private Long slaid;

	private String sla_name;

	private long userid;

	private String hrid;

	private String resource_name;
	private String resource_email;

	private String resource_shortid;

	private Integer capcity;

	private String level;
	
	
	public Long getSlaid() {
		return slaid;
	}

	public void setSlaid(Long slaid) {
		this.slaid = slaid;
	}

	public String getSla_name() {
		return sla_name;
	}

	public void setSla_name(String sla_name) {
		this.sla_name = sla_name;
	}

	public long getUserid() {
		return userid;
	}

	public void setUserid(long userid) {
		this.userid = userid;
	}

	public String getHrid() {
		return hrid;
	}

	public void setHrid(String hrid) {
		this.hrid = hrid;
	}

	public String getResource_name() {
		return resource_name;
	}

	public void setResource_name(String resource_name) {
		this.resource_name = resource_name;
	}

	public String getResource_email() {
		return resource_email;
	}

	public void setResource_email(String resource_email) {
		this.resource_email = resource_email;
	}

	public String getResource_shortid() {
		return resource_shortid;
	}

	public void setResource_shortid(String resource_shortid) {
		this.resource_shortid = resource_shortid;
	}

	public Integer getCapcity() {
		return capcity;
	}

	public void setCapcity(Integer capcity) {
		this.capcity = capcity;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}
	
	
}

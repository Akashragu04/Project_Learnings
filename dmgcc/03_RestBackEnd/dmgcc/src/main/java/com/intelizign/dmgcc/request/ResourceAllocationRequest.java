package com.intelizign.dmgcc.request;

import java.util.List;

public class ResourceAllocationRequest {

	private Long project_id;

	private Long sla_id;

	private Boolean capniti_enable;

	private Boolean task_enable;

	private List<ResourceMapping> resourceMapping;

	public static class ResourceMapping {

		private Long id;

		private long userid;

		private String hrid;

		private String resource_name;

		private String resource_email;

		private String resource_shortid;

		private Integer capcity;

		private String level;

		public ResourceMapping() {
			super();
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

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}
	}

	public ResourceAllocationRequest() {
		super();
	}

	public Long getProject_id() {
		return project_id;
	}

	public void setProject_id(Long project_id) {
		this.project_id = project_id;
	}

	public Long getSla_id() {
		return sla_id;
	}

	public void setSla_id(Long sla_id) {
		this.sla_id = sla_id;
	}

	public Boolean getCapniti_enable() {
		return capniti_enable;
	}

	public void setCapniti_enable(Boolean capniti_enable) {
		this.capniti_enable = capniti_enable;
	}

	public Boolean getTask_enable() {
		return task_enable;
	}

	public void setTask_enable(Boolean task_enable) {
		this.task_enable = task_enable;
	}

	public List<ResourceMapping> getResourceMapping() {
		return resourceMapping;
	}

	public void setResourceMapping(List<ResourceMapping> resourceMapping) {
		this.resourceMapping = resourceMapping;
	}

}

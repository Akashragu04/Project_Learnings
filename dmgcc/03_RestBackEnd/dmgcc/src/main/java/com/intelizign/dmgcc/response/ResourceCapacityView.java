package com.intelizign.dmgcc.response;

public class ResourceCapacityView {

	private Integer sla_count;

	private Integer available_capacity;

	private Integer allocate_capacity;

	private Integer billed_hours;

	public Integer getSla_count() {
		return sla_count;
	}

	public void setSla_count(Integer sla_count) {
		this.sla_count = sla_count;
	}

	public Integer getAvailable_capacity() {
		return available_capacity;
	}

	public void setAvailable_capacity(Integer available_capacity) {
		this.available_capacity = available_capacity;
	}

	public Integer getAllocate_capacity() {
		return allocate_capacity;
	}

	public void setAllocate_capacity(Integer allocate_capacity) {
		this.allocate_capacity = allocate_capacity;
	}

	public Integer getBilled_hours() {
		return billed_hours;
	}

	public void setBilled_hours(Integer billed_hours) {
		this.billed_hours = billed_hours;
	}

	public ResourceCapacityView() {
		super();
	}

}

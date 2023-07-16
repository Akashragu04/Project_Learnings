package com.intelizign.dmgcc.response;

public class LeadConversionAverage {

	private String conversion_period;

	private Double average;

	private String colour;

	private String department;

	public String getConversion_period() {
		return conversion_period;
	}

	public void setConversion_period(String conversion_period) {
		this.conversion_period = conversion_period;
	}

	public Double getAverage() {
		return average;
	}

	public void setAverage(Double average) {
		this.average = average;
	}

	public String getColour() {
		return colour;
	}

	public void setColour(String colour) {
		this.colour = colour;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public LeadConversionAverage() {
		super();
	}

}

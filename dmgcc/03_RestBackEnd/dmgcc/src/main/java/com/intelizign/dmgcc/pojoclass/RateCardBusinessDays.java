package com.intelizign.dmgcc.pojoclass;

import java.io.Serializable;

public class RateCardBusinessDays implements Serializable {

	private String year;

	private Integer days;

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public Integer getDays() {
		return days;
	}

	public void setDays(Integer days) {
		this.days = days;
	}

	public RateCardBusinessDays() {
		super();
	}

}

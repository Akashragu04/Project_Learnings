package com.intelizign.dmgcc.pojoclass.bizcase;

import java.io.Serializable;

public class BizCaseManPowerYearlyInfo implements Serializable {

	private String level;

	private Integer count;

	private String year;

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public BizCaseManPowerYearlyInfo() {
		super();
	}

}

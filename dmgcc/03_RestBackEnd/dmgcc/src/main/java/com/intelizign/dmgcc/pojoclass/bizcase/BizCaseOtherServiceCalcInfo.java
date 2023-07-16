package com.intelizign.dmgcc.pojoclass.bizcase;

import java.io.Serializable;
import java.util.List;

import com.intelizign.dmgcc.request.bizcase.Properties;

public class BizCaseOtherServiceCalcInfo implements Serializable {

	private String year;

	private List<Properties> properties;

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public List<Properties> getProperties() {
		return properties;
	}

	public void setProperties(List<Properties> properties) {
		this.properties = properties;
	}

	public BizCaseOtherServiceCalcInfo() {
		super();
	}

}

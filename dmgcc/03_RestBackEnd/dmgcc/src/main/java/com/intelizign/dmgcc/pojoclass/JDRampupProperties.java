package com.intelizign.dmgcc.pojoclass;

import java.io.Serializable;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JDRampupProperties implements Serializable {

	private String property_name;

	private String property_value;

	private String property_date;

	private String year;

	private List<JDRampupMapping> jd_map;

	public String getProperty_name() {
		return property_name;
	}

	public void setProperty_name(String property_name) {
		this.property_name = property_name;
	}

	public String getProperty_value() {
		return property_value;
	}

	public void setProperty_value(String property_value) {
		this.property_value = property_value;
	}

	public String getProperty_date() {
		return property_date;
	}

	public void setProperty_date(String property_date) {
		this.property_date = property_date;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public List<JDRampupMapping> getJd_map() {
		return jd_map;
	}

	public void setJd_map(List<JDRampupMapping> jd_map) {
		this.jd_map = jd_map;
	}

}

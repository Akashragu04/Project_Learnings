package com.intelizign.dmgcc.request.bizcase;

import java.io.Serializable;

import javax.validation.constraints.Pattern;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Properties implements Serializable {
	private String property_name;

//	@Pattern(regexp = "^[1-9][0-9]*\\\\.?[0-9]*$" , message = "This value must contain only positive numbers") 
	private String property_value;

	private String property_date;

	private String year;

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

}

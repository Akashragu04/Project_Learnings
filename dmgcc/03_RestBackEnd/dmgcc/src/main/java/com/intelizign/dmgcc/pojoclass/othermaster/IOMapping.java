package com.intelizign.dmgcc.pojoclass.othermaster;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonView;
import com.intelizign.dmgcc.utils.CustomFields;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IOMapping implements Serializable {

	@JsonView(CustomFields.MyResponseViews.class)
	private String year;

	@JsonView(CustomFields.MyResponseViews.class)
	private String ionumber;

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public String getIonumber() {
		return ionumber;
	}

	public void setIonumber(String ionumber) {
		this.ionumber = ionumber;
	}

}
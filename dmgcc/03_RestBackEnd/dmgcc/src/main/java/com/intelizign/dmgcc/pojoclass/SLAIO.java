package com.intelizign.dmgcc.pojoclass;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SLAIO implements Serializable {

	private String io_number;

	private String io_category;

	private String value;

	public String getIo_number() {
		return io_number;
	}

	public void setIo_number(String io_number) {
		this.io_number = io_number;
	}

	public String getIo_category() {
		return io_category;
	}

	public void setIo_category(String io_category) {
		this.io_category = io_category;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

}

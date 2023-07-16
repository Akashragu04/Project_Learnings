package com.intelizign.dmgcc.pojoclass;

import java.io.Serializable;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JDRampupModel implements Serializable {

	private String level;

	private String total;

	private List<JDRampupProperties> properties;

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public String getTotal() {
		return total;
	}

	public void setTotal(String total) {
		this.total = total;
	}

	public List<JDRampupProperties> getProperties() {
		return properties;
	}

	public void setProperties(List<JDRampupProperties> properties) {
		this.properties = properties;
	}

}

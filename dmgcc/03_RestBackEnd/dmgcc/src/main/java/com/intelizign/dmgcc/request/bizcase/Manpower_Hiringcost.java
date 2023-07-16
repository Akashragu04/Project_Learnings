package com.intelizign.dmgcc.request.bizcase;

import java.io.Serializable;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Manpower_Hiringcost implements Serializable
{
	private String level;
	
	private String total;
	
	private List<Properties> properties;

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

	public List<Properties> getProperties() {
		return properties;
	}
	
	public void setProperties(List<Properties> properties) {
		this.properties = properties;
	}
	
}

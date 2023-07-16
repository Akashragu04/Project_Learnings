package com.intelizign.dmgcc.dashboardresponce;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BarChartReport {

	private String conversion_name;

	private double count;

	private String colour;

	public void setConversion_name(String conversion_name) {
		this.conversion_name = conversion_name;
	}

	public void setCount(double count) {
		
		String formattedValue;
		if(count % 1 == 0) {
			  // No digits after decimal
			formattedValue = String.format("%f", count);
		}
		
		else {
			formattedValue = String.format("%.2f", count);
		}
		this.count = Double.parseDouble(formattedValue);
		
	}

	public void setColour(String colour) {
		this.colour = colour;
	}
}

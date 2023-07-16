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
public class PlanVsActualReport {

	private String month;

	private double plan;

	private double actual;

	public void setMonth(String month) {
		this.month = month;
	}

	public void setPlan(double plan) {
		String formattedValue;
		if(plan % 1 == 0) {
			  // No digits after decimal
			formattedValue = String.format("%f", plan);
		}
		
		else {
			formattedValue = String.format("%.2f", plan);
		}
		this.plan = Double.parseDouble(formattedValue);
	}

	public void setActual(double actual) {
		String formattedValue;
		if(actual % 1 == 0) {
			  // No digits after decimal
			formattedValue = String.format("%f", actual);
		}
		
		else {
			formattedValue = String.format("%.2f", actual);
		}
		this.actual = Double.parseDouble(formattedValue);
	}
}

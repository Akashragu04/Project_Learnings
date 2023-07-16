package com.intelizign.dmgcc.response.othermaster;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BizcaseFinalChartResponse {




	private String name;
	private double[] value;   // at first  previous totalcost value 0 like [0,current totalcost] 
	//after first data previous totalcost , current totalcost like [previous totalcost , current totalcost]
	private double label = 0;   // sum of  previous totalcost , current totalcost
    private String total_revenue;
    private String markup;
 
	@Getter
	@AllArgsConstructor
	@NoArgsConstructor
	public static class BizcaseChartResponse{
		
		private double manpower_cost_info = 0 ;
		private NonmanpowercostInfo nonmanpowercostInfo ;
		private double total_cost=0;
		private double totalmarkup_cost;
		private double total_slapayout_cost;    // revenue cost
		
		public void setManpower_cost_info(double manpower_cost_info) {
			
			String formattedValue;
			if(manpower_cost_info % 1 == 0) {
				  // No digits after decimal
				formattedValue = String.format("%f", manpower_cost_info);
			}
			
			else {
				formattedValue = String.format("%.2f", manpower_cost_info);
			}
			this.manpower_cost_info = Double.parseDouble(formattedValue);
		
		}
		public void setNonmanpowercostInfo(NonmanpowercostInfo nonmanpowercostInfo) {
			this.nonmanpowercostInfo = nonmanpowercostInfo;
		}
		public void setTotal_cost(double total_cost) {
			
			String formattedValue;
			if(total_cost % 1 == 0) {
				  // No digits after decimal
				formattedValue = String.format("%f", total_cost);
			}
			
			else {
				formattedValue = String.format("%.2f", total_cost);
			}
			this.total_cost = Double.parseDouble(formattedValue);
			
		}
		public void setTotalmarkup_cost(double totalmarkup_cost) {
			String formattedValue;
			if(totalmarkup_cost % 1 == 0) {
				  // No digits after decimal
				formattedValue = String.format("%f", totalmarkup_cost);
			}
			
			else {
				formattedValue = String.format("%.2f", totalmarkup_cost);
			}
			this.totalmarkup_cost = Double.parseDouble(formattedValue);
		}
		public void setTotal_slapayout_cost(double total_slapayout_cost) {
			String formattedValue;
			if(total_slapayout_cost % 1 == 0) {
				  // No digits after decimal
				formattedValue = String.format("%f", total_slapayout_cost);
			}
			
			else {
				formattedValue = String.format("%.2f", total_slapayout_cost);
			}
			this.total_slapayout_cost = Double.parseDouble(formattedValue);
		}
	}
	
	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	public static class NonmanpowercostInfo{
		Integer total_it_cost = 0;
		Integer total_facility_cost = 0;
		Integer total_system_access_cost = 0;
		Integer total_third_party_service = 0;
		Integer total_other_cost = 0;
		Integer total_third_party_cost = 0;
		Integer total_travel_cost = 0;
	
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setValue(double[] value) {
		
		double[] newvalue = new double[value.length];

		if (value != null) {
			for (int i = 0 ; i < value.length ; i++) {
				
				String formattedValue;
				if(value[i] % 1 == 0) {
					  // No digits after decimal
					formattedValue = String.format("%f", value[i]);
				}
				
				else {
					formattedValue = String.format("%.2f", value[i]);
				}
				newvalue[i] = Double.parseDouble(formattedValue);
			}
		}

		this.value = newvalue;
	}

	public void setLabel(double label) {
		String formattedValue;
		if(label % 1 == 0) {
			  // No digits after decimal
			formattedValue = String.format("%f", label);
		}
		
		else {
			formattedValue = String.format("%.2f", label);
		}
		this.label = Double.parseDouble(formattedValue);
	}

	public void setTotal_revenue(String total_revenue) {
		this.total_revenue = total_revenue;
	}

	public void setMarkup(String markup) {
		this.markup = markup;
	}

}

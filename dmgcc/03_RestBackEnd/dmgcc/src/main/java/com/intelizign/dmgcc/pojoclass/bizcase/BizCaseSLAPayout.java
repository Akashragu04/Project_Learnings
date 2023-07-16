package com.intelizign.dmgcc.pojoclass.bizcase;

import java.io.Serializable;
import java.util.List;

public class BizCaseSLAPayout implements Serializable {

	private String year;

	private Integer billable_hours;

	private List<SLA_Level_Properties> level_properties;

	public static class SLA_Level_Properties implements Serializable {

		private String level;

		private Double hourly_rate;

		private Integer manpower_count;

		private Double total_manpower_cost;

		public SLA_Level_Properties() {
			super();
		}

		public String getLevel() {
			return level;
		}

		public void setLevel(String level) {
			this.level = level;
		}

		public Double getHourly_rate() {
			return hourly_rate;
		}

		public void setHourly_rate(Double hourly_rate) {
			
			if(hourly_rate != null) {
				String formattedValue;
				if(hourly_rate % 1 == 0) {
					  // No digits after decimal
					formattedValue = String.format("%f", hourly_rate);
				}
				
				else {
					formattedValue = String.format("%.2f", hourly_rate);
				}
				this.hourly_rate = Double.parseDouble(formattedValue);
			}
			
			else {
				this.hourly_rate = hourly_rate ;
			}
		
		}

		public Double getTotal_manpower_cost() {
			return total_manpower_cost;
		}

		public void setTotal_manpower_cost(Double total_manpower_cost) {
			
			if(total_manpower_cost != null) {
				String formattedValue;
				if(total_manpower_cost % 1 == 0) {
					  // No digits after decimal
					formattedValue = String.format("%f", total_manpower_cost);
				}
				
				else {
					formattedValue = String.format("%.2f", total_manpower_cost);
				}
				this.total_manpower_cost = Double.parseDouble(formattedValue);
			}
			else {
				this.total_manpower_cost = total_manpower_cost ;
			}
		
		}

		public Integer getManpower_count() {
			return manpower_count;
		}

		public void setManpower_count(Integer manpower_count) {
			this.manpower_count = manpower_count;
		}

	}

	public BizCaseSLAPayout() {
		super();
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public Integer getBillable_hours() {
		return billable_hours;
	}

	public void setBillable_hours(Integer billable_hours) {
		this.billable_hours = billable_hours;
	}

	public List<SLA_Level_Properties> getLevel_properties() {
		return level_properties;
	}

	public void setLevel_properties(List<SLA_Level_Properties> level_properties) {
		this.level_properties = level_properties;
	}

}

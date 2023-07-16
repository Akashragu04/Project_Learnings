package com.intelizign.dmgcc.pojoclass.bizcase;

import java.io.Serializable;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class BizRateCardYearlyBasedCalculation implements Serializable {

	private String year;

	private List<Level_Properties> level_properties;

	public static class Level_Properties implements Serializable {

		private String level;

		private Integer total_working_hours;

		private List<Hourly_Rate> hourly_rate;

		@Getter
		@AllArgsConstructor
		@NoArgsConstructor
		public static class Hourly_Rate implements Serializable {

			private String rate;

			private double price;

			public void setRate(String rate) {
				this.rate = rate;
			}

			public void setPrice(double price) {
				
				String formattedValue;
				if(price % 1 == 0) {
					  // No digits after decimal
					formattedValue = String.format("%f", price);
				}
				
				else {
					formattedValue = String.format("%.2f", price);
				}
				this.price = Double.parseDouble(formattedValue);
			
			}

		}

		public String getLevel() {
			return level;
		}

		public void setLevel(String level) {
			this.level = level;
		}

		public Integer getTotal_working_hours() {
			return total_working_hours;
		}

		public void setTotal_working_hours(Integer total_working_hours) {
			this.total_working_hours = total_working_hours;
		}

		public List<Hourly_Rate> getHourly_rate() {
			return hourly_rate;
		}

		public void setHourly_rate(List<Hourly_Rate> hourly_rate) {
			this.hourly_rate = hourly_rate;
		}

		public Level_Properties() {
			super();
		}

	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public List<Level_Properties> getLevel_properties() {
		return level_properties;
	}

	public void setLevel_properties(List<Level_Properties> level_properties) {
		this.level_properties = level_properties;
	}

	public BizRateCardYearlyBasedCalculation() {
		super();
	}

}

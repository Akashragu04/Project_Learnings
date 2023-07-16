package com.intelizign.dmgcc.response.othermaster;

import java.io.Serializable;
import java.util.List;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CCChartResponse {



	String year;
	private Double total_expense;
	List<CCMonthwiseExpense>  ccMonthwiseExpenses;
	List<CCDescriptionwiseExpense>  ccDescriptionwiseExpenses;
	
	
	@Getter
	@AllArgsConstructor
	@NoArgsConstructor
	public static class CCMonthwiseExpense implements Serializable {
		
		private String month;
		private Double monthwise_expense=0d;
		
		public void setMonth(String month) {
			this.month = month;
		}
		public void setMonthwise_expense(Double monthwise_expense) {
			
			if(monthwise_expense != null) {
				String formattedValue;
				if(monthwise_expense % 1 == 0) {
					  // No digits after decimal
					formattedValue = String.format("%f", monthwise_expense);
				}
				
				else {
					formattedValue = String.format("%.2f", monthwise_expense);
				}
				this.monthwise_expense = Double.parseDouble(formattedValue);
			}
			else {
				this.monthwise_expense = monthwise_expense ;
			}
		}
	}
	
	@Getter
	@AllArgsConstructor
	@NoArgsConstructor
	public static class CCDescriptionwiseExpense implements Serializable {
		private String description;
		private Double monthwise_expense=0d;
		
		public void setDescription(String description) {
			this.description = description;
		}
		public void setMonthwise_expense(Double monthwise_expense) {
			
			if(monthwise_expense != null) {
				String formattedValue;
				if(monthwise_expense % 1 == 0) {
					  // No digits after decimal
					formattedValue = String.format("%f", monthwise_expense);
				}
				
				else {
					formattedValue = String.format("%.2f", monthwise_expense);
				}
				this.monthwise_expense = Double.parseDouble(formattedValue);
			}
			
			else {
				this.monthwise_expense = monthwise_expense ;
			}
		
		}
	}

	public void setYear(String year) {
		this.year = year;
	}

	public void setTotal_expense(Double total_expense) {
		
		if(total_expense != null) {
			String formattedValue;
			if(total_expense % 1 == 0) {
				  // No digits after decimal
				formattedValue = String.format("%f", total_expense);
			}
			
			else {
				formattedValue = String.format("%.2f", total_expense);
			}
			this.total_expense = Double.parseDouble(formattedValue);
		}
		
		else {
			this.total_expense = total_expense ;
		}

	}

	public void setCcMonthwiseExpenses(List<CCMonthwiseExpense> ccMonthwiseExpenses) {
		this.ccMonthwiseExpenses = ccMonthwiseExpenses;
	}

	public void setCcDescriptionwiseExpenses(List<CCDescriptionwiseExpense> ccDescriptionwiseExpenses) {
		this.ccDescriptionwiseExpenses = ccDescriptionwiseExpenses;
	}

}

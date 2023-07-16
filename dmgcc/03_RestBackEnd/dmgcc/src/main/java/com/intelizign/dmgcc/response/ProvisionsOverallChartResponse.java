package com.intelizign.dmgcc.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProvisionsOverallChartResponse {

	private Double total_required_sum = 0d;
	private List<ProvisionsChartResponsePojo> provisionschart; 
	
	@Setter
	@Getter
	@AllArgsConstructor
	@NoArgsConstructor
	public static class ProvisionsChartResponsePojo{
		private String month;
		private String year;
		private String date;
		private double planned_value = 0;
		private double actual_required_sum = 0;
		private double actual_nonrequired_sum = 0;
		private double actual_invoicesubmitted_sum = 0;
		private double current_value = 0;
	}
}

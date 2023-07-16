package com.intelizign.dmgcc.response;

import java.io.Serializable;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SLAAccuralsResponse implements Serializable {

	private String tarrif_name;
	private List<AccuralsMonthlyData> monthly_datas;

	@Setter
	@Getter
	@AllArgsConstructor
	@NoArgsConstructor
	public static class AccuralsMonthlyData implements Serializable {
		private String month;
		private String value = "0";
		private Boolean active = false;

	}

}

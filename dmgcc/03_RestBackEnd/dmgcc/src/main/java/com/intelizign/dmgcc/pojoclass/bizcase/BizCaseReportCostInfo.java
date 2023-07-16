package com.intelizign.dmgcc.pojoclass.bizcase;

import java.io.Serializable;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BizCaseReportCostInfo implements Serializable {

	private String year;

	private Double manpower_cost;

	private Double hiring_cost;

	private Integer non_manpower_cost;

	private Double other_cost;

	private Integer transition_cost;

	private Double total_cost;

}

package com.intelizign.dmgcc.pojoclass;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RevenueCostCenterAllocation implements Serializable {

	private String cost_center;

	private double allocate_percentage;
}

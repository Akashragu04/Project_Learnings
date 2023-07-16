package com.intelizign.dmgcc.response;

import java.util.List;

import com.intelizign.dmgcc.models.G3CEmployeeMasterModel;
import com.intelizign.dmgcc.models.ProjectModel;
import com.intelizign.dmgcc.pojoclass.RevenueCostCenterAllocation;
import com.intelizign.dmgcc.pojoclass.SLATariffSheet;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SLACreateResponse {

	private ProjectModel project;

	private String team;

	private String customer_costcenter;

	private String customer_costcenter_manager;

	private List<RevenueCostCenterAllocation> revenue_cost_center;

	private List<SLATariffSheet> tarriffsheets;

	private List<G3CEmployeeMasterModel> contacts;

}

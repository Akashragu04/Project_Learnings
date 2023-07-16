package com.intelizign.dmgcc.response;

import java.util.List;

import com.intelizign.dmgcc.request.bizcase.SubModel;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BizcaseThirdPartyUpdate {

	private List<SubModel> third_party_services_info;

	private List<SubModel> third_party_cost_info;

}
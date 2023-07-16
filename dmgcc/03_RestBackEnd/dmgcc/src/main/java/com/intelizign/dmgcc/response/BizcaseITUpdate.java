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
public class BizcaseITUpdate {

	private List<SubModel> it_info;

	private List<SubModel> system_access_info;

}

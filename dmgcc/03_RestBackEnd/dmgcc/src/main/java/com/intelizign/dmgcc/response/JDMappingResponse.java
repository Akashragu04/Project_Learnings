package com.intelizign.dmgcc.response;

import java.util.List;

import com.intelizign.dmgcc.pojoclass.JDRampupModel;
import com.intelizign.dmgcc.request.bizcase.Rampups;

public class JDMappingResponse {

	private List<Rampups> manpowerrampupList;
	private List<JDRampupModel> jdRampupModel;

	public List<Rampups> getManpowerrampupList() {
		return manpowerrampupList;
	}

	public void setManpowerrampupList(List<Rampups> manpowerrampupList) {
		this.manpowerrampupList = manpowerrampupList;
	}

	public List<JDRampupModel> getJdRampupModel() {
		return jdRampupModel;
	}

	public void setJdRampupModel(List<JDRampupModel> jdRampupModel) {
		this.jdRampupModel = jdRampupModel;
	}

	public JDMappingResponse() {
		super();
	}

}

package com.intelizign.dmgcc.response;

import java.util.List;

public class RampupITerationResponse {

	private List<ManPowerRamupIteration> ManPowerIteration;
	
	private List<HrRampupIteration> HrIteration;

	public RampupITerationResponse() {
		super();
	}

	public List<ManPowerRamupIteration> getManPowerIteration() {
		return ManPowerIteration;
	}

	public void setManPowerIteration(List<ManPowerRamupIteration> manPowerIteration) {
		ManPowerIteration = manPowerIteration;
	}

	public List<HrRampupIteration> getHrIteration() {
		return HrIteration;
	}

	public void setHrIteration(List<HrRampupIteration> hrIteration) {
		HrIteration = hrIteration;
	}
	
	
}

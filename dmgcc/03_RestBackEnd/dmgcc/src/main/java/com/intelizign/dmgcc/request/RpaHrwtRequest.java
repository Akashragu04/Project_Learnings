package com.intelizign.dmgcc.request;

import java.util.List;

import com.intelizign.dmgcc.models.G3CEmployeeMasterModel;

public class RpaHrwtRequest {

	private String rpa_token;
	
	private List<G3CEmployeeMasterModel> rpa_datas;

	public String getRpa_token() {
		return rpa_token;
	}

	public void setRpa_token(String rpa_token) {
		this.rpa_token = rpa_token;
	}

	public List<G3CEmployeeMasterModel> getRpa_datas() {
		return rpa_datas;
	}

	public void setRpa_datas(List<G3CEmployeeMasterModel> rpa_datas) {
		this.rpa_datas = rpa_datas;
	}

	
	
	
}

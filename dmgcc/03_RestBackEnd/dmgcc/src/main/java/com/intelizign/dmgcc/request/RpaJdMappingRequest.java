package com.intelizign.dmgcc.request;

import java.util.List;

import com.intelizign.dmgcc.response.JDTaleoResponse;

public class RpaJdMappingRequest {

	private String rpa_token;
	
	private List<JDTaleoResponse> rpa_datas;

	public String getRpa_token() {
		return rpa_token;
	}

	public void setRpa_token(String rpa_token) {
		this.rpa_token = rpa_token;
	}

	public List<JDTaleoResponse> getRpa_datas() {
		return rpa_datas;
	}

	public void setRpa_datas(List<JDTaleoResponse> rpa_datas) {
		this.rpa_datas = rpa_datas;
	}
	
	
}

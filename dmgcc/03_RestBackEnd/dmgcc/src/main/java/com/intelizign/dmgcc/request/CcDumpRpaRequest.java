package com.intelizign.dmgcc.request;

import java.util.List;

import com.intelizign.dmgcc.models.othermaster.CCDumpModel;

public class CcDumpRpaRequest {

    private String rpa_token;
	
	private List<CCDumpModel> rpa_datas;

	public String getRpa_token() {
		return rpa_token;
	}

	public void setRpa_token(String rpa_token) {
		this.rpa_token = rpa_token;
	}

	public List<CCDumpModel> getRpa_datas() {
		return rpa_datas;
	}

	public void setRpa_datas(List<CCDumpModel> rpa_datas) {
		this.rpa_datas = rpa_datas;
	}
	
	
	
	
}

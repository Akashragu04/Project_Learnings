package com.intelizign.dmgcc.request;

import java.util.List;

import com.intelizign.dmgcc.models.othermaster.IODumpModel;

public class RpaIoDumpRequest {

	private String rpa_token;
	
	private List<IODumpModel> rpa_datas;

	public String getRpa_token() {
		return rpa_token;
	}

	public void setRpa_token(String rpa_token) {
		this.rpa_token = rpa_token;
	}

	public List<IODumpModel> getRpa_datas() {
		return rpa_datas;
	}

	public void setRpa_datas(List<IODumpModel> rpa_datas) {
		this.rpa_datas = rpa_datas;
	}

	
	
	
	
	
}

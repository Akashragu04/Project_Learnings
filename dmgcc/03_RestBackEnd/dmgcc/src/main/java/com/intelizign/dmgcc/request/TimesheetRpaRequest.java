package com.intelizign.dmgcc.request;

import java.util.List;

public class TimesheetRpaRequest {

	private String rpa_token;
	
	private List<RpaTimeSheetRequest> rpa_datas;

	public String getRpa_token() {
		return rpa_token;
	}

	public void setRpa_token(String rpa_token) {
		this.rpa_token = rpa_token;
	}

	public List<RpaTimeSheetRequest> getRpa_datas() {
		return rpa_datas;
	}

	public void setRpa_datas(List<RpaTimeSheetRequest> rpa_datas) {
		this.rpa_datas = rpa_datas;
	}
	
	
}

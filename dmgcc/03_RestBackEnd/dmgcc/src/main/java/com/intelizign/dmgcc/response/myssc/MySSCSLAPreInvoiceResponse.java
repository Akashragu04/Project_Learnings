package com.intelizign.dmgcc.response.myssc;

import com.intelizign.dmgcc.response.SLAPreInvoiceResponse;

public class MySSCSLAPreInvoiceResponse {

	private Boolean isSuccess;
	private Long httpStatusCode;
	private String statusMessage;
	private SLAPreInvoiceResponse data;

	public Boolean getIsSuccess() {
		return isSuccess;
	}

	public void setIsSuccess(Boolean isSuccess) {
		this.isSuccess = isSuccess;
	}

	public Long getHttpStatusCode() {
		return httpStatusCode;
	}

	public void setHttpStatusCode(Long httpStatusCode) {
		this.httpStatusCode = httpStatusCode;
	}

	public String getStatusMessage() {
		return statusMessage;
	}

	public void setStatusMessage(String statusMessage) {
		this.statusMessage = statusMessage;
	}

	public SLAPreInvoiceResponse getData() {
		return data;
	}

	public void setData(SLAPreInvoiceResponse data) {
		this.data = data;
	}

}

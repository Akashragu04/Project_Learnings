package com.intelizign.dmgcc.response.myssc;

import java.util.List;

public class MySSCInvoiceStatus {

	private Boolean isSuccess;
	private Long httpStatusCode;
	private String statusMessage;
	private List<InvoiceStatus> data;

	public static class InvoiceStatus {
		private String preinvoice_id;
		private String invoice_id;
		private String slaid;
		private String status;

		public String getPreinvoice_id() {
			return preinvoice_id;
		}

		public void setPreinvoice_id(String preinvoice_id) {
			this.preinvoice_id = preinvoice_id;
		}

		public String getInvoice_id() {
			return invoice_id;
		}

		public void setInvoice_id(String invoice_id) {
			this.invoice_id = invoice_id;
		}

		public String getSlaid() {
			return slaid;
		}

		public void setSlaid(String slaid) {
			this.slaid = slaid;
		}

		public String getStatus() {
			return status;
		}

		public void setStatus(String status) {
			this.status = status;
		}

	}

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

	public List<InvoiceStatus> getData() {
		return data;
	}

	public void setData(List<InvoiceStatus> data) {
		this.data = data;
	}

}

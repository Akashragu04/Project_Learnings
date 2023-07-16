package com.intelizign.dmgcc.response.myssc;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MySSCInvoiceResponse {

	private Boolean isSuccess;
	private Long httpStatusCode;
	private String statusMessage;
	private List<InvoiceResponse> data;

	@Data
	@Setter
	@Getter
	@AllArgsConstructor
	@NoArgsConstructor
	public static class InvoiceResponse {

		private String id;
		private String preInvoiceId;
		private String invoiceNo;
		private String invoicedate;
		private String currency;
		private String gstInvoiceNo;
		private Double invoiceValue;
		private String xeRate;
		private String createdUserEmail;

	}

}

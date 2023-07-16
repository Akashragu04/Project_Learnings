package com.intelizign.dmgcc.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MySLAApprovalRequest {
	private String myssc_sla_id;
	private String g3c_sla_id;
	private String status;
	private SupportingFiles sla_signed_argeement_document;

}

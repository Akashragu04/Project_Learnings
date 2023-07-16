package com.intelizign.dmgcc.response;

import java.io.Serializable;
import java.util.List;

import com.intelizign.dmgcc.models.othermaster.SLAProvisions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SLAProvisionsProjectResponse implements Serializable {

	private Long id = 0l;
	private Long project_id;
	private String project_code;
	private String project_name;
	private Long project_invoice_expense;
	private Long project_total_expense;
	private List<SLAProvisions>  slaprovisions;
}

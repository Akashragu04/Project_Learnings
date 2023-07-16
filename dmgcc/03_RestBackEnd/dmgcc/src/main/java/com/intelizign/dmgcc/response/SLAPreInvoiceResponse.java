package com.intelizign.dmgcc.response;

import java.util.List;

import com.intelizign.dmgcc.pojoclass.SLAContacts;
import com.intelizign.dmgcc.pojoclass.SLAPreInvoiceTariffSheet;
import com.intelizign.dmgcc.request.SupportingFiles;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SLAPreInvoiceResponse {

	private String slaid;

	private String preinvoiceid;

	private String preinvoice_date;

	private String preinvoice_created_by;

	private String preinvoice_created_on;

	private String preinvoice_approved_by;

	private String prj_approved_by;

	private String cust_approved_by;

	private String ctrl_approved_by;

	private String preinvoice_file_name;

	private String preinvoice_file_path;

	private String service_period;

	private Long total_amount = (long) 0;

	private String preinvoice_updatedby;

	private String remark;

	private List<SLAPreInvoiceTariffSheet> sla_preinvoice_tariffsheet;

	private List<SLAContacts> sla_contacts;

	private List<SupportingFiles> attachments;

}

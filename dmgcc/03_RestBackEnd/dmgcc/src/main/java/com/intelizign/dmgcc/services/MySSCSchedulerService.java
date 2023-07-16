package com.intelizign.dmgcc.services;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.intelizign.dmgcc.models.SLAInvoiceModel;
import com.intelizign.dmgcc.models.SLAPreInvoiceModel;
import com.intelizign.dmgcc.repositories.SLAInvoiceRepository;
import com.intelizign.dmgcc.repositories.SLAPreInvoiceRepository;
import com.intelizign.dmgcc.response.myssc.MySSCInvoiceResponse;
import com.intelizign.dmgcc.response.myssc.MySSCInvoiceStatus;

@Service
@Transactional
public class MySSCSchedulerService {

	@Autowired
	private SLAPreInvoiceRepository slaPreInvoiceReposito;

	@Autowired
	SLAInvoiceRepository slaInvoiceRepository;

	@Autowired
	private SLAService slaservice;

	@Autowired
	private MySSCAPIServices mysscslaservice;

	public void updatePreinvoiceStatus() {
		List<String> preinvoice_id = slaPreInvoiceReposito.getUnApprovedPreinvoiceID();
		if (!preinvoice_id.isEmpty()) {
			MySSCInvoiceStatus response_data = mysscslaservice.updatePreinvoiceStatusfromMySSC(preinvoice_id);
			if (response_data.getIsSuccess().equals(true) && response_data.getHttpStatusCode() == 200) {
				response_data.getData().stream().forEach(data -> {
					Optional<SLAPreInvoiceModel> retrived_preinvoice_data = slaPreInvoiceReposito
							.getByPreinvoiceAndSLAid(data.getSlaid(), data.getPreinvoice_id());
					if (retrived_preinvoice_data.isPresent()) {
						SLAPreInvoiceModel preinvoice = retrived_preinvoice_data.get();
						preinvoice.setStatus(data.getStatus());
						slaPreInvoiceReposito.save(preinvoice);
					}
				});
			}

		}
	}

	public void getInvoicesForPreinvoice() {
		List<String> preinvoice_id = slaPreInvoiceReposito.getApprovedPreinvoiceID();
		if (!preinvoice_id.isEmpty()) {
			MySSCInvoiceResponse response_data = mysscslaservice.getInvoiceForPreinvoicefromMySSC(preinvoice_id);
			if (response_data.getIsSuccess().equals(true) && response_data.getHttpStatusCode() == 200
					&& !response_data.getData().isEmpty()) {
				slaservice.saveInvoiceData(response_data.getData());
			}

		}
	}

	public void getInvoiceStatusFromMySSC() {
		List<String> incomplete_invoices = slaInvoiceRepository.findIncompleteInvoices();
		if (!incomplete_invoices.isEmpty()) {
			MySSCInvoiceStatus response_data = mysscslaservice.updateInvoiceStatusfromMySSC(incomplete_invoices);
			if (response_data.getIsSuccess().equals(true) && response_data.getHttpStatusCode() == 200) {
				response_data.getData().stream().forEach(data -> {
					Optional<SLAInvoiceModel> retrived_invoice_data = slaInvoiceRepository
							.getByInvoiceID(data.getInvoice_id());
					if (retrived_invoice_data.isPresent()) {
						SLAInvoiceModel invoice = retrived_invoice_data.get();
						invoice.setStatus(data.getStatus());
						slaInvoiceRepository.save(invoice);
					}
				});
			}
		}
	}

}

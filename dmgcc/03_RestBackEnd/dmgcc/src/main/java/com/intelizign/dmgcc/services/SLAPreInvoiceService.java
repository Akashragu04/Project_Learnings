package com.intelizign.dmgcc.services;

import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.intelizign.dmgcc.authendication.UserDetailsImpl;
import com.intelizign.dmgcc.models.G3CEmployeeMasterModel;
import com.intelizign.dmgcc.models.SLAModel;
import com.intelizign.dmgcc.models.SLAPreInvoiceModel;
import com.intelizign.dmgcc.models.businesscasemodels.BusinessCaseRequest;
import com.intelizign.dmgcc.pojoclass.SLAContacts;
import com.intelizign.dmgcc.pojoclass.SLAPreInvoiceTariffSheet;
import com.intelizign.dmgcc.pojoclass.SLATariffSheet;
import com.intelizign.dmgcc.repositories.G3CEmployeeRepository;
import com.intelizign.dmgcc.repositories.SLAPreInvoiceRepository;
import com.intelizign.dmgcc.repositories.TimesheetRepository;
import com.intelizign.dmgcc.response.SLAPreInvoiceResponse;

@Service
@Transactional
public class SLAPreInvoiceService {

	@Autowired
	TimesheetRepository timesheetRepository;

	@Autowired
	SLAPreInvoiceRepository slaPreinvoiceRepository;

	@Autowired
	G3CEmployeeRepository g3cEmployeeRepository;

	@Autowired
	private Environment env;

	public final Logger LOGGER = LogManager.getLogger(SLAPreInvoiceService.class);

	private static final DecimalFormat doubleFormat = new DecimalFormat("0.00");

	public List<SLAPreInvoiceTariffSheet> getPreinvoiceTarrifSheet(List<SLATariffSheet> sla_tariffsheet,
			SLAPreInvoiceModel preinvoicedata) {
		List<SLAPreInvoiceTariffSheet> Sla_preinvoice_tariffsheets = new ArrayList<>();
		for (SLATariffSheet slatarrif : sla_tariffsheet) {
			SLAPreInvoiceTariffSheet preinvoice_tarrif = new SLAPreInvoiceTariffSheet();

			double remainingBudget = getRemainingBudgetFromSLABudget(preinvoicedata.getSla().getId(),
					slatarrif.getMaterial_description());
			remainingBudget = Double.valueOf(slatarrif.getAmount()) - remainingBudget;

			if (remainingBudget == 0 || remainingBudget == 0.0) {
				remainingBudget = Double.valueOf(slatarrif.getAmount());
			}

			if (remainingBudget > Double.valueOf(slatarrif.getAmount())) {
				return Sla_preinvoice_tariffsheets;
			}

			if (slatarrif.getMaterial_description().contains("Internal Manpower")) {
				preinvoice_tarrif.setMaterial_description(slatarrif.getMaterial_description());
				preinvoice_tarrif
						.setQuantity(doubleFormat.format((getPreinvoiceQuantity(preinvoicedata) / (double) 9)));
				preinvoice_tarrif.setRate(slatarrif.getRate());
				preinvoice_tarrif.setUnits(slatarrif.getUnits());
				preinvoice_tarrif.setQuantity(slatarrif.getEstimated_quantity());

				Double amount;
				if (slatarrif.getUnits().equals("Mandays"))
					amount = (getPreinvoiceQuantity(preinvoicedata) / (double) 9) * Double.valueOf(slatarrif.getRate());
				else
					amount = getPreinvoiceQuantity(preinvoicedata) * Double.valueOf(slatarrif.getRate());
				Double markupValue = (slatarrif.getMarkup_value() == null) ? 0
						: Double.valueOf(slatarrif.getMarkup_value());
				preinvoice_tarrif.setAmount(String.valueOf(doubleFormat.format(amount)));
				preinvoice_tarrif.setMarkup_value(String.valueOf(doubleFormat.format(amount * (markupValue / 100))));
				preinvoice_tarrif
						.setTotal_amount(String.valueOf(doubleFormat.format(amount + (amount * (markupValue / 100)))));
				preinvoice_tarrif.setBudget_available(String.valueOf(remainingBudget));
				Sla_preinvoice_tariffsheets.add(preinvoice_tarrif);
			} else {
				preinvoice_tarrif.setMaterial_description(slatarrif.getMaterial_description());
				preinvoice_tarrif.setRate(slatarrif.getRate());
				preinvoice_tarrif.setUnits(slatarrif.getUnits());
				preinvoice_tarrif.setQuantity(slatarrif.getEstimated_quantity());

				preinvoice_tarrif.setBudget_available(String.valueOf(remainingBudget));
				Sla_preinvoice_tariffsheets.add(preinvoice_tarrif);
			}
		}
		return Sla_preinvoice_tariffsheets;

	}

	private Long getRemainingBudgetFromSLABudget(long id, String material) {
		List<SLAPreInvoiceModel> allActivePreinvoice = slaPreinvoiceRepository.findByAllActivePreInvoiceBySlaID(id);

		long working_hours1 = allActivePreinvoice.stream()
				.filter(sladetial -> Objects.nonNull(sladetial.getSla_preinvoice_tariffsheet()))
				.flatMapToLong(
						sladetial -> sladetial.getSla_preinvoice_tariffsheet().stream()
								.filter(traffic -> traffic.getMaterial_description().contains(material))
								.mapToLong(traffic -> Integer
										.parseInt(traffic.getTotal_amount() != null ? traffic.getTotal_amount() : "0")))
				.sum();

		return working_hours1;
	}

	public Long getPreinvoiceQuantity(SLAPreInvoiceModel preinvoicedata) {

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		Long requestData = timesheetRepository.getPreinvoiceQuantity(
				LocalDate.parse(preinvoicedata.getStart_date(), formatter),
				LocalDate.parse(preinvoicedata.getEnd_date(), formatter), preinvoicedata.getSla().getId());
		if (Objects.isNull(requestData)) {
			requestData = (long) 0;
		}
		return requestData;
	}

	public List<SLAPreInvoiceTariffSheet> getOtherPreinvoiceTarrifSheet(List<SLATariffSheet> sla_tariffsheet,
			SLAModel sladata) {
		List<SLAPreInvoiceTariffSheet> Sla_preinvoice_tariffsheets = new ArrayList<>();
		for (SLATariffSheet slatarrif : sla_tariffsheet) {
			SLAPreInvoiceTariffSheet preinvoice_tarrif = new SLAPreInvoiceTariffSheet();

//			if (slatarrif.getMaterial_description().contains("Internal")) {
//				Double billed_hours = timesheetRepository.findbySLAID(sladata.getId());
//				Double amount = (Double.parseDouble(slatarrif.getRate()) * billed_hours);
//				preinvoice_tarrif.setAmount(Double.toString(amount));
//			}
			double remainingBudget = getRemainingBudgetFromSLABudget(sladata.getId(),
					slatarrif.getMaterial_description());
			remainingBudget = Double.valueOf(slatarrif.getAmount()) - remainingBudget;

			if (remainingBudget == 0 || remainingBudget == 0.0) {
				remainingBudget = Double.valueOf(slatarrif.getAmount());
			}

			if (remainingBudget > Double.valueOf(slatarrif.getAmount())) {
				return Sla_preinvoice_tariffsheets;
			}
			preinvoice_tarrif.setMaterial_description(slatarrif.getMaterial_description());
			preinvoice_tarrif.setRate(slatarrif.getRate());
			preinvoice_tarrif.setBudget_available(String.valueOf(remainingBudget));
			preinvoice_tarrif.setUnits(slatarrif.getUnits());
			preinvoice_tarrif.setQuantity(slatarrif.getEstimated_quantity());
			Sla_preinvoice_tariffsheets.add(preinvoice_tarrif);

		}
		return Sla_preinvoice_tariffsheets;

	}

	public SLAPreInvoiceModel setPreinvoiceDetailsFromSLA(SLAPreInvoiceModel slaPreInvoiceModel, SLAModel sladata) {
		slaPreInvoiceModel.setSlaid(sladata.getSlaid());
		slaPreInvoiceModel.setCustomer(sladata.getCustomer_company());
		slaPreInvoiceModel.setProject_name(sladata.getProject_name());
		slaPreInvoiceModel.setCost_center(sladata.getCustomer_cost_center());
		slaPreInvoiceModel.setCurrency(sladata.getCurrency());
		slaPreInvoiceModel.setService_description(sladata.getService_description());
		slaPreInvoiceModel.setAddress(sladata.getCustomer_address());
		slaPreInvoiceModel.setBilling_cycle(sladata.getBilling_cycle());
		slaPreInvoiceModel.setSla_contacts(sladata.getSla_contacts());
		slaPreInvoiceModel.setSlaname(sladata.getSlaname());
		slaPreInvoiceModel.setTeam(sladata.getTeam());
		return slaPreInvoiceModel;
	}

	public SLAPreInvoiceResponse getPreinvoiceDetailsForSsc(SLAPreInvoiceModel slaPreInvoiceModel, SLAModel sladata,
			UserDetailsImpl userData) {

		SLAPreInvoiceResponse slaPreInvoiceResponse = new SLAPreInvoiceResponse();

		// For PreInvoice isSLA true & service provider type
		List<SLAContacts> slaContactsApprover = slaPreInvoiceModel.getSla_contacts();

		SLAContacts preInvoiceApprover = slaContactsApprover.stream()
				.filter((p) -> "Service Provider".equals(p.getCustomer_type()) && p.getIs_sla() == true).findAny()
				.orElse(null);
		System.out.println(preInvoiceApprover);

		if (preInvoiceApprover != null) {

			G3CEmployeeMasterModel providerData = g3cEmployeeRepository.findByEmail(preInvoiceApprover.getEmail());
			slaPreInvoiceResponse.setPreinvoice_approved_by(providerData.getShortid());
		}

		// For PreInvoice isPreinvoice true & service provider type
		SLAContacts prjTeamApprover = slaContactsApprover.stream()
				.filter((p) -> "Service Provider".equals(p.getCustomer_type()) && p.getIs_pre_invoice() == true)
				.findAny().orElse(null);

		System.out.println(prjTeamApprover);

		if (prjTeamApprover != null) {

			G3CEmployeeMasterModel prjTeamData = g3cEmployeeRepository.findByEmail(prjTeamApprover.getEmail());
			slaPreInvoiceResponse.setPrj_approved_by(prjTeamData.getShortid());
		}

		// For PreInvoice isPreinvoice true & service provider type
		SLAContacts cusTeamApprover = slaContactsApprover.stream()
				.filter((p) -> "Service Receiver".equals(p.getCustomer_type()) && p.getIs_pre_invoice() == true)
				.findAny().orElse(null);

		System.out.println(cusTeamApprover);

		if (cusTeamApprover != null) {

			G3CEmployeeMasterModel cusTeamData = g3cEmployeeRepository.findByEmail(cusTeamApprover.getEmail());
			slaPreInvoiceResponse.setCust_approved_by(cusTeamData.getShortid());
		}

		// For Finance Team Short Id

		BusinessCaseRequest businessData = slaPreInvoiceModel.getSla().getProject().getBizcase();
		slaPreInvoiceResponse.setSlaid(sladata.getSlaid());
		slaPreInvoiceResponse.setRemark(slaPreInvoiceModel.getRemarks());
		slaPreInvoiceResponse.setTotal_amount(slaPreInvoiceModel.getTotal_budget());
		slaPreInvoiceResponse.setService_period(slaPreInvoiceModel.getPreinvoice_period());
		slaPreInvoiceResponse.setPreinvoice_date(slaPreInvoiceModel.getPreinvoice_date());
		slaPreInvoiceResponse.setSla_contacts(slaPreInvoiceModel.getSla_contacts());
		slaPreInvoiceResponse.setSla_preinvoice_tariffsheet(slaPreInvoiceModel.getSla_preinvoice_tariffsheet());
		slaPreInvoiceResponse.setCtrl_approved_by(businessData.getAssign_finance_team());
		slaPreInvoiceResponse.setPreinvoice_file_name(sladata.getSla_argeement_document().getSupporting_files_name());
		slaPreInvoiceResponse.setPreinvoice_file_path(sladata.getSla_argeement_document().getSupporting_files_url());
		slaPreInvoiceResponse.setPreinvoice_created_on(
				LocalDateTime.now(ZoneId.of(env.getProperty("spring.app.timezone"))).toString());
		slaPreInvoiceResponse.setPreinvoice_created_by(userData.getShortid());
		slaPreInvoiceResponse.setPreinvoice_updatedby(userData.getShortid());
		slaPreInvoiceResponse.setAttachments(slaPreInvoiceModel.getAttachments());

		return slaPreInvoiceResponse;
	}

	public double calculatePreInvoicetotalamount(List<SLAPreInvoiceTariffSheet> sla_preinvoice_tariffsheet) {
		double preinvoice_total_amountLong = 0;
		for (SLAPreInvoiceTariffSheet slaPreInvoiceTariffSheet : sla_preinvoice_tariffsheet) {
			preinvoice_total_amountLong += Double.parseDouble(slaPreInvoiceTariffSheet.getTotal_amount());
			double budget = Double.parseDouble(slaPreInvoiceTariffSheet.getBudget_available())
					- Double.parseDouble(slaPreInvoiceTariffSheet.getTotal_amount());
			slaPreInvoiceTariffSheet.setBudget_available(Double.toString(budget));
		}
		return preinvoice_total_amountLong;
	}
}

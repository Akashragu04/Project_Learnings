package com.intelizign.dmgcc.services;

import java.io.FileOutputStream;
import java.io.OutputStream;
import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;
import org.xhtmlrenderer.pdf.ITextRenderer;

import com.intelizign.dmgcc.models.CostCenterModel;
import com.intelizign.dmgcc.models.G3CEmployeeMasterModel;
import com.intelizign.dmgcc.models.ProjectModel;
import com.intelizign.dmgcc.models.ResourceAllocationModel;
import com.intelizign.dmgcc.models.SLAApproval;
import com.intelizign.dmgcc.models.SLAInvoiceModel;
import com.intelizign.dmgcc.models.SLAModel;
import com.intelizign.dmgcc.models.SLAPreInvoiceModel;
import com.intelizign.dmgcc.models.othermaster.G3CMarketValueModel;
import com.intelizign.dmgcc.pojoclass.RevenueCostCenterAllocation;
import com.intelizign.dmgcc.pojoclass.SLABillingCycle;
import com.intelizign.dmgcc.pojoclass.SLAContacts;
import com.intelizign.dmgcc.pojoclass.SLACustomerType;
import com.intelizign.dmgcc.pojoclass.SLAOrganaization;
import com.intelizign.dmgcc.pojoclass.SLATariffSheet;
import com.intelizign.dmgcc.pojoclass.SLAcycle;
import com.intelizign.dmgcc.repositories.CostCenterRepository;
import com.intelizign.dmgcc.repositories.G3CEmployeeRepository;
import com.intelizign.dmgcc.repositories.SLAInvoiceRepository;
import com.intelizign.dmgcc.repositories.SLAPreInvoiceRepository;
import com.intelizign.dmgcc.repositories.SLAapprovalRepository;
import com.intelizign.dmgcc.repositories.othermaster.G3CMarketValueRepository;
import com.intelizign.dmgcc.request.SLARequest;
import com.intelizign.dmgcc.request.bizcase.SubModel;
import com.intelizign.dmgcc.response.SLACreateResponse;
import com.intelizign.dmgcc.response.myssc.MySSCInvoiceResponse.InvoiceResponse;

@Service
@Transactional
public class SLAService {

	@Autowired
	private SLAPreInvoiceRepository slaPreInvoiceReposito;

	@Autowired
	private G3CEmployeeRepository g3cEmployeeRepository;

	@Autowired
	private CostCenterRepository costCenterRepository;

	@Autowired
	private SLAInvoiceRepository slaInvoiceRepository;

	@Autowired
	private G3CMarketValueRepository g3cMarketValueRepository;

	@Autowired
	private Environment env;

	@Autowired
	private SLAapprovalRepository slaApprovalRepository;

	public final Logger LOGGER = LogManager.getLogger(SLAService.class);

	private static final DecimalFormat doubleFormat = new DecimalFormat("0.00");

	public SLACreateResponse getSLADetailsToCreate(ProjectModel project_data) {
		if (project_data.getBizcase().getSla_business_case().equals(true)) {
			if (project_data.getBizcase().getBusiness_availability().equals("with_rate")) {
				SLACreateResponse sla_details = getProjectDetailsForSLACreate(project_data);
				List<SLATariffSheet> all_sla_tarriffs = new ArrayList<>();
				all_sla_tarriffs.addAll(getSLADetailsWithRatecard(project_data.getBizcase().getIt_info(), "IT-Infra",
						project_data.getCost_center()));
				all_sla_tarriffs.addAll(getSLADetailsWithRatecard(project_data.getBizcase().getSystem_access(),
						"IT-Infra", project_data.getCost_center()));
				all_sla_tarriffs.addAll(getSLADetailsWithRatecard(project_data.getBizcase().getThirdparty_service(),
						"3rd Party Services", project_data.getCost_center()));
				all_sla_tarriffs.addAll(getSLADetailsWithRatecard(project_data.getBizcase().getOther_cost(),
						"Other Cost", project_data.getCost_center()));
				all_sla_tarriffs.addAll(getSLADetailsWithRatecard(project_data.getBizcase().getTravel_cost(), "Travel",
						project_data.getCost_center()));
				all_sla_tarriffs.addAll(getSLADetailsWithRatecard(project_data.getBizcase().getFacility(),
						"engineer/Prototype", project_data.getCost_center()));
				sla_details.setTarriffsheets(all_sla_tarriffs);
				return sla_details;

			} else if (project_data.getBizcase().getBusiness_availability().equals("without_rate")) {
				SLACreateResponse sla_details = getProjectDetailsForSLACreate(project_data);
				List<SLATariffSheet> all_sla_tarriffs = new ArrayList<>();
				all_sla_tarriffs
						.addAll(getSLADetailsWithRatecard(project_data.getBizcase().getNewratecard().getBizit_info(),
								"IT-Infra", project_data.getCost_center()));
				all_sla_tarriffs.addAll(
						getSLADetailsWithRatecard(project_data.getBizcase().getNewratecard().getBizsystem_access(),
								"IT-Infra", project_data.getCost_center()));
				all_sla_tarriffs.addAll(
						getSLADetailsWithRatecard(project_data.getBizcase().getNewratecard().getBizthirdparty_service(),
								"3rd Party Services", project_data.getCost_center()));
				all_sla_tarriffs
						.addAll(getSLADetailsWithRatecard(project_data.getBizcase().getNewratecard().getBizother_cost(),
								"Other Cost", project_data.getCost_center()));
				all_sla_tarriffs.addAll(
						getSLADetailsWithRatecard(project_data.getBizcase().getNewratecard().getBiztravel_cost(),
								"Travel", project_data.getCost_center()));
				all_sla_tarriffs
						.addAll(getSLADetailsWithRatecard(project_data.getBizcase().getNewratecard().getBizfacility(),
								"engineer/Prototype", project_data.getCost_center()));
				sla_details.setTarriffsheets(all_sla_tarriffs);
				return sla_details;
			} else {
				return null;
			}

		} else {
			SLACreateResponse sla_details = getProjectDetailsForSLACreate(project_data);
			return sla_details;
		}
	}

	public SLACreateResponse getProjectDetailsForSLACreate(ProjectModel project_data) {
		SLACreateResponse sla_details = new SLACreateResponse();

		List<RevenueCostCenterAllocation> revenue_cost_center = new ArrayList<>();
		RevenueCostCenterAllocation current_cost_center = new RevenueCostCenterAllocation();
		current_cost_center.setCost_center(project_data.getCost_center());
		current_cost_center.setAllocate_percentage(0);
		revenue_cost_center.add(current_cost_center);
		sla_details.setRevenue_cost_center(revenue_cost_center);

		sla_details.setProject(project_data);
		sla_details.setCustomer_costcenter(project_data.getBizcase().getLead().getService_receiver_cost_center());
		sla_details
				.setCustomer_costcenter_manager(project_data.getBizcase().getLead().getService_provider_contact_name());
		Optional<CostCenterModel> costcenter = costCenterRepository.findByCostcenter(project_data.getCost_center());
		if (costcenter.isPresent()) {
			sla_details.setTeam(costcenter.get().getTeam());
		}
		List<G3CEmployeeMasterModel> contacts = g3cEmployeeRepository
				.findOnlyByCostcenter(project_data.getCost_center());
		if (!contacts.isEmpty()) {
			sla_details.setContacts(contacts);
		}

		return sla_details;
	}

	public List<SLATariffSheet> getSLADetailsWithRatecard(List<SubModel> submodel, String department,
			String cost_center) {
		return setTarriffDataInSubModel(submodel, department, cost_center);

	}

	public List<SLATariffSheet> getSLADetailsWithOutRatecard(List<SubModel> submodel, String department,
			String cost_center) {
		List<SubModel> filterd_submodel = submodel.stream().filter(data -> !data.getIsratecard().equals(true)).toList();
		return setTarriffDataInSubModel(filterd_submodel, department, cost_center);

	}

	public List<SLATariffSheet> setTarriffDataInSubModel(List<SubModel> submodel, String department,
			String cost_center) {
		List<SLATariffSheet> all_sla_tarriffs = new ArrayList<>();
		submodel.stream().forEach(dept_data -> {
			SLATariffSheet sla_tarriffs = new SLATariffSheet();
			if (Double.parseDouble(dept_data.getCost()) != 0) {
				sla_tarriffs.setCost_center_code(cost_center);
				sla_tarriffs.setAmount(dept_data.getCost());
				sla_tarriffs.setEstimated_quantity(dept_data.getQuantity());
				sla_tarriffs.setMaterial_description(department);
				if (dept_data.getQuantity() != null && !dept_data.getQuantity().isBlank()) {
					sla_tarriffs.setRate(doubleFormat.format(
							Double.parseDouble(dept_data.getCost()) / Double.parseDouble(dept_data.getQuantity())));
				}

				if (!department.equals("Travel")) {
					sla_tarriffs.setHas_markup(true);
					sla_tarriffs.setMarkup_value("13.5");
					sla_tarriffs.setMarkup_amount(doubleFormat.format(Double.parseDouble(dept_data.getCost()) * 0.135));

				} else {
					sla_tarriffs.setHas_markup(false);
					sla_tarriffs.setMarkup_value("0");
					sla_tarriffs.setMarkup_amount("0");

				}
				all_sla_tarriffs.add(sla_tarriffs);
			}
		});
		return all_sla_tarriffs;
	}

	public List<SLAcycle> getSLAcycle(SLAModel slamodel) {

		List<SLAcycle> sla_cycles = new ArrayList<>();

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");

		DateTimeFormatter preInvoive_formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

		LocalDate start_date = LocalDate.parse(slamodel.getStart_date(), formatter);
		LocalDate end_date = LocalDate.parse(slamodel.getEnd_date(), formatter);
		String cycle = slamodel.getBilling_cycle();
		boolean exist_loop_key = true;
		LocalDate initail_date = start_date;
		boolean first_time_Monthly = true;
		int invoice_cycle = 1;
		while (exist_loop_key) {

			SLAPreInvoiceModel pre_invoice = new SLAPreInvoiceModel();
			SLAcycle slaCycle = new SLAcycle();
			Calendar cal = Calendar.getInstance();
			cal.setTime(Date.from(initail_date.atStartOfDay(ZoneId.systemDefault()).toInstant()));
			if (cycle.equals("Monthly") || cycle.equals("Quarterly") || cycle.equals("Half Yearly")
					|| cycle.equals("Yearly")) {
				slaCycle.setStart_date(initail_date.format(preInvoive_formatter));
				pre_invoice.setStart_date(initail_date.format(preInvoive_formatter));

				// temporarily saving cycle start and end to set preinvoice period
				LocalDate cycle_start_date = initail_date;

				switch (cycle) {
				case "Monthly":
					cal.add(Calendar.MONTH, +0);
					break;
				case "Quarterly":
					cal.add(Calendar.MONTH, +2);
					break;
				case "Half Yearly":
					cal.add(Calendar.MONTH, +5);
					break;
				case "Yearly":
					cal.add(Calendar.MONTH, +11);
					break;

				default:
					return null;
				}
				cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DAY_OF_MONTH));
				LocalDate localDate = LocalDateTime.ofInstant(cal.toInstant(), cal.getTimeZone().toZoneId())
						.toLocalDate();
				if (localDate.isAfter(end_date) || localDate.isEqual(end_date)) {
					localDate = end_date;
					exist_loop_key = false;
				} else {
					initail_date = localDate.plusDays(1);
				}
				// temporarily saving cycle start and end to set preinvoice period
				LocalDate cycle_end_date = localDate;
				if (cycle_start_date.getMonth().equals(cycle_end_date.getMonth())) {

					slaCycle.setStatus(cycle_start_date.getMonth() + " " + cycle_end_date.getYear());
					pre_invoice.setPreinvoice_period(cycle_start_date.getMonth() + " " + cycle_end_date.getYear());
				} else {

					slaCycle.setStatus(cycle_start_date.getMonth() + "-" + cycle_end_date.getMonth() + " "
							+ cycle_end_date.getYear());
					pre_invoice.setPreinvoice_period(cycle_start_date.getMonth() + " " + cycle_start_date.getYear()
							+ "-" + cycle_end_date.getMonth() + " " + cycle_end_date.getYear());
				}

				slaCycle.setEnd_date(localDate.format(preInvoive_formatter));
				sla_cycles.add(slaCycle);
				pre_invoice.setEnd_date(localDate.format(preInvoive_formatter));
				pre_invoice.setPreinvoice_cycle(invoice_cycle);
				pre_invoice.setBilling_cycle(cycle);
				pre_invoice.setSla(slamodel);
				slaPreInvoiceReposito.save(pre_invoice);

			} else if (cycle.equals("One-Time")) {
				LOGGER.info(start_date + "    -     " + end_date + "     cylce   " + start_date.getMonth());
				exist_loop_key = false;
				slaCycle.setStart_date(start_date.format(formatter));
				slaCycle.setEnd_date(end_date.format(formatter));
				slaCycle.setStatus(start_date.getMonth() + "-" + end_date.getMonth() + " " + start_date.getYear());
				sla_cycles.add(slaCycle);

				pre_invoice.setStart_date(start_date.format(formatter));
				pre_invoice.setEnd_date(end_date.format(formatter));
				pre_invoice.setSlaid(slamodel.getSlaid());
				pre_invoice.setBilling_cycle(cycle);
				pre_invoice.setPreinvoice_cycle(invoice_cycle);
				pre_invoice.setSla(slamodel);
				pre_invoice.setPreinvoice_period(
						start_date.getMonth() + "-" + end_date.getMonth() + " " + end_date.getYear());
				slaPreInvoiceReposito.save(pre_invoice);

			}
			invoice_cycle++;
		}
		return sla_cycles;
	}

	public SLAApproval slaApprovalsSave(SLAContacts slaContact, long slaid) {
		SLAApproval sla_approval = new SLAApproval();
		Optional<SLAApproval> sla_approval_check = slaApprovalRepository.findByApprover(slaContact.getEmail(), slaid);
		if (sla_approval_check.isPresent()) {
			sla_approval = sla_approval_check.get();
			sla_approval.setIs_primary(slaContact.getPrimary());
			sla_approval.setKey_person(slaContact.getKey_person());
			sla_approval.setIs_sla(slaContact.getIs_sla());
			sla_approval.setIs_pre_invoice(slaContact.getIs_pre_invoice());
		} else {
			sla_approval.setShort_name(slaContact.getShort_name());
			sla_approval.setName(slaContact.getName());
			sla_approval.setEmail(slaContact.getEmail());
			sla_approval.setCustomer_type(slaContact.getCustomer_type());
			sla_approval.setIs_primary(slaContact.getPrimary());
			sla_approval.setKey_person(slaContact.getKey_person());
			sla_approval.setIs_sla(slaContact.getIs_sla());
			sla_approval.setIs_pre_invoice(slaContact.getIs_pre_invoice());
		}
		return sla_approval;

	}

	private SLAOrganaization getCheckedOrganization(Boolean daimler, Boolean car, Boolean truck, Boolean finance,
			Boolean other) {
		SLAOrganaization org_data = new SLAOrganaization();
		org_data.setDaimler(daimler);
		org_data.setCar(car);
		org_data.setTruck(truck);
		org_data.setFinance(finance);
		org_data.setOther(other);

		return org_data;
	}

	private SLABillingCycle getSelectedBillingCycle(String sla_billing_cycle) {

		switch (sla_billing_cycle) {
		case "Monthly":
			SLABillingCycle monthly = getCheckedBillingCycle(true, false, false, false, false);
			return monthly;
		case "Quarterly":
			SLABillingCycle quarter = getCheckedBillingCycle(false, true, false, false, false);
			return quarter;
		case "Half Yearly":
			SLABillingCycle half = getCheckedBillingCycle(false, false, true, false, false);
			return half;
		case "Yearly":
			SLABillingCycle year = getCheckedBillingCycle(false, false, false, true, false);
			return year;
		case "One-Time":
			SLABillingCycle once = getCheckedBillingCycle(false, false, false, false, true);
			return once;

		default:
			return null;
		}
	}

	private SLABillingCycle getCheckedBillingCycle(Boolean month, Boolean quarter, Boolean half, Boolean year,
			Boolean once) {
		SLABillingCycle billing_cycle = new SLABillingCycle();
		billing_cycle.setMonth(month);
		billing_cycle.setQuarter(quarter);
		billing_cycle.setHalf(half);
		billing_cycle.setYear(year);
		billing_cycle.setOnce(once);

		return billing_cycle;
	}

	private SLACustomerType getSLAContacts(List<SLAContacts> slacontacts) {
		SLACustomerType filtered_sla_customertype = new SLACustomerType();
		List<SLAContacts> provider = new ArrayList<SLAContacts>();
		List<SLAContacts> customer = new ArrayList<SLAContacts>();
		for (SLAContacts slacontact : slacontacts) {
			if (slacontact.getCustomer_type().equalsIgnoreCase("Service Provider")) {
				provider.add(slacontact);
			} else if (slacontact.getCustomer_type().equalsIgnoreCase("Service Receiver")) {
				customer.add(slacontact);
			} else {
				return null;
			}
		}

		filtered_sla_customertype.setProvider(provider);
		filtered_sla_customertype.setCustomer(customer);
		return filtered_sla_customertype;
	}

	public void closeSLA(SLAModel sla_data) {
		Set<ResourceAllocationModel> mapped_resource = sla_data.getResources();

		for (ResourceAllocationModel resource : mapped_resource) {

			G3CEmployeeMasterModel employee_data = resource.getUser();

			employee_data.setCapacity(employee_data.getCapacity() + resource.getCapcity());

			g3cEmployeeRepository.save(employee_data);

		}

	}

	public void xhtmlToPdf(SLAModel sladata, String otuput_filename, List<SLAContacts> sla_all_contacts)
			throws Exception {
		final String PDF_OUTPUT = env.getProperty("app.file.upload-dir") + "/" + otuput_filename + ".pdf";
		OutputStream fileOutputStream = new FileOutputStream(PDF_OUTPUT);
		SLACustomerType slacontacts = getSLAContacts(sla_all_contacts);
		Map<String, Object> sla_map = new HashMap<>();
		sla_map.put("sla", sladata);
		sla_map.put("organization", getSelectedOrganiztion(sladata.getOrganization_type()));
		sla_map.put("billing", getSelectedBillingCycle(sladata.getBilling_cycle()));
		sla_map.put("slaCustomers", slacontacts.getCustomer());
		sla_map.put("slaProviders", slacontacts.getProvider());

		Context context = new Context();
		context.setVariables(sla_map);

		TemplateEngine templateEngine = new TemplateEngine();

		ClassLoaderTemplateResolver pdfTemplateResolver = new ClassLoaderTemplateResolver();

		pdfTemplateResolver.setPrefix("generatepdftemplate/");
		pdfTemplateResolver.setSuffix(".html");
		pdfTemplateResolver.setTemplateMode(TemplateMode.HTML);
		pdfTemplateResolver.setCharacterEncoding("UTF-8");
		pdfTemplateResolver.setOrder(1);
		templateEngine.setTemplateResolver(pdfTemplateResolver);

		final String htmlContent = templateEngine.process("slapdftemplate", context);
		ITextRenderer renderer = new ITextRenderer();
		renderer.setDocumentFromString(htmlContent);
		renderer.layout();
		renderer.createPDF(fileOutputStream, false);
		renderer.finishPDF();

	}

	private SLAOrganaization getSelectedOrganiztion(String sla_organization) {
		switch (sla_organization) {
		case "Daimler HQ":
			SLAOrganaization daimler = getCheckedOrganization(true, false, false, false, false);
			return daimler;
		case "Cars/Vans":
			SLAOrganaization cars = getCheckedOrganization(false, true, false, false, false);
			return cars;
		case "Trucks/Buses":
			SLAOrganaization truck = getCheckedOrganization(false, false, true, false, false);
			return truck;
		case "Financial Services":
			SLAOrganaization finance = getCheckedOrganization(false, false, false, true, false);
			return finance;
		case "Other Daimler Affiliates":
			SLAOrganaization other = getCheckedOrganization(false, false, false, false, true);
			return other;
		default:
			return null;

		}

	}

	public void saveInvoiceData(List<InvoiceResponse> invoices) {
		try {
			invoices.stream().forEach(InvoiceModel -> {
				Optional<SLAPreInvoiceModel> retrived_preinvoice_data = slaPreInvoiceReposito
						.getByPreinvoiceId(InvoiceModel.getPreInvoiceId());
				if (retrived_preinvoice_data.isPresent()) {
					Optional<SLAInvoiceModel> invoice_exist = slaInvoiceRepository.getByInvoiceID(InvoiceModel.getId());
					if (!invoice_exist.isPresent()) {
						SLAPreInvoiceModel slaPreInvoiceModel = retrived_preinvoice_data.get();
						SLAInvoiceModel slaInvoiceModel = new SLAInvoiceModel();
						slaInvoiceModel.setSla(slaPreInvoiceModel.getSla());
						slaInvoiceModel.setSlaid(slaPreInvoiceModel.getSla().getSlaid());
						slaInvoiceModel.setPreinvoice_id(slaPreInvoiceModel.getPreinvoiceid());
						slaInvoiceModel.setProject_name(slaPreInvoiceModel.getSla().getProject_name());
						slaInvoiceModel.setTeam(slaPreInvoiceModel.getSla().getTeam());
						slaInvoiceModel.setCustomer(slaPreInvoiceModel.getSla().getCustomer_name());
						slaInvoiceModel.setDate_of_service(slaPreInvoiceModel.getPreinvoice_period());
						slaInvoiceModel.setPre_invoice_date(slaPreInvoiceModel.getPreinvoice_date());
						slaInvoiceModel
								.setSla_preinvoice_tariffsheet(slaPreInvoiceModel.getSla_preinvoice_tariffsheet());
						slaInvoiceModel.setSlapreinvoice(slaPreInvoiceModel);
						slaInvoiceModel.setStatus("Payment Initaited");
						slaInvoiceModel.setActive(true);
						slaInvoiceModel.setSlaid(slaPreInvoiceModel.getSla().getSlaid());
						slaInvoiceModel.setRemarks(slaPreInvoiceModel.getRemarks());
						slaInvoiceModel.setInvoice_date(InvoiceModel.getInvoicedate());
						slaInvoiceModel.setCurrency(InvoiceModel.getCurrency());
						slaInvoiceModel.setInvoice_id(InvoiceModel.getId());
						slaInvoiceModel.setInvoice_no(InvoiceModel.getInvoiceNo());
						slaInvoiceModel.setTotal_cost(InvoiceModel.getInvoiceValue());
						slaInvoiceModel.setGst_invoice_no(InvoiceModel.getGstInvoiceNo());
						slaInvoiceModel.setXe_rate(InvoiceModel.getXeRate());
						slaInvoiceModel.setUser_id(InvoiceModel.getCreatedUserEmail());
						slaInvoiceRepository.save(slaInvoiceModel);
						slaPreInvoiceModel.setIs_invoiced(true);
						slaPreInvoiceReposito.save(slaPreInvoiceModel);
					}
				}
			});
		} catch (Exception e) {
			LOGGER.error("Get Invoice Info error: " + e.getMessage());
		}
	}

	public double findSlaTotalBudget(List<SLATariffSheet> sla_tariffsheet, @Valid SLARequest slaRequest) {
		double total_sla_tariff_value = 0;

		for (SLATariffSheet slaTariff : sla_tariffsheet) {

			double sla_tariff_value = 0;
			if (!slaTariff.getMaterial_description().contains("|"))
				slaTariff.setMaterial_description(
						slaTariff.getMaterial_description() + "|" + slaTariff.getMaterial_code());

			Optional<G3CMarketValueModel> g3cMarketValueModel = g3cMarketValueRepository.findById((long) 1);
			if (g3cMarketValueModel.isPresent()) {
				if (Boolean.TRUE.equals(slaTariff.getHas_markup())) {

					double markup_value = (g3cMarketValueModel.get().getMarkup_value() / 100)
							* (Double.valueOf(slaTariff.getAmount()));
					slaTariff.setMarkup_amount(doubleFormat.format(markup_value));
					slaTariff.setMarkup_value(doubleFormat.format(g3cMarketValueModel.get().getMarkup_value()));
					sla_tariff_value += markup_value;
				}

				if (Boolean.TRUE.equals(slaTariff.getHas_fx_risk())) {

					double fx_value = (g3cMarketValueModel.get().getFx_value() / 100)
							* (Double.valueOf(slaTariff.getAmount()));
					sla_tariff_value += fx_value;
				}

				if (Boolean.TRUE.equals(slaTariff.getIs_taxable())) {

					double gst_value = (g3cMarketValueModel.get().getGst_value() / 100)
							* (Double.valueOf(slaTariff.getAmount()));
					sla_tariff_value += gst_value;
				}

				if (Boolean.TRUE.equals(slaTariff.getHas_wht())) {
					double wht_value = 0;
					if (slaRequest.getCustomer_country().equalsIgnoreCase("India")) {
						wht_value = (g3cMarketValueModel.get().getIndia_wht_value() / 100)
								* (Double.valueOf(slaTariff.getAmount()));
						sla_tariff_value += wht_value;
					} else {
						wht_value = (g3cMarketValueModel.get().getNon_india_wht_value() / 100)
								* (Double.valueOf(slaTariff.getAmount()));
						sla_tariff_value += wht_value;
					}
				}
			}
			if (slaTariff.getAmount() != null) {
				sla_tariff_value += Double.valueOf(slaTariff.getAmount());
				slaTariff.setAmount(String.valueOf(sla_tariff_value));
			}

			total_sla_tariff_value += sla_tariff_value;
		}

		return total_sla_tariff_value;
	}

	public double findFTEValue(List<SLATariffSheet> sla_tariffsheet, String contract_option, ProjectModel projectdata) {

		double total_FTE = 0.0;

		for (SLATariffSheet slaTariff : sla_tariffsheet) {
			if (slaTariff.getMaterial_description().contains("Internal")
					&& slaTariff.getUnits().equalsIgnoreCase("mandays")) {
				total_FTE += (Double.valueOf(slaTariff.getEstimated_quantity()) / 251);

			} else if (slaTariff.getMaterial_description().contains("Internal")
					&& slaTariff.getUnits().equalsIgnoreCase("manhours")) {
				if (contract_option.equalsIgnoreCase("onsite"))
					total_FTE += Double.valueOf(slaTariff.getEstimated_quantity())
							/ (projectdata.getTotal_fte_count() * 251 * 8);
				else
					total_FTE += Double.valueOf(slaTariff.getEstimated_quantity())
							/ (projectdata.getTotal_fte_count() * 251 * 9);
			}
		}
		return total_FTE;
	}

}

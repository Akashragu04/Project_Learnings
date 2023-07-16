package com.intelizign.dmgcc.services.othermaster;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Calendar;
import java.util.List;

import org.apache.commons.lang.ObjectUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.intelizign.dmgcc.models.ProjectModel;
import com.intelizign.dmgcc.models.SLAModel;
import com.intelizign.dmgcc.models.SLAPreInvoiceModel;
import com.intelizign.dmgcc.models.othermaster.SLAAccurals;
import com.intelizign.dmgcc.repositories.ProjectRepository;
import com.intelizign.dmgcc.repositories.SLAInvoiceRepository;
import com.intelizign.dmgcc.repositories.SLAPreInvoiceRepository;
import com.intelizign.dmgcc.repositories.SLARepository;
import com.intelizign.dmgcc.repositories.TimesheetRepository;
import com.intelizign.dmgcc.repositories.othermaster.SLAAccuralsRepository;
import com.intelizign.dmgcc.response.AccuralsResponse;
import com.intelizign.dmgcc.response.AccuralsResponse.SLADatas;
import com.intelizign.dmgcc.response.SLAAccuralsResponse;
import com.intelizign.dmgcc.response.SLAAccuralsResponse.AccuralsMonthlyData;

@Service
@Transactional
public class AccuralsService {

	@Autowired
	ProjectRepository projectRepository;

	@Autowired
	SLAPreInvoiceRepository slaPreinvoiceRepo;

	@Autowired
	SLARepository slaRepository;

	@Autowired
	SLAInvoiceRepository slaInvoiceRepo;

	@Autowired
	TimesheetRepository timesheetRepo;

	@Autowired
	SLAAccuralsRepository slaAccuralsRepository;

	@Autowired
	SLAInvoiceRepository slaInvoiceRepository;

	public final Logger LOGGER = LogManager.getLogger(AccuralsService.class);

	public List<AccuralsResponse> getAccuralsDetails(List<ProjectModel> projectdatas) {

		List<AccuralsResponse> accuralsData = new ArrayList<>();
		for (ProjectModel project : projectdatas) {
			AccuralsResponse accurals = new AccuralsResponse();
			accurals.setId(project.getId());
			accurals.setProject_code(project.getProject_id());
			accurals.setProject_name(project.getProject_name());
			accurals.setCustomer(project.getBizcase().getLead().getService_receiver_contact_name());
			Long sla_value = slaRepository.getTotalslaValues(project.getId());
			if (sla_value == null) {
				sla_value = (long) 0;
			}
			accurals.setSla_value(sla_value);
			Long revenue_so_far = slaInvoiceRepo.getTotalInvoiceValuesByproject(project.getId());
			if (revenue_so_far == null) {
				revenue_so_far = (long) 0;
			}
			accurals.setRevenue_so_far(revenue_so_far);

			accuralsData.add(accurals);

		}

		return accuralsData;

	}

	public List<SLADatas> getSLADatsByProject(ProjectModel project_data) {
		List<SLADatas> accurals_sla_data = new ArrayList<>();
		List<SLAModel> sla_details = slaRepository.findByProjectId(project_data.getId());
		if (!sla_details.isEmpty()) {
			for (SLAModel sla : sla_details) {
				SLADatas accuralSla = getSLAAccuralsData(sla);

				accurals_sla_data.add(accuralSla);
			}
		}
		return accurals_sla_data;
	}

	public Page<AccuralsResponse> createPageFromList(List<AccuralsResponse> list, Pageable pageable) {
		if (list == null) {
			throw new IllegalArgumentException("To create a Page, the list mustn't be null!");
		}

		int startOfPage = pageable.getPageNumber() * pageable.getPageSize();
		if (startOfPage > list.size()) {
			return new PageImpl<>(new ArrayList<>(), pageable, 0);
		}

		int endOfPage = Math.min(startOfPage + pageable.getPageSize(), list.size());
		return new PageImpl<>(list.subList(startOfPage, endOfPage), pageable, list.size());
	}

	public SLADatas getSLAAccuralsData(SLAModel sla) {
//		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
		SLADatas accuralSla = new SLADatas();
		accuralSla.setId(sla.getId());
		accuralSla.setSlaid(sla.getSlaid());
		accuralSla.setProject_name(sla.getProvider_address());
		accuralSla.setSlaname(sla.getSlaname());
		accuralSla.setCustomer(sla.getCustomer_name());
		accuralSla.setBilling_cycle(sla.getBilling_cycle());
		Integer max_preinvoice = slaPreinvoiceRepo.findMaxCylceByActiveSla(sla.getId());
		if (max_preinvoice != null) {
			SLAPreInvoiceModel sla_preinvoice = slaPreinvoiceRepo.findByCycle(max_preinvoice, sla.getId());
			if (sla_preinvoice != null && sla_preinvoice.getPreinvoice_date() != null) {
//				LocalDate lastinvoiceddate = LocalDate.parse(sla_preinvoice.getPreinvoice_date(), formatter);
				LocalDate lastinvoiceddate = LocalDate.parse(sla_preinvoice.getPreinvoice_date());
				if (lastinvoiceddate != null)
					accuralSla.setLast_invoiced_date(lastinvoiceddate.getMonth() + " " + lastinvoiceddate.getYear());
			}
		}
		SLAAccurals sla_accurals_data = slaAccuralsRepository.FindBySLA(sla.getId());
		if (sla_accurals_data != null) {
			accuralSla.setInvoice_revenue(sla_accurals_data.getInvoice_revenue().toString());
			accuralSla.setTotal_revenue(sla_accurals_data.getTotal_revenue().toString());
		} else {
			accuralSla.setInvoice_revenue("0");
			accuralSla.setTotal_revenue("0");
		}
		List<SLAPreInvoiceModel> preinvoice_by_sla = slaPreinvoiceRepo.findBySlaID(sla.getId());
		if (preinvoice_by_sla.isEmpty()) {
			accuralSla.setFile_upload(false);
		}
		List<SLAPreInvoiceModel> presladata = slaPreinvoiceRepo.findBySla(sla.getId());
		if (presladata.isEmpty()) {
			accuralSla.setFile_upload(false);
		}
		Integer max_cycle = slaPreinvoiceRepo.findMaxCylceByActiveSla(sla.getId());
		if (max_cycle != null) {
			SLAPreInvoiceModel sla_preinvoice = slaPreinvoiceRepo.findPreinvoiceByCycle(max_cycle + 1, sla.getId());
			if (sla_preinvoice == null) {
				accuralSla.setFile_upload(false);
			}
		}
		return accuralSla;

	}

	public List<String> getMonthsByDates(String startdate, String enddate, boolean isSLA) throws ParseException {
		List<String> headers = new ArrayList<>();
		DateFormat formater;
		if (!isSLA) {
			formater = new SimpleDateFormat("yyyy-MM-dd");
		} else {
			formater = new SimpleDateFormat("dd-MM-yyyy");
		}

		Calendar beginCalendar = Calendar.getInstance();
		Calendar finishCalendar = Calendar.getInstance();

		beginCalendar.setTime(formater.parse(startdate));
		finishCalendar.setTime(formater.parse(enddate));

		Boolean add_month = true;
		while (add_month) {

			// add one month to date per loop
			headers.add(new SimpleDateFormat("MMMM").format(beginCalendar.getTime()) + " "
					+ new SimpleDateFormat("yyyy").format(beginCalendar.getTime()));
			beginCalendar.add(Calendar.MONTH, 1);
			if (beginCalendar.after(finishCalendar)) {
				add_month = false;
			}

		}
		return headers;

	}

	public SLAAccurals getAccuralsDetailsForSLA(SLAModel sla_data, List<String> list_of_preinvoice_months)
			throws ParseException {
		SLAAccurals sla_accurals_data = new SLAAccurals();
		SLAAccurals accurals_data = slaAccuralsRepository.FindBySLA(sla_data.getId());
		// get list months from sla start and end date

		List<String> list_of_months = getMonthsByDates(sla_data.getStart_date(), sla_data.getEnd_date(), true);

		if (accurals_data != null) {
			sla_accurals_data = accurals_data;
			sla_accurals_data.getAccurals_tarriff_data().forEach(tarrif -> {
				tarrif.getMonthly_datas().stream().forEach(month -> {
					month.setActive(false);
					if (list_of_preinvoice_months.contains(month.getMonth())
							&& !ObjectUtils.equals(tarrif.getTarrif_name(), "Total")) {
						month.setActive(true);
					}

				});
			});

			return sla_accurals_data;
		} else {
			sla_accurals_data.setSlaid(sla_data.getId());
			sla_accurals_data.setSla_name(sla_data.getSlaname());
			sla_accurals_data.setBilling_cycle(sla_data.getBilling_cycle());

			Long invoice_value = slaInvoiceRepository.getTotalInvoiceValuesBySLA(sla_data.getId());
			sla_accurals_data.setInvoice_revenue(invoice_value);
			sla_accurals_data.setTotal_revenue(invoice_value);

			List<SLAAccuralsResponse> accurals_tarriff_datas = new ArrayList<>();

			sla_data.getSla_tariffsheet().stream().forEach(tarriff -> {
				SLAAccuralsResponse accurals_tarriff = getAccuralTarriffData(tarriff.getMaterial_description(),
						list_of_months, list_of_preinvoice_months);
				accurals_tarriff_datas.add(accurals_tarriff);
			});

			// for total values
			accurals_tarriff_datas.add(getAccuralTarriffData("Total", list_of_months, list_of_preinvoice_months));

			sla_accurals_data.setAccurals_tarriff_data(accurals_tarriff_datas);
			return sla_accurals_data;
		}

	}

	private SLAAccuralsResponse getAccuralTarriffData(String material_description, List<String> list_of_months,
			List<String> list_of_preinvoice_months) {
		SLAAccuralsResponse accurals_tarriff = new SLAAccuralsResponse();

		accurals_tarriff.setTarrif_name(material_description);

		List<AccuralsMonthlyData> tarrif_monthly_data = new ArrayList<>();

		list_of_months.stream().forEach(month -> {
			AccuralsMonthlyData monthly_data = new AccuralsMonthlyData();
			monthly_data.setMonth(month);

			if (list_of_preinvoice_months.contains(month) && !ObjectUtils.equals(material_description, "Total")) {
				monthly_data.setActive(true);
			}

			tarrif_monthly_data.add(monthly_data);
		});
		accurals_tarriff.setMonthly_datas(tarrif_monthly_data);

		return accurals_tarriff;
	}

	public List<String> getCurrentPreinvoiceMonthsByDate(SLAModel sla_data) throws ParseException {
		List<String> CurrentPreInvoice = new ArrayList<String>();
		Integer max_cycle = slaPreinvoiceRepo.findMaxCylceByActiveSla(sla_data.getId());
		SLAPreInvoiceModel sla_preinvoice = new SLAPreInvoiceModel();
		if (max_cycle == null) {
			sla_preinvoice = slaPreinvoiceRepo.findPreinvoiceByCycle(1, sla_data.getId());
		} else {
			sla_preinvoice = slaPreinvoiceRepo.findPreinvoiceByCycle(max_cycle + 1, sla_data.getId());
			if (sla_preinvoice == null)
				sla_preinvoice = slaPreinvoiceRepo.findPreinvoiceByCycle(max_cycle, sla_data.getId());
		}

		if (sla_preinvoice != null && sla_preinvoice.getStart_date() != null && sla_preinvoice.getEnd_date() != null) {
			CurrentPreInvoice = getMonthsByDates(sla_preinvoice.getStart_date(), sla_preinvoice.getEnd_date(), false);
		}
		return CurrentPreInvoice;
	}

	public SLAAccurals saveSLAAccurals(SLAAccurals accural) {
		SLAModel sla_data = slaRepository.findById(accural.getSlaid()).get();
		SLAAccurals accurals_data = slaAccuralsRepository.FindBySLA(accural.getSlaid());

		// getting old accurals data

		if (accurals_data == null) {
			accurals_data = accural;
			accurals_data.setSla(sla_data);
		}
		accurals_data.setAccurals_tarriff_data(accural.getAccurals_tarriff_data());

		// set invoice value
		Long invoice_value = slaInvoiceRepository.getTotalInvoiceValuesBySLA(accural.getSlaid());
		invoice_value = invoice_value != null ? invoice_value : 0l;
		accurals_data.setInvoice_revenue(invoice_value);

		// set total value
		Long total_value = accural.getAccurals_tarriff_data().stream()
				.flatMapToLong(tarrif -> tarrif.getMonthly_datas().stream()
						.filter(monthly_data -> Boolean.TRUE.equals(monthly_data.getActive()))
						.mapToLong(monthly_data -> Long.valueOf(monthly_data.getValue())))
				.sum();

//		AtomicLong total_value = new AtomicLong(0);
//		accural.getAccurals_tarriff_data().stream().forEach(tarrif -> {
//			tarrif.getMonthly_datas().stream().forEach(monthly_data -> {
//				if (Boolean.TRUE.equals(monthly_data.getActive())
//						&& !tarrif.getTarrif_name().equalsIgnoreCase("Total")) {
//					total_value.set(Long.valueOf(monthly_data.getValue()) + total_value.get());
//				}
//			});
//		});
		accurals_data.setTotal_revenue(total_value + invoice_value);
		return slaAccuralsRepository.save(accurals_data);

	}

	public String slaaccuralsExport() {
		List<SLAAccurals> slaAccurals = slaAccuralsRepository.findAllByOrderById();
		return slaaccuralInfoToExcel(slaAccurals);
	}

	private String slaaccuralInfoToExcel(List<SLAAccurals> slaAccurals) {

		LocalDate currentDate = LocalDate.now();
		String SHEET = "AccuralsReport";

		try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
			Sheet sheet = workbook.createSheet(SHEET);

			List<String> head = new ArrayList<String>();
			head.add("Project Id");
			head.add("Project Name");
			head.add("SLA ID");
			head.add("SLA Name");
			head.add("Billing Cycle");
			head.add("Trariffs");
			int y = currentDate.getYear();
			head.add("January " + y);
			head.add("February " + y);
			head.add("March " + y);
			head.add("April " + y);
			head.add("May " + y);
			head.add("June " + y);
			head.add("July " + y);
			head.add("August " + y);
			head.add("September " + y);
			head.add("October " + y);
			head.add("November " + y);
			head.add("December " + y);

			String[] HEADERs = head.stream().toArray(String[]::new);

			// Header
			Row headerRow = sheet.createRow(0);
			for (int col = 0; col < HEADERs.length; col++) {
				Cell cell = headerRow.createCell(col);
				cell.setCellValue(HEADERs[col]);
			}

			String s = Integer.toString(y);
			int rowIdx = 1;
			for (SLAAccurals slaaccural : slaAccurals) {

				SLAModel slaModel = slaRepository.findbyId(slaaccural.getSla().getId());

				if (slaaccural.getAccurals_tarriff_data() != null && !slaaccural.getAccurals_tarriff_data().isEmpty()) {
					for (SLAAccuralsResponse slaresponse : slaaccural.getAccurals_tarriff_data()) {
						Row row = sheet.createRow(rowIdx++);
						for (AccuralsMonthlyData monthdata : slaresponse.getMonthly_datas()) {
							if (monthdata.getMonth().contains(s)) {
								if (slaModel != null) {
									row.createCell(0).setCellValue(slaModel.getProject().getId());
									row.createCell(1).setCellValue(slaModel.getProject_name());
								}

								row.createCell(2).setCellValue(slaaccural.getSlaid());
								row.createCell(3).setCellValue(slaaccural.getSla_name());
								row.createCell(4).setCellValue(slaaccural.getBilling_cycle());
								row.createCell(5).setCellValue(slaresponse.getTarrif_name());
								int i = 3;
								for (AccuralsMonthlyData data : slaresponse.getMonthly_datas()) {
									row.createCell(i).setCellValue(data.getValue());
									i++;
								}
							}
						}
					}
				}

			}
			workbook.write(out);
			String res = Base64.getEncoder().encodeToString(out.toByteArray());
			return res;
		} catch (IOException e) {
			return null;
		}
	}

}

package com.intelizign.dmgcc.services.othermaster;

import org.springframework.transaction.annotation.Transactional;

import com.intelizign.dmgcc.models.othermaster.SLAProvisions;
import com.intelizign.dmgcc.models.othermaster.SlaProvisionsArchive;
import com.intelizign.dmgcc.repositories.othermaster.ProvisionsChartResponseRepository;
import com.intelizign.dmgcc.repositories.othermaster.SLAProvisionsRepository;
import com.intelizign.dmgcc.repositories.othermaster.SlaProvisionsArchiveRepository;
import com.intelizign.dmgcc.response.ProvisionsChartResponse;

import java.io.InputStream;
import java.text.ParseException;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoField;
import java.time.temporal.TemporalAccessor;
import java.util.Base64;
import java.util.List;
import java.util.Locale;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.Font;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class SlaProvisionsService {

	@Autowired
	private SlaProvisionsArchiveRepository slaProvisionsArchiveRepository;

	@Autowired
	SLAProvisionsRepository slaProvisionsRepository;

	@Autowired
	private ProvisionsChartResponseRepository provisionsChartResponseRepository;

	public final Logger LOGGER = LogManager.getLogger(SlaProvisionsService.class);

	public String slaprovisionArchiveExport() {
		List<SlaProvisionsArchive> slaProvisionsModel = slaProvisionsArchiveRepository.findAllByOrderById();
		return slaprovisionArchiveToExcel(slaProvisionsModel);
	}

	private String slaprovisionArchiveToExcel(List<SlaProvisionsArchive> slaProvisionsModel) {
		String SHEET = "slaprovision_archive_report";
		String[] HEADERs = { "ID", "Slaprovision_Id", "Costcenter", "Team", "Month", "Year", "Sla_name", "Slaid",
				"Project_name", "Vendor_name", "po_ro_Number", "Io_number", "Total_provision", "status", "comments",
				"Thirdparty_manpower_provision", "Thirdparty_service_provision", "Cross_charges_provision",
				"Software_provision", "Prototype_provision", "Other_provisions", "Previous_provisions", "Created_date",
				"updated_date" };

		try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
			Sheet sheet = workbook.createSheet(SHEET);

			// Header
			Row headerRow = sheet.createRow(0);
			CellStyle cellStyle = workbook.createCellStyle();
			CellStyle datecellStyle = workbook.createCellStyle();
			for (int col = 0; col < HEADERs.length; col++) {
				Cell cell = headerRow.createCell(col);
				cell.setCellValue(HEADERs[col]);
				addBold(workbook, cellStyle, cell);
			}

			int rowIdx = 1;
			for (SlaProvisionsArchive slaProvisions : slaProvisionsModel) {

				Row row = sheet.createRow(rowIdx);
				row.createCell(0).setCellValue(slaProvisions.getId());
				row.createCell(1).setCellValue(slaProvisions.getSlaprovision_id());
				row.createCell(2).setCellValue(slaProvisions.getCostcenter());
				row.createCell(3).setCellValue(slaProvisions.getTeam());
				row.createCell(4).setCellValue(slaProvisions.getMonth());
				row.createCell(5).setCellValue(slaProvisions.getYear());
				row.createCell(6).setCellValue(slaProvisions.getSla_name());
				row.createCell(7).setCellValue(slaProvisions.getSlaid());
				row.createCell(8).setCellValue(slaProvisions.getProject_name());
				row.createCell(9).setCellValue(slaProvisions.getVendor_name());
				row.createCell(10).setCellValue(slaProvisions.getPo_ro_number());
				row.createCell(11).setCellValue(slaProvisions.getIo_number());
				row.createCell(12).setCellValue(slaProvisions.getTotal_provision());
				row.createCell(13).setCellValue(slaProvisions.getStatus());
				row.createCell(14).setCellValue(slaProvisions.getComments());
				row.createCell(15).setCellValue(slaProvisions.getThirdparty_manpower_provision());
				row.createCell(16).setCellValue(slaProvisions.getThirdparty_service_provision());
				row.createCell(17).setCellValue(slaProvisions.getCross_charges_provision());
				row.createCell(18).setCellValue(slaProvisions.getSoftware_provision());
				row.createCell(19).setCellValue(slaProvisions.getPrototype_provision());
				row.createCell(20).setCellValue(slaProvisions.getOther_provisions());
				row.createCell(21).setCellValue(slaProvisions.getPrevious_provisions());

				CreationHelper createHelper = workbook.getCreationHelper();
				datecellStyle.setDataFormat(createHelper.createDataFormat().getFormat("yyyy-MM-dd"));

				Cell created_date_cell = row.createCell(22);
				created_date_cell.setCellStyle(datecellStyle);
				created_date_cell.setCellValue(slaProvisions.getCreated_date());

				Cell updated_date_cell = row.createCell(23);
				updated_date_cell.setCellStyle(datecellStyle);
				updated_date_cell.setCellValue(slaProvisions.getUpdated_date());

				rowIdx++;

			}
			workbook.write(out);
			String res = Base64.getEncoder().encodeToString(out.toByteArray());
			return res;
		} catch (IOException e) {
			return null;
		}
	}

	private void addBold(Workbook workbook, CellStyle cellStyle, Cell cell) {
		Font font = workbook.createFont();
		font.setBold(true);
		cellStyle.setFont(font);
		cell.setCellStyle(cellStyle);
	}

	public static int getNumberFromMonthName(String monthName, Locale locale) throws ParseException {

		DateTimeFormatter dtFormatter = DateTimeFormatter.ofPattern("MMM").withLocale(locale);
		TemporalAccessor temporalAccessor = dtFormatter.parse(monthName);
		return temporalAccessor.get(ChronoField.MONTH_OF_YEAR);
	}

	public void updateProvisionchart(String month, String year, Double total_provision, String status) {

		List<ProvisionsChartResponse> provisionsChartResponseList = provisionsChartResponseRepository
				.findAllByMonthAndYearOrderById(month, year);

		if (provisionsChartResponseList != null) {
			for(ProvisionsChartResponse provisionsChartResponse :  provisionsChartResponseList) {
				
				if(status.equalsIgnoreCase("Not Required") && provisionsChartResponse.getActual_nonrequired_sum() >= 0) {
					// to duplicate Not required input
					if(provisionsChartResponse.getActual_nonrequired_sum()!=0) {
						provisionsChartResponse.setActual_nonrequired_sum(0);
					}
					
					if (provisionsChartResponse.getCurrent_value() > 0
							&& provisionsChartResponse.getActual_nonrequired_sum() != 0) {
						provisionsChartResponse
								.setCurrent_value(provisionsChartResponse.getCurrent_value() - total_provision);
					}
				}
				
				if(status.equalsIgnoreCase("Invoice Submitted") && provisionsChartResponse.getActual_invoicesubmitted_sum() >= 0) {
					// to duplicate Invoice Submitted input
					if(provisionsChartResponse.getActual_invoicesubmitted_sum()!=0) {
						provisionsChartResponse.setActual_invoicesubmitted_sum(0);
					}
					
					if (provisionsChartResponse.getCurrent_value() > 0
							&& provisionsChartResponse.getActual_invoicesubmitted_sum() != 0) {
						provisionsChartResponse
								.setCurrent_value(provisionsChartResponse.getCurrent_value() - total_provision);
					}
				
				}
				
				if(status.equalsIgnoreCase("Required") && provisionsChartResponse.getActual_required_sum() >= 0) {
					provisionsChartResponse
					.setCurrent_value(provisionsChartResponse.getCurrent_value() + total_provision);
				}
					
				
				provisionsChartResponse.setCurrent_value(provisionsChartResponse.getCurrent_value() - total_provision );
				provisionsChartResponseRepository.save(provisionsChartResponse);	
			}
			
		}
			
	}

	public String slaprovisionExport() {
		List<SLAProvisions> slaProvisionsModel = slaProvisionsRepository.findAllByOrderById();
		return slaprovisionInfoToExcel(slaProvisionsModel);
	}

	private String slaprovisionInfoToExcel(List<SLAProvisions> slaProvisionsModel) {

		String SHEET = "slaprovision_report";
		String[] HEADERs = { "ID", "Costcenter", "Team", "Month", "Year", "Sla_name", "Slaid", "Project_name",
				"Vendor_name", "po_ro_Number", "Io_number", "Total_provision", "status", "comments",
				"Thirdparty_manpower_provision", "Thirdparty_service_provision", "Cross_charges_provision",
				"Software_provision", "Prototype_provision", "Other_provisions", "Previous_provisions", "Created_date",
				"updated_date" };

		try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
			Sheet sheet = workbook.createSheet(SHEET);

			// Header
			Row headerRow = sheet.createRow(0);
			CellStyle cellStyle = workbook.createCellStyle();
			CellStyle datecellStyle = workbook.createCellStyle();
			for (int col = 0; col < HEADERs.length; col++) {
				Cell cell = headerRow.createCell(col);
				cell.setCellValue(HEADERs[col]);
				addBold(workbook, cellStyle, cell);
			}

			int rowIdx = 1;
			for (SLAProvisions slaProvisions : slaProvisionsModel) {

				Row row = sheet.createRow(rowIdx);
				row.createCell(0).setCellValue(slaProvisions.getId());
				row.createCell(1).setCellValue(slaProvisions.getCostcenter());
				row.createCell(2).setCellValue(slaProvisions.getTeam());
				row.createCell(3).setCellValue(slaProvisions.getMonth());
				row.createCell(4).setCellValue(slaProvisions.getYear());
				row.createCell(5).setCellValue(slaProvisions.getSla_name());
				row.createCell(6).setCellValue(slaProvisions.getSlaid());
				row.createCell(7).setCellValue(slaProvisions.getProject_name());
				row.createCell(8).setCellValue(slaProvisions.getVendor_name());
				row.createCell(9).setCellValue(slaProvisions.getPo_ro_number());
				row.createCell(10).setCellValue(slaProvisions.getIo_number());
				row.createCell(11).setCellValue(slaProvisions.getTotal_provision());
				row.createCell(12).setCellValue(slaProvisions.getStatus());
				row.createCell(13).setCellValue(slaProvisions.getComments());
				row.createCell(14).setCellValue(slaProvisions.getThirdparty_manpower_provision());
				row.createCell(15).setCellValue(slaProvisions.getThirdparty_service_provision());
				row.createCell(16).setCellValue(slaProvisions.getCross_charges_provision());
				row.createCell(17).setCellValue(slaProvisions.getSoftware_provision());
				row.createCell(18).setCellValue(slaProvisions.getPrototype_provision());
				row.createCell(19).setCellValue(slaProvisions.getOther_provisions());
				row.createCell(20).setCellValue(slaProvisions.getPrevious_provisions());

				CreationHelper createHelper = workbook.getCreationHelper();
				datecellStyle.setDataFormat(createHelper.createDataFormat().getFormat("yyyy-MM-dd"));

				Cell created_date_cell = row.createCell(21);
				created_date_cell.setCellStyle(datecellStyle);
				created_date_cell.setCellValue(slaProvisions.getCreated_date());

				Cell updated_date_cell = row.createCell(22);
				updated_date_cell.setCellStyle(datecellStyle);
				updated_date_cell.setCellValue(slaProvisions.getUpdated_date());

				rowIdx++;

			}
			workbook.write(out);
			String res = Base64.getEncoder().encodeToString(out.toByteArray());
			return res;
		} catch (IOException e) {
			return null;
		}

	}

}

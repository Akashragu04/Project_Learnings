package com.intelizign.dmgcc.services;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.intelizign.dmgcc.dashboardresponce.PlanVsActualReport;
import com.intelizign.dmgcc.models.CostCenterModel;
import com.intelizign.dmgcc.models.G3CEmployeeMasterModel;
import com.intelizign.dmgcc.models.JDMappingModel;
import com.intelizign.dmgcc.models.LeadConversionModel;
import com.intelizign.dmgcc.models.LeadRequestModel;
import com.intelizign.dmgcc.models.ResourceAllocationModel;
import com.intelizign.dmgcc.models.SLAInvoiceModel;
import com.intelizign.dmgcc.models.SLAModel;
import com.intelizign.dmgcc.models.SLAPreInvoiceModel;
import com.intelizign.dmgcc.models.TaskModel;
import com.intelizign.dmgcc.models.TimesheetModel;
import com.intelizign.dmgcc.models.businesscasemodels.BusinessCaseRequest;
import com.intelizign.dmgcc.pojoclass.DescripcitionAmount;
import com.intelizign.dmgcc.pojoclass.MaterialReport;
import com.intelizign.dmgcc.pojoclass.ResourceBaseCapacity;
import com.intelizign.dmgcc.pojoclass.ResourceBaseProjectCapacity;
import com.intelizign.dmgcc.pojoclass.bizcase.BizCaseOtherServiceCalcInfo;
import com.intelizign.dmgcc.pojoclass.bizcase.BizCaseReport;
import com.intelizign.dmgcc.pojoclass.bizcase.BizCaseReportCostInfo;
import com.intelizign.dmgcc.pojoclass.bizcase.BizCaseReportRevenueInfo;
import com.intelizign.dmgcc.pojoclass.bizcase.BizCaseSLAPayout;
import com.intelizign.dmgcc.pojoclass.bizcase.BizCaseSLAPayout.SLA_Level_Properties;
import com.intelizign.dmgcc.repositories.BizCaseRequestRepository;
import com.intelizign.dmgcc.repositories.CostCenterRepository;
import com.intelizign.dmgcc.repositories.G3CEmployeeRepository;
import com.intelizign.dmgcc.repositories.JDMappingRepository;
import com.intelizign.dmgcc.repositories.LeadBusinessRepository;
import com.intelizign.dmgcc.repositories.ResourceAllocationRepository;
import com.intelizign.dmgcc.repositories.SLAInvoiceRepository;
import com.intelizign.dmgcc.repositories.SLAPreInvoiceRepository;
import com.intelizign.dmgcc.repositories.SLARepository;
import com.intelizign.dmgcc.repositories.TaskRepository;
import com.intelizign.dmgcc.repositories.TimesheetRepository;
import com.intelizign.dmgcc.repositories.othermaster.CCDumpRepository;
import com.intelizign.dmgcc.repositories.othermaster.IODumpRepository;
import com.intelizign.dmgcc.repositories.othermaster.MaterialCodeRepository;
import com.intelizign.dmgcc.request.SkillsRequest.Secondary;
import com.intelizign.dmgcc.request.bizcase.Properties;
import com.intelizign.dmgcc.response.JDHiredResponse;
import com.intelizign.dmgcc.response.ResourceOverviewReport;
import com.intelizign.dmgcc.response.ResourceReportView;

@Service
public class ReportService {

	@Autowired
	private LeadBusinessRepository leadBusinessRepository;

	@Autowired
	private BizCaseRequestRepository bizCaseRequestRepository;

	@Autowired
	private G3CEmployeeRepository g3cEmployeeRepository;

	@Autowired
	private ResourceAllocationService resourceAllocationService;

	@Autowired
	private ResourceReportOverveiwService resourceOverveiwService;

	@Autowired
	private CostCenterRepository costCenterRepository;

	@Autowired
	private TimesheetRepository timesheetRepository;

	@Autowired
	private TaskRepository taskRepository;

	@Autowired
	private SLARepository slaRepository;

	@Autowired
	private SLAInvoiceRepository slaInvoiceRepository;

	@Autowired
	private SLAPreInvoiceRepository slaPreInvoiceRepository;

	@Autowired
	private IODumpRepository ioDumpRepository;

	@Autowired
	private CCDumpRepository ccDumpRepository;

	@Autowired
	private MaterialCodeRepository materilaRepository;

	@Autowired
	private ResourceAllocationRepository resourceAllocationRepository;

	@Autowired
	private JDMappingRepository jdMappingRepository;

	int bizcaseexcel_row;

	public final Logger LOGGER = LogManager.getLogger(ReportService.class);

	public String loadcustomerdata() {

		List<LeadRequestModel> leadrequests = leadBusinessRepository.findAllByActiveOrderById(true);
		return leadrequestscustomerinfoToExcel(leadrequests);

	}

	private String leadrequestscustomerinfoToExcel(List<LeadRequestModel> leadrequests) {

		String[] HEADERs = { "Id", "CustomerName", "ShortId", "Email", "Entity", "Department", "LeadConversion(Days)" };
		String SHEET = "customerlist";

		try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
			Sheet sheet = workbook.createSheet(SHEET);

			// Header
			Row headerRow = sheet.createRow(0);

			for (int col = 0; col < HEADERs.length; col++) {
				Cell cell = headerRow.createCell(col);
				cell.setCellValue(HEADERs[col]);
			}

			int rowIdx = 1;
			for (LeadRequestModel leadrequest : leadrequests) {
				long sumofleadconversionday = 0;
				Row row = sheet.createRow(rowIdx++);
				sumofleadconversionday = leadrequest.getLeadconversionreport().stream()
						.filter(i -> i.getConversion_period().equals("IL0 - IL1"))
						.mapToLong(LeadConversionModel::getDelay_days).sum();

				row.createCell(0).setCellValue(leadrequest.getId());
				row.createCell(1).setCellValue(leadrequest.getService_receiver_contact_name());
				row.createCell(2).setCellValue(leadrequest.getService_receiver_short_id());
				row.createCell(3).setCellValue(leadrequest.getService_receiver_email_id());
				row.createCell(4).setCellValue(leadrequest.getService_receiver_entity());
				row.createCell(5).setCellValue(leadrequest.getService_receiver_department());
				row.createCell(6).setCellValue(sumofleadconversionday);

			}

			workbook.write(out);
			String res = Base64.getEncoder().encodeToString(out.toByteArray());
			return res;
		} catch (IOException e) {
			return null;
		}

	}

	public String loadleaddata() {
		List<LeadRequestModel> leadrequests = leadBusinessRepository.findAllByActiveOrderById(true);
		return leadrequestsleadinfoToExcel(leadrequests);
	}

	private String leadrequestsleadinfoToExcel(List<LeadRequestModel> leadrequests) {

		String[] HEADERs = { "Id", "Provider Name", "Provider ShortId", "Department (DICV)", "Email",
				"lead(ProjectName)", "LeadConversion(Days)" };
		String SHEET = "leaddata";

		try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
			Sheet sheet = workbook.createSheet(SHEET);

			// Header
			Row headerRow = sheet.createRow(0);

			for (int col = 0; col < HEADERs.length; col++) {
				Cell cell = headerRow.createCell(col);
				cell.setCellValue(HEADERs[col]);
			}

			int rowIdx = 1;
			for (LeadRequestModel leadrequest : leadrequests) {
				long sumofleadconversionday = 0;
				Row row = sheet.createRow(rowIdx++);
				sumofleadconversionday = leadrequest.getLeadconversionreport().stream()
						.filter(i -> i.getConversion_period().equals("IL0 - IL1"))
						.mapToLong(LeadConversionModel::getDelay_days).sum();

				row.createCell(0).setCellValue(leadrequest.getId());
				row.createCell(1).setCellValue(leadrequest.getService_provider_contact_name());
				row.createCell(2).setCellValue(leadrequest.getService_provider_short_id());
				row.createCell(3).setCellValue(leadrequest.getService_provider_department());
				row.createCell(4).setCellValue(leadrequest.getService_provider_email_id());
				row.createCell(5).setCellValue(leadrequest.getProject_name());
				row.createCell(6).setCellValue(sumofleadconversionday);

			}

			workbook.write(out);
			String res = Base64.getEncoder().encodeToString(out.toByteArray());
			return res;
		} catch (IOException e) {
			return null;
		}

	}

	// Bizcase report logic starts
	public String loadnewbizrequestreport(Long biz_id) {

		Optional<BusinessCaseRequest> requestData = bizCaseRequestRepository.findByIdAndActive(biz_id, true);
		String in = null;
		if (requestData.isPresent()) {
			in = loadbizrequestreportrinfoToExcel(requestData.get().getBizcasereport());
		}
		return in;

	}

	public String loadbizrequestreportrinfoToExcel(BizCaseReport bizcasereport) {

		String SHEET = "bizcasereport";

		try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
			XSSFSheet sheet = (XSSFSheet) workbook.createSheet(SHEET);

			sheet.setColumnWidth(0, 6000);

			// 1.creating cost_info information table
			createCostInfo(bizcasereport, workbook, sheet, out);

			// 2.creating revenuse_info information table
			createRevenueInfo(bizcasereport, workbook, sheet, out);

			// 3.creating manpower_cost_info information table
			createManpowerCostInfo(bizcasereport, workbook, sheet, out);

			// 4.creating copex non_manpower_cost_info information table
			createCopexnonManpowerCostInfo(bizcasereport, workbook, sheet, out);

			// 5.creating opex non_manpower_cost_info information table
			createOpexnonManpowerCostInfo(bizcasereport, workbook, sheet, out);

			// 6.creating other_cost_info information table
			createOtherCostInfo(bizcasereport, workbook, sheet, out);

			// 7.creating transition_cost_info information table
			createTransitionCostInfo(bizcasereport, workbook, sheet, out);

			// 8.creating copex sla non manpower_cost_info information table
			createCopexSlaNonManpowerCostInfo(bizcasereport, workbook, sheet, out);

			// 8.creating opex sla non manpower_cost_info information table
			createOpexSlaNonManpowerCostInfo(bizcasereport, workbook, sheet, out);

			// 9.creating sla total_estimation information table
			createSlaTotalEstimationInfo(bizcasereport, workbook, sheet, out);

			// 10. creating slapayout_cost_info information table
			createSlaPayoutCostInfo(bizcasereport, workbook, sheet, out);

			workbook.write(out);

			String res = Base64.getEncoder().encodeToString(out.toByteArray());
			return res;
		} catch (IOException e) {
			return null;
		}

	}

	private ByteArrayOutputStream createOpexSlaNonManpowerCostInfo(BizCaseReport bizcasereport, Workbook workbook,
			XSSFSheet sheet, ByteArrayOutputStream out) {
		bizcaseexcel_row = bizcaseexcel_row + 2;
		Row slayear_header_row = sheet.createRow(bizcaseexcel_row);
		int rowheader = bizcaseexcel_row;
		Cell year_header_cell = slayear_header_row.createCell(0);
		year_header_cell.setCellValue("Opex SLA Non_Manpower Cost");

		CellStyle cellStyle = workbook.createCellStyle();
		create_cellborder(cellStyle, year_header_cell);
		addBold(workbook, cellStyle, year_header_cell);
		Center_Alignment(cellStyle);

		List<BizCaseOtherServiceCalcInfo> bizCaseOtherServiceCalcInfoDetail = bizcasereport
				.getCopex_sla_non_manpower_cost();
		createbizcase_costinfo(workbook, sheet, slayear_header_row, rowheader, bizCaseOtherServiceCalcInfoDetail);

		return out;
	}

	private ByteArrayOutputStream createOpexnonManpowerCostInfo(BizCaseReport bizcasereport, Workbook workbook,
			XSSFSheet sheet, ByteArrayOutputStream out) {

		bizcaseexcel_row = bizcaseexcel_row + 2;
		Row year_header_row = sheet.createRow(bizcaseexcel_row);
		int rowheader = bizcaseexcel_row;
		Cell year_header_cell = year_header_row.createCell(0);
		year_header_cell.setCellValue("Opex Non ManPower Cost");

		CellStyle cellStyle = workbook.createCellStyle();
		create_cellborder(cellStyle, year_header_cell);
		addBold(workbook, cellStyle, year_header_cell);
		Center_Alignment(cellStyle);

		List<BizCaseOtherServiceCalcInfo> bizCaseOtherServiceCalcInfoDetail = bizcasereport
				.getOpex_non_manpower_cost_info();
		createbizcase_costinfo(workbook, sheet, year_header_row, rowheader, bizCaseOtherServiceCalcInfoDetail);

		return out;

	}

	private ByteArrayOutputStream createCostInfo(BizCaseReport bizcasereport, Workbook workbook, XSSFSheet sheet,
			ByteArrayOutputStream out) {

		// BizCase Cost_Info Header
		bizcaseexcel_row = 0;
		Row project_name_row = sheet.createRow(bizcaseexcel_row++);

		Row business_case_start_date_row = sheet.createRow(bizcaseexcel_row++);
		Row business_case_end_date_row = sheet.createRow(bizcaseexcel_row++);
		bizcaseexcel_row++;
		Row year_header_row = sheet.createRow(bizcaseexcel_row++);
		Row manpower_cost_row = sheet.createRow(bizcaseexcel_row++);
		Row non_manpower_cost_row = sheet.createRow(bizcaseexcel_row++);
		Row other_cost_row = sheet.createRow(bizcaseexcel_row++);
		Row transition_cost_row = sheet.createRow(bizcaseexcel_row++);
		Row total_cost_row = sheet.createRow(bizcaseexcel_row++);
		bizcaseexcel_row++;

		CellStyle cellStyle = workbook.createCellStyle();
		CellStyle projectinfo_cellStyle = workbook.createCellStyle();

		Center_Alignment(projectinfo_cellStyle);

		Cell project_name_cell = project_name_row.createCell(0);
		project_name_cell.setCellValue("project_name");
		addBold(workbook, cellStyle, project_name_cell);

		Cell business_case_start_date_cell = business_case_start_date_row.createCell(0);
		business_case_start_date_cell.setCellValue("business_case_start_date");
		addBold(workbook, cellStyle, business_case_start_date_cell);

		Cell business_case_end_date_cell = business_case_end_date_row.createCell(0);
		business_case_end_date_cell.setCellValue("business_case_end_date");
		addBold(workbook, cellStyle, business_case_end_date_cell);

		CreationHelper createHelper = workbook.getCreationHelper();
		projectinfo_cellStyle.setDataFormat(createHelper.createDataFormat().getFormat("yyyy-MM-dd"));

		Cell business_case_start_date_cell1 = business_case_start_date_row.createCell(1);
		business_case_start_date_cell1.setCellStyle(projectinfo_cellStyle);
		create_cellborder(projectinfo_cellStyle, business_case_start_date_cell1);

		if (bizcasereport != null && bizcasereport.getBusiness_case_start_date() != null) {
			business_case_start_date_cell1.setCellValue(bizcasereport.getBusiness_case_start_date());
		} else {
			business_case_start_date_cell1.setCellValue("0000-00-00");
		}

		Cell business_case_end_date_cell1 = business_case_end_date_row.createCell(1);
		business_case_end_date_cell1.setCellStyle(projectinfo_cellStyle);
		create_cellborder(projectinfo_cellStyle, business_case_start_date_cell1);

		if (bizcasereport != null && bizcasereport.getBusiness_case_end_date() != null) {

			business_case_end_date_cell1.setCellValue(bizcasereport.getBusiness_case_end_date());

		} else {
			business_case_start_date_cell1.setCellValue("0000-00-00");
		}
		Cell project_name_cell1 = project_name_row.createCell(1);
		create_cellborder(projectinfo_cellStyle, project_name_cell1);

		if (bizcasereport != null && bizcasereport.getProject_name() != null) {
			project_name_cell1.setCellValue(bizcasereport.getProject_name());

		} else {
			project_name_cell1.setCellValue("");
		}

		Cell myear_header_cell = year_header_row.createCell(0);
		myear_header_cell.setCellValue("Cost");
		create_cellborder(cellStyle, myear_header_cell);
		addBold(workbook, cellStyle, myear_header_cell);

		Cell manpower_cost_cell = manpower_cost_row.createCell(0);
		manpower_cost_cell.setCellValue("manpower_cost");
		create_cellborder(cellStyle, manpower_cost_cell);
		addBold(workbook, cellStyle, manpower_cost_cell);

		Cell non_manpower_cost_cell = non_manpower_cost_row.createCell(0);
		non_manpower_cost_cell.setCellValue("non_manpower_cost");
		create_cellborder(cellStyle, non_manpower_cost_cell);
		addBold(workbook, cellStyle, non_manpower_cost_cell);

		Cell other_cost_cell = other_cost_row.createCell(0);
		other_cost_cell.setCellValue("other_cost");
		create_cellborder(cellStyle, other_cost_cell);
		addBold(workbook, cellStyle, other_cost_cell);

		Cell transition_cell = transition_cost_row.createCell(0);
		transition_cell.setCellValue("transition_cost");
		create_cellborder(cellStyle, transition_cell);
		addBold(workbook, cellStyle, transition_cell);

		Cell total_cost_cell = total_cost_row.createCell(0);
		total_cost_cell.setCellValue("total_cost");
		create_cellborder(cellStyle, total_cost_cell);
		addBold(workbook, cellStyle, total_cost_cell);
		List<BizCaseReportCostInfo> bizCaseReportCostInfoDetail = null;
		if (bizcasereport != null) {
			bizCaseReportCostInfoDetail = bizcasereport.getCost_info();
		}

		// BizCase Cost_Info Data from 2nd Column

		CellStyle bodycellStyle = workbook.createCellStyle();
		Center_Alignment(cellStyle);
		Center_Alignment(bodycellStyle);
		int col = 1;
		if (bizCaseReportCostInfoDetail != null) {
			for (BizCaseReportCostInfo singleBizCaseReportCostInfo : bizCaseReportCostInfoDetail) {

				Cell year_cells = year_header_row.createCell(col);
				year_cells.setCellValue(singleBizCaseReportCostInfo.getYear());
				create_cellborder(bodycellStyle, year_cells);
				addBold(workbook, cellStyle, year_cells);

				Cell manpower_cells = manpower_cost_row.createCell(col);
				manpower_cells.setCellValue(singleBizCaseReportCostInfo.getManpower_cost());
				create_cellborder(bodycellStyle, manpower_cells);

				Cell non_manpower_cells = non_manpower_cost_row.createCell(col);
				non_manpower_cells.setCellValue(singleBizCaseReportCostInfo.getNon_manpower_cost());
				create_cellborder(bodycellStyle, non_manpower_cells);

				Cell othercost_cells = other_cost_row.createCell(col);
				othercost_cells.setCellValue(singleBizCaseReportCostInfo.getOther_cost());
				create_cellborder(bodycellStyle, othercost_cells);

				Cell transition_cells = transition_cost_row.createCell(col);
				transition_cells.setCellValue(singleBizCaseReportCostInfo.getTransition_cost());
				create_cellborder(bodycellStyle, transition_cells);

				Cell totalcost_cells = total_cost_row.createCell(col);
				totalcost_cells.setCellValue(singleBizCaseReportCostInfo.getTotal_cost());
				create_cellborder(bodycellStyle, totalcost_cells);

				col++;

			}

		}

		return out;
	}

	private void addBold(Workbook workbook, CellStyle cellStyle, Cell cell) {
		Font font = workbook.createFont();
		font.setBold(true);
		cellStyle.setFont(font);
		cell.setCellStyle(cellStyle);
	}

	private void create_cellborder(CellStyle cellStyle, Cell cell) {
		cellStyle.setBorderBottom(BorderStyle.THIN);
		cellStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
		cellStyle.setBorderLeft(BorderStyle.THIN);
		cellStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
		cellStyle.setBorderRight(BorderStyle.THIN);
		cellStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
		cellStyle.setBorderTop(BorderStyle.THIN);
		cellStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
		cell.setCellStyle(cellStyle);
	}

	private ByteArrayOutputStream createRevenueInfo(BizCaseReport bizcasereport, Workbook workbook, Sheet sheet,
			ByteArrayOutputStream out) {
		// BizCase Revenue_Info Header

		Row year_header_row = sheet.createRow(bizcaseexcel_row++);
		Row billable_hours_row = sheet.createRow(bizcaseexcel_row++);
		Row rate_card_row = sheet.createRow(bizcaseexcel_row++);
		Row other_cost_row = sheet.createRow(bizcaseexcel_row++);
		Row markup_row = sheet.createRow(bizcaseexcel_row++);
		Row inflaction_row = sheet.createRow(bizcaseexcel_row++);
		Row sla_payout_cost_row = sheet.createRow(bizcaseexcel_row++);
		Row net_profit_value_row = sheet.createRow(bizcaseexcel_row++);
		Row ros_row = sheet.createRow(bizcaseexcel_row++);
		Row customer_expense_cost_row = sheet.createRow(bizcaseexcel_row++);
		Row customer_expense_saving_row = sheet.createRow(bizcaseexcel_row++);
		Row fx_rist_cost_row = sheet.createRow(bizcaseexcel_row++);
		Row wht_cost_row = sheet.createRow(bizcaseexcel_row++);

		CellStyle cellStyle = workbook.createCellStyle();
		Cell year_header_cell = year_header_row.createCell(0);
		year_header_cell.setCellValue("Revenue");
		create_cellborder(cellStyle, year_header_cell);
		addBold(workbook, cellStyle, year_header_cell);

		Cell billable_hours_cell = billable_hours_row.createCell(0);
		billable_hours_cell.setCellValue("billable_hours");
		create_cellborder(cellStyle, billable_hours_cell);
		addBold(workbook, cellStyle, billable_hours_cell);

		Cell other_cost_cell = rate_card_row.createCell(0);
		other_cost_cell.setCellValue("other_cost");
		create_cellborder(cellStyle, other_cost_cell);
		addBold(workbook, cellStyle, other_cost_cell);

		Cell transition_cell = other_cost_row.createCell(0);
		transition_cell.setCellValue("transition_cost");
		create_cellborder(cellStyle, transition_cell);
		addBold(workbook, cellStyle, transition_cell);

		Cell total_cost_cell = markup_row.createCell(0);
		total_cost_cell.setCellValue("total_cost");
		create_cellborder(cellStyle, total_cost_cell);
		addBold(workbook, cellStyle, total_cost_cell);

		Cell inflaction_cell = inflaction_row.createCell(0);
		inflaction_cell.setCellValue("inflaction");
		create_cellborder(cellStyle, inflaction_cell);
		addBold(workbook, cellStyle, inflaction_cell);

		Cell sla_payout_cost_cell = sla_payout_cost_row.createCell(0);
		sla_payout_cost_cell.setCellValue("sla_payout_cost");
		create_cellborder(cellStyle, sla_payout_cost_cell);
		addBold(workbook, cellStyle, sla_payout_cost_cell);

		Cell net_profit_value_cell = net_profit_value_row.createCell(0);
		net_profit_value_cell.setCellValue("net_profit_value");
		create_cellborder(cellStyle, net_profit_value_cell);
		addBold(workbook, cellStyle, net_profit_value_cell);

		Cell ros_cell = ros_row.createCell(0);
		ros_cell.setCellValue("ros");
		create_cellborder(cellStyle, ros_cell);
		addBold(workbook, cellStyle, ros_cell);

		Cell customer_expense_cost_cell = customer_expense_cost_row.createCell(0);
		customer_expense_cost_cell.setCellValue("customer_expense_cost");
		create_cellborder(cellStyle, customer_expense_cost_cell);
		addBold(workbook, cellStyle, customer_expense_cost_cell);

		Cell customer_expense_saving_cell = customer_expense_saving_row.createCell(0);
		customer_expense_saving_cell.setCellValue("customer_expense_saving");
		create_cellborder(cellStyle, customer_expense_saving_cell);
		addBold(workbook, cellStyle, customer_expense_saving_cell);

		Cell fx_rist_cost_cell = fx_rist_cost_row.createCell(0);
		fx_rist_cost_cell.setCellValue("fx_rist_cost");
		create_cellborder(cellStyle, fx_rist_cost_cell);
		addBold(workbook, cellStyle, fx_rist_cost_cell);

		Cell wht_cost_cell = wht_cost_row.createCell(0);
		wht_cost_cell.setCellValue("wht_cost");
		create_cellborder(cellStyle, wht_cost_cell);
		addBold(workbook, cellStyle, wht_cost_cell);

		List<BizCaseReportRevenueInfo> bizCaseReportRevenueInfoDetail = null;
		if (bizcasereport != null) {
			bizCaseReportRevenueInfoDetail = bizcasereport.getRevenue_info();
		}

		// BizCase Revenue_Info Data from 2nd Column
		if (bizCaseReportRevenueInfoDetail != null || !bizCaseReportRevenueInfoDetail.isEmpty()) {
			CellStyle bodycellStyle = workbook.createCellStyle();
			Center_Alignment(cellStyle);
			Center_Alignment(bodycellStyle);
			int col = 1;
			for (BizCaseReportRevenueInfo singleBizCaseReportRevenueInfo : bizCaseReportRevenueInfoDetail) {

				Cell year_cells = year_header_row.createCell(col);
				year_cells.setCellValue(singleBizCaseReportRevenueInfo.getYear());
				create_cellborder(bodycellStyle, year_cells);
				addBold(workbook, cellStyle, year_cells);

				Cell billing_hours_cells = billable_hours_row.createCell(col);
				billing_hours_cells.setCellValue(singleBizCaseReportRevenueInfo.getBillable_hours());
				create_cellborder(bodycellStyle, billing_hours_cells);

				Cell rate_card_cells = rate_card_row.createCell(col);
				rate_card_cells.setCellValue(singleBizCaseReportRevenueInfo.getRate_card());
				create_cellborder(bodycellStyle, rate_card_cells);

				Cell other_cost_cells = other_cost_row.createCell(col);
				other_cost_cells.setCellValue(singleBizCaseReportRevenueInfo.getOther_costs());
				create_cellborder(bodycellStyle, other_cost_cells);

				Cell markup_cells = markup_row.createCell(col);
				markup_cells.setCellValue(singleBizCaseReportRevenueInfo.getMarkup());
				create_cellborder(bodycellStyle, markup_cells);

				Cell inflaction_cells = inflaction_row.createCell(col);
				inflaction_cells.setCellValue(singleBizCaseReportRevenueInfo.getInflaction());
				create_cellborder(bodycellStyle, inflaction_cells);

				Cell sla_payout_cost_cells = sla_payout_cost_row.createCell(col);
				sla_payout_cost_cells.setCellValue(singleBizCaseReportRevenueInfo.getSla_payout_cost());
				create_cellborder(bodycellStyle, sla_payout_cost_cells);

				Cell net_profit_value_cells = net_profit_value_row.createCell(col);
				net_profit_value_cells.setCellValue(singleBizCaseReportRevenueInfo.getNet_profit_value());
				create_cellborder(bodycellStyle, net_profit_value_cells);

				Cell ros_cells = ros_row.createCell(col);
				ros_cells.setCellValue(singleBizCaseReportRevenueInfo.getRos());
				create_cellborder(bodycellStyle, ros_cells);

				Cell customer_expense_cost_cells = customer_expense_cost_row.createCell(col);
				customer_expense_cost_cells.setCellValue(singleBizCaseReportRevenueInfo.getCustomer_expense_cost());
				create_cellborder(bodycellStyle, customer_expense_cost_cells);

				Cell customer_expense_saving_cells = customer_expense_saving_row.createCell(col);
				customer_expense_saving_cells.setCellValue(singleBizCaseReportRevenueInfo.getCustomer_expense_saving());
				create_cellborder(bodycellStyle, customer_expense_saving_cells);

				Cell fx_rist_cost_cells = fx_rist_cost_row.createCell(col);
				fx_rist_cost_cells.setCellValue(singleBizCaseReportRevenueInfo.getFx_rist_cost());
				create_cellborder(bodycellStyle, fx_rist_cost_cells);

				Cell wht_cost_cells = wht_cost_row.createCell(col);
				wht_cost_cells.setCellValue(singleBizCaseReportRevenueInfo.getWht_cost());
				create_cellborder(bodycellStyle, wht_cost_cells);

				col++;

			}
		}

		return out;
	}

	private ByteArrayOutputStream createManpowerCostInfo(BizCaseReport bizcasereport, Workbook workbook, Sheet sheet,
			ByteArrayOutputStream out) {
		bizcaseexcel_row = bizcaseexcel_row + 2;
		Row year_header_row = sheet.createRow(bizcaseexcel_row);
		int rowheader = bizcaseexcel_row;
		Cell year_header_cell = year_header_row.createCell(0);
		year_header_cell.setCellValue("Rampup Plan & ManPower Cost");

		CellStyle cellStyle = workbook.createCellStyle();
		create_cellborder(cellStyle, year_header_cell);
		addBold(workbook, cellStyle, year_header_cell);
		Center_Alignment(cellStyle);

		List<BizCaseOtherServiceCalcInfo> bizCaseOtherServiceCalcInfoDetail = bizcasereport.getManpower_cost_info();
		createbizcase_costinfo(workbook, sheet, year_header_row, rowheader, bizCaseOtherServiceCalcInfoDetail);

		return out;
	}

	private ByteArrayOutputStream createCopexnonManpowerCostInfo(BizCaseReport bizcasereport, Workbook workbook,
			Sheet sheet, ByteArrayOutputStream out) {
		bizcaseexcel_row = bizcaseexcel_row + 2;
		Row year_header_row = sheet.createRow(bizcaseexcel_row);
		int rowheader = bizcaseexcel_row;
		Cell year_header_cell = year_header_row.createCell(0);
		year_header_cell.setCellValue(" Copex Non ManPower Cost");

		CellStyle cellStyle = workbook.createCellStyle();
		create_cellborder(cellStyle, year_header_cell);
		addBold(workbook, cellStyle, year_header_cell);
		Center_Alignment(cellStyle);

		List<BizCaseOtherServiceCalcInfo> bizCaseOtherServiceCalcInfoDetail = bizcasereport
				.getCopex_non_manpower_cost_info();
		createbizcase_costinfo(workbook, sheet, year_header_row, rowheader, bizCaseOtherServiceCalcInfoDetail);

		return out;

	}

	private ByteArrayOutputStream createOtherCostInfo(BizCaseReport bizcasereport, Workbook workbook, Sheet sheet,
			ByteArrayOutputStream out) {
		bizcaseexcel_row = bizcaseexcel_row + 2;
		Row year_header_row = sheet.createRow(bizcaseexcel_row);
		int rowheader = bizcaseexcel_row;
		Cell year_header_cell = year_header_row.createCell(0);
		year_header_cell.setCellValue("Other Cost");

		CellStyle cellStyle = workbook.createCellStyle();
		create_cellborder(cellStyle, year_header_cell);
		addBold(workbook, cellStyle, year_header_cell);
		Center_Alignment(cellStyle);

		List<BizCaseOtherServiceCalcInfo> bizCaseOtherServiceCalcInfoDetail = bizcasereport.getOther_cost_info();
		createbizcase_costinfo(workbook, sheet, year_header_row, rowheader, bizCaseOtherServiceCalcInfoDetail);

		return out;
	}

	private ByteArrayOutputStream createTransitionCostInfo(BizCaseReport bizcasereport, Workbook workbook, Sheet sheet,
			ByteArrayOutputStream out) {
		bizcaseexcel_row = bizcaseexcel_row + 2;
		Row year_header_row = sheet.createRow(bizcaseexcel_row);
		int rowheader = bizcaseexcel_row;
		Cell year_header_cell = year_header_row.createCell(0);
		year_header_cell.setCellValue("Transition Cost");

		CellStyle cellStyle = workbook.createCellStyle();
		create_cellborder(cellStyle, year_header_cell);
		addBold(workbook, cellStyle, year_header_cell);
		Center_Alignment(cellStyle);

		List<BizCaseOtherServiceCalcInfo> bizCaseOtherServiceCalcInfoDetail = bizcasereport.getTransition_cost();
		createbizcase_costinfo(workbook, sheet, year_header_row, rowheader, bizCaseOtherServiceCalcInfoDetail);

		return out;
	}

	private ByteArrayOutputStream createCopexSlaNonManpowerCostInfo(BizCaseReport bizcasereport, Workbook workbook,
			Sheet sheet, ByteArrayOutputStream out) {
		bizcaseexcel_row = bizcaseexcel_row + 2;
		Row slayear_header_row = sheet.createRow(bizcaseexcel_row);
		int rowheader = bizcaseexcel_row;
		Cell year_header_cell = slayear_header_row.createCell(0);
		year_header_cell.setCellValue("Copex SLA Non_Manpower Cost");

		CellStyle cellStyle = workbook.createCellStyle();
		create_cellborder(cellStyle, year_header_cell);
		addBold(workbook, cellStyle, year_header_cell);
		Center_Alignment(cellStyle);

		List<BizCaseOtherServiceCalcInfo> bizCaseOtherServiceCalcInfoDetail = bizcasereport
				.getCopex_sla_non_manpower_cost();
		createbizcase_costinfo(workbook, sheet, slayear_header_row, rowheader, bizCaseOtherServiceCalcInfoDetail);

		return out;
	}

	private ByteArrayOutputStream createSlaTotalEstimationInfo(BizCaseReport bizcasereport, Workbook workbook,
			Sheet sheet, ByteArrayOutputStream out) {
		bizcaseexcel_row = bizcaseexcel_row + 2;
		Row slayear_header_row = sheet.createRow(bizcaseexcel_row);
		int rowheader = bizcaseexcel_row;
		Cell year_header_cell = slayear_header_row.createCell(0);
		year_header_cell.setCellValue("SLA Total Estimation");

		CellStyle cellStyle = workbook.createCellStyle();
		create_cellborder(cellStyle, year_header_cell);
		addBold(workbook, cellStyle, year_header_cell);
		Center_Alignment(cellStyle);

		List<BizCaseOtherServiceCalcInfo> bizCaseOtherServiceCalcInfoDetail = bizcasereport.getSla_total_estimation();
		createbizcase_costinfo(workbook, sheet, slayear_header_row, rowheader, bizCaseOtherServiceCalcInfoDetail);

		return out;
	}

	private ByteArrayOutputStream createSlaPayoutCostInfo(BizCaseReport bizcasereport, Workbook workbook, Sheet sheet,
			ByteArrayOutputStream out) {

		int rowheader = bizcaseexcel_row;

		List<BizCaseSLAPayout> bizCaseSLAPayoutDetail = bizcasereport.getSla_payout_cost();

		createbizcase_slapayout_info(workbook, sheet, rowheader, bizcasereport, bizCaseSLAPayoutDetail);

		return out;
	}

	private void createbizcase_slapayout_info(Workbook workbook, Sheet sheet, int rowheader,
			BizCaseReport bizcasereport, List<BizCaseSLAPayout> bizCaseSLAPayoutDetail) {
		// creating bizcasecostinfo header
		int startrow = bizcaseexcel_row;

		bizcaseexcel_row = bizcaseexcel_row + 2;
		Row year_header_row = sheet.createRow(bizcaseexcel_row++);
		Row billablehours_row = sheet.createRow(bizcaseexcel_row++);
		Row slaproperty_level_row = sheet.createRow(bizcaseexcel_row++);
		Row slaproperty_hourylyrate_row = sheet.createRow(bizcaseexcel_row++);
		Row sla_totalmanpowercost_row = sheet.createRow(bizcaseexcel_row++);

		bizcaseexcel_row++;
		Row markup_value_row = sheet.createRow(bizcaseexcel_row++);
		Row fx_risk_row = sheet.createRow(bizcaseexcel_row++);
		Row wht_value_row = sheet.createRow(bizcaseexcel_row++);

		CellStyle cellStyle = workbook.createCellStyle();
		CellStyle markup_fx_wht_cellStyle = workbook.createCellStyle();
		Center_Alignment(markup_fx_wht_cellStyle);
		CellStyle cellStyle_last = workbook.createCellStyle(); // last cell left border assignment
		cellStyle_last.setBorderLeft(BorderStyle.THIN);
		cellStyle_last.setLeftBorderColor(IndexedColors.BLACK.getIndex());

		// align the merged column value
		Center_Alignment(cellStyle);

		Cell year_header_cell = year_header_row.createCell(0);
		year_header_cell.setCellValue("SLA Payout");
		create_cellborder(cellStyle, year_header_cell);
		addBold(workbook, cellStyle, year_header_cell);

		Cell billablehours_cell = billablehours_row.createCell(0);
		billablehours_cell.setCellValue("Billable Hours");
		create_cellborder(cellStyle, billablehours_cell);
		addBold(workbook, cellStyle, billablehours_cell);

		Cell slaproperty_level_cell = slaproperty_level_row.createCell(0);
		slaproperty_level_cell.setCellValue("Level");
		create_cellborder(cellStyle, slaproperty_level_cell);
		addBold(workbook, cellStyle, slaproperty_level_cell);

		Cell slaproperty_hourylyrate_cell = slaproperty_hourylyrate_row.createCell(0);
		slaproperty_hourylyrate_cell.setCellValue("Hourly Rate");
		create_cellborder(cellStyle, slaproperty_hourylyrate_cell);
		addBold(workbook, cellStyle, slaproperty_hourylyrate_cell);

		Cell sla_totalmanpowercost_cell = sla_totalmanpowercost_row.createCell(0);
		sla_totalmanpowercost_cell.setCellValue("Total Working Hours");
		create_cellborder(cellStyle, sla_totalmanpowercost_cell);
		addBold(workbook, cellStyle, sla_totalmanpowercost_cell);

		Cell markup_value_cell = markup_value_row.createCell(0);
		markup_value_cell.setCellValue("markup_value");
		create_cellborder(cellStyle, markup_value_cell);
		addBold(workbook, cellStyle, markup_value_cell);

		Cell fx_risk_cell = fx_risk_row.createCell(0);
		fx_risk_cell.setCellValue("fx_risk");
		create_cellborder(cellStyle, fx_risk_cell);
		addBold(workbook, cellStyle, fx_risk_cell);

		Cell wht_value_cell = wht_value_row.createCell(0);
		wht_value_cell.setCellValue("wht_value");
		create_cellborder(cellStyle, wht_value_cell);
		addBold(workbook, cellStyle, wht_value_cell);

		Cell markup_value_cell1 = markup_value_row.createCell(1);
		markup_value_cell1.setCellValue(bizcasereport.getMarkup_value());
		create_cellborder(markup_fx_wht_cellStyle, markup_value_cell1);

		Cell fx_risk_cell1 = fx_risk_row.createCell(1);
		fx_risk_cell1.setCellValue(bizcasereport.getFx_risk());
		create_cellborder(markup_fx_wht_cellStyle, fx_risk_cell1);

		Cell wht_value_cell1 = wht_value_row.createCell(1);
		wht_value_cell1.setCellValue(bizcasereport.getWht_value());
		create_cellborder(markup_fx_wht_cellStyle, wht_value_cell1);

		int col = 1;
		if (!bizCaseSLAPayoutDetail.isEmpty()) {

			List<SLA_Level_Properties> firstpropertiesvalue = bizCaseSLAPayoutDetail.get(1).getLevel_properties();
			int property_size = firstpropertiesvalue.size();

			for (BizCaseSLAPayout bizCaseSLAPayout : bizCaseSLAPayoutDetail) {
				CellStyle bodycellStyle = workbook.createCellStyle();

				List<SLA_Level_Properties> properties = bizCaseSLAPayout.getLevel_properties();

				for (int i = 0; i < properties.size(); i++) {
					if (rowheader == startrow + 2 || property_size != -1) {
						property_size = property_size - 1;
						rowheader++;
					}

					Cell year_cells = year_header_row.createCell(col);
					year_cells.setCellValue(bizCaseSLAPayout.getYear());

					create_cellborder(bodycellStyle, year_cells);
					addBold(workbook, cellStyle, year_cells);

					Cell billablehrs_cells = billablehours_row.createCell(col);
					billablehrs_cells.setCellValue(bizCaseSLAPayout.getBillable_hours());

					create_cellborder(bodycellStyle, billablehrs_cells);
					Center_Alignment(bodycellStyle);

					Cell slaproperty_level_cells = slaproperty_level_row.createCell(col);
					slaproperty_level_cells.setCellValue(properties.get(i).getLevel());
					create_cellborder(bodycellStyle, slaproperty_level_cells);

					Cell slaproperty_hourylyrate_cells = slaproperty_hourylyrate_row.createCell(col);
					slaproperty_hourylyrate_cells.setCellValue(properties.get(i).getHourly_rate());
					create_cellborder(bodycellStyle, slaproperty_hourylyrate_cells);

					Cell sla_totalmanpowercost_cells = sla_totalmanpowercost_row.createCell(col);
					sla_totalmanpowercost_cells.setCellValue(properties.get(i).getTotal_manpower_cost());
					create_cellborder(bodycellStyle, sla_totalmanpowercost_cells);

					col++;
				}

				Cell year_cell_last = year_header_row.createCell(col);
				year_cell_last.setCellStyle(cellStyle_last);

				Cell billablehrs_cell_last = billablehours_row.createCell(col);
				billablehrs_cell_last.setCellStyle(cellStyle_last);
			}
		}
		rowheader--;
		bizcaseexcel_row = rowheader;

	}

	private void Center_Alignment(CellStyle cellStyle) {
		cellStyle.setAlignment(HorizontalAlignment.CENTER);
		cellStyle.setVerticalAlignment(VerticalAlignment.CENTER);
	}

	private void createbizcase_costinfo(Workbook workbook, Sheet sheet, Row year_header_row, int rowheader,
			List<BizCaseOtherServiceCalcInfo> bizCaseOtherServiceCalcInfoDetail) {

		// creating dynamic bizcasecostinfo header
		int col = 1;
		if (!bizCaseOtherServiceCalcInfoDetail.isEmpty()) {
			CellStyle headercellStyle = workbook.createCellStyle();
			CellStyle bodycellStyle = workbook.createCellStyle();
			List<Properties> firstpropertiesvalue = bizCaseOtherServiceCalcInfoDetail.get(1).getProperties();
			int property_size = firstpropertiesvalue.size();
			List<Row> cost_rows = new ArrayList<>();

			for (int i = 0; i < firstpropertiesvalue.size(); i++) {
				rowheader++;
				Row header_rows = sheet.createRow(rowheader);

				cost_rows.add(header_rows);

				Cell propertyname_cell = header_rows.createCell(0);
				propertyname_cell.setCellValue(firstpropertiesvalue.get(i).getProperty_name());
				create_cellborder(headercellStyle, propertyname_cell);
				addBold(workbook, headercellStyle, propertyname_cell);

			}
			// creating dynamic bizcasecostinfo header ends
			// creating dynamic bizcasecostinfo body starts
			rowheader = bizcaseexcel_row;
			for (BizCaseOtherServiceCalcInfo bizCaseOtherServiceCalcInfo : bizCaseOtherServiceCalcInfoDetail) {
				Cell year_cells = year_header_row.createCell(col);
				year_cells.setCellValue(bizCaseOtherServiceCalcInfo.getYear());

				create_cellborder(bodycellStyle, year_cells);
				addBold(workbook, headercellStyle, year_cells);
				Center_Alignment(headercellStyle);
				List<Properties> properties = bizCaseOtherServiceCalcInfo.getProperties();
				if (properties.isEmpty() || properties == null) { // to add empty row after year if properties no exist
					create_cellborder(headercellStyle, year_cells);
					Center_Alignment(headercellStyle);
					rowheader++;
				} else {
					for (int i = 0; i < properties.size(); i++) {
						if (rowheader == bizcaseexcel_row || property_size != -1) {
							property_size = property_size - 1;
							rowheader++;
						}
						Cell propertyvalue_cell = cost_rows.get(i).createCell(col);
						propertyvalue_cell.setCellValue(properties.get(i).getProperty_value());
						create_cellborder(bodycellStyle, propertyvalue_cell);
						Center_Alignment(bodycellStyle);

					}
				}
				col++;
			}

		} else { // to set empty row if data is not exist
			rowheader++;
		}
		rowheader--;
		bizcaseexcel_row = rowheader;

	}
	// // Bizcase report logic ends

	public String loadresourcedata() {
		List<G3CEmployeeMasterModel> g3CEmployeeMasterModels = g3cEmployeeRepository.findAllByStatusOrderById(true);
		return resourceinfoToExcel(g3CEmployeeMasterModels);
	}

	private String resourceinfoToExcel(List<G3CEmployeeMasterModel> g3cEmployeeMasterModels) {

		String[] HEADERs = { "ID", "Short Id", "Hr ID", "Name", "Primary Skill", "Secondary Skills" };
		String SHEET = "resourcelist";

		try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
			Sheet sheet = workbook.createSheet(SHEET);

			// Header
			Row headerRow = sheet.createRow(0);
			CellStyle cellStyle = workbook.createCellStyle();
			for (int col = 0; col < HEADERs.length; col++) {
				Cell cell = headerRow.createCell(col);
				cell.setCellValue(HEADERs[col]);
				addBold(workbook, cellStyle, cell);
			}

			int rowIdx = 1;
			for (G3CEmployeeMasterModel g3CEmployeeMasterModel : g3cEmployeeMasterModels) {
				Row row = sheet.createRow(rowIdx++);
				row.createCell(0).setCellValue(g3CEmployeeMasterModel.getId());
				row.createCell(1).setCellValue(g3CEmployeeMasterModel.getShortid());
				row.createCell(2).setCellValue(g3CEmployeeMasterModel.getHrid());
				row.createCell(3).setCellValue(g3CEmployeeMasterModel.getEmp_name());

				if (g3CEmployeeMasterModel.getSkills() != null) {
					row.createCell(4).setCellValue(g3CEmployeeMasterModel.getSkills().getPrimaryskill());
					List<String> secondaryskills = g3CEmployeeMasterModel.getSkills().getSecondary().stream()
							.map(Secondary::getSecondaryskill).toList();
					String secondaryskill_info = String.join(",", secondaryskills);
					row.createCell(5).setCellValue(secondaryskill_info);
				}

			}
			workbook.write(out);
			String res = Base64.getEncoder().encodeToString(out.toByteArray());
			return res;
		} catch (IOException e) {
			return null;
		}

	}

	public String loadgeneralresourcedata() {
		List<G3CEmployeeMasterModel> g3CEmployeeMasterModels = g3cEmployeeRepository.findAllByStatusOrderById(true);
		return generalresourceinfoToExcel(g3CEmployeeMasterModels);
	}

	private String generalresourceinfoToExcel(List<G3CEmployeeMasterModel> g3cEmployeeMasterModels) {

		String[] HEADERs = { "ID", "Cost Center", "Hr ID", "Name", "Short ID", "Email", "Supervisor Id",
				"Employee Type" };
		String SHEET = "generalresourcelist";

		try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
			Sheet sheet = workbook.createSheet(SHEET);

			// Header
			Row headerRow = sheet.createRow(0);
			CellStyle cellStyle = workbook.createCellStyle();
			for (int col = 0; col < HEADERs.length; col++) {
				Cell cell = headerRow.createCell(col);
				cell.setCellValue(HEADERs[col]);
				addBold(workbook, cellStyle, cell);
			}

			int rowIdx = 1;
			for (G3CEmployeeMasterModel g3CEmployeeMasterModel : g3cEmployeeMasterModels) {
				Row row = sheet.createRow(rowIdx++);
				row.createCell(0).setCellValue(g3CEmployeeMasterModel.getId());
				row.createCell(1).setCellValue(g3CEmployeeMasterModel.getCost_center());
				row.createCell(2).setCellValue(g3CEmployeeMasterModel.getHrid());
				row.createCell(3).setCellValue(g3CEmployeeMasterModel.getEmp_name());
				row.createCell(4).setCellValue(g3CEmployeeMasterModel.getShortid());
				row.createCell(5).setCellValue(g3CEmployeeMasterModel.getEmail());
//				G3CEmployeeMasterModel Supervisorg3CEmployee = g3cEmployeeRepository
//						.findEmployeeBySupvID(g3CEmployeeMasterModel.getSupv_id());
//				if (Supervisorg3CEmployee != null) {
//					row.createCell(6).setCellValue(Supervisorg3CEmployee.getEmp_name());
//				}
				row.createCell(6).setCellValue(g3CEmployeeMasterModel.getSupv_id());
				row.createCell(7).setCellValue(g3CEmployeeMasterModel.getEmployee_type());

			}
			workbook.write(out);
			String res = Base64.getEncoder().encodeToString(out.toByteArray());
			return res;
		} catch (IOException e) {
			return null;
		}

	}

	public String loadcapacitydata() {
		List<G3CEmployeeMasterModel> employeelist = g3cEmployeeRepository.findAllByStatusOrderById(true);
		ResourceReportView responceview = new ResourceReportView();
		if (!employeelist.isEmpty()) {
			responceview = resourceAllocationService.getResourceUtilizationVeiw(responceview, employeelist);
		}
		return capacityinfoToExcel(responceview);
	}

	private String capacityinfoToExcel(ResourceReportView responceview) {

		String[] HEADERs = { "User Id", "Hr ID", "Name", "Current Capacity", "Project Code", "Project Name",
				"Project Capacity", "Sla Code", "Sla Name" };
		String SHEET = "capacityreport";

		try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
			Sheet sheet = workbook.createSheet(SHEET);

			// Header
			Row headerRow = sheet.createRow(0);
			CellStyle cellStyle = workbook.createCellStyle();
			for (int col = 0; col < HEADERs.length; col++) {
				Cell cell = headerRow.createCell(col);
				cell.setCellValue(HEADERs[col]);
				addBold(workbook, cellStyle, cell);
			}

			List<ResourceBaseCapacity> resourcecapacity = responceview.getResourceview();
			if (resourcecapacity != null) {

				int rowIdx = 1;

				for (int i = 0; i < resourcecapacity.size(); i++) {

					List<ResourceBaseProjectCapacity> resourceBaseProjectCapacity = resourcecapacity.get(i)
							.getProjectinfo();

					if (resourceBaseProjectCapacity == null || resourceBaseProjectCapacity.isEmpty()) {

						Row generalrow = sheet.createRow(rowIdx++);

						generalrow.createCell(0).setCellValue(resourcecapacity.get(i).getUser_id());
						generalrow.createCell(1).setCellValue(resourcecapacity.get(i).getHr_id());
						generalrow.createCell(2).setCellValue(resourcecapacity.get(i).getEmp_name());
						generalrow.createCell(3).setCellValue(resourcecapacity.get(i).getCurren_capacity());
						generalrow.createCell(4).setCellValue("-");
						generalrow.createCell(5).setCellValue("-");
						generalrow.createCell(6).setCellValue("-");
						generalrow.createCell(7).setCellValue("-");
						generalrow.createCell(8).setCellValue("-");

					}

					else {

						for (int j = 0; j < resourceBaseProjectCapacity.size(); j++) {

							Row row = sheet.createRow(rowIdx++);

							row.createCell(0).setCellValue(resourcecapacity.get(i).getUser_id());
							row.createCell(1).setCellValue(resourcecapacity.get(i).getHr_id());
							row.createCell(2).setCellValue(resourcecapacity.get(i).getEmp_name());
							row.createCell(3).setCellValue(resourcecapacity.get(i).getCurren_capacity());
							row.createCell(4).setCellValue(resourceBaseProjectCapacity.get(j).getProject_code());
							row.createCell(5).setCellValue(resourceBaseProjectCapacity.get(j).getProject_name());
							row.createCell(6).setCellValue(resourceBaseProjectCapacity.get(j).getResource_capacity());
							row.createCell(7).setCellValue(resourceBaseProjectCapacity.get(j).getSla_code());
							row.createCell(8).setCellValue(resourceBaseProjectCapacity.get(j).getSla_name());
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

	// positions excel creation starts
	public String loadpositionsreport(String cost_center) {

		ResourceOverviewReport finalresponsedata = new ResourceOverviewReport();

		List<BusinessCaseRequest> bizcasedata = new ArrayList<>();

		if (!cost_center.isBlank() || !cost_center.isEmpty()) {
			bizcasedata = bizCaseRequestRepository.findByCostcenterAndApproved(cost_center);
		} else {
			bizcasedata = bizCaseRequestRepository.findByApproved();
		}

		Pageable pageable = PageRequest.of(0, 20);

		finalresponsedata = resourceOverveiwService.getResourceOverviewReport(cost_center, finalresponsedata,
				bizcasedata, pageable);
		return positionsinfoToExcel(cost_center, finalresponsedata);
	}

	private String positionsinfoToExcel(String cost_center, ResourceOverviewReport finalresponsedata) {

		String[] HEADERs = { "Cost Center", "Department", "total_positions", "approved_positions", "open_positions",
				"with_sla", "without_sla" };

		String SHEET = "positionslist";

		try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
			Sheet sheet = workbook.createSheet(SHEET);

			// Header
			Row headerRow = sheet.createRow(0);

			for (int col = 0; col < HEADERs.length; col++) {
				Cell cell = headerRow.createCell(col);
				cell.setCellValue(HEADERs[col]);
			}

			List<CostCenterModel> BizcaseCostcenters = costCenterRepository.findAllBizcaseCostCenters();

			Row row = sheet.createRow(1);

			if (cost_center.isBlank() || cost_center.isEmpty()) {
				row.createCell(0).setCellValue("Overall costcenter");
				row.createCell(1).setCellValue("Overall Department");
			}

			else if (BizcaseCostcenters != null || !BizcaseCostcenters.isEmpty()) {
				for (CostCenterModel costcenter : BizcaseCostcenters) {

					if (costcenter.getCostcenter().equalsIgnoreCase(cost_center)) {
						row.createCell(0).setCellValue(cost_center);
						row.createCell(1).setCellValue(costcenter.getTeam_group());
					}

					else {
						row.createCell(0).setCellValue("Costcenter not present : " + cost_center);
						row.createCell(1).setCellValue("Department not present");
					}
				}
			}

			row.createCell(2).setCellValue(finalresponsedata.getTotal_positions());
			row.createCell(3).setCellValue(finalresponsedata.getApproved_positions());
			row.createCell(4).setCellValue(finalresponsedata.getOpen_positions());
			row.createCell(5).setCellValue(finalresponsedata.getWith_sla());
			row.createCell(6).setCellValue(finalresponsedata.getWithout_sla());

			workbook.write(out);
			String res = Base64.getEncoder().encodeToString(out.toByteArray());
			return res;
		} catch (IOException e) {
			return null;
		}

	}

	public String loadtimesheetreport(String cost_center) {
		List<G3CEmployeeMasterModel> g3cEmployeeMasterModel = g3cEmployeeRepository.findOnlyByCostcenter(cost_center);
		return CostcenterResourceInfoToExcel(g3cEmployeeMasterModel);

	}

	private String CostcenterResourceInfoToExcel(List<G3CEmployeeMasterModel> g3cEmployeeMasterModel) {
		String[] HEADERs = { "Cost Center", "HR Id", "Name", "Project No.", "Project Name", "SLA No.", "SLA Name",
				"Billed hours", "Billable hours", "Employee Type" };

		String SHEET = "timesheetdata";
		int capacity = 0;
		try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
			Sheet sheet = workbook.createSheet(SHEET);

			// Header
			Row headerRow = sheet.createRow(0);

			CellStyle cellStyle = workbook.createCellStyle();
			for (int col = 0; col < HEADERs.length; col++) {
				Cell cell = headerRow.createCell(col);
				cell.setCellValue(HEADERs[col]);
				addBold(workbook, cellStyle, cell);

			}
			Row row = sheet.createRow(1);
			if (g3cEmployeeMasterModel != null || !g3cEmployeeMasterModel.isEmpty()) {
				int rowIdx = 1;
				for (G3CEmployeeMasterModel g3cemployee : g3cEmployeeMasterModel) {
					List<ResourceAllocationModel> resourceAllocationModel = resourceAllocationRepository
							.findByUserId(g3cemployee.getId());

//					if (resourceAllocationModel == null || resourceAllocationModel.isEmpty()) {
//						row = sheet.createRow(rowIdx++);
//						row.createCell(0).setCellValue(g3cemployee.getCost_center());
//						row.createCell(1).setCellValue(g3cemployee.getHrid());
//						row.createCell(2).setCellValue(g3cemployee.getEmp_name());
//					}

					if (resourceAllocationModel != null) {
						for (ResourceAllocationModel resourceAllocation : resourceAllocationModel) {
							row = sheet.createRow(rowIdx++);
							List<TimesheetModel> usermappedproject = timesheetRepository.findByUserIdAndprojectId(
									g3cemployee.getId(), resourceAllocation.getProject().getId());

							double project_billedhrs = usermappedproject.stream()
									.mapToDouble(TimesheetModel::getWorking_hours).sum();

							row.createCell(0).setCellValue(g3cemployee.getCost_center());
							row.createCell(1).setCellValue(g3cemployee.getHrid());
							row.createCell(2).setCellValue(g3cemployee.getEmp_name());
							row.createCell(3).setCellValue(resourceAllocation.getProject().getProject_id());
							row.createCell(4).setCellValue(resourceAllocation.getProject().getProject_name());
							row.createCell(5).setCellValue(resourceAllocation.getSla().getSlaid());
							row.createCell(6).setCellValue(resourceAllocation.getSla().getSlaname());

							if (usermappedproject != null) {
//								for (int i = 0; i <= usermappedproject.size(); i++) {

								row.createCell(7).setCellValue(project_billedhrs);

//								}

								double billable_hrs = 0;

								int count = timesheetRepository.findCountByUserIdAndprojectId(g3cemployee.getId(),
										resourceAllocation.getProject().getId());

								Optional<BusinessCaseRequest> businessCaseRequest = bizCaseRequestRepository
										.findByProjectId(resourceAllocation.getProject().getId());

								capacity = resourceAllocationRepository.findCapacityByProjectIdAndUserId(
										resourceAllocation.getProject().getId(), g3cemployee.getId());

								double capacity_percent = 0;
								if (businessCaseRequest.isPresent()) {

									capacity_percent = (((double) capacity) / 100)
											* businessCaseRequest.get().getWorking_hours();

									billable_hrs = capacity_percent * count;
									row.createCell(8).setCellValue(billable_hrs);

								}

							}

							row.createCell(9).setCellValue(g3cemployee.getEmployee_type());
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

	public String loadtimesheetemployeereport(String short_id) {

		List<TimesheetModel> timesheets = timesheetRepository.findByShort_id(short_id);
		return employeetimesheetInfoToExcel(timesheets);

	}

	private String employeetimesheetInfoToExcel(List<TimesheetModel> timesheets) {

		String[] HEADERs = { "HR Id", "Name", "Project No.", "Project Name", "SLA No.", "SLA Name",
				"Timesheet Comments", "Working Type", "Billed Hours" , "Employee Type"};

		String SHEET = "employeetimesheetdata";

		try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
			Sheet sheet = workbook.createSheet(SHEET);

			// Header
			Row headerRow = sheet.createRow(0);

			for (int col = 0; col < HEADERs.length; col++) {
				Cell cell = headerRow.createCell(col);
				cell.setCellValue(HEADERs[col]);
			}

			int rowIdx = 1;
			for (TimesheetModel timesheet : timesheets) {

				Row row = sheet.createRow(rowIdx++);

				if (timesheet.getUser() != null) {
					row.createCell(0).setCellValue(timesheet.getUser().getHrid());
					row.createCell(1).setCellValue(timesheet.getName());
				}

				if (timesheet.getProject() != null) {
					row.createCell(2).setCellValue(timesheet.getProject().getProject_id());
					row.createCell(3).setCellValue(timesheet.getProject().getProject_name());
				}

				if (timesheet.getSla() != null) {
					row.createCell(4).setCellValue(timesheet.getSla().getSlaid());
					row.createCell(5).setCellValue(timesheet.getSla().getSlaname());
				}

				row.createCell(6).setCellValue(timesheet.getComments());
				row.createCell(7).setCellValue(timesheet.getWorkingtype());
				row.createCell(8).setCellValue(timesheet.getWorking_hours());
				row.createCell(9).setCellValue(timesheet.getEmployee_type());

			}
			workbook.write(out);
			String res = Base64.getEncoder().encodeToString(out.toByteArray());
			return res;
		} catch (IOException e) {
			return null;
		}

	}

	public String taskreport(Long project_id) {
		List<TaskModel> taskModel = taskRepository.getTasksByid(project_id);
		return taskExcel(taskModel);
	}

	private String taskExcel(List<TaskModel> taskModel) {

		String[] HEADERs = { "Task Id", "Task Name", "HRID", "Name", "Project No", "Project Name", "SLA No", "SLA Name",
				"Billed hours", "Employee Type" };
		String SHEET = "taskReport";

		try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
			Sheet sheet = workbook.createSheet(SHEET);

			// Header
			Row headerRow = sheet.createRow(0);
			CellStyle cellStyle = workbook.createCellStyle();
			for (int col = 0; col < HEADERs.length; col++) {
				Cell cell = headerRow.createCell(col);
				cell.setCellValue(HEADERs[col]);
				addBold(workbook, cellStyle, cell);
			}

			int rowIdx = 1;
			for (TaskModel task : taskModel) {
				Row row = sheet.createRow(rowIdx++);
				row.createCell(0).setCellValue(task.getTaskid());
				row.createCell(1).setCellValue(task.getTaskname());
				row.createCell(2).setCellValue(task.getAssigne().getHrid());
				row.createCell(3).setCellValue(task.getAssigned_name());
				row.createCell(4).setCellValue(task.getProjectId().getId());
				row.createCell(5).setCellValue(task.getProjectId().getProject_name());
				row.createCell(6).setCellValue(task.getSlaId().getSlaid());
				row.createCell(7).setCellValue(task.getSlaId().getSlaname());

				Long sum = timesheetRepository.getTotalWorkingHoursbyTaskId(task.getId());
				if (sum != null) {
					row.createCell(8).setCellValue(sum);
				}

				else {
					row.createCell(8).setCellValue("NA");
				}
				row.createCell(9).setCellValue(task.getAssigne().getEmployee_type());	
				
			}
			workbook.write(out);
			String res = Base64.getEncoder().encodeToString(out.toByteArray());
			return res;
		} catch (IOException e) {
			return null;
		}

	}

	public String sla_travelcostinfo_ToExcel(List<SLAModel> slaModels) {

		String[] HEADERs = { "Project Code", "Project Name", "Budget (Bizcase)", "Sla No", "Sla Name",
				"Travel Estimate", "Invoiced Travel cost" };
		String SHEET = "travelcost_data";

		double travel_cost = 0;
		double invoiced_travel_cost = 0;

		try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
			Sheet sheet = workbook.createSheet(SHEET);

			// Header
			Row headerRow = sheet.createRow(0);

			for (int col = 0; col < HEADERs.length; col++) {
				Cell cell = headerRow.createCell(col);
				cell.setCellValue(HEADERs[col]);
			}

			// center alignment style
			CellStyle center_cellStyle = workbook.createCellStyle();
			Center_Alignment(center_cellStyle);

			int rowIdx = 1;
			for (SLAModel sla : slaModels) {
				Row row = sheet.createRow(rowIdx++);
				Cell projectcode_cell = row.createCell(0);
				projectcode_cell.setCellValue(sla.getProject_code());
				projectcode_cell.setCellStyle(center_cellStyle);

				Cell projectname_cell = row.createCell(1);
				projectname_cell.setCellValue(sla.getProject_name());
				projectname_cell.setCellStyle(center_cellStyle);

				Cell totalbudget_cell = row.createCell(2);
				totalbudget_cell.setCellValue(sla.getTotal_budget());
				totalbudget_cell.setCellStyle(center_cellStyle);

				row.createCell(3).setCellValue(sla.getSlaid());
				System.out.println("sla.getSlaid()  : " + sla.getSlaid());
				row.createCell(4).setCellValue(sla.getSlaname());

				if (sla.getSla_tariffsheet() != null && !sla.getSla_tariffsheet().isEmpty()) {
					travel_cost = sla.getSla_tariffsheet().stream().mapToDouble(e -> Double.valueOf(e.getAmount()))
							.sum();
				}
				row.createCell(5).setCellValue(travel_cost);

				List<SLAInvoiceModel> SLAInvoiceModels = slaInvoiceRepository.findBySlaIdAndActiveOrderById(sla.getId(),
						true);

				if (SLAInvoiceModels != null && !SLAInvoiceModels.isEmpty()) {
					invoiced_travel_cost = SLAInvoiceModels.stream()
							.filter(slatarrif -> Objects.nonNull(slatarrif.getSla_preinvoice_tariffsheet()))
							.flatMapToDouble(s -> s.getSla_preinvoice_tariffsheet().stream()
									.mapToDouble(t -> (Double.valueOf(t.getTotal_amount())
											- Double.valueOf(t.getBudget_available()))))
							.sum();
					row.createCell(6).setCellValue(invoiced_travel_cost);
				}
			}

			workbook.write(out);
			String res = Base64.getEncoder().encodeToString(out.toByteArray());
			return res;
		} catch (IOException e) {
			return null;
		}

	}

	public String benchreport() {
		List<G3CEmployeeMasterModel> beanchModel = g3cEmployeeRepository.findBeachResource();
		return BenchExcel(beanchModel);
	}

	private String BenchExcel(List<G3CEmployeeMasterModel> beanchModel) {

		String[] HEADERs = { "Short ID", "Name", "HRID", "Cost Centre", "Email", "Supervisor Id", "Employee Type",
				"Employee Status" };
		String SHEET = "BenchReport";

		try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
			Sheet sheet = workbook.createSheet(SHEET);

			// Header
			Row headerRow = sheet.createRow(0);
			CellStyle cellStyle = workbook.createCellStyle();
			for (int col = 0; col < HEADERs.length; col++) {
				Cell cell = headerRow.createCell(col);
				cell.setCellValue(HEADERs[col]);
				addBold(workbook, cellStyle, cell);
			}

			int rowIdx = 1;
			for (G3CEmployeeMasterModel g3CbeanchModel : beanchModel) {
				Row row = sheet.createRow(rowIdx++);
				row.createCell(0).setCellValue(g3CbeanchModel.getShortid());
				row.createCell(1).setCellValue(g3CbeanchModel.getEmp_name());
				row.createCell(2).setCellValue(g3CbeanchModel.getHrid());
				row.createCell(3).setCellValue(g3CbeanchModel.getCost_center());
				row.createCell(4).setCellValue(g3CbeanchModel.getEmail());

//	                G3CEmployeeMasterModel Supervisorg3CEmployee = g3cEmployeeRepository
//	                        .findEmployeeBySupvID(g3CbeanchModel.getSupv_id());
//	                if (Supervisorg3CEmployee != null) {
//	                    row.createCell(5).setCellValue(Supervisorg3CEmployee.getEmp_name());
//	                }
				row.createCell(5).setCellValue(g3CbeanchModel.getSupv_id());
				row.createCell(6).setCellValue(g3CbeanchModel.getEmployee_type());
				row.createCell(7).setCellValue(g3CbeanchModel.getEmployement_status());

			}
			workbook.write(out);
			String res = Base64.getEncoder().encodeToString(out.toByteArray());
			return res;
		} catch (IOException e) {
			return null;
		}
	}

	public String attritionreport() {
		List<G3CEmployeeMasterModel> attritionModel = g3cEmployeeRepository.findAttrition();
		return attritionExcel(attritionModel);
	}

	private String attritionExcel(List<G3CEmployeeMasterModel> attritionModel) {
		String[] HEADERs = { "Short ID", "Name", "HRID", "Cost Centre", "Email", "Supervisor Id", "Employee Type",
				"Employee Status" };
		String SHEET = "AttritionReport";

		try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
			Sheet sheet = workbook.createSheet(SHEET);

			// Header
			Row headerRow = sheet.createRow(0);
			CellStyle cellStyle = workbook.createCellStyle();
			for (int col = 0; col < HEADERs.length; col++) {
				Cell cell = headerRow.createCell(col);
				cell.setCellValue(HEADERs[col]);
				addBold(workbook, cellStyle, cell);
			}

			int rowIdx = 1;
			for (G3CEmployeeMasterModel g3CbeanchModel : attritionModel) {
				Row row = sheet.createRow(rowIdx++);
				row.createCell(0).setCellValue(g3CbeanchModel.getShortid());
				row.createCell(1).setCellValue(g3CbeanchModel.getEmp_name());
				row.createCell(2).setCellValue(g3CbeanchModel.getHrid());
				row.createCell(3).setCellValue(g3CbeanchModel.getCost_center());
				row.createCell(4).setCellValue(g3CbeanchModel.getEmail());

//	                G3CEmployeeMasterModel Supervisorg3CEmployee = g3cEmployeeRepository
//	                        .findEmployeeBySupvID(g3CbeanchModel.getSupv_id());
//	                if (Supervisorg3CEmployee != null) {
//	                    row.createCell(5).setCellValue(Supervisorg3CEmployee.getEmp_name());
//	                }
				row.createCell(5).setCellValue(g3CbeanchModel.getSupv_id());
				row.createCell(6).setCellValue(g3CbeanchModel.getEmployee_type());

				row.createCell(7).setCellValue(g3CbeanchModel.getEmployement_status());

			}
			workbook.write(out);
			String res = Base64.getEncoder().encodeToString(out.toByteArray());
			return res;
		} catch (IOException e) {
			return null;
		}
	}

	public String loadslareport() {
		List<SLAModel> slaModels = slaRepository.findAllByIs_activeOrderById();
		return slainfoToExcel(slaModels);
	}

	private String slainfoToExcel(List<SLAModel> slaModels) {

		String[] HEADERs = { "Project Code", "Project Name", "Budget (Bizcase)", "Currency", "SLA No", "SLA Name",
				"Payment Cycle", "Start Date", "End Date", "SLA Value", "Pre-invoice date", "Pre-invoice amount",
				"Invoice date", "Payment", "Preinvoice Count", "Preinvoice Cycle" };
		String SHEET = "SLAReport";

		try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
			Sheet sheet = workbook.createSheet(SHEET);

			// create date style
			CellStyle date_cellStyle = workbook.createCellStyle();
			CreationHelper createHelper = workbook.getCreationHelper();
			date_cellStyle.setDataFormat(createHelper.createDataFormat().getFormat("yyyy-MM-dd"));

			// Header
			Row headerRow = sheet.createRow(0);
			CellStyle cellStyle = workbook.createCellStyle();
			for (int col = 0; col < HEADERs.length; col++) {
				Cell cell = headerRow.createCell(col);
				cell.setCellValue(HEADERs[col]);
				addBold(workbook, cellStyle, cell);
			}

			int rowIdx = 1;
			Row row = sheet.createRow(rowIdx);
			for (SLAModel sla : slaModels) {
				List<SLAPreInvoiceModel> slaPreInvoiceModel = slaPreInvoiceRepository
						.findByAllActivePreInvoiceBySlaID(sla.getId());

//				if (slaPreInvoiceModel == null || slaPreInvoiceModel.isEmpty()) {
//
//					row = sheet.createRow(rowIdx++);
//					create_slareport_data(row, date_cellStyle, sla);
//				}

				if (slaPreInvoiceModel != null) {

					for (int i = 0; i < slaPreInvoiceModel.size(); i++) {
						row = sheet.createRow(rowIdx++);
						create_slareport_data(row, date_cellStyle, sla);

						Cell preinvoicedate_cell = row.createCell(10);
						if (slaPreInvoiceModel.get(i).getPreinvoice_date() != null) {
							preinvoicedate_cell.setCellValue(slaPreInvoiceModel.get(i).getPreinvoice_date());
							preinvoicedate_cell.setCellStyle(date_cellStyle);
						} else {
							preinvoicedate_cell.setCellValue("0000-00-00");
						}

						Cell startdate_cell = row.createCell(7);
						if (sla.getStart_date() != null) {
							startdate_cell.setCellValue(slaPreInvoiceModel.get(i).getStart_date());
							startdate_cell.setCellStyle(date_cellStyle);
						} else {
							startdate_cell.setCellValue("0000-00-00");
						}

						Cell enddate_cell = row.createCell(8);
						if (sla.getEnd_date() != null) {
							enddate_cell.setCellValue(slaPreInvoiceModel.get(i).getEnd_date());
							enddate_cell.setCellStyle(date_cellStyle);
						} else {
							enddate_cell.setCellValue("0000-00-00");
						}

						row.createCell(11).setCellValue(slaPreInvoiceModel.get(i).getTotal_budget());

						SLAInvoiceModel slaInvoice = slaInvoiceRepository
								.findByPreinvoice(slaPreInvoiceModel.get(i).getId());
						if (slaInvoice != null) {
							Cell invoicedate_cell = row.createCell(12);
							invoicedate_cell.setCellValue(slaInvoice.getInvoice_date());
							invoicedate_cell.setCellStyle(date_cellStyle);
							Double invoice_totalcost = 0.00;
							if (slaInvoice.getTotal_cost() != null) {
								invoice_totalcost = slaInvoice.getTotal_cost();
							}
							row.createCell(13).setCellValue(invoice_totalcost);
						}

						row.createCell(14).setCellValue(slaPreInvoiceModel.get(i).getPreinvoice_cycle());
						row.createCell(15).setCellValue(slaPreInvoiceModel.get(i).getPreinvoice_period());

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

	private void create_slareport_data(Row row, CellStyle date_cellStyle, SLAModel sla) {
		long bizcaseid = 0;
		Cell projectcode_cell = row.createCell(0);
		projectcode_cell.setCellValue(sla.getProject_code());
		projectcode_cell.setCellStyle(date_cellStyle);

		row.createCell(1).setCellValue(sla.getProject_name());

		bizcaseid = sla.getProject().getBizcase().getId();
		if (bizcaseid != 0) {
			double bizcase_budget = 0;
			Optional<BusinessCaseRequest> businessCaseRequest = bizCaseRequestRepository.findByIdAndActive(bizcaseid,
					true);
			if (businessCaseRequest.isPresent() && businessCaseRequest.get().getBizcasereport() != null
					&& businessCaseRequest.get().getBizcasereport().getSla_total_estimation() != null) {
				bizcase_budget = businessCaseRequest.get().getBizcasereport().getSla_total_estimation().stream()
						.flatMap(e -> e.getProperties().stream())
						.filter(properties -> properties.getProperty_name()
								.equalsIgnoreCase("Total SLA Estimate With Markup"))
						.mapToDouble(properties -> Double.parseDouble(properties.getProperty_value())).sum();
			}
			row.createCell(2).setCellValue(bizcase_budget);

		}
		row.createCell(3).setCellValue(sla.getCurrency());
		row.createCell(4).setCellValue(sla.getSlaid());
		row.createCell(5).setCellValue(sla.getSlaname());
		row.createCell(6).setCellValue(sla.getBilling_cycle());

		row.createCell(9).setCellValue(sla.getTotal_budget());

	}

	public String loadrevenuereport(int year) {
		List<CostCenterModel> costCenterModels = costCenterRepository.findAllByOrderById();
		return costcenterinfoToExcel(costCenterModels, year);
	}

	private String costcenterinfoToExcel(List<CostCenterModel> costCenterModels, int yearinfo) {

		String[] HEADERs = { "January -" + yearinfo, "January -" + yearinfo, "January -" + yearinfo,
				"January -" + yearinfo, "February -" + yearinfo, "February -" + yearinfo, "February -" + yearinfo,
				"February -" + yearinfo, "March -" + yearinfo, "March -" + yearinfo, "March -" + yearinfo,
				"March -" + yearinfo, "April -" + yearinfo, "April -" + yearinfo, "April -" + yearinfo,
				"April -" + yearinfo, "May -" + yearinfo, "May -" + yearinfo, "May -" + yearinfo, "May -" + yearinfo,
				"June -" + yearinfo, "June -" + yearinfo, "June -" + yearinfo, "June -" + yearinfo, "July -" + yearinfo,
				"July -" + yearinfo, "July -" + yearinfo, "July -" + yearinfo, "August -" + yearinfo,
				"August -" + yearinfo, "August -" + yearinfo, "August -" + yearinfo, "September -" + yearinfo,
				"September -" + yearinfo, "September -" + yearinfo, "September -" + yearinfo, "October -" + yearinfo,
				"October -" + yearinfo, "October -" + yearinfo, "October -" + yearinfo, "November -" + yearinfo,
				"November -" + yearinfo, "November -" + yearinfo, "November -" + yearinfo, "December -" + yearinfo,
				"December -" + yearinfo, "December -" + yearinfo, "December -" + yearinfo };

		String SHEET = "revenuedata";

		try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
			Sheet sheet = workbook.createSheet(SHEET);

			// Header logic starts here
			Row headerRow = sheet.createRow(0);
			int merge_count_start = 2;
			int merge_count_end = 2;

			CellStyle cellStyle = workbook.createCellStyle();
			Center_Alignment(cellStyle);

			Cell costcenter_cell = headerRow.createCell(0);
			costcenter_cell.setCellValue("Cost Center");
			addBold(workbook, cellStyle, costcenter_cell);

			Cell department_cell = headerRow.createCell(1);
			department_cell.setCellValue("Department");
			addBold(workbook, cellStyle, department_cell);

			sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
			sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));

			for (int col = 2; col < HEADERs.length; col++) {
				Cell cell = headerRow.createCell(col);
				cell.setCellValue(HEADERs[col]);
				addBold(workbook, cellStyle, cell);
				if (col == 2) { // first 4 column merge logic
					merge_count_start = 2;
					merge_count_end = col + 3;
				} else { // first columns merge logic
					merge_count_start = merge_count_end + 1;
					merge_count_end = merge_count_start + 3;
				}

				if (!(merge_count_start >= 50)) { // merge close after december columns
					sheet.addMergedRegion(new CellRangeAddress(0, 0, merge_count_start, merge_count_end));
				}
			}

			Row firstheader_Row = sheet.createRow(1);

			for (int i = 2; i < HEADERs.length; i += 4) {

				Cell revenueheader_cell = firstheader_Row.createCell(i);
				revenueheader_cell.setCellValue("Revenue");
				addBold(workbook, cellStyle, revenueheader_cell);

				Cell expenseheader_cell = firstheader_Row.createCell(i + 1);
				expenseheader_cell.setCellValue("Expense");
				addBold(workbook, cellStyle, expenseheader_cell);

				Cell ebitheader_cell = firstheader_Row.createCell(i + 2);
				ebitheader_cell.setCellValue("Ebit");
				addBold(workbook, cellStyle, ebitheader_cell);

				Cell profitpercent_header_cell = firstheader_Row.createCell(i + 3);
				profitpercent_header_cell.setCellValue("profit % ");
				addBold(workbook, cellStyle, profitpercent_header_cell);

			}

			// header logic ends here
			// excel body logic starts here

			double profit_percent = 0;

			int rowIdx = 2;

			for (CostCenterModel costCenterModel : costCenterModels) {

				List<PlanVsActualReport> revenueplanvsactual = new ArrayList<>();
				List<PlanVsActualReport> expenseplanvsactual = new ArrayList<>();
				List<PlanVsActualReport> ebitplanvsactual = new ArrayList<>();
				List<PlanVsActualReport> profitpercent_planvsactual = new ArrayList<>();

				Row row = sheet.createRow(rowIdx++);
				row.createCell(0).setCellValue(costCenterModel.getCostcenter());
				row.createCell(1).setCellValue(costCenterModel.getTeam_group());

				int[] months = new int[] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 };

				for (int i = 0; i < months.length; i++) {
					PlanVsActualReport currentmonthRevenue = new PlanVsActualReport();
					PlanVsActualReport currentmonthExpense = new PlanVsActualReport();
					PlanVsActualReport currentmonthebit = new PlanVsActualReport();
					PlanVsActualReport currentmonthprofitpercent = new PlanVsActualReport();

					int month = months[i];

					List<SLAInvoiceModel> revenue_acutual_amount_list = slaInvoiceRepository
							.findCurrentMonthRevenueCostCenter(yearinfo, month);

					double revenue_acutual_amount = revenue_acutual_amount_list.stream()
							.flatMapToDouble(slainvoice -> slainvoice.getSla().getRevenue_cost_center().stream()
									.filter(sla -> sla.getCost_center().equals(costCenterModel.getCostcenter()))
									.mapToDouble(slarevnue -> (slarevnue.getAllocate_percentage() / 100
											* slainvoice.getTotal_cost())))
							.sum();

					double expense_acutal_IODump = ioDumpRepository.findCurrentMonthExpenseCostCenter(yearinfo, month,
							costCenterModel.getCostcenter());
					double expense_acutal_CCDump = ccDumpRepository.findCurrentMonthExpenseCostCenter(yearinfo, month,
							costCenterModel.getCostcenter());

					double expense_actual_amount = expense_acutal_IODump + expense_acutal_CCDump;

					currentmonthRevenue.setActual((double) Math.round(revenue_acutual_amount));
					revenueplanvsactual.add(currentmonthRevenue);

					currentmonthExpense.setActual((double) Math.round(expense_actual_amount));
					expenseplanvsactual.add(currentmonthExpense);

//					EBIT Calculation Invoice Raise - Expense = EBIT(actual), SLA - Expense= Ebit(Plan)
					double ebit = (double) Math.round(revenue_acutual_amount - expense_actual_amount);
					currentmonthebit.setActual((double) Math.round(revenue_acutual_amount - expense_actual_amount));
					ebitplanvsactual.add(currentmonthebit);

					profit_percent = ((revenue_acutual_amount - expense_actual_amount) / revenue_acutual_amount) * 100;

					if (ebit == 0) {
						currentmonthprofitpercent.setActual((double) 0);
					} else if (profit_percent >= 0) {
						double newprofit_percent = Math.floor(profit_percent * 100) / 100;
						currentmonthprofitpercent.setActual(newprofit_percent);
					}

					else {
						currentmonthprofitpercent.setActual((double) 0);
					}

					profitpercent_planvsactual.add(currentmonthprofitpercent);
				}

				printcostinfos(revenueplanvsactual, row, 2);
				printcostinfos(expenseplanvsactual, row, 3);
				printcostinfos(ebitplanvsactual, row, 4);
				printcostinfos(profitpercent_planvsactual, row, 5);

			}

			workbook.write(out);
			String res = Base64.getEncoder().encodeToString(out.toByteArray());
			return res;
		} catch (IOException e) {
			return null;
		}

	}

	private void printcostinfos(List<PlanVsActualReport> costinfosactual, Row row, int rowstart) {
		if (costinfosactual != null) {
			int revenue = 0;

			for (int i = rowstart; i < 51; i += 4) {

				for (int j = revenue; j <= revenue; j++) {
					row.createCell(i).setCellValue(costinfosactual.get(j).getActual());
				}
				if (revenue < costinfosactual.size()) {
					revenue++;
				}

				if ((i >= 46)) {
					break;
				}

			}

		}

	}

	public String materialreport() {

		List<String> materialModel = materilaRepository.DescriptionField();
		List<SLAModel> slaModel = slaRepository.findAllByIs_activeOrderById();

		// header fileds
		List<String> head = new ArrayList<String>();
		head.add("Project Name");
		head.add("Project Code");
		head.add("SLA Name");
		head.add("SLA Code");
		if (materialModel != null) {
			for (String temp : materialModel) {
				head.add(temp);
			}
		}

		String[] array = head.stream().toArray(String[]::new);

		List<MaterialReport> reportLists = new ArrayList<>();

		if (slaModel != null && !slaModel.isEmpty()) {
			slaModel.stream().forEach(sla -> {

				MaterialReport report = new MaterialReport();

				report.setProject_name(sla.getProject_name());
				report.setProject_code(sla.getProject_code());
				report.setSlaName(sla.getSlaname());
				report.setSlaCode(sla.getSlaid());

				List<DescripcitionAmount> DescriptionLists = new ArrayList<>();

				if (materialModel != null && !materialModel.isEmpty()) {
					double correntamount = 0;
					for (String material : materialModel) {

						DescripcitionAmount currentDesciption = new DescripcitionAmount();

						if (slaModel != null && slaModel.get(0).getSlainvoice() != null && !slaModel.isEmpty()
								&& !slaModel.get(0).getSlainvoice().isEmpty()) {

							correntamount = sla.getSlainvoice().stream()
									.filter(slatarrif -> Objects.nonNull(slatarrif.getSla_preinvoice_tariffsheet()))
									.flatMapToDouble(slainvoice -> slainvoice.getSla_preinvoice_tariffsheet().stream()
											.filter(traffic -> traffic.getMaterial_description().contains(material))
											.mapToDouble(traffic -> Double.parseDouble(traffic.getTotal_amount())))
									.sum();
							currentDesciption.setAmount(correntamount);
						}
						currentDesciption.setDescription(material);
						DescriptionLists.add(currentDesciption);

					}
				}

				report.setDescripcition_amount(DescriptionLists);
				reportLists.add(report);
			});
		}

		return materialExcel(reportLists, array);
	}

	private String materialExcel(List<MaterialReport> materilaModel, String[] HEADERs) {

		String SHEET = "MaterialReport";

		try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
			Sheet sheet = workbook.createSheet(SHEET);

			// Header
			Row headerRow = sheet.createRow(0);
			CellStyle cellStyle = workbook.createCellStyle();

			for (int col = 0; col < HEADERs.length; col++) {
				Cell cell = headerRow.createCell(col);
				cell.setCellValue(HEADERs[col]);
				addBold(workbook, cellStyle, cell);
			}

			int rowIdx = 1;
			for (MaterialReport g3CmaterialModel : materilaModel) {

				Row row = sheet.createRow(rowIdx);
				row.createCell(0).setCellValue(g3CmaterialModel.getProject_name());
				row.createCell(1).setCellValue(g3CmaterialModel.getProject_code());
				row.createCell(2).setCellValue(g3CmaterialModel.getSlaName());
				row.createCell(3).setCellValue(g3CmaterialModel.getSlaCode());

				List<DescripcitionAmount> descripcitionAmount = g3CmaterialModel.getDescripcition_amount().stream()
						.sorted(Comparator.comparing(DescripcitionAmount::getDescription).reversed()).toList();

				for (DescripcitionAmount temp : descripcitionAmount) {
					for (int col = 4; col < HEADERs.length; col++) {

						if (HEADERs[col].equals(temp.getDescription())) {
							row.createCell(col).setCellValue(temp.getAmount());

						}
					}
				}

				rowIdx++;

			}
			workbook.write(out);

			String res = Base64.getEncoder().encodeToString(out.toByteArray());
			return res;
		} catch (IOException e) {
			return null;
		}
	}

	private String bizcaserecruitmentinfoToExcel(List<JDMappingModel> manpowerData) {

		String[] HEADERs = { "Level", "Position code", "Remarks", "Status", "Joining Date-Plan",
				"Joining Date-Actual" };
		String SHEET = "recruitmentdata";
		try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
			Sheet sheet = workbook.createSheet(SHEET);

			// Header
			Row headerRow = sheet.createRow(0);
			CellStyle cellStyle = workbook.createCellStyle();
			for (int col = 0; col < HEADERs.length; col++) {
				Cell cell = headerRow.createCell(col);
				cell.setCellValue(HEADERs[col]);
				addBold(workbook, cellStyle, cell);
			}

			int rowIdx = 1;
			Row row;
			for (JDMappingModel jdMappingModel : manpowerData) {
				if (jdMappingModel.getHired_details() != null && !jdMappingModel.getHired_details().isEmpty()) {
					for (JDHiredResponse jdHiredResponse : jdMappingModel.getHired_details()) {
						row = sheet.createRow(rowIdx++);
						row.createCell(0).setCellValue(jdMappingModel.getLevel());
						row.createCell(1).setCellValue(jdMappingModel.getPosition_code());
						row.createCell(2).setCellValue(jdMappingModel.getRemarks());
						row.createCell(3).setCellValue(jdHiredResponse.getStatus());
						row.createCell(4).setCellValue(jdMappingModel.getMonthandyear());
						row.createCell(5).setCellValue(jdMappingModel.getActualmonthandyear());
					}
				}

				else {
					row = sheet.createRow(rowIdx++);
					row.createCell(0).setCellValue(jdMappingModel.getLevel());
					row.createCell(1).setCellValue(jdMappingModel.getPosition_code());
					row.createCell(2).setCellValue(jdMappingModel.getRemarks());
					row.createCell(4).setCellValue(jdMappingModel.getMonthandyear());
					row.createCell(5).setCellValue(jdMappingModel.getActualmonthandyear());
				}
			}

			workbook.write(out);
//			 return new ByteArrayInputStream(out.toByteArray());
			String res = Base64.getEncoder().encodeToString(out.toByteArray());
			return res;
		} catch (IOException e) {
			return null;
		}
	}

	public String loadrecruitmentreport() {
		List<JDMappingModel> manpowerData = jdMappingRepository.findAllByOrderById();
		return bizcaserecruitmentinfoToExcel(manpowerData);
	}

}

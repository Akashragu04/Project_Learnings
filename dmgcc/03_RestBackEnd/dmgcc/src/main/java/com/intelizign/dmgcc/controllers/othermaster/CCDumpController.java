package com.intelizign.dmgcc.controllers.othermaster;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.text.DateFormatSymbols;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.validation.Valid;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVPrinter;
import org.apache.commons.csv.CSVRecord;
import org.apache.commons.csv.QuoteMode;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.intelizign.dmgcc.models.othermaster.CCDumpModel;
import com.intelizign.dmgcc.repositories.othermaster.CCDumpRepository;
import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.response.othermaster.CCChartResponse;
import com.intelizign.dmgcc.response.othermaster.CCChartResponse.CCDescriptionwiseExpense;
import com.intelizign.dmgcc.response.othermaster.CCChartResponse.CCMonthwiseExpense;

@RestController
@RequestMapping("/ccdump")
public class CCDumpController {

	@Autowired
	CCDumpRepository ccdumpRepository;
	public final Logger LOGGER = LogManager.getLogger(CCDumpController.class);

	@PostMapping("/create")

	public ResponseEntity<Object> createcostcenter(@RequestBody CCDumpModel ccDumpRequest) {
		try {

			CCDumpModel ccDumpModel = ccdumpRepository.save(ccDumpRequest);
			return ResponseHandler.generateResponse("CC Created Successfully", true, HttpStatus.OK, ccDumpModel);

		} catch (Exception e) {
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin" + e.getMessage(),
					false, HttpStatus.OK, null);
		}
	}

	@PostMapping("bulkinsert")

	public ResponseEntity<Object> createIoDumpdatas(@RequestBody List<CCDumpModel> CCDumpRequest) {
		try {
			List<CCDumpModel> ccDumpdatas = ccdumpRepository.saveAll(CCDumpRequest);
			return ResponseHandler.generateResponse("IO Dump Created", true, HttpStatus.OK, ccDumpdatas);

		} catch (Exception e) {
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin" + e.getMessage(),
					false, HttpStatus.OK, null);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<Object> findCCDumpdata(@PathVariable Long id) {
		try {
			return ccdumpRepository.findById(id).map(CCDumpData -> ResponseHandler
					.generateResponse("CC Dump data Found", true, HttpStatus.OK, CCDumpData)).orElseGet(() -> {
						LOGGER.error("Exceptions happen!: " + id + " CC ID Doesn't exist");
						return ResponseHandler.generateResponse("CC ID  " + id + "  Doesn't exist", false,
								HttpStatus.OK, null);
					});

		} catch (Exception e) {
			LOGGER.error("Exceptions happen!:CC DUMP ID " + id + " Doesn't exist DB Error: " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@GetMapping("")
	public ResponseEntity<Object> findAllCCDatas(@RequestParam(required = false) String searchKeyword,
			@PageableDefault(size = 10, page = 0, sort = "id", direction = Direction.DESC) Pageable pageable) {
		try {
			Page<CCDumpModel> ccDumpDatas = ccdumpRepository.findbySearchandSort(searchKeyword, pageable);

			return ResponseHandler.generateResponse("List of CC Dump datas found", true, HttpStatus.OK, ccDumpDatas);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get all CC Dump datas: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	@PutMapping("/update/{id}")
	public ResponseEntity<Object> updateCCData(@PathVariable(value = "id") Long id,
			@Valid @RequestBody CCDumpModel updateCcdata) {
		try {
			return ccdumpRepository.findById(id).map(cc_data -> {
				cc_data.setCo_object_name(updateCcdata.getCo_object_name());
				cc_data.setCostcenter(updateCcdata.getCostcenter());
				cc_data.setCostelement(updateCcdata.getCostelement());
				cc_data.setCost_element_name(updateCcdata.getCost_element_name());
				cc_data.setDocument_date(updateCcdata.getDocument_date());
				cc_data.setDocument_header_text(updateCcdata.getDocument_header_text());
				cc_data.setDocument_number(updateCcdata.getDocument_number());
				cc_data.setFiscalyear(updateCcdata.getFiscalyear());
				cc_data.setMaterial(updateCcdata.getMaterial());
				cc_data.setMaterial_description(updateCcdata.getMaterial_description());
				cc_data.setName(updateCcdata.getName());
				cc_data.setObject_currency(updateCcdata.getObject_currency());
				cc_data.setOffset_acct_name(updateCcdata.getOffset_acct_name());
				cc_data.setOffset_acct_no(updateCcdata.getOffset_acct_no());
				cc_data.setPartner_object(updateCcdata.getPartner_object());
				cc_data.setPeriod(updateCcdata.getPeriod());
				cc_data.setPlant(updateCcdata.getPlant());
				cc_data.setPosting_date(updateCcdata.getPosting_date());
				cc_data.setPurchase_order_text(updateCcdata.getPurchase_order_text());
				cc_data.setPurchasing_document(updateCcdata.getPurchasing_document());
				cc_data.setRef_document_number(updateCcdata.getRef_document_number());
				cc_data.setReference_procedure(updateCcdata.getReference_procedure());
				cc_data.setReport_currency(updateCcdata.getReport_currency());
				cc_data.setTotalquantity(updateCcdata.getTotalquantity());
				cc_data.setTrancur_value(updateCcdata.getTrancur_value());
				cc_data.setTransaction_currency(updateCcdata.getTransaction_currency());
				cc_data.setVal_inrep_cur(updateCcdata.getVal_inrep_cur());
				cc_data.setValue_obj_crcy(updateCcdata.getValue_obj_crcy());
				cc_data.setValuetype(updateCcdata.getValuetype());

				ccdumpRepository.save(cc_data);
				return ResponseHandler.generateResponse("CC Data Updated Successfully", true, HttpStatus.OK, cc_data);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: CC ID Doesn't exist");
				return ResponseHandler.generateResponse("CC_Id  Doesn't exist", false, HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while Updating CC ID: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Object> deleteCcData(@PathVariable(value = "id") Long id) {
		try {
			return ccdumpRepository.findById(id).map(customerdata -> {

				ccdumpRepository.deleteById(id);
				return ResponseHandler.generateResponse("CC Deleted Successfully", true, HttpStatus.OK, null);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: CC dump " + id + " Doesn't exist");
				return ResponseHandler.generateResponse("CC " + id + " Doesn't exist", false, HttpStatus.OK, null);
			});
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while remove project: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	@GetMapping("/download")
	public ResponseEntity<Resource> getFile() {

		String filename = "ccdumpdata.csv";
		InputStreamResource file = new InputStreamResource(load());
		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
				.contentType(MediaType.parseMediaType("application/vnd.ms-word")).body(file);
	}

	public ByteArrayInputStream load() {
		List<CCDumpModel> ccdumpdatas = ccdumpRepository.findAllByOrderById();
		return CustomerMasterToCSV(ccdumpdatas);

	}

	public static ByteArrayInputStream CustomerMasterToCSV(List<CCDumpModel> ccdumpdatas) {

		final CSVFormat format = CSVFormat.DEFAULT.withQuoteMode(QuoteMode.MINIMAL);
		try (ByteArrayOutputStream out = new ByteArrayOutputStream();

				CSVPrinter csvPrinter = new CSVPrinter(new PrintWriter(out), format);) {

			List<Object> headers = new ArrayList<>();
			headers = Arrays.asList("fiscalYear", "period", "costCenter", "coObjectName", "costElement",
					"costElementName", "valueInObjectCurrency", "offsetAcctNo", "offsetAcctName", "name",
					"documentNumber", "documentDate", "postingDate", "refDocumntNo", "documentHeaderTxt",
					"purchasingDocument", "purchaseOrderText", "material", "materialDescription", "totalQuantity",
					"plant", "referenceProcedure", "valInRepCur", "transactionCurrency", "objectCurrency",
					"reportCurrency", "trancurValue", "valueType", "partnerObject");

			csvPrinter.printRecord(headers);
			for (CCDumpModel ccdumpdata : ccdumpdatas) {
				List<Object> values = new ArrayList<>();
				values = Arrays.asList(ccdumpdata.getFiscalyear(), ccdumpdata.getPeriod(), ccdumpdata.getCostcenter(),
						ccdumpdata.getCo_object_name(), ccdumpdata.getCostelement(), ccdumpdata.getCost_element_name(),
						ccdumpdata.getValue_obj_crcy(), ccdumpdata.getOffset_acct_no(),
						ccdumpdata.getOffset_acct_name(), ccdumpdata.getName(), ccdumpdata.getDocument_number(),
						ccdumpdata.getDocument_date(), ccdumpdata.getPosting_date(),
						ccdumpdata.getRef_document_number(), ccdumpdata.getDocument_header_text(),
						ccdumpdata.getPurchasing_document(), ccdumpdata.getPurchase_order_text(),
						ccdumpdata.getMaterial(), ccdumpdata.getMaterial_description(), ccdumpdata.getTotalquantity(),
						ccdumpdata.getPlant(), ccdumpdata.getReference_procedure(), ccdumpdata.getVal_inrep_cur(),
						ccdumpdata.getTransaction_currency(), ccdumpdata.getObject_currency(),
						ccdumpdata.getReport_currency(), ccdumpdata.getTrancur_value(), ccdumpdata.getValuetype(),
						ccdumpdata.getPartner_object());
				csvPrinter.printRecord(values);
			}

			csvPrinter.flush();
			return new ByteArrayInputStream(out.toByteArray());
		}

		catch (IOException e) {
			return null;
		}
	}

	@PostMapping(value = "/uploadnewccdump", consumes = { "multipart/form-data" })
	public ResponseEntity<Object> uploadnewCCdump(@RequestParam("file") MultipartFile file) {
		try {
			List<CCDumpModel> ccdumpdata = null;
			List<String> tableData = List.of("fiscalYear", "period", "costCenter", "coObjectName", "costElement",
					"costElementName", "valueInObjectCurrency", "offsetAcctNo", "offsetAcctName", "name",
					"documentNumber", "documentDate", "postingDate", "refDocumntNo", "documentHeaderTxt",
					"purchasingDocument", "purchaseOrderText", "material", "materialDescription", "totalQuantity",
					"plant", "referenceProcedure", "valInRepCur", "transactionCurrency", "objectCurrency",
					"reportCurrency", "trancurValue", "valueType", "partnerObject");
			List<String> sortedTableColumn = tableData.stream().sorted().toList();

			List<String> sortedCSVColumn;
			String contenttype = file.getContentType();
			if (contenttype != null && contenttype.equals("text/csv")) {
				BufferedReader fileReader = new BufferedReader(
						new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8));
				CSVParser csvParser = new CSVParser(fileReader,
						CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());

				List<CSVRecord> csvRecords = csvParser.getRecords();

				if (csvRecords.size() > 0) {
					sortedCSVColumn = csvRecords.get(0).getParser().getHeaderNames().stream().sorted().toList();

					boolean status = sortedCSVColumn.equals(sortedTableColumn);

					if (status) {
						// delete the existing records and save latest excel data
						List<CCDumpModel> iodumpinfo = ccdumpRepository.findAll();
						if (!iodumpinfo.isEmpty()) {
							ccdumpRepository.deleteAll();
						}
						List<CCDumpModel> iodumpmodels = saveCsvRecords(csvRecords);

						ccdumpdata = ccdumpRepository.saveAll(iodumpmodels);
						LOGGER.error("CCDump Data inserted from upload file:  ");
						return ResponseHandler.generateResponse("CCDump Data inserted from upload csv file:  ", true,
								HttpStatus.OK, null);
					} else {
						LOGGER.error("Column Names Are Not Equal:  {}", file.getInputStream());
						return ResponseHandler.generateResponse("Column Names Are Not Equal:  ", false, HttpStatus.OK,
								null);
					}
				}

				else {
					LOGGER.error("Uploaded File should not be empty");
					return ResponseHandler.generateResponse("Uploaded File should not be empty", false, HttpStatus.OK,
							null);
				}

			} else {
				LOGGER.error("Uploaded File is Not a Csv File:");
				return ResponseHandler.generateResponse("Uploaded File is Not a Csv File:", false, HttpStatus.OK, null);
			}
		} catch (Exception e) {
			LOGGER.error("Error while Creating .csv records " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, e.getStackTrace());
		}
	}

	private List<CCDumpModel> saveCsvRecords(List<CSVRecord> csvRecords) {

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

		List<CCDumpModel> ccdumpdata = new ArrayList<>();
		for (CSVRecord csvRecord : csvRecords) {
			CCDumpModel ccdump = new CCDumpModel();
			ccdump.setCo_object_name(csvRecord.get("coObjectName"));
			ccdump.setCostcenter(csvRecord.get("costCenter"));
			ccdump.setCostelement(csvRecord.get("costElement"));
			ccdump.setCost_element_name(csvRecord.get("costElementName"));

			ccdump.setDocument_header_text(csvRecord.get("documentHeaderTxt"));
			ccdump.setDocument_number(csvRecord.get("documentNumber"));
			ccdump.setFiscalyear(csvRecord.get("fiscalYear"));
			ccdump.setMaterial(csvRecord.get("material"));
			ccdump.setMaterial_description(csvRecord.get("materialDescription"));
			ccdump.setName(csvRecord.get("name"));
			ccdump.setObject_currency(csvRecord.get("objectCurrency"));
			ccdump.setOffset_acct_name(csvRecord.get("offsetAcctName"));
			ccdump.setOffset_acct_no(csvRecord.get("offsetAcctNo"));
			ccdump.setPartner_object(csvRecord.get("partnerObject"));
			ccdump.setPeriod(csvRecord.get("period"));
			ccdump.setPlant(csvRecord.get("plant"));
			ccdump.setPurchase_order_text(csvRecord.get("purchaseOrderText"));
			ccdump.setPurchasing_document(csvRecord.get("purchasingDocument"));
			ccdump.setRef_document_number(csvRecord.get("refDocumntNo"));
			ccdump.setReference_procedure(csvRecord.get("referenceProcedure"));
			ccdump.setReport_currency(csvRecord.get("reportCurrency"));
			ccdump.setTotalquantity(csvRecord.get("totalQuantity"));
			ccdump.setTransaction_currency(csvRecord.get("transactionCurrency"));
			ccdump.setVal_inrep_cur(csvRecord.get("valInRepCur"));
			ccdump.setValuetype(csvRecord.get("valueType"));

			if (csvRecord.get("documentDate") != null && !csvRecord.get("documentDate").isBlank())
				ccdump.setDocument_date(LocalDate.parse(csvRecord.get("documentDate"), formatter));
			if (csvRecord.get("postingDate") != null && !csvRecord.get("postingDate").isBlank())
				ccdump.setPosting_date(LocalDate.parse(csvRecord.get("postingDate"), formatter));
			if (csvRecord.get("trancurValue") != null || !csvRecord.get("trancurValue").isBlank())
				ccdump.setTrancur_value(Double.parseDouble(csvRecord.get("trancurValue")));
			if (csvRecord.get("valueInObjectCurrency") != null && !csvRecord.get("valueInObjectCurrency").isBlank())
				ccdump.setValue_obj_crcy(Double.parseDouble(csvRecord.get("valueInObjectCurrency")));

			ccdumpdata.add(ccdump);
		}
		return ccdumpdata;
	}

	@GetMapping("/barchartreport")
	public ResponseEntity<Object> findAllCCBarchartReport() {
		try {

			LocalDate today_date = LocalDate.now();
			String today_year = String.valueOf(today_date.getYear());
			int year = today_date.getYear();
			double total_year_expense = 0;
			CCChartResponse ccChartResponse = new CCChartResponse();

			// expense monthwise report of current starts here
			List<CCMonthwiseExpense> ccMonthwiseExpenses = new ArrayList<>();
			List<CCDescriptionwiseExpense> ccDescriptionExpenses = new ArrayList<>();

			for (int i = 1; i <= 12; i++) {
				CCMonthwiseExpense ccMonthwiseExpense = new CCMonthwiseExpense();
				double expense_acutal_CCDump = ccdumpRepository.findCurrentMonthExpense(year, i);

				String month = new DateFormatSymbols().getMonths()[i - 1];
				String threeletter_month = month.substring(0, 3);
				ccMonthwiseExpense.setMonth(threeletter_month);
				ccMonthwiseExpense.setMonthwise_expense(expense_acutal_CCDump);
				ccMonthwiseExpenses.add(ccMonthwiseExpense);

				total_year_expense += expense_acutal_CCDump;
			}
			ccChartResponse.setYear(today_year);
			ccChartResponse.setCcMonthwiseExpenses(ccMonthwiseExpenses);
			// expense monthwise report of current ends here
			List<String> ccDescriptionwiseExpenses = ccdumpRepository.findByDescriptionAndExpense();

			if (!ccDescriptionwiseExpenses.isEmpty() && ccDescriptionwiseExpenses != null) {
				for (String ccDescriptionwiseExpense : ccDescriptionwiseExpenses) {
					String[] ar = ccDescriptionwiseExpense.split(",");
					CCDescriptionwiseExpense ccDescriptionwiseExpensedata = new CCDescriptionwiseExpense();

					ccDescriptionwiseExpensedata.setDescription(ar[0]);
					ccDescriptionwiseExpensedata.setMonthwise_expense(Double.parseDouble(ar[1]));
					ccDescriptionExpenses.add(ccDescriptionwiseExpensedata);
				}
			}
			ccChartResponse.setYear(today_year);
			ccChartResponse.setCcMonthwiseExpenses(ccMonthwiseExpenses);
			ccChartResponse.setTotal_expense(total_year_expense);
			ccChartResponse.setCcDescriptionwiseExpenses(ccDescriptionExpenses);
			return ResponseHandler.generateResponse("List of CC Dump data ", true, HttpStatus.OK, ccChartResponse);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get all cc barchart report data: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}
}

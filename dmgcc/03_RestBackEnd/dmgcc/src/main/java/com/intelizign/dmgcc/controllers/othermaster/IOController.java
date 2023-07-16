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

import com.intelizign.dmgcc.models.othermaster.IODumpModel;
import com.intelizign.dmgcc.repositories.othermaster.IODumpRepository;
import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.response.othermaster.IOChartResponse;
import com.intelizign.dmgcc.response.othermaster.IOChartResponse.IODescriptionwiseExpense;
import com.intelizign.dmgcc.response.othermaster.IOChartResponse.IOMonthwiseExpense;

@RestController
@RequestMapping("/iodump")
public class IOController {

	@Autowired
	IODumpRepository ioDumpRepository;

	public final Logger LOGGER = LogManager.getLogger(IOController.class);

	@PostMapping("")
	public ResponseEntity<Object> createIoDump(@RequestBody IODumpModel ioDumpRequest) {
		try {

			IODumpModel ioDumpModel = ioDumpRepository.save(ioDumpRequest);
			return ResponseHandler.generateResponse("IO Dump Created Successfully", true, HttpStatus.OK, ioDumpModel);

		} catch (Exception e) {
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin" + e.getMessage(),
					false, HttpStatus.OK, null);
		}
	}

	@PostMapping("bulkinsert")
	public ResponseEntity<Object> createIoDumpdatas(@RequestBody List<IODumpModel> ioDumpRequest) {
		try {
			List<IODumpModel> ioDumpdatas = ioDumpRepository.saveAll(ioDumpRequest);
			return ResponseHandler.generateResponse(" Bulk IO Dump Created Successfully", true, HttpStatus.OK,
					ioDumpdatas);

		} catch (Exception e) {
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin" + e.getMessage(),
					false, HttpStatus.OK, null);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<Object> findIoDumpdata(@PathVariable Long id) {
		try {
			return ioDumpRepository.findById(id).map(ioDumpData -> ResponseHandler
					.generateResponse("IO Dump data Found", true, HttpStatus.OK, ioDumpData)).orElseGet(() -> {
						LOGGER.error("Exceptions happen!: " + id + " IO ID Doesn't exist");
						return ResponseHandler.generateResponse(id + "IO ID Doesn't exist", false, HttpStatus.OK, null);
					});

		} catch (Exception e) {
			LOGGER.error("Exceptions happen!:IO Dump ID " + id + " Doesn't exist DB Error: " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@GetMapping("iodumpinfo")
	public ResponseEntity<Object> findAllIoDatas(Pageable pageable) {
		try {
			Page<IODumpModel> ioDumpDatas = ioDumpRepository.findAll(pageable);
			return ResponseHandler.generateResponse("List of IO Dump datas ", true, HttpStatus.OK, ioDumpDatas);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get all IO Dump datas: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	@GetMapping("")
	public ResponseEntity<Object> findAllCCDatas(@RequestParam(required = false) String searchKeyword,
			@PageableDefault(size = 10, page = 0, sort = "id", direction = Direction.DESC) Pageable pageable) {
		try {
			Page<IODumpModel> ioDumpDatas = ioDumpRepository.findAll(searchKeyword, pageable);

			return ResponseHandler.generateResponse("List of IO Dump Data", true, HttpStatus.OK, ioDumpDatas);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get all IO Dump Data: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	@PutMapping("/{id}")
	public ResponseEntity<Object> updateIOData(@PathVariable(value = "id") Long id,
			@Valid @RequestBody IODumpModel updateIOdata) {
		try {
			return ioDumpRepository.findById(id).map(io_data -> {
				io_data.setCo_object_name(updateIOdata.getCo_object_name());
				io_data.setCostelement(updateIOdata.getCostelement());
				io_data.setCost_element_descr(updateIOdata.getCost_element_descr());
				io_data.setCost_element_name(updateIOdata.getCost_element_name());
				io_data.setDocument_date(updateIOdata.getDocument_date());
				io_data.setDocument_header_text(updateIOdata.getDocument_header_text());
				io_data.setDocument_number(updateIOdata.getDocument_number());
				io_data.setFiscalyear(updateIOdata.getFiscalyear());
				io_data.setName(updateIOdata.getName());
				io_data.setOffset_account_name(updateIOdata.getOffset_account_name());
				io_data.setOrders(updateIOdata.getOrders());
				io_data.setPeriod(updateIOdata.getPeriod());
				io_data.setPosting_date(updateIOdata.getPosting_date());
				io_data.setPurchase_order_text(updateIOdata.getPurchase_order_text());
				io_data.setPurchasing_document(updateIOdata.getPurchasing_document());
				io_data.setRef_document_number(updateIOdata.getRef_document_number());
				io_data.setReport_currency(updateIOdata.getReport_currency());
				io_data.setTransaction_currency(updateIOdata.getTransaction_currency());
				io_data.setValuein_objectcurrency(updateIOdata.getValuein_objectcurrency());
				io_data.setValuein_reportcurrency(updateIOdata.getValuein_reportcurrency());
				io_data.setValuein_transactioncurrency(updateIOdata.getValuein_transactioncurrency());
				io_data.setValuetype(updateIOdata.getValuetype());
				ioDumpRepository.save(io_data);
				return ResponseHandler.generateResponse("IO Dump Updated Successfully", true, HttpStatus.OK, io_data);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: IO_Id  Doesn't exist");
				return ResponseHandler.generateResponse("IO_Id  Doesn't exist", false, HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while Updating IO ID data: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	@DeleteMapping("get/{id}")
	public ResponseEntity<Object> deleteIOData(@PathVariable(value = "id") Long id) {
		try {
			return ioDumpRepository.findById(id).map(customerdata -> {

				ioDumpRepository.deleteById(id);
				return ResponseHandler.generateResponse("IO Dump Deleted Successfully", true, HttpStatus.OK, null);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: IO dump " + id + " Doesn't exist");
				return ResponseHandler.generateResponse("IO " + id + " Doesn't exist", false, HttpStatus.OK, null);
			});
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while remove project: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	@GetMapping("/download")
	public ResponseEntity<Resource> getFile() {

		String filename = "iodumpdata.csv";
		InputStreamResource file = new InputStreamResource(load());
		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
				.contentType(MediaType.parseMediaType("application/vnd.ms-word")).body(file);
	}

	public ByteArrayInputStream load() {
		List<IODumpModel> iodumpdatas = ioDumpRepository.findAllByOrderById();
		return CustomerMasterToCSV(iodumpdatas);
	}

	public ByteArrayInputStream CustomerMasterToCSV(List<IODumpModel> iodumpdatas) {

		final CSVFormat format = CSVFormat.DEFAULT.withQuoteMode(QuoteMode.MINIMAL);
		try (ByteArrayOutputStream out = new ByteArrayOutputStream();
				CSVPrinter csvPrinter = new CSVPrinter(new PrintWriter(out), format);) {

			List<Object> headers = new ArrayList<>();
			headers = Arrays.asList("fiscalYear", "period", "costElement", "costElementName", "glGrouping",
					"valuein_objectcurrency", "orders", "costcenter", "team", "coObjectName", "offsetAccntName",
					"purchasingDocument", "costElemntDescr", "postingDate", "refDocumntNo", "reportCurrency",
					"purchaseOrderText", "documentDate", "documentNumber", "transactionCurrency", "objectCurrency",
					"name", "valuein_reportcurrency", "valuein_transactioncurrency", "documentHeaderTxt", "valueType");

			csvPrinter.printRecord(headers);
			for (IODumpModel iodumpdata : iodumpdatas) {
				List<Object> values = new ArrayList<>();
				values = Arrays.asList(iodumpdata.getFiscalyear(), iodumpdata.getPeriod(), iodumpdata.getCostelement(),
						iodumpdata.getCost_element_name(), iodumpdata.getGl_grouping(),
						iodumpdata.getValuein_objectcurrency(), iodumpdata.getOrders(), iodumpdata.getCost_center(),
						iodumpdata.getTeam(), iodumpdata.getCo_object_name(), iodumpdata.getOffset_account_name(),
						iodumpdata.getPurchasing_document(), iodumpdata.getCost_element_descr(),
						iodumpdata.getPosting_date(), iodumpdata.getRef_document_number(),
						iodumpdata.getReport_currency(), iodumpdata.getPurchase_order_text(),
						iodumpdata.getDocument_date(), iodumpdata.getDocument_number(),
						iodumpdata.getTransaction_currency(), iodumpdata.getObject_currency(), iodumpdata.getName(),
						iodumpdata.getValuein_reportcurrency(), iodumpdata.getValuein_transactioncurrency(),
						iodumpdata.getDocument_header_text(), iodumpdata.getValuetype());
				csvPrinter.printRecord(values);
			}

			csvPrinter.flush();
			return new ByteArrayInputStream(out.toByteArray());
		}

		catch (IOException e) {
			LOGGER.error("failed to download the csv file  ");
			return null;
		}
	}

	@PostMapping(value = "/uploadnewiodump", consumes = { "multipart/form-data" })
	public ResponseEntity<Object> uploadnewIOdump(@RequestParam("file") MultipartFile file) {
		try {
			List<IODumpModel> iodumpdata = null;
			List<String> tableData = List.of("fiscalYear", "period", "costElement", "costElementName", "glGrouping",
					"valuein_objectcurrency", "orders", "costcenter", "team", "coObjectName", "offsetAccntName",
					"purchasingDocument", "costElemntDescr", "postingDate", "refDocumntNo", "reportCurrency",
					"purchaseOrderText", "documentDate", "documentNumber", "transactionCurrency", "objectCurrency",
					"name", "valuein_reportcurrency", "valuein_transactioncurrency", "documentHeaderTxt", "valueType");
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
						List<IODumpModel> iodumpinfo = ioDumpRepository.findAll();
						if (!iodumpinfo.isEmpty()) {
							ioDumpRepository.deleteAll();
						}
						List<IODumpModel> iodumpmodels = saveCsvRecords(csvRecords);

						iodumpdata = ioDumpRepository.saveAll(iodumpmodels);
						LOGGER.error("IOdump file Uploaded Scuccessfully :  ");
						return ResponseHandler.generateResponse("IOdump file Uploaded Scuccessfully :  ", true,
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
					HttpStatus.OK, null);
		}
	}

	private List<IODumpModel> saveCsvRecords(List<CSVRecord> csvRecords) {

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		List<IODumpModel> iodumpdata = new ArrayList<>();
		for (CSVRecord csvRecord : csvRecords) {
			IODumpModel iodump = new IODumpModel();
			iodump.setCo_object_name(csvRecord.get("coObjectName"));
			iodump.setCost_element_descr(csvRecord.get("costElemntDescr"));
			iodump.setCost_element_name(csvRecord.get("costElementName"));
			iodump.setDocument_header_text(csvRecord.get("documentHeaderTxt"));
			iodump.setFiscalyear(csvRecord.get("fiscalYear"));
			iodump.setName(csvRecord.get("name"));
			iodump.setObject_currency(csvRecord.get("objectCurrency"));
			iodump.setOffset_account_name(csvRecord.get("offsetAccntName"));
			iodump.setPurchase_order_text(csvRecord.get("purchaseOrderText"));
			iodump.setPurchasing_document(csvRecord.get("purchasingDocument"));
			iodump.setReport_currency(csvRecord.get("reportCurrency"));
			iodump.setTransaction_currency(csvRecord.get("transactionCurrency"));
			iodump.setCostelement(csvRecord.get("costElement"));
			iodump.setDocument_number(csvRecord.get("documentNumber"));
			iodump.setOrders(csvRecord.get("orders"));
			iodump.setRef_document_number(csvRecord.get("refDocumntNo"));
			if (csvRecord.get("valuein_objectcurrency") != null)
				iodump.setValuein_objectcurrency(Double.parseDouble(csvRecord.get("valuein_objectcurrency")));
			if (csvRecord.get("valuein_reportcurrency") != null)
				iodump.setValuein_reportcurrency(Double.parseDouble(csvRecord.get("valuein_reportcurrency")));
			if (csvRecord.get("valuein_transactioncurrency") != null)
				iodump.setValuein_transactioncurrency(Double.parseDouble(csvRecord.get("valuein_transactioncurrency")));
			iodump.setPeriod(csvRecord.get("period"));
			iodump.setValuetype(csvRecord.get("valueType"));
			iodump.setDocument_date(LocalDate.parse(csvRecord.get("documentDate"), formatter));
			iodump.setPosting_date(LocalDate.parse(csvRecord.get("postingDate"), formatter));
			iodump.setGl_grouping(csvRecord.get("glGrouping"));
			iodump.setCost_center(csvRecord.get("costcenter"));
			iodump.setTeam(csvRecord.get("team"));

			iodumpdata.add(iodump);
		}
		return iodumpdata;
	}

	
	@GetMapping("/barchartreport")
	public ResponseEntity<Object> findAllBarchartReport() {
		try {
			
			LocalDate today_date = LocalDate.now();
			String today_year = String.valueOf(today_date.getYear());
			int year = today_date.getYear();
			double total_year_expense = 0 ;
			IOChartResponse ioChartResponse = new IOChartResponse();
			
			//expense monthwise report of current starts here
			List<IOMonthwiseExpense>  ioMonthwiseExpenses = new ArrayList<>();
			List<IODescriptionwiseExpense>  ioDescriptionExpenses = new ArrayList<>();
			
			for(int i=1; i<=12 ;i++) {
				IOMonthwiseExpense ioMonthwiseExpense = new IOMonthwiseExpense();
				double expense_acutal_IODump = ioDumpRepository.findObjCurrentMonthExpense(year, i);
				
			String month =	new DateFormatSymbols().getMonths()[i-1];
			String threeletter_month =	month.substring(0, 3);
				ioMonthwiseExpense.setMonth(threeletter_month);
				ioMonthwiseExpense.setMonthwise_expense(expense_acutal_IODump);
				ioMonthwiseExpenses.add(ioMonthwiseExpense);
				total_year_expense += expense_acutal_IODump;
			}
			ioChartResponse.setYear(today_year);
			ioChartResponse.setIoMonthwiseExpenses(ioMonthwiseExpenses);
			//expense monthwise report of current ends here
			List<String> ioDescriptionwiseExpenses = ioDumpRepository.findByDescriptionAndExpense();
			
			if(!ioDescriptionwiseExpenses.isEmpty() && ioDescriptionwiseExpenses != null) {
				for(String ioDescriptionwiseExpense:ioDescriptionwiseExpenses) {
					String [] ar =ioDescriptionwiseExpense.split(",");
					IODescriptionwiseExpense ioDescriptionwiseExpensedata = new IODescriptionwiseExpense();
					
						ioDescriptionwiseExpensedata.setDescription(ar[0]);
						ioDescriptionwiseExpensedata.setMonthwise_expense(Double.parseDouble(ar[1]));
						ioDescriptionExpenses.add(ioDescriptionwiseExpensedata);
				}
			}
			ioChartResponse.setYear(today_year);
			ioChartResponse.setIoMonthwiseExpenses(ioMonthwiseExpenses);
			ioChartResponse.setTotal_expense(total_year_expense);
			ioChartResponse.setIoDescriptionwiseExpenses(ioDescriptionExpenses);
			return ResponseHandler.generateResponse("List of IO Dump data ", true, HttpStatus.OK, ioChartResponse);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get all io barchart report data: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}
}

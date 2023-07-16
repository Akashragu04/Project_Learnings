package com.intelizign.dmgcc.controllers.othermaster;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
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

import com.intelizign.dmgcc.models.othermaster.CustomerMasterModel;
import com.intelizign.dmgcc.repositories.othermaster.CustomerMasterRepository;
import com.intelizign.dmgcc.response.CustomerMasterResponse;
import com.intelizign.dmgcc.response.ResponseHandler;

@RestController
@RequestMapping("/customer")
public class CustomerMasterController {
	@Autowired
	CustomerMasterRepository customerRepository;

	public final Logger LOGGER = LogManager.getLogger(CustomerMasterController.class);

	@PostMapping("/create")

	public ResponseEntity<Object> createcostcenter(@RequestBody CustomerMasterModel customerRequest) {
		try {

			CustomerMasterModel customermaster = customerRepository.save(customerRequest);
			return ResponseHandler.generateResponse("Customer Master Created Successfully", true, HttpStatus.OK,
					customermaster);

		} catch (Exception e) {
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin" + e.getMessage(),
					false, HttpStatus.OK, null);
		}
	}

	@PostMapping("/bulkinsert")
	public ResponseEntity<Object> createcostcenters(@RequestBody List<CustomerMasterModel> customerRequests) {
		try {

			List<CustomerMasterModel> customermasterdata = new ArrayList<>();
			for (CustomerMasterModel customerMaster : customerRequests) {

				customerRepository.save(customerMaster);
			}
			return ResponseHandler.generateResponse("Customer Master Created Successfully", true, HttpStatus.OK,
					customermasterdata);

		} catch (Exception e) {
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin" + e.getMessage(),
					false, HttpStatus.OK, null);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<Object> findcustomerdata(@PathVariable Long id) {
		try {
			return customerRepository.findById(id).map(requestData -> {
				return ResponseHandler.generateResponse("Customer data Found", true, HttpStatus.OK, requestData);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: " + " Customer ID  " + id + "   Doesn't exist");
				return ResponseHandler.generateResponse(" Customer ID  " + id + "   Doesn't exist", false,
						HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Exceptions happen!:Customer ID " + id + " Doesn't exist DB Error: " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@PutMapping("/update/{id}")
	public ResponseEntity<Object> updateCustomerData(@PathVariable(value = "id") Long id,
			@Valid @RequestBody CustomerMasterModel updateCustomerdata) {
		try {
			return customerRepository.findById(id).map(customer_data -> {
				customer_data.setActive(updateCustomerdata.isActive());
				customer_data.setAddress(updateCustomerdata.getAddress());
				customer_data.setCode(updateCustomerdata.getCode());
				customer_data.setCountry(updateCustomerdata.getCountry());
				customer_data.setCurrency(updateCustomerdata.getCurrency());
				customer_data.setCustomerid(updateCustomerdata.getCustomerid());
				customer_data.setCustomername(updateCustomerdata.getCustomername());
				customer_data.setFax(updateCustomerdata.getFax());
				customer_data.setGenesiscode(updateCustomerdata.getGenesiscode());
				customer_data.setGstin(updateCustomerdata.getGstin());
				customer_data.setShortname(updateCustomerdata.getShortname());
				customer_data.setState(updateCustomerdata.getState());
				customer_data.setTelephone(updateCustomerdata.getTelephone());
				customerRepository.save(customer_data);
				return ResponseHandler.generateResponse("Customer Master Update Successfully", true, HttpStatus.OK,
						customer_data);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Customer Doesn't exist");
				return ResponseHandler.generateResponse("Customer_Id  Doesn't exist", false, HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while Updating Customer ID: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Object> deleteCustomer(@PathVariable(value = "id") Long id) {
		try {
			return customerRepository.findById(id).map(customerdata -> {

				customerRepository.deleteById(id);
				return ResponseHandler.generateResponse("Customer Master Deleted Successfully", true, HttpStatus.OK,
						null);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Customer_Id " + id + " Doesn't exist");
				return ResponseHandler.generateResponse("Customer " + id + " Doesn't exist", false, HttpStatus.OK,
						null);
			});
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while remove project: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	@GetMapping("customerdata")
	public ResponseEntity<Object> findAllCustomerDatas() {
		try {
			List<CustomerMasterModel> customerDatas = customerRepository.findAll();
			return ResponseHandler.generateResponse("List of Customer Data", true, HttpStatus.OK, customerDatas);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get all Customers: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	@GetMapping("")
	public ResponseEntity<Object> findcustomerInfo(@RequestParam(required = false) String searchKeyword,
			@PageableDefault(size = 10, page = 0, sort = "id", direction = Direction.DESC) Pageable pageable) {
		try {
			Page<CustomerMasterModel> customerDatas = customerRepository.findAll(searchKeyword, pageable);

			return ResponseHandler.generateResponse("List of Customer Data", true, HttpStatus.OK, customerDatas);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while getall:" + e.getMessage());
			return ResponseHandler.generateResponse(e.getMessage(), false, HttpStatus.OK, null);
		}

	}

	@GetMapping("/getnames")
	public ResponseEntity<Object> getCustomerMaster() {
		try {
			List<CustomerMasterResponse> customerDatas = customerRepository.getCustomerMaster();
			return ResponseHandler.generateResponse("Customer datas found", true, HttpStatus.OK, customerDatas);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get all Customers: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	// truncate customermaster and create upload data
	@PostMapping(path = "/addnewcustomermaster", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<Object> uploadCustomermasterCsv(@RequestParam("file") MultipartFile file) {

		String csvType = "text/csv";
		List<CustomerMasterModel> customermasterdata;
		List<String> tableData = List.of("CustomerName", "CustomerID", "ShortName", "Address", "Telephone", "Fax",
				"Code", "IsActive", "Country", "Currency", "GenesisCode", "GSTIN", "State");
		List<String> tableHeader = tableData.stream().sorted().toList();

		try {
			String contenttype = file.getContentType();

			BufferedReader fileReader = new BufferedReader(
					new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8));
			CSVParser csvParser = new CSVParser(fileReader,
					CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());
			List<CSVRecord> csvRecords = csvParser.getRecords();

			if (csvRecords.size() > 0) {
				if (contenttype != null && contenttype.equals(csvType)) {
					List<String> sortedHeader = csvRecords.get(0).getParser().getHeaderNames().stream().sorted()
							.toList();

					if (tableHeader.equals(sortedHeader)) {

						customerRepository.deleteAll();
						customermasterdata = saveCustomer(csvRecords);

					}

					else {
						LOGGER.error("Column Names Are Not Equal:  ");
						return ResponseHandler.generateResponse("Column Names Are Not Equal:  ", false, HttpStatus.OK,
								null);
					}

				} else {
					LOGGER.error("Uploaded File is Not a Csv File:");
					return ResponseHandler.generateResponse("Uploaded File is Not a Csv File:", false, HttpStatus.OK,
							null);

				}

				LOGGER.error("Customer Master Data inserted from upload file:  ");
				return ResponseHandler.generateResponse("Customer Master Data inserted from upload file:  ", true,
						HttpStatus.OK, customermasterdata);
			}

			else {
				LOGGER.error("File must not be empty:  ");
				return ResponseHandler.generateResponse("File must not be empty:  ", false,
						HttpStatus.OK, null);
			}

		} catch (Exception e) {
			LOGGER.error("Server Error, Please contact G3C Admin:" + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);

		}

	}

	private List<CustomerMasterModel> saveCustomer(List<CSVRecord> csvRecords) {

		List<CustomerMasterModel> customerMaster = new ArrayList<>();
		for (CSVRecord csvRecord : csvRecords) {
			CustomerMasterModel customerdata = new CustomerMasterModel();
			if (csvRecord.get("IsActive") != null) {
				customerdata.setActive("1".equals(csvRecord.get("IsActive").trim()));
			}
			customerdata.setAddress(csvRecord.get("Address"));

			if (csvRecord.get("Code") == null || csvRecord.get("Code").equals("") || csvRecord.get("Code").isBlank()
					|| csvRecord.get("Code").isEmpty()) {
				customerdata.setCode(0);
			} else if (csvRecord.get("Code") != null || !csvRecord.get("Code").equalsIgnoreCase("")) {
				customerdata.setCode(Integer.valueOf(csvRecord.get("Code")));

			}
			customerdata.setCountry(csvRecord.get("Country"));
			customerdata.setCurrency(csvRecord.get("Currency"));
			customerdata.setCustomername(csvRecord.get("CustomerName"));
			customerdata.setCustomerid(csvRecord.get("CustomerID"));
			customerdata.setFax(csvRecord.get("Fax"));

			if (csvRecord.get("GenesisCode") == null || csvRecord.get("GenesisCode").equals("")
					|| csvRecord.get("GenesisCode").isBlank() || csvRecord.get("GenesisCode").isEmpty()) {
				customerdata.setGenesiscode(0);
			} else if ((csvRecord.get("GenesisCode") != null) || !csvRecord.get("GenesisCode").equalsIgnoreCase("")) {
				customerdata.setGenesiscode(Integer.valueOf(csvRecord.get("GenesisCode")));

			}
			customerdata.setGstin(csvRecord.get("GSTIN"));
			customerdata.setShortname(csvRecord.get("ShortName"));
			customerdata.setState(csvRecord.get("State"));
			customerdata.setTelephone(csvRecord.get("Telephone"));
			customerMaster.add(customerdata);
			customerRepository.save(customerdata);

		}
		return customerMaster;
	}

//add additional customermaster
	@PostMapping(path = "/addcustomermaster", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<Object> uploadCostcenterCsvfile(@RequestParam("file") MultipartFile file) {

		String csvType = "text/csv";
		List<CustomerMasterModel> customermasterdata;
		List<String> tableData = List.of("CustomerName", "CustomerID", "ShortName", "Address", "Telephone", "Fax",
				"Code", "IsActive", "Country", "Currency", "GenesisCode", "GSTIN", "State");
		List<String> tableHeader = tableData.stream().sorted().toList();

		try {
			String contenttype = file.getContentType();

			BufferedReader fileReader = new BufferedReader(
					new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8));
			CSVParser csvParser = new CSVParser(fileReader,
					CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());
			List<CSVRecord> csvRecords = csvParser.getRecords();
			if (csvRecords.size() > 0) {
				List<String> sortedHeader = csvRecords.get(0).getParser().getHeaderNames().stream().sorted().toList();

				if (contenttype != null && contenttype.equals(csvType)) {
					if (tableHeader.equals(sortedHeader)) {
						customermasterdata = saveCustomer(csvRecords);
					}

					else {
						LOGGER.error("Column Names Are Not Equal:  ");
						return ResponseHandler.generateResponse("Column Names Are Not Equal:  ", false, HttpStatus.OK,
								null);
					}

				} else {
					LOGGER.error("Uploaded File is Not a Csv File:");
					return ResponseHandler.generateResponse("Uploaded File is Not a Csv File:", false, HttpStatus.OK,
							null);

				}

				LOGGER.error("Customer Master Data inserted from upload file:  ");
				return ResponseHandler.generateResponse("Customer Master Data inserted from upload file:  ", true,
						HttpStatus.OK, customermasterdata);
			} else {
				LOGGER.error("File must not be empty:  ");
				return ResponseHandler.generateResponse("File must not be empty:  ", false,
						HttpStatus.OK, null);
			}

		} catch (Exception e) {
			LOGGER.error("Server Error, Please contact G3C Admin:" + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);

		}
	}

	@GetMapping("/download")
	public ResponseEntity<Resource> getFile() {

		String filename = "customermaster.csv";
		InputStreamResource file = new InputStreamResource(load());
		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
				.contentType(MediaType.parseMediaType("application/vnd.ms-word")).body(file);
	}

	public ByteArrayInputStream load() {
		List<CustomerMasterModel> costcenters = customerRepository.findAllByOrderById();
		ByteArrayInputStream in = null;
		try {
			in = CustomerMasterToCSV(costcenters);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return in;
	}

	public static ByteArrayInputStream CustomerMasterToCSV(List<CustomerMasterModel> customermasters) {
		int activevalue;
		final CSVFormat format = CSVFormat.DEFAULT.withQuoteMode(QuoteMode.MINIMAL);
		try (ByteArrayOutputStream out = new ByteArrayOutputStream();

				CSVPrinter csvPrinter = new CSVPrinter(new PrintWriter(out), format);) {

			List<Object> headers = new ArrayList<>();
			headers = Arrays.asList("CustomerName", "CustomerID", "ShortName", "Address", "Telephone", "Fax", "Code",
					"IsActive", "Country", "Currency", "GenesisCode", "GSTIN", "State");

			csvPrinter.printRecord(headers);

			for (CustomerMasterModel customermaster : customermasters) {

				if (Boolean.TRUE.equals(customermaster.isActive())) {
					activevalue = 1;
				} else {
					activevalue = 0;
				}
				List<Object> values = new ArrayList<>();
				values = Arrays.asList(customermaster.getCustomername(), customermaster.getCustomerid(),
						customermaster.getShortname(), customermaster.getAddress(), customermaster.getTelephone(),
						customermaster.getFax(), customermaster.getCode(), activevalue, customermaster.getCountry(),
						customermaster.getCurrency(), customermaster.getGenesiscode(), customermaster.getGstin(),
						customermaster.getState()

				);
				csvPrinter.printRecord(values);
			}

			csvPrinter.flush();
			return new ByteArrayInputStream(out.toByteArray());
		}

		catch (IOException e) {
			return null;
		}
	}

}
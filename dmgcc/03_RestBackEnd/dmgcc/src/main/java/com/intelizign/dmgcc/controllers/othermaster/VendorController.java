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

import com.intelizign.dmgcc.models.othermaster.VendorModel;
import com.intelizign.dmgcc.repositories.othermaster.VendorRepository;
import com.intelizign.dmgcc.response.ResponseHandler;

@RestController
@RequestMapping("/vendor")
public class VendorController {

	@Autowired
	private VendorRepository vendorRepository;

	public final Logger logger = LogManager.getLogger(VendorController.class);

	@PostMapping("bulkinsert")
	public ResponseEntity<Object> createvendors(@RequestBody List<VendorModel> vendorModels) {
		try {
			List<VendorModel> vendordata = new ArrayList<>();
			for (VendorModel vendorModel : vendorModels) {
				vendorRepository.save(vendorModel);
				vendordata.add(vendorModel);
			}

			return ResponseHandler.generateResponse("Vendors Created Successfully", true, HttpStatus.OK, vendordata);

		} catch (Exception e) {
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin" + e.getMessage(),
					false, HttpStatus.OK, null);
		}
	}

	@PostMapping("")
	public ResponseEntity<Object> createvendor(@RequestBody VendorModel vendorModel) {
		try {
			VendorModel vendordata = vendorRepository.save(vendorModel);

			return ResponseHandler.generateResponse("Vendors Created Successfully", true, HttpStatus.OK, vendordata);

		} catch (Exception e) {
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin" + e.getMessage(),
					false, HttpStatus.OK, null);
		}
	}

	@PutMapping("update/{id}")
	public ResponseEntity<Object> updateVendor(@RequestBody VendorModel vendorModel, @PathVariable Long id) {
		try {
			return vendorRepository.findById(id).map(vendordata -> {
				vendordata.setCode(vendorModel.getCode());
				vendordata.setName(vendorModel.getName());
				vendordata.setVendorid(vendorModel.getVendorid());
				VendorModel vendormodel = vendorRepository.save(vendordata);

				return ResponseHandler.generateResponse("Vendor Updated Successfully", true, HttpStatus.OK,
						vendormodel);
			}).orElseGet(() -> {
				logger.error("Exceptions happen!: Invalid Vendor ID");
				return ResponseHandler.generateResponse(" Exceptions happen!: Invalid Vendor ID", false, HttpStatus.OK,
						null);
			});
		} catch (Exception e) {
			logger.error("Internal Server Error:" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@DeleteMapping("delete/{id}")
	public ResponseEntity<Object> deleteVendorData(@PathVariable(value = "id") Long id) {
		try {
			return vendorRepository.findById(id).map(vendordata -> {

				vendorRepository.deleteById(id);
				return ResponseHandler.generateResponse("Vendor Deleted Successfully", true, HttpStatus.OK, null);
			}).orElseGet(() -> {
				logger.error("Exceptions happen!: Vendor " + id + " Doesn't exist");
				return ResponseHandler.generateResponse("Vendor ID" + id + "  Doesn't exist", false, HttpStatus.OK,
						null);
			});
		} catch (Exception e) {
			logger.error("Internal Server Error while remove vendor: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	@GetMapping("/{id}")
	public ResponseEntity<Object> findVendordata(@PathVariable Long id) {
		try {
			return vendorRepository.findById(id).map(VendorData -> ResponseHandler
					.generateResponse("Vendor Information", true, HttpStatus.OK, VendorData)).orElseGet(() -> {
						logger.error("Exceptions happen!: " + id + " Vendor ID Doesn't exist");
						return ResponseHandler.generateResponse("Vendor ID  " + id + " Doesn't exist", false,
								HttpStatus.OK, null);
					});

		} catch (Exception e) {
			logger.error("Exceptions happen!:Vendor ID " + id + " Doesn't exist DB Error: " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@GetMapping("/vendorlist")
	public ResponseEntity<Object> findVendorDatas() {
		try {
			List<VendorModel> vendorDatas = vendorRepository.findAll();
			return ResponseHandler.generateResponse("List of Vendor Data ", true, HttpStatus.OK, vendorDatas);
		} catch (Exception e) {
			logger.error("Internal Server Error while get all Vendor datas: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	@GetMapping("")
	public ResponseEntity<Object> findAllVendorDatas(@RequestParam String searchKeyword,
			@PageableDefault(size = 10, page = 0, sort = "id", direction = Direction.DESC) Pageable pageable) {
		try {
			Page<VendorModel> vendorDatas = vendorRepository.findAll(searchKeyword, pageable);
			return ResponseHandler.generateResponse("List of Vendor Data", true, HttpStatus.OK, vendorDatas);
		} catch (Exception e) {
			logger.error("Error while Fetching Records in Vendor Data" + e.getMessage());
			return ResponseHandler.generateResponse(e.getMessage(), false, HttpStatus.OK, null);
		}

	}

	@GetMapping("/download")
	public ResponseEntity<Resource> getFile() {

		String filename = "vendors.csv";
		InputStreamResource file = new InputStreamResource(load());
		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
				.contentType(MediaType.parseMediaType("application/vnd.ms-word")).body(file);
	}

	public ByteArrayInputStream load() {
		List<VendorModel> vendorDatas = vendorRepository.findAllByOrderById();
		return CustomerMasterToCSV(vendorDatas);
	}

	public ByteArrayInputStream CustomerMasterToCSV(List<VendorModel> vendorDatas) {

		final CSVFormat format = CSVFormat.DEFAULT.withQuoteMode(QuoteMode.MINIMAL);
		try (ByteArrayOutputStream out = new ByteArrayOutputStream();

				CSVPrinter csvPrinter = new CSVPrinter(new PrintWriter(out), format);) {

			List<Object> headers = new ArrayList<>();
			headers = Arrays.asList("VendorId", "Code", "Name");

			csvPrinter.printRecord(headers);
			for (VendorModel vendordata : vendorDatas) {
				List<Object> values = new ArrayList<>();
				values = Arrays.asList(vendordata.getVendorid(), vendordata.getCode(), vendordata.getName());
				csvPrinter.printRecord(values);
			}

			csvPrinter.flush();
			return new ByteArrayInputStream(out.toByteArray());
		}

		catch (IOException e) {
			logger.error("Failed to download csv file");
			return null;
		}
	}

	// truncate vendor and create upload data
	@PostMapping(path = "/addnewvendor", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<Object> uploadnewVendorCsv(@RequestParam("file") MultipartFile file) {

		List<VendorModel> saved_data = new ArrayList<>();
		String csvType = "text/csv";

		List<String> tableData = List.of("VendorId", "Code", "Name");
		List<String> tableHeader = tableData.stream().sorted().toList();

		try {

			BufferedReader fileReader = new BufferedReader(
					new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8));
			CSVParser csvParser = new CSVParser(fileReader,
					CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());
			List<CSVRecord> csvRecords = csvParser.getRecords();
			if (csvRecords.size() > 0) {
				List<String> sortedHeader = csvRecords.get(0).getParser().getHeaderNames().stream().sorted().toList();
				if (file.getContentType().equals(csvType)) {
					if (tableHeader.equals(sortedHeader)) {

						vendorRepository.deleteAll();

						for (CSVRecord csvRecord : csvRecords) {

							VendorModel vendormodel = new VendorModel();
							vendormodel.setCode(csvRecord.get("Code"));
							vendormodel.setName(csvRecord.get("Name"));
							vendormodel.setVendorid(csvRecord.get("VendorId"));
							vendorRepository.save(vendormodel);
							saved_data.add(vendormodel);

						}

						logger.error("Vendor Data inserted from upload file:  ");
						return ResponseHandler.generateResponse("Vendor Data inserted from upload file:  ", true,
								HttpStatus.OK, saved_data);
					}
					logger.error("Column names are not equal:");
					return ResponseHandler.generateResponse("Column names are not equal:", false, HttpStatus.OK, null);

				}
				logger.error("Could not upload Csv File");
				return ResponseHandler.generateResponse("Could not upload Csv File", false, HttpStatus.OK, null);
			} else {
				logger.error("File must not be empty:  ");
				return ResponseHandler.generateResponse("File must not be empty:  ", false, HttpStatus.OK, null);
			}
		}

		catch (Exception e) {
			logger.error("Server Error, Please contact G3C Admin:" + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);

		}

	}

	// add additional customermaster
	@PostMapping(path = "/addvendor", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<Object> uploadVendorCsv(@RequestParam("file") MultipartFile file) {

		String csvType = "text/csv";

		List<String> tableData = List.of("VendorId", "Code", "Name");
		List<String> tableHeader = tableData.stream().sorted().toList();
		List<VendorModel> saved_data = new ArrayList<>();

		try {

			BufferedReader fileReader = new BufferedReader(
					new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8));
			CSVParser csvParser = new CSVParser(fileReader,
					CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());
			List<CSVRecord> csvRecords = csvParser.getRecords();
			if (csvRecords.size() > 0) {
				List<String> sortedHeader = csvRecords.get(0).getParser().getHeaderNames().stream().sorted().toList();
				if (file.getContentType().equals(csvType)) {
					if (tableHeader.equals(sortedHeader)) {

						for (CSVRecord csvRecord : csvRecords) {
							VendorModel vendormodel = new VendorModel();
							vendormodel.setCode(csvRecord.get("Code"));
							vendormodel.setName(csvRecord.get("Name"));
							vendormodel.setVendorid(csvRecord.get("VendorId"));
							vendorRepository.save(vendormodel);
							saved_data.add(vendormodel);

						}

						logger.error("Vendor Data inserted from upload file:  ");
						return ResponseHandler.generateResponse("Vendor Data inserted from upload file:  ", true,
								HttpStatus.OK, saved_data);
					}
					logger.error("Column names are not equal:");
					return ResponseHandler.generateResponse("Column names are not equal:", false, HttpStatus.OK, null);

				}
				logger.error("Could not upload Csv File");
				return ResponseHandler.generateResponse("Could not upload Csv File", false, HttpStatus.OK, null);
			} else {
				logger.error("File must not be empty:  ");
				return ResponseHandler.generateResponse("File must not be empty:  ", false, HttpStatus.OK, null);
			}
		}

		catch (Exception e) {
			logger.error("Server Error, Please contact G3C Admin:" + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);

		}

	}

}

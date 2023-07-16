package com.intelizign.dmgcc.controllers.othermaster;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
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
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.intelizign.dmgcc.models.othermaster.MySccCostcenterModel;
import com.intelizign.dmgcc.repositories.othermaster.MySccCostcenterRepository;
import com.intelizign.dmgcc.response.ResponseHandler;

@RestController
@RequestMapping("/mysccCostcenter")
public class MySccCostcenterController {

	@Autowired
	private MySccCostcenterRepository mySccCostcenterRepository;
	public static final Logger LOGGER = LogManager.getLogger(MySccCostcenterController.class);

	@PostMapping(value = "/uploadnewmysccCostcenter", consumes = { "multipart/form-data" })
	public ResponseEntity<Object> uploadnewmysccCostcenter(@RequestParam("file") MultipartFile file) {
		try {

			List<MySccCostcenterModel> mySccCostcenterList = new ArrayList<>();
			List<String> tableData = List.of("Department", "Code", "IsActive", "Name", "CostPlanningSS", "FullName");
			List<String> sortedTableColumn = tableData.stream().sorted().toList();

			List<String> sortedCSVColumn;
			String contenttype = file.getContentType();

			BufferedReader fileReader = new BufferedReader(
					new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8));
			CSVParser csvParser = new CSVParser(fileReader,
					CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());

			List<CSVRecord> csvRecords = csvParser.getRecords();
			if (csvRecords.size() > 0) {
				sortedCSVColumn = csvRecords.get(0).getParser().getHeaderNames().stream().sorted().toList();

				boolean status = sortedCSVColumn.equals(sortedTableColumn);
				if (contenttype != null && contenttype.equals("text/csv")) {
					if (status) {
						// delete the existing records and save latest excel data
						List<MySccCostcenterModel> mySccCostcenterObjs = mySccCostcenterRepository.findAll();
						if (!mySccCostcenterObjs.isEmpty()) {
							mySccCostcenterRepository.deleteAll();
						}

						for (CSVRecord csvRecord : csvRecords) {
							MySccCostcenterModel mySccCostcenter = new MySccCostcenterModel();
							mySccCostcenter.setCode(csvRecord.get("Code"));
							mySccCostcenter.setCostplanningss(csvRecord.get("CostPlanningSS"));
							mySccCostcenter.setIsactive("1".equals(csvRecord.get("IsActive").trim()));
							mySccCostcenter.setName(csvRecord.get("Name"));
							mySccCostcenter.setFullname(csvRecord.get("FullName"));
							mySccCostcenter.setDepartment(csvRecord.get("Department"));

							mySccCostcenterList.add(mySccCostcenter);
							mySccCostcenterRepository.save(mySccCostcenter);
						}
						LOGGER.error("MySccCostcenter Data inserted from upload file:  " + file.getInputStream());
						return ResponseHandler.generateResponse(
								"MySccCostcenter Data inserted from upload file:  " + file.getInputStream(), true,
								HttpStatus.OK, mySccCostcenterList);
					} else {
						LOGGER.error("Uploaded file is not an .csv file  " + file.getInputStream());
						return ResponseHandler.generateResponse("Uploaded file is not an .csv file", false, HttpStatus.OK,
								null);
					}
				}
				LOGGER.error("Could not upload the csv file  " + file.getInputStream());
				return ResponseHandler.generateResponse("Could not upload the csv file", true, HttpStatus.OK,
						mySccCostcenterList);
			}
			else {
				LOGGER.error("File must not be empty:  ");
				return ResponseHandler.generateResponse("File must not be empty:  ", false,
						HttpStatus.OK, null);
			}

		} catch (Exception e) {
			LOGGER.error("Error while Creating .csv records " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	@GetMapping("/download")
	public ResponseEntity<Resource> getFile() {

		String filename = "mysccCostcenter.csv";
		InputStreamResource file = new InputStreamResource(load());
		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
				.contentType(MediaType.parseMediaType("application/vnd.ms-word")).body(file);
	}

	public ByteArrayInputStream load() {
		List<MySccCostcenterModel> costcenters = mySccCostcenterRepository.findAllByOrderById();
		ByteArrayInputStream in = null;
		try {
			in = MySccCostCenterToCSV(costcenters);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return in;
	}

	public static ByteArrayInputStream MySccCostCenterToCSV(List<MySccCostcenterModel> mySccCostcentersData) {

		final CSVFormat format = CSVFormat.DEFAULT.withQuoteMode(QuoteMode.MINIMAL);
		try (ByteArrayOutputStream out = new ByteArrayOutputStream();

				CSVPrinter csvPrinter = new CSVPrinter(new PrintWriter(out), format);) {

			List<Object> headers = new ArrayList<>();
			headers = Arrays.asList("Department", "Code", "IsActive", "Name", "CostPlanningSS", "FullName");

			csvPrinter.printRecord(headers);
			int activevalue;
			for (MySccCostcenterModel mySccCostcenters : mySccCostcentersData) {
				if (Boolean.TRUE.equals(mySccCostcenters.isIsactive())) {
					activevalue = 1;
				} else {
					activevalue = 0;
				}
				List<Object> values = new ArrayList<>();
				values = Arrays.asList(mySccCostcenters.getDepartment(), mySccCostcenters.getCode(), activevalue,
						mySccCostcenters.getName(), mySccCostcenters.getCostplanningss(),
						mySccCostcenters.getFullname());
				csvPrinter.printRecord(values);
			}

			csvPrinter.flush();
			return new ByteArrayInputStream(out.toByteArray());
		}

		catch (Exception e) {
			LOGGER.error("fail to import data to CSV file: " + e.getMessage());
			return null;
		}
	}

}

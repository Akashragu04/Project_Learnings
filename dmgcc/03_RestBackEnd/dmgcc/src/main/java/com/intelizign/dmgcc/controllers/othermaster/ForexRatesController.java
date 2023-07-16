package com.intelizign.dmgcc.controllers.othermaster;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
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

import com.intelizign.dmgcc.models.othermaster.ForexRatesModel;
import com.intelizign.dmgcc.repositories.othermaster.ForexRatesRepository;
import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.services.FilesStorageServicePath;
import com.intelizign.dmgcc.services.othermaster.CreateCSVFile;

@RestController
@RequestMapping("/forexRates")
public class ForexRatesController {

	@Autowired
	FilesStorageServicePath storageServicepath;

	@Autowired
	CreateCSVFile csvservice;

	private final ForexRatesRepository forexRatesRepo;

	public final Logger LOGGER = LogManager.getLogger(ForexRatesController.class);

	ForexRatesController(ForexRatesRepository forexRatesRepo) {

		this.forexRatesRepo = forexRatesRepo;
	}

	@GetMapping("/download")
	public ResponseEntity<Resource> getFile() {
		String filename = "forexRates.csv";
		InputStreamResource file = new InputStreamResource(csvservice.loadForexObjs());
		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
				.contentType(MediaType.parseMediaType("application/vnd.ms-word")).body(file);
	}

	@PostMapping(value = "/uploadcsv", consumes = { "multipart/form-data" })
	public ResponseEntity<Object> createForexRatesData(@RequestParam("file") MultipartFile file) {
		try {
			storageServicepath.save(file);
			List<ForexRatesModel> forexRatesMdlObj = new ArrayList<>();
			List<String> tableData = List.of("Currency", "To INR", "Year");
			List<String> sortedTableColumn = tableData.stream().sorted().toList();
			String contenttype = file.getContentType();
			
				BufferedReader fileReader = new BufferedReader(
						new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8));
				CSVParser csvParser = new CSVParser(fileReader,
						CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());
				List<CSVRecord> csvRecords = csvParser.getRecords();

				if (csvRecords.size() > 0) {
					List<String> sortedCSVColumn = csvRecords.get(0).getParser().getHeaderNames().stream().sorted()
							.toList();

					boolean status = sortedCSVColumn.equals(sortedTableColumn);

					if (contenttype != null && contenttype.equals("text/csv")) {
						
					if (status) {

						List<ForexRatesModel> forexObjs = forexRatesRepo.findAll();
						if (!forexObjs.isEmpty()) {
							forexRatesRepo.deleteAll();
						}
						for (CSVRecord csvRecord : csvRecords) {
							ForexRatesModel forexObj = new ForexRatesModel();
							forexObj.setCurrency(csvRecord.get("Currency"));
							forexObj.setTo_inr(csvRecord.get("To INR"));
							forexObj.setYear(csvRecord.get("Year"));
							forexRatesRepo.save(forexObj);
							forexRatesMdlObj.add(forexObj);
						}

					} else {
						LOGGER.error("Column names are not equal:");
						return ResponseHandler.generateResponse("Column names are not equal:", false, HttpStatus.OK, null);
					}
				} else {
					LOGGER.error("Uploaded file is not an .csv file");
					return ResponseHandler.generateResponse("Uploaded file is not an .csv file", false, HttpStatus.OK,
							forexRatesMdlObj);
				}
				storageServicepath.delete(file.getOriginalFilename());
				return ResponseHandler.generateResponse("Forex Rates Data From .csv file has Created successfully", true,
						HttpStatus.OK, forexRatesMdlObj);

				}
				
				else {
					LOGGER.error("File must not be empty:  ");
					return ResponseHandler.generateResponse("File must not be empty:  ", false,
							HttpStatus.OK, null);
				}
			
		} catch (Exception e) {
			storageServicepath.delete(file.getOriginalFilename());
			LOGGER.error("Error while Creating .csv records for Forex rates " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	@PostMapping("bulkinsert")
	public ResponseEntity<Object> createForexRates(@RequestBody List<ForexRatesModel> forexRatesObjs) {
		try {
			List<ForexRatesModel> forexRatesObjsList = new ArrayList<>();
			for (ForexRatesModel forexratemodel : forexRatesObjs) {
				ForexRatesModel forexRatemodel = forexRatesRepo.save(forexratemodel);
				forexRatesObjsList.add(forexRatemodel);
			}

			return ResponseHandler.generateResponse("ForexRate Data  Created successfully", true, HttpStatus.OK,
					forexRatesObjsList);

		}

		catch (Exception e) {
			LOGGER.error("Error while creating Forex Rates Data" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	@PostMapping("")
	public ResponseEntity<Object> createForexRate(@RequestBody ForexRatesModel forexRatesModel) {
		try {

			ForexRatesModel forexratesmodel = forexRatesRepo.save(forexRatesModel);
			return ResponseHandler.generateResponse("ForexRate Created Successfully", true, HttpStatus.OK,
					forexratesmodel);

		} catch (Exception e) {
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin" + e.getMessage(),
					false, HttpStatus.OK, null);
		}
	}

	@GetMapping("")
	public ResponseEntity<Object> findAllForexRateData(@RequestParam(required = false) String searchKeyword,
			@RequestParam(required = false) String filterKeyword,
			@PageableDefault(size = 10, page = 0, sort = "id", direction = Direction.DESC) Pageable pageable) {
		try {
			Page<ForexRatesModel> forexRateedata = null;

			if (!filterKeyword.isBlank() || !filterKeyword.isEmpty() || !filterKeyword.equals("null")
					|| !filterKeyword.equals("")) {

				forexRateedata = forexRatesRepo.findAllByFilter(filterKeyword, pageable);
			}
			if (filterKeyword.isBlank() || filterKeyword.isEmpty() || filterKeyword.equals("null")
					|| filterKeyword.equals("")) {
				forexRateedata = forexRatesRepo.findbySearchandSort(searchKeyword, pageable);
			}

			return ResponseHandler.generateResponse("List of Forex Rate Data", true, HttpStatus.OK, forexRateedata);
		} catch (Exception e) {
			LOGGER.error("Error while Fetching Records in Forex Rates" + e.getMessage());
			return ResponseHandler.generateResponse(e.getMessage(), false, HttpStatus.OK, null);
		}

	}

	@GetMapping("getcurrency")
	public ResponseEntity<Object> findAllForexRate() {
		try {
			List<ForexRatesModel> forexRateedata = forexRatesRepo.findAll();

			return ResponseHandler.generateResponse("List of Forex Rate Data", true, HttpStatus.OK, forexRateedata);
		} catch (Exception e) {
			LOGGER.error("Error while Fetching Records in Forex Rates" + e.getMessage());
			return ResponseHandler.generateResponse(e.getMessage(), false, HttpStatus.OK, null);
		}

	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<Object> getForexRateById(@PathVariable Long id) {
		try {
			return forexRatesRepo.findById(id)
					.map(updatedata -> ResponseHandler.generateResponse(
							"Forex Rates Data based on id Retreived Successfully", true, HttpStatus.OK, updatedata))
					.orElseGet(() -> {
						LOGGER.error("Exceptions happen!: Forex Rate Data with " + id
								+ " Doesn't exist to Fetch the Information");
						return ResponseHandler.generateResponse(
								"Forex Rate Data with code " + id + " Doesn't exist to Fetch the Information", false,
								HttpStatus.OK, null);
					});
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while Fetching Forex Rate Data Information: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<Object> updateForexRateData(@PathVariable Long id,
			@Valid @RequestBody ForexRatesModel forexRateMdlObj) {
		try {
			return forexRatesRepo.findById(id).map(updatedata -> {

				updatedata.setCurrency(forexRateMdlObj.getCurrency());
				updatedata.setTo_inr(forexRateMdlObj.getTo_inr());
				updatedata.setYear(forexRateMdlObj.getYear());
				forexRatesRepo.save(updatedata);

				return ResponseHandler.generateResponse("Forex Rates Data updated Successfully", true, HttpStatus.OK,
						updatedata);
			}).orElseGet(() -> {
				LOGGER.error(
						"Exceptions happen!: Forex Rates Data with " + id + " Doesn't exist to fetch the Information");
				return ResponseHandler.generateResponse(
						"Forex Rates Data " + id + " Doesn't exist to fetch the Information", false, HttpStatus.OK,
						null);
			});
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while Updating Forex Rate Information : " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Object> DeleteForexRateObj(@PathVariable Long id) {
		try {
			return forexRatesRepo.findById(id).map(updatedata -> {
				forexRatesRepo.delete(updatedata);
				return ResponseHandler.generateResponse("Forex Rate Deleted Successfully", true, HttpStatus.OK, null);
			}).orElseGet(() -> {
				LOGGER.error(
						"Exceptions happen!: Forex Rate Data with " + id + " Doesn't exist to Delete the Information");
				return ResponseHandler.generateResponse(
						"Forex Rate Data with " + id + " Doesn't exist to Delete the Information", false, HttpStatus.OK,
						null);
			});

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while Deleting Forex Rate information:" + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

}
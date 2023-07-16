package com.intelizign.dmgcc.controllers;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

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
import org.springframework.data.domain.PageImpl;
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

import com.intelizign.dmgcc.models.CostCenterModel;
import com.intelizign.dmgcc.models.othermaster.RateCardModel;
import com.intelizign.dmgcc.repositories.CostCenterRepository;
import com.intelizign.dmgcc.repositories.RateCardRepository;
import com.intelizign.dmgcc.response.RateCardResponse;
import com.intelizign.dmgcc.response.RateCardResponse.SubRatecard;
import com.intelizign.dmgcc.response.RateCardResponseByCurrency;
import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.services.RateCardService;

@RestController
@RequestMapping("/ratecard")
public class RateCardController {

	@Autowired
	private RateCardRepository rateCardRepository;

	@Autowired
	private CostCenterRepository costcenterRepository;

	@Autowired
	private RateCardService rateCardService;

	public final Logger LOGGER = LogManager.getLogger(RateCardController.class);

	@PostMapping("")
	public ResponseEntity<Object> createRatecard(@RequestBody RateCardResponse RateCardResponse) {
		try {
			Optional<CostCenterModel> costCenterModel = costcenterRepository
					.findByCostcenter(RateCardResponse.getCostcenter());
			if (!costCenterModel.isPresent()) {
				return ResponseHandler.generateResponse("Invalid Cost Center", false, HttpStatus.OK, null);
			}
			List<RateCardResponse> ratecardresponse = rateCardService.saveRateCard(RateCardResponse,
					costCenterModel.get());
			return ResponseHandler.generateResponse("Rate Cards Created Successfully", true, HttpStatus.OK,
					ratecardresponse);
		} catch (Exception e) {
			return ResponseHandler.generateResponse("Could not create Ratecard" + e.getMessage(), false, HttpStatus.OK,
					null);
		}
	}

	@PostMapping("bulkinsert")
	public ResponseEntity<Object> createbulkRatecards(@RequestBody List<RateCardResponse> RateCardResponselist) {
		try {

			List<List<RateCardResponse>> superratecardlist = new ArrayList<>();
			for (RateCardResponse rateCardResponse : RateCardResponselist) {
				Optional<CostCenterModel> costCenterModel = costcenterRepository
						.findByCostcenter(rateCardResponse.getCostcenter());
				if (!costCenterModel.isPresent()) {
					return ResponseHandler.generateResponse("Invalid Cost Center   " + rateCardResponse.getCostcenter(),
							false, HttpStatus.OK, null);
				}
				List<RateCardResponse> ratecardresponse = rateCardService.saveRateCard(rateCardResponse,
						costCenterModel.get());
				superratecardlist.add(ratecardresponse);
			}
			return ResponseHandler.generateResponse("Bulk Rate Cards Created Successfully", true, HttpStatus.OK,
					superratecardlist);
		} catch (Exception e) {
			return ResponseHandler.generateResponse("Could not create Bulk Ratecards" + e.getMessage(), false,
					HttpStatus.OK, null);
		}

	}

	@GetMapping("/{id}")
	public ResponseEntity<Object> findRateCarddata(@PathVariable Long id) {
		try {
			return rateCardRepository.findById(id).map(RateCardData -> ResponseHandler
					.generateResponse("RateCard data Found", true, HttpStatus.OK, RateCardData)).orElseGet(() -> {
						LOGGER.error("Exceptions happen!: " + id + " RateCard ID Doesn't exist");
						return ResponseHandler.generateResponse("RateCard ID  " + id + "  Doesn't exist", false,
								HttpStatus.OK, null);
					});

		} catch (Exception e) {
			LOGGER.error("Exceptions happen!:RateCard ID " + id + " Doesn't exist DB Error: " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@PutMapping("/update/{id}")
	public ResponseEntity<Object> updateRateCardData(@PathVariable(value = "id") Long id,
			@Valid @RequestBody RateCardModel rateCardModel) {
		try {
			return rateCardRepository.findById(id).map(ratecarddata -> {
				ratecarddata.setHourly_description(rateCardModel.getHourly_description());
				ratecarddata.setLevel(rateCardModel.getLevel());
				ratecarddata.setYear(rateCardModel.getYear());
				if (rateCardModel.getHourly_rate_inr() != 0) {
					ratecarddata.setHourly_rate_inr(rateCardModel.getHourly_rate_inr());
				} else {
					ratecarddata.setHourly_rate_inr(0);
				}

				if (rateCardModel.getHourly_rate_usd() != 0) {
					ratecarddata.setHourly_rate_usd(rateCardModel.getHourly_rate_usd());
				} else {
					ratecarddata.setHourly_rate_usd(0);
				}
				if (rateCardModel.getHourly_rate_ero() != 0) {
					ratecarddata.setHourly_rate_ero(rateCardModel.getHourly_rate_ero());
				} else {
					ratecarddata.setHourly_rate_ero(0);
				}
				rateCardRepository.save(ratecarddata);
				return ResponseHandler.generateResponse("RateCard Updated Successfully", true, HttpStatus.OK,
						ratecarddata);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: RateCard ID Doesn't exist");
				return ResponseHandler.generateResponse("RateCardId   " + id + "   Doesn't exist", false, HttpStatus.OK,
						null);
			});

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while Updating CC ID: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteRateCardData(@PathVariable(value = "id") long id) {
		try {
			return rateCardRepository.findById(id).map(ratecarddata -> {

				rateCardRepository.deleteById(id);
				return ResponseHandler.generateResponse("RateCard Deleted Successfully", true, HttpStatus.OK, null);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: RateCard   " + id + "  Doesn't exist");
				return ResponseHandler.generateResponse("RateCard  " + id + " Doesn't exist", false, HttpStatus.OK,
						null);
			});
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while remove RateCard: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	@DeleteMapping("/bulkdelete/{id}")
	public ResponseEntity<Object> deleteRateCards(@PathVariable(value = "id") String costcenter) {
		try {

			Optional<CostCenterModel> costcenterdata = costcenterRepository.findByCostcenter(costcenter);

			if (!costcenterdata.isPresent()) {
				return ResponseHandler.generateResponse("Invalid Cost Center  " + costcenter + "", false, HttpStatus.OK,
						null);
			}

			List<RateCardModel> rateCardModeldata = rateCardRepository.findByCostcenterId(costcenterdata.get().getId());
			rateCardRepository.deleteAll(rateCardModeldata);
			return ResponseHandler.generateResponse("Bulk RateCards Deleted Successfully", true, HttpStatus.OK, null);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while remove RateCard: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	@PutMapping("")
	public ResponseEntity<Object> modifyRateCardData(@Valid @RequestBody RateCardResponse rateCardResponse) {
		try {

			Optional<CostCenterModel> costcenter = costcenterRepository
					.findByCostcenter(rateCardResponse.getCostcenter());

			if (!costcenter.isPresent()) {
				return ResponseHandler.generateResponse("Invalid Cost Center" + rateCardResponse.getCostcenter() + "",
						false, HttpStatus.OK, null);
			}

			List<RateCardModel> ratecarddata = new ArrayList<>();

			List<SubRatecard> subratecards = rateCardResponse.getRatecards();
			for (SubRatecard subRatecard : subratecards) {

				Optional<RateCardModel> rateCardModeldata = rateCardRepository.findById(subRatecard.getId());
				if (!rateCardModeldata.isPresent()) {
					return ResponseHandler.generateResponse("Invalid RateCard ID  " + subRatecard.getId() + "", false,
							HttpStatus.OK, null);
				}
				RateCardModel rateCardModel = rateCardModeldata.get();

				rateCardModel.setCostcenter(costcenter.get());
				rateCardModel.setHourly_description(subRatecard.getHourly_description());
				rateCardModel.setLevel(subRatecard.getLevel());
				rateCardModel.setYear(subRatecard.getYear());

				if (subRatecard.getHourly_rate_usd() != 0) {
					rateCardModel.setHourly_rate_usd(subRatecard.getHourly_rate_usd());
				} else {
					rateCardModel.setHourly_rate_usd(0);
				}
				if (rateCardModel.getHourly_rate_ero() != 0) {
					rateCardModel.setHourly_rate_ero(rateCardModel.getHourly_rate_ero());
				} else {
					rateCardModel.setHourly_rate_ero(0);
				}
				if (subRatecard.getHourly_rate_inr() != 0) {
					rateCardModel.setHourly_rate_inr(subRatecard.getHourly_rate_inr());
				} else {
					rateCardModel.setHourly_rate_inr(0);
				}
				RateCardModel ratecardinfo = rateCardRepository.save(rateCardModel);

				ratecarddata.add(ratecardinfo);
			}
			List<RateCardResponse> ratecardsresponsedata = rateCardService.listOfRateCardResponse(ratecarddata);

			return ResponseHandler.generateResponse("RateCard Updated Successfully", true, HttpStatus.OK,
					ratecardsresponsedata);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while Updating RateCard : " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	@PutMapping("/bulkmodify")
	public ResponseEntity<Object> bulkmodify(@Valid @RequestBody List<RateCardResponse> rateCardResponse) {
		try {
			List<List<RateCardResponse>> superratecardlist = new ArrayList<>();
			for (RateCardResponse rateCardResponsedata : rateCardResponse) {
				Optional<CostCenterModel> costcenter = costcenterRepository
						.findByCostcenter(rateCardResponsedata.getCostcenter());

				if (!costcenter.isPresent()) {
					return ResponseHandler
							.generateResponse(" Cost Center not exist in Database:Kindly enter valid CostCenter  "
									+ rateCardResponsedata.getCostcenter() + "", false, HttpStatus.OK, null);
				}

				List<RateCardModel> ratecarddata = new ArrayList<>();

				List<SubRatecard> subratecards = rateCardResponsedata.getRatecards();
				for (SubRatecard subRatecard : subratecards) {

					Optional<RateCardModel> rateCardModeldata = rateCardRepository.findById(subRatecard.getId());
					if (!rateCardModeldata.isPresent()) {
						return ResponseHandler.generateResponse("Invalid RateCard ID   " + subRatecard.getId() + "",
								false, HttpStatus.OK, null);
					}
					RateCardModel rateCardModel = rateCardModeldata.get();
					rateCardModel.setCostcenter(costcenter.get());
					rateCardModel.setHourly_description(subRatecard.getHourly_description());
					rateCardModel.setLevel(subRatecard.getLevel());
					rateCardModel.setYear(subRatecard.getYear());
					rateCardModel.setHourly_rate_inr(subRatecard.getHourly_rate_inr());

					if (subRatecard.getHourly_rate_usd() != 0) {
						rateCardModel.setHourly_rate_usd(subRatecard.getHourly_rate_usd());
					}

					if (rateCardModel.getHourly_rate_ero() != 0) {
						rateCardModel.setHourly_rate_ero(rateCardModel.getHourly_rate_ero());
					}

					RateCardModel ratecardinfo = rateCardRepository.save(rateCardModel);

					ratecarddata.add(ratecardinfo);
				}
				List<RateCardResponse> ratecardsresponsedata = rateCardService.listOfRateCardResponse(ratecarddata);
				superratecardlist.add(ratecardsresponsedata);
			}

			return ResponseHandler.generateResponse(" Bulk RateCards Updated Successfully", true, HttpStatus.OK,
					superratecardlist);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while Updating RateCard : " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	@GetMapping("")
	public ResponseEntity<Object> getRatecard() {

		try {
			List<RateCardModel> rateCardModels = rateCardRepository.findAll();
			return ResponseHandler.generateResponse("List of Rate Card", true, HttpStatus.OK, rateCardModels);

		} catch (Exception ex) {

			LOGGER.error("Get RateCard : " + ex.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	@GetMapping("/bycurrency")
	public ResponseEntity<Object> getRatecardbyCurrency(@RequestParam(required = false) String currencytype) {

		try {
			List<RateCardResponseByCurrency> rateCardModels = new ArrayList<>();
			switch (currencytype) {
			case "INR": {

				rateCardModels = rateCardRepository.findAllByINR();
				break;
			}

			case "USD": {

				rateCardModels = rateCardRepository.findAllByUSD();
				break;
			}
			case "ERO": {

				rateCardModels = rateCardRepository.findAllByERO();
				break;
			}
			default:
				return ResponseHandler.generateResponse("Rate Card is not available for selected Currency", false,
						HttpStatus.OK, rateCardModels);
			}
			return ResponseHandler.generateResponse("List of Rate Card", true, HttpStatus.OK, rateCardModels);

		} catch (Exception ex) {

			LOGGER.error("Get RateCard : " + ex.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	@GetMapping("/getratecard")
	public ResponseEntity<Object> getRatecardResponse(@RequestParam(required = false) String searchKeyword,
			@RequestParam(required = false) String filterKeyword,

			@PageableDefault(size = 10, page = 0, sort = "id", direction = Direction.DESC) Pageable pageable) {

		try {
			List<RateCardResponse> ratecard = rateCardService.getRatecardResponse(searchKeyword, filterKeyword);
			int start = (int) pageable.getOffset();
			int end = Math.min((start + pageable.getPageSize()), ratecard.size());
			Page<RateCardResponse> rate_card_response = new PageImpl<>(ratecard.subList(start, end), pageable,
					ratecard.size());

			return ResponseHandler.generateResponse("List of Rate Card", true, HttpStatus.OK, rate_card_response);

		} catch (Exception ex) {

			LOGGER.error("Get RateCard : " + ex.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	@PostMapping(value = "/uploadcsvfile", consumes = { "multipart/form-data" })
	public ResponseEntity<Object> uploadCsv(@RequestParam("file") MultipartFile file) {

		String csvType = "text/csv";
		List<String> tableData = List.of("CostCenter", "Team", "Department", "hourly_rate_inr", "hourly_rate_usd",
				"hourly_rate_ero", "hourly_description", "level", "year");
		List<String> tableHeader = tableData.stream().sorted().toList();

		try {
			String contenttype = file.getContentType();
			if (contenttype != null && contenttype.equals(csvType)) {
				BufferedReader fileReader = new BufferedReader(
						new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8));
				CSVParser csvParser = new CSVParser(fileReader,
						CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());
				List<CSVRecord> csvRecords = csvParser.getRecords();
				List<String> sortedHeader = csvRecords.get(0).getParser().getHeaderNames().stream().sorted().toList();

				if (tableHeader.equals(sortedHeader)) {
					rateCardRepository.deleteAll();

					Comparator<CSVRecord> comparator = new Comparator<CSVRecord>() {
						@Override
						public int compare(CSVRecord o1, CSVRecord o2) {
							String a = o1.get("CostCenter");
							String b = o2.get("CostCenter");
							return a.compareTo(b);

						}
					};
					csvRecords.sort(comparator);
					try {
						return rateCardService.saveCsvRecord(csvRecords);
					} catch (Exception ex) {
						LOGGER.error("Could not Upload Csv File : " + ex.getMessage());
						return ResponseHandler.generateResponse("Could not Upload Csv File : ", false, HttpStatus.OK,
								null);
					}

				} else {
					LOGGER.error("Kindly Enter the Proper Format:");
					return ResponseHandler.generateResponse("Kindly Enter the Proper Format:", false, HttpStatus.OK,
							null);
				}
			} else {
				LOGGER.error("Kindly Upload Csv File only: ");
				return ResponseHandler.generateResponse("Kindly Upload Csv File only: ", false, HttpStatus.OK, null);
			}
		}

		catch (Exception e) {
			LOGGER.error("Server Error, Please contact G3C Admin:" + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);

		}

	}

	@GetMapping("/download")
	public ResponseEntity<Resource> getFile() {

		String filename = "ratecard.csv";
		InputStreamResource file = new InputStreamResource(rateCardService.load());
		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
				.contentType(MediaType.parseMediaType("application/vnd.ms-word")).body(file);
	}

}

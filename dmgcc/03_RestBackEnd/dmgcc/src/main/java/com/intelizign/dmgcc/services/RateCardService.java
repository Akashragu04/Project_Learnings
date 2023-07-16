package com.intelizign.dmgcc.services;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.apache.commons.csv.CSVRecord;
import org.apache.commons.csv.QuoteMode;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.intelizign.dmgcc.models.CostCenterModel;
import com.intelizign.dmgcc.models.othermaster.RateCardModel;
import com.intelizign.dmgcc.repositories.CostCenterRepository;
import com.intelizign.dmgcc.repositories.RateCardRepository;
import com.intelizign.dmgcc.repositories.othermaster.ForexRatesRepository;
import com.intelizign.dmgcc.response.RateCardResponse;
import com.intelizign.dmgcc.response.RateCardResponse.SubRatecard;
import com.intelizign.dmgcc.response.ResponseHandler;

@Service
public class RateCardService {

	@Autowired
	private RateCardRepository rateCardRepository;

	@Autowired
	private CostCenterRepository costCenterRepository;

	@Autowired
	ForexRatesRepository forexRatesRepository;

	private final Logger LOGGER = LogManager.getLogger(RateCardService.class);

	public ByteArrayInputStream load() {
		List<RateCardModel> ratecards = rateCardRepository.findAllByOrderById();
		return RatecardstestToCSV(ratecards);
	}

	public ByteArrayInputStream RatecardstestToCSV(List<RateCardModel> ratecards) {
		final CSVFormat format = CSVFormat.DEFAULT.withQuoteMode(QuoteMode.MINIMAL);
		try (ByteArrayOutputStream out = new ByteArrayOutputStream();

				CSVPrinter csvPrinter = new CSVPrinter(new PrintWriter(out), format);) {

			List<Object> headers = new ArrayList<>();
			headers = Arrays.asList("CostCenter", "Team", "Department", "hourly_rate_inr", "hourly_rate_usd",
					"hourly_rate_ero", "hourly_description", "level", "year");

			csvPrinter.printRecord(headers);
			for (RateCardModel ratecard : ratecards) {

				List<Object> values = new ArrayList<>();
				values = Arrays.asList(ratecard.getCostcenter().getCostcenter(), ratecard.getCostcenter().getTeam(),
						ratecard.getCostcenter().getTeam_group(), ratecard.getHourly_rate_inr(),
						ratecard.getHourly_rate_usd(), ratecard.getHourly_rate_ero(), ratecard.getHourly_description(),
						ratecard.getLevel(), ratecard.getYear()

				);
				csvPrinter.printRecord(values);

			}

			csvPrinter.flush();
			return new ByteArrayInputStream(out.toByteArray());
		} catch (IOException e) {

			LOGGER.error("fail to import data to CSV file: " + e.getMessage());
			return null;
		}
	}

	public ResponseEntity<Object> saveCsvRecord(List<CSVRecord> csvRecords) {
		List<RateCardModel> ratecards = new ArrayList<>();
		for (CSVRecord csvRecord : csvRecords) {
			double usdcurrency;
			double eurocurrency;
			double inrcurrency;
			DecimalFormat df = new DecimalFormat("#.##");
			if (csvRecord.get("hourly_rate_usd") != null && !csvRecord.get("hourly_rate_usd").isBlank()
					&& !csvRecord.get("hourly_rate_usd").isEmpty())
				usdcurrency = Double.valueOf(csvRecord.get("hourly_rate_usd"));
			else
				usdcurrency = 0;
			if (csvRecord.get("hourly_rate_ero") != null && !csvRecord.get("hourly_rate_ero").isBlank()
					&& !csvRecord.get("hourly_rate_ero").isEmpty())
				eurocurrency = Double.valueOf(csvRecord.get("hourly_rate_ero"));
			else
				eurocurrency = 0;

			if (csvRecord.get("hourly_rate_inr") != null && !csvRecord.get("hourly_rate_inr").isBlank()
					&& !csvRecord.get("hourly_rate_inr").isEmpty())
				inrcurrency = Double.valueOf(csvRecord.get("hourly_rate_inr"));
			else
				inrcurrency = 0;
			String usd = df.format(usdcurrency);
			String euro = df.format(eurocurrency);
			String inr = df.format(inrcurrency);
			Optional<CostCenterModel> costCenterModel = costCenterRepository
					.findByCostcenter(csvRecord.get("CostCenter"));
			if (!costCenterModel.isPresent()) {
				return ResponseHandler.generateResponse("Invalid Cost Center   " + csvRecord.get("CostCenter"), false,
						HttpStatus.OK, null);
			}
			RateCardModel rateinfo = ratecardData(csvRecord, costCenterModel.get(), usd, euro, inr);

			ratecards.add(rateinfo);

		}
		rateCardRepository.saveAll(ratecards);

		return ResponseHandler.generateResponse("Uploaded the file successfully:", true, HttpStatus.OK, null);
	}

	public RateCardModel ratecardData(CSVRecord csvRecord, CostCenterModel costCenterModel, String usd, String euro,
			String inr) {

		RateCardModel sameratecard = new RateCardModel();

		sameratecard.setHourly_rate_inr(Double.valueOf(inr));
		sameratecard.setHourly_rate_usd(Double.valueOf(usd));
		sameratecard.setHourly_rate_ero(Double.valueOf(euro));
		sameratecard.setHourly_description(csvRecord.get("hourly_description"));
		sameratecard.setLevel(csvRecord.get("level"));
		sameratecard.setYear(csvRecord.get("year"));
		sameratecard.setCostcenter(costCenterModel);
		return sameratecard;

	}

	public List<RateCardResponse> getRatecardResponse(String searchKeyword, String filterKeyword) {
		List<CostCenterModel> costcenters = rateCardRepository.getcostcenters();

		List<RateCardResponse> ratecards = new ArrayList<>();
		if (!costcenters.isEmpty()) {
			for (CostCenterModel costcenter : costcenters) {

				RateCardResponse ratecarresponse = new RateCardResponse();
				ratecarresponse.setId(costcenter.getId());
				ratecarresponse.setCostcenter(costcenter.getCostcenter());
				ratecarresponse.setDepartment(costcenter.getTeam_group());
				ratecarresponse.setTeam(costcenter.getTeam());
				List<RateCardModel> sudratedata = null;

				if (filterKeyword != null && !filterKeyword.isEmpty() && !filterKeyword.equals("")) {
					sudratedata = rateCardRepository.findByCostcenterIdWithFilter(costcenter.getId(), filterKeyword);

				} else {
					sudratedata = rateCardRepository.findbySearchandSort(costcenter.getId(), searchKeyword);

				}

				if (!sudratedata.isEmpty()) {
					ratecarresponse.setRatecards(getSubRatecard(sudratedata));
					ratecards.add(ratecarresponse);
				}

			}
		}

		return ratecards;
	}

	public List<SubRatecard> getSubRatecard(List<RateCardModel> sudratedata) {
		List<SubRatecard> sub_rate_cards = new ArrayList<>();
		for (RateCardModel subdata : sudratedata) {
			SubRatecard subratecard = new SubRatecard();
			subratecard.setId(subdata.getId());
			subratecard.setHourly_rate_ero(subdata.getHourly_rate_ero());
			subratecard.setHourly_description(subdata.getHourly_description());
			subratecard.setHourly_rate_inr(subdata.getHourly_rate_inr());
			subratecard.setHourly_rate_usd(subdata.getHourly_rate_usd());
			subratecard.setYear(subdata.getYear());
			subratecard.setLevel(subdata.getLevel());
			sub_rate_cards.add(subratecard);
		}
		return sub_rate_cards;
	}

	public List<RateCardResponse> saveRateCard(RateCardResponse rateCardResponse, CostCenterModel costCenterModel) {
		List<RateCardModel> ratecards = new ArrayList<>();
		String usd = null;
		String ero = null;
		String inr = null;
		List<SubRatecard> ratecardlist = rateCardResponse.getRatecards();
		DecimalFormat df = new DecimalFormat("#.##");
		for (SubRatecard subratecard : ratecardlist) {
			if ((subratecard.getHourly_rate_usd()) != 0) {
				usd = df.format(subratecard.getHourly_rate_usd());
			} else {
				usd = "0";
			}
			if (subratecard.getHourly_rate_ero() != 0) {
				ero = df.format(subratecard.getHourly_rate_ero());
			} else {
				ero = "0";
			}
			if (subratecard.getHourly_rate_inr() != 0) {
				inr = df.format(subratecard.getHourly_rate_inr());
			} else {
				inr = "0";
			}
			RateCardModel ratecardmodel = createratecardData(costCenterModel, inr, usd, ero, subratecard);
			ratecards.add(ratecardmodel);

		}
		List<RateCardModel> ratecarddata = rateCardRepository.saveAll(ratecards);
		return listOfRateCardResponse(ratecarddata);

	}

	public List<RateCardResponse> listOfRateCardResponse(List<RateCardModel> ratecarddata) {
		List<RateCardResponse> ratecardsresponsedata = new ArrayList<>();
		RateCardResponse ratecarresponse = new RateCardResponse();
		for (RateCardModel rateCardModel : ratecarddata) {
			ratecarresponse.setId(rateCardModel.getCostcenter().getId());
			ratecarresponse.setCostcenter(rateCardModel.getCostcenter().getCostcenter());
			ratecarresponse.setDepartment(rateCardModel.getCostcenter().getTeam_group());
			ratecarresponse.setTeam(rateCardModel.getCostcenter().getTeam());
			ratecarresponse.setRatecards(getSubRatecard(ratecarddata));
		}
		ratecardsresponsedata.add(ratecarresponse);
		return ratecardsresponsedata;
	}

//	public String inrtoero(double hourly_rate_inr, double hourly_rate_ero) {
//		String inrValueEro = forexRatesRepository.findByCurrency("EUR to INR");
//		if (inrValueEro==null   || inrValueEro.isEmpty() || inrValueEro.equals("") ) {
//			return "ERO value not present in forex database";
//		}
//		double eurocurrency;
//		DecimalFormat df = new DecimalFormat("#.##");
//		if (hourly_rate_ero == 0) {
//			eurocurrency = hourly_rate_inr / (Double.valueOf(inrValueEro));
//		}
//
//		else
//			eurocurrency = hourly_rate_ero;
//	return df.format(eurocurrency);
//	}
//
//	public String inrtousd(double hourly_rate_inr, double hourly_rate_usd) {
//		String inrValueUsd = forexRatesRepository.findByCurrency("USD to INR");
//		if (inrValueUsd==null || inrValueUsd.isEmpty() || inrValueUsd.equals("")) {
//			return "USD value not present in forex database";
//		}
//		double usdcurrency;
//		DecimalFormat df = new DecimalFormat("#.##");
//		if (hourly_rate_usd == 0) {
//			usdcurrency = hourly_rate_inr / (Double.valueOf(inrValueUsd));
//		} else
//			usdcurrency = hourly_rate_usd;
//		return df.format(usdcurrency);
//	}

	public RateCardModel createratecardData(CostCenterModel costCenterModel, String inr, String usd, String euro,
			SubRatecard subRatecard) {

		RateCardModel sameratecard = new RateCardModel();

		sameratecard.setHourly_rate_inr(Double.valueOf(inr));
		sameratecard.setHourly_rate_usd(Double.valueOf(usd));
		sameratecard.setHourly_rate_ero(Double.valueOf(euro));
		sameratecard.setHourly_description(subRatecard.getHourly_description());
		sameratecard.setLevel(subRatecard.getLevel());
		sameratecard.setYear(subRatecard.getYear());
		sameratecard.setCostcenter(costCenterModel);
		return sameratecard;

	}

}

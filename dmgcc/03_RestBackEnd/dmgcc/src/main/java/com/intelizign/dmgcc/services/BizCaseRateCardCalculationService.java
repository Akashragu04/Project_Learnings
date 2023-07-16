package com.intelizign.dmgcc.services;

import java.text.DecimalFormat;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.intelizign.dmgcc.models.businesscasemodels.BizCaseRateCardModel;
import com.intelizign.dmgcc.models.businesscasemodels.BusinessCaseRequest;
import com.intelizign.dmgcc.models.othermaster.ForexRatesModel;
import com.intelizign.dmgcc.pojoclass.BizCaseProfitLossChart;
import com.intelizign.dmgcc.pojoclass.RateCardBusinessDays;
import com.intelizign.dmgcc.pojoclass.bizcase.BizCaseManPowerYearlyInfo;
import com.intelizign.dmgcc.pojoclass.bizcase.BizCaseOtherServiceCalcInfo;
import com.intelizign.dmgcc.pojoclass.bizcase.BizCaseReport;
import com.intelizign.dmgcc.pojoclass.bizcase.BizCaseReport.GraphReport;
import com.intelizign.dmgcc.pojoclass.bizcase.BizCaseReportCostInfo;
import com.intelizign.dmgcc.pojoclass.bizcase.BizCaseReportRevenueInfo;
import com.intelizign.dmgcc.pojoclass.bizcase.BizCaseSLAPayout;
import com.intelizign.dmgcc.pojoclass.bizcase.BizCaseSLAPayout.SLA_Level_Properties;
import com.intelizign.dmgcc.pojoclass.bizcase.BizRateCardYearlyBasedCalculation;
import com.intelizign.dmgcc.pojoclass.bizcase.BizRateCardYearlyBasedCalculation.Level_Properties;
import com.intelizign.dmgcc.pojoclass.bizcase.BizRateCardYearlyBasedCalculation.Level_Properties.Hourly_Rate;
import com.intelizign.dmgcc.repositories.BizCaseRateCardRepository;
import com.intelizign.dmgcc.repositories.BizCaseRequestRepository;
import com.intelizign.dmgcc.repositories.othermaster.ForexRatesRepository;
import com.intelizign.dmgcc.request.bizcase.Manpower_Requirements;
import com.intelizign.dmgcc.request.bizcase.Properties;
import com.intelizign.dmgcc.request.bizcase.Rampups;
import com.intelizign.dmgcc.request.bizcase.SubModel;

@Service
@Transactional
public class BizCaseRateCardCalculationService {

	@Autowired
	BizCaseRequestRepository bizCaseRequestRepository;

	@Autowired
	BizCaseRateCardRepository bizCaseRateCardRepository;

	@Autowired
	ForexRatesRepository forexRatesRepository;

	public final Logger LOGGER = LogManager.getLogger(BizCaseRateCardCalculationService.class);

	Integer total_rampup = 0;
	Integer total_rampdown = 0;
	Integer total_transit_rampup = 0;
	Integer total_transit_rampdown = 0;
	Integer man_power_cost = 0;
	Integer hiring_cost = 0;
	Double ratecard_cost = (double) 0;
	Double man_power_hiring_cost = (double) 0;

	private static final DecimalFormat df = new DecimalFormat("0.00");

	public BizCaseRateCardModel rateCardCalculation(BusinessCaseRequest bizcasedata) {

		Integer requirement_cost = 0;
		Integer third_party_cost = 0;
		Integer third_party_service_cost = 0;
		Integer other_cost = 0;
		Integer manpower_total_cost = 0;
		Integer it_cost = 0;
		Integer travel_cost = 0;
		Integer facility_cost = 0;
		Integer system_access_cost = 0;
		Integer non_manpower_total_cost = 0;

		BizCaseRateCardModel bizCaseRateCardModel = new BizCaseRateCardModel();

		if (bizcasedata.getNewratecard() != null) {
			bizCaseRateCardModel = bizcasedata.getNewratecard();
		} else {

			bizCaseRateCardModel.setBizfacility(bizcasedata.getFacility());
			bizCaseRateCardModel.setBizit_info(bizcasedata.getIt_info());
			bizCaseRateCardModel.setBizother_cost(bizcasedata.getOther_cost());
			bizCaseRateCardModel.setBizsystem_access(bizcasedata.getSystem_access());
			bizCaseRateCardModel.setBizthirdparty_cost(bizcasedata.getThirdparty_cost());
			bizCaseRateCardModel.setBizthirdparty_service(bizcasedata.getThirdparty_service());
			bizCaseRateCardModel.setBiztravel_cost(bizcasedata.getTravel_cost());
			bizCaseRateCardModel.setManpower_inflation(bizcasedata.getManpower_inflation());
			bizCaseRateCardModel.setInflation_value(bizcasedata.getRate_card_inflation());
			if (bizcasedata.getBusiness_availability().equalsIgnoreCase("with_rate"))
				bizCaseRateCardModel.setIs_existing_ratecard(true);
			else
				bizCaseRateCardModel.setIs_existing_ratecard(false);

		}

		// Calculate Total Requirement Cost
		Manpower_Requirements requrimentdata = bizcasedata.getManpower_requirements().stream()
				.filter(bizdata -> "Total Cost".equals(bizdata.getLevel())).findAny().orElse(null);

		if (requrimentdata == null)
			LOGGER.error("Manpower Requirement Data is missing");

		requirement_cost = Integer.parseInt(requrimentdata.getTotal());

		// Calculate Third Party Manpower Cost
		third_party_cost = bizcasedata.getThirdparty_cost().stream().mapToInt(data -> Integer.parseInt(data.getCost()))
				.sum();

		// Calculate Total Man Power Cost
		manpower_total_cost = requirement_cost + third_party_cost;

		// Calculate travel Cost
		travel_cost = bizcasedata.getTravel_cost().stream().mapToInt(data -> Integer.parseInt(data.getCost())).sum();

		// Calculate IT Cost
		it_cost = bizcasedata.getIt_info().stream().mapToInt(data -> Integer.parseInt(data.getCost())).sum();

		// Calculate Facility Cost
		facility_cost = bizcasedata.getFacility().stream().mapToInt(data -> Integer.parseInt(data.getCost())).sum();

		// Calculate System Access Cost
		system_access_cost = bizcasedata.getSystem_access().stream().mapToInt(data -> Integer.parseInt(data.getCost()))
				.sum();

		// Third Party Service Cost
		third_party_service_cost = bizcasedata.getThirdparty_service().stream()
				.mapToInt(data -> Integer.parseInt(data.getCost())).sum();

		// Other Cost
		other_cost = bizcasedata.getOther_cost().stream().mapToInt(data -> Integer.parseInt(data.getCost())).sum();

		// Calculate Total Man Power Cost
		non_manpower_total_cost = it_cost + facility_cost + travel_cost + system_access_cost + third_party_service_cost
				+ other_cost;

		bizCaseRateCardModel.setBusiness_case_start_date(bizcasedata.getBusiness_case_start_date());
		bizCaseRateCardModel.setBusiness_case_end_date(bizcasedata.getBusiness_case_end_date());
		bizCaseRateCardModel.setProject_name(bizcasedata.getProject_name());
		bizCaseRateCardModel.setRequirement_cost(requirement_cost);
		bizCaseRateCardModel.setThirdparty_cost(third_party_cost);
		bizCaseRateCardModel.setManpower_total_cost(manpower_total_cost);
		bizCaseRateCardModel.setIt_cost(it_cost);
		bizCaseRateCardModel.setFacility_cost(facility_cost);
		bizCaseRateCardModel.setTravel_cost(travel_cost);
		bizCaseRateCardModel.setSystem_access_cost(system_access_cost);
		bizCaseRateCardModel.setThirdparty_service_cost(third_party_service_cost);
		bizCaseRateCardModel.setManpower_other_cost(other_cost);
		bizCaseRateCardModel.setNon_manpower_total_cost(non_manpower_total_cost);
		bizCaseRateCardModel.setRate_card_type(bizcasedata.getRatecard_type());
		bizCaseRateCardModel.setBizcase_yearly_information(bizcasedata.getBizcase_yearly_information());
		bizCaseRateCardModel.setBizcase(bizcasedata);

		BizCaseRateCardModel savedBizCaseRateCardModel = bizCaseRateCardRepository.save(bizCaseRateCardModel);

		return savedBizCaseRateCardModel;

	}

	// New Rate Card with Single Level
	public void updateSingleRateCard(BizCaseRateCardModel bizcasedbdata, BizCaseRateCardModel updateddata) {
		Boolean firstyear = true;

		bizcasedbdata.setMan_power_count_yearly(
				calculatTotalYearBasedManpower(bizcasedbdata.getBizcase(), updateddata.getBusiness_days()));

		List<BizRateCardYearlyBasedCalculation> yearlybasedratecard = new ArrayList<>();
		for (RateCardBusinessDays rateCardBusinessDays : updateddata.getBusiness_days()) {
			BizRateCardYearlyBasedCalculation currentBasedCalculation = new BizRateCardYearlyBasedCalculation();
			currentBasedCalculation.setYear(rateCardBusinessDays.getYear());
			List<Level_Properties> level_Properties = new ArrayList<>();

			// Calculate Non ManPower Cost based Yearly

			Integer it_cost = bizcasedbdata.getBizit_info().stream()
					.filter(data -> data.getBusiness_year().equals(rateCardBusinessDays.getYear())
							&& data.getIsratecard().equals(true))
					.mapToInt(data -> Integer.parseInt(data.getCost())).sum();

			Integer facility_cost = bizcasedbdata.getBizfacility().stream()
					.filter(data -> data.getBusiness_year().equals(rateCardBusinessDays.getYear())
							&& data.getIsratecard().equals(true))
					.mapToInt(data -> Integer.parseInt(data.getCost())).sum();

			Integer system_access_cost = bizcasedbdata.getBizsystem_access().stream()
					.filter(data -> data.getBusiness_year().equals(rateCardBusinessDays.getYear())
							&& data.getIsratecard().equals(true))
					.mapToInt(data -> Integer.parseInt(data.getCost())).sum();

			Integer third_party_service_cost = bizcasedbdata.getBizthirdparty_service().stream()
					.filter(data -> data.getBusiness_year().equals(rateCardBusinessDays.getYear())
							&& data.getIsratecard().equals(true))
					.mapToInt(data -> Integer.parseInt(data.getCost())).sum();

			Integer other_cost = bizcasedbdata.getBizother_cost().stream()
					.filter(data -> data.getBusiness_year().equals(rateCardBusinessDays.getYear())
							&& data.getIsratecard().equals(true))
					.mapToInt(data -> Integer.parseInt(data.getCost())).sum();

			// Find the Man Count for current year

			Integer non_manpower_cost = it_cost + facility_cost + system_access_cost + third_party_service_cost
					+ other_cost;

			// Getting Forex Rate

			List<ForexRatesModel> forexdata = forexRatesRepository.findAll();
			Double USD_rate = forexdata.stream()
					.filter(forex -> forex.getCurrency().equals("USD to INR")
							&& forex.getYear().equals(rateCardBusinessDays.getYear()))
					.mapToDouble(forex -> Double.parseDouble(forex.getTo_inr())).sum();

			Double ERO_rate = forexdata.stream()
					.filter(forex -> forex.getCurrency().equals("EUR to INR")
							&& forex.getYear().equals(rateCardBusinessDays.getYear()))
					.mapToDouble(forex -> Double.parseDouble(forex.getTo_inr())).sum();

			// Calculate Hourly Rate

			Double total_manpower_cost = 0d;

			for (Properties currentProperties : bizcasedbdata.getBizcase().getManpower_requirements().get(0)
					.getProperties()) {

				Integer manpower_count = bizcasedbdata.getMan_power_count_yearly().stream()
						.filter(properity -> properity.getLevel().equals(currentProperties.getProperty_name())
								&& properity.getYear().equals(rateCardBusinessDays.getYear()))
						.mapToInt(properity -> properity.getCount()).sum();

				Properties costperlevel = bizcasedbdata.getBizcase().getManpower_requirements().get(1).getProperties()
						.stream()
						.filter(properity -> properity.getProperty_name().equals(currentProperties.getProperty_name()))
						.findAny().orElse(null);
				if (costperlevel == null) {
					LOGGER.error("Cost Per Level is missing");
				}

				// get manpower count based on working hours by particular year

				Double manCostPerYear = getManPowerCostPerYear(Integer.parseInt(costperlevel.getProperty_value()),
						rateCardBusinessDays.getDays(), rateCardBusinessDays.getYear());

				total_manpower_cost += manpower_count * manCostPerYear;

			}

			Double manpower_non_manpower = total_manpower_cost + non_manpower_cost;

			Double markup = bizcasedbdata.getMarkup_value() / 100 * manpower_non_manpower;
			Double fixrate = bizcasedbdata.getFx_risk() / 100 * (markup + manpower_non_manpower);
			Double wht = bizcasedbdata.getWht_value() / 100 * (fixrate + markup + manpower_non_manpower);
			Double total_cost = manpower_non_manpower + fixrate + wht;

			Level_Properties level_Property = new Level_Properties();

			level_Property.setTotal_working_hours(
					rateCardBusinessDays.getDays() * bizcasedbdata.getBizcase().getWorking_hours());
			List<Hourly_Rate> hourly_Rates = new ArrayList<>();
			Hourly_Rate hourly_Rate = new Hourly_Rate();
			hourly_Rate.setRate("INR");
			if (Boolean.TRUE.equals(firstyear))
				hourly_Rate.setPrice(Math.round(total_cost / level_Property.getTotal_working_hours()));
			else {
				hourly_Rate.setPrice(Math.round(((bizcasedbdata.getInflation_value() / 100
						* (total_cost / level_Property.getTotal_working_hours()))
						+ (total_cost / level_Property.getTotal_working_hours()))));
			}
			hourly_Rates.add(hourly_Rate);

			hourly_Rate = new Hourly_Rate();
			hourly_Rate.setRate("USD");
			if (Boolean.TRUE.equals(firstyear))
				hourly_Rate.setPrice(Math.round((total_cost / level_Property.getTotal_working_hours()) / USD_rate));
			else {
				hourly_Rate.setPrice(Math.round((bizcasedbdata.getInflation_value() / 100
						* ((total_cost / level_Property.getTotal_working_hours()) / USD_rate)
						+ ((total_cost / level_Property.getTotal_working_hours()) / USD_rate))));
			}
			hourly_Rates.add(hourly_Rate);

			hourly_Rate = new Hourly_Rate();
			hourly_Rate.setRate("EUR");
			if (Boolean.TRUE.equals(firstyear))
				hourly_Rate.setPrice(Math.round((total_cost / level_Property.getTotal_working_hours()) / ERO_rate));
			else {

				hourly_Rate.setPrice(Math.round((bizcasedbdata.getInflation_value() / 100
						* ((total_cost / level_Property.getTotal_working_hours()) / ERO_rate))
						+ ((total_cost / level_Property.getTotal_working_hours()) / ERO_rate)));
			}

			hourly_Rates.add(hourly_Rate);

			level_Property.setHourly_rate(hourly_Rates);

			level_Properties.add(level_Property);

			currentBasedCalculation.setLevel_properties(level_Properties);
			yearlybasedratecard.add(currentBasedCalculation);
			firstyear = false;

		}
		bizcasedbdata.setYearlybasedcalculations(yearlybasedratecard);

		bizCaseRateCardRepository.save(bizcasedbdata);

		BizCaseReportMultipleCalculation(bizcasedbdata, bizcasedbdata.getBizcase());

	}

	// New Rate Card with Multiple Level
	public void updateMultipleRateCard(BizCaseRateCardModel bizcasedbdata, BizCaseRateCardModel updateddata) {

		Boolean firstyear = true;

		bizcasedbdata.setMan_power_count_yearly(
				calculatTotalYearBasedManpower(bizcasedbdata.getBizcase(), updateddata.getBusiness_days()));

		List<BizRateCardYearlyBasedCalculation> yearlybasedratecard = new ArrayList<>();

		for (RateCardBusinessDays rateCardBusinessDays : updateddata.getBusiness_days()) {
			BizRateCardYearlyBasedCalculation currentBasedCalculation = new BizRateCardYearlyBasedCalculation();
			currentBasedCalculation.setYear(rateCardBusinessDays.getYear());
			List<Level_Properties> level_Properties = new ArrayList<>();

			// Calculate Non ManPower Cost based Yearly

			Integer it_cost = bizcasedbdata.getBizit_info().stream()
					.filter(data -> data.getBusiness_year().equals(rateCardBusinessDays.getYear())
							&& data.getIsratecard().equals(true))
					.mapToInt(data -> Integer.parseInt(data.getCost())).sum();

			Integer facility_cost = bizcasedbdata.getBizfacility().stream()
					.filter(data -> data.getBusiness_year().equals(rateCardBusinessDays.getYear())
							&& data.getIsratecard().equals(true))
					.mapToInt(data -> Integer.parseInt(data.getCost())).sum();

			Integer system_access_cost = bizcasedbdata.getBizsystem_access().stream()
					.filter(data -> data.getBusiness_year().equals(rateCardBusinessDays.getYear())
							&& data.getIsratecard().equals(true))
					.mapToInt(data -> Integer.parseInt(data.getCost())).sum();

			Integer third_party_service_cost = bizcasedbdata.getBizthirdparty_service().stream()
					.filter(data -> data.getBusiness_year().equals(rateCardBusinessDays.getYear())
							&& data.getIsratecard().equals(true))
					.mapToInt(data -> Integer.parseInt(data.getCost())).sum();

			Integer other_cost = bizcasedbdata.getBizother_cost().stream()
					.filter(data -> data.getBusiness_year().equals(rateCardBusinessDays.getYear())
							&& data.getIsratecard().equals(true))
					.mapToInt(data -> Integer.parseInt(data.getCost())).sum();

			// Find the Man Count for current year

			Integer non_manpower_cost = it_cost + facility_cost + system_access_cost + third_party_service_cost
					+ other_cost;

			// Getting Forex Rate

			List<ForexRatesModel> forexdata = forexRatesRepository.findAll();
			Double USD_rate = forexdata.stream()
					.filter(forex -> forex.getCurrency().equals("USD to INR")
							&& forex.getYear().equals(rateCardBusinessDays.getYear()))
					.mapToDouble(forex -> Double.parseDouble(forex.getTo_inr())).sum();

			Double ERO_rate = forexdata.stream()
					.filter(forex -> forex.getCurrency().equals("EUR to INR")
							&& forex.getYear().equals(rateCardBusinessDays.getYear()))
					.mapToDouble(forex -> Double.parseDouble(forex.getTo_inr())).sum();

			// Calculate Hourly Rate

			for (Properties currentProperties : bizcasedbdata.getBizcase().getManpower_requirements().get(0)
					.getProperties()) {

				Level_Properties level_Property = new Level_Properties();
				level_Property.setLevel(currentProperties.getProperty_name());

				level_Property.setTotal_working_hours(
						rateCardBusinessDays.getDays() * bizcasedbdata.getBizcase().getWorking_hours());

				Integer manpower_count = bizcasedbdata.getMan_power_count_yearly().stream()
						.filter(properity -> properity.getLevel().equals(currentProperties.getProperty_name())
								&& properity.getYear().equals(rateCardBusinessDays.getYear()))
						.mapToInt(properity -> properity.getCount()).sum();

				Properties costperlevel = bizcasedbdata.getBizcase().getManpower_requirements().get(1).getProperties()
						.stream()
						.filter(properity -> properity.getProperty_name().equals(currentProperties.getProperty_name()))
						.findAny().orElse(null);
				if (costperlevel == null) {
					LOGGER.error("Cost Per Level is missing");
				}

				// get manpower count based on working hours by particular year

				Double manCostPerYear = getManPowerCostPerYear(Integer.parseInt(costperlevel.getProperty_value()),
						rateCardBusinessDays.getDays(), rateCardBusinessDays.getYear());

				Double manpower_non_manpower = ((manpower_count * manCostPerYear)
						+ (non_manpower_cost * manpower_count));
				Double markup = bizcasedbdata.getMarkup_value() / 100 * manpower_non_manpower;
				Double fixrate = bizcasedbdata.getFx_risk() / 100 * (markup + manpower_non_manpower);
				Double wht = bizcasedbdata.getWht_value() / 100 * (fixrate + markup + manpower_non_manpower);
				Double total_cost = manpower_non_manpower + fixrate + wht;

				List<Hourly_Rate> hourly_Rates = new ArrayList<>();
				Hourly_Rate hourly_Rate = new Hourly_Rate();
				hourly_Rate.setRate("INR");
				if (Boolean.TRUE.equals(firstyear))
					hourly_Rate.setPrice(Math.round(total_cost / level_Property.getTotal_working_hours()));
				else {
					double rate = (bizcasedbdata.getInflation_value() / 100
							* (total_cost / level_Property.getTotal_working_hours()))
							+ (total_cost / level_Property.getTotal_working_hours());
					hourly_Rate.setPrice(Math.round(rate));
				}
				hourly_Rates.add(hourly_Rate);

				hourly_Rate = new Hourly_Rate();
				hourly_Rate.setRate("USD");
				if (Boolean.TRUE.equals(firstyear)) {
					if (USD_rate == 0)
						hourly_Rate.setPrice(0);
					else
						hourly_Rate.setPrice(
								Math.round((total_cost / level_Property.getTotal_working_hours()) / USD_rate));

				} else {
					if (USD_rate == 0)
						hourly_Rate.setPrice(0);
					else
						hourly_Rate.setPrice(Math.round((bizcasedbdata.getInflation_value() / 100
								* ((total_cost / level_Property.getTotal_working_hours()) / USD_rate)
								+ ((total_cost / level_Property.getTotal_working_hours()) / USD_rate))));
				}
				hourly_Rates.add(hourly_Rate);

				hourly_Rate = new Hourly_Rate();
				hourly_Rate.setRate("EUR");
				if (Boolean.TRUE.equals(firstyear))
					if (ERO_rate == 0)
						hourly_Rate.setPrice(0);
					else
						hourly_Rate.setPrice(
								Math.round((total_cost / level_Property.getTotal_working_hours()) / ERO_rate));
				else {
					if (ERO_rate == 0)
						hourly_Rate.setPrice(0);
					else
						hourly_Rate.setPrice(Math.round((bizcasedbdata.getInflation_value() / 100
								* ((total_cost / level_Property.getTotal_working_hours()) / ERO_rate))
								+ ((total_cost / level_Property.getTotal_working_hours()) / ERO_rate)));
				}

				hourly_Rates.add(hourly_Rate);

				level_Property.setHourly_rate(hourly_Rates);

				level_Properties.add(level_Property);
			}

			currentBasedCalculation.setLevel_properties(level_Properties);
			yearlybasedratecard.add(currentBasedCalculation);
			firstyear = false;

		}

		bizcasedbdata.setYearlybasedcalculations(yearlybasedratecard);

		bizCaseRateCardRepository.save(bizcasedbdata);

		BizCaseReportMultipleCalculation(bizcasedbdata, bizcasedbdata.getBizcase());

	}

	private Double getManPowerCostPerYear(int manpower_amount, Integer days, String year) {
		// get working days in a year

		int workingDaysInYear = getWorkingDaysBetweenTwoDates(year);

		// get manpower amount based on particular year
		Double calculated_mp_ammount = (Double.valueOf(manpower_amount) / Double.valueOf(workingDaysInYear)) * days;

		return calculated_mp_ammount;
	}

	public static int getWorkingDaysBetweenTwoDates(String year) {

		// get working days of year

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
		LocalDate startOfYear = LocalDate.parse("01-01-" + year, formatter);
		LocalDate endOfYear = LocalDate.parse("31-12-" + year, formatter);
		long days = ChronoUnit.DAYS.between(startOfYear, endOfYear);
		int workingDays = 0;
		for (int i = 0; i < days; i++) {
			LocalDate date = startOfYear.plusDays(i);
			if (date.getDayOfWeek() != DayOfWeek.SATURDAY && date.getDayOfWeek() != DayOfWeek.SUNDAY) {
				workingDays++;
			}
		}
		return workingDays;
	}

	public void BizCaseReportMultipleCalculation(BizCaseRateCardModel bizcasedbdata,
			BusinessCaseRequest businessCaseRequest) {

		total_rampup = 0;
		total_rampdown = 0;
		total_transit_rampup = 0;
		total_transit_rampdown = 0;
		Boolean Inflation = true;
		Integer FNSOthercost = 0;
		Integer billable_mancount = 0;
		man_power_cost = 0;
		ratecard_cost = (double) 0;
		man_power_hiring_cost = (double) 0;

		BizCaseReport bizCaseReportModel = new BizCaseReport();
		if (bizcasedbdata.getBizcase().getBizcasereport() != null)
			bizCaseReportModel = bizcasedbdata.getBizcase().getBizcasereport();

		bizCaseReportModel.setBusiness_case_start_date(bizcasedbdata.getBusiness_case_start_date());
		bizCaseReportModel.setBusiness_case_end_date(bizcasedbdata.getBusiness_case_end_date());
		bizCaseReportModel.setProject_name(bizcasedbdata.getProject_name());
		bizCaseReportModel.setBizcase_yearly_information(bizcasedbdata.getBizcase().getBizcase_yearly_information());

		List<BizCaseReportCostInfo> bizCaseReportCostInfos = new ArrayList<>();
		List<BizCaseReportRevenueInfo> bizCaseReportRevenueInfos = new ArrayList<>();
		List<BizCaseOtherServiceCalcInfo> ramp_up_manpower_Infos = new ArrayList<>();
		List<BizCaseOtherServiceCalcInfo> copex_non_manpower_Infos = new ArrayList<>();
		List<BizCaseOtherServiceCalcInfo> opex_non_manpower_Infos = new ArrayList<>();
		List<BizCaseOtherServiceCalcInfo> other_cost_Infos = new ArrayList<>();
		List<BizCaseOtherServiceCalcInfo> transition_cost_Infos = new ArrayList<>();
		List<BizCaseSLAPayout> bizCaseSLAPayouts = new ArrayList<>();
		List<BizCaseOtherServiceCalcInfo> copex_sla_non_manpower_costs = new ArrayList<>();
		List<BizCaseOtherServiceCalcInfo> opex_sla_non_manpower_costs = new ArrayList<>();
		List<BizCaseOtherServiceCalcInfo> sla_total_estimations = new ArrayList<>();
		for (RateCardBusinessDays rateCardBusinessDays : bizcasedbdata.getBusiness_days()) {

			// Calculate Cost Structure
			BizCaseReportCostInfo bizCaseReportCostInfo = new BizCaseReportCostInfo();
			Integer it_cost = 0;
			Integer facility_cost = 0;
			Integer system_access_cost = 0;
			Integer third_party_service = 0;
			Integer other_cost = 0;
			Integer non_manpower_total_cost = 0;

			it_cost = bizcasedbdata.getBizit_info().stream()
					.filter(bizdata -> rateCardBusinessDays.getYear().equals(bizdata.getBusiness_year())
							&& Boolean.TRUE.equals(bizdata.getIsratecard()))
					.mapToInt(bizdata -> Integer.parseInt(bizdata.getCost())).sum();

			facility_cost = bizcasedbdata.getBizfacility().stream()
					.filter(bizdata -> rateCardBusinessDays.getYear().equals(bizdata.getBusiness_year())
							&& Boolean.TRUE.equals(bizdata.getIsratecard()))
					.mapToInt(bizdata -> Integer.parseInt(bizdata.getCost())).sum();

			system_access_cost = bizcasedbdata.getBizsystem_access().stream()
					.filter(bizdata -> rateCardBusinessDays.getYear().equals(bizdata.getBusiness_year())
							&& Boolean.TRUE.equals(bizdata.getIsratecard()))
					.mapToInt(bizdata -> Integer.parseInt(bizdata.getCost())).sum();

			third_party_service = bizcasedbdata.getBizthirdparty_service().stream()
					.filter(bizdata -> rateCardBusinessDays.getYear().equals(bizdata.getBusiness_year())
							&& Boolean.TRUE.equals(bizdata.getIsratecard()))
					.mapToInt(bizdata -> Integer.parseInt(bizdata.getCost())).sum();

			other_cost = bizcasedbdata.getBizother_cost().stream()
					.filter(bizdata -> rateCardBusinessDays.getYear().equals(bizdata.getBusiness_year())
							&& Boolean.TRUE.equals(bizdata.getIsratecard()))
					.mapToInt(bizdata -> Integer.parseInt(bizdata.getCost())).sum();

			// Calculation Hiring Cost
			Double hiring_cost = Double.valueOf(calculateHiringCost(bizcasedbdata, rateCardBusinessDays.getYear()));

			// Calculation Non Man Power Cost
			non_manpower_total_cost = it_cost + facility_cost + system_access_cost + third_party_service + other_cost;

			// Calculation Man Power Cost
			Double manpower_cost = Double.valueOf(calculateManpowerCost(bizcasedbdata, rateCardBusinessDays.getYear()));

			// Calculation Transition Cost
			Integer transition_cost = calculateTransitioncost(bizcasedbdata.getBizcase(),
					rateCardBusinessDays.getYear());

			if (Boolean.FALSE.equals(Inflation)) {
				manpower_cost += manpower_cost / 100 * bizcasedbdata.getManpower_inflation();
			}

			// Calculate F&C Other Cost based on year
			FNSOthercost = bizcasedbdata.getOther_costs().stream()
					.filter(othercost -> rateCardBusinessDays.getYear().equals(othercost.getBusiness_year()))
					.mapToInt(othercost -> Integer.parseInt(othercost.getCost())).sum();

			// Setting the value for Cost Structure Info
			bizCaseReportCostInfo.setYear(rateCardBusinessDays.getYear());
			bizCaseReportCostInfo.setOther_cost((double) Math.round(FNSOthercost));
			bizCaseReportCostInfo.setManpower_cost((double) Math.round(manpower_cost));
			bizCaseReportCostInfo.setHiring_cost((double) Math.round(hiring_cost));
			bizCaseReportCostInfo.setNon_manpower_cost(non_manpower_total_cost);
			bizCaseReportCostInfo.setTransition_cost(transition_cost);
			bizCaseReportCostInfo.setTotal_cost(
					FNSOthercost + manpower_cost + transition_cost + non_manpower_total_cost + hiring_cost);
			bizCaseReportCostInfos.add(bizCaseReportCostInfo);

			// Calculate Revenue Structure
			BizCaseReportRevenueInfo BizCaseReportRevenueInfo = new BizCaseReportRevenueInfo();
			BizCaseReportRevenueInfo.setYear(rateCardBusinessDays.getYear());

			Integer manpower_count = bizcasedbdata.getBizcase().getRampups().stream()
					.flatMap(rampup -> rampup.getProperties().stream())
					.filter(properties -> properties.getYear().equals(rateCardBusinessDays.getYear()))
					.mapToInt(properties -> Integer.parseInt(properties.getProperty_value() + 0)).sum() / 10;

			billable_mancount += manpower_count;

			// Calculate Billable Hours
			BizCaseReportRevenueInfo.setBillable_hours(
					billable_mancount * rateCardBusinessDays.getDays() * bizcasedbdata.getBizcase().getWorking_hours());

			// Calculate Rate Card Cost
			Double overallratecardamount = bizcaseCalculateratecardamount(BizCaseReportRevenueInfo,
					bizcasedbdata.getBizcase(), rateCardBusinessDays, bizcasedbdata.getYearlybasedcalculations(),
					bizcasedbdata);

			BizCaseReportRevenueInfo.setRate_card((double) Math.round(overallratecardamount));

			// Calculate Other Cost(uncheck item)
			Integer travelcost = bizcasedbdata.getBizcase().getTravel_cost().stream()
					.filter(data -> data.getBusiness_year().equals(rateCardBusinessDays.getYear()))
					.mapToInt(data -> Integer.parseInt(data.getCost())).sum();

			it_cost = bizcasedbdata.getBizit_info().stream()
					.filter(bizdata -> rateCardBusinessDays.getYear().equals(bizdata.getBusiness_year())
							&& Boolean.FALSE.equals(bizdata.getIsratecard()))
					.mapToInt(bizdata -> Integer.parseInt(bizdata.getCost())).sum();

			facility_cost = bizcasedbdata.getBizfacility().stream()
					.filter(bizdata -> rateCardBusinessDays.getYear().equals(bizdata.getBusiness_year())
							&& Boolean.FALSE.equals(bizdata.getIsratecard()))
					.mapToInt(bizdata -> Integer.parseInt(bizdata.getCost())).sum();

			system_access_cost = bizcasedbdata.getBizsystem_access().stream()
					.filter(bizdata -> rateCardBusinessDays.getYear().equals(bizdata.getBusiness_year())
							&& Boolean.FALSE.equals(bizdata.getIsratecard()))
					.mapToInt(bizdata -> Integer.parseInt(bizdata.getCost())).sum();

			third_party_service = bizcasedbdata.getBizthirdparty_service().stream()
					.filter(bizdata -> rateCardBusinessDays.getYear().equals(bizdata.getBusiness_year())
							&& Boolean.FALSE.equals(bizdata.getIsratecard()))
					.mapToInt(bizdata -> Integer.parseInt(bizdata.getCost())).sum();

			other_cost = bizcasedbdata.getBizother_cost().stream()
					.filter(bizdata -> rateCardBusinessDays.getYear().equals(bizdata.getBusiness_year())
							&& Boolean.FALSE.equals(bizdata.getIsratecard()))
					.mapToInt(bizdata -> Integer.parseInt(bizdata.getCost())).sum();

			Integer SLA_other_cost = travelcost + it_cost + facility_cost + system_access_cost + third_party_service
					+ other_cost;

			BizCaseReportRevenueInfo.setOther_costs(SLA_other_cost);

			// Calculate Markup Value
			Double markupvalue = (double) Math.round(calculateMarkupCost(bizcasedbdata, bizcasedbdata.getBizcase(),
					rateCardBusinessDays.getYear(), ((SLA_other_cost - travelcost) + non_manpower_total_cost)));

			BizCaseReportRevenueInfo.setMarkup(markupvalue);

			// Calculate Inflation value
			if (Boolean.TRUE.equals(Inflation))
				BizCaseReportRevenueInfo.setInflaction(00.0);
			else
				BizCaseReportRevenueInfo.setInflaction(
						(double) Math.round(bizcasedbdata.getInflation_value() / 100 * overallratecardamount));

			// Calculate SLA Payout value
			Double SLA_Payout_Cost = (double) Math.round(overallratecardamount + SLA_other_cost);
			Double SLA_Payout_Cost_with_markup = (double) Math
					.round(SLA_Payout_Cost + bizcasedbdata.getMarkup_value() / 100 * SLA_Payout_Cost);
			BizCaseReportRevenueInfo.setSla_payout_cost(SLA_Payout_Cost_with_markup);

			// Calculate Net Profit value
			BizCaseReportRevenueInfo.setNet_profit_value((double) Math
					.round(BizCaseReportRevenueInfo.getSla_payout_cost() - bizCaseReportCostInfo.getTotal_cost()));

			// Calculate ROS value
			BizCaseReportRevenueInfo.setRos((double) Math.round(
					(BizCaseReportRevenueInfo.getNet_profit_value() / BizCaseReportRevenueInfo.getSla_payout_cost())
							* 100));

			// Calculate DTA Cost
			if (bizcasedbdata.getBizcase().getCustomer_expense_total() != null)
				BizCaseReportRevenueInfo.setCustomer_expense_cost((double) Math
						.round(Double.parseDouble(bizcasedbdata.getBizcase().getCustomer_expense_total())));
			else
				BizCaseReportRevenueInfo.setCustomer_expense_cost(00.0);

			// Calculate DTA Saving
			if (bizcasedbdata.getBizcase().getCustomer_expense_total() != null
					&& BizCaseReportRevenueInfo.getCustomer_expense_cost() != 0)
				BizCaseReportRevenueInfo
						.setCustomer_expense_saving((double) Math.round(BizCaseReportRevenueInfo.getSla_payout_cost()
								- Double.parseDouble(bizcasedbdata.getBizcase().getCustomer_expense_total())));
			else
				BizCaseReportRevenueInfo.setCustomer_expense_saving(00.0);

			// Calculate FX Risk value
			BizCaseReportRevenueInfo.setFx_rist_cost(
					(double) Math.round(bizcasedbdata.getFx_risk() / 100 * SLA_Payout_Cost_with_markup));

			// Calculate WHT value
			BizCaseReportRevenueInfo
					.setWht_cost((double) Math.round(bizcasedbdata.getWht_value() / 100 * SLA_Payout_Cost_with_markup));

			bizCaseReportRevenueInfos.add(BizCaseReportRevenueInfo);

			// Calculate Ramp up & Manpower Cost Section

			BizCaseOtherServiceCalcInfo manpower_cost_info = calculateRampupManpowerInfo(bizcasedbdata,
					rateCardBusinessDays);

			ramp_up_manpower_Infos.add(manpower_cost_info);

			// Calculate Non Manpower Cost for Copex
			BizCaseOtherServiceCalcInfo copex_non_manpower_cost = new BizCaseOtherServiceCalcInfo();
			copex_non_manpower_cost.setYear(rateCardBusinessDays.getYear());

			List<Properties> properties = new ArrayList<>();
			Properties itProperties = calculateNonManpowerInfo(bizcasedbdata, rateCardBusinessDays, "IT", true,
					"capex");
			properties.add(itProperties);
			Properties facilityProperties = calculateNonManpowerInfo(bizcasedbdata, rateCardBusinessDays, "Facilty",
					true, "capex");
			properties.add(facilityProperties);
			Properties softwareProperties = calculateNonManpowerInfo(bizcasedbdata, rateCardBusinessDays, "Software",
					true, "capex");
			properties.add(softwareProperties);
			Properties thridProperties = calculateNonManpowerInfo(bizcasedbdata, rateCardBusinessDays, "Third", true,
					"capex");
			properties.add(thridProperties);
			Properties otherProperties = calculateNonManpowerInfo(bizcasedbdata, rateCardBusinessDays, "Other", true,
					"capex");
			properties.add(otherProperties);
			Properties totalCostProperties = calculateNonManpowerInfo(bizcasedbdata, rateCardBusinessDays, "Total Cost",
					true, "capex");
			properties.add(totalCostProperties);

			copex_non_manpower_cost.setProperties(properties);
			copex_non_manpower_Infos.add(copex_non_manpower_cost);

			// Calculate Non Manpower Cost for Opex
			BizCaseOtherServiceCalcInfo opex_non_manpower_cost = new BizCaseOtherServiceCalcInfo();
			opex_non_manpower_cost.setYear(rateCardBusinessDays.getYear());

			properties = new ArrayList<>();
			itProperties = calculateNonManpowerInfo(bizcasedbdata, rateCardBusinessDays, "IT", true, "opex");
			properties.add(itProperties);
			facilityProperties = calculateNonManpowerInfo(bizcasedbdata, rateCardBusinessDays, "Facilty", true, "opex");
			properties.add(facilityProperties);
			softwareProperties = calculateNonManpowerInfo(bizcasedbdata, rateCardBusinessDays, "Software", true,
					"opex");
			properties.add(softwareProperties);
			thridProperties = calculateNonManpowerInfo(bizcasedbdata, rateCardBusinessDays, "Third", true, "opex");
			properties.add(thridProperties);
			otherProperties = calculateNonManpowerInfo(bizcasedbdata, rateCardBusinessDays, "Other", true, "opex");
			properties.add(otherProperties);
			totalCostProperties = calculateNonManpowerInfo(bizcasedbdata, rateCardBusinessDays, "Total Cost", true,
					"opex");
			properties.add(totalCostProperties);

			opex_non_manpower_cost.setProperties(properties);
			opex_non_manpower_Infos.add(opex_non_manpower_cost);

			// Calculate Other Costs

			BizCaseOtherServiceCalcInfo other_cost_info = new BizCaseOtherServiceCalcInfo();
			other_cost_info.setYear(rateCardBusinessDays.getYear());
			List<Properties> other_Properties = calculateOtherCostInfos(bizcasedbdata, rateCardBusinessDays);
			other_cost_info.setProperties(other_Properties);
			other_cost_Infos.add(other_cost_info);

			// Calculate Transition Costs
			if (Boolean.TRUE.equals(bizcasedbdata.getBizcase().getIs_customer_rampdown())) {
				BizCaseOtherServiceCalcInfo transition_cost_infos = new BizCaseOtherServiceCalcInfo();
				transition_cost_infos.setYear(rateCardBusinessDays.getYear());
				List<Properties> transition_properties = calculationTransitionRampup(rateCardBusinessDays.getYear(),
						bizcasedbdata.getBizcase());

				transition_cost_infos.setProperties(transition_properties);
				transition_cost_Infos.add(transition_cost_infos);
			}

			// Calculate SLA Payout Structure
			BizCaseSLAPayout sla_payout_structure = new BizCaseSLAPayout();
			sla_payout_structure.setYear(rateCardBusinessDays.getYear());
			Integer billable_hours = rateCardBusinessDays.getDays() * bizcasedbdata.getBizcase().getWorking_hours();
			sla_payout_structure.setBillable_hours(billable_hours);

			List<SLA_Level_Properties> sla_properties = new ArrayList<>();
			if (bizcasedbdata.getRate_card_type().equalsIgnoreCase("multiple")) {
				sla_properties = calculateSLAPayout(rateCardBusinessDays.getYear(), bizcasedbdata.getBizcase(),
						bizcasedbdata, billable_hours);
			} else {
				sla_properties = calculateSingleSLAPayout(rateCardBusinessDays.getYear(), bizcasedbdata,
						billable_hours);
			}

			sla_payout_structure.setLevel_properties(sla_properties);
			bizCaseSLAPayouts.add(sla_payout_structure);

			// Calculate SLA Non Manpower Structure for copex
			BizCaseOtherServiceCalcInfo copex_sla_non_manpower_cost = new BizCaseOtherServiceCalcInfo();
			copex_sla_non_manpower_cost.setYear(rateCardBusinessDays.getYear());

			properties = new ArrayList<>();

			Properties slaitProperties = calculateNonManpowerInfo(bizcasedbdata, rateCardBusinessDays, "IT", false,
					"capex");
			properties.add(slaitProperties);

			Properties slafacilityProperties = calculateNonManpowerInfo(bizcasedbdata, rateCardBusinessDays, "Facilty",
					false, "capex");
			properties.add(slafacilityProperties);

			Properties slasoftwareProperties = calculateNonManpowerInfo(bizcasedbdata, rateCardBusinessDays, "Software",
					false, "capex");
			properties.add(slasoftwareProperties);

			Properties slathridProperties = calculateNonManpowerInfo(bizcasedbdata, rateCardBusinessDays, "Third",
					false, "capex");
			properties.add(slathridProperties);

			Properties slaotherProperties = calculateNonManpowerInfo(bizcasedbdata, rateCardBusinessDays, "Other",
					false, "capex");
			properties.add(slaotherProperties);

			Properties slatravelProperties = calculateNonManpowerInfo(bizcasedbdata, rateCardBusinessDays, "Travel",
					false, "capex");
			properties.add(slatravelProperties);

			Properties slatotalCostProperties = new Properties();

			slatotalCostProperties.setProperty_name("Total Cost");
			slatotalCostProperties.setYear(rateCardBusinessDays.getYear());
			Integer total_cost = Integer.parseInt(slaitProperties.getProperty_value())
					+ Integer.parseInt(slafacilityProperties.getProperty_value())
					+ Integer.parseInt(slasoftwareProperties.getProperty_value())
					+ Integer.parseInt(slathridProperties.getProperty_value())
					+ Integer.parseInt(slaotherProperties.getProperty_value())
					+ Integer.parseInt(slatravelProperties.getProperty_value());
			slatotalCostProperties.setProperty_value(String.valueOf(total_cost));

			properties.add(slatotalCostProperties);

			copex_sla_non_manpower_cost.setProperties(properties);
			copex_sla_non_manpower_costs.add(copex_sla_non_manpower_cost);

			// Calculate SLA Non Manpower Structure for opex
			BizCaseOtherServiceCalcInfo opex_sla_non_manpower_cost = new BizCaseOtherServiceCalcInfo();
			opex_sla_non_manpower_cost.setYear(rateCardBusinessDays.getYear());

			properties = new ArrayList<>();

			slaitProperties = calculateNonManpowerInfo(bizcasedbdata, rateCardBusinessDays, "IT", false, "opex");
			properties.add(slaitProperties);

			slafacilityProperties = calculateNonManpowerInfo(bizcasedbdata, rateCardBusinessDays, "Facilty", false,
					"opex");
			properties.add(slafacilityProperties);

			slasoftwareProperties = calculateNonManpowerInfo(bizcasedbdata, rateCardBusinessDays, "Software", false,
					"opex");
			properties.add(slasoftwareProperties);

			slathridProperties = calculateNonManpowerInfo(bizcasedbdata, rateCardBusinessDays, "Third", false, "opex");
			properties.add(slathridProperties);

			slaotherProperties = calculateNonManpowerInfo(bizcasedbdata, rateCardBusinessDays, "Other", false, "opex");
			properties.add(slaotherProperties);

			slatravelProperties = calculateNonManpowerInfo(bizcasedbdata, rateCardBusinessDays, "Travel", false,
					"opex");
			properties.add(slatravelProperties);

			slatotalCostProperties = new Properties();

			slatotalCostProperties.setProperty_name("Total Cost");
			slatotalCostProperties.setYear(rateCardBusinessDays.getYear());
			total_cost = Integer.parseInt(slaitProperties.getProperty_value())
					+ Integer.parseInt(slafacilityProperties.getProperty_value())
					+ Integer.parseInt(slasoftwareProperties.getProperty_value())
					+ Integer.parseInt(slathridProperties.getProperty_value())
					+ Integer.parseInt(slaotherProperties.getProperty_value())
					+ Integer.parseInt(slatravelProperties.getProperty_value());
			slatotalCostProperties.setProperty_value(String.valueOf(total_cost));

			properties.add(slatotalCostProperties);

			opex_sla_non_manpower_cost.setProperties(properties);
			opex_sla_non_manpower_costs.add(opex_sla_non_manpower_cost);

			// Calculate SLA Total Estimate Cost Structure

			BizCaseOtherServiceCalcInfo sla_total_estimation = new BizCaseOtherServiceCalcInfo();
			sla_total_estimation.setYear(rateCardBusinessDays.getYear());

			properties = new ArrayList<>();

			Properties sla_total_without_markup = new Properties();
			sla_total_without_markup.setProperty_name("Total SLA Estimate Without Markup");
			sla_total_without_markup.setProperty_value(df.format(SLA_Payout_Cost));
			sla_total_without_markup.setYear(rateCardBusinessDays.getYear());
			properties.add(sla_total_without_markup);

			Properties sla_total_with_markup = new Properties();
			sla_total_with_markup.setProperty_name("Total SLA Estimate With Markup");
			sla_total_with_markup.setProperty_value(df.format(SLA_Payout_Cost_with_markup));
			sla_total_with_markup.setYear(rateCardBusinessDays.getYear());
			properties.add(sla_total_with_markup);

			sla_total_estimation.setProperties(properties);
			sla_total_estimations.add(sla_total_estimation);

			// Change to secound Year
			Inflation = false;

		}
		bizCaseReportModel.setCost_info(bizCaseReportCostInfos);
		bizCaseReportModel.setRevenue_info(bizCaseReportRevenueInfos);
		bizCaseReportModel.setManpower_cost_info(ramp_up_manpower_Infos);
		bizCaseReportModel.setOpex_non_manpower_cost_info(opex_non_manpower_Infos);
		bizCaseReportModel.setCopex_non_manpower_cost_info(copex_non_manpower_Infos);
		bizCaseReportModel.setOther_cost_info(other_cost_Infos);
		bizCaseReportModel.setTransition_cost(transition_cost_Infos);
		bizCaseReportModel.setSla_payout_cost(bizCaseSLAPayouts);
		bizCaseReportModel.setCopex_sla_non_manpower_cost(copex_sla_non_manpower_costs);
		bizCaseReportModel.setOpex_sla_non_manpower_cost(opex_sla_non_manpower_costs);
		bizCaseReportModel.setSla_total_estimation(sla_total_estimations);
		bizCaseReportModel.setMarkup_value(bizcasedbdata.getMarkup_value());
		bizCaseReportModel.setFx_risk(bizcasedbdata.getFx_risk());
		bizCaseReportModel.setWht_value(bizcasedbdata.getWht_value());

		// Calculate Graph Value for P&L
		BizCaseProfitLossChart graphReports = calculatePLGraphReport(bizCaseReportModel, businessCaseRequest);
		bizCaseReportModel.setGraphReports(graphReports);

		bizcasedbdata.getBizcase().setBizcasereport(bizCaseReportModel);

	}

	private BizCaseProfitLossChart calculatePLGraphReport(BizCaseReport bizCaseReportModel,
			BusinessCaseRequest bizcasedata) {

		BizCaseProfitLossChart plGraph = new BizCaseProfitLossChart();

		List<GraphReport> costGraphReports = new ArrayList<>();
		List<GraphReport> totalRevenueGraphReports = new ArrayList<>();
		List<Double> value = new ArrayList<>();

		Double total_cost_value = 0.0;
		Double manpower_cost_value = Double.valueOf(bizcasedata.getManpower_requirements().get(2).getTotal());
		Double it_cost_value = bizcasedata.getIt_info().stream()
				.mapToDouble(Properties -> Double.valueOf(Properties.getCost())).sum();
		Double facility_cost_value = bizcasedata.getFacility().stream()
				.mapToDouble(Properties -> Double.valueOf(Properties.getCost())).sum();
		Double system_access_cost_value = bizcasedata.getSystem_access().stream()
				.mapToDouble(Properties -> Double.valueOf(Properties.getCost())).sum();
		Double thirdparty_service_value = bizcasedata.getThirdparty_service().stream()
				.mapToDouble(Properties -> Double.valueOf(Properties.getCost())).sum();
		Double thirdparty_cost_value = bizcasedata.getThirdparty_cost().stream()
				.mapToDouble(Properties -> Double.valueOf(Properties.getCost())).sum();
		Double other_cost_value = bizcasedata.getOther_cost().stream()
				.mapToDouble(Properties -> Double.valueOf(Properties.getCost())).sum();
		Double travel_cost_value = bizcasedata.getTravel_cost().stream()
				.mapToDouble(Properties -> Double.valueOf(Properties.getCost())).sum();

		GraphReport manpower_cost = new GraphReport();
		GraphReport it_cost = new GraphReport();
		GraphReport facility_cost = new GraphReport();
		GraphReport system_access_cost = new GraphReport();
		GraphReport thirdparty_service = new GraphReport();
		GraphReport thirdparty_cost = new GraphReport();
		GraphReport other_cost = new GraphReport();
		GraphReport travel_cost = new GraphReport();
		GraphReport total_cost = new GraphReport();
		GraphReport total_revenue = new GraphReport();

		total_cost_value += manpower_cost_value;
		manpower_cost.setName("Manpower Cost");
		manpower_cost.setLabel(manpower_cost_value);
		value.add(0.0);
		value.add(total_cost_value);
		manpower_cost.setValue(value);

		it_cost.setName("It Cost");
		it_cost.setLabel(it_cost_value);
		value = new ArrayList<>();
		value.add(total_cost_value);
		value.add(total_cost_value + it_cost_value);
		it_cost.setValue(value);

		total_cost_value += it_cost_value;
		facility_cost.setName("Facility Cost");
		facility_cost.setLabel(facility_cost_value);
		value = new ArrayList<>();
		value.add(total_cost_value);
		value.add(total_cost_value + facility_cost_value);
		facility_cost.setValue(value);

		total_cost_value += facility_cost_value;
		system_access_cost.setName("System Access Cost");
		system_access_cost.setLabel(system_access_cost_value);
		value = new ArrayList<>();
		value.add(total_cost_value);
		value.add(total_cost_value + system_access_cost_value);
		system_access_cost.setValue(value);

		total_cost_value += system_access_cost_value;
		thirdparty_service.setName("Third Party Service Cost");
		thirdparty_service.setLabel(thirdparty_service_value);
		value = new ArrayList<>();
		value.add(total_cost_value);
		value.add(total_cost_value + thirdparty_service_value);
		thirdparty_service.setValue(value);

		total_cost_value += thirdparty_service_value;
		thirdparty_cost.setName("Third Party Cost");
		thirdparty_cost.setLabel(thirdparty_cost_value);
		value = new ArrayList<>();
		value.add(total_cost_value);
		value.add(total_cost_value + thirdparty_cost_value);
		thirdparty_cost.setValue(value);

		total_cost_value += thirdparty_cost_value;
		other_cost.setName("Other Cost");
		other_cost.setLabel(other_cost_value);
		value = new ArrayList<>();
		value.add(total_cost_value);
		value.add(total_cost_value + other_cost_value);
		other_cost.setValue(value);

		total_cost_value += other_cost_value;
		travel_cost.setName("Travel Cost");
		travel_cost.setLabel(travel_cost_value);
		value = new ArrayList<>();
		value.add(total_cost_value);
		value.add(total_cost_value + travel_cost_value);
		travel_cost.setValue(value);

		total_cost_value += travel_cost_value;
		total_cost.setName("Total Cost");
		total_cost.setLabel(total_cost_value);

		Double markup_cost = 0.0;
		if (bizcasedata.getNewratecard().getMarkup_value() != null)
			markup_cost = (double) Math.round(bizcasedata.getNewratecard().getMarkup_value() / 100 * total_cost_value);

		total_revenue.setName("Total Revenue");
		total_revenue.setLabel(0.0);
		total_revenue.setTotal_revenue(total_cost_value);
		total_revenue.setMarkup(markup_cost);

		costGraphReports.add(manpower_cost);
		costGraphReports.add(it_cost);
		costGraphReports.add(facility_cost);
		costGraphReports.add(system_access_cost);
		costGraphReports.add(thirdparty_service);
		costGraphReports.add(thirdparty_cost);
		costGraphReports.add(other_cost);
		costGraphReports.add(travel_cost);
		costGraphReports.add(total_cost);
		totalRevenueGraphReports.add(total_revenue);

		plGraph.setProfit(df.format(total_revenue.getTotal_revenue() / 10000000));
		plGraph.setProfitability(df.format(((total_revenue.getMarkup() / total_revenue.getTotal_revenue()) * 100)));
		plGraph.setCost(costGraphReports);
		plGraph.setTotal_revenue(totalRevenueGraphReports);

		return plGraph;
	}

	public List<SLA_Level_Properties> calculateSingleSLAPayout(String year, BizCaseRateCardModel bizcasedbdata,
			Integer billable_hours) {

		List<SLA_Level_Properties> sla_properties = new ArrayList<>();

		SLA_Level_Properties currentsla_properties = new SLA_Level_Properties();

		Integer sla_manpower_count_yearly = bizcasedbdata.getMan_power_count_yearly().stream()
				.filter(properity -> properity.getYear().equals(year)).mapToInt(properity -> properity.getCount())
				.sum();

		BizRateCardYearlyBasedCalculation currentyeardata = bizcasedbdata.getYearlybasedcalculations().stream()
				.filter(yearinfo -> yearinfo.getYear().equals(year)).findFirst().orElse(null);

		if (currentyeardata == null) {
			LOGGER.info("Yearly based Level Properties is missing");
			return sla_properties;
		}

		Double hourly_rate = currentyeardata.getLevel_properties().get(0).getHourly_rate().stream()
				.filter(hourlyrdate -> hourlyrdate.getRate().equals("INR")).mapToDouble(rate -> rate.getPrice()).sum();

		currentsla_properties.setHourly_rate(hourly_rate);
		currentsla_properties.setManpower_count(sla_manpower_count_yearly);
		currentsla_properties.setTotal_manpower_cost(sla_manpower_count_yearly * hourly_rate * billable_hours);
		sla_properties.add(currentsla_properties);

		return sla_properties;
	}

	public List<SLA_Level_Properties> calculateSLAPayout(String year, BusinessCaseRequest bizcase,
			BizCaseRateCardModel bizcasedbdata, Integer billable_hours) {
		List<SLA_Level_Properties> sla_properties = new ArrayList<>();
		for (Rampups currentRampups : bizcase.getRampups()) {

			SLA_Level_Properties currentsla_properties = new SLA_Level_Properties();

			Integer sla_manpower_count = bizcasedbdata.getMan_power_count_yearly().stream()
					.filter(properity -> properity.getLevel().equals(currentRampups.getLevel())
							&& properity.getYear().equals(year))
					.mapToInt(properity -> properity.getCount()).sum();

			BizRateCardYearlyBasedCalculation currentyeardata = bizcasedbdata.getYearlybasedcalculations().stream()
					.filter(yearinfo -> yearinfo.getYear().equals(year)).findFirst().orElse(null);

			if (currentyeardata == null) {
				LOGGER.info("Yearly based Level Properties is missing");
				return sla_properties;
			}

			Double hourly_rate = currentyeardata.getLevel_properties().stream()
					.filter(level_properties -> level_properties.getLevel().equals(currentRampups.getLevel()))
					.flatMapToDouble(level_properties -> level_properties.getHourly_rate().stream()
							.filter(hourlyrdate -> hourlyrdate.getRate().equals("INR"))
							.mapToDouble(rate -> rate.getPrice()))
					.sum();

			currentsla_properties.setLevel(currentRampups.getLevel());
			currentsla_properties.setHourly_rate(hourly_rate);
			currentsla_properties.setManpower_count(sla_manpower_count);
			currentsla_properties.setTotal_manpower_cost(sla_manpower_count * hourly_rate * billable_hours);
			sla_properties.add(currentsla_properties);

		}
		return sla_properties;
	}

	public List<Properties> calculateOtherCostInfos(BizCaseRateCardModel bizcasedbdata,
			RateCardBusinessDays rateCardBusinessDays) {
		List<Properties> list_Properties = new ArrayList<>();
		List<SubModel> othercost = bizcasedbdata.getOther_costs().stream()
				.filter(submodel -> submodel.getBusiness_year().equals(rateCardBusinessDays.getYear())).toList();
		for (SubModel currentSubModel : othercost) {
			Properties currentProperties = new Properties();
			currentProperties.setYear(rateCardBusinessDays.getYear());
			currentProperties.setProperty_name(currentSubModel.getDescription());
			currentProperties.setProperty_value(currentSubModel.getCost());
			list_Properties.add(currentProperties);
		}
		return list_Properties;
	}

	public List<Properties> calculationTransitionRampup(String year, BusinessCaseRequest businessCaseRequest) {

		Integer transition_count = 0;
		Integer ramup_count = 0;
		Integer rampdown_count = 0;
		Integer total_transition_cost = 0;

		List<Properties> transition_Properties = new ArrayList<>();
		if (businessCaseRequest.getCustomer_rampdown().isEmpty()) {
			return transition_Properties;
		}

		for (int i = 0; i < businessCaseRequest.getRampups().size(); i++) {
			Rampups currentrampup = businessCaseRequest.getRampups().get(i);

			List<Properties> rampupproperties = currentrampup.getProperties().stream()
					.filter(propertiy -> year.equals(propertiy.getYear())).collect(Collectors.toList());

			List<Properties> rampdownproperties = businessCaseRequest.getCustomer_rampdown().get(i).getProperties()
					.stream().filter(propertiy -> year.equals(propertiy.getYear())).collect(Collectors.toList());

			Properties transitionCost = new Properties();
			transitionCost.setYear(year);
			transitionCost.setProperty_name(currentrampup.getLevel());
			transitionCost.setProperty_value("0");

			for (int j = 0; j < rampupproperties.size(); j++) {

				Properties currentProperties = rampupproperties.get(j);

				ramup_count = Integer.parseInt(currentProperties.getProperty_value() + 0) / 10;
				rampdown_count = Integer.parseInt(rampdownproperties.get(j).getProperty_value() + 0) / 10;

				total_transit_rampup = total_transit_rampup + ramup_count;
				total_transit_rampdown = total_transit_rampdown + rampdown_count;

				if ((!ramup_count.equals(rampdown_count) && ramup_count > rampdown_count)
						&& (!total_transit_rampup.equals(total_transit_rampdown)
								&& total_transit_rampup > total_transit_rampdown)) {
					transition_count += total_transit_rampup - total_transit_rampdown;
					transitionCost.setProperty_value(String.valueOf(transition_count));
					transitionCost.setProperty_date(currentProperties.getProperty_date());

					Properties cost_properties = businessCaseRequest.getManpower_requirements().get(1).getProperties()
							.stream().filter(manpower_properties -> manpower_properties.getProperty_name()
									.equals(currentrampup.getLevel()))
							.findFirst().orElse(null);
					if (cost_properties != null)
						total_transition_cost += (Integer.parseInt(cost_properties.getProperty_value())
								* transition_count);
				}

			}

			transition_Properties.add(transitionCost);

		}

		Properties final_transition = new Properties();
		final_transition.setProperty_name("Total Cost");
		final_transition.setProperty_value(String.valueOf(total_transition_cost));
		final_transition.setYear(year);
		transition_Properties.add(final_transition);

		return transition_Properties;
	}

	public Double bizcaseCalculateratecardamount(BizCaseReportRevenueInfo bizCaseReportRevenueInfo,
			BusinessCaseRequest bizcase, RateCardBusinessDays rateCardBusinessDays,
			List<BizRateCardYearlyBasedCalculation> yearlyBasedCalculations, BizCaseRateCardModel bizcasedbdata) {

		Double total_rate_costDouble = (double) 0;
		for (Rampups currentrampup : bizcase.getRampups()) {
			Double hiring_cost = 0.0;
			Integer level_count = bizcasedbdata.getMan_power_count_yearly().stream()
					.filter(data -> data.getYear().equals(rateCardBusinessDays.getYear())
							&& data.getLevel().equals(currentrampup.getLevel()))
					.mapToInt(data -> data.getCount()).sum();

			BizRateCardYearlyBasedCalculation currentyeardata = yearlyBasedCalculations.stream()
					.filter(yearinfo -> yearinfo.getYear().equals(rateCardBusinessDays.getYear())).findFirst()
					.orElse(null);
			if (currentyeardata == null) {

				LOGGER.info("Yearly based Level Properties is missing");
				return null;
			}
			Double hourly_rate = 0.0;
			if (bizcasedbdata.getRate_card_type().equalsIgnoreCase("multiple")) {
				hourly_rate = currentyeardata.getLevel_properties().stream()
						.filter(level_properties -> level_properties.getLevel().equals(currentrampup.getLevel()))
						.flatMapToDouble(level_properties -> level_properties.getHourly_rate().stream()
								.filter(hourlyrdate -> hourlyrdate.getRate().equals("INR"))
								.mapToDouble(rate -> rate.getPrice()))
						.sum();
			} else {
				hourly_rate = currentyeardata.getLevel_properties().get(0).getHourly_rate().stream()
						.filter(hourlyrdate -> hourlyrdate.getRate().equals("INR")).mapToDouble(rate -> rate.getPrice())
						.sum();
			}

			Properties per_cost = bizcasedbdata.getBizcase().getManpower_hiringcost().get(3).getProperties().stream()
					.filter(properties -> properties.getProperty_name().equals(currentrampup.getLevel())).findAny()
					.orElse(null);

			Double cost_per_person_value = bizcase.getManpower_hiringcost().get(1).getProperties().stream()
					.filter(properties -> properties.getProperty_name().equals(currentrampup.getLevel()))
					.mapToDouble(properties -> Double.parseDouble(properties.getProperty_value())).sum();

			if (per_cost != null) {

				hiring_cost += cost_per_person_value / 100
						* (level_count * Integer.parseInt(per_cost.getProperty_value()));

//				hiring_cost += level_count * Integer.parseInt(per_cost.getProperty_value());
			}

			total_rate_costDouble += ((level_count * (rateCardBusinessDays.getDays() * bizcase.getWorking_hours()))
					* hourly_rate) + hiring_cost;

		}
		return total_rate_costDouble;
	}

	public Properties calculateNonManpowerInfo(BizCaseRateCardModel bizcasedbdata,
			RateCardBusinessDays rateCardBusinessDays, String section, Boolean isRatecard, String Cost_Type) {
		Properties currentProperties = new Properties();
		currentProperties.setYear(rateCardBusinessDays.getYear());
		currentProperties.setProperty_name(section);
		switch (section) {
		case "IT": {
			Integer total_cost = bizcasedbdata.getBizit_info().stream()
					.filter(property -> property.getBusiness_year().equals(rateCardBusinessDays.getYear())
							&& isRatecard.equals(property.getIsratecard())
							&& property.getCost_type().equalsIgnoreCase(Cost_Type))
					.mapToInt(property -> Integer.parseInt(property.getCost())).sum();
			currentProperties.setProperty_value(String.valueOf(total_cost));
			break;
		}
		case "Facilty": {
			Integer total_cost = bizcasedbdata.getBizfacility().stream()
					.filter(property -> property.getBusiness_year().equals(rateCardBusinessDays.getYear())
							&& isRatecard.equals(property.getIsratecard())
							&& property.getCost_type().equalsIgnoreCase(Cost_Type))
					.mapToInt(property -> Integer.parseInt(property.getCost())).sum();
			currentProperties.setProperty_value(String.valueOf(total_cost));
			break;
		}
		case "Software": {
			Integer total_cost = bizcasedbdata.getBizsystem_access().stream()
					.filter(property -> property.getBusiness_year().equals(rateCardBusinessDays.getYear())
							&& isRatecard.equals(property.getIsratecard())
							&& property.getCost_type().equalsIgnoreCase(Cost_Type))
					.mapToInt(property -> Integer.parseInt(property.getCost())).sum();
			currentProperties.setProperty_value(String.valueOf(total_cost));
			break;
		}
		case "Third": {
			Integer total_cost = bizcasedbdata.getBizthirdparty_service().stream()
					.filter(property -> property.getBusiness_year().equals(rateCardBusinessDays.getYear())
							&& isRatecard.equals(property.getIsratecard())
							&& property.getCost_type().equalsIgnoreCase(Cost_Type))
					.mapToInt(property -> Integer.parseInt(property.getCost())).sum();
			currentProperties.setProperty_value(String.valueOf(total_cost));
			break;
		}
		case "Other": {
			Integer total_cost = bizcasedbdata.getBizother_cost().stream()
					.filter(property -> property.getBusiness_year().equals(rateCardBusinessDays.getYear())
							&& isRatecard.equals(property.getIsratecard())
							&& property.getCost_type().equalsIgnoreCase(Cost_Type))
					.mapToInt(property -> Integer.parseInt(property.getCost())).sum();
			currentProperties.setProperty_value(String.valueOf(total_cost));
			break;
		}
		case "Travel": {
			Integer total_cost = bizcasedbdata.getBiztravel_cost().stream()
					.filter(property -> property.getBusiness_year().equals(rateCardBusinessDays.getYear())
							&& property.getCost_type().equalsIgnoreCase(Cost_Type))
					.mapToInt(property -> Integer.parseInt(property.getCost())).sum();
			currentProperties.setProperty_value(String.valueOf(total_cost));
			break;
		}
		case "Total Cost": {
			Integer it_cost = bizcasedbdata.getBizit_info().stream()
					.filter(property -> property.getBusiness_year().equals(rateCardBusinessDays.getYear())
							&& isRatecard.equals(property.getIsratecard())
							&& property.getCost_type().equalsIgnoreCase(Cost_Type))
					.mapToInt(property -> Integer.parseInt(property.getCost())).sum();

			Integer facility_cost = bizcasedbdata.getBizfacility().stream()
					.filter(property -> property.getBusiness_year().equals(rateCardBusinessDays.getYear())
							&& isRatecard.equals(property.getIsratecard())
							&& property.getCost_type().equalsIgnoreCase(Cost_Type))
					.mapToInt(property -> Integer.parseInt(property.getCost())).sum();

			Integer software_cost = bizcasedbdata.getBizsystem_access().stream()
					.filter(property -> property.getBusiness_year().equals(rateCardBusinessDays.getYear())
							&& isRatecard.equals(property.getIsratecard())
							&& property.getCost_type().equalsIgnoreCase(Cost_Type))
					.mapToInt(property -> Integer.parseInt(property.getCost())).sum();

			Integer third_cost = bizcasedbdata.getBizthirdparty_service().stream()
					.filter(property -> property.getBusiness_year().equals(rateCardBusinessDays.getYear())
							&& isRatecard.equals(property.getIsratecard())
							&& property.getCost_type().equalsIgnoreCase(Cost_Type))
					.mapToInt(property -> Integer.parseInt(property.getCost())).sum();

			Integer other_cost = bizcasedbdata.getBizother_cost().stream()
					.filter(property -> property.getBusiness_year().equals(rateCardBusinessDays.getYear())
							&& isRatecard.equals(property.getIsratecard())
							&& property.getCost_type().equalsIgnoreCase(Cost_Type))
					.mapToInt(property -> Integer.parseInt(property.getCost())).sum();

			Integer total_cost = it_cost + facility_cost + software_cost + third_cost + other_cost;
			currentProperties.setProperty_value(String.valueOf(total_cost));
			break;
		}
		default:
			throw new IllegalArgumentException("Unexpected value: " + section);
		}
		return currentProperties;
	}

	public BizCaseOtherServiceCalcInfo calculateRampupManpowerInfo(BizCaseRateCardModel bizcasedbdata,
			RateCardBusinessDays rateCardBusinessDays) {
		BizCaseOtherServiceCalcInfo manpower_cost_info = new BizCaseOtherServiceCalcInfo();
		manpower_cost_info.setYear(rateCardBusinessDays.getYear());
		List<Properties> properties = new ArrayList<>();
		for (Rampups currentRampups : bizcasedbdata.getBizcase().getRampups()) {
			Properties property_data = new Properties();
			Integer level_count = bizcasedbdata.getMan_power_count_yearly().stream()
					.filter(property -> property.getYear().equals(rateCardBusinessDays.getYear())
							&& property.getLevel().equals(currentRampups.getLevel()))
					.mapToInt(property -> property.getCount()).sum();
			property_data.setProperty_name(currentRampups.getLevel());
			property_data.setProperty_value(String.valueOf(level_count));
			property_data.setYear(rateCardBusinessDays.getYear());
			properties.add(property_data);
		}

		Integer total_manpower_cost = 0;
		for (Rampups currentRampups : bizcasedbdata.getBizcase().getRampups()) {
			Integer manpower_cost = bizcasedbdata.getBizcase().getManpower_requirements().get(1).getProperties()
					.stream().filter(property -> property.getProperty_name().equals(currentRampups.getLevel()))
					.mapToInt(property -> Integer.parseInt(property.getProperty_value())).sum();

			Integer level_count = bizcasedbdata.getMan_power_count_yearly().stream()
					.filter(property -> property.getYear().equals(rateCardBusinessDays.getYear())
							&& property.getLevel().equals(currentRampups.getLevel()))
					.mapToInt(property -> property.getCount()).sum();
			total_manpower_cost += level_count * manpower_cost;

		}
		Properties property_data = new Properties();
		property_data.setProperty_name("ManPower Cost");
		property_data.setProperty_value(String.valueOf(total_manpower_cost));
		property_data.setYear(rateCardBusinessDays.getYear());
		properties.add(property_data);

		Double total_hiring_cost = (double) 0;
		for (Rampups currentRampups : bizcasedbdata.getBizcase().getRampups()) {

			Integer current_manpower_cost = bizcasedbdata.getBizcase().getManpower_requirements().get(1).getProperties()
					.stream().filter(property -> property.getProperty_name().equals(currentRampups.getLevel()))
					.mapToInt(property -> Integer.parseInt(property.getProperty_value())).sum();

			Double current_hiring_value = bizcasedbdata.getBizcase().getManpower_hiringcost().get(1).getProperties()
					.stream().filter(property -> property.getProperty_name().equals(currentRampups.getLevel()))
					.mapToDouble(property -> Double.parseDouble(property.getProperty_value())).sum();

			Integer level_count = bizcasedbdata.getMan_power_count_yearly().stream()
					.filter(property -> property.getYear().equals(rateCardBusinessDays.getYear())
							&& property.getLevel().equals(currentRampups.getLevel()))
					.mapToInt(property -> property.getCount()).sum();

			Double hiring_cost = current_hiring_value / 100 * current_manpower_cost;
			total_hiring_cost += level_count * hiring_cost;
		}
		property_data = new Properties();
		property_data.setProperty_name("Hiring Cost");
		property_data.setProperty_value(String.valueOf(total_hiring_cost));
		property_data.setYear(rateCardBusinessDays.getYear());
		properties.add(property_data);

		Double total_man_power_yearly = total_manpower_cost + total_hiring_cost;
		property_data = new Properties();
		property_data.setProperty_name("Total Manpower Cost");
		property_data.setProperty_value(String.valueOf(total_man_power_yearly));
		property_data.setYear(rateCardBusinessDays.getYear());
		properties.add(property_data);

		manpower_cost_info.setProperties(properties);
		return manpower_cost_info;
	}

	public Integer calculateManpowerCost(BizCaseRateCardModel bizcasedbdata, String year) {

		man_power_cost = 0;

		for (Rampups currentRampups : bizcasedbdata.getBizcase().getRampups()) {

			Integer level_count = bizcasedbdata.getMan_power_count_yearly().stream()
					.filter(data -> data.getYear().equals(year) && data.getLevel().equals(currentRampups.getLevel()))
					.mapToInt(data -> data.getCount()).sum();

			Properties per_cost = bizcasedbdata.getBizcase().getManpower_requirements().get(1).getProperties().stream()
					.filter(properties -> properties.getProperty_name().equals(currentRampups.getLevel())).findAny()
					.orElse(null);

			if (per_cost != null)
				man_power_cost += level_count * Integer.parseInt(per_cost.getProperty_value());

		}

		Integer thirdparty_cost = bizcasedbdata.getBizcase().getThirdparty_cost().stream()
				.filter(propertiy -> year.equals(propertiy.getBusiness_year()))
				.mapToInt(propertiy -> Integer.parseInt(propertiy.getCost())).sum();

		return man_power_cost + thirdparty_cost;

	}

	private Integer calculateHiringCost(BizCaseRateCardModel bizcasedbdata, String year) {
		hiring_cost = 0;

		for (Rampups currentRampups : bizcasedbdata.getBizcase().getRampups()) {

			Integer level_count = bizcasedbdata.getMan_power_count_yearly().stream()
					.filter(data -> data.getYear().equals(year) && data.getLevel().equals(currentRampups.getLevel()))
					.mapToInt(data -> data.getCount()).sum();

			Properties per_cost = bizcasedbdata.getBizcase().getManpower_hiringcost().get(3).getProperties().stream()
					.filter(properties -> properties.getProperty_name().equals(currentRampups.getLevel())).findAny()
					.orElse(null);

			if (per_cost != null)
				hiring_cost += level_count * Integer.parseInt(per_cost.getProperty_value());

		}

		return hiring_cost;
	}

	public Double calculateMarkupCost(BizCaseRateCardModel bizcasedbdata, BusinessCaseRequest bizcase, String year,
			Integer non_manpower_cost) {

		Double total_markup_cost = (double) 0;
		Double other_cost = (double) 0;

		Integer thirdparty_cost = bizcase.getThirdparty_cost().stream()
				.filter(propertiy -> year.equals(propertiy.getBusiness_year()))
				.mapToInt(propertiy -> Integer.parseInt(propertiy.getCost())).sum();

		for (Rampups currentRampups : bizcase.getRampups()) {

			Integer count = currentRampups.getProperties().stream()
					.filter(propertiy -> year.equals(propertiy.getYear()))
					.mapToInt(propertiy -> Integer.parseInt(propertiy.getProperty_value() + 0)).sum() / 10;

			Properties per_cost = bizcase.getManpower_requirements().get(1).getProperties().stream()
					.filter(properties -> properties.getProperty_name().equals(currentRampups.getLevel())).findAny()
					.orElse(null);

			Double cost_per_person_value = bizcase.getManpower_hiringcost().get(1).getProperties().stream()
					.filter(properties -> properties.getProperty_name().equals(currentRampups.getLevel()))
					.mapToDouble(properties -> Double.parseDouble(properties.getProperty_value())).sum();

			if (per_cost != null) {

				Double hiring_cost = cost_per_person_value / 100
						* (count * Integer.parseInt(per_cost.getProperty_value()));

				man_power_hiring_cost += count * Integer.parseInt(per_cost.getProperty_value());

				other_cost += hiring_cost + non_manpower_cost;

			}

		}

		total_markup_cost = (double) Math
				.round(bizcasedbdata.getMarkup_value() / 100 * (man_power_hiring_cost + other_cost + thirdparty_cost));
		return total_markup_cost;

	}

	public Integer calculateTransitioncost(BusinessCaseRequest businessCaseRequest, String year) {

		Integer transition_count = 0;
		Integer ramup_count = 0;
		Integer rampdown_count = 0;

		if (Boolean.FALSE.equals(businessCaseRequest.getIs_customer_rampdown())) {
			return transition_count;
		}

		for (int i = 0; i < businessCaseRequest.getRampups().size(); i++) {
			Rampups currentrampup = businessCaseRequest.getRampups().get(i);

			List<Properties> rampupproperties = currentrampup.getProperties().stream()
					.filter(propertiy -> year.equals(propertiy.getYear())).collect(Collectors.toList());

			List<Properties> rampdownproperties = businessCaseRequest.getCustomer_rampdown().get(i).getProperties()
					.stream().filter(propertiy -> year.equals(propertiy.getYear())).collect(Collectors.toList());

			for (int j = 0; j < rampupproperties.size(); j++) {

				Properties currentProperties = rampupproperties.get(j);

				ramup_count = Integer.parseInt(currentProperties.getProperty_value() + 0) / 10;
				rampdown_count = Integer.parseInt(rampdownproperties.get(j).getProperty_value() + 0) / 10;

				total_rampup = total_rampup + ramup_count;
				total_rampdown = total_rampdown + rampdown_count;

//				if ((!ramup_count.equals(rampdown_count) && ramup_count < rampdown_count)
//						&& (!total_rampup.equals(total_rampdown) && total_rampup > total_rampdown)) {
//
//					transition_count += total_rampup - total_rampdown;
//					Properties cost_properties = businessCaseRequest.getManpower_requirements().get(1).getProperties()
//							.stream().filter(manpower_properties -> manpower_properties.getProperty_name()
//									.equals(currentrampup.getLevel()))
//							.findFirst().orElse(null);
//					if (cost_properties != null)
//						transition_count += (Integer.parseInt(cost_properties.getProperty_value()) * transition_count);
//				}

				if ((!total_rampup.equals(total_rampdown) && total_rampup > total_rampdown)) {

					Properties cost_properties = businessCaseRequest.getManpower_requirements().get(1).getProperties()
							.stream().filter(manpower_properties -> manpower_properties.getProperty_name()
									.equals(currentrampup.getLevel()))
							.findFirst().orElse(null);
					if (cost_properties != null)
						transition_count += (Integer.parseInt(cost_properties.getProperty_value())
								* (total_rampup - total_rampdown));
				}

			}

		}

		return transition_count;
	}

	public List<BizCaseManPowerYearlyInfo> calculatTotalYearBasedManpower(BusinessCaseRequest bizcase,
			List<RateCardBusinessDays> rateCardBusinessDays) {
		List<BizCaseManPowerYearlyInfo> new_data = new ArrayList<>();
		for (Rampups currentRampups : bizcase.getRampups()) {
			BizCaseManPowerYearlyInfo leveldata = new BizCaseManPowerYearlyInfo();
			leveldata.setLevel(currentRampups.getLevel());
			leveldata.setCount(0);
			new_data.add(leveldata);
		}
		List<BizCaseManPowerYearlyInfo> mapped_data = new ArrayList<>();
		for (RateCardBusinessDays bizyear : rateCardBusinessDays) {
			for (Rampups currentRampups : bizcase.getRampups()) {
				Integer manpower = currentRampups.getProperties().stream()
						.filter(properties -> properties.getYear().equals(bizyear.getYear()))
						.mapToInt(properties -> Integer.parseInt(properties.getProperty_value() + 0)).sum() / 10;

				BizCaseManPowerYearlyInfo actual_count = new_data.stream()
						.filter(data -> data.getLevel().equals(currentRampups.getLevel())).findFirst().orElse(null);

				actual_count.setCount(actual_count.getCount() + manpower);
				BizCaseManPowerYearlyInfo leveldata = new BizCaseManPowerYearlyInfo();
				leveldata.setYear(bizyear.getYear());
				leveldata.setLevel(currentRampups.getLevel());
				leveldata.setCount(actual_count.getCount());
				mapped_data.add(leveldata);

			}
		}

		return mapped_data;
	}

}

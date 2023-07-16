package com.intelizign.dmgcc.services;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.intelizign.dmgcc.models.businesscasemodels.BizCaseRateCardModel;
import com.intelizign.dmgcc.models.businesscasemodels.BusinessCaseRequest;
import com.intelizign.dmgcc.models.othermaster.RateCardModel;
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
import com.intelizign.dmgcc.repositories.BizCaseRateCardRepository;
import com.intelizign.dmgcc.repositories.BizCaseRequestRepository;
import com.intelizign.dmgcc.repositories.othermaster.ForexRatesRepository;
import com.intelizign.dmgcc.request.bizcase.Properties;
import com.intelizign.dmgcc.request.bizcase.Rampups;
import com.intelizign.dmgcc.request.bizcase.SubModel;
import com.intelizign.dmgcc.response.othermaster.BizcaseFinalChartResponse;
import com.intelizign.dmgcc.response.othermaster.BizcaseFinalChartResponse.BizcaseChartResponse;
import com.intelizign.dmgcc.response.othermaster.BizcaseFinalChartResponse.NonmanpowercostInfo;

@Service
@Transactional
public class BizCaseExistingRateCard {

	@Autowired
	BizCaseRequestRepository bizCaseRequestRepository;

	@Autowired
	BizCaseRateCardRepository bizCaseRateCardRepository;

	@Autowired
	ForexRatesRepository forexRatesRepository;

	Integer total_rampup = 0;
	Integer total_rampdown = 0;
	Integer total_transit_rampup = 0;
	Integer total_transit_rampdown = 0;
	Integer man_power_cost = 0;
	Integer hiring_cost = 0;
	Double ratecard_cost = (double) 0;
	Double man_power_hiring_cost = (double) 0;

	private static final DecimalFormat df = new DecimalFormat("0.00");

	public final Logger LOGGER = LogManager.getLogger(BizCaseExistingRateCard.class);

	public BizCaseReport CalculateMultipleRateCard(BusinessCaseRequest bizcasedata) {

		BizCaseRateCardModel bizcasedbdata = new BizCaseRateCardModel();
		if (bizcasedata.getNewratecard() == null)
			return null;
		else
			bizcasedbdata = bizcasedata.getNewratecard();
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
		if (bizcasedata.getBizcasereport() != null)
			bizCaseReportModel = bizcasedata.getBizcasereport();

		bizCaseReportModel.setBusiness_case_start_date(bizcasedata.getBusiness_case_start_date());
		bizCaseReportModel.setBusiness_case_end_date(bizcasedata.getBusiness_case_end_date());
		bizCaseReportModel.setProject_name(bizcasedata.getProject_name());
		bizCaseReportModel.setBizcase_yearly_information(bizcasedata.getBizcase_yearly_information());

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
		for (RateCardBusinessDays rateCardBusinessDays : bizcasedata.getBusiness_days()) {

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

			Integer manpower_count = bizcasedata.getRampups().stream()
					.flatMap(rampup -> rampup.getProperties().stream())
					.filter(properties -> properties.getYear().equals(rateCardBusinessDays.getYear()))
					.mapToInt(properties -> Integer.parseInt(properties.getProperty_value() + 0)).sum() / 10;

			billable_mancount += manpower_count;

			// Calculate Billable Hours
			BizCaseReportRevenueInfo.setBillable_hours(
					billable_mancount * rateCardBusinessDays.getDays() * bizcasedata.getWorking_hours());

			// Calculate Rate Card Cost
			Double overallratecardamount = bizcaseCalculateratecardamount(bizcasedata, rateCardBusinessDays,
					bizcasedata.getExistingratecard(), Inflation);

			BizCaseReportRevenueInfo.setRate_card((double) Math.round(overallratecardamount));

			// Calculate Other Cost(uncheck item)
			Integer travelcost = bizcasedata.getTravel_cost().stream()
					.filter(data -> data.getBusiness_year().equals(rateCardBusinessDays.getYear()))
					.mapToInt(data -> Integer.parseInt(data.getCost())).sum();

			it_cost = bizcasedata.getIt_info().stream()
					.filter(bizdata -> rateCardBusinessDays.getYear().equals(bizdata.getBusiness_year()))
					.mapToInt(bizdata -> Integer.parseInt(bizdata.getCost())).sum();

			facility_cost = bizcasedata.getFacility().stream()
					.filter(bizdata -> rateCardBusinessDays.getYear().equals(bizdata.getBusiness_year()))
					.mapToInt(bizdata -> Integer.parseInt(bizdata.getCost())).sum();

			system_access_cost = bizcasedata.getSystem_access().stream()
					.filter(bizdata -> rateCardBusinessDays.getYear().equals(bizdata.getBusiness_year()))
					.mapToInt(bizdata -> Integer.parseInt(bizdata.getCost())).sum();

			third_party_service = bizcasedata.getThirdparty_service().stream()
					.filter(bizdata -> rateCardBusinessDays.getYear().equals(bizdata.getBusiness_year()))
					.mapToInt(bizdata -> Integer.parseInt(bizdata.getCost())).sum();

			other_cost = bizcasedata.getOther_cost().stream()
					.filter(bizdata -> rateCardBusinessDays.getYear().equals(bizdata.getBusiness_year()))
					.mapToInt(bizdata -> Integer.parseInt(bizdata.getCost())).sum();

			Integer SLA_other_cost = travelcost + it_cost + facility_cost + system_access_cost + third_party_service
					+ other_cost;

			BizCaseReportRevenueInfo.setOther_costs(SLA_other_cost);

			// Calculate Markup Value
			Double markupvalue = (double) Math.round(
					calculateMarkupCost(bizcasedata, rateCardBusinessDays.getYear(), (SLA_other_cost - travelcost)));

			BizCaseReportRevenueInfo.setMarkup(markupvalue);

			// Calculate Inflation value
			if (Boolean.TRUE.equals(Inflation))
				BizCaseReportRevenueInfo.setInflaction(00.0);
			else
				BizCaseReportRevenueInfo.setInflaction(
						(double) Math.round(bizcasedata.getRate_card_inflation() / 100 * overallratecardamount));

			// Calculate SLA Payout value
			Double SLA_Payout_Cost = (double) Math.round(overallratecardamount + SLA_other_cost);
			Double SLA_Payout_Cost_with_markup = (double) Math.round(SLA_Payout_Cost + (13.5 / 100 * SLA_Payout_Cost));
			BizCaseReportRevenueInfo.setSla_payout_cost(SLA_Payout_Cost_with_markup);

			// Calculate Net Profit value
			BizCaseReportRevenueInfo.setNet_profit_value(markupvalue);

			// Calculate ROS value
			BizCaseReportRevenueInfo.setRos(13.5);

			// Calculate DTA Cost
			if (bizcasedata.getCustomer_expense_total() != null && !bizcasedata.getCustomer_expense_total().isEmpty())
				BizCaseReportRevenueInfo.setCustomer_expense_cost(
						(double) Math.round(Double.parseDouble(bizcasedata.getCustomer_expense_total())));
			else
				BizCaseReportRevenueInfo.setCustomer_expense_cost(00.0);

			// Calculate DTA Saving
			if (bizcasedata.getCustomer_expense_total() != null && !bizcasedata.getCustomer_expense_total().isEmpty())
//				BizCaseReportRevenueInfo.setCustomer_expense_saving(
//						(double) Math.round(Double.parseDouble(bizcasedata.getCustomer_expense_total())
//								- BizCaseReportRevenueInfo.getSla_payout_cost()));
				BizCaseReportRevenueInfo.setCustomer_expense_saving(BizCaseReportRevenueInfo.getSla_payout_cost()
						- (double) Math.round(Double.parseDouble(bizcasedata.getCustomer_expense_total())));
			else
				BizCaseReportRevenueInfo.setCustomer_expense_saving(00.0);

			bizCaseReportRevenueInfos.add(BizCaseReportRevenueInfo);

			// Calculate Ramp up & Manpower Cost Section

			BizCaseOtherServiceCalcInfo manpower_cost_info = calculateRampupManpowerInfo(bizcasedata,
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
			if (Boolean.TRUE.equals(bizcasedata.getIs_customer_rampdown())) {
				BizCaseOtherServiceCalcInfo transition_cost_infos = new BizCaseOtherServiceCalcInfo();
				transition_cost_infos.setYear(rateCardBusinessDays.getYear());
				List<Properties> transition_properties = calculationTransitionRampup(rateCardBusinessDays.getYear(),
						bizcasedata);

				transition_cost_infos.setProperties(transition_properties);
				transition_cost_Infos.add(transition_cost_infos);
			}

			// Calculate SLA Payout Structure
			BizCaseSLAPayout sla_payout_structure = new BizCaseSLAPayout();
			sla_payout_structure.setYear(rateCardBusinessDays.getYear());
			Integer billable_hours = rateCardBusinessDays.getDays() * bizcasedata.getWorking_hours();
			sla_payout_structure.setBillable_hours(billable_hours);

			List<SLA_Level_Properties> sla_properties = new ArrayList<>();
			if (bizcasedata.getRatecard_type().equalsIgnoreCase("multiple")) {
				sla_properties = calculateSLAPayout(rateCardBusinessDays.getYear(), bizcasedata, billable_hours,
						Inflation);
			} else {
				sla_properties = calculateSingleSLAPayout(rateCardBusinessDays.getYear(), bizcasedata, billable_hours,
						Inflation);
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
		bizCaseReportModel.setMarkup_value(bizcasedata.getNewratecard().getMarkup_value());

		// Calculate Graph Value for P&L
		BizCaseProfitLossChart graphReports = calculatePLGraphReport(bizCaseReportModel, bizcasedata);
		bizCaseReportModel.setGraphReports(graphReports);

		return bizCaseReportModel;
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
//		totalRevenueGraphReports.add(total_cost);
		totalRevenueGraphReports.add(total_revenue);

		plGraph.setProfit(df.format(total_revenue.getTotal_revenue() / 10000000));
		plGraph.setProfitability(df.format(((total_revenue.getMarkup() / total_revenue.getTotal_revenue()) * 100)));
		plGraph.setCost(costGraphReports);
		plGraph.setTotal_revenue(totalRevenueGraphReports);

		return plGraph;
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

				if ((!ramup_count.equals(rampdown_count) && ramup_count > rampdown_count)
						&& (!total_rampup.equals(total_rampdown) && total_rampup > total_rampdown)) {

					transition_count += total_rampup - total_rampdown;
					Properties cost_properties = businessCaseRequest.getManpower_requirements().get(1).getProperties()
							.stream().filter(manpower_properties -> manpower_properties.getProperty_name()
									.equals(currentrampup.getLevel()))
							.findFirst().orElse(null);
					if (cost_properties != null)
						transition_count += (Integer.parseInt(cost_properties.getProperty_value()) * transition_count);
				}

			}

		}

		return transition_count;
	}

	private Integer calculateHiringCost(BizCaseRateCardModel bizcasedata, String year) {
		hiring_cost = 0;

		for (Rampups currentRampups : bizcasedata.getBizcase().getRampups()) {

			Integer level_count = bizcasedata.getMan_power_count_yearly().stream()
					.filter(data -> data.getYear().equals(year) && data.getLevel().equals(currentRampups.getLevel()))
					.mapToInt(data -> data.getCount()).sum();

			Properties per_cost = bizcasedata.getBizcase().getManpower_hiringcost().get(3).getProperties().stream()
					.filter(properties -> properties.getProperty_name().equals(currentRampups.getLevel())).findAny()
					.orElse(null);

			if (per_cost != null)
				hiring_cost += level_count * Integer.parseInt(per_cost.getProperty_value());

		}

		return hiring_cost;
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

	public List<SLA_Level_Properties> calculateSingleSLAPayout(String year, BusinessCaseRequest bizcasedbdata,
			Integer billable_hours, Boolean inflation) {

		List<SLA_Level_Properties> sla_properties = new ArrayList<>();

		SLA_Level_Properties currentsla_properties = new SLA_Level_Properties();

		Integer sla_manpower_count_yearly = bizcasedbdata.getMan_power_count_yearly().stream()
				.filter(properity -> properity.getYear().equals(year)).mapToInt(properity -> properity.getCount())
				.sum();

		Double hourly_rate = bizcasedbdata.getExistingratecard().stream()
				.filter(hourlyrdate -> hourlyrdate.getYear().equals(year))
				.mapToDouble(rate -> rate.getHourly_rate_inr()).sum();

		if (Boolean.FALSE.equals(inflation)) {
			hourly_rate += bizcasedbdata.getRate_card_inflation() / 100 * hourly_rate;
		}
		currentsla_properties.setHourly_rate(hourly_rate);
		currentsla_properties.setManpower_count(sla_manpower_count_yearly);
		currentsla_properties.setTotal_manpower_cost(sla_manpower_count_yearly * hourly_rate * billable_hours);
		sla_properties.add(currentsla_properties);

		return sla_properties;
	}

	public List<SLA_Level_Properties> calculateSLAPayout(String year, BusinessCaseRequest bizcase,
			Integer billable_hours, Boolean inflation) {
		List<SLA_Level_Properties> sla_properties = new ArrayList<>();
		for (Rampups currentRampups : bizcase.getRampups()) {

			SLA_Level_Properties currentsla_properties = new SLA_Level_Properties();

			Integer sla_manpower_count = bizcase.getMan_power_count_yearly().stream()
					.filter(properity -> properity.getLevel().equals(currentRampups.getLevel())
							&& properity.getYear().equals(year))
					.mapToInt(properity -> properity.getCount()).sum();

			Double hourly_rate = bizcase.getExistingratecard().stream()
					.filter(level_properties -> level_properties.getLevel().equals(currentRampups.getLevel())
							&& level_properties.getYear().equals(year))
					.mapToDouble(rate -> rate.getHourly_rate_inr()).sum();

			if (Boolean.FALSE.equals(inflation)) {
				hourly_rate += bizcase.getRate_card_inflation() / 100 * hourly_rate;
			}
			currentsla_properties.setLevel(currentRampups.getLevel());
			currentsla_properties.setHourly_rate(hourly_rate);
			currentsla_properties.setManpower_count(sla_manpower_count);
			currentsla_properties.setTotal_manpower_cost(sla_manpower_count * hourly_rate * billable_hours);
			sla_properties.add(currentsla_properties);

		}
		return sla_properties;
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

	public BizCaseOtherServiceCalcInfo calculateRampupManpowerInfo(BusinessCaseRequest bizcasedbdata,
			RateCardBusinessDays rateCardBusinessDays) {
		BizCaseOtherServiceCalcInfo manpower_cost_info = new BizCaseOtherServiceCalcInfo();
		manpower_cost_info.setYear(rateCardBusinessDays.getYear());
		List<Properties> properties = new ArrayList<>();
		for (Rampups currentRampups : bizcasedbdata.getRampups()) {
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
		for (Rampups currentRampups : bizcasedbdata.getRampups()) {
			Integer manpower_cost = bizcasedbdata.getManpower_requirements().get(1).getProperties().stream()
					.filter(property -> property.getProperty_name().equals(currentRampups.getLevel()))
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
		for (Rampups currentRampups : bizcasedbdata.getRampups()) {

			Integer current_manpower_cost = bizcasedbdata.getManpower_requirements().get(1).getProperties().stream()
					.filter(property -> property.getProperty_name().equals(currentRampups.getLevel()))
					.mapToInt(property -> Integer.parseInt(property.getProperty_value())).sum();

			Double current_hiring_value = bizcasedbdata.getManpower_hiringcost().get(1).getProperties().stream()
					.filter(property -> property.getProperty_name().equals(currentRampups.getLevel()))
					.mapToDouble(property -> Double.parseDouble(property.getProperty_value())).sum();

			Double other_current_hiring_value = bizcasedbdata.getManpower_hiringcost().get(2).getProperties().stream()
					.filter(property -> property.getProperty_name().equals(currentRampups.getLevel())
							&& !property.getProperty_value().isEmpty())
					.mapToDouble(property -> Double.parseDouble(property.getProperty_value())).sum();

			Integer level_count = bizcasedbdata.getMan_power_count_yearly().stream()
					.filter(property -> property.getYear().equals(rateCardBusinessDays.getYear())
							&& property.getLevel().equals(currentRampups.getLevel()))
					.mapToInt(property -> property.getCount()).sum();

			Double hiring_cost = (current_hiring_value / 100 * current_manpower_cost) + other_current_hiring_value;
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

	public Double calculateMarkupCost(BusinessCaseRequest bizcase, String year, Integer non_manpower_cost) {

		Double total_markup_cost = (double) 0;
		Double other_cost = (double) 0;
		for (Rampups currentRampups : bizcase.getRampups()) {

			Integer count = currentRampups.getProperties().stream()
					.filter(propertiy -> year.equals(propertiy.getYear()))
					.mapToInt(propertiy -> Integer.parseInt(propertiy.getProperty_value() + 0)).sum() / 10;

			Properties per_cost = bizcase.getManpower_requirements().get(1).getProperties().stream()
					.filter(properties -> properties.getProperty_name().equals(currentRampups.getLevel())).findAny()
					.orElse(null);

			Integer thirdparty_cost = bizcase.getThirdparty_cost().stream()
					.filter(propertiy -> year.equals(propertiy.getBusiness_year()))
					.mapToInt(propertiy -> Integer.parseInt(propertiy.getCost())).sum();

			Double cost_per_person_value = bizcase.getManpower_hiringcost().get(1).getProperties().stream()
					.filter(properties -> properties.getProperty_name().equals(currentRampups.getLevel()))
					.mapToDouble(properties -> Double.parseDouble(properties.getProperty_value())).sum();

			Double other_current_hiring_value = bizcase.getManpower_hiringcost().get(2).getProperties().stream()
					.filter(property -> property.getProperty_name().equals(currentRampups.getLevel())
							&& !property.getProperty_value().isEmpty())
					.mapToDouble(property -> Double.parseDouble(property.getProperty_value())).sum();

			if (per_cost != null) {

				Double hiring_cost = (cost_per_person_value / 100
						* (count * Integer.parseInt(per_cost.getProperty_value())) + other_current_hiring_value);

				man_power_hiring_cost += count * Integer.parseInt(per_cost.getProperty_value());

				other_cost += hiring_cost + thirdparty_cost + non_manpower_cost;

			}

		}

		// Setting Default Value 13.5 for Markup Value Need to create seperate model for
		// markup value
		total_markup_cost = (double) Math.round(13.5 / 100 * (man_power_hiring_cost + other_cost));
		return total_markup_cost;

	}

	public Double bizcaseCalculateratecardamount(BusinessCaseRequest bizcase, RateCardBusinessDays rateCardBusinessDays,
			List<RateCardModel> rateCardModel, Boolean inflation) {

		Double total_rate_costDouble = (double) 0;
		for (Rampups currentrampup : bizcase.getRampups()) {

			Double hiring_cost = 0.0;
			Integer level_count = bizcase.getMan_power_count_yearly().stream()
					.filter(data -> data.getYear().equals(rateCardBusinessDays.getYear())
							&& data.getLevel().equals(currentrampup.getLevel()))
					.mapToInt(data -> data.getCount()).sum();

			Double hourly_rate = 0.0;
			if (bizcase.getRatecard_type().equalsIgnoreCase("multiple")) {
				hourly_rate = bizcase.getExistingratecard().stream()
						.filter(level_properties -> level_properties.getLevel().equals(currentrampup.getLevel())
								&& level_properties.getYear().equals(rateCardBusinessDays.getYear()))
						.mapToDouble(rate -> rate.getHourly_rate_inr()).sum();
			} else {
				hourly_rate = bizcase.getExistingratecard().stream()
						.filter(level_properties -> level_properties.getYear().equals(rateCardBusinessDays.getYear()))
						.mapToDouble(rate -> rate.getHourly_rate_inr()).sum();
			}

			if (Boolean.FALSE.equals(inflation)) {
				hourly_rate += bizcase.getRate_card_inflation() / 100 * hourly_rate;
			}

			Properties per_cost = bizcase.getManpower_hiringcost().get(3).getProperties().stream()
					.filter(properties -> properties.getProperty_name().equals(currentrampup.getLevel())).findAny()
					.orElse(null);

			Double cost_per_person_value = bizcase.getManpower_hiringcost().get(1).getProperties().stream()
					.filter(properties -> properties.getProperty_name().equals(currentrampup.getLevel()))
					.mapToDouble(properties -> Double.parseDouble(properties.getProperty_value())).sum();

			if (per_cost != null)
				hiring_cost += cost_per_person_value / 100
						* (level_count * Integer.parseInt(per_cost.getProperty_value()));
//				hiring_cost += level_count * Integer.parseInt(per_cost.getProperty_value());

			total_rate_costDouble += (level_count * (rateCardBusinessDays.getDays() * bizcase.getWorking_hours()))
					* hourly_rate;

		}
		return total_rate_costDouble;
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

	public List<BizcaseFinalChartResponse> calculateBizcaseChartReport(BusinessCaseRequest bizcasedata, String year) {

		List<BizcaseFinalChartResponse> bizcaseFinalChartResponseInfo = new ArrayList<>();
		BizcaseChartResponse bizcaseChartResponse = new BizcaseChartResponse();
		double manpowervalue = 0;
		Boolean Inflation = true;
		Boolean single_Inflation = true;
		double total_markup_cost = 0;
		double total_cost = 0;
		Double total_SLA_Payout_Cost = 0d;
		List<BizCaseOtherServiceCalcInfo> ramp_up_manpower_Infos = new ArrayList<>();
		List<NonmanpowercostInfo> nonmanpowercostInfos = new ArrayList<>();
		NonmanpowercostInfo nonmanpowercostInforesult = new NonmanpowercostInfo();

		int givenyeardays = bizcasedata.getBusiness_days().stream().filter(data -> !Objects.nonNull(data))
				.filter(bizdays -> bizdays.getYear().equalsIgnoreCase(year)).mapToInt(data1 -> data1.getDays()).sum();

		if (!bizcasedata.getBusiness_days().isEmpty()) {
			for (RateCardBusinessDays rateCardBusinessDays : bizcasedata.getBusiness_days()) {

				// Calculate Ramp up & Manpower Cost Section
				BizCaseOtherServiceCalcInfo manpower_cost_info = calculateRampupManpowerInfo(bizcasedata,
						rateCardBusinessDays);
				ramp_up_manpower_Infos.add(manpower_cost_info);

				NonmanpowercostInfo nonmanpowercostInfo = yearlynonmanpowercost(bizcasedata, rateCardBusinessDays);
				nonmanpowercostInfos.add(nonmanpowercostInfo);

				Integer SLA_other_cost = nonmanpowercostInfo.getTotal_travel_cost()
						+ nonmanpowercostInfo.getTotal_it_cost() + nonmanpowercostInfo.getTotal_facility_cost()
						+ nonmanpowercostInfo.getTotal_system_access_cost()
						+ nonmanpowercostInfo.getTotal_third_party_service()
						+ nonmanpowercostInfo.getTotal_other_cost();

				total_cost += SLA_other_cost;

				// Calculate Rate Card Cost
				Double overallratecardamount = bizcaseCalculateratecardamount(bizcasedata, rateCardBusinessDays,
						bizcasedata.getExistingratecard(), Inflation);

				if (rateCardBusinessDays.getYear().equalsIgnoreCase(year)) {
					single_Inflation = Inflation;
				}

				// Calculate SLA Payout value
				Double SLA_Payout_Cost = (double) Math.round(overallratecardamount + SLA_other_cost);
				total_SLA_Payout_Cost += SLA_Payout_Cost;

				Double markupvalue = (13.5 / 100) * SLA_Payout_Cost;
				total_markup_cost += markupvalue;

				// Change to secound Year
				Inflation = false;
			}
		}

		if (year.equalsIgnoreCase("all")) {
			manpowervalue = ramp_up_manpower_Infos.stream().flatMap(e -> e.getProperties().stream())
					.mapToDouble(properties -> Double.parseDouble(properties.getProperty_value())).sum();

			int it_cost_result = nonmanpowercostInfos.stream().mapToInt(e -> e.getTotal_it_cost()).sum();
			int facility_result = nonmanpowercostInfos.stream().mapToInt(e -> e.getTotal_facility_cost()).sum();
			int system_result = nonmanpowercostInfos.stream().mapToInt(e -> e.getTotal_system_access_cost()).sum();
			int thirdparty_cost__result = nonmanpowercostInfos.stream().mapToInt(e -> e.getTotal_third_party_cost())
					.sum();
			int thirdparty_service_result = nonmanpowercostInfos.stream()
					.mapToInt(e -> e.getTotal_third_party_service()).sum();
			int other_result = nonmanpowercostInfos.stream().mapToInt(e -> e.getTotal_other_cost()).sum();
			int travel_result = nonmanpowercostInfos.stream().mapToInt(e -> e.getTotal_travel_cost()).sum();

			nonmanpowercostInforesult.setTotal_it_cost(it_cost_result);
			nonmanpowercostInforesult.setTotal_facility_cost(facility_result);
			nonmanpowercostInforesult.setTotal_system_access_cost(system_result);
			nonmanpowercostInforesult.setTotal_other_cost(other_result);
			nonmanpowercostInforesult.setTotal_third_party_cost(thirdparty_cost__result);
			nonmanpowercostInforesult.setTotal_third_party_service(thirdparty_service_result);
			nonmanpowercostInforesult.setTotal_travel_cost(travel_result);

			bizcaseChartResponse.setManpower_cost_info(manpowervalue);
			bizcaseChartResponse.setNonmanpowercostInfo(nonmanpowercostInforesult);
			bizcaseChartResponse.setTotalmarkup_cost(total_markup_cost);
			bizcaseChartResponse.setTotal_slapayout_cost(total_SLA_Payout_Cost);
			bizcaseChartResponse.setTotal_cost(total_cost);

			bizcaseFinalChartResponseInfo = createBizcaseFinalResponse(bizcaseChartResponse);
			return bizcaseFinalChartResponseInfo;
		}

		// for the single given year record
		else {
			manpowervalue = ramp_up_manpower_Infos.stream().flatMap(e -> e.getProperties().stream())
					.filter(propertyyear -> propertyyear.getYear().equalsIgnoreCase(year))
					.mapToDouble(properties -> Double.parseDouble(properties.getProperty_value())).sum();

			NonmanpowercostInfo nonmanpowercostInfo = givenyearnonmanpowercost(bizcasedata, year);

			Integer SLA_other_cost = nonmanpowercostInfo.getTotal_travel_cost() + nonmanpowercostInfo.getTotal_it_cost()
					+ nonmanpowercostInfo.getTotal_facility_cost() + nonmanpowercostInfo.getTotal_system_access_cost()
					+ nonmanpowercostInfo.getTotal_third_party_service() + nonmanpowercostInfo.getTotal_other_cost();

			// Calculate Rate Card Cost
			Double overallratecardamount = bizcaseCalculategivenyearratecardamount(bizcasedata, year, givenyeardays,
					single_Inflation);

			// Calculate SLA Payout value
			Double SLA_Payout_Cost = (double) Math.round(overallratecardamount + SLA_other_cost);

			// Calculate Markup Value for Single given year
			Double markupvalue = (13.5 / 100) * SLA_Payout_Cost;

			bizcaseChartResponse.setManpower_cost_info(manpowervalue);
			bizcaseChartResponse.setNonmanpowercostInfo(nonmanpowercostInfo);
			bizcaseChartResponse.setTotalmarkup_cost(markupvalue);
			bizcaseChartResponse.setTotal_slapayout_cost(SLA_Payout_Cost);
			bizcaseChartResponse.setTotal_cost(SLA_other_cost);

			bizcaseFinalChartResponseInfo = createBizcaseFinalResponse(bizcaseChartResponse);
			return bizcaseFinalChartResponseInfo;
		}

	}

	private List<BizcaseFinalChartResponse> createBizcaseFinalResponse(BizcaseChartResponse bizcaseChartResponse) {

		List<BizcaseFinalChartResponse> bizcaseFinalChartResponseResult = new ArrayList<>();

		BizcaseFinalChartResponse bizcaseManpowerFinalChartResponse = new BizcaseFinalChartResponse();
		bizcaseManpowerFinalChartResponse.setName("manpower_cost_info");
		double[] valuerespose = new double[2];
		valuerespose[0] = 0;
		valuerespose[1] = bizcaseChartResponse.getManpower_cost_info();

		double manpower_value = valuerespose[0] + valuerespose[1];

		bizcaseManpowerFinalChartResponse.setLabel(manpower_value);
		bizcaseManpowerFinalChartResponse.setValue(valuerespose);

		BizcaseFinalChartResponse bizcaseitcostFinalChartResponse = new BizcaseFinalChartResponse();
		bizcaseitcostFinalChartResponse.setName("total_it_cost");
		double[] itcostrespose = new double[2];
		itcostrespose[0] = valuerespose[1];
		itcostrespose[1] = (double) bizcaseChartResponse.getNonmanpowercostInfo().getTotal_it_cost();
		setbizcaseitcostFinalChartResponse(bizcaseChartResponse, bizcaseitcostFinalChartResponse, itcostrespose);

		BizcaseFinalChartResponse bizcasefacilitycostFinalChartResponse = new BizcaseFinalChartResponse();
		bizcasefacilitycostFinalChartResponse.setName("total_facility_cost");
		double[] facility_costrespose = new double[2];
		facility_costrespose[0] = itcostrespose[1];
		facility_costrespose[1] = (double) bizcaseChartResponse.getNonmanpowercostInfo().getTotal_facility_cost();
		setbizcaseitcostFinalChartResponse(bizcaseChartResponse, bizcasefacilitycostFinalChartResponse,
				facility_costrespose);

		BizcaseFinalChartResponse bizcasesystemFinalChartResponse = new BizcaseFinalChartResponse();
		bizcasesystemFinalChartResponse.setName("total_system_access_cost");
		double[] system_access_costrespose = new double[2];
		system_access_costrespose[0] = facility_costrespose[1];
		system_access_costrespose[1] = (double) bizcaseChartResponse.getNonmanpowercostInfo()
				.getTotal_system_access_cost();
		setbizcaseitcostFinalChartResponse(bizcaseChartResponse, bizcasesystemFinalChartResponse,
				system_access_costrespose);

		BizcaseFinalChartResponse bizcasethirdpartyserviceFinalChartResponse = new BizcaseFinalChartResponse();
		bizcasethirdpartyserviceFinalChartResponse.setName("total_third_party_service");
		double[] thirdparty_service_costrespose = new double[2];
		thirdparty_service_costrespose[0] = system_access_costrespose[1];
		thirdparty_service_costrespose[1] = (double) bizcaseChartResponse.getNonmanpowercostInfo()
				.getTotal_third_party_service();
		setbizcaseitcostFinalChartResponse(bizcaseChartResponse, bizcasethirdpartyserviceFinalChartResponse,
				thirdparty_service_costrespose);

		BizcaseFinalChartResponse bizcaseotherFinalChartResponse = new BizcaseFinalChartResponse();
		bizcaseotherFinalChartResponse.setName("total_other_cost");
		double[] other_costrespose = new double[2];
		other_costrespose[0] = thirdparty_service_costrespose[1];
		other_costrespose[1] = (double) bizcaseChartResponse.getNonmanpowercostInfo().getTotal_other_cost();
		setbizcaseitcostFinalChartResponse(bizcaseChartResponse, bizcaseotherFinalChartResponse, other_costrespose);

		BizcaseFinalChartResponse bizcasethirdpartycostFinalChartResponse = new BizcaseFinalChartResponse();
		bizcasethirdpartycostFinalChartResponse.setName("total_third_party_cost");
		double[] thirdparty_cost_costrespose = new double[2];
		thirdparty_cost_costrespose[0] = other_costrespose[1];
		thirdparty_cost_costrespose[1] = (double) bizcaseChartResponse.getNonmanpowercostInfo()
				.getTotal_third_party_cost();
		setbizcaseitcostFinalChartResponse(bizcaseChartResponse, bizcasethirdpartycostFinalChartResponse,
				thirdparty_cost_costrespose);

		BizcaseFinalChartResponse bizcasetravelFinalChartResponse = new BizcaseFinalChartResponse();
		bizcasetravelFinalChartResponse.setName("total_travel_cost");
		double[] travelcost_costrespose = new double[2];
		travelcost_costrespose[0] = thirdparty_cost_costrespose[1];
		travelcost_costrespose[1] = (double) bizcaseChartResponse.getNonmanpowercostInfo().getTotal_travel_cost();
		setbizcaseitcostFinalChartResponse(bizcaseChartResponse, bizcasetravelFinalChartResponse,
				travelcost_costrespose);

		BizcaseFinalChartResponse bizcasetotalcostFinalChartResponse = new BizcaseFinalChartResponse();
		bizcasetotalcostFinalChartResponse.setName("total_cost");
		bizcasetotalcostFinalChartResponse.setLabel(bizcaseChartResponse.getTotal_cost());

		BizcaseFinalChartResponse bizcaserevenuecostFinalChartResponse = new BizcaseFinalChartResponse();
		bizcaserevenuecostFinalChartResponse.setName("total_revenue");
		bizcaserevenuecostFinalChartResponse
				.setTotal_revenue(String.valueOf(bizcaseChartResponse.getTotal_slapayout_cost()));
		bizcaserevenuecostFinalChartResponse.setMarkup(String.valueOf(bizcaseChartResponse.getTotalmarkup_cost()));

		bizcaseFinalChartResponseResult.add(bizcaseManpowerFinalChartResponse);
		bizcaseFinalChartResponseResult.add(bizcaseitcostFinalChartResponse);
		bizcaseFinalChartResponseResult.add(bizcasefacilitycostFinalChartResponse);
		bizcaseFinalChartResponseResult.add(bizcasesystemFinalChartResponse);
		bizcaseFinalChartResponseResult.add(bizcasethirdpartyserviceFinalChartResponse);
		bizcaseFinalChartResponseResult.add(bizcaseotherFinalChartResponse);
		bizcaseFinalChartResponseResult.add(bizcasethirdpartycostFinalChartResponse);
		bizcaseFinalChartResponseResult.add(bizcasetravelFinalChartResponse);
		bizcaseFinalChartResponseResult.add(bizcasetotalcostFinalChartResponse);
		bizcaseFinalChartResponseResult.add(bizcaserevenuecostFinalChartResponse);
		return bizcaseFinalChartResponseResult;
	}

	private void setbizcaseitcostFinalChartResponse(BizcaseChartResponse bizcaseChartResponse,
			BizcaseFinalChartResponse bizcaseitcostFinalChartResponse, double[] valuerespose) {
		bizcaseitcostFinalChartResponse.setValue(valuerespose);
		bizcaseitcostFinalChartResponse.setLabel(valuerespose[0] + valuerespose[1]);
	}

	private Double bizcaseCalculategivenyearratecardamount(BusinessCaseRequest bizcasedata, String year,
			int givenyeardays, Boolean single_Inflation) {

		Double total_rate_costDouble = (double) 0;
		for (Rampups currentrampup : bizcasedata.getRampups()) {

			Integer level_count = bizcasedata.getMan_power_count_yearly().stream()
					.filter(data -> data.getYear().equals(year) && data.getLevel().equals(currentrampup.getLevel()))
					.mapToInt(data -> data.getCount()).sum();

			Double hourly_rate = 0.0;
			if (bizcasedata.getRatecard_type().equalsIgnoreCase("multiple")) {
				hourly_rate = bizcasedata.getExistingratecard().stream()
						.filter(level_properties -> level_properties.getLevel().equals(currentrampup.getLevel())
								&& level_properties.getYear().equals(year))
						.mapToDouble(rate -> rate.getHourly_rate_inr()).sum();
			} else {
				hourly_rate = bizcasedata.getExistingratecard().stream()
						.filter(level_properties -> level_properties.getYear().equals(year))
						.mapToDouble(rate -> rate.getHourly_rate_inr()).sum();
			}

			if (Boolean.FALSE.equals(single_Inflation)) {
				hourly_rate += bizcasedata.getRate_card_inflation() / 100 * hourly_rate;
			}

			total_rate_costDouble += (level_count * (givenyeardays * bizcasedata.getWorking_hours())) * hourly_rate;

		}
		return total_rate_costDouble;

	}

	private NonmanpowercostInfo yearlynonmanpowercost(BusinessCaseRequest bizcasedata,
			RateCardBusinessDays rateCardBusinessDays) {

		NonmanpowercostInfo nonmanpowercostInfo = new NonmanpowercostInfo();
		Integer it_cost = 0;
		Integer facility_cost = 0;
		Integer system_access_cost = 0;
		Integer third_party_service = 0;
		Integer other_cost = 0;
		Integer third_party_cost = 0;
		Integer travel_cost = 0;

		// Calculate Non ManPower Cost based Yearly

		it_cost = bizcasedata.getIt_info().stream()
				.filter(data -> data.getBusiness_year().equals(rateCardBusinessDays.getYear()))
				.mapToInt(data -> Integer.parseInt(data.getCost())).sum();

		facility_cost = bizcasedata.getFacility().stream()
				.filter(data -> data.getBusiness_year().equals(rateCardBusinessDays.getYear()))
				.mapToInt(data -> Integer.parseInt(data.getCost())).sum();

		system_access_cost = bizcasedata.getSystem_access().stream()
				.filter(data -> data.getBusiness_year().equals(rateCardBusinessDays.getYear()))
				.mapToInt(data -> Integer.parseInt(data.getCost())).sum();

		third_party_service = bizcasedata.getThirdparty_service().stream()
				.filter(data -> data.getBusiness_year().equals(rateCardBusinessDays.getYear()))
				.mapToInt(data -> Integer.parseInt(data.getCost())).sum();

		other_cost = bizcasedata.getOther_cost().stream()
				.filter(data -> data.getBusiness_year().equals(rateCardBusinessDays.getYear()))
				.mapToInt(data -> Integer.parseInt(data.getCost())).sum();

		third_party_cost = bizcasedata.getThirdparty_cost().stream()
				.filter(data -> data.getBusiness_year().equals(rateCardBusinessDays.getYear()))
				.mapToInt(data -> Integer.parseInt(data.getCost())).sum();
		travel_cost = bizcasedata.getTravel_cost().stream()
				.filter(data -> data.getBusiness_year().equals(rateCardBusinessDays.getYear()))
				.mapToInt(data -> Integer.parseInt(data.getCost())).sum();

		nonmanpowercostInfo.setTotal_it_cost(it_cost);
		nonmanpowercostInfo.setTotal_facility_cost(facility_cost);
		nonmanpowercostInfo.setTotal_system_access_cost(system_access_cost);
		nonmanpowercostInfo.setTotal_other_cost(other_cost);
		nonmanpowercostInfo.setTotal_third_party_service(third_party_service);
		nonmanpowercostInfo.setTotal_third_party_cost(third_party_cost);
		nonmanpowercostInfo.setTotal_travel_cost(travel_cost);

		return nonmanpowercostInfo;
	}

	private NonmanpowercostInfo givenyearnonmanpowercost(BusinessCaseRequest bizcasedata, String year) {

		NonmanpowercostInfo nonmanpowercostInfo = new NonmanpowercostInfo();
		Integer it_cost = 0;
		Integer facility_cost = 0;
		Integer system_access_cost = 0;
		Integer third_party_service = 0;
		Integer other_cost = 0;
		Integer third_party_cost = 0;
		Integer travel_cost = 0;

		// Calculate Non ManPower Cost based Yearly

		it_cost = bizcasedata.getIt_info().stream().filter(data -> data.getBusiness_year().equals(year))
				.mapToInt(data -> Integer.parseInt(data.getCost())).sum();

		facility_cost = bizcasedata.getFacility().stream().filter(data -> data.getBusiness_year().equals(year))
				.mapToInt(data -> Integer.parseInt(data.getCost())).sum();

		system_access_cost = bizcasedata.getSystem_access().stream()
				.filter(data -> data.getBusiness_year().equals(year)).mapToInt(data -> Integer.parseInt(data.getCost()))
				.sum();

		third_party_service = bizcasedata.getThirdparty_service().stream()
				.filter(data -> data.getBusiness_year().equals(year)).mapToInt(data -> Integer.parseInt(data.getCost()))
				.sum();

		other_cost = bizcasedata.getOther_cost().stream().filter(data -> data.getBusiness_year().equals(year))
				.mapToInt(data -> Integer.parseInt(data.getCost())).sum();

		third_party_cost = bizcasedata.getThirdparty_cost().stream()
				.filter(data -> data.getBusiness_year().equals(year)).mapToInt(data -> Integer.parseInt(data.getCost()))
				.sum();
		travel_cost = bizcasedata.getTravel_cost().stream().filter(data -> data.getBusiness_year().equals(year))
				.mapToInt(data -> Integer.parseInt(data.getCost())).sum();

		nonmanpowercostInfo.setTotal_it_cost(it_cost);
		nonmanpowercostInfo.setTotal_facility_cost(facility_cost);
		nonmanpowercostInfo.setTotal_system_access_cost(system_access_cost);
		nonmanpowercostInfo.setTotal_other_cost(other_cost);
		nonmanpowercostInfo.setTotal_third_party_service(third_party_service);
		nonmanpowercostInfo.setTotal_third_party_cost(third_party_cost);
		nonmanpowercostInfo.setTotal_travel_cost(travel_cost);

		return nonmanpowercostInfo;
	}

}

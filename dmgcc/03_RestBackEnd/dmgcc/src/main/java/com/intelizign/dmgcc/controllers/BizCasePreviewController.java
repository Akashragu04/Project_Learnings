package com.intelizign.dmgcc.controllers;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.validation.Valid;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.intelizign.dmgcc.models.CostCenterModel;
import com.intelizign.dmgcc.models.LeadConversionModel;
import com.intelizign.dmgcc.models.businesscasemodels.BizCaseRateCardModel;
import com.intelizign.dmgcc.models.businesscasemodels.BusinessCaseRequest;
import com.intelizign.dmgcc.models.othermaster.RateCardModel;
import com.intelizign.dmgcc.pojoclass.bizcase.BizCaseManPowerYearlyInfo;
import com.intelizign.dmgcc.pojoclass.bizcase.BizCaseReport;
import com.intelizign.dmgcc.pojoclass.bizcase.BizRateCardYearlyBasedCalculation;
import com.intelizign.dmgcc.pojoclass.bizcase.BizRateCardYearlyBasedCalculation.Level_Properties;
import com.intelizign.dmgcc.pojoclass.bizcase.BizRateCardYearlyBasedCalculation.Level_Properties.Hourly_Rate;
import com.intelizign.dmgcc.repositories.BizCaseRequestRepository;
import com.intelizign.dmgcc.repositories.CostCenterRepository;
import com.intelizign.dmgcc.repositories.LeadBusinessRepository;
import com.intelizign.dmgcc.repositories.LeadConversionRepository;
import com.intelizign.dmgcc.repositories.RateCardRepository;
import com.intelizign.dmgcc.request.bizcase.BizCasePreviewSaveRequest;
import com.intelizign.dmgcc.response.ManPowerRamupIteration;
import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.response.othermaster.BizcaseFinalChartResponse;
import com.intelizign.dmgcc.services.AuditingReport;
import com.intelizign.dmgcc.services.BizCaseExistingRateCard;
import com.intelizign.dmgcc.services.BizCaseRateCardCalculationService;

@RestController
@RequestMapping("/bizpreview")
public class BizCasePreviewController {

	@Autowired
	private BizCaseRequestRepository bizcasereqrepo;

	@Autowired
	private BizCaseRateCardCalculationService ratecardServices;

	@Autowired
	private LeadConversionRepository leadConversionRepository;

	@Autowired
	private LeadBusinessRepository leadreq_repository;

	@Autowired
	private RateCardRepository rateCardRepository;

	@Autowired
	private CostCenterRepository costCenterRepository;

	@Autowired
	private BizCaseExistingRateCard bizCaseExistingRateCardServices;

	@Autowired
	private AuditingReport auditingReport;

	@Autowired
	private Environment env;

	public final Logger LOGGER = LogManager.getLogger(BizCasePreviewController.class);

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public Map<String, String> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
		Map<String, String> errors = new HashMap<>();
		ex.getBindingResult().getFieldErrors()
				.forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));

		return errors;
	}

	@GetMapping("/getratecardreport/{biz_id}")
	public ResponseEntity<Object> getRatecardReportInformation(@PathVariable(value = "biz_id") Long biz_id) {
		try {
			return bizcasereqrepo.findById(biz_id).map(requestData -> {

				if (requestData.getBusiness_availability().equalsIgnoreCase("without_rate"))
					return ResponseHandler.generateResponse("Business Case Rate Card Report", true, HttpStatus.OK,
							requestData.getBizcasereport());
				else if (requestData.getBusiness_availability().equals("with_rate")) {
					// Generate Report

					List<BizCaseManPowerYearlyInfo> man_power_count_yearly = bizCaseExistingRateCardServices
							.calculatTotalYearBasedManpower(requestData, requestData.getBusiness_days());
					requestData.setMan_power_count_yearly(man_power_count_yearly);

					BizCaseReport bizcasereport = bizCaseExistingRateCardServices
							.CalculateMultipleRateCard(requestData);
					if (bizcasereport == null)
						return ResponseHandler.generateResponse(
								"Please get approval from Finance Team to view Business Case", false, HttpStatus.OK,
								null);
					requestData.setBizcasereport(bizcasereport);
					bizcasereqrepo.save(requestData);
					return ResponseHandler.generateResponse("Business Case Rate Card Report", true, HttpStatus.OK,
							requestData.getBizcasereport());
				} else {
					return ResponseHandler.generateResponse("Please select Rate Type in Business Case Requirement",
							false, HttpStatus.OK, null);
				}

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: " + biz_id + " BizCaseID Doesn't exist");
				return ResponseHandler.generateResponse(" BizCaseID Doesn't exist", false, HttpStatus.OK, null);
			});
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while " + e);
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					e.getStackTrace());
		}
	}

	@PutMapping("/save/{biz_id}")
	public ResponseEntity<Object> updateBusinessCase(@PathVariable(value = "biz_id") Long biz_id,
			@Valid @RequestBody BizCasePreviewSaveRequest bizcasesavedata) {
		try {
			return bizcasereqrepo.findById(biz_id).map(bizcasedata -> {

				bizcasedata.setBusiness_case_start_date(bizcasesavedata.getBusiness_case_start_date());
				bizcasedata.setBusiness_case_end_date(bizcasesavedata.getBusiness_case_end_date());
				bizcasedata.setManpower_requirements(bizcasesavedata.getManpower_requirements());
				bizcasedata.setManpower_hiringcost(bizcasesavedata.getManpower_hiringcost());
				bizcasedata.setRampups(bizcasesavedata.getRampups());
				bizcasedata.setCustomer_rampdown(bizcasesavedata.getCustomer_rampdown());
				bizcasedata.setRate_card_inflation(bizcasesavedata.getRate_card_inflation());
				bizcasedata.setIs_customer_rampdown(bizcasesavedata.getIs_customer_rampdown());

				BusinessCaseRequest bizcaseupdateddata = bizcasereqrepo.save(bizcasedata);

				if (bizcaseupdateddata.getBusiness_availability().equalsIgnoreCase("without_rate")) {
					// Calculate F&C Rate Card Information
					ratecardServices.rateCardCalculation(bizcasedata);

					BizCaseRateCardModel bizCaseRateCardModel = bizcasedata.getNewratecard();

					bizCaseRateCardModel.setInflation_value(bizcasesavedata.getRate_card_inflation());
					bizCaseRateCardModel.setManpower_inflation(bizcasesavedata.getMan_power_inflation());

					Double markup_cost = bizCaseRateCardModel.getMarkup_value() / 100
							* (bizCaseRateCardModel.getManpower_total_cost()
									+ bizCaseRateCardModel.getNon_manpower_total_cost());
					Double fix_factor_cost = bizCaseRateCardModel.getFx_risk() / 100
							* (bizCaseRateCardModel.getManpower_total_cost()
									+ bizCaseRateCardModel.getNon_manpower_total_cost() + markup_cost);
					Double wht_cost = bizCaseRateCardModel.getWht_value() / 100
							* (bizCaseRateCardModel.getManpower_total_cost()
									+ bizCaseRateCardModel.getNon_manpower_total_cost() + markup_cost
									+ fix_factor_cost);
					bizCaseRateCardModel.setTotal_markup_value(markup_cost);
					bizCaseRateCardModel.setTotal_fx_risk(fix_factor_cost);
					bizCaseRateCardModel.setTotal_wht_value(wht_cost);
					bizCaseRateCardModel.setTotal_yearly_cost(bizCaseRateCardModel.getManpower_total_cost()
							+ bizCaseRateCardModel.getNon_manpower_total_cost() + fix_factor_cost + wht_cost);

					// Calculate Latest Rate Card Information
					if (bizCaseRateCardModel.getRate_card_type().equalsIgnoreCase("multiple"))
						ratecardServices.updateMultipleRateCard(bizCaseRateCardModel, bizCaseRateCardModel);
					else
						ratecardServices.updateSingleRateCard(bizCaseRateCardModel, bizCaseRateCardModel);
				} else if (bizcaseupdateddata.getBusiness_availability().equals("with_rate")) {

					if (bizcaseupdateddata.getMan_power_count_yearly() != null) {
						List<BizCaseManPowerYearlyInfo> man_power_count_yearly = bizCaseExistingRateCardServices
								.calculatTotalYearBasedManpower(bizcaseupdateddata,
										bizcaseupdateddata.getBusiness_days());
						bizcaseupdateddata.setMan_power_count_yearly(man_power_count_yearly);
					}

					BizCaseReport bizcasereport = bizCaseExistingRateCardServices
							.CalculateMultipleRateCard(bizcaseupdateddata);

					bizcaseupdateddata.setBizcasereport(bizcasereport);
					bizcasereqrepo.save(bizcaseupdateddata);

				} else {
					return ResponseHandler.generateResponse("Please select Rate Type in Business Case Requirement",
							false, HttpStatus.OK, null);
				}
				return ResponseHandler.generateResponse("Business Case Updated", true, HttpStatus.OK,
						bizcaseupdateddata);

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: " + biz_id + " BizCaseID Doesn't exist");
				return ResponseHandler.generateResponse(" BizCaseID Doesn't exist", false, HttpStatus.OK, null);
			});
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get by bizcase_id: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	@GetMapping("/getiterationlist/{biz_id}")
	public ResponseEntity<Object> getIterationlevel(@PathVariable Long biz_id) {
		try {
			return auditingReport.findBizCasePreviewIterationReport(biz_id);

		} catch (Exception e) {
			return ResponseHandler.generateResponse(e.getMessage(), false, HttpStatus.OK, null);
		}
	}

	@GetMapping("/getiterationreport/{biz_id}/{iteration_id}")
	public ResponseEntity<Object> getIterationlevel(@PathVariable Long biz_id, @PathVariable int iteration_id) {
		try {
			return auditingReport.findIterationbizcaseReport(biz_id, iteration_id);

		} catch (Exception e) {
			return ResponseHandler.generateResponse(e.getMessage(), false, HttpStatus.OK, null);
		}
	}

	@PutMapping("/saveactiveiteration/{biz_id}/{iteration_id}")
	public ResponseEntity<Object> saveActiveIteration(@PathVariable Long biz_id, @PathVariable int iteration_id) {
		try {
			ManPowerRamupIteration manPowerRamupIteration = auditingReport.findActiveIterationbizcase(biz_id,
					iteration_id);
			if (manPowerRamupIteration == null) {
				LOGGER.error("Exceptions happen!: Invalid Iteration");
				return ResponseHandler.generateResponse("Invalid Iteration ID, Please check again", false,
						HttpStatus.OK, null);
			}
			return bizcasereqrepo.findById(biz_id).map(bizcasedata -> {

				bizcasedata.setBusiness_case_start_date(manPowerRamupIteration.getBusiness_case_start_date());
				bizcasedata.setBusiness_case_end_date(manPowerRamupIteration.getBusiness_case_end_date());
				bizcasedata.setManpower_requirements(manPowerRamupIteration.getManpower_requirements());
				bizcasedata.setManpower_hiringcost(manPowerRamupIteration.getManpower_hiringcost());
				bizcasedata.setRampups(manPowerRamupIteration.getManpower_Rampups());
				bizcasedata.setCustomer_rampdown(manPowerRamupIteration.getCustomer_rampdown());
				bizcasedata.setRate_card_inflation(manPowerRamupIteration.getRate_card_inflation());
				bizcasedata.setManpower_inflation(manPowerRamupIteration.getManpower_inflation());
				bizcasedata.setIs_customer_rampdown(manPowerRamupIteration.getIs_customer_rampdown());

				bizcasedata.setApprove_enable(true);
				// Calculate F&C Rate Card Information
				ratecardServices.rateCardCalculation(bizcasedata);

				BizCaseRateCardModel bizCaseRateCardModel = bizcasedata.getNewratecard();

				bizCaseRateCardModel.setInflation_value(manPowerRamupIteration.getRate_card_inflation());

				Double markup_cost = bizCaseRateCardModel.getMarkup_value() / 100
						* (bizCaseRateCardModel.getManpower_total_cost()
								+ bizCaseRateCardModel.getNon_manpower_total_cost());
				Double fix_factor_cost = bizCaseRateCardModel.getFx_risk() / 100
						* (bizCaseRateCardModel.getManpower_total_cost()
								+ bizCaseRateCardModel.getNon_manpower_total_cost() + markup_cost);
				Double wht_cost = bizCaseRateCardModel.getWht_value() / 100
						* (bizCaseRateCardModel.getManpower_total_cost()
								+ bizCaseRateCardModel.getNon_manpower_total_cost() + markup_cost + fix_factor_cost);
				bizCaseRateCardModel.setTotal_markup_value(markup_cost);
				bizCaseRateCardModel.setTotal_fx_risk(fix_factor_cost);
				bizCaseRateCardModel.setTotal_wht_value(wht_cost);
				bizCaseRateCardModel.setTotal_yearly_cost(bizCaseRateCardModel.getManpower_total_cost()
						+ bizCaseRateCardModel.getNon_manpower_total_cost() + fix_factor_cost + wht_cost);

				// Calculate Latest Rate Card Information
				if (bizCaseRateCardModel.getRate_card_type().equalsIgnoreCase("multiple"))
					ratecardServices.updateMultipleRateCard(bizCaseRateCardModel, bizCaseRateCardModel);
				else
					ratecardServices.updateSingleRateCard(bizCaseRateCardModel, bizCaseRateCardModel);

				bizcasedata.setApproved_provider_Shortid(bizcasedata.getLead().getService_provider_short_id());
				bizcasedata.setApproved_receiver_Shortid(bizcasedata.getLead().getService_receiver_short_id());
				bizcasedata.setService_provider_approve(false);
				bizcasedata.setService_receiver_approve(false);
				bizcasedata.setProject_name(bizcasedata.getLead().getProject_name());
				bizcasedata.setActive(true);
				bizcasedata.setOverall_status(false);
				bizcasedata.setStatus("Pending For Approval");
				bizcasedata.setCostcenter(bizcasedata.getLead().getService_provider_cost_center());

				long delay_count = ChronoUnit.DAYS.between(bizcasedata.getLead().getCreate_date(),
						LocalDateTime.now(ZoneId.of(env.getProperty("spring.app.timezone"))));

				List<LeadConversionModel> findConversionModel = leadConversionRepository
						.findByLeadIdAndConversionPeriod(bizcasedata.getLead().getId(), "IL1 - IL2");

				if (findConversionModel.isEmpty()) {
					LeadConversionModel leadConversionModel = new LeadConversionModel();
					leadConversionModel.setLevel_start_date(bizcasedata.getLead().getCreate_date());
					leadConversionModel
							.setLevel_end_date(LocalDateTime.now(ZoneId.of(env.getProperty("spring.app.timezone"))));
					leadConversionModel.setDelay_days(delay_count);
					leadConversionModel.setConversion_period("IL1 - IL2");
					if (delay_count <= 5 && delay_count >= 0)
						leadConversionModel.setColour("rgb(0, 150, 30)");
					else if (delay_count <= 10 && delay_count >= 6)
						leadConversionModel.setColour("rgb(255, 205, 86)");
					else if (delay_count > 10)
						leadConversionModel.setColour("rgb(255, 99, 132)");
					else
						LOGGER.error("Exceptions happen!: Invalid Range: Days " + delay_count);
					leadConversionModel.setLead(bizcasedata.getLead());
					leadConversionRepository.save(leadConversionModel);

				}

				bizcasedata.getLead().setCategory_status("not approve");
				bizcasedata.getLead()
						.setCreate_date(LocalDateTime.now(ZoneId.of(env.getProperty("spring.app.timezone"))));
				leadreq_repository.save(bizcasedata.getLead());

				// Find the Rate Card Information
				Optional<CostCenterModel> costcenterOptional = costCenterRepository
						.findByCostcenter(bizcasedata.getCostcenter());
				if (costcenterOptional.isPresent()) {
					List<RateCardModel> rateCardModels = new ArrayList<>();
					List<BizRateCardYearlyBasedCalculation> bizRateCardYearlyBasedCalculations = bizcasedata
							.getNewratecard().getYearlybasedcalculations();
					if (bizcasedata.getBusiness_availability().equals("without_rate")
							&& bizCaseRateCardModel.getRate_card_type().equalsIgnoreCase("multiple")) {
						for (BizRateCardYearlyBasedCalculation currentyear : bizRateCardYearlyBasedCalculations) {
							for (Level_Properties currentlevel : currentyear.getLevel_properties()) {
								RateCardModel rateCardModel = new RateCardModel();
								rateCardModel.setHourly_description(bizcasedata.getProject_name());
								rateCardModel.setLevel(currentlevel.getLevel());
								rateCardModel.setYear(currentyear.getYear());
								rateCardModel.setCostcenter(costcenterOptional.get());
								for (Hourly_Rate hourly_rate : currentlevel.getHourly_rate()) {
									if (hourly_rate.getRate().equals("INR"))
										rateCardModel.setHourly_rate_inr(hourly_rate.getPrice());
									else if (hourly_rate.getRate().equals("EUR"))
										rateCardModel.setHourly_rate_ero(hourly_rate.getPrice());
									else if (hourly_rate.getRate().equals("USD"))
										rateCardModel.setHourly_rate_usd(hourly_rate.getPrice());

								}
								rateCardModels.add(rateCardModel);
							}

						}
						rateCardRepository.saveAll(rateCardModels);
					}

					else if (bizcasedata.getBusiness_availability().equals("without_rate")
							&& bizCaseRateCardModel.getRate_card_type().equalsIgnoreCase("single")) {
						for (BizRateCardYearlyBasedCalculation currentyear : bizRateCardYearlyBasedCalculations) {
							RateCardModel rateCardModel = new RateCardModel();
							rateCardModel.setHourly_description(bizcasedata.getProject_name());
							rateCardModel.setLevel(currentyear.getLevel_properties().get(0).getLevel());
							rateCardModel.setYear(currentyear.getYear());
							rateCardModel.setCostcenter(costcenterOptional.get());
							for (Hourly_Rate hourly_rate : currentyear.getLevel_properties().get(0).getHourly_rate()) {
								if (hourly_rate.getRate().equals("INR"))
									rateCardModel.setHourly_rate_inr(hourly_rate.getPrice());
								else if (hourly_rate.getRate().equals("EUR"))
									rateCardModel.setHourly_rate_ero(hourly_rate.getPrice());
								else if (hourly_rate.getRate().equals("USD"))
									rateCardModel.setHourly_rate_usd(hourly_rate.getPrice());

							}
							rateCardModels.add(rateCardModel);
						}

						rateCardRepository.saveAll(rateCardModels);
					}

					BusinessCaseRequest bizcaseupdateddata = bizcasereqrepo.save(bizcasedata);

					return ResponseHandler.generateResponse("Business Case Updated", true, HttpStatus.OK,
							bizcaseupdateddata);
				} else {

					LOGGER.error("Exceptions happen!: " + bizcasedata.getCostcenter() + " Cost Center doesn't Exists");
					return ResponseHandler.generateResponse("Cost Center doesn't exist", false, HttpStatus.OK, null);
				}

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: " + biz_id + " BizCaseID Doesn't exist");
				return ResponseHandler.generateResponse(" BizCaseID Doesn't exist", false, HttpStatus.OK, null);
			});
		} catch (Exception e) {
			return ResponseHandler.generateResponse(e.getMessage(), false, HttpStatus.OK, null);
		}
	}

	@GetMapping("/bizcasechartreport")
	public ResponseEntity<Object> getBizcaseChartReport(@RequestParam(required = true) Long biz_id,
			@RequestParam(required = true) String year) {
		try {

			Optional<BusinessCaseRequest> bizdata = bizcasereqrepo.findById(biz_id);

			if (bizdata.isPresent()) {
				List<BizcaseFinalChartResponse> bizcaseChartResponse = bizCaseExistingRateCardServices
						.calculateBizcaseChartReport(bizdata.get(), year);
				LOGGER.error(" bizcasechart report retreived Successfully ");
				return ResponseHandler.generateResponse(" bizcasechart report retreived Successfully ", true,
						HttpStatus.OK, bizcaseChartResponse);
			} else {
				LOGGER.error("Exceptions happen!: while getting bizcasechart report  ");
				return ResponseHandler.generateResponse("Exceptions happen!: while getting bizcasechart report  ",
						false, HttpStatus.OK, null);
			}
		} catch (Exception e) {
			LOGGER.error("Exceptions happen!: while getting bizcasechart report  ");
			return ResponseHandler.generateResponse("Exceptions happen!: while getting bizcasechart report  ", false,
					HttpStatus.OK, null);
		}
	}

}

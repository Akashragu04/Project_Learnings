package com.intelizign.dmgcc.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.intelizign.dmgcc.authendication.AzureUserInfo;
import com.intelizign.dmgcc.authendication.UserDetailsImpl;
import com.intelizign.dmgcc.models.G3CEmployeeMasterModel;
import com.intelizign.dmgcc.models.LeadRequestModel;
import com.intelizign.dmgcc.models.businesscasemodels.BizCaseRateCardModel;
import com.intelizign.dmgcc.notification.NotificationServices;
import com.intelizign.dmgcc.repositories.BizCaseRateCardRepository;
import com.intelizign.dmgcc.repositories.BizCaseRequestRepository;
import com.intelizign.dmgcc.repositories.G3CEmployeeRepository;
import com.intelizign.dmgcc.repositories.LeadBusinessRepository;
import com.intelizign.dmgcc.repositories.NotificationRepository;
import com.intelizign.dmgcc.response.G3CResponse;
import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.services.BizCaseRateCardCalculationService;
import com.intelizign.dmgcc.services.EmailServiceImpl;

@RestController
@RequestMapping("/bizratecard")
public class BizCaseRateCardController {

	@Autowired
	SimpMessagingTemplate template;

	@Autowired
	private Environment env;

	@Autowired
	private BizCaseRequestRepository bizcasereqrepo;

	@Autowired
	private LeadBusinessRepository leadBusinessRepository;

	@Autowired
	private BizCaseRateCardRepository rateCardRepository;

	@Autowired
	private G3CEmployeeRepository g3cEmployeeRepository;

	@Autowired
	private BizCaseRateCardCalculationService ratecardServices;

	@Autowired
	private NotificationRepository notificationRepository;

	@Autowired
	private EmailServiceImpl emailService;

	@Autowired
	private AzureUserInfo azureUserInfo;

	@Autowired
	private NotificationServices notificationServices;

	public final Logger LOGGER = LogManager.getLogger(BizCaseRateCardController.class);

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public Map<String, String> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
		Map<String, String> errors = new HashMap<>();
		ex.getBindingResult().getFieldErrors()
				.forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));

		return errors;
	}

	@GetMapping("")
	public ResponseEntity<Object> findAllBizCaseRequest(@RequestParam String Searchkeyword,
			@PageableDefault(size = 10, page = 0, sort = "id", direction = Direction.DESC) Pageable pageable,
			Authentication authentication) {
		try {

			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
			;
			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);
			switch (userDetails.getRolename()) {
			case "ADMIN":

				Page<LeadRequestModel> allleadrequest = leadBusinessRepository.findbyBizRateCardForAdmin(Searchkeyword,
						pageable);
				return ResponseHandler.generateResponse("List of Lead Request", true, HttpStatus.OK, allleadrequest);
			case "BUSINESS", "FINANCE":
				Page<LeadRequestModel> leadrequest = leadBusinessRepository
						.findbyBizRateCardForBusinessOrFinance(Searchkeyword, userDetails.getShortid(), pageable);
				return ResponseHandler.generateResponse("List of Lead Request", true, HttpStatus.OK, leadrequest);

			default:
				LOGGER.error("User doesn't have the access ");
				return ResponseHandler.generateResponse("User doesn't have the access", true, HttpStatus.OK, null);

			}

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while getall:" + e.getMessage());
			return ResponseHandler.generateResponse(e.getMessage(), false, HttpStatus.OK, null);
		}

	}

	@GetMapping("/getratecard/{biz_id}")
	public ResponseEntity<Object> getRatecardInformation(@PathVariable(value = "biz_id") Long biz_id) {
		try {
			return bizcasereqrepo.findById(biz_id).map(requestData -> {

				BizCaseRateCardModel savedBizCaseRateCardModel = ratecardServices.rateCardCalculation(requestData);
				return ResponseHandler.generateResponse("Rate Card Information", true, HttpStatus.OK,
						savedBizCaseRateCardModel);

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

	@PutMapping("/updaterateinfo/{ratecard_id}")
	public ResponseEntity<Object> updateRateCardInformation(@PathVariable(value = "ratecard_id") Long ratecard_id,
			@RequestBody BizCaseRateCardModel bizCaseRateCardModel, Authentication authentication) {
		try {

			return rateCardRepository.findById(ratecard_id).map(ratecardinfo -> {
				UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

				if (!ratecardinfo.getBizcase().getLead().getCategory_status().equalsIgnoreCase("approved"))
					ratecardinfo.getBizcase().getLead().setCategory_status("Rate Card Created");

				ratecardinfo.setBusiness_days(bizCaseRateCardModel.getBusiness_days());
				ratecardinfo.setFinance_manpower_cost(bizCaseRateCardModel.getFinance_manpower_cost());
				ratecardinfo.setBizfacility(bizCaseRateCardModel.getBizfacility());
				ratecardinfo.setBizit_info(bizCaseRateCardModel.getBizit_info());
				ratecardinfo.setBizother_cost(bizCaseRateCardModel.getBizother_cost());
				ratecardinfo.setBizsystem_access(bizCaseRateCardModel.getBizsystem_access());
				ratecardinfo.setBizthirdparty_cost(bizCaseRateCardModel.getBizthirdparty_cost());
				ratecardinfo.setBizthirdparty_service(bizCaseRateCardModel.getBizthirdparty_service());
				ratecardinfo.setBiztravel_cost(bizCaseRateCardModel.getBiztravel_cost());
				ratecardinfo.setManpower_inflation(bizCaseRateCardModel.getManpower_inflation());
				ratecardinfo.setOther_costs(bizCaseRateCardModel.getOther_costs());
				ratecardinfo.setMarkup_value(bizCaseRateCardModel.getMarkup_value());
				ratecardinfo.setFx_risk(bizCaseRateCardModel.getFx_risk());
				ratecardinfo.setWht_value(bizCaseRateCardModel.getWht_value());
				ratecardinfo.setInflation_value(bizCaseRateCardModel.getInflation_value());
				ratecardinfo.setTotal_other_cost(bizCaseRateCardModel.getOther_costs().stream()
						.mapToInt(data -> Integer.parseInt(data.getCost())).sum());

				Double markup_cost = bizCaseRateCardModel.getMarkup_value() / 100
						* (bizCaseRateCardModel.getManpower_total_cost()
								+ bizCaseRateCardModel.getNon_manpower_total_cost());
				Double fix_factor_cost = bizCaseRateCardModel.getFx_risk() / 100
						* (bizCaseRateCardModel.getManpower_total_cost()
								+ bizCaseRateCardModel.getNon_manpower_total_cost() + markup_cost);
				Double wht_cost = bizCaseRateCardModel.getWht_value() / 100
						* (bizCaseRateCardModel.getManpower_total_cost()
								+ bizCaseRateCardModel.getNon_manpower_total_cost() + markup_cost + fix_factor_cost);

				ratecardinfo.setTotal_markup_value(markup_cost);
				ratecardinfo.setTotal_fx_risk(fix_factor_cost);
				ratecardinfo.setTotal_wht_value(wht_cost);
				ratecardinfo.setTotal_yearly_cost(bizCaseRateCardModel.getManpower_total_cost()
						+ bizCaseRateCardModel.getNon_manpower_total_cost() + fix_factor_cost + wht_cost);
				if (Boolean.TRUE.equals(bizCaseRateCardModel.getIs_existing_ratecard())) {
					rateCardRepository.save(ratecardinfo);

				} else {
					if (ratecardinfo.getRate_card_type().equalsIgnoreCase("multiple"))
						ratecardServices.updateMultipleRateCard(ratecardinfo, bizCaseRateCardModel);
					else
						ratecardServices.updateSingleRateCard(ratecardinfo, bizCaseRateCardModel);
				}

				// Sending Notifications
				String redirectUrl = env.getProperty("g3c.frontend.app") + "g3c-admin";

				notificationServices.NotificationPojo(authentication.getName(),
						ratecardinfo.getBizcase().getAssign_finance_team(),
						ratecardinfo.getBizcase().getApproved_provider_Shortid(), "Ratecard Created!",
						"business/leads-monitoring");

				Map<String, Object> bizModel = new HashMap<>();
				notificationServices.NotificationPojo(authentication.getName(), userDetails.getShortid(),
						ratecardinfo.getBizcase().getApproved_provider_Shortid(), "Ratecard Created!",
						"business/leads-monitoring");

				bizModel.put("reciverName", authentication.getName());
				bizModel.put("businessManager", ratecardinfo.getBizcase().getLead().getService_provider_contact_name());
				bizModel.put("team", ratecardinfo.getBizcase().getLead().getService_provider_department());
				bizModel.put("redirectUrl", redirectUrl);

				emailService.sendSubModelMail(ratecardinfo.getBizcase().getLead().getService_provider_email_id(),
						"G3C - " + ratecardinfo.getBizcase().getProject_name()
								+ " - Business Requirements Updated by Facility Team",
						bizModel);

				return ResponseHandler.generateResponse("Rate Card Updated Successfully", true, HttpStatus.OK, null);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: " + ratecard_id + " Rate Card ID Doesn't exist");
				return ResponseHandler.generateResponse("Rate Card ID Doesn't exist", false, HttpStatus.OK, null);
			});
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get by Rate Card ID: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	@GetMapping("/getfinancerole")
	public ResponseEntity<Object> getFinanceRole() {
		try {

			List<G3CEmployeeMasterModel> employeeinfo = g3cEmployeeRepository.findByRolename("FINANCE");
			List<G3CResponse> employeeDetails = new ArrayList<>();
			employeeinfo.stream().forEach(employee -> {
				G3CResponse response = new G3CResponse();
				response.setEmp_name(employee.getEmp_name());
				response.setShortid(employee.getShortid());
				response.setId(employee.getId());
				response.setEmail(employee.getEmail());
				response.setCost_center(employee.getCost_center());
				employeeDetails.add(response);
			});
			return ResponseHandler.generateResponse("List of Lead Request", true, HttpStatus.OK, employeeDetails);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while getall:" + e.getMessage());
			return ResponseHandler.generateResponse(e.getMessage(), false, HttpStatus.OK, null);
		}

	}

	@PostMapping("/sendmailfinance/{biz_id}")
	public ResponseEntity<Object> SendEmailToFinance(@PathVariable(value = "biz_id") Long biz_id,
			@RequestBody G3CResponse userinfo, Authentication authentication) {
		try {

			return bizcasereqrepo.findById(biz_id).map(bizcasedata -> {

				UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
				if (userDetails == null)
					return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);
				bizcasedata.setIsassignfinance(true);
				bizcasedata.setAssign_finance_team(userinfo.getShortid());
				bizcasedata.getLead().setCategory_status("Rate Card Not Available");
				// Send Email and notification

				notificationServices.NotificationPojo(userDetails.getEmp_name(), userinfo.getShortid(),
						userinfo.getShortid(), "New Business has Assigned to you", null);

				String redirectUrl = env.getProperty("g3c.frontend.app̥") + "g3c-admin";
				// mail
				Map<String, Object> finance_model = new HashMap<>();
				finance_model.put("reciverName", userinfo.getEmp_name());
				finance_model.put("projectName", bizcasedata.getProject_name());
				finance_model.put("projectcreatedBy", bizcasedata.getLead().getService_provider_contact_name());
				finance_model.put("department", bizcasedata.getLead().getService_provider_department());
				finance_model.put("redirectUrl", redirectUrl);

				emailService.sendAssignFinanceMail(userinfo.getEmail(), "G3C - " + bizcasedata.getProject_name()
						+ " - New Business Requirements Verification & Validation", finance_model);

				return ResponseHandler.generateResponse("Mail Sent Succussfully", true, HttpStatus.OK, null);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: " + biz_id + " Biz Case ID Doesn't exist");
				return ResponseHandler.generateResponse("Biz Case ID Doesn't exist", false, HttpStatus.OK, null);
			});
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while getall:" + e.getMessage());
			return ResponseHandler.generateResponse(e.getMessage(), false, HttpStatus.OK, null);
		}

	}

}

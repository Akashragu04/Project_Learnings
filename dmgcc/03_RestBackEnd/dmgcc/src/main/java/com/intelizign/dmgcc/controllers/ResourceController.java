package com.intelizign.dmgcc.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.intelizign.dmgcc.authendication.AzureUserInfo;
import com.intelizign.dmgcc.authendication.UserDetailsImpl;
import com.intelizign.dmgcc.models.CostCenterModel;
import com.intelizign.dmgcc.models.G3CEmployeeMasterModel;
import com.intelizign.dmgcc.models.JDMappingModel;
import com.intelizign.dmgcc.models.businesscasemodels.BusinessCaseRequest;
import com.intelizign.dmgcc.pojoclass.FTERequirement;
import com.intelizign.dmgcc.repositories.BizCaseRequestRepository;
import com.intelizign.dmgcc.repositories.CostCenterRepository;
import com.intelizign.dmgcc.repositories.G3CEmployeeRepository;
import com.intelizign.dmgcc.repositories.JDMappingRepository;
import com.intelizign.dmgcc.request.bizcase.Manpower_Requirements;
import com.intelizign.dmgcc.request.bizcase.Properties;
import com.intelizign.dmgcc.response.CostCenterResponse;
import com.intelizign.dmgcc.response.JDHiredResponse;
import com.intelizign.dmgcc.response.ResourceOverviewReport;
import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.services.ResourceReportOverveiwService;

@RestController
@RequestMapping("/resource")
public class ResourceController {

	@Autowired
	ServletContext context;

	@Autowired
	private CostCenterRepository costCenterRepository;

	@Autowired
	private G3CEmployeeRepository g3cEmployeeRepository;

	@Autowired
	BizCaseRequestRepository bizCaseRequestRepository;

	@Autowired
	private ResourceReportOverveiwService resourceOverveiwService;

	@Autowired
	private AzureUserInfo azureUserInfo;

	@Autowired
	JDMappingRepository jdMappingRepository;

	public final Logger LOGGER = LogManager.getLogger(ResourceController.class);

	@GetMapping("/getcostcenter")
	public ResponseEntity<Object> getCostCenterlist(HttpServletRequest request) {
		try {
			G3CEmployeeMasterModel userInfo = azureUserInfo.getUserFullInfo(request);
			if (userInfo == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);

			if (userInfo.getRolename().equalsIgnoreCase("business")) {
				Optional<CostCenterModel> costcenter = costCenterRepository.findByCostcenter(userInfo.getCost_center());
				if (costcenter.isPresent()) {
					CostCenterResponse costcenterResponse = resourceOverveiwService
							.getCostCenterResponse(costcenter.get());
					return ResponseHandler.generateResponse("List of Cost Center", true, HttpStatus.OK,
							costcenterResponse);
				} else {
					LOGGER.error("Invalid Cost Center" + userInfo.getCost_center());
					return ResponseHandler.generateResponse("Invalid Cost Center" + userInfo.getCost_center(), false,
							HttpStatus.OK, null);
				}
			} else if (userInfo.getRolename().equalsIgnoreCase("hr") || userInfo.getRolename().equalsIgnoreCase("admin")
					|| userInfo.getRolename().equalsIgnoreCase("finance")) {
				List<CostCenterModel> costcenterPage = costCenterRepository.findAll();
				List<CostCenterResponse> costcenterResponse = costcenterPage.stream()
						.map(costcenter -> resourceOverveiwService.getCostCenterResponse(costcenter))
						.collect(Collectors.toList());

				return ResponseHandler.generateResponse("List of Cost Center", true, HttpStatus.OK, costcenterResponse);
			} else {

				return ResponseHandler.generateResponse("User Doesn't have access for role: " + userInfo.getRolename(),
						false, HttpStatus.OK, null);
			}
		} catch (Exception e) {
			LOGGER.error("Internal Server Error:" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@GetMapping("/getresourcereport")
	public ResponseEntity<Object> getResourcereport(@RequestParam(value = "costcenter") String cost_center,
			Authentication authentication, Pageable pageable) {
		try {
			ResourceOverviewReport finalresponsedata = new ResourceOverviewReport();
			Integer total_FTE = 0;
			Integer total_L1 = 0;
			Integer total_L2 = 0;
			Integer total_L3 = 0;
			Integer total_L4 = 0;
			Integer total_L5 = 0;
			Integer total_L6 = 0;
			Integer total_L7 = 0;

			Integer open_total_FTE = 0;
			Integer open_total_L1 = 0;
			Integer open_total_L2 = 0;
			Integer open_total_L3 = 0;
			Integer open_total_L4 = 0;
			Integer open_total_L5 = 0;
			Integer open_total_L6 = 0;
			Integer open_total_L7 = 0;

			List<BusinessCaseRequest> bizcasedata = new ArrayList<>();

			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);
			switch (userDetails.getRolename()) {
			case "ADMIN", "HR":
				if (!cost_center.isBlank() || !cost_center.isEmpty()) {
					bizcasedata = bizCaseRequestRepository.findByCostcenterAndApproved(cost_center);
				} else {
					bizcasedata = bizCaseRequestRepository.findByApproved();
				}
				if (bizcasedata.isEmpty()) {
					return ResponseHandler.generateResponse("There is no approved Projects", false, HttpStatus.OK,
							null);
				}
				break;
			case "BUSINESS":
				bizcasedata = bizCaseRequestRepository.findByCostcenterAndApproved(userDetails.getCost_center());
				cost_center = userDetails.getCost_center();
				break;
			default:
				return ResponseHandler.generateResponse("Un_Authorized user", false, HttpStatus.OK, null);
			}

			if (bizcasedata.isEmpty()) {
				return ResponseHandler.generateResponse("Cost Center is not mapped in any projects", false,
						HttpStatus.OK, null);
			}

			List<FTERequirement> fullFTERequirement = new ArrayList<>();
			List<FTERequirement> opneFTERequirment = new ArrayList<>();
			for (BusinessCaseRequest businessCaseRequest : bizcasedata) {
				if (businessCaseRequest.getSla_business_case().equals(true)) {
					if (!businessCaseRequest.getManpower_requirements().isEmpty()) {
						Manpower_Requirements currentmanpower = businessCaseRequest.getManpower_requirements().get(0);
						total_FTE += Integer.parseInt(currentmanpower.getTotal());
						if (currentmanpower.getProperties() != null) {
							for (Properties currentProperties : currentmanpower.getProperties()) {
//								total_FTE += 1;
								String current_level = currentProperties.getProperty_name();
								if (current_level.startsWith("L5"))
									current_level = "L5";
								else if (current_level.startsWith("L6"))
									current_level = "L6";
								else if (current_level.startsWith("L7"))
									current_level = "L7";

								switch (current_level) {
								case "L1": {

									total_L1 += Integer.parseInt(currentProperties.getProperty_value());
									break;
								}
								case "L2": {

									total_L2 += Integer.parseInt(currentProperties.getProperty_value());
									break;
								}
								case "L3": {

									total_L3 += Integer.parseInt(currentProperties.getProperty_value());
									break;
								}
								case "L4": {

									total_L4 += Integer.parseInt(currentProperties.getProperty_value());
									break;
								}
								case "L5": {

									total_L5 += Integer.parseInt(currentProperties.getProperty_value());
									break;
								}
								case "L6": {

									total_L6 += Integer.parseInt(currentProperties.getProperty_value());
									break;
								}
								case "L7": {

									total_L7 += Integer.parseInt(currentProperties.getProperty_value());
									break;
								}
								default:
									throw new IllegalArgumentException(
											"Unexpected value: " + currentProperties.getProperty_name());
								}
							}
						}
					}
					List<JDMappingModel> open_position = jdMappingRepository
							.findByRequestId(businessCaseRequest.getId());
					if (!open_position.isEmpty()) {
						for (JDMappingModel jdData : open_position) {
							for (JDHiredResponse hired_status : jdData.getHired_details()) {
								if (!hired_status.getStatus().equals("Onboard")) {
									open_total_FTE += 1;
									String current_level = jdData.getLevel();
									if (current_level.startsWith("L5"))
										current_level = "L5";
									else if (current_level.startsWith("L6"))
										current_level = "L6";
									else if (current_level.startsWith("L7"))
										current_level = "L7";

									switch (current_level) {
									case "L1": {

										open_total_L1 += 1;
										break;
									}
									case "L2": {

										open_total_L2 += 1;
										break;
									}
									case "L3": {

										open_total_L3 += 1;
										break;
									}
									case "L4": {

										open_total_L4 += 1;
										break;
									}
									case "L5": {

										open_total_L5 += 1;
										break;
									}
									case "L6": {

										open_total_L6 += 1;
										break;
									}
									case "L7": {

										open_total_L7 += 1;
										break;
									}
									default:
										throw new IllegalArgumentException("Unexpected value: " + jdData.getLevel());
									}
								}
							}
						}
					}

				}
			}

			fullFTERequirement.add(resourceOverveiwService.getFTEData("Total", total_FTE.toString()));
			fullFTERequirement.add(resourceOverveiwService.getFTEData("L1", total_L1.toString()));
			fullFTERequirement.add(resourceOverveiwService.getFTEData("L2", total_L2.toString()));
			fullFTERequirement.add(resourceOverveiwService.getFTEData("L3", total_L3.toString()));
			fullFTERequirement.add(resourceOverveiwService.getFTEData("L4", total_L4.toString()));
			fullFTERequirement.add(resourceOverveiwService.getFTEData("L5", total_L5.toString()));
			fullFTERequirement.add(resourceOverveiwService.getFTEData("L6", total_L6.toString()));
			fullFTERequirement.add(resourceOverveiwService.getFTEData("L7", total_L7.toString()));

			opneFTERequirment.add(resourceOverveiwService.getFTEData("Total", open_total_FTE.toString()));
			opneFTERequirment.add(resourceOverveiwService.getFTEData("L1", open_total_L1.toString()));
			opneFTERequirment.add(resourceOverveiwService.getFTEData("L2", open_total_L2.toString()));
			opneFTERequirment.add(resourceOverveiwService.getFTEData("L3", open_total_L3.toString()));
			opneFTERequirment.add(resourceOverveiwService.getFTEData("L4", open_total_L4.toString()));
			opneFTERequirment.add(resourceOverveiwService.getFTEData("L5", open_total_L5.toString()));
			opneFTERequirment.add(resourceOverveiwService.getFTEData("L6", open_total_L6.toString()));
			opneFTERequirment.add(resourceOverveiwService.getFTEData("L7", open_total_L7.toString()));

			finalresponsedata.setFullFTERequirement(fullFTERequirement);
			finalresponsedata.setOpen_positions_FTE(opneFTERequirment);

			finalresponsedata = resourceOverveiwService.getResourceOverviewReport(cost_center, finalresponsedata,
					bizcasedata, pageable);
			return ResponseHandler.generateResponse("Resource report", true, HttpStatus.OK, finalresponsedata);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error:" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}
}

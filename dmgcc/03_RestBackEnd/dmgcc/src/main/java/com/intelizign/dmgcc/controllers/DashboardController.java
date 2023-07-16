package com.intelizign.dmgcc.controllers;

import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.intelizign.dmgcc.authendication.AzureUserInfo;
import com.intelizign.dmgcc.authendication.UserDetailsImpl;
import com.intelizign.dmgcc.dashboardreportingservices.MainDashboardService;
import com.intelizign.dmgcc.dashboardresponce.BarChartReport;
import com.intelizign.dmgcc.dashboardresponce.MainDashboardReport;
import com.intelizign.dmgcc.models.CostCenterModel;
import com.intelizign.dmgcc.pojoclass.ResourceReport;
import com.intelizign.dmgcc.pojoclass.bizcase.BizCaseReport;
import com.intelizign.dmgcc.pojoclass.bizcase.BizCaseReport.GraphReport;
import com.intelizign.dmgcc.repositories.CostCenterRepository;
import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.response.othermaster.BizcaseFinalChartResponse;
import com.intelizign.dmgcc.response.othermaster.IOChartResponse;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

	@Autowired
	MainDashboardService mainDashboardService;

	@Autowired
	CostCenterRepository costCenterRepository;

	@Autowired
	private AzureUserInfo azureUserInfo;

	public final Logger LOGGER = LogManager.getLogger(DashboardController.class);

	@GetMapping("/getdepartment")
	public ResponseEntity<Object> getDepartment(@RequestParam(required = true) Long departmentKey) {
		try {

			List<CostCenterModel> departmentList = costCenterRepository.findAll();
			return ResponseHandler.generateResponse("Notification Sent Successfully: ", true, HttpStatus.OK,
					departmentList);

		} catch (Exception e) {

			LOGGER.error("Internal Server Error while registeralluser:{}.", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	@GetMapping("/maindashboard")
	public ResponseEntity<Object> getDashboardReport(@RequestParam(required = false) String costcenter,
			Authentication authentication) {
		try {

			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);
			String roles = userDetails.getRolename();
			MainDashboardReport finalreport = new MainDashboardReport();
			if (roles.equalsIgnoreCase("admin")) {
				finalreport = mainDashboardService.generateMainDashboardReport(costcenter);
				if (finalreport != null)
					return ResponseHandler.generateResponse("Main Dashboard Report", true, HttpStatus.OK, finalreport);
				else
					return ResponseHandler.generateResponse("There is no projects in selected Department", false,
							HttpStatus.OK, finalreport);

			} else {
				finalreport = mainDashboardService.generateMainDashboardReport(userDetails.getCost_center());
				if (finalreport != null)
					return ResponseHandler.generateResponse("Main Dashboard Report", true, HttpStatus.OK, finalreport);
				else
					return ResponseHandler.generateResponse("There is no projects in selected Department", false,
							HttpStatus.OK, finalreport);
			}

		} catch (Exception e) {

			LOGGER.error("Internal Server Error while getting Dashboard Report:{}.", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					e.getStackTrace());
		}
	}
}

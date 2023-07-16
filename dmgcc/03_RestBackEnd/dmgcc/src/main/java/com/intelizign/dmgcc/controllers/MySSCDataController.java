package com.intelizign.dmgcc.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.intelizign.dmgcc.models.BillingCycle;
import com.intelizign.dmgcc.models.OrganizationType;
import com.intelizign.dmgcc.repositories.BillingCycleRepository;
import com.intelizign.dmgcc.repositories.OrganizationTypeRepository;
import com.intelizign.dmgcc.response.ResponseHandler;

@RestController
@RequestMapping("/mysscdata")
public class MySSCDataController {
	@Autowired
	private OrganizationTypeRepository organizationTypeRepository;

	@Autowired
	private BillingCycleRepository billingCycleRepository;

	@PostMapping("/organization")
	public ResponseEntity<Object> saveAllOrganization(@RequestBody List<OrganizationType> request_data) {
		try {
			List<OrganizationType> organization_type = organizationTypeRepository.saveAll(request_data);
			return ResponseHandler.generateResponse("Organization Types Created Successfully", true, HttpStatus.OK,
					organization_type);
		} catch (Exception e) {

			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@GetMapping("/organization")
	public ResponseEntity<Object> getAllOrganization() {
		try {
			List<OrganizationType> organization_type = organizationTypeRepository.findAll();
			return ResponseHandler.generateResponse("List of Organization", true, HttpStatus.OK, organization_type);
		} catch (Exception e) {

			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@GetMapping("/billingcycle")
	public ResponseEntity<Object> getAllBillingCycle() {
		try {
			List<BillingCycle> organization_type = billingCycleRepository.findAll();
			return ResponseHandler.generateResponse("List of Billing Cycle", true, HttpStatus.OK, organization_type);
		} catch (Exception e) {

			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@PostMapping("/billingcycle")
	public ResponseEntity<Object> saveAllBillingCycle(@RequestBody List<BillingCycle> request_data) {
		try {
			List<BillingCycle> organization_type = billingCycleRepository.saveAll(request_data);
			return ResponseHandler.generateResponse("Billing Cycles Created Successfully", true, HttpStatus.OK,
					organization_type);
		} catch (Exception e) {

			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

}

package com.intelizign.dmgcc.controllers.othermaster;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.intelizign.dmgcc.models.othermaster.SLAContractOptionModel;
import com.intelizign.dmgcc.repositories.othermaster.SLAContractOptionRepository;
import com.intelizign.dmgcc.response.ResponseHandler;

@RestController
@RequestMapping("/slacontract")
public class SLAContractController {

	@Autowired
	SLAContractOptionRepository slaContractOptionRepository;

	public final Logger LOGGER = LogManager.getLogger(SLAContractController.class);

	@PostMapping("")
	public ResponseEntity<Object> createContractOption(@RequestBody SLAContractOptionModel slaContractOptionModel) {
		try {

			slaContractOptionRepository.save(slaContractOptionModel);
			return ResponseHandler.generateResponse("Contract Option Created Successfully", true, HttpStatus.OK,
					slaContractOptionModel);

		} catch (Exception e) {
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin" + e.getMessage(),
					false, HttpStatus.OK, null);
		}
	}

	@GetMapping("")
	public ResponseEntity<Object> getContractOption() {
		try {

			List<SLAContractOptionModel> slaContractOptionModel = slaContractOptionRepository.findAll();
			return ResponseHandler.generateResponse("List of Contract Option", true, HttpStatus.OK,
					slaContractOptionModel);

		} catch (Exception e) {
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin" + e.getMessage(),
					false, HttpStatus.OK, null);
		}
	}

	@PostMapping("insertcontract")
	public ResponseEntity<Object> createDefaultContract() {
		try {

			List<SLAContractOptionModel> slaContractOptionModel = slaContractOptionRepository.findAll();
			if (slaContractOptionModel.isEmpty()) {
				SLAContractOptionModel onsite = new SLAContractOptionModel(1, "OnSite");
				SLAContractOptionModel offsite = new SLAContractOptionModel(1, "OffSite");
				SLAContractOptionModel both = new SLAContractOptionModel(1, "Both");
				slaContractOptionModel.add(onsite);
				slaContractOptionModel.add(offsite);
				slaContractOptionModel.add(both);
				slaContractOptionRepository.saveAll(slaContractOptionModel);
				return ResponseHandler.generateResponse("Contract Created Successfully", true, HttpStatus.OK,
						slaContractOptionModel);
			} else {
				return ResponseHandler.generateResponse("Contract Already Added", true, HttpStatus.OK, null);
			}

		} catch (Exception e) {
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin" + e.getMessage(),
					false, HttpStatus.OK, null);
		}
	}
}

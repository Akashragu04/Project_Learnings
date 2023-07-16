package com.intelizign.dmgcc.controllers.othermaster;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.intelizign.dmgcc.models.othermaster.ProvisionStatusModel;
import com.intelizign.dmgcc.repositories.othermaster.ProvisionStatusRepository;
import com.intelizign.dmgcc.response.ResponseHandler;

@RestController
@RequestMapping("/provisionstatus")
public class ProvisionStatusController {

	@Autowired
	private ProvisionStatusRepository provisionStatusRepository;

	public final Logger LOGGER = LogManager.getLogger(ProvisionStatusController.class);

	@GetMapping("")
	public ResponseEntity<Object> getProvisionStatusInfo() {
		try {
			List<ProvisionStatusModel> provisionStatusModel = provisionStatusRepository.findAll();
			return ResponseHandler.generateResponse("Provision Status Data Retreived Successfully", true, HttpStatus.OK,
					provisionStatusModel);

		} catch (Exception e) {
			LOGGER.error("Exceptions happen!: Error while getting Provision status data" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	@PutMapping("/update")
	public ResponseEntity<Object> updateSLAProvisions(@RequestBody List<ProvisionStatusModel> request_data) {
		try {

			List<ProvisionStatusModel> all_saved_provisions_status = provisionStatusRepository.saveAll(request_data);

			return ResponseHandler.generateResponse("Provisions Status Data Updated Successfully", true, HttpStatus.OK,
					all_saved_provisions_status);

		} catch (Exception e) {
			LOGGER.error("Exceptions happen!: While saving provisions status data " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

}

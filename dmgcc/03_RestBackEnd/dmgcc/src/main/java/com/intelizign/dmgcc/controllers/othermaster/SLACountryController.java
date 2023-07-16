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

import com.intelizign.dmgcc.models.othermaster.SLACountry;
import com.intelizign.dmgcc.repositories.othermaster.SLACountryRepository;
import com.intelizign.dmgcc.response.ResponseHandler;

@RestController
@RequestMapping("/slacountry")
public class SLACountryController {

	@Autowired
	SLACountryRepository slaCountryRepository;

	public final Logger LOGGER = LogManager.getLogger(SLACountryController.class);

	@PostMapping("")
	public ResponseEntity<Object> createCountry(@RequestBody SLACountry slaCountry) {
		try {

			slaCountryRepository.save(slaCountry);
			return ResponseHandler.generateResponse("Country Created Successfully", true, HttpStatus.OK, slaCountry);

		} catch (Exception e) {
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin" + e.getMessage(),
					false, HttpStatus.OK, null);
		}
	}

	@GetMapping("")
	public ResponseEntity<Object> getCountry() {
		try {

			List<SLACountry> slaCountry = slaCountryRepository.findAll();
			return ResponseHandler.generateResponse("List of Country", true, HttpStatus.OK, slaCountry);

		} catch (Exception e) {
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin" + e.getMessage(),
					false, HttpStatus.OK, null);
		}
	}

	@PostMapping("insertcountry")
	public ResponseEntity<Object> createDefaultCountry() {
		try {

			List<SLACountry> slaCountry = slaCountryRepository.findAll();
			if (slaCountry.isEmpty()) {
				SLACountry japan_Country = new SLACountry(1, "Japan");
				SLACountry non_japan_Country = new SLACountry(1, "Non-Japan");
				SLACountry india_Country = new SLACountry(1, "India");
				slaCountry.add(india_Country);
				slaCountry.add(non_japan_Country);
				slaCountry.add(japan_Country);
				slaCountryRepository.saveAll(slaCountry);
				return ResponseHandler.generateResponse("Country Created Successfully", true, HttpStatus.OK,
						slaCountry);
			} else {
				return ResponseHandler.generateResponse("Country Already Added", true, HttpStatus.OK, null);
			}

		} catch (Exception e) {
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin" + e.getMessage(),
					false, HttpStatus.OK, null);
		}
	}
}

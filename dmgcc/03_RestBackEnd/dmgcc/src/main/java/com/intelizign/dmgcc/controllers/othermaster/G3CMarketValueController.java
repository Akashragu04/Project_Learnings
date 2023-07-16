package com.intelizign.dmgcc.controllers.othermaster;

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

import com.intelizign.dmgcc.models.othermaster.G3CMarketValueModel;
import com.intelizign.dmgcc.repositories.othermaster.G3CMarketValueRepository;
import com.intelizign.dmgcc.response.ResponseHandler;

@RestController
@RequestMapping("/g3cmarketvalue")
public class G3CMarketValueController {
	@Autowired
	G3CMarketValueRepository g3cMarketValueRepository;

	public final Logger LOGGER = LogManager.getLogger(G3CMarketValueController.class);

	@GetMapping("")
	public ResponseEntity<Object> getMarketValue() {
		try {
			return g3cMarketValueRepository.findById((long) 1).map(config_data -> {

				return ResponseHandler.generateResponse("G3C Market Values", true, HttpStatus.OK, config_data);
			}).orElseGet(() -> {

				G3CMarketValueModel g3cMarketValueModel = new G3CMarketValueModel();
				g3cMarketValueModel.setFx_value(5.0);
				g3cMarketValueModel.setGst_value(5.0);
				g3cMarketValueModel.setMarkup_value(13.5);
				g3cMarketValueModel.setIndia_wht_value(5.0);
				g3cMarketValueModel.setNon_india_wht_value(7.5);
				g3cMarketValueRepository.save(g3cMarketValueModel);
				return ResponseHandler.generateResponse("G3C Market Values", true, HttpStatus.OK, g3cMarketValueModel);
			});

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while Updating CC ID: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					e.getStackTrace());
		}
	}

	@PutMapping("")
	public ResponseEntity<Object> updateMarketValue(@RequestBody G3CMarketValueModel updateG3CMarketValueModel) {
		try {
			return g3cMarketValueRepository.findById((long) 1).map(g3cMarketValueModel -> {

				g3cMarketValueModel.setFx_value(updateG3CMarketValueModel.getFx_value());
				g3cMarketValueModel.setGst_value(updateG3CMarketValueModel.getGst_value());
				g3cMarketValueModel.setMarkup_value(updateG3CMarketValueModel.getMarkup_value());
				g3cMarketValueModel.setIndia_wht_value(updateG3CMarketValueModel.getIndia_wht_value());
				g3cMarketValueModel.setNon_india_wht_value(updateG3CMarketValueModel.getNon_india_wht_value());
				g3cMarketValueRepository.save(g3cMarketValueModel);
				return ResponseHandler.generateResponse("G3C Market Values Updated Successfully", true, HttpStatus.OK,
						g3cMarketValueModel);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: G3C Market ID Doesn't exist");
				return ResponseHandler.generateResponse("Id  Doesn't exist", false, HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while Updating  ID: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}
}

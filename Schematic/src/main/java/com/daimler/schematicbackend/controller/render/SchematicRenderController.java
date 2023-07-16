package com.daimler.schematicbackend.controller.render;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.daimler.schematicbackend.entity.file.DatabaseFileData;
import com.daimler.schematicbackend.entity.render.RealignmentModel;
import com.daimler.schematicbackend.entity.render.SchematicWireColor;
import com.daimler.schematicbackend.exception.file.SchematicFileException;
import com.daimler.schematicbackend.model.render.CommoditySearchRequest;
import com.daimler.schematicbackend.model.render.SchematicRenderResponse;
import com.daimler.schematicbackend.service.render.SchematicRenderService;

@RestController
@RequestMapping("/v1/render")
public class SchematicRenderController {

	@Autowired
	SchematicRenderService renderService;

	@PostMapping("/searchCommodity")
	private boolean searchCommodity(@Valid @RequestBody CommoditySearchRequest searchRequest) {
		return renderService.searchCommodity(searchRequest);
	}

	@GetMapping("/generateRenderModel")
	public ResponseEntity<SchematicRenderResponse> generateRenderModel(
			@RequestHeader("commodityName") String commodityName) throws SchematicFileException, IOException {

		if (StringUtils.isEmpty(commodityName)) {
			throw new SchematicFileException("Commodity name cannot be empty");
		} else if (!renderService.checkIfFileExists(StringUtils.trim(commodityName))) {
			throw new SchematicFileException(commodityName + " does not exist");
		} else {
			Map<String, DatabaseFileData> metadataMap = renderService.getMetaData(commodityName + "_DB");
			return ResponseEntity.ok(renderService.generateRenderModel(metadataMap, commodityName));
		}
	}

	@GetMapping("/getColor")
	public ResponseEntity<List<SchematicWireColor>> getColors() {
		List<SchematicWireColor> schematicWireColorsData = renderService.getAllColors();
		return ResponseEntity.ok(schematicWireColorsData);
	}

	@PostMapping("/saverealign")
	public ResponseEntity<Object> saveRealignData(@RequestBody RealignmentModel realignmentRequest) {

		return ResponseEntity.ok(renderService.saverealignmentData(realignmentRequest));
	}

}

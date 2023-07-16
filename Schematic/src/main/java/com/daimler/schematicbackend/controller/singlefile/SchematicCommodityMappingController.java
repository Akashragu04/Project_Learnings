package com.daimler.schematicbackend.controller.singlefile;

import java.io.IOException;
import java.util.List;

import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.daimler.schematicbackend.entity.file.ErrorMessage;
import com.daimler.schematicbackend.exception.file.SchematicFileException;
import com.daimler.schematicbackend.model.generic.SchematicGenericFileResponse;
import com.daimler.schematicbackend.service.file.SchematicCommodityMappingFileService;
import com.daimler.schematicbackend.utils.file.SchematicFileErrorMessageUtils;
import com.daimler.schematicbackend.validator.SchematicFileFormatValidator;

/**
 * The Class SchematicCommodityMappingController.
 */
@RestController
public class SchematicCommodityMappingController implements ISchematicSingleFileEndPoint {

	/**
	 * The commodity mapping service.
	 */
	@Autowired
	SchematicCommodityMappingFileService commodityMappingService;

	@Autowired
	SchematicFileErrorMessageUtils utils;

	@Autowired
	SchematicFileFormatValidator validator;

	/**
	 * Upload file.
	 *
	 * @param userName the username
	 * @param file     the file
	 * @return the response entity
	 * @throws SchematicFileException the schematic file exception
	 */
	@Override
	@PostMapping("/commodityMapping")
	public ResponseEntity<SchematicGenericFileResponse> uploadFile(String userName, MultipartFile file)
			throws SchematicFileException, IOException {
		validator.validateMappingSheetFormat(file);
		List<String> genericErrors = commodityMappingService.processFile(file, userName);
		List<ErrorMessage> sheetErrors = null;
		String sheetName = StringUtils.toRootUpperCase(file.getOriginalFilename());
		if (StringUtils.contains(sheetName, ".XLSX")) {
			sheetErrors = utils.messageList(sheetName.replace(".XLSX", ""));
		}
		if (ObjectUtils.isEmpty(genericErrors) && ObjectUtils.isEmpty(sheetErrors)) {
			return ResponseEntity
					.ok(new SchematicGenericFileResponse("Upload Successful.", genericErrors, sheetErrors, ""));
		} else {
			String type = utils.getErrorType(genericErrors, sheetErrors);
			return ResponseEntity.badRequest()
					.body(new SchematicGenericFileResponse(type, genericErrors, sheetErrors, ""));
		}
	}

}

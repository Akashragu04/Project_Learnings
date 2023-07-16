package com.daimler.schematicbackend.controller.singlefile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;

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
import com.daimler.schematicbackend.service.file.SchematicDatabaseFileService;
import com.daimler.schematicbackend.utils.file.SchematicFileErrorMessageUtils;
import com.daimler.schematicbackend.validator.SchematicFileFormatValidator;

/**
 * The Class SchematicDatabaseFileController.
 */
@RestController
public class SchematicDatabaseFileController implements ISchematicSingleFileEndPoint {

	/**
	 * The schematic database file service.
	 */
	@Autowired
	SchematicDatabaseFileService schematicDatabaseFileService;

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
	@PostMapping("/databaseFileData")
	public ResponseEntity<SchematicGenericFileResponse> uploadFile(String userName, MultipartFile file)
			throws SchematicFileException, IOException {
		validator.validateDatabaseSheetFormat(file);
		AtomicBoolean connWarning = new AtomicBoolean(false);
		List<String> genericErrors = schematicDatabaseFileService.processFile(file, userName, connWarning);
		List<ErrorMessage> sheetErrors = new ArrayList<>();
		String sheetName = StringUtils.toRootUpperCase(file.getOriginalFilename());
		if (StringUtils.contains(sheetName, ".XLSX")) {
			sheetErrors = utils.messageList(sheetName.replace(".XLSX", ""));
		}
		if (ObjectUtils.isEmpty(genericErrors) && ObjectUtils.isEmpty(sheetErrors)) {

			String connWarningMessage = "";
			if (connWarning.get()) {
				connWarningMessage = "Connector Type is changed to RECTANGLE. If it is CIRCLE or TRIANGLE or SQUARE ";
			}
			return ResponseEntity.ok(new SchematicGenericFileResponse("Upload Successful.", genericErrors, sheetErrors,
					connWarningMessage));
		} else {
			String type = utils.getErrorType(genericErrors, sheetErrors);
			return ResponseEntity.badRequest()
					.body(new SchematicGenericFileResponse(type, genericErrors, sheetErrors, ""));
		}
	}
}

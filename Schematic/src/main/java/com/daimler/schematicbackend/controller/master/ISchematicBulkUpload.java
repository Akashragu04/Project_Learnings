package com.daimler.schematicbackend.controller.master;

import java.io.IOException;
import java.util.List;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

import com.daimler.schematicbackend.entity.file.BulkUploadValidation;
import com.daimler.schematicbackend.exception.file.SchematicFileException;
import com.daimler.schematicbackend.model.generic.SchematicBulkUploadResponse;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

/**
 * The interface Bulk Upload.
 */
@RequestMapping("/v1/commodityMultifiles")
public interface ISchematicBulkUpload {

	/**
	 * @param userName the user name
	 * @return the response entity
	 * @throws IOException            Signals that an I/O exception has occurred.
	 * @throws SchematicFileException the schematic file exception **** boolean
	 *                                fileCheck value is mandatory for multifile
	 *                                upload , for single file upload fileCheck
	 *                                value not needed
	 */

	@ApiOperation(httpMethod = "POST", value = "Upload All Commodities", nickname = "uploadFile")
	@ApiResponses(value = {
			@ApiResponse(code = 200, message = "File Success", response = List.class, responseContainer = "List") })
	ResponseEntity<SchematicBulkUploadResponse> uploadFile(
			@ApiParam(value = "Username Header", required = true) @RequestHeader("userName") String userName,
			@ApiParam(value = "Username Header", required = true) @RequestHeader("folderName") String folderName,
			@ApiParam(value = "access bulk upload status", required = true) @Valid @RequestBody BulkUploadValidation validationData)
			throws IOException, SchematicFileException;
}

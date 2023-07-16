/*
 *
 */
package com.daimler.schematicbackend.controller.modLog;

import com.daimler.schematicbackend.dto.file.request.SchematicFileUploadLogRequestDto;
import com.daimler.schematicbackend.dto.file.request.SchematicStatusLogRequestDto;
import com.daimler.schematicbackend.exception.file.SchematicFileException;
import com.daimler.schematicbackend.model.file.SchematicFileUploadTimeFrameResponse;
import com.daimler.schematicbackend.model.file.SchematicStatusTimeFrameResponse;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;

/**
 * The Interface ISchematicModLogEndpoint.
 * Author By Sriramulu
 */
@RequestMapping("/v1/modLog")
public interface ISchematicModLogEndpoint {

    @ApiOperation(httpMethod = "POST", value = "Get File Upload Log", nickname = "getUploadFileInfo")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Data Retrieved for the timeframe", response = String.class, responseContainer = "String"),
            @ApiResponse(code = 400, message = "Invalid Credentials"),
            @ApiResponse(code = 500, message = "Processing error") })
    @PostMapping("/getUploadFileInfo")
    ResponseEntity<SchematicFileUploadTimeFrameResponse> getUploadFileInfo(
            @ApiParam(value = "Derive schematics based on time", required = true) @Valid @RequestBody SchematicFileUploadLogRequestDto fileUploadLogRequest)
            throws SchematicFileException;
}

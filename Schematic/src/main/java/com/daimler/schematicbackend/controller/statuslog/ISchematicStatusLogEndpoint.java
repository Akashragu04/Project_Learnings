/*
 *
 */
package com.daimler.schematicbackend.controller.statuslog;

import com.daimler.schematicbackend.dto.file.request.SchematicStatusLogRequestDto;
import com.daimler.schematicbackend.exception.file.SchematicFileException;
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
 * The Interface ISchematicStatusLogEndpoint.
 */
@RequestMapping("/v1/statusLog")
public interface ISchematicStatusLogEndpoint {

    /**
     * Gets the status log.
     *
     * @param statusLogRequest
     *            the status log request
     * @return the status log
     * @throws SchematicFileException
     *             the schematic file exception
     */
    @ApiOperation(httpMethod = "POST", value = "Get Status Log", nickname = "getStatusLog")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Data Retrieved for the timeframe", response = String.class, responseContainer = "String"),
            @ApiResponse(code = 400, message = "Invalid Credentials"),
            @ApiResponse(code = 500, message = "Processing error") })
    @PostMapping("/getStatusLog")
    ResponseEntity<SchematicStatusTimeFrameResponse> getStatusLog(
            @ApiParam(value = "Derive schematics based on time", required = true) @Valid @RequestBody SchematicStatusLogRequestDto statusLogRequest)
            throws SchematicFileException;

}

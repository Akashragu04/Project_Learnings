/*
 *
 */
package com.daimler.schematicbackend.controller.validation;

import com.daimler.schematicbackend.exception.file.SchematicFileException;
import com.daimler.schematicbackend.model.generic.SchematicGenericErrorMessageBody;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * The Interface ISchematicValidationEndpoint.
 */
@RequestMapping("/v1/validate")
public interface ISchematicValidationEndpoint {

    /**
     * Gets the validation failures.
     *
     * @param sheetName the sheet name
     * @return the validation failures
     * @throws SchematicFileException the schematic file exception
     */
    @ApiOperation(httpMethod = "GET", value = "Check IF Excel Contains Error", nickname = "getValidationFailures")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Error Exists", response = SchematicGenericErrorMessageBody.class, responseContainer = "SchematicGenericErrorMessageBody"),
            @ApiResponse(code = 400, message = "Invalid Credentials"),
            @ApiResponse(code = 500, message = "Processing error")})
    @GetMapping("/getValidationFailures")
    ResponseEntity<SchematicGenericErrorMessageBody> getValidationFailures(
            @ApiParam(value = "Values from the sheetName Header ", required = true) @RequestHeader("sheetName") String sheetName)
            throws SchematicFileException;

}

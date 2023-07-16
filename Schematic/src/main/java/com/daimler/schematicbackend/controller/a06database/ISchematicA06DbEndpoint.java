/*
 *
 */
package com.daimler.schematicbackend.controller.a06database;

import com.daimler.schematicbackend.exception.file.SchematicFileException;
import com.daimler.schematicbackend.model.file.SchematicA06DatabaseResponse;
import com.daimler.schematicbackend.model.file.SchematicA06DatabaseResponseNew;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

/**
 * The Interface ISchematicA06DbEndpoint.
 */
@RequestMapping("/v1/a06Database")
public interface ISchematicA06DbEndpoint {

    /**
     * Gets the a 06 name.
     *
     * @param a06Name
     *            the a 06 name
     * @return the a 06 name
     * @throws SchematicFileException
     *             the schematic file exception
     */
    @ApiOperation(httpMethod = "GET", value = "Get A06 Data", nickname = "getA06Name")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Data Retrieved for the A-Part", response = List.class, responseContainer = "List"),
            @ApiResponse(code = 400, message = "Invalid Credentials"),
            @ApiResponse(code = 500, message = "Processing error") })
    @GetMapping("/search")
    ResponseEntity<SchematicA06DatabaseResponseNew> getA06Name(
            @ApiParam(value = "Derive schematics based on time", required = true) @RequestHeader("a06Name") String a06Name)
            throws SchematicFileException;

}

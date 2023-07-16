/*
 *
 */
package com.daimler.schematicbackend.controller.commoditydb;

import com.daimler.schematicbackend.exception.auth.SchematicAuthException;
import com.daimler.schematicbackend.exception.file.SchematicFileException;
import com.daimler.schematicbackend.model.file.SchematicCommodityDbResponse;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * The Interface ISchematicCommodityDbEndpoint.
 */
@RequestMapping("/v1/commodityDatabase")
public interface ISchematicCommodityDbEndpoint {

    /**
     * Gets the database data.
     *
     * @param userName  the user name
     * @param commodity the commodity
     * @return the database data
     * @throws SchematicAuthException the schematic auth exception
     * @throws SchematicFileException the schematic file exception
     */
    @ApiOperation(httpMethod = "GET", value = "Get Main Tab", nickname = "getDatabaseData")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Data Retrieved for the S and G/APart Mapping", response = SchematicCommodityDbResponse.class, responseContainer = "SchematicCommodityDbResponse"),
            @ApiResponse(code = 400, message = "Invalid Credentials"),
            @ApiResponse(code = 500, message = "Processing error")})
    @GetMapping("/getDatabaseData")
    ResponseEntity<SchematicCommodityDbResponse> getDatabaseData(
            @ApiParam(value = "Username", required = true) @NonNull @RequestHeader("userName") String userName,
            @ApiParam(value = "commodityName", required = true) @NonNull @RequestHeader("commodity") String commodity)
            throws SchematicAuthException, SchematicFileException;

}

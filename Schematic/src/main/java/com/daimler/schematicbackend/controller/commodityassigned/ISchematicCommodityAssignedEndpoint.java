/*
 *
 */
package com.daimler.schematicbackend.controller.commodityassigned;

import com.daimler.schematicbackend.dto.file.request.SchematicCommodityAssignDto;
import com.daimler.schematicbackend.exception.auth.SchematicAuthException;
import com.daimler.schematicbackend.model.file.SchematicCommodityAssignedResponse;
import com.daimler.schematicbackend.model.file.SchematicCommodityStatus;
import com.daimler.schematicbackend.model.file.SchematicProjectStatusResponse;
import com.daimler.schematicbackend.model.generic.SchematicGenericResponse;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * The Interface ISchematicCommodityAssignedEndpoint.
 */
@RequestMapping("/v1/commodityAssigned")
public interface ISchematicCommodityAssignedEndpoint {

    /**
     * Assign commodity.
     *
     * @param inRequest
     *            the in request
     * @return the response entity
     * @throws SchematicAuthException
     *             the schematic auth exception
     */
    @ApiOperation(httpMethod = "POST", value = "Assign the commodity to the user", nickname = "assignCommodity")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Assignment Success", response = String.class, responseContainer = "String"),
            @ApiResponse(code = 400, message = "Invalid Credentials"),
            @ApiResponse(code = 500, message = "Processing error") })
    @PostMapping("/assignCommodity")
    ResponseEntity<SchematicGenericResponse> assignCommodity(
            @ApiParam(value = "Values from the Commodity Assignment Form ", required = true) @Valid @RequestBody SchematicCommodityAssignDto inRequest)
            throws SchematicAuthException;

    /**
     * Gets the commodities assigned.
     *
     * @return the commodities assigned
     */
    @ApiOperation(httpMethod = "GET", value = "Get All Commodities to the user", nickname = "getCommoditiesAssigned")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Fetch Success", response = List.class, responseContainer = "List"),
            @ApiResponse(code = 400, message = "Invalid Credentials"),
            @ApiResponse(code = 500, message = "Processing error") })
    @GetMapping("/getCommoditiesAssigned")
    ResponseEntity<List<SchematicCommodityAssignedResponse>> getCommoditiesAssigned();

    /**
     * Gets the renderable commodities.
     *
     * @return the renderable commodities
     */
    @ApiOperation(httpMethod = "GET", value = "Get All Renderable Commodity", nickname = "getRenderableCommodities")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Fetch Success", response = List.class, responseContainer = "List"),
            @ApiResponse(code = 400, message = "Invalid Credentials"),
            @ApiResponse(code = 500, message = "Processing error") })
    @GetMapping("/getRenderableCommodities")
    ResponseEntity<List<String>> getRenderableCommodities();

    @ApiOperation(httpMethod = "GET", value = "Get Commodity By Status", nickname = "getRenderableCommodities")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Fetch Success", response = List.class, responseContainer = "List"),
            @ApiResponse(code = 400, message = "Invalid Credentials"),
            @ApiResponse(code = 500, message = "Processing error") })
    @GetMapping("/getCommodityByStatus")
    ResponseEntity<SchematicCommodityStatus> getCommodityByStatus(@RequestHeader("userName") String userName);

    @ApiOperation(httpMethod = "GET", value = "Update the status to render", nickname = "Render Status")
    @GetMapping("/renderStatus")
    void renderStatus(@RequestHeader("commodityName") String commodityName) throws SchematicAuthException;

    /**
     * Gets the status of commoditites.
     *
     * @return the commodities assigned
     */
    @ApiOperation(httpMethod = "GET", value = "Get All Commodities status", nickname = "getProjectStatus")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Fetch Success", response = String.class, responseContainer = "String"),
            @ApiResponse(code = 400, message = "Invalid Credentials"),
            @ApiResponse(code = 500, message = "Processing error") })
    @GetMapping("/getProjectStatus")
    ResponseEntity<SchematicProjectStatusResponse> getCommoditiesStatus();
}

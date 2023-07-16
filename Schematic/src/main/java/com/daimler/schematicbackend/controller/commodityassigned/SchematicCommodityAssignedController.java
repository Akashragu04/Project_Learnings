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
import com.daimler.schematicbackend.repository.file.SchematicCommodityDetailsRepository;
import com.daimler.schematicbackend.service.file.SchematicCommodityAssignedService;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

/**
 * The Class SchematicCommodityAssignedController.
 */
@RestController
public class SchematicCommodityAssignedController implements ISchematicCommodityAssignedEndpoint {

    /**
     * The schematic commodity assigned service.
     */
    @Autowired
    SchematicCommodityAssignedService schematicCommodityAssignedService;

    /**
     * Assign commodity.
     *
     * @param inRequest
     *            the in request
     * @return the response entity
     * @throws SchematicAuthException
     *             the schematic auth exception
     */
    @Override
    public ResponseEntity<SchematicGenericResponse> assignCommodity(@Valid SchematicCommodityAssignDto inRequest)
            throws SchematicAuthException {
        if (!schematicCommodityAssignedService.assignCommodityToUser(inRequest)) {
            return ResponseEntity.badRequest()
                    .body(new SchematicGenericResponse("Error Assigning the commodity to the user", null));
        }
        return ResponseEntity.ok(new SchematicGenericResponse("Commodity Assigned Successfully", null));
    }

    /**
     * Gets the commodities assigned.
     *
     * @return the commodities assigned
     */
    @Override
    public ResponseEntity<List<SchematicCommodityAssignedResponse>> getCommoditiesAssigned() {
        List<SchematicCommodityAssignedResponse> response = schematicCommodityAssignedService.getDisplayData();
        if (ObjectUtils.isEmpty(response)) {
            ResponseEntity.ok(new ArrayList<SchematicCommodityAssignedResponse>());
        }
        return ResponseEntity.ok(response);
    }

    /**
     * Gets the renderable commodities.
     *
     * @return the renderable commodities
     */
    @Autowired
    SchematicCommodityAssignedService commodityAssignedService;
    @Override
    public ResponseEntity<List<String>> getRenderableCommodities() {
        List<String> assignableCommodities = schematicCommodityAssignedService.getAssignableCommodities();
        List<String> assignedCommodities=schematicCommodityAssignedService.getCommoditiesByStatus();
        assignableCommodities.removeAll(assignedCommodities);
        if (ObjectUtils.isEmpty(assignableCommodities)) {
            ResponseEntity.ok(new ArrayList<String>());
        }
        return ResponseEntity.ok(assignableCommodities);
    }

    @Override
    public ResponseEntity<SchematicCommodityStatus> getCommodityByStatus(String userName) {
        return ResponseEntity.ok(schematicCommodityAssignedService.getCommoditesByUserName(userName));
    }

    @Override
    public void renderStatus(String commodityName) throws SchematicAuthException {
        schematicCommodityAssignedService.updateStatus(commodityName);
    }

    @Override
    public ResponseEntity<SchematicProjectStatusResponse> getCommoditiesStatus() {
        return ResponseEntity.ok(schematicCommodityAssignedService.getCommoditiesStatus());
    }

}

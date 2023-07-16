/*
 *
 */
package com.daimler.schematicbackend.controller.commoditydb;

import com.daimler.schematicbackend.exception.auth.SchematicAuthException;
import com.daimler.schematicbackend.exception.file.SchematicFileException;
import com.daimler.schematicbackend.model.file.SchematicCommodityDbResponse;
import com.daimler.schematicbackend.service.file.SchematicCommodityDbService;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

/**
 * The Class SchematicCommodityDbController.
 */
@RestController
public class SchematicCommodityDbController implements ISchematicCommodityDbEndpoint {

    /**
     * The commodity db service.
     */
    @Autowired
    SchematicCommodityDbService commodityDbService;

    /**
     * Gets the database data.
     *
     * @param userName  the user name
     * @param commodity the commodity
     * @return the database data
     * @throws SchematicAuthException the schematic auth exception
     * @throws SchematicFileException the schematic file exception
     */
    @Override
    public ResponseEntity<SchematicCommodityDbResponse> getDatabaseData(String userName, String commodity)
            throws SchematicAuthException, SchematicFileException {
        SchematicCommodityDbResponse response = commodityDbService.getScreen(userName, commodity);
        if (ObjectUtils.isEmpty(response.getA06MappingList()) && ObjectUtils.isEmpty(response.getGo6MappingList())) {
            throw new SchematicFileException("No A06/G06 Mapping found for this commodity");
        }
        return ResponseEntity.ok(response);
    }

}

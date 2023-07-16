/*
 *
 */
package com.daimler.schematicbackend.controller.a06database;

import com.daimler.schematicbackend.entity.file.SAMapping;
import com.daimler.schematicbackend.exception.file.SchematicFileException;
import com.daimler.schematicbackend.model.file.SchematicA06DatabaseResponse;
import com.daimler.schematicbackend.model.file.SchematicA06DatabaseResponseNew;
import com.daimler.schematicbackend.service.file.SchematicA06FileService;
import com.daimler.schematicbackend.service.file.SchematicCommodityA06Service;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * The Class SchematicA06DatabaseController.
 */
@RestController
public class SchematicA06DatabaseController implements ISchematicA06DbEndpoint {

    /**
     * The a 06 file service.
     */
    @Autowired
    SchematicA06FileService a06FileService;

    /**
     * The commodity a06 service
     */
    @Autowired
    SchematicCommodityA06Service commodityA06Service;

    /**
     * Gets the a 06 name.
     *
     * @param a06Name
     *            the a 06 name
     * @return the a 06 name
     * @throws SchematicFileException
     *             the schematic file exception
     */
    @Override
    public ResponseEntity<SchematicA06DatabaseResponseNew> getA06Name(String a06Name) throws SchematicFileException {
        List<SchematicA06DatabaseResponse> a06DataList = a06FileService.getA06Data(a06Name);
        /************************************************************/
        /**
         * Created a service class to get the data, added a varible for service class here Created a new model class for
         * the new response and changed the response here and end point
         **/
        SchematicA06DatabaseResponseNew response = new SchematicA06DatabaseResponseNew();
        String a06description = "";
        List<SAMapping> DataList = commodityA06Service.getCommodityA06Data(a06Name);
        for (SAMapping data : DataList) {
            if (data.getA06Name().equalsIgnoreCase(a06Name)) {
                a06description = data.getA06Description();
                break;
            }
        }
        response.setA06DataList(a06DataList);
        response.setA06description(a06description);
        /************************************************************/
        if (ObjectUtils.isNotEmpty(response)) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.badRequest().body(null);
    }
}

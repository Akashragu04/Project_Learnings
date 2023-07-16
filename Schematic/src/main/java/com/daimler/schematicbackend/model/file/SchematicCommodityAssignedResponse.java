/*
 *
 */
package com.daimler.schematicbackend.model.file;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The Class SchematicCommodityAssignedResponse.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SchematicCommodityAssignedResponse {

    /**
     * The assigned to.
     */
    @ApiModelProperty(notes = "Short Id of the User who is working on commodity", required = true, name = "assignedTo", value = "${assignedTo")
    private String assignedTo;

    /**
     * The commodity name.
     */
    @ApiModelProperty(notes = "Name of the Commodity Assigned", required = true, name = "commoditName", value = "Commodity Name")
    private String commodityName;
}

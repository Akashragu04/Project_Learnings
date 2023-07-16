/*
 *
 */
package com.daimler.schematicbackend.model.file;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The Class SchematicCommodityA06Response.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SchematicCommodityA06Response {

    /**
     * The a 06 name.
     */
    @ApiModelProperty(notes = "Name of the A-part", required = true, name = "a06Name", value = "AXX_SXX_XXXX_XXX")
    private String a06Name;

    /**
     * The a 06 description.
     */
    @ApiModelProperty(notes = "Description of the A-part", required = true, name = "a06Description", value = "Description for the Apart")
    private String a06Description;

    /**
     * The availability.
     */
    @ApiModelProperty(notes = "Availability of the A-part", required = true, name = "availability", value = "If Apart is available")
    private String availability;

}

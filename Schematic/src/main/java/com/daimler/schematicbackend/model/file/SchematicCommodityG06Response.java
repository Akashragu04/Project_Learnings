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
 * The Class SchematicCommodityG06Response.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SchematicCommodityG06Response {

    /**
     * The g 06 name.
     */
    @ApiModelProperty(notes = "Name of the GPart", required = true, name = "g06Name", value = "GXX_SXX_XXXX_XXX")
    private String g06Name;

    /**
     * The g 06 description.
     */
    @ApiModelProperty(notes = "Description of the G06", required = true, name = "g06Description", value = "Description for the G06")
    private String g06Description;

    /**
     * The availability.
     */
    @ApiModelProperty(notes = "Availability of the G06", required = true, name = "availability", value = "If G06 is available")
    private String availability;

}

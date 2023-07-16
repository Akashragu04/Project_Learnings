/*
 *
 */
package com.daimler.schematicbackend.model.file;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The Class SchematicA06DatabaseResponse.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SchematicA06DatabaseResponse {

    /**
     * The dtna cir.
     */
    @ApiModelProperty(notes = "DTNACIR", required = true, name = "dtnaCir", value = "${dtnaCir}")
    private String dtnaCir;

    /**
     * The sae cir.
     */
    @ApiModelProperty(notes = "SAECIR", required = true, name = "saeCir", value = "${saeCir}")
    private String saeCir;

    /**
     * The color.
     */
    @ApiModelProperty(notes = "COLOR", required = true, name = "color", value = "${#color_code}")
    private String color;

    /**
     * The src connector name.
     */
    @ApiModelProperty(notes = "Source Connector Name", required = true, name = "srcConnectorName", value = "${srcConnectorName}")
    private String srcConnectorName;

    /**
     * The src cavity.
     */
    @ApiModelProperty(notes = "Source Cavity", required = true, name = "srcCavity", value = "${src_cavity}")
    private String srcCavity;

    /**
     * The dest connector name.
     */
    @ApiModelProperty(notes = "Destination Connector", required = true, name = "destConnectorName", value = "${destination_Connector}")
    private String destConnectorName;

    /**
     * The dest cavity.
     */
    @ApiModelProperty(notes = "Destination Cavity", required = true, name = "destCavity", value = "${destination_cavity}")
    private String destCavity;

    /**
     * The circuit description.
     */
    @ApiModelProperty(notes = "Circuit Description", required = true, name = "circuitDescription", value = "${circuitDescription}")
    private String circuitDescription;

    /**
     * The color name from "schematic_wire_color" table
     */
    @ApiModelProperty(notes = "Color Name", required = true, name = "colorName", value = "${colorName}")
    private String colorName;
}

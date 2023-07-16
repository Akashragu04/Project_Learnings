package com.daimler.schematicbackend.model.generic;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The type Schematic end point response.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SchematicEndPointResponse {

    @ApiModelProperty(notes = "Name of the endpoint", required = true, name = "endpointName")
    private String endpointName;

    @ApiModelProperty(notes = "Http Request Type", required = true, name = "endpointHttpType")
    private String endpointHttpType;

    @ApiModelProperty(notes = "Backend Controller URL", required = true, name = "endPointUrl")
    private String endPointUrl;
}

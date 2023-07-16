/*
 *
 */
package com.daimler.schematicbackend.model.generic;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * The Class SchematicGenericResponse.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SchematicGenericResponse {

    /**
     * The response message.
     */
    @ApiModelProperty(notes = "Success/Error Message", required = true, name = "responseMessage", value = "Operation Requested is successfully")
    private String responseMessage;

    /**
     * The checks failed.
     */
    @ApiModelProperty(notes = "Indicates the List of configuration mismatch", required = true, name = "checksFailed", value = "Operation Requested is successfully")
    private List<String> checksFailed;

}

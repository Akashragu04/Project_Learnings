/*
 *
 */
package com.daimler.schematicbackend.model.generic;

import com.daimler.schematicbackend.model.file.SchematicErrorMessageResponse;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * The Class SchematicGenericErrorMessageBody.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SchematicGenericErrorMessageBody {

    /**
     * The message.
     */
    @ApiModelProperty(notes = "Indicates if any errors", required = true, name = "message")
    private String message;

    /**
     * The error message response.
     */
    @ApiModelProperty(notes = "SchematicErrorMessageResponse", required = true, name = "errorMessageResponse")
    private List<SchematicErrorMessageResponse> errorMessageResponse;
}

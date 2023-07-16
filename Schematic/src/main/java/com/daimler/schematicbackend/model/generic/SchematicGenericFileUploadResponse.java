package com.daimler.schematicbackend.model.generic;

import com.daimler.schematicbackend.entity.file.ErrorMessage;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * The type Schematic generic file response.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SchematicGenericFileUploadResponse {

    /**
     * The response message.
     */
    @ApiModelProperty(notes = "Success/Error Message", required = true, name = "responseMessage", value = "Operation Requested is successfully")
    private String responseMessage;

    /**
     * The checks failed.
     */
    @ApiModelProperty(notes = "Indicates the List of configuration mismatch", required = true, name = "genericErrors", value = "String List")
    private List<String> genericErrors;

    /**
     * The error messages.
     */
    @ApiModelProperty(notes = "Indicates the List of configuration mismatch", required = true, name = "sheetErrors", value = "List of Error Message")
    private List<ErrorMessage> sheetErrors;

    @ApiModelProperty(notes = "Indicates the List of configuration mismatch", required = true, name = "warnMessage", value = "List of Warn Message")
    private List<String> warnMessage;
}

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
 * The Class SchematicErrorMessageResponse.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SchematicErrorMessageResponse {

    /**
     * The sheet name.
     */
    @ApiModelProperty(notes = "Name of the Sheet Uploaded", required = true, name = "Sheet Name", value = "A06/G06/Database/SGMapping/SAMapping sheet names")
    private String sheetName;

    /**
     * The row index.
     */
    @ApiModelProperty(notes = "Row with the error data", required = true, name = "rowIndex", value = "Any Positive Integer")
    private int rowIndex;

    /**
     * The message.
     */
    @ApiModelProperty(notes = "Reason why the row is believed to erroneous", required = true, name = "message", value = "Example: Source Row cannot be empty")
    private String message;

}

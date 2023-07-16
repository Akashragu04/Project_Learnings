/*
 *
 */
package com.daimler.schematicbackend.model.file;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * The Class SchematicStatusTimeFrameResponse.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SchematicStatusTimeFrameResponse {

    /**
     * The message.
     */
    @ApiModelProperty(notes = "Defines success/failure", required = true, name = "message", value = "Success or Failure")
    private String message;

    /**
     * The response list.
     */
    @ApiModelProperty(notes = "Data matching the time criteria", required = true, name = "responseList", value = "List of SchematicStatusLogResponse")
    private List<SchematicStatusLogResponse> responseList;

}

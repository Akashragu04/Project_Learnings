package com.daimler.schematicbackend.model.file;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SchematicA06DatabaseResponseNew {
    /**
     * a06description
     */
    @ApiModelProperty(notes = "A06Description", required = true, name = "a06description", value = "${a06description}")
    private String a06description;

    /**
     * list of SchematicA06DatabaseResponse
     */
    @ApiModelProperty(notes = "Number of A06 file data", required = true, name = "a06DataList", value = "List.class")
    List<SchematicA06DatabaseResponse> a06DataList;
}

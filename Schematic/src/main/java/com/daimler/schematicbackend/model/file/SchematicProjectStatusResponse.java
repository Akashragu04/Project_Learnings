
package com.daimler.schematicbackend.model.file;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SchematicProjectStatusResponse {

    /**
     * The rendered commodities count.
     */
    @ApiModelProperty(notes = "Rendered commodities count", required = true, name = "Completed", value = "${Completed")
    private long Completed;

    /**
     * The assinged commodities count.
     */
    @ApiModelProperty(notes = "Assigned commodities count", required = true, name = "Assinged", value = "${Assinged")
    private long Assinged;

    /**
     * The rendered commodities count.
     */
    @ApiModelProperty(notes = "Count of commodities need to assign", required = true, name = "Pending", value = "${Pending")
    private long Pending;

    /**
     * The rendered commodities count.
     */
    @ApiModelProperty(notes = "Status based on commodity initial values", required = true, name = "ResponseBasedOnCommodityLetters", value = "${ResponseBasedOnCommodityLetters")
    List<SchematicCommodityLettersResponse> ResponseBasedOnCommodityLetters;


}

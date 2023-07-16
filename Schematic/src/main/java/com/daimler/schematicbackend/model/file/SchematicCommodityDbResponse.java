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
 * The Class SchematicCommodityDbResponse.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SchematicCommodityDbResponse {

    /**
     * The a 06 mapping list.
     */
    @ApiModelProperty(notes = "Number of A06 linked to the commodity", required = true, name = "a06MappingList", value = "List.class")
    List<SchematicCommodityA06Response> a06MappingList;

    /**
     * The go 6 mapping list.
     */
    @ApiModelProperty(notes = "Number of A06 linked to the commodity", required = true, name = "g06MappingList", value = "List.class")
    List<SchematicCommodityG06Response> go6MappingList;

}

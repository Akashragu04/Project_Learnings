package com.daimler.schematicbackend.model.file;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The type Schematic commodity data.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SchematicCommodityData {

    /**
     * The commodity Name
     */
    private String commodityName;

    /**
     * The commodity Description
     */
    private String commodityDescription;
}

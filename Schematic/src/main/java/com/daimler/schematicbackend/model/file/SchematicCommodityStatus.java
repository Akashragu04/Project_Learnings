package com.daimler.schematicbackend.model.file;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * The type Schematic commodity status.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SchematicCommodityStatus {

    /**
     * The Inqueue list
     */
    List<SchematicCommodityData> inQueueList;

    /**
     * The Rendered List
     */
    List<SchematicCommodityData> renderedList;
}

package com.daimler.schematicbackend.model.file;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SchematicCommodityLettersResponse {


    private String Commodity_Start;

    private long Completed;

    private long Assinged;

    private long Pending;
}

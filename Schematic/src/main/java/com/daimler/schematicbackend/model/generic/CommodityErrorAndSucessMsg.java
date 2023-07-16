package com.daimler.schematicbackend.model.generic;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommodityErrorAndSucessMsg {

    private String commodity;

    private String response;
}

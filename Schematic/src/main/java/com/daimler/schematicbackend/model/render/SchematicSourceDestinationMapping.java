package com.daimler.schematicbackend.model.render;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.HashMap;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SchematicSourceDestinationMapping {

    String connectorName;
    boolean isDualSourceConnector;
    boolean isMated;
    String sourceConnector;
    String typeSpecification;
    HashMap<String, SchematicDestination> connectorMatedMap;
    HashMap<String, SchematicDestination> wireMatedMap;

}



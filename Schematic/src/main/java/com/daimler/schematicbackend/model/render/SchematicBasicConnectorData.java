package com.daimler.schematicbackend.model.render;

import lombok.*;

import java.util.HashSet;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class SchematicBasicConnectorData {
    private String connectorName;
    private List<String> pins;
    private byte[] imageData;
}
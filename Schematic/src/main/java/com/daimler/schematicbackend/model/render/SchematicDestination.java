package com.daimler.schematicbackend.model.render;

import lombok.*;

import java.util.HashSet;
import java.util.LinkedHashSet;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
public class SchematicDestination {
    private String destName;
    private LinkedHashSet<String> destPins;
    private LinkedHashSet<String> srcPins;
}

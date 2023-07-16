package com.daimler.schematicbackend.model.render;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SchematicColumnCoordinates {
    private double maxLeft;
    private double maxRight;
    private double deltaRight;
    private double deltaLeft;
    private int wireCountLeft = 1;
    private int wireCountRight = 1;
}

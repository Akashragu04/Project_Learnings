package com.daimler.schematicbackend.model.render;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Value {
    double startY;
    double endY;
    double currentVal;
}

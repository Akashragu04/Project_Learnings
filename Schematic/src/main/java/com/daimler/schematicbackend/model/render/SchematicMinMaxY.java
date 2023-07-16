package com.daimler.schematicbackend.model.render;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
public class SchematicMinMaxY {
    private double minStartY;
    private double maxEndY;
}

package com.daimler.schematicbackend.model.render;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class SchematicMinMaxEndStartX {
    private double minStartX;
    private double maxStartX;
    private double minEndX;
    private double maxEndX;
}

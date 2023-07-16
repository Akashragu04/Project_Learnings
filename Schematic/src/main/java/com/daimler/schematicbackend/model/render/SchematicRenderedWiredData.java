package com.daimler.schematicbackend.model.render;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class SchematicRenderedWiredData {

    private String dtnaCir;
    private boolean isSrcSplice;
    private boolean isDestSplice;
    private double posX;
    private double posY;
    private String wireData;
}

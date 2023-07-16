package com.daimler.schematicbackend.model.render;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class SchematicWireColorData {

    private int colorId;

    private String colorCode;

    private String colorHexCode;

    private String colorName;
}

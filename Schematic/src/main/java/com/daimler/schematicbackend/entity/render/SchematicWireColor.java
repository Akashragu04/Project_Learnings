package com.daimler.schematicbackend.entity.render;

import lombok.*;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "schematic_wire_color")
public class SchematicWireColor {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int colorId;

    private String colorCode;

    private String colorHexCode;

    private String colorName;
}

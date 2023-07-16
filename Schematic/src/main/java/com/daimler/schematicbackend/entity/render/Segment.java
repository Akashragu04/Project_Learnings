package com.daimler.schematicbackend.entity.render;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class Segment {
    private double x1;
    private double y1;
    private double x2;
    private double y2;
}
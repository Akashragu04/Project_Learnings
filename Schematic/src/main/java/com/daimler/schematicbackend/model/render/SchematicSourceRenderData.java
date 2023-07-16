package com.daimler.schematicbackend.model.render;

import com.daimler.schematicbackend.entity.render.RenderModel;
import com.daimler.schematicbackend.entity.render.Segment;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class SchematicSourceRenderData {
    private RenderModel srcData;
    private RenderModel destData;
    private Segment segment;
    private String sourcePort;
    private String destPort;
}

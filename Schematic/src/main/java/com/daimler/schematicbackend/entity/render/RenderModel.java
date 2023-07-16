package com.daimler.schematicbackend.entity.render;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@ToString
public class RenderModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String commodityName;
    private String connectorName;

    private double startX;
    private double startY;
    private double endX;
    private double endY;

    private int rowInd;
    private int columnInd;

    private double height;
    private double width;

    private String label;
    private String labelPosition;
    private String defaultPortDesignator;

    private boolean sourceConnector;
    private boolean destConnector;
    private boolean mated;

}

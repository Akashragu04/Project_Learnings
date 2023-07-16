package com.daimler.schematicbackend.model.render;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class SchematicPortCordinator {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String commodityName;
    private String connectorName;
    private String port;
    private double x;
    private double y;
    private int pinsIndex;
    private int delta;

}

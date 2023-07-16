package com.daimler.schematicbackend.entity.render;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class CommodityMaximum {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private int maxRow;
    private int maxCol;
    private String commodityName;

}

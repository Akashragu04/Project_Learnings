/*
 *
 */
package com.daimler.schematicbackend.entity.file;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * The Class SAMapping.
 */
@Entity
@Table(name = "schematic_commodity_A06_mapping")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class SAMapping {

    /**
     * The sa mapping id.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long saMappingId;

    /**
     * The sxx name.
     */
    private String sxxName;

    /**
     * The sxx description.
     */
    private String sxxDescription;

    /**
     * The a 06 name.
     */
    private String a06Name;

    /**
     * The a 06 description.
     */
    private String a06Description;
}

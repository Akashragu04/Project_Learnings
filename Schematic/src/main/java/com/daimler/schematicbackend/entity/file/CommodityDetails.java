/*
 *
 */
package com.daimler.schematicbackend.entity.file;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * The Class CommodityDetails.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "schematic_commodity_details")
public class CommodityDetails {

    /**
     * The commodity id.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long commodityId;

    /**
     * The commodity name.
     */
    private String commodityName;

    /**
     * The assigned.
     */
    private boolean assigned;

    /**
     * The assigned by.
     */
    private String assignedBy;

    /**
     * The assigned to.
     */
    private String assignedTo;

    /**
     * The assign date.
     */
    private LocalDateTime assignDate;

    /**
     * The renderable.
     */
    private boolean renderable;

    /**
     * The render date.
     */
    private LocalDateTime renderDate;

    /**
     * The priority.
     */
    private boolean priority;

    /**
     * The rendered.
     */
    private boolean rendered;

    /**
     * The Status
     */
    private String status;

}

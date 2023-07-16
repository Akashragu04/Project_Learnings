package com.daimler.schematicbackend.entity.file;

import lombok.*;

import javax.persistence.*;

/**
 * The Class CommodityRenderable.
 */
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "schematic_renderable_commodity")
@Builder
@EqualsAndHashCode
public class CommodityRenderable {

    /**
     * The commodity Renderable Id.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long commodityRenderableId;

    /**
     * The commodity name.
     */
    private String commodityName;

    /**
     * The commodity description
     **/
    private String commodityDescription;

    /**
     * The renderable.
     */
    private boolean renderable;
}

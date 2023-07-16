package com.daimler.schematicbackend.entity.file;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * The type Custom image.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "schematic_custom_image")
public class CustomImage {

    /**
     * The Custom Image Id.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long customImageId;

    /**
     * The Custom Image Name.
     */
    private String customImageName;

    /**
     * The Custom Image data.
     */
    @Lob
    private byte[] imageData;

    private String commodityName;

}

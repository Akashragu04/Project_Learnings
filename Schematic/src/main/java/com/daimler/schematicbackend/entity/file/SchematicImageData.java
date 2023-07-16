package com.daimler.schematicbackend.entity.file;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

/**
 * The type Custom image.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "schematic_image")
public class SchematicImageData {

    /**
     * The Image Id.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long imageId;

    /**
     * The Image Name.
     */
    private String imageName;

    /**
     * The Image data.
     */
    @Lob
    private String imageData;

    private String imageFlag;

    private String historyFlag;

    private String createdBy;
    private String updatedBy;
    private LocalDate updationDate;
    private LocalDate creationDate;

}

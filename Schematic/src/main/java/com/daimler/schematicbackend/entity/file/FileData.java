/*
 *
 */
package com.daimler.schematicbackend.entity.file;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

/**
 * The Class FileData.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "schematic_file_data")
@Builder
public class FileData {

    /**
     * The file id.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long fileId;

    /**
     * The file name.
     */
    private String fileName;

    /**
     * The file type.
     */
    private String fileType;

    /**
     * The file data.
     */
    @Lob
    private byte[] data;

    /**
     * The uploadedBy.
     */
    private String uploadedBy;

    /**
     * The uploaded.
     */
    private boolean uploaded;

    /**
     * The uploaded date.
     */
    private LocalDate uploadedDate;

}

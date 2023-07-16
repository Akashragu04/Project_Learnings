/*
 *
 */
package com.daimler.schematicbackend.entity.file;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * The Class ErrorMessage.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "schematic_error_data")
@Builder
public class ErrorMessage {

    /**
     * The error id.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long errorId;

    /**
     * The sheet name.
     */
    private String sheetName;

    /**
     * The row index.
     */
    private int rowIndex;

    /**
     * The error message.
     */
    private String message;
}

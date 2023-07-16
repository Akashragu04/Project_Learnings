/*
 *
 */
package com.daimler.schematicbackend.entity.file;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;

/**
 * The Class SGMapping.
 */
@Entity
@Table(name = "schematic_commodity_G06_mapping")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class SGMapping {

    /**
     * The sg mapping id.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long sgMappingId;

    /**
     * The fileName
     **/
    private String fileName;

    /**
     * The sxx name.
     */
    private String sxxName;

    /**
     * The g 06 name.
     */
    private String g06Name;

    private Timestamp uploadDate;

    private String userName;

}

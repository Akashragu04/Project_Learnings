package com.daimler.schematicbackend.entity.file;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;

/**
 * The type Database file data.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@ToString
@Table(name = "schematic_metadata")
public class DatabaseFileData {

    /**
     * The datbas id.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long datbaseId;

    /**
     * The fileName.
     */
    private String fileName;

    /**
     * The cnctr desc.
     */
    private String connectorDesc;

    /**
     * The cnctr nbr.
     */
    private String connectorNumber;

    /**
     * The nbr of cvts.
     */
    private String numberOfCav;

    /**
     * The cntr type.
     */
    private String connectorType;

    /**
     * The cstm img nme.
     */
    private String imageName;

    /**
     * The wr orintn frm.
     */
    private String wireOrientationFrom;

    /**
     * The pn seqnce.
     */
    private String pinSequence;

    /**
     * The metadata version
     */
    private String version;

    private String userName;

    private LocalDate uploadDate;

    private String connectorColor;

}

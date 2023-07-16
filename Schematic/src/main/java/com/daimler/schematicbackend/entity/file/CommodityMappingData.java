package com.daimler.schematicbackend.entity.file;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * The type Commodity mapping data.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "schematic_mapping_file_data")
public class CommodityMappingData {

    /**
     * The mapping id.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long mappingId;

    /**
     * The mapping name.
     */
    private String mappingName;

    /**
     * The s part name.
     */
    private String sPartName;

    /**
     * The g part name.
     */
    private String gPartName;
}

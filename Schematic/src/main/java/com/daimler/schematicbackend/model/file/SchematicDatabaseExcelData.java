package com.daimler.schematicbackend.model.file;

import com.poiji.annotation.ExcelCellName;
import com.poiji.annotation.ExcelRow;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

/**
 * The type Schematic database excel data.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SchematicDatabaseExcelData {

    /**
     * The row index.
     */
    @ExcelRow
    private int rowIndex;

    /**
     * The cnctr desc.
     */
    @NotBlank(message = "Connector Description cannot be blank")
    @NotNull(message = "Connector Description cannot be null")
    @NotEmpty(message = "Connector Description cannot be empty")
    @ExcelCellName("Connector Description")
    private String connectorDesc;

    /**
     * The cnctr nbr.
     */
    @ExcelCellName("Connector Numbers")
    private String connectorNumber;

    /**
     * The nbr of cvts.
     */
    @ExcelCellName("Number of Cavities")
    private String numberOfCav;

    /**
     * The cntr type.
     */
    @NotBlank(message = "CONNECTOR TYPE Name cannot be blank")
    @NotNull(message = "CONNECTOR TYPE Name cannot be null")
    @NotEmpty(message = "CONNECTOR TYPE Name cannot be empty")
    @ExcelCellName("Connector Type")
    private String connectorType;

    /**
     * The cstm img nme.
     */
    @ExcelCellName("Custom Image Names")
    private String imageName;

    /**
     * The wr orintn frm.
     */
    @ExcelCellName("Wire Orientation from")
    private String wireOrientationFrom;

    /**
     * The pn seqnce.
     */
    @ExcelCellName("Pin Sequence")
    private String pinSequence;

    /**
     * Connector Color
     */
    @ExcelCellName("Connector Color")
    private String connectorColor;

}

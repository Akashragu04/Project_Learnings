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
 * The type Schematic commodity mapping excel data.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SchematicCommodityMappingExcelData {

   /**
     * The row index.
     */
    @ExcelRow
    private int rowIndex;

    /**
     * The s part name.
     */
    @NotEmpty(message = "S PartName cannot be empty or blank")
    @ExcelCellName("S Part Name")
    private String sxxName;

    /**
     * The g part N ame.
     */
    @NotEmpty(message = "G PartName cannot be empty or blank")
    @ExcelCellName("G Part Name")
    private String g06Name;

}

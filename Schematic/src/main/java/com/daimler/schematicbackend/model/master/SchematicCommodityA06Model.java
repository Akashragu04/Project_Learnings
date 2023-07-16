/*
 *
 */
package com.daimler.schematicbackend.model.master;

import com.poiji.annotation.ExcelCellName;
import com.poiji.annotation.ExcelRow;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

/**
 * The Class SchematicCommodityA06Model.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SchematicCommodityA06Model {

    /**
     * The row index.
     */
    @ExcelRow
    private int rowIndex;

    /**
     * The sxx name.
     */
    
    @NotEmpty(message = "Commodity Number cannot be blank or empty")
    @ExcelCellName("Commodity Number")
    private String sxxName;

    /**
     * The sxx description.
     */
    
    @NotEmpty(message = "Commodity Description cannot be blank or empty")
    @ExcelCellName("Commodity Description")
    private String sxxDescription;

    /**
     * The a 06 name.
     */
    
    @NotEmpty(message = "A-part Numbers cannot be blank or empty")
    @ExcelCellName("A-part Numbers")
    private String a06Name;

    /**
     * The a 06 description.
     */
    
    @NotEmpty(message = "A-part Description cannot be blank or empty")
    @ExcelCellName("A-part Description")
    private String a06Description;

}

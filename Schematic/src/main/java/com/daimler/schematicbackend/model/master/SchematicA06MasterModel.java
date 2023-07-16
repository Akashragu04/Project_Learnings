package com.daimler.schematicbackend.model.master;

import javax.validation.constraints.NotEmpty;

import com.poiji.annotation.ExcelCellName;
import com.poiji.annotation.ExcelRow;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The Class SchematicA06MasterModel.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SchematicA06MasterModel {

	/**
	 * The row index.
	 */
	@ExcelRow
	private int rowIndex;

	/**
	 * The sxx name.
	 */

	@NotEmpty(message = "APart Number cannot be blank")
	@ExcelCellName("APart Number")
	private String a06Number;

	/**
	 * The a 06 name.
	 */

	@NotEmpty(message = "File Type cannot be blank")
	@ExcelCellName("File Type")
	private String fileType;

	/**
	 * The a 06 description.
	 */
	@ExcelCellName("Sub Apart")
	private String subApart;
}

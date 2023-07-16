/*
 *
 */
package com.daimler.schematicbackend.model.file;

import javax.validation.constraints.NotEmpty;

import com.poiji.annotation.ExcelCellName;
import com.poiji.annotation.ExcelRow;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The Class SchematicA06ExcelData.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SchematicA06ExcelData {

	/**
	 * The row index.
	 */
	@ExcelRow
	private int rowIndex;

	/**
	 * The dtna cir.
	 */
	@NotEmpty(message = "DTNA Circuit cannot be blank")
	@ExcelCellName("DTNA Circuit")
	private String dtnaCir;

	/**
	 * The sae cir.
	 */
	@NotEmpty(message = "SAE Circuit cannot be blank")
	@ExcelCellName("SAE Circuit")
	private String saeCir;

	/**
	 * The color.
	 */
	@NotEmpty(message = "Color cannot be blank")
	@ExcelCellName("Color")
	private String color;

	/**
	 * The src connector name.
	 */
	@NotEmpty(message = "Source Connector cannot be blank")
	@ExcelCellName("Source Connector")
	private String srcConnectorName;

	/**
	 * The src cavity.
	 */
	@NotEmpty(message = "Source Cavity cannot be blank")
	@ExcelCellName("Source Cavity")
	private String srcCavity;

	/**
	 * The dest connector name.
	 */
	@NotEmpty(message = "Destination Connector cannot be blank")
	@ExcelCellName("Destination Connector")
	private String destConnectorName;

	/**
	 * The dest cavity.
	 */
	@NotEmpty(message = "Destination Cavity cannot be blank")
	@ExcelCellName("Destination Cavity")
	private String destCavity;

	/**
	 * The circuit description.
	 */
	@NotEmpty(message = "Description cannot be blank")
	@ExcelCellName("Description")
	private String circuitDescription;

}

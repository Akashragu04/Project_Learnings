package com.daimler.schematicbackend.model.file;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.poiji.annotation.ExcelCellName;
import com.poiji.annotation.ExcelRow;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The type Schematic g 06 excel data.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SchematicG06ExcelData {

	/**
	 * The row index.
	 */
	@ExcelRow
	private int rowIndex;

	/**
	 * The dtna cir.
	 */
	@NotEmpty(message = "DTNA Circuit")
	@ExcelCellName("DTNA Circuit")
	private String dtnaCir;

	/**
	 * The sae cir.
	 */
	@NotEmpty(message = "SAE Circuit")
	@ExcelCellName("SAE Circuit")
	private String saeCir;

	/**
	 * The color.
	 */
	@NotEmpty(message = "Color")
	@ExcelCellName("Color")
	private String color;

	/**
	 * The origin des.
	 */
	@NotNull(message = "Origin Designator")
	@NotEmpty(message = "Origin Designator")
	@ExcelCellName("Origin Designator")
	private String originDes;

	/**
	 * The src connector number.
	 */

	@ExcelCellName("Source Connector Number")
	private String srcConnectorNumber;

	/**
	 * The src cavity.
	 */
	@NotNull(message = "Source Cavity")
	@NotEmpty(message = "Source Cavity")
	@ExcelCellName("Source Cavity")
	private String srcCavity;

	/**
	 * The mating des.
	 */
	@NotEmpty(message = "Mating Designator")
	@ExcelCellName("Mating Designator")
	private String matingDes;

	/**
	 * The dest connector number.
	 */

	@ExcelCellName("Destination Connector Number")
	private String destConnectorNumber;

	/**
	 * The dest cavity.
	 */
	@NotEmpty(message = "Destination Cavity")
	@ExcelCellName("Destination Cavity")
	private String destCavity;

	/**
	 * The mating connection type.
	 */
	@NotEmpty(message = "Mating Connection Via")
	@ExcelCellName("Mating Connection Via")
	private String matingConnectionType;

	/**
	 * The Cavity Description.
	 */
	@ExcelCellName("Cavity Description")
	private String cavityDescription;

	/**
	 * The device name.
	 */
	@ExcelCellName("Device Name")
	private String deviceName;

}

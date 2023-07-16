package com.daimler.schematicbackend.entity.render;

import java.io.Serializable;

import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.daimler.schematicbackend.embeddable.G06Embeddable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "schematic_render_g06_data")
@ToString
@EqualsAndHashCode
public class G06RenderData implements Serializable {

	/**
	 * The G06 Excel Data
	 **/
	@Embedded
	G06Embeddable g06ExcelData;
	/**
	 * The render G06 Id.
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int renderG06Id;
	/**
	 * The Commodity Name
	 **/
	private String commodityName;

	/** Source Port Designator **/
	/**
	 * The value can be '' or '`'
	 **/
	private String sourcePortDesignator;

	/**
	 * Destination Port Designator
	 **/
	/* The value can be '' or '`' **/
	private String destPortDesignator;

	/** The Connection Type **/
	/**
	 * Value Allowed are 2 or 4 or 6
	 **/
	private int connectionType;

}
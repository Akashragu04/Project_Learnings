/*
 *
 */
package com.daimler.schematicbackend.entity.file;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The Class A06Data.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "schematic_a06_data")
public class A06Data {

	/**
	 * The a 06 id.
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long a06Id;

	/**
	 * The a 06 name.
	 */
	private String a06name;

	/**
	 * The dtna cir.
	 */
	private String dtnaCir;

	/**
	 * The sae cir.
	 */
	private String saeCir;

	/**
	 * The color.
	 */
	private String color;

	/**
	 * The src connector name.
	 */
	private String srcConnectorName;

	/**
	 * The src cavity.
	 */
	private String srcCavity;

	/**
	 * The dest connector name.
	 */
	private String destConnectorName;

	/**
	 * The dest cavity.
	 */
	private String destCavity;

	/**
	 * The circuit description.
	 */
	private String circuitDescription;

	private String userName;

	private Timestamp uploadDate;

	private String modifiedBy;

	private LocalDateTime modifiedDate;


}

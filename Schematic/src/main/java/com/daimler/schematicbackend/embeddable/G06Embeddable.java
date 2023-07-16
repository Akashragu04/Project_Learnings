package com.daimler.schematicbackend.embeddable;

import java.io.Serializable;

import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Embeddable
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@EqualsAndHashCode
public class G06Embeddable implements Serializable {

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
	 * The origin des.
	 */
	private String originDes;

	/**
	 * The src connector number.
	 */
	private String srcConnectorNumber;

	/**
	 * The src cavity.
	 */
	private String srcCavity;

	/**
	 * The dest connector name.
	 */
	private String matingDes;

	/**
	 * The dest connector number.
	 */
	private String destConnectorNumber;

	/**
	 * The dest cavity.
	 */
	private String destCavity;

	/**
	 * The mating connection type.
	 */
	private String matingConnectionType;

	private String cavityDescription;

	private String deviceName;

	private String commodity;


}

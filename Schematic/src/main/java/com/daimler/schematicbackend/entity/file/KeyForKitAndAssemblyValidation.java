package com.daimler.schematicbackend.entity.file;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "key_for_kit_assembly_validation")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class KeyForKitAndAssemblyValidation {

	/**
	 * The validationIds.
	 */
	@Id
	private long validationId;

	/**
	 * The isValidateKitAndAssemble.
	 */
	private boolean validateKitAndAssemble;

	/**
	 * Remove commodites which are not in our project
	 */

	private boolean removeCommodities;

}

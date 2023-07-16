package com.daimler.schematicbackend.repository.master;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daimler.schematicbackend.entity.file.KeyForKitAndAssemblyValidation;

public interface KitAndAssemblyValidationRepository extends JpaRepository<KeyForKitAndAssemblyValidation, Long> {

	/**
	 * Count.
	 *
	 * @return the long
	 */
	long count();

}

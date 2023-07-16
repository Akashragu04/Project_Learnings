package com.intelizign.dmgcc.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.intelizign.dmgcc.models.businesscasemodels.BizCaseSetupModel;

public interface BizCaseSetupRepository extends JpaRepository<BizCaseSetupModel, Long> {

	@Query("SELECT u FROM BizCaseSetupModel u WHERE u.id = ?1")
	Optional<BizCaseSetupModel> findById(Long id);

	@Query(value = "SELECT u FROM BizCaseSetupModel u where u.bizcase.id = ?1")
	BizCaseSetupModel getBusinessSetupdetail(long bizid);
}

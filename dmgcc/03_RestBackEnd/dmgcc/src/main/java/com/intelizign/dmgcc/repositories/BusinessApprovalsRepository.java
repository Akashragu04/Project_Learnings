package com.intelizign.dmgcc.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.intelizign.dmgcc.models.businesscasemodels.BusinessApprovalsModel;

public interface BusinessApprovalsRepository extends JpaRepository<BusinessApprovalsModel, Long> {

	Page<BusinessApprovalsModel> findByRequestId(Pageable page, Long request_id);

	List<BusinessApprovalsModel> findByRequestId(Long request_id);

	@Query("SELECT u FROM BusinessApprovalsModel u WHERE u.approve_token = ?1")
	BusinessApprovalsModel findByApproveToken(String resettoken);

	@Query("SELECT u FROM BusinessApprovalsModel u WHERE u.request.id = ?1 and u.sequence_level = ?2 and u.status= ?3")
	List<BusinessApprovalsModel> findByRequestIdAndsequence_levelAndstatus(Long request_id, Integer sequencelevel,
			Boolean status);

	@Query("SELECT u FROM BusinessApprovalsModel u WHERE u.request.id = ?1 and u.sequence_level = ?2")
	List<BusinessApprovalsModel> findByRequestIdAndSequenceLevel(Long request_id, Integer sequencelevel);

	@Query("SELECT u FROM BusinessApprovalsModel u WHERE u.id = ?1")
	Optional<BusinessApprovalsModel> findById(Long id);
	
	@Query("SELECT u FROM BusinessApprovalsModel u WHERE u.request.id = ?1")
	List<BusinessApprovalsModel> findByRequest(Long request_id);
	
}

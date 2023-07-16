package com.intelizign.dmgcc.repositories;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.intelizign.dmgcc.models.SLAApproval;

public interface SLAapprovalRepository extends JpaRepository<SLAApproval, Long> {

	@Query("SELECT u FROM SLAApproval u WHERE u.sla_token = ?1")
	SLAApproval findBySLAApproveToken(String token);

	@Query("SELECT u FROM SLAApproval u WHERE u.sla.id = ?1 AND u.sla_approve=false")
	List<SLAApproval> getNonApproverList(Long slaid);

	@Query("SELECT u FROM SLAApproval u WHERE u.email=?1 AND u.sla.id = ?2")
	SLAApproval findSlaWithEmail(String email, Long id);

	@Query("SELECT u FROM SLAApproval u WHERE u.id = ?1")
	Optional<SLAApproval> findById(Long id);

	@Modifying
	@Transactional
	@Query("DELETE FROM SLAApproval u where u.sla.id=?1")
	void deleteBySla(long id);

	@Query("SELECT u FROM SLAApproval u WHERE  u.sla.id = ?1")
	List<SLAApproval> getSLAcontacts(Long id);

	@Query("SELECT u FROM SLAApproval u WHERE  u.slapreinvoice.id = ?1")
	List<SLAApproval> getSLAPreInvoicecontacts(Long id);

	@Query("SELECT u FROM SLAApproval u WHERE u.email=?1 AND u.sla.id = ?2")
	Optional<SLAApproval> findByApprover(String email, long slaid);
}

package com.intelizign.dmgcc.repositories.landingpage;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.intelizign.dmgcc.models.landingpage.BroucherModel;

public interface BroucherRepository extends JpaRepository<BroucherModel, Long> {

	@Query("SELECT  u FROM BroucherModel u WHERE u.active = ?1")
	List<BroucherModel> findByactive(boolean b);

	@Query("SELECT  u FROM BroucherModel u WHERE u.active = ?1 and u.created_by = ?2")
	List<BroucherModel> findByUserName(boolean b, String username);

	@Query("SELECT  u FROM BroucherModel u WHERE u.active = ?1 and u.is_approved= ?2")
	List<BroucherModel> findByActiveAndApproved(boolean b, boolean c);

	@Query("SELECT  u FROM BroucherModel u WHERE LOWER(CONCAT(u.title,u.id, u.description)) LIKE %?1% or UPPER(CONCAT(u.title,u.id, u.description)) LIKE %?1% and u.active = ?2 and u.created_by = ?3")
	Page<BroucherModel> findByUserNameWithSearch(String searchKeyword, boolean b, String username, Pageable pageable);

	@Query("SELECT  u FROM BroucherModel u WHERE LOWER( CONCAT(u.id,u.title, u.description)) LIKE %?1%  or UPPER( CONCAT(u.id,u.title, u.description)) LIKE %?1%and u.active = ?2")
	Page<BroucherModel> findByactiveWithSearch(String searchKeyword, boolean b, Pageable pageable);

}
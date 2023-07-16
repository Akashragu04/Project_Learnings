package com.intelizign.dmgcc.repositories.landingpage;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.intelizign.dmgcc.models.landingpage.ContentNewsLetterModel;

public interface ContentRepository extends JpaRepository<ContentNewsLetterModel, Long> {

	@Query("SELECT  u FROM ContentNewsLetterModel u WHERE u.active = ?1 and u.model_name=?2")
	List<ContentNewsLetterModel> findByactive(boolean b, String search);

	@Query("SELECT  u FROM ContentNewsLetterModel u WHERE u.active = ?1 and u.created_by = ?2 and u.model_name=?3")
	List<ContentNewsLetterModel> findByUserName(boolean b, String username, String search);

	@Query("SELECT  u FROM ContentNewsLetterModel u WHERE u.active = ?1 and u.is_approved= ?2 and u.model_name=?3")
	List<ContentNewsLetterModel> findByActiveAndApproved(boolean b, boolean c, String search);

	@Query("SELECT  u FROM ContentNewsLetterModel u WHERE u.active = ?1 and u.created_by = ?2 and u.model_name=?3 and LOWER(CONCAT(u.title,u.id, u.description)) LIKE %?4% or UPPER(CONCAT(u.title,u.id, u.description)) LIKE %?4%")
	Page<ContentNewsLetterModel> findByUserNameWithSearch(boolean b, String username, String modelName,
			String searchKeyword, Pageable pageable);

	@Query("SELECT  u FROM ContentNewsLetterModel u WHERE u.active = ?1 and u.model_name=?2 and LOWER(CONCAT(u.title,u.id, u.description)) LIKE %?3% or UPPER(CONCAT(u.title,u.id, u.description)) LIKE %?3%")
	Page<ContentNewsLetterModel> findByactiveWithSearch(boolean b, String modelName, String searchKeyword,
			Pageable pageable);

}

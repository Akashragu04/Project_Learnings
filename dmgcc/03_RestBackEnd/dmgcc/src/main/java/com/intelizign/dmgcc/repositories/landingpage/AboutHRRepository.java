package com.intelizign.dmgcc.repositories.landingpage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.intelizign.dmgcc.models.landingpage.AboutHRModel;

public interface AboutHRRepository extends JpaRepository<AboutHRModel, Long> {

	@Query("SELECT  u FROM AboutHRModel u WHERE u.active = ?1 and LOWER(CONCAT(u.model_name)) LIKE %?2% or UPPER(CONCAT(u.model_name)) LIKE %?2%")
	AboutHRModel findByactive(boolean b, String search);

}

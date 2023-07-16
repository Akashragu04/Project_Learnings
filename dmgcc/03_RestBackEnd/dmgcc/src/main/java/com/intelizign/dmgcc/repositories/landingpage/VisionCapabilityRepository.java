package com.intelizign.dmgcc.repositories.landingpage;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.intelizign.dmgcc.models.landingpage.VisionCapabilityModel;

public interface VisionCapabilityRepository extends JpaRepository<VisionCapabilityModel, Long> {

	@Query("SELECT  u FROM VisionCapabilityModel u WHERE u.active = ?1 and u.model_name =?2")
	List<VisionCapabilityModel> findByactive(boolean b, String search);

	@Query("SELECT  u FROM VisionCapabilityModel u WHERE u.active = ?1 and LOWER(CONCAT(u.title)) LIKE %?2% or UPPER(CONCAT(u.title)) LIKE %?2%")
	List<VisionCapabilityModel> findByactiveVision(boolean b, String search);
}

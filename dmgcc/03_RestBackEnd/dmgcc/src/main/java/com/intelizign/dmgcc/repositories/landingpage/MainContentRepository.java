package com.intelizign.dmgcc.repositories.landingpage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.intelizign.dmgcc.models.landingpage.MainContentModel;

public interface MainContentRepository extends JpaRepository<MainContentModel, Long>{

	@Query("SELECT  u FROM MainContentModel u WHERE u.active = ?1 and  u.model_name=?2")
	MainContentModel findByActiveservice(boolean b, String search);
}

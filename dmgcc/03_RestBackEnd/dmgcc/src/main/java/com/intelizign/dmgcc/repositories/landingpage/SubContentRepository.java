package com.intelizign.dmgcc.repositories.landingpage;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.intelizign.dmgcc.models.landingpage.SubContentModel;

public interface SubContentRepository extends JpaRepository<SubContentModel, Long> {

	@Query("SELECT  u FROM SubContentModel u WHERE u.active = ?1 and u.model_name=?2 and u.isSubcontent=?3")
	List<SubContentModel> findByactive(boolean b, String search, boolean s);

	@Query("SELECT  u FROM SubContentModel u WHERE u.active = ?1 and  u.model_name=?2")
	SubContentModel getByActiveAndModel(boolean b, String search);

	@Query("SELECT  u FROM SubContentModel u WHERE u.active = ?1 and u.model_name=?2")
	List<SubContentModel> findByActive(boolean b, String search);
	
	@Query("SELECT  u FROM SubContentModel u WHERE u.active = ?1 and u.model_name=?2 and u.isSubcontent=?3")
	SubContentModel findByactivemain(boolean b, String search,boolean s);
	
}

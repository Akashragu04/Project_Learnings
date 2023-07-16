package com.intelizign.dmgcc.repositories.landingpage;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.intelizign.dmgcc.models.landingpage.SubContentModel;
import com.intelizign.dmgcc.models.landingpage.SubListModel;

public interface SubListRepository extends JpaRepository<SubListModel,Long>{

	@Query("SELECT  u FROM SubListModel u WHERE u.active = ?1 and  u.model_name=?2")
	SubListModel getByActiveAndModel(boolean b, String search);
	
	@Query("SELECT  u FROM SubListModel u WHERE u.active = ?1 and u.model_name=?2")
	List<SubListModel> findByactive(boolean b, String search);
}

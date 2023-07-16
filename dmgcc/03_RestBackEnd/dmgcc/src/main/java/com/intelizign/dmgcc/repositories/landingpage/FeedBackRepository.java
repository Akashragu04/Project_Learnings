package com.intelizign.dmgcc.repositories.landingpage;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.intelizign.dmgcc.models.landingpage.FeedBackModel;
import com.intelizign.dmgcc.models.othermaster.GLGroupingModel;

public interface FeedBackRepository extends JpaRepository<FeedBackModel,Long>{

	@Query("SELECT  u FROM FeedBackModel u WHERE u.active = ?1")
	List<FeedBackModel> findByactive(boolean b);
	
	List<FeedBackModel> findAllByOrderById();
	
	
	@Query("SELECT  u FROM FeedBackModel u WHERE u.active = ?1 and u.cost_center = ?2")
	List<FeedBackModel> findByDepartment(boolean b, String department);
	
	@Query("SELECT  u FROM FeedBackModel u WHERE u.active = ?1 and u.short_id = ?2 ORDER BY u.id")
	List<FeedBackModel> findByShortId(boolean b, String short_id);
	
	
}


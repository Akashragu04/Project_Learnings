package com.intelizign.dmgcc.repositories.landingpage;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.intelizign.dmgcc.models.landingpage.TestimonialsModel;

public interface TestimonialsRepository extends JpaRepository<TestimonialsModel,Long>{

	@Query("SELECT  u FROM TestimonialsModel u WHERE u.active = ?1")
	List<TestimonialsModel> findByactive(boolean b);
}

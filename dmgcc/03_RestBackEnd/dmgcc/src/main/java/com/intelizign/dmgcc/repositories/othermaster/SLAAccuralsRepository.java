package com.intelizign.dmgcc.repositories.othermaster;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.intelizign.dmgcc.models.othermaster.SLAAccurals;

public interface SLAAccuralsRepository extends JpaRepository<SLAAccurals, Long> {

	@Query("Select p FROM SLAAccurals p where p.sla.id=?1 ")
	SLAAccurals FindBySLA(Long sla_id);

	List<SLAAccurals> findAllByOrderById();

}

package com.intelizign.dmgcc.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.intelizign.dmgcc.models.JDModel;

public interface JDRepositories extends JpaRepository<JDModel, Long> {

	List<JDModel> findByRequestId(Long bizid);

	void deleteAllByRequestId(Long bizid);

	@Query("SELECT u FROM JDModel u WHERE u.id = ?1")
	Optional<JDModel> findById(Long id);
}

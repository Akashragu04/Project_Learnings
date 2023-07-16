package com.intelizign.dmgcc.repositories.othermaster;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.intelizign.dmgcc.models.othermaster.ForexRatesModel;

@Repository
public interface ForexRatesRepository extends JpaRepository<ForexRatesModel, Long> {

	@Query("SELECT u FROM ForexRatesModel u WHERE u.year=?1 ")
	Page<ForexRatesModel> findAllByFilter(String filterKeyword, Pageable pageable);

	@Query(value = "SELECT u.to_inr FROM forex_rates u where u.currency= ?1", nativeQuery = true)
	String findByCurrency(String string);

	@Query("Select u from ForexRatesModel u where LOWER(CONCAT( u.id, u.currency,u.to_inr)) LIKE %?1% or UPPER(CONCAT( u.id, u.currency,u.to_inr)) LIKE %?1%")
	Page<ForexRatesModel> findbySearchandSort(String searchKeyword, Pageable pageable);

	List<ForexRatesModel> findAllByOrderById();
}
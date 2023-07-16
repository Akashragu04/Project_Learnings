package com.intelizign.dmgcc.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.intelizign.dmgcc.models.CostCenterModel;
import com.intelizign.dmgcc.models.othermaster.RateCardModel;
import com.intelizign.dmgcc.response.RateCardResponseByCurrency;

public interface RateCardRepository extends JpaRepository<RateCardModel, Long> {

	@Query("SELECT Distinct(r.costcenter) FROM RateCardModel r")
	List<CostCenterModel> getcostcenters();

	@Query("Select u from RateCardModel u where u.costcenter.id=?1 and u.year=?2 ")
	List<RateCardModel> findByCostcenterIdWithFilter(Long id, String filterKeyword);

	@Query("Select u from RateCardModel u where u.costcenter.id=?1 and LOWER(CONCAT(u.hourly_description,hourly_rate_inr,u.year)) LIKE %?2% "
			+ " or UPPER(CONCAT(u.hourly_description,hourly_rate_inr,u.year)) LIKE %?2%")
	List<RateCardModel> findbySearchandSort(Long id, String searchKeyword);

	@Query("Select u from RateCardModel u where u.costcenter.id=?1 ")
	List<RateCardModel> findbySearchandSort(Long id);

	List<RateCardModel> findByCostcenterId(Long id);

	List<RateCardModel> findAllByOrderById();

	@Query("Select new com.intelizign.dmgcc.response.RateCardResponseByCurrency(u.hourly_rate_inr as rate, u.hourly_description, u.level, u.year)  from RateCardModel u ")
	List<RateCardResponseByCurrency> findAllByINR();

	@Query("Select new com.intelizign.dmgcc.response.RateCardResponseByCurrency(u.hourly_rate_usd as rate, u.hourly_description, u.level, u.year) from RateCardModel u ")
	List<RateCardResponseByCurrency> findAllByUSD();

	@Query("Select new com.intelizign.dmgcc.response.RateCardResponseByCurrency(u.hourly_rate_ero as rate, u.hourly_description, u.level, u.year) from RateCardModel u ")
	List<RateCardResponseByCurrency> findAllByERO();

}

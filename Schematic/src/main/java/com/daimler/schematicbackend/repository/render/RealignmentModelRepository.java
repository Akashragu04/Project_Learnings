package com.daimler.schematicbackend.repository.render;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.daimler.schematicbackend.entity.render.RealignmentModel;

public interface RealignmentModelRepository extends JpaRepository<RealignmentModel, Long> {

	@Query("SELECT u FROM RealignmentModel u WHERE u.commodityName = ?1")
	RealignmentModel findByCommodityName(String commoditySearched);

	@Transactional
	@Modifying
	@Query("delete from RealignmentModel ra where ra.commodityName=?1")
	void deleteByCommodityName(String commodityName);

}

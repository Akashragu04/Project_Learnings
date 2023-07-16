/*
 *
 */
package com.daimler.schematicbackend.repository.master;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.daimler.schematicbackend.entity.file.SAMapping;

/**
 * The Interface SchematicSAMappingRepository.
 */
@Repository
public interface SchematicSAMappingRepository extends JpaRepository<SAMapping, Long> {

	/**
	 * Count.
	 *
	 * @return the long
	 */
	long count();

	/**
	 * delete by apart name
	 */
	@Transactional
	@Modifying
	@Query("delete from SAMapping sa where sa.a06Name in ?1")
	void deleteAllSAmappingApartName(List<String> apartName);

	@Transactional
	@Modifying
	@Query("delete from SAMapping sa where sa.sxxName in ?1")
	void deleteAllSAmappingByCommodityName(List<String> commodityName);

	/**
	 * get by apart name
	 */
	List<SAMapping> findByA06Name(String apartName);
}

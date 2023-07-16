package com.daimler.schematicbackend.repository.file;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.daimler.schematicbackend.entity.file.SGMapping;

/**
 * The Interface SchematicSGMappingRepository.
 */
@Repository
public interface SchematicSGMappingRepository extends JpaRepository<SGMapping, Long> {

	/**
	 * Find by sxx name list.
	 *
	 * @param commodityName the commodity name
	 * @return the list
	 */
	List<SGMapping> findBySxxName(String commodityName);

	@Query("select sg.g06Name from SGMapping sg where sg.sxxName=?1 ")
	List<String> findByCommodityName(String commodityName);

	/**
	 * Exists by g 06 name and sxx name boolean.
	 *
	 * @param g06Name the g 06 name
	 * @param sxxName the sxx name
	 * @return the boolean
	 */
	boolean existsByG06NameAndSxxName(String g06Name, String sxxName);

	@Transactional
	@Modifying
	@Query("delete from SGMapping sg where sg.sxxName = ?1")
	void deleteSGMappingByCommodityName(String commodityName);
}

package com.daimler.schematicbackend.repository.file;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.daimler.schematicbackend.entity.file.DatabaseFileData;

/**
 * The Interface SchematicDatabaseDataRepository.
 */
@Repository
public interface SchematicDatabaseDataRepository extends JpaRepository<DatabaseFileData, Long> {

	/**
	 * Exists by connector Desc.
	 *
	 * @param connectorDesc the cnctr desc
	 * @return true, if successful
	 */
	boolean existsByConnectorDesc(String connectorDesc);

	@Transactional
	@Modifying
	@Query("delete from DatabaseFileData dfd where dfd.connectorDesc=:connectorDesc")
	void deleteByConnectorDesc(@Param("connectorDesc") String connectorDesc);

	@Transactional
	@Modifying
	@Query("delete from DatabaseFileData dfd where dfd.fileName=?1")
	void deleteByFileName(String fileName);

	@Query("select md from DatabaseFileData md where md.fileName=?1")
	List<DatabaseFileData> findByFileName(String filename);
}

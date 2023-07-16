package com.daimler.schematicbackend.repository.file;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.daimler.schematicbackend.entity.file.G06Data;
import com.daimler.schematicbackend.entity.file.G06ModLogData;

/**
 * The Interface SchematicG06DataRepository.
 */
public interface SchematicG06DataRepository extends JpaRepository<G06Data, Long> {

	/**
	 * Exists by G 06 name. ß
	 *
	 * @param filename the filename
	 * @return true, if successful
	 */
	boolean existsByG06name(String filename);

	boolean existsByG06nameAndGo6EmbeddableCommodity(String filename, String commodity);

	@Transactional
	@Modifying
	@Query(value = "UPDATE schematicdb.schematic_g06_data " + "SET " + "g06name =:g06name," + "color =:color,"
			+ "dest_cavity =:dest_cavity," + "dest_connector_number =:dest_connector_number," + "dtna_cir =:dtna_cir,"
			+ "mating_connection_type =:mating_connection_type," + "mating_des =:mating_des,"
			+ "origin_des =:origin_des," + "sae_cir =:sae_cir," + "src_cavity =:src_cavity,"
			+ "src_connector_number =:src_connector_number," + "cavity_description =:cavity_description,"
			+ "device_name =:device_name," + "commodity =:commodity "
			+ "WHERE schematic_g06_data.g06id =:g06Id", nativeQuery = true)
	void updateExistingG06Data(@Param("g06name") String g06name, @Param("color") String color,
			@Param("dest_cavity") String dest_cavity, @Param("dest_connector_number") String dest_connector_number,
			@Param("dtna_cir") String dtna_cir, @Param("mating_connection_type") String mating_connection_type,
			@Param("mating_des") String mating_des, @Param("origin_des") String origin_des,
			@Param("sae_cir") String sae_cir, @Param("src_cavity") String src_cavity,
			@Param("src_connector_number") String src_connector_number,
			@Param("cavity_description") String cavity_description, @Param("device_name") String device_name,
			@Param("commodity") String commodity, @Param("g06Id") Long g06Id);

	List<G06Data> findByG06name(String filename);

//	@Query("SELECT g FROM G06Data u WHERE g.g06name = ?1 and g.commodity=?2")
//	List<G06Data> findByG06nameAndCommodity(String filename, String commodity);

	@Transactional
	@Modifying
	@Query(value = "delete from schematic_g06_data where g06name=:filename and commodity=:commodity", nativeQuery = true)
	void deleteByg06name(@Param("filename") String filename, @Param("commodity") String commodity);

	@Transactional
	@Modifying
	@Query(value = "SELECT g06name,user_name,upload_date,commodity,\n" + " MIN(upload_date) AS creationDate, \n"
			+ " MAX(upload_date) AS modifiedDate \n"
			+ " FROM schematic_g06_data where g06name =:g06Name and upload_date between :startDate and :endDate \n"
			+ " GROUP BY g06name, user_name", nativeQuery = true)
	List<G06ModLogData> getModMaxLogDetails(@Param("g06Name") String g06Name,
			@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);

}

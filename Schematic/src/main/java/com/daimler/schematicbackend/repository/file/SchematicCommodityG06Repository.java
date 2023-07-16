/*
 *
 */
package com.daimler.schematicbackend.repository.file;

import com.daimler.schematicbackend.entity.file.SGMapping;
import com.daimler.schematicbackend.entity.file.SGMappingModLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

/**
 * The Interface SchematicCommodityG06Repository.
 */
@Repository
public interface SchematicCommodityG06Repository extends JpaRepository<SGMapping, Long> {

    @Transactional
    @Modifying
    /*
     * @Query(value = "SELECT g06name,sxx_name,user_name,upload_date,  \n" + " MIN(upload_date) AS creationDate, \n" +
     * " MAX(upload_date) AS modifiedDate \n" +
     * " FROM schematic_commodity_g06_mapping where sxx_name =:commodity",nativeQuery = true)
     */
    @Query(value = "SELECT g06name g06name,sxx_name sxxName,user_name userName,upload_date uploadDate,MIN(upload_date) AS creationDate,MAX(upload_date) AS modifiedDate FROM schematic_commodity_g06_mapping  where sxx_name =:commodity and upload_date between :startDate and :endDate", nativeQuery = true)
    List<SGMappingModLog> getSGModLogDetails(@Param("commodity") String commodity,
            @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
}

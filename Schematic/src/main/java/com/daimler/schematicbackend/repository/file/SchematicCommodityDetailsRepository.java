/*
 *
 */
package com.daimler.schematicbackend.repository.file;

import com.daimler.schematicbackend.entity.file.CommodityDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * The Interface SchematicCommodityDetailsRepository.
 */
public interface SchematicCommodityDetailsRepository extends JpaRepository<CommodityDetails, Long> {

    /**
     * Exists by commodity name boolean.
     *
     * @param commodityName
     *            the commodity name
     * @return the boolean
     */
    boolean existsByCommodityName(String commodityName);

    /**
     * Find by commodity name commodity details.
     *
     * @param commodityName
     *            the commodity name
     * @return the commodity details
     */
    CommodityDetails findByCommodityName(String commodityName);

    /**
     * Find by assigned to list.
     *
     * @param userName
     *            the user name
     * @return the list
     */
    List<CommodityDetails> findByAssignedTo(String userName);


    @Query(value = "select count(*) from schematic_commodity_details scd where scd.assigned_to=:userName and scd.status='Assigned'", nativeQuery = true)
    long getUserCountByStaus(String userName);

    @Query(value = "select count(*) from schematic_commodity_details scd where scd.status=:status", nativeQuery = true)
    long getCountByStaus(String status);

    @Query(value="select commodity_name from schematic_commodity_details scd where scd.status=:status",nativeQuery = true)
    List<String> getCommoditiesByStatus(String status);

    @Query(value="select COUNT(*) from schematic_commodity_details scd where scd.commodity_name like :fistLetters% and scd.status=:status",nativeQuery = true)
    long getCountBylettersAndStatus(String fistLetters,String status);
}

/*
 *
 */
package com.daimler.schematicbackend.repository.file;

import com.daimler.schematicbackend.entity.file.SAMapping;
import com.daimler.schematicbackend.entity.file.SGMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * The Interface SchematicCommodityA06Repository.
 */
@Repository
public interface SchematicCommodityA06Repository extends JpaRepository<SAMapping, Long> {
    /**
     * Find by sxx name list.
     *
     * @param commodityName
     *            the commodity name
     * @return the list
     */
    List<SAMapping> findBySxxName(String commodityName);

    /**
     * Find by a06 name list
     */
    List<SAMapping> findBya06Name(String a06Name);
}

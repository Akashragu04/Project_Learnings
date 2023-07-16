/*
 *
 */
package com.daimler.schematicbackend.repository.file;

import com.daimler.schematicbackend.entity.file.A06Data;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * The Interface SchematicA06DataRepository.
 */
@Repository
public interface SchematicA06DataRepository extends JpaRepository<A06Data, Long> {

    /**
     * Exists by A 06 name.
     *
     * @param filename
     *            the filename
     * @return true, if successful
     */
    boolean existsByA06name(String filename);

    /**
     * Find by A 06 name.
     *
     * @param a06Name
     *            the a 06 name
     * @return the list
     */
    List<A06Data> findByA06name(String a06Name);

    @Transactional
    @Modifying
    @Query("delete from A06Data a where a.a06name=:a06Name")
    void deleteByA06Name(@Param("a06Name") String a06Name);

}

/*
 *
 */
package com.daimler.schematicbackend.repository.file;

import com.daimler.schematicbackend.entity.file.ErrorMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * The Interface SchematicErrorMessageRepository.
 */
@Repository
public interface SchematicErrorMessageRepository extends JpaRepository<ErrorMessage, Long> {

    /**
     * Delete all by sheet name.
     *
     * @param sheetName the sheet name
     */
    @Transactional
    @Modifying
    @Query("delete from ErrorMessage emg where emg.sheetName=?1")
    void deleteAllBySheetName( String sheetName);

    /**
     * Exists by sheet name boolean.
     *
     * @param sheetName
     *            the sheet name
     * @return the boolean
     */
    boolean existsBySheetName(String sheetName);

    /**
     * Find by sheet name list.
     *
     * @param sheetName
     *            the sheet name
     * @return the list
     */
    List<ErrorMessage> findBySheetName(String sheetName);
}

/*
 *
 */
package com.daimler.schematicbackend.repository.file;

import com.daimler.schematicbackend.entity.file.FileData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * The Interface SchematicFileDataRepository.
 */
@Repository
public interface SchematicFileDataRepository extends JpaRepository<FileData, Long> {

    /**
     * Exists by file name.
     *
     * @param filename the filename
     * @return true, if successful
     */
    boolean existsByFileName(String filename);

    /**
     * Exists by file name and uploaded true boolean.
     *
     * @param filename
     *            the filename
     * @return the boolean
     */
    boolean existsByFileNameAndUploadedTrue(String filename);

    @Transactional
    @Modifying
    @Query("delete from FileData s where s.fileName =:filename")
    void deleteByFileName(@Param("filename")String filename);
}

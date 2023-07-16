package com.daimler.schematicbackend.repository.file;

import com.daimler.schematicbackend.entity.file.SchematicImageData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * The interface Custom image repository.
 */
@Repository
public interface SchematicImageDataRepository extends JpaRepository<SchematicImageData, Long> {

    // boolean existsByImageNameAndFlag(boolean flag);
    @Transactional
    @Modifying
    @Query(value = "select * from schematic_image where image_flag =:imageFlag and history_flag ='N' ", nativeQuery = true)
    List<SchematicImageData> findByImageFlag(String imageFlag);

    @Transactional
    @Modifying
    @Query(value = "select * from schematic_image ", nativeQuery = true)
    List<SchematicImageData> findByImageNameAndFlag();

    @Transactional
    @Modifying
    @Query(value = "delete from schematic_image where image_flag =:imageFlag", nativeQuery = true)
    void deleteImageByFlag(@Param("imageFlag") String imageFlag);

    @Transactional
    @Modifying
    @Query(value = "delete from schematic_image where image_flag =:imageFlag ", nativeQuery = true)
    void deleteImageIfExist(@Param("imageFlag") String imageFlag);

}

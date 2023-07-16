package com.daimler.schematicbackend.repository.render;

import com.daimler.schematicbackend.entity.render.RenderModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface SchematicRenderModelRepository extends JpaRepository<RenderModel, Long> {

    @Transactional
    @Modifying
    @Query("delete from RenderModel r where r.commodityName=:commodityName")
    void deleteByCommodityName(@Param("commodityName") String commodityName);

}

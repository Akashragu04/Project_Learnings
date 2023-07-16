package com.daimler.schematicbackend.repository.render;

import com.daimler.schematicbackend.entity.render.G06RenderData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface SchematicG06Repository extends JpaRepository<G06RenderData, Long> {

    List<G06RenderData> findByCommodityName(String commodityName);

    @Transactional
    @Modifying
    @Query("delete from G06RenderData s where s.commodityName=:commodityName")
    void deleteByCommodityName(@Param("commodityName") String commodityName);

}

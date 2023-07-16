package com.daimler.schematicbackend.repository.render;

import com.daimler.schematicbackend.entity.render.CommodityMaximum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface SchematicCommodityMaxRepository extends JpaRepository<CommodityMaximum, Long> {

    Optional<CommodityMaximum> findByCommodityName(String commodityName);

    @Transactional
    @Modifying
    @Query("delete from CommodityMaximum cm where cm.commodityName=:commodityName")
    void deleteByCommodityName(@Param("commodityName") String commodityName);

}

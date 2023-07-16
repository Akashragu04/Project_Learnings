package com.daimler.schematicbackend.repository.render;

import com.daimler.schematicbackend.model.render.SchematicPortCordinator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SchematicPortCoordinateRepository extends JpaRepository<SchematicPortCordinator, Integer> {
    boolean existsByCommodityName(String commodityName);
}

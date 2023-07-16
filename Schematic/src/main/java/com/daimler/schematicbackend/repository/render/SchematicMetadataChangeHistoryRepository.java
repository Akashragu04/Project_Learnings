package com.daimler.schematicbackend.repository.render;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SchematicMetadataChangeHistoryRepository
        extends JpaRepository<com.daimler.schematicbackend.entity.render.SchematicMetadataChangeHistory, Integer> {

}
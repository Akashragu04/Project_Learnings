package com.daimler.schematicbackend.repository.file;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daimler.schematicbackend.entity.file.BulkUploadValidation;

public interface BulkUploadValidationRepository extends JpaRepository<BulkUploadValidation, Long> {

}

package com.daimler.schematicbackend.repository.master;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daimler.schematicbackend.entity.file.BulkUploadDetails;

public interface BulkUploadDetailsRepository extends JpaRepository<BulkUploadDetails, Long> {

}

/*
 *
 */
package com.daimler.schematicbackend.service.file;

import com.daimler.schematicbackend.dto.file.request.SchematicFileUploadLogRequestDto;
import com.daimler.schematicbackend.entity.entityManager.SGMappingEntityManager;
import com.daimler.schematicbackend.entity.file.*;
import com.daimler.schematicbackend.exception.file.SchematicFileException;
import com.daimler.schematicbackend.model.generic.SchematicFileUploadInfoResponse;
import com.daimler.schematicbackend.repository.file.*;
import com.speedment.jpastreamer.application.JPAStreamer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DateTimeException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

/**
 * The Class SchematicModLogService. Author by Sriramulu
 */
@Service
public class SchematicModLogService {

    /**
     * The jpa streamer.
     */
    @Autowired
    JPAStreamer jpaStreamer;

    @Autowired
    SGMappingEntityManager sGMappingEnitityManager;

    @Autowired
    SchematicRenderableRepository renderableRepository;

    @Autowired
    SchematicG06DataRepository g06DataRepository;

    public List<SchematicFileUploadInfoResponse> filterModLogDataByDate(
            SchematicFileUploadLogRequestDto statusLogRequest) throws SchematicFileException {
        List<SchematicFileUploadInfoResponse> fileUploadLogResponseList = new ArrayList<>();
        try {
            LocalDateTime startDate = stringToLocalDateConverter(statusLogRequest.getStartDate());
            LocalDateTime endDate = stringToLocalDateConverter(statusLogRequest.getEndDate());
            validateDate(startDate, endDate);
            java.sql.Timestamp sqlStartDate = java.sql.Timestamp.valueOf(startDate);
            java.sql.Timestamp sqlEndDate = java.sql.Timestamp.valueOf(endDate);
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:s");
            LocalDateTime modifiedDateTime = null;
            LocalDateTime creationDateTime = null;
            LocalDateTime g06modifiedDateTime = null;
            LocalDateTime g06creationDateTime = null;
            List<SGMappingModLog> sgModLogDetails = new ArrayList<SGMappingModLog>();
            List<SGMappingModLog> sgModLogDetailsList = new ArrayList<SGMappingModLog>();
            List<SGMapping> g06AndSgMappingDetails = new ArrayList<SGMapping>();
            List<G06ModLogData> g06modminData = new ArrayList<>();
            // getting commodities based on rendered true .
            List<CommodityRenderable> commodityForLog = renderableRepository.findByRenderableTrue();
            for (CommodityRenderable cr : commodityForLog) {
                if (cr.getCommodityName() != null) {
                    // Sg Mapping details based on upload_Date between from to Dates .
                    sgModLogDetails = sGMappingEnitityManager.getModLogDetails(cr.getCommodityName(), sqlStartDate,
                            sqlEndDate);
                    if (!sgModLogDetails.isEmpty() && sgModLogDetails != null)
                        sgModLogDetailsList.addAll(sgModLogDetails);
                    // getting g06Name based on commodity
                    g06AndSgMappingDetails = findBySgMappings(cr.getCommodityName());
                }
            }
            if (g06AndSgMappingDetails != null) {
                for (SGMapping a06AndSgMappingDetail : g06AndSgMappingDetails) {
                    if (a06AndSgMappingDetail.getG06Name() != null) {
                        // Getting Modified details based on file name and commodity .
                        g06modminData = sGMappingEnitityManager.getG06ModLogDetails(a06AndSgMappingDetail.getG06Name(),
                                sqlStartDate, sqlEndDate);
                    }
                }
                if (!g06modminData.isEmpty() && g06modminData != null) {
                    for (G06ModLogData g06ModLogData : g06modminData) {
                        SchematicFileUploadInfoResponse schematicFile = new SchematicFileUploadInfoResponse();
                        schematicFile.setUploadedBy(g06ModLogData.getUserName());
                        schematicFile.setCommodity(g06ModLogData.getCommodity());
                        schematicFile.setModifiedBy(g06ModLogData.getModifiedBy());
                        if (g06ModLogData.getModifiedDate() != null)
                            // g06modifiedDateTime = LocalDateTime.parse(g06ModLogData.getModifiedDate(), formatter);
                            schematicFile.setModifiedDate(g06ModLogData.getModifiedDate());
                        if (g06ModLogData.getCreationDate() != null)
                            // g06creationDateTime = LocalDateTime.parse(g06ModLogData.getCreationDate(), formatter);
                            schematicFile.setCreationDate(g06ModLogData.getCreationDate());
                        fileUploadLogResponseList.add(schematicFile);
                    }
                }

            }
            if (!sgModLogDetailsList.isEmpty() && sgModLogDetailsList != null) {
                for (SGMappingModLog sgModLogDetail : sgModLogDetailsList) {
                    SchematicFileUploadInfoResponse schematicFile = new SchematicFileUploadInfoResponse();
                    if (sgModLogDetail.getUserName() != null)
                        schematicFile.setUploadedBy(sgModLogDetail.getUserName());
                    if (sgModLogDetail.getSxxName() != null)
                        schematicFile.setCommodity(sgModLogDetail.getSxxName());
                    if (sgModLogDetail.getUserName() != null)
                        schematicFile.setModifiedBy(sgModLogDetail.getUserName());
                    if (sgModLogDetail.getModifiedDate() != null)
                        // modifiedDateTime = LocalDateTime.parse(sgModLogDetail.getModifiedDate(), formatter);
                        schematicFile.setModifiedDate(sgModLogDetail.getModifiedDate());
                    if (sgModLogDetail.getCreationDate() != null)
                        // creationDateTime = LocalDateTime.parse(sgModLogDetail.getCreationDate(), formatter);
                        schematicFile.setCreationDate(sgModLogDetail.getCreationDate());
                    fileUploadLogResponseList.add(schematicFile);
                }
            }
        } catch (DateTimeException ex) {
            throw new SchematicFileException("Date provided in invalid format");
        }
        return fileUploadLogResponseList;
    }

    /**
     * Validate date.
     *
     * @param startDate
     *            the start date
     * @param endDate
     *            the end date
     * @throws SchematicFileException
     *             the schematic file exception
     */
    private void validateDate(LocalDateTime startDate, LocalDateTime endDate) throws SchematicFileException {
        if (endDate.isBefore(startDate) || startDate.isAfter(endDate)) {
            throw new SchematicFileException("Start Date cannot be after End date");
        }

    }

    public List<SGMapping> findBySgMappings(String commodityName) {
        return jpaStreamer.stream(SGMapping.class).filter(SGMapping$.sxxName.equalIgnoreCase(commodityName))
                .collect(Collectors.toList());
    }

    /**
     * String to local date converter.
     *
     * @param startDate
     *            the start date
     * @return the local date
     * @throws DateTimeException
     *             the date time exception
     */
    private LocalDateTime stringToLocalDateConverter(String startDate) throws DateTimeException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss", Locale.ENGLISH);
        LocalDateTime localDate = LocalDateTime.parse(startDate, formatter);
        return localDate;
    }

}

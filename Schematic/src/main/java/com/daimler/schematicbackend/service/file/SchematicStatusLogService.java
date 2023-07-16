/*
 *
 */
package com.daimler.schematicbackend.service.file;

import com.daimler.schematicbackend.config.SchematicMiscConfig;
import com.daimler.schematicbackend.dto.file.request.SchematicStatusLogRequestDto;
import com.daimler.schematicbackend.entity.file.CommodityDetails;
import com.daimler.schematicbackend.entity.file.CommodityDetails$;
import com.daimler.schematicbackend.exception.file.SchematicFileException;
import com.daimler.schematicbackend.model.file.SchematicStatusLogResponse;
import com.speedment.jpastreamer.application.JPAStreamer;
import com.speedment.jpastreamer.field.predicate.Inclusion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DateTimeException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

/**
 * The Class SchematicStatusLogService.
 */
@Service
public class SchematicStatusLogService {

    /**
     * The jpa streamer.
     */
    @Autowired
    JPAStreamer jpaStreamer;

    /**
     * The misc config.
     */
    @Autowired
    SchematicMiscConfig miscConfig;

    /**
     * Filter data by date.
     *
     * @param statusLogRequest
     *            the status log request
     * @return the list
     * @throws SchematicFileException
     *             the schematic file exception
     */
    public List<SchematicStatusLogResponse> filterDataByDate(SchematicStatusLogRequestDto statusLogRequest)
            throws SchematicFileException {
        /** added more variables in SchematicStatusLogResponse for response **/
        List<SchematicStatusLogResponse> statusLogResponseList;
        try {
            LocalDateTime startDate = stringToLocalDateConverter(statusLogRequest.getStartDate());
            LocalDateTime endDate = stringToLocalDateConverter(statusLogRequest.getEndDate());
            validateDate(startDate, endDate);
            statusLogResponseList = jpaStreamer.stream(CommodityDetails.class)
                    .filter(CommodityDetails$.renderDate
                            .between(startDate, endDate, Inclusion.START_INCLUSIVE_END_INCLUSIVE)
                            .or(CommodityDetails$.assignDate.between(startDate, endDate,
                                    Inclusion.START_INCLUSIVE_END_INCLUSIVE)))
                    .map(elem -> miscConfig.getModelMapper().map(elem, SchematicStatusLogResponse.class))
                    .collect(Collectors.toList());
        } catch (DateTimeException ex) {
            throw new SchematicFileException("Date provided in invalid format");
        }
        return statusLogResponseList;
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
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return LocalDateTime.parse(startDate, dtf);
    }

}

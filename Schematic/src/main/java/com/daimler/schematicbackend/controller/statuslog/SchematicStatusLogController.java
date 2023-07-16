/*
 *
 */
package com.daimler.schematicbackend.controller.statuslog;

import com.daimler.schematicbackend.dto.file.request.SchematicStatusLogRequestDto;
import com.daimler.schematicbackend.exception.file.SchematicFileException;
import com.daimler.schematicbackend.model.file.SchematicStatusLogResponse;
import com.daimler.schematicbackend.model.file.SchematicStatusTimeFrameResponse;
import com.daimler.schematicbackend.service.file.SchematicStatusLogService;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

/**
 * The Class SchematicStatusLogController.
 */
@RestController
public class SchematicStatusLogController implements ISchematicStatusLogEndpoint {

    /**
     * The status log service.
     */
    @Autowired
    SchematicStatusLogService statusLogService;

    /**
     * Gets the status log.
     *
     * @param statusLogRequest the status log request
     * @return the status log
     * @throws SchematicFileException the schematic file exception
     */
    @Override
    public ResponseEntity<SchematicStatusTimeFrameResponse> getStatusLog(
            @Valid SchematicStatusLogRequestDto statusLogRequest) throws SchematicFileException {
        List<SchematicStatusLogResponse> response = statusLogService.filterDataByDate(statusLogRequest);
        if (ObjectUtils.isEmpty(response)) {
            return ResponseEntity.badRequest()
                    .body(new SchematicStatusTimeFrameResponse("No Data found for timeframe", response));
        }
        return ResponseEntity.ok(new SchematicStatusTimeFrameResponse("Data Recieved for the timeframe", response));
    }

}

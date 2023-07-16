/*
 *
 */
package com.daimler.schematicbackend.controller.modLog;

import com.daimler.schematicbackend.dto.file.request.SchematicFileUploadLogRequestDto;
import com.daimler.schematicbackend.dto.file.request.SchematicStatusLogRequestDto;
import com.daimler.schematicbackend.exception.file.SchematicFileException;
import com.daimler.schematicbackend.model.file.SchematicFileUploadTimeFrameResponse;
import com.daimler.schematicbackend.model.file.SchematicStatusLogResponse;
import com.daimler.schematicbackend.model.file.SchematicStatusTimeFrameResponse;
import com.daimler.schematicbackend.model.generic.SchematicFileUploadInfoResponse;
import com.daimler.schematicbackend.service.file.SchematicModLogService;
import com.daimler.schematicbackend.service.file.SchematicStatusLogService;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

/**
 * The Class SchematicModLogController.
 * Author by Sriramulu
 */
@RestController
public class SchematicModLogController implements ISchematicModLogEndpoint {

    /**
     * The status log service.
     */
    @Autowired
    SchematicModLogService modLogService;

    @Override
    public ResponseEntity<SchematicFileUploadTimeFrameResponse> getUploadFileInfo(
            SchematicFileUploadLogRequestDto fileUploadLogRequest) throws SchematicFileException {

        List<SchematicFileUploadInfoResponse> response = modLogService.filterModLogDataByDate(fileUploadLogRequest);
        if (ObjectUtils.isEmpty(response)) {
            return ResponseEntity.badRequest()
                    .body(new SchematicFileUploadTimeFrameResponse("No Data found for timeframe", response));
        }
        return ResponseEntity.ok(new SchematicFileUploadTimeFrameResponse("Data Received for the timeframe", response));
    }

}

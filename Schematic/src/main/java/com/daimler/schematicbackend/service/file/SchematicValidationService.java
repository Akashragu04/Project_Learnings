/*
 *
 */
package com.daimler.schematicbackend.service.file;

import com.daimler.schematicbackend.config.SchematicMiscConfig;
import com.daimler.schematicbackend.entity.file.ErrorMessage;
import com.daimler.schematicbackend.entity.file.ErrorMessage$;
import com.daimler.schematicbackend.exception.file.SchematicFileException;
import com.daimler.schematicbackend.model.file.SchematicErrorMessageResponse;
import com.daimler.schematicbackend.repository.file.SchematicFileDataRepository;
import com.speedment.jpastreamer.application.JPAStreamer;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * The Class SchematicValidationService.
 */
@Service
public class SchematicValidationService {

    /**
     * The file data repository.
     */
    @Autowired
    SchematicFileDataRepository fileDataRepository;

    /**
     * The streamer.
     */
    @Autowired
    JPAStreamer streamer;

    /**
     * The misc config.
     */
    @Autowired
    SchematicMiscConfig miscConfig;

    /**
     * Check excel for error.
     *
     * @param sheetName
     *            the sheet name
     * @return the list
     * @throws SchematicFileException
     *             the schematic file exception
     */
    public List<SchematicErrorMessageResponse> checkExcelForError(String sheetName) throws SchematicFileException {

        if (StringUtils.isEmpty(sheetName)) {
            throw new SchematicFileException("Search Key cannot be empty");
        }
        return streamer.stream(ErrorMessage.class).filter(ErrorMessage$.sheetName.equalIgnoreCase(sheetName))
                .map(elem -> miscConfig.getModelMapper().map(elem, SchematicErrorMessageResponse.class))
                .collect(Collectors.toList());
    }

}

/*
 *
 */
package com.daimler.schematicbackend.controller.validation;

import com.daimler.schematicbackend.exception.file.SchematicFileException;
import com.daimler.schematicbackend.model.file.SchematicErrorMessageResponse;
import com.daimler.schematicbackend.model.generic.SchematicGenericErrorMessageBody;
import com.daimler.schematicbackend.service.file.SchematicValidationService;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * The Class SchematicValidationController.
 */
@RestController
public class SchematicValidationController implements ISchematicValidationEndpoint {

    /**
     * The schematic validator service.
     */
    @Autowired
    SchematicValidationService schematicValidatorService;

    /**
     * Gets the validation failures.
     *
     * @param sheetName the sheet name
     * @return the validation failures
     * @throws SchematicFileException the schematic file exception
     */
    @Override
    public ResponseEntity<SchematicGenericErrorMessageBody> getValidationFailures(String sheetName)
            throws SchematicFileException {
        List<SchematicErrorMessageResponse> errorList = schematicValidatorService.checkExcelForError(sheetName);
        if (ObjectUtils.isEmpty(errorList)) {
            return ResponseEntity.ok(new SchematicGenericErrorMessageBody("No Errors in the Excel", errorList));
        }
        return ResponseEntity.badRequest()
                .body(new SchematicGenericErrorMessageBody("Excel Contains Errors", errorList));
    }

}

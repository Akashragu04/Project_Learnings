/*
 *
 */
package com.daimler.schematicbackend.error.handling;

import com.daimler.schematicbackend.exception.file.SchematicFileException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * The Class SchematicFileExceptionHandler.
 */
@ControllerAdvice
public class SchematicFileExceptionHandler {

    /**
     * Auth error.
     *
     * @param ex the ex
     * @return the response entity
     */
    @ExceptionHandler(SchematicFileException.class)
    public ResponseEntity<String> authError(SchematicFileException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

}

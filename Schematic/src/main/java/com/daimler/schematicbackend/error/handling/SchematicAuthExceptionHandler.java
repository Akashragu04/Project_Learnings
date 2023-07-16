/*
 *
 */
package com.daimler.schematicbackend.error.handling;

import com.daimler.schematicbackend.exception.auth.SchematicAuthException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * The Class SchematicAuthExceptionHandler.
 */
@ControllerAdvice
public class SchematicAuthExceptionHandler {

    /**
     * Auth error.
     *
     * @param ex the ex
     * @return the response entity
     */
    @ExceptionHandler(SchematicAuthException.class)
    public ResponseEntity<String> authError(SchematicAuthException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

}

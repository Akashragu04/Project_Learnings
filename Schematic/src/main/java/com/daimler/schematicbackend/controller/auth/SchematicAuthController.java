/*
 *
 */
package com.daimler.schematicbackend.controller.auth;

import com.daimler.schematicbackend.dto.auth.request.SchematicForgotPasswordDto;
import com.daimler.schematicbackend.dto.auth.request.SchematicLoginRequestDto;
import com.daimler.schematicbackend.dto.auth.request.SchematicRegisterRequestDto;
import com.daimler.schematicbackend.exception.auth.SchematicAuthException;
import com.daimler.schematicbackend.model.auth.SchematicLoginResponse;
import com.daimler.schematicbackend.model.generic.SchematicGenericResponse;
import com.daimler.schematicbackend.service.auth.SchematicQuestionService;
import com.daimler.schematicbackend.service.auth.SchematicUserService;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

/**
 * The Class SchematicAuthController.
 */
@RestController
public class SchematicAuthController implements ISchematicAuthEndpoint {

    /**
     * The user service.
     */
    @Autowired
    SchematicUserService userService;

    /**
     * The question service.
     */
    @Autowired
    SchematicQuestionService questionService;

    /**
     * Register user.
     *
     * @param authRequest the auth request
     * @return the response entity
     * @throws SchematicAuthException the schematic auth exception
     */
    @Override
    public ResponseEntity<SchematicGenericResponse> registerUser(SchematicRegisterRequestDto authRequest)
            throws SchematicAuthException {
        SchematicGenericResponse registerUserResponse = userService.saveUserToDatabase(authRequest);
        if (ObjectUtils.isNotEmpty(registerUserResponse.getChecksFailed())) {
            return ResponseEntity.badRequest().body(registerUserResponse);
        } else {
            return ResponseEntity.ok(registerUserResponse);
        }
    }

    /**
     * Gets the all security questions.
     *
     * @return the all security questions
     */
    @Override
    public ResponseEntity<List<String>> getAllSecurityQuestions() {
        return ResponseEntity.ok(questionService.getAllSecurityQuestion());
    }

    /**
     * Login and validate token.
     *
     * @param loginRequestDto
     *            the login request dto
     * @return the response entity
     * @throws SchematicAuthException
     *             the schematic auth exception
     */
    @Override
    public ResponseEntity<SchematicLoginResponse> loginAndValidateToken(@Valid SchematicLoginRequestDto loginRequestDto)
            throws SchematicAuthException {
        SchematicLoginResponse loginResponse = userService.loginUser(loginRequestDto);
        if (ObjectUtils.isEmpty(loginResponse)) {
            return ResponseEntity.badRequest().body(loginResponse);
        } else {
            return ResponseEntity.ok().body(loginResponse);
        }
    }

    /**
     * Forgot password.
     *
     * @param forgotPasswordDto
     *            the forgot password dto
     * @return the response entity
     * @throws SchematicAuthException
     *             the schematic auth exception
     */
    @Override
    public ResponseEntity<SchematicGenericResponse> forgotPassword(@Valid SchematicForgotPasswordDto forgotPasswordDto)
            throws SchematicAuthException {
        List<String> errorMessageList = new ArrayList<>();
        boolean value = userService.forgotAndChangePassword(forgotPasswordDto, errorMessageList);
        if (!value) {
            return ResponseEntity.badRequest().body(new SchematicGenericResponse("Error Change", errorMessageList));
        } else {
            return ResponseEntity.ok(new SchematicGenericResponse(
                    "Password has been reset.Kindly login with New Password.", errorMessageList));
        }
    }

}

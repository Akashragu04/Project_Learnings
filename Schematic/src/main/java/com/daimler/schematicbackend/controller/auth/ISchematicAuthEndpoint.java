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
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;
import java.util.List;

/**
 * The Interface ISchematicAuthEndpoint.
 */
@RequestMapping("/v1/auth")
public interface ISchematicAuthEndpoint {

    /**
     * Register user.
     *
     * @param authRequest the auth request
     * @return the response entity
     * @throws SchematicAuthException the schematic auth exception
     */
    @ApiOperation(httpMethod = "POST", value = "Register for the schematic application", nickname = "registerUser")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Register Success", response = SchematicGenericResponse.class, responseContainer = "SchematicRegisterUserResponse"),
            @ApiResponse(code = 400, message = "Invalid Credentials"),
            @ApiResponse(code = 500, message = "Processing error")})
    @PostMapping("/register")
    ResponseEntity<SchematicGenericResponse> registerUser(
            @ApiParam(value = "Values from the register form ", required = true) @Valid @RequestBody SchematicRegisterRequestDto authRequest)
            throws SchematicAuthException;

    /**
     * Gets the all security questions.
     *
     * @return the all security questions
     */
    @ApiOperation(httpMethod = "GET", value = "Get All security Questions", nickname = "getAllSecurityQuestions")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Retrieved Security Question List", response = List.class, responseContainer = "List"),
            @ApiResponse(code = 400, message = "Invalid Credentials"),
            @ApiResponse(code = 500, message = "Processing error")})
    @GetMapping("/getAllSecurityQuestions")
    ResponseEntity<List<String>> getAllSecurityQuestions();

    /**
     * Login and validate token.
     *
     * @param loginRequestDto
     *            the login request dto
     * @return the response entity
     * @throws SchematicAuthException
     *             the schematic auth exception
     */
    @ApiOperation(httpMethod = "POST", value = "Login", nickname = "loginAndValidateToken")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "User Logged In Successful", response = SchematicLoginResponse.class, responseContainer = "SchematicLoginResponse"),
            @ApiResponse(code = 400, message = "Invalid Credentials"),
            @ApiResponse(code = 500, message = "Processing error")})
    @PostMapping("/loginAndValidateToken")
    ResponseEntity<SchematicLoginResponse> loginAndValidateToken(
            @ApiParam(value = "Request from login form", required = true) @Valid @RequestBody SchematicLoginRequestDto loginRequestDto)
            throws SchematicAuthException;

    /**
     * Forgot password.
     *
     * @param forgotPasswordDto
     *            the forgot password dto
     * @return the response entity
     * @throws SchematicAuthException
     *             the schematic auth exception
     */
    @ApiOperation(httpMethod = "POST", value = "Forgot Password", nickname = "forgotPassword")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Password Retrieving", response = SchematicGenericResponse.class, responseContainer = "SchematicGenericResponse"),
            @ApiResponse(code = 400, message = "Invalid Credentials"),
            @ApiResponse(code = 500, message = "Processing error")})
    @PostMapping("/forgotPassword")
    ResponseEntity<SchematicGenericResponse> forgotPassword(
            @ApiParam(value = "Request from Forgot Password form", required = true) @Valid @RequestBody SchematicForgotPasswordDto forgotPasswordDto)
            throws SchematicAuthException;

}

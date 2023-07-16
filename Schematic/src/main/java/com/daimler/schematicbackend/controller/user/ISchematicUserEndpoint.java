/*
 *
 */
package com.daimler.schematicbackend.controller.user;

import com.daimler.schematicbackend.dto.auth.request.SchematicResetPasswordDto;
import com.daimler.schematicbackend.dto.auth.request.SchematicUpdateUserDto;
import com.daimler.schematicbackend.exception.auth.SchematicAuthException;
import com.daimler.schematicbackend.model.auth.SchematicUserInfoResponse;
import com.daimler.schematicbackend.model.generic.SchematicGenericResponse;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

/**
 * The Interface ISchematicUserEndpoint.
 */
@RequestMapping("/v1/user")
public interface ISchematicUserEndpoint {

    /**
     * Gets the all users.
     *
     * @return the all users
     * @throws SchematicAuthException the schematic auth exception
     */
    @ApiOperation(httpMethod = "GET", value = "Fetch all the users", nickname = "getAllUsers")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Users Exist", response = List.class, responseContainer = "List"),
            @ApiResponse(code = 400, message = "Invalid Credentials"),
            @ApiResponse(code = 500, message = "Processing error")})
    @GetMapping("/getAllUsers")
    ResponseEntity<List<SchematicUserInfoResponse>> getAllUsers() throws SchematicAuthException;

    /**
     * Gets the all active user names.
     *
     * @return the all active user names
     * @throws SchematicAuthException
     *             the schematic auth exception
     */
    @ApiOperation(httpMethod = "GET", value = "Fetch all the active users", nickname = "getAllActiveUserNames")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Users Exist and are active", response = List.class, responseContainer = "List"),
            @ApiResponse(code = 400, message = "Invalid Credentials"),
            @ApiResponse(code = 500, message = "Processing error")})
    @GetMapping("/getAllActiveUserNames")
    ResponseEntity<List<String>> getAllActiveUserNames() throws SchematicAuthException;

    /**
     * Update user status and role.
     *
     * @param updateUserRequest
     *            the update user request
     * @return the response entity
     * @throws SchematicAuthException
     *             the schematic auth exception
     */
    @ApiOperation(httpMethod = "PUT", value = "Update User Status and Role", nickname = "updateUserStatusAndRole")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "User Data Updated Successfully", response = String.class, responseContainer = "String"),
            @ApiResponse(code = 400, message = "Invalid Credentials"),
            @ApiResponse(code = 500, message = "Processing error")})
    @PutMapping("/updateUserStatusAndRole")
    ResponseEntity<SchematicGenericResponse> updateUserStatusAndRole(
            @ApiParam(value = "Request from User Information form", required = true) @RequestBody SchematicUpdateUserDto updateUserRequest)
            throws SchematicAuthException;

    /**
     * Change password.
     *
     * @param resetPasswordDto
     *            the reset password dto
     * @return the response entity
     * @throws SchematicAuthException
     *             the schematic auth exception
     */
    @ApiOperation(httpMethod = "PUT", value = "Update User Password", nickname = "changePassword")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "User Data Updated Successfully", response = String.class, responseContainer = "String"),
            @ApiResponse(code = 400, message = "Invalid Credentials"),
            @ApiResponse(code = 500, message = "Processing error")})
    @PutMapping("/changePassword")
    ResponseEntity<SchematicGenericResponse> changePassword(
            @ApiParam(value = "Request from Reset Password form", required = true) @RequestBody SchematicResetPasswordDto resetPasswordDto)
            throws SchematicAuthException;

}

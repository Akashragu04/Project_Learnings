/*
 *
 */
package com.daimler.schematicbackend.controller.user;

import com.daimler.schematicbackend.dto.auth.request.SchematicResetPasswordDto;
import com.daimler.schematicbackend.dto.auth.request.SchematicUpdateUserDto;
import com.daimler.schematicbackend.exception.auth.SchematicAuthException;
import com.daimler.schematicbackend.model.auth.SchematicUserInfoResponse;
import com.daimler.schematicbackend.model.generic.SchematicGenericResponse;
import com.daimler.schematicbackend.service.auth.SchematicUserService;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * The Class SchematicUserController.
 */
@RestController
public class SchematicUserController implements ISchematicUserEndpoint {

    /**
     * The user details service.
     */
    @Autowired
    SchematicUserService userDetailsService;

    /**
     * Gets the all users.
     *
     * @return the all users
     * @throws SchematicAuthException the schematic auth exception
     */
    @Override
    public ResponseEntity<List<SchematicUserInfoResponse>> getAllUsers() throws SchematicAuthException {
        List<SchematicUserInfoResponse> response = userDetailsService.getAllUsers();
        if (ObjectUtils.isEmpty(response)) {
            throw new SchematicAuthException("No User Information available in the database");
        }
        return ResponseEntity.ok(response);
    }

    /**
     * Gets the all active user names.
     *
     * @return the all active user names
     * @throws SchematicAuthException
     *             the schematic auth exception
     */
    @Override
    public ResponseEntity<List<String>> getAllActiveUserNames() throws SchematicAuthException {
        List<String> response = userDetailsService.getAllActiveUsers();
        if (ObjectUtils.isEmpty(response)) {
            throw new SchematicAuthException("No User Information available in the database");
        }
        return ResponseEntity.ok(response);
    }

    /**
     * Update user status and role.
     *
     * @param updateUserRequest
     *            the update user request
     * @return the response entity
     * @throws SchematicAuthException
     *             the schematic auth exception
     */
    @Override
    public ResponseEntity<SchematicGenericResponse> updateUserStatusAndRole(SchematicUpdateUserDto updateUserRequest)
            throws SchematicAuthException {
        if (!userDetailsService.updateUser(updateUserRequest)) {
            return ResponseEntity.badRequest()
                    .body(new SchematicGenericResponse("This Action cannot be performed", null));
        }
        return ResponseEntity.ok(new SchematicGenericResponse("User Info Updated Successfully", null));
    }

    /**
     * Change password.
     *
     * @param resetPasswordDto
     *            the reset password dto
     * @return the response entity
     * @throws SchematicAuthException
     *             the schematic auth exception
     */
    @Override
    public ResponseEntity<SchematicGenericResponse> changePassword(SchematicResetPasswordDto resetPasswordDto)
            throws SchematicAuthException {
        if (!userDetailsService.changePassword(resetPasswordDto)) {
            return ResponseEntity.badRequest().body(new SchematicGenericResponse("Issue Resetting the Password", null));
        }
        return ResponseEntity.ok(new SchematicGenericResponse("Password Update Successfully", null));
    }

}

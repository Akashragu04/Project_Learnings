/*
 *
 */
package com.daimler.schematicbackend.model.auth;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The Class SchematicLoginResponse.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SchematicLoginResponse {

    /**
     * The username.
     */
    @ApiModelProperty(notes = "User Name", required = true, name = "username", value = "${username}")
    private String username;

    /**
     * The access type.
     */
    @ApiModelProperty(notes = "Role", required = true, name = "accessType", value = "ROLE_ADMIN/ROLE_USER")
    private String accessType;

    /**
     * The jwt.
     */
    @ApiModelProperty(notes = "authToken", required = true, name = "token", value = "jwt")
    private String jwt;

}

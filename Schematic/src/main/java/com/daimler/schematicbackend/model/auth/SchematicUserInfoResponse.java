/*
 *
 */
package com.daimler.schematicbackend.model.auth;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The Class SchematicUserInfoResponse.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SchematicUserInfoResponse {

    /**
     * The id.
     */
    @ApiModelProperty(notes = "Sequential Id", required = true, name = "id")
    private long id;

    /**
     * The username.
     */
    @ApiModelProperty(notes = "User Name/Short Id", required = true, name = "username")
    private String username;

    /**
     * The first name.
     */
    @ApiModelProperty(notes = "First Name of the user", required = true, name = "firstName")
    private String firstName;

    /**
     * The last name.
     */
    @ApiModelProperty(notes = "Last Name of the user", required = true, name = "lastName")
    private String lastName;

    /**
     * The email address.
     */
    @ApiModelProperty(notes = "Email Address of the user", required = true, name = "emailAddress")
    private String emailAddress;

    /**
     * The contact number.
     */
    @ApiModelProperty(notes = "Contact Number Name of the user", required = true, name = "contactNumber")
    private String contactNumber;

    /**
     * The access type.
     */
    @ApiModelProperty(notes = "Role of the user", required = true, name = "accessType")
    private String accessType;

    /**
     * The asset.
     */
    @ApiModelProperty(notes = "Asset", required = true, name = "asset")
    private String asset;

    /**
     * The active.
     */
    @ApiModelProperty(notes = "Define if user is active", required = true, name = "active")
    private boolean active;

}

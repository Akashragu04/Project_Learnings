/*
 *
 */
package com.daimler.schematicbackend.dto.auth.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

/**
 * The Class SchematicUpdateUserDto.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SchematicUpdateUserDto {

    /**
     * The user id.
     */
    @ApiModelProperty(notes = "Id of the user", required = true, name = "userId", value = "${userId}")
    private int userId;

    /**
     * The role.
     */
    //@NotBlank(message = "Role cannot be blank")
    //@NotNull(message = "Role cannot be null")
    @NotEmpty(message = "Role cannot be empty or blank")
    @ApiModelProperty(notes = "Role of the user", required = true, name = "role", value = "ROLE_ADMIN/ROLE_USER")
    private String role;

    /**
     * The status.
     */
    @NotBlank(message = "Role cannot be blank")
    @ApiModelProperty(notes = "User Status", required = true, name = "Status", value = "True/False")
    private boolean status;

}

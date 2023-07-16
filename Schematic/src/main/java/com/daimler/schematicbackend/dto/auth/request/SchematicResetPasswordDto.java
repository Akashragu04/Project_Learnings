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
 * The Class SchematicResetPasswordDto.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SchematicResetPasswordDto {

    /**
     * The user name.
     */
    //@NotBlank(message = "UserName cannot be blank")
    //@NotNull(message = "UserName cannot be null")
    @NotEmpty(message = "UserName cannot be empty or blank")
    @ApiModelProperty(notes = "Username desired", required = true, name = "username", value = "${username}")
    private String userName;

    /**
     * The old password.
     */
    //@NotBlank(message = "Old Password cannot be blank")
    //@NotNull(message = "Old Password cannot be null")
    @NotEmpty(message = "Old Password cannot be empty or blank")
    @ApiModelProperty(notes = "Old Password", required = true, name = "oldPassword", value = "********")
    private String oldPassword;

    /**
     * The new password.
     */
    //@NotBlank(message = "New Password cannot be blank")
    //@NotNull(message = "New Password cannot be null")
    @NotEmpty(message = "New Password cannot be empty or blank")
    @ApiModelProperty(notes = "New Password", required = true, name = "newPassword", value = "********")
    private String newPassword;

    /**
     * The confirm password.
     */
    //@NotBlank(message = "Confirm New Password cannot be blank")
    //@NotNull(message = "Confirm New Password cannot be null")
    @NotEmpty(message = "Confirm New Password cannot be empty or blank")
    @ApiModelProperty(notes = "Confirm New Password", required = true, name = "confirmPassword", value = "********")
    private String confirmPassword;

}

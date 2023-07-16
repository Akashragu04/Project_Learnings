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
 * The Class SchematicForgotPasswordDto.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SchematicForgotPasswordDto {

    /**
     * The user name.
     */
    //@NotNull(message = "UserName cannot be null")
    @NotEmpty(message = "UserName cannot be empty or blank")
    //@NotBlank(message = "UserName cannot be blank")
    @ApiModelProperty(notes = "Enter your username", required = true, name = "userName", value = "${userName}")
    private String userName;

    /**
     * The security question.
     */
    //@NotNull(message = "Security Question cannot be null")
    @NotEmpty(message = "Security Question cannot be empty or blank")
    //@NotBlank(message = "Security Question cannot be blank")
    @ApiModelProperty(notes = "Enter your Security Question", required = true, name = "securityQuestion", value = "????")
    private String securityQuestion;

    /**
     * The security answer.
     */
    //@NotNull(message = "Security Answer cannot be null")
    @NotEmpty(message = "Security Answer cannot be empty or blank")
    //@NotBlank(message = "Security Answer cannot be blank")
    @ApiModelProperty(notes = "Enter your Security Answer", required = true, name = "securityAnswer", value = "*********")
    private String securityAnswer;

    /**
     * The password.
     */
    //@NotNull(message = "Password cannot be null")
    @NotEmpty(message = "Password cannot be empty or blank")
    //@NotBlank(message = "Password cannot be blank")
    @ApiModelProperty(notes = "Enter your Password", required = true, name = "password", value = "*********")
    private String password;

    /**
     * The confirm password.
     */
    //@NotNull(message = "Confirm Password cannot be null")
    @NotEmpty(message = "Confirm Password cannot be empty or blank")
    //@NotBlank(message = "Confirm Password cannot be blank")
    @ApiModelProperty(notes = "Confirm your Password", required = true, name = "confirmPassword", value = "*********")
    private String confirmPassword;

}

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
 * The Class SchematicLoginRequestDto.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SchematicLoginRequestDto {

    /**
     * The user name.
     */
    //@NotNull(message = "UserName cannot be null")
    @NotEmpty(message = "UserName cannot be empty or blank")
    //@NotBlank(message = "UserName cannot be blank")
    @ApiModelProperty(notes = "Enter your username", required = true, name = "userName", value = "${userName}")
    private String userName;

    /**
     * The password.
     */
    //@NotNull(message = "Password cannot be null")
    @NotEmpty(message = "Password cannot be empty or blank")
    //@NotBlank(message = "Password cannot be blank")
    @ApiModelProperty(notes = "Enter your password", required = true, name = "password", value = "********")
    private String password;

}

/*
 *
 */
package com.daimler.schematicbackend.dto.auth.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The Class SchematicRegisterRequestDto.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SchematicRegisterRequestDto {

	/**
	 * The username.
	 */
	// @NotBlank(message = "UserName cannot be blank")
	// @NotNull(message = "UserName cannot be null")
	@NotEmpty(message = "UserName cannot be empty or blank")
	@ApiModelProperty(notes = "Username desired", required = true, name = "username", value = "${username}")
	private String username;

	/**
	 * The first name.
	 */
	@ApiModelProperty(notes = "First Name of the User", required = true, name = "firstName", value = "firstName")
	// @NotBlank(message = "FirstName cannot be blank")
	// @NotNull(message = "FirstName cannot be null")
	@NotEmpty(message = "FirstName cannot be empty or blank")
	private String firstName;

	/**
	 * The last name.
	 */
	@ApiModelProperty(notes = "Last Name of the User", required = true, name = "lastName", value = "lastName")
	// @NotBlank(message = "LastName cannot be blank")
	// @NotNull(message = "LastName cannot be null")
	@NotEmpty(message = "LastName cannot be empty or blank")
	private String lastName;

	/**
	 * The email address.
	 */
	@ApiModelProperty(notes = "Email Address of the User", required = true, name = "emailAddress", value = "AnyEmail@daimler.com")
	// @NotBlank(message = "Email cannot be blank")
	// @NotNull(message = "Email cannot be null")
	@NotEmpty(message = "Email cannot be empty or blank")
	@Email(message = "Email should be valid")
	private String emailAddress;

	/**
	 * The password.
	 */
	@ApiModelProperty(notes = "Password of the User", required = true, name = "password", value = "******")
	// @NotBlank(message = "Password cannot be blank")
	// @NotNull(message = "Password cannot be null")
	@NotEmpty(message = "Password cannot be empty or blank")
	private String password;

	/**
	 * The confirm password.
	 */
	@ApiModelProperty(notes = "Field provided for reentering the password", required = true, name = "confirmPassword", value = "${Same_as_Password}")
	// @NotBlank(message = "Confirm Password cannot be blank")
	// @NotNull(message = "Confirm Password cannot be null")
	@NotEmpty(message = "Confirm Password cannot be empty or blank")
	private String confirmPassword;

	/**
	 * The contact number.
	 */
	@ApiModelProperty(notes = "Contact Number of the User", required = true, name = "contactNumber", value = "12344567890")
	// @NotBlank(message = "Contact Number cannot be blank")
	// @NotNull(message = "Contact Number cannot be null")
	@NotEmpty(message = "Contact Number cannot be empty or blank")
	private String contactNumber;

	/**
	 * The security question.
	 */
	@ApiModelProperty(notes = "Security Question selected by the user", required = true, name = "securityQuestion", value = "????????????")
	// @NotBlank(message = "Security Question cannot be blank")
	// @NotNull(message = "Security Question cannot be null")
	@NotEmpty(message = "Security Question cannot be empty or blank")
	private String securityQuestion;

	/**
	 * The security answer.
	 */
	@ApiModelProperty(notes = "Security Answer provided by the user", required = true, name = "securityAnswer", value = "*******************")
	// @NotBlank(message = "Security Answer cannot be blank")
	// @NotNull(message = "Security Answer cannot be null")
	@NotEmpty(message = "Security Answer cannot be empty or blank")
	private String securityAnswer;

	/**
	 * The access type.
	 */
	@ApiModelProperty(notes = "Roles Supported by the user", required = true, name = "securityAnswer", value = "ROLE_ADMIN/ROLE_USER")
	// @NotBlank(message = "Access Type cannot be blank")
	// @NotNull(message = "Access Type cannot be null")
	@NotEmpty(message = "Access Type  cannot be empty or blank")
	private String accessType;

	/**
	 * The asset.
	 */
	@ApiModelProperty(notes = "Asset", required = true, name = "asset", value = "TEST")
	private String asset;

	/**
	 * The active.
	 */
	@ApiModelProperty(notes = "If User is active", required = true, name = "active", value = "true/false")
	private boolean active;

}

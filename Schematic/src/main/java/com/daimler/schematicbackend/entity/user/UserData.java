/*
 *
 */
package com.daimler.schematicbackend.entity.user;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The Class UserData.
 */
@Data
@Table(name = "schematic_user")
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class UserData {

	/**
	 * The id.
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	/**
	 * The username.
	 */
	private String username;

	/**
	 * The first name.
	 */
	private String firstName;

	/**
	 * The last name.
	 */
	private String lastName;

	/**
	 * The email address.
	 */
	private String emailAddress;

	/**
	 * The password.
	 */
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String password;

	/**
	 * The contact number.
	 */
	private String contactNumber;

	/**
	 * The security question.
	 */
	private String securityQuestion;

	/**
	 * The security answer.
	 */
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String securityAnswer;

	/**
	 * The access type.
	 */
	private String accessType;

	/**
	 * The asset.
	 */
	private String asset;

	/**
	 * The active.
	 */
	private boolean active;

}

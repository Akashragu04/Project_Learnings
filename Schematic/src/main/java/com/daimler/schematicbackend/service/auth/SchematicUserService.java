/*
 *
 */
package com.daimler.schematicbackend.service.auth;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.daimler.schematicbackend.dto.auth.request.SchematicForgotPasswordDto;
import com.daimler.schematicbackend.dto.auth.request.SchematicLoginRequestDto;
import com.daimler.schematicbackend.dto.auth.request.SchematicRegisterRequestDto;
import com.daimler.schematicbackend.dto.auth.request.SchematicResetPasswordDto;
import com.daimler.schematicbackend.dto.auth.request.SchematicUpdateUserDto;
import com.daimler.schematicbackend.entity.user.UserData;
import com.daimler.schematicbackend.entity.user.UserData$;
import com.daimler.schematicbackend.exception.auth.SchematicAuthException;
import com.daimler.schematicbackend.model.auth.SchematicLoginResponse;
import com.daimler.schematicbackend.model.auth.SchematicUserInfoResponse;
import com.daimler.schematicbackend.model.generic.SchematicGenericResponse;
import com.daimler.schematicbackend.repository.auth.SchematicUserRepository;
import com.daimler.schematicbackend.utils.auth.SchematicJwtUtils;
import com.daimler.schematicbackend.validator.SchematicUserValidator;
import com.speedment.jpastreamer.application.JPAStreamer;

/**
 * The Class SchematicUserService.
 */
@Service
public class SchematicUserService {

	/**
	 * The user repository.
	 */
	@Autowired
	SchematicUserRepository userRepository;

	/**
	 * The user validator.
	 */
	@Autowired
	SchematicUserValidator userValidator;

	/**
	 * The query streamer.
	 */
	@Autowired
	JPAStreamer queryStreamer;
	/**
	 * The jwt utils.
	 */
	@Autowired
	SchematicJwtUtils jwtUtils;
	/**
	 * The auth.
	 */
	@Autowired
	private AuthenticationManager auth;

	/**
	 * Save user to database.
	 *
	 * @param userData the user data
	 * @return the schematic register user response
	 * @throws SchematicAuthException the schematic auth exception
	 */
	public SchematicGenericResponse saveUserToDatabase(SchematicRegisterRequestDto userData)
			throws SchematicAuthException {
		List<String> errorMessageList = new ArrayList<>();
		String message = "User Registration Failed";
		if (findIfUserNameExists(userData.getUsername())) {
			throw new SchematicAuthException("User Name Already Exists.Kindly try with another username");
		} else if (!findIfEmailAddressExists(userData.getEmailAddress())) {
			throw new SchematicAuthException(
					"User with the Email Already Exists" + ".Please try login or Forgot Password Link");
		} else {
			UserData userSaved = userValidator.validateAndConvertForRegister(userData, errorMessageList);
			if (ObjectUtils.isNotEmpty(userSaved)) {
				userSaved.setActive(true);
				userRepository.save(userSaved);
				message = "User registered Successfully.";
			}
		}
		return new SchematicGenericResponse(message, errorMessageList);
	}

	/**
	 * Find by user name.
	 *
	 * @param username the username
	 * @return the optional
	 */
	public Optional<UserData> findByUserName(String username) {
		return userRepository.findAll().stream()
				.filter(elem -> elem.isActive() && elem.getUsername().equalsIgnoreCase(username)).findFirst();
	}

	/**
	 * Find if user name exists.
	 *
	 * @param username the username
	 * @return true, if successful
	 */
	public boolean findIfUserNameExists(String username) {
		Optional<UserData> userdata = userRepository.findByUsernameContainingIgnoreCase(username);
		return userdata.isPresent();

//		return ObjectUtils.isNotEmpty(queryStreamer.stream(UserData.class)
//				.filter(UserData$.username.equalIgnoreCase(username)).collect(Collectors.toList()));
	}

	/**
	 * Find if email address exists.
	 *
	 * @param email the email
	 * @return true, if successful
	 */
	public boolean findIfEmailAddressExists(String email) {

		return userRepository.findAll().stream().filter(userdata -> userdata.getEmailAddress().equalsIgnoreCase(email))
				.collect(Collectors.toList()).isEmpty();

//		return queryStreamer.stream(UserData.class).filter(UserData$.emailAddress.equalIgnoreCase(email))
//				.collect(Collectors.toList()).isEmpty();
	}

	/**
	 * Login user.
	 *
	 * @param loginRequestDto the login request dto
	 * @return the login response
	 * @throws SchematicAuthException the schematic auth exception
	 */
	public SchematicLoginResponse loginUser(SchematicLoginRequestDto loginRequestDto) throws SchematicAuthException {
		SchematicLoginResponse response = null;
		try {
			auth.authenticate(new UsernamePasswordAuthenticationToken(loginRequestDto.getUserName(),
					loginRequestDto.getPassword()));
			UserData userData = findByUserName(loginRequestDto.getUserName()).orElse(null);
			ModelMapper mapper = new ModelMapper();
			response = mapper.map(userData, SchematicLoginResponse.class);
			response.setJwt(jwtUtils.generateToken(loginRequestDto.getUserName()));
		} catch (AuthenticationException ex) {
			throw new SchematicAuthException("Invalid Credentials. Please try again with valid credentials.");
		}
		return response;
	}

	/**
	 * Forgot and change password.
	 *
	 * @param forgotPasswordDto the forgot password dto
	 * @param errorMessageList  the error message list
	 * @return true, if successful
	 * @throws SchematicAuthException the schematic auth exception
	 */
	public boolean forgotAndChangePassword(SchematicForgotPasswordDto forgotPasswordDto, List<String> errorMessageList)
			throws SchematicAuthException {
		boolean retValue = false;
		Optional<UserData> userData = findByUserName(forgotPasswordDto.getUserName());
		if (!userData.isPresent()) {
			throw new SchematicAuthException("UserName does not exist. Kindly check validity.");
		}
		UserData userUpdated = userValidator.validateForgotPassword(forgotPasswordDto, userData.get(),
				errorMessageList);
		if (ObjectUtils.isNotEmpty(userUpdated) && ObjectUtils.isNotEmpty(userRepository.save(userUpdated))) {
			retValue = true;
		}
		return retValue;
	}

	/**
	 * Gets the all users.
	 *
	 * @return the all users
	 */
	public List<SchematicUserInfoResponse> getAllUsers() {
		ModelMapper mapper = new ModelMapper();
		return userRepository.findAll().stream().map(elem -> mapper.map(elem, SchematicUserInfoResponse.class))
				.collect(Collectors.toList());
	}

	/**
	 * Gets the all active users.
	 *
	 * @return the all active users
	 */
	public List<String> getAllActiveUsers() {
		return userRepository.getAllByActiveUsers();
//        return userRepository.findAll().stream().filter(UserData::isActive).map(UserData::getUsername)
//                .collect(Collectors.toList());
	}

	/**
	 * Update user.
	 *
	 * @param updateUserRequest the update user request
	 * @return true, if successful
	 * @throws SchematicAuthException the schematic auth exception
	 */
	public boolean updateUser(SchematicUpdateUserDto updateUserRequest) throws SchematicAuthException {
		boolean retValue = false;
		if (updateUserRequest.getUserId() <= 0) {
			throw new SchematicAuthException("UserId is Invalid");
		}
		Optional<UserData> userDataOpt = userRepository.findById(Long.valueOf(updateUserRequest.getUserId()));
		if (userDataOpt.isPresent()) {
			if (!Arrays.asList("ROLE_ADMIN", "ROLE_USER").contains(updateUserRequest.getRole())) {
				throw new SchematicAuthException("Role You tried to assign does not exist");
			}
			userDataOpt.get().setAccessType(updateUserRequest.getRole());
			userDataOpt.get().setActive(updateUserRequest.isStatus());
			userRepository.save(userDataOpt.get());
			retValue = true;
		}
		return retValue;
	}

	/**
	 * Change password.
	 *
	 * @param resetPasswordDto the reset password dto
	 * @return true, if successful
	 * @throws SchematicAuthException the schematic auth exception
	 */
	public boolean changePassword(SchematicResetPasswordDto resetPasswordDto) throws SchematicAuthException {
		boolean retValue = false;
		UserData userDataOpt = queryStreamer.stream(UserData.class)
				.filter(UserData$.username.equalIgnoreCase(resetPasswordDto.getUserName())).findFirst()
				.orElseThrow(() -> new SchematicAuthException("UserName does not exist"));
		if (!StringUtils.equals(resetPasswordDto.getNewPassword(), resetPasswordDto.getConfirmPassword())) {
			throw new SchematicAuthException("Passwords do not match");
		}
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		if (!encoder.matches(resetPasswordDto.getOldPassword(), userDataOpt.getPassword())) {
			throw new SchematicAuthException("Current Password is not valid");
		}
		userDataOpt.setPassword(encoder.encode(resetPasswordDto.getNewPassword()));
		if (ObjectUtils.isNotEmpty(userRepository.save(userDataOpt))) {
			retValue = true;
		}
		return retValue;
	}
}

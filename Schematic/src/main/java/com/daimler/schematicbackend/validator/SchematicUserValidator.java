/*
 *
 */
package com.daimler.schematicbackend.validator;

import com.daimler.schematicbackend.config.SchematicMiscConfig;
import com.daimler.schematicbackend.dto.auth.request.SchematicForgotPasswordDto;
import com.daimler.schematicbackend.dto.auth.request.SchematicRegisterRequestDto;
import com.daimler.schematicbackend.entity.user.UserData;
import com.daimler.schematicbackend.service.auth.SchematicQuestionService;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

/**
 * The Class SchematicUserValidator.
 */
@Component
public class SchematicUserValidator {

    /**
     * The Constant USER_ROLES.
     */
    // Move to User Constants
    static final List<String> USER_ROLES = Arrays.asList("ROLE_USER", "ROLE_ADMIN");
    /**
     * The Constant USER_VALID_DOMAIN.
     */
    static final String USER_VALID_DOMAIN = "DAIMLER";
    /**
     * The Constant USER_ENCODER.
     */
    static final BCryptPasswordEncoder USER_ENCODER = new BCryptPasswordEncoder();
    /**
     * The Constant ERROR_USER_EMAIL_ADDRESS.
     */
    static final String ERROR_USER_EMAIL_ADDRESS = "Please use your daimler email address";
    /**
     * The Constant ERROR_USER_PASSWORD_MATCH.
     */
    static final String ERROR_USER_PASSWORD_MATCH = "Passwords do not match";
    /**
     * The Constant ERROR_USER_ROLE.
     */
    static final String ERROR_USER_ROLE = "Invalid User Role";
    /**
     * The Constant ERROR_USER_SECURITY_QUESTION.
     */
    static final String ERROR_USER_SECURITY_QUESTION = "Invalid Security Question.";
    /**
     * The misc config.
     */
    @Autowired
    SchematicMiscConfig miscConfig;
    /**
     * The question service.
     */
    @Autowired
    SchematicQuestionService questionService;

    /**
     * Instantiates a new user validator.
     */
    private SchematicUserValidator() {
    }

    /**
     * Validate and convert for register.
     *
     * @param userDto          the user dto
     * @param errorMessageList the error message list
     * @return the user data
     */
    public UserData validateAndConvertForRegister(SchematicRegisterRequestDto userDto, List<String> errorMessageList) {
        UserData userdataToBeSaved = null;
        ModelMapper mapper = miscConfig.getModelMapper();
        compareStringEquality(userDto.getPassword(), userDto.getConfirmPassword(), ERROR_USER_PASSWORD_MATCH,
                errorMessageList);
        validateRole(userDto.getAccessType(), errorMessageList);
        validateSchematicQuestion(userDto.getSecurityQuestion(), errorMessageList);
        if (errorMessageList.isEmpty()) {
            userdataToBeSaved = encryptSecrets(mapper.map(userDto, UserData.class));
        }
        return userdataToBeSaved;
    }

    /**
     * Encrypt secrets.
     *
     * @param userData
     *            the user data
     * @return the user data
     */
    private UserData encryptSecrets(UserData userData) {
        userData.setPassword(USER_ENCODER.encode(userData.getPassword()));
        userData.setSecurityAnswer(USER_ENCODER.encode(userData.getSecurityAnswer()));
        return userData;
    }

    /**
     * Compare string equality.
     *
     * @param compareString1
     *            the compare string 1
     * @param compareString2
     *            the compare string 2
     * @param errorMessage
     *            the error message
     * @param errorMessageList
     *            the error message list
     */
    private void compareStringEquality(String compareString1, String compareString2, String errorMessage,
                                       List<String> errorMessageList) {
        if (!StringUtils.equalsIgnoreCase(compareString1, compareString2)) {
            errorMessageList.add(errorMessage);
        }
    }

    /**
     * Validate role.
     *
     * @param role
     *            the role
     * @param errorMessageList
     *            the error message list
     */
    private void validateRole(String role, List<String> errorMessageList) {
        if (!USER_ROLES.contains(role)) {
            errorMessageList.add(ERROR_USER_ROLE);
        }
    }

    /**
     * Validate schematic question.
     *
     * @param question
     *            the question
     * @param errorMessageList
     *            the error message list
     */
    private void validateSchematicQuestion(String question, List<String> errorMessageList) {
        List<String> validSchematicQuestions = questionService.getAllSecurityQuestion();
        if (!validSchematicQuestions.contains(question)) {
            errorMessageList.add(ERROR_USER_SECURITY_QUESTION);
        }
    }

    /**
     * Validate forgot password.
     *
     * @param forgotPasswordDto
     *            the forgot password dto
     * @param userData
     *            the user data
     * @param errorMessageList
     *            the error message list
     * @return the user data
     */
    public UserData validateForgotPassword(SchematicForgotPasswordDto forgotPasswordDto, UserData userData,
                                           List<String> errorMessageList) {
        UserData retValue = null;
        compareStringEquality(forgotPasswordDto.getSecurityQuestion(), userData.getSecurityQuestion(),
                "Security Questions do not match", errorMessageList);
        compareSecrets(forgotPasswordDto.getSecurityAnswer(), userData.getSecurityAnswer(),
                "Security Answers do not match", errorMessageList);
        compareStringEquality(forgotPasswordDto.getPassword(), forgotPasswordDto.getConfirmPassword(),
                ERROR_USER_PASSWORD_MATCH, errorMessageList);
        if (ObjectUtils.isEmpty(errorMessageList)) {
            userData.setPassword(USER_ENCODER.encode(forgotPasswordDto.getPassword()));
            retValue = userData;
        }
        return retValue;
    }

    /**
     * Compare secrets.
     *
     * @param decrypted
     *            the decrypted
     * @param encrypted
     *            the encrypted
     * @param errorMessage
     *            the error message
     * @param errMsgList
     *            the err msg list
     */
    public void compareSecrets(String decrypted, String encrypted, String errorMessage, List<String> errMsgList) {
        if (!USER_ENCODER.matches(decrypted, encrypted)) {
            errMsgList.add(errorMessage);
        }
    }

}

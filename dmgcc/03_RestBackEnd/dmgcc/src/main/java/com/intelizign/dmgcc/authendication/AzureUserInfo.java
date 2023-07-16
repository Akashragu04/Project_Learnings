package com.intelizign.dmgcc.authendication;

import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import com.intelizign.dmgcc.models.G3CEmployeeMasterModel;
import com.intelizign.dmgcc.repositories.G3CEmployeeRepository;

@Service
public class AzureUserInfo {

//	@Autowired
//	AzureMsalAuthHelper msalAuthHelper;

	@Autowired
	private Environment env;

	@Autowired
	G3CEmployeeRepository g3cEmployeeRepository;

	public final Logger LOGGER = LogManager.getLogger(AzureUserInfo.class);

	public AzureTokenResponse getUserInfo(HttpServletRequest request) {
		try {
			String authorizationHeaderValue = request.getHeader("Authorization");
			if (authorizationHeaderValue != null && authorizationHeaderValue.startsWith("Bearer")) {
				String accessToken = authorizationHeaderValue.substring(7, authorizationHeaderValue.length());

				LOGGER.error(accessToken);
				AzureTokenResponse result = JWebToken(accessToken);

				LOGGER.info("Login User Mail: " + result.getName());
				return result;
			} else {
				LOGGER.error("Token Empty");
				return null;
			}

		} catch (Exception e) {
			LOGGER.info("Error While Getting User Info: " + e.getMessage());
			return null;
		}

	}

	public G3CEmployeeMasterModel getUserFullInfo(HttpServletRequest request) {
		try {
			String authorizationHeaderValue = request.getHeader("Authorization");
			if (authorizationHeaderValue != null && authorizationHeaderValue.startsWith("Bearer")) {
				String accessToken = authorizationHeaderValue.substring(7, authorizationHeaderValue.length());

				LOGGER.info(accessToken);
				AzureTokenResponse result = JWebToken(accessToken);

				LOGGER.info("Login User Mail: " + result.getName());

				Optional<G3CEmployeeMasterModel> userinfo = g3cEmployeeRepository.findUserByEmail(result.getEmail());

				G3CEmployeeMasterModel userDetailsinfo = new G3CEmployeeMasterModel();
				if (userinfo.isPresent()) {
					userDetailsinfo = userinfo.get();
					return userDetailsinfo;
				} else {

					LOGGER.info("User Doesn't exist, " + result.getName());
					return null;
				}
			} else {

				LOGGER.info("Invalid Token");
				return null;
			}

		} catch (Exception e) {

			LOGGER.info("Error While Getting User Info: " + e.getMessage());
			return null;
		}

	}

	public AzureTokenResponse JWebToken(String token) throws NoSuchAlgorithmException, IllegalArgumentException {

		try {

			Base64.Decoder decoder = Base64.getUrlDecoder();
			String[] chunks = token.split("\\.");
			if (chunks.length != 3) {
				throw new IllegalArgumentException("Invalid Token format");
			}

			String RESULT = new String(decoder.decode(chunks[1]));
			JSONObject jsonObject = new JSONObject(RESULT);

			AzureTokenResponse user_info = new AzureTokenResponse();

			user_info.setName(jsonObject.getString("name"));
			user_info.setEmail(jsonObject.getString("preferred_username"));

//			 Staging and Production Config
//			String[] preferred_username = jsonObject.getString("preferred_username").split("@");
//			user_info.setShortid(preferred_username[0]);
//			user_info.setEmail(jsonObject.getString("email"));
//			LOGGER.info(jsonObject.get("email"));

			LOGGER.info(jsonObject.get("name"));
			return user_info;
		} catch (Exception e) {
			LOGGER.info(e.getMessage());
			return null;
		}
	}

}

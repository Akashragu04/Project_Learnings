package com.intelizign.dmgcc.services;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.intelizign.dmgcc.models.G3CEmployeeMasterModel;
import com.intelizign.dmgcc.models.SLAApproval;
import com.intelizign.dmgcc.models.businesscasemodels.BusinessApprovalsModel;
import com.intelizign.dmgcc.repositories.BusinessApprovalsRepository;
import com.intelizign.dmgcc.repositories.G3CEmployeeRepository;
import com.intelizign.dmgcc.repositories.SLAapprovalRepository;
import com.intelizign.dmgcc.response.ResponseHandler;

@Service
public class TokenGeneratorService {

	static final long EXPIRE_TOKEN_AFTER_MINUTES = 300;

	@Autowired
	private G3CEmployeeRepository userRepository;

	@Autowired
	private BusinessApprovalsRepository bizcaseapprovalrepo;

	@Autowired
	private SLAapprovalRepository slsApprovalRepository;

	@Autowired
	private Environment env;

	public String forgotPassword(G3CEmployeeMasterModel user) {

		user.setResettoken(generateToken());
		user.setTokenCreationDate(LocalDateTime.now(ZoneId.of(env.getProperty("spring.app.timezone"))));

		user = userRepository.save(user);

		return user.getResettoken();
	}

	public String gettokenforapproves(BusinessApprovalsModel approvedata) {

		approvedata.setApprove_token(generateToken());
		approvedata.setEmail_status("Sent Email");
		approvedata = bizcaseapprovalrepo.save(approvedata);

		return approvedata.getApprove_token();
	}

	public ResponseEntity<Object> resetPassword(String token, String password) {

		Optional<G3CEmployeeMasterModel> userOptional = Optional.ofNullable(userRepository.findByresettoken(token));

		if (!userOptional.isPresent()) {
			return ResponseHandler.generateResponse("Invalid token", false, HttpStatus.BAD_REQUEST, null);
		}

		LocalDateTime tokenCreationDate = userOptional.get().getTokenCreationDate();

		if (isTokenExpired(tokenCreationDate)) {
			return ResponseHandler.generateResponse("Token expired.", false, HttpStatus.BAD_REQUEST, null);

		}

		G3CEmployeeMasterModel user = userOptional.get();

		user.setPassword(password);
		user.setResettoken(null);
		user.setTokenCreationDate(null);

		userRepository.save(user);
		return ResponseHandler.generateResponse("Your password successfully updated", true, HttpStatus.OK, null);
	}

	public Boolean validatetokenapprove(String token, BusinessApprovalsModel approvedata) {
		Optional<BusinessApprovalsModel> userOptional = Optional
				.ofNullable(bizcaseapprovalrepo.findByApproveToken(token));
		if (!userOptional.isPresent()) {
			return false;
		} else {
			BusinessApprovalsModel user = userOptional.get();
			user.setApprove_token(null);
			bizcaseapprovalrepo.save(user);
			return true;
		}
	}

	private String generateToken() {
		StringBuilder token = new StringBuilder();

		return token.append(UUID.randomUUID().toString()).append(UUID.randomUUID().toString()).toString();
	}

	private boolean isTokenExpired(final LocalDateTime tokenCreationDate) {

		LocalDateTime now = LocalDateTime.now(ZoneId.of(env.getProperty("spring.app.timezone")));
		Duration diff = Duration.between(tokenCreationDate, now);

		return diff.toMinutes() >= EXPIRE_TOKEN_AFTER_MINUTES;
	}

	public Boolean validateSLAtokenapprove(String token, SLAApproval approvalData) {

		Optional<SLAApproval> userOptional = Optional.ofNullable(slsApprovalRepository.findBySLAApproveToken(token));
		if (!userOptional.isPresent()) {
			return false;
		} else {
			SLAApproval user = userOptional.get();
			user.setSla_token(null);
			slsApprovalRepository.save(user);
			return true;
		}

	}

	public SLAApproval getTokenForSLA(SLAApproval sla_approval) {
		sla_approval.setSla_token(generateToken());
		sla_approval.setMail_status("Email Sent");
		slsApprovalRepository.save(sla_approval);
		return sla_approval;
	}
}

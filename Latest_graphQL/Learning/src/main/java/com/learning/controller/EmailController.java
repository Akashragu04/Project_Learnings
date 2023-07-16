package com.learning.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.learning.model.Email;
import com.learning.model.UserData;
import com.learning.repository.BucketRepository;
import com.learning.repository.EmailRepository;
import com.learning.repository.UserRepository;
import com.learning.response.ResponseHandler;
import com.learning.service.EmailService;

import io.github.bucket4j.Bucket;

@RestController
@RequestMapping("/email")
public class EmailController {

	@Autowired
	EmailService emailService;

	Bucket buckets;

	@Autowired
	EmailRepository emailRepo;

	@Autowired
	UserRepository userRepo;

	@Autowired
	BucketRepository bucketRepository;

	/**
	 * Logger Intialization
	 **/
	public final Logger LOGGER = LogManager.getLogger(EmailController.class);

	/**
	 * Bucket4j Intialization for protecting maximum api request
	 **/

	private final Map<String, Bucket> container = new ConcurrentHashMap<>();

	Bucket bucket;

	/**
	 * Exception Handling for Validation errors
	 **/
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public Map<String, String> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
		Map<String, String> errors = new HashMap<>();
		ex.getBindingResult().getFieldErrors()
				.forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));

		return errors;
	}

	/**
	 * Save users
	 **/
	@PostMapping("/saveUsers")
	public ResponseEntity<Object> saveAllUser(@RequestBody List<UserData> usersRequest) {

		try {
			// save data from request
			List<UserData> savedUsers = userRepo.saveAll(usersRequest);

			LOGGER.info("User Saved Successfully");
			return ResponseHandler.generateResponse("Users Saved Successfully", HttpStatus.OK, savedUsers);

		} catch (Exception e) {
			LOGGER.error("Exception Happend While saving all user");
			return ResponseHandler.generateResponse("Internal Server Error", HttpStatus.BAD_REQUEST, e.getCause());
		}

	}

	/**
	 * Send mail to particular user
	 **/
	@PostMapping("/sendMail")
	public ResponseEntity<Object> sendMail(@RequestHeader String user, @RequestBody Email emailRequest) {
		try {

			// checking whether the user is present or not
			Optional<UserData> userData = userRepo.findByUsername(user);

			if (userData.isPresent()) {

				// user is present checking limit of request
				if (emailService.getTokenByUser(user)) {

					emailRequest.setUser(userData.get());
					LOGGER.info("Email sent successfull by " + user);
					return ResponseHandler.generateResponse("Email Saved Successfully", HttpStatus.OK,
							emailRepo.save(emailRequest));
				} else {
					LOGGER.info("Limit Reached by " + user + " while sending mail");
					return ResponseHandler.generateResponse("Limit Reached", HttpStatus.OK, null);
				}
			} else {
				LOGGER.error("User Not Found");
				return ResponseHandler.generateResponse("User Not Found", HttpStatus.OK, null);
			}

		} catch (Exception e) {
			LOGGER.error("Exception Happend While sending mail");
			return ResponseHandler.generateResponse("Internal server Error", HttpStatus.BAD_REQUEST, e.getMessage());
		}

	}

	/**
	 * Get all Emails by user
	 **/
	@GetMapping("/getEmails")
	public ResponseEntity<Object> getEmailsByUser(@RequestHeader String user) {
		try {

			// checking whether the user is present or not
			Optional<UserData> userData = userRepo.findByUsername(user);

			if (userData.isPresent()) {

				// user is present checking limit of request
				if (emailService.getTokenByUser(user)) {

					LOGGER.info("Email retrived successfull by " + user);
					return ResponseHandler.generateResponse("Retrive Message", HttpStatus.OK, bucket);

				} else {
					LOGGER.info("Limit Reached by " + user + " while retriving mail");
					return ResponseHandler.generateResponse("Limit Reached", HttpStatus.OK, null);
				}
			} else {
				LOGGER.error("User Not Found");
				return ResponseHandler.generateResponse("User Not Found", HttpStatus.OK, null);
			}

		} catch (Exception e) {
			LOGGER.error("Exception Happend While retriving mail");
			return ResponseHandler.generateResponse("Internal server Error", HttpStatus.BAD_REQUEST, e.getMessage());
		}

	}

	/**
	 * Delete All Emails by user
	 **/
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Object> deleteEmailByIdAndUser(@RequestHeader String user, @PathVariable Long id) {
		try {

			// checking whether the user is present or not
			Optional<UserData> userData = userRepo.findByUsername(user);
			if (userData.isPresent()) {

				// delete email by user
				emailRepo.deleteEmailByUser(userData.get().getId());

				LOGGER.info("Email deleted successfully by " + user);
				return ResponseHandler.generateResponse("Email Deleted", HttpStatus.OK, null);

			} else {
				LOGGER.error("User Not Found");
				return ResponseHandler.generateResponse("User Not Found", HttpStatus.OK, null);
			}

		} catch (Exception e) {
			LOGGER.error("Exception Happend While retriving mail");
			return ResponseHandler.generateResponse("Internal server Error", HttpStatus.BAD_REQUEST, e.getMessage());
		}

	}

}

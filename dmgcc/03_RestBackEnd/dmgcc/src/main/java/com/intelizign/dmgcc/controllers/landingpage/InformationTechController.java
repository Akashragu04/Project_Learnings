package com.intelizign.dmgcc.controllers.landingpage;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.validation.Valid;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.MethodNotAllowedException;

import com.intelizign.dmgcc.models.FileUploadModel;
import com.intelizign.dmgcc.models.landingpage.SubContentModel;
import com.intelizign.dmgcc.repositories.FileUploadRepository;
import com.intelizign.dmgcc.repositories.landingpage.SubContentRepository;
import com.intelizign.dmgcc.repositories.landingpage.SubListRepository;
import com.intelizign.dmgcc.request.SupportingFiles;
import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.services.FilesStorageServicePath;

@RestController
@RequestMapping("/landingpage/it")
public class InformationTechController {

	@Autowired
	private SubContentRepository mainContentRepository;
	
	@Autowired
	private SubListRepository sublistRepository;
	
	
	public final Logger LOGGER = LogManager.getLogger(InformationTechController.class);
	
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public Map<String, String> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
		Map<String, String> errors = new HashMap<>();
		ex.getBindingResult().getFieldErrors()
				.forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));

		return errors;
	}

	@ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
	@ExceptionHandler(value = MethodNotAllowedException.class)
	public ResponseEntity<Object> handleMethodNotAllowedExceptionException(MethodNotAllowedException ex) {
		return ResponseHandler.generateResponse(ex.getMessage(), false, HttpStatus.METHOD_NOT_ALLOWED, null);
	}

	 //Create Or Updating IT Main Content
	@PostMapping("/maincntnt")
	public ResponseEntity<Object> createITMaincntnt(@Valid @RequestBody SubContentModel itMainCntnt
			) {
		try {

			itMainCntnt.setModel_name("Information Technology");

			SubContentModel itMainCntntData = mainContentRepository.save(itMainCntnt);

			return ResponseHandler.generateResponse(
					"Landing Page Information Technology Created successfully", true, HttpStatus.OK,
					itMainCntntData);
			
		}

		catch (Exception e) {

			LOGGER.error("Internal Server Error While Creating Landing Page Information Technology Main Content: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	 //Get All IT Main Content data
	@GetMapping("/getmaincntnt")
	public ResponseEntity<Object> findAllITMaincntnt(@RequestParam String ModelName)  {
		try {
			    
			    SubContentModel itMainCntntData = mainContentRepository.getByActiveAndModel(true, ModelName);
				return ResponseHandler.generateResponse("List of IT Information retrieved successfully", true, HttpStatus.OK, itMainCntntData);
			

		} catch (Exception e) {
			LOGGER.error("Internal Server Error: {}" , e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	// Get Particular IT Main Content
	@GetMapping("/getmaincntnt/{id}")
	public ResponseEntity<Object> getITMaincntnt(@PathVariable(value = "id") Long id) {
		try {

			return mainContentRepository.findById(id).map(itMainCntntData -> {

				return ResponseHandler.generateResponse("Information Technology Information retrieved successfully", true,
						HttpStatus.OK, itMainCntntData);

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Information Technology {} Doesn't exist", id);
				return ResponseHandler.generateResponse("Information Technology" + id + " Doesn't exist", false, HttpStatus.OK,
						null);
			});
		} 
		
		catch (Exception e) {
			LOGGER.error("Internal Server Error while get Information Technology : {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	// Delete particular Inforamtion Technology Main Content
	@DeleteMapping("/deletemaincntnt/{id}")
	public ResponseEntity<Object> deleteITMaincntnt(@PathVariable Long id) {
		try {

			return mainContentRepository.findById(id).map(itMainCntntData -> {
			
				mainContentRepository.deleteById(id);

				return ResponseHandler.generateResponse("Information Technology Information Deleted Successfully", true, HttpStatus.OK,
						null);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Information Technology ID {} Doesn't exists", id);
				return ResponseHandler.generateResponse("Information Technology Sub Content ID " + id + " Doesn't exists", false,
						HttpStatus.OK, null);
			});

		} 
		
		catch (Exception e) {
			LOGGER.error("Internal Server Error while remove Information Technology Sub Content: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	//Delete Particular Subcontent
	@DeleteMapping("/deletesublist/{id}")
	public ResponseEntity<Object> deleteCustomerServicesSubList(@PathVariable Long id) {
		try {

			return sublistRepository.findById(id).map(cusServSubData -> {

				sublistRepository.deleteById(id);

				return ResponseHandler.generateResponse("Information Technology Sub Content Removed Successfully",
						true, HttpStatus.OK, null);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Information Technology Sub Content ID {} Doesn't exists", id);
				return ResponseHandler.generateResponse("Information Technology Sub Content ID " + id + " Doesn't exists", false,
						HttpStatus.OK, null);
			});

		}
		catch (Exception e) {
			LOGGER.error("Internal Server Error while remove Information Technology Sub List: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

}

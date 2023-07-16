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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.MethodNotAllowedException;

import com.intelizign.dmgcc.authendication.UserDetailsImpl;
import com.intelizign.dmgcc.models.FileUploadModel;
import com.intelizign.dmgcc.models.landingpage.TestimonialsModel;
import com.intelizign.dmgcc.repositories.FileUploadRepository;
import com.intelizign.dmgcc.repositories.landingpage.TestimonialsRepository;
import com.intelizign.dmgcc.request.SupportingFiles;
import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.services.FilesStorageServicePath;

@RestController
@RequestMapping("/landingpage/testimonials")
public class TestimonialsController {

	@Autowired
	private Environment env;

	@Autowired
	FilesStorageServicePath storageServicepath;
	
	@Autowired
	private FileUploadRepository fileUploadRepository;
	
	@Autowired
	private TestimonialsRepository landingtestimonialsRepository;
	
	public final Logger LOGGER = LogManager.getLogger(TestimonialsController.class);
	
	
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

	
	 //Get All Testimonials data
	@GetMapping("")
	public ResponseEntity<Object> findAllTestimonials()  {
		try {
			    
			  List<TestimonialsModel> testimonialsDatas = landingtestimonialsRepository.findByactive(true);
				return ResponseHandler.generateResponse("List of Testimonials Information retrieved successfully", true, HttpStatus.OK, testimonialsDatas);
			

		} catch (Exception e) {
			LOGGER.error("Internal Server Error: {}" , e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}
	
	
	 //Create or update Testimonials 
	@PostMapping("")
	public ResponseEntity<Object> createTestimonials(@Valid @RequestBody TestimonialsModel  testimonialsDatas,
			Authentication authentication) {
		try {
		     
			 SupportingFiles currentFile = testimonialsDatas.getCoverImage();

			if (currentFile != null && Boolean.FALSE.equals(currentFile.getMapped())) {

				Optional<FileUploadModel> fileuploadmodel = fileUploadRepository.findById(currentFile.getId());

				if (fileuploadmodel.isPresent()) {

					fileuploadmodel.get().setMapped(true);

					currentFile.setMapped(true);

					fileUploadRepository.save(fileuploadmodel.get());

				}

			}
			
			    testimonialsDatas.setCoverImage(currentFile);
			    
			    landingtestimonialsRepository.save(testimonialsDatas);
				
				return ResponseHandler.generateResponse("Landing Page Testimonials  Created successfully", true, HttpStatus.OK,
						testimonialsDatas);
			
		}

		catch (Exception e) {

			LOGGER.error("Internal Server Error While Creating Landing Page Testimonials : {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}


	// Get Particular Testimonials 
	@GetMapping("/{id}")
	public ResponseEntity<Object> getTestimonialsbyid(@PathVariable(value = "id") Long id) {
		try {

			return landingtestimonialsRepository.findById(id).map(testimonialsData -> {

				return ResponseHandler.generateResponse("Testimonials  Information retrieved successfully", true,
						HttpStatus.OK, testimonialsData);

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Testimonials  {} Doesn't exist", id);
				return ResponseHandler.generateResponse("Testimonials " + id + " Doesn't exist", false, HttpStatus.OK,
						null);
			});
		} 
		
		catch (Exception e) {
			LOGGER.error("Internal Server Error while get Testimonials  : {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}
	
	// Delete particular Testimonials 
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteTestimonials(@PathVariable Long id) {
		try { 

			return landingtestimonialsRepository.findById(id).map(testimonialsData -> {

				landingtestimonialsRepository.deleteById(id);

				return ResponseHandler.generateResponse("Testimonials  Information Removed Successfully", true, HttpStatus.OK,
						null);
				
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Testimonials  ID {} Doesn't exists", id);
				return ResponseHandler.generateResponse("Testimonials  ID " + id + " Doesn't exists", false,
						HttpStatus.OK, null);
			});

		} 
		
		catch (Exception e) {
			LOGGER.error("Internal Server Error while remove Testimonials Details: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}


	// Multiple File Upload
	@PostMapping("/upload")
	public ResponseEntity<Object> jdInsert(@RequestParam("file") MultipartFile[] files) {
		try {

			if (files != null) {
				List<FileUploadModel> allFiles = new ArrayList<>();
				for (MultipartFile file : files) {

					FileUploadModel currentFiles = new FileUploadModel();

					String filename = storageServicepath.save(file);
					currentFiles.setSupporting_files_name(filename);
					currentFiles.setSupporting_files_url(
							env.getProperty("hostname.name") + "/api/landingpage/testimonials/attachments/" + filename);
					currentFiles.setSupporting_file_view_url(
							env.getProperty("hostname.name") + "/api/landingpage/testimonials/viewfile/" + filename);

					currentFiles.setUpload_by("Admin");
					currentFiles.setUpload_on(LocalDateTime.now());
					currentFiles.setMapped(false);
					allFiles.add(currentFiles);
				}

				List<FileUploadModel> fileUploadModel = fileUploadRepository.saveAll(allFiles);
				return ResponseHandler.generateResponse("File Uploaded Successfully", true, HttpStatus.OK,
						fileUploadModel);

			} else {

				return ResponseHandler.generateResponse("Files or empty", false, HttpStatus.OK, null);
			}

		} catch (Exception e) {

			LOGGER.error("Internal Server Error while insert JD: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	@GetMapping("/attachments/{filename:.+}")
	@ResponseBody
	public ResponseEntity<Resource> getFile(@PathVariable String filename) {
		try {

			Resource file = storageServicepath.load(filename);
			return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
					"attachment; filename=\"" + file.getFilename() + "\"").body(file);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while download JD document: {}" , e.getMessage());
			return ResponseEntity.notFound().build();
		}

	}

	@PostMapping("/singlefileupload")
	public ResponseEntity<Object> singleFileUpload(@RequestParam("file") MultipartFile file) {
		try {

			if (file != null) {

				FileUploadModel currentFile = new FileUploadModel();

				String filename = storageServicepath.save(file);
				currentFile.setSupporting_files_name(filename);
				currentFile.setSupporting_files_url(
						env.getProperty("hostname.name") + "/api/landingpage/testimonials/attachments/" + filename);

				currentFile.setSupporting_file_view_url(
						env.getProperty("hostname.name") + "/api/landingpage/testimonials/viewfile/" + filename);
				
				currentFile.setUpload_by("Admin");
				currentFile.setUpload_on(LocalDateTime.now());

				currentFile.setMapped(false);

				FileUploadModel fileUploadModel = fileUploadRepository.save(currentFile);
				return ResponseHandler.generateResponse("File Uploaded Successfully", true, HttpStatus.OK,
						fileUploadModel);

			} else {

				return ResponseHandler.generateResponse("Files or empty", false, HttpStatus.OK, null);
			}

		} catch (Exception e) {

			LOGGER.error("Internal Server Error while inserting file: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	@GetMapping("/viewfile/{filename:.+}")
	@ResponseBody
	public ResponseEntity<Resource> viewPDF(@PathVariable String filename) {
		try {

			Resource file = storageServicepath.load(filename);
			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + file.getFilename() + "\"")
					.contentType(MediaType.parseMediaType("application/pdf")).body(file);
		} catch (Exception e) {
			LOGGER.error("File doesn't exist Error: {}", e.getMessage());
			return ResponseEntity.notFound().build();
		}

	}


}

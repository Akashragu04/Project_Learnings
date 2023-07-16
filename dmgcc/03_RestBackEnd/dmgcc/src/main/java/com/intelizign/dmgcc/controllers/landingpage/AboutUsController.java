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
import org.springframework.dao.DataIntegrityViolationException;
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
import com.intelizign.dmgcc.models.landingpage.AboutHRModel;
import com.intelizign.dmgcc.repositories.FileUploadRepository;
import com.intelizign.dmgcc.repositories.landingpage.AboutHRRepository;
import com.intelizign.dmgcc.repositories.landingpage.AboutUsSubContentRepository;
import com.intelizign.dmgcc.repositories.landingpage.AboutUsSubListRepository;
import com.intelizign.dmgcc.request.SupportingFiles;
import com.intelizign.dmgcc.request.landingpage.AboutHrRequest;
import com.intelizign.dmgcc.request.landingpage.BroucherRequest;
import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.services.FilesStorageServicePath;

@RestController
@RequestMapping("/landingpage/aboutus")
public class AboutUsController {

	@Autowired
	private Environment env;

	@Autowired
	FilesStorageServicePath storageServicepath;

	@Autowired
	private FileUploadRepository fileUploadRepository;

	@Autowired
	private AboutHRRepository landingAboutHrRepository;
	
	
	@Autowired
	private AboutUsSubContentRepository landingAboutSubcntRepository;
	
	@Autowired
	private AboutUsSubListRepository landingAboutSubListRepository;
	

	public final Logger LOGGER = LogManager.getLogger(AboutUsController.class);

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

	@ResponseBody
	@ExceptionHandler
	ResponseEntity<?> handleConflict(DataIntegrityViolationException e) {
		return ResponseHandler.generateResponse(e.getRootCause().getMessage(), false, HttpStatus.CONFLICT, null);
	}

	// Get All About Us data
	@GetMapping("")
	public ResponseEntity<Object> findAllAboutUs(@RequestParam String ModelName,

			Authentication authentication) {
		try {

			AboutHRModel aboutDatas = landingAboutHrRepository.findByactive(true, ModelName);
			return ResponseHandler.generateResponse("List of About Us retrieved successfully", true, HttpStatus.OK,
					aboutDatas);

		}

		catch (Exception e) {
			LOGGER.error("Internal Server Error: {}", e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	// Create Landing Page About Us
	@PostMapping("")
	public ResponseEntity<Object> createAboutUs(@Valid @RequestBody AboutHrRequest aboutUsRequest,
			Authentication authentication) {
		try {

			SupportingFiles currentFile = aboutUsRequest.getSupporting_file();

			if (currentFile != null && Boolean.FALSE.equals(currentFile.getMapped())) {

				Optional<FileUploadModel> fileuploadmodel = fileUploadRepository.findById(currentFile.getId());

				if (fileuploadmodel.isPresent()) {

					fileuploadmodel.get().setMapped(true);

					currentFile.setMapped(true);

					fileUploadRepository.save(fileuploadmodel.get());

				}

			}

			AboutHRModel aboutData = new AboutHRModel();

			aboutData.setModel_name("About Us");
			aboutData.setDescription(aboutUsRequest.getDescription());
			aboutData.setSub_content(aboutUsRequest.getSub_content());
			aboutData.setSupporting_file(currentFile);
			aboutData.setSub_list(aboutUsRequest.getSub_list());
			aboutData.setTitle(aboutUsRequest.getTitle());

			landingAboutHrRepository.save(aboutData);

			return ResponseHandler.generateResponse("Landing Page About Us Created successfully", true, HttpStatus.OK,
					aboutData);

		}

		catch (Exception e) {

			LOGGER.error("Internal Server Error While Creating Landing Page About Us: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	// Get Particular About US
	@GetMapping("/{id}")
	public ResponseEntity<Object> getAboutUsbyid(@PathVariable(value = "id") Long id) {
		try {

			return landingAboutHrRepository.findById(id).map(aboutUsData -> {

				return ResponseHandler.generateResponse("About Us Information retrieved successfully", true,
						HttpStatus.OK, aboutUsData);

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: About Us {} Doesn't exist", id);
				return ResponseHandler.generateResponse("About Us " + id + " Doesn't exist", false, HttpStatus.OK,
						null);
			});
		}

		catch (Exception e) {
			LOGGER.error("Internal Server Error while get About Us: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	// Updating particular About US
	@PutMapping("")
	public ResponseEntity<Object> updateAboutUs(@Valid @RequestBody AboutHrRequest aboutsUsReq) {
		try {

			AboutHRModel aboutusDatas= new AboutHRModel();
			
		
				SupportingFiles currentFile = aboutsUsReq.getSupporting_file();
				
				Optional<AboutHRModel> aboutusData = landingAboutHrRepository.findById(aboutsUsReq.getId());

				if (currentFile != null && Boolean.FALSE.equals(aboutsUsReq.getSupporting_file().getMapped())) {

					Optional<FileUploadModel> fileuploadmodel = fileUploadRepository.findById(currentFile.getId());
					
					if (fileuploadmodel.isPresent()) {

						fileuploadmodel.get().setMapped(true);

						currentFile.setMapped(true);

						fileUploadRepository.save(fileuploadmodel.get());

					}

				}
				
				aboutusData.get().setSub_content(aboutsUsReq.getSub_content());
				aboutusData.get().setDescription(aboutsUsReq.getDescription());
				aboutusData.get().setSupporting_file(currentFile);
				aboutusData.get().setSub_list(aboutsUsReq.getSub_list());
				aboutusData.get().setTitle(aboutsUsReq.getTitle());
				
			
				landingAboutHrRepository.save(aboutusData.get());

				return ResponseHandler.generateResponse("About Us Information Updated successfully", true,
						HttpStatus.OK, aboutusDatas);

			
		} catch (Exception e) {
			LOGGER.error("Internal Server Error: {}", e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}


	// Delete About US
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteAboutUs(@PathVariable Long id) {
		try {

			return landingAboutHrRepository.findById(id).map(aboutUsData -> {

				if (aboutUsData.getSupporting_file() != null) {

					storageServicepath.delete(aboutUsData.getSupporting_file().getSupporting_files_name());

				}

				landingAboutHrRepository.deleteById(id);

				return ResponseHandler.generateResponse("About Us Information Removed Successfully", true,
						HttpStatus.OK, null);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: About Us ID {} Doesn't exist to remove attachment", id);
				return ResponseHandler.generateResponse("About Us ID " + id + " Doesn't exist to remove attachment",
						false, HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while remove About Us Document: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	// Delete About US Subcontent
		@DeleteMapping("/subcntnt/{id}")
		public ResponseEntity<Object> deleteAboutUsSubcontent(@PathVariable Long id) {
			try {

				return landingAboutSubcntRepository.findById(id).map(aboutUssubcntData -> {

					
					landingAboutSubcntRepository.deleteById(id);

					return ResponseHandler.generateResponse("About Us Sub Content Information Removed Successfully", true,
							HttpStatus.OK, null);
				}).orElseGet(() -> {
					LOGGER.error("Exceptions happen!: About Us Sub Content ID {} Doesn't exist to remove attachment", id);
					return ResponseHandler.generateResponse("About Us ID " + id + " Doesn't exist to remove attachment",
							false, HttpStatus.OK, null);
				});

			} catch (Exception e) {
				LOGGER.error("Internal Server Error while remove About Us Document: {}", e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}
		}
		
		

		// Delete About US Sub List
			@DeleteMapping("/sublist/{id}")
			public ResponseEntity<Object> deleteAboutUsSubList(@PathVariable Long id) {
				try {

					return landingAboutSubListRepository.findById(id).map(aboutUssubcntData -> {

						
						landingAboutSubListRepository.deleteById(id);

						return ResponseHandler.generateResponse("About Us Sub List Information Removed Successfully", true,
								HttpStatus.OK, null);
					}).orElseGet(() -> {
						LOGGER.error("Exceptions happen!: About Us Sub List ID {} Doesn't exist to remove attachment", id);
						return ResponseHandler.generateResponse("About Us Sub List ID " + id + " Doesn't exist to remove attachment",
								false, HttpStatus.OK, null);
					});

				} catch (Exception e) {
					LOGGER.error("Internal Server Error while remove About Us Sub List ID: {}", e.getMessage());
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
							env.getProperty("hostname.name") + "/api/landingpage/aboutus/attachments/" + filename);
					currentFiles.setSupporting_file_view_url(
							env.getProperty("hostname.name") + "/api/landingpage/aboutus/viewfile/" + filename);

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
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	@GetMapping("/attachments/{filename:.+}")
	@ResponseBody
	public ResponseEntity<Resource> getFile(@PathVariable String filename) {
		try {

			Resource file = storageServicepath.load(filename);
			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
					.body(file);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while download JD document: " + e.getMessage());
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
						env.getProperty("hostname.name") + "/api/landingpage/aboutus/attachments/" + filename);

				currentFile.setSupporting_file_view_url(
						env.getProperty("hostname.name") + "/api/landingpage/aboutus/viewfile/" + filename);
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
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
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

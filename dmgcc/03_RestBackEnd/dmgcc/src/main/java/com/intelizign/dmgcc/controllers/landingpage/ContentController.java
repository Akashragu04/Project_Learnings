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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
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

import com.intelizign.dmgcc.authendication.AzureUserInfo;
import com.intelizign.dmgcc.authendication.UserDetailsImpl;
import com.intelizign.dmgcc.models.FileUploadModel;
import com.intelizign.dmgcc.models.landingpage.ContentNewsLetterModel;
import com.intelizign.dmgcc.repositories.FileUploadRepository;
import com.intelizign.dmgcc.repositories.landingpage.ContentRepository;
import com.intelizign.dmgcc.request.BroucherRequest;
import com.intelizign.dmgcc.request.SupportingFiles;
import com.intelizign.dmgcc.request.landingpage.ContentNewsLetterRequest;
import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.services.FilesStorageServicePath;

@RestController
@RequestMapping("/content")
public class ContentController {

	@Autowired
	private Environment env;

	@Autowired
	FilesStorageServicePath storageServicepath;

	@Autowired
	private FileUploadRepository fileUploadRepository;

	@Autowired
	private ContentRepository cntentRepository;

	@Autowired
	private AzureUserInfo azureUserInfo;

	public final Logger LOGGER = LogManager.getLogger(ContentController.class);

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

	// Get All Content data
	@GetMapping("/getall")
	public ResponseEntity<Object> findAllContent(@RequestParam String Modelname

	) {
		try {

			List<ContentNewsLetterModel> cntentDatas = cntentRepository.findByActiveAndApproved(true, true, Modelname);
			return ResponseHandler.generateResponse("List of Content Retrieved Successfully", true, HttpStatus.OK,
					cntentDatas);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error: {}", e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	// Create or Update Content
	@PostMapping("")
	public ResponseEntity<Object> createContent(@Valid @RequestBody ContentNewsLetterRequest contentReq,
			Authentication authentication) {
		try {

			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);

			ContentNewsLetterModel cntentData = new ContentNewsLetterModel();

			SupportingFiles currentFile = contentReq.getCoverImage();

			if (currentFile != null && Boolean.FALSE.equals(currentFile.getMapped())) {

				Optional<FileUploadModel> fileuploadmodel = fileUploadRepository.findById(currentFile.getId());

				if (fileuploadmodel.isPresent()) {

					fileuploadmodel.get().setMapped(true);

					currentFile.setMapped(true);

					fileUploadRepository.save(fileuploadmodel.get());

				}

			}
			cntentData.setId(contentReq.getId());
			cntentData.setTitle(contentReq.getTitle());
			cntentData.setModel_name("Content");
			cntentData.setDescription(contentReq.getDescription());
			cntentData.setCoverImage(currentFile);
			cntentData.setNewsletter(contentReq.getNewsletter());
			cntentData.setCreated_by(userDetails.getUsername());
			cntentData.setCreated_on(LocalDateTime.now());

			cntentRepository.save(cntentData);

			return ResponseHandler.generateResponse("Content Created successfully", true, HttpStatus.OK, cntentData);

		}

		catch (Exception e) {

			LOGGER.error("Internal Server Error while insert Content: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	// Get Particular Content
	@GetMapping("/get/{id}")
	public ResponseEntity<Object> getContent(@PathVariable(value = "id") Long id) {
		try {
			return cntentRepository.findById(id).map(contentData -> {

				return ResponseHandler.generateResponse("Content Information retrieved successfully", true,
						HttpStatus.OK, contentData);

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Content {} Doesn't exist", id);
				return ResponseHandler.generateResponse("Content " + id + " Doesn't exist", false, HttpStatus.OK, null);
			});
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get Content: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	// Get Particular User Content
	@GetMapping("/getusercontent")
	public ResponseEntity<Object> getuserContent(@RequestParam String ModelName, Authentication authentication) {
		try {

			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);

			if (!userDetails.getRolename().equals("ADMIN")) {

				List<ContentNewsLetterModel> contentdatas = cntentRepository.findByUserName(true,
						userDetails.getUsername(), ModelName);

				if (!contentdatas.isEmpty()) {

					return ResponseHandler.generateResponse("Content Information retrieved successfully", true,
							HttpStatus.OK, contentdatas);
				}

				else
					return ResponseHandler.generateResponse("Content Data Not Found", false, HttpStatus.OK, null);

			}

			else {

				List<ContentNewsLetterModel> contentdatas = cntentRepository.findByactive(true, ModelName);

				if (!contentdatas.isEmpty()) {
					return ResponseHandler.generateResponse("Content Information retrieved successfully", true,
							HttpStatus.OK, contentdatas);
				}

				else
					return ResponseHandler.generateResponse("Content Data Not Found", false, HttpStatus.OK, null);

			}

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get Content: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	// Get Particular User Content pagination service
	@GetMapping("/getusercontentinfo")
	public ResponseEntity<Object> getuserContentdata(
			@PageableDefault(size = 10, page = 0, sort = "id", direction = Direction.DESC) Pageable pageable,
			@RequestParam(required = false) String searchKeyword, @RequestParam String ModelName,
			Authentication authentication) {
		try {

			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);

			if (!userDetails.getRolename().equals("ADMIN")) {

				Page<ContentNewsLetterModel> contentdatas = cntentRepository.findByUserNameWithSearch(true,
						userDetails.getUsername(), ModelName,searchKeyword ,pageable);

				if (!contentdatas.isEmpty()) {

					return ResponseHandler.generateResponse("Content Information Retrieved Successfully", true,
							HttpStatus.OK, contentdatas);
				}

				else
					return ResponseHandler.generateResponse("Content Data Not Found", false, HttpStatus.OK, null);

			}

			else {

				Page<ContentNewsLetterModel> contentdatas = cntentRepository.findByactiveWithSearch(true, ModelName , searchKeyword ,pageable);

				if (!contentdatas.isEmpty()) {
					return ResponseHandler.generateResponse("Content Information Retrieved Successfully", true,
							HttpStatus.OK, contentdatas);
				}

				else
					return ResponseHandler.generateResponse("Content Data Not Found", false, HttpStatus.OK, null);

			}

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get Content: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	// Updating particular Content
	@PutMapping("")
	public ResponseEntity<Object> updateContent(@Valid @RequestBody List<ContentNewsLetterRequest> cntentReq) {
		try {

			List<ContentNewsLetterModel> contentDatas = new ArrayList<>();

			for (ContentNewsLetterRequest contentData : cntentReq) {

				Optional<ContentNewsLetterModel> contentDatasReq = cntentRepository.findById(contentData.getId());

				if (contentDatasReq.isPresent()) {

					SupportingFiles currentFile = contentData.getCoverImage();

					if (currentFile != null && Boolean.FALSE.equals(currentFile.getMapped())) {

						Optional<FileUploadModel> fileuploadmodel = fileUploadRepository.findById(currentFile.getId());

						if (fileuploadmodel.isPresent()) {

							fileuploadmodel.get().setMapped(true);

							currentFile.setMapped(true);

							fileUploadRepository.save(fileuploadmodel.get());

						}

					}

					contentDatasReq.get().setCoverImage(currentFile);
					contentDatasReq.get().setDescription(contentData.getDescription());
					contentDatasReq.get().setTitle(contentData.getTitle());
					contentDatasReq.get().setNewsletter(contentData.getNewsletter());

					contentDatas.add(contentDatasReq.get());

				}

				else {
					return ResponseHandler.generateResponse("Content not found , Please contact G3C Admin", false,
							HttpStatus.OK, null);
				}

			}

			cntentRepository.saveAll(contentDatas);
			return ResponseHandler.generateResponse("Content Updated Successfully", true, HttpStatus.OK, contentDatas);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error: {}", e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	// Delete Content
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteContent(@PathVariable Long id) {
		try {

			return cntentRepository.findById(id).map(contentData -> {

				if (contentData.getCoverImage() != null) {

					storageServicepath.delete(contentData.getCoverImage().getSupporting_files_name());
				}

				cntentRepository.deleteById(id);

				return ResponseHandler.generateResponse("Content Deleted Successfully", true, HttpStatus.OK, null);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Content ID {} Doesn't exist to remove attachment", id);
				return ResponseHandler.generateResponse("Content ID " + id + " Doesn't exist", false, HttpStatus.OK,
						null);
			});

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while remove Content Document: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	// Approve Content
	@PostMapping("/approvecontent")
	public ResponseEntity<Object> approveContent(@Valid @RequestBody ContentNewsLetterRequest contentDataReq,
			Authentication authentication) {
		try {

			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);

			if (userDetails.getRolename().equals("ADMIN")) {

				Optional<ContentNewsLetterModel> contentData = cntentRepository.findById(contentDataReq.getId());

				if (contentData.isPresent()) {

					contentData.get().setIs_approved(contentDataReq.getIs_approved());

					cntentRepository.save(contentData.get());

					return ResponseHandler.generateResponse("Content Status Updated successfully", true, HttpStatus.OK,
							contentData);

				}

				else
					return ResponseHandler.generateResponse("Content Data Not Found", false, HttpStatus.OK, null);

			}

			else

				return ResponseHandler.generateResponse("Access Denied", false, HttpStatus.OK, null);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get Content: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	// Get Latest Content
	@GetMapping("/latestcontent")
	public ResponseEntity<Object> getContent() {
		try {
			List<ContentNewsLetterModel> cntentDatas = cntentRepository.findAll();

			if (!cntentDatas.isEmpty()) {

				int size = cntentDatas.size();

				ContentNewsLetterModel latestContntData = cntentDatas.get(size - 1);

				return ResponseHandler.generateResponse("Latest Content Retrieved Sucessfully", true, HttpStatus.OK,
						latestContntData);

			}

			else
				return ResponseHandler.generateResponse("No Content Found", false, HttpStatus.OK, null);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get  Content: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	// Get Three Active Content
	@GetMapping("/activecontent")
	public ResponseEntity<Object> getActiveContent() {
		try {

			List<ContentNewsLetterModel> contentDatas = cntentRepository.findAll();

			List<ContentNewsLetterModel> activeContentData = contentDatas.stream()
					.filter(activeData -> activeData.getActive().equals(true)).toList();

			if (activeContentData.size() > 3) {

				List<ContentNewsLetterModel> activeLastThreeData = activeContentData
						.subList(Math.max(activeContentData.size() - 3, 0), activeContentData.size());

				return ResponseHandler.generateResponse("Latest three Content Retrieved Sucessfully", true,
						HttpStatus.OK, activeLastThreeData);

			}

			else if (activeContentData.size() <= 3 && !activeContentData.isEmpty()) {
				return ResponseHandler.generateResponse("Latest three Content Retrieved Sucessfully", true,
						HttpStatus.OK, activeContentData);
			}

			else
				return ResponseHandler.generateResponse("No Content Found", false, HttpStatus.OK, null);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get  Content : {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	// Multiple File Upload
	@PostMapping("/upload")
	public ResponseEntity<Object> jdInsert(@RequestParam("file") MultipartFile[] files, Authentication authentication) {
		try {

			if (files != null) {

				UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

				if (userDetails == null)
					return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);

				List<FileUploadModel> allFiles = new ArrayList<>();
				for (MultipartFile file : files) {

					FileUploadModel currentFiles = new FileUploadModel();

					String filename = storageServicepath.save(file);
					currentFiles.setSupporting_files_name(filename);
					currentFiles.setSupporting_files_url(
							env.getProperty("hostname.name") + "/api/content/attachments/" + filename);
					currentFiles.setSupporting_file_view_url(
							env.getProperty("hostname.name") + "/api/content/viewfile/" + filename);

					currentFiles.setMapped(false);
					currentFiles.setUpload_by(userDetails.getUsername());
					currentFiles.setUpload_on(LocalDateTime.now());

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
	public ResponseEntity<Object> singleFileUpload(@RequestParam("file") MultipartFile file,
			Authentication authentication) {
		try {

			if (file != null) {

				UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

				if (userDetails == null)
					return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);

				FileUploadModel currentFile = new FileUploadModel();

				String filename = storageServicepath.save(file);
				currentFile.setSupporting_files_name(filename);
				currentFile.setSupporting_files_url(
						env.getProperty("hostname.name") + "/api/content/attachments/" + filename);

				currentFile.setSupporting_file_view_url(
						env.getProperty("hostname.name") + "/api/content/viewfile/" + filename);
				currentFile.setUpload_by(userDetails.getUsername());
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

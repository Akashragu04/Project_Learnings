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
import com.intelizign.dmgcc.models.landingpage.BroucherModel;
import com.intelizign.dmgcc.models.landingpage.ContentNewsLetterModel;
import com.intelizign.dmgcc.repositories.FileUploadRepository;
import com.intelizign.dmgcc.repositories.landingpage.ContentRepository;
import com.intelizign.dmgcc.request.SupportingFiles;
import com.intelizign.dmgcc.request.landingpage.ContentNewsLetterRequest;
import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.services.FilesStorageServicePath;

@RestController
@RequestMapping("/newsletter")
public class NewsLetterController {

	@Autowired
	private Environment env;

	@Autowired
	FilesStorageServicePath storageServicepath;

	@Autowired
	private FileUploadRepository fileUploadRepository;

	@Autowired
	private ContentRepository newsLetterRepository;

	@Autowired
	private AzureUserInfo azureUserInfo;

	public final Logger LOGGER = LogManager.getLogger(NewsLetterController.class);

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

	// Get All News Letter
	@GetMapping("/getall")
	public ResponseEntity<Object> findAllNewsLetter(@RequestParam String ModelName, Authentication authentication) {
		try {

			List<ContentNewsLetterModel> newsLetterDatas = newsLetterRepository.findByActiveAndApproved(true, true,
					ModelName);
			return ResponseHandler.generateResponse("List of News Letter Retrieved Successfully", true, HttpStatus.OK,
					newsLetterDatas);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error: {}", e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	// Create News Letter
	@PostMapping("")
	public ResponseEntity<Object> createNewsLetter(@Valid @RequestBody ContentNewsLetterRequest newsLetterReq,
			Authentication authentication) {
		try {

			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);

			ContentNewsLetterModel newsLetterData = new ContentNewsLetterModel();

			SupportingFiles currentFile = newsLetterReq.getCoverImage();

			if ((newsLetterReq.getNewsletter_file() != null
					&& Boolean.FALSE.equals(newsLetterReq.getNewsletter_file().getMapped()))) {

				SupportingFiles currentNewsLetter = newsLetterReq.getNewsletter_file();

				if (newsLetterReq.getCoverImage() != null
						&& Boolean.FALSE.equals(newsLetterReq.getCoverImage().getMapped())) {
					currentFile = newsLetterReq.getCoverImage();

					Optional<FileUploadModel> fileuploadmodel = fileUploadRepository.findById(currentFile.getId());

					if (fileuploadmodel.isPresent()) {

						fileuploadmodel.get().setMapped(true);

						currentFile.setMapped(true);

						fileUploadRepository.save(fileuploadmodel.get());

						newsLetterData.setCreated_by(fileuploadmodel.get().getUpload_by());
						newsLetterData.setCreated_on(fileuploadmodel.get().getUpload_on());
						newsLetterData.setCoverImage(currentFile);

					}

				}

				Optional<FileUploadModel> fileuploadbroucher = fileUploadRepository.findById(currentNewsLetter.getId());

				if (fileuploadbroucher.isPresent()) {

					fileuploadbroucher.get().setMapped(true);

					currentNewsLetter.setMapped(true);

					fileUploadRepository.save(fileuploadbroucher.get());

				}
				newsLetterData.setId(newsLetterReq.getId());
				newsLetterData.setTitle(newsLetterReq.getTitle());
				newsLetterData.setModel_name("News Letter");
				newsLetterData.setDescription(newsLetterReq.getDescription());
				newsLetterData.setCoverImage(currentFile);
				newsLetterData.setNewsletter(newsLetterReq.getNewsletter());
				newsLetterData.setNewsletter_file(currentNewsLetter);
				newsLetterData.setCreated_by(userDetails.getUsername());
				newsLetterData.setCreated_on(LocalDateTime.now());

				newsLetterRepository.save(newsLetterData);

				
				if(newsLetterReq.getId()== 0) {
					return ResponseHandler.generateResponse("Newsletter Created Successfully", true, HttpStatus.OK,
							null);
				}
				
				else {
					return ResponseHandler.generateResponse("Newsletter Updated Successfully", true, HttpStatus.OK,
							null);
				}
			}

			else
				return ResponseHandler.generateResponse("Upload atleast one file for Newsletter", false, HttpStatus.OK,
						null);

		}

		catch (Exception e) {

			LOGGER.error("Internal Server Error while insert NewsLetter: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	// Get Particular News Letter
	@GetMapping("/get/{id}")
	public ResponseEntity<Object> getNewsLetter(@PathVariable(value = "id") Long id) {
		try {
			return newsLetterRepository.findById(id).map(newsletterData -> {
				return ResponseHandler.generateResponse("News Letter Information", true, HttpStatus.OK, newsletterData);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: News Letter {} Doesn't exist", id);
				return ResponseHandler.generateResponse("News Letter " + id + " Doesn't exist", false, HttpStatus.OK,
						null);
			});
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get News Letter: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	// Get Particular User News Letter
	@GetMapping("/getusernewsletter")
	public ResponseEntity<Object> getuserNewsletter(@RequestParam String ModelName, Authentication authentication) {
		try {

			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);

			if (!userDetails.getRolename().equals("ADMIN")) {

				List<ContentNewsLetterModel> newsletterdatas = newsLetterRepository.findByUserName(true,
						userDetails.getUsername(), ModelName);

				if (!newsletterdatas.isEmpty()) {

					return ResponseHandler.generateResponse("News Letter Information retrieved successfully", true,
							HttpStatus.OK, newsletterdatas);
				}

				else
					return ResponseHandler.generateResponse("News Letter Data Not Found", false, HttpStatus.OK, null);

			}

			else {

				List<ContentNewsLetterModel> newsletterdatas = newsLetterRepository.findByactive(true, ModelName);

				if (!newsletterdatas.isEmpty()) {
					return ResponseHandler.generateResponse("News Letter Information retrieved successfully", true,
							HttpStatus.OK, newsletterdatas);
				}

				else
					return ResponseHandler.generateResponse("News Letter Data Not Found", false, HttpStatus.OK, null);

			}

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get News Letter: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	// Get Particular User News Letter pagination service
	@GetMapping("/getusernewsletterinfo")
	public ResponseEntity<Object> getuserNewsletterdata(
			@PageableDefault(size = 10, page = 0, sort = "id", direction = Direction.DESC) Pageable pageable,
			@RequestParam(required = false) String searchKeyword, @RequestParam String ModelName,
			Authentication authentication) {
		try {

			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);

			if (!userDetails.getRolename().equals("ADMIN")) {

				Page<ContentNewsLetterModel>  newsletterdatas = newsLetterRepository.findByUserNameWithSearch(true,
						userDetails.getUsername(), ModelName,searchKeyword ,pageable);

				if (!newsletterdatas.isEmpty()) {

					return ResponseHandler.generateResponse("NewsLetter Information Retrieved Successfully", true,
							HttpStatus.OK, newsletterdatas);
				}

				else
					return ResponseHandler.generateResponse("NewsLetter Data Not Found", false, HttpStatus.OK, null);

			}

			else {

				Page<ContentNewsLetterModel> newsletterdatas = newsLetterRepository.findByactiveWithSearch(true, ModelName,searchKeyword ,pageable);

				if (!newsletterdatas.isEmpty()) {
					return ResponseHandler.generateResponse("NewsLetter Information Retrieved Successfully", true,
							HttpStatus.OK, newsletterdatas);
				}

				else
					return ResponseHandler.generateResponse("NewsLetter Data Not Found", false, HttpStatus.OK, null);

			}

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get NewsLetter: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	// Updating particular News Letter
	@PutMapping("")
	public ResponseEntity<Object> updateBroucher(@Valid @RequestBody ContentNewsLetterRequest newsletterReq) {
		try {

			

			

				Optional<ContentNewsLetterModel> newsletterData = newsLetterRepository
						.findById(newsletterReq.getId());

				SupportingFiles currentFile = newsletterReq.getCoverImage();

				if (newsletterData.isPresent()) {

					if ((newsletterReq.getNewsletter_file() != null
							&& Boolean.FALSE.equals(newsletterReq.getNewsletter_file().getMapped()))) {
						
						SupportingFiles currentNewsletter = newsletterReq.getNewsletter_file();
						
						Optional<FileUploadModel> fileuploadbroucher = fileUploadRepository
								.findById(currentNewsletter.getId());

						if (fileuploadbroucher.isPresent()) {

							fileuploadbroucher.get().setMapped(true);

							currentNewsletter.setMapped(true);

							fileUploadRepository.save(fileuploadbroucher.get());
						}
					}
					else if(newsletterReq.getNewsletter_file() == null){
						return ResponseHandler.generateResponse("Please Upload Atleast One File For News Letter", false,
								HttpStatus.OK, null);
					}

						if (newsletterReq.getCoverImage() != null
								&& Boolean.FALSE.equals(newsletterReq.getCoverImage().getMapped())) {

							Optional<FileUploadModel> fileuploadmodel = fileUploadRepository
									.findById(currentFile.getId());

							if (fileuploadmodel.isPresent()) {

								fileuploadmodel.get().setMapped(true);

								currentFile.setMapped(true);

								fileUploadRepository.save(fileuploadmodel.get());

							}
						}

						newsletterData.get().setCoverImage(currentFile);
						newsletterData.get().setDescription(newsletterReq.getDescription());
						newsletterData.get().setTitle(newsletterReq.getTitle());
						newsletterData.get().setNewsletter_file(newsletterReq.getNewsletter_file());
						newsletterData.get().setNewsletter(newsletterReq.getNewsletter());

						newsLetterRepository.save(newsletterData.get());
						return ResponseHandler.generateResponse("NewsLetter Updated Successfully", true,
								HttpStatus.OK, newsletterData.get());
				}

				else {
					return ResponseHandler.generateResponse("News Letter not found , Please contact G3C Admin", false,
							HttpStatus.OK, null);
				}
		}

		catch (Exception e) {
			LOGGER.error("Internal Server Error: {}", e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	// Delete News Letter
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteNewsLetter(@PathVariable Long id) {
		try {

			return newsLetterRepository.findById(id).map(newsLetterData -> {

				if (newsLetterData.getCoverImage() != null) {

					storageServicepath.delete(newsLetterData.getCoverImage().getSupporting_files_name());
				}

				else if (newsLetterData.getNewsletter_file() != null) {

					storageServicepath.delete(newsLetterData.getNewsletter_file().getSupporting_files_name());

				}

				newsLetterRepository.deleteById(id);

				return ResponseHandler.generateResponse("News Letter Deleted Successfully", true, HttpStatus.OK, null);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: News Letter ID {} Doesn't exist to remove attachment", id);
				return ResponseHandler.generateResponse("News Letter ID " + id + " Doesn't exist to remove attachment",
						false, HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while remove News Letter Document: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	// Approve Newsletter
	@PostMapping("/approvenewsletter")
	public ResponseEntity<Object> approveNewsletter(@Valid @RequestBody ContentNewsLetterRequest newsletterDataReq,
			Authentication authentication) {
		try {

			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);

			if (userDetails.getRolename().equals("ADMIN")) {

				Optional<ContentNewsLetterModel> newsletterData = newsLetterRepository
						.findById(newsletterDataReq.getId());

				if (newsletterData.isPresent()) {

					newsletterData.get().setIs_approved(newsletterDataReq.getIs_approved());

					newsLetterRepository.save(newsletterData.get());

					return ResponseHandler.generateResponse("News Letter Status Updated successfully", true,
							HttpStatus.OK, newsletterData);

				}

				else
					return ResponseHandler.generateResponse("News Letter Data Not Found", false, HttpStatus.OK, null);

			}

			else

				return ResponseHandler.generateResponse("Access Denied", false, HttpStatus.OK, null);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get News Letter: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	// Get Latest Newsletter
	@GetMapping("/latestnewsletter")
	public ResponseEntity<Object> getLatestNewsLetter() {
		try {
			List<ContentNewsLetterModel> newsletterDatas = newsLetterRepository.findByactive(true, "News Letter");

			if (!newsletterDatas.isEmpty()) {
				int size = newsletterDatas.size();

				ContentNewsLetterModel latestNewsLetterData = newsletterDatas.get(size - 1);

				return ResponseHandler.generateResponse("Latest News Letter Retrieved Sucessfully", true, HttpStatus.OK,
						latestNewsLetterData);

			}

			else
				return ResponseHandler.generateResponse("No News Letter Found", false, HttpStatus.OK, null);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get  News Letter: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	// Get Three Active NewsLetter
	@GetMapping("/activenewsletter")
	public ResponseEntity<Object> getActiveThreeNewsLetter() {
		try {
			List<ContentNewsLetterModel> newsletterDatas = newsLetterRepository.findByactive(true, "News Letter");

			List<ContentNewsLetterModel> activeNewsLetterData = newsletterDatas.stream()
					.filter(activeData -> activeData.getActive().equals(true)).toList();

			if (activeNewsLetterData.size() > 3) {

				List<ContentNewsLetterModel> activeLastThreeData = activeNewsLetterData
						.subList(Math.max(activeNewsLetterData.size() - 3, 0), activeNewsLetterData.size());

				return ResponseHandler.generateResponse("Latest three News Letter Retrieved Sucessfully", true,
						HttpStatus.OK, activeLastThreeData);

			}

			else if (activeNewsLetterData.size() <= 3 && !activeNewsLetterData.isEmpty()) {
				return ResponseHandler.generateResponse("Latest three News Letter Retrieved Sucessfully", true,
						HttpStatus.OK, activeNewsLetterData);
			}

			else
				return ResponseHandler.generateResponse("No News Letter Found", false, HttpStatus.OK, null);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get  News Letter: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	// Multiple File Upload
	@PostMapping("/upload")
	public ResponseEntity<Object> jdInsert(@RequestParam("file") MultipartFile[] files, Authentication authentication) {
		try {
				UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

				if (userDetails == null)
					return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);

				if (files != null) {
					
				List<FileUploadModel> allFiles = new ArrayList<>();
				for (MultipartFile file : files) {

					FileUploadModel currentFiles = new FileUploadModel();

					String filename = storageServicepath.save(file);
					currentFiles.setSupporting_files_name(filename);
					currentFiles.setSupporting_files_url(
							env.getProperty("hostname.name") + "/api/newsletter/attachments/" + filename);
					currentFiles.setSupporting_file_view_url(
							env.getProperty("hostname.name") + "/api/newsletter/viewfile/" + filename);

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
						env.getProperty("hostname.name") + "/api/newsletter/attachments/" + filename);

				currentFile.setSupporting_file_view_url(
						env.getProperty("hostname.name") + "/api/newsletter/viewfile/" + filename);
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

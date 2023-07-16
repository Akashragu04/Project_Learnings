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
import com.intelizign.dmgcc.repositories.FileUploadRepository;
import com.intelizign.dmgcc.repositories.landingpage.BroucherRepository;
import com.intelizign.dmgcc.request.BroucherRequest;
import com.intelizign.dmgcc.request.SupportingFiles;
import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.services.FilesStorageServicePath;

@RestController
@RequestMapping("/broucher")
public class BroucherController {

	@Autowired
	private Environment env;

	@Autowired
	FilesStorageServicePath storageServicepath;

	@Autowired
	private FileUploadRepository fileUploadRepository;

	@Autowired
	private BroucherRepository broucherRepository;

	@Autowired
	private AzureUserInfo azureUserInfo;

	public final Logger LOGGER = LogManager.getLogger(BroucherController.class);

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

	// Get All Brouchers
	@GetMapping("/getall")
	public ResponseEntity<Object> findAllBroucher() {
		try {

			List<BroucherModel> broucherDatas = broucherRepository.findByActiveAndApproved(true, true);

			return ResponseHandler.generateResponse("List of Brochures Retrieved Successfully", true, HttpStatus.OK,
					broucherDatas);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error: {}", e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	// Create Broucher
	@PostMapping("")
	public ResponseEntity<Object> createBroucher(@Valid @RequestBody BroucherRequest broucherDataReq,
			Authentication authentication) {
		try {

			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);

			BroucherModel broucherData = new BroucherModel();

			SupportingFiles currentFile = null;
			
			currentFile = broucherDataReq.getSupporting_file();
			
			SupportingFiles currentBroucher = broucherDataReq.getBrochureFile();

			if ((broucherDataReq.getBrochureFile() != null
					&& Boolean.FALSE.equals(broucherDataReq.getBrochureFile().getMapped()))) {

				

				if (broucherDataReq.getSupporting_file() != null
						&& Boolean.FALSE.equals(broucherDataReq.getSupporting_file().getMapped())) {
					

					Optional<FileUploadModel> fileuploadmodel = fileUploadRepository.findById(currentFile.getId());

					if (fileuploadmodel.isPresent()) {

						fileuploadmodel.get().setMapped(true);

						currentFile.setMapped(true);

						fileUploadRepository.save(fileuploadmodel.get());

					}

				}

				Optional<FileUploadModel> fileuploadbroucher = fileUploadRepository.findById(currentBroucher.getId());

				if (fileuploadbroucher.isPresent()) {

					fileuploadbroucher.get().setMapped(true);

					currentBroucher.setMapped(true);

					fileUploadRepository.save(fileuploadbroucher.get());

				}
				
				broucherData.setId(broucherDataReq.getId());
				broucherData.setBrochureFile(broucherDataReq.getBrochureFile());
				broucherData.setDescription(broucherDataReq.getDescription());
				broucherData.setTitle(broucherDataReq.getTitle());
				broucherData.setSupporting_files(broucherDataReq.getSupporting_file());
				broucherData.setCreated_by(userDetails.getUsername());
				broucherData.setCreated_on(LocalDateTime.now());

				broucherRepository.save(broucherData);

				return ResponseHandler.generateResponse("Brochure Created Successfully", true, HttpStatus.OK,
						broucherData);
			}

			else
				return ResponseHandler.generateResponse("Upload atleast one file for brochure", false, HttpStatus.OK,
						null);

		}

		catch (Exception e) {

			LOGGER.error("Internal Server Error while insert brochure: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	// Get Particular Broucher
	@GetMapping("/get/{id}")
	public ResponseEntity<Object> getBroucherbyid(@PathVariable(value = "id") Long id) {
		try {
			return broucherRepository.findById(id).map(broucherData -> {
				return ResponseHandler.generateResponse("Brochure Information Retrieved Successfully", true,
						HttpStatus.OK, broucherData);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Brochure {} Doesn't exist", id);
				return ResponseHandler.generateResponse("Brochure " + id + " Doesn't exist", false, HttpStatus.OK,
						null);
			});
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get Brochure: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	// Get Particular User Broucher
	@GetMapping("/getuserbroucher")
	public ResponseEntity<Object> getuserBroucher(Authentication authentication) {
		try {

			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);

			if (!userDetails.getRolename().equals("ADMIN")) {

				List<BroucherModel> broucherdatas = broucherRepository.findByUserName(true, userDetails.getUsername());

				if (!broucherdatas.isEmpty()) {

					return ResponseHandler.generateResponse("Brochure Information Retrieved Successfully", true,
							HttpStatus.OK, broucherdatas);
				}

				else
					return ResponseHandler.generateResponse("Brochure Data Not Found", false, HttpStatus.OK, null);

			}

			else {

				List<BroucherModel> broucherdatas = broucherRepository.findByactive(true);

				if (!broucherdatas.isEmpty()) {
					return ResponseHandler.generateResponse("Brochure Information Retrieved Successfully", true,
							HttpStatus.OK, broucherdatas);
				}

				else
					return ResponseHandler.generateResponse("Brochure Data Not Found", false, HttpStatus.OK, null);

			}

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get Brochure: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	// Get Particular User Broucher with searchKeyword
	@GetMapping("/getuserbroucherinfo")
	public ResponseEntity<Object> getuserBroucherdata(
			@PageableDefault(size = 10, page = 0, sort = "id", direction = Direction.DESC) Pageable pageable,
			@RequestParam(required = false) String searchKeyword, Authentication authentication) {
		try {

			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);

			if (!userDetails.getRolename().equals("ADMIN")) {

//					List<BroucherModel> broucherdatas = broucherRepository.findByUserName(true, userDetails.getUsername());
				Page<BroucherModel> broucherdatas = broucherRepository.findByUserNameWithSearch(searchKeyword, true,
						userDetails.getUsername(), pageable);

				if (!broucherdatas.isEmpty()) {

					return ResponseHandler.generateResponse("Brochure Information Retrieved Successfully", true,
							HttpStatus.OK, broucherdatas);
				}

				else
					return ResponseHandler.generateResponse("Brochure Data Not Found", false, HttpStatus.OK, null);

			}

			else {

//					List<BroucherModel> broucherdatas = broucherRepository.findByactive(true);
				Page<BroucherModel> broucherdatas = broucherRepository.findByactiveWithSearch(searchKeyword, true,
						pageable);

				if (!broucherdatas.isEmpty()) {
					return ResponseHandler.generateResponse("Brochure Information Retrieved Successfully", true,
							HttpStatus.OK, broucherdatas);
				}

				else
					return ResponseHandler.generateResponse("Brochure Data Not Found", false, HttpStatus.OK, null);

			}

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get Brochure: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	// Updating particular broucher
	@PutMapping("")
	public ResponseEntity<Object> updateBroucher(@Valid @RequestBody BroucherRequest broucherReq) {
		try {

		


				Optional<BroucherModel> broucherData = broucherRepository.findById(broucherReq.getId());
				SupportingFiles currentFile = null;

				if (broucherData.isPresent()) {

					if ((broucherReq.getBrochureFile() != null
							&& Boolean.FALSE.equals(broucherReq.getBrochureFile().getMapped()))) {

						SupportingFiles currentBroucher = broucherReq.getBrochureFile();
						

						Optional<FileUploadModel> fileuploadbroucher = fileUploadRepository
								.findById(currentBroucher.getId());

						if (fileuploadbroucher.isPresent()) {

							fileuploadbroucher.get().setMapped(true);

							currentBroucher.setMapped(true);

							fileUploadRepository.save(fileuploadbroucher.get());
						}
					}
					
					else if(broucherReq.getBrochureFile() == null){
						return ResponseHandler.generateResponse("Please Upload Atleast One File For Brochure", false,
								HttpStatus.OK, null);
					}

						if (broucherReq.getSupporting_file() != null
								&& Boolean.FALSE.equals(broucherReq.getSupporting_file().getMapped())) {
							currentFile = broucherReq.getSupporting_file();

							Optional<FileUploadModel> fileuploadmodel = fileUploadRepository
									.findById(currentFile.getId());

							if (fileuploadmodel.isPresent()) {

								fileuploadmodel.get().setMapped(true);

								currentFile.setMapped(true);

								fileUploadRepository.save(fileuploadmodel.get());

							}
						}

						broucherData.get().setBrochureFile(broucherReq.getBrochureFile());
						broucherData.get().setDescription(broucherReq.getDescription());
						broucherData.get().setTitle(broucherReq.getTitle());
						broucherData.get().setSupporting_files(broucherReq.getSupporting_file());

						broucherRepository.save(broucherData.get());
						
						return ResponseHandler.generateResponse("Brochure Updated Successfully", true,
								HttpStatus.OK, broucherData.get());

					}
				else {
					return ResponseHandler.generateResponse("Brochure not found , Please contact G3C Admin", false,
							HttpStatus.OK, null);
				}

		
		}

		catch (Exception e) {
			LOGGER.error("Internal Server Error: {}", e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	// Delete Broucher
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteBroucher(@PathVariable Long id) {
		try {

			return broucherRepository.findById(id).map(broucherData -> {

				if (broucherData.getSupporting_files() != null) {

					storageServicepath.delete(broucherData.getSupporting_files().getSupporting_files_name());
				}

				else if (broucherData.getBrochureFile() != null) {

					storageServicepath.delete(broucherData.getBrochureFile().getSupporting_files_name());

				}
				broucherRepository.deleteById(id);

				return ResponseHandler.generateResponse("Brochure Removed Successfully", true, HttpStatus.OK, null);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Brochure ID {} Doesn't exist to remove attachment", id);
				return ResponseHandler.generateResponse("Brochure ID " + id + " Doesn't exist to remove attachment",
						false, HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while remove Brochure Document: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	// Get Latest Broucher
	@GetMapping("/latestbroucher")
	public ResponseEntity<Object> getLatestBroucher() {
		try {
			List<BroucherModel> broucherDatas = broucherRepository.findAll();

			if (!broucherDatas.isEmpty()) {

				BroucherModel latestBroucherData = broucherDatas.get(broucherDatas.size() - 1);

				return ResponseHandler.generateResponse("Latest Brochure Information Retrieved Successfully", true,
						HttpStatus.OK, latestBroucherData);
			}

			else
				return ResponseHandler.generateResponse("No Brochure Found", false, HttpStatus.OK, null);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get Brochure: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	// Fetching three brouchers
	@GetMapping("/activebroucher")
	public ResponseEntity<Object> getActiveThreeBroucher() {
		try {
			List<BroucherModel> broucherDatas = broucherRepository.findAll();

			List<BroucherModel> activeBroucherData = broucherDatas.stream()
					.filter(activeData -> activeData.getActive().equals(true)).toList();

			if (activeBroucherData.size() > 3) {

				List<BroucherModel> activeLastThreeData = activeBroucherData
						.subList(Math.max(activeBroucherData.size() - 3, 0), activeBroucherData.size());

				return ResponseHandler.generateResponse("Latest Three Brochure Retrieved Sucessfully", true,
						HttpStatus.OK, activeLastThreeData);

			}

			else if (activeBroucherData.size() <= 3 && !activeBroucherData.isEmpty()) {
				return ResponseHandler.generateResponse("Latest Three Brochure Retrieved Sucessfully", true,
						HttpStatus.OK, activeBroucherData);
			}

			else
				return ResponseHandler.generateResponse("No Three Brochure Found", false, HttpStatus.OK, null);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get Brochure: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	// Approve Broucher
	@PostMapping("/approvebroucher")
	public ResponseEntity<Object> approveBroucher(@Valid @RequestBody BroucherRequest broucherDataReq,
			Authentication authentication) {
		try {

			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);

			if (userDetails.getRolename().equals("ADMIN")) {

				Optional<BroucherModel> broucherData = broucherRepository.findById(broucherDataReq.getId());

				if (broucherData.isPresent()) {

					broucherData.get().setIs_approved(broucherDataReq.getIs_approved());

					broucherRepository.save(broucherData.get());

					return ResponseHandler.generateResponse("Brochure Status Updated successfully", true, HttpStatus.OK,
							broucherData);

				}

				else
					return ResponseHandler.generateResponse("Brochure Data Not Found", false, HttpStatus.OK, null);

			}

			else

				return ResponseHandler.generateResponse("Access Denied", false, HttpStatus.OK, null);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get Brochure: {}", e.getMessage());
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
							env.getProperty("hostname.name") + "/api/broucher/attachments/" + filename);
					currentFiles.setSupporting_file_view_url(
							env.getProperty("hostname.name") + "/api/broucher/viewfile/" + filename);

					currentFiles.setUpload_by(userDetails.getUsername());
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

			LOGGER.error("Internal Server Error while uploading file : {}", e.getMessage());
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
						env.getProperty("hostname.name") + "/api/broucher/attachments/" + filename);

				currentFile.setSupporting_file_view_url(
						env.getProperty("hostname.name") + "/api/broucher/viewfile/" + filename);

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

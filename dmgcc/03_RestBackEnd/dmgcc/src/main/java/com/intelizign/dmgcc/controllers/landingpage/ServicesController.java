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
import org.springframework.web.bind.annotation.PutMapping;
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
import com.intelizign.dmgcc.models.landingpage.MainContentModel;
import com.intelizign.dmgcc.models.landingpage.SubContentModel;
import com.intelizign.dmgcc.repositories.FileUploadRepository;

import com.intelizign.dmgcc.repositories.landingpage.MainContentRepository;
import com.intelizign.dmgcc.repositories.landingpage.SubContentRepository;
import com.intelizign.dmgcc.repositories.landingpage.SubListRepository;
import com.intelizign.dmgcc.request.SupportingFiles;
import com.intelizign.dmgcc.request.landingpage.BroucherRequest;

import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.services.FilesStorageServicePath;

@RestController
@RequestMapping("/landingpage/services")
public class ServicesController {

	@Autowired
	private Environment env;

	@Autowired
	FilesStorageServicePath storageServicepath;
	
	@Autowired
	private FileUploadRepository fileUploadRepository;
	
	
	public final Logger LOGGER = LogManager.getLogger(ServicesController.class);
	
	@Autowired
	private SubContentRepository subContentRepository;
	
	@Autowired
	private MainContentRepository mainContentRepository;
		
	
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

	
	 //Get All Services Main Content data
	@GetMapping("/getmaincntent")
	public ResponseEntity<Object> findAllMainContentServices(@RequestParam String ModelName)  {
		try {
			    
			    MainContentModel serviceMainDatas = mainContentRepository.findByActiveservice(true, ModelName);
				return ResponseHandler.generateResponse("List of Main Content Services Information retrieved successfully", true, HttpStatus.OK, serviceMainDatas);
			

		} catch (Exception e) {
			LOGGER.error("Internal Server Error: {}" , e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}
	
	
	 //Create Landing Services Main Content
		@PostMapping("/maincntnt")
		public ResponseEntity<Object> createServicesMainCnt(@Valid @RequestBody MainContentModel serviceMainData
				) {
			try {
	                 
				    serviceMainData.setModel_name("Services");
				
				    mainContentRepository.save (serviceMainData);
					
					return ResponseHandler.generateResponse("Landing Page Services Main Content Created successfully", true, HttpStatus.OK,
							serviceMainData);
				
			}

			catch (Exception e) {

				LOGGER.error("Internal Server Error While Creating Landing Page Customer Services: {}", e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}
		}

	

	// Get Particular Services Main Content
	@GetMapping("/getmaincntent/{id}")
	public ResponseEntity<Object> getServicesbyid(@PathVariable(value = "id") Long id) {
		try {

			return mainContentRepository.findById(id).map(serviceMainData -> {

				return ResponseHandler.generateResponse("Services Main ContentInformation retrieved successfully", true,
						HttpStatus.OK, serviceMainData);

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Services Main Content {} Doesn't exist", id);
				return ResponseHandler.generateResponse("Services " + id + " Doesn't exist", false, HttpStatus.OK,
						null);
			});
		} 
		
		catch (Exception e) {
			LOGGER.error("Internal Server Error while get Services : {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	
		
	
	// Delete particular Services Main Content
	@DeleteMapping("/maincntnt/{id}")
	public ResponseEntity<Object> deleteServicesMainCnt(@PathVariable Long id) {
		try {

			return mainContentRepository.findById(id).map(serviceMainData -> {
			
				mainContentRepository.deleteById(id);

				return ResponseHandler.generateResponse("Service Information Main Content Removed Successfully", true, HttpStatus.OK,
						null);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Service Main Content ID {} Doesn't exists", id);
				return ResponseHandler.generateResponse("Service Main Content ID " + id + " Doesn't exists", false,
						HttpStatus.OK, null);
			});

		} 
		
		catch (Exception e) {
			LOGGER.error("Internal Server Error while remove Service Main Content: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}


	 //Create Services Sub Content
		@PostMapping("/subcntnt")
		public ResponseEntity<Object> createServicesMaincntnt(@Valid @RequestBody BroucherRequest servicesReqData
				) {
			try {
				
				SupportingFiles currentFile = servicesReqData.getSupporting_file();

				if (currentFile != null && Boolean.FALSE.equals(currentFile.getMapped())) {

					Optional<FileUploadModel> fileuploadmodel = fileUploadRepository.findById(currentFile.getId());

					if (fileuploadmodel.isPresent()) {

						fileuploadmodel.get().setMapped(true);

						currentFile.setMapped(true);

						fileUploadRepository.save(fileuploadmodel.get());

					}

				}

				SubContentModel servicesData = new SubContentModel();
				servicesData.setModel_name("Services");
				servicesData.setTitle(servicesReqData.getTitle());
				servicesData.setSupporting_files(currentFile);
				

				 subContentRepository.save(servicesData);

				return ResponseHandler.generateResponse(
						"Landing Page Services Created successfully", true, HttpStatus.OK,
						servicesData);
				
			}

			catch (Exception e) {

				LOGGER.error("Internal Server Error While Creating Landing Page Services Sub Content: {}", e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}
		}

		// Update Services Sub Content
				@PostMapping("/updatesubcntnt")
				public ResponseEntity<Object> updateServices(@Valid @RequestBody List<BroucherRequest> servicesReqDatas) {
					try {

						List<SubContentModel> subContentDatas = new ArrayList<>();

						for (BroucherRequest subContentReqData : servicesReqDatas) {

							Optional<SubContentModel> subContentData = subContentRepository.findById(subContentReqData.getId());

							if (subContentData.isPresent()) {

								subContentData.get().setTitle(subContentReqData.getTitle());
							
								SupportingFiles currentFile = subContentReqData.getSupporting_file();

								if (currentFile != null && Boolean.FALSE.equals(currentFile.getMapped())) {

									Optional<FileUploadModel> fileuploadmodel = fileUploadRepository.findById(currentFile.getId());

									if (fileuploadmodel.isPresent()) {

										fileuploadmodel.get().setMapped(true);

										currentFile.setMapped(true);

										fileUploadRepository.save(fileuploadmodel.get());

									}

								}
	            
								subContentData.get().setSupporting_files(currentFile);
								
								subContentDatas.add(subContentData.get());

							}

							else {
								return ResponseHandler.generateResponse(
										"Services not found , Please contact G3C Admin", false,
										HttpStatus.OK, null);
							}
						}

						List<SubContentModel> ocMainCntntData = subContentRepository.saveAll(subContentDatas);

						return ResponseHandler.generateResponse(
								"Services Created successfully", true, HttpStatus.OK,
								ocMainCntntData);

					}

					catch (Exception e) {

						LOGGER.error(
								"Internal Server Error While Creating Landing Page Services : {}",
								e.getMessage());
						return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
								null);
					}
				}
			

		 //Get All Services Sub Content data
		@GetMapping("/getsubcntnt")
		public ResponseEntity<Object> findAllServicesSubcntnt(@RequestParam String ModelName)  {
			try {
				    
				    List<SubContentModel> servicesDatas = subContentRepository.findByActive(true, ModelName);
					return ResponseHandler.generateResponse("List of Services Information retrieved successfully", true, HttpStatus.OK, servicesDatas);
				

			} catch (Exception e) {
				LOGGER.error("Internal Server Error: {}" , e.getMessage());
				return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
						HttpStatus.OK, null);
			}

		}

		// Get Particular Services Sub Content
		@GetMapping("/getsubcntnt/{id}")
		public ResponseEntity<Object> getServicesMaincntnt(@PathVariable(value = "id") Long id) {
			try {

				return subContentRepository.findById(id).map(servicesDatas -> {

					return ResponseHandler.generateResponse("Services Information retrieved successfully", true,
							HttpStatus.OK, servicesDatas);

				}).orElseGet(() -> {
					LOGGER.error("Exceptions happen!: Services {} Doesn't exist", id);
					return ResponseHandler.generateResponse("Services" + id + " Doesn't exist", false, HttpStatus.OK,
							null);
				});
			} 
			
			catch (Exception e) {
				LOGGER.error("Internal Server Error while get Services : {}", e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}

		}

		// Delete particular Services Sub Content
		@DeleteMapping("/deletesubcntnt/{id}")
		public ResponseEntity<Object> deleteOCMaincntnt(@PathVariable Long id) {
			try {

				return subContentRepository.findById(id).map(servicesData -> {
				
					subContentRepository.deleteById(id);

					return ResponseHandler.generateResponse("Services Information Deleted Successfully", true, HttpStatus.OK,
							null);
				}).orElseGet(() -> {
					LOGGER.error("Exceptions happen!: Services {} Doesn't exists", id);
					return ResponseHandler.generateResponse("Services ID " + id + " Doesn't exists", false,
							HttpStatus.OK, null);
				});

			} 
			
			catch (Exception e) {
				LOGGER.error("Internal Server Error while remove Our Capabilities : {}", e.getMessage());
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
									env.getProperty("hostname.name") + "/api/landingpage/services/attachments/" + filename);
							currentFiles.setSupporting_file_view_url(
									env.getProperty("hostname.name") + "/api/landingpage/services/viewfile/" + filename);

							currentFiles.setMapped(false);
							currentFiles.setUpload_by("Admin");
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
					LOGGER.error("Internal Server Error while download JD document: " + e.getMessage());
					return ResponseEntity.notFound().build();
				}

			}

			@PostMapping("/singlefileupload")
			public ResponseEntity<Object> singleFileUpload(@RequestParam("file") MultipartFile file,
					Authentication authentication) {
				try {

					if (file != null) {

						FileUploadModel currentFile = new FileUploadModel();

						String filename = storageServicepath.save(file);
						currentFile.setSupporting_files_name(filename);
						currentFile.setSupporting_files_url(
								env.getProperty("hostname.name") + "/api/landingpage/services/attachments/" + filename);

						currentFile.setSupporting_file_view_url(
								env.getProperty("hostname.name") + "/api/landingpage/services/viewfile/" + filename);
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

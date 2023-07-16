package com.intelizign.dmgcc.controllers.landingpage;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

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
import com.intelizign.dmgcc.pojoclass.landingpage.SubContent;
import com.intelizign.dmgcc.repositories.FileUploadRepository;
import com.intelizign.dmgcc.repositories.landingpage.MainContentRepository;
import com.intelizign.dmgcc.repositories.landingpage.SubContentRepository;
import com.intelizign.dmgcc.repositories.landingpage.SubListRepository;
import com.intelizign.dmgcc.request.SupportingFiles;

import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.services.FilesStorageServicePath;

@RestController
@RequestMapping("/landingpage/qualitymanagement")
public class QualityManagementController {

	@Autowired
	private SubContentRepository subContentRepository;
	
	@Autowired
	private MainContentRepository mainContentRepository;
	
	@Autowired
	private SubListRepository subListRepository;
	
	
	public final Logger LOGGER = LogManager.getLogger(CustomerServicesController.class);
	
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

	
	 //Get All Quality Management Main Content data
	@GetMapping("/getmaincntent")
	public ResponseEntity<Object> findAllMainContentQM(@RequestParam String ModelName)  {
		try {
			    
			    MainContentModel qmMainData = mainContentRepository.findByActiveservice(true, ModelName);
				return ResponseHandler.generateResponse("Quality Management Information retrieved successfully", true, HttpStatus.OK, qmMainData);
			

		} catch (Exception e) {
			LOGGER.error("Internal Server Error: {}" , e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}
	
	
	 //Create Landing or Updating Quality Management Main Content
		@PostMapping("/maincntnt")
		public ResponseEntity<Object> createQMMainCnt(@Valid @RequestBody MainContentModel qmMainData
				) {
			try {
	                 
				    qmMainData.setModel_name("Quality Management");
				
				    mainContentRepository.save (qmMainData);
					
					return ResponseHandler.generateResponse("Landing Page Quality Management Main Content Created successfully", true, HttpStatus.OK,
							qmMainData);
				
			}

			catch (Exception e) {

				LOGGER.error("Internal Server Error While Creating Landing Page Quality Management : {}", e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}
		}

	

	// Get Particular Quality Management Main Content
	@GetMapping("/getmaincntent/{id}")
	public ResponseEntity<Object> getQMbyid(@PathVariable(value = "id") Long id) {
		try {

			return mainContentRepository.findById(id).map(qmMainData -> {

				return ResponseHandler.generateResponse("Quality Management Main ContentInformation retrieved successfully", true,
						HttpStatus.OK, qmMainData);

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Quality Management Main Content {} Doesn't exist", id);
				return ResponseHandler.generateResponse("Quality Management " + id + " Doesn't exist", false, HttpStatus.OK,
						null);
			});
		} 
		
		catch (Exception e) {
			LOGGER.error("Internal Server Error while get Quality Management : {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	
		
	
	// Delete particular Quality Management Main Content
	@DeleteMapping("/maincntnt/{id}")
	public ResponseEntity<Object> deleteQMMainCnt(@PathVariable Long id) {
		try {

			return mainContentRepository.findById(id).map(qmMainData -> {
			
				mainContentRepository.deleteById(id);

				return ResponseHandler.generateResponse("Quality Management Information Main Content Removed Successfully", true, HttpStatus.OK,
						null);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Quality Management Main Content ID {} Doesn't exists", id);
				return ResponseHandler.generateResponse("Quality Management Main Content ID " + id + " Doesn't exists", false,
						HttpStatus.OK, null);
			});

		} 
		
		catch (Exception e) {
			LOGGER.error("Internal Server Error while remove Quality Management Main Content: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}



	 //Create Quality Management Sub Content
		@PostMapping("/subcntnt")
		public ResponseEntity<Object> createQMSubCnt(@Valid @RequestBody SubContentModel qmSubDatas
				) {
			try {
	                 
				     qmSubDatas.setModel_name("Quality Management");
				
				    SubContentModel qmSubData = subContentRepository.save (qmSubDatas);
					
					return ResponseHandler.generateResponse("Landing Page Quality Management Sub Content Created successfully", true, HttpStatus.OK,
							qmSubData);
				
			}

			catch (Exception e) {

				LOGGER.error("Internal Server Error While Creating Landing Page Quality Management Sub Content: {}", e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}
		}
    
		// Update Quality Management Sub Content
				@PostMapping("/updatesubcntnt")
				public ResponseEntity<Object> updateQMSubcntnt(@Valid @RequestBody List<SubContentModel> qmSubDatas) {
					try {

						List<SubContentModel> subContentDatas = new ArrayList<>();

						for (SubContentModel subContentReqData : qmSubDatas) {

							Optional<SubContentModel> subContentData = subContentRepository.findById(subContentReqData.getId());

							if (subContentData.isPresent()) {

								subContentData.get().setTitle(subContentReqData.getTitle());

								if (subContentReqData.getSub_list() != null) {

									subContentData.get().setSub_list(subContentReqData.getSub_list());

								}

								subContentDatas.add(subContentData.get());

							}

							else {
								return ResponseHandler.generateResponse(
										"Quality Management Sub Content not found , Please contact G3C Admin", false,
										HttpStatus.OK, null);
							}
						}

						List<SubContentModel> qmSubCntntData = subContentRepository.saveAll(subContentDatas);

						return ResponseHandler.generateResponse(
								"Landing Page Quality Management Sub Content Created successfully", true, HttpStatus.OK,
								qmSubCntntData);

					}

					catch (Exception e) {

						LOGGER.error(
								"Internal Server Error While Creating Landing Page Quality Management Sub Content: {}",
								e.getMessage());
						return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
								null);
					}
				}

				
		 //Get All Quality Management Sub Content data
		@GetMapping("/getsubcntnt")
		public ResponseEntity<Object> findAllSubContentQM(@RequestParam String ModelName)  {
			try {
				    
				    List<SubContentModel> qmSubCntntDatas = subContentRepository.findByActive(true, ModelName);
					return ResponseHandler.generateResponse("List of Sub Content Quality Management Information retrieved successfully", true, HttpStatus.OK, qmSubCntntDatas);
				

			} catch (Exception e) {
				LOGGER.error("Internal Server Error: {}" , e.getMessage());
				return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
						HttpStatus.OK, null);
			}

		}

		// Get Particular Quality Management Sub Content
		@GetMapping("/getsubcontent/{id}")
		public ResponseEntity<Object> getQMSubContnt(@PathVariable(value = "id") Long id) {
			try {

				return subContentRepository.findById(id).map(qmSubCntntData -> {

					return ResponseHandler.generateResponse("Quality Management Sub Content Information retrieved successfully", true,
							HttpStatus.OK, qmSubCntntData);

				}).orElseGet(() -> {
					LOGGER.error("Exceptions happen!: Quality Management Sub Content {} Doesn't exist", id);
					return ResponseHandler.generateResponse("Quality Management Sub Content" + id + " Doesn't exist", false, HttpStatus.OK,
							null);
				});
			} 
			
			catch (Exception e) {
				LOGGER.error("Internal Server Error while get Quality Management : {}", e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}

		}

		// Delete particular Quality Management Sub Content
		@DeleteMapping("/deletesubcntnt/{id}")
		public ResponseEntity<Object> deleteQMSubCnt(@PathVariable Long id) {
			try {

				return subContentRepository.findById(id).map(qmSubCntntData -> {
				
					subContentRepository.deleteById(id);

					return ResponseHandler.generateResponse("Quality Management Sub Content Removed Successfully", true, HttpStatus.OK,
							null);
				}).orElseGet(() -> {
					LOGGER.error("Exceptions happen!: Quality Management Sub Content ID {} Doesn't exists", id);
					return ResponseHandler.generateResponse("Quality Management Sub Content ID " + id + " Doesn't exists", false,
							HttpStatus.OK, null);
				});

			} 
			
			catch (Exception e) {
				LOGGER.error("Internal Server Error while remove Quality Management Sub Content: {}", e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}
		}
		
		
		// Delete particular Quality Management Sub List
		@DeleteMapping("/deletesublist/{id}")
		public ResponseEntity<Object> deleteQMSubList(@PathVariable Long id) {
			try {

				return subListRepository.findById(id).map(qmlistData -> {
				
					subListRepository.deleteById(id);

					return ResponseHandler.generateResponse("Quality Management Information Sub List Removed Successfully", true, HttpStatus.OK,
							null);
				}).orElseGet(() -> {
					LOGGER.error("Exceptions happen!: Quality Management Sub List ID {} Doesn't exists", id);
					return ResponseHandler.generateResponse("Quality Management Sub List ID " + id + " Doesn't exists", false,
							HttpStatus.OK, null);
				});

			} 
			
			catch (Exception e) {
				LOGGER.error("Internal Server Error while remove Quality Management Sub List: {}", e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}
		}

}

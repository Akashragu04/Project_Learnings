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
import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.services.FilesStorageServicePath;

@RestController
@RequestMapping("/landingpage/me")
public class ManufacturingEnggController {

	@Autowired
	private SubContentRepository subContentRepository;
	
	@Autowired
	private MainContentRepository mainContentRepository;
	
	@Autowired
	private SubListRepository subListRepository;
	
	
	public final Logger LOGGER = LogManager.getLogger(ManufacturingEnggController.class);
	
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

	
	 //Get All Manufacturing Engineering Main Content data
	@GetMapping("/getmaincntent")
	public ResponseEntity<Object> findAllMainContentME(@RequestParam String ModelName)  {
		try {
			    
			    MainContentModel meMainDatas = mainContentRepository.findByActiveservice(true, ModelName);
				return ResponseHandler.generateResponse("List of Main Content Manufacturing Engineering Information retrieved successfully", true, HttpStatus.OK, meMainDatas);
			

		} catch (Exception e) {
			LOGGER.error("Internal Server Error: {}" , e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}
	
	
	 //Create or Update Manufacturing Engineering Main Content
		@PostMapping("/maincntnt")
		public ResponseEntity<Object> createMEMainCnt(@Valid @RequestBody MainContentModel meMainDatasReq
				) {
			try {
	                 
				    meMainDatasReq.setModel_name("Manufacturing Engineering");
				
				    mainContentRepository.save (meMainDatasReq);
					
					return ResponseHandler.generateResponse("Landing Page Manufacturing Engineering Main Content Created successfully", true, HttpStatus.OK,
							meMainDatasReq);
				
			}

			catch (Exception e) {

				LOGGER.error("Internal Server Error While Creating Landing Page Manufacturing Engineering: {}", e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}
		}

	

	// Get Particular Manufacturing Engineering Main Content
	@GetMapping("/getmaincntent/{id}")
	public ResponseEntity<Object> getMEbyid(@PathVariable(value = "id") Long id) {
		try {

			return mainContentRepository.findById(id).map(meMainDatas -> {

				return ResponseHandler.generateResponse("Manufacturing Engineering Main ContentInformation retrieved successfully", true,
						HttpStatus.OK, meMainDatas);

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Manufacturing Engineering Main Content {} Doesn't exist", id);
				return ResponseHandler.generateResponse("Manufacturing Engineering " + id + " Doesn't exist", false, HttpStatus.OK,
						null);
			});
		} 
		
		catch (Exception e) {
			LOGGER.error("Internal Server Error while get Manufacturing Engineering : {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	
		
	
	// Delete particular Manufacturing Engineering Main Content
	@DeleteMapping("/maincntnt/{id}")
	public ResponseEntity<Object> deleteMEMainCnt(@PathVariable Long id) {
		try {

			return mainContentRepository.findById(id).map(meMainDatas -> {
			
				mainContentRepository.deleteById(id);

				return ResponseHandler.generateResponse("Manufacturing Engineering Information Main Content Removed Successfully", true, HttpStatus.OK,
						null);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Manufacturing Engineering Main Content ID {} Doesn't exists", id);
				return ResponseHandler.generateResponse("Manufacturing Engineering Main Content ID " + id + " Doesn't exists", false,
						HttpStatus.OK, null);
			});

		} 
		
		catch (Exception e) {
			LOGGER.error("Internal Server Error while remove Manufacturing Engineering Main Content: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}



	 //Create Landing Manufacturing Engineering Sub Content
		@PostMapping("/subcntnt")
		public ResponseEntity<Object> createMESubCnt(@Valid @RequestBody SubContentModel mesubDatasReq
				) {
			try {
	                 
				    mesubDatasReq.setModel_name("Manufacturing Engineering");
				
				    SubContentModel meSubData = subContentRepository.save (mesubDatasReq);
					
					return ResponseHandler.generateResponse("Landing Page Manufacturing Engineering Sub Content Created successfully", true, HttpStatus.OK,
							meSubData);
				
			}

			catch (Exception e) {

				LOGGER.error("Internal Server Error While Creating Landing Page Manufacturing Engineering Sub Content: {}", e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}
		}
    
		// Create Manufacturing Engineering Sub Content
		@PostMapping("/updatesubcntnt")
		public ResponseEntity<Object> updateMESubcntnt(@Valid @RequestBody List<SubContentModel> meSubCntntDatas) {
			try {

				List<SubContentModel> subContentDatas = new ArrayList<>();

				for (SubContentModel subContentReqData : meSubCntntDatas) {

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
								"Manufacturing Engineering Sub Content not found , Please contact G3C Admin", false,
								HttpStatus.OK, null);
					}
				}

				List<SubContentModel> meMainCntntData = subContentRepository.saveAll(subContentDatas);

				return ResponseHandler.generateResponse(
						"Landing Page Manufacturing Engineering Sub Content Created successfully", true, HttpStatus.OK,
						meMainCntntData);

			}

			catch (Exception e) {

				LOGGER.error(
						"Internal Server Error While Creating Landing Page Manufacturing Engineering Sub Content: {}",
						e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}
		}
	

		 //Get All Manufacturing Engineering Sub Content data
		@GetMapping("/getsubcntnt")
		public ResponseEntity<Object> findAllSubContentME(@RequestParam String ModelName)  {
			try {
				    
				    List<SubContentModel> leadProcessSubData = subContentRepository.findByActive(true, ModelName);
					return ResponseHandler.generateResponse("List of Sub Content  Manufacturing Engineering Information retrieved successfully", true, HttpStatus.OK, leadProcessSubData);
				

			} catch (Exception e) {
				LOGGER.error("Internal Server Error: {}" , e.getMessage());
				return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
						HttpStatus.OK, null);
			}

		}

		// Get Particular Manufacturing Engineering  Sub Content
		@GetMapping("/getsubcontent/{id}")
		public ResponseEntity<Object> getMESubContnt(@PathVariable(value = "id") Long id) {
			try {

				return subContentRepository.findById(id).map(meSubData -> {

					return ResponseHandler.generateResponse("Manufacturing Engineering Sub Content Information retrieved successfully", true,
							HttpStatus.OK, meSubData);

				}).orElseGet(() -> {
					LOGGER.error("Exceptions happen!: Manufacturing Engineering Sub Content {} Doesn't exist", id);
					return ResponseHandler.generateResponse("Manufacturing Engineering Sub Content" + id + " Doesn't exist", false, HttpStatus.OK,
							null);
				});
			} 
			
			catch (Exception e) {
				LOGGER.error("Internal Server Error while get Manufacturing Engineering : {}", e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}

		}

		// Delete particular Manufacturing Engineering Sub Content
		@DeleteMapping("/deletesubcntnt/{id}")
		public ResponseEntity<Object> deleteMESubCnt(@PathVariable Long id) {
			try {

				return subContentRepository.findById(id).map(meSubData -> {
				
					subContentRepository.deleteById(id);

					return ResponseHandler.generateResponse("Manufacturing Engineering Information Sub Content Removed Successfully", true, HttpStatus.OK,
							null);
				}).orElseGet(() -> {
					LOGGER.error("Exceptions happen!: Manufacturing Engineering Sub Content ID {} Doesn't exists", id);
					return ResponseHandler.generateResponse("Manufacturing Engineering Sub Content ID " + id + " Doesn't exists", false,
							HttpStatus.OK, null);
				});

			} 
			
			catch (Exception e) {
				LOGGER.error("Internal Server Error while remove Manufacturing Engineering Sub Content: {}", e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}
		}
		
		
		// Delete particular Manufacturing Engineering Sub List
		@DeleteMapping("/deletesublist/{id}")
		public ResponseEntity<Object> deleteMESubList(@PathVariable Long id) {
			try {

				return subListRepository.findById(id).map(meSubData -> {
				
					subListRepository.deleteById(id);

					return ResponseHandler.generateResponse("Manufacturing Engineering Information Sub List Removed Successfully", true, HttpStatus.OK,
							null);
				}).orElseGet(() -> {
					LOGGER.error("Exceptions happen!: Manufacturing Engineering Sub List ID {} Doesn't exists", id);
					return ResponseHandler.generateResponse("Manufacturing Engineering Sub List ID " + id + " Doesn't exists", false,
							HttpStatus.OK, null);
				});

			} 
			
			catch (Exception e) {
				LOGGER.error("Internal Server Error while remove Manufacturing Engineering Sub List: {}", e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}
		}

}

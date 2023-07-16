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
import com.intelizign.dmgcc.pojoclass.landingpage.SubContent;
import com.intelizign.dmgcc.repositories.FileUploadRepository;
import com.intelizign.dmgcc.repositories.landingpage.MainContentRepository;
import com.intelizign.dmgcc.repositories.landingpage.SubContentRepository;
import com.intelizign.dmgcc.repositories.landingpage.SubListRepository;
import com.intelizign.dmgcc.request.SupportingFiles;

import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.services.FilesStorageServicePath;

@RestController
@RequestMapping("/landingpage/lpconsultant")
public class LeadProcessController {

	@Autowired
	private SubContentRepository subContentRepository;
	
	@Autowired
	private MainContentRepository mainContentRepository;
	
	@Autowired
	private SubListRepository subListRepository;
	
	
	public final Logger LOGGER = LogManager.getLogger(LeadProcessController.class);
	
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

	
	 //Get All Lead Process Consultant Main Content data
	@GetMapping("/getmaincntent")
	public ResponseEntity<Object> findAllMainContentLP(@RequestParam String ModelName)  {
		try {
			    
			    MainContentModel leadProcessMainDatas = mainContentRepository.findByActiveservice(true, ModelName);
				return ResponseHandler.generateResponse("List of Main Content Lead Process Consultant Information retrieved successfully", true, HttpStatus.OK, leadProcessMainDatas);
			

		} catch (Exception e) {
			LOGGER.error("Internal Server Error: {}" , e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}
	
	
	 //Create or Update Landing Lead Process Consultant Main Content
		@PostMapping("/maincntnt")
		public ResponseEntity<Object> createLpMainCnt(@Valid @RequestBody MainContentModel leadProcessreq
				) {
			try {
	                 
				    leadProcessreq.setModel_name("Lead Process Consultant");
				
				    mainContentRepository.save (leadProcessreq);
					
					return ResponseHandler.generateResponse("Landing Page Lead Process Consultant Main Content Created successfully", true, HttpStatus.OK,
							leadProcessreq);
				
			}

			catch (Exception e) {

				LOGGER.error("Internal Server Error While Creating Landing Page Lead Process Consultant: {}", e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}
		}

	

	// Get Particular Lead Process Consultant Main Content
	@GetMapping("/getmaincntent/{id}")
	public ResponseEntity<Object> getLPbyid(@PathVariable(value = "id") Long id) {
		try {

			return mainContentRepository.findById(id).map(leadProcessMainData -> {

				return ResponseHandler.generateResponse("Lead Process Consultant Main ContentInformation retrieved successfully", true,
						HttpStatus.OK, leadProcessMainData);

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Lead Process Consultant Main Content {} Doesn't exist", id);
				return ResponseHandler.generateResponse("Lead Process Consultant " + id + " Doesn't exist", false, HttpStatus.OK,
						null);
			});
		} 
		
		catch (Exception e) {
			LOGGER.error("Internal Server Error while get Lead Process Consultant: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	
		
	
	// Delete particular Lead Process Consultant Main Content
	@DeleteMapping("/maincntnt/{id}")
	public ResponseEntity<Object> deleteLpMainCnt(@PathVariable Long id) {
		try {

			return mainContentRepository.findById(id).map(leadProcessMainData -> {
			
				mainContentRepository.deleteById(id);

				return ResponseHandler.generateResponse("Lead Process Consultant Information Main Content Removed Successfully", true, HttpStatus.OK,
						null);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Lead Process Consultant Main Content ID {} Doesn't exists", id);
				return ResponseHandler.generateResponse("Lead Process Consultant Main Content ID " + id + " Doesn't exists", false,
						HttpStatus.OK, null);
			});

		} 
		
		catch (Exception e) {
			LOGGER.error("Internal Server Error while remove Lead Process Consultant Main Content: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}



	 //Create Landing Lead Process Consultant Sub Content
		@PostMapping("/subcntnt")
		public ResponseEntity<Object> createLpSubCnt(@Valid @RequestBody SubContentModel leadProcessSubreq
				) {
			try {
	                 
				    leadProcessSubreq.setModel_name("Lead Process Consultant");
				
				    SubContentModel leadProcessSubData = subContentRepository.save (leadProcessSubreq);
					
					return ResponseHandler.generateResponse("Landing Page Lead Process Consultant Sub Content Created successfully", true, HttpStatus.OK,
							leadProcessSubData);
				
			}

			catch (Exception e) {

				LOGGER.error("Internal Server Error While Creating Landing Page Lead Process Consultant Sub Content: {}", e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}
		}
    
		// Update Lead Process Consultant Sub Content
		@PostMapping("/updatesubcntnt")
		public ResponseEntity<Object> updateLpSubcntnt(@Valid @RequestBody List<SubContentModel> lpSubCntntDatas) {
			try {

				List<SubContentModel> subContentDatas = new ArrayList<>();

				for (SubContentModel subContentReqData : lpSubCntntDatas) {

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
								"Lead Process Consultant Sub Content not found , Please contact G3C Admin", false,
								HttpStatus.OK, null);
					}
				}

				List<SubContentModel> lpMainCntntData = subContentRepository.saveAll(subContentDatas);

				return ResponseHandler.generateResponse(
						"Landing Page Lead Process Consultant Sub Content Created successfully", true, HttpStatus.OK,
						lpMainCntntData);

			}

			catch (Exception e) {

				LOGGER.error(
						"Internal Server Error While Creating Landing Page Lead Process Consultant Sub Content: {}",
						e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}
		}
	

		 //Get All Lead Process Consultant Sub Content data
		@GetMapping("/getsubcntnt")
		public ResponseEntity<Object> findAllSubContentLp(@RequestParam String ModelName)  {
			try {
				    
				    List<SubContentModel> leadProcessSubData = subContentRepository.findByActive(true, ModelName);
					return ResponseHandler.generateResponse("List of Sub Content Customer Services Information retrieved successfully", true, HttpStatus.OK, leadProcessSubData);
				

			} catch (Exception e) {
				LOGGER.error("Internal Server Error: {}" , e.getMessage());
				return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
						HttpStatus.OK, null);
			}

		}

		// Get Particular Lead Process Consultant Sub Content
		@GetMapping("/getsubcontent/{id}")
		public ResponseEntity<Object> getLpSubContnt(@PathVariable(value = "id") Long id) {
			try {

				return subContentRepository.findById(id).map(leadProcessSubData -> {

					return ResponseHandler.generateResponse("Lead Process Consultant Sub Content Information retrieved successfully", true,
							HttpStatus.OK, leadProcessSubData);

				}).orElseGet(() -> {
					LOGGER.error("Exceptions happen!: Lead Process Consultant Sub Content {} Doesn't exist", id);
					return ResponseHandler.generateResponse("Lead Process Consultant Sub Content" + id + " Doesn't exist", false, HttpStatus.OK,
							null);
				});
			} 
			
			catch (Exception e) {
				LOGGER.error("Internal Server Error while get Lead Process Consultant : {}", e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}

		}

		// Delete particular Lead Process Consultant Sub Content
		@DeleteMapping("/deletesubcntnt/{id}")
		public ResponseEntity<Object> deleteLpSubCnt(@PathVariable Long id) {
			try {

				return subContentRepository.findById(id).map(leadProcessSubData -> {
				
					subContentRepository.deleteById(id);

					return ResponseHandler.generateResponse("Lead Process Consultant Information Sub Content Removed Successfully", true, HttpStatus.OK,
							null);
				}).orElseGet(() -> {
					LOGGER.error("Exceptions happen!:Lead Process Consultant Sub Content ID {} Doesn't exists", id);
					return ResponseHandler.generateResponse("Lead Process Consultant Sub Content ID " + id + " Doesn't exists", false,
							HttpStatus.OK, null);
				});

			} 
			
			catch (Exception e) {
				LOGGER.error("Internal Server Error while remove Lead Process Consultant Sub Content: {}", e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}
		}
		
		
		// Delete particular Lead Process Consultant Sub List
		@DeleteMapping("/deletesublist/{id}")
		public ResponseEntity<Object> deleteLpSubList(@PathVariable Long id) {
			try {

				return subListRepository.findById(id).map(lpSubData -> {
				
					subListRepository.deleteById(id);

					return ResponseHandler.generateResponse("Lead Process Consultant Information Sub List Removed Successfully", true, HttpStatus.OK,
							null);
				}).orElseGet(() -> {
					LOGGER.error("Exceptions happen!: Lead Process Consultant Sub List ID {} Doesn't exists", id);
					return ResponseHandler.generateResponse("Lead Process Consultant Sub List ID " + id + " Doesn't exists", false,
							HttpStatus.OK, null);
				});

			} 
			
			catch (Exception e) {
				LOGGER.error("Internal Server Error while remove Lead Process Consultant Sub List: {}", e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}
		}
		

}

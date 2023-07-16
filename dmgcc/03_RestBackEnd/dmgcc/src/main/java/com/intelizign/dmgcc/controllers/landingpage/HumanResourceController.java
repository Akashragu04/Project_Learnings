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
import com.intelizign.dmgcc.models.landingpage.AboutHRModel;
import com.intelizign.dmgcc.models.landingpage.SubContentModel;
import com.intelizign.dmgcc.models.landingpage.SubListModel;
import com.intelizign.dmgcc.repositories.FileUploadRepository;
import com.intelizign.dmgcc.repositories.landingpage.AboutHRRepository;
import com.intelizign.dmgcc.repositories.landingpage.MainContentRepository;
import com.intelizign.dmgcc.repositories.landingpage.SubContentRepository;
import com.intelizign.dmgcc.repositories.landingpage.SubListRepository;
import com.intelizign.dmgcc.request.SupportingFiles;
import com.intelizign.dmgcc.request.landingpage.AboutHrRequest;
import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.services.FilesStorageServicePath;

@RestController
@RequestMapping("/landingpage/humanresource")
public class HumanResourceController {

	@Autowired
	private SubContentRepository mainContentRepository;
	
	@Autowired
	private SubListRepository subContentRepository;
	
	
	public final Logger LOGGER = LogManager.getLogger(HumanResourceController.class);
	
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

	 //Create Or Updating Human Resource Main Content
	@PostMapping("/maincntnt")
	public ResponseEntity<Object> createHRMaincntnt(@Valid @RequestBody SubContentModel hrMainCntnt
			) {
		try {

			hrMainCntnt.setModel_name("Human Resource");
			hrMainCntnt.setIsSubcontent(false);
			
			SubContentModel hrMainCntntData = mainContentRepository.save(hrMainCntnt);

			return ResponseHandler.generateResponse(
					"Landing Page Human Resource Main Content Created successfully", true, HttpStatus.OK,
					hrMainCntntData);
			
		}

		catch (Exception e) {

			LOGGER.error("Internal Server Error While Creating Landing Page Human Resource Main Content: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	 //Get All Human Resource Main Content data
	@GetMapping("/getmaincntnt")
	public ResponseEntity<Object> findAllHRMaincntnt(@RequestParam String ModelName)  {
		try {
			    
			    SubContentModel hrMainCntntData = mainContentRepository.findByactivemain(true, ModelName,false);
				return ResponseHandler.generateResponse("List of Human Resource Main Content Information retrieved successfully", true, HttpStatus.OK, hrMainCntntData);
			

		} catch (Exception e) {
			LOGGER.error("Internal Server Error: {}" , e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	// Get Particular Human Resource Main Content
	@GetMapping("/getmaincntnt/{id}")
	public ResponseEntity<Object> getHRMaincntnt(@PathVariable(value = "id") Long id) {
		try {

			return mainContentRepository.findById(id).map(hrMainCntntData -> {

				return ResponseHandler.generateResponse("Human Resource Main Content Information retrieved successfully", true,
						HttpStatus.OK, hrMainCntntData);

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Human Resource Main Content {} Doesn't exist", id);
				return ResponseHandler.generateResponse("Human Resource Main Content" + id + " Doesn't exist", false, HttpStatus.OK,
						null);
			});
		} 
		
		catch (Exception e) {
			LOGGER.error("Internal Server Error while get Customer Services : {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	// Delete particular Human Resource Main Content
	@DeleteMapping("/deletemaincntnt/{id}")
	public ResponseEntity<Object> deleteHRMaincntnt(@PathVariable Long id) {
		try {

			return mainContentRepository.findById(id).map(hrMainCntntData -> {
			
				mainContentRepository.deleteById(id);

				return ResponseHandler.generateResponse("Human Resource Main Content Information Deleted Successfully", true, HttpStatus.OK,
						null);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Finance Controlling Sub Content ID {} Doesn't exists", id);
				return ResponseHandler.generateResponse("Finance Controlling Sub Content ID " + id + " Doesn't exists", false,
						HttpStatus.OK, null);
			});

		} 
		
		catch (Exception e) {
			LOGGER.error("Internal Server Error while remove Finance Controlling Sub Content: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}
	
	 //Create Human Resource Sub Content
		@PostMapping("/subcntnt")
		public ResponseEntity<Object> createHRSubcntnt(@Valid @RequestBody SubContentModel hrSubCntnt
				) {
			try {

				hrSubCntnt.setModel_name("Human Resource");
				hrSubCntnt.setIsSubcontent(true);
							
				SubContentModel hrMainCntntData = mainContentRepository.save(hrSubCntnt);
				
				return ResponseHandler.generateResponse(
						"Landing Page Human Resource Main Content Created successfully", true, HttpStatus.OK,
						hrMainCntntData);
				
			}

			catch (Exception e) {

				LOGGER.error("Internal Server Error While Creating Landing Page Human Resource Main Content: {}", e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}
		}
	
		 //Create Human Resource Sub Content
		@PostMapping("/updatesubcntnt")
		public ResponseEntity<Object> updateHRSubcntnt(@Valid @RequestBody List<SubContentModel> hrSubCntntDatas
				) {
			try {
                
				List<SubContentModel> subContentDatas = new ArrayList<>();
				
				for(SubContentModel subContentReqData:hrSubCntntDatas) {
					
					Optional<SubContentModel> subContentData=mainContentRepository.findById(subContentReqData.getId());
					
				    if(subContentData.isPresent()) {
						
					subContentData.get().setModel_name("Human Resource");
					
					if(subContentReqData.getSub_list()!=null) {
						
						subContentData.get().setSub_list(subContentReqData.getSub_list());
						
					}			
					
					subContentDatas.add(subContentData.get());
					
				  }
					
				    else {
				    	return ResponseHandler.generateResponse("Human Resource Sub Content not found , Please contact G3C Admin", false, HttpStatus.OK,
								null);
					}
				}
				
				
				List<SubContentModel> hrMainCntntData = mainContentRepository.saveAll(subContentDatas);
				
				return ResponseHandler.generateResponse(
						"Landing Page Human Resource Sub Content Created successfully", true, HttpStatus.OK,
						hrMainCntntData);
				
			}

			catch (Exception e) {

				LOGGER.error("Internal Server Error While Creating Landing Page Human Resource  Sub Content: {}", e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}
		}
	
		
		
		
		//Get All Human Resource Sub Content data
		@GetMapping("/getsubcntnt")
		public ResponseEntity<Object> findAllsubcntnt(@RequestParam String ModelName)  {
			try {
				    
				    List<SubContentModel> hrMainCntntData = mainContentRepository.findByactive(true, ModelName, true);
					return ResponseHandler.generateResponse("List of Human Resource Sub Content Information retrieved successfully", true, HttpStatus.OK, hrMainCntntData);
				

			} catch (Exception e) {
				LOGGER.error("Internal Server Error: {}" , e.getMessage());
				return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
						HttpStatus.OK, null);
			}

		}
	
	
	// Delete particular Human Resource Sub Content
	@DeleteMapping("/deletesubcntnt/{id}")
	public ResponseEntity<Object> deleteHRSubcntnt(@PathVariable Long id) {
		try {

			return subContentRepository.findById(id).map(hrSubCntntData -> {
			
				subContentRepository.deleteById(id);

				return ResponseHandler.generateResponse("Human Resource Sub Content Information Removed Successfully", true, HttpStatus.OK,
						null);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Human Resource Sub Content ID {} Doesn't exists", id);
				return ResponseHandler.generateResponse("Human Resource Sub Content ID " + id + " Doesn't exists", false,
						HttpStatus.OK, null);
			});

		} 
		
		catch (Exception e) {
			LOGGER.error("Internal Server Error while remove Human Resource Sub Content ID: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	
	
}

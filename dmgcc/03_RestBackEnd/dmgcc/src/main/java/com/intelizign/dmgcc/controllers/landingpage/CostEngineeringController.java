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


import com.intelizign.dmgcc.models.landingpage.MainContentModel;
import com.intelizign.dmgcc.models.landingpage.SubContentModel;
import com.intelizign.dmgcc.repositories.landingpage.MainContentRepository;
import com.intelizign.dmgcc.repositories.landingpage.SubContentRepository;
import com.intelizign.dmgcc.repositories.landingpage.SubListRepository;
import com.intelizign.dmgcc.request.landingpage.CostProductionRequest;
import com.intelizign.dmgcc.response.ResponseHandler;


@RestController
@RequestMapping("/landingpage/costengineering")
public class CostEngineeringController {

	@Autowired
	private SubContentRepository subContentRepository;
	
	@Autowired
	private MainContentRepository mainContentRepository;
	
	@Autowired
	private SubListRepository subListRepository;
	
	
	public final Logger LOGGER = LogManager.getLogger(CostEngineeringController.class);
	
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

	
	 //Get All Cost Engineering Main Content data
	@GetMapping("/getmaincntent")
	public ResponseEntity<Object> findAllMainContentCost(@RequestParam String ModelName)  {
		try {
			    
			    MainContentModel costServiceMainDatas = mainContentRepository.findByActiveservice(true, ModelName);
				return ResponseHandler.generateResponse("List of Cost Engineering Information retrieved successfully", true, HttpStatus.OK, costServiceMainDatas);
			

		} catch (Exception e) {
			LOGGER.error("Internal Server Error: {}" , e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}
	
	
	
	
	 //Create Landing or Update Cost Engineering Main Content
		@PostMapping("/maincntnt")
		public ResponseEntity<Object> createCostEnggMainCnt(@Valid @RequestBody MainContentModel costEnggreq
				) {
			try {
	                 
				    costEnggreq.setModel_name("Cost Engineering");
				
				    mainContentRepository.save (costEnggreq);
					
					return ResponseHandler.generateResponse("Landing Page Cost Engineering Main Content Created successfully", true, HttpStatus.OK,
							costEnggreq);
				
			}

			catch (Exception e) {

				LOGGER.error("Internal Server Error While Creating Landing Page Cost Engineering: {}", e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}
		}

	

	// Get Particular Cost Engineering Main Content
	@GetMapping("/getmaincntent/{id}")
	public ResponseEntity<Object> getCostEnggbyid(@PathVariable(value = "id") Long id) {
		try {

			return mainContentRepository.findById(id).map(cstEnggData -> {

				return ResponseHandler.generateResponse("Cost Engineering Main ContentInformation retrieved successfully", true,
						HttpStatus.OK, cstEnggData);

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Cost Engineerings Main Content {} Doesn't exist", id);
				return ResponseHandler.generateResponse("Cost Engineering " + id + " Doesn't exist", false, HttpStatus.OK,
						null);
			});
		} 
		
		catch (Exception e) {
			LOGGER.error("Internal Server Error while get Cost Engineering : {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	
		
	
	// Delete particular Cost Engineering Main Content
	@DeleteMapping("/maincntnt/{id}")
	public ResponseEntity<Object> deleteCstEnggMainCnt(@PathVariable Long id) {
		try {

			return mainContentRepository.findById(id).map(cstEnggMainData -> {
			
				mainContentRepository.deleteById(id);

				return ResponseHandler.generateResponse("Cost Engineering Information Main Content Removed Successfully", true, HttpStatus.OK,
						null);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Cost Engineering Main Content ID {} Doesn't exists", id);
				return ResponseHandler.generateResponse("Cost Engineering Main Content ID " + id + " Doesn't exists", false,
						HttpStatus.OK, null);
			});

		} 
		
		catch (Exception e) {
			LOGGER.error("Internal Server Error while remove Cost Engineering Main Content: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}


	 //Create Or Updating Landing Cost Engineering Sub Content
	@PostMapping("/subcntnt")
	public ResponseEntity<Object> updateCstEnggSubCnt(@Valid @RequestBody CostProductionRequest cstEnggSubreq
			) {
		try {
                SubContentModel subContentData = new SubContentModel();
                
                subContentData.setTitle(cstEnggSubreq.getTitle());
                subContentData.setSub_list(cstEnggSubreq.getSub_list());
                
                subContentData.setModel_name("Cost Engineering");
			
			     subContentRepository.save (subContentData);
				
				return ResponseHandler.generateResponse("Landing Page Cost Engineering Sub Content Created successfully", true, HttpStatus.OK,
						subContentData);
			
		}

		catch (Exception e) {

			LOGGER.error("Internal Server Error While Creating Landing Page Cost Engineering Sub Content: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}


	 //Updating Landing Cost Engineering Sub Content
		@PostMapping("/updatesubcnt")
		public ResponseEntity<Object> createCstEnggSubCnt(@Valid @RequestBody List<CostProductionRequest> cstEnggSubreq
				) {
			try {
				List<SubContentModel> cstDatas = new ArrayList<>();

					for(CostProductionRequest cstData: cstEnggSubreq) {
						
						 Optional<SubContentModel> cstDta = subContentRepository.findById(cstData.getId());
						
						 cstDta.get().setTitle(cstData.getTitle());
						 cstDta.get().setSub_list(cstData.getSub_list());
						 cstDatas.add(cstDta.get());
						 
					}
					
					List<SubContentModel> cstenggDatas=subContentRepository.saveAll(cstDatas);
					
					return ResponseHandler.generateResponse("Cost Engineering  Sub Content Information retrieved successfully", true,
							HttpStatus.OK, cstenggDatas);

			}

			catch (Exception e) {

				LOGGER.error("Internal Server Error While Creating Landing Page Cost Engineering Sub Content: {}", e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}
		}
    
		 //Get All Cost Engineering Sub Content data
		@GetMapping("/getsubcntnt")
		public ResponseEntity<Object> findAllSubContentCost(@RequestParam String ModelName)  {
			try {
				    
				    List<SubContentModel> cstSubCntData = subContentRepository.findByActive(true, ModelName);
					return ResponseHandler.generateResponse("List of Sub Content Cost Engineering  Information retrieved successfully", true, HttpStatus.OK, cstSubCntData);
				

			} catch (Exception e) {
				LOGGER.error("Internal Server Error: {}" , e.getMessage());
				return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
						HttpStatus.OK, null);
			}

		}

		// Get Particular Cost Engineering Sub Content
		@GetMapping("/getsubcontent/{id}")
		public ResponseEntity<Object> getCostenggSubContnt(@PathVariable(value = "id") Long id) {
			try {

				return subContentRepository.findById(id).map(cstSubData -> {

					return ResponseHandler.generateResponse("Cost Engineering  Sub Content Information retrieved successfully", true,
							HttpStatus.OK, cstSubData);

				}).orElseGet(() -> {
					LOGGER.error("Exceptions happen!: Cost Engineering  Sub Content {} Doesn't exist", id);
					return ResponseHandler.generateResponse("Cost Engineering  Sub Content" + id + " Doesn't exist", false, HttpStatus.OK,
							null);
				});
			} 
			
			catch (Exception e) {
				LOGGER.error("Internal Server Error while get Cost Engineering : {}", e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}

		}

		// Delete particular Cost Engineering Sub Content
		@DeleteMapping("/deletesubcntnt/{id}")
		public ResponseEntity<Object> deleteCstEnggSubCnt(@PathVariable Long id) {
			try {

				return subContentRepository.findById(id).map(cstEnggSubData -> {
				
					subContentRepository.deleteById(id);

					return ResponseHandler.generateResponse("Cost Engineering Information Sub Content Removed Successfully", true, HttpStatus.OK,
							null);
				}).orElseGet(() -> {
					LOGGER.error("Exceptions happen!: Cost Engineering Sub Content ID {} Doesn't exists", id);
					return ResponseHandler.generateResponse("Cost Engineering Sub Content ID " + id + " Doesn't exists", false,
							HttpStatus.OK, null);
				});

			} 
			
			catch (Exception e) {
				LOGGER.error("Internal Server Error while remove Cost Engineering Sub Content: {}", e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}
		}
		
		
		// Delete particular Cost Engineering Sub List
		@DeleteMapping("/deletesublist/{id}")
		public ResponseEntity<Object> deleteCstEnggSubList(@PathVariable Long id) {
			try {

				return subListRepository.findById(id).map(cstSubDataList -> {
				
					subListRepository.deleteById(id);

					return ResponseHandler.generateResponse("Cost Engineering Information Sub List Removed Successfully", true, HttpStatus.OK,
							null);
				}).orElseGet(() -> {
					LOGGER.error("Exceptions happen!: Cost Engineering Sub List ID {} Doesn't exists", id);
					return ResponseHandler.generateResponse("Cost Engineering Sub List ID " + id + " Doesn't exists", false,
							HttpStatus.OK, null);
				});

			} 
			
			catch (Exception e) {
				LOGGER.error("Internal Server Error while remove Cost Engineering Sub List: {}", e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}
		}
		

				
}

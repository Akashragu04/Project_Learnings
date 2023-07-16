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
import com.intelizign.dmgcc.request.landingpage.CostProductionRequest;
import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.services.FilesStorageServicePath;

@RestController
@RequestMapping("/landingpage/productionengg")
public class ProductionEnggController {

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

	
	 //Get All Production Engineering Main Content data
	@GetMapping("/getmaincntent")
	public ResponseEntity<Object> findAllMainContentProductionEngg(@RequestParam String ModelName)  {
		try {
			    
			    MainContentModel productionMainDatas = mainContentRepository.findByActiveservice(true, ModelName);
				return ResponseHandler.generateResponse("List of Production Engineering Information retrieved successfully", true, HttpStatus.OK, productionMainDatas);
			

		} catch (Exception e) {
			LOGGER.error("Internal Server Error: {}" , e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}
	
	
	 //Create Landing or Updating Production Engineering Main Content
		@PostMapping("/maincntnt")
		public ResponseEntity<Object> createProductionEngMainCnt(@Valid @RequestBody MainContentModel productionMainDatas
				) {
			try {
	                 
				    productionMainDatas.setModel_name("Production Engineering");
				
				    mainContentRepository.save (productionMainDatas);
					
					return ResponseHandler.generateResponse("Landing Page Production Engineering Main Content Created successfully", true, HttpStatus.OK,
							productionMainDatas);
				
			}

			catch (Exception e) {

				LOGGER.error("Internal Server Error While Creating Landing Page Production Engineering : {}", e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}
		}

	

	// Get Particular Production Engineering Main Content
	@GetMapping("/getmaincntent/{id}")
	public ResponseEntity<Object> getPEbyid(@PathVariable(value = "id") Long id) {
		try {

			return mainContentRepository.findById(id).map(productionMainDatas -> {

				return ResponseHandler.generateResponse("Production Engineering Main ContentInformation retrieved successfully", true,
						HttpStatus.OK, productionMainDatas);

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Production Engineering Main Content {} Doesn't exist", id);
				return ResponseHandler.generateResponse("Customer Services " + id + " Doesn't exist", false, HttpStatus.OK,
						null);
			});
		} 
		
		catch (Exception e) {
			LOGGER.error("Internal Server Error while get Production Engineering : {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	
		
	
	// Delete particular Production Engineering Main Content
	@DeleteMapping("/maincntnt/{id}")
	public ResponseEntity<Object> deleteCustomerServicesMainCnt(@PathVariable Long id) {
		try {

			return mainContentRepository.findById(id).map(productionMainDatas -> {
			
				mainContentRepository.deleteById(id);

				return ResponseHandler.generateResponse("Production Engineering Information Main Content Removed Successfully", true, HttpStatus.OK,
						null);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Production Engineering Main Content ID {} Doesn't exists", id);
				return ResponseHandler.generateResponse("Production Engineering Main Content ID " + id + " Doesn't exists", false,
						HttpStatus.OK, null);
			});

		} 
		
		catch (Exception e) {
			LOGGER.error("Internal Server Error while remove Production Engineering Main Content: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}



	 //Create Production Engineering Sub Content
		@PostMapping("/subcntnt")
		public ResponseEntity<Object> createPESubCnt(@Valid @RequestBody SubContentModel productionSubDatas
				) {
			try {
	                 
				     productionSubDatas.setModel_name("Production Engineering");
				
				    SubContentModel productionSubData = subContentRepository.save (productionSubDatas);
					
					return ResponseHandler.generateResponse("Landing Page Production Engineering Sub Content Created successfully", true, HttpStatus.OK,
							productionSubData);
				
			}

			catch (Exception e) {

				LOGGER.error("Internal Server Error While Creating Landing Page Production Engineering Sub Content: {}", e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}
		}
    
		// Update Production Engineering Sub Content
				@PostMapping("/updatesubcntnt")
				public ResponseEntity<Object> updateLpSubcntnt(@Valid @RequestBody List<SubContentModel> peSubCntntDatas) {
					try {

						List<SubContentModel> subContentDatas = new ArrayList<>();

						for (SubContentModel subContentReqData : peSubCntntDatas) {

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
										"Production Engineering Sub Content not found , Please contact G3C Admin", false,
										HttpStatus.OK, null);
							}
						}

						List<SubContentModel> peMainCntntData = subContentRepository.saveAll(subContentDatas);

						return ResponseHandler.generateResponse(
								"Landing Page Production Engineering Sub Content Created successfully", true, HttpStatus.OK,
								peMainCntntData);

					}

					catch (Exception e) {

						LOGGER.error(
								"Internal Server Error While Creating Landing Page Production Engineering Sub Content: {}",
								e.getMessage());
						return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
								null);
					}
				}

				
		 //Get All Production Engineering Sub Content data
		@GetMapping("/getsubcntnt")
		public ResponseEntity<Object> findAllSubContentPE(@RequestParam String ModelName)  {
			try {
				    
				    List<SubContentModel> peSubCntntDatas = subContentRepository.findByActive(true, ModelName);
					return ResponseHandler.generateResponse("List of Sub Content Production Engineering Information retrieved successfully", true, HttpStatus.OK, peSubCntntDatas);
				

			} catch (Exception e) {
				LOGGER.error("Internal Server Error: {}" , e.getMessage());
				return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
						HttpStatus.OK, null);
			}

		}

		// Get Particular Production Engineering Sub Content
		@GetMapping("/getsubcontent/{id}")
		public ResponseEntity<Object> getPESubContnt(@PathVariable(value = "id") Long id) {
			try {

				return subContentRepository.findById(id).map(peSubCntntData -> {

					return ResponseHandler.generateResponse("Production Engineering Sub Content Information retrieved successfully", true,
							HttpStatus.OK, peSubCntntData);

				}).orElseGet(() -> {
					LOGGER.error("Exceptions happen!: Production Engineering Sub Content {} Doesn't exist", id);
					return ResponseHandler.generateResponse("Production Engineering Sub Content" + id + " Doesn't exist", false, HttpStatus.OK,
							null);
				});
			} 
			
			catch (Exception e) {
				LOGGER.error("Internal Server Error while get Production Engineering : {}", e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}

		}

		// Delete particular Production Engineering Sub Content
		@DeleteMapping("/deletesubcntnt/{id}")
		public ResponseEntity<Object> deletePESubCnt(@PathVariable Long id) {
			try {

				return subContentRepository.findById(id).map(peSubCntntData -> {
				
					subContentRepository.deleteById(id);

					return ResponseHandler.generateResponse("Production Engineering Sub Content Removed Successfully", true, HttpStatus.OK,
							null);
				}).orElseGet(() -> {
					LOGGER.error("Exceptions happen!: Production Engineering Sub Content ID {} Doesn't exists", id);
					return ResponseHandler.generateResponse("Production Engineering Sub Content ID " + id + " Doesn't exists", false,
							HttpStatus.OK, null);
				});

			} 
			
			catch (Exception e) {
				LOGGER.error("Internal Server Error while remove Production Engineering Sub Content: {}", e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}
		}
		
		@DeleteMapping("/deletesublist/{id}")
		public ResponseEntity<Object> deletePESubList(@PathVariable Long id) {
			try {

				return subListRepository.findById(id).map(peSubCntntData -> {
				
					subListRepository.deleteById(id);

					return ResponseHandler.generateResponse("Production Engineering Information Sub List Removed Successfully", true, HttpStatus.OK,
							null);
				}).orElseGet(() -> {
					LOGGER.error("Exceptions happen!: Production Engineering Sub List ID {} Doesn't exists", id);
					return ResponseHandler.generateResponse("Production Engineering Sub List ID " + id + " Doesn't exists", false,
							HttpStatus.OK, null);
				});

			} 
			
			catch (Exception e) {
				LOGGER.error("Internal Server Error while remove Production Engineering Sub List: {}", e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}
		}

}

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
@RequestMapping("/landingpage/supplier")
public class SupplierManagementController {

	@Autowired
	private SubContentRepository subContentRepository;
	
	@Autowired
	private MainContentRepository mainContentRepository;
	
	@Autowired
	private SubListRepository subListRepository;
	
	
	public final Logger LOGGER = LogManager.getLogger(SupplierManagementController.class);
	
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

	
	 //Get All Supplier Management Main Content data
	@GetMapping("/getmaincntent")
	public ResponseEntity<Object> findAllMainContentCust(@RequestParam String ModelName)  {
		try {
			    
			    MainContentModel supplierMainDatas = mainContentRepository.findByActiveservice(true, ModelName);
				return ResponseHandler.generateResponse("List of Main Content Supplier Management Information retrieved successfully", true, HttpStatus.OK, supplierMainDatas);
			

		} catch (Exception e) {
			LOGGER.error("Internal Server Error: {}" , e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}
	
	
	 //Create Landing Supplier Management Main Content
		@PostMapping("/maincntnt")
		public ResponseEntity<Object> createCustomerServicesMainCnt(@Valid @RequestBody MainContentModel supplierMainDatas
				) {
			try {
	                 
				   supplierMainDatas.setModel_name("Supplier Management");
				
				    mainContentRepository.save (supplierMainDatas);
					
					return ResponseHandler.generateResponse("Landing Page Supplier Management Main Content Created successfully", true, HttpStatus.OK,
							supplierMainDatas);
				
			}

			catch (Exception e) {

				LOGGER.error("Internal Server Error While Creating Landing Page Supplier Management : {}", e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}
		}

	

	// Get Particular Supplier Management Main Content
	@GetMapping("/getmaincntent/{id}")
	public ResponseEntity<Object> getCustomerServicesbyid(@PathVariable(value = "id") Long id) {
		try {

			return mainContentRepository.findById(id).map(supplierMainDatas -> {

				return ResponseHandler.generateResponse("Supplier Management Main ContentInformation retrieved successfully", true,
						HttpStatus.OK, supplierMainDatas);

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Supplier Management Main Content {} Doesn't exist", id);
				return ResponseHandler.generateResponse("Supplier Management " + id + " Doesn't exist", false, HttpStatus.OK,
						null);
			});
		} 
		
		catch (Exception e) {
			LOGGER.error("Internal Server Error while get Supplier Management : {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	
		
	
	// Delete particular Supplier Management Main Content
	@DeleteMapping("/maincntnt/{id}")
	public ResponseEntity<Object> deleteCustomerServicesMainCnt(@PathVariable Long id) {
		try {

			return mainContentRepository.findById(id).map(supplierMainDatas -> {
			
				mainContentRepository.deleteById(id);

				return ResponseHandler.generateResponse("Supplier Management Information Main Content Removed Successfully", true, HttpStatus.OK,
						null);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Supplier Management Main Content ID {} Doesn't exists", id);
				return ResponseHandler.generateResponse("Supplier Management Main Content ID " + id + " Doesn't exists", false,
						HttpStatus.OK, null);
			});

		} 
		
		catch (Exception e) {
			LOGGER.error("Internal Server Error while remove Supplier Management Main Content: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}



	 //Create Supplier Management Sub Content
		@PostMapping("/subcntnt")
		public ResponseEntity<Object> createCustomerServicesSubCnt(@Valid @RequestBody SubContentModel supplierSubDataReq
				) {
			try {
	                 
				    supplierSubDataReq.setModel_name("Supplier Management");
				
				    SubContentModel supplierSubData = subContentRepository.save (supplierSubDataReq);
					
					return ResponseHandler.generateResponse("Landing Page Supplier Management Sub Content Created successfully", true, HttpStatus.OK,
							supplierSubData);
				
			}

			catch (Exception e) {

				LOGGER.error("Internal Server Error While Creating Landing Page Supplier Management Sub Content: {}", e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}
		}
    
		

		// Update Supplier Management Sub Content
				@PostMapping("/updatesubcntnt")
				public ResponseEntity<Object> updateServices(@Valid @RequestBody List<BroucherRequest> servicesReqDatas) {
					try {

						List<SubContentModel> subContentDatas = new ArrayList<>();

						for (BroucherRequest subContentReqData : servicesReqDatas) {

							Optional<SubContentModel> subContentData = subContentRepository.findById(subContentReqData.getId());

							if (subContentData.isPresent()) {

								subContentData.get().setTitle(subContentReqData.getTitle());
							
								if(subContentReqData.getSub_list()!=null) {
									
									subContentData.get().setSub_list(subContentReqData.getSub_list());
									
								}	 
								
								
								subContentDatas.add(subContentData.get());

							}

							else {
								return ResponseHandler.generateResponse(
										"Supplier Management not found , Please contact G3C Admin", false,
										HttpStatus.OK, null);
							}
						}

						List<SubContentModel> ocMainCntntData = subContentRepository.saveAll(subContentDatas);

						return ResponseHandler.generateResponse(
								"Supplier Management Created successfully", true, HttpStatus.OK,
								ocMainCntntData);

					}

					catch (Exception e) {

						LOGGER.error(
								"Internal Server Error While Creating Landing Page Supplier Management : {}",
								e.getMessage());
						return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
								null);
					}
				}
		 //Get All Supplier Management Sub Content data
		@GetMapping("/getsubcntnt")
		public ResponseEntity<Object> findAllSubContentCust(@RequestParam String ModelName)  {
			try {
				    
				    List<SubContentModel> supplierSubDatas = subContentRepository.findByActive(true, ModelName);
					return ResponseHandler.generateResponse("List of Sub Content Supplier Management Information retrieved successfully", true, HttpStatus.OK, supplierSubDatas);
				

			} catch (Exception e) {
				LOGGER.error("Internal Server Error: {}" , e.getMessage());
				return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
						HttpStatus.OK, null);
			}

		}

		// Get Particular Supplier Management Sub Content
		@GetMapping("/getsubcontent/{id}")
		public ResponseEntity<Object> getCustServicesSubContnt(@PathVariable(value = "id") Long id) {
			try {

				return subContentRepository.findById(id).map(supplierSubData -> {

					return ResponseHandler.generateResponse("Supplier Management Sub Content Information retrieved successfully", true,
							HttpStatus.OK, supplierSubData);

				}).orElseGet(() -> {
					LOGGER.error("Exceptions happen!: Supplier Management Sub Content {} Doesn't exist", id);
					return ResponseHandler.generateResponse("Supplier Management Sub Content" + id + " Doesn't exist", false, HttpStatus.OK,
							null);
				});
			} 
			
			catch (Exception e) {
				LOGGER.error("Internal Server Error while get Supplier Management : {}", e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}

		}

		// Delete particular Supplier Management Sub Content
		@DeleteMapping("/deletesubcntnt/{id}")
		public ResponseEntity<Object> deleteCustomerServicesSubCnt(@PathVariable Long id) {
			try {

				return subContentRepository.findById(id).map(cusServSubData -> {
				
					subContentRepository.deleteById(id);

					return ResponseHandler.generateResponse("Supplier Management Information Sub Content Removed Successfully", true, HttpStatus.OK,
							null);
				}).orElseGet(() -> {
					LOGGER.error("Exceptions happen!: Supplier Management Sub Content ID {} Doesn't exists", id);
					return ResponseHandler.generateResponse("Supplier Management Sub Content ID " + id + " Doesn't exists", false,
							HttpStatus.OK, null);
				});

			} 
			
			catch (Exception e) {
				LOGGER.error("Internal Server Error while remove Supplier Management Sub Content: {}", e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}
		}
		
		@DeleteMapping("/deletesublist/{id}")
		public ResponseEntity<Object> deleteCustomerServicesSubList(@PathVariable Long id) {
			try {

				return subListRepository.findById(id).map(cusServSubData -> {
				
					subListRepository.deleteById(id);

					return ResponseHandler.generateResponse("Supplier Management Information Sub List Removed Successfully", true, HttpStatus.OK,
							null);
				}).orElseGet(() -> {
					LOGGER.error("Exceptions happen!: Supplier Management Sub List ID {} Doesn't exists", id);
					return ResponseHandler.generateResponse("Supplier Management Sub List ID " + id + " Doesn't exists", false,
							HttpStatus.OK, null);
				});

			} 
			
			catch (Exception e) {
				LOGGER.error("Internal Server Error while remove Supplier Management Sub List: {}", e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}
		}
		

}

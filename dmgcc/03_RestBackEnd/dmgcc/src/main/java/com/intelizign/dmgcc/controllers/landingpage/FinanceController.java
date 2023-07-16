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
import com.intelizign.dmgcc.request.landingpage.CostProductionRequest;
import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.services.FilesStorageServicePath;

@RestController
@RequestMapping("/landingpage/finance")
public class FinanceController {

	@Autowired
	private SubContentRepository subContentRepository;
	
	@Autowired
	private MainContentRepository mainContentRepository;
	
	@Autowired
	private SubListRepository subListRepository;
	
	
	public final Logger LOGGER = LogManager.getLogger(FinanceController.class);
	
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

	
	 //Get All Finance & Controlling Main Content data
	@GetMapping("/getmaincntent")
	public ResponseEntity<Object> findAllMainContentFinance(@RequestParam String ModelName)  {
		try {
			    
			    MainContentModel financeMainDatas = mainContentRepository.findByActiveservice(true, ModelName);
				return ResponseHandler.generateResponse("List of Main Content Finance Controlling Information retrieved successfully", true, HttpStatus.OK, financeMainDatas);
			

		} catch (Exception e) {
			LOGGER.error("Internal Server Error: {}" , e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}
	
	
	 //Create Landing Finance Controlling Main Content
		@PostMapping("/maincntnt")
		public ResponseEntity<Object> createFinanceMainCnt(@Valid @RequestBody MainContentModel financeMainDatas
				) {
			try {
	                 
				financeMainDatas.setModel_name("Finance Controlling");
				
				mainContentRepository.save (financeMainDatas);
					
					return ResponseHandler.generateResponse("Landing Page Finance Controlling Main Content Created successfully", true, HttpStatus.OK,
							financeMainDatas);
				
			}

			catch (Exception e) {

				LOGGER.error("Internal Server Error While Creating Landing Page  Finance Controlling: {}", e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}
		}

	

	// Get Particular Finance Controlling Main Content
	@GetMapping("/getmaincntent/{id}")
	public ResponseEntity<Object> getFinancebyid(@PathVariable(value = "id") Long id) {
		try {

			return mainContentRepository.findById(id).map(financeMainDatas -> {

				return ResponseHandler.generateResponse(" Finance Controlling Main ContentInformation retrieved successfully", true,
						HttpStatus.OK, financeMainDatas);

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Finance Controlling Main Content {} Doesn't exist", id);
				return ResponseHandler.generateResponse("Finance Controlling " + id + " Doesn't exist", false, HttpStatus.OK,
						null);
			});
		} 
		
		catch (Exception e) {
			LOGGER.error("Internal Server Error while get Finance Controlling : {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	
		
	
	// Delete particular Finance Controlling Main Content
	@DeleteMapping("/maincntnt/{id}")
	public ResponseEntity<Object> deleteFinanceMainCnt(@PathVariable Long id) {
		try {

			return mainContentRepository.findById(id).map(financeMainDatas -> {
			
				mainContentRepository.deleteById(id);

				return ResponseHandler.generateResponse("Finance Controlling Information Main Content Removed Successfully", true, HttpStatus.OK,
						null);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Finance Controlling Main Content ID {} Doesn't exists", id);
				return ResponseHandler.generateResponse("Finance Controlling Main Content ID " + id + " Doesn't exists", false,
						HttpStatus.OK, null);
			});

		} 
		
		catch (Exception e) {
			LOGGER.error("Internal Server Error while remove Finance Controlling Main Content: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}



	 //Create Finance Controlling Sub Content
		@PostMapping("/subcntnt")
		public ResponseEntity<Object> createFinanceSubCnt(@Valid @RequestBody SubContentModel finanaceSubreq
				) {
			try {

				finanaceSubreq.setModel_name("Finance Controlling");

				SubContentModel financeSubCntData = subContentRepository.save(finanaceSubreq);

				return ResponseHandler.generateResponse(
						"Landing Page Finance Controlling Sub Content Created successfully", true, HttpStatus.OK,
						financeSubCntData);
				
			}

			catch (Exception e) {

				LOGGER.error("Internal Server Error While Creating Landing Page Finance Controlling Sub Content: {}", e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}
		}
		
		 //Updating Landing Finance Controlling Sub Content
		@PostMapping("/updatesubcnt")
		public ResponseEntity<Object> createCstSubCnt(@Valid @RequestBody List<CostProductionRequest> cstreq
				) {
			try {
				List<SubContentModel> cstDatas = new ArrayList<>();

					for(CostProductionRequest cstData: cstreq) {
						
						 Optional<SubContentModel> cstDta = subContentRepository.findById(cstData.getId());
						
						 cstDta.get().setTitle(cstData.getTitle());
						 cstDta.get().setSub_list(cstData.getSub_list());
						 cstDatas.add(cstDta.get());
						 
					}
					
					List<SubContentModel> cstenggDatas=subContentRepository.saveAll(cstDatas);
					
					return ResponseHandler.generateResponse("Finance Controlling  Sub Content Information retrieved successfully", true,
							HttpStatus.OK, cstenggDatas);

			}

			catch (Exception e) {

				LOGGER.error("Internal Server Error While Creating Landing Page Finance ControllingSub Content: {}", e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}
		}
    
		 //Get All Finance Controlling Sub Content data
		@GetMapping("/getsubcntnt")
		public ResponseEntity<Object> findAllSubContentFinance(@RequestParam String ModelName)  {
			try {
				    
				    List<SubContentModel> financeSubCntData = subContentRepository.findByActive(true, ModelName);
					return ResponseHandler.generateResponse("List of Sub Content Finance Controlling Information retrieved successfully", true, HttpStatus.OK, financeSubCntData);
				

			} catch (Exception e) {
				LOGGER.error("Internal Server Error: {}" , e.getMessage());
				return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
						HttpStatus.OK, null);
			}

		}

		// Get Particular Finance Controlling Sub Content
		@GetMapping("/getsubcontent/{id}")
		public ResponseEntity<Object> getFinanceSubContnt(@PathVariable(value = "id") Long id) {
			try {

				return subContentRepository.findById(id).map(financeSubCntData -> {

					return ResponseHandler.generateResponse("Finance Controlling Sub Content Information retrieved successfully", true,
							HttpStatus.OK, financeSubCntData);

				}).orElseGet(() -> {
					LOGGER.error("Exceptions happen!: Finance Controlling Sub Content {} Doesn't exist", id);
					return ResponseHandler.generateResponse("Customer Services Sub Content" + id + " Doesn't exist", false, HttpStatus.OK,
							null);
				});
			} 
			
			catch (Exception e) {
				LOGGER.error("Internal Server Error while get Customer Services : {}", e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}

		}

		// Delete particular Finance Controlling Sub Content
		@DeleteMapping("/deletesubcntnt/{id}")
		public ResponseEntity<Object> deleteFinanceSubCnt(@PathVariable Long id) {
			try {

				return subContentRepository.findById(id).map(financeSubCntData -> {
				
					subContentRepository.deleteById(id);

					return ResponseHandler.generateResponse("Finance Controlling Information Sub Content Removed Successfully", true, HttpStatus.OK,
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
		
		
		// Delete particular Finance Controlling Sub List
		@DeleteMapping("/deletesublist/{id}")
		public ResponseEntity<Object> deleteFinanceSubList(@PathVariable Long id) {
			try {

				return subListRepository.findById(id).map(financeSubListData -> {
				
					subListRepository.deleteById(id);

					return ResponseHandler.generateResponse("Finance Controlling Information Sub List Removed Successfully", true, HttpStatus.OK,
							null);
				}).orElseGet(() -> {
					LOGGER.error("Exceptions happen!: Finance Controlling Sub List ID {} Doesn't exists", id);
					return ResponseHandler.generateResponse("Finance Controlling Sub List ID " + id + " Doesn't exists", false,
							HttpStatus.OK, null);
				});

			} 
			
			catch (Exception e) {
				LOGGER.error("Internal Server Error while remove Finance Controlling Sub List: {}", e.getMessage());
				return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
						null);
			}
		}

}

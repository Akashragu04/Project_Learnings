package com.intelizign.dmgcc.controllers.landingpage;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.validation.Valid;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.MethodNotAllowedException;

import com.intelizign.dmgcc.models.landingpage.MainContentModel;
import com.intelizign.dmgcc.models.landingpage.SubContentModel;
import com.intelizign.dmgcc.repositories.landingpage.MainContentRepository;
import com.intelizign.dmgcc.repositories.landingpage.SubContentRepository;
import com.intelizign.dmgcc.repositories.landingpage.SubListRepository;
import com.intelizign.dmgcc.request.landingpage.CostProductionRequest;
import com.intelizign.dmgcc.response.ResponseHandler;

@RestController
@RequestMapping("/landingpage/customerservices")
public class CustomerServicesController {

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

	// Get All Customer Services Main Content data
	@GetMapping("/getmaincntent")
	public ResponseEntity<Object> findAllMainContentCust(@RequestParam String ModelName) {
		try {

			MainContentModel custmerServiceMainDatas = mainContentRepository.findByActiveservice(true, ModelName);
			return ResponseHandler.generateResponse(
					"List of Main Content Customer Services Information retrieved successfully", true, HttpStatus.OK,
					custmerServiceMainDatas);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error: {}", e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	// Create Landing Customer Services Main Content
	@PostMapping("/maincntnt")
	public ResponseEntity<Object> createCustomerServicesMainCnt(@Valid @RequestBody MainContentModel custmrServreq) {
		try {

			custmrServreq.setModel_name("Customer Services");

			mainContentRepository.save(custmrServreq);

			return ResponseHandler.generateResponse("Landing Page Customer Services Main Content Created successfully",
					true, HttpStatus.OK, custmrServreq);

		}

		catch (Exception e) {

			LOGGER.error("Internal Server Error While Creating Landing Page Customer Services: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	// Get Particular Customer Services Main Content
	@GetMapping("/getmaincntent/{id}")
	public ResponseEntity<Object> getCustomerServicesbyid(@PathVariable(value = "id") Long id) {
		try {

			return mainContentRepository.findById(id).map(custmServMainData -> {

				return ResponseHandler.generateResponse(
						"Customer Services Main ContentInformation retrieved successfully", true, HttpStatus.OK,
						custmServMainData);

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Customer Services Main Content {} Doesn't exist", id);
				return ResponseHandler.generateResponse("Customer Services " + id + " Doesn't exist", false,
						HttpStatus.OK, null);
			});
		}

		catch (Exception e) {
			LOGGER.error("Internal Server Error while get Customer Services : {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	// Delete particular Customer Services Main Content
	@DeleteMapping("/maincntnt/{id}")
	public ResponseEntity<Object> deleteCustomerServicesMainCnt(@PathVariable Long id) {
		try {

			return mainContentRepository.findById(id).map(cusServMainData -> {

				mainContentRepository.deleteById(id);

				return ResponseHandler.generateResponse(
						"Customer Service Information Main Content Removed Successfully", true, HttpStatus.OK, null);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Customer Service Main Content ID {} Doesn't exists", id);
				return ResponseHandler.generateResponse("Customer Service Main Content ID " + id + " Doesn't exists",
						false, HttpStatus.OK, null);
			});

		}

		catch (Exception e) {
			LOGGER.error("Internal Server Error while remove Customer Service Main Content: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	// Create Landing Customer Services Sub Content
	@PostMapping("/subcntnt")
	public ResponseEntity<Object> createCustomerServicesSubCnt(@Valid @RequestBody SubContentModel custmrServSubreq) {
		try {

			custmrServSubreq.setModel_name("Customer Services");

			SubContentModel custServiceSubData = subContentRepository.save(custmrServSubreq);

			return ResponseHandler.generateResponse("Landing Page Customer Services Sub Content Created successfully",
					true, HttpStatus.OK, custServiceSubData);

		}

		catch (Exception e) {

			LOGGER.error("Internal Server Error While Creating Landing Page Customer Services Sub Content: {}",
					e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	// Updating Landing Customer Services Sub Content
	@PostMapping("/updatesubcnt")
	public ResponseEntity<Object> createCstSubCnt(@Valid @RequestBody List<CostProductionRequest> cstreq) {
		try {
			List<SubContentModel> cstDatas = new ArrayList<>();

			for (CostProductionRequest cstData : cstreq) {

				Optional<SubContentModel> cstDta = subContentRepository.findById(cstData.getId());

				cstDta.get().setTitle(cstData.getTitle());
				cstDta.get().setSub_list(cstData.getSub_list());
				cstDatas.add(cstDta.get());

			}

			List<SubContentModel> cstenggDatas = subContentRepository.saveAll(cstDatas);

			return ResponseHandler.generateResponse("Customer Services  Sub Content Information retrieved successfully",
					true, HttpStatus.OK, cstenggDatas);

		}

		catch (Exception e) {

			LOGGER.error("Internal Server Error While Creating Landing Page Customer Services Sub Content: {}",
					e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	// Get All Customer Services Sub Content data
	@GetMapping("/getsubcntnt")
	public ResponseEntity<Object> findAllSubContentCust(@RequestParam String ModelName) {
		try {

			List<SubContentModel> custmerServiceMainDatas = subContentRepository.findByActive(true, ModelName);
			return ResponseHandler.generateResponse(
					"List of Sub Content Customer Services Information retrieved successfully", true, HttpStatus.OK,
					custmerServiceMainDatas);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error: {}", e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	// Get Particular Customer Services Sub Content
	@GetMapping("/getsubcontent/{id}")
	public ResponseEntity<Object> getCustServicesSubContnt(@PathVariable(value = "id") Long id) {
		try {

			return subContentRepository.findById(id).map(custmServSubData -> {

				return ResponseHandler.generateResponse(
						"Customer Services Sub Content Information retrieved successfully", true, HttpStatus.OK,
						custmServSubData);

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Customer Services Sub Content {} Doesn't exist", id);
				return ResponseHandler.generateResponse("Customer Services Sub Content" + id + " Doesn't exist", false,
						HttpStatus.OK, null);
			});
		}

		catch (Exception e) {
			LOGGER.error("Internal Server Error while get Customer Services : {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	// Delete particular Customer Services Sub Content
	@DeleteMapping("/deletesubcntnt/{id}")
	public ResponseEntity<Object> deleteCustomerServicesSubCnt(@PathVariable Long id) {
		try {

			return subContentRepository.findById(id).map(cusServSubData -> {

				subContentRepository.deleteById(id);

				return ResponseHandler.generateResponse("Customer Service Information Sub Content Removed Successfully",
						true, HttpStatus.OK, null);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Customer Service Sub Content ID {} Doesn't exists", id);
				return ResponseHandler.generateResponse("Customer Service Sub Content ID " + id + " Doesn't exists",
						false, HttpStatus.OK, null);
			});

		}

		catch (Exception e) {
			LOGGER.error("Internal Server Error while remove Customer Service Sub Content: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	@DeleteMapping("/deletesublist/{id}")
	public ResponseEntity<Object> deleteCustomerServicesSubList(@PathVariable Long id) {
		try {

			return subListRepository.findById(id).map(cusServSubData -> {

				subListRepository.deleteById(id);

				return ResponseHandler.generateResponse("Customer Service Information Sub List Removed Successfully",
						true, HttpStatus.OK, null);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Customer Service Sub List ID {} Doesn't exists", id);
				return ResponseHandler.generateResponse("Customer Service Sub List ID " + id + " Doesn't exists", false,
						HttpStatus.OK, null);
			});

		}

		catch (Exception e) {
			LOGGER.error("Internal Server Error while remove Customer Service Sub List: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

}

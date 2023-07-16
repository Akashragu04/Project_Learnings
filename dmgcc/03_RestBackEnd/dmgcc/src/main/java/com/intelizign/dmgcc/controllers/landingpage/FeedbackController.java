package com.intelizign.dmgcc.controllers.landingpage;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import javax.validation.Valid;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.MethodNotAllowedException;

import com.fasterxml.jackson.annotation.JsonView;
import com.intelizign.dmgcc.authendication.AzureUserInfo;
import com.intelizign.dmgcc.authendication.UserDetailsImpl;
import com.intelizign.dmgcc.models.G3CEmployeeMasterModel;
import com.intelizign.dmgcc.models.ProjectModel;
import com.intelizign.dmgcc.models.ResourceAllocationModel;
import com.intelizign.dmgcc.models.landingpage.BroucherModel;
import com.intelizign.dmgcc.models.landingpage.FeedBackModel;
import com.intelizign.dmgcc.repositories.G3CEmployeeRepository;
import com.intelizign.dmgcc.repositories.ProjectRepository;
import com.intelizign.dmgcc.repositories.landingpage.FeedBackRepository;
import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.services.landingpage.FeedBackServices;
import com.intelizign.dmgcc.utils.CustomFields;

@RestController
@RequestMapping("/feedback")
public class FeedbackController {

	@Autowired
	private FeedBackRepository landingFeedbackRepository;

	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private G3CEmployeeRepository g3cRepository;

	@Autowired
	private AzureUserInfo azureUserInfo;

	@Autowired
	private FeedBackServices feedbackService;

	public final Logger LOGGER = LogManager.getLogger(FeedbackController.class);

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

	// Get All Feedbacks
	@GetMapping("")
	public ResponseEntity<Object> findAllFeedback(Authentication authentication) {
		try {

			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);
			
			if (userDetails.getRolename().equals("ADMIN")) {

				List<FeedBackModel> feedBackDatas = landingFeedbackRepository.findByactive(true);
				
				if (!feedBackDatas.isEmpty()) {

					return ResponseHandler.generateResponse("List of Feedbacks Retrieved Successfully", true,
							HttpStatus.OK, feedBackDatas);
				}

				else
					return ResponseHandler.generateResponse("Feedback Data Not Found", false, HttpStatus.OK, null);

			}

			else if(userDetails.getRolename().equals("BUSINESS")) {
				
				List<FeedBackModel> feedBackDatas = landingFeedbackRepository.findByDepartment(true,userDetails.getCost_center());
				
				if (!feedBackDatas.isEmpty()) {

					return ResponseHandler.generateResponse("List of Feedbacks Retrieved Successfully", true,
							HttpStatus.OK, feedBackDatas);
				}

				else
					return ResponseHandler.generateResponse("Feedback Data Not Found", false, HttpStatus.OK, null);

			}
					
			else {
				
			   List<FeedBackModel> feedBackDatas = landingFeedbackRepository.findByShortId(true,userDetails.getShortid());
			   
			   if (!feedBackDatas.isEmpty()) {

					return ResponseHandler.generateResponse("List of Feedbacks Retrieved Successfully", true,
							HttpStatus.OK, feedBackDatas);
				}

				else
					return ResponseHandler.generateResponse("Feedback Data Not Found", false, HttpStatus.OK, null);
			  			
			}

		} catch (Exception e) {
			LOGGER.error("Internal Server Error: {}", e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	// Create Feedback
	@PostMapping("")
	public ResponseEntity<Object> createFeedback(@Valid @RequestBody FeedBackModel feedbackReq) {
		try {

			FeedBackModel feedbackData = landingFeedbackRepository.save(feedbackReq);

			return ResponseHandler.generateResponse("Feedback Created successfully", true, HttpStatus.OK, feedbackData);

		}

		catch (Exception e) {

			LOGGER.error("Internal Server Error While Insert Feedback: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	// Get Particular Feedback
	@GetMapping("/{id}")
	public ResponseEntity<Object> getFeedbackbyid(@PathVariable(value = "id") Long id) {
		try {

			return landingFeedbackRepository.findById(id).map(feedbackData -> {

				return ResponseHandler.generateResponse("Feedback Information retrieved successfully", true,
						HttpStatus.OK, feedbackData);

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Feedback {} Doesn't exist", id);
				return ResponseHandler.generateResponse("Feedback " + id + " Doesn't exist", false, HttpStatus.OK,
						null);
			});
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get Feedback: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	// Updating particular Feedback
	@PutMapping("")
	public ResponseEntity<Object> updateFeedback(@Valid @RequestBody List<FeedBackModel> feedbackReq) {
		try {

			List<FeedBackModel> feedbackDatas = new ArrayList<>();

			for (FeedBackModel feedbackData : feedbackReq) {

				Optional<FeedBackModel> feedbackdata = landingFeedbackRepository.findById(feedbackData.getId());

				if (feedbackdata.isPresent()) {

					feedbackdata.get().setAdherence_remark(feedbackData.getAdherence_remark());
					feedbackdata.get().setAdherence_status(feedbackData.getAdherence_status());
					feedbackdata.get().setCommunication_skills_remark(feedbackData.getCommunication_skills_remark());
					feedbackdata.get().setCommunication_skills_status(feedbackData.getCommunication_skills_status());
					feedbackdata.get().setDepartment(feedbackData.getDepartment());
					feedbackdata.get().setDesignation_level(feedbackData.getDesignation_level());
					feedbackdata.get().setKnowledge_remark(feedbackData.getKnowledge_remark());
					feedbackdata.get().setKnowledge_status(feedbackData.getKnowledge_status());
					feedbackdata.get().setOverall_plan_remark(feedbackData.getOverall_plan_remark());
					feedbackdata.get().setOverall_plan_status(feedbackData.getOverall_plan_status());
					feedbackdata.get().setQuality_remark(feedbackData.getQuality_remark());
					feedbackdata.get().setQuality_status(feedbackData.getQuality_status());
					feedbackdata.get().setQuality_timeLine_remark(feedbackData.getQuality_timeLine_remark());
					feedbackdata.get().setQuality_timeLine_status(feedbackData.getQuality_timeLine_status());
					feedbackdata.get().setRecommend_counterpart(feedbackData.getRecommend_counterpart());
					feedbackdata.get().setRecommend_counterpart_state(feedbackData.getRecommend_counterpart_state());
					feedbackdata.get().setResponsiveness_remark(feedbackData.getResponsiveness_remark());
					feedbackdata.get().setResponsiveness_status(feedbackData.getResponsiveness_status());
					feedbackdata.get().setShort_id(feedbackData.getShort_id());
					feedbackdata.get()
							.setSuggestions_improvement_areas(feedbackData.getSuggestions_improvement_areas());
					feedbackdata.get().setSustainability_remark(feedbackData.getSustainability_remark());
					feedbackdata.get().setSustainability_status(feedbackData.getSustainability_status());
					feedbackdata.get().setCost_center(feedbackData.getCost_center());
					feedbackdata.get().setProject_id(feedbackData.getProject_id());
					feedbackdata.get().setProject_name(feedbackData.getProject_name());

					feedbackDatas.add(feedbackdata.get());

				}

				else {
					return ResponseHandler.generateResponse("Feedback Updated successfully", false, HttpStatus.OK,
							null);
				}
			}

			landingFeedbackRepository.saveAll(feedbackDatas);

			return ResponseHandler.generateResponse("Feedback Updated successfully", true, HttpStatus.OK,
					feedbackDatas);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error: {}", e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	// Delete Feedback
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteBroucher(@PathVariable Long id) {
		try {

			return landingFeedbackRepository.findById(id).map(feedData -> {

				landingFeedbackRepository.deleteById(id);

				return ResponseHandler.generateResponse("Feedback Removed Successfully", true, HttpStatus.OK, null);

			}).orElseGet(() -> {

				LOGGER.error("Exceptions happen!: Feedback ID {} Doesn't exists", id);

				return ResponseHandler.generateResponse("Feedback ID " + id + " Doesn't exists", false, HttpStatus.OK,
						null);
			});

		}

		catch (Exception e) {
			LOGGER.error("Internal Server Error while removing Feedback : {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	@GetMapping("/getprojects")
	public ResponseEntity<Object> getallprojdetlngdata(Authentication authentication) {
		try {

			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);

			Optional<G3CEmployeeMasterModel> employeeData = g3cRepository.findByUsername(userDetails.getUsername());

			if (employeeData.isPresent()) {

				List<ProjectModel> projectDatas = new ArrayList<>();

				Set<ResourceAllocationModel> resourceData = employeeData.get().getResource_mapping();

				for (ResourceAllocationModel resourcesInfo : resourceData) {

					ProjectModel projectData = projectRepository.findbyIdAndActive(resourcesInfo.getProjectid(), true);

					projectDatas.add(projectData);

				}

				return ResponseHandler.generateResponse("List of Project List", true, HttpStatus.OK, projectDatas);
			}

			else

				return ResponseHandler.generateResponse("Employee Data Not Found", false, HttpStatus.OK, null);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error While Getting All Project Data: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	@JsonView(CustomFields.MyResponseViews.class)
	@GetMapping("/getemployeedata/{id}")
	public ResponseEntity<Object> getEmployeedata(@PathVariable String id) {
		try {

			Optional<G3CEmployeeMasterModel> employeeData = g3cRepository.findByShortiD(id);

			if (employeeData.isPresent()) {

				return ResponseHandler.generateResponse("List of Employees Data", true, HttpStatus.OK, employeeData);
			}

			else

				return ResponseHandler.generateResponse("Employee Data Not Found", false, HttpStatus.OK, null);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error While Getting All Employee Data: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	// Excel Export
	@GetMapping("/excelreport")
	public ResponseEntity<Object> feedbackExport(Authentication authentication) {

		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

		if (userDetails == null)
			return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);
		
		if (userDetails.getRolename().equals("CUSTOMER")) {
			
			String file = feedbackService.customerFeedbackExport(userDetails.getShortid());
			return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + "feedback.xlsx")
					.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
		}
		
		else {
		
		String file = feedbackService.feedbackExport();
		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + "feedback.xlsx")
				.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
		}
	}
	
	   

	
}

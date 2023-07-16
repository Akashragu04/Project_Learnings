package com.intelizign.dmgcc.controllers;

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
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.intelizign.dmgcc.authendication.AzureUserInfo;
import com.intelizign.dmgcc.authendication.UserDetailsImpl;
import com.intelizign.dmgcc.models.G3CEmployeeMasterModel;
import com.intelizign.dmgcc.models.ProjectModel;
import com.intelizign.dmgcc.models.ResourceAllocationModel;
import com.intelizign.dmgcc.models.SLAModel;
import com.intelizign.dmgcc.pojoclass.FTERequirement;
import com.intelizign.dmgcc.repositories.BizCaseRequestRepository;
import com.intelizign.dmgcc.repositories.EmployeeCapacityReporRepository;
import com.intelizign.dmgcc.repositories.G3CEmployeeRepository;
import com.intelizign.dmgcc.repositories.ProjectRepository;
import com.intelizign.dmgcc.repositories.ResourceAllocationRepository;
import com.intelizign.dmgcc.repositories.SLARepository;
import com.intelizign.dmgcc.request.ResourceAllocationRequest;
import com.intelizign.dmgcc.request.ResourceAllocationRequest.ResourceMapping;
import com.intelizign.dmgcc.request.bizcase.Manpower_Requirements;
import com.intelizign.dmgcc.request.bizcase.Properties;
import com.intelizign.dmgcc.response.GetResourceAllcocation;
import com.intelizign.dmgcc.response.ResouceProjectViewResponce;
import com.intelizign.dmgcc.response.ResourceBasedViewResponse;
import com.intelizign.dmgcc.response.ResourceCapacityView;
import com.intelizign.dmgcc.response.ResourceReportView;
import com.intelizign.dmgcc.response.ResourceSLAViewResponse;
import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.scheduler.ResourceScheduler;
import com.intelizign.dmgcc.services.MySSCSchedulerService;
import com.intelizign.dmgcc.services.ResourceAllocationService;

@RestController
@RequestMapping("/resourceallocation")
public class ResourceAllocationController {

	@Autowired
	SimpMessagingTemplate template;

	@Autowired
	ProjectRepository projectRepository;

	@Autowired
	private G3CEmployeeRepository g3cEmployeeRepository;

	@Autowired
	private BizCaseRequestRepository bizCaseRequestRepository;

	@Autowired
	private ResourceAllocationRepository resourceAllocationRepository;

	@Autowired
	private EmployeeCapacityReporRepository employeeCapacityReporRepository;

	@Autowired
	private SLARepository slaRepository;

	@Autowired
	ResourceAllocationService resourceAllocationService;

	@Autowired
	ResourceScheduler resourceScheduler;

	@Autowired
	private MySSCSchedulerService mySSCSchedulerService;

	@Autowired
	private AzureUserInfo azureUserInfo;

	public final Logger LOGGER = LogManager.getLogger(ResourceAllocationController.class);

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public Map<String, String> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
		Map<String, String> errors = new HashMap<>();
		ex.getBindingResult().getFieldErrors()
				.forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));

		return errors;
	}

	@GetMapping("/setcapinitiandtask/{slaid}/{capiniti}/{task}/{idleHours}")
	public ResponseEntity<Object> changeCapnitiEnable(@PathVariable(value = "slaid") Long slaid,
			@PathVariable(value = "capiniti") String capiniti, @PathVariable(value = "task") String task,
			@PathVariable(value = "idleHours") Double idle_hours) {
		try {
			return slaRepository.findById(slaid).map(sladata -> {
				sladata.setCapnitienable(Boolean.valueOf(capiniti));
				sladata.setTaskenable(Boolean.valueOf(task));
				sladata.setIdle_hours(idle_hours);
				SLAModel sladatas = slaRepository.save(sladata);
				String capiniti_satatus = resourceAllocationService.capinitiStatus(Boolean.valueOf(capiniti));
				String task_satatus = resourceAllocationService.capinitiStatus(Boolean.valueOf(task));

				return ResponseHandler.generateResponse("Capniti " + capiniti_satatus + " and Task " + task_satatus,
						true, HttpStatus.OK, sladatas);

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: SLA ID " + slaid + " Doesn't exist");
				return ResponseHandler.generateResponse("SLA ID " + slaid + " Doesn't exist", false, HttpStatus.OK,
						null);
			});

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while getall:" + e.getMessage());
			return ResponseHandler.generateResponse(e.getMessage(), false, HttpStatus.OK, null);
		}

	}

	@GetMapping("/getresourcemapping/{slaid}")
	public ResponseEntity<Object> findAllBizCaseRequest(@PathVariable(value = "slaid") Long slaid) {
		try {
			return slaRepository.findById(slaid).map(sladata -> {

				GetResourceAllcocation resourceallocation = new GetResourceAllcocation();

				List<ResourceAllocationModel> resourceAllocationModels = resourceAllocationRepository
						.findBySlaId(slaid);

				List<G3CEmployeeMasterModel> getresource = g3cEmployeeRepository
						.findByAvailableResource(sladata.getProvider_cost_center());

				return bizCaseRequestRepository.findById(sladata.getProject().getBizcase().getId()).map(bizcasedata -> {
					List<FTERequirement> fullFTERequirement = new ArrayList<>();
					if (bizcasedata.getSla_business_case()) {
						if (bizcasedata.getManpower_requirements() != null) {
							FTERequirement fteRequirement = new FTERequirement();
							fteRequirement.setLevel("Total");
							Manpower_Requirements currentmanpower = bizcasedata.getManpower_requirements().get(0);
							fteRequirement.setFte(currentmanpower.getTotal());
							fullFTERequirement.add(fteRequirement);
							for (Properties currentProperties : currentmanpower.getProperties()) {
								fteRequirement = new FTERequirement();
								fteRequirement.setLevel(currentProperties.getProperty_name());
								fteRequirement.setFte(currentProperties.getProperty_value());
								fullFTERequirement.add(fteRequirement);
							}
						}
					} else {
						FTERequirement fteRequirement = new FTERequirement();
						fteRequirement.setLevel("Total");
						fteRequirement.setFte(String.valueOf(bizcasedata.getProject().getTotal_fte_count()));
						fullFTERequirement.add(fteRequirement);
					}

					resourceallocation.setResourceallocation(resourceAllocationModels);
					resourceallocation.setAvailableResource(getresource);
					resourceallocation.setFullFTERequirement(fullFTERequirement);
					return ResponseHandler.generateResponse("Resource Allocation Information", true, HttpStatus.OK,
							resourceallocation);
				}).orElseGet(() -> {
					LOGGER.error("Exceptions happen!: bizcaseID  Doesn't exist");
					return ResponseHandler.generateResponse("bizcaseID Doesn't exist", false, HttpStatus.OK, null);
				});

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: SLA ID " + slaid + " Doesn't exist");
				return ResponseHandler.generateResponse("SLA ID " + slaid + " Doesn't exist", false, HttpStatus.OK,
						null);
			});

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while getall:" + e.getMessage());
			return ResponseHandler.generateResponse(e.getMessage(), false, HttpStatus.OK, null);
		}

	}

	@GetMapping("/getsla/{ProjectID}")
	public ResponseEntity<Object> FindSLA(@PathVariable(value = "ProjectID") Long ProjectID) {
		try {

			List<SLAModel> SLAEstimationdata = slaRepository.findByProjectId(ProjectID);
			return ResponseHandler.generateResponse("List of SLA Estimation based on Project ID", true, HttpStatus.OK,
					SLAEstimationdata);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error:" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@GetMapping("/{resourceid}")
	public ResponseEntity<Object> findResourceallocation(@PathVariable(value = "resourceid") Long resourceid) {
		try {

			return resourceAllocationRepository.findById(resourceid).map(resourceallocationdata -> {

				return ResponseHandler.generateResponse("Resource Allocation Information", true, HttpStatus.OK,
						resourceallocationdata);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: bizcaseID " + resourceid + " Doesn't exist");
				return ResponseHandler.generateResponse("bizcaseID " + resourceid + " Doesn't exist", false,
						HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Internal Server Error:" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@PostMapping("")
	public ResponseEntity<Object> resourceAllocation(
			@Valid @RequestBody ResourceAllocationRequest resourceAllocationRequests) {
		try {
			List<G3CEmployeeMasterModel> employeelist = new ArrayList<>();
			List<ResourceAllocationModel> allResourcedata = new ArrayList<>();

			Optional<ProjectModel> projectdatas = projectRepository
					.findById(resourceAllocationRequests.getProject_id());
			if (projectdatas.isPresent()) {

				for (ResourceMapping currentresourceMapping : resourceAllocationRequests.getResourceMapping()) {
					if (currentresourceMapping.getCapcity() < 0) {
						return ResponseHandler.generateResponse("Capacity can't be negative", false, HttpStatus.OK,
								null);
					}
				}

				ProjectModel projectdata = projectdatas.get();
				Optional<SLAModel> sladatas = slaRepository.findById(resourceAllocationRequests.getSla_id());
				if (sladatas.isPresent()) {
					SLAModel sladata = sladatas.get();
					for (ResourceMapping currentresourceMapping : resourceAllocationRequests.getResourceMapping()) {
						ResourceAllocationModel resourceMapping = new ResourceAllocationModel();
						resourceMapping.setProject(projectdata);
						resourceMapping.setProjectid(resourceAllocationRequests.getProject_id());
						resourceMapping.setProject_name(projectdata.getProject_name());
						resourceMapping.setSla(sladata);
						resourceMapping.setSlaid(resourceAllocationRequests.getSla_id());
						resourceMapping.setSla_name(sladata.getSlaid());
						resourceMapping.setResource_name(currentresourceMapping.getResource_name());
						resourceMapping.setResource_email(currentresourceMapping.getResource_email());
						resourceMapping.setResource_shortid(currentresourceMapping.getResource_shortid());
						resourceMapping.setHrid(currentresourceMapping.getHrid());
						resourceMapping.setCapcity(currentresourceMapping.getCapcity());
						resourceMapping.setLevel(currentresourceMapping.getLevel());

						Optional<G3CEmployeeMasterModel> empdata = g3cEmployeeRepository
								.findById(currentresourceMapping.getUserid());

						if (empdata.isPresent()) {
							G3CEmployeeMasterModel currentempdata = empdata.get();

							ResourceAllocationModel checkresourceallocated = resourceAllocationRepository
									.findBySlaIdAndUserId(sladata.getId(), currentempdata.getId());

							if (checkresourceallocated != null) {
								LOGGER.error(" Employee ID: " + currentempdata.getId() + " Already Mapped in SLA: "
										+ sladata.getSlaid());
								return ResponseHandler.generateResponse(
										"Exceptions happen!: Employee ID: " + currentempdata.getId()
												+ " Already Mapped in SLA: " + sladata.getSlaid(),
										false, HttpStatus.OK, null);
							} else {
								if (currentresourceMapping.getId() != null) {
									ResourceAllocationModel checkResourceMapping = resourceAllocationRepository
											.findByIdAndUserId(currentresourceMapping.getId(),
													currentresourceMapping.getUserid());

									resourceMapping.setId(currentresourceMapping.getId());
									resourceMapping.setUserid(currentempdata.getId());
									resourceMapping.setUser(currentempdata);

									currentempdata.setCapacity(
											currentempdata.getCapacity() - checkResourceMapping.getCapcity());

									if ((currentempdata.getCapacity() + currentresourceMapping.getCapcity()) <= 100) {
										currentempdata.setCapacity(
												currentempdata.getCapacity() + currentresourceMapping.getCapcity());

									} else {
										return ResponseHandler.generateResponse(
												100 - currentempdata.getCapacity()
														+ "% of capacity is available for user "
														+ currentresourceMapping.getResource_name(),
												false, HttpStatus.OK, null);
									}

								} else {
									resourceMapping.setUserid(currentempdata.getId());
									resourceMapping.setUser(currentempdata);

									// Update Employee Capacity
									if (currentempdata.getCapacity() == null) {
										currentempdata.setCapacity(0);
									}
									if ((currentempdata.getCapacity() + currentresourceMapping.getCapcity()) <= 100) {
										currentempdata.setCapacity(
												currentempdata.getCapacity() + currentresourceMapping.getCapcity());

									} else {
										return ResponseHandler.generateResponse(
												100 - currentempdata.getCapacity()
														+ "% of capacity is available for user "
														+ currentresourceMapping.getResource_name(),
												false, HttpStatus.OK, null);
									}
								}
								employeelist.add(currentempdata);
								allResourcedata.add(resourceMapping);
							}

						} else {
							return ResponseHandler.generateResponse(
									"User ID:" + currentresourceMapping.getUserid() + " Doesn't Exist", false,
									HttpStatus.OK, null);
						}
					}
					List<ResourceAllocationModel> resourceAllocationsavedata = resourceAllocationRepository
							.saveAll(allResourcedata);
					g3cEmployeeRepository.saveAll(employeelist);

					sladata.setCapnitienable(resourceAllocationRequests.getCapniti_enable());
					sladata.setTaskenable(resourceAllocationRequests.getTask_enable());
					slaRepository.save(sladata);

					projectdata.setIs_new(false);
					projectRepository.save(projectdata);

					return ResponseHandler.generateResponse("Resource Allocation Created Successfully", true,
							HttpStatus.OK, resourceAllocationsavedata);

				} else {
					LOGGER.error("Exceptions happen!: SLA ID " + resourceAllocationRequests.getProject_id()
							+ " Doesn't exist");
					return ResponseHandler.generateResponse(
							"SLA ID " + resourceAllocationRequests.getSla_id() + " Doesn't exist", false, HttpStatus.OK,
							null);
				}

			} else {
				LOGGER.error("Exceptions happen!: Project ID " + resourceAllocationRequests.getProject_id()
						+ " Doesn't exist");
				return ResponseHandler.generateResponse(
						"Project ID " + resourceAllocationRequests.getProject_id() + " Doesn't exist", false,
						HttpStatus.OK, null);
			}

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while getall:" + e.getMessage());
			return ResponseHandler.generateResponse(e.getMessage(), false, HttpStatus.OK, null);
		}

	}

	@PutMapping("/removeresource/{resourcemappingid}")
	public ResponseEntity<Object> removeResourceAllocation(
			@PathVariable(value = "resourcemappingid") Long resourcemappingid) {
		try {

			return resourceAllocationRepository.findById(resourcemappingid).map(resorcemappingdata -> {

				G3CEmployeeMasterModel currentempdata = resorcemappingdata.getUser();
				currentempdata.setCapacity(currentempdata.getCapacity() - resorcemappingdata.getCapcity());

				resourceAllocationRepository.deleteById(resourcemappingid);
				g3cEmployeeRepository.save(currentempdata);

				return ResponseHandler.generateResponse("Resource Remove Successfully", true, HttpStatus.OK, null);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Resource Mapping ID " + resourcemappingid + " Doesn't exist");
				return ResponseHandler.generateResponse("Resource Mapping ID " + resourcemappingid + " Doesn't exist",
						false, HttpStatus.OK, null);
			});
		} catch (

		Exception e) {
			LOGGER.error("Internal Server Error while getall:" + e.getMessage());
			return ResponseHandler.generateResponse(e.getMessage(), false, HttpStatus.OK, null);
		}

	}

	// Capacity Managementget

	@GetMapping("/getprojectsview")
	public ResponseEntity<Object> getProjectsview(Authentication authentication) {
		try {

			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);
			List<G3CEmployeeMasterModel> getavailableresource = new ArrayList<>();
			switch (userDetails.getRolename()) {
			case "ADMIN":
				getavailableresource = g3cEmployeeRepository.findByAvailableResource();
				break;
			case "BUSINESS":
				getavailableresource = g3cEmployeeRepository.findByCostcenter(userDetails.getCost_center());
				break;
			default:
				return ResponseHandler.generateResponse("Un_Authorized user", false, HttpStatus.OK, null);
			}

			List<ResourceBasedViewResponse> resourceBasedViewResponses = new ArrayList<>();
			for (G3CEmployeeMasterModel currentEmployeeMasterModel : getavailableresource) {
				ResourceBasedViewResponse currentBasedViewResponse = new ResourceBasedViewResponse();
				currentBasedViewResponse.setId(currentEmployeeMasterModel.getId());
				currentBasedViewResponse.setLevel(currentEmployeeMasterModel.getLevel());
				currentBasedViewResponse.setHr_id(currentEmployeeMasterModel.getHrid());
				currentBasedViewResponse.setEmp_name(currentEmployeeMasterModel.getEmp_name());
				currentBasedViewResponse.setEmail(currentEmployeeMasterModel.getEmail());
				currentBasedViewResponse.setCapacity(currentEmployeeMasterModel.getCapacity());
				currentBasedViewResponse.setShortid(currentEmployeeMasterModel.getShortid());
				resourceBasedViewResponses.add(currentBasedViewResponse);
			}
			String role = userDetails.getRolename();
			if (role.equalsIgnoreCase("admin")) {
				List<ProjectModel> projectlist = projectRepository.findAll();
				List<ResouceProjectViewResponce> resouceProjectViewResponces = new ArrayList<>();
				for (ProjectModel currentproject : projectlist) {
					ResouceProjectViewResponce currentProjectViewResponce = new ResouceProjectViewResponce();
					currentProjectViewResponce.setId(currentproject.getId());
					currentProjectViewResponce.setProject_name(currentproject.getProject_name());
					currentProjectViewResponce.setProject_code(currentproject.getProject_id());
					List<ResourceSLAViewResponse> resourceSLAViewResponses = new ArrayList<>();
					for (SLAModel currentModel : currentproject.getSla()) {
						if (Boolean.TRUE.equals(currentModel.getIs_active())) {
							ResourceSLAViewResponse currentResourceSLAViewResponse = new ResourceSLAViewResponse();
							currentResourceSLAViewResponse.setId(currentModel.getId());
							currentResourceSLAViewResponse.setSlaid(currentModel.getSlaid());
							currentResourceSLAViewResponse.setSlaname(currentModel.getSlaname());
							currentResourceSLAViewResponse.setResources(currentModel.getResources());
							resourceSLAViewResponses.add(currentResourceSLAViewResponse);
						}
					}
					currentProjectViewResponce.setSla(resourceSLAViewResponses);
					resouceProjectViewResponces.add(currentProjectViewResponce);
				}
				ResourceReportView responceview = new ResourceReportView();
				responceview.setProjectview(resouceProjectViewResponces);
				responceview.setReportview("ProjectBasedView");
				responceview.setAvailableresource(resourceBasedViewResponses);
				return ResponseHandler.generateResponse("List of Projects", true, HttpStatus.OK, responceview);
			} else if (role.equalsIgnoreCase("business")) {
				List<ProjectModel> projectlist = projectRepository
						.findByService_provider_shortid(userDetails.getShortid());
				List<ResouceProjectViewResponce> resouceProjectViewResponces = new ArrayList<>();
				for (ProjectModel currentproject : projectlist) {
					ResouceProjectViewResponce currentProjectViewResponce = new ResouceProjectViewResponce();
					currentProjectViewResponce.setId(currentproject.getId());
					currentProjectViewResponce.setProject_name(currentproject.getProject_name());
					currentProjectViewResponce.setProject_code(currentproject.getProject_id());
					List<ResourceSLAViewResponse> resourceSLAViewResponses = new ArrayList<>();
					for (SLAModel currentModel : currentproject.getSla()) {
						ResourceSLAViewResponse currentResourceSLAViewResponse = new ResourceSLAViewResponse();
						currentResourceSLAViewResponse.setId(currentModel.getId());
						currentResourceSLAViewResponse.setSlaid(currentModel.getSlaid());
						currentResourceSLAViewResponse.setSlaname(currentModel.getSlaname());
						currentResourceSLAViewResponse.setResources(currentModel.getResources());
						resourceSLAViewResponses.add(currentResourceSLAViewResponse);
					}
					currentProjectViewResponce.setSla(resourceSLAViewResponses);
					resouceProjectViewResponces.add(currentProjectViewResponce);
				}
				ResourceReportView responceview = new ResourceReportView();
				responceview.setProjectview(resouceProjectViewResponces);
				responceview.setReportview("ProjectBasedView");
				responceview.setAvailableresource(resourceBasedViewResponses);
				return ResponseHandler.generateResponse("List of Projects", true, HttpStatus.OK, responceview);
			} else {
				return ResponseHandler.generateResponse("This User don't have access to page", false, HttpStatus.OK,
						null);
			}

		} catch (Exception e) {
			LOGGER.error("Internal Server Error:" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@GetMapping("/getslasview")
	public ResponseEntity<Object> getSlaview(Authentication authentication) {
		try {
			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);
			List<G3CEmployeeMasterModel> getavailableresource = new ArrayList<>();
			switch (userDetails.getRolename()) {
			case "ADMIN":
				getavailableresource = g3cEmployeeRepository.findByAvailableResource();
				break;
			case "BUSINESS":
				getavailableresource = g3cEmployeeRepository.findByCostcenter(userDetails.getCost_center());
				break;
			default:
				return ResponseHandler.generateResponse("Un_Authorized user", false, HttpStatus.OK, null);
			}
			List<ResourceBasedViewResponse> resourceBasedViewResponses = new ArrayList<>();
			for (G3CEmployeeMasterModel currentEmployeeMasterModel : getavailableresource) {
				ResourceBasedViewResponse currentBasedViewResponse = new ResourceBasedViewResponse();
				currentBasedViewResponse.setId(currentEmployeeMasterModel.getId());
				currentBasedViewResponse.setLevel(currentEmployeeMasterModel.getLevel());
				currentBasedViewResponse.setHr_id(currentEmployeeMasterModel.getHrid());
				currentBasedViewResponse.setEmp_name(currentEmployeeMasterModel.getEmp_name());
				currentBasedViewResponse.setEmail(currentEmployeeMasterModel.getEmail());
				currentBasedViewResponse.setCapacity(currentEmployeeMasterModel.getCapacity());
				currentBasedViewResponse.setShortid(currentEmployeeMasterModel.getShortid());
				resourceBasedViewResponses.add(currentBasedViewResponse);
			}
			String role = userDetails.getRolename();
			if (role.equalsIgnoreCase("admin")) {
				List<SLAModel> slalist = slaRepository.findAll();
				List<ResourceSLAViewResponse> resourceSLAViewResponses = new ArrayList<>();
				for (SLAModel currentModel : slalist) {
					if (Boolean.TRUE.equals(currentModel.getIs_active())) {
						ResourceSLAViewResponse currentResourceSLAViewResponse = new ResourceSLAViewResponse();
						currentResourceSLAViewResponse.setId(currentModel.getId());
						currentResourceSLAViewResponse.setSlaid(currentModel.getSlaid());
						currentResourceSLAViewResponse.setSlaname(currentModel.getSlaname());
						currentResourceSLAViewResponse.setResources(currentModel.getResources());
						resourceSLAViewResponses.add(currentResourceSLAViewResponse);
					}
				}
				ResourceReportView responceview = new ResourceReportView();
				responceview.setReportview("SLABasedView");
				responceview.setSlaview(resourceSLAViewResponses);
				responceview.setAvailableresource(resourceBasedViewResponses);
				return ResponseHandler.generateResponse("List of SLA's", true, HttpStatus.OK, responceview);
			} else if (role.equalsIgnoreCase("business")) {
				List<SLAModel> slalist = slaRepository.findByService_provider_shortid(userDetails.getShortid());
				List<ResourceSLAViewResponse> resourceSLAViewResponses = new ArrayList<>();
				for (SLAModel currentModel : slalist) {
					ResourceSLAViewResponse currentResourceSLAViewResponse = new ResourceSLAViewResponse();
					currentResourceSLAViewResponse.setId(currentModel.getId());
					currentResourceSLAViewResponse.setSlaid(currentModel.getSlaid());
					currentResourceSLAViewResponse.setSlaname(currentModel.getSlaname());
					currentResourceSLAViewResponse.setResources(currentModel.getResources());
					resourceSLAViewResponses.add(currentResourceSLAViewResponse);
				}
				ResourceReportView responceview = new ResourceReportView();
				responceview.setReportview("SLABasedView");
				responceview.setSlaview(resourceSLAViewResponses);
				responceview.setAvailableresource(resourceBasedViewResponses);
				return ResponseHandler.generateResponse("List of SLA's", true, HttpStatus.OK, responceview);
			} else {
				return ResponseHandler.generateResponse("This User don't have access to page", false, HttpStatus.OK,
						null);
			}

		} catch (Exception e) {
			LOGGER.error("Internal Server Error:" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@GetMapping("/getresourceview")
	public ResponseEntity<Object> getResourceview(Authentication authentication) {
		try {
			ResourceReportView responceview = new ResourceReportView();
			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);
			String role = userDetails.getRolename();
			if (role.equalsIgnoreCase("admin")) {
				List<G3CEmployeeMasterModel> employeelist = g3cEmployeeRepository.findByMappedUser();
				responceview = resourceAllocationService.getResourceReportVeiw(responceview, employeelist);
				return ResponseHandler.generateResponse("List of Resource Based View", true, HttpStatus.OK,
						responceview);
			} else if (role.equalsIgnoreCase("business")) {
				List<G3CEmployeeMasterModel> employeelist = g3cEmployeeRepository
						.findByMappedUser(userDetails.getCost_center());
				responceview = resourceAllocationService.getResourceReportVeiw(responceview, employeelist);
				return ResponseHandler.generateResponse("List of Resource Based View", true, HttpStatus.OK,
						responceview);
			} else {
				return ResponseHandler.generateResponse("This User don't have access to page", false, HttpStatus.OK,
						null);
			}

		} catch (Exception e) {
			LOGGER.error("Internal Server Error:" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@GetMapping("/getavailableresource")
	public ResponseEntity<Object> getAvailableResource() {
		try {

			List<G3CEmployeeMasterModel> getresource = g3cEmployeeRepository.findByAvailableResource();
			return ResponseHandler.generateResponse("List of Projects", true, HttpStatus.OK, getresource);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error:" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@GetMapping("/getresourcedetails/{user_id}")
	public ResponseEntity<Object> FindResourceDetaild(@PathVariable(value = "user_id") Long user_id) {
		try {
			return g3cEmployeeRepository.findById(user_id).map(empdata -> {
				ResourceCapacityView resourceCapacityView = new ResourceCapacityView();
				resourceCapacityView.setSla_count(empdata.getResource_mapping().size());
				resourceCapacityView.setAllocate_capacity(empdata.getCapacity());
				resourceCapacityView.setAvailable_capacity(100 - empdata.getCapacity());
				resourceCapacityView.setBilled_hours(00);
				return ResponseHandler.generateResponse("Resource Allocation Details", true, HttpStatus.OK,
						resourceCapacityView);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: User ID " + user_id + " Doesn't exist");
				return ResponseHandler.generateResponse("User ID " + user_id + " Doesn't exist", false, HttpStatus.OK,
						null);
			});
		} catch (Exception e) {
			LOGGER.error("Internal Server Error:" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@PutMapping("/updateresourceallocation/{resourcea_allo_id}")
	public ResponseEntity<Object> updateResourceAllocation(
			@PathVariable(value = "resourcea_allo_id") Long resourcea_allo_id,
			@RequestBody ResourceAllocationModel updateMappingModel) {
		try {
			return resourceAllocationRepository.findById(resourcea_allo_id).map(resourcemappingdata -> {

				G3CEmployeeMasterModel currentempdata = g3cEmployeeRepository.findById(resourcemappingdata.getUserid())
						.get();
				currentempdata.setCapacity(currentempdata.getCapacity() - resourcemappingdata.getCapcity());
				if ((currentempdata.getCapacity() + updateMappingModel.getCapcity()) <= 100) {
					resourcemappingdata.setCapcity(updateMappingModel.getCapcity());

					currentempdata.setCapacity(currentempdata.getCapacity() + updateMappingModel.getCapcity());
					g3cEmployeeRepository.save(currentempdata);
					resourceAllocationRepository.save(resourcemappingdata);

					return ResponseHandler.generateResponse("Resource Allocation Details", true, HttpStatus.OK,
							resourcemappingdata);
				} else {
					return ResponseHandler.generateResponse("Resource Availablity is more than assigned", false,
							HttpStatus.OK, null);
				}

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Resource Mapping ID " + resourcea_allo_id + " Doesn't exist");
				return ResponseHandler.generateResponse(
						"Resource Mapping ID ID " + resourcea_allo_id + " Doesn't exist", false, HttpStatus.OK, null);
			});
		} catch (Exception e) {
			LOGGER.error("Internal Server Error:" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@PostMapping("/addresource/{projectid}/{slaid}")
	public ResponseEntity<Object> addAdditionalResource(@PathVariable(value = "projectid") Long projectid,
			@PathVariable(value = "slaid") Long slaid, @Valid @RequestBody ResourceMapping resourceAllocationRequest) {
		try {
			Optional<ProjectModel> projectdatas = projectRepository.findById(projectid);
			if (projectdatas.isPresent()) {
				ProjectModel projectdata = projectdatas.get();
				Optional<SLAModel> sladatas = slaRepository.findById(slaid);
				if (sladatas.isPresent()) {
					SLAModel sladata = sladatas.get();

					ResourceAllocationModel resourceAllocationModel = new ResourceAllocationModel();
					resourceAllocationModel.setProject(projectdata);
					resourceAllocationModel.setProjectid(projectdata.getId());
					resourceAllocationModel.setProject_name(projectdata.getProject_name());
					resourceAllocationModel.setSla(sladata);
					resourceAllocationModel.setSlaid(sladata.getId());
					resourceAllocationModel.setSla_name(sladata.getSlaid());
					resourceAllocationModel.setResource_name(resourceAllocationRequest.getResource_name());
					resourceAllocationModel.setResource_email(resourceAllocationRequest.getResource_email());
					resourceAllocationModel.setResource_shortid(resourceAllocationRequest.getResource_shortid());
					resourceAllocationModel.setHrid(resourceAllocationRequest.getHrid());
					resourceAllocationModel.setCapcity(resourceAllocationRequest.getCapcity());
					resourceAllocationModel.setLevel(resourceAllocationRequest.getLevel());

					Optional<G3CEmployeeMasterModel> empdata = g3cEmployeeRepository
							.findById(resourceAllocationRequest.getUserid());

					if (empdata.isPresent()) {
						G3CEmployeeMasterModel currentempdata = empdata.get();

						ResourceAllocationModel checkresourceallocated = resourceAllocationRepository
								.findBySlaIdAndUserId(sladata.getId(), currentempdata.getId());

						if (checkresourceallocated != null) {
							LOGGER.error(" Employee ID: " + resourceAllocationRequest.getUserid()
									+ " Already Mapped in SLA: " + sladata.getSlaid());
							return ResponseHandler.generateResponse(
									"Exceptions happen!: Employee ID: " + resourceAllocationRequest.getUserid()
											+ " Already Mapped in SLA: " + sladata.getSlaid(),
									false, HttpStatus.OK, null);
						} else {

							resourceAllocationModel.setUserid(currentempdata.getId());
							resourceAllocationModel.setUser(currentempdata);

							if ((currentempdata.getCapacity() + resourceAllocationRequest.getCapcity()) <= 100) {
								currentempdata.setCapacity(
										currentempdata.getCapacity() + resourceAllocationRequest.getCapcity());

								ResourceAllocationModel resourceAllocationsavedata = resourceAllocationRepository
										.save(resourceAllocationModel);
								g3cEmployeeRepository.save(currentempdata);

								return ResponseHandler.generateResponse("Resource Allocation Created Successfully",
										true, HttpStatus.OK, resourceAllocationsavedata);

							} else {
								return ResponseHandler.generateResponse(
										100 - currentempdata.getCapacity() + "% of capacity is available for user "
												+ resourceAllocationRequest.getResource_name(),
										false, HttpStatus.OK, null);
							}
						}

					} else {
						LOGGER.error("Exceptions happen!: Employee ID " + resourceAllocationRequest.getUserid()
								+ " Doesn't exist");
						return ResponseHandler.generateResponse(
								"Employee ID " + resourceAllocationRequest.getUserid() + " Doesn't exist", false,
								HttpStatus.OK, null);
					}
				} else {
					LOGGER.error("Exceptions happen!: SLA ID " + slaid + " Doesn't exist");
					return ResponseHandler.generateResponse("SLA ID " + slaid + " Doesn't exist", false, HttpStatus.OK,
							null);
				}

			} else {
				LOGGER.error("Exceptions happen!: Project ID " + projectid + " Doesn't exist");
				return ResponseHandler.generateResponse("Project ID " + projectid + " Doesn't exist", false,
						HttpStatus.OK, null);
			}

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while getall:" + e.getMessage());
			return ResponseHandler.generateResponse(e.getMessage(), false, HttpStatus.OK, null);
		}

	}

	@GetMapping("/getresourcecapacity0fMonth")
	public ResponseEntity<Object> findResourceCapacityofMonth() {
		try {

			resourceScheduler.scheduleDailyCapacityPercent();

			return ResponseHandler.generateResponse("Capacity for a month", true, HttpStatus.OK, null);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error:" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@GetMapping("/getresourcecapacityaverage")
	public ResponseEntity<Object> findResourceCapacityofYear() {
		try {

//			resourceScheduler.scheduledMonthlyCapacity();

//			mySSCSchedulerService.updatePreinvoiceStatus();

//			mySSCSchedulerService.getInvoicesForPreinvoice();
			mySSCSchedulerService.getInvoiceStatusFromMySSC();

			return ResponseHandler.generateResponse("Success", true, HttpStatus.OK, null);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error:" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

}

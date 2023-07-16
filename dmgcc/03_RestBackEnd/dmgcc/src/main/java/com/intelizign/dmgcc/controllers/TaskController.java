package com.intelizign.dmgcc.controllers;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.intelizign.dmgcc.authendication.AzureUserInfo;
import com.intelizign.dmgcc.authendication.UserDetailsImpl;
import com.intelizign.dmgcc.models.FileUploadModel;
import com.intelizign.dmgcc.models.G3CEmployeeMasterModel;
import com.intelizign.dmgcc.models.ProjectModel;
import com.intelizign.dmgcc.models.ResourceAllocationModel;
import com.intelizign.dmgcc.models.SLAModel;
import com.intelizign.dmgcc.models.TaskModel;
import com.intelizign.dmgcc.notification.NotificationServices;
import com.intelizign.dmgcc.pojoclass.RevisedTarget;
import com.intelizign.dmgcc.repositories.FileUploadRepository;
import com.intelizign.dmgcc.repositories.G3CEmployeeRepository;
import com.intelizign.dmgcc.repositories.NotificationRepository;
import com.intelizign.dmgcc.repositories.ProjectRepository;
import com.intelizign.dmgcc.repositories.ResourceAllocationRepository;
import com.intelizign.dmgcc.repositories.SLARepository;
import com.intelizign.dmgcc.repositories.TaskRepository;
import com.intelizign.dmgcc.request.SupportingFiles;
import com.intelizign.dmgcc.request.TaskRequest;
import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.services.EmailServiceImpl;
import com.intelizign.dmgcc.services.FilesStorageServicePath;

@RestController
@RequestMapping("/task")
public class TaskController {

	@Autowired
	FilesStorageServicePath storageServicepath;

	@Autowired
	ProjectRepository projectRepository;

	@Autowired
	SLARepository slaRepository;

	@Autowired
	TaskRepository taskRepository;

	@Autowired
	ResourceAllocationRepository resourceAllocationRepository;

	@Autowired
	G3CEmployeeRepository g3cEmployeeRepository;

	@Autowired
	private FileUploadRepository fileUploadRepository;

	@Autowired
	private EmailServiceImpl emailService;

	@Autowired
	private AzureUserInfo azureUserInfo;

	@Autowired
	private Environment env;

	@Autowired
	SimpMessagingTemplate template;

	@Autowired
	private NotificationRepository notificationRepository;

	@Autowired
	private NotificationServices notificationServices;

	public final Logger LOGGER = LogManager.getLogger(TaskController.class);

	@GetMapping("")
	public ResponseEntity<Object> FindAllTasks(@RequestParam String Searchkeyword,
			@PageableDefault(size = 10, page = 0, sort = "id", direction = Direction.DESC) Pageable pageable,
			Authentication authentication) {
		try {
			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);
			switch (userDetails.getRolename()) {
			case "ADMIN":
				Page<TaskModel> tasks = taskRepository.findByactive(true, Searchkeyword, pageable);
				return ResponseHandler.generateResponse("List of Tasks", true, HttpStatus.OK, tasks);
			case "BUSINESS", "CUSTOMER":
				Page<TaskModel> tasks_by_role = taskRepository.findbyTaskBasedOnRole(true, userDetails.getShortid(),
						Searchkeyword, pageable);
				return ResponseHandler.generateResponse("List of Tasks", true, HttpStatus.OK, tasks_by_role);

			case "EMPLOYEE":
				Page<TaskModel> tasks_by_employee = taskRepository.findbyTaskByEmployee(true, userDetails.getShortid(),
						Searchkeyword, pageable);
				return ResponseHandler.generateResponse("List of Tasks", true, HttpStatus.OK, tasks_by_employee);

			default:
				LOGGER.error("User doesn't have the access ");
				return ResponseHandler.generateResponse("User doesn't have the access", true, HttpStatus.OK, null);

			}

		} catch (Exception e) {
			LOGGER.error("Internal Server Error:" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@GetMapping("/settaskstatus/{task_id}/{status}")
	public ResponseEntity<Object> setTaskStatus(@PathVariable Long task_id, @PathVariable String status,
			Authentication authentication) {
		try {
			return taskRepository.findById(task_id).map(taskdata -> {
				UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
				taskdata.setTask_status(status);
				taskdata.setUpdatedBy(userDetails.getShortid());
				taskdata.setUpdatedDate(LocalDate.now());
				taskRepository.save(taskdata);
				if (status.equals("Closed")) {
					// Send Notification

					notificationServices.NotificationPojo("G3C Admin", taskdata.getProjectid().getService_provider(),
							taskdata.getProjectid().getService_provider_shortid(), "Task has been Closed",
							"operation/task-management");

					// send mail to assigned user

					Map<String, Object> task_asignee_model = new HashMap<>();
					task_asignee_model.put("reciverName", taskdata.getProjectid().getService_provider());
					emailService.sendTaskAssignedMail(
							taskdata.getProjectid().getBizcase().getLead().getService_provider_email_id(),
							"Task has been Closed", task_asignee_model);
				}
				return ResponseHandler.generateResponse("Task Status Updated", true, HttpStatus.OK, null);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Task ID " + task_id + "  Doesn't exist");
				return ResponseHandler.generateResponse("Task ID: " + task_id + " Doesn't exist", false, HttpStatus.OK,
						null);
			});
		} catch (Exception e) {
			LOGGER.error("Exceptions happen!:" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	@PostMapping("/reopen/{task_id}/{status}")
	public ResponseEntity<Object> reOpenTask(@PathVariable Long task_id, @PathVariable String status,
			Authentication authentication, @Valid @RequestBody TaskModel taskRequest) {
		try {
			return taskRepository.findById(task_id).map(taskdata -> {
				UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
				taskdata.setTask_status(status);
				taskdata.setReopenBy(userDetails.getShortid());
				taskdata.setReopenDate(LocalDate.now());
				taskdata.setReopenComments(taskRequest.getReopenComments());
				taskRepository.save(taskdata);

				// Send Notification

				notificationServices.NotificationPojo("G3C Admin", taskdata.getProjectid().getService_provider(),
						taskdata.getProjectid().getService_provider_shortid(), "Task has been Re-Opened",
						"operation/task-management");

				// send mail to assigned user

				Map<String, Object> task_asignee_model = new HashMap<>();
				task_asignee_model.put("reciverName", taskdata.getProjectid().getService_provider());
				emailService.sendTaskAssignedMail(
						taskdata.getProjectid().getBizcase().getLead().getService_provider_email_id(),
						"Task has been Re-Opened", task_asignee_model);

				return ResponseHandler.generateResponse("Task Status Updated", true, HttpStatus.OK, null);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Task ID " + task_id + "  Doesn't exist");
				return ResponseHandler.generateResponse("Task ID: " + task_id + " Doesn't exist", false, HttpStatus.OK,
						null);
			});
		} catch (Exception e) {
			LOGGER.error("Exceptions happen!:" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	@GetMapping("/gettask/{task_id}")
	public ResponseEntity<Object> getTask(@PathVariable Long task_id) {
		try {
			return taskRepository.findById(task_id).map(taskdata -> {
				return ResponseHandler.generateResponse("Task Information", true, HttpStatus.OK, taskdata);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Task ID " + task_id + "  Doesn't exist");
				return ResponseHandler.generateResponse("Task ID: " + task_id + " Doesn't exist", false, HttpStatus.OK,
						null);
			});
		} catch (Exception e) {
			LOGGER.error("Exceptions happen!:" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	@GetMapping("/getprojects")
	public ResponseEntity<Object> getProjects(Authentication authentication) {
		try {
			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);

			if (userDetails.getRolename().equalsIgnoreCase("ADMIN")) {
				List<ProjectModel> projectdetails = projectRepository.findAll();
				return ResponseHandler.generateResponse("List of Projects", true, HttpStatus.OK, projectdetails);
			} else if (userDetails.getRolename().equalsIgnoreCase("BUSINESS")
					|| userDetails.getRolename().equalsIgnoreCase("CUSTOMER")) {
				List<ProjectModel> projectdetails = projectRepository.findProjectBasedOnuser(userDetails.getShortid());
				return ResponseHandler.generateResponse("List of Projects", true, HttpStatus.OK, projectdetails);
			} else {

				return ResponseHandler.generateResponse("User don't have access to create task", false, HttpStatus.OK,
						null);
			}

		} catch (Exception e) {
			LOGGER.error("Exceptions happen! while getting projects based on Athuenticated user" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@GetMapping("/getslabyproject/{project_id}")
	public ResponseEntity<Object> findSLAByProjectId(@PathVariable Long project_id) {
		try {
			return projectRepository.findById(project_id).map(project_data -> {
				List<SLAModel> sladatas = slaRepository.findByProjectIdAndTaskenable(project_id, true);
				return ResponseHandler.generateResponse("SLA Details", true, HttpStatus.OK, sladatas);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Project ID " + project_id + "  Doesn't exist");
				return ResponseHandler.generateResponse("Project ID: " + project_id + " Doesn't exist", false,
						HttpStatus.OK, null);
			});
		} catch (Exception e) {
			LOGGER.error("Exceptions happen!:Project ID " + project_id + " Doesn't exist DB Error: " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	@GetMapping("/getresourcebysla/{id}")
	public ResponseEntity<Object> findResourceBySLA(@PathVariable Long id) {
		try {
			return slaRepository.findById(id).map(requestData -> {
				List<ResourceAllocationModel> resourceAllocationModels = resourceAllocationRepository
						.findBySlaId(requestData.getId());
				return ResponseHandler.generateResponse("Resources for SLA", true, HttpStatus.OK,
						resourceAllocationModels);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: " + id + " SLA ID Doesn't exist");
				return ResponseHandler.generateResponse(id + " SLA ID Doesn't exist", false, HttpStatus.OK, null);
			});
		} catch (Exception e) {
			LOGGER.error("Exceptions happen!:SLA ID " + id + " Doesn't exist DB Error: " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	@PostMapping("")
	public ResponseEntity<Object> createTask(@Valid @RequestBody TaskRequest taskRequest,
			Authentication authentication) {
		try {
			return projectRepository.findById(taskRequest.getProject_id()).map(projectData -> {

				return slaRepository.findById(taskRequest.getSla_id()).map(slaData -> {
					UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
					List<RevisedTarget> revisedTarget = new ArrayList<>();
					TaskModel task_details = new TaskModel();
					Integer count = taskRepository.getdataCount();

					if (count == null) {
						count = 0;
					}
					String generated_id = String.format("%03d", (count++));
					task_details.setTaskid("TS" + generated_id);
//					task_details.setTaskid(taskRequest.getTaskid());
					task_details.setTaskname(taskRequest.getTaskname());

					DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd-MM-yyyy");
					LocalDateTime localdate = LocalDate.parse(taskRequest.getTasktarget(), dtf).atStartOfDay();

					task_details.setTasktarget(localdate);
					task_details.setTaskfile(taskRequest.getTaskfile());
					task_details.setTaskdescription(taskRequest.getTaskdescription());
					task_details.setAssigne_shortId(taskRequest.getAssigne_shortId());
					task_details.setAssigne_email(taskRequest.getAssigne_email());
					task_details.setAssigned_name(taskRequest.getAssigned_name());
					task_details.setProjectId(projectData);
					task_details.setCreatedBy(userDetails.getShortid());
					task_details.setCreatedDate(LocalDate.now());
					task_details.setTask_status("Open");
					task_details.setProject_name(projectData.getProject_name());
					task_details.setSlaId(slaData);
					task_details.setRevisedTarget(revisedTarget);
					Optional<G3CEmployeeMasterModel> assigne = g3cEmployeeRepository.findById(taskRequest.getUser_id());
					if (assigne.isPresent()) {
						task_details.setAssigne(assigne.get());
						taskRepository.save(task_details);

						// Send Notification

						notificationServices.NotificationPojo("G3C Admin", assigne.get().getEmp_name(),
								assigne.get().getShortid(), "New Task has assign to you", "operation/task-management");

						// send mail to assigned user

						Map<String, Object> task_asignee_model = new HashMap<>();
						task_asignee_model.put("reciverName", taskRequest.getAssigned_name());
						emailService.sendTaskAssignedMail(taskRequest.getAssigne_email(), "G3C New Task Assigned",
								task_asignee_model);

						for (SupportingFiles taskfile : taskRequest.getTaskfile()) {
							FileUploadModel fileUploadModel = new FileUploadModel();
							fileUploadModel.setId(taskfile.getId());
							fileUploadModel.setSupporting_files_name(taskfile.getSupporting_files_name());
							fileUploadModel.setSupporting_files_url(taskfile.getSupporting_files_url());
							fileUploadModel.setMapped(true);
							fileUploadRepository.save(fileUploadModel);
						}
						return ResponseHandler.generateResponse("Task Created Successfully", true, HttpStatus.OK,
								task_details);
					} else {
						LOGGER.error("Exceptions happen!: " + taskRequest.getUser_id() + " User ID Doesn't exist");
						return ResponseHandler.generateResponse(taskRequest.getUser_id() + " User ID Doesn't exist",
								false, HttpStatus.OK, null);
					}

				}).orElseGet(() -> {
					LOGGER.error("Exceptions happen!: " + taskRequest.getSla_id() + " SLA ID Doesn't exist");
					return ResponseHandler.generateResponse(taskRequest.getSla_id() + " SLA ID Doesn't exist", false,
							HttpStatus.OK, null);
				});

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: " + taskRequest.getProject_id() + " project id Doesn't exist");
				return ResponseHandler.generateResponse(taskRequest.getProject_id() + " project id Doesn't exist",
						false, HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Exceptions happen!:Task creation: " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	@PutMapping("/{task_id}")
	public ResponseEntity<Object> updateTask(@PathVariable(value = "task_id") Long task_id,
			@Valid @RequestBody TaskRequest taskRequest, Authentication authentication) {
		try {

			return taskRepository.findById(task_id).map(task_details -> {
				UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
				if (!Boolean.TRUE.equals(task_details.getAccepted())) {
					List<RevisedTarget> revisedTarget = new ArrayList<>();
					task_details.setTaskid(taskRequest.getTaskid());
					task_details.setTaskname(taskRequest.getTaskname());

					DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd-MM-yyyy");
					LocalDateTime localdate = LocalDate.parse(taskRequest.getTasktarget(), dtf).atStartOfDay();

					task_details.setTasktarget(localdate);
					task_details.setTaskfile(taskRequest.getTaskfile());
					task_details.setTaskdescription(taskRequest.getTaskdescription());
					task_details.setAssigne_shortId(taskRequest.getAssigne_shortId());
					task_details.setAssigne_email(taskRequest.getAssigne_email());
					task_details.setAssigned_name(taskRequest.getAssigned_name());
					task_details.setUpdatedBy(userDetails.getShortid());
					task_details.setUpdatedDate(LocalDate.now());
					task_details.setRevisedTarget(revisedTarget);
					Optional<G3CEmployeeMasterModel> assigne = g3cEmployeeRepository.findById(taskRequest.getUser_id());
					if (assigne.isPresent()) {

						task_details.setAssigne(assigne.get());
						taskRepository.save(task_details);

						// Send Notification
						notificationServices.NotificationPojo("G3C Admin", assigne.get().getEmp_name(),
								assigne.get().getShortid(), "New Task has assign to you", "operation/task-management");

						// send mail to assigned user

						Map<String, Object> task_asignee_model = new HashMap<>();
						task_asignee_model.put("reciverName", taskRequest.getAssigned_name());
						emailService.sendTaskAssignedMail(taskRequest.getAssigne_email(), "G3C New Task Assigned",
								task_asignee_model);

						for (SupportingFiles taskfile : taskRequest.getTaskfile()) {
							FileUploadModel fileUploadModel = new FileUploadModel();
							fileUploadModel.setId(taskfile.getId());
							fileUploadModel.setSupporting_files_name(taskfile.getSupporting_files_name());
							fileUploadModel.setSupporting_files_url(taskfile.getSupporting_files_url());
							fileUploadModel.setMapped(true);
							fileUploadRepository.save(fileUploadModel);
						}
						return ResponseHandler.generateResponse("Task Update Successfully", true, HttpStatus.OK,
								task_details);
					} else {
						LOGGER.error("Exceptions happen!: " + taskRequest.getUser_id() + " User ID Doesn't exist");
						return ResponseHandler.generateResponse(taskRequest.getUser_id() + " User ID Doesn't exist",
								false, HttpStatus.OK, null);
					}

				} else {
					return ResponseHandler.generateResponse("Approved task not able to update", true, HttpStatus.OK,
							null);
				}

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: " + task_id + " task_id Doesn't exist");
				return ResponseHandler.generateResponse(task_id + " task_id Doesn't exist", false, HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Exceptions happen!:Task creation: " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	@PostMapping("/updateapproval/{task_id}")
	public ResponseEntity<Object> assigneeApproval(@PathVariable(value = "task_id") Long task_id) {
		try {
			return taskRepository.findById(task_id).map(taskData -> {

				taskData.setAccepted(true);
				taskRepository.save(taskData);
				return ResponseHandler.generateResponse("Task Accepted", true, HttpStatus.OK, taskData);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: " + task_id + " task_id Doesn't exist");
				return ResponseHandler.generateResponse(task_id + " task_id Doesn't exist", false, HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Exceptions happen!:Task creation: " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	@PutMapping("/updaterevisedtask/{task_id}")
	public ResponseEntity<Object> updateAssignedTask(@PathVariable(value = "task_id") Long task_id,
			@Valid @RequestBody TaskRequest taskRequest) {
		try {

			return taskRepository.findById(task_id).map(task_Data -> {
				if (Boolean.TRUE.equals(task_Data.getAccepted())) {

					List<RevisedTarget> revisedTarget = task_Data.getRevisedTarget();
					RevisedTarget currentreRevisedTarget = new RevisedTarget();
					currentreRevisedTarget.setDescription(task_Data.getTaskdescription());
					currentreRevisedTarget.setRevisedDate(task_Data.getTasktarget().toString());
					revisedTarget.add(currentreRevisedTarget);

					DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd-MM-yyyy");
					LocalDateTime localdate = LocalDate.parse(taskRequest.getTasktarget(), dtf).atStartOfDay();

					task_Data.setTasktarget(localdate);
					task_Data.setTaskdescription(taskRequest.getTaskdescription());
					task_Data.setTask_status("open");
					task_Data.setBillableHours(taskRequest.getBillableHours());
					task_Data.setRevisedTarget(revisedTarget);

					taskRepository.save(task_Data);

					return ResponseHandler.generateResponse("Task Update Successfully", true, HttpStatus.OK, task_Data);
				} else {
					return ResponseHandler.generateResponse("check wether assigned user accepted the task", true,
							HttpStatus.OK, null);
				}

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: " + task_id + " task_id Doesn't exist");
				return ResponseHandler.generateResponse(task_id + " task_id Doesn't exist", false, HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Exceptions happen!:Task creation: " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}
}

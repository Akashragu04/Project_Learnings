package com.intelizign.dmgcc.controllers;

import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
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
import com.intelizign.dmgcc.models.G3CEmployeeMasterModel;
import com.intelizign.dmgcc.models.ProjectModel;
import com.intelizign.dmgcc.models.SLAModel;
import com.intelizign.dmgcc.models.TaskModel;
import com.intelizign.dmgcc.models.TimesheetModel;
import com.intelizign.dmgcc.repositories.G3CEmployeeRepository;
import com.intelizign.dmgcc.repositories.ProjectRepository;
import com.intelizign.dmgcc.repositories.ResourceAllocationRepository;
import com.intelizign.dmgcc.repositories.SLARepository;
import com.intelizign.dmgcc.repositories.TaskRepository;
import com.intelizign.dmgcc.repositories.TimesheetRepository;
import com.intelizign.dmgcc.request.TimeSheetRequest;
import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.services.ResourceAllocationService;
import com.intelizign.dmgcc.services.ResourceReportService;

@RestController
@RequestMapping("/timesheet")
public class TimeSheetController {

	public final Logger LOGGER = LogManager.getLogger(TimeSheetController.class);
	private static final DecimalFormat doubleFormat = new DecimalFormat("0.00");

	@Autowired
	ProjectRepository projectRepository;

	@Autowired
	G3CEmployeeRepository g3cEmployeeRepository;

	@Autowired
	TaskRepository taskRepository;

	@Autowired
	TimesheetRepository timesheetRepository;

	@Autowired
	SLARepository slaRepository;

	@Autowired
	ResourceAllocationRepository resourceAllocationRepository;

	@Autowired
	ResourceReportService resourceReportService;

	@Autowired
	ResourceAllocationService resourceAllocationService;

	@Autowired
	private AzureUserInfo azureUserInfo;

	@GetMapping("")
	public ResponseEntity<Object> FindAllTimehsheets(
			@PageableDefault(size = 10, page = 0, sort = "id", direction = Direction.DESC) Pageable pageable,
			Authentication authentication) {
		try {
			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);
			switch (userDetails.getRolename()) {
			case "ADMIN":
				Page<TimesheetModel> timesheets = timesheetRepository.findByActive(true, pageable);
				return ResponseHandler.generateResponse("List of Timesheets", true, HttpStatus.OK, timesheets);
			case "BUSINESS", "CUSTOMER":
				Page<TimesheetModel> timesheets_by_role = timesheetRepository.findbyTimesheetsBasedOnRole(true,
						userDetails.getShortid(), pageable);
				return ResponseHandler.generateResponse("List of Timesheets", true, HttpStatus.OK, timesheets_by_role);

			case "EMPLOYEE":
				Page<TimesheetModel> timesheets_by_employee = timesheetRepository.findbyTimesheetsByEmployee(true,
						userDetails.getShortid(), pageable);
				return ResponseHandler.generateResponse("List of Timesheets", true, HttpStatus.OK,
						timesheets_by_employee);

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

	@GetMapping("/{id}")
	public ResponseEntity<Object> findbyTimesheet(@PathVariable Long id) {
		try {
			return timesheetRepository.findById(id).map(timesheetdata -> {
				if (Boolean.TRUE.equals(timesheetdata.getActive())) {
					return ResponseHandler.generateResponse("Timesheet Found", true, HttpStatus.OK, timesheetdata);
				} else {
					return ResponseHandler.generateResponse("Timesheet is not active", true, HttpStatus.OK, null);
				}
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: " + id + " Timesheet ID Doesn't exist");
				return ResponseHandler.generateResponse(id + " Timesheet ID Doesn't exist", false, HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Exceptions happen!:Task ID " + id + " Doesn't exist DB Error: " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@GetMapping("/getprojectsbillablehrs")
	public ResponseEntity<Object> getProjectswithHrs(@RequestParam String Searchkeyword,
			@PageableDefault(size = 10, page = 0, sort = "id", direction = Direction.DESC) Pageable pageable,
			Authentication authentication) {
		try {
			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);

			if (userDetails.getRolename().equalsIgnoreCase("ADMIN")) {
				Page<ProjectModel> projectdetails = projectRepository.findAllbysearch(Searchkeyword, pageable);
				projectdetails.stream().forEach(project -> {
					List<TimesheetModel> timesheetModel = timesheetRepository.getTimeSheets(project.getId(), true);
					if (timesheetModel != null) {
						double total = timesheetModel.stream().mapToDouble(timesheet -> timesheet.getWorking_hours())
								.sum();
						project.setWorkinghrs(total);

					}
				});

//				Page<ProjectTimesheetGrid> responseProject = new Pageable();
//
//				BeanUtils.copyProperties(slaModel, mySSSLAModel);

				return ResponseHandler.generateResponse("List of Projects", true, HttpStatus.OK, projectdetails);
			} else if (userDetails.getRolename().equalsIgnoreCase("BUSINESS")
					|| userDetails.getRolename().equalsIgnoreCase("CUSTOMER")) {
				Page<ProjectModel> projectdetails = projectRepository.findProjectBasedOnuser(userDetails.getShortid(),
						Searchkeyword, pageable);
				projectdetails.stream().forEach(project -> {
					List<TimesheetModel> timesheetModel = timesheetRepository.getTimeSheets(project.getId(), true);
					if (timesheetModel != null) {
						double total = timesheetModel.stream().mapToDouble(timesheet -> timesheet.getWorking_hours())
								.sum();
						project.setWorkinghrs(total);

					}
				});
				return ResponseHandler.generateResponse("List of Projects", true, HttpStatus.OK, projectdetails);
			} else if (userDetails.getRolename().equalsIgnoreCase("EMPLOYEE")) {
				List<ProjectModel> projectdata = resourceAllocationRepository.findProjects(userDetails.getId(),
						Searchkeyword, pageable);
				Page<ProjectModel> projectdetails = resourceReportService.getPaginationFromList(projectdata, pageable);
				projectdetails.stream().forEach(project -> {
					List<TimesheetModel> timesheetModel = timesheetRepository.getTimeSheets(project.getId(), true);
					if (timesheetModel != null) {
						double total = timesheetModel.stream().mapToDouble(timesheet -> timesheet.getWorking_hours())
								.sum();
						project.setWorkinghrs(total);
					}
				});
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

	@GetMapping("/getprojects")
	public ResponseEntity<Object> getProjects(@RequestParam String Searchkeyword,
			@PageableDefault(size = 10, page = 0, sort = "id", direction = Direction.DESC) Pageable pageable,
			Authentication authentication) {
		try {
			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);

			if (userDetails.getRolename().equalsIgnoreCase("ADMIN")) {
				Page<ProjectModel> projectdetails = projectRepository.findAllbysearch(Searchkeyword, pageable);
				resourceReportService.setBillableHours(projectdetails);
				return ResponseHandler.generateResponse("List of Projects", true, HttpStatus.OK, projectdetails);
			} else if (userDetails.getRolename().equalsIgnoreCase("BUSINESS")
					|| userDetails.getRolename().equalsIgnoreCase("CUSTOMER")) {
				Page<ProjectModel> projectdetails = projectRepository.findProjectBasedOnuser(userDetails.getShortid(),
						Searchkeyword, pageable);
				resourceReportService.setBillableHours(projectdetails);
				return ResponseHandler.generateResponse("List of Projects", true, HttpStatus.OK, projectdetails);
			} else if (userDetails.getRolename().equalsIgnoreCase("EMPLOYEE")) {
				List<ProjectModel> projectdata = resourceAllocationRepository
						.findProjects(userDetails.getId(), Searchkeyword, pageable).stream().distinct().toList();
				Page<ProjectModel> projectdetails = resourceReportService.getPaginationFromList(projectdata, pageable);
				resourceReportService.setBillableHours(projectdetails);
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

	@GetMapping("/getslas/{project_id}")
	public ResponseEntity<Object> getSLAByUser(@PathVariable Long project_id,
			@PageableDefault(sort = "id", direction = Direction.DESC) Pageable pageable,
			Authentication authentication) {
		try {
			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);

			return projectRepository.findById(project_id).map(project_data -> {
				List<SLAModel> sladatas = slaRepository.findSLABycapnitiEnable(project_data.getId(), true, true);
				return ResponseHandler.generateResponse("List of SLA", true, HttpStatus.OK, sladatas);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Project ID " + project_id + "  Doesn't exist");
				return ResponseHandler.generateResponse("Project ID: " + project_id + " Doesn't exist", false,
						HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Exceptions happen!:SLA Doesn't exist DB Error: " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	@GetMapping("/gettaskbysla/{sla_id}")
	public ResponseEntity<Object> findTaskBySla(@PathVariable Long sla_id, Authentication authentication) {
		try {
			return slaRepository.findById(sla_id).map(sla_data -> {
				UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
				if (userDetails == null)
					return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);
				List<TaskModel> taskdatas = taskRepository.findByTaskBasedOnUser(true, sla_id, userDetails.getId());
				return ResponseHandler.generateResponse("List of Task Details", true, HttpStatus.OK, taskdatas);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: SLA ID " + sla_id + "  Doesn't exist");
				return ResponseHandler.generateResponse("SLA ID: " + sla_id + " Doesn't exist", false, HttpStatus.OK,
						null);
			});
		} catch (Exception e) {
			LOGGER.error("Exceptions happen!:SLA ID " + sla_id + " Doesn't exist DB Error: " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	@GetMapping("/getbyproject/{id}")
	public ResponseEntity<Object> FindbyProject(@RequestParam String Searchkeyword,
			@PageableDefault(sort = "id", direction = Direction.DESC) Pageable pageable, @PathVariable Long id,
			Authentication authentication) {
		try {
			return projectRepository.findById(id).map(projectData -> {
				UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
				if (userDetails == null)
					return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);
				switch (userDetails.getRolename()) {
				case "ADMIN", "BUSINESS":
					Page<TimesheetModel> timesheetdata = timesheetRepository.findByProjectId(projectData.getId(),
							Searchkeyword, pageable);
					return ResponseHandler.generateResponse("Timesheet Information based on Project ID", true,
							HttpStatus.OK, timesheetdata);
				case "EMPLOYEE":
					Page<TimesheetModel> timesheetdataby_emp = timesheetRepository.findByProjectId(projectData.getId(),
							Searchkeyword, userDetails.getId(), pageable);
					return ResponseHandler.generateResponse("Timesheet Information based on Project ID", true,
							HttpStatus.OK, timesheetdataby_emp);
				default:
					LOGGER.error("User doesn't have the access ");
					return ResponseHandler.generateResponse("User doesn't have the access", true, HttpStatus.OK, null);

				}

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: " + id + " Project ID Doesn't exist");
				return ResponseHandler.generateResponse(id + " Project ID Doesn't exist", false, HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error(
					"Exceptions happen!:Project ID in Timesheet " + id + " Doesn't exist DB Error: " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@GetMapping("/getbysla/{id}")
	public ResponseEntity<Object> Findbysla(@PathVariable Long id) {
		try {
			return slaRepository.findById(id).map(slaData -> {
				List<TimesheetModel> timesheetdata = timesheetRepository.findBySlaId(slaData.getId());

				return ResponseHandler.generateResponse("Timesheet Information based on SLA ID", true, HttpStatus.OK,
						timesheetdata);

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: " + id + " SLA ID Doesn't exist");
				return ResponseHandler.generateResponse(id + " SLA ID Doesn't exist", false, HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Exceptions happen!:SLA ID in Timesheet " + id + " Doesn't exist DB Error: " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@GetMapping("/getbyuser/{id}")
	public ResponseEntity<Object> FindbyUser(@PathVariable Long id) {
		try {
			return g3cEmployeeRepository.findById(id).map(userData -> {
				List<TimesheetModel> requestData = timesheetRepository.findByUserId(userData.getId());

				return ResponseHandler.generateResponse("Timesheet Found", true, HttpStatus.OK, requestData);

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: " + id + " user ID Doesn't exist");
				return ResponseHandler.generateResponse(id + " user ID Doesn't exist", false, HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error(
					"Exceptions happen!:user ID in Timesheet " + id + " Doesn't exist DB Error: " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@PostMapping("")
	public ResponseEntity<Object> createTimesheeet(@RequestBody TimeSheetRequest timesheetreqdata,
			Authentication authentication) {
		try {
			return projectRepository.findById(timesheetreqdata.getProject()).map(projectData -> {
				return slaRepository.findById(timesheetreqdata.getSla()).map(slaData -> {

					TimesheetModel timesheetData = new TimesheetModel();

					UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
					if (userDetails == null)
						return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);

					DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd-MM-yyyy");
					LocalDate localdate = LocalDate.parse(timesheetreqdata.getTimesheet_date(), dtf);

					timesheetData.setTimesheet_date(localdate);
					timesheetData.setStart_time(timesheetreqdata.getStart_time());
					timesheetData.setEnd_time(timesheetreqdata.getEnd_time());

					// hour and min to actual

					String[] hoursAndMin = timesheetreqdata.getWorking_hours().split(":");
					Double actual_time = Double.valueOf(hoursAndMin[0]) + (Double.valueOf(hoursAndMin[1]) / 60d);
					actual_time = actual_time - ((actual_time * slaData.getIdle_hours()) / 100);
					timesheetData.setWorking_hours(Double.valueOf(doubleFormat.format(actual_time)));
					timesheetData.setEmployee_type(userDetails.getEmployee_type());

					timesheetData.setProject(projectData);
					timesheetData.setProject_name(projectData.getProject_name());
					timesheetData.setSla(slaData);
					timesheetData.setSlaid(slaData.getSlaid());
					if (Boolean.TRUE.equals(timesheetreqdata.getCaptinityleave())) {
						timesheetData.setCaptinityleave(false);
						timesheetData.setWorkingtype("Working");
					} else {
						timesheetData.setCaptinityleave(true);
						timesheetData.setWorkingtype("Leave");
					}
					Optional<TaskModel> taskData = taskRepository.findById(timesheetreqdata.getTask());
					if (taskData.isPresent()) {
						timesheetData.setTask(taskData.get());
						timesheetData.setTask_name(taskData.get().getTaskname());
					}

					Optional<G3CEmployeeMasterModel> user = g3cEmployeeRepository.findById(userDetails.getId());

					if (user.isPresent()) {
						timesheetData.setUser(user.get());
						timesheetData.setName(user.get().getEmp_name());
						timesheetData.setEmployee_type(user.get().getEmployee_type());
						timesheetData.setShort_id(user.get().getShortid());
					}

					timesheetData.setComments(timesheetreqdata.getComments());
					timesheetRepository.save(timesheetData);

					return ResponseHandler.generateResponse("Timesheet Created Successfully", true, HttpStatus.OK,
							timesheetData);

				}).orElseGet(() -> {
					LOGGER.error("Exceptions happen!: " + timesheetreqdata.getSla() + " SLA ID Doesn't exist");
					return ResponseHandler.generateResponse(timesheetreqdata.getSla() + " SLA ID Doesn't exist", false,
							HttpStatus.OK, null);
				});

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: " + timesheetreqdata.getProject() + " project id Doesn't exist");
				return ResponseHandler.generateResponse(timesheetreqdata.getProject() + " project id Doesn't exist",
						false, HttpStatus.OK, null);
			});

		} catch (Exception e) {
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin" + e.getMessage(),
					false, HttpStatus.OK, null);
		}
	}

	@PutMapping("/{timesheet_id}")
	public ResponseEntity<Object> updateTimesheeet(@PathVariable(value = "timesheet_id") Long timesheet_id,
			@RequestBody TimeSheetRequest timesheetreq) {
		try {
			return timesheetRepository.findById(timesheet_id).map(timesheetData -> {

				DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
				LocalDate localdate = LocalDate.parse(timesheetreq.getTimesheet_date(), dtf);

				timesheetData.setTimesheet_date(localdate);
				timesheetData.setStart_time(timesheetreq.getStart_time());
				timesheetData.setEnd_time(timesheetreq.getEnd_time());
				timesheetData.setWorking_hours(Double.valueOf(timesheetreq.getWorking_hours().replace(":", ".")));
				timesheetData.setComments(timesheetreq.getComments());
				timesheetRepository.save(timesheetData);

				return ResponseHandler.generateResponse("Timesheet Updated Successfully", true, HttpStatus.OK,
						timesheetData);

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: " + timesheet_id + " Timesheet id Doesn't exist");
				return ResponseHandler.generateResponse(timesheet_id + " Timesheet id Doesn't exist", false,
						HttpStatus.OK, null);
			});

		} catch (Exception e) {
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin" + e.getMessage(),
					false, HttpStatus.OK, null);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteTask(@PathVariable Long id) {
		try {
			return timesheetRepository.findById(id).map(requestData -> {
				requestData.setActive(false);
				timesheetRepository.save(requestData);
				return ResponseHandler.generateResponse("Task ", true, HttpStatus.OK, requestData);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: " + id + " Timesheet Doesn't exist");
				return ResponseHandler.generateResponse(id + " Timesheet ID Doesn't exist", false, HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Exceptions happen!:Task ID " + id + " Doesn't exist DB Error: " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@GetMapping("/gettimesheetsbybuiness")
	public ResponseEntity<Object> getTimeSheetsUnderBusinessManger(@RequestParam String Searchkeyword,
			@PageableDefault(size = 10, page = 0, sort = "id", direction = Direction.DESC) Pageable pageable,
			Authentication authentication) {
		try {
			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);
			List<TimesheetModel> timesheets = new ArrayList<>();
			List<ProjectModel> projects = projectRepository.findByServiceProvider(userDetails.getShortid());
			projects.stream().forEach(project -> {
				List<TimesheetModel> timesheets_by_project = timesheetRepository.findByprojects(project.getId(),
						Searchkeyword, pageable);
				if (!timesheets_by_project.isEmpty())
					timesheets.addAll(timesheets_by_project);
			});

			return ResponseHandler.generateResponse("List of Timesheets", true, HttpStatus.OK, timesheets);

		} catch (Exception e) {
			LOGGER.error("Exceptions happen!:SLA Doesn't exist DB Error: " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	// Excel Export Capiniti
	@GetMapping("/excelreport/{id}")
	public ResponseEntity<Object> capinitiExport(@PathVariable Long id, Authentication authentication) {

		ProjectModel projectData = projectRepository.findbyId(id);

		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		if (userDetails == null)
			return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);

		if (userDetails.getRolename().equals("ADMIN") || userDetails.getRolename().equals("BUSINESS")) {

			String file = resourceAllocationService.excelExporttoCapinti(projectData);
			return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + "capniti.xlsx")
					.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);

		}

		else {

			String file = resourceAllocationService.excelExporttoCapintiForEmployee(projectData, userDetails.getId());
			return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + "capniti.xlsx")
					.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
		}

	}

}

package com.intelizign.dmgcc.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.intelizign.dmgcc.dashboardresponce.BizCaseSetupReport.RecruitmentStatus;
import com.intelizign.dmgcc.models.JDMappingModel;
import com.intelizign.dmgcc.models.ProjectModel;
import com.intelizign.dmgcc.models.SLAModel;
import com.intelizign.dmgcc.models.businesscasemodels.BusinessCaseRequest;
import com.intelizign.dmgcc.repositories.BizCaseRequestRepository;
import com.intelizign.dmgcc.repositories.JDMappingRepository;
import com.intelizign.dmgcc.repositories.ProjectRepository;
import com.intelizign.dmgcc.repositories.SLARepository;
import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.services.ReportService;
import com.intelizign.dmgcc.utils.CustomFields;

@RestController
@RequestMapping("/report")
public class ReportController {

	@Autowired
	private ReportService reportService;

	@Autowired
	private BizCaseRequestRepository bizCaseRequestRepository;

	@Autowired
	private SLARepository slaRepository;

	@Autowired
	private ProjectRepository projectRepository;
	
	@Autowired 
	private JDMappingRepository jdMappingRepository;

	public final Logger LOGGER = LogManager.getLogger(ReportController.class);

	// customer list report when Conversion_period ->IL0 - IL1 and sum of delaydays
	// logic added
	@GetMapping("downloadcustomerreport")
	public ResponseEntity<Object> downloadcustomerlist() {
		try {
			String file = reportService.loadcustomerdata();
			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + "customerlist.xlsx")
					.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
		}

		catch (Exception e) {
			LOGGER.error("Internal Server Error while downloading customer report: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	// lead list report when Conversion_period ->IL0 - IL1 and sum of delaydays
	// logic added
	@GetMapping("downloadleadreport")
	public ResponseEntity<Object> downloadleaddata() {
		try {
			String file = reportService.loadleaddata();
			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + "leaddata.xlsx")
					.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while downloading lead report: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	// bizcase cost infos report with vertical header
	@GetMapping("downloadbizcasereport/{biz_id}")
	public ResponseEntity<Object> downloadbizrequestreport(@PathVariable(value = "biz_id") Long biz_id) {
		try {
			Optional<BusinessCaseRequest> requestData = bizCaseRequestRepository.findByIdAndActive(biz_id, true);
			String file = null;
			if (requestData.isPresent()) {
				file = reportService.loadbizrequestreportrinfoToExcel(requestData.get().getBizcasereport());
			} else {
				return ResponseHandler.generateResponse(" invalid bizcase id  {}  " + biz_id, false, HttpStatus.OK,
						null);
			}
			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + "bizcasedata.xlsx")
					.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while downloading bizcase report: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	
	// bizcase recruitment report
		@GetMapping("downloadrecruitmentreport")
		public ResponseEntity<String> downloadbizcaserecruitmentdata() {
			try {
				String  file = reportService.loadrecruitmentreport();
				return ResponseEntity.ok()
						.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + "recruitmentdata.xlsx")
						.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
				
			} catch (Exception e) {
				LOGGER.error("Internal Server Error while downloading recruitment report: " + e.getMessage());
				return null;
			}
		}
		
	
	// third party man power skillset report in Resource Module
	@GetMapping("downloadmanpowerreport")
	public ResponseEntity<Object> downloadmanpowerskillset() {
		try {
			String file = reportService.loadresourcedata();
			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + "employeeresourcedata.xlsx")
					.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while downloading internal & third party resource report: "
					+ e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);

		}

	}

	// Operation Module (Internal & Third party) Resource Report
	@GetMapping("generalresourcereport")
	public ResponseEntity<Object> downloadgeneralresource() {
		try {
			String file = reportService.loadgeneralresourcedata();

			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + "generalresourcedata.xlsx")
					.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while downloading internal & third party resource report: "
					+ e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	// capacity report in Operations Module
	@GetMapping("downloadcapacityreport")
	public ResponseEntity<Object> downloadcapacityreport() {
		try {
			String file = reportService.loadcapacitydata();

			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + "capacitydata.xlsx")
					.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while downloading internal & third party resource report: "
					+ e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	// Positions Report in Operation Module
	@GetMapping("downloadpositionsreport")
	public ResponseEntity<Object> downloadpositionsreport(@RequestParam String cost_center) {
		try {
			String file = reportService.loadpositionsreport(cost_center);

			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + "positionsdata.xlsx")
					.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while downloading positions report: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	// Bench Resource
	@GetMapping("downloadbenchreport")
	public ResponseEntity<Object> downloadbenchreport() {
		try {
			String file = reportService.benchreport();
			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + "benchresource_report.xlsx")
					.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
		} catch (Exception e) {

			LOGGER.error("Internal Server Error while downloading bench resource report: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);

		}
	}

	// Attrition
	@GetMapping("downloadattritionreport")
	public ResponseEntity<Object> downloadAttritionreport() {
		try {
			String file = reportService.attritionreport();
			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + "attritionreport.xlsx")
					.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
		} catch (Exception e) {

			LOGGER.error("Internal Server Error while downloading positions report: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);

		}
	}

	// Timseheet Report costcenter in Operation Module
	@GetMapping("downloadtimesheetreport")
	public ResponseEntity<Object> downloadtimesheetreport(@RequestParam(required = false) String cost_center) {
		try {

			String otherusers_file = reportService.loadtimesheetreport(cost_center);
			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + "timesheetdata.xlsx")
					.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(otherusers_file);
		} catch (

		Exception e) {
			LOGGER.error("Internal Server Error while downloading timesheet report: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	// Timseheet Employee Report in Operation Module

	@GetMapping("timesheetemployeereport")
	public ResponseEntity<Object> downloadtimesheetemployeereport(@RequestParam String short_id) {
		try {
			String file = reportService.loadtimesheetemployeereport(short_id);

			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + "timesheetemployeedata.xlsx")
					.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
		} catch (

		Exception e) {
			LOGGER.error("Internal Server Error while downloading timesheet report: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	// task report
	@GetMapping("downloadtaskreport/{project_id}")
	public ResponseEntity<Object> downloadtaskreport(@PathVariable Long project_id) {
		try {
			String file = reportService.taskreport(project_id);

			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + "tasksdata.xlsx")
					.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
		} catch (Exception e) {

			LOGGER.error("Internal Server Error while downloading positions report: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);

		}
	}

	// Timseheet Employee Report in Operation Module
	@GetMapping("travelcostreport/{project_id}")
	public ResponseEntity<Object> downloadtravelcostreport(@PathVariable Long project_id) {
		try {
			List<SLAModel> slaModels = slaRepository.findByProjectIdAndIs_active(project_id, true);

			if (slaModels == null || slaModels.isEmpty()) {
				return ResponseHandler.generateResponse(" invalid project id  " + project_id, false, HttpStatus.OK,
						null);
			} else {
				String file = reportService.sla_travelcostinfo_ToExcel(slaModels);

				return ResponseEntity.ok()
						.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + "travelcostreport.xlsx")
						.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
			}
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while downloading travel cost report: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	// sla reports starts
	@GetMapping("slareport")
	public ResponseEntity<Object> downloadslareport() {
		try {
			String file = reportService.loadslareport();

			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + "sla_report.xlsx")
					.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);

		} catch (

		Exception e) {
			LOGGER.error("Internal Server Error while downloading timesheet report: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	// revenue report in Finance Module
	@GetMapping("revenuereport")
	public ResponseEntity<Object> downloadrevenuereport(@RequestParam(required = true) Integer year) {
		try {
			String file = reportService.loadrevenuereport(year);

			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + "revenue_report.xlsx")
					.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while downloading revenue report: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	// Material Report
	@GetMapping("downloadmaterialreport")
	public ResponseEntity<Object> downloadMaterialreport() {
		try {
			String file = reportService.materialreport();

			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + "materialerport.xlsx")
					.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
		} catch (Exception e) {

			List<ProjectModel> projectDatas = projectRepository.getactiveProjects(true);

			return ResponseHandler.generateResponse("List of Project List", true, HttpStatus.OK, projectDatas);

		}
	}

	@JsonView(CustomFields.MyResponseViews.class)
	@GetMapping("/getprojects")
	public ResponseEntity<Object> getallprojdetlngdata() {
		try {

			List<ProjectModel> projectDatas = projectRepository.getactiveProjects(true);

			return ResponseHandler.generateResponse("List of Project List", true, HttpStatus.OK, projectDatas);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error While Getting All Project Data: {}", e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}
}

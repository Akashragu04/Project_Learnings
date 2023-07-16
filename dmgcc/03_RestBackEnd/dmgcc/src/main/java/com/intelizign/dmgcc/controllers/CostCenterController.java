package com.intelizign.dmgcc.controllers;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVPrinter;
import org.apache.commons.csv.CSVRecord;
import org.apache.commons.csv.QuoteMode;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.intelizign.dmgcc.models.CostCenterModel;
import com.intelizign.dmgcc.models.G3CEmployeeMasterModel;
import com.intelizign.dmgcc.models.ProjectModel;
import com.intelizign.dmgcc.models.businesscasemodels.BizCaseSetupModel;
import com.intelizign.dmgcc.models.businesscasemodels.BusinessCaseRequest;
import com.intelizign.dmgcc.repositories.BizCaseRequestRepository;
import com.intelizign.dmgcc.repositories.BizCaseSetupRepository;
import com.intelizign.dmgcc.repositories.CostCenterRepository;
import com.intelizign.dmgcc.repositories.G3CEmployeeRepository;
import com.intelizign.dmgcc.repositories.ProjectRepository;
import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.services.EmailServiceImpl;
import com.intelizign.dmgcc.services.MySSCAPIServices;

@RestController
@RequestMapping("/costcenter")
public class CostCenterController {

	@Autowired
	private CostCenterRepository costCenterRepository;

	@Autowired
	private G3CEmployeeRepository g3cEmployeeRepository;

	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private BizCaseSetupRepository bizCaseSetupRepository;

	@Autowired
	private BizCaseRequestRepository bizCaseRequestRepository;

	@Autowired
	private EmailServiceImpl notificationService;

	@Autowired
	private MySSCAPIServices mysscslaservice;

	public final Logger LOGGER = LogManager.getLogger(CostCenterController.class);

	@GetMapping("")
	public ResponseEntity<Object> getCostCenter(@RequestParam String searchKeyword,
			@PageableDefault(size = 10, page = 0, sort = "id", direction = Direction.DESC) Pageable pageable) {
		try {
			Page<CostCenterModel> costcenterPage = costCenterRepository.findAll(searchKeyword, pageable);
			return ResponseHandler.generateResponse("List of Cost Center", true, HttpStatus.OK, costcenterPage);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error:" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@GetMapping("/getlist")
	public ResponseEntity<Object> getCostCenterlist() {
		try {
			List<CostCenterModel> costcenterPage = costCenterRepository.findAll();
			return ResponseHandler.generateResponse("List of Cost Center", true, HttpStatus.OK, costcenterPage);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error:" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@PostMapping("/blukinsert")
	public ResponseEntity<Object> creatCostCenterbulk(@RequestBody List<CostCenterModel> costCenterdata) {
		try {
			List<CostCenterModel> costCenterinfo = new ArrayList<>();
			for (CostCenterModel currentcostcenter : costCenterdata) {

				Optional<CostCenterModel> costcenterPage = costCenterRepository
						.findByCostcenter(currentcostcenter.getCostcenter());
				if (costcenterPage.isPresent()) {
					return ResponseHandler.generateResponse("Cost Center Already Exists", false, HttpStatus.OK, null);
				}
			}
			for (CostCenterModel currentcostcenter : costCenterdata) {
				CostCenterModel savedcostcenter = costCenterRepository.save(currentcostcenter);
				costCenterinfo.add(savedcostcenter);
				List<G3CEmployeeMasterModel> empfulldata = g3cEmployeeRepository
						.findByCostcenter(savedcostcenter.getCostcenter());
				if (!empfulldata.isEmpty()) {
					for (G3CEmployeeMasterModel currentemp : empfulldata) {
						currentemp.setCapacity(savedcostcenter.getCapacity());
						g3cEmployeeRepository.save(currentemp);
					}
				}
			}
//			MySSCCostcenterResponse response_from_myssc = mysscslaservice.saveCostcenterInMySSC(costCenterinfo);
//			if (response_from_myssc.getIsSuccess().equals(true) && response_from_myssc.getHttpStatusCode() == 200) {
//				return ResponseHandler.generateResponse("Cost Center Created Successfully", true, HttpStatus.OK,
//						costCenterinfo);
//			} else {
//				// need to check whether delete all the save costcenter
//				return ResponseHandler.generateResponse("SLA Data not inserted in MySSC", false, HttpStatus.OK,
//						response_from_myssc);
//			}
			return ResponseHandler.generateResponse("Cost Center Created Successfully", true, HttpStatus.OK,
					costCenterinfo);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error:" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@PostMapping("")
	public ResponseEntity<Object> creatCostCenter(@RequestBody CostCenterModel costCenterdata) {
		try {
			Optional<CostCenterModel> costcenterPage = costCenterRepository
					.findByCostcenter(costCenterdata.getCostcenter());
			if (costcenterPage.isPresent()) {
				return ResponseHandler.generateResponse("Cost Center Already Exists", false, HttpStatus.OK, null);
			}

			CostCenterModel costcenter = costCenterRepository.save(costCenterdata);

			List<G3CEmployeeMasterModel> empfulldata = g3cEmployeeRepository
					.findByCostcenter(costcenter.getCostcenter());
			if (!empfulldata.isEmpty()) {
				for (G3CEmployeeMasterModel currentemp : empfulldata) {
					currentemp.setCapacity(costcenter.getCapacity());
					g3cEmployeeRepository.save(currentemp);
				}
			}
			return ResponseHandler.generateResponse("Cost Center Created Successfully", true, HttpStatus.OK,
					costcenter);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error:" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@PutMapping("/{id}")
	public ResponseEntity<Object> updateCostCenter(@RequestBody CostCenterModel costCenterdatareq,
			@PathVariable Long id) {
		try {
			return costCenterRepository.findById(id).map(costenterdata -> {
				costenterdata.setTeam(costCenterdatareq.getTeam());
				costenterdata.setTeam_group(costCenterdatareq.getTeam_group());
				costenterdata.setCapacity(costCenterdatareq.getCapacity());
				CostCenterModel updatedata = costCenterRepository.save(costenterdata);
				List<G3CEmployeeMasterModel> empfulldata = g3cEmployeeRepository
						.findByCostcenter(updatedata.getCostcenter());
				if (!empfulldata.isEmpty()) {
					for (G3CEmployeeMasterModel currentemp : empfulldata) {
						currentemp.setCapacity(costCenterdatareq.getCapacity());
						g3cEmployeeRepository.save(currentemp);
					}
				}
				return ResponseHandler.generateResponse("Costcenter Updated Successfully", true, HttpStatus.OK,
						updatedata);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Invalid CostData ID");
				return ResponseHandler.generateResponse(" Exceptions happen!: Invalid CostData ID", false,
						HttpStatus.OK, null);
			});
		} catch (Exception e) {
			LOGGER.error("Internal Server Error:" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	// truncate cost center and create upload data
	@PostMapping(path = "/addnewcostcenter", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<Object> uploadCostcenterCsv(@RequestParam("file") MultipartFile file) {

		List<CostCenterModel> centerModels = new ArrayList<>();
		List<String> tableData = List.of("CostCenter", "Team", "Team group");
		List<String> tableHeader = tableData.stream().sorted().toList();

		try {
			String contenttype = file.getContentType();

			BufferedReader fileReader = new BufferedReader(
					new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8));
			CSVParser csvParser = new CSVParser(fileReader,
					CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());
			List<CSVRecord> csvRecords = csvParser.getRecords();
			if (csvRecords.size() > 0) {
				List<String> sortedHeader = csvRecords.get(0).getParser().getHeaderNames().stream().sorted().toList();
				if (contenttype != null && contenttype.equals("text/csv")) {
					if (tableHeader.equals(sortedHeader)) {
						costCenterRepository.deleteAll();

						for (CSVRecord csvRecord : csvRecords) {
							CostCenterModel costcenterdata = new CostCenterModel();
							costcenterdata.setCostcenter(csvRecord.get("CostCenter"));
							costcenterdata.setTeam(csvRecord.get("Team"));
							costcenterdata.setTeam_group(csvRecord.get("Team group"));
							CostCenterModel saved_costcenterdata = costCenterRepository.save(costcenterdata);
							centerModels.add(saved_costcenterdata);
						}

						saveCapacity(centerModels);
						LOGGER.error("File uploaded successfully:");

//						MySSCCostcenterResponse response_from_myssc = mysscslaservice.saveCostcenterInMySSC(centerModels);
//						if (response_from_myssc.getIsSuccess().equals(true)
//								&& response_from_myssc.getHttpStatusCode() == 200) {
//							return ResponseHandler.generateResponse("Cost Center Created Successfully", true, HttpStatus.OK,
//									centerModels);
//						} else {
//							// need to check whether delete all the save costcenter
//							return ResponseHandler.generateResponse("SLA Data not inserted in MySSC", false, HttpStatus.OK,
//									response_from_myssc);
//						}
						return ResponseHandler.generateResponse("File uploaded successfully:", true, HttpStatus.OK,
								centerModels);
					}
					LOGGER.error("Column names are not equal:");
					return ResponseHandler.generateResponse("Column names are not equal:", false, HttpStatus.OK, null);

				} else {
					LOGGER.error("Uploaded file is not an .csv file");
					return ResponseHandler.generateResponse("Uploaded file is not an .csv file", false, HttpStatus.OK,
							null);
				}

			} else {
				LOGGER.error("File must not be empty:  ");
				return ResponseHandler.generateResponse("File must not be empty:  ", false, HttpStatus.OK, null);
			}
		}

		catch (Exception e) {
			LOGGER.error("Server Error, Please contact G3C Admin:" + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);

		}

	}

	// add additional costcenter
	@PostMapping(path = "/addcostcenter", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<Object> uploadCostcenterCsvfile(@RequestParam("file") MultipartFile file) {

		List<CostCenterModel> centerModels = new ArrayList<>();
		List<String> tableData = List.of("CostCenter", "Team", "Team group");
		List<String> tableHeader = tableData.stream().sorted().toList();

		try {
			String contenttype = file.getContentType();

			BufferedReader fileReader = new BufferedReader(
					new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8));
			CSVParser csvParser = new CSVParser(fileReader,
					CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());
			List<CSVRecord> csvRecords = csvParser.getRecords();
			if (csvRecords.size() > 0) {
				List<String> sortedHeader = csvRecords.get(0).getParser().getHeaderNames().stream().sorted().toList();
				if (contenttype != null && contenttype.equals("text/csv")) {
					if (tableHeader.equals(sortedHeader)) {

						for (CSVRecord csvRecord : csvRecords) {
							CostCenterModel costcenterdata = new CostCenterModel();
							costcenterdata.setCostcenter(csvRecord.get("CostCenter"));
							costcenterdata.setTeam(csvRecord.get("Team"));
							costcenterdata.setTeam_group(csvRecord.get("Team group"));
							Optional<CostCenterModel> validatecoster = costCenterRepository
									.findByCostcenter(costcenterdata.getCostcenter());

							if (validatecoster.isPresent()) {
								return ResponseHandler.generateResponse("Cost Center: " + costcenterdata.getCostcenter()
										+ " is already exist in Master", false, HttpStatus.OK, null);
							}

							CostCenterModel saved_costcenterdata = costCenterRepository.save(costcenterdata);
							centerModels.add(saved_costcenterdata);
						}
						saveCapacity(centerModels);

						LOGGER.error("File uploaded successfully:");

//						MySSCCostcenterResponse response_from_myssc = mysscslaservice.saveCostcenterInMySSC(centerModels);
//						if (response_from_myssc.getIsSuccess().equals(true)
//								&& response_from_myssc.getHttpStatusCode() == 200) {
//							return ResponseHandler.generateResponse("Cost Center Created Successfully", true, HttpStatus.OK,
//									centerModels);
//						} else {
//							// need to check whether delete all the save costcenter
//							return ResponseHandler.generateResponse("SLA Data not inserted in MySSC", false, HttpStatus.OK,
//									response_from_myssc);
//						}
						return ResponseHandler.generateResponse("File uploaded successfully:", true, HttpStatus.OK,
								centerModels);
					} else {
						LOGGER.error("Column names are not equal:");
						return ResponseHandler.generateResponse("Column names are not equal:", false, HttpStatus.OK,
								null);
					}

				} else {
					LOGGER.error("Could not upload Csv File");
					return ResponseHandler.generateResponse("Could not upload Csv File", false, HttpStatus.OK, null);
				}

			} else {
				LOGGER.error("File must not be empty:  ");
				return ResponseHandler.generateResponse("File must not be empty:  ", false, HttpStatus.OK, null);
			}
		}

		catch (Exception e) {
			LOGGER.error("Server Error, Please contact G3C Admin:" + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);

		}

	}

	private void saveCapacity(List<CostCenterModel> centerModels) {
		List<CostCenterModel> saved_costcenter = new ArrayList<>();
		for (CostCenterModel currentcostcenter : centerModels) {
			List<G3CEmployeeMasterModel> empfulldata = g3cEmployeeRepository
					.findByCostcenter(currentcostcenter.getCostcenter());
			if (!empfulldata.isEmpty()) {
				for (G3CEmployeeMasterModel currentemp : empfulldata) {
					currentemp.setCapacity(currentcostcenter.getCapacity());
					g3cEmployeeRepository.save(currentemp);
				}
			}
		}

	}

	@GetMapping("/download")
	public ResponseEntity<Resource> getFile() {

		String filename = "costcenter.csv";
		InputStreamResource file = new InputStreamResource(load());
		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
				.contentType(MediaType.parseMediaType("application/vnd.ms-word")).body(file);
	}

	public ByteArrayInputStream load() {
		List<CostCenterModel> costcenters = costCenterRepository.findAllByOrderById();
		return CostcenterToCSV(costcenters);
	}

	public static ByteArrayInputStream CostcenterToCSV(List<CostCenterModel> costcenters) {

		final CSVFormat format = CSVFormat.DEFAULT.withQuoteMode(QuoteMode.MINIMAL);
		try (ByteArrayOutputStream out = new ByteArrayOutputStream();

				CSVPrinter csvPrinter = new CSVPrinter(new PrintWriter(out), format);) {

			List<Object> headers = new ArrayList<>();
			headers = Arrays.asList("CostCenter", "Team", "Team group");

			csvPrinter.printRecord(headers);
			for (CostCenterModel costcenter : costcenters) {

				List<Object> values = new ArrayList<>();

				values = Arrays.asList(costcenter.getCostcenter(), costcenter.getTeam(), costcenter.getTeam_group());
				csvPrinter.printRecord(values);
			}

			csvPrinter.flush();
			return new ByteArrayInputStream(out.toByteArray());
		}

		catch (IOException e) {
			return null;
		}
	}

	@GetMapping("/bizcaseinfobyprojectid/{projectid}")
	public ResponseEntity<Object> bizcaseinfobyprojectid(@PathVariable(value = "projectid") long projectid) {
		try {
			Optional<ProjectModel> project = projectRepository.findById(projectid);
			if (project.isPresent()) {
				BizCaseSetupModel bizCaseSetupdata = bizCaseSetupRepository
						.getBusinessSetupdetail(project.get().getBizcase().getId());
				BusinessCaseRequest bizcasedata = bizCaseRequestRepository
						.findbyid(bizCaseSetupdata.getBizcase().getId());
				// Send mail to Business Manager
				Map<String, Object> biz_setup_model = new HashMap<>();
				biz_setup_model.put("receiverName", "Hi Manager");
				biz_setup_model.put("it_average", bizCaseSetupdata.getIt_average());
				biz_setup_model.put("hr_average", bizCaseSetupdata.getHr_average());
				biz_setup_model.put("facility_average", bizCaseSetupdata.getFacility_average());
				biz_setup_model.put("total_average", bizCaseSetupdata.getTotal_average());

				notificationService.sendBizPerformanceLeadMail(bizcasedata.getLead().getService_provider_email_id(),
						"Bizcase Departments Performance Percentage", biz_setup_model);

				return ResponseHandler.generateResponse("Business Setup All department Average Performance Infromation",
						true, HttpStatus.OK, bizCaseSetupdata);
			}

			else {
				LOGGER.error("Exceptions happen!:  {}   ProjectID Doesn't exist  ", projectid);
				return ResponseHandler.generateResponse(" ProjectID Doesn't exist", false, HttpStatus.OK, null);
			}

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while projectId:" + e.getMessage());
			return ResponseHandler.generateResponse(e.getMessage(), false, HttpStatus.OK, null);
		}
	}

	public String getMangerName(String costcenter) {
		List<String> supv_data = new ArrayList<>();

		List<G3CEmployeeMasterModel> employees_by_costcenter = g3cEmployeeRepository.findByCostcenter(costcenter);

		if (!employees_by_costcenter.isEmpty()) {
			for (G3CEmployeeMasterModel emp_data : employees_by_costcenter) {
				supv_data.add(emp_data.getSupv_id());
			}
		} else {
			return "NA";
		}

		List<String> supvisorWithoutDuplicates = supv_data.stream().distinct().toList();
		if (supvisorWithoutDuplicates.size() < 2) {
			List<String> filtered_supvData = supv_data.stream()
					.collect(Collectors.groupingBy(Function.identity(), Collectors.counting())).entrySet().stream()
					.filter(e -> e.getValue() == 1).map(Entry::getKey).toList();
			G3CEmployeeMasterModel test = g3cEmployeeRepository.findEmployeeBySupvID(filtered_supvData.get(0));
			return test.getEmp_name();

		} else {
			return "Cost Center mapped Error";
		}

	}

	//Soft delete cost-center
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Object> deleteCostCenter(@PathVariable Long id, @RequestParam String is_active) {
		try {
			 
			return costCenterRepository.findById(id).map(costcenterData -> {
			    		
				if(is_active!=null && !is_active.isEmpty() && is_active.equals("true")) {
					
					costcenterData.setIs_active(true);
					costCenterRepository.save(costcenterData);
					return ResponseHandler.generateResponse("Cost Center Unblocked Successfully", true, HttpStatus.OK, null);
				}
				
				else if(is_active!=null && !is_active.isEmpty() && is_active.equals("false")) {
					
					costcenterData.setIs_active(false);
					costCenterRepository.save(costcenterData);
					return ResponseHandler.generateResponse("Cost Center  Blocked Successfully", true, HttpStatus.OK, null);
				}
				
				else {
				  return ResponseHandler.generateResponse("Cost Center Status Cannot Be Empty", false, HttpStatus.OK, null);
				  }
				
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Cost Center ID " + id + " Doesn't exist to Delete");
				return ResponseHandler.generateResponse("Cost Center ID " + id + " Doesn't exist to Delete", false,
						HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Exceptions happen!: " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}
}

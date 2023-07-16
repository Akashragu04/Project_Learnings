package com.intelizign.dmgcc.controllers.othermaster;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.intelizign.dmgcc.models.ProjectModel;
import com.intelizign.dmgcc.models.othermaster.IODumpModel;
import com.intelizign.dmgcc.repositories.ProjectRepository;
import com.intelizign.dmgcc.repositories.othermaster.CCDumpRepository;
import com.intelizign.dmgcc.repositories.othermaster.IODumpRepository;
import com.intelizign.dmgcc.request.IOMappingRequest;
import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.response.othermaster.ProjectExpenseResponse;
import com.intelizign.dmgcc.services.FilesStorageServicePath;
import com.intelizign.dmgcc.services.othermaster.CreateCSVFile;
import com.intelizign.dmgcc.services.othermaster.IOMappingService;

@RestController
@RequestMapping("/iomapping")
public class IoMappingController {

	@Autowired
	FilesStorageServicePath storageServicepath;

	@Autowired
	ProjectRepository projectRepository;

	@Autowired
	CreateCSVFile csvservice;

	@Autowired
	private IOMappingService ioMappingservice;

	public final Logger LOGGER = LogManager.getLogger(IoMappingController.class);

	private final IODumpRepository ioNumRepo;

	@Autowired
	CCDumpRepository ccDumpRepository;

	IoMappingController(IODumpRepository ioNumRepo) {

		this.ioNumRepo = ioNumRepo;
	}

	@GetMapping("")
	public ResponseEntity<Object> findAllIODatas(@RequestParam(required = false) String searchKeyword,
			@PageableDefault(size = 10, page = 0, sort = "id", direction = Direction.DESC) Pageable pageable) {
		try {
			Page<IODumpModel> ioDumpDatas = ioNumRepo.findAll(searchKeyword, pageable);

			return ResponseHandler.generateResponse("List of IO Mapping Data", true, HttpStatus.OK, ioDumpDatas);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get all IO Mapping Data: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	@GetMapping("/{id}")
	public ResponseEntity<Object> findIoNumberdata(@PathVariable Long id) {
		try {
			return ioNumRepo.findById(id).map(ioNumberData -> {
				return ResponseHandler.generateResponse("IO Mapping data Found", true, HttpStatus.OK, ioNumberData);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: " + id + " IO Map ID Doesn't exist");
				return ResponseHandler.generateResponse(id + "IO Map ID Doesn't exist", false, HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Exceptions happen!:IO Map ID " + id + " Doesn't exist DB Error: " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	@GetMapping("/getallprojects")
	public ResponseEntity<Object> findAllProjects(@RequestParam String searchKeyword,
			@PageableDefault(size = 10, page = 0, sort = "id", direction = Direction.DESC) Pageable pageable) {
		try {
			Page<ProjectModel> projectData = projectRepository.findAllbysearch(searchKeyword, pageable);
			return ResponseHandler.generateResponse("List of projects", true, HttpStatus.OK, projectData);
		} catch (Exception e) {
			LOGGER.error("Error while Fetching Records in io numbers" + e.getMessage());
			return ResponseHandler.generateResponse(e.getMessage(), false, HttpStatus.OK, null);
		}

	}

	@RequestMapping(value = "/createionumber", method = RequestMethod.POST)
	public ResponseEntity<Object> createIonum(@RequestBody List<IODumpModel> ioNumObjs) {
		try {
			List<IODumpModel> ioNumObjsList = ioNumRepo.saveAll(ioNumObjs);

			return ResponseHandler.generateResponse("Created io numbers successfully", true, HttpStatus.OK,
					ioNumObjsList);
		}

		catch (Exception e) {
			LOGGER.error("Error while creating io numbers " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	@PostMapping("/iomappingwithproject/{id}")
	public ResponseEntity<Object> findAllIoNumbers(@RequestBody List<IOMappingRequest> IoMappingRequest,
			@PathVariable Long id) {
		try {
			return projectRepository.findById(id).map(projectdata -> {
//				List<IODumpModel> ioObjects = ioNumRepo.findOrderIdAndYear(IoMappingRequest.getOrder_id(),
//						IoMappingRequest.getYear());
//				if (ioObjects.isEmpty()) {
//					LOGGER.error("Io number with id {} and with year {} for the project with id {} not found",
//							IoMappingRequest.getOrder_id(), IoMappingRequest.getYear(), projectdata.getId());
//					return ResponseHandler.generateResponse("Io number with id " + IoMappingRequest.getOrder_id()
//							+ " and with year " + IoMappingRequest.getYear() + "for the project with id :"
//							+ projectdata.getId() + " not found", false, HttpStatus.OK, null);
//
//				}

				ProjectModel projectdataRes = ioMappingservice.ioMappingWithProjects("data", IoMappingRequest,
						projectdata);

				return ResponseHandler.generateResponse("project mapped with io number Successfully", true,
						HttpStatus.OK, projectdataRes);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: project ID " + id + " Doesn't exist");
				return ResponseHandler.generateResponse("project ID " + id + " Doesn't exist", false, HttpStatus.OK,
						null);
			});

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while post by io number: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	@RequestMapping(value = "/uploadcsv", method = RequestMethod.POST, consumes = { "multipart/form-data" })
	public ResponseEntity<Object> updateProjectIOmapping(@RequestParam("file") MultipartFile file) {
		try {
			List<ProjectModel> projectMdlListRes = new ArrayList<>();
			List<String> tableData = List.of("Project ID", "Project Code", "Project Name", "Customer", "Status",
					"SLA Value", "Invoice Value", "IO Number", "Year", "Io Mapping key");
			List<String> sortedTableColumn = tableData.stream().sorted().collect(Collectors.toList());

			List<String> sortedCSVColumn = new ArrayList<>();

			BufferedReader fileReader = new BufferedReader(new InputStreamReader(file.getInputStream(), "UTF-8"));
			CSVParser csvParser = new CSVParser(fileReader,
					CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());

			List<CSVRecord> csvRecords = csvParser.getRecords();

			if (csvRecords.size() > 0) {
				sortedCSVColumn = csvRecords.get(0).getParser().getHeaderNames().stream().sorted()
						.collect(Collectors.toList());

				boolean status = sortedCSVColumn.equals(sortedTableColumn);

				if (file.getContentType().equals("text/csv")) {

					if (status) {
						for (CSVRecord csvRecord : csvRecords) {
							if (csvRecord.get("Project ID") == null || csvRecord.get("Project ID").isBlank()
									|| csvRecord.get("Project ID").isEmpty()) {
								return ResponseHandler.generateResponse("Project ID must not be empty", false,
										HttpStatus.OK, null);
							}
							Long project_id = Long.parseLong(csvRecord.get("Project ID"));
							String order_id = csvRecord.get("IO Number");
							String year = csvRecord.get("Year");
							String io_mapping_key = csvRecord.get("Io Mapping key");
							Optional<ProjectModel> projectdata = projectRepository.findProjectByid(project_id);
							if (projectdata.isPresent()) {

								ProjectModel projectMdlObjRes = ioMappingservice
										.ioMappingWithProjectsTest(io_mapping_key, order_id, year, projectdata.get());
								LOGGER.error("projects with id " + projectdata.get().getId() + "found");
								projectMdlListRes.add(projectMdlObjRes);
							} else {
								LOGGER.error("projects with id  {} not found", project_id);
							}
						}

					}
				} else {
					return ResponseHandler.generateResponse("Uploaded file is not an .csv file", false, HttpStatus.OK,
							null);
				}

				return ResponseHandler.generateResponse("Following List of Projects mapped with IO Number Successfully",
						true, HttpStatus.OK, projectMdlListRes);
			}

			else {
				LOGGER.error("File must not be empty:  ");
				return ResponseHandler.generateResponse("File must not be empty:  ", false, HttpStatus.OK, null);
			}

		} catch (Exception e) {
			LOGGER.error("Error while Creating .csv records for Io mapping  " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	@GetMapping("/download")
	public ResponseEntity<Resource> getFile() {
		String filename = "ioMappingwithProject.csv";
		InputStreamResource file = new InputStreamResource(csvservice.loadProjects());
		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
				.contentType(MediaType.parseMediaType("application/vnd.ms-word")).body(file);
	}

	// Expense Report For particular project
	@GetMapping("/expensereport/{id}")
	public ResponseEntity<Object> findExpenseReport(@PathVariable Long id) {
		try {
			return projectRepository.findById(id).map(projectdata -> {

				LocalDate today_date = LocalDate.now();
				String today_year = String.valueOf(today_date.getYear());
				int year = today_date.getYear();

				List<String> ioNumbers = projectRepository.findIONumberForProject(today_year, projectdata.getId());

				List<ProjectExpenseResponse> projectExpenseReponse = new ArrayList<>();

				for (String ioNumber : ioNumbers) {

					double total_expense = 0;

					double IODump = ioNumRepo.findTotalAmountForProject(ioNumber);

					double CCDump = ccDumpRepository.findTotalAmountCostCenterForProject(projectdata.getCost_center(),
							year);

					total_expense = IODump + CCDump;

					ProjectExpenseResponse projectExpenseData = new ProjectExpenseResponse();
					projectExpenseData.setIonumber(ioNumber);
					projectExpenseData.setYear(today_year);
					projectExpenseData.setExpense(total_expense);
					projectExpenseReponse.add(projectExpenseData);

				}

				return ResponseHandler.generateResponse("Project Expense Retrieved Successfully", true, HttpStatus.OK,
						projectExpenseReponse);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: project ID " + id + " Doesn't exist");
				return ResponseHandler.generateResponse("project ID " + id + " Doesn't exist", false, HttpStatus.OK,
						null);
			});

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while post by io number: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

}

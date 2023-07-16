package com.intelizign.dmgcc.controllers.othermaster;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

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

import com.intelizign.dmgcc.models.othermaster.MaterailCodeModel;
import com.intelizign.dmgcc.repositories.othermaster.MaterialCodeRepository;
import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.services.FilesStorageServicePath;
import com.intelizign.dmgcc.services.othermaster.CreateCSVFile;

@RestController
@RequestMapping("/materialcode")
public class MaterialCodeController {

	@Autowired
	FilesStorageServicePath storageServicepath;

	@Autowired
	CreateCSVFile csvservice;

	private final MaterialCodeRepository materialCodeRepo;

	public final Logger LOGGER = LogManager.getLogger(MaterialCodeController.class);

	MaterialCodeController(MaterialCodeRepository materialCodeRepo) {

		this.materialCodeRepo = materialCodeRepo;
	}

	@GetMapping("/download")
	public ResponseEntity<Resource> getFile() {
		String filename = "materialCode.csv";
		InputStreamResource file = new InputStreamResource(csvservice.loadMaterialObjs());
		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
				.contentType(MediaType.parseMediaType("application/vnd.ms-word")).body(file);
	}
	

	@PostMapping(value = "/uploadnewmaterialcode", consumes = { "multipart/form-data" })
	public ResponseEntity<Object> uploadnewMaterialCodeCsv(@RequestParam("file") MultipartFile file) {
		try {
			String csvType = "text/csv";
			List<MaterailCodeModel> materialListRes = new ArrayList<>();
			List<String> tableData = List.of("CostCenter", "MaterialName", "Code", "Description", "SACCode", "Country",
					"HasMarkup", "IsActive", "IsTaxable", "Fx", "WHT");

			List<String> sortedTableColumn = tableData.stream().sorted().toList();

			String contenttype = file.getContentType();

			BufferedReader fileReader = new BufferedReader(
					new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8));
			CSVParser csvParser = new CSVParser(fileReader,
					CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());

			List<CSVRecord> csvRecords = csvParser.getRecords();

			if (csvRecords.size() > 0) {
				List<String> sortedCSVColumn = csvRecords.get(0).getParser().getHeaderNames().stream().sorted()
						.toList();

				boolean status = sortedCSVColumn.equals(sortedTableColumn);
				if (contenttype != null && contenttype.equals(csvType)) {
					if (status) {
						// delete the existing records and save latest excel data
						List<MaterailCodeModel> materialObjs = materialCodeRepo.findAll();
						if (!materialObjs.isEmpty()) {
							materialCodeRepo.deleteAll();
						}
						for (CSVRecord csvRecord : csvRecords) {
							MaterailCodeModel materialObj = new MaterailCodeModel();
							materialObj.setCostcenter(csvRecord.get("CostCenter"));
							materialObj.setMaterialname(csvRecord.get("MaterialName"));
							materialObj.setCode(csvRecord.get("Code"));
							materialObj.setDescription(csvRecord.get("Description"));
							materialObj.setSaccode(csvRecord.get("SACCode"));
							materialObj.setCountry(csvRecord.get("Country"));
							materialObj.setHas_markup("1".equals(csvRecord.get("HasMarkup").trim()));
							materialObj.setIsactive("1".equals(csvRecord.get("IsActive").trim()));
							materialObj.setIs_taxable("1".equals(csvRecord.get("IsTaxable").trim()));
							materialObj.setHas_fx("1".equals(csvRecord.get("Fx").trim()));
							materialObj.setHas_wht("1".equals(csvRecord.get("WHT").trim()));

							materialListRes.add(materialObj);
							materialCodeRepo.save(materialObj);
						}
						LOGGER.error("MaterialCode Data inserted from upload file:  ");
						return ResponseHandler.generateResponse("MaterialCode Data inserted from upload csv file:  ",
								true, HttpStatus.OK, null);
					} else {
						LOGGER.error("Column Names Are Not Equal:  ");
						return ResponseHandler.generateResponse("Column Names Are Not Equal:  ", false, HttpStatus.OK,
								null);
					}
				} else {
					LOGGER.error("Uploaded File is Not a Csv File:");
					return ResponseHandler.generateResponse("Uploaded file is not an .csv file", false, HttpStatus.OK,
							null);
				}
			}

			else {
				LOGGER.error("File must not be empty:  ");
				return ResponseHandler.generateResponse("File must not be empty:  ", false, HttpStatus.OK, null);
			}

		} catch (Exception e) {
			storageServicepath.delete(file.getOriginalFilename());
			LOGGER.error("Error while Creating .csv records " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	@PostMapping(value = "/uploadmaterialcode", consumes = { "multipart/form-data" })
	public ResponseEntity<Object> uploadMaterialCodeCsv(@RequestParam("file") MultipartFile file) {
		try {
			String csvType = "text/csv";
			List<MaterailCodeModel> materialListRes = new ArrayList<>();
			List<String> tableData = List.of("CostCenter", "MaterialName", "Code", "Description", "SACCode", "Country",
					"HasMarkup", "IsActive", "IsTaxable", "Fx", "WHT");
			List<String> sortedTableColumn = tableData.stream().sorted().toList();

			String contenttype = file.getContentType();

			BufferedReader fileReader = new BufferedReader(
					new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8));
			CSVParser csvParser = new CSVParser(fileReader,
					CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());

			List<CSVRecord> csvRecords = csvParser.getRecords();

			if (csvRecords.size() > 0) {
				List<String> sortedCSVColumn = csvRecords.get(0).getParser().getHeaderNames().stream().sorted()
						.toList();

				boolean status = sortedCSVColumn.equals(sortedTableColumn);
				if (contenttype != null && contenttype.equals(csvType)) {
					if (status) {
						for (CSVRecord csvRecord : csvRecords) {
							MaterailCodeModel materialObj = new MaterailCodeModel();

							materialObj.setCostcenter(csvRecord.get("CostCenter"));
							materialObj.setMaterialname(csvRecord.get("MaterialName"));
							materialObj.setCode(csvRecord.get("Code"));
							materialObj.setDescription(csvRecord.get("Description"));
							materialObj.setSaccode(csvRecord.get("SACCode"));
							materialObj.setCountry(csvRecord.get("Country"));
							materialObj.setHas_markup("1".equals(csvRecord.get("HasMarkup").trim()));
							materialObj.setIsactive("1".equals(csvRecord.get("IsActive").trim()));
							materialObj.setIs_taxable("1".equals(csvRecord.get("IsTaxable").trim()));
							materialObj.setHas_fx("1".equals(csvRecord.get("Fx").trim()));
							materialObj.setHas_wht("1".equals(csvRecord.get("WHT").trim()));

							materialListRes.add(materialObj);
							materialCodeRepo.save(materialObj);
						}
						LOGGER.error("MaterialCode Data inserted from upload file:  ");
						return ResponseHandler.generateResponse("MaterialCode Data inserted from upload csv file:  ",
								true, HttpStatus.OK, materialListRes);
					} else {
						LOGGER.error("Column Names Are Not Equal:  ");
						return ResponseHandler.generateResponse("Column Names Are Not Equal:  ", false, HttpStatus.OK,
								null);
					}
				} else {
					LOGGER.error("Uploaded File is Not a Csv File:");
					return ResponseHandler.generateResponse("Uploaded file is not an .csv file", false, HttpStatus.OK,
							null);
				}
			} else {
				LOGGER.error("File must not be empty:  ");
				return ResponseHandler.generateResponse("File must not be empty:  ", false, HttpStatus.OK, null);
			}
		} catch (Exception e) {
			storageServicepath.delete(file.getOriginalFilename());
			LOGGER.error("Error while Creating .csv records " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	@PostMapping(value = "/bulkinsert")
	public ResponseEntity<Object> createMaterialCodes(@RequestBody List<MaterailCodeModel> materailCodeObjs) {
		try {
			List<MaterailCodeModel> materialCodeObjs = new ArrayList<>();

			for (MaterailCodeModel materailCodeModel : materailCodeObjs) {
				materialCodeRepo.save(materailCodeModel);
				materialCodeObjs.add(materailCodeModel);
			}

			return ResponseHandler.generateResponse("Created Material Code objects successfully", true, HttpStatus.OK,
					materialCodeObjs);

		}

		catch (Exception e) {
			LOGGER.error("Error while creating material code objects" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	@PostMapping(value = "/create")
	public ResponseEntity<Object> createMaterialCode(@RequestBody MaterailCodeModel materialCode) {
		try {

			MaterailCodeModel materailCodedata = materialCodeRepo.save(materialCode);
			return ResponseHandler.generateResponse("Created Material Code object successfully", true, HttpStatus.OK,
					materailCodedata);
		} catch (Exception e) {
			LOGGER.error("Error while creating material code object" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	@GetMapping("")
	public ResponseEntity<Object> findAllMaterialCodeObjs(@RequestParam String searchKeyword,
			@PageableDefault(size = 10, page = 0, sort = "id", direction = Direction.DESC) Pageable pageable) {
		try {
			Page<MaterailCodeModel> materialCodedata = materialCodeRepo.findAll(searchKeyword, pageable);
			return ResponseHandler.generateResponse("List of Material Code Objects", true, HttpStatus.OK,
					materialCodedata);
		} catch (Exception e) {
			LOGGER.error("Error while Fetching Records in Material Code" + e.getMessage());
			return ResponseHandler.generateResponse(e.getMessage(), false, HttpStatus.OK, null);
		}

	}

	@GetMapping(value = "/getmaterialcode")
	public ResponseEntity<Object> findAllMaterialCodeData(@RequestParam(required = true) String costcenter,
			@RequestParam(required = true) String country, @RequestParam(required = false) String materialdescription) {
		try {
			List<MaterailCodeModel> materialCodedata = null;

			if (materialdescription != null && !materialdescription.isBlank() && !materialdescription.isEmpty()) {

				materialCodedata = materialCodeRepo.findAllByCostcenterAndContractAndDescription(costcenter,
						materialdescription , country);
			} else
				materialCodedata = materialCodeRepo.findAllByCostcenterAndContractOption(costcenter , country);

			return ResponseHandler.generateResponse("List of material Code Data", true, HttpStatus.OK,
					materialCodedata);
		} catch (Exception e) {
			LOGGER.error("Error while Fetching Records in materialcode data" + e.getMessage());
			return ResponseHandler.generateResponse(e.getMessage(), false, HttpStatus.OK, null);
		}

	}

	@GetMapping("/getnames/{costcenter}")
	public ResponseEntity<Object> getMaterialCode(@PathVariable String costcenter) {
		try {
			List<MaterailCodeModel> materialCodedata = materialCodeRepo.findAll();
			materialCodedata.stream().forEach(data -> {
				if (data.getMaterialname() != null && data.getDescription() != null) {
					data.setDescription((data.getDescription() + "-" + data.getMaterialname()));
				}
			});
			return ResponseHandler.generateResponse("List of Material Code Objects", true, HttpStatus.OK,
					materialCodedata);
		} catch (Exception e) {
			LOGGER.error("Error while Fetching Records in Material Code" + e.getMessage());
			return ResponseHandler.generateResponse(e.getMessage(), false, HttpStatus.OK, null);
		}

	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<Object> getMaterialById(@PathVariable Long id) {
		try {
			return materialCodeRepo.findById(id)
					.map(materialdata -> ResponseHandler.generateResponse(
							"Material code based on id Retrived Successfully", true, HttpStatus.OK, materialdata))
					.orElseGet(() -> {
						LOGGER.error("Exceptions happen!: material code " + id
								+ " Doesn't exist to Fetch Materail Code Information");
						return ResponseHandler.generateResponse(
								"material code " + id + " Doesn't exist to Fetch Materail Code Information", false,
								HttpStatus.OK, null);
					});
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while Fetching Material Code Information: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	@PutMapping(value = "/update/{id}")
	public ResponseEntity<Object> updateMaterialCode(@PathVariable Long id,
			@Valid @RequestBody MaterailCodeModel materialMdlObj) {
		try {
			return materialCodeRepo.findById(id).map(updatedata -> {

				updatedata.setCostcenter(materialMdlObj.getCostcenter());
				updatedata.setMaterialname(materialMdlObj.getMaterialname());
				updatedata.setCode(materialMdlObj.getCode());
				updatedata.setDescription(materialMdlObj.getDescription());
				updatedata.setHas_markup(materialMdlObj.getHas_markup());
				updatedata.setIsactive(materialMdlObj.getIsactive());
				updatedata.setSaccode(materialMdlObj.getSaccode());
				updatedata.setIs_taxable(materialMdlObj.getIs_taxable());
				updatedata.setHas_wht(materialMdlObj.getHas_wht());
				updatedata.setHas_fx(materialMdlObj.getHas_fx());
				updatedata.setCountry(materialMdlObj.getCountry());

				materialCodeRepo.save(updatedata);

				return ResponseHandler.generateResponse("Material Code Updated Successfully", true, HttpStatus.OK,
						updatedata);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: material code " + id
						+ " Doesn't exist to Update Material Code Information");
				return ResponseHandler.generateResponse(
						"material code " + id + " Doesn't exist to Update Material Code Information", false,
						HttpStatus.OK, null);
			});
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while Updating Material Code Information : " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	@DeleteMapping("delete/{id}")
	public ResponseEntity<Object> DeleteMaterialCodeObj(@PathVariable Long id) {
		try {
			return materialCodeRepo.findById(id).map(updatedata -> {

				materialCodeRepo.delete(updatedata);
				return ResponseHandler.generateResponse("Material Code Information Deleted Successfully", true,
						HttpStatus.OK, null);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Material Code with " + id
						+ " Doesn't exist to Delete Material Code Information");
				return ResponseHandler.generateResponse(
						"Material Code with " + id + " Doesn't exist to Delete Material Code Information", false,
						HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while Deleting Material Code information:" + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}
}

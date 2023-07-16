package com.intelizign.dmgcc.controllers.othermaster;

import java.util.List;

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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.intelizign.dmgcc.repositories.othermaster.GLGroupingRepository;
import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.services.othermaster.GLGroupingService;

@RestController
@RequestMapping("/glgrouping")
public class GLGroupingController {

	@Autowired
	private GLGroupingRepository glGroupingRepository;

	@Autowired
	private GLGroupingService glGroupingService;

	public final Logger LOGGER = LogManager.getLogger(GLGroupingController.class);

	@PostMapping(path = "/upload", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<Object> uploadFile(@RequestParam("file") MultipartFile file) {

		String excel_Type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
		List<String> tableData = List.of("GL", "GL description", "GL grouping");
		List<String> tableHeader = tableData.stream().sorted().toList();
		String SHEET = "Sheet1";

		if (file.getContentType().equals(excel_Type)) {
			try {

				List<String> RequestHeader = glGroupingService.sortHeaderColumns(file, SHEET);

				List<String> sorted_requestHeader = RequestHeader.stream().sorted().toList();

				if (tableHeader.equals(sorted_requestHeader)) {
					glGroupingRepository.deleteAll();
					glGroupingService.save(file);
				}

				else {
					LOGGER.error("Column names are not equal:");
					return ResponseHandler.generateResponse("Column names are not equal:", false, HttpStatus.OK, null);
				}

				LOGGER.error("GL Grouping Data inserted from upload file: ");
				return ResponseHandler.generateResponse("GL Grouping Data inserted from upload file: ", false,
						HttpStatus.OK, null);

			} catch (Exception e) {
				LOGGER.error("Could not upload the file:  ");
				return ResponseHandler.generateResponse("Could not upload the file:  ", false, HttpStatus.OK, null);
			}
		}
		LOGGER.error("Please upload an excel file!");
		return ResponseHandler.generateResponse("Please upload an excel file!", false, HttpStatus.OK, null);
	}

	@GetMapping("/glgroupingreport")
	public ResponseEntity<Resource> glgroupingExport() {

		InputStreamResource file = new InputStreamResource(glGroupingService.glgroupingExport());
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + "glgrouping_data.xlsx")
				.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);

	}
}

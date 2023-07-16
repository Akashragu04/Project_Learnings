package com.daimler.schematicbackend.controller.master;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.daimler.schematicbackend.config.SchematicValidationConfig;
import com.daimler.schematicbackend.entity.file.BulkUploadDetails;
import com.daimler.schematicbackend.entity.file.BulkUploadValidation;
import com.daimler.schematicbackend.exception.file.SchematicFileException;
import com.daimler.schematicbackend.model.generic.SchematicBulkUploadResponse;
import com.daimler.schematicbackend.repository.file.BulkUploadValidationRepository;
import com.daimler.schematicbackend.service.file.SchematicBulkUploadService;

/**
 * The Class SchematicBulkUploadController.
 */
@RestController
@Component
public class SchematicBulkUploadController implements ISchematicBulkUpload {

	@Autowired
	SchematicBulkUploadService schematicBulkUploadService;

	@Autowired
	BulkUploadValidationRepository bulkUploadValidationRepository;

	@Autowired
	SchematicValidationConfig validationConfig;

//	@Value("${bulkUpload.path}")
//	private String filepath;

	@Override
	@PostMapping("/commodityBulkUpload")
	public ResponseEntity<SchematicBulkUploadResponse> uploadFile(String userName, String folderName,
			BulkUploadValidation validationData) throws IOException, SchematicFileException {
		try {

//			Optional<BulkUploadValidation> test = bulkUploadValidationRepository.findById(1l);
//			if (test.isPresent()) {
//				validationData = test.get();
//			} else {
//				validationData = bulkUploadValidationRepository.save(new BulkUploadValidation(1l, true, false));
//			}

			// Checking whether bulk upload is already in progress

			if (validationData != null && !validationData.isInprogress() && validationData.isEnable()) {

				validationData.setEnable(false);
				bulkUploadValidationRepository.save(validationData);

				boolean fileCheck = true;

				// change bulk upload in progress
				validationData.setInprogress(true);
				bulkUploadValidationRepository.save(validationData);

				String path = validationConfig.getFilepath() + folderName + File.separator;

				File[] directories = new File(path).listFiles();

				List<BulkUploadDetails> bulkUploadDetails = new ArrayList<>();
				if (directories != null) {
					boolean uploaded = schematicBulkUploadService.processFile(userName, fileCheck, directories,
							bulkUploadDetails);

					// change in progress status ater bulk uploading
					validationData.setEnable(true);
					validationData.setInprogress(false);
					bulkUploadValidationRepository.save(validationData);

					if (uploaded) {
						return ResponseEntity
								.ok(new SchematicBulkUploadResponse("Upload Successful.", bulkUploadDetails));
					} else {
						return ResponseEntity.badRequest()
								.body(new SchematicBulkUploadResponse("Upload Failed. Please check Commodities", null));
					}
				} else {

					// change in progress status ater bulk uploading
					validationData.setEnable(true);
					validationData.setInprogress(false);
					bulkUploadValidationRepository.save(validationData);
					return ResponseEntity.badRequest()
							.body(new SchematicBulkUploadResponse("Upload Failed. Please check Path and Folder", null));
				}
			} else {
				return ResponseEntity.badRequest()
						.body(new SchematicBulkUploadResponse("Bulk Upload is Already in Progress", null));
			}
		} catch (NullPointerException e) {
			return ResponseEntity.badRequest().body(new SchematicBulkUploadResponse("Please Check the Path", null));
		}
	}

	@GetMapping("/uploadStatus")
	public BulkUploadValidation getValidationStatus() {
		Optional<BulkUploadValidation> validationData = bulkUploadValidationRepository.findById(1l);
		if (validationData.isPresent()) {
			return validationData.get();
		} else {
			return bulkUploadValidationRepository.save(new BulkUploadValidation(1l, true, false));
		}

	}

}

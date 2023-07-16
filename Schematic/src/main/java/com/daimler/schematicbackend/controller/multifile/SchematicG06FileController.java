package com.daimler.schematicbackend.controller.multifile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.daimler.schematicbackend.entity.file.CommodityDetails;
import com.daimler.schematicbackend.entity.file.ErrorMessage;
import com.daimler.schematicbackend.exception.file.SchematicFileException;
import com.daimler.schematicbackend.model.file.SchematicMultiFileProcessable;
import com.daimler.schematicbackend.model.generic.SchematicGenericFileUploadResponse;
import com.daimler.schematicbackend.repository.file.SchematicCommodityDetailsRepository;
import com.daimler.schematicbackend.service.async.SchematicAsyncExcelService;
import com.daimler.schematicbackend.service.file.SchematicCommodityAssignedService;
import com.daimler.schematicbackend.service.file.SchematicG06FileService;
import com.daimler.schematicbackend.utils.file.SchematicFileErrorMessageUtils;
import com.daimler.schematicbackend.validator.SchematicFileFormatValidator;

/**
 * The Class SchematicG06FileController.
 */
@RestController
public class SchematicG06FileController implements ISchematicMultiFileEndpoint {

	/**
	 * The schematic G 06 file service.
	 */
	@Autowired
	SchematicG06FileService schematicG06FileService;

	@Autowired
	SchematicFileErrorMessageUtils utils;

	@Autowired
	SchematicFileFormatValidator validator;

	@Autowired
	SchematicCommodityAssignedService commodityAssignedService;

	@Autowired
	SchematicAsyncExcelService excelService;

	@Autowired
	SchematicCommodityDetailsRepository commodityRepository;

	/**
	 * Upload file.
	 *
	 * @param multipart the multipart
	 * @param userName  the user name
	 * @return the response entity
	 * @throws IOException            Signals that an I/O exception has occurred.
	 * @throws SchematicFileException the schematic file exception
	 */
	@Override
	@PostMapping("/g06Data")
	public ResponseEntity<SchematicGenericFileUploadResponse> uploadFile(List<MultipartFile> multipart, String userName,
			boolean fileCheck) throws SchematicFileException, IOException {
		// boolean fileCheck = true;
		String fileName = multipart.get(0).getOriginalFilename();
		String commodityName = fileName.split("_")[0];
		boolean existFileStatus = false;
		SchematicMultiFileProcessable processable = validator.validateG06(multipart);
		List<String> genericErrors = processable.getErrorMessageList();
		List<String> warnMessage = new ArrayList<>();
		List<ErrorMessage> sheetErrors = new ArrayList<>();
		if (ObjectUtils.isNotEmpty(processable.getMultipartFileList())) {
			multipart = processable.getMultipartFileList();
			genericErrors.addAll(
					schematicG06FileService.processFile(multipart, sheetErrors, fileCheck, warnMessage, userName));
			sheetErrors.addAll(multipart.stream().map(elem -> StringUtils.toRootUpperCase(elem.getOriginalFilename()))
					.filter(elem -> StringUtils.contains(elem, ".XLSX"))
					.map(elem -> utils.messageList(elem.replace(".XLSX", ""))).flatMap(Collection::stream)
					.collect(Collectors.toList()));
		}
		if (ObjectUtils.isEmpty(genericErrors) && ObjectUtils.isEmpty(sheetErrors)) {

			if (ObjectUtils.isNotEmpty(warnMessage) && !fileCheck) {
				return ResponseEntity.ok(new SchematicGenericFileUploadResponse("File Already Exist", genericErrors,
						sheetErrors, warnMessage));
			} else {
				excelService.markRenderability();
				commodityAssignedService.assignCommoditiesToUser();

				CommodityDetails assignedCommodity = commodityRepository.findByCommodityName(commodityName);

				if (assignedCommodity != null) {
					assignedCommodity.setStatus("ASSIGNED");
					commodityRepository.save(assignedCommodity);
				}

				if (fileCheck) {
					return ResponseEntity.ok(new SchematicGenericFileUploadResponse("Upload Successful.", genericErrors,
							sheetErrors, null));
				} else {
					return ResponseEntity.ok(new SchematicGenericFileUploadResponse("Upload Successful.", genericErrors,
							sheetErrors, warnMessage));
				}
			}

		} else {
			String type = utils.getErrorType(genericErrors, sheetErrors);
			return ResponseEntity.badRequest()
					.body(new SchematicGenericFileUploadResponse(type, genericErrors, sheetErrors, warnMessage));
		}
	}

}

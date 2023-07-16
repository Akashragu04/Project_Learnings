package com.daimler.schematicbackend.service.file;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.daimler.schematicbackend.entity.file.DatabaseFileData;
import com.daimler.schematicbackend.entity.render.SchematicMetadataChangeHistory;
import com.daimler.schematicbackend.exception.file.SchematicFileException;
import com.daimler.schematicbackend.model.file.SchematicDatabaseExcelData;
import com.daimler.schematicbackend.repository.file.SchematicCustomImageRepository;
import com.daimler.schematicbackend.repository.file.SchematicDatabaseDataRepository;
import com.daimler.schematicbackend.repository.render.SchematicMetadataChangeHistoryRepository;
import com.daimler.schematicbackend.utils.file.SchematicExcelFileUtils;
import com.daimler.schematicbackend.utils.file.SchematicFileConstant;
import com.daimler.schematicbackend.utils.file.SchematicFileErrorMessageUtils;
import com.poiji.bind.Poiji;

/**
 * The Class SchematicDatabaseFileService.
 */
@Service
public class SchematicDatabaseFileService {

	static final String ERROR_MESSAGE = "Information for the connector: {connector}  already exists";
	static final String IMAGE_ERROR = "Custom Image with file name : {image} missing for :{connector}";
	static final String VALIDATION_ERROR = " cannot be Blank";
	/**
	 * The file utils.
	 */
	@Autowired
	SchematicExcelFileUtils fileUtils;
	/**
	 * The error message utils.
	 */
	@Autowired
	SchematicFileErrorMessageUtils errorMessageUtils;
	/**
	 * The schematic database data repository.
	 */
	@Autowired
	SchematicDatabaseDataRepository schematicDatabaseDataRepository;

	@Autowired
	SchematicCustomImageRepository repository;

	@Autowired
	SchematicMetadataChangeHistoryRepository changeHistoryRepository;

	/**
	 * Process file.
	 *
	 * @param multipartFile the multipart file
	 * @return the list
	 * @throws SchematicFileException the schematic file exception
	 */
	public List<String> processFile(MultipartFile multipartFile, String userName, AtomicBoolean connWarning)
			throws SchematicFileException {
		List<String> errorMessage = new ArrayList<>();
		if (ObjectUtils.isEmpty(multipartFile)) {
			throw new SchematicFileException("No File observed as part of this request");
		}
		Path filepath = Paths.get(SchematicFileConstant.BASE_PATH, multipartFile.getOriginalFilename());
		String filename = fileUtils.validateAndConvertMultiPartFile(multipartFile, errorMessage);
		if (StringUtils.isNotEmpty(filename)) {
			boolean saveFileToLocal = fileUtils.saveFileToLocal(multipartFile, filepath, errorMessage);
			if (saveFileToLocal) {
				boolean isValidDbFile = validateExcelDatabase(new File(filepath.toString()), errorMessage, filename,
						userName, connWarning);
				if (isValidDbFile && errorMessage.isEmpty()) {
					fileUtils.saveFileData(filepath.toString(), SchematicFileConstant.METADATA, filename, errorMessage);
				}
				try {
					fileUtils.deleteIfFileAlreadyExists(filepath);
				} catch (IOException ex) {
					errorMessage.add("Error deleting local file:" + filename);
				}
			}
		}
		return errorMessage;
	}

	/**
	 * Validate excel A 06.
	 *
	 * @param file         the file
	 * @param errorMessage the error message
	 * @param filename     the filename
	 * @return true, if successful
	 */
	private boolean validateExcelDatabase(File file, List<String> errorMessage, String filename, String userName,
			AtomicBoolean connWarning) {
		boolean retValue = false;
		List<SchematicDatabaseExcelData> dataList = null;
		String name = file.getName();
		if (name.contains(".XLSX") || name.contains("XLS")) {
			File processFile = new File(file.getParent(), name.toLowerCase(Locale.ROOT));
			dataList = Poiji.fromExcel(processFile, SchematicDatabaseExcelData.class);
		} else {
			dataList = Poiji.fromExcel(file, SchematicDatabaseExcelData.class);
		}
		if (ObjectUtils.isEmpty(dataList)) {
			errorMessage.add("Excel: " + filename + "does not contain any data");
		} else if (ObjectUtils.isNotEmpty(dataList)) {
			errorMessageUtils.deleteBySheetName(filename);
			ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
			Validator validator = factory.getValidator();
			Set<ConstraintViolation<SchematicDatabaseExcelData>> violations = null;
			for (SchematicDatabaseExcelData data : dataList) {
				violations = validator.validate(data);
				List<String> errors = new ArrayList<>();
				violations.stream().forEach(error -> errors
						.add(StringUtils.capitalize(error.getPropertyPath().toString()) + "" + VALIDATION_ERROR));
				List<String> commonErrors = errors.stream().distinct().collect(Collectors.toList());
				commonErrors.stream().forEach(
						errorData -> errorMessageUtils.buildErrorMessage(errorData, filename, data.getRowIndex()));
			}

			// Validation connector description before uploading DB sheet
			List<String> all_connector_desc = new ArrayList<>();
			dataList.stream().forEach(data -> all_connector_desc.add(data.getConnectorDesc()));

			Set<String> duplicate_connectors = all_connector_desc.stream()
					.filter(connectors -> Collections.frequency(all_connector_desc, connectors) > 1)
					.collect(Collectors.toSet());

			duplicate_connectors.stream().forEach(conn -> {
				errorMessage.add("Duplicate Connector Description " + conn);
			});

			// connectortype validation

			if (ObjectUtils.isEmpty(violations) && errorMessage.isEmpty()
					&& errorMessageUtils.messageList(filename).isEmpty()) {
				dataList.stream().forEach(data -> {
					if (data.getConnectorType().equals("CIRCLE") || data.getConnectorType().equals("TRIANGLE")
							|| data.getConnectorType().equals("SQUARE")) {
						connWarning.set(true);
					}

					if (data.getConnectorType().equals("CUSTOM IMAGE") && data.getImageName() == null
							&& data.getConnectorDesc() != null) {
						errorMessage.add("Image name cannot be blank for " + data.getConnectorDesc());
					}
				});
			}

			// save file after validation

			if (ObjectUtils.isEmpty(violations) && errorMessage.isEmpty()
					&& errorMessageUtils.messageList(filename).isEmpty()) {
				retValue = saveDatabseFileData(dataList, filename, userName);
			}
		}
		return retValue;
	}

	/**
	 * Save databse file data.
	 *
	 * @param dataList the data list
	 * @param filename the filename
	 * @return true, if successful
	 */
	private boolean saveDatabseFileData(List<SchematicDatabaseExcelData> dataList, String filename, String userName) {

		schematicDatabaseDataRepository.deleteByFileName(filename);

		AtomicBoolean retValue = new AtomicBoolean(true);
		List<DatabaseFileData> savedData = new ArrayList<>();
		ModelMapper mapper = new ModelMapper();
		AtomicInteger count = new AtomicInteger(0);
		String version = getDatabaseVersion(userName);
		dataList.forEach(elem -> {
			retValue.set(true);
			DatabaseFileData data = mapper.map(elem, DatabaseFileData.class);

			count.getAndIncrement();
			String imageName = elem.getImageName();
			if (StringUtils.isNotEmpty(imageName) && StringUtils.isNotBlank(imageName)) {
				String dbImageName = StringUtils.toRootUpperCase(elem.getImageName()).replaceAll("[ _]",
						StringUtils.EMPTY) + ".PNG";
				if (!repository.existsByCustomImageName(dbImageName)) {
					retValue.set(false);
					errorMessageUtils.buildErrorMessage(buildImageError(elem.getConnectorDesc(), imageName), filename,
							count.get());
				}
			}
			if (retValue.get()) {
//				if (schematicDatabaseDataRepository.existsByConnectorDesc(elem.getConnectorDesc())) {
//					schematicDatabaseDataRepository.deleteByConnectorDesc(elem.getConnectorDesc());
//				}
				data.setFileName(filename);
				data.setImageName(imageName);
				data.setVersion(version);
				data.setUserName(userName);
				data.setUploadDate(LocalDate.now());
				savedData.add(data);
			}
		});

		schematicDatabaseDataRepository.saveAll(savedData);
		return retValue.get();
	}

	private String getDatabaseVersion(String userName) {
		String version = null;
		List<SchematicMetadataChangeHistory> metadataChangeHistories = changeHistoryRepository.findAll();
		if (ObjectUtils.isEmpty(metadataChangeHistories)) {
			version = "1.0";
		} else {
			SchematicMetadataChangeHistory schematicMetadataChangeHistory = metadataChangeHistories.stream()
					.max(Comparator.comparingInt(SchematicMetadataChangeHistory::getId)).get();
			int first = schematicMetadataChangeHistory.getVersion().charAt(0) - '0';
			int last = schematicMetadataChangeHistory.getVersion().charAt(2) - '0';
			if (last == 9) {
				last = 0;
				first++;
			} else {
				++last;
			}
			version = first + "." + last;
		}
		SchematicMetadataChangeHistory history = SchematicMetadataChangeHistory.builder().version(version)
				.uploadedBy(userName).uploadedDate(LocalDateTime.now()).build();
		changeHistoryRepository.save(history);
		return version;
	}

	/**
	 * Crete error message for database file
	 *
	 * @param connectorName, connector name
	 * @return String value
	 */
	private String createErrorMessage(String connectorName) {
		return ERROR_MESSAGE.replace("{connector}", connectorName);
	}

	private String buildImageError(String connectorName, String imageName) {
		return IMAGE_ERROR.replace("{image}", imageName).replace("{connector}", connectorName);
	}

}

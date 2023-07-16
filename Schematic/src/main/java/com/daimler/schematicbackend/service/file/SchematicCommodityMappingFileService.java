package com.daimler.schematicbackend.service.file;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;

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

import com.daimler.schematicbackend.entity.file.SGMapping;
import com.daimler.schematicbackend.exception.file.SchematicFileException;
import com.daimler.schematicbackend.model.file.SchematicCommodityMappingExcelData;
import com.daimler.schematicbackend.repository.file.SchematicSGMappingRepository;
import com.daimler.schematicbackend.utils.file.SchematicExcelFileUtils;
import com.daimler.schematicbackend.utils.file.SchematicFileConstant;
import com.daimler.schematicbackend.utils.file.SchematicFileErrorMessageUtils;
import com.poiji.bind.Poiji;

/**
 * The Class SchematicCommodityMappingFileService.
 */
@Service
public class SchematicCommodityMappingFileService {

	static final String ERROR_MESSAGE = "Information for the SG combination: {sxxConnector} and {g06Name} already exists";
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
	 * The schematic SG mapping repository.
	 */
	@Autowired
	SchematicSGMappingRepository schematicSGMappingRepository;

	/**
	 * Process file.
	 *
	 * @param multipartFile the multipart file
	 * @return the list
	 * @throws SchematicFileException the schematic file exception
	 */
	public List<String> processFile(MultipartFile multipartFile, String user_Name) throws SchematicFileException {

		List<String> errorMessage = new ArrayList<>();
		if (ObjectUtils.isEmpty(multipartFile)) {
			throw new SchematicFileException("No File observed as part of this request");
		}
		Path filepath = Paths.get(SchematicFileConstant.BASE_PATH, multipartFile.getOriginalFilename());
		String filename = fileUtils.validateAndConvertMultiPartFile(multipartFile, errorMessage);
		if (StringUtils.isNotEmpty(filename)) {
			boolean saveFileToLocal = fileUtils.saveFileToLocal(multipartFile, filepath, errorMessage);
			if (saveFileToLocal) {
				boolean flag = false;
				boolean isValidMappingExcel = validateSGMappingExcel(new File(filepath.toString()), errorMessage,
						filename, user_Name);
				if (isValidMappingExcel && errorMessage.isEmpty()) {
					fileUtils.saveFileData(filepath.toString(), SchematicFileConstant.SG_MAPPING, filename,
							errorMessage);
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
	 * Validate SG mapping excel.
	 *
	 * @param file         the file
	 * @param errorMessage the error message
	 * @param filename     the filename
	 * @return true, if successful
	 */
	private boolean validateSGMappingExcel(File file, List<String> errorMessage, String filename, String user_Name) {
		boolean retValue = false;
		List<SchematicCommodityMappingExcelData> dataList = null;
		String name = file.getName();
		if (name.contains(".XLSX") || name.contains("XLS")) {
			File processFile = new File(file.getParent(), name.toLowerCase(Locale.ROOT));
			dataList = Poiji.fromExcel(processFile, SchematicCommodityMappingExcelData.class);
		} else {
			dataList = Poiji.fromExcel(file, SchematicCommodityMappingExcelData.class);
		}
		if (ObjectUtils.isEmpty(dataList)) {
			errorMessage.add("Excel: " + filename + "is empty");
		} else if (ObjectUtils.isNotEmpty(dataList)) {
			errorMessageUtils.deleteBySheetName(filename);
			ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
			Validator validator = factory.getValidator();
			Set<ConstraintViolation<SchematicCommodityMappingExcelData>> violations = null;
			for (SchematicCommodityMappingExcelData data : dataList) {
				violations = validator.validate(data);
				for (ConstraintViolation<SchematicCommodityMappingExcelData> violation : violations) {
					errorMessageUtils.buildErrorMessage(violation.getMessage(), filename, data.getRowIndex());
				}
			}

			if (ObjectUtils.isEmpty(violations) && errorMessage.isEmpty()) {
				retValue = saveCommodityMappingFileData(dataList, filename, user_Name, errorMessage);
			}
		}
		return retValue;
	}

	/**
	 * Save commodity mapping file data.
	 *
	 * @param dataList the data list
	 * @param filename the filename
	 * @return true, if successful
	 */
	private boolean saveCommodityMappingFileData(List<SchematicCommodityMappingExcelData> dataList, String filename,
			String user_Name, List<String> errorMessage) {
		AtomicBoolean retValue = new AtomicBoolean(true);
		List<SGMapping> savedData = new ArrayList<>();
		ModelMapper mapper = new ModelMapper();
		AtomicInteger count = new AtomicInteger(1);

		// pre validation

		dataList.stream().forEach(data -> {
			String G06Name = data.getG06Name().toUpperCase();
			if (G06Name.contains(".XLSX")) {
				errorMessage.add("Remove extention for " + G06Name);
			}
			int spllitedG06Name = G06Name.split("_").length;
			if (spllitedG06Name <= 2) {
				errorMessage.add("Please upload valid format of " + G06Name);
			}

		});

		if (ObjectUtils.isNotEmpty(errorMessage)) {
			retValue.set(false);
			return retValue.get();
		}

		schematicSGMappingRepository.deleteSGMappingByCommodityName(dataList.get(0).getSxxName());
		dataList.forEach(elem -> {
			if (!schematicSGMappingRepository.existsByG06NameAndSxxName(elem.getG06Name(), elem.getSxxName())) {
				SGMapping data = mapper.map(elem, SGMapping.class);
				data.setFileName(filename);
				java.sql.Timestamp sqluploadDate = java.sql.Timestamp.valueOf(LocalDateTime.now());
				data.setUploadDate(sqluploadDate);
				data.setUserName(user_Name);
				savedData.add(data);
			} else {
				retValue.set(false);
				errorMessageUtils.buildErrorMessage(createErrorMessage(elem.getSxxName(), elem.getG06Name()), filename,
						count.get());
			}
			count.getAndIncrement();
		});
		schematicSGMappingRepository.saveAll(savedData);
		return retValue.get();
	}

	/**
	 * Create Error Message
	 *
	 * @param sxxName, Commodity name
	 * @param g06Name, G06 file name
	 * @return a String
	 */
	private String createErrorMessage(String sxxName, String g06Name) {
		return ERROR_MESSAGE.replace("{sxxConnector}", sxxName).replace("{g06Name}", g06Name);
	}

}

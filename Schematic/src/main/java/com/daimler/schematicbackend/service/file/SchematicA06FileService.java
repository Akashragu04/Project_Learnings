/*
 *
 */
package com.daimler.schematicbackend.service.file;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
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

import com.daimler.schematicbackend.config.SchematicMiscConfig;
import com.daimler.schematicbackend.entity.file.A06Data;
import com.daimler.schematicbackend.entity.render.SchematicWireColor;
import com.daimler.schematicbackend.exception.file.SchematicFileException;
import com.daimler.schematicbackend.model.file.SchematicA06DatabaseResponse;
import com.daimler.schematicbackend.model.file.SchematicA06ExcelData;
import com.daimler.schematicbackend.repository.file.SchematicA06DataRepository;
import com.daimler.schematicbackend.repository.render.SchematicWireColorRepository;
import com.daimler.schematicbackend.service.render.SchematicRenderService;
import com.daimler.schematicbackend.utils.file.SchematicExcelFileUtils;
import com.daimler.schematicbackend.utils.file.SchematicFileConstant;
import com.daimler.schematicbackend.utils.file.SchematicFileErrorMessageUtils;
import com.poiji.bind.Poiji;

import lombok.extern.slf4j.Slf4j;

/**
 * The Class SchematicA06FileService.
 */
@Service
@Slf4j
public class SchematicA06FileService {

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
	 * The a 06 data repository.
	 */
	@Autowired
	SchematicA06DataRepository a06DataRepository;

	/**
	 * The misc config.
	 */
	@Autowired
	SchematicMiscConfig miscConfig;

	@Autowired
	SchematicRenderService renderService;

	@Autowired
	SchematicWireColorRepository colorRepository;

	/**
	 * Process file.
	 *
	 * @param multipartFile the multipart file
	 * @return the list
	 * @throws SchematicFileException the schematic file exception
	 */
	public List<String> processFile(List<MultipartFile> multipartFile, String userName, boolean fileCheck,
			List<String> warnMessage) throws SchematicFileException {
		boolean isValidAo6 = false;
		List<String> errorMessage = new ArrayList<>();
		if (ObjectUtils.isEmpty(multipartFile)) {
			throw new SchematicFileException("No File observed as part of this request");
		}
		for (MultipartFile file : multipartFile) {
			Path filepath = Paths.get(SchematicFileConstant.BASE_PATH, file.getOriginalFilename());
			String filename = fileUtils.validateAndConvertMultiPartFile(file, errorMessage);
			if (StringUtils.isNotEmpty(filename)) {
				boolean saveFileToLocal = fileUtils.saveFileToLocal(file, filepath, errorMessage);
				if (saveFileToLocal) {
					isValidAo6 = validateExcelA06(new File(filepath.toString()), errorMessage, filename, userName,
							fileCheck, warnMessage);
					if (isValidAo6 && errorMessage.isEmpty() && warnMessage.isEmpty()) {
						fileUtils.saveFileData(filepath.toString(), SchematicFileConstant.A06, filename, errorMessage);
					}

					try {
						fileUtils.deleteIfFileAlreadyExists(filepath);
					} catch (IOException ex) {
						errorMessage.add("Error deleting local file:" + filename);
					}

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
	private boolean validateExcelA06(File file, List<String> errorMessage, String filename, String userName,
			boolean fileCheck, List<String> warnMessage) {
		// boolean retValue = false;
		List<SchematicA06ExcelData> dataList = null;
		String name = file.getName();
		if (name.contains(".XLSX") || name.contains("XLS")) {
			File processFile = new File(file.getParent(), name.toLowerCase(Locale.ROOT));
			dataList = Poiji.fromExcel(processFile, SchematicA06ExcelData.class);
		} else {
			dataList = Poiji.fromExcel(file, SchematicA06ExcelData.class);
		}
		if (ObjectUtils.isEmpty(dataList)) {
			errorMessage.add("Excel: " + filename + "is empty");
		} else if (ObjectUtils.isNotEmpty(dataList)) {
			errorMessageUtils.deleteBySheetName(filename);
			ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
			Validator validator = factory.getValidator();
			Set<ConstraintViolation<SchematicA06ExcelData>> violations = null;
//			Map<String, DatabaseFileData> mdMap = renderService.getMetaData();
			for (SchematicA06ExcelData data : dataList) {
				violations = validator.validate(data);
				for (ConstraintViolation<SchematicA06ExcelData> violation : violations) {
					errorMessageUtils.buildErrorMessage(violation.getMessage(), filename, data.getRowIndex());
				}
//				if (!mdMap.containsKey(data.getSrcConnectorName())) {
//					errorMessageUtils.buildErrorMessage(data.getSrcConnectorName() + " Missing in Database File",
//							filename, data.getRowIndex());
//				}
//				if (!mdMap.containsKey(data.getDestConnectorName())) {
//					errorMessageUtils.buildErrorMessage(data.getDestConnectorName() + " Missing in Database File",
//							filename, data.getRowIndex());
//				}
			}
			if (ObjectUtils.isEmpty(violations) && errorMessage.isEmpty()) {
				fileCheck = saveA06Data(dataList, filename, userName, fileCheck);
				if (!fileCheck) {
					warnMessage.add(fileCheck + "- File already Exists");
				}
			}
		}
		return fileCheck;
	}

	/**
	 * Save A 06 data.
	 *
	 * @param dataList the data list
	 * @param filename the filename
	 * @return true, if successful
	 */
	private boolean saveA06Data(List<SchematicA06ExcelData> dataList, String filename, String userName,
			boolean fileCheck) {
		boolean retValue = true;
		List<A06Data> savedData = new ArrayList<>();
		/*
		 * String commodityName = new String(filename); String commodity = ""; String
		 * a06Name = ""; String[] excelCommodityVal = commodityName.split("_"); if
		 * (excelCommodityVal != null && excelCommodityVal.length > 1 &&
		 * excelCommodityVal[0] != null) { commodity = excelCommodityVal[0]; } if
		 * (excelCommodityVal != null && excelCommodityVal.length > 1 &&
		 * excelCommodityVal[1] != null) { a06Name = excelCommodityVal[1]; }
		 */
		log.info("Commodity in SchematicG06FileService :: " + filename);
		if (a06DataRepository.existsByA06name(filename) || errorMessageUtils.checkIfSheetExists(filename)) {
			retValue = false;
		} else {
			ModelMapper mapper = new ModelMapper();
			for (SchematicA06ExcelData schematicA06ExcelData : dataList) {
				A06Data data = mapper.map(schematicA06ExcelData, A06Data.class);
				data.setA06name(filename);
				java.sql.Timestamp sqluploadDate = java.sql.Timestamp.valueOf(LocalDateTime.now());
				data.setUploadDate(sqluploadDate);
				data.setUserName(userName);
				savedData.add(data);
			}
			a06DataRepository.saveAll(savedData);
		}
		if (a06DataRepository.existsByA06name(filename) && fileCheck == true) {
			// get upload date and user name
			Timestamp uploadedDateOld = null;
			String oldUser = null;
			List<A06Data> a06OldData = a06DataRepository.findByA06name(filename);
			for (A06Data a06OldDatata : a06OldData) {
				uploadedDateOld = a06OldDatata.getUploadDate();
				oldUser = a06OldDatata.getUserName();
				break;
			}
			a06DataRepository.deleteByA06Name(filename);
			ModelMapper mapper = new ModelMapper();
			for (SchematicA06ExcelData schematicA06ExcelData : dataList) {
				A06Data data = mapper.map(schematicA06ExcelData, A06Data.class);

				// trim src and dest cavity for removing white space
				data.setDestCavity(schematicA06ExcelData.getDestCavity().trim());
				data.setSrcCavity(schematicA06ExcelData.getSrcCavity().trim());

				// data.setCommodity(commodity);
				data.setA06name(filename);
				// again we need to set upload date as prvious user uploadded date and user .
				data.setUserName(oldUser);
				data.setUploadDate(uploadedDateOld);
				// set modified date ,modified by user
				data.setModifiedDate(LocalDateTime.now());
				data.setModifiedBy(userName);
				savedData.add(data);
			}
			a06DataRepository.saveAll(savedData);

		}
		return retValue;
	}

	/**
	 * Gets the a 06 data.
	 *
	 * @param a06Name the a 06 name
	 * @return the a 06 data
	 * @throws SchematicFileException the schematic file exception
	 */
	public List<SchematicA06DatabaseResponse> getA06Data(String a06Name) throws SchematicFileException {
		if (!a06DataRepository.existsByA06name(a06Name)) {
			throw new SchematicFileException("Data for A-Part:" + a06Name + " - does not exist.");
		}
		/********************************************************/
		/**
		 * added two for loop get color details from table and mapped in map using for
		 * loop another for loop to find the color name using color code and add it it
		 * response variable
		 **/
		List<SchematicA06DatabaseResponse> a06DatabaseResponses = a06DataRepository.findByA06name(a06Name).stream()
				.map(elem -> miscConfig.getModelMapper().map(elem, SchematicA06DatabaseResponse.class))
				.collect(Collectors.toList());
		List<SchematicWireColor> allcolors = colorRepository.findAll();
		Map<String, String> codeColorMap = new HashMap<>();
		for (SchematicWireColor wireColor : allcolors) {
			codeColorMap.put(wireColor.getColorCode(), wireColor.getColorName());
		}
		for (SchematicA06DatabaseResponse a06DatabaseResponse : a06DatabaseResponses) {
			a06DatabaseResponse.setColorName(codeColorMap.get(a06DatabaseResponse.getColor()));
		}
		return a06DatabaseResponses;
		/************************************************/
	}

}

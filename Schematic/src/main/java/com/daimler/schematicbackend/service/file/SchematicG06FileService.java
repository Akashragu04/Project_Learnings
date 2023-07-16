package com.daimler.schematicbackend.service.file;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashSet;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.daimler.schematicbackend.embeddable.G06Embeddable;
import com.daimler.schematicbackend.entity.file.A06Data;
import com.daimler.schematicbackend.entity.file.DatabaseFileData;
import com.daimler.schematicbackend.entity.file.ErrorMessage;
import com.daimler.schematicbackend.entity.file.G06Data;
import com.daimler.schematicbackend.exception.file.SchematicFileException;
import com.daimler.schematicbackend.model.file.SchematicG06ExcelData;
import com.daimler.schematicbackend.repository.file.SchematicA06DataRepository;
import com.daimler.schematicbackend.repository.file.SchematicG06DataRepository;
import com.daimler.schematicbackend.repository.file.SchematicSGMappingRepository;
import com.daimler.schematicbackend.service.render.SchematicRenderService;
import com.daimler.schematicbackend.utils.file.SchematicExcelFileUtils;
import com.daimler.schematicbackend.utils.file.SchematicFileConstant;
import com.daimler.schematicbackend.utils.file.SchematicFileErrorMessageUtils;
import com.poiji.bind.Poiji;

import lombok.extern.slf4j.Slf4j;

/**
 * The Class SchematicG06FileService.
 */
@Service
@Slf4j
public class SchematicG06FileService {

	static final String VALIDATION_ERROR = " cannot be Blank";

	/**
	 * The file utils.
	 */

	@Autowired
	SchematicA06DataRepository a06DataRepository;

	@Autowired
	SchematicExcelFileUtils fileUtils;

	@Autowired
	SchematicRenderService renderService;

	/**
	 * The error message utils.
	 */
	@Autowired
	SchematicFileErrorMessageUtils errorMessageUtils;

	/**
	 * The schematic G 06 data repository.
	 */
	@Autowired
	SchematicG06DataRepository schematicG06DataRepository;

	@Autowired
	SchematicSGMappingRepository schematicSGMappingRepository;

	/**
	 * Process file.
	 *
	 * @param multipartFile the multipart file
	 * @return the list
	 * @throws SchematicFileException the schematic file exception
	 */
	public List<String> processFile(List<MultipartFile> multipartFile, List<ErrorMessage> sheetErrors,
			boolean fileCheck, List<String> warnMessage, String userName) throws SchematicFileException {
		boolean existsFileStatus = false;
		boolean isValidGo6 = false;
		List<String> errorMessage = new ArrayList<>();
		if (ObjectUtils.isEmpty(multipartFile)) {
			log.error("No File observed as part of this request");
			throw new SchematicFileException("No File observed as part of this request");
		}
		String fileName = multipartFile.get(0).getOriginalFilename();
		String commodityName = fileName.split("_")[0];

		List<String> g06Names = schematicSGMappingRepository.findByCommodityName(commodityName);
		g06Names.stream().forEach(g06Name -> {
			boolean isPresent = false;

			for (MultipartFile file : multipartFile) {
				String uploadedfileName = file.getOriginalFilename().substring(0,
						file.getOriginalFilename().lastIndexOf('.'));
				if (uploadedfileName.equals(g06Name)) {
					isPresent = true;
				}
			}
			if (!isPresent) {
				errorMessage.add("G06 file " + g06Name + " is Missing");
			}

		});
		if (ObjectUtils.isNotEmpty(errorMessage)) {
			return errorMessage;
		}
		for (MultipartFile file : multipartFile) {
			Path filepath = Paths.get(System.getProperty("user.dir"), file.getOriginalFilename());
			String filename = fileUtils.validateAndConvertMultiPartFile(file, errorMessage);
			if (StringUtils.isNotEmpty(filename)) {
				boolean saveFileToLocal = fileUtils.saveFileToLocal(file, filepath, errorMessage);
				if (saveFileToLocal) {
					isValidGo6 = validateExcelG06(new File(filepath.toString()), errorMessage, filename, sheetErrors,
							fileCheck, warnMessage, userName);
					// existsFileStatus = isValidGo6;
					if (isValidGo6 && errorMessage.isEmpty()) {
						fileUtils.saveFileData(filepath.toString(), SchematicFileConstant.G06, filename, errorMessage);
					}
					try {
						fileUtils.deleteIfFileAlreadyExists(filepath);
					} catch (IOException ex) {
						log.error("Error deleting local file:" + filename);
						errorMessage.add("Error deleting local file:" + filename);
					}
				}
			}

		} /*
			 * multipartFile.forEach(file -> { Path filepath =
			 * Paths.get(System.getProperty("user.dir"), file.getOriginalFilename()); String
			 * filename = fileUtils.validateAndConvertMultiPartFile(file, errorMessage); if
			 * (StringUtils.isNotEmpty(filename)) { boolean saveFileToLocal =
			 * fileUtils.saveFileToLocal(file, filepath, errorMessage); if (saveFileToLocal)
			 * { boolean isValidGo6 = validateExcelG06(new File(filepath.toString()),
			 * errorMessage, filename, sheetErrors,existsFileStatus); if (isValidGo6 &&
			 * errorMessage.isEmpty()) { fileUtils.saveFileData(filepath.toString(),
			 * SchematicFileConstant.G06, filename, errorMessage); } try {
			 * fileUtils.deleteIfFileAlreadyExists(filepath); } catch (IOException ex) {
			 * errorMessage.add("Error deleting local file:" + filename); } } } });
			 */
		return errorMessage;
	}

	/*
	 * public boolean processFileFlag(List<MultipartFile> multipartFile,
	 * List<ErrorMessage> sheetErrors, boolean existsFileStatus) throws
	 * SchematicFileException { boolean isValidGo6 = false; List<String>
	 * errorMessage = new ArrayList<>(); if (ObjectUtils.isEmpty(multipartFile)) {
	 * log.error("No File observed as part of this request"); throw new
	 * SchematicFileException("No File observed as part of this request"); }
	 * 
	 * for (MultipartFile file : multipartFile) { Path filepath =
	 * Paths.get(System.getProperty("user.dir"), file.getOriginalFilename()); String
	 * filename = fileUtils.validateAndConvertMultiPartFile(file, errorMessage); if
	 * (StringUtils.isNotEmpty(filename)) { boolean saveFileToLocal =
	 * fileUtils.saveFileToLocal(file, filepath, errorMessage); if (saveFileToLocal)
	 * { isValidGo6 = validateExcelG06(new File(filepath.toString()), errorMessage,
	 * filename, sheetErrors, existsFileStatus); } } } return isValidGo6; }
	 */
	/**
	 * Validate excel G 06.
	 *
	 * @param file         the file
	 * @param errorMessage the error message
	 * @param filename     the filename
	 * @return true, if successful
	 */
	private boolean validateExcelG06(File file, List<String> errorMessage, String filename,
			List<ErrorMessage> sheetError, boolean fileCheck, List<String> warnMessage, String userName) {
		/*** delete exixting error in database ****/
		errorMessageUtils.deleteBySheetName(filename);
		/*** Start Validation for The A06 and G06 contents should be in it ****/
		boolean retVal = false;
		List<A06Data> a06Data = new ArrayList<>();
		String a06ExcelName = new String(filename);
		String[] a06ExcelVal = a06ExcelName.split("_");
		if (a06ExcelVal != null && a06ExcelVal.length > 1 && a06ExcelVal[1] != null) {
			a06Data = getA06Data(a06ExcelVal[1]);
		}
		String commodityName = a06ExcelVal[0];
		List<String> a06SrcConnName = a06Data.stream().map(A06Data::getSrcConnectorName).map(String::toLowerCase)
				.collect(Collectors.toList());
		List<String> a06SrcCavity = a06Data.stream().map(A06Data::getSrcCavity).map(String::toLowerCase)
				.collect(Collectors.toList());
		/*** End Validation for The A06 and G06 contents should be in it ****/
		List<SchematicG06ExcelData> dataList = null;
		Map<String, DatabaseFileData> mdMap = renderService.getMetaData(commodityName + "_DB");
		String name = file.getName();
		if (name.contains(".XLSX") || name.contains("XLS")) {
			File processFile = new File(file.getParent(), name.toLowerCase(Locale.ROOT));
			dataList = Poiji.fromExcel(processFile, SchematicG06ExcelData.class);
		} else {
			dataList = Poiji.fromExcel(file, SchematicG06ExcelData.class);
		}

		if (ObjectUtils.isEmpty(dataList)) {
			log.error("Excel: " + filename + "is empty");
			errorMessage.add("Excel: " + filename + "is empty");
		}

		/** Need to check repetition of same row **/
		/****************************************/
		else if (ObjectUtils.isNotEmpty(dataList)) {
			/**
			 * To check duplicate row we should skip the rowIndex's value so will make all
			 * row index as zero in new variable
			 **/
			ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
			Validator validator = factory.getValidator();
			Set<ConstraintViolation<SchematicG06ExcelData>> violations = null;
			for (SchematicG06ExcelData data : dataList) {
				violations = validator.validate(data);
				LinkedHashSet<String> errors = new LinkedHashSet<>();
				violations.stream().forEach(error -> errors
						.add(StringUtils.capitalize(error.getMessage().toString()) + "" + VALIDATION_ERROR));
				errors.stream().forEach(
						errorData -> errorMessageUtils.buildErrorMessage(errorData, filename, data.getRowIndex()));

			}
			if (ObjectUtils.isNotEmpty(errorMessageUtils.messageList(filename))) {
				return retVal;
			}

			List<SchematicG06ExcelData> dataListValues = dataList;
			int countError = 0;
			for (int i = 0; i < dataListValues.size(); i++) {
				dataListValues.get(i).setRowIndex(0);
			}
			/*** Validation for The A06 and G06 contents should be in it ****/
			List<String> excelSrcConnName = dataListValues.stream().map(SchematicG06ExcelData::getOriginDes)
					.map(String::toLowerCase).collect(Collectors.toList());
			List<String> excelSrcCavity = dataListValues.stream().map(SchematicG06ExcelData::getSrcCavity)
					.map(String::toLowerCase).collect(Collectors.toList());
			for (String a06lsrc : a06SrcConnName) {
				countError++;
				ErrorMessage emessge = null;
				if (!excelSrcConnName.contains(a06lsrc.toLowerCase())) {
					emessge = new ErrorMessage();
					emessge.setMessage(String.format("A06 Origin -> %s must be present in G06 Excel", a06lsrc));
					emessge.setSheetName(a06ExcelVal[0] + "_" + a06ExcelVal[1] + "_" + a06ExcelVal[2]);
					emessge.setErrorId(countError);
				}
				if (emessge != null)
					sheetError.add(emessge);

			}
			for (String a06Cavity : a06SrcCavity) {
				countError++;
				ErrorMessage emessge = null;
				if (!excelSrcCavity.contains(a06Cavity.toLowerCase()) && !excelSrcCavity.contains("SPLICE")) {
					emessge = new ErrorMessage();
					emessge.setMessage(String.format("A06 Src Cavity -> %s must be present in G06 Excel", a06Cavity));
					emessge.setSheetName(a06ExcelVal[0] + "_" + a06ExcelVal[1] + "_" + a06ExcelVal[2]);
					emessge.setErrorId(countError);
				}
				if (emessge != null)
					sheetError.add(emessge);
			}

			Map<SchematicG06ExcelData, Boolean> dataListMap = new HashMap<>();
			for (SchematicG06ExcelData dataRow : dataListValues) {
				countError++;
				ErrorMessage emessge = null;

				if (dataListMap.containsKey(dataRow)) {
					errorMessage.add("");
					emessge = new ErrorMessage();
					emessge.setRowIndex(dataRow.getRowIndex());
					emessge.setMessage("Duplicate rows are in Excel");
					emessge.setSheetName(a06ExcelVal[0] + "_" + a06ExcelVal[1] + "_" + a06ExcelVal[2]);
					emessge.setErrorId(countError);
				} else {
					dataListMap.put(dataRow, true);
				}
				if (emessge != null)
					sheetError.add(emessge);
			}
		}
		if (ObjectUtils.isNotEmpty(dataList) && errorMessage.isEmpty()) {
			/****************************************/
			errorMessageUtils.deleteBySheetName(filename);
			ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
			Validator validator = factory.getValidator();
			Set<ConstraintViolation<SchematicG06ExcelData>> violations = null;
			for (SchematicG06ExcelData data : dataList) {
				violations = validator.validate(data);
				for (ConstraintViolation<SchematicG06ExcelData> violation : violations) {
					errorMessageUtils.buildErrorMessage(violation.getMessage(), filename, data.getRowIndex());
				}
				if (!mdMap.containsKey(data.getOriginDes())) {
					log.error(data.getOriginDes() + " Missing in Database File", filename, data.getRowIndex());
					errorMessageUtils.buildErrorMessage(data.getOriginDes() + " Missing in Database File", filename,
							data.getRowIndex());
				}
				if (!mdMap.containsKey(data.getMatingDes())) {
					log.error(data.getMatingDes() + " Missing in Database File", filename, data.getRowIndex());
					errorMessageUtils.buildErrorMessage(data.getMatingDes() + " Missing in Database File", filename,
							data.getRowIndex());
				}
			}
			if (ObjectUtils.isEmpty(violations) && errorMessage.isEmpty()) {
				retVal = saveG06Data(dataList, filename, fileCheck, userName);
				log.info("existsFileStatus while saving data " + retVal);
				if (!retVal) {
					warnMessage.add("File already Exists Status is : " + retVal);
				}
			}
		}
		return retVal;
	}

	private List<A06Data> getA06Data(String a06Name) {
		return a06DataRepository.findByA06name(a06Name);
	}

	/**
	 * Save G 06 data.
	 *
	 * @param dataList the data list
	 * @param filename the filename
	 * @return true, if successful
	 */
	private boolean saveG06Data(List<SchematicG06ExcelData> dataList, String filename, boolean fileCheck,
			String userName) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		boolean retValue = true;
		List<G06Data> savedData = new ArrayList<>();
		String commodityName = new String(filename);
		String commodity = "";
		String g06FileName = "";
		String[] excelCommodityVal = commodityName.split("_");
		if (excelCommodityVal != null && excelCommodityVal.length > 1 && excelCommodityVal[0] != null) {
			commodity = excelCommodityVal[0];
		}
		if (excelCommodityVal != null && excelCommodityVal.length > 1 && excelCommodityVal[1] != null
				&& excelCommodityVal[2] != null) {
			g06FileName = excelCommodityVal[1] + "_" + excelCommodityVal[2];
		}
		log.info("Commodity in SchematicG06FileService :: " + commodity);
		if (schematicG06DataRepository.existsByG06nameAndGo6EmbeddableCommodity(g06FileName, commodity)
				|| errorMessageUtils.checkIfSheetExists(filename)) {
			retValue = false;
		} else {
			for (SchematicG06ExcelData excelData : dataList) {
				G06Embeddable data = G06Embeddable.builder().dtnaCir(excelData.getDtnaCir())
						.saeCir(excelData.getSaeCir()).color(excelData.getColor())
						.srcConnectorNumber(excelData.getSrcConnectorNumber())
						.destConnectorNumber(excelData.getDestConnectorNumber())
						.destCavity(excelData.getDestCavity().trim()).srcCavity(excelData.getSrcCavity().trim())
						.matingDes(excelData.getMatingDes()).originDes(excelData.getOriginDes())
						.matingConnectionType(excelData.getMatingConnectionType())
						.cavityDescription(excelData.getCavityDescription()).deviceName(excelData.getDeviceName())
						.commodity(commodity).build();
				G06Data g06Data = new G06Data();
				g06Data.setUserName(userName);
				java.sql.Timestamp sqluploadDate = java.sql.Timestamp.valueOf(LocalDateTime.now());
				g06Data.setUploadDate(sqluploadDate);
				g06Data.setG06name(g06FileName);
				g06Data.setGo6Embeddable(data);
				savedData.add(g06Data);
				schematicG06DataRepository.save(g06Data);
			}
//			schematicG06DataRepository.saveAll(savedData);
		}
		if (schematicG06DataRepository.existsByG06name(g06FileName) && fileCheck == true) {
			schematicG06DataRepository.deleteByg06name(g06FileName, commodity);
			for (SchematicG06ExcelData excelData : dataList) {
				G06Embeddable data = G06Embeddable.builder().dtnaCir(excelData.getDtnaCir())
						.saeCir(excelData.getSaeCir()).color(excelData.getColor())
						.srcConnectorNumber(excelData.getSrcConnectorNumber())
						.destConnectorNumber(excelData.getDestConnectorNumber())
						.destCavity(excelData.getDestCavity().trim()).srcCavity(excelData.getSrcCavity().trim())
						.matingDes(excelData.getMatingDes()).originDes(excelData.getOriginDes())
						.matingConnectionType(excelData.getMatingConnectionType())
						.cavityDescription(excelData.getCavityDescription()).deviceName(excelData.getDeviceName())
						.commodity(commodity).build();
				G06Data g06Data = new G06Data();
				g06Data.setUserName(userName);
				java.sql.Timestamp sqluploadDate = java.sql.Timestamp.valueOf(LocalDateTime.now());
				g06Data.setUploadDate(sqluploadDate);
				g06Data.setModifiedBy(userName);
				g06Data.setModifiedDate(LocalDateTime.now());
				g06Data.setG06name(g06FileName);
				g06Data.setGo6Embeddable(data);
				savedData.add(g06Data);
			}
			schematicG06DataRepository.saveAll(savedData);
			retValue = true;

		}
		return retValue;
	}
}

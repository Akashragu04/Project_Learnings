package com.intelizign.dmgcc.excelvalidation;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.intelizign.dmgcc.exception.ExcelExecption;

@Component
public class ExcelValidation {

	static final String ERROR_MESSAGE = "File uploaded:{fileName} does not match the format";

	static final String WRONG_FORMAT = "{file} uploaded is not an excel file.";

	@Autowired
	ExcelMetadata validationConfig;

	public void validateDatabaseSheetFormat(MultipartFile file) throws IOException, ExcelExecption {
		validFormatOrThrowException(file);
		Sheet sheet = getSheet0(file);
		validateSingleFileControllerUpload(sheet, file.getOriginalFilename(), validationConfig.getThirdPartyHeader(),
				validationConfig.getThirdPartyCellCount(), true);
	}

	private void validFormatOrThrowException(MultipartFile file) throws ExcelExecption {
		if (file != null && !StringUtils.toRootUpperCase(file.getOriginalFilename()).contains("XLSX")) {
			throw new ExcelExecption(WRONG_FORMAT.replace("{file}", file.getOriginalFilename()));
		}
	}

	private Sheet getSheet0(MultipartFile file) throws IOException {
		Sheet sheet = null;
		InputStream in = file.getInputStream();
		if (ObjectUtils.isNotEmpty(file) && ObjectUtils.isNotEmpty(in)) {
			Workbook workbook = new XSSFWorkbook(in);
			sheet = workbook.getSheetAt(0);
		}
		return sheet;
	}

	private boolean validateSingleFileControllerUpload(Sheet sheet, String fileName, List<String> headerList,
			int cellCount, boolean throwException) throws ExcelExecption {
		int count = 0;
		boolean validFile = false;
		if (sheet != null) {
			Row row = sheet.getRow(0);
			for (int i = 0; i < row.getPhysicalNumberOfCells(); i++) {
				String value = row.getCell(i) != null ? row.getCell(i).getStringCellValue() : StringUtils.EMPTY;
				if (headerList.contains(value)) {
					count++;
				}
				if (count == cellCount) {
					validFile = true;
					break;
				}
			}
		}
		if (throwException && !validFile) {
			throw new ExcelExecption(ERROR_MESSAGE.replace("{fileName}", fileName));
		}
		return validFile;
	}

}

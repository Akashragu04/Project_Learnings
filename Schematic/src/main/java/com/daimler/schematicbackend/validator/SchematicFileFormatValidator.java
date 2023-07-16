package com.daimler.schematicbackend.validator;

import com.daimler.schematicbackend.config.SchematicValidationConfig;
import com.daimler.schematicbackend.exception.file.SchematicFileException;
import com.daimler.schematicbackend.model.file.SchematicMultiFileProcessable;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * The type Schematic file format validator.
 */
@Component
public class SchematicFileFormatValidator {

    /**
     * The Error message.
     */
    static final String ERROR_MESSAGE = "File uploaded:{fileName} does not match the format";
    /**
     * The Wrong format.
     */
    static final String WRONG_FORMAT = "{file} uploaded is not an excel file.";
    /**
     * The Validation config.
     */
    @Autowired
    SchematicValidationConfig validationConfig;

    /**
     * Validate database sheet format.
     *
     * @param file the file
     * @throws IOException            the io exception
     * @throws SchematicFileException the schematic file exception
     */
    public void validateDatabaseSheetFormat(MultipartFile file) throws IOException, SchematicFileException {
        validFormatOrThrowException(file);
        Sheet sheet = getSheet0(file);
        validateSingleFileControllerUpload(sheet, file.getOriginalFilename(), validationConfig.getMetadataHeaderList(),
                validationConfig.getMetadataCellCount(), true);
    }

    /**
     * Validate mapping sheet format.
     *
     * @param file
     *            the file
     * @throws IOException
     *             the io exception
     * @throws SchematicFileException
     *             the schematic file exception
     */
    public void validateMappingSheetFormat(MultipartFile file) throws IOException, SchematicFileException {
        Sheet sheet = getSheet0(file);
        validateSingleFileControllerUpload(sheet, file.getOriginalFilename(), validationConfig.getSgmappingHeaderList(),
                validationConfig.getSgmappingCellCount(), true);
    }

    /**
     * Validate a 06 schematic multi file processable.
     *
     * @param files
     *            the files
     * @return the schematic multi file processable
     * @throws IOException
     *             the io exception
     * @throws SchematicFileException
     *             the schematic file exception
     */
    public SchematicMultiFileProcessable validateA06(List<MultipartFile> files)
            throws IOException, SchematicFileException {
        return validateMultiFiles(files, validationConfig.getA06HeaderList(), validationConfig.getA06CellCount());
    }

    /**
     * Validate g 06 schematic multi file processable.
     *
     * @param files
     *            the files
     * @return the schematic multi file processable
     * @throws IOException
     *             the io exception
     * @throws SchematicFileException
     *             the schematic file exception
     */
    public SchematicMultiFileProcessable validateG06(List<MultipartFile> files)
            throws IOException, SchematicFileException {
        return validateMultiFiles(files, validationConfig.getG06HeaderList(), validationConfig.getG06CellCount());
    }

    /**
     * Validate Multiple files
     *
     * @param files,
     *            a list of files
     * @param headerList,
     *            files header list
     * @param cellCount,
     *            cell count
     * @return SchematicMultiFileProcessable response
     * @throws IOException,
     *             an IO exception
     * @throws SchematicFileException,
     *             a Schematic file exception
     */
    private SchematicMultiFileProcessable validateMultiFiles(List<MultipartFile> files, List<String> headerList,
                                                             int cellCount) throws IOException, SchematicFileException {
        List<String> errorMessages = new ArrayList<>();
        List<MultipartFile> fileList = new ArrayList<>();
        for (MultipartFile file : files) {
            if (file != null && StringUtils.toRootUpperCase(file.getOriginalFilename()).contains("XLSX")) {
                Sheet sheet = getSheet0(file);
                String fileName = file.getOriginalFilename();
                boolean value = validateSingleFileControllerUpload(sheet, fileName, headerList, cellCount, false);
                if (!value) {
                    errorMessages.add(ERROR_MESSAGE.replace("{fileName}", fileName));
                } else {
                    fileList.add(file);
                }
            } else {
                errorMessages.add(
                        WRONG_FORMAT.replace("{file}", file != null ? file.getOriginalFilename() : StringUtils.EMPTY));
            }
        }
        return new SchematicMultiFileProcessable(errorMessages, fileList);
    }

    /**
     * Validate single file upload
     *
     * @param sheet,
     *            single excel sheet
     * @param fileName,
     *            excel file name
     * @param headerList,
     *            excel header list
     * @param cellCount,
     *            excel cell count
     * @param throwException,
     *            Schematic file exception
     * @return a boolean value
     * @throws SchematicFileException
     *             a file exception
     */
    private boolean validateSingleFileControllerUpload(Sheet sheet, String fileName, List<String> headerList,
                                                       int cellCount, boolean throwException) throws SchematicFileException {
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
            throw new SchematicFileException(ERROR_MESSAGE.replace("{fileName}", fileName));
        }
        return validFile;
    }

    /**
     * Get Sheet
     *
     * @param file,
     *            a multi part file
     * @return excel sheet
     * @throws IOException,
     *             an IO exception
     */
    private Sheet getSheet0(MultipartFile file) throws IOException {
        Sheet sheet = null;
        InputStream in = file.getInputStream();
        if (ObjectUtils.isNotEmpty(file) && ObjectUtils.isNotEmpty(in)) {
            Workbook workbook = new XSSFWorkbook(in);
            sheet = workbook.getSheetAt(0);
        }
        return sheet;
    }

    /**
     * Validate excel format
     *
     * @param file,
     *            excel file
     * @throws SchematicFileException
     *             a file exception
     */
    private void validFormatOrThrowException(MultipartFile file) throws SchematicFileException {
        if (file != null && !StringUtils.toRootUpperCase(file.getOriginalFilename()).contains("XLSX")) {
            throw new SchematicFileException(WRONG_FORMAT.replace("{file}", file.getOriginalFilename()));
        }
    }

}
package com.daimler.schematicbackend.utils.file;

import com.daimler.schematicbackend.entity.file.FileData;
import com.daimler.schematicbackend.repository.file.SchematicFileDataRepository;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.util.List;

/**
 * The Class SchematicExcelFileUtils.
 */
@Component
public class SchematicExcelFileUtils {

    /**
     * The file data repository.
     */
    @Autowired
    SchematicFileDataRepository fileDataRepository;

    /**
     * Save file data.
     *
     * @param filepath
     *            the filepath
     * @param type
     *            the type
     * @param filename
     *            the filename
     * @param errorList
     *            the error list
     * @return the string
     */
    public String saveFileData(String filepath, String type, String filename, List<String> errorList) {

        try {
            File file = new File(filepath);
            if (fileDataRepository.existsByFileName(filename)) {
                fileDataRepository.deleteByFileName(filename);
            }
            if (!fileDataRepository.existsByFileName(filename) || SchematicFileConstant.METADATA.equalsIgnoreCase(type)
                    || SchematicFileConstant.SG_MAPPING.equalsIgnoreCase(type)) {
                FileData fd = FileData.builder().fileName(filename).fileType(type)
                        .data(FileUtils.readFileToByteArray(file)).uploaded(true).uploadedDate(LocalDate.now()).build();
                fileDataRepository.save(fd);
            } else {
               // errorList.add("FileName:" + filename + " Already exists");
            }
        } catch (IOException ex) {
            errorList.add("Error Processing File Data:" + filename);
        }
        return filename;
    }

    /**
     * Validate and convert multi part file.
     *
     * @param multipartFile
     *            the multipart file
     * @param errorMesage
     *            the error mesage
     * @return the string
     */
    public String validateAndConvertMultiPartFile(MultipartFile multipartFile, List<String> errorMesage) {
        String filename = StringUtils.toRootUpperCase(multipartFile.getOriginalFilename());
        boolean flag = true;
        if (ObjectUtils.isEmpty(multipartFile)) {
            errorMesage.add(" Empty Files will not be processed");
            flag = false;
        } else if (StringUtils.isEmpty(filename)) {
            errorMesage.add("Files With Empty Names will not be processed");
            flag = false;
        } else if (!checkIfFileIsExcel(filename, errorMesage)) {
            flag = false;
        }
        return flag ? filename.replace(".XLSX", StringUtils.EMPTY) : StringUtils.EMPTY;

    }

    /**
     * Check if file is excel.
     *
     * @param fileName
     *            the file name
     * @param errorMessage
     *            the error message
     * @return true, if successful
     */
    public boolean checkIfFileIsExcel(String fileName, List<String> errorMessage) {
        boolean isExcel = false;
        if (StringUtils.isNotEmpty(fileName) && fileName.toUpperCase().contains(".XLSX")) {
            isExcel = true;
        } else {
            errorMessage.add(fileName + " is not an excel File");
        }
        return isExcel;
    }

    /**
     * Save file to local.
     *
     * @param multipartFile
     *            the multipart file
     * @param filepath
     *            the filepath
     * @param errorMessage
     *            the error message
     * @return true, if successful
     */
    public boolean saveFileToLocal(MultipartFile multipartFile, Path filepath, List<String> errorMessage) {
        boolean isFileSavedtoLocal = false;
        try {
            deleteIfFileAlreadyExists(filepath);
            multipartFile.transferTo(filepath);
            isFileSavedtoLocal = true;
        } catch (IOException ex) {
            errorMessage.add("Error Processing File Data:" + multipartFile.getOriginalFilename());
        }
        return isFileSavedtoLocal;
    }

    /**
     * Delete if file already exists.
     *
     * @param filepath
     *            the filepath
     * @return true, if successful
     * @throws IOException
     *             Signals that an I/O exception has occurred.
     */
    public boolean deleteIfFileAlreadyExists(Path filepath) throws IOException {
        return Files.deleteIfExists(filepath);
    }

}

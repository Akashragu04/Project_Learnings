package com.daimler.schematicbackend.service.file;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.DataFormatException;

import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.daimler.schematicbackend.exception.file.SchematicFileException;
import com.daimler.schematicbackend.utils.file.SchematicFileConstant;
import com.daimler.schematicbackend.utils.file.SchematicImageFileUtils;

/**
 * The type Custom image service.
 */
@Service
public class SchematicCustomImageService {

	/**
	 * The File utils.
	 */
	@Autowired
	SchematicImageFileUtils fileUtils;

	/**
	 * Process file list.
	 *
	 * @param file the file
	 * @return the list
	 * @throws SchematicFileException the schematic file exception
	 * @throws IOException            the io exception
	 */
	public List<String> processFile(MultipartFile file) throws SchematicFileException, IOException {
		List<String> errorMessage = new ArrayList<>();
		if (ObjectUtils.isEmpty(file)) {
			throw new SchematicFileException("No File observed as part of this request");
		}
		Path filepath = Paths.get(SchematicFileConstant.BASE_PATH, file.getOriginalFilename());
		String filename = fileUtils.validateAndConvertImageMultiPartFile(file, errorMessage);
		if (StringUtils.isNotEmpty(filename)) {
			fileUtils.saveFileToLocal(file, errorMessage);
			boolean isValidCustom = validateCustomImage(file, errorMessage, filename);
			fileUtils.deleteIfFileAlreadyExists(filepath);
		}
		return errorMessage;
	}

	/**
	 * Validate Custom image and save to database
	 *
	 * @param multipartFile a zip multi part file
	 * @param errorMessage  list of error message
	 * @param filename      a file name
	 * @return boolean value
	 * @throws IOException
	 */
	private boolean validateCustomImage(MultipartFile multipartFile, List<String> errorMessage, String filename)
			throws IOException {
		if (ObjectUtils.isEmpty(multipartFile)) {
			errorMessage.add("Custom Image: " + filename + "is empty");
		} else {
			fileUtils.validateAndSaveImages(errorMessage, filename);
		}
		return errorMessage.isEmpty();
	}

	public byte[] getImageByName(String imageName) throws SchematicFileException, DataFormatException, IOException {
		byte[] imageData = fileUtils.getImageByName(imageName);
		if (ObjectUtils.isEmpty(imageData)) {
			throw new SchematicFileException("Image:" + imageName + "does not exist.");
		}
		return imageData;
	}

}

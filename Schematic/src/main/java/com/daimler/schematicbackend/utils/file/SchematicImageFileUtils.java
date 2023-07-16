package com.daimler.schematicbackend.utils.file;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.zip.DataFormatException;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import javax.transaction.Transactional;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.daimler.schematicbackend.entity.file.CustomImage;
import com.daimler.schematicbackend.repository.file.SchematicCustomImageRepository;

import lombok.extern.slf4j.Slf4j;

/**
 * The type Schematic image file utils.
 */
@Slf4j
@Component
@Transactional
public class SchematicImageFileUtils {

	/**
	 * The Image repository.
	 */
	@Autowired
	SchematicCustomImageRepository imageRepository;

	/**
	 * The Compression utils.
	 */
	@Autowired
	SchematicFileCompressionUtils compressionUtils;

	/**
	 * Validate and convert image multi part file string.
	 *
	 * @param multipartFile the multipart file
	 * @param errorMessage  the error message
	 * @return the string
	 */
	public String validateAndConvertImageMultiPartFile(MultipartFile multipartFile, List<String> errorMessage) {
		String filename = StringUtils.toRootUpperCase(multipartFile.getOriginalFilename());
		boolean flag = true;
		if (ObjectUtils.isEmpty(multipartFile)) {
			errorMessage.add(" Empty Files will not be processed");
			flag = false;
		} else if (StringUtils.isEmpty(filename)) {
			errorMessage.add("Files With Empty Names will not be processed");
			flag = false;
		} else if (!checkIfFileIsZip(filename, errorMessage)) {
			flag = false;
		}
		return flag ? filename.replace(".ZIP", StringUtils.EMPTY) : StringUtils.EMPTY;
	}

	/**
	 * Check given file is with extension zip
	 *
	 * @param fileName     a file name
	 * @param errorMessage list of error message
	 * @return boolean
	 */
	private boolean checkIfFileIsZip(String fileName, List<String> errorMessage) {
		boolean isZip = false;
		if (StringUtils.isNotEmpty(fileName) && fileName.toUpperCase().contains(".ZIP")) {
			isZip = true;
		} else {
			errorMessage.add(fileName + " is not an zip File");
		}
		return isZip;
	}

	/**
	 * Save file to local boolean.
	 *
	 * @param multipartFile the multipart file
	 * @param errorMessage  the error message
	 * @return the boolean
	 * @throws IOException the io exception
	 */
	public boolean saveFileToLocal(MultipartFile multipartFile, List<String> errorMessage) throws IOException {

		String sourcePath = SchematicFileConstant.BASE_PATH + File.separator + multipartFile.getOriginalFilename();
		String desPath = SchematicFileConstant.BASE_PATH + File.separator + "images";
		boolean isFileSaved = saveZipFile(multipartFile, errorMessage);
		if (isFileSaved) {
			File destDir = new File(desPath);
			if (!destDir.exists()) {
				destDir.mkdir();
			}
			try (ZipInputStream zipIn = new ZipInputStream(new FileInputStream(sourcePath))) {
				ZipEntry entry = zipIn.getNextEntry();
				while (entry != null) {
					String filePath = destDir + File.separator + entry.getName();
					if (!entry.isDirectory()) {
						extractFile(zipIn, filePath);
					} else {
						File dir = new File(filePath);
						dir.mkdirs();
					}
					zipIn.closeEntry();
					entry = zipIn.getNextEntry();
				}
			}
		}
		return isFileSaved;
	}

	/**
	 * Save zip file to local system
	 *
	 * @param multipartFile a multi part zip file
	 * @param errorMessage  list of error message
	 * @return a boolean value
	 */
	private boolean saveZipFile(MultipartFile multipartFile, List<String> errorMessage) {
		String fileName = multipartFile.getOriginalFilename();
		try {
			File fileDirectory = new File(SchematicFileConstant.BASE_PATH);
			if (!fileDirectory.exists()) {
				fileDirectory.mkdir();
			}
			Path fileStoreValue = Paths.get(SchematicFileConstant.BASE_PATH, fileName).toAbsolutePath().normalize();
			Files.copy(multipartFile.getInputStream(), fileStoreValue, StandardCopyOption.REPLACE_EXISTING);
		} catch (IOException e) {
			errorMessage.add("Error while saving files to local memory : " + fileName);
		}
		return errorMessage.isEmpty();
	}

	/**
	 * Extract zip and copied to some other location
	 *
	 * @param zipIn a zip input stream
	 * @param name  a file name
	 * @throws IOException exception
	 */
	private void extractFile(ZipInputStream zipIn, String name) throws IOException {
		try (BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(name))) {
			byte[] bytesIn = new byte[SchematicFileConstant.BUFFER_SIZE];
			int read = 0;
			while ((read = zipIn.read(bytesIn)) != -1) {
				bos.write(bytesIn, 0, read);
			}
		}
	}

	/**
	 * Validate and save images list.
	 *
	 * @param errorMessage the error message
	 * @param fileName     the file name
	 * @return the list
	 * @throws IOException
	 */
	public List<CustomImage> validateAndSaveImages(List<String> errorMessage, String fileName) throws IOException {
		List<CustomImage> customImageDataList = new ArrayList<>();
		String path = SchematicFileConstant.BASE_PATH + File.separator + "images";
		File[] directories = new File(path).listFiles();
		/**
		 * Validate before save images list.
		 */

		// get custom images by commodities
		Map<String, Object> mappedImageByCommodities = imageRepository.findByCommodityName(fileName).stream()
				.collect(Collectors.toMap(CustomImage::getCustomImageName, elem -> elem));

		for (File directory : directories) {
			if (directory.isDirectory()) {
				for (File file : directory.listFiles()) {
					byte[] image = FileUtils.readFileToByteArray(file);
					validateImage(image, file.getName(), errorMessage, fileName, mappedImageByCommodities);
				}
			} else {
				byte[] image = FileUtils.readFileToByteArray(directory);
				validateImage(image, directory.getName(), errorMessage, fileName, mappedImageByCommodities);
			}
		}
		/**
		 * delete images if violation occurs in file or image.
		 */
		if (ObjectUtils.isNotEmpty(errorMessage)) {
			for (File directory : directories) {
				if (directory.isDirectory()) {
					for (File file : directory.listFiles()) {
						Files.delete(file.toPath());
					}
				} else {
					Files.delete(directory.toPath());
				}
			}
		}

		if (ObjectUtils.isNotEmpty(directories) && ObjectUtils.isEmpty(errorMessage)) {
			for (File directory : directories) {
				if (directory.isDirectory()) {
					for (File file : directory.listFiles()) {
						saveImageToDb(file, customImageDataList, errorMessage, fileName, mappedImageByCommodities);
					}
				} else {
					saveImageToDb(directory, customImageDataList, errorMessage, fileName, mappedImageByCommodities);
				}
			}
		}
		return customImageDataList;
	}

	private void saveImageToDb(File file, List<CustomImage> customImageDataList, List<String> errorMessage,
			String fileName, Map<String, Object> mappedImageByCommodities) {
		try {
			getList(file, errorMessage, customImageDataList, fileName, mappedImageByCommodities);
			if (ObjectUtils.isNotEmpty(customImageDataList)) {
				customImageDataList.stream().forEach(elem -> {
					elem.setCustomImageName(StringUtils.toRootUpperCase(elem.getCustomImageName()).replaceAll("[ _]",
							StringUtils.EMPTY));
					elem.setCommodityName(fileName);
					imageRepository.save(elem);
				});
			}
		} catch (IOException ex) {
			log.error("Error While saving the Image to DB:{​​}​​", ex.getMessage());
		}
	}

	/**
	 * Get List of Custom Image
	 *
	 * @param file                a file object
	 * @param errorMessage        list of error message
	 * @param customImageDataList list of Custom image
	 * @return the boolean
	 * @throws IOException exception
	 */
	private boolean getList(File file, List<String> errorMessage, List<CustomImage> customImageDataList,
			String fileName, Map<String, Object> mappedImageByCommodities) throws IOException {
		String imageName = file.getName();
		byte[] image = FileUtils.readFileToByteArray(file);
		boolean isValidImage = validateImage(image, imageName, errorMessage, fileName, mappedImageByCommodities);
		if (isValidImage) {
			byte[] compressedImage = compressionUtils.compress(image);
			customImageDataList
					.add(CustomImage.builder().customImageName(imageName).imageData(compressedImage).build());
		}
		Files.delete(file.toPath());
		return isValidImage;
	}

	/**
	 * Validate image name, image data and image type
	 *
	 * @param image        a byte array of image file
	 * @param imageName    image file name
	 * @param errorMessage list of error
	 * @return a boolean value
	 */
	private boolean validateImage(byte[] image, String imageName, List<String> errorMessage, String fileName,
			Map<String, Object> mappedImageByCommodities) {
		imageName = imageName.replaceAll("\\s", "");

		boolean isValidImage = true;
		if (StringUtils.isEmpty(imageName)) {
			errorMessage.add("Image name is Empty in given file : " + imageName);
			isValidImage = false;
		}
		if (isImageNotJpgOrJpeg(imageName)) {
			errorMessage.add("Invalid Image..{}" + imageName);
			isValidImage = false;
		}
		if (ObjectUtils.isEmpty(image)) {
			errorMessage.add("Invalid image data for : " + imageName);
			isValidImage = false;
		}
		if (mappedImageByCommodities.containsKey(imageName)) {
			errorMessage.add("Image : " + imageName + " Already Exist.");
			isValidImage = false;
		}
		return isValidImage;
	}

	/**
	 * Method to check file name ends with jpeg/jpg
	 *
	 * @param imageName image file name
	 * @return a boolean value
	 */
	private boolean isImageNotJpgOrJpeg(String imageName) {
		String regex = "([^*]+(\\.[Pp][Nn][Gg])$)";
		Pattern p = Pattern.compile(regex);
		Matcher m = p.matcher(imageName);
		return !m.matches();
	}

	/**
	 * Delete if file already exists.
	 *
	 * @param filepath the filepath
	 * @throws IOException the io exception
	 */
	public void deleteIfFileAlreadyExists(Path filepath) throws IOException {
		Files.deleteIfExists(filepath);
	}

	public byte[] getImageByName(String imageName) throws DataFormatException, IOException {
		CustomImage image = imageRepository.findByCustomImageName(imageName);
		return ObjectUtils.isEmpty(image) ? null : SchematicFileCompressionUtils.decompress(image.getImageData());
	}

	/*
	 * Delete if file exists in database
	 *
	 * @param imageName image file name
	 */
	public void deleteFileFromDb(String imageName, String fileName) {

		imageRepository.deleteByCustomImageNameAndCommodityName(imageName, fileName);

	}

	private boolean validateReplacedImage(String imageName, String fileName) {

		imageName = imageName.replaceAll("\\s", "");

		boolean isReplacedImage = false;
		imageName = StringUtils.toRootUpperCase(imageName.replaceAll("[ _]", StringUtils.EMPTY));

		if (imageRepository.existsByCustomImageNameAndCommodityName(imageName, fileName)) {

			deleteFileFromDb(imageName, fileName);

			try {

				deleteIfFileAlreadyExists(Paths.get(fileName));
			} catch (IOException e) {

				e.printStackTrace();
			}

			isReplacedImage = true;

		}

		return isReplacedImage;

	}

	public boolean getReplacedList(MultipartFile file, String fileName) throws IOException {

		boolean isReplaced = false;

		byte[] image = file.getBytes();

		File fileDirectory = new File(SchematicFileConstant.BASE_PATH);

		boolean isValid = false;

		if (!fileDirectory.exists()) {

			fileDirectory.mkdir();

		}

		Path fileStoreValue = Paths.get(SchematicFileConstant.BASE_PATH, fileName).toAbsolutePath().normalize();

		try (ZipInputStream zipIn = new ZipInputStream(file.getInputStream())) {

			ZipEntry entry = zipIn.getNextEntry();

			while (entry != null) {

				String imageName = entry.getName();

				isValid = validateCustomImage(image, imageName, fileName);

				if (isValid) {

					boolean checkReplace = validateReplacedImage(imageName, fileName);

					isReplaced = isReplaced || checkReplace;

				}

				zipIn.closeEntry();

				entry = zipIn.getNextEntry();

			}

		}

		return isReplaced;

	}

	private boolean validateCustomImage(byte[] image, String imageName, String fileName) {

		imageName = imageName.replaceAll("\\s", "");
		boolean isValidImage = true;

		if (StringUtils.isEmpty(imageName)) {

			isValidImage = false;
		}
		if (isImageNotJpgOrJpeg(imageName)) {

			isValidImage = false;
		}
		if (ObjectUtils.isEmpty(image)) {

			isValidImage = false;
		}

		return isValidImage;
	}

	public String getFileName(MultipartFile multipartFile) {

		String filename = StringUtils.toRootUpperCase(multipartFile.getOriginalFilename());

		return filename.replace(".ZIP", StringUtils.EMPTY);

	}
}

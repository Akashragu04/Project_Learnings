package com.daimler.schematicbackend.controller.singlefile;

import java.io.IOException;
import java.util.List;
import java.util.zip.DataFormatException;

import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.daimler.schematicbackend.exception.file.SchematicFileException;
import com.daimler.schematicbackend.model.file.SchematicImageResponse;
import com.daimler.schematicbackend.model.generic.SchematicGenericFileResponse;
import com.daimler.schematicbackend.repository.file.SchematicRenderableRepository;
import com.daimler.schematicbackend.repository.render.RealignmentModelRepository;
import com.daimler.schematicbackend.service.file.SchematicCustomImageService;
import com.daimler.schematicbackend.utils.file.SchematicFileErrorMessageUtils;
import com.daimler.schematicbackend.utils.file.SchematicImageFileUtils;

/**
 * The type Custom image controller.
 */
@RestController
public class SchematicCustomImageController implements ISchematicSingleFileEndPoint {

	/**
	 * The Image service.
	 */
	@Autowired
	SchematicCustomImageService imageService;

	@Autowired
	SchematicFileErrorMessageUtils utils;

	@Autowired
	SchematicImageFileUtils imageFileUtils;

	@Autowired
	SchematicRenderableRepository renderableRepository;

	@Autowired
	RealignmentModelRepository realignmentModelRepository;

	/**
	 * Upload Image multipart file
	 *
	 * @param userName the username
	 * @param file     the file
	 * @return a schematic generic response
	 * @throws IOException            an exception
	 * @throws SchematicFileException a schematic file exception
	 */
	@Override
	@PostMapping("/imageUpload")
	public ResponseEntity<SchematicGenericFileResponse> uploadFile(String userName, MultipartFile file)
			throws IOException, SchematicFileException {

		String filename = imageFileUtils.getFileName(file);

		if (!renderableRepository.existsByCommodityName(filename)) {
			throw new SchematicFileException("Uploaded commdity is not valid");
		}

		boolean isReplaced = imageFileUtils.getReplacedList(file, filename);

		List<String> errorMessageList = imageService.processFile(file);
		if (ObjectUtils.isEmpty(errorMessageList)) {

			// delete realigned data while reuploadin the commodity

			realignmentModelRepository.deleteByCommodityName(filename);

			if (isReplaced) {

				return ResponseEntity.ok(new SchematicGenericFileResponse("Upload Successful.", errorMessageList, null,
						"Replaced file successfully"));

			} else {
				return ResponseEntity
						.ok(new SchematicGenericFileResponse("Upload Successful.", errorMessageList, null, ""));
			}
		} else {
			return ResponseEntity.badRequest().body(new SchematicGenericFileResponse(
					"Uploaded file contains sheet validation failures", errorMessageList, null, null));
		}
	}

	@GetMapping("/getImage")
	public ResponseEntity<SchematicImageResponse> getImageAsBytes(@RequestHeader("imageName") String imageName)
			throws SchematicFileException, DataFormatException, IOException {
		if (StringUtils.isEmpty(imageName)) {
			throw new SchematicFileException("Image Name is Required");
		} else {
			return ResponseEntity.ok(new SchematicImageResponse(imageService.getImageByName(imageName)));
		}
	}

}

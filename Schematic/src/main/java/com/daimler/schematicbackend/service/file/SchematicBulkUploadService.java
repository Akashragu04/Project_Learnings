package com.daimler.schematicbackend.service.file;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.daimler.schematicbackend.controller.multifile.SchematicA06FileController;
import com.daimler.schematicbackend.controller.multifile.SchematicG06FileController;
import com.daimler.schematicbackend.controller.singlefile.SchematicCommodityMappingController;
import com.daimler.schematicbackend.controller.singlefile.SchematicCustomImageController;
import com.daimler.schematicbackend.controller.singlefile.SchematicDatabaseFileController;
import com.daimler.schematicbackend.entity.file.BulkUploadDetails;
import com.daimler.schematicbackend.exception.file.SchematicFileException;
import com.daimler.schematicbackend.model.generic.SchematicGenericFileResponse;
import com.daimler.schematicbackend.model.generic.SchematicGenericFileUploadResponse;
import com.daimler.schematicbackend.repository.file.SchematicRenderableRepository;
import com.daimler.schematicbackend.repository.master.BulkUploadDetailsRepository;

/**
 * The Class SchematicDatabaseFileService.
 */
@Service
public class SchematicBulkUploadService {

	@Autowired
	SchematicCustomImageController schematicCustomImageController;

	@Autowired
	SchematicDatabaseFileController schematicDatabaseFileController;

	@Autowired
	SchematicCommodityMappingController schematicCommodityMappingController;

	@Autowired
	SchematicA06FileController schematicA06FileController;

	@Autowired
	SchematicG06FileController schematicG06FileController;

	@Autowired
	BulkUploadDetailsRepository bulkUploadDetailsRepository;

	@Autowired
	SchematicRenderableRepository schematicRenderableRepository;

	public boolean processFile(String userName, boolean fileCheck, File[] directories,
			List<BulkUploadDetails> bulkUploadDetails) {

		bulkUploadDetailsRepository.deleteAll();

		List<String> uploadOrder = Arrays.asList(".ZIP", "DB", "SGMAPPING", "A06", "G06");

		// get all commodities
		continueNextCommidty: for (File commodity : directories) {
			if (commodity.isDirectory()) {
				if (!schematicRenderableRepository.existsByCommodityName(commodity.getName())) {
					BulkUploadDetails bulkUploadDetaiil = new BulkUploadDetails(commodity.getName(),
							LocalDateTime.now(), "Failed", "Commidty not in Renderable list", userName);
					bulkUploadDetails.add(bulkUploadDetaiil);
					continue continueNextCommidty;
				}
				boolean isUploaded = true;

				for (String order : uploadOrder) {

					// get one particular commodity with order
					for (File file : commodity.listFiles()) {
						String fileName = file.getName();
						if (file != null && StringUtils.isNotEmpty(fileName)
								&& fileName.toUpperCase().contains(order)) {
							if (isUploaded) {

								// if thefile is DB or XLSX

								if (order.equals("DB") || order.equals("SGMAPPING")) {
									if (file.getName().toUpperCase().contains(".XLSX") && file != null
											&& !StringUtils.toRootUpperCase(file.getName()).contains("~")) {

										isUploaded = uploadCommodityByOrder(file, order, userName, fileCheck);

									}

								} else {
									isUploaded = uploadCommodityByOrder(file, order, userName, fileCheck);
								}
								// checking file is uploaded

								if (!isUploaded) {
									BulkUploadDetails bulkUploadDetaiil = new BulkUploadDetails(commodity.getName(),
											LocalDateTime.now(), "Failed", "Failed while uploading " + order, userName);
									bulkUploadDetails.add(bulkUploadDetaiil);
									break;
								}
							}
						}

					}

				}
				if (isUploaded) {
					BulkUploadDetails bulkUploadDetaiil = new BulkUploadDetails(commodity.getName(),
							LocalDateTime.now(), "Success", "Upload Success.", userName);
					bulkUploadDetails.add(bulkUploadDetaiil);
				}

			} else {
				System.out.println(commodity.getName());
			}
		}
		bulkUploadDetailsRepository.saveAll(bulkUploadDetails);
		return true;
	}

	private boolean uploadCommodityByOrder(File file, String order, String userName, boolean fileCheck) {
		switch (order) {
		case ".ZIP":
			if (file.isDirectory()) {
				return false;
			}
			return uploadCustomImageZip(file, userName);
		case "DB":
			return uploadDBSheetAndSGMapping(file, userName, order);

		case "SGMAPPING":
			return uploadDBSheetAndSGMapping(file, userName, order);

		case "A06":
			return uploadA06AndG06Tables(file, userName, fileCheck, order);

		case "G06":
			return uploadA06AndG06Tables(file, userName, fileCheck, order);

		default:
			return false;
		}

	}

	/**
	 * upload zip files
	 **/
	private boolean uploadCustomImageZip(File file, String userName) {

		// converting file to InputStream

		InputStream stream = null;
		try {
			stream = new FileInputStream(file);
			// converting file to Multipart

			try {
				MultipartFile imageZipMultipartFile = new MockMultipartFile(file.getPath(), file.getName(),
						"application/octet-stream", stream);
				try {
					// send multipart file and username to database controller

					ResponseEntity<SchematicGenericFileResponse> response = schematicCustomImageController
							.uploadFile(userName, imageZipMultipartFile);

					if (response.getStatusCode().value() == 200
							&& response.getBody().getResponseMessage().equals("Upload Successful.")) {
						return true;
					} else {
						return false;
					}

				} catch (SchematicFileException e) {
					return false;
				}
			} catch (IOException e) {
				return false;
			}

		} catch (FileNotFoundException e1) {
			return false;
		}

	}

	/**
	 * upload DBSheet And SGMapping
	 **/
	private boolean uploadDBSheetAndSGMapping(File file, String userName, String order) {

		// converting file to InputStream

		InputStream stream = null;
		try {
			stream = new FileInputStream(file);
			// converting file to Multipart

			try {
				MultipartFile excelMultipartFile = new MockMultipartFile(file.getAbsolutePath(), file.getName(),
						"application/vnd.ms-excel", stream);
				try {
					// send multipart file and username to custum image controller

					if (StringUtils.equals(order, "DB")) {
						ResponseEntity<SchematicGenericFileResponse> response = schematicDatabaseFileController
								.uploadFile(userName, excelMultipartFile);

						if (response.getStatusCode().value() == 200
								&& response.getBody().getResponseMessage().equals("Upload Successful.")) {
							return true;
						} else {
							return false;
						}
					} else if (StringUtils.equals(order, "SGMAPPING")) {
						ResponseEntity<SchematicGenericFileResponse> response = schematicCommodityMappingController
								.uploadFile(userName, excelMultipartFile);

						if (response.getStatusCode().value() == 200
								&& response.getBody().getResponseMessage().equals("Upload Successful.")) {
							return true;
						} else {
							return false;
						}
					} else {
						return false;
					}

				} catch (SchematicFileException e) {
					return false;
				}
			} catch (IOException e) {
				return false;
			}

		} catch (FileNotFoundException e1) {
			return false;
		}

	}

	/**
	 * upload A06 And G06 Tables
	 **/
	private boolean uploadA06AndG06Tables(File file, String userName, boolean fileCheck, String order) {
		List<MultipartFile> multipartFiles = new ArrayList<>();
		if (file.isDirectory()) {

			boolean extractingFailed = false;

			// convetring files to multipart files

			for (File excelfile : file.listFiles()) {
				try {
					String fileName = excelfile.getName();
					if (fileName.toUpperCase().contains(".XLSX") && excelfile != null) {
						InputStream stream = new FileInputStream(excelfile);
						try {
							MockMultipartFile excelMultipartFile = new MockMultipartFile(excelfile.getPath(),
									excelfile.getName(), "application/vnd.ms-excel", stream);
							multipartFiles.add(excelMultipartFile);
						} catch (IOException e) {
							extractingFailed = true;
							break;
						} catch (Exception e) {
							return false;
						}
					}

				} catch (FileNotFoundException e) {
					extractingFailed = true;
					break;
				}
			}

			// send multipart files and username to A06 and G06 Tables

			if (!extractingFailed && ObjectUtils.isNotEmpty(multipartFiles)) {
				if (StringUtils.equals(order, "A06")) {
					ResponseEntity<SchematicGenericFileUploadResponse> response;
					try {
						response = schematicA06FileController.uploadFile(multipartFiles, userName, fileCheck);
						if (response.getStatusCode().value() == 200
								&& response.getBody().getResponseMessage().equals("Upload Successful.")) {
							return true;
						} else {
							return false;
						}
					} catch (IOException e) {
						return false;
					} catch (SchematicFileException e) {
						return false;
					} catch (Exception e) {
						return false;
					}

				} else if (StringUtils.equals(order, "G06")) {
					ResponseEntity<SchematicGenericFileUploadResponse> response;
					try {
						response = schematicG06FileController.uploadFile(multipartFiles, userName, fileCheck);
						if (response.getStatusCode().value() == 200
								&& response.getBody().getResponseMessage().equals("Upload Successful.")) {
							return true;
						} else {
							return false;
						}
					} catch (SchematicFileException e) {
						return false;
					} catch (IOException e) {
						return false;
					} catch (Exception e) {
						return false;
					}

				} else {
					return false;
				}
			}

			else {
				return false;
			}
		} else {
			return false;
		}
	}

}

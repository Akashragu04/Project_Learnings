package com.intelizign.dmgcc.controllers;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import javax.validation.Valid;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.io.Resource;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.MethodNotAllowedException;

import com.intelizign.dmgcc.models.FileUploadModel;
import com.intelizign.dmgcc.models.JDMappingModel;
import com.intelizign.dmgcc.models.JDModel;
import com.intelizign.dmgcc.pojoclass.JDRampupMapping;
import com.intelizign.dmgcc.pojoclass.JDRampupModel;
import com.intelizign.dmgcc.pojoclass.JDRampupProperties;
import com.intelizign.dmgcc.repositories.BizCaseRequestRepository;
import com.intelizign.dmgcc.repositories.FileUploadRepository;
import com.intelizign.dmgcc.repositories.JDMappingRepository;
import com.intelizign.dmgcc.repositories.JDRepositories;
import com.intelizign.dmgcc.request.JDRequest;
import com.intelizign.dmgcc.request.SupportingFiles;
import com.intelizign.dmgcc.request.bizcase.Rampups;
import com.intelizign.dmgcc.response.JDHiredResponse;
import com.intelizign.dmgcc.response.JDMappingResponse;
import com.intelizign.dmgcc.response.JDResponse;
import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.services.FilesStorageServicePath;

@Transactional
@RestController
@RequestMapping("/jobdescription")
public class JDController {

	@Autowired
	private Environment env;

	@Autowired
	SimpMessagingTemplate template;

	@Autowired
	FilesStorageServicePath storageServicepath;

	@Autowired
	private JDRepositories jdrepo;

	@Autowired
	private BizCaseRequestRepository bizcasereqrepo;

	@Autowired
	private JDMappingRepository jdMappingRepository;

	@Autowired
	private FileUploadRepository fileUploadRepository;

	public final Logger LOGGER = LogManager.getLogger(JDController.class);

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public Map<String, String> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
		Map<String, String> errors = new HashMap<>();
		ex.getBindingResult().getFieldErrors()
				.forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));

		return errors;
	}

	@ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
	@ExceptionHandler(value = MethodNotAllowedException.class)
	public ResponseEntity<Object> handleMethodNotAllowedExceptionException(MethodNotAllowedException ex) {
		return ResponseHandler.generateResponse(ex.getMessage(), false, HttpStatus.METHOD_NOT_ALLOWED, null);
	}

//	@ResponseBody
//	@ExceptionHandler
//	ResponseEntity<?> handleConflict(DataIntegrityViolationException e) {
//		return ResponseHandler.generateResponse(e.getRootCause().getMessage(), false, HttpStatus.CONFLICT, null);
//	}

	@ExceptionHandler({ DataIntegrityViolationException.class })
	public ResponseEntity<Object> handleError2(HttpServletRequest req, Exception ex) {

		String msg = ex.getMessage();
		LOGGER.error("SQL Erorrrrrrrrr............................" + msg);
		if (ex.getCause().getCause() instanceof SQLException) {
			SQLException e = (SQLException) ex.getCause().getCause();

			if (e.getMessage().contains("Key")) {
				LOGGER.error("SQL Erorrrrrrrrr............................" + e.getMessage());
				msg = e.getMessage().substring(e.getMessage().indexOf("Key"));
			}
		}
		return ResponseHandler.generateResponse("Can't delete JD, It as mapped with Rampup", false, HttpStatus.OK, msg);
	}

	@GetMapping("/{Request_id}")
	public ResponseEntity<Object> findAllJD(@PathVariable(value = "Request_id") Long Request_id) {
		try {
			return bizcasereqrepo.findById(Request_id).map(bizcasedata -> {

				if (bizcasedata.getProject() != null) {
					List<JDModel> jdModels = jdrepo.findByRequestId(Request_id);
					JDResponse jdResponse = new JDResponse();
					jdResponse.setProject_code(bizcasedata.getProject().getProject_id());
					jdResponse.setProject_name(bizcasedata.getProject().getProject_name());
					jdResponse.setJd_information(jdModels);
					return ResponseHandler.generateResponse("List of Job Description", true, HttpStatus.OK, jdResponse);
				} else {
					LOGGER.error("Exceptions happen!: Bussiness Case not approved yet");
					return ResponseHandler.generateResponse("Bussiness Case not approved yet", false, HttpStatus.OK,
							null);
				}

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Biz ID  " + Request_id + " Doesn't exist");
				return ResponseHandler.generateResponse("Biz ID  " + Request_id + " Doesn't exist", false,
						HttpStatus.OK, null);
			});
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get JD all by bizid: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	@GetMapping("/getalljd/{Request_id}")
	public ResponseEntity<Object> findAllJDfordropdonw(@PathVariable(value = "Request_id") Long Request_id) {
		try {
			return bizcasereqrepo.findById(Request_id).map(bizcasedata -> {
				if (bizcasedata.getProject() != null) {
					List<JDModel> jdModels = jdrepo.findByRequestId(Request_id);
					return ResponseHandler.generateResponse("List of Job Description", true, HttpStatus.OK, jdModels);
				} else {
					LOGGER.error("Exceptions happen!: Bussiness Case not approved yet");
					return ResponseHandler.generateResponse("Bussiness Case not approved yet", false, HttpStatus.OK,
							null);
				}

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Biz ID  " + Request_id + " Doesn't exist");
				return ResponseHandler.generateResponse("Biz ID  " + Request_id + " Doesn't exist", false,
						HttpStatus.OK, null);
			});
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get JD all by bizid: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	@GetMapping("/getjd/{JD_id}")
	public ResponseEntity<Object> findSingleJD(@PathVariable(value = "JD_id") Long JD_id) {
		try {
			return jdrepo.findById(JD_id).map(jddate -> {
				return ResponseHandler.generateResponse("Job Description", true, HttpStatus.OK, jddate);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: JDID " + JD_id + " Doesn't exist");
				return ResponseHandler.generateResponse("JDID " + JD_id + " Doesn't exist", false, HttpStatus.OK, null);
			});
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get JD all by jdid: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	// Bulk Insert with FileUpload Option
	@PostMapping("/bulkinsertorupdate/{RequestId}")
	public ResponseEntity<Object> jdBulkInsert(@PathVariable(value = "RequestId") Long RequestId,
			@Valid @RequestBody List<JDModel> jdRequestdata) {
		try {
			return bizcasereqrepo.findById(RequestId).map(bizrequest -> {

				List<JDModel> fullJdModels = new ArrayList<>();
				for (JDModel currentJD : jdRequestdata) {

					JDModel createnewjdmodel = new JDModel();
					createnewjdmodel.setId(currentJD.getId());
					createnewjdmodel.setJd_code(currentJD.getJd_code());
					createnewjdmodel.setJd_description(currentJD.getJd_description());
					createnewjdmodel.setJd_role(currentJD.getJd_role());
					createnewjdmodel.setPosition_code(currentJD.getPosition_code());
					createnewjdmodel.setIsuploaded(currentJD.getIsuploaded());
					createnewjdmodel.setUpload_action(currentJD.getUpload_action());
					createnewjdmodel.setSupporting_files(currentJD.getSupporting_files());
					createnewjdmodel.setRequest(bizrequest);
					fullJdModels.add(createnewjdmodel);
				}
				List<JDModel> fullJdModelsdata = jdrepo.saveAll(fullJdModels);
				for (JDModel currentJD : fullJdModelsdata) {
					for (SupportingFiles currentfile : currentJD.getSupporting_files()) {
						FileUploadModel filedata = fileUploadRepository.findById(currentfile.getId()).get();
						filedata.setMapped(true);
						fileUploadRepository.save(filedata);
					}
				}

				bizrequest.setJd_created(true);
				bizcasereqrepo.save(bizrequest);
				return ResponseHandler.generateResponse("Job Description Created Successfully", true, HttpStatus.OK,
						fullJdModelsdata);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: RequestId " + RequestId + " Doesn't exist");
				return ResponseHandler.generateResponse("RequestId " + RequestId + " Doesn't exist", false,
						HttpStatus.OK, null);
			});

		} catch (Exception e) {

			LOGGER.error("Internal Server Error while insert JD: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	@RequestMapping(value = "/insertorupdate/{RequestId}", method = RequestMethod.POST, consumes = {
			"multipart/form-data" })
	public ResponseEntity<Object> jdInsert(@PathVariable(value = "RequestId") Long RequestId,
			@Valid @ModelAttribute JDRequest currentJD) {
		try {
			return bizcasereqrepo.findById(RequestId).map(bizrequest -> {

				List<SupportingFiles> supportingfiles = new ArrayList<>();

				if (currentJD.getSupporting_files() != null) {
					Arrays.asList(currentJD.getSupporting_files()).stream().forEach(file -> {
						SupportingFiles currentFiles = new SupportingFiles();

						String filename = storageServicepath.save(file);
						currentFiles.setSupporting_files_name(filename);
						currentFiles.setSupporting_files_url(
								env.getProperty("hostname.name") + "/api/jobdescription/attachmens/" + filename);
						supportingfiles.add(currentFiles);
					});
				}

				JDModel createnewjdmodel = new JDModel();
				createnewjdmodel.setId(currentJD.getId());
				createnewjdmodel.setJd_code(currentJD.getJd_code());
				createnewjdmodel.setJd_description(currentJD.getJd_description());
				createnewjdmodel.setJd_role(currentJD.getJd_role());
				createnewjdmodel.setPosition_code(currentJD.getPosition_code());
				createnewjdmodel.setIsuploaded(currentJD.getIsuploaded());
				createnewjdmodel.setUpload_action(currentJD.getUpload_action());
				createnewjdmodel.setSupporting_files(supportingfiles);
				createnewjdmodel.setRequest(bizrequest);

				jdrepo.save(createnewjdmodel);
				bizrequest.setJd_created(true);
				bizcasereqrepo.save(bizrequest);
				return ResponseHandler.generateResponse("Job Description Created Successfully", true, HttpStatus.OK,
						createnewjdmodel);

			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: RequestId " + RequestId + " Doesn't exist");
				return ResponseHandler.generateResponse("RequestId " + RequestId + " Doesn't exist", false,
						HttpStatus.OK, null);
			});

		} catch (Exception e) {

			LOGGER.error("Internal Server Error while insert JD: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	@GetMapping("/attachmens/{filename:.+}")
	@ResponseBody
	public ResponseEntity<Resource> getFile(@PathVariable String filename) {
		try {

			Resource file = storageServicepath.load(filename);
			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
					.body(file);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while download JD document: " + e.getMessage());
			return ResponseEntity.notFound().build();
		}

	}

	@PutMapping("/removedocs/{id}/{filename}")
	public ResponseEntity<Object> removejd(@PathVariable Long id, @PathVariable String filename) {
		try {

			return jdrepo.findById(id).map(updatedata -> {

				for (SupportingFiles currentfile : updatedata.getSupporting_files()) {
					if (currentfile.getSupporting_files_name().equals(filename)) {
						updatedata.getSupporting_files().remove(currentfile);
						storageServicepath.delete(currentfile.getSupporting_files_name());
						fileUploadRepository.deleteById(currentfile.getId());
						break;
					}
				}
				jdrepo.deleteById(id);

				return ResponseHandler.generateResponse("JD Remove Successfully", true, HttpStatus.OK, null);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: JD ID " + id + " Doesn't exist to remove attachment");
				return ResponseHandler.generateResponse("JD ID " + id + " Doesn't exist to remove attachment", false,
						HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while remove JD Document: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	@PutMapping("/deletejd/{id}")
	public ResponseEntity<Object> deleteJD(@PathVariable Long id) {
		try {

			return jdrepo.findById(id).map(updatedata -> {
				for (SupportingFiles currentfile : updatedata.getSupporting_files()) {
					updatedata.getSupporting_files().remove(currentfile);
					storageServicepath.delete(currentfile.getSupporting_files_name());
				}
				jdrepo.deleteById(id);

				return ResponseHandler.generateResponse("JD Remove Successfully", true, HttpStatus.OK, null);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: JD ID " + id + " Doesn't exist to remove attachment");
				return ResponseHandler.generateResponse("JD ID " + id + " Doesn't exist to remove attachment", false,
						HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while remove JD Document: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	// JD Mapping Controller

	@GetMapping("/getjdmapping/{Request_id}")
	public ResponseEntity<Object> findAllJDMapping(@PathVariable(value = "Request_id") Long Request_id) {
		try {
			List<JDMappingModel> jdModels = jdMappingRepository.findByRequestId(Request_id);
			return ResponseHandler.generateResponse("List of Job Description Mapping", true, HttpStatus.OK, jdModels);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get all JD: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	@PostMapping("/saveorupdatejdmapping/{requestId}")
	public ResponseEntity<Object> bizCaseReqLoadData(@PathVariable(value = "requestId") Long requestId,
			@Valid @RequestBody List<JDRampupModel> jdRampupModel) {
		try {
			return bizcasereqrepo.findById(requestId).map(bizdata -> {

				// Delete the JD once Update or delete
				jdMappingRepository.deleteByRequestId(requestId);

				for (JDRampupModel jdRampupModeldata : jdRampupModel) {
					for (JDRampupProperties jdRampupProperties : jdRampupModeldata.getProperties()) {
						if (jdRampupProperties.getJd_map() != null) {
							for (JDRampupMapping jsJdRampupMapping : jdRampupProperties.getJd_map()) {

								JDMappingModel jdMappingModel = new JDMappingModel();
								jdMappingModel.setQuantity(jsJdRampupMapping.getQuantity());
								jdMappingModel.setLevel(jdRampupModeldata.getLevel());
								jdMappingModel.setMonthandyear(jdRampupProperties.getProperty_name());

								Long strJDs = jsJdRampupMapping.getJdcode();
								Set<JDModel> jdModels = new HashSet<>();

								JDModel JD_Code = jdrepo.findById(strJDs)
										.orElseThrow(() -> new RuntimeException("Error: JD ID is not found."));
								JD_Code.setIsmapped(true);
								jdrepo.save(JD_Code);
								jdModels.add(JD_Code);
								jsJdRampupMapping.setPosition_code(JD_Code.getPosition_code());
								List<JDHiredResponse> status = new ArrayList<>();
								for (int i = 1; i <= jsJdRampupMapping.getQuantity(); i++) {
									JDHiredResponse hired_response = new JDHiredResponse();
									hired_response.setId(Long.valueOf(i));
									status.add(hired_response);
								}
								jsJdRampupMapping.setStatus("Open");
								jdMappingModel.setHired_details(status);
								jdMappingModel.setPosition_code(JD_Code.getPosition_code());
								jdMappingModel.setJD(jdModels);
								jdMappingModel.setRequest(bizdata);

								jdMappingRepository.save(jdMappingModel);
							}
						}

					}
				}
				bizdata.setJdmappingrampup(jdRampupModel);
				bizdata.setJd_created(true);
				bizcasereqrepo.save(bizdata);
				return ResponseHandler.generateResponse("JD Mapping Created Successfully", true, HttpStatus.OK,
						jdRampupModel);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: LeadID " + requestId + " Doesn't exist");
				return ResponseHandler.generateResponse("LeadID " + requestId + " Doesn't exist", false, HttpStatus.OK,
						null);
			});

		} catch (Exception e) {

			LOGGER.error("Internal Server Error while insert JD Mapping: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	@GetMapping("/jdmapping/{bizid}")
	public ResponseEntity<Object> getJDMapping(@PathVariable(value = "bizid") Long bizid) {
		try {
			return bizcasereqrepo.findById(bizid).map(bizdata -> {
				List<Rampups> manpowerrampupList = bizdata.getRampups();
				List<JDRampupModel> jdRampupModel = bizdata.getJdmappingrampup();
				JDMappingResponse jdMappingResponse = new JDMappingResponse();
				jdMappingResponse.setJdRampupModel(jdRampupModel);
				jdMappingResponse.setManpowerrampupList(manpowerrampupList);
				return ResponseHandler.generateResponse("JD Information", true, HttpStatus.OK, jdMappingResponse);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Biz req ID " + bizid + " Doesn't exist");
				return ResponseHandler.generateResponse("Biz req ID " + bizid + " Doesn't exist", false, HttpStatus.OK,
						null);
			});
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get JD Mapping: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	@GetMapping("/jdmappingbyid/{id}")
	public ResponseEntity<Object> getJDMappingbyid(@PathVariable(value = "id") Long id) {
		try {
			return jdMappingRepository.findById(id).map(Jddata -> {
				return ResponseHandler.generateResponse("JD Information", true, HttpStatus.OK, Jddata);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: JDMapping " + id + " Doesn't exist");
				return ResponseHandler.generateResponse("JDMapping " + id + " Doesn't exist", false, HttpStatus.OK,
						null);
			});
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get JD Mapping: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}
}

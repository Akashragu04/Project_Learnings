/*
 *
 */
package com.daimler.schematicbackend.controller.multifile;

import com.daimler.schematicbackend.entity.file.ErrorMessage;
import com.daimler.schematicbackend.exception.file.SchematicFileException;
import com.daimler.schematicbackend.model.file.SchematicMultiFileProcessable;
import com.daimler.schematicbackend.model.generic.SchematicGenericFileUploadResponse;
import com.daimler.schematicbackend.service.file.SchematicA06FileService;
import com.daimler.schematicbackend.utils.file.SchematicFileErrorMessageUtils;
import com.daimler.schematicbackend.validator.SchematicFileFormatValidator;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

/**
 * The Class SchematicA06FileController.
 */
@RestController
public class SchematicA06FileController implements ISchematicMultiFileEndpoint {

    /**
     * The file service.
     */
    @Autowired
    SchematicA06FileService fileService;

    @Autowired
    SchematicFileErrorMessageUtils utils;

    @Autowired
    SchematicFileFormatValidator validator;

    @Override
    @PostMapping("/a06Data")
    public ResponseEntity<SchematicGenericFileUploadResponse> uploadFile(List<MultipartFile> multipart, String userName,
            boolean fileCheck) throws IOException, SchematicFileException {
        // boolean fileCheck = true;
        SchematicMultiFileProcessable processable = validator.validateA06(multipart);
        List<String> genericErrors = processable.getErrorMessageList();
        List<ErrorMessage> sheetErrors = new ArrayList<>();
        List<String> warnMessage = new ArrayList<>();
        if (ObjectUtils.isNotEmpty(processable.getMultipartFileList())) {
            multipart = processable.getMultipartFileList();
            genericErrors.addAll(fileService.processFile(multipart, userName, fileCheck, warnMessage));
            sheetErrors = multipart.stream().map(elem -> StringUtils.toRootUpperCase(elem.getOriginalFilename()))
                    .filter(elem -> StringUtils.contains(elem, ".XLSX"))
                    .map(elem -> utils.messageList(elem.replace(".XLSX", ""))).flatMap(Collection::stream)
                    .collect(Collectors.toList());
        }
        if (ObjectUtils.isEmpty(genericErrors) && ObjectUtils.isEmpty(sheetErrors)) {
            if (ObjectUtils.isNotEmpty(warnMessage) && !fileCheck) {
                return ResponseEntity.ok(new SchematicGenericFileUploadResponse("File Already Exist", genericErrors,
                        sheetErrors, warnMessage));
            } else {
                return ResponseEntity.ok(new SchematicGenericFileUploadResponse("Upload Successful.", genericErrors,
                        sheetErrors, warnMessage));
            }
        } else {
            String type = utils.getErrorType(genericErrors, sheetErrors);
            return ResponseEntity.badRequest()
                    .body(new SchematicGenericFileUploadResponse(type, genericErrors, sheetErrors, warnMessage));
        }
    }
}

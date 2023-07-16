/*
 *
 */
package com.daimler.schematicbackend.controller.multifile;

import com.daimler.schematicbackend.exception.file.SchematicFileException;
import com.daimler.schematicbackend.model.generic.SchematicGenericFileResponse;
import com.daimler.schematicbackend.model.generic.SchematicGenericFileUploadResponse;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

/**
 * The Interface ISchematicMultiFileEndpoint.
 */
@RequestMapping("/v1/multiFile")
public interface ISchematicMultiFileEndpoint {

    /**
     * Upload file.
     *
     * @param file
     *            the file
     * @param userName
     *            the user name
     * @return the response entity
     * @throws IOException
     *             Signals that an I/O exception has occurred.
     * @throws SchematicFileException
     *             the schematic file exception
     */
    @ApiOperation(httpMethod = "POST", value = "Upload the Excel/Zip File", nickname = "uploadFile")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "File Success", response = String.class, responseContainer = "String"),
            @ApiResponse(code = 400, message = "Invalid Request"),
            @ApiResponse(code = 500, message = "Processing error") })
    ResponseEntity<SchematicGenericFileUploadResponse> uploadFile(
            @ApiParam(value = "Excel/Zip File", required = true) @RequestParam("files") List<MultipartFile> file,
            @ApiParam(value = "Username Header", required = true) @RequestHeader("userName") String userName,
            @ApiParam(value = "fileCheck", required = true) @RequestParam("fileCheck") boolean fileCheck)
            throws IOException, SchematicFileException;

}

package com.daimler.schematicbackend.controller.singlefile;

import com.daimler.schematicbackend.exception.file.SchematicFileException;
import com.daimler.schematicbackend.model.generic.SchematicGenericFileResponse;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * The interface Single file end point.
 */
@RequestMapping("/v1/singleFile")
public interface ISchematicSingleFileEndPoint {

    /**
     * Upload file response entity.
     *
     * @param file the file
     * @return the response entity
     * @throws IOException            the io exception
     * @throws SchematicFileException the schematic file exception
     */
    @ApiOperation(httpMethod = "POST", value = "Upload the Excel/Zip File", nickname = "uploadFile")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "File Success", response = String.class, responseContainer = "String"),
            @ApiResponse(code = 400, message = "Invalid Request"),
            @ApiResponse(code = 500, message = "Processing error")})
    ResponseEntity<SchematicGenericFileResponse> uploadFile(
            @ApiParam(value = "userName", required = true) @RequestHeader("userName") String userName,
            @ApiParam(value = "Excel/Zip File", required = true) @RequestParam("file") MultipartFile file)
            throws IOException, SchematicFileException;
}

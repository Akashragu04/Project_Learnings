package com.daimler.schematicbackend.controller.singlefile;

import com.daimler.schematicbackend.exception.file.SchematicFileException;
import com.daimler.schematicbackend.model.file.SchematicImageDataResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.zip.DataFormatException;

/**
 * The interface Single file end point.
 */
@RequestMapping("/v1/image")
public interface ISchematicSinglFileImageDataEndPoint {

    @GetMapping("/getImage")
    ResponseEntity<SchematicImageDataResponse> getImageAsBytes()
            throws SchematicFileException, DataFormatException, IOException;

    @PostMapping("/deleteImage")
    ResponseEntity<SchematicImageDataResponse> deleteImageAsBytes(@RequestParam("imageFlag") String imageFlag)
            throws SchematicFileException, DataFormatException, IOException;

    @PostMapping("/uploadImageData")
    ResponseEntity<SchematicImageDataResponse> uploadImageData(@RequestParam("imageFile") MultipartFile file,
            @RequestParam("imageFlag") String imageFlag, @RequestParam("userName") String userName) throws IOException;
}

package com.daimler.schematicbackend.controller.singlefile;

import com.daimler.schematicbackend.entity.file.SchematicImageData;
import com.daimler.schematicbackend.exception.file.SchematicFileException;
import com.daimler.schematicbackend.model.file.SchematicImageDataResponse;
import com.daimler.schematicbackend.service.file.SchematicImageDataService;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

/**
 * The type SchematicSchematicImageDataController.
 */
@RestController
public class SchematicImageDataController implements ISchematicSinglFileImageDataEndPoint {

    /**
     * The Image service.
     */
    @Autowired
    SchematicImageDataService schematicImageDataService;

    @Override
    @GetMapping("/getImage")
    public ResponseEntity<SchematicImageDataResponse> getImageAsBytes()
            throws SchematicFileException, DataFormatException, IOException {
        List<SchematicImageData> imageDateList = schematicImageDataService.getImageDataByFlag();
        // return ResponseEntity.ok(());
        if (ObjectUtils.isEmpty(imageDateList)) {
            return ResponseEntity.ok().body(new SchematicImageDataResponse("No images are present", imageDateList));
        } else {
            return ResponseEntity.ok()
                    .body(new SchematicImageDataResponse("Images are getting successfully ", imageDateList));
        }
    }

    @Override
    @PostMapping("/deleteImage")
    public ResponseEntity<SchematicImageDataResponse> deleteImageAsBytes(@RequestParam("imageFlag") String imageFlag)
            throws SchematicFileException, DataFormatException, IOException {
        String deltedResponse = "";
        if (StringUtils.isEmpty(imageFlag)) {
            throw new SchematicFileException("Image Flag is Required");
        } else {
            deltedResponse = schematicImageDataService.deleteImageData(imageFlag);
        }

        if (ObjectUtils.isEmpty(deltedResponse)) {
            return ResponseEntity.badRequest().body(
                    new SchematicImageDataResponse("Image was not deleted !Please check error log", new ArrayList<>()));
        } else {
            return ResponseEntity.ok()
                    .body(new SchematicImageDataResponse("Image Deleted Successfully ", new ArrayList<>()));
        }
        // return ResponseEntity.status(HttpStatus.OK).body("Image Deleted Successfully ");
    }

    @Override
    @PostMapping("/uploadImageData")
    public ResponseEntity<SchematicImageDataResponse> uploadImageData(@RequestParam("imageFile") MultipartFile file,
            @RequestParam("imageFlag") String imageFlag, @RequestParam("userName") String userName) throws IOException {
        System.out.println("Original Image Byte Size - " + file.getBytes().length);
        String fileName = org.springframework.util.StringUtils.cleanPath(file.getOriginalFilename());
        String imageData = Base64.getEncoder().encodeToString(file.getBytes());
        SchematicImageData schematicImgData = SchematicImageData.builder().imageName(fileName).imageData(imageData)
                .imageFlag(imageFlag).build();
        schematicImgData.setCreationDate(LocalDate.now());
        schematicImgData.setUpdationDate(LocalDate.now());
        schematicImgData.setUpdatedBy(userName);
        schematicImgData.setCreatedBy(userName);
        schematicImgData.setHistoryFlag("N");
        List<SchematicImageData> imageDataByFlag = null;
        try {
            imageDataByFlag = schematicImageDataService.getImageDataByFlag(imageFlag);
        } catch (DataFormatException e) {
            e.printStackTrace();
        }
        boolean saveFlag = false;
        if (imageDataByFlag.isEmpty()) {
            schematicImageDataService.saveImageData(schematicImgData);

        }
        for (SchematicImageData schematicImageData : imageDataByFlag) {
            String imgaeFlagfromDB = schematicImageData.getImageFlag();
            if (imageFlag.equalsIgnoreCase(imgaeFlagfromDB)) {
                SchematicImageData schematicImgData1 = SchematicImageData.builder().imageName(fileName)
                        .imageData(imageData).imageFlag(imgaeFlagfromDB).build();
                schematicImgData1.setCreationDate(schematicImageData.getCreationDate());
                schematicImgData1.setUpdationDate(LocalDate.now());
                schematicImgData1.setUpdatedBy(userName);
                schematicImgData1.setCreatedBy(schematicImageData.getCreatedBy());
                schematicImgData1.setHistoryFlag("N");
                schematicImageDataService.updateImageDataByFlag(imageFlag);
                schematicImageDataService.saveImageData(schematicImgData1);
            } else {
                saveFlag = true;
            }
        }
        if (saveFlag) {
            schematicImageDataService.saveImageData(schematicImgData);
        }
        return ResponseEntity.ok()
                .body(new SchematicImageDataResponse("Image Uploaded Successfully ", new ArrayList<>()));
    }

    // compress the image bytes before storing it in the database
    public static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        try {
            outputStream.close();
        } catch (IOException e) {
        }
        System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);
        return outputStream.toByteArray();
    }

    // uncompress the image bytes before returning it to the angular application
    public static byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException ioe) {
        } catch (DataFormatException e) {
        }
        return outputStream.toByteArray();
    }

}

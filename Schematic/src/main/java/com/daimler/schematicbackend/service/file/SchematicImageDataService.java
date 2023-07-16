package com.daimler.schematicbackend.service.file;

import com.daimler.schematicbackend.entity.file.SchematicImageData;
import com.daimler.schematicbackend.repository.file.SchematicImageDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.zip.DataFormatException;

/**
 * The type Custom image service.
 */
@Service
public class SchematicImageDataService {

    @Autowired
    SchematicImageDataRepository schematicImageDataRepository;

    public List<SchematicImageData> getImageDataByFlag() throws DataFormatException, IOException {
        List<SchematicImageData> schematicImageData = schematicImageDataRepository.findByImageNameAndFlag();
        List<byte[]> listofBytes = new ArrayList<>();
        for (SchematicImageData schematicImage : schematicImageData) {
            listofBytes.add(Base64.getDecoder().decode(schematicImage.getImageData()));
        }
        return schematicImageData;
    }

    public List<SchematicImageData> getImageDataByFlag(String imageFlag) throws DataFormatException, IOException {
        List<SchematicImageData> schematicImageData = schematicImageDataRepository.findByImageFlag(imageFlag);
        /*
         * List<byte[]> listofBytes = new ArrayList<>(); for (SchematicImageData schematicImage : schematicImageData) {
         * listofBytes.add(Base64.getDecoder().decode(schematicImage.getImageData())); }
         */
        return schematicImageData;
    }

    public void saveImageData(SchematicImageData img) {
        schematicImageDataRepository.save(img);
    }

    public String deleteImageData(String imageFlag) {
        schematicImageDataRepository.deleteImageByFlag(imageFlag);
        return "Image deleted successfully";
    }

    public byte[] updateImageDataByFlag(String imageFlag) {
        schematicImageDataRepository.deleteImageIfExist(imageFlag);
        return new byte[0];
    }
}

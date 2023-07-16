package com.daimler.schematicbackend.model.file;

import com.daimler.schematicbackend.entity.file.SchematicImageData;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SchematicImageDataResponse {
    private String response;
    private List<SchematicImageData> imageData;
}

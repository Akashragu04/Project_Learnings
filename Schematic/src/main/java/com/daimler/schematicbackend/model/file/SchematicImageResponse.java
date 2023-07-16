package com.daimler.schematicbackend.model.file;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SchematicImageResponse {
    private byte[] imageData;
}

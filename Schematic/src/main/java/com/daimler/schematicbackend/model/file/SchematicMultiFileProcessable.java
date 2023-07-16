package com.daimler.schematicbackend.model.file;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * The type Schematic multi file processable.
 */
@AllArgsConstructor
@NoArgsConstructor
@Data
public class SchematicMultiFileProcessable {
    /**
     * The Error message list.
     */
    List<String> errorMessageList;
    /**
     * The Multipart file list.
     */
    List<MultipartFile> multipartFileList;
}

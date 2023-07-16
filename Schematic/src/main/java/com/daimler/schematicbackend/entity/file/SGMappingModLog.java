/*
 *
 */
package com.daimler.schematicbackend.entity.file;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * The Class SGMappingModLog. Author by Sriramulu
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SGMappingModLog {

    private String g06Name;
    private String sxxName;
    private String userName;
    private String uploadDate;
    private String creationDate;
    private String modifiedDate;
}

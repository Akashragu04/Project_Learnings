package com.daimler.schematicbackend.entity.file;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * The type G06ModLogData Author by Sriramulu
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class G06ModLogData implements Serializable {

    private String g06name;

    private String userName;

    private String uploadDate;

    private String commodity;

    private String modifiedDate;

    private String creationDate;

    private String modifiedBy;

}

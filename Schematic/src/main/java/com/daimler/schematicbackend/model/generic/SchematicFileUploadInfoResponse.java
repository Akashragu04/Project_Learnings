package com.daimler.schematicbackend.model.generic;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * The type Schematic generic file Information response.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SchematicFileUploadInfoResponse {

    /**
     * The file Name.
     */
    @ApiModelProperty(notes = "commodity", required = true, name = "commodity", value = "${commodity}")
    private String commodity;

    /**
     * The uploaded By.
     */
    @ApiModelProperty(notes = "uploadedBy", required = true, name = "uploadedBy", value = "${uploadedBy}")
    private String uploadedBy;

    /**
     * The uploaded Date.
     */
    @ApiModelProperty(notes = "uploadedDate", required = true, name = "uploadedDate", value = "${uploadedDate}")
    private String uploadedDate;

    @ApiModelProperty(notes = "modifiedDate", required = true, name = "modifiedDate", value = "${modifiedDate}")
    private String modifiedDate;

    @ApiModelProperty(notes = "modifiedBy", required = true, name = "modifiedBy", value = "${modifiedBy}")
    private String modifiedBy;

    @ApiModelProperty(notes = "creationDate", required = true, name = "creationDate", value = "${creationDate}")
    private String creationDate;

}

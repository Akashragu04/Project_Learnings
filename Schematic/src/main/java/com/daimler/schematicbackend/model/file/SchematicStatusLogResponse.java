/*
 *
 */
package com.daimler.schematicbackend.model.file;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * The Class SchematicStatusLogResponse.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SchematicStatusLogResponse {

    /**
     * The user name.
     */
    @ApiModelProperty(notes = "User Assigned", required = true, name = "userName", value = "Name of the user")
    private String assignedTo;

    /**
     * The assigned by
     */
    @ApiModelProperty(notes = "Assigned By User", required = true, name = "assignedByUser", value = "Name of the assigned by user")
    private String assignedBy;

    /**
     * The assigned date
     */
    @ApiModelProperty(notes = "Assigned Date", required = true, name = "assignDate", value = "Assigned Date")
    private LocalDateTime assignDate;

    /**
     * The commodity name.
     */
    @ApiModelProperty(notes = "Commodity Name", required = true, name = "commodityName", value = "Name of the commodity")
    private String commodityName;

    /**
     * The active.
     */
    @ApiModelProperty(notes = "Gives Commodity Status", required = true, name = "active", value = "Status")
    private String status;

    /**
     * The assigned date
     */
    @ApiModelProperty(notes = "Rendered Date", required = true, name = "renderedDate", value = "Rendered Date")
    private LocalDateTime renderDate;

}

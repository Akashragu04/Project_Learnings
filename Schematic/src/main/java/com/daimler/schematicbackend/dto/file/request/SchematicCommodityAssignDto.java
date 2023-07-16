/*
 *
 */
package com.daimler.schematicbackend.dto.file.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * The Class SchematicCommodityAssignDto.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SchematicCommodityAssignDto {

    /**
     * The commodity name.
     */
    // @NotNull(message = "Commodity Name cannot be null")
     @NotEmpty(message = "Commodity Name cannot be empty or blank")
    // @NotBlank(message = "Commodity Name cannot be blank")
    @ApiModelProperty(notes = "Name of the Commodity Assigned", required = true, name = "commoditName", value = "Commodity Name")
    private String commodityName;

    /**
     * The assigned.
     */
    @ApiModelProperty(notes = "Indicates if commodity is assigned to the user", required = true, name = "assigned", value = "true/false")
    private boolean assigned;

    /**
     * The assigned by.
     */
    //@NotNull(message = "Assigned  By  cannot be null")
    @NotEmpty(message = "Assigned By  cannot be empty or blank")
    //@NotBlank(message = "Assigned By  cannot be blank")
    @ApiModelProperty(notes = "Short Id of the Admin User", required = true, name = "assignedBy", value = "${short Id}")
    private String assignedBy;

    /**
     * The assigned to.
     */
    //@NotNull(message = "Assigned  To  cannot be null")
    @NotEmpty(message = "Assigned To  cannot be empty or blank")
    //@NotBlank(message = "Assigned To  cannot be blank")
    @ApiModelProperty(notes = "Short Id of the User who is working on commodity", required = true, name = "assignedTo", value = "${short Id}")
    private String assignedTo;

    /**
     * The priority.
     */
    @ApiModelProperty(notes = "Priority of the commodity", required = true, name = "priority", value = "true/false")
    private boolean priority;

}

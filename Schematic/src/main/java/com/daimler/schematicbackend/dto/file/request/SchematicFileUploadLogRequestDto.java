package com.daimler.schematicbackend.dto.file.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SchematicFileUploadLogRequestDto {

    /**
     * The Start Date.
     */
    //@NotNull(message = "Start Date cannot be null")
    @NotEmpty(message = "Start Date cannot be empty or blank")
    //@NotBlank(message = "Start Date cannot be blank")
    private String startDate;

    /**
     * The End Date.
     */
    //@NotNull(message = "End Date cannot be null")
    @NotEmpty(message = "End Date cannot be empty or blank")
    //@NotBlank(message = "End Date cannot be blank")
    private String endDate;
}

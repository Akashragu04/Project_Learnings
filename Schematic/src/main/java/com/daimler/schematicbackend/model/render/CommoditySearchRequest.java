package com.daimler.schematicbackend.model.render;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommoditySearchRequest {

    @NotBlank(message = "Commodity Name cannot be blank")
    @NotNull(message = "Commodity Name cannot be null")
    @NotEmpty(message = "Commodity Name cannot be empty")
    private String commodityName;

    @NotBlank(message = "User Name cannot be blank")
    @NotNull(message = "User Name cannot be null")
    @NotEmpty(message = "User Name cannot be empty")
    private String userName;

    @NotBlank(message = "Role cannot be blank")
    @NotNull(message = "Role cannot be null")
    @NotEmpty(message = "Role cannot be empty")
    private String role;

}

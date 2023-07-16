package com.daimler.schematicbackend.model.render;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SchematicPathRequest {

    @NotNull
    List<String> mxGraphHtml;

    @NotNull
    List<SchematicPortCordinator> portCordinators;

    boolean deleteFlag;
}

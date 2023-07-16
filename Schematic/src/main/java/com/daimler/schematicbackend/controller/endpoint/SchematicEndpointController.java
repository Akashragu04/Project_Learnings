package com.daimler.schematicbackend.controller.endpoint;

import com.daimler.schematicbackend.model.generic.SchematicEndPointResponse;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class SchematicEndpointController {

    @Autowired
    RequestMappingHandlerMapping mapping;

    @RequestMapping("/v1/endpoints/fetch")
    public List<SchematicEndPointResponse> fetchAllEndpoints() {
        return mapping.getHandlerMethods().keySet().stream().map(RequestMappingInfo::toString)
                .map(elem -> elem.replaceAll("[{}()\\[\\]]", StringUtils.EMPTY))
                .map(elem -> elem.split(StringUtils.SPACE))
                .filter(elem -> StringUtils.isNotEmpty(elem[0]) && StringUtils.isNotBlank(elem[0]))
                .map(elem -> new SchematicEndPointResponse(elem[1].split("/")[3], elem[0], elem[1]))
                .collect(Collectors.toList());
    }
}

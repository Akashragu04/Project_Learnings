package com.daimler.schematicbackend.controller.render;

import com.daimler.schematicbackend.embeddable.G06Embeddable;
import com.daimler.schematicbackend.entity.render.G06RenderData;
import com.daimler.schematicbackend.entity.render.RenderModel;
import com.daimler.schematicbackend.model.render.SchematicPathRequest;
import com.daimler.schematicbackend.model.render.SchematicPortCordinator;
import com.daimler.schematicbackend.model.render.SchematicWireError;
import com.daimler.schematicbackend.repository.file.SchematicG06DataRepository;
import com.daimler.schematicbackend.repository.render.SchematicG06Repository;
import com.daimler.schematicbackend.service.render.SchematicRenderService;
import com.daimler.schematicbackend.utils.render.SchematicWireUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/v1/path")
@Slf4j
public class SchematicPathController {

    @Autowired
    SchematicRenderService renderService;

    @Autowired
    SchematicG06DataRepository g06DataRepository;

    @Autowired
    SchematicWireUtils wireUtils;

    @Autowired
    SchematicG06Repository schematicGo6RenderRepository;

    @PostMapping("/readRuleBasedPath")
    public List<String> updatePath(@Valid @RequestBody SchematicPathRequest pathRequest,
                                   @RequestHeader("commodityName") String commodityName) {

        int wirecounter = 0;
        List<String> mxGraphHtml = pathRequest.getMxGraphHtml();
        Map<String, SchematicPortCordinator> schematicPortCordinatorMap = pathRequest.getPortCordinators().stream()
                .collect(Collectors.toMap(elem -> elem.getConnectorName() + elem.getPort(), elem -> elem));

        List<String> updatedList = new ArrayList<>();
        commodityName = StringUtils.trim(commodityName);

        List<G06RenderData> validWireData = schematicGo6RenderRepository.findByCommodityName(commodityName);
        List<RenderModel> renderModelList = renderService.findByCommodityName(commodityName);
        Map<String, RenderModel> renderMap = renderModelList.stream()
                .collect(Collectors.toMap(RenderModel::getConnectorName, e -> e));
        int size = ObjectUtils.isNotEmpty(mxGraphHtml) ? mxGraphHtml.size() : 0;

        if (size > 0 && ObjectUtils.isNotEmpty(validWireData) && validWireData.size() > 0) {
            size = mxGraphHtml.get(0).equalsIgnoreCase(mxGraphHtml.get(size / 2)) ? size / 2 : size;
            int count = 0;
            for (String html : mxGraphHtml) {
                StringBuffer recreatedPath = new StringBuffer(StringUtils.EMPTY);
                StringBuffer newPath = new StringBuffer(StringUtils.EMPTY);
                G06RenderData data = validWireData.get(count);
                String[] pathArr = html.split("\"");
                if (pathArr != null && pathArr.length > 1) {
                    G06Embeddable embeddable = data.getG06ExcelData();
                    String sourcePort = embeddable.getSrcCavity()
                            + (StringUtils.isNotEmpty(data.getSourcePortDesignator())
                            ? data.getSourcePortDesignator().replace("P", StringUtils.EMPTY)
                            : StringUtils.EMPTY);

                    String destPort = embeddable.getDestCavity() + (StringUtils.isEmpty(data.getDestPortDesignator())
                            ? data.getDestPortDesignator().replace("P", StringUtils.EMPTY) : StringUtils.EMPTY);
                    SchematicPortCordinator src = schematicPortCordinatorMap
                            .get(embeddable.getOriginDes() + sourcePort);
                    SchematicPortCordinator dest = schematicPortCordinatorMap.get(embeddable.getMatingDes() + destPort);
                    String[] value = pathArr[1].split(" ");
                    if (ObjectUtils.isNotEmpty(value) && value.length > 1 && ObjectUtils.isNotEmpty(src)
                            && ObjectUtils.isNotEmpty(dest)
                            && StringUtils.equalsIgnoreCase(embeddable.getOriginDes(), src.getConnectorName())
                            && StringUtils.equalsIgnoreCase(embeddable.getMatingDes(), dest.getConnectorName())) {
                        double xSrc = new Double(value[1]);
                        double xDest = new Double(value[value.length - 2]);
                        double ySrc = new Double(value[2]);
                        double yDest = new Double(value[value.length - 1]);
                        int ddefaultDelta = dest.getDelta();
                        int sdefaultDelta = src.getDelta();

                        if (yDest == ySrc && Math.abs(xSrc - xDest) <= 5) {
                            log.error("Invalid coordinates generated by UI");
                        } else {
                            RenderModel sourceRModel = renderMap.get(embeddable.getOriginDes());
                            RenderModel destRModel = renderMap.get(embeddable.getMatingDes());
                            if (!StringUtils.equalsIgnoreCase(embeddable.getOriginDes(), embeddable.getMatingDes())
                                    && ObjectUtils.isNotEmpty(sourceRModel) && ObjectUtils.isNotEmpty(destRModel)) {
                                int wireConnectionType = data.getConnectionType();
                                if (wireConnectionType == 2) {
                                    if (Math.abs(yDest - ySrc) <= 2) {
                                        newPath.append("M").append(" ").append(xSrc).append(" ").append(ySrc)
                                                .append(" ").append("L").append(" ").append(xDest).append(" ")
                                                .append(yDest).append(" ");
                                    } else {
                                        wireConnectionType = 4;
                                    }
                                }
                                if (wireConnectionType == 4) {
                                    int retry = 0;
                                    do {
                                        List<SchematicWireError> wError = wireUtils.executeWireRuleEngine(
                                                xSrc + sdefaultDelta, ySrc, xDest + sdefaultDelta, yDest, commodityName,
                                                sourceRModel, destRModel, embeddable.getSrcCavity(),
                                                embeddable.getDestCavity());
                                        if (wError.isEmpty()) {
                                            newPath.append("M").append(" ").append(xSrc).append(" ").append(ySrc)
                                                    .append(" ").append("L").append(" ").append(xSrc + sdefaultDelta)
                                                    .append(" ").append(ySrc).append(" ").append("L").append(" ")
                                                    .append(xSrc + sdefaultDelta).append(" ").append(yDest).append(" ")
                                                    .append("L").append(" ").append(xDest).append(" ").append(yDest)
                                                    .append(" ");
                                            break;
                                        } else {
                                            retry++;
                                        }
                                    } while (retry++ != 5);
                                }
                                if (wireConnectionType == 6) {
                                    int retry = 0;
                                    int delta = 40;
                                    do {
                                        List<SchematicWireError> wError = wireUtils.executeWireRuleEngine(
                                                xSrc + sourceRModel.getHeight() + delta, ySrc + delta,
                                                xDest + ddefaultDelta, yDest - destRModel.getHeight() + delta,
                                                commodityName, sourceRModel, destRModel, embeddable.getSrcCavity(),
                                                embeddable.getDestCavity());
                                        if (wError.isEmpty()) {
                                            newPath.append("M").append(" ").append(xSrc).append(" ").append(ySrc)
                                                    .append(" ").append("L").append(" ").append(xSrc + sdefaultDelta)
                                                    .append(" ").append((ySrc)).append(" ").append("L").append(" ")
                                                    .append(xSrc + sdefaultDelta).append(" ")
                                                    .append(ySrc + sourceRModel.getHeight() + 100 + delta).append(" ")
                                                    .append("L").append(" ").append(xDest + ddefaultDelta).append(" ")
                                                    .append(ySrc + sourceRModel.getHeight() + 100 + delta).append(" ")
                                                    .append("L").append(" ").append(xDest + ddefaultDelta).append(" ")
                                                    .append(yDest).append(" ").append("L").append(" ").append(xDest)
                                                    .append(" ").append(yDest).append(" ");
                                            break;
                                        }
                                    } while (retry++ <= 5);

                                }
                            }
                        }
                        count++;
                        recreatedPath.append(pathArr[0]).append("\"").append(newPath).append("\"");
                        for (int k = 2; k < pathArr.length; k++)
                            recreatedPath.append(pathArr[k]).append('"');
                        updatedList.add(recreatedPath.toString());
                    }
                }
            }
        }
        schematicGo6RenderRepository.deleteByCommodityName(commodityName);
        return updatedList;
    }

}

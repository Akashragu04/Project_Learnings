package com.daimler.schematicbackend.controller.render;

import com.daimler.schematicbackend.embeddable.G06Embeddable;
import com.daimler.schematicbackend.entity.render.CommodityMaximum;
import com.daimler.schematicbackend.entity.render.G06RenderData;
import com.daimler.schematicbackend.entity.render.RenderModel;
import com.daimler.schematicbackend.entity.render.Segment;
import com.daimler.schematicbackend.exception.file.SchematicFileException;
import com.daimler.schematicbackend.model.render.*;
import com.daimler.schematicbackend.repository.render.SchematicCommodityMaxRepository;
import com.daimler.schematicbackend.repository.render.SchematicG06Repository;
import com.daimler.schematicbackend.service.render.SchematicRenderService;
import com.daimler.schematicbackend.utils.render.SchematicWireConnectionUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/v1/path")
@Slf4j
public class SchematicWirePathController {

    @Autowired
    SchematicRenderService renderService;

    @Autowired
    SchematicG06Repository schematicGo6RenderRepository;

    @Autowired
    SchematicWireConnectionUtils connectionUtils;

    @Autowired
    SchematicCommodityMaxRepository maxRepository;

    @PostMapping("/rearrangeWires")
   public List<SchematicRenderedWiredData> updatePath(@Valid @RequestBody SchematicPathRequest pathRequest,
            @RequestHeader("commodityName") String commodityName) throws SchematicFileException {

        List<String> updatedHtmlList = new ArrayList<>();
        commodityName = StringUtils.trim(commodityName);
        List<String> mxGraphHtmlList = pathRequest.getMxGraphHtml();
        Map<String, SchematicPortCordinator> schematicPortCordinatorMap = pathRequest.getPortCordinators().stream()
                .collect(Collectors.toMap(elem -> elem.getConnectorName() + elem.getPort(), elem -> elem ,(oldValue,newValue)->newValue));
        List<G06RenderData> validWireData = schematicGo6RenderRepository.findByCommodityName(commodityName);
        List<RenderModel> renderModelList = renderService.findByCommodityName(commodityName);
        Map<String, RenderModel> renderMap = renderModelList.stream()
                .collect(Collectors.toMap(RenderModel::getConnectorName, e -> e));
        int size = ObjectUtils.isNotEmpty(mxGraphHtmlList) ? mxGraphHtmlList.size() : 0;
        List<SchematicRenderedWiredData> schematicRenderedWiredDataList = new ArrayList<>();
        if (size > 0 && ObjectUtils.isNotEmpty(validWireData) && validWireData.size() > 0) {
            size = mxGraphHtmlList.get(0).equalsIgnoreCase(mxGraphHtmlList.get(size / 2)) ? size / 2 : size;
            int count = 0;
            List<Segment> horizontalList = new ArrayList<>();
            List<Segment> verticalList = new ArrayList<>();
            Map<Integer, SchematicMinMaxY> map = new HashMap<>();
            Map<Integer, SchematicColumnCoordinates> columnCoordinatesMap = new HashMap<>();
            CommodityMaximum maximum = maxRepository.findByCommodityName(commodityName)
                    .orElseThrow(() -> new SchematicFileException("Commodity does not exists"));
            int maxRow = maxRepository.findAll().stream().map(CommodityMaximum::getMaxRow).mapToInt(e -> e).max()
                    .getAsInt();
            double maxEndX = renderModelList.stream().filter(elem -> elem.getColumnInd() == maximum.getMaxCol())
                    .max(Comparator.comparing(RenderModel::getEndX)).map(elem -> elem.getEndX()).orElse(0.0);
            connectionUtils.generateMaxEndYAndMinYMap(map, columnCoordinatesMap, renderModelList, maximum.getMaxCol());
            HashMap<String, Value> valueHashMap = connectionUtils.convertToWirePlaneMap(map);
            for (String mxGraphHtml : mxGraphHtmlList) {
                G06RenderData data = validWireData.get(count);
                SchematicRenderedWiredData schematicRenderedWiredData = new SchematicRenderedWiredData();
                String[] pathArr = mxGraphHtml.split("\"");
                StringBuffer recreatePathBuffer = new StringBuffer(StringUtils.EMPTY);
                String updatedPath = StringUtils.EMPTY;
                if (pathArr != null && pathArr.length > 1) {
                    G06Embeddable embeddable = data.getG06ExcelData();
                    boolean isGND = false;
                    boolean isSrc = false;
                    boolean isDest = false;
                    boolean isSrcSplice = false;
                    boolean isDestSplice = false;
                    if(embeddable.getSrcCavity().equalsIgnoreCase("SPLICE")){
                        isSrcSplice =true;
                    }else if(embeddable.getDestCavity().equalsIgnoreCase("SPLICE")){
                        isDestSplice = true;
                    }
                    schematicRenderedWiredData.setDtnaCir(embeddable.getDtnaCir());
                    schematicRenderedWiredData.setSrcSplice(isSrcSplice);
                    schematicRenderedWiredData.setDestSplice(isDestSplice);
                        if(embeddable.getSrcCavity().equalsIgnoreCase("GND")){
                            isSrc = true;
                        }else if(embeddable.getDestCavity().equalsIgnoreCase("GND")){
                            isDest = true;
                        }

                    String sourcePort = embeddable.getSrcCavity()
                            + (StringUtils.isNotEmpty(data.getSourcePortDesignator())
                                    ? data.getSourcePortDesignator().replace("P", StringUtils.EMPTY)
                                    : StringUtils.EMPTY);

                    String destPort = embeddable.getDestCavity() + (StringUtils.isNotEmpty(data.getDestPortDesignator())
                            ? data.getDestPortDesignator().replace("P", StringUtils.EMPTY) : StringUtils.EMPTY);

                    SchematicPortCordinator src = schematicPortCordinatorMap
                            .get(embeddable.getOriginDes() + sourcePort);
                    if (src == null) {
                        if(sourcePort.contains("'")){
                          sourcePort =  sourcePort.replace("'",StringUtils.EMPTY);
                            src = schematicPortCordinatorMap
                                    .get(embeddable.getOriginDes() + sourcePort);
                        }else if(!sourcePort.contains("'")){
                            sourcePort =sourcePort + "'";
                            src = schematicPortCordinatorMap
                                    .get(embeddable.getOriginDes() + sourcePort);
                        }
                    }
                    SchematicPortCordinator dest = schematicPortCordinatorMap.get(embeddable.getMatingDes() + destPort);
                    if (dest == null) {
                        if(destPort.contains("'")){
                          destPort =  destPort.replace("'",StringUtils.EMPTY);
                            dest = schematicPortCordinatorMap.get(embeddable.getMatingDes() + destPort);
                        }else if(!destPort.contains("'")){
                            destPort =destPort + "'";
                            dest = schematicPortCordinatorMap.get(embeddable.getMatingDes() + destPort);
                        }
                    }

                    String[] value = pathArr[1].split(" ");
                    if (ObjectUtils.isNotEmpty(value) && value.length > 1 && ObjectUtils.isNotEmpty(src)
                            && ObjectUtils.isNotEmpty(dest)
                            && StringUtils.equalsIgnoreCase(embeddable.getOriginDes(), src.getConnectorName())
                            && StringUtils.equalsIgnoreCase(embeddable.getMatingDes(), dest.getConnectorName())) {

                        double xSrc = src.getX();
                        double xDest = dest.getX();
                        double ySrc = src.getY();
                        double yDest = dest.getY();

                        if (yDest == ySrc && Math.abs(xSrc - xDest) <= 5) {
                            log.error("Invalid coordinates generated by UI");
                        } else {
                            RenderModel sourceRModel = renderMap.get(embeddable.getOriginDes());
                            RenderModel destRModel = renderMap.get(embeddable.getMatingDes());
                            if(isSrcSplice){
                                schematicRenderedWiredData.setPosX(sourceRModel.getStartX());
                                schematicRenderedWiredData.setPosY(sourceRModel.getStartY());
                            }else if(isDestSplice){
                                schematicRenderedWiredData.setPosX(destRModel.getStartX());
                                schematicRenderedWiredData.setPosY(destRModel.getStartY());
                            }
                            if (!StringUtils.equalsIgnoreCase(embeddable.getOriginDes(), embeddable.getMatingDes())
                                    && ObjectUtils.isNotEmpty(sourceRModel) && ObjectUtils.isNotEmpty(destRModel)) {
                                int wireConnectionType = data.getConnectionType();
                                if (wireConnectionType == 2) {
                                    updatedPath = connectionUtils.createTwoPointerPath(xSrc, ySrc, xDest, yDest,
                                            horizontalList);
                                } else if (wireConnectionType == 4) {
                                    Segment segment = new Segment(xSrc, ySrc, xDest, yDest);
                                    int delta = src.getDelta();
                                    updatedPath = connectionUtils.createFourPointerRuleSegment(segment, horizontalList,
                                            verticalList, columnCoordinatesMap, data.getSourcePortDesignator(),
                                            sourceRModel.getColumnInd(),delta,isSrc,isDest);

                                }  else if(wireConnectionType == 6
                                && sourceRModel.getDefaultPortDesignator().equalsIgnoreCase(destRModel.getDefaultPortDesignator())){
                                    Segment segment = new Segment(xDest, yDest, xSrc, ySrc);
                                    SchematicSourceRenderData tempPassData = new SchematicSourceRenderData(destRModel,
                                            sourceRModel, segment, data.getDestPortDesignator(),
                                            data.getSourcePortDesignator());
                                    updatedPath = connectionUtils.createSixPointerRuleSegment(tempPassData,
                                            verticalList, horizontalList, renderModelList, columnCoordinatesMap,
                                            valueHashMap, maximum.getMaxCol(), maxEndX);
                                }else if (wireConnectionType == 6 && sourceRModel.getRowInd() < destRModel.getRowInd()
                                        && sourceRModel.getColumnInd() < destRModel.getColumnInd()) {
                                    Segment segment = new Segment(xSrc, ySrc, xDest, yDest);
                                    SchematicSourceRenderData tempPassData = new SchematicSourceRenderData(sourceRModel,
                                            destRModel, segment, data.getSourcePortDesignator(),
                                            data.getDestPortDesignator());
                                    updatedPath = connectionUtils.createSixPointerRuleSegment(tempPassData,
                                            verticalList, horizontalList, renderModelList, columnCoordinatesMap,
                                            valueHashMap, maximum.getMaxCol(), maxEndX);
                                } else if (wireConnectionType == 6 && sourceRModel.getRowInd() <= destRModel.getRowInd()
                                        && sourceRModel.getColumnInd() > destRModel.getColumnInd()) {
                                    Segment segment = new Segment(xSrc, ySrc, xDest, yDest);
                                    SchematicSourceRenderData tempPassData = new SchematicSourceRenderData(sourceRModel,
                                            destRModel, segment, data.getSourcePortDesignator(),
                                            data.getDestPortDesignator());
                                    updatedPath = connectionUtils.createSixPointerRuleSegment(tempPassData,
                                            verticalList, horizontalList, renderModelList, columnCoordinatesMap,
                                            valueHashMap, maximum.getMaxCol(), maxEndX);

                                } else if (wireConnectionType == 6 && sourceRModel.getRowInd() == destRModel.getRowInd()
                                        && sourceRModel.getColumnInd() - destRModel.getColumnInd() > 1) {
                                    //Addded as part of single connector logic
                                    Segment segment = new Segment(xSrc, ySrc, xDest, yDest);
                                    SchematicSourceRenderData tempPassData = new SchematicSourceRenderData(sourceRModel,
                                            destRModel, segment, data.getSourcePortDesignator(),
                                            data.getDestPortDesignator());
                                    updatedPath = connectionUtils.createSixPointerRuleSegment(tempPassData,
                                            verticalList, horizontalList, renderModelList, columnCoordinatesMap,
                                            valueHashMap, maximum.getMaxCol(), maxEndX);
                                } else if (wireConnectionType == 6 && sourceRModel.getRowInd() > destRModel.getRowInd()
                                        && sourceRModel.getColumnInd() < destRModel.getColumnInd()) {
                                    Segment segment = new Segment(xDest, yDest, xSrc, ySrc);
                                    SchematicSourceRenderData tempPassData = new SchematicSourceRenderData(destRModel,
                                            sourceRModel, segment, data.getDestPortDesignator(),
                                            data.getSourcePortDesignator());
                                    updatedPath = connectionUtils.createSixPointerRuleSegment(tempPassData,
                                            verticalList, horizontalList, renderModelList, columnCoordinatesMap,
                                            valueHashMap, maximum.getMaxCol(), maxEndX);
                                } else if (wireConnectionType == 6 && sourceRModel.getRowInd() > destRModel.getRowInd()
                                        && sourceRModel.getColumnInd() > destRModel.getColumnInd()) {
                                    Segment segment = new Segment(xDest, yDest, xSrc, ySrc);
                                    SchematicSourceRenderData tempPassData = new SchematicSourceRenderData(destRModel,
                                            sourceRModel, segment, data.getDestPortDesignator(),
                                            data.getSourcePortDesignator());
                                    updatedPath = connectionUtils.createSixPointerRuleSegment(tempPassData,
                                            verticalList, horizontalList, renderModelList, columnCoordinatesMap,
                                            valueHashMap, maximum.getMaxCol(), maxEndX);
                                }else if (wireConnectionType == 6 && sourceRModel.getColumnInd() == destRModel.getColumnInd()) {
                                  //  Segment segment = new Segment(xSrc, ySrc, xDest, yDest);
                                    Segment segment = new Segment(xDest, yDest, xSrc, ySrc);
                                    SchematicSourceRenderData tempPassData = new SchematicSourceRenderData(destRModel,
                                            sourceRModel, segment, data.getDestPortDesignator(),
                                            data.getSourcePortDesignator());
                                    updatedPath = connectionUtils.createSixPointerRuleSegment(tempPassData,
                                            verticalList, horizontalList, renderModelList, columnCoordinatesMap,
                                            valueHashMap, maximum.getMaxCol(), maxEndX);
                                }

                            }
                        }
                    }
                }
                count++;
                recreatePathBuffer.append(pathArr[0]).append("\"").append(updatedPath).append("\"");
                for (int k = 2; k < pathArr.length; k++)
                    recreatePathBuffer.append(pathArr[k]).append('"');
                updatedHtmlList.add(recreatePathBuffer.toString());
                schematicRenderedWiredData.setWireData(recreatePathBuffer.toString());
                schematicRenderedWiredDataList.add(schematicRenderedWiredData);
            }
        }

        // clean up
        maxRepository.deleteByCommodityName(commodityName);
        renderService.deleteByCommodityName(commodityName);
        schematicGo6RenderRepository.deleteByCommodityName(commodityName);
        return schematicRenderedWiredDataList;
    }

}

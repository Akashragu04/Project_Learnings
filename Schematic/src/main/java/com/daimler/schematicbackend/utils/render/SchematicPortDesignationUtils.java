package com.daimler.schematicbackend.utils.render;

import com.daimler.schematicbackend.entity.file.DatabaseFileData;
import com.daimler.schematicbackend.entity.render.G06RenderData;
import com.daimler.schematicbackend.entity.render.RenderModel;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
@Slf4j
public class SchematicPortDesignationUtils {

    public List<G06RenderData> executeConnectorAndWireRules(List<RenderModel> renderModelList,
            List<G06RenderData> g06RenderDataList, Map<String, DatabaseFileData> metadataMap) {
        int twoPointCount = 0;
        int fourPointCount = 0;
        int sixPointCount = 0;

        List<G06RenderData> returnList = new ArrayList<>();
        Map<String, RenderModel> schematicRenderModelMap = renderModelList.stream()
                .collect(Collectors.toMap(RenderModel::getConnectorName, Function.identity()));
        for (G06RenderData go6RenderData : g06RenderDataList) {
            String sourceName = go6RenderData.getG06ExcelData().getOriginDes();
            String destName = go6RenderData.getG06ExcelData().getMatingDes();
            RenderModel sourceRenderModel = schematicRenderModelMap.get(sourceName);
            RenderModel destRenderModel = schematicRenderModelMap.get(destName);
            boolean srcSplice = false;
            boolean destSplice = false;
            if(metadataMap.get(sourceName)!= null && metadataMap.get(destName)!= null) {
                if (metadataMap.get(sourceName).getImageName()!=null &&
                        metadataMap.get(sourceName).getImageName().contains("GND") ||
                        "SPLICE".equalsIgnoreCase(metadataMap.get(sourceName).getConnectorType())) {
                    srcSplice = true;
                }
                if (metadataMap.get(destName).getImageName()!=null &&
                        metadataMap.get(destName).getImageName().contains("GND") ||
                        "SPLICE".equalsIgnoreCase(metadataMap.get(destName).getConnectorType())) {
                    destSplice = true;
                }
            }
            if (ObjectUtils.isNotEmpty(sourceRenderModel) && ObjectUtils.isNotEmpty(destRenderModel)) {
                        runFourWireRule(sourceRenderModel, destRenderModel, go6RenderData,srcSplice,destSplice);
                        if (StringUtils.isEmpty(go6RenderData.getSourcePortDesignator())
                                || StringUtils.isEmpty(go6RenderData.getDestPortDesignator())) {
                            sixPointCount++;
                                if(Math.abs(sourceRenderModel.getColumnInd()-destRenderModel.getColumnInd())==0){
                                    go6RenderData.setSourcePortDesignator(sourceRenderModel.getDefaultPortDesignator());
                                    go6RenderData.setDestPortDesignator(destRenderModel.getDefaultPortDesignator());
                                }else if( sourceRenderModel.getDefaultPortDesignator()!=null
                                        && destRenderModel.getDefaultPortDesignator()!=null
                                        && sourceRenderModel.getDefaultPortDesignator().
                                        equalsIgnoreCase(destRenderModel.getDefaultPortDesignator())) {
                                    go6RenderData.setSourcePortDesignator(sourceRenderModel.getDefaultPortDesignator());
                                    go6RenderData.setDestPortDesignator(sourceRenderModel.getDefaultPortDesignator());
                                }else {
                                        if (sourceRenderModel.getStartX() > destRenderModel.getEndX()) {
                                            go6RenderData.setSourcePortDesignator("P'");
                                            go6RenderData.setDestPortDesignator("P");
                                        } else if (sourceRenderModel.getEndX() < destRenderModel.getStartX()) {
                                            go6RenderData.setSourcePortDesignator("P");
                                            go6RenderData.setDestPortDesignator("P'");
                                        }
                                }

                            go6RenderData.setConnectionType(6);
                        } else {
                            go6RenderData.setConnectionType(4);
                            fourPointCount++;
                        }
  
            }
            // log.debug("G06RenderData:{}", go6RenderData);
            returnList.add(go6RenderData);
        }
        // log.info("Two Point Connections:{}, Four Point Connections:{}, Six Point Connection:{}", twoPointCount,
        // fourPointCount, sixPointCount);
        return returnList;
    }

    private void runFourWireRule(RenderModel sourceRenderModel, RenderModel destRenderModel,
            G06RenderData go6RenderData, boolean srcSplice, boolean destSplice) {

        long sourceRowIndex = sourceRenderModel.getRowInd();
        long sourceColIndex = sourceRenderModel.getColumnInd();
        long destRowIndex = destRenderModel.getRowInd();
        long destColIndex = destRenderModel.getColumnInd();
        boolean isSrcMated = sourceRenderModel.isMated();
        boolean isDestMated = destRenderModel.isMated();

        if (!isSrcMated && !isDestMated && (sourceRowIndex - destRowIndex != 0)) {
            if (Math.abs(sourceColIndex - destColIndex) == 1) {
                if (sourceRenderModel.getEndX() < destRenderModel.getStartX()) {
                    go6RenderData.setSourcePortDesignator("P'");
                    go6RenderData.setDestPortDesignator("P");
                } else if (sourceRenderModel.getStartX() > destRenderModel.getEndX()) {
                    go6RenderData.setSourcePortDesignator("P");
                    go6RenderData.setDestPortDesignator("P'");
                }
            } else if (Math.abs(sourceColIndex - destColIndex) == 0) {
                if (sourceRenderModel.getEndX() < destRenderModel.getStartX()) {
                    go6RenderData.setSourcePortDesignator("P'");
                    go6RenderData.setDestPortDesignator("P'");
                }else{
                    go6RenderData.setSourcePortDesignator("P");
                    go6RenderData.setDestPortDesignator("P");
                }
            }
        }


        if(srcSplice || destSplice){
            if (sourceRenderModel.getEndX() < destRenderModel.getStartX()) {
                go6RenderData.setSourcePortDesignator("P'");
                go6RenderData.setDestPortDesignator("P");
            } else if (sourceRenderModel.getStartX() > destRenderModel.getEndX()) {
                go6RenderData.setSourcePortDesignator("P");
                go6RenderData.setDestPortDesignator("P'");
            }



        }
      else if ((isSrcMated || isDestMated) ) {

            if (isDestMated) {
                String tempSrcName = go6RenderData.getG06ExcelData().getOriginDes();
                String tempSrcPort = go6RenderData.getG06ExcelData().getSrcCavity();
                go6RenderData.getG06ExcelData().setSrcCavity(go6RenderData.getG06ExcelData().getDestCavity());
                go6RenderData.getG06ExcelData().setOriginDes(go6RenderData.getG06ExcelData().getMatingDes());
                go6RenderData.getG06ExcelData().setDestCavity(tempSrcPort);
                go6RenderData.getG06ExcelData().setMatingDes(tempSrcName);
                RenderModel temp = sourceRenderModel;
                sourceRenderModel = destRenderModel;
                destRenderModel = temp;
            }
            // else {
//                go6RenderData.setSourcePortDesignator(sourceRenderModel.getDefaultPortDesignator());
//            }

            if (Math.abs(sourceColIndex - destColIndex) == 1 && sourceColIndex>destColIndex) {

                    go6RenderData.setSourcePortDesignator("P'");
                    go6RenderData.setDestPortDesignator("P");

            } else  if ((Math.abs(sourceColIndex - destColIndex) == 1) && (sourceColIndex < destColIndex)) {

                    go6RenderData.setSourcePortDesignator("P");
                    go6RenderData.setDestPortDesignator("P'");

            }else if (Math.abs(sourceColIndex - destColIndex) == 0) {
//                if(Math.abs(sourceRowIndex - destRowIndex) == 0){
//                    go6RenderData.setSourcePortDesignator("P");
//                    go6RenderData.setDestPortDesignator("P'");
//                }else {
                if(sourceRenderModel.getDefaultPortDesignator().
                        equalsIgnoreCase(destRenderModel.getDefaultPortDesignator())) {
                    if (sourceRenderModel.isSourceConnector()) {
                        go6RenderData.setSourcePortDesignator("P");
                        go6RenderData.setDestPortDesignator("P");
                    } else {
                        go6RenderData.setSourcePortDesignator("P'");
                        go6RenderData.setDestPortDesignator("P'");
                    }
                }
//                }
            }

        }

    }

    private void runTwoWireRule(RenderModel sourceRenderModel, RenderModel destRenderModel,
            G06RenderData go6RenderData) {
        long sourceRowIndex = sourceRenderModel.getRowInd();
        long sourceColIndex = sourceRenderModel.getColumnInd();
        long destRowIndex = destRenderModel.getRowInd();
        long destColIndex = destRenderModel.getColumnInd();
        boolean isSrcMated = sourceRenderModel.isMated();
        boolean isDestMated = destRenderModel.isMated();

        if (sourceRowIndex == destRowIndex) {
            if (Math.abs(sourceColIndex - destColIndex) == 0) {

 //               if (!isSrcMated && !isDestMated) {
                    if (sourceRenderModel.getStartX() > destRenderModel.getEndX()) {
                        go6RenderData.setSourcePortDesignator("P'");
                        go6RenderData.setDestPortDesignator("P");
                    } else if (sourceRenderModel.getEndX() <=destRenderModel.getStartX()) {
                        go6RenderData.setSourcePortDesignator("P");
                        go6RenderData.setDestPortDesignator("P'");
                    }
  //              }

                if (isSrcMated && isDestMated) {
//                    String srcDefaultPort = sourceRenderModel.getDefaultPortDesignator();
//                    String destDefaultPort = destRenderModel.getDefaultPortDesignator();
                    if (sourceRenderModel.getStartX() > destRenderModel.getEndX()) {
                        go6RenderData.setSourcePortDesignator("P'");
                        go6RenderData.setDestPortDesignator("P");
                    } else if (sourceRenderModel.getEndX() < destRenderModel.getStartX()
                            && sourceRenderModel.isDestConnector() && destRenderModel.isSourceConnector()) {
                        go6RenderData.setSourcePortDesignator("P");
                        go6RenderData.setDestPortDesignator("P'");
                    }
                }

                if (isSrcMated || isDestMated) {
                    if (isDestMated) {
                        String tempSrcName = go6RenderData.getG06ExcelData().getOriginDes();
                        String tempSrcPort = go6RenderData.getG06ExcelData().getSrcCavity();
                        go6RenderData.getG06ExcelData().setSrcCavity(go6RenderData.getG06ExcelData().getDestCavity());
                        go6RenderData.getG06ExcelData().setOriginDes(go6RenderData.getG06ExcelData().getMatingDes());
                        go6RenderData.getG06ExcelData().setDestCavity(tempSrcPort);
                        go6RenderData.getG06ExcelData().setMatingDes(tempSrcName);
//                        go6RenderData.setSourcePortDesignator(destRenderModel.getDefaultPortDesignator());
//                        sourceRenderModel.setSourceConnector(destRenderModel.isSourceConnector());
//                        sourceRenderModel.setDestConnector(destRenderModel.isSourceConnector());
                        RenderModel temp = sourceRenderModel;
                        sourceRenderModel = destRenderModel;
                        destRenderModel = temp;
                    }
//                    else {
//                        go6RenderData.setSourcePortDesignator(sourceRenderModel.getDefaultPortDesignator());
//                    }
                    if (sourceRenderModel.getStartX() > destRenderModel.getEndX()) {
                        go6RenderData.setSourcePortDesignator("P'");
                        go6RenderData.setDestPortDesignator("P");
                    } else if (sourceRenderModel.getStartX() < destRenderModel.getEndX()) {
                        go6RenderData.setSourcePortDesignator("P");
                        go6RenderData.setDestPortDesignator("P'");
                    }
                }
            }
        }
    }

    private void runSixPointerRule(RenderModel sourceRenderModel, RenderModel destRenderModel,
                                   G06RenderData go6RenderData) {

        long sourceRowIndex = sourceRenderModel.getRowInd();
        long sourceColIndex = sourceRenderModel.getColumnInd();
        long destRowIndex = destRenderModel.getRowInd();
        long destColIndex = destRenderModel.getColumnInd();
        boolean isSrcMated = sourceRenderModel.isMated();
        boolean isDestMated = destRenderModel.isMated();

            if(sourceRowIndex==destRowIndex && (Math.abs(sourceColIndex-destColIndex)>1)){
                if (sourceRenderModel.getStartX() > destRenderModel.getEndX()) {
                    go6RenderData.setSourcePortDesignator("P'");
                    go6RenderData.setDestPortDesignator("P");
                } else if (sourceRenderModel.getEndX() < destRenderModel.getStartX()) {
                    go6RenderData.setSourcePortDesignator("P");
                    go6RenderData.setDestPortDesignator("P'");
                }
            }else if(Math.abs(sourceRowIndex-destRowIndex)>0 && (Math.abs(sourceColIndex-destColIndex)>1)){
                if (sourceRenderModel.getStartX() > destRenderModel.getEndX()) {
                    go6RenderData.setSourcePortDesignator("P'");
                    go6RenderData.setDestPortDesignator("P");
                } else if (sourceRenderModel.getEndX() < destRenderModel.getStartX()) {
                    go6RenderData.setSourcePortDesignator("P");
                    go6RenderData.setDestPortDesignator("P'");
                }
            }

    }

}

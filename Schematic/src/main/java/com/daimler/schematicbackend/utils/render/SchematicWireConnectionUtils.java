package com.daimler.schematicbackend.utils.render;

import com.daimler.schematicbackend.entity.render.RenderModel;
import com.daimler.schematicbackend.entity.render.Segment;
import com.daimler.schematicbackend.model.render.*;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import java.awt.geom.Line2D;
import java.util.*;
import java.util.stream.Collectors;

@Component
@Slf4j
public class SchematicWireConnectionUtils {

    public String createTwoPointerPath(double xSrc, double ySrc, double xDest, double yDest,
            List<Segment> horizontalList) {
        horizontalList.add(new Segment(xSrc, ySrc, xDest, yDest));
        return new StringBuffer().append("M").append(" ").append(xSrc).append(" ").append(ySrc).append(" ").append("L")
                .append(" ").append(xDest).append(" ").append(yDest).append(" ").toString();
    }

    public boolean detectAnyHorizontalOverlap(Line2D line1, Line2D line2) {
        return line2.intersectsLine(line1);
    }

    public boolean detectAnyVerticalHorizontalOverlap(Line2D line1, Line2D line2, Segment listSegment,
            Segment actualSegment) {

        // log.debug("Intersect Value :{}", line1.intersectsLine(line2));
        // log.debug("LSX1:{},LSX2:{},ASX1:{}, ASX2:{}", listSegment.getX1(), listSegment.getX2(),
        // actualSegment.getX1(), actualSegment.getX2());
        // log.debug("listSeg:{},actSeg:{}",listSegment.toString(),actualSegment.toString());
        // log.debug("listSegment_L:{}", listSegment.toString());
        // log.debug("actualSegment:{}", actualSegment.toString());
        return line2.intersectsLine(line1) && (listSegment.getX1() == listSegment.getX2())
                && (actualSegment.getX1() == listSegment.getX1() || actualSegment.getX2() == listSegment.getX1());
    }

    public void generateMaxEndYAndMinYMap(Map<Integer, SchematicMinMaxY> map,
            Map<Integer, SchematicColumnCoordinates> columnCoordinatesMap, List<RenderModel> renderModelList,
            int maxColumn) {

        Map<Integer, SchematicMinMaxEndStartX> tempMap = new HashMap<>();
        for (RenderModel rm : renderModelList) {
            if (map.containsKey(rm.getRowInd())) {
                SchematicMinMaxY data = map.get(rm.getRowInd());
                data.setMaxEndY(data.getMaxEndY() < rm.getEndY() ? rm.getEndY() : data.getMaxEndY());
                data.setMinStartY(data.getMinStartY() > rm.getStartY() ? rm.getStartY() : data.getMinStartY());
                map.put(rm.getRowInd(), data);
            } else {
                map.put(rm.getRowInd(), new SchematicMinMaxY(rm.getStartY(), rm.getEndY()));
            }

            if (tempMap.containsKey(rm.getColumnInd())) {
                SchematicMinMaxEndStartX data = tempMap.get(rm.getColumnInd());
                data.setMaxEndX(data.getMaxEndX() < rm.getEndX() ? rm.getEndX() : data.getMaxEndX());
                data.setMinEndX(data.getMinEndX() > rm.getEndX() ? rm.getEndX() : data.getMinEndX());
                data.setMinStartX(data.getMinStartX() > rm.getStartX() ? rm.getStartX() : data.getMinStartX());
                data.setMaxStartX(data.getMaxStartX() < rm.getStartX() ? rm.getStartX() : data.getMaxStartX());
                tempMap.put(rm.getColumnInd(), data);
            } else {
                tempMap.put(rm.getColumnInd(),
                        new SchematicMinMaxEndStartX(rm.getStartX(), rm.getStartX(), rm.getEndX(), rm.getEndX()));
            }
        }

        for (int i = 0; i <= maxColumn; i++) {
            SchematicColumnCoordinates columnCoordinates = new SchematicColumnCoordinates();
            if(tempMap.get(i)!= null ) {
                if (i != 0 && tempMap.get(i - 1)!=null) {
                    columnCoordinates.setMaxLeft(tempMap.get(i).getMinStartX() - tempMap.get(i - 1).getMaxEndX());
                }
                if (i != maxColumn && tempMap.get(i + 1)!=null) {
                    columnCoordinates.setMaxRight(tempMap.get(i + 1).getMinStartX() - tempMap.get(i).getMaxEndX());
                }
                columnCoordinates.setDeltaLeft(tempMap.get(i).getMinStartX() - tempMap.get(i).getMaxStartX());
                columnCoordinates.setDeltaRight(tempMap.get(i).getMaxEndX() - tempMap.get(i).getMinEndX());
                columnCoordinatesMap.put(i, columnCoordinates);
            }
        }

    }

    public String createFourPointerRuleSegment(Segment segment, List<Segment> horizontalList,
            List<Segment> verticalList, Map<Integer, SchematicColumnCoordinates> columnCoordinatesMap,
            String sourcePortDesignator, int column, int delta,boolean isSrc, boolean isDest) {
        String path = StringUtils.EMPTY;
        if ("P".equalsIgnoreCase(sourcePortDesignator)) {
            path = applyFourPointerRuleSegment(segment, horizontalList, verticalList, columnCoordinatesMap,-5, column
            ,isSrc,isDest);
        } else {
            path = applyFourPointerRuleSegment(segment, horizontalList, verticalList, columnCoordinatesMap, +5, column,
                    isSrc,isDest);
        }
        return path;
    }

    private String applyFourPointerRuleSegment(Segment segment, List<Segment> horizontalList,
            List<Segment> verticalList, Map<Integer, SchematicColumnCoordinates> columnCoordinatesMap, int delta,
            int column,  boolean isSrc, boolean isDest) {

        String updatedPath = StringUtils.EMPTY;
        boolean noOverlap = true;
        boolean hOverlapExists = false;
        SchematicColumnCoordinates columnCoordinates = columnCoordinatesMap.get(column);
        double initValue = delta < 0 ? columnCoordinates.getDeltaLeft() : columnCoordinates.getDeltaRight();
        int deltaCal = delta < 0 ? delta * columnCoordinates.getWireCountLeft()
                : delta * columnCoordinates.getWireCountRight();
        // log.debug("columncoordinates:{}", columnCoordinates.toString());
        // log.debug("varDelta:{}, colInd:{}, delta:{}", deltaCal, column, delta);
        List<Segment> segmentList = new ArrayList<>();
        segmentList.add(new Segment(segment.getX1(), segment.getY1(), segment.getX1() + (initValue + deltaCal),
                segment.getY1()));
        segmentList.add(new Segment(segment.getX1() + (initValue + deltaCal), segment.getY2(), segment.getX2(),
                segment.getY2()));
        for (int i = 0; i < 20; i++) {
            for (int j = 0; j < 2; j++) {
                Segment evaluateForData = segmentList.get(j);
                if (horizontalOverlap(evaluateForData, horizontalList)) {
                    deltaCal += deltaCal * -1;
                   // deltaCal +=-5;
                    noOverlap = false;
                    hOverlapExists = true;
                } else if (verticalOverlap(evaluateForData, verticalList)) {
                    if (hOverlapExists) {
                        deltaCal += deltaCal * -1;
                       // deltaCal +=5;
                    } else {
                        deltaCal += deltaCal;
                       // deltaCal +=-5;
                    }
                    noOverlap = false;
                }
//                else{
//                    noOverlap=true;
//                }
            }
            if (noOverlap) {
                break;
            } else if (delta < 0 && delta * -1 <= columnCoordinates.getDeltaLeft()) {
                noOverlap = false;
                break;
            } else if (delta > 0 && delta >= columnCoordinates.getDeltaRight()) {
                noOverlap = false;
                break;
            }
            segmentList.clear();
            segmentList.add(new Segment(segment.getX1(), segment.getY1(), segment.getX1() + (initValue + deltaCal),
                    segment.getY1()));
            segmentList.add(new Segment(segment.getX1() + (initValue + deltaCal), segment.getY2(), segment.getX2(),
                    segment.getY2()));

        }
     //   if (noOverlap) {

           StringBuffer  stringBuffer = new StringBuffer().append("M").append(" ").append(segmentList.get(0).getX1())
                    .append(" ").append(segmentList.get(0).getY1()).append(" ").append("L").append(" ")
                    .append(segmentList.get(0).getX2()).append(" ").append(segmentList.get(0).getY2()).append(" ")
                    .append("L").append(" ").append(segmentList.get(1).getX1()).append(" ")
                    .append(segmentList.get(1).getY1()).append(" ").append("L").append(" ")
                    .append(segmentList.get(1).getX2()).append(" ").append(segmentList.get(1).getY2()).append(" ");

            horizontalList.addAll(segmentList);
//            verticalList.add(new Segment(segmentList.get(0).getX2(), segmentList.get(0).getY2(),
//                    segmentList.get(1).getX1(), segmentList.get(1).getY1()));
        verticalList.addAll(segmentList);
            // log.debug("verticalSize:{}, horizontalSize:{}",verticalList.size(),horizontalList.size());
            if (delta > 0) {
                columnCoordinates.setWireCountRight(columnCoordinates.getWireCountRight() + 1);
            } else {
                columnCoordinates.setWireCountLeft(columnCoordinates.getWireCountLeft() + 1);
            }
            columnCoordinatesMap.put(column, columnCoordinates);

            if(isSrc){
                StringBuffer  newStringBuffer = new StringBuffer().append("M").append(" ").append(segmentList.get(0).getX1()-15)
                        .append(" ").append(segmentList.get(0).getY1()-15).append(" ").append("L").append(" ")
                        .append(segmentList.get(0).getX1()-15).append(" ").append(segmentList.get(1).getY1()).append(" ")
                        .append("L").append(" ").append(segmentList.get(1).getX2()).append(" ")
                        .append(segmentList.get(1).getY1()).append(" ");
                updatedPath = newStringBuffer.toString();
            } else if(isDest){
                if(segmentList.get(0).getX1() > segmentList.get(0).getX2()) {
                    StringBuffer newStringBuffer = new StringBuffer().append("M").append(" ").append(segmentList.get(0).getX1())
                            .append(" ").append(segmentList.get(0).getY1()).append(" ").append("L").append(" ")
                            .append(segmentList.get(0).getX2() + 50).append(" ").append(segmentList.get(0).getY2()).append(" ")
                            .append("L").append(" ").append(segmentList.get(1).getX1() + 50).append(" ")
                            .append(segmentList.get(1).getY1() - 15).append(" ");
                    updatedPath = newStringBuffer.toString();
                }else{
                    StringBuffer newStringBuffer = new StringBuffer().append("M").append(" ").append(segmentList.get(0).getX1())
                            .append(" ").append(segmentList.get(0).getY1()).append(" ").append("L").append(" ")
                            .append(segmentList.get(0).getX2() - 20).append(" ").append(segmentList.get(0).getY2()).append(" ")
                            .append("L").append(" ").append(segmentList.get(1).getX1() - 20).append(" ")
                            .append(segmentList.get(1).getY1() - 15).append(" ");
                    updatedPath = newStringBuffer.toString();
                }
            }
            else {
                updatedPath = stringBuffer.toString();
            }
            // log.debug("updatedPath:{}", updatedPath);
   //     }
        return updatedPath;
    }

    private boolean verticalOverlap(Segment segment, List<Segment> verticalList) {
        boolean overlap = false;
        for (Segment data : verticalList) {
            Line2D l1 = new Line2D.Double(segment.getX1(), segment.getY1(), segment.getX2(), segment.getY2());
            Line2D l2 = new Line2D.Double(data.getX1(), data.getY1(), data.getX2(), data.getY2());
            overlap = detectAnyVerticalHorizontalOverlap(l1, l2, data, segment);
            if (overlap)
                break;
        }
        return overlap;
    }

    private boolean horizontalOverlap(Segment segment, List<Segment> horizontalList) {
        boolean overlap = false;
        for (Segment data : horizontalList) {
            Line2D l1 = new Line2D.Double(segment.getX1(), segment.getY1(), segment.getX2(), segment.getY2());
            Line2D l2 = new Line2D.Double(data.getX1(), data.getY1(), data.getX2(), data.getY2());
            overlap = detectAnyHorizontalOverlap(l1, l2);
            if (overlap)
                break;
        }
        return overlap;
    }

    //
    // private String applySixPointerRuleSegment(Segment segment, List<Segment> horizontalList, List<Segment>
    // verticalList,
    // Map<Integer, SchematicColumnCoordinates> columnCoordinatesMap, int delta, int column,
    // RenderModel sourceRModel, RenderModel destRModel, List<RenderModel> renderModelList,
    // int maxRow, Map<Integer, SchematicMinMaxY> map, String destPortDesignator ) {
    // String updatedPath = StringUtils.EMPTY;
    // boolean noOverlap = true;
    // boolean hOverlapExists = false;
    // List<Segment> segmentList = new ArrayList<>();
    // SchematicColumnCoordinates columnCoordinates = columnCoordinatesMap.get(column);
    // double initValue = delta < 0 ? columnCoordinates.getDeltaLeft() : columnCoordinates.getDeltaRight();
    // int deltaCal = delta < 0 ? delta * columnCoordinates.getWireCountLeft()
    // : delta * columnCoordinates.getWireCountRight();
    //
    // if (sourceRModel.getRowInd() < destRModel.getRowInd() && sourceRModel.getColumnInd() <
    // destRModel.getColumnInd()){
    // int sourceRow = sourceRModel.getRowInd();
    // int sourceCol = sourceRModel.getColumnInd();
    // log.debug("Line 1 -- - - - Start");
    // Optional<RenderModel> startXModel = renderModelList.stream().filter(renderModel -> renderModel.getRowInd() ==
    // sourceRow && renderModel.getColumnInd() == sourceCol+1).findFirst();
    // if(startXModel.isPresent()){
    // double startX = startXModel.get().getStartX();
    // double endX = sourceRModel.getEndX();
    // Segment segment1 = new
    // Segment(segment.getX1(),segment.getY1(),segment.getX1()+(initValue+deltaCal),segment.getY1());
    // for(int i = (int)Math.ceil(endX); i < startX; i+=5){
    // if (horizontalOverlap(segment1, horizontalList)) {
    // deltaCal += deltaCal * -1;
    // noOverlap = false;
    // hOverlapExists = true;
    // } else if (verticalOverlap(segment1, verticalList)) {
    // if (hOverlapExists) {
    // deltaCal += deltaCal * -1;
    // } else {
    // deltaCal += deltaCal;
    // }
    // noOverlap = false;
    // }
    // if(noOverlap){
    // break;
    // }
    // }
    // if(noOverlap){
    // segmentList.add(segment1);
    // }
    // log.debug("Line 1 -- - - -Finish ");
    // log.debug("Line 3 -- - - -Start ");
    // initValue = delta < 0 ? columnCoordinates.getDeltaLeft() : columnCoordinates.getDeltaRight();
    // deltaCal = delta < 0 ? delta * columnCoordinates.getWireCountLeft()
    // : delta * columnCoordinates.getWireCountRight();
    // Optional<RenderModel> endXModel = renderModelList.stream().filter(renderModel -> renderModel.getRowInd() ==
    // destRModel.getRowInd()
    // && (destRModel.getColumnInd() - 1) == renderModel.getColumnInd()).findFirst();
    // if(endXModel.isPresent()){
    // RenderModel renderModel = endXModel.get();
    // Segment segment2= new Segment(segment.getX2() + (initValue + deltaCal),
    // segment.getY2(), segment.getX2(), segment.getY2());
    // int f = destPortDesignator.equalsIgnoreCase("P'")? 5:-5;
    // for (int i = (int) Math.ceil(renderModel.getStartX()); i > renderModel.getEndY(); i-=f ){
    // if (horizontalOverlap(segment1, horizontalList)) {
    // deltaCal += deltaCal * -1;
    // noOverlap = false;
    // hOverlapExists = true;
    // } else if (verticalOverlap(segment1, verticalList)) {
    // if (hOverlapExists) {
    // deltaCal += deltaCal * -1;
    // } else {
    // deltaCal += deltaCal;
    // }
    // noOverlap = false;
    // }
    // if(noOverlap){
    // break;
    // }
    // }
    // if(noOverlap){
    // segmentList.add(segment2);
    // }
    // }
    // log.debug("Line 3 finish..");
    // log.debug("Line 2 start");
    //
    //
    // double x1 = segment1.getX2();
    // double x2 = segmentList.get(1).getX1();
    // double rowD = destRModel.getRowInd();
    // double rowS = sourceRModel.getRowInd();
    //
    // for( int i = 1; i < rowD; i++){
    // Value value = sixWirePlaneMap.get(i-1+","+i);
    // for(int j = (int) Math.ceil(value.getStartY()); j < value.getEndY(); j+=5){
    // Segment S3 = new Segment(x1 ,j , x2, j);
    // if (horizontalOverlap(segment1, horizontalList)) {
    // noOverlap = false;
    // hOverlapExists = true;
    // } else if (verticalOverlap(segment1, verticalList)) {
    // if (hOverlapExists) {
    // deltaCal += deltaCal * -1;
    // } else {
    // deltaCal += deltaCal;
    // }
    // noOverlap = false;
    // }
    // if(noOverlap){
    // segmentList.add(S3);
    // break;
    // }
    // }
    // if (noOverlap){
    // break;
    // }
    // }
    // }
    // if (noOverlap && segmentList.size()==3){
    // horizontalList.addAll(segmentList);
    // updatedPath = new StringBuffer()
    // .append("M").append(" ").append(segmentList.get(0).getX1()).append(" ").append(segmentList.get(0).getY1())
    // .append(" ")
    // .append("L").append(" ").append(segmentList.get(0).getX2()).append(" ").append(segmentList.get(0).getY2())
    // .append(" ").append("L")
    // .append(" ").append(segmentList.get(2).getX1()).append(" ").append(segmentList.get(2).getY1())
    // .append(" ").append("L").append(" ") .append(segmentList.get(2).getX2()).append("
    // ").append(segmentList.get(2).getY2())
    // .append(" ")
    // .append("L").append(" ").append(segmentList.get(1).getX1()).append("
    // ").append(segmentList.get(1).getY1()).append(" ")
    // .append("L").append(" ").append(segmentList.get(1).getX2()).append("
    // ").append(segmentList.get(1).getY2()).append(" ").toString();
    // }
    // }
    // return updatedPath;
    // }

    public HashMap<String, Value> convertToWirePlaneMap(Map<Integer, SchematicMinMaxY> map) {

        HashMap<String, Value> sixWirePlaneMap = new HashMap<>();
        for (int i = 1; i <= map.size() - 1; i++) {
            String key = (i - 1) + "," + i;
            double startY = map.get(i - 1).getMaxEndY();
            double endY = map.get(i).getMinStartY();
            sixWirePlaneMap.put(key, new Value(startY, endY, 0.0));
        }
        return sixWirePlaneMap;
    }

    public String createSixPointerRuleSegment(SchematicSourceRenderData tempPassData, List<Segment> verticalList,
            List<Segment> horizontalList, List<RenderModel> renderModelList,
            Map<Integer, SchematicColumnCoordinates> columnCoordinatesMap, HashMap<String, Value> valueHashMap,
            int maxCol, double maxEndX) {

        String path = StringUtils.EMPTY;
        List<Segment> segmentList = new ArrayList<>();
        Segment segment = tempPassData.getSegment();

        RenderModel sRenderModel = tempPassData.getSrcData();
        int rowS = sRenderModel.getRowInd();
        int colS = sRenderModel.getColumnInd();
        SchematicColumnCoordinates srcColumnCord = columnCoordinatesMap.get(colS);
        double startXS = 0.0;
        double endXS = 0.0;

        RenderModel dRenderModel = tempPassData.getDestData();
        int rowD = dRenderModel.getRowInd();
        int colD = dRenderModel.getColumnInd();
        SchematicColumnCoordinates destColumnCord = columnCoordinatesMap.get(colD);
        double startXD = 0.0;
        double endXD = 0.0;

        if ("P".equalsIgnoreCase(tempPassData.getSourcePort())) {
            endXS = sRenderModel.getStartX();
            if (colS == 0) {
                startXS = 1.0;
            } else {
                startXS = renderModelList.stream()
                        .filter(elem -> elem.getColumnInd() == colS && elem.getRowInd() == rowS)
                        .max(Comparator.comparing(RenderModel::getEndX)).map(elem -> elem.getEndX()).orElse(0.0);
            }

            if (startXS >= 1.0) {
                endXS = endXS - (columnCoordinatesMap.get(colS).getWireCountLeft() * 20);
                for (double start = endXS; start < startXS; start += 5.0) {
                    Segment segment1 = new Segment(segment.getX1(), segment.getY1(), start, segment.getY1());
                    if (!horizontalOverlap(segment1, horizontalList) && !verticalOverlap(segment1, verticalList)) {
                        segmentList.add(segment1);
                        srcColumnCord.setWireCountLeft(srcColumnCord.getWireCountLeft() + 1);
                        break;
                    }
                }
            }
        } else {
            endXS = sRenderModel.getEndX();
            if (colS == maxCol) {
                startXS = maxEndX + 150;
            } else {
                startXS = renderModelList.stream()
                        .filter(elem -> elem.getColumnInd() == colS  && elem.getRowInd() == rowS)
                        .min(Comparator.comparing(RenderModel::getStartX)).map(elem -> elem.getStartX()).orElse(1.0);
            }

            if (startXS >= 1.0) {
                endXS = endXS + (columnCoordinatesMap.get(colS).getWireCountRight() * 10);
                for (double start = endXS; start > startXS; start -= 5.0) {
                    Segment segment1 = new Segment(segment.getX1(), segment.getY1(), start, segment.getY1());
                    if (!horizontalOverlap(segment1, horizontalList) && !verticalOverlap(segment1, verticalList)) {
                        segmentList.add(segment1);
                        srcColumnCord.setWireCountRight(srcColumnCord.getWireCountRight() + 1);
                        break;
                    }
                }
            }

        }

        if (segmentList.size() == 1) {
            if ("P".equalsIgnoreCase(tempPassData.getDestPort())) {
                endXD = dRenderModel.getStartX() - (columnCoordinatesMap.get(colD).getWireCountLeft() * 10);
                if (colS == 0) {
                    startXD = 1.0;
                } else {
                   List<RenderModel> newRenderModelList = renderModelList.stream()
                            .filter(elem -> elem.getColumnInd() == colD-1  && elem.getRowInd() == rowD)
                           .collect(Collectors.toList());
                    startXD = renderModelList.stream()
                            .filter(elem -> elem.getColumnInd() == colD  && elem.getRowInd() == rowD)
                            .max(Comparator.comparing(RenderModel::getEndX)).map(elem -> elem.getEndX()).orElse(1.0);
                }

                if (startXD >= 1.0) {
                    for (double start = endXD; start < startXD; start += 5.0) {
                        Segment segment2 = new Segment(start, segment.getY2(), segment.getX2(), segment.getY2());
                        if (!horizontalOverlap(segment2, horizontalList) && !verticalOverlap(segment2, verticalList)) {
                            segmentList.add(segment2);
                            destColumnCord.setWireCountLeft(destColumnCord.getWireCountLeft() + 1);
                            break;
                        }

                    }
                }
            } else {

                endXD = dRenderModel.getEndX() + (columnCoordinatesMap.get(colD).getWireCountRight() * 10);
                if(endXD>1300){
                    endXD =1250;
                }
                if (colD == maxCol) {
                   // startXD = maxEndX + 150.0;
                    if(endXD<maxEndX){
                        startXD =endXD-(maxEndX-endXD+10);
                    }else{
                        startXD = maxEndX + 150.0;
                    }
                } else {
                    startXD = renderModelList.stream()
                            .filter(elem -> elem.getColumnInd() == colD  && elem.getRowInd() == rowD)
                            .min(Comparator.comparing(RenderModel::getStartX)).map(elem -> elem.getStartX())
                            .orElse(0.0);
                }

                if (startXD >= 1.0) {
                    for (double start = endXD; start > startXD; start -= 5.0) {
                        Segment segment2 = new Segment(start, segment.getY2(), segment.getX2(), segment.getY2());
                        if (!horizontalOverlap(segment2, horizontalList) && !verticalOverlap(segment2, verticalList)) {
                            segmentList.add(segment2);
                            destColumnCord.setWireCountRight(destColumnCord.getWireCountRight() + 1);
                            break;
                        }
                    }
                }
            }
        }

        if (segmentList.size() == 2) {
            double x1 = segmentList.get(0).getX2();
            double x2 = segmentList.get(1).getX1();
            for (int i = rowS + 1; i <= rowD + 1; i++) {
                String key = i - 1 + "," + i;
                if (valueHashMap.containsKey(key)) {
                    Value value = valueHashMap.get(key);
                    double terminationValue = value.getEndY() - 2.0;
                    double startValue = value.getCurrentVal() > 0.0 ? value.getCurrentVal() + 10.0
                            : (value.getStartY() + 10.0);
                    if (startValue < terminationValue) {
                        Segment segment3 = new Segment(x1, startValue, x2, startValue);
                        segmentList.add(segment3);
                        valueHashMap.put(key, new Value(value.getStartY(), value.getEndY(), startValue));
                        break;
                    }
                }
            }
            if(segmentList.size()!=3){
                Value value = valueHashMap.get("0,1");
                Segment segment3 = new Segment(x1, value.getCurrentVal() +10.0, x2, value.getCurrentVal()+10.0);
                segmentList.add(segment3);
            }
        }

        if (segmentList.size() == 3) {
            path = new StringBuffer().append("M").append(" ").append(segmentList.get(0).getX1()).append(" ")
                    .append(segmentList.get(0).getY1()).append(" ").append("L").append(" ")
                    .append(segmentList.get(0).getX2()).append(" ").append(segmentList.get(0).getY2()).append(" ")
                    .append("L").append(" ").append(segmentList.get(2).getX1()).append(" ")
                    .append(segmentList.get(2).getY1()).append(" ").append("L").append(" ")
                    .append(segmentList.get(2).getX2()).append(" ").append(segmentList.get(2).getY2()).append(" ")
                    .append("L").append(" ").append(segmentList.get(1).getX1()).append(" ")
                    .append(segmentList.get(1).getY1()).append(" ").append("L").append(" ")
                    .append(segmentList.get(1).getX2()).append(" ").append(segmentList.get(1).getY2()).append(" ")
                    .toString();
            horizontalList.addAll(segmentList);
            verticalList.addAll(segmentList);
            columnCoordinatesMap.put(colS, srcColumnCord);
            columnCoordinatesMap.put(colD, destColumnCord);
        } else {
            // log.info("Segment:{}, Src:{},dest:{}, portS:{}, portD:{}", segment.toString(),
            // sRenderModel.getConnectorName(), dRenderModel.getConnectorName(), tempPassData.getSourcePort(),
            // tempPassData.getDestPort());
        }
        return path;
    }

    public String createSixPointerRule2Segment(SchematicSourceRenderData tempPassData, List<Segment> verticalList,
            List<Segment> horizontalList, List<RenderModel> renderModelList,
            Map<Integer, SchematicColumnCoordinates> columnCoordinatesMap, HashMap<String, Value> valueHashMap,
            int maxCol, double maxEndX) {

        String path = StringUtils.EMPTY;
        List<Segment> segmentList = new ArrayList<>();
        Segment segment = tempPassData.getSegment();

        RenderModel sRenderModel = tempPassData.getSrcData();
        int rowS = sRenderModel.getRowInd();
        int colS = sRenderModel.getColumnInd();
        SchematicColumnCoordinates srcColumnCord = columnCoordinatesMap.get(colS);
        double startXS = 20.0;
        double endXS = 20.0;

        RenderModel dRenderModel = tempPassData.getDestData();
        int rowD = dRenderModel.getRowInd();
        int colD = dRenderModel.getColumnInd();
        SchematicColumnCoordinates destColumnCord = columnCoordinatesMap.get(colD);
        double startXD = 20.0;
        double endXD = 20.0;

        if ("P".equalsIgnoreCase(tempPassData.getSourcePort())) {
            endXS = sRenderModel.getStartX();
            if (colS == 0) {
                startXS = 1.0;
            } else {
                startXS = renderModelList.stream()
                        .filter(elem -> elem.getColumnInd() == colS - 1 && elem.getRowInd() == rowS)
                        .max(Comparator.comparing(RenderModel::getEndX)).map(elem -> elem.getEndX()).orElse(0.0);
            }

            if (startXS >= 1.0) {
                endXS = endXS - (columnCoordinatesMap.get(colS).getWireCountLeft() * 20);
                for (double start = startXS; start < endXS; start += 5.0) {
                    Segment segment1 = new Segment(segment.getX1(), segment.getY1(), start, segment.getY1());
                    if (!horizontalOverlap(segment1, horizontalList) && !verticalOverlap(segment1, verticalList)) {
                        segmentList.add(segment1);
                        srcColumnCord.setWireCountLeft(srcColumnCord.getWireCountLeft() + 1);
                        break;
                    }
                }
            }
        } else {
            endXS = sRenderModel.getEndX();
            if (colS == maxCol) {
                startXS = maxEndX + 150;
            } else {
                startXS = renderModelList.stream()
                        .filter(elem -> elem.getColumnInd() == colS + 1 && elem.getRowInd() == rowS)
                        .min(Comparator.comparing(RenderModel::getStartX)).map(elem -> elem.getStartX()).orElse(0.0);
            }

            if (startXS >= 1.0) {
                endXS = endXS + (columnCoordinatesMap.get(colS).getWireCountRight() * 10);
                for (double start = startXS; start > endXS; start -= 5.0) {
                    Segment segment1 = new Segment(segment.getX1(), segment.getY1(), start, segment.getY1());
                    if (!horizontalOverlap(segment1, horizontalList) && !verticalOverlap(segment1, verticalList)) {
                        segmentList.add(segment1);
                        srcColumnCord.setWireCountRight(srcColumnCord.getWireCountRight() + 1);
                        break;
                    }
                }
            }

        }

        if (segmentList.size() == 1) {
            if ("P".equalsIgnoreCase(tempPassData.getDestPort())) {
                endXD = dRenderModel.getStartX() - (columnCoordinatesMap.get(colD).getWireCountLeft() * 10);
                if (colS == 0) {
                    startXD = 1.0;
                } else {
                    startXD = renderModelList.stream()
                            .filter(elem -> elem.getColumnInd() == colD - 1 && elem.getRowInd() == rowD)
                            .max(Comparator.comparing(RenderModel::getEndX)).map(elem -> elem.getEndX()).orElse(0.0);
                }

                if (startXD >= 1.0) {
                    for (double start = startXD; start < endXD; start += 5.0) {
                        Segment segment2 = new Segment(start, segment.getY2(), segment.getX2(), segment.getY2());
                        if (!horizontalOverlap(segment2, horizontalList) && !verticalOverlap(segment2, verticalList)) {
                            segmentList.add(segment2);
                            destColumnCord.setWireCountLeft(destColumnCord.getWireCountLeft() + 1);
                            break;
                        }
                    }
                }
            } else {

                endXD = dRenderModel.getEndX() + (columnCoordinatesMap.get(colD).getWireCountRight() * 10);

                if (colD == maxCol) {
                    startXD = maxEndX + 150.0;
                } else {
                    startXD = renderModelList.stream()
                            .filter(elem -> elem.getColumnInd() == colD + 1 && elem.getRowInd() == rowD)
                            .min(Comparator.comparing(RenderModel::getStartX)).map(elem -> elem.getStartX())
                            .orElse(0.0);
                }

                if (startXD >= 1.0) {
                    for (double start = startXD; start > endXD; start -= 5.0) {
                        Segment segment2 = new Segment(start, segment.getY2(), segment.getX2(), segment.getY2());
                        if (!horizontalOverlap(segment2, horizontalList) && !verticalOverlap(segment2, verticalList)) {
                            segmentList.add(segment2);
                            destColumnCord.setWireCountRight(destColumnCord.getWireCountRight() + 1);
                            break;
                        }
                    }
                }
            }
        }

        if (segmentList.size() == 2) {
            double x1 = segmentList.get(0).getX2();
            double x2 = segmentList.get(1).getX1();
            for (int i = rowD + 1; i < rowS + 1; i++) {
                String key = i - 1 + "," + i;
                if (valueHashMap.containsKey(key)) {
                    Value value = valueHashMap.get(key);
                    double terminationValue = value.getEndY() + 2.0;
                    double startValue = value.getCurrentVal() > 0.0 ? value.getCurrentVal() + 10.0
                            : (value.getStartY() + 10.0);
                    if (startValue < terminationValue) {
                        Segment segment3 = new Segment(x1, startValue, x2, startValue);
                        segmentList.add(segment3);
                        valueHashMap.put(key, new Value(value.getStartY(), value.getEndY(), startValue));
                        break;
                    }
                }
            }
        }

        if (segmentList.size() == 3) {
            path = new StringBuffer().append("M").append(" ").append(segmentList.get(0).getX1()).append(" ")
                    .append(segmentList.get(0).getY1()).append(" ").append("L").append(" ")
                    .append(segmentList.get(0).getX2()).append(" ").append(segmentList.get(0).getY2()).append(" ")
                    .append("L").append(" ").append(segmentList.get(2).getX1()).append(" ")
                    .append(segmentList.get(2).getY1()).append(" ").append("L").append(" ")
                    .append(segmentList.get(2).getX2()).append(" ").append(segmentList.get(2).getY2()).append(" ")
                    .append("L").append(" ").append(segmentList.get(1).getX1()).append(" ")
                    .append(segmentList.get(1).getY1()).append(" ").append("L").append(" ")
                    .append(segmentList.get(1).getX2()).append(" ").append(segmentList.get(1).getY2()).append(" ")
                    .toString();
            horizontalList.addAll(segmentList);
            verticalList.add(new Segment(segmentList.get(0).getX2(), segmentList.get(0).getY2(),
                    segmentList.get(2).getX1(), segmentList.get(2).getY1()));
            verticalList.add(new Segment(segmentList.get(1).getX1(), segmentList.get(1).getY1(),
                    segmentList.get(2).getX2(), segmentList.get(2).getY2()));
            columnCoordinatesMap.put(colS, srcColumnCord);
            columnCoordinatesMap.put(colD, destColumnCord);
        } else {
            // log.info("Segment:{}, Src:{},dest:{}, portS:{}, portD:{}", segment.toString(),
            // sRenderModel.getConnectorName(), dRenderModel.getConnectorName(), tempPassData.getSourcePort(),
            // tempPassData.getDestPort());
        }
        return path;
    }

}
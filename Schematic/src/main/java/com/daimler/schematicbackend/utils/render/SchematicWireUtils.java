package com.daimler.schematicbackend.utils.render;

import com.daimler.schematicbackend.entity.render.RenderModel;
import com.daimler.schematicbackend.entity.render.Segment;
import com.daimler.schematicbackend.model.render.SchematicWireError;
import com.daimler.schematicbackend.service.render.SchematicRenderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@Slf4j
public class SchematicWireUtils {

    // @Autowired
    // SchematicSegmentRepository repository;

    @Autowired
    SchematicRenderService service;

    public List<SchematicWireError> executeWireRuleEngine(double x1, double y1, double x2, double y2,
                                                          String commodityName, RenderModel source, RenderModel destination, String sourcePort, String destPort) {

        // List<Segment> segmentList = repository.findByCommodityName(commodityName);
        List<RenderModel> renderModelList = service.findByCommodityName(commodityName);
        List<SchematicWireError> retValue = new ArrayList<>();
        if (retValue.size() == 0) {
            // runRule2(x1, y1, x2, y2, segmentList, retValue);
            if (retValue.size() == 0) {
                boolean flag = false;
                runRule3(x1, y1, retValue, renderModelList, SchematicWireError.SOURCE_COORDINATE);
                runRule3(x2, y2, retValue, renderModelList, SchematicWireError.DEST_COORDINATE);
            }
        }
        return retValue;
    }

    private void runRule2(double x1, double y1, double x2, double y2, List<Segment> segmentList,
                          List<SchematicWireError> retValue) {
        for (int i = 0; i < segmentList.size(); i++) {
            Segment segment = segmentList.get(i);
            if (y1 == y2 && segment.getY1() == y1) {
                if ((segment.getX1() <= x2 && x1 <= segment.getX2())) {
                    retValue.add(SchematicWireError.ERROR_FOR_SAME_Y);
                    break;
                }
            }
            if (x1 == x2 && segment.getX1() == x1) {
                if ((segment.getY1() >= y2 && y1 >= segment.getY2())) {
                    retValue.add(SchematicWireError.ERROR_FOR_SAME_X);
                    break;
                }
            }
        }
    }

    private void runRule3(double x1, double y1, List<SchematicWireError> retValue, List<RenderModel> renderModelList,
                          SchematicWireError err) {
        for (int i = 0; i < renderModelList.size(); i++) {
            RenderModel renderModel = renderModelList.get(i);
            if ((x1 >= renderModel.getStartX() && x1 <= renderModel.getEndX())
                    && (y1 >= renderModel.getStartY() && y1 <= renderModel.getEndY())) {
                retValue.add(err);
                break;
            }
        }
    }

}

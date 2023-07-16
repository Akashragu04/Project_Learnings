package com.daimler.schematicbackend.service.file;

import com.daimler.schematicbackend.entity.file.SAMapping;
import com.daimler.schematicbackend.repository.file.SchematicCommodityA06Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SchematicCommodityA06Service {
    @Autowired
    SchematicCommodityA06Repository  schematicCommodityA06Repository;

    public List<SAMapping> getCommodityA06Data(String a06Name){
        List<SAMapping> DataList= schematicCommodityA06Repository.findBya06Name(a06Name);
        return DataList;
    }
}

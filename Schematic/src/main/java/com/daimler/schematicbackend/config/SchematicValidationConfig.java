package com.daimler.schematicbackend.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

/**
 * The type Schematic validation config.
 */
@Configuration
@Data
public class SchematicValidationConfig {

	@Value("#{'${excel.headers.a06}'.split(',')}")
	private List<String> a06HeaderList;

	@Value("${excel.cellcount.a06}")
	private int a06CellCount;

	@Value("#{'${excel.headers.g06}'.split(',')}")
	private List<String> g06HeaderList;

	@Value("${excel.cellcount.g06}")
	private int g06CellCount;

	@Value("#{'${excel.headers.metadata}'.split(',')}")
	private List<String> metadataHeaderList;

	@Value("${excel.cellcount.metadata}")
	private int metadataCellCount;

	@Value("#{'${excel.headers.sgmapping}'.split(',')}")
	private List<String> sgmappingHeaderList;

	@Value("${excel.cellcount.sgmapping}")
	private int sgmappingCellCount;

	@Value("${bulkUpload.path}")
	private String filepath;

}

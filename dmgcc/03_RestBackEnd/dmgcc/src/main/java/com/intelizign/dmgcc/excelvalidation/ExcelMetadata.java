package com.intelizign.dmgcc.excelvalidation;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Configuration
@Data
public class ExcelMetadata {

	@Value("#{'${excel.headers.thirdparty}'.split(',')}")
	private List<String> thirdPartyHeader;

	@Value("${excel.cellcount.thirdparty}")
	private int thirdPartyCellCount;

}

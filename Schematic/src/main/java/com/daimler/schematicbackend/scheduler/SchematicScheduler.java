/*
 *
 */
package com.daimler.schematicbackend.scheduler;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.daimler.schematicbackend.exception.file.SchematicFileException;
import com.daimler.schematicbackend.service.async.SchematicAsyncExcelService;
import com.daimler.schematicbackend.service.file.SchematicCommodityAssignedService;

/**
 * The Class SchematicScheduler.
 */
@Component
@EnableScheduling
public class SchematicScheduler {

	/**
	 * The excel service.
	 */
	@Autowired
	SchematicAsyncExcelService excelService;

	/**
	 * Execute file scheduler.
	 *
	 * @throws IOException            Signals that an I/O exception has occurred.
	 * @throws SchematicFileException the schematic file exception
	 */
	@Scheduled(fixedRateString = "${schematic.scheduler.dailyDuration}")
	public void executeFileSchedulerDaily() throws IOException, SchematicFileException {
		excelService.insertMasterData();
	}

	@Scheduled(fixedRateString = "${schematic.scheduler.kitAssemblyValidation}")
	public void validateKitAndAssembleScheduler() throws IOException, SchematicFileException {
		excelService.saveA06ValidatingMasterData();
		excelService.removeComoditiesFromSAmapping();
	}

	@Scheduled(fixedRateString = "${schematic.scheduler.excelDuration}")
	public void executeFileScheduler() throws IOException, SchematicFileException {
		excelService.markRenderability();
	}

	@Autowired
	SchematicCommodityAssignedService commodityAssignedService;

	@Scheduled(cron = "0 0/2 * * * *")
	public void scheduleTask() {
		commodityAssignedService.assignCommoditiesToUser();
	}
}

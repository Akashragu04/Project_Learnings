package com.intelizign.dmgcc.scheduler;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.intelizign.dmgcc.services.SLASchedulerServices;

@Component
@EnableScheduling
public class ProjectScheduler {

	@Autowired
	private SLASchedulerServices slaSchedulerService;

	public final Logger LOGGER = LogManager.getLogger(ProjectScheduler.class);

	// Every 12:00 AM
	@Scheduled(cron = "0 0 0 * * ?")
	public void updateActiveStatusInSLA() {

		try {
			slaSchedulerService.setSLAInvoiceStatus();
			slaSchedulerService.setProjectInvoiceStatus();
			slaSchedulerService.setProjectAStatus();

		} catch (Exception e) {
			LOGGER.error("Internal Server Error:" + e.getMessage());

		}

	}
}

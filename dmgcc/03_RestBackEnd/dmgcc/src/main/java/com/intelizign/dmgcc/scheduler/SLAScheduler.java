package com.intelizign.dmgcc.scheduler;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.intelizign.dmgcc.services.MySSCSchedulerService;

@Component
@EnableScheduling
public class SLAScheduler {
	public final Logger LOGGER = LogManager.getLogger(SLAScheduler.class);
	@Autowired
	MySSCSchedulerService mySSCSchedulerService;

	// Every 12:00 AM
	@Scheduled(cron = "0 0 0 * * ?")
	public void updatePreInvoiceDataStatus() {
		try {
			// Getting MySSC PreInvoice Approve Status
			mySSCSchedulerService.updatePreinvoiceStatus();
			LOGGER.info("SLA Preinvoice Job Done");

			// Getting MySSC Invoice Information
			mySSCSchedulerService.getInvoicesForPreinvoice();
			LOGGER.info("GET Invoice Job Done");

			// Getting MySSC Invoice Status
			mySSCSchedulerService.getInvoicesForPreinvoice();
			LOGGER.info("Invoice Update Job done");

		} catch (Exception e) {
			LOGGER.error("Internal Server Error:" + e.getMessage());

		}

	}

}

package com.intelizign.dmgcc.scheduler;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.intelizign.dmgcc.models.othermaster.SlaProvisionsArchive;
import com.intelizign.dmgcc.services.SLAProvisionSchedulerServices;

@Component
@EnableScheduling
public class SlaProvisionScheduler {

	@Autowired
	private SLAProvisionSchedulerServices slaProvisionSchedulerServices;
	

	public final Logger LOGGER = LogManager.getLogger(SlaProvisionScheduler.class);
	
	// Every year December 31 , the 4 th sunday of december 23 hours and 59 mins 
//	@Scheduled(cron = "0 59 23 31 12 ?")
	public void updatSLAProvisionsToArchieves() {

		try {
			
			slaProvisionSchedulerServices.saveSlaProvisionArchives();

		} catch (Exception e) {
			LOGGER.error("Internal Server Error:" + e.getMessage());

		}

	}
}

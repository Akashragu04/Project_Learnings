package com.intelizign.dmgcc.scheduler;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.intelizign.dmgcc.repositories.FileUploadRepository;


@Component
@EnableScheduling
public class NonMappedFileScheduler {

	@Autowired
	private FileUploadRepository fileUploadRepository;

	public final Logger LOGGER = LogManager.getLogger(NonMappedFileScheduler.class);

	// Every 12:00 AM
	@Scheduled(cron = "0 0 0 * * ?")
	public void updateActiveStatusInSLA() {

		try {
			fileUploadRepository.deleteAllByMapped(false);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error:" + e.getMessage());

		}

	}
}

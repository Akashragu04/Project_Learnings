package com.intelizign.dmgcc.controllers;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.intelizign.dmgcc.services.FilesStorageServicePath;

@RestController
@RequestMapping("/public")
public class PublicController {

	@Autowired
	FilesStorageServicePath storageServicepath;

	public final Logger LOGGER = LogManager.getLogger(PublicController.class);

	@GetMapping("/attachments")
	@ResponseBody
	public ResponseEntity<Resource> getFile(@RequestParam String filename) {
		try {

			Resource file = storageServicepath.load(filename);
			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
					.body(file);
		} catch (Exception e) {
			LOGGER.error("File doesn't exist Error: " + e.getMessage());
			return ResponseEntity.notFound().build();
		}

	}

}

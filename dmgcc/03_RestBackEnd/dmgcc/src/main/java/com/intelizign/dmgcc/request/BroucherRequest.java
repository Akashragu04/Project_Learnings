package com.intelizign.dmgcc.request;

import org.springframework.web.multipart.MultipartFile;

public class BroucherRequest {

	private long id;
	
	private SupportingFiles supporting_file;	
	
	private String title;

	private String description;
	
	private SupportingFiles brochureFile;
	
	private Boolean is_approved;
	
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	
	

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public BroucherRequest() {
		
	}

	public SupportingFiles getBrochureFile() {
		return brochureFile;
	}

	public void setBrochureFile(SupportingFiles brochureFile) {
		this.brochureFile = brochureFile;
	}

	public Boolean getIs_approved() {
		return is_approved;
	}

	public void setIs_approved(Boolean is_approved) {
		this.is_approved = is_approved;
	}

	public SupportingFiles getSupporting_file() {
		return supporting_file;
	}

	public void setSupporting_file(SupportingFiles supporting_files) {
		this.supporting_file = supporting_files;
	}

	
	
	
}

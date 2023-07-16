package com.intelizign.dmgcc.request.landingpage;

import com.intelizign.dmgcc.request.SupportingFiles;

public class ContentNewsLetterRequest {

	private long id;

	private SupportingFiles coverImage;
	
	private String title;

	private String description;
	
	private String newsletter;
	
	private SupportingFiles newsletter_file;
	
	private Boolean is_approved;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	
	public SupportingFiles getCoverImage() {
		return coverImage;
	}

	public void setCoverImage(SupportingFiles coverImage) {
		this.coverImage = coverImage;
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

	public String getNewsletter() {
		return newsletter;
	}

	public void setNewsletter(String newsletter) {
		this.newsletter = newsletter;
	}

	public SupportingFiles getNewsletter_file() {
		return newsletter_file;
	}

	public void setNewsletter_file(SupportingFiles newsletter_file) {
		this.newsletter_file = newsletter_file;
	}

	public Boolean getIs_approved() {
		return is_approved;
	}

	public void setIs_approved(Boolean is_approved) {
		this.is_approved = is_approved;
	}
	
	
	
}

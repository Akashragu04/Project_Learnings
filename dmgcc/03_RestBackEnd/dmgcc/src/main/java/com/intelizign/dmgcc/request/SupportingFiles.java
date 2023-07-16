package com.intelizign.dmgcc.request;

import java.io.Serializable;

public class SupportingFiles implements Serializable {

	private Long id;

	private String supporting_files_name;

	private String supporting_files_url;
	
	private String supporting_file_view_url;

	private Boolean mapped;

	public SupportingFiles() {
		super();
	}

	public String getSupporting_files_name() {
		return supporting_files_name;
	}

	public void setSupporting_files_name(String supporting_files_name) {
		this.supporting_files_name = supporting_files_name;
	}

	public String getSupporting_files_url() {
		return supporting_files_url;
	}

	public void setSupporting_files_url(String supporting_files_url) {
		this.supporting_files_url = supporting_files_url;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Boolean getMapped() {
		return mapped;
	}

	public void setMapped(Boolean mapped) {
		this.mapped = mapped;
	}

	public String getSupporting_file_view_url() {
		return supporting_file_view_url;
	}

	public void setSupporting_file_view_url(String supporting_file_view_url) {
		this.supporting_file_view_url = supporting_file_view_url;
	}

	
}

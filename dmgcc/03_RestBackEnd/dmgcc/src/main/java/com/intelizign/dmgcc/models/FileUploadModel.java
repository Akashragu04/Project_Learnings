package com.intelizign.dmgcc.models;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "file_upload")
public class FileUploadModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, updatable = false)
	private long id;

	@Column(name = "supporting_files_name")
	private String supporting_files_name;

	@Column(name = "supporting_files_url")
	private String supporting_files_url;
	
	@Column(name = "supporting_files_view_url")
	private String supporting_file_view_url;
	    
	@Column(name = "mapped")
	private Boolean mapped;
	
	@Column(name = "upload_by")
	private String upload_by;

	@Column(name = "upload_on")
	private LocalDateTime upload_on;
	
	public FileUploadModel() {
		super();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
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

	public Boolean getMapped() {
		return mapped;
	}

	public void setMapped(Boolean mapped) {
		this.mapped = mapped;
	}

	public String getUpload_by() {
		return upload_by;
	}

	public void setUpload_by(String upload_by) {
		this.upload_by = upload_by;
	}

	public LocalDateTime getUpload_on() {
		return upload_on;
	}

	public void setUpload_on(LocalDateTime upload_on) {
		this.upload_on = upload_on;
	}

	public String getSupporting_file_view_url() {
		return supporting_file_view_url;
	}

	public void setSupporting_file_view_url(String supporting_file_view_url) {
		this.supporting_file_view_url = supporting_file_view_url;
	}

	
	
}

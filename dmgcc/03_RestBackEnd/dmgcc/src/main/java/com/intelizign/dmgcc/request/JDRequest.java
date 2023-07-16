package com.intelizign.dmgcc.request;


import org.springframework.web.multipart.MultipartFile;

public class JDRequest {

	private long id;
	
	private String jd_code;
	
	private String jd_role;
	
	private String jd_description;
	
	private String upload_action;
	
	private Boolean isuploaded;
	
	private String position_code;

	private MultipartFile[] supporting_files;
	
	public JDRequest() {
	
	}
	
	public String getUpload_action() {
		return upload_action;
	}

	public void setUpload_action(String upload_action) {
		this.upload_action = upload_action;
	}

	public Boolean getIsuploaded() {
		return isuploaded;
	}

	public void setIsuploaded(Boolean isuploaded) {
		this.isuploaded = isuploaded;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getJd_code() {
		return jd_code;
	}

	public void setJd_code(String jd_code) {
		this.jd_code = jd_code;
	}

	public String getJd_role() {
		return jd_role;
	}

	public void setJd_role(String jd_role) {
		this.jd_role = jd_role;
	}

	public String getJd_description() {
		return jd_description;
	}

	public void setJd_description(String jd_description) {
		this.jd_description = jd_description;
	}

	public String getPosition_code() {
		return position_code;
	}

	public void setPosition_code(String position_code) {
		this.position_code = position_code;
	}

	public MultipartFile[] getSupporting_files() {
		return supporting_files;
	}

	public void setSupporting_files(MultipartFile[] supporting_files) {
		this.supporting_files = supporting_files;
	}
	

}

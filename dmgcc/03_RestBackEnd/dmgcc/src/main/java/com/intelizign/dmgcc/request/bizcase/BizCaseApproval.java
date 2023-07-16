package com.intelizign.dmgcc.request.bizcase;

import org.springframework.web.multipart.MultipartFile;

public class BizCaseApproval {

	private long id;
	
	private long biz_case_id;
	
	private String approver_description;
	
	private MultipartFile[] supporting_files;
	
	

	public long getBiz_case_id() {
		return biz_case_id;
	}

	public void setBiz_case_id(long biz_case_id) {
		this.biz_case_id = biz_case_id;
	}


	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}


	public String getApprover_description() {
		return approver_description;
	}

	public void setApprover_description(String approver_description) {
		this.approver_description = approver_description;
	}

	public MultipartFile[] getSupporting_files() {
		return supporting_files;
	}

	public void setSupporting_files(MultipartFile[] supporting_files) {
		this.supporting_files = supporting_files;
	}

	
	
}

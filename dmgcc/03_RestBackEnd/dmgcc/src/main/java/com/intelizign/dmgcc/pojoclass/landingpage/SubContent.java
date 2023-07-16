package com.intelizign.dmgcc.pojoclass.landingpage;

import java.io.Serializable;

import com.intelizign.dmgcc.request.SupportingFiles;

public class SubContent implements Serializable{

	private Long id;

	private String content;

	private SupportingFiles supporting_file;

	private String title;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public SupportingFiles getSupporting_file() {
		return supporting_file;
	}

	public void setSupporting_file(SupportingFiles supporting_file) {
		this.supporting_file = supporting_file;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
	
	

}

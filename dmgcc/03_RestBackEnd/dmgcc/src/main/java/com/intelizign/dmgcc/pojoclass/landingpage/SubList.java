package com.intelizign.dmgcc.pojoclass.landingpage;

import java.io.Serializable;

public class SubList implements Serializable{

	private Long id;

	private String content;

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
	
	
}

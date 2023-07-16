package com.intelizign.dmgcc.request.landingpage;

import java.io.Serializable;
import java.util.List;

import com.intelizign.dmgcc.models.landingpage.SubListModel;

public class CostProductionRequest implements Serializable{

	private long id;
	
    private String description;
	
	private String title;
	
	private List<SubListModel> sub_list;

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public List<SubListModel> getSub_list() {
		return sub_list;
	}

	public void setSub_list(List<SubListModel> sub_list) {
		this.sub_list = sub_list;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	
	
}


package com.intelizign.dmgcc.request.landingpage;

import java.io.Serializable;
import java.util.List;

import com.intelizign.dmgcc.models.landingpage.AboutUsSubContentModel;
import com.intelizign.dmgcc.models.landingpage.AboutUsSubListModel;
import com.intelizign.dmgcc.models.landingpage.SubListModel;
import com.intelizign.dmgcc.pojoclass.landingpage.SubList;
import com.intelizign.dmgcc.request.SupportingFiles;

public class AboutHrRequest{

     private long id;
	
	private String description;

	private String title;

	private SupportingFiles supporting_file;

	private List<AboutUsSubContentModel> sub_content;

	private List<AboutUsSubListModel> sub_list;

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

	public SupportingFiles getSupporting_file() {
		return supporting_file;
	}

	public void setSupporting_file(SupportingFiles supporting_file) {
		this.supporting_file = supporting_file;
	}

	


	public List<AboutUsSubContentModel> getSub_content() {
		return sub_content;
	}

	public void setSub_content(List<AboutUsSubContentModel> sub_content) {
		this.sub_content = sub_content;
	}

	public List<AboutUsSubListModel> getSub_list() {
		return sub_list;
	}

	public void setSub_list(List<AboutUsSubListModel> sub_list) {
		this.sub_list = sub_list;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	
	
}

package com.intelizign.dmgcc.request.landingpage;

import com.intelizign.dmgcc.models.landingpage.AboutUsSubListModel;
import com.intelizign.dmgcc.models.landingpage.SubListModel;
import com.intelizign.dmgcc.request.SupportingFiles;
import java.util.List;

public class BroucherRequest {

    private long id;
	
	private SupportingFiles supporting_file;
	
	private String title;

	private String description;
	
	private List<SubListModel> sub_list;
	
	
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public BroucherRequest() {
		super();
		
	}

	public List<SubListModel> getSub_list() {
		return sub_list;
	}

	public void setSub_list(List<SubListModel> sub_list) {
		this.sub_list = sub_list;
	}



	


}

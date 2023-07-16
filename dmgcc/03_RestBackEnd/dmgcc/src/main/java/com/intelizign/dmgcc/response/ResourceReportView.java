package com.intelizign.dmgcc.response;

import java.util.List;

import com.intelizign.dmgcc.pojoclass.ResourceBaseCapacity;

public class ResourceReportView {

	private String reportview;

	private List<ResouceProjectViewResponce> projectview;

	private List<ResourceSLAViewResponse> slaview;

	private List<ResourceBaseCapacity> resourceview;

	private List<ResourceBasedViewResponse> availableresource;

	public List<ResouceProjectViewResponce> getProjectview() {
		return projectview;
	}

	public void setProjectview(List<ResouceProjectViewResponce> projectview) {
		this.projectview = projectview;
	}

	public List<ResourceSLAViewResponse> getSlaview() {
		return slaview;
	}

	public void setSlaview(List<ResourceSLAViewResponse> slaview) {
		this.slaview = slaview;
	}

	public List<ResourceBasedViewResponse> getAvailableresource() {
		return availableresource;
	}

	public void setAvailableresource(List<ResourceBasedViewResponse> availableresource) {
		this.availableresource = availableresource;
	}

	public String getReportview() {
		return reportview;
	}

	public void setReportview(String reportview) {
		this.reportview = reportview;
	}

	public ResourceReportView() {
		super();
	}

	public List<ResourceBaseCapacity> getResourceview() {
		return resourceview;
	}

	public void setResourceview(List<ResourceBaseCapacity> resourceview) {
		this.resourceview = resourceview;
	}

}

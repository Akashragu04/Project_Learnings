package com.intelizign.dmgcc.response;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.intelizign.dmgcc.models.G3CEmployeeMasterModel;
import com.intelizign.dmgcc.models.ResourceAllocationModel;
import com.intelizign.dmgcc.pojoclass.FTERequirement;

@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class GetResourceAllcocation implements Serializable {

	List<FTERequirement> fullFTERequirement;

	List<ResourceAllocationModel> resourceallocation;

	List<G3CEmployeeMasterModel> availableResource;

	public List<FTERequirement> getFullFTERequirement() {
		return fullFTERequirement;
	}

	public void setFullFTERequirement(List<FTERequirement> fullFTERequirement) {
		this.fullFTERequirement = fullFTERequirement;
	}

	public List<ResourceAllocationModel> getResourceallocation() {
		return resourceallocation;
	}

	public void setResourceallocation(List<ResourceAllocationModel> resourceallocation) {
		this.resourceallocation = resourceallocation;
	}

	public List<G3CEmployeeMasterModel> getAvailableResource() {
		return availableResource;
	}

	public void setAvailableResource(List<G3CEmployeeMasterModel> availableResource) {
		this.availableResource = availableResource;
	}

	public GetResourceAllcocation() {
		super();
	}

}

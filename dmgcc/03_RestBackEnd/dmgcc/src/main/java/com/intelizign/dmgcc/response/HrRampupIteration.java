package com.intelizign.dmgcc.response;

import java.util.List;

import com.intelizign.dmgcc.request.bizcase.Rampups;

public class HrRampupIteration {

	private int id;

	private String Overall_Iteration;

	private String Hr_Iteration;

	private String Hr_label;

	private List<Rampups> hr_rampups;

	public HrRampupIteration() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getOverall_Iteration() {
		return Overall_Iteration;
	}

	public void setOverall_Iteration(String overall_Iteration) {
		Overall_Iteration = overall_Iteration;
	}

	public String getHr_Iteration() {
		return Hr_Iteration;
	}

	public void setHr_Iteration(String hr_Iteration) {
		Hr_Iteration = hr_Iteration;
	}

	public List<Rampups> getHr_rampups() {
		return hr_rampups;
	}

	public void setHr_rampups(List<Rampups> hr_rampups) {
		this.hr_rampups = hr_rampups;
	}

	public String getHr_label() {
		return Hr_label;
	}

	public void setHr_label(String hr_label) {
		Hr_label = hr_label;
	}

}

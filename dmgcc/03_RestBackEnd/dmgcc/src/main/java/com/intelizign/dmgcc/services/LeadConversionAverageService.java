package com.intelizign.dmgcc.services;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.intelizign.dmgcc.models.LeadRequestModel;
import com.intelizign.dmgcc.response.LeadConversionReportWithProject.LeadConversionAverage;
import com.intelizign.dmgcc.response.LeadConversionReportWithProject.LeadData;
import com.intelizign.dmgcc.response.LeadStepOver;

@Service
public class LeadConversionAverageService {

	private static final DecimalFormat doubleFormat = new DecimalFormat("0.00");

	public List<LeadConversionAverage> leadConversionAverage(Integer total_no_data, Integer stage1, Integer stage2,
			Integer stage3, String department) {

		List<LeadConversionAverage> OverallLeadAvgData = new ArrayList<LeadConversionAverage>();
		for (int leadstages = 1; leadstages <= 3; leadstages++) {
			LeadConversionAverage leadAvgData = new LeadConversionAverage();
			if (leadstages == 1) {
				leadAvgData.setConversion_period("IL0 - IL1");
				leadAvgData.setAverage(Double.parseDouble(doubleFormat.format((double) stage1 / total_no_data)));
				leadAvgData.setDepartment(department);
				leadAvgData.setColour(getColourRange((double) stage1 / total_no_data));
				OverallLeadAvgData.add(leadAvgData);
			} else if (leadstages == 2) {
				leadAvgData.setConversion_period("IL1 - IL2");
				leadAvgData.setAverage(Double.parseDouble(doubleFormat.format((double) stage2 / total_no_data)));
				leadAvgData.setDepartment(department);
				leadAvgData.setColour(getColourRange((double) stage2 / total_no_data));
				OverallLeadAvgData.add(leadAvgData);
			} else {
				leadAvgData.setConversion_period("IL2 - IL3");
				leadAvgData.setAverage(Double.parseDouble(doubleFormat.format((double) stage3 / total_no_data)));
				leadAvgData.setDepartment(department);
				leadAvgData.setColour(getColourRange((double) stage3 / total_no_data));
				OverallLeadAvgData.add(leadAvgData);
			}
		}

		return OverallLeadAvgData;

	}

	public String getColourRange(Double average) {

		if (average <= 5 && average >= 0) {
			return "rgb(0, 150, 30)";
		} else if (average <= 10 && average >= 5) {
			return "rgb(255, 205, 86)";
		} else if (average > 10) {
			return "rgb(255, 99, 132)";
		} else {
			return null;
		}

	}

	public LeadData getLeadsData(LeadRequestModel leadData) {
		LeadData newLeadData = new LeadData();
		newLeadData.setId(leadData.getId());
		newLeadData.setRequest_date(leadData.getRequest_date());
		newLeadData.setActive(leadData.getActive());
		newLeadData.setCategory_name(leadData.getCategory_name());
		newLeadData.setCategory_status(leadData.getCategory_status());
		newLeadData.setCreate_date(leadData.getCreate_date());
		newLeadData.setIsasign(leadData.getIsasign());
		newLeadData.setProject_name(leadData.getProject_name());
		newLeadData.setService_provider_contact_name(leadData.getService_provider_contact_name());
		newLeadData.setService_provider_department(leadData.getService_provider_department());
		newLeadData.setService_provider_email_id(leadData.getService_provider_email_id());
		newLeadData.setService_provider_short_id(leadData.getService_provider_short_id());
		newLeadData.setService_receiver_contact_name(leadData.getService_receiver_contact_name());
		newLeadData.setService_receiver_department(leadData.getService_receiver_department());
		newLeadData.setService_receiver_email_id(leadData.getService_receiver_email_id());
		newLeadData.setService_receiver_entity(leadData.getService_receiver_entity());
		newLeadData.setService_receiver_short_id(leadData.getService_receiver_short_id());
		newLeadData.setShort_description(leadData.getShort_description());
		return newLeadData;
	}

	public LeadStepOver stepOverStatus(String title, String status, String color) {
		LeadStepOver newStepOverStatus = new LeadStepOver();
		newStepOverStatus.setTitle(title);
		newStepOverStatus.setStatus(status);
		newStepOverStatus.setColor(color);
		return newStepOverStatus;
	}

}

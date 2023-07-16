package com.intelizign.dmgcc.dashboardresponce;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BizCaseSetupReport {

	private double overall_project_status;

	private double manpower_precentage;

	private double it_infra_precentage;

	private double facility_precentage;

	private double system_access_precentage;

	private double third_party_services_precentage;

	private double third_party_cost_precentage;

	private List<BarChartReport> plan_acutal_report;

	private Long plan_acutal_backlog;

	private List<PlanVsActualReport> mtd_plan_actual_report;

	private List<PlanVsActualReport> it_plan_actual_report;

	private List<PlanVsActualReport> facility_plan_actual_report;

	private List<PlanVsActualReport> system_access_plan_actual_report;

	private List<PlanVsActualReport> third_party_services_plan_actual_report;

	private List<PlanVsActualReport> third_party_cost_plan_actual_report;

	private RecruitmentStatus recruitment_status;

	private ProjectSetupPlanVsActual project_setup_plan_actual_report;


	@Getter
	@AllArgsConstructor
	@NoArgsConstructor
	public class RecruitmentStatus {

		private long sourcing = 0l;

		private long shortlisted = 0l;

		private long interview = 0l;

		private long offer_accepted = 0l;

		private long loi = 0l;

		private long onboard = 0l;

		public void setSourcing(long sourcing) {
			String formattedValue;
			if(sourcing % 1 == 0) {
				  // No digits after decimal
				formattedValue = String.format("%d", sourcing);
			}
			
			else {
				formattedValue = String.format("%.2d", sourcing);
			}
			this.sourcing = Long.parseLong(formattedValue);
		}

		public void setShortlisted(long shortlisted) {
			String formattedValue;
			if(shortlisted % 1 == 0) {
				  // No digits after decimal
				formattedValue = String.format("%d", shortlisted);
			}
			
			else {
				formattedValue = String.format("%.2d", shortlisted);
			}
			this.shortlisted = Long.parseLong(formattedValue);
		}

		public void setInterview(long interview) {
			String formattedValue;
			if(interview % 1 == 0) {
				  // No digits after decimal
				formattedValue = String.format("%d", interview);
			}
			
			else {
				formattedValue = String.format("%.2d", interview);
			}
			this.interview = Long.parseLong(formattedValue);
		}

		public void setOffer_accepted(long offer_accepted) {
			String formattedValue;
			if(offer_accepted % 1 == 0) {
				  // No digits after decimal
				formattedValue = String.format("%d", offer_accepted);
			}
			
			else {
				formattedValue = String.format("%.2d", offer_accepted);
			}
			this.offer_accepted = Long.parseLong(formattedValue);
		}

		public void setLoi(long loi) {
			String formattedValue;
			if(loi % 1 == 0) {
				  // No digits after decimal
				formattedValue = String.format("%d", loi);
			}
			
			else {
				formattedValue = String.format("%.2d", loi);
			}
			this.loi = Long.parseLong(formattedValue);
		}

		public void setOnboard(long onboard) {
			String formattedValue;
			if(onboard % 1 == 0) {
				  // No digits after decimal
				formattedValue = String.format("%d", onboard);
			}
			
			else {
				formattedValue = String.format("%.2d", onboard);
			}
			this.onboard = Long.parseLong(formattedValue);
		}
	}

	@Getter
	@AllArgsConstructor
	@NoArgsConstructor
	public class ProjectSetupPlanVsActual {
		
		private long estimated_days;

		private long completed_days;

		private String colour;

		public void setEstimated_days(long estimated_days) {
			String formattedValue;
			if(estimated_days % 1 == 0) {
				  // No digits after decimal
				formattedValue = String.format("%d", estimated_days);
			}
			
			else {
				formattedValue = String.format("%.2d", estimated_days);
			}
			this.estimated_days = Long.parseLong(formattedValue);
		}

		public void setCompleted_days(long completed_days) {
			String formattedValue;
			if(completed_days % 1 == 0) {
				  // No digits after decimal
				formattedValue = String.format("%d", completed_days);
			}
			
			else {
				formattedValue = String.format("%.2d", completed_days);
			}
			this.completed_days = Long.parseLong(formattedValue);
		}

		public void setColour(String colour) {
			this.colour = colour;
		}
	}

	public void setOverall_project_status(double overall_project_status) {
		
		String formattedValue;
		if(overall_project_status % 1 == 0) {
			  // No digits after decimal
			formattedValue = String.format("%f", overall_project_status);
		}
		
		else {
			formattedValue = String.format("%.2f", overall_project_status);
		}
		this.overall_project_status = Double.parseDouble(formattedValue);

	}

	public void setManpower_precentage(double manpower_precentage) {
		String formattedValue;
		if(manpower_precentage % 1 == 0) {
			  // No digits after decimal
			formattedValue = String.format("%f", manpower_precentage);
		}
		
		else {
			formattedValue = String.format("%.2f", manpower_precentage);
		}
		this.manpower_precentage = Double.parseDouble(formattedValue);

	}

	public void setIt_infra_precentage(double it_infra_precentage) {
		String formattedValue;
		if(it_infra_precentage % 1 == 0) {
			  // No digits after decimal
			formattedValue = String.format("%f", it_infra_precentage);
		}
		
		else {
			formattedValue = String.format("%.2f", it_infra_precentage);
		}
		this.it_infra_precentage = Double.parseDouble(formattedValue);

	}

	public void setFacility_precentage(double facility_precentage) {
		String formattedValue;
		if(facility_precentage % 1 == 0) {
			  // No digits after decimal
			formattedValue = String.format("%f", facility_precentage);
		}
		
		else {
			formattedValue = String.format("%.2f", facility_precentage);
		}
		this.facility_precentage = Double.parseDouble(formattedValue);
	}

	public void setSystem_access_precentage(double system_access_precentage) {
		String formattedValue;
		if(system_access_precentage % 1 == 0) {
			  // No digits after decimal
			formattedValue = String.format("%f", system_access_precentage);
		}
		
		else {
			formattedValue = String.format("%.2f", system_access_precentage);
		}
		this.system_access_precentage = Double.parseDouble(formattedValue);
	}

	public void setThird_party_services_precentage(double third_party_services_precentage) {
		String formattedValue;
		if(third_party_services_precentage % 1 == 0) {
			  // No digits after decimal
			formattedValue = String.format("%f", third_party_services_precentage);
		}
		
		else {
			formattedValue = String.format("%.2f", third_party_services_precentage);
		}
		this.third_party_services_precentage = Double.parseDouble(formattedValue);
	}

	public void setThird_party_cost_precentage(double third_party_cost_precentage) {
		String formattedValue;
		if(third_party_cost_precentage % 1 == 0) {
			  // No digits after decimal
			formattedValue = String.format("%f", third_party_cost_precentage);
		}
		
		else {
			formattedValue = String.format("%.2f", third_party_cost_precentage);
		}
		this.third_party_cost_precentage = Double.parseDouble(formattedValue);
	}

	public void setPlan_acutal_report(List<BarChartReport> plan_acutal_report) {
		this.plan_acutal_report = plan_acutal_report;
	}

	public void setPlan_acutal_backlog(Long plan_acutal_backlog) {
		
		if(plan_acutal_backlog != null) {
			String formattedValue;
			if(plan_acutal_backlog % 1 == 0) {
				  // No digits after decimal
				formattedValue = String.format("%d", plan_acutal_backlog);
			}
			
			else {
				formattedValue = String.format("%.2d", plan_acutal_backlog);
			}
			this.plan_acutal_backlog = Long.parseLong(formattedValue);
		}
		
		else {
			this.plan_acutal_backlog = plan_acutal_backlog ;
		}
		
	}

	public void setMtd_plan_actual_report(List<PlanVsActualReport> mtd_plan_actual_report) {
		this.mtd_plan_actual_report = mtd_plan_actual_report;
	}

	public void setIt_plan_actual_report(List<PlanVsActualReport> it_plan_actual_report) {
		this.it_plan_actual_report = it_plan_actual_report;
	}

	public void setFacility_plan_actual_report(List<PlanVsActualReport> facility_plan_actual_report) {
		this.facility_plan_actual_report = facility_plan_actual_report;
	}

	public void setSystem_access_plan_actual_report(List<PlanVsActualReport> system_access_plan_actual_report) {
		this.system_access_plan_actual_report = system_access_plan_actual_report;
	}

	public void setThird_party_services_plan_actual_report(
			List<PlanVsActualReport> third_party_services_plan_actual_report) {
		this.third_party_services_plan_actual_report = third_party_services_plan_actual_report;
	}

	public void setThird_party_cost_plan_actual_report(List<PlanVsActualReport> third_party_cost_plan_actual_report) {
		this.third_party_cost_plan_actual_report = third_party_cost_plan_actual_report;
	}

	public void setRecruitment_status(RecruitmentStatus recruitment_status) {
		this.recruitment_status = recruitment_status;
	}

	public void setProject_setup_plan_actual_report(ProjectSetupPlanVsActual project_setup_plan_actual_report) {
		this.project_setup_plan_actual_report = project_setup_plan_actual_report;
	}

}

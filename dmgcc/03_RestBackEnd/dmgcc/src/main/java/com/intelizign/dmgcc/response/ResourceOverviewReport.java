package com.intelizign.dmgcc.response;

import java.util.List;

import org.springframework.data.domain.Page;

import com.intelizign.dmgcc.pojoclass.FTERequirement;
import com.intelizign.dmgcc.pojoclass.ResourceBaseCapacity;

public class ResourceOverviewReport {

	private Integer total_positions;

	private Integer approved_positions;

	private Integer open_positions;

	private Integer with_sla;

	private Integer without_sla;

	private Double utilization;

	private List<FTERequirement> fullFTERequirement;

	private List<FTERequirement> open_positions_FTE;

	private List<Employeeinfo> total_positions_info;

	private List<Employeeinfo> approved_positions_info;

	private List<Employeeinfo> open_positions_info;

	private List<Employeeinfo> with_sla_info;

	private List<Employeeinfo> without_sla_info;

	private Page<ResourceBaseCapacity> utilization_emp_info;

	public static class Employeeinfo {

		private Long id;

		private String hr_id;

		private String employee;

		private String slaid;

		private String projectcode;

		private String projectname;

		private Integer utilization;

		private String postion;

		private String positioncode;

		private String due_date;

		private String status;

		private String remarks;

		private String employee_type;

		public Employeeinfo() {
			super();
		}

		public String getHr_id() {
			return hr_id;
		}

		public void setHr_id(String hr_id) {
			this.hr_id = hr_id;
		}

		public String getEmployee() {
			return employee;
		}

		public void setEmployee(String employee) {
			this.employee = employee;
		}

		public String getSlaid() {
			return slaid;
		}

		public void setSlaid(String slaid) {
			this.slaid = slaid;
		}

		public String getProjectcode() {
			return projectcode;
		}

		public void setProjectcode(String projectcode) {
			this.projectcode = projectcode;
		}

		public String getProjectname() {
			return projectname;
		}

		public void setProjectname(String projectname) {
			this.projectname = projectname;
		}

		public Integer getUtilization() {
			return utilization;
		}

		public void setUtilization(Integer utilization) {
			this.utilization = utilization;
		}

		public String getPostion() {
			return postion;
		}

		public void setPostion(String postion) {
			this.postion = postion;
		}

		public String getDue_date() {
			return due_date;
		}

		public void setDue_date(String due_date) {
			this.due_date = due_date;
		}

		public String getStatus() {
			return status;
		}

		public void setStatus(String status) {
			this.status = status;
		}

		public String getRemarks() {
			return remarks;
		}

		public void setRemarks(String remarks) {
			this.remarks = remarks;
		}

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getPositioncode() {
			return positioncode;
		}

		public void setPositioncode(String positioncode) {
			this.positioncode = positioncode;
		}

		public String getEmployee_type() {
			return employee_type;
		}

		public void setEmployee_type(String employee_type) {
			this.employee_type = employee_type;
		}

	}

	public List<FTERequirement> getOpen_positions_FTE() {
		return open_positions_FTE;
	}

	public void setOpen_positions_FTE(List<FTERequirement> open_positions_FTE) {
		this.open_positions_FTE = open_positions_FTE;
	}

	public List<Employeeinfo> getTotal_positions_info() {
		return total_positions_info;
	}

	public void setTotal_positions_info(List<Employeeinfo> total_positions_info) {
		this.total_positions_info = total_positions_info;
	}

	public List<Employeeinfo> getApproved_positions_info() {
		return approved_positions_info;
	}

	public void setApproved_positions_info(List<Employeeinfo> approved_positions_info) {
		this.approved_positions_info = approved_positions_info;
	}

	public List<Employeeinfo> getOpen_positions_info() {
		return open_positions_info;
	}

	public void setOpen_positions_info(List<Employeeinfo> open_positions_info) {
		this.open_positions_info = open_positions_info;
	}

	public List<Employeeinfo> getWith_sla_info() {
		return with_sla_info;
	}

	public void setWith_sla_info(List<Employeeinfo> with_sla_info) {
		this.with_sla_info = with_sla_info;
	}

	public List<Employeeinfo> getWithout_sla_info() {
		return without_sla_info;
	}

	public void setWithout_sla_info(List<Employeeinfo> without_sla_info) {
		this.without_sla_info = without_sla_info;
	}

	public Page<ResourceBaseCapacity> getUtilization_emp_info() {
		return utilization_emp_info;
	}

	public void setUtilization_emp_info(Page<ResourceBaseCapacity> utilization_emp_info) {
		this.utilization_emp_info = utilization_emp_info;
	}

	public Integer getTotal_positions() {
		return total_positions;
	}

	public void setTotal_positions(Integer total_positions) {
		this.total_positions = total_positions;
	}

	public Integer getApproved_positions() {
		return approved_positions;
	}

	public void setApproved_positions(Integer approved_positions) {
		this.approved_positions = approved_positions;
	}

	public Integer getOpen_positions() {
		return open_positions;
	}

	public void setOpen_positions(Integer open_positions) {
		this.open_positions = open_positions;
	}

	public Integer getWith_sla() {
		return with_sla;
	}

	public void setWith_sla(Integer with_sla) {
		this.with_sla = with_sla;
	}

	public Integer getWithout_sla() {
		return without_sla;
	}

	public void setWithout_sla(Integer without_sla) {
		this.without_sla = without_sla;
	}

	public Double getUtilization() {
		return utilization;
	}

	public void setUtilization(Double utilization) {

		if (utilization != null) {
			String formattedValue;
			if (utilization % 1 == 0) {
				// No digits after decimal
				formattedValue = String.format("%f", utilization);
			}

			else {
				formattedValue = String.format("%.2f", utilization);
			}
			this.utilization = Double.parseDouble(formattedValue);
		} else {
			this.utilization = utilization;
		}

	}

	public List<FTERequirement> getFullFTERequirement() {
		return fullFTERequirement;
	}

	public void setFullFTERequirement(List<FTERequirement> fullFTERequirement) {
		this.fullFTERequirement = fullFTERequirement;
	}

}

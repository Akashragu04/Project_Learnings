package com.intelizign.dmgcc.pojoclass;

import java.util.List;

import com.intelizign.dmgcc.models.EmployeeCapacityReportModel;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ResourceBaseCapacity {

	private Long id;

	private Long user_id;

	private String hr_id;

	private String emp_name;

	private String level;

	private Integer curren_capacity;

	private Float overall_yearly_capacity;

	private List<ResourceBaseProjectCapacity> projectinfo;

	private List<EmployeeCapacityReportModel> employeecapacityreport;

}

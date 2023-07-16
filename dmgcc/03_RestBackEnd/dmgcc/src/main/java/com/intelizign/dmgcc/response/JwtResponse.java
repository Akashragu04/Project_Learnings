package com.intelizign.dmgcc.response;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtResponse {
	private Long id;

	private String username;

	private String email;

	private String employee_code;

	private String designation;

	private String level;

	private String grade;

	private String locations;

	private String supporting_hr;

	private String employement_status;

	private LocalDate date_of_join;

	private String report_to;

	private String category;

	private String roles;

	private String shortid;

	private Boolean new_user;

	private String emp_name;

	public JwtResponse(Long id, String username, String email, String employee_code, String designation, String level,
			String grade, String locations, String supporting_hr, String employement_status, LocalDate date_of_join,
			String report_to, String category, String roles, String shortid, Boolean new_user, String emp_name) {
		super();
		this.id = id;
		this.username = username;
		this.email = email;
		this.employee_code = employee_code;
		this.designation = designation;
		this.level = level;
		this.grade = grade;
		this.locations = locations;
		this.supporting_hr = supporting_hr;
		this.employement_status = employement_status;
		this.date_of_join = date_of_join;
		this.report_to = report_to;
		this.category = category;
		this.roles = roles;
		this.shortid = shortid;
		this.new_user = new_user;
		this.emp_name = emp_name;
	}

}

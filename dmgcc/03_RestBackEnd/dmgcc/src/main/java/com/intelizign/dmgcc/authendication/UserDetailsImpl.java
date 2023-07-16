package com.intelizign.dmgcc.authendication;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.intelizign.dmgcc.models.G3CEmployeeMasterModel;

public class UserDetailsImpl implements UserDetails {

	private static final long serialVersionUID = 1L;

	private Long id;

	private String email;

	private String emp_name;

	private String username;

	@JsonIgnore
	private String password;

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

	private String shortid;

	private String rolename;

	private String cost_center;

	private String employee_type;

	private Collection<? extends GrantedAuthority> authorities;

	public UserDetailsImpl(Long id, String email, String username, String password, String employee_code,
			String designation, String level, String grade, String locations, String supporting_hr,
			String employement_status, LocalDate date_of_join, String report_to, String category, String shortid,
			String emp_name, String rolename, String cost_center, String employee_type,
			Collection<? extends GrantedAuthority> authorities) {
		super();
		this.id = id;
		this.email = email;
		this.username = username;
		this.password = password;
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
		this.shortid = shortid;
		this.emp_name = emp_name;
		this.rolename = rolename;
		this.cost_center = cost_center;
		this.employee_type = employee_type;
		this.authorities = authorities;
	}

	public static UserDetailsImpl build(G3CEmployeeMasterModel user) {
		List<GrantedAuthority> authorities = user.getRoles().stream()
				.map(role -> new SimpleGrantedAuthority(role.getName().name())).collect(Collectors.toList());

		return new UserDetailsImpl(user.getId(), user.getEmail(), user.getUsername(), user.getPassword(),
				user.getEmployee_code(), user.getDesignation(), user.getLevel(), user.getGrade(), user.getLocations(),
				user.getSupporting_hr(), user.getEmployement_status(), user.getDate_of_join(), user.getReport_to(),
				user.getCategory(), user.getShortid(), user.getEmp_name(), user.getRolename(), user.getCost_center(),
				user.getEmployee_type(), authorities);
	}

	public String getEmp_name() {
		return emp_name;
	}

	public String getEmployee_type() {
		return employee_type;
	}

	public void setEmployee_type(String employee_type) {
		this.employee_type = employee_type;
	}

	public void setEmp_name(String emp_name) {
		this.emp_name = emp_name;
	}

	public String getCost_center() {
		return cost_center;
	}

	public void setCost_center(String cost_center) {
		this.cost_center = cost_center;
	}

	public String getShortid() {
		return shortid;
	}

	public void setShortid(String shortid) {
		this.shortid = shortid;
	}

	public String getEmployee_code() {
		return employee_code;
	}

	public void setEmployee_code(String employee_code) {
		this.employee_code = employee_code;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public String getGrade() {
		return grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}

	public String getLocations() {
		return locations;
	}

	public void setLocations(String locations) {
		this.locations = locations;
	}

	public String getSupporting_hr() {
		return supporting_hr;
	}

	public void setSupporting_hr(String supporting_hr) {
		this.supporting_hr = supporting_hr;
	}

	public String getEmployement_status() {
		return employement_status;
	}

	public void setEmployement_status(String employement_status) {
		this.employement_status = employement_status;
	}

	public LocalDate getDate_of_join() {
		return date_of_join;
	}

	public void setDate_of_join(LocalDate date_of_join) {
		this.date_of_join = date_of_join;
	}

	public String getReport_to() {
		return report_to;
	}

	public void setReport_to(String report_to) {
		this.report_to = report_to;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getRolename() {
		return rolename;
	}

	public void setRolename(String rolename) {
		this.rolename = rolename;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	public Long getId() {
		return id;
	}

	public String getEmail() {
		return email;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		UserDetailsImpl user = (UserDetailsImpl) o;
		return Objects.equals(id, user.id);
	}

}

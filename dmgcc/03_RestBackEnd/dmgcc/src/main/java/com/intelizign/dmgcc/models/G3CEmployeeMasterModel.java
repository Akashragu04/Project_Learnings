package com.intelizign.dmgcc.models;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;

import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonView;
import com.intelizign.dmgcc.request.SkillsRequest;
import com.intelizign.dmgcc.utils.CustomFields;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;

@Entity
@Table(name = "G3C_Master_Employee")
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
public class G3CEmployeeMasterModel {

	@JsonView(CustomFields.MyResponseViews.class)
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, updatable = false)
	private long id;

	@Column(name = "username")
	private String username;

	@JsonView(CustomFields.MyResponseViews.class)
	@Column(name = "shortid")
	private String shortid;

	@Column(name = "hrid")
	private String hrid;

	@Column(name = "password")
	private String password;

	@Column(name = "rolename")
	private String rolename;

	@Column(name = "employee_code")
	private String employee_code;

	@Column(name = "hrwt_code")
	private String hrwt_code;

	@Column(name = "kim_no")
	private String kim_no;

	@JsonView(CustomFields.MyResponseViews.class)
	@Column(name = "emp_name")
	private String emp_name;

	@JsonView(CustomFields.MyResponseViews.class)
	@Column(name = "designation", columnDefinition = "TEXT")
	private String designation;

	@Column(name = "functions", columnDefinition = "TEXT")
	private String functions;

	@Column(name = "department_id")
	private String department_id;

	@Column(name = "level")
	private String level;

	@Column(name = "grade")
	private String grade;

	@Column(name = "locations")
	private String locations;

	@Column(name = "supporting_hr")
	private String supporting_hr;

	@Column(name = "employement_status")
	private String employement_status;

	@Column(name = "indian_expat")
	private String indian_expat;

	@Column(name = "date_of_join")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate date_of_join;

	@Column(name = "date_of_leave")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate date_of_leave;

	@Column(name = "total_prior_experience")
	private String total_prior_experience;

	@Column(name = "experience_dicv")
	private String experience_dicv;

	@Column(name = "total_experience")
	private String total_experience;

	@Column(name = "supv_id")
	private String supv_id;

	@Column(name = "employee_supv_code")
	private String employee_supv_code;

	@Column(name = "report_to")
	private String report_to;

	@Column(name = "cost_center")
	private String cost_center;

	@Column(name = "get_mt_det")
	private String get_mt_det;

	@JsonView(CustomFields.MyResponseViews.class)
	@Column(name = "email", unique = true)
	@Email(message = "Please provide a valid e-mail")
	private String email;

	@Column(name = "sub_function", columnDefinition = "TEXT")
	private String sub_function;

	@Column(name = "approver1")
	private String approver1;

	@Column(name = "approver_name")
	private String approver_name;

	@Column(name = "category")
	private String category;

	@Column(name = "empl_class")
	private String empl_class;

	@Column(name = "business")
	private String business;

	@JsonView(CustomFields.MyResponseViews.class)
	@Column(name = "department")
	private String department;

	@Column(name = "resettoken")
	private String resettoken;

	@Column(name = "capacity")
	private Integer capacity = 0;

	@Column(name = "allocate_capacity")
	private String allocate_capacity;

	@Column(name = "status")
	private Boolean status = true;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private SkillsRequest skills;

	@Column(name = "target")
	private Double target = 0.0;

	@Column(name = "status_updated")
	private Boolean status_updated;

	@Column(name = "status_updated_datetime")
	private LocalDateTime status_updated_datetime;

	@Column(columnDefinition = "TIMESTAMP")
	private LocalDateTime tokenCreationDate;

	@Column(name = "employee_type")
	private String employee_type = "Internal Resource";

	@Column(name = "bench_resource")
	private Boolean bench_resource = false;

	@ManyToMany(fetch = FetchType.LAZY)
	@Column(nullable = true)
	@JoinTable(name = "employee_roles", joinColumns = @JoinColumn(name = "employee_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@Column(nullable = true, unique = true)
	@OrderBy(value = "id")
	private Set<ResourceAllocationModel> resource_mapping = new HashSet<>();

	public G3CEmployeeMasterModel() {
	}

	public G3CEmployeeMasterModel(String username, String password, String email, String emp_name) {
		super();

		this.username = username;
		this.password = password;
		this.email = email;
		this.emp_name = emp_name;
	}

	public G3CEmployeeMasterModel(String username, String password,
			@NotEmpty(message = "Please provide a Employee Code") String employee_code,
			@NotEmpty(message = "Please provide a HRWT Code") String hrwt_code, String kim_no, String designation,
			String functions, String department_id, String level, String grade, String locations, String supporting_hr,
			String employement_status, String indian_expat, LocalDate date_of_join, LocalDate date_of_leave,
			String supv_id, String report_to, String cost_center, String get_mt_det,
			@Email(message = "Please provide a valid e-mail") String email, String sub_function, String approver1,
			String approver_name, String category, String empl_class, String business, String shortid,
			String department, Boolean status, String emp_name, String total_prior_experience, String experience_dicv,
			String total_experience) {
		super();

		this.username = username;
		this.password = password;
		this.employee_code = employee_code;
		this.hrwt_code = hrwt_code;
		this.kim_no = kim_no;
		this.designation = designation;
		this.functions = functions;
		this.department_id = department_id;
		this.level = level;
		this.grade = grade;
		this.locations = locations;
		this.supporting_hr = supporting_hr;
		this.employement_status = employement_status;
		this.indian_expat = indian_expat;
		this.date_of_join = date_of_join;
		this.date_of_leave = date_of_leave;
		this.supv_id = supv_id;
		this.report_to = report_to;
		this.cost_center = cost_center;
		this.get_mt_det = get_mt_det;
		this.email = email;
		this.sub_function = sub_function;
		this.approver1 = approver1;
		this.approver_name = approver_name;
		this.category = category;
		this.empl_class = empl_class;
		this.business = business;
		this.shortid = shortid;
		this.department = department;
		this.status = status;
		this.emp_name = emp_name;
		this.total_experience = total_experience;
		this.experience_dicv = experience_dicv;
		this.total_prior_experience = total_prior_experience;
	}

	public Boolean getStatus_updated() {
		return status_updated;
	}

	public void setStatus_updated(Boolean status_updated) {
		this.status_updated = status_updated;
	}

	public LocalDateTime getStatus_updated_datetime() {
		return status_updated_datetime;
	}

	public void setStatus_updated_datetime(LocalDateTime status_updated_datetime) {
		this.status_updated_datetime = status_updated_datetime;
	}

	public String getEmployee_type() {
		return employee_type;
	}

	public void setEmployee_type(String employee_type) {
		this.employee_type = employee_type;
	}

	public Integer getCapacity() {
		return capacity;
	}

	public void setCapacity(Integer capacity) {
		this.capacity = capacity;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

	public String getEmp_name() {
		return emp_name;
	}

	public void setEmp_name(String emp_name) {
		this.emp_name = emp_name;
	}

	public String getAllocate_capacity() {
		return allocate_capacity;
	}

	public void setAllocate_capacity(String allocate_capacity) {
		this.allocate_capacity = allocate_capacity;
	}

	public String getTotal_prior_experience() {
		return total_prior_experience;
	}

	public void setTotal_prior_experience(String total_prior_experience) {
		this.total_prior_experience = total_prior_experience;
	}

	public String getExperience_dicv() {
		return experience_dicv;
	}

	public void setExperience_dicv(String experience_dicv) {
		this.experience_dicv = experience_dicv;
	}

	public String getTotal_experience() {
		return total_experience;
	}

	public void setTotal_experience(String total_experience) {
		this.total_experience = total_experience;
	}

	public String getRolename() {
		return rolename;
	}

	public void setRolename(String rolename) {
		this.rolename = rolename;
	}

	public String getShortid() {
		return shortid;
	}

	public void setShortid(String shortid) {
		this.shortid = shortid;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmployee_code() {
		return employee_code;
	}

	public void setEmployee_code(String employee_code) {
		this.employee_code = employee_code;
	}

	public String getHrwt_code() {
		return hrwt_code;
	}

	public void setHrwt_code(String hrwt_code) {
		this.hrwt_code = hrwt_code;
	}

	public String getKim_no() {
		return kim_no;
	}

	public void setKim_no(String kim_no) {
		this.kim_no = kim_no;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public String getFunctions() {
		return functions;
	}

	public void setFunctions(String functions) {
		this.functions = functions;
	}

	public String getDepartment_id() {
		return department_id;
	}

	public void setDepartment_id(String department_id) {
		this.department_id = department_id;
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

	public LocalDate getDate_of_leave() {
		return date_of_leave;
	}

	public void setDate_of_leave(LocalDate date_of_leave) {
		this.date_of_leave = date_of_leave;
	}

	public String getSupv_id() {
		return supv_id;
	}

	public void setSupv_id(String supv_id) {
		this.supv_id = supv_id;
	}

	public String getEmployee_supv_code() {
		return employee_supv_code;
	}

	public void setEmployee_supv_code(String employee_supv_code) {
		this.employee_supv_code = employee_supv_code;
	}

	public String getReport_to() {
		return report_to;
	}

	public void setReport_to(String report_to) {
		this.report_to = report_to;
	}

	public String getCost_center() {
		return cost_center;
	}

	public void setCost_center(String cost_center) {
		this.cost_center = cost_center;
	}

	public String getGet_mt_det() {
		return get_mt_det;
	}

	public void setGet_mt_det(String get_mt_det) {
		this.get_mt_det = get_mt_det;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSub_function() {
		return sub_function;
	}

	public void setSub_function(String sub_function) {
		this.sub_function = sub_function;
	}

	public String getApprover1() {
		return approver1;
	}

	public void setApprover1(String approver1) {
		this.approver1 = approver1;
	}

	public String getApprover_name() {
		return approver_name;
	}

	public void setApprover_name(String approver_name) {
		this.approver_name = approver_name;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getEmpl_class() {
		return empl_class;
	}

	public void setEmpl_class(String empl_class) {
		this.empl_class = empl_class;
	}

	public String getBusiness() {
		return business;
	}

	public void setBusiness(String business) {
		this.business = business;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public String getIndian_expat() {
		return indian_expat;
	}

	public void setIndian_expat(String indian_expat) {
		this.indian_expat = indian_expat;
	}

	public String getResettoken() {
		return resettoken;
	}

	public void setResettoken(String resettoken) {
		this.resettoken = resettoken;
	}

	public LocalDateTime getTokenCreationDate() {
		return tokenCreationDate;
	}

	public void setTokenCreationDate(LocalDateTime tokenCreationDate) {
		this.tokenCreationDate = tokenCreationDate;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public Set<ResourceAllocationModel> getResource_mapping() {
		return resource_mapping;
	}

	public void setResource_mapping(Set<ResourceAllocationModel> resource_mapping) {
		this.resource_mapping = resource_mapping;
	}

	public String getHrid() {
		return hrid;
	}

	public void setHrid(String hrid) {
		this.hrid = hrid;
	}

	public SkillsRequest getSkills() {
		return skills;
	}

	public void setSkills(SkillsRequest skills) {
		this.skills = skills;
	}

	public Double getTarget() {
		return target;
	}

	public void setTarget(Double target) {
		this.target = target;
	}

	public Boolean getBench_resource() {
		return bench_resource;
	}

	public void setBench_resource(Boolean bench_resource) {
		this.bench_resource = bench_resource;
	}

	public G3CEmployeeMasterModel(String shortid, String emp_name,
			@Email(message = "Please provide a valid e-mail") String email) {
		super();
		this.shortid = shortid;
		this.emp_name = emp_name;
		this.email = email;
	}

}

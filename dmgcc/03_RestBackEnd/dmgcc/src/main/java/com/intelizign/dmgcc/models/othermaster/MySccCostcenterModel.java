package com.intelizign.dmgcc.models.othermaster;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "myscc_costcenter")
public class MySccCostcenterModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, updatable = false)
	private long id;
	
	@Column(name = "department")
	private String department;
	
	@Column(name = "code")
	private String code;


	@Column(name = "isactive")
	private boolean isactive;
	
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "costplanningss")
	private String costplanningss;
	
	@Column(name = "fullname")
	private String fullname;

	public MySccCostcenterModel() {
		super();
	}

	public MySccCostcenterModel( String department, String code, boolean isactive, String name,
			String costplanningss, String fullname) {
		super();
		this.department = department;
		this.code = code;
		this.isactive = isactive;
		this.name = name;
		this.costplanningss = costplanningss;
		this.fullname = fullname;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public boolean isIsactive() {
		return isactive;
	}

	public void setIsactive(boolean isactive) {
		this.isactive = isactive;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCostplanningss() {
		return costplanningss;
	}

	public void setCostplanningss(String costplanningss) {
		this.costplanningss = costplanningss;
	}

	public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

}

package com.intelizign.dmgcc.models.landingpage;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import com.intelizign.dmgcc.request.SupportingFiles;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;

@Entity
@Table(name = "landing_contacts")
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
public class ContactsModel implements Serializable{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, updatable = false)
	private long id;
	
	@Column(name = "department_name")
	private String department;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "mobile_number")
	private String mobileno;
	
	@Column(name = "active")
	private Boolean active = true;
	
	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private SupportingFiles coverImage;
	

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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMobileno() {
		return mobileno;
	}

	public void setMobileno(String mobileno) {
		this.mobileno = mobileno;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public SupportingFiles getCoverImage() {
		return coverImage;
	}

	public void setCoverImage(SupportingFiles coverImage) {
		this.coverImage = coverImage;
	}

	public ContactsModel() {
		super();
		
	}

	

}

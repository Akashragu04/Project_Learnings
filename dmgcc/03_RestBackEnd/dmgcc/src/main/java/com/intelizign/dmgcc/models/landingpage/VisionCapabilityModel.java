package com.intelizign.dmgcc.models.landingpage;

import java.io.Serializable;
import java.util.List;

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
@Table(name = "landing_vision_capability")
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
public class VisionCapabilityModel implements Serializable{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, updatable = false)
	private long id;
	
	@Column(name = "description", columnDefinition = "TEXT")
	private String description;
	
	@Column(name = "title")
	private String title;
	
	@Column(name = "model_name")
	private String model_name;
	
	@Column(name = "active")
	private Boolean active = true;
	
	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private SupportingFiles supporting_files;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getModel_name() {
		return model_name;
	}

	public void setModel_name(String model_name) {
		this.model_name = model_name;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	

	public SupportingFiles getSupporting_files() {
		return supporting_files;
	}

	public void setSupporting_files(SupportingFiles supporting_files) {
		this.supporting_files = supporting_files;
	}

	public VisionCapabilityModel() {
		super();
		
	}

	
}

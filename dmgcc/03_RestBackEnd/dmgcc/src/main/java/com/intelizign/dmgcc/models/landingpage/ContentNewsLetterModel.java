package com.intelizign.dmgcc.models.landingpage;

import java.io.Serializable;
import java.time.LocalDateTime;

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
@Table(name = "landing_content")
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
public class ContentNewsLetterModel implements Serializable{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, updatable = false)
	private long id;
	
	@Column(name = "title")
	private String title;

	@Column(name = "description", columnDefinition = "TEXT")
	private String description;
	
	@Column(name = "created_by")
	private String created_by;
	
	@Column(name = "created_on")
	private LocalDateTime  created_on;
	
	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private SupportingFiles coverImage;
	
	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private SupportingFiles newsletter_file;
	
	@Column(name = "newsletter",columnDefinition = "TEXT")
	private String newsletter;
	
	@Column(name = "active")
	private Boolean active = true;
	
	@Column(name = "model_name")
	private String model_name;
	
	@Column(name="is_approved")
	private Boolean is_approved=false;
	

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCreated_by() {
		return created_by;
	}

	public void setCreated_by(String created_by) {
		this.created_by = created_by;
	}

	public LocalDateTime getCreated_on() {
		return created_on;
	}

	public void setCreated_on(LocalDateTime created_on) {
		this.created_on = created_on;
	}

	

	public SupportingFiles getCoverImage() {
		return coverImage;
	}

	public void setCoverImage(SupportingFiles coverImage) {
		this.coverImage = coverImage;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public ContentNewsLetterModel() {
		super();
		
	}

	public String getNewsletter() {
		return newsletter;
	}

	public void setNewsletter(String newsletter) {
		this.newsletter = newsletter;
	}

	public String getModel_name() {
		return model_name;
	}

	public void setModel_name(String model_name) {
		this.model_name = model_name;
	}

	public SupportingFiles getNewsletter_file() {
		return newsletter_file;
	}

	public void setNewsletter_file(SupportingFiles newsletter_file) {
		this.newsletter_file = newsletter_file;
	}

	public Boolean getIs_approved() {
		return is_approved;
	}

	public void setIs_approved(Boolean is_approved) {
		this.is_approved = is_approved;
	}



	
	
}

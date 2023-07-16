package com.intelizign.dmgcc.models.landingpage;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

import com.intelizign.dmgcc.request.SupportingFiles;

@Entity
@Table(name = "landing_testimonials")
public class TestimonialsModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, updatable = false)
	private long id;
	
	@Column(name = "description", columnDefinition = "TEXT")
	private String description;
	
	@Column(name = "client_name")
	private String client_name;
	
	@Column(name = "customer_name")
	private String customername;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private SupportingFiles coverImage;
	
	@Column(name = "rating")
	private String rating;
	
	
	@Column(name = "active")
	private Boolean active = true;

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

	public String getClient_name() {
		return client_name;
	}

	public void setClient_name(String client_name) {
		this.client_name = client_name;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public TestimonialsModel() {
		super();
		
	}

	public String getCustomername() {
		return customername;
	}

	public void setCustomername(String customername) {
		this.customername = customername;
	}

	public SupportingFiles getCoverImage() {
		return coverImage;
	}

	public void setCoverImage(SupportingFiles coverImage) {
		this.coverImage = coverImage;
	}

	public String getRating() {
		return rating;
	}

	public void setRating(String rating) {
		this.rating = rating;
	}
	
	
}

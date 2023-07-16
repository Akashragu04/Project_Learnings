package com.intelizign.dmgcc.models.landingpage;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.TypeDef;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;


@Entity
@Table(name = "landing_sub_list")
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
public class SubListModel implements Serializable{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, updatable = false)
	private long id;

	@Column(name = "content",columnDefinition = "TEXT")
	private String content;
	
	
	@Column(name = "active")
	private Boolean active = true;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "subcontent_id", referencedColumnName = "id", nullable = true)
	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	@JsonBackReference
	private SubContentModel subcontent;
	
	
	@ManyToOne(fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "aboutus_sublist_id", referencedColumnName = "id", nullable = true)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private AboutHRModel aboutus;
		
	
	@Column(name = "model_name")
	private String model_name;
	

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	

	public String getModel_name() {
		return model_name;
	}

	public void setModel_name(String model_name) {
		this.model_name = model_name;
	}

	public SubContentModel getSubcontent() {
		return subcontent;
	}

	public void setSubcontent(SubContentModel subcontent) {
		this.subcontent = subcontent;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public SubListModel() {
		super();
		
	}

	public AboutHRModel getAboutus() {
		return aboutus;
	}

	public void setAboutus(AboutHRModel aboutus) {
		this.aboutus = aboutus;
	}

	
	
	
	
}

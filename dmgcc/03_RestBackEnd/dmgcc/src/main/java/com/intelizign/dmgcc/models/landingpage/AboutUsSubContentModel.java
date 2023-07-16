package com.intelizign.dmgcc.models.landingpage;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "landing_about_us_subcontent")
public class AboutUsSubContentModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, updatable = false)
	private long id;

	@Column(name = "content", columnDefinition = "TEXT")
	private String content;

	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "aboutus_subcontent_id", referencedColumnName = "id", nullable = true)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private AboutHRModel aboutusData;

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


	public AboutHRModel getAboutusData() {
		return aboutusData;
	}

	public void setAboutusData(AboutHRModel aboutusData) {
		this.aboutusData = aboutusData;
	}

	public AboutUsSubContentModel() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}

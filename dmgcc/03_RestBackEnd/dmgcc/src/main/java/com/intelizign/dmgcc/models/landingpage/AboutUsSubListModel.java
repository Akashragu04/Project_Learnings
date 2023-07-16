package com.intelizign.dmgcc.models.landingpage;

import java.util.List;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.intelizign.dmgcc.request.SupportingFiles;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;


@Entity
@Table(name = "landing_about_us_sublist")
public class AboutUsSubListModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, updatable = false)
	private long id;

	@Column(name = "content", columnDefinition = "TEXT")
	private String content;

	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "aboutus_subcontent_id", referencedColumnName = "id", nullable = true)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private AboutHRModel aboutus;


	public long getId() {
		return id;
	}


	public void setId(long id) {
		this.id = id;
	}


	public AboutHRModel getAboutus() {
		return aboutus;
	}


	public void setAboutus(AboutHRModel aboutus) {
		this.aboutus = aboutus;
	}


	public String getContent() {
		return content;
	}


	public void setContent(String content) {
		this.content = content;
	}


	public AboutUsSubListModel() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}

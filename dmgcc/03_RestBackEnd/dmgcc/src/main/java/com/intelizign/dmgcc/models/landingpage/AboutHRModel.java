package com.intelizign.dmgcc.models.landingpage;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.intelizign.dmgcc.pojoclass.landingpage.SubList;
import com.intelizign.dmgcc.request.SupportingFiles;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;

@Entity
@Table(name = "landing_about_us")
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
public class AboutHRModel implements Serializable {

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

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private SupportingFiles supporting_file;

	
	@OneToMany(mappedBy = "aboutus", cascade = CascadeType.ALL)
	private List<AboutUsSubListModel> sub_list;
	
	@OneToMany(mappedBy = "aboutusData", cascade = CascadeType.ALL)
	private List<AboutUsSubContentModel> sub_content;

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

	public SupportingFiles getSupporting_file() {
		return supporting_file;
	}

	public void setSupporting_file(SupportingFiles supporting_file) {
		this.supporting_file = supporting_file;
	}

	
	public List<AboutUsSubListModel> getSub_list() {
		return sub_list;
	}

	public void setSub_list(List<AboutUsSubListModel> sub_list) {
		this.sub_list = sub_list;
		for (AboutUsSubListModel s : sub_list) {
			s.setAboutus(this);
		}
	}

	public List<AboutUsSubContentModel> getSub_content() {
		return sub_content;
	}

	public void setSub_content(List<AboutUsSubContentModel> sub_content) {
		this.sub_content = sub_content;
		
		for (AboutUsSubContentModel s : sub_content) {
			s.setAboutusData(this);
		}
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

	public AboutHRModel() {
		super();

	}

}

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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.intelizign.dmgcc.request.SupportingFiles;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;

@Entity
@Table(name = "landing_sub_content")
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
public class SubContentModel implements Serializable{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, updatable = false)
	private long id;

	@Column(name = "title")
	private String title;
	
	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private SupportingFiles supporting_files;
	
	@Column(name = "model_name")
	private String model_name;
	
	@Column(name = "description",  columnDefinition = "TEXT")
	private String description;
	
	@Column(name = "active")
	private Boolean active = true;
	
	@OneToMany(mappedBy = "subcontent", cascade = CascadeType.ALL)
	@JsonManagedReference
	private List<SubListModel> sub_list;
	
	@Column(name = "isSubcontent")
	private Boolean isSubcontent;

	
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

	

	public SupportingFiles getSupporting_files() {
		return supporting_files;
	}

	public void setSupporting_files(SupportingFiles supporting_files) {
		this.supporting_files = supporting_files;
	}

	public List<SubListModel> getSub_list() {
		return sub_list;
	}

	public void setSub_list(List<SubListModel> sub_list) {
		this.sub_list = sub_list;
		
		for (SubListModel s : sub_list) {
			s.setSubcontent(this);
		}
	}

	
	public String getModel_name() {
		return model_name;
	}

	public void setModel_name(String model_name) {
		this.model_name = model_name;
	}

	public SubContentModel() {
		super();
		
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public Boolean getIsSubcontent() {
		return isSubcontent;
	}

	public void setIsSubcontent(Boolean isSubcontent) {
		this.isSubcontent = isSubcontent;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	
	
	
	

}

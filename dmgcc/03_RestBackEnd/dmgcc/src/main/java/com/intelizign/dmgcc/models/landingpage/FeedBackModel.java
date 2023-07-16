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
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;

@Entity
@Table(name = "landing_feedback")
public class FeedBackModel{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, updatable = false)
	private long id;
	
	@Column(name = "short_id")
	private String short_id;
	
	@Column(name = "designation_level")
	private String designation_level;
	
	@Column(name = "department")
	private String department;
	
	@Column(name = "quality_status")
	private String quality_status;
	
	@Column(name = "adherence_status")
	private String adherence_status;
	
	@Column(name = "quality_timeLine_status")
	private String quality_timeLine_status;
	
	@Column(name = "knowledge_status")
	private String knowledge_status;
	
	@Column(name = "responsiveness_status")
	private String responsiveness_status;
	
	@Column(name = "communication_skills_status")
	private String communication_skills_status;
	
	@Column(name = "overall_plan_status")
	private String overall_plan_status;
	
	@Column(name = "sustainability_status")
	private String sustainability_status;
	
	@Column(name = "quality_remark")
	private String quality_remark;
	
	@Column(name = "adherence_remark")
	private String adherence_remark;
	
	@Column(name = "quality_timeLine_remark")
	private String quality_timeLine_remark;
	
	@Column(name = "knowledge_remark")
	private String knowledge_remark;
	
	@Column(name = "responsiveness_remark")
	private String responsiveness_remark;
	
	@Column(name = "communication_skills_remark")
	private String communication_skills_remark;
	
	@Column(name = "overall_plan_remark")
	private String overall_plan_remark;
		
	@Column(name = "sustainability_remark")
	private String sustainability_remark;
	
	@Column(name = "recommend_counterpart_state")
	private String recommend_counterpart_state;
		
	@Column(name = "recommend_counterpart")
	private String recommend_counterpart;
	
	@Column(name = "suggestions_improvement_areas")
	private String suggestions_improvement_areas;
	
	@Column(name = "project_name")
	private String project_name;
	
	@Column(name = "project_id")
	private String project_id;
	
	@Column(name = "cost_center")
	private String cost_center;
	
	@Column(name = "active")
	private Boolean active=true;
	

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getShort_id() {
		return short_id;
	}

	public void setShort_id(String short_id) {
		this.short_id = short_id;
	}

	public String getDesignation_level() {
		return designation_level;
	}

	public void setDesignation_level(String designation_level) {
		this.designation_level = designation_level;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getQuality_status() {
		return quality_status;
	}

	public void setQuality_status(String quality_status) {
		this.quality_status = quality_status;
	}

	public String getAdherence_status() {
		return adherence_status;
	}

	public void setAdherence_status(String adherence_status) {
		this.adherence_status = adherence_status;
	}

	public String getQuality_timeLine_status() {
		return quality_timeLine_status;
	}

	public void setQuality_timeLine_status(String quality_timeLine_status) {
		this.quality_timeLine_status = quality_timeLine_status;
	}

	public String getKnowledge_status() {
		return knowledge_status;
	}

	public void setKnowledge_status(String knowledge_status) {
		this.knowledge_status = knowledge_status;
	}

	public String getResponsiveness_status() {
		return responsiveness_status;
	}

	public void setResponsiveness_status(String responsiveness_status) {
		this.responsiveness_status = responsiveness_status;
	}

	public String getCommunication_skills_status() {
		return communication_skills_status;
	}

	public void setCommunication_skills_status(String communication_skills_status) {
		this.communication_skills_status = communication_skills_status;
	}

	public String getOverall_plan_status() {
		return overall_plan_status;
	}

	public void setOverall_plan_status(String overall_plan_status) {
		this.overall_plan_status = overall_plan_status;
	}

	public String getSustainability_status() {
		return sustainability_status;
	}

	public void setSustainability_status(String sustainability_status) {
		this.sustainability_status = sustainability_status;
	}

	public String getQuality_remark() {
		return quality_remark;
	}

	public void setQuality_remark(String quality_remark) {
		this.quality_remark = quality_remark;
	}

	public String getAdherence_remark() {
		return adherence_remark;
	}

	public void setAdherence_remark(String adherence_remark) {
		this.adherence_remark = adherence_remark;
	}

	public String getQuality_timeLine_remark() {
		return quality_timeLine_remark;
	}

	public void setQuality_timeLine_remark(String quality_timeLine_remark) {
		this.quality_timeLine_remark = quality_timeLine_remark;
	}

	public String getKnowledge_remark() {
		return knowledge_remark;
	}

	public void setKnowledge_remark(String knowledge_remark) {
		this.knowledge_remark = knowledge_remark;
	}

	public String getResponsiveness_remark() {
		return responsiveness_remark;
	}

	public void setResponsiveness_remark(String responsiveness_remark) {
		this.responsiveness_remark = responsiveness_remark;
	}

	public String getCommunication_skills_remark() {
		return communication_skills_remark;
	}

	public void setCommunication_skills_remark(String communication_skills_remark) {
		this.communication_skills_remark = communication_skills_remark;
	}

	public String getOverall_plan_remark() {
		return overall_plan_remark;
	}

	public void setOverall_plan_remark(String overall_plan_remark) {
		this.overall_plan_remark = overall_plan_remark;
	}

	public String getSustainability_remark() {
		return sustainability_remark;
	}

	public void setSustainability_remark(String sustainability_remark) {
		this.sustainability_remark = sustainability_remark;
	}

	public String getRecommend_counterpart_state() {
		return recommend_counterpart_state;
	}

	public void setRecommend_counterpart_state(String recommend_counterpart_state) {
		this.recommend_counterpart_state = recommend_counterpart_state;
	}

	public String getRecommend_counterpart() {
		return recommend_counterpart;
	}

	public void setRecommend_counterpart(String recommend_counterpart) {
		this.recommend_counterpart = recommend_counterpart;
	}

	public String getSuggestions_improvement_areas() {
		return suggestions_improvement_areas;
	}

	public void setSuggestions_improvement_areas(String suggestions_improvement_areas) {
		this.suggestions_improvement_areas = suggestions_improvement_areas;
	}

	public FeedBackModel() {
		super();
		
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public String getProject_name() {
		return project_name;
	}

	public void setProject_name(String project_name) {
		this.project_name = project_name;
	}

	public String getProject_id() {
		return project_id;
	}

	public void setProject_id(String project_id) {
		this.project_id = project_id;
	}

	public String getCost_center() {
		return cost_center;
	}

	public void setCost_center(String cost_center) {
		this.cost_center = cost_center;
	}

	
	

}

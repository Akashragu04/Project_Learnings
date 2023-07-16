package com.intelizign.dmgcc.models;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.intelizign.dmgcc.models.businesscasemodels.BusinessCaseRequest;
import com.intelizign.dmgcc.response.JDHiredResponse;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;

@Entity
@Table(name = "jd_mapping")
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
public class JDMappingModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, updatable = false)
	private long id;

	@Column(name = "quantity")
	private Integer quantity;

	@Column(name = "level")
	private String level;

	@Column(name = "monthandyear")
	private String monthandyear;
	
	@Column(name = "actualmonthandyear")
	private String actualmonthandyear;       // employee actual onboard date when status = Onboard

	@Column(name = "remarks")
	private String remarks;

	@Column(name = "position_code")
	private String position_code;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<JDHiredResponse> hired_details;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@JoinColumn(name = "request_id")
	private BusinessCaseRequest request;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "rampup_jd_mapping", joinColumns = @JoinColumn(name = "jd_mapping_id"), inverseJoinColumns = @JoinColumn(name = "jd_id"))
	private Set<JDModel> JD = new HashSet<>();

	public JDMappingModel() {
		super();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public String getMonthandyear() {
		return monthandyear;
	}

	public void setMonthandyear(String monthandyear) {
		this.monthandyear = monthandyear;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public String getPosition_code() {
		return position_code;
	}

	public void setPosition_code(String position_code) {
		this.position_code = position_code;
	}

	public List<JDHiredResponse> getHired_details() {
		return hired_details;
	}

	public void setHired_details(List<JDHiredResponse> hired_details) {
		this.hired_details = hired_details;
	}

	public BusinessCaseRequest getRequest() {
		return request;
	}

	public void setRequest(BusinessCaseRequest request) {
		this.request = request;
	}

	public Set<JDModel> getJD() {
		return JD;
	}

	public void setJD(Set<JDModel> jD) {
		JD = jD;
	}

	public String getActualmonthandyear() {
		return actualmonthandyear;
	}

	public void setActualmonthandyear(String actualmonthandyear) {
		this.actualmonthandyear = actualmonthandyear;
	}

}

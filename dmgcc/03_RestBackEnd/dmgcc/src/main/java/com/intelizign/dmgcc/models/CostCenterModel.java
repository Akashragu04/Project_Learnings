package com.intelizign.dmgcc.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "cost_center_master")
public class CostCenterModel {

	@Id
	@GenericGenerator(name = "id", strategy = "com.intelizign.dmgcc.utils.CostCenterIdConfig")
	@GeneratedValue(generator = "id")
	@Column(name = "id", nullable = false, updatable = false)
	private Long id;

	@Column(name = "cost_center", unique = true, nullable = false)
	private String costcenter;

	@Column(name = "team")
	private String team;

	@Column(name = "team_group")
	private String team_group;

	@Column(name = "capacity")
	private Integer capacity = 100;
	
	@Column(name = "is_active")
	private Boolean is_active = true;

	public CostCenterModel() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTeam() {
		return team;
	}

	public void setTeam(String team) {
		this.team = team;
	}

	public String getTeam_group() {
		return team_group;
	}

	public void setTeam_group(String team_group) {
		this.team_group = team_group;
	}

	public String getCostcenter() {
		return costcenter;
	}

	public void setCostcenter(String costcenter) {
		this.costcenter = costcenter;
	}

	public Integer getCapacity() {
		return capacity;
	}

	public void setCapacity(Integer capacity) {
		this.capacity = capacity;
	}

	public Boolean getIs_active() {
		return is_active;
	}

	public void setIs_active(Boolean is_active) {
		this.is_active = is_active;
	}

	
}

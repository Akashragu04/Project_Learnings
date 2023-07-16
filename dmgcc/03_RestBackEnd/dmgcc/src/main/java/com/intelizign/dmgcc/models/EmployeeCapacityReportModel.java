package com.intelizign.dmgcc.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "employee_capacity_report")
public class EmployeeCapacityReportModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, updatable = false)
	private long id;

	@Column(name = "month")
	private String month;

	@Column(name = "capacity")
	private Double capacity;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "user_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private G3CEmployeeMasterModel userinfo;

	public EmployeeCapacityReportModel() {
		super();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getMonth() {
		return month;
	}

	public void setMonth(String month) {
		this.month = month;
	}

	public Double getCapacity() {
		return capacity;
	}

	public void setCapacity(Double capacity) {
		
		if(capacity != null) {
			String formattedValue;
			if(capacity % 1 == 0) {
				  // No digits after decimal
				formattedValue = String.format("%f", capacity);
			}
			
			else {
				formattedValue = String.format("%.2f", capacity);
			}
			this.capacity = Double.parseDouble(formattedValue);
		}
		
		else {
			this.capacity = capacity ;
		}
		
	}

	public G3CEmployeeMasterModel getUserinfo() {
		return userinfo;
	}

	public void setUserinfo(G3CEmployeeMasterModel userinfo) {
		this.userinfo = userinfo;
	}

}

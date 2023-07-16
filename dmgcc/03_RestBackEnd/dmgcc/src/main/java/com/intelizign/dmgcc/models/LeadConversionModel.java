package com.intelizign.dmgcc.models;

import java.time.LocalDateTime;

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

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "Lead_Conversion_Report")
public class LeadConversionModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, updatable = false)
	private long id;

	@Column(name = "level_start_date")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	private LocalDateTime level_start_date;

	@Column(name = "level_end_date")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	private LocalDateTime level_end_date;

	@Column(name = "conversion_period")
	private String conversion_period;

	@Column(name = "delay_days")
	private long delay_days;

	@Column(name = "colour")
	private String colour;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@JoinColumn(name = "lead_id")
	private LeadRequestModel lead;

	public LeadConversionModel() {
		super();
	}

	public String getConversion_period() {
		return conversion_period;
	}

	public void setConversion_period(String conversion_period) {
		this.conversion_period = conversion_period;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public LocalDateTime getLevel_start_date() {
		return level_start_date;
	}

	public void setLevel_start_date(LocalDateTime level_start_date) {
		this.level_start_date = level_start_date;
	}

	public LocalDateTime getLevel_end_date() {
		return level_end_date;
	}

	public void setLevel_end_date(LocalDateTime level_end_date) {
		this.level_end_date = level_end_date;
	}

	public String getColour() {
		return colour;
	}

	public void setColour(String colour) {
		this.colour = colour;
	}

	public long getDelay_days() {
		return delay_days;
	}

	public void setDelay_days(long delay_days) {
		this.delay_days = delay_days;
	}

	public LeadRequestModel getLead() {
		return lead;
	}

	public void setLead(LeadRequestModel lead) {
		this.lead = lead;
	}

}

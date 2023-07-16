package com.intelizign.dmgcc.models.othermaster;

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

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.intelizign.dmgcc.models.CostCenterModel;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;

@Entity
@Table(name = "rate_card_master")
@TypeDefs({ @TypeDef(name = "jsonb", typeClass = JsonBinaryType.class) })
public class RateCardModel implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, updatable = false)
	public long id;

	@Column(name = "hourly_rate_inr")
	private double hourly_rate_inr=0;

	@Column(name = "hourly_rate_usd")
	private double hourly_rate_usd=0;

	@Column(name = "hourly_rate_ero")
	private double hourly_rate_ero=0;

	@Column(name = "hourly_description")
	private String hourly_description;

	@Column(name = "level")
	private String level;

	@Column(name = "year")
	private String year;

	@ManyToOne(fetch = FetchType.LAZY, optional = true)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@JoinColumn(name = "costcenter_id")
	private CostCenterModel costcenter;

	public RateCardModel() {
		super();
	}

	public RateCardModel(long id, Double hourly_rate_inr, Double hourly_rate_usd, Double hourly_rate_ero,
			String hourly_description, String level, CostCenterModel costcenter) {
		super();
		this.id = id;
		this.hourly_rate_inr = hourly_rate_inr;
		this.hourly_rate_usd = hourly_rate_usd;
		this.hourly_rate_ero = hourly_rate_ero;
		this.hourly_description = hourly_description;
		this.level = level;
		this.costcenter = costcenter;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public double getHourly_rate_inr() {
		return hourly_rate_inr;
	}

	public void setHourly_rate_inr(double hourly_rate_inr) {
		this.hourly_rate_inr = hourly_rate_inr;
	}

	public double getHourly_rate_usd() {
		return hourly_rate_usd;
	}

	public void setHourly_rate_usd(double hourly_rate_usd) {
		this.hourly_rate_usd = hourly_rate_usd;
	}

	public double getHourly_rate_ero() {
		return hourly_rate_ero;
	}

	public void setHourly_rate_ero(double hourly_rate_ero) {
		this.hourly_rate_ero = hourly_rate_ero;
	}

	public String getHourly_description() {
		return hourly_description;
	}

	public void setHourly_description(String hourly_description) {
		this.hourly_description = hourly_description;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public CostCenterModel getCostcenter() {
		return costcenter;
	}

	public void setCostcenter(CostCenterModel costcenter) {
		this.costcenter = costcenter;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

}

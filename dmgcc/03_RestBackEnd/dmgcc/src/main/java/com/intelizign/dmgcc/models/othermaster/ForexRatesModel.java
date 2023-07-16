package com.intelizign.dmgcc.models.othermaster;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "Forex_rates")
public class ForexRatesModel {

	@Id
	@GenericGenerator(name = "ForexRateMaster", strategy = "com.intelizign.dmgcc.utils.ForexRateMaster")
	@GeneratedValue(generator = "ForexRateMaster")
	@Column(unique = true, nullable = false)
	private Long id;

	@Column(name = "currency")
	private String currency;

	@Column(name = "to_inr")
	private String to_inr;

	@Column(name = "year")
	private String year;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTo_inr() {
		return to_inr;
	}

	public void setTo_inr(String to_inr) {
		this.to_inr = to_inr;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

}

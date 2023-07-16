package com.intelizign.dmgcc.models.othermaster;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "g3c_market_values")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class G3CMarketValueModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, updatable = false)
	private long id;

	@Column(name = "markup_value")
	private double markup_value;

	@Column(name = "india_wht_value")
	private double india_wht_value;

	@Column(name = "non_india_wht_value")
	private double non_india_wht_value;

	@Column(name = "gst_value")
	private double gst_value;

	@Column(name = "fx_value")
	private double fx_value;
}

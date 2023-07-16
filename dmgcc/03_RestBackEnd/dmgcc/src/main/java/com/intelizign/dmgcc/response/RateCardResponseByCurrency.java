package com.intelizign.dmgcc.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RateCardResponseByCurrency {

	private double rate;

	private String hourly_description;

	private String level;

	private String year;
}

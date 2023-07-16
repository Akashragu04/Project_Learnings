package com.intelizign.dmgcc.pojoclass;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SLATariffSheet implements Serializable {

	private String cost_center_code;

	private String material_description;

	private String material_code;

	private String units;

	private String estimated_quantity;

	private String rate;

	private Boolean has_markup;

	private Boolean has_wht;

	private Boolean has_fx_risk;

	private Boolean is_taxable;

	private String markup_value;

	private String markup_amount;

	private String amount;

}

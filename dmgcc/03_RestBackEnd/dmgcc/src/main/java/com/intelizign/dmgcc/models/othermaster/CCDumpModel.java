package com.intelizign.dmgcc.models.othermaster;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "cc_dump_model")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CCDumpModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, updatable = false)
	private long id;

	@Column(name = "fiscalyear")
	private String fiscalyear;

	@Column(name = "period")
	private String period;

	@Column(name = "costcenter")
	private String costcenter;

	@Column(name = "co_object_name")
	private String co_object_name;

	@Column(name = "costelement")
	private String costelement;

	@Column(name = "cost_element_name")
	private String cost_element_name;

	@Column(name = "value_obj_crcy")
	private double value_obj_crcy = 0.0;

	@Column(name = "offset_acct_no")
	private String offset_acct_no;

	@Column(name = "offset_acct_name")
	private String offset_acct_name;

	@Column(name = "name")
	private String name;

	@Column(name = "document_number")
	private String document_number;

	@Column(name = "document_date")
	@JsonFormat(pattern = "MM-dd-YYYY")
	private LocalDate document_date;

	@Column(name = "posting_date")
	@JsonFormat(pattern = "MM-dd-YYYY")
	private LocalDate posting_date;

	@Column(name = "ref_document_number")
	private String ref_document_number;

	@Column(name = "document_header_text")
	private String document_header_text;

	@Column(name = "purchasing_document")
	private String purchasing_document;

	@Column(name = "purchase_order_text")
	private String purchase_order_text;

	@Column(name = "material")
	private String material;

	@Column(name = "material_description")
	private String material_description;

	@Column(name = "total_quantity")
	private String totalquantity;

	@Column(name = "plant")
	private String plant;

	@Column(name = "reference_procedure")
	private String reference_procedure;

	@Column(name = "val_inrep_cur")
	private String val_inrep_cur;

	@Column(name = "transaction_currency")
	private String transaction_currency;

	@Column(name = "object_currency")
	private String object_currency;

	@Column(name = "report_currency")
	private String report_currency;

	@Column(name = "trancur_value")
	private double trancur_value = 0.0;

	@Column(name = "value_type")
	private String valuetype;

	@Column(name = "partner_object")
	private String partner_object;

}

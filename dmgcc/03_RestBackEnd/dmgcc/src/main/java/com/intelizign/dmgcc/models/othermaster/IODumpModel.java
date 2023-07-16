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

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "io_dump_data")
public class IODumpModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, updatable = false)
	private long id;

	@Column(name = "fiscalyear")
	private String fiscalyear;

	@Column(name = "period")
	private String period;

	@Column(name = "cost_element")
	private String costelement;

	@Column(name = "cost_element_name")
	private String cost_element_name;

	@Column(name = "gl_grouping")
	private String gl_grouping;

	@Column(name = "valuein_objectcurrency")
	private double valuein_objectcurrency;

	@Column(name = "orders")
	private String orders;

	@Column(name = "cost_center")
	private String cost_center;

	@Column(name = "team")
	private String team;

	@Column(name = "co_object_name")
	private String co_object_name;

	@Column(name = "offset_account_name")
	private String offset_account_name;

	@Column(name = "purchasing_document")
	private String purchasing_document;

	@Column(name = "cost_element_descr")
	private String cost_element_descr;

	@Column(name = "posting_date")
	@JsonFormat(pattern = "MM-dd-YYYY")
	private LocalDate posting_date;

	@Column(name = "ref_document_number")
	private String ref_document_number;

	@Column(name = "report_currency")
	private String report_currency;

	@Column(name = "purchase_order_text")
	private String purchase_order_text;

	@Column(name = "document_date")
	@JsonFormat(pattern = "MM-dd-YYYY")
	private LocalDate document_date;

	@Column(name = "document_number")
	private String document_number;

	@Column(name = "transaction_currency")
	private String transaction_currency;

	@Column(name = "object_currency")
	private String object_currency;

	@Column(name = "name")
	private String name;

	@Column(name = "valuein_reportcurrency")
	private double valuein_reportcurrency = 0.0;

	@Column(name = "valuein_transactioncurrency")
	private double valuein_transactioncurrency = 0.0;

	@Column(name = "document_header_text")
	private String document_header_text;

	@Column(name = "value_type")
	private String valuetype;

}

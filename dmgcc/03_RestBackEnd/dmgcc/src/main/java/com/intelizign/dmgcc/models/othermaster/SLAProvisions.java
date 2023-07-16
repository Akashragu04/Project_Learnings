package com.intelizign.dmgcc.models.othermaster;

import java.io.Serializable;
import java.time.LocalDate;

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
@Table(name = "sla_provisions")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SLAProvisions implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, updatable = false)
	private long id;

	@Column(name = "costcenter")
	private String costcenter;

	@Column(name = "team")
	private String team;

	@Column(name = "month")
	private String month;

	@Column(name = "numeric_month")
	private int numeric_month;

	@Column(name = "year")
	private String year;

	@Column(name = "sla_name")
	private String sla_name;

	@Column(name = "slaid")
	private String slaid;

	@Column(name = "project_name")
	private String project_name;

	@Column(name = "vendor_name")
	private String vendor_name;

	@Column(name = "po_ro_number")
	private String po_ro_number;

	@Column(name = "io_number")
	private String io_number;

	@Column(name = "total_provision")
	private Double total_provision = 0d;

	@Column(name = "status")
	private String status; // like Required, Not Required or Reverse Provision

	@Column(name = "comments")
	private String comments;

	@Column(name = "invoice_reference_no")
	private String invoice_reference_no;

	// material description fields
	@Column(name = "thirdparty_manpower_provision")
	private Double thirdparty_manpower_provision = 0d;

	@Column(name = "thirdparty_service_provision")
	private Double thirdparty_service_provision = 0d;

	@Column(name = "cross_charges_provision")
	private Double cross_charges_provision = 0d;

	@Column(name = "software_provision")
	private Double software_provision = 0d;

	@Column(name = "prototype_provision")
	private Double prototype_provision = 0d;

	@Column(name = "other_provisions")
	private Double other_provisions = 0d;

	@Column(name = "previous_provisions")
	private String previous_provisions;

	// remarks fields
	@Column(name = "thirdparty_manpower_provision_remarks", columnDefinition = "TEXT")
	private String thirdparty_manpower_provision_remarks;

	@Column(name = "thirdparty_service_provision_remarks", columnDefinition = "TEXT")
	private String thirdparty_service_provision_remarks;

	@Column(name = "cross_charges_provision_remarks", columnDefinition = "TEXT")
	private String cross_charges_provision_remarks;

	@Column(name = "software_provision_remarks", columnDefinition = "TEXT")
	private String software_provision_remarks;

	@Column(name = "prototype_provision_remarks", columnDefinition = "TEXT")
	private String prototype_provision_remarks;

	@Column(name = "other_provisions_remarks", columnDefinition = "TEXT")
	private String other_provisions_remarks;

	@Column(name = "previous_provisions_remarks", columnDefinition = "TEXT")
	private String previous_provisions_remarks;

	@Column(name = "created_date")
	private LocalDate created_date;

	@Column(name = "updated_date")
	private LocalDate updated_date;
	
	@Column(name = "iseditable")
	private Boolean iseditable = true;
}

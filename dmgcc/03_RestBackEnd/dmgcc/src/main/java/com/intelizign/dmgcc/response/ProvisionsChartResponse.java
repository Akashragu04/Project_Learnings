package com.intelizign.dmgcc.response;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Entity
@Table(name = "sla_provisions_chartvalues")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProvisionsChartResponse implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, updatable = false)
	private long id;

	@Column(name = "month")
	private String month;

	@Column(name = "numeric_month")
	private int numeric_month;

	@Column(name = "year")
	private String year;

	@Column(name = "date")
	private String date;

	@Column(name = "planned_value")
	private double planned_value = 0;

	@Column(name = "actual_required_sum")
	private double actual_required_sum = 0;

	@Column(name = "actual_nonrequired_sum")
	private double actual_nonrequired_sum = 0;

	@Column(name = "actual_invoicesubmitted_sum")
	private double actual_invoicesubmitted_sum = 0;

	@Column(name = "current_value")
	private double current_value = 0;

}

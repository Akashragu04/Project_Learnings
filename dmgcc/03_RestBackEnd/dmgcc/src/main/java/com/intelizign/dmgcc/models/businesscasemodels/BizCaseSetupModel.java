package com.intelizign.dmgcc.models.businesscasemodels;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.intelizign.dmgcc.pojoclass.bizcase.BizCaseSetupITAndFac;
import com.intelizign.dmgcc.request.bizcase.SubModel;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "biz_case_setup")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@TypeDefs({ @TypeDef(name = "jsonb", typeClass = JsonBinaryType.class) })
public class BizCaseSetupModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, updatable = false)
	private Long id;

	@Column(name = "it_average")
	private Double it_average = (double) 0;

	@Column(name = "hr_average")
	private Double hr_average = (double) 0;

	@Column(name = "facility_average")
	private Double facility_average = (double) 0;

	@Column(name = "system_access_average")
	private Double system_access_average = (double) 0;

	@Column(name = "third_party_services_average")
	private Double third_party_services_average = (double) 0;

	@Column(name = "third_party_cost_average")
	private Double third_party_cost_average = (double) 0;

	@Column(name = "total_average")
	private Double total_average;

	@Column(name = "manpower_hiring_completed_date")
	private LocalDate manpower_hiring_completed_date;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<SubModel> it_info;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<BizCaseSetupITAndFac> it_data;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<SubModel> system_access_info;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<BizCaseSetupITAndFac> system_access_data;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<SubModel> facility_info;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<BizCaseSetupITAndFac> facility_data;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<SubModel> third_party_services_info;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<BizCaseSetupITAndFac> third_party_services_data;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<SubModel> third_party_cost_info;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<BizCaseSetupITAndFac> third_party_cost_data;

	@OneToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "biz_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonBackReference
	private BusinessCaseRequest bizcase;

}

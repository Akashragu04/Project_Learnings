package com.intelizign.dmgcc.models.businesscasemodels;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.OrderBy;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.hibernate.envers.Audited;
import org.hibernate.envers.NotAudited;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonView;
import com.intelizign.dmgcc.models.LeadRequestModel;
import com.intelizign.dmgcc.models.ProjectModel;
import com.intelizign.dmgcc.models.othermaster.RateCardModel;
import com.intelizign.dmgcc.pojoclass.JDRampupModel;
import com.intelizign.dmgcc.pojoclass.RateCardBusinessDays;
import com.intelizign.dmgcc.pojoclass.bizcase.BizCaseManPowerYearlyInfo;
import com.intelizign.dmgcc.pojoclass.bizcase.BizCaseReport;
import com.intelizign.dmgcc.request.bizcase.Customer_Expenses;
import com.intelizign.dmgcc.request.bizcase.Manpower_Hiringcost;
import com.intelizign.dmgcc.request.bizcase.Manpower_Requirements;
import com.intelizign.dmgcc.request.bizcase.Rampups;
import com.intelizign.dmgcc.request.bizcase.SubModel;
import com.intelizign.dmgcc.utils.CustomFields;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Audited(withModifiedFlag = true)
@Table(name = "Biz_Case_Request")
@AllArgsConstructor
@NoArgsConstructor
@Data
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
@Getter
@Setter
public class BusinessCaseRequest implements Serializable {

	@JsonView(CustomFields.MyResponseViews.class)
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, updatable = false)
	@NotAudited
	public long id;

	@Column(name = "sla_business_case")
	@NotAudited
	private Boolean sla_business_case;

	@Column(name = "ratecard_type")
	@NotAudited
	private String ratecard_type;

	@Column(name = "business_case_start_date")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate business_case_start_date;

	@Column(name = "business_case_end_date")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate business_case_end_date;

	@Column(name = "business_case_target_date")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	@NotAudited
	private LocalDate business_case_target_date;

	@JsonView(CustomFields.MyResponseViews.class)
	@Column(name = "project_name")
	@NotAudited
	private String project_name;

	@Column(name = "currency")
	@NotAudited
	private String currency;

	@Column(name = "working_hours")
	@NotAudited
	private Integer working_hours = 0;

	@NotAudited
	@Column(name = "hr_contact_person")
	private String hr_contact_person;

	@NotAudited
	@Column(name = "hr_shortid")
	private String hr_shortid;

	@NotAudited
	@Column(name = "it_contact_person")
	private String it_contact_person;

	@NotAudited
	@Column(name = "it_shortid")
	private String it_shortid;

	@NotAudited
	@Column(name = "fac_contact_person")
	private String fac_contact_person;

	@NotAudited
	@Column(name = "fac_shortid")
	private String fac_shortid;

	@NotAudited
	@Column(name = "business_availability")
	private String business_availability;

	@NotAudited
	@Column(name = "manpower_level")
	private String manpower_level;

	@NotAudited
	@Column(name = "level_sequence")
	private String level_sequence;

	@NotAudited
	@Column(name = "customer_expense_total")
	private String customer_expense_total;

	@NotAudited
	@Type(type = "jsonb")
	@Column(name = "customer_expenses", columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<Customer_Expenses> customer_expenses;

	@NotAudited
	@Column(name = "approved_receiver_Shortid")
	private String approved_receiver_Shortid;

	@NotAudited
	@Column(name = "approved_provider_Shortid")
	private String approved_provider_Shortid;

	@NotAudited
	@Column(name = "service_receiver_approve")
	private Boolean service_receiver_approve;

	@NotAudited
	@Column(name = "service_provider_approve")
	private Boolean service_provider_approve;

	@NotAudited
	@Column(name = "active")
	private Boolean active;

	@NotAudited
	@Column(name = "approve_enable")
	private Boolean approve_enable = false;

	@NotAudited
	@Column(name = "status")
	private String status;

	@NotAudited
	@Column(name = "overall_status")
	private Boolean overall_status;

	@NotAudited
	@Column(name = "assign_finance_team")
	private String assign_finance_team;

	@NotAudited
	@Column(name = "isassignfinance")
	private Boolean isassignfinance = true;

	@NotAudited
	@Column(name = "approval_type")
	private String approval_type;

	@NotAudited
	@Column(name = "jd_created")
	private Boolean jd_created;

	@NotAudited
	@Column(name = "is_agree")
	private Boolean is_agree = false;

	@NotAudited
	@Column(name = "isbizcasesetup")
	private Boolean isbizcasesetup = false;

	@NotAudited
	@Column(name = "ishrfilledbizcas")
	private Boolean ishrfilledbizcas = false;

	@NotAudited
	@Column(name = "isitfilledbizcas")
	private Boolean isitfilledbizcas = false;

	@NotAudited
	@Column(name = "isfacilityfilledbizcas")
	private Boolean isfacilityfilledbizcas = false;

	@JsonView(CustomFields.MyResponseViews.class)
	@NotAudited
	@OneToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "lead_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonBackReference
	private LeadRequestModel lead;

	@Column(name = "rate_card_inflation")
	private Double rate_card_inflation;

	@Column(name = "manpower_inflation")
	private Double manpower_inflation;

	@Column(name = "is_customer_rampdown")
	private Boolean is_customer_rampdown = false;

	@JsonView(CustomFields.MyResponseViews.class)
	@NotAudited
	@Column(name = "cost_center")
	private String costcenter;

	@NotAudited
	@OneToMany(mappedBy = "request", cascade = CascadeType.ALL)
	@Column(nullable = false)
	@OrderBy(value = "sequence_level")
	private Set<BusinessApprovalsModel> approvals = new HashSet<>();

	@NotAudited
	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<SubModel> it_info;

	@NotAudited
	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<SubModel> facility;

	@NotAudited
	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<SubModel> system_access;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	@NotAudited
	private List<SubModel> thirdparty_cost;

	@NotAudited
	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<SubModel> thirdparty_service;

	@NotAudited
	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<SubModel> travel_cost;

	@NotAudited
	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<SubModel> other_cost;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<Manpower_Requirements> manpower_requirements;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<Manpower_Hiringcost> manpower_hiringcost;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<Rampups> rampups;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<Rampups> hr_rampups;

	@NotAudited
	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<Manpower_Requirements> customer_requirements;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<Rampups> customer_rampdown;

	@NotAudited
	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<JDRampupModel> jdmappingrampup;

	@NotAudited
	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<String> bizcase_yearly_information;

	@JsonView(CustomFields.MyResponseViews.class)
	@NotAudited
	@OneToOne(mappedBy = "bizcase", cascade = CascadeType.ALL)
	@JsonManagedReference
	private ProjectModel project;

	@NotAudited
	@OneToOne(mappedBy = "bizcase", cascade = CascadeType.ALL, optional = true)
	@JoinColumn(name = "ratecard_id", nullable = true)
	@JsonManagedReference
	private BizCaseRateCardModel newratecard;

	@NotAudited
	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<RateCardModel> existingratecard;

	@NotAudited
	@OneToOne(mappedBy = "bizcase", optional = true, cascade = CascadeType.ALL)
	@JoinColumn(name = "bizcasesetup_id", nullable = true)
	@JsonManagedReference
	private BizCaseSetupModel bizcasesetup;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private BizCaseReport bizcasereport;

	@NotAudited
	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<RateCardBusinessDays> business_days;

	@NotAudited
	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<BizCaseManPowerYearlyInfo> man_power_count_yearly;

	@Column(name = "activeIoNumber")
	private String activeIoNumber;

}

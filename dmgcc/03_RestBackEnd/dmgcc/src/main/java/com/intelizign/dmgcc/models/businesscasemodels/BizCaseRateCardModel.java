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
import org.hibernate.envers.NotAudited;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.intelizign.dmgcc.pojoclass.RateCardBusinessDays;
import com.intelizign.dmgcc.pojoclass.bizcase.BizCaseManPowerYearlyInfo;
import com.intelizign.dmgcc.pojoclass.bizcase.BizRateCardYearlyBasedCalculation;
import com.intelizign.dmgcc.request.bizcase.SubModel;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;

@Entity
@Table(name = "biz_case_rate_card")
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
public class BizCaseRateCardModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, updatable = false)
	private long id;

	@Column(name = "project_name")
	private String project_name;

	@Column(name = "start_date")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate business_case_start_date;

	@Column(name = "end_date")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate business_case_end_date;

	@NotAudited
	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<SubModel> bizit_info;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<SubModel> bizfacility;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<SubModel> bizsystem_access;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<SubModel> bizthirdparty_cost;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<SubModel> bizthirdparty_service;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<SubModel> biztravel_cost;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<SubModel> bizother_cost;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<SubModel> finance_manpower_cost;

	@Column(name = "manpower_inflation")
	private Double manpower_inflation;

	@Column(name = "requirement_cost")
	private Integer requirement_cost;

	@Column(name = "thirdparty_cost")
	private Integer thirdparty_cost;

	@Column(name = "manpower_total_cost")
	private Integer manpower_total_cost;

	@Column(name = "it_cost")
	private Integer it_cost;

	@Column(name = "facility_cost")
	private Integer facility_cost;

	@Column(name = "travel_cost")
	private Integer travel_cost;

	@Column(name = "system_access_cost")
	private Integer system_access_cost;

	@Column(name = "thirdparty_service_cost")
	private Integer thirdparty_service_cost;

	@Column(name = "manpower_other_cost")
	private Integer manpower_other_cost;

	@Column(name = "non_manpower_total_cost")
	private Integer non_manpower_total_cost;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<RateCardBusinessDays> business_days;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<BizCaseManPowerYearlyInfo> man_power_count_yearly;

	@Column(name = "idle_value")
	private Double idle_value = 0.0;

	@Column(name = "markup_value")
	private Double markup_value;

	@Column(name = "fx_risk")
	private Double fx_risk;

	@Column(name = "wht_value")
	private Double wht_value;

	@Column(name = "total_markup_value")
	private Double total_markup_value;

	@Column(name = "total_fx_risk")
	private Double total_fx_risk;

	@Column(name = "total_wht_value")
	private Double total_wht_value;

	@Column(name = "inflation_value")
	private Double inflation_value;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<SubModel> other_costs;

	@Column(name = "total_other_cost")
	private Integer total_other_cost;

	@Column(name = "total_yearly_cost")
	private Double total_yearly_cost;

	@Column(name = "hourly_rate")
	private Double hourly_rate;

	@Column(name = "rate_card_type")
	private String rate_card_type;

	@Column(name = "is_existing_ratecard")
	private Boolean is_existing_ratecard;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<String> bizcase_yearly_information;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<BizRateCardYearlyBasedCalculation> yearlybasedcalculations;

	@OneToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "biz_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonBackReference
	private BusinessCaseRequest bizcase;

	public BizCaseRateCardModel() {
		super();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Boolean getIs_existing_ratecard() {
		return is_existing_ratecard;
	}

	public void setIs_existing_ratecard(Boolean is_existing_ratecard) {
		this.is_existing_ratecard = is_existing_ratecard;
	}

	public Integer getManpower_other_cost() {
		return manpower_other_cost;
	}

	public void setManpower_other_cost(Integer manpower_other_cost) {
		this.manpower_other_cost = manpower_other_cost;
	}

	public Integer getThirdparty_service_cost() {
		return thirdparty_service_cost;
	}

	public void setThirdparty_service_cost(Integer thirdparty_service_cost) {
		this.thirdparty_service_cost = thirdparty_service_cost;
	}

	public List<String> getBizcase_yearly_information() {
		return bizcase_yearly_information;
	}

	public void setBizcase_yearly_information(List<String> bizcase_yearly_information) {
		this.bizcase_yearly_information = bizcase_yearly_information;
	}

	public List<SubModel> getBizit_info() {
		return bizit_info;
	}

	public void setBizit_info(List<SubModel> bizit_info) {
		this.bizit_info = bizit_info;
	}

	public List<SubModel> getBizfacility() {
		return bizfacility;
	}

	public void setBizfacility(List<SubModel> bizfacility) {
		this.bizfacility = bizfacility;
	}

	public List<SubModel> getBizsystem_access() {
		return bizsystem_access;
	}

	public void setBizsystem_access(List<SubModel> bizsystem_access) {
		this.bizsystem_access = bizsystem_access;
	}

	public List<SubModel> getBizthirdparty_cost() {
		return bizthirdparty_cost;
	}

	public void setBizthirdparty_cost(List<SubModel> bizthirdparty_cost) {
		this.bizthirdparty_cost = bizthirdparty_cost;
	}

	public List<SubModel> getBizthirdparty_service() {
		return bizthirdparty_service;
	}

	public void setBizthirdparty_service(List<SubModel> bizthirdparty_service) {
		this.bizthirdparty_service = bizthirdparty_service;
	}

	public List<SubModel> getBiztravel_cost() {
		return biztravel_cost;
	}

	public void setBiztravel_cost(List<SubModel> biztravel_cost) {
		this.biztravel_cost = biztravel_cost;
	}

	public List<SubModel> getBizother_cost() {
		return bizother_cost;
	}

	public void setBizother_cost(List<SubModel> bizother_cost) {
		this.bizother_cost = bizother_cost;
	}

	public List<SubModel> getFinance_manpower_cost() {
		return finance_manpower_cost;
	}

	public void setFinance_manpower_cost(List<SubModel> finance_manpower_cost) {
		this.finance_manpower_cost = finance_manpower_cost;
	}

	public Double getManpower_inflation() {
		return manpower_inflation;
	}

	public void setManpower_inflation(Double manpower_inflation) {
		this.manpower_inflation = manpower_inflation;
	}

	public Double getIdle_value() {
		return idle_value;
	}

	public void setIdle_value(Double idle_value) {
		this.idle_value = idle_value;
	}

	public List<BizCaseManPowerYearlyInfo> getMan_power_count_yearly() {
		return man_power_count_yearly;
	}

	public void setMan_power_count_yearly(List<BizCaseManPowerYearlyInfo> man_power_count_yearly) {
		this.man_power_count_yearly = man_power_count_yearly;
	}

	public String getRate_card_type() {
		return rate_card_type;
	}

	public void setRate_card_type(String rate_card_type) {
		this.rate_card_type = rate_card_type;
	}

	public Double getHourly_rate() {
		return hourly_rate;
	}

	public void setHourly_rate(Double hourly_rate) {
		this.hourly_rate = hourly_rate;
	}

	public String getProject_name() {
		return project_name;
	}

	public void setProject_name(String project_name) {
		this.project_name = project_name;
	}

	public LocalDate getBusiness_case_start_date() {
		return business_case_start_date;
	}

	public void setBusiness_case_start_date(LocalDate business_case_start_date) {
		this.business_case_start_date = business_case_start_date;
	}

	public LocalDate getBusiness_case_end_date() {
		return business_case_end_date;
	}

	public void setBusiness_case_end_date(LocalDate business_case_end_date) {
		this.business_case_end_date = business_case_end_date;
	}

	public Integer getRequirement_cost() {
		return requirement_cost;
	}

	public void setRequirement_cost(Integer requirement_cost) {
		this.requirement_cost = requirement_cost;
	}

	public Integer getThirdparty_cost() {
		return thirdparty_cost;
	}

	public void setThirdparty_cost(Integer thirdparty_cost) {
		this.thirdparty_cost = thirdparty_cost;
	}

	public Integer getManpower_total_cost() {
		return manpower_total_cost;
	}

	public void setManpower_total_cost(Integer manpower_total_cost) {
		this.manpower_total_cost = manpower_total_cost;
	}

	public Integer getIt_cost() {
		return it_cost;
	}

	public void setIt_cost(Integer it_cost) {
		this.it_cost = it_cost;
	}

	public Integer getFacility_cost() {
		return facility_cost;
	}

	public void setFacility_cost(Integer facility_cost) {
		this.facility_cost = facility_cost;
	}

	public Integer getTravel_cost() {
		return travel_cost;
	}

	public void setTravel_cost(Integer travel_cost) {
		this.travel_cost = travel_cost;
	}

	public Integer getSystem_access_cost() {
		return system_access_cost;
	}

	public void setSystem_access_cost(Integer system_access_cost) {
		this.system_access_cost = system_access_cost;
	}

	public Integer getNon_manpower_total_cost() {
		return non_manpower_total_cost;
	}

	public void setNon_manpower_total_cost(Integer non_manpower_total_cost) {
		this.non_manpower_total_cost = non_manpower_total_cost;
	}

	public List<RateCardBusinessDays> getBusiness_days() {
		return business_days;
	}

	public void setBusiness_days(List<RateCardBusinessDays> business_days) {
		this.business_days = business_days;
	}

	public Double getMarkup_value() {
		return markup_value;
	}

	public void setMarkup_value(Double markup_value) {
		this.markup_value = markup_value;
	}

	public Double getFx_risk() {
		return fx_risk;
	}

	public void setFx_risk(Double fx_risk) {
		this.fx_risk = fx_risk;
	}

	public Double getWht_value() {
		return wht_value;
	}

	public void setWht_value(Double wht_value) {
		this.wht_value = wht_value;
	}

	public Double getInflation_value() {
		return inflation_value;
	}

	public void setInflation_value(Double inflation_value) {
		this.inflation_value = inflation_value;
	}

	public List<SubModel> getOther_costs() {
		return other_costs;
	}

	public void setOther_costs(List<SubModel> other_costs) {
		this.other_costs = other_costs;
	}

	public Integer getTotal_other_cost() {
		return total_other_cost;
	}

	public void setTotal_other_cost(Integer total_other_cost) {
		this.total_other_cost = total_other_cost;
	}

	public Double getTotal_yearly_cost() {
		return total_yearly_cost;
	}

	public void setTotal_yearly_cost(Double total_yearly_cost) {
		this.total_yearly_cost = total_yearly_cost;
	}

	public List<BizRateCardYearlyBasedCalculation> getYearlybasedcalculations() {
		return yearlybasedcalculations;
	}

	public void setYearlybasedcalculations(List<BizRateCardYearlyBasedCalculation> yearlybasedcalculations) {
		this.yearlybasedcalculations = yearlybasedcalculations;
	}

	public BusinessCaseRequest getBizcase() {
		return bizcase;
	}

	public void setBizcase(BusinessCaseRequest bizcase) {
		this.bizcase = bizcase;
	}

	public Double getTotal_markup_value() {
		return total_markup_value;
	}

	public void setTotal_markup_value(Double total_markup_value) {
		this.total_markup_value = total_markup_value;
	}

	public Double getTotal_fx_risk() {
		return total_fx_risk;
	}

	public void setTotal_fx_risk(Double total_fx_risk) {
		this.total_fx_risk = total_fx_risk;
	}

	public Double getTotal_wht_value() {
		return total_wht_value;
	}

	public void setTotal_wht_value(Double total_wht_value) {
		this.total_wht_value = total_wht_value;
	}

}

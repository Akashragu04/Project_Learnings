package com.intelizign.dmgcc.services;

import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.intelizign.dmgcc.models.JDMappingModel;
import com.intelizign.dmgcc.models.ProjectModel;
import com.intelizign.dmgcc.models.businesscasemodels.BizCaseSetupModel;
import com.intelizign.dmgcc.models.businesscasemodels.BusinessCaseRequest;
import com.intelizign.dmgcc.pojoclass.JDRampupModel;
import com.intelizign.dmgcc.pojoclass.JDRampupProperties;
import com.intelizign.dmgcc.pojoclass.bizcase.BizCaseSetupITAndFac;
import com.intelizign.dmgcc.repositories.BizCaseRequestRepository;
import com.intelizign.dmgcc.repositories.BizCaseSetupRepository;
import com.intelizign.dmgcc.repositories.JDMappingRepository;
import com.intelizign.dmgcc.repositories.ProjectRepository;
import com.intelizign.dmgcc.request.bizcase.SubModel;
import com.intelizign.dmgcc.response.JDHiredResponse;
import com.intelizign.dmgcc.response.JDMappingUpdation;
import com.intelizign.dmgcc.response.JdMappingDetails;
import com.intelizign.dmgcc.response.JdMappingDetails.JDProperties;
import com.intelizign.dmgcc.response.ResponseHandler;

@Service
@Transactional
public class BusinessSetupService {

	@Autowired
	ProjectRepository projectRepository;

	@Autowired
	JDMappingRepository jdmappingRepository;

	@Autowired
	BizCaseSetupRepository bizCaseSetupRepository;

	@Autowired
	BizCaseRequestRepository bizcasereqrepo;

	public final Logger LOGGER = LogManager.getLogger(BusinessSetupService.class);

	private static final DecimalFormat doubleFormat = new DecimalFormat("0.00");

	public Integer getAverageOfOverallData(List<SubModel> submodules) {
		Integer overalldata = 0;
		for (SubModel department : submodules) {
			if (!department.getQuantity().isBlank() || !department.getQuantity().isEmpty()) {
				overalldata += Integer.valueOf(department.getQuantity());
			} else {
				overalldata += 0;
			}
		}
		return overalldata;
	}

	public Double getAverageOfUpdatedData(List<BizCaseSetupITAndFac> submodules, Integer itinfo) {
		Integer overalldata = 0;
		for (BizCaseSetupITAndFac department : submodules) {
			overalldata += department.getQuantity().intValue();
		}
		if (itinfo != 0) {
			return Double.parseDouble(doubleFormat.format(((double) overalldata / itinfo) * 100));
		}

		return (double) 0;
	}

	public Double getTotalAverage(Double it, Double faclity, Double HR, Double system, Double third_cost,
			Double third_service, BizCaseSetupModel bizCaseSetupdata) {
		double total = it + faclity + HR + system + third_cost + third_service;

		// get active submodule count
		List<Double> subModuleAverage = getActiveSubModuleCount(bizCaseSetupdata);

		// calculating average only updated bizcase setup
//		List<Double> subModuleAverage = Arrays.asList(it, faclity, HR, system, third_cost, third_service);

		Long updatedSubmodule = subModuleAverage.stream().filter(submodule -> submodule > 0d).count();

		return Double.parseDouble(doubleFormat.format(total / (updatedSubmodule + 1)));
	}

	private List<Double> getActiveSubModuleCount(BizCaseSetupModel bizCaseSetupdata) {

		// storing submodule information in list

		List<Double> subModuleAverage = new ArrayList<>();

		List<List<SubModel>> listOfSubModule = Arrays.asList(bizCaseSetupdata.getIt_info(),
				bizCaseSetupdata.getFacility_info(), bizCaseSetupdata.getSystem_access_info(),
				bizCaseSetupdata.getThird_party_cost_info(), bizCaseSetupdata.getThird_party_services_info());

		listOfSubModule.stream().forEach(submodule -> {
			Long totalCount = submodule.stream().mapToLong(currentproperty -> Long.valueOf(currentproperty.getCost()))
					.sum();
			subModuleAverage.add(Double.valueOf(totalCount));
		});

		return subModuleAverage;
	}

	public ResponseEntity<Object> bizcaseinfobyprojectid(Long projectid) {
		try {
			Optional<ProjectModel> project = projectRepository.findById(projectid);
			if (project.isPresent()) {
				BizCaseSetupModel bizCaseSetupdata = bizCaseSetupRepository
						.getBusinessSetupdetail(project.get().getBizcase().getId());
				return ResponseHandler.generateResponse("Business Setup All department Average Performance Infromation",
						true, HttpStatus.OK, bizCaseSetupdata);
			}

			else {
				LOGGER.error("Exceptions happen!: " + projectid + " ProjectID Doesn't exist");
				return ResponseHandler.generateResponse(" ProjectID Doesn't exist", false, HttpStatus.OK, null);
			}

		} catch (Exception ex) {
			LOGGER.error("Internal Server Error while get by bizcase_id: " + ex.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	public List<JdMappingDetails> getJDMappingInfo(BusinessCaseRequest bizdata) {
		List<JdMappingDetails> jd_mapping_details = new ArrayList<>();
		List<JDMappingModel> all_jddata = jdmappingRepository.findJDByBizCaseId(bizdata.getId());
		if (bizdata.getJdmappingrampup() != null) {
			List<JDRampupModel> jdrampups = bizdata.getJdmappingrampup();
			for (JDRampupModel jdrampup : jdrampups) {
				JdMappingDetails jd_data = new JdMappingDetails();
				jd_data.setBiz_id(bizdata.getId());
				jd_data.setLevel(jdrampup.getLevel());
				jd_data.setTotal(jdrampup.getTotal());
				jd_data.setTaleo_properties(
						getPropertiesforTaleo(jdrampup.getProperties(), jdrampup.getLevel(), all_jddata));
				jd_data.setManual_properties(
						getPropertiesforManual(jdrampup.getProperties(), jdrampup.getLevel(), all_jddata));

				Long hr_total = (long) 0;
				for (JDProperties jdprops : getPropertiesforManual(jdrampup.getProperties(), jdrampup.getLevel(),
						all_jddata)) {
					if (!jdprops.getActual().isBlank() || !jdprops.getActual().isEmpty())
						hr_total += Long.valueOf(jdprops.getActual());
				}
				for (JDProperties jdprops : getPropertiesforTaleo(jdrampup.getProperties(), jdrampup.getLevel(),
						all_jddata)) {
					if (!jdprops.getActual().isBlank() || !jdprops.getActual().isEmpty())
						hr_total += Long.valueOf(jdprops.getActual());
				}
				jd_data.setHired_total(hr_total);
				jd_mapping_details.add(jd_data);
			}
		}
		return jd_mapping_details;
	}

	public List<JDProperties> getPropertiesforTaleo(List<JDRampupProperties> jdproperties, String level,
			List<JDMappingModel> all_jddata) {
		List<JDProperties> properties = new ArrayList<>();
		for (JDRampupProperties jdproperty : jdproperties) {
			JDProperties jd_rampup_props = new JDProperties();
			jd_rampup_props.setMonth(jdproperty.getProperty_name());
			jd_rampup_props.setPlan(jdproperty.getProperty_value());
			jd_rampup_props.setActual(getAcutalforJD(level, jdproperty.getProperty_name(), "TALEO", all_jddata));
			jd_rampup_props.setStatus_color(
					getStatusColour(jd_rampup_props.getPlan(), level, jd_rampup_props.getMonth(), all_jddata));
			properties.add(jd_rampup_props);
		}

		return properties;
	}

	public List<JDProperties> getPropertiesforManual(List<JDRampupProperties> jdproperties, String level,
			List<JDMappingModel> all_jddata) {
		List<JDProperties> properties = new ArrayList<>();
		for (JDRampupProperties jdproperty : jdproperties) {
			JDProperties jd_rampup_props = new JDProperties();
			jd_rampup_props.setMonth(jdproperty.getProperty_name());
			jd_rampup_props.setPlan(jdproperty.getProperty_value());

			jd_rampup_props.setActual(getAcutalforJD(level, jdproperty.getProperty_name(), "INTERNAL", all_jddata));

			properties.add(jd_rampup_props);
		}

		return properties;
	}

	public String getAcutalforJD(String level, String month, String hired_by, List<JDMappingModel> all_jddata) {
		switch (hired_by) {
		case "TALEO":
			return getCalculatedActuals(level, month, hired_by, all_jddata);
		case "INTERNAL":
			return getCalculatedActuals(level, month, hired_by, all_jddata);
		default:
			return "";
		}

	}

	public String getCalculatedActuals(String level, String month, String hired_by, List<JDMappingModel> all_jddata) {
		List<JDMappingModel> jddata = all_jddata.stream()
				.filter(data -> data.getLevel().equals(level) && data.getMonthandyear().equals(month)).toList();

		List<JDHiredResponse> actual = new ArrayList<>();
		if (jddata != null) {
			jddata.stream().forEach(jd -> {
				List<JDHiredResponse> filterd_data = jd.getHired_details().stream()
						.filter(hired_details -> hired_details.getUpdated_by().equals(hired_by)
								&& hired_details.getStatus().equals("Onboard"))
						.toList();
				actual.addAll(filterd_data);
			});

		}
		if (!actual.isEmpty())
			return String.valueOf(actual.size());
		else
			return "";

	}

	public String getStatusColour(String plan, String level, String month, List<JDMappingModel> all_jddata) {
		List<JDMappingModel> jddata = all_jddata.stream()
				.filter(data -> data.getLevel().equals(level) && data.getMonthandyear().equals(month)).toList();
		List<JDHiredResponse> actual = new ArrayList<>();

		if (jddata != null) {
			jddata.stream().forEach(jd -> {
				List<JDHiredResponse> filterd_data = jd.getHired_details().stream()
						.filter(hireddata -> hireddata.getStatus().equals("Onboard")).toList();
				actual.addAll(filterd_data);
			});

		}

		if (!actual.isEmpty()) {
			if (plan.equals(String.valueOf(actual.size()))) {
				return "Green";
			} else
				return "Yellow";
		} else {
			return "Yellow";
		}
	}

	public List<JDMappingUpdation> getUnHiredJD(List<String> months_by_level, String level, Long biz_id) {
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("MMM-yyyy", Locale.ENGLISH);
		List<String> sorted_months = months_by_level.stream().map(s -> YearMonth.parse(s, dtf)).sorted()
				.map(dtf::format).toList();
		List<JDMappingUpdation> hired_data = new ArrayList<>();
		for (String month : sorted_months) {
			List<JDMappingModel> jdMapping = jdmappingRepository.findJDByLevelAndMonth(level, month, biz_id);

			if (!jdMapping.isEmpty()) {
				for (JDMappingModel jd_data : jdMapping) {
					for (JDHiredResponse jd_hired_data : jd_data.getHired_details()) {

						if (!jd_hired_data.getStatus().equals("Onboard")) {
							JDMappingUpdation jd_response = new JDMappingUpdation();
							jd_response.setJd_id(jd_data.getId());
							jd_response.setStatus_id(jd_hired_data.getId());
							jd_response.setMonthandyear(jd_data.getMonthandyear());
							jd_response.setPosition_code(jd_data.getPosition_code());
							jd_response.setLevel(jd_data.getLevel());
							jd_response.setStatus(jd_hired_data.getStatus());
							jd_response.setUpdated_by(jd_hired_data.getUpdated_by());
							hired_data.add(jd_response);
						}

					}
				}
			}
		}
		return hired_data;
	}

	public List<JDMappingModel> updateHireJDbyInternal(List<JDMappingUpdation> hired_data) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM");
		LocalDate today_Date = LocalDate.now();
		String current_month = today_Date.format(formatter).substring(0, 3);
		int current_year = today_Date.getYear();

		String current_onboard_date = current_month + "-" + current_year;

		List<JDMappingModel> updated_jd = new ArrayList<>();

		hired_data.stream().forEach(jd_response -> {
			Optional<JDMappingModel> opt_jd_data = jdmappingRepository.findById(jd_response.getJd_id());

			if (opt_jd_data.isPresent()) {
				JDMappingModel jd_data = opt_jd_data.get();
				BusinessCaseRequest bizdata = jd_data.getRequest();
				if (!jd_data.getRequest().getIsbizcasesetup()) {
					bizdata.setIsbizcasesetup(true);
					bizcasereqrepo.save(bizdata);
				}

				jd_data.getHired_details().stream().forEach(hired_jd -> {
					if (hired_jd.getId().equals(jd_response.getStatus_id())) {
						hired_jd.setStatus(jd_response.getStatus());
						if (jd_response.getStatus().equalsIgnoreCase("Onboard")) {
							jd_data.setActualmonthandyear(current_onboard_date);
						}
						hired_jd.setUpdated_by(jd_response.getUpdated_by());

						updated_jd.add(jd_data);
					}
				});
			}

		});
		// hr average updation
		Optional<JDMappingModel> opt_jd_data = jdmappingRepository.findById(hired_data.get(0).getJd_id());
		if (opt_jd_data.isPresent()) {
			BusinessCaseRequest bizdata = opt_jd_data.get().getRequest();
			getHRAverage(bizdata);
		}

		return updated_jd;

	}

	public void getHRAverage(BusinessCaseRequest bizdata) {
		List<JdMappingDetails> jdinfo = getJDMappingInfo(bizdata);
		Double total = 0d;
		Double hired = 0d;
		if (!jdinfo.isEmpty()) {
			for (JdMappingDetails jd_data : jdinfo) {
				total += Double.parseDouble(jd_data.getTotal());
				hired += Double.parseDouble(jd_data.getHired_total().toString());
			}

		}
		Double hr_average = hired / total;
		BizCaseSetupModel bizcase_setup = new BizCaseSetupModel();
		if (bizdata.getBizcasesetup() != null) {
			bizcase_setup = bizdata.getBizcasesetup();
		} else {
			bizcase_setup.setBizcase(bizdata);
			bizcase_setup.setIt_data(getBizcaseSetupData(bizdata.getIt_info()));
			bizcase_setup.setFacility_data(getBizcaseSetupData(bizdata.getFacility()));
			bizcase_setup.setSystem_access_data(getBizcaseSetupData(bizdata.getSystem_access()));
			bizcase_setup.setThird_party_cost_data(getBizcaseSetupData(bizdata.getThirdparty_cost()));
			bizcase_setup.setThird_party_services_data(getBizcaseSetupData(bizdata.getThirdparty_service()));

		}
		if (hr_average > 99.8d || hr_average == 100d)
			bizcase_setup.setManpower_hiring_completed_date(LocalDate.now());
		bizcase_setup.setIt_info(bizdata.getIt_info());
		bizcase_setup.setFacility_info(bizdata.getFacility());
		bizcase_setup.setSystem_access_info(bizdata.getSystem_access());
		bizcase_setup.setThird_party_cost_info(bizdata.getThirdparty_cost());
		bizcase_setup.setThird_party_services_info(bizdata.getThirdparty_service());
		bizcase_setup.setHr_average(Double.valueOf(doubleFormat.format(hr_average * 100)));
		bizcase_setup.setTotal_average(Double.valueOf(doubleFormat.format(getTotalAverage(bizcase_setup.getIt_average(),
				bizcase_setup.getFacility_average(), bizcase_setup.getHr_average(),
				bizcase_setup.getSystem_access_average(), bizcase_setup.getThird_party_cost_average(),
				bizcase_setup.getThird_party_services_average(), bizcase_setup))));

		bizCaseSetupRepository.save(bizcase_setup);

	}

	public List<BizCaseSetupITAndFac> getBizcaseSetupData(List<SubModel> submodules) {
		List<BizCaseSetupITAndFac> bizcasesetup_subdatas = new ArrayList<>();
		if (!submodules.isEmpty()) {
			submodules.stream().forEach(subdata -> {
				BizCaseSetupITAndFac bizcasesetup_subdata = new BizCaseSetupITAndFac();
				bizcasesetup_subdata.setBusiness_year(subdata.getBusiness_year());
				bizcasesetup_subdata.setCost(0l);
				bizcasesetup_subdata.setCost_type(subdata.getCost_type());
				bizcasesetup_subdata.setQuantity(0l);
				bizcasesetup_subdata.setRemaining_quantity(0l);
				bizcasesetup_subdata.setDescription(subdata.getDescription());
				bizcasesetup_subdatas.add(bizcasesetup_subdata);
			});
		}
		return bizcasesetup_subdatas;

	}

}

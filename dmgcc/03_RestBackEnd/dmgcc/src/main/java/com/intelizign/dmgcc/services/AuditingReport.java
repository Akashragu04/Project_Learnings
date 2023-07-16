package com.intelizign.dmgcc.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.validation.Valid;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.envers.AuditReader;
import org.hibernate.envers.query.AuditEntity;
import org.hibernate.envers.query.AuditQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.intelizign.dmgcc.models.LeadRequestModel;
import com.intelizign.dmgcc.models.businesscasemodels.BusinessCaseRequest;
import com.intelizign.dmgcc.repositories.BizCaseRequestRepository;
import com.intelizign.dmgcc.response.HrRampupIteration;
import com.intelizign.dmgcc.response.ManPowerRamupIteration;
import com.intelizign.dmgcc.response.RampupITerationResponse;
import com.intelizign.dmgcc.response.ResponseHandler;

@Service
public class AuditingReport {

	@Autowired
	private AuditReader auditReader;

	@Autowired
	private BizCaseRequestRepository bizcasereqrepo;

	public final Logger LOGGER = LogManager.getLogger(AuditingReport.class);

	public void findactiveration(String active_iteration, String active_iteration_section,
			@Valid BusinessCaseRequest submitbizcase, Long reqid, LeadRequestModel lead_data) {

		AuditQuery auditQuery = null;

		auditQuery = auditReader.createQuery().forRevisionsOfEntityWithChanges(BusinessCaseRequest.class, true);
		auditQuery.add(AuditEntity.id().eq(reqid));

		int hr_sequence = 0;
		int mp_sequence = 0;
		List<Object[]> raw_results = auditQuery.getResultList();
		for (Object[] data : raw_results) {
			Object resultsdata = data[0];
			Object operation = data[2];
			Set<String> columnData = (Set<String>) data[3];
			String dataCheck = operation.toString();
			if (dataCheck.equals("ADD")) {
				hr_sequence++;
				mp_sequence++;
				if (active_iteration_section.equalsIgnoreCase("HR")
						&& active_iteration.equalsIgnoreCase("HR_Iteration_" + hr_sequence)) {
					BusinessCaseRequest auditdata = (BusinessCaseRequest) resultsdata;
					submitbizcase.setRampups(auditdata.getHr_rampups());
					submitbizcase.setLead(lead_data);
					bizcasereqrepo.save(submitbizcase);
				} else if (active_iteration_section.equalsIgnoreCase("ManPower")
						&& active_iteration.equalsIgnoreCase("ManPower_Iteration_" + mp_sequence)) {
					BusinessCaseRequest auditdata = (BusinessCaseRequest) resultsdata;
					submitbizcase.setRampups(auditdata.getRampups());
					submitbizcase.setLead(lead_data);
					bizcasereqrepo.save(submitbizcase);
				}

			} else if (dataCheck.equals("MOD")) {
				for (String column : columnData) {
					if (column.equalsIgnoreCase("hr_rampups")) {
						hr_sequence++;
						if (active_iteration_section.equalsIgnoreCase("HR")
								&& active_iteration.equalsIgnoreCase("HR_Iteration_" + hr_sequence)) {
							BusinessCaseRequest auditdata = (BusinessCaseRequest) resultsdata;
							submitbizcase.setRampups(auditdata.getHr_rampups());
							submitbizcase.setLead(lead_data);
							bizcasereqrepo.save(submitbizcase);
						}
					} else if (column.equalsIgnoreCase("rampups")) {
						mp_sequence++;
						if (active_iteration_section.equalsIgnoreCase("ManPower")
								&& active_iteration.equalsIgnoreCase("ManPower_Iteration_" + mp_sequence)) {
							BusinessCaseRequest auditdata = (BusinessCaseRequest) resultsdata;
							submitbizcase.setRampups(auditdata.getRampups());
							submitbizcase.setLead(lead_data);
							bizcasereqrepo.save(submitbizcase);
						}
					}
				}
			}
		}
	}

	public ResponseEntity<Object> findIterationReport(Long id) {
		AuditQuery auditQuery = null;

		LOGGER.info("Enter into Auditing Query");
		auditQuery = auditReader.createQuery().forRevisionsOfEntityWithChanges(BusinessCaseRequest.class, true);
		LOGGER.info("Got Auditing Query 1");
		LOGGER.info("Biz Case ID:" + id);
		auditQuery.add(AuditEntity.id().eq(id));

		LOGGER.info("Got Auditing Query 2");
		RampupITerationResponse finalresponcedata = new RampupITerationResponse();
		List<HrRampupIteration> HRData = new ArrayList<>();
		List<ManPowerRamupIteration> MPData = new ArrayList<>();
		int overallsequence = 1;
		int hr_sequence = 0;
		int mp_sequence = 0;

		List<Object[]> raw_results = auditQuery.getResultList();
		LOGGER.info(raw_results);
		for (Object[] data : raw_results) {
			Object resultsdata = data[0];
			Object operation = data[2];
			Set<String> columnData = (Set<String>) data[3];
			String dataCheck = operation.toString();
			BusinessCaseRequest auditdata = (BusinessCaseRequest) resultsdata;
			if (dataCheck.equals("ADD")) {
				mp_sequence++;
				ManPowerRamupIteration manpoweriterationdata = new ManPowerRamupIteration();
				manpoweriterationdata.setOverall_Iteration("Iteration " + overallsequence);
				manpoweriterationdata.setManpower_Iteration("ManPower_Iteration_" + mp_sequence);
				manpoweriterationdata.setManpower_label("Business Manager Iteration " + mp_sequence);
				manpoweriterationdata.setManpower_Rampups(auditdata.getRampups());
				MPData.add(manpoweriterationdata);
			} else if (dataCheck.equals("MOD")) {
				for (String column : columnData) {
					if (column.equalsIgnoreCase("hr_rampups")) {
						hr_sequence++;
						HrRampupIteration hriterationdata = new HrRampupIteration();
						hriterationdata.setId(overallsequence);
						hriterationdata.setOverall_Iteration("Iteration " + overallsequence);
						hriterationdata.setHr_Iteration("HR_Iteration_" + hr_sequence);
						hriterationdata.setHr_label("HR Iteration " + hr_sequence);
						hriterationdata.setHr_rampups(auditdata.getHr_rampups());
						HRData.add(hriterationdata);
					} else if (column.equalsIgnoreCase("rampups")) {
						mp_sequence++;
						ManPowerRamupIteration manpoweriterationdata = new ManPowerRamupIteration();
						manpoweriterationdata.setId(overallsequence);
						manpoweriterationdata.setOverall_Iteration("Iteration " + overallsequence);
						manpoweriterationdata.setManpower_Iteration("ManPower_Iteration_" + mp_sequence);
						manpoweriterationdata.setManpower_label("Business Manager Iteration " + mp_sequence);
						manpoweriterationdata.setManpower_Rampups(auditdata.getRampups());
						MPData.add(manpoweriterationdata);
					}
				}
			}
			overallsequence++;
		}
		finalresponcedata.setManPowerIteration(MPData);
		finalresponcedata.setHrIteration(HRData);
		return ResponseHandler.generateResponse("Successfully retrived revision data!", true, HttpStatus.OK,
				finalresponcedata);

	}

	public BusinessCaseRequest SetIterationLevel(Long biz_id, Long iteration_id) {
		AuditQuery auditQuery = null;

		auditQuery = auditReader.createQuery().forRevisionsOfEntityWithChanges(BusinessCaseRequest.class, true);
		auditQuery.add(AuditEntity.id().eq(biz_id));

		return null;
	}

	public ResponseEntity<Object> findBizCasePreviewIterationReport(Long id) {
		AuditQuery auditQuery = null;

		auditQuery = auditReader.createQuery().forRevisionsOfEntityWithChanges(BusinessCaseRequest.class, true);
		auditQuery.add(AuditEntity.id().eq(id));

		List<ManPowerRamupIteration> MPData = new ArrayList<>();
		int sequence = 0;
		int overallsequence = 1;

		List<Object[]> raw_results = auditQuery.getResultList();
		for (Object[] data : raw_results) {
			Object resultsdata = data[0];
			Set<String> columnData = (Set<String>) data[3];
			BusinessCaseRequest auditdata = (BusinessCaseRequest) resultsdata;
			for (String column : columnData) {
				if (column.equalsIgnoreCase("bizcasereport")) {
					sequence++;
					ManPowerRamupIteration manpoweriterationdata = new ManPowerRamupIteration();
					manpoweriterationdata.setId(overallsequence);
					manpoweriterationdata.setOverall_Iteration("Iteration " + sequence);
					MPData.add(manpoweriterationdata);
				}
			}
			overallsequence++;

		}
		return ResponseHandler.generateResponse("List of Iteration", true, HttpStatus.OK, MPData);

	}

	public ResponseEntity<Object> findIterationbizcaseReport(Long id, int iteration_id) {
		AuditQuery auditQuery = null;

		auditQuery = auditReader.createQuery().forRevisionsOfEntityWithChanges(BusinessCaseRequest.class, true);
		auditQuery.add(AuditEntity.id().eq(id));

		int sequence = 1;
		List<Object[]> raw_results = auditQuery.getResultList();
		for (Object[] data : raw_results) {
			Object resultsdata = data[0];
			Set<String> columnData = (Set<String>) data[3];
			for (String column : columnData) {
				if (column.equalsIgnoreCase("bizcasereport") && sequence == iteration_id) {
					BusinessCaseRequest auditdata = (BusinessCaseRequest) resultsdata;
					return ResponseHandler.generateResponse("Business Case Report", true, HttpStatus.OK,
							auditdata.getBizcasereport());
				}

			}

			sequence++;

		}
		return ResponseHandler.generateResponse("Invalid Iteration ID", false, HttpStatus.OK, null);

	}

	public ManPowerRamupIteration findActiveIterationbizcase(Long id, int iteration_id) {
		AuditQuery auditQuery = null;

		auditQuery = auditReader.createQuery().forRevisionsOfEntityWithChanges(BusinessCaseRequest.class, true);
		auditQuery.add(AuditEntity.id().eq(id));

		int sequence = 1;
		List<Object[]> raw_results = auditQuery.getResultList();
		for (Object[] data : raw_results) {
			Object resultsdata = data[0];
			Set<String> columnData = (Set<String>) data[3];
			for (String column : columnData) {
				if (column.equalsIgnoreCase("bizcasereport") && sequence == iteration_id) {
					ObjectMapper mapper = JsonMapper.builder().addModule(new JavaTimeModule()).build();
					BusinessCaseRequest auditdata = mapper.convertValue(resultsdata, BusinessCaseRequest.class);

					ManPowerRamupIteration manpoweriterationdata = new ManPowerRamupIteration();
					manpoweriterationdata.setId(iteration_id);
					manpoweriterationdata.setOverall_Iteration("Iteration " + iteration_id);
					manpoweriterationdata.setBusiness_case_start_date(auditdata.getBusiness_case_start_date());
					manpoweriterationdata.setBusiness_case_end_date(auditdata.getBusiness_case_end_date());
					manpoweriterationdata.setManpower_hiringcost(auditdata.getManpower_hiringcost());
					manpoweriterationdata.setManpower_requirements(auditdata.getManpower_requirements());
					manpoweriterationdata.setManpower_Rampups(auditdata.getRampups());
					manpoweriterationdata.setCustomer_rampdown(auditdata.getCustomer_rampdown());
					manpoweriterationdata.setRate_card_inflation(auditdata.getRate_card_inflation());
					manpoweriterationdata.setManpower_inflation(auditdata.getManpower_inflation());
					manpoweriterationdata.setIs_customer_rampdown(auditdata.getIs_customer_rampdown());
					manpoweriterationdata.setBizcasereport(auditdata.getBizcasereport());
					return manpoweriterationdata;
				}

			}

			sequence++;

		}
		return null;

	}

}

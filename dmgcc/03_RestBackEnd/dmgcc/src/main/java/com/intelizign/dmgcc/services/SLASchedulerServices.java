package com.intelizign.dmgcc.services;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import javax.transaction.Transactional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;

import com.intelizign.dmgcc.models.ProjectModel;
import com.intelizign.dmgcc.models.SLAModel;
import com.intelizign.dmgcc.models.SLAPreInvoiceModel;
import com.intelizign.dmgcc.repositories.ProjectRepository;
import com.intelizign.dmgcc.repositories.SLAPreInvoiceRepository;
import com.intelizign.dmgcc.repositories.SLARepository;

@Service
public class SLASchedulerServices {
	@Autowired
	private SLARepository slaRepository;

	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private SLAPreInvoiceRepository slaPreInvoiceRepository;

	public final Logger LOGGER = LogManager.getLogger(SLASchedulerServices.class);

	public void setSLAInvoiceStatus() {

		try {

			List<SLAModel> sla_list = slaRepository.findAll();
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");

			for (SLAModel sla : sla_list) {
				{
					LocalDate start_date = LocalDate.parse(sla.getStart_date(), formatter);
					LocalDate end_date = LocalDate.parse(sla.getEnd_date(), formatter);
					if (Boolean.FALSE.equals(sla.getActive().equals("completed"))
							|| Boolean.FALSE.equals(sla.getActive().equals("closed"))) {
						// set sla active status based on sla start and end date
						if (LocalDate.now().isAfter(start_date) && LocalDate.now().isBefore(end_date)) {
							sla.setActive("active");
						} else {
							if (LocalDate.now().equals(start_date) || LocalDate.now().equals(end_date)) {
								sla.setActive("Active");
							} else if (start_date.isAfter(LocalDate.now())) {
 								sla.setActive("Inactive");
							} else {
								sla.setActive("Completed");
							}
						}

					}

					// get counts of preinvoice created except preinvoice period is OTHERS
					Integer max_preinvoice_created = slaPreInvoiceRepository.findMaxCylceBySlaForScheduler(sla.getId(),
							"OTHERS");
					// if preinoive is not created it returns null so we should set 0 instead of
					// null
					if (max_preinvoice_created == null) {
						max_preinvoice_created = 0;
					}
					LOGGER.info("" + max_preinvoice_created);
					// get next preinvoice which we saved while approval completed
					SLAPreInvoiceModel preinvoice_model = slaPreInvoiceRepository
							.findPreinvoiceByCycle(max_preinvoice_created + 1, sla.getId());

					// if preinvocie_model is null means all the preinvoice-period is created
					if (preinvoice_model != null) {

						LocalDate pre_start_date = LocalDate.parse(preinvoice_model.getStart_date(), formatter);
						LocalDate pre_end_date = LocalDate.parse(preinvoice_model.getEnd_date(), formatter);

						if (LocalDate.now().isAfter(pre_start_date) && LocalDate.now().isBefore(pre_end_date)) {
							sla.setInvoice_status(
									"Payment Not Initiated For " + preinvoice_model.getPreinvoice_period());
						} else {

							if (LocalDate.now().equals(pre_start_date) || LocalDate.now().equals(pre_end_date)) {
								sla.setInvoice_status(
										"Payment Not Initiated For " + preinvoice_model.getPreinvoice_period());
							} else if (LocalDate.now().isBefore(pre_start_date)) {
								LOGGER.info("Time is available to create next Pre Invoice");
							} else {
								if (LocalDate.now().isAfter(pre_end_date)) {
									sla.setInvoice_status("Pending " + preinvoice_model.getPreinvoice_period());
								}
							}

						}
					}
					slaRepository.save(sla);
					
				    
				}

			}
			
			//set the project status based on inactive
			List<SLAModel> slaDatas = slaRepository.findAllActive();
			
			for(SLAModel sladata : slaDatas) {
				
				ProjectModel projectData = slaRepository.findByProjectID(sladata.getProject().getId());
				
				List<SLAModel> slaByProject = slaRepository.findByProjectIdAndIs_active(sladata.getProject().getId(),true);
				List<SLAModel> slaByProjectAndStatus=slaRepository.findByProjectAndStatus(sladata.getProject().getId(), "Inactive");
								
				int slaSize = slaByProject.size();
				int slaInActiveSize = slaByProjectAndStatus.size();
				
				if((slaSize!=0) && (slaSize==slaInActiveSize)) {
					
					projectData.setStatus("Inactive");
					projectRepository.save(projectData);
				}
				
			}
			
			
		} catch (Exception e) {
			LOGGER.error("Internal Server Error:" + e.getMessage());

		}

	}

	public void setProjectInvoiceStatus() {
		try {
			List<ProjectModel> projectlist = projectRepository.findAll();
			for (ProjectModel project_model : projectlist) {
				List<SLAModel> slalist_byproject = slaRepository.findByProject(project_model.getId());
				if (!slalist_byproject.isEmpty()) {
					for (SLAModel sla : slalist_byproject) {
						if (sla.getInvoice_status().startsWith("Payment")) {
							project_model.setInvoice_status("Payment Not Initiated");
							break;
						} else if (sla.getInvoice_status().startsWith("Pending")) {
							project_model.setInvoice_status("Pending");
							break;
						} else {
							project_model.setInvoice_status("Approved");
							projectRepository.save(project_model);
						}
					}

					projectRepository.save(project_model);
				}

			}

		} catch (Exception e) {
			LOGGER.error("Internal Server Error:" + e.getMessage());

		}

	}

	public void setProjectAStatus() {

		try {
			List<ProjectModel> projectlist = projectRepository.findAll();
			for (ProjectModel project_model : projectlist) {
				List<SLAModel> slalist_bystatus = slaRepository.findByStatus("active");
				if (!slalist_bystatus.isEmpty()) {
					project_model.setStatus("Active");
				} else {
					project_model.setStatus("Inactive");
				}
				projectRepository.save(project_model);
			}

		} catch (Exception e) {
			LOGGER.error("Internal Server Error:" + e.getMessage());
		}

	}
}

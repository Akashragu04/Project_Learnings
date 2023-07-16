package com.intelizign.dmgcc.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.intelizign.dmgcc.models.othermaster.SLAProvisions;
import com.intelizign.dmgcc.models.othermaster.SlaProvisionsArchive;
import com.intelizign.dmgcc.repositories.othermaster.SLAProvisionsRepository;
import com.intelizign.dmgcc.repositories.othermaster.SlaProvisionsArchiveRepository;

@Service
@Transactional
public class SLAProvisionSchedulerServices {

	@Autowired
	private SlaProvisionsArchiveRepository slaProvisionsArchiveRepository;
	
	@Autowired
	private SLAProvisionsRepository slaProvisionsRepository;
	
	public void saveSlaProvisionArchives() {
		
	// find datas when status != 'required'
		List<SLAProvisions>  slaProvisions =  slaProvisionsRepository.findAllByStatusNotRequired();
		
		if(slaProvisions!=null) {
			
			for(SLAProvisions provisions : slaProvisions) {
				SlaProvisionsArchive slaProvisionsArchive = new SlaProvisionsArchive();
				slaProvisionsArchive.setComments(provisions.getComments());
				slaProvisionsArchive.setCostcenter(provisions.getCostcenter());
				slaProvisionsArchive.setCreated_date(provisions.getCreated_date());
				slaProvisionsArchive.setCross_charges_provision(provisions.getCross_charges_provision());
				slaProvisionsArchive.setIo_number(provisions.getIo_number());
				slaProvisionsArchive.setMonth(provisions.getMonth());
				slaProvisionsArchive.setNumeric_month(provisions.getNumeric_month());
				slaProvisionsArchive.setOther_provisions(provisions.getOther_provisions());
				slaProvisionsArchive.setPo_ro_number(provisions.getPo_ro_number());
				slaProvisionsArchive.setPrevious_provisions(provisions.getPrevious_provisions());
				slaProvisionsArchive.setProject_name(provisions.getProject_name());
				slaProvisionsArchive.setPrototype_provision(provisions.getPrototype_provision());
				slaProvisionsArchive.setSla_name(provisions.getSla_name());
				slaProvisionsArchive.setSlaid(provisions.getSlaid());
				slaProvisionsArchive.setSlaprovision_id(provisions.getId());
				slaProvisionsArchive.setSoftware_provision(provisions.getSoftware_provision());
				slaProvisionsArchive.setStatus(provisions.getStatus());
				slaProvisionsArchive.setTeam(provisions.getTeam());
				slaProvisionsArchive.setThirdparty_manpower_provision(provisions.getThirdparty_manpower_provision());
				slaProvisionsArchive.setThirdparty_service_provision(provisions.getThirdparty_service_provision());
				slaProvisionsArchive.setTotal_provision(provisions.getTotal_provision());
				slaProvisionsArchive.setUpdated_date(provisions.getUpdated_date());
				slaProvisionsArchive.setVendor_name(provisions.getVendor_name());
				slaProvisionsArchive.setYear(provisions.getYear());
				
				slaProvisionsArchive.setCross_charges_provision_remarks(provisions.getCross_charges_provision_remarks());
				slaProvisionsArchive.setOther_provisions_remarks(provisions.getOther_provisions_remarks());
				slaProvisionsArchive.setPrevious_provisions_remarks(provisions.getPrevious_provisions_remarks());
				slaProvisionsArchive.setPrototype_provision_remarks(provisions.getPrototype_provision_remarks());
				slaProvisionsArchive.setSoftware_provision_remarks(provisions.getSoftware_provision_remarks());
				slaProvisionsArchive.setThirdparty_manpower_provision_remarks(provisions.getThirdparty_manpower_provision_remarks());
				slaProvisionsArchive.setThirdparty_service_provision_remarks(provisions.getThirdparty_service_provision_remarks());
				
				slaProvisionsArchiveRepository.save(slaProvisionsArchive);
			}
				
		}
		// delete datas when status != 'required'
		slaProvisionsRepository.deleteAllByStatusNotRequired();
	}

}

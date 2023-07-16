package com.intelizign.dmgcc.services.othermaster;

import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.intelizign.dmgcc.models.ProjectModel;
import com.intelizign.dmgcc.models.businesscasemodels.BusinessCaseRequest;
import com.intelizign.dmgcc.pojoclass.othermaster.IOMapping;
import com.intelizign.dmgcc.repositories.BizCaseRequestRepository;
import com.intelizign.dmgcc.repositories.ProjectRepository;
import com.intelizign.dmgcc.request.IOMappingRequest;

@Service
public class IOMappingService {

	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	BizCaseRequestRepository bizcasereqrepo;

	public final Logger LOGGER = LogManager.getLogger(IOMappingService.class);

	public ProjectModel ioMappingWithProjectsTest(String io_mapping_key, String order_id, String io_year,
			ProjectModel projectdata) {

		List<IOMapping> IoMappings = new ArrayList<>();
		String last_ionumber = null;
		ProjectModel savedprojectdata = new ProjectModel();

		if (projectdata.getIoMapping() != null && !projectdata.getIoMapping().isEmpty()) {
			if (!StringUtils.isEmpty(order_id) && !StringUtils.isEmpty(io_year)) {
				String[] io_numbers = order_id.split("-");

				if (io_numbers != null) {
					last_ionumber = io_numbers[io_numbers.length - 1];
				}

				for (int j = 0; j < io_numbers.length; j++) {
					final int index = j;
					List<IOMapping> io_mappinginfo = projectdata.getIoMapping().stream()
							.filter(iomapping -> iomapping.getIonumber().trim().equals(io_numbers[index].trim())
							// && iomapping.getYear().equals(io_year)
							).toList();

					// if io_number not exists in db condition only , need to add that , else need
					// to leave it
					if (io_mappinginfo.isEmpty()) {
						IOMapping new_ioMapping = new IOMapping();
						new_ioMapping.setYear(io_year.trim());
						new_ioMapping.setIonumber(io_numbers[j]);
						projectdata.getIoMapping().add(new_ioMapping);
					}
				}
				projectdata.setIoStatus("Active");
				projectdata.setStatus("Approved");
				projectdata.setIoMapping(projectdata.getIoMapping());
				projectdata.setIoMappingKey(io_mapping_key);
				projectdata.setActiveIoNumber(last_ionumber);
				savedprojectdata = projectRepository.save(projectdata);

			}

//			}

		}

		// 1st io number entry
		else {

			if (!StringUtils.isEmpty(order_id)) {
				String[] io_numbers = order_id.split(",");
				for (int i = 0; i < io_numbers.length; i++) {
					IOMapping new_ioMapping = new IOMapping();
					new_ioMapping.setYear(io_year.trim());
					new_ioMapping.setIonumber(io_numbers[i].trim());
					IoMappings.add(new_ioMapping);
				}

				projectdata.setIoStatus("Active");
				projectdata.setStatus("Approved");
				projectdata.setIoMapping(IoMappings);
				projectdata.setIoMappingKey(io_mapping_key);
				projectdata.setActiveIoNumber(last_ionumber);
				savedprojectdata = projectRepository.save(projectdata);
			}

		}

		BusinessCaseRequest bizCase = projectdata.getBizcase();
		bizCase.setStatus("Approved");
		bizcasereqrepo.save(bizCase);

		return savedprojectdata;

	}

	public ProjectModel ioMappingWithProjects(String io_mapping_key, List<IOMappingRequest> ioMapping,
			ProjectModel projectdata) {

		//ProjectModel savedprojectdata = new ProjectModel();
//		if (activeIoNum == null && activeIoYear == null) // 1st io number entry
//		{
//			if (io_mapping_key.equals("N/A")) {
//				projectdata.setIoStatus("N/A");
//				projectdata.setIoMappingKey(io_mapping_key);
//				projectdata.setStatus("Approved");
//				projectRepository.save(projectdata);
//			} else if (io_mapping_key.equals("data")) {
//				List<IOMapping> IOMappingList = new ArrayList<>();
//				IOMapping ioPojoObjs = new IOMapping();
//				ioPojoObjs.setIonumber(order_id);
//				ioPojoObjs.setYear(io_year);
//				IOMappingList.add(ioPojoObjs);
//				projectdata.setIoMapping(IOMappingList);
//				projectdata.setStatus("Approved");
//				projectdata.setIoStatus("Active");
//				projectdata.setActiveIoNumber(order_id);
//				projectdata.setActiveIoYear(io_year);
//				projectdata.setIoMappingKey(io_mapping_key);
//				savedprojectdata = projectRepository.save(projectdata);
//
//			}
//
//		} else // 2nd entries
//		{
//		IOMapping ioPojoObjs = new IOMapping();
//		ioPojoObjs.setIonumber(projectdata.getActiveIoNumber());
//		ioPojoObjs.setYear(projectdata.getActiveIoYear());


			List<IOMapping> alreadyExistingIo = projectdata.getIoMapping();
			
			if (alreadyExistingIo == null) {
				List<IOMapping> IOMappingList = new ArrayList<>();
				
				for(IOMappingRequest ioMappingData: ioMapping) {
					
					IOMapping ioData = new IOMapping();
					ioData.setIonumber(ioMappingData.getOrder_id());
					ioData.setYear(ioMappingData.getYear());
					IOMappingList.add(ioData);
				}
				
				int size = IOMappingList.size();
				
				if(size != 0) {
					
					IOMapping currentYearData = IOMappingList.get(size-1);
					projectdata.setActiveIoNumber(currentYearData.getIonumber());
					projectdata.setActiveIoYear(currentYearData.getYear());
					
				}
								
				projectdata.setIoMapping(IOMappingList);
				projectdata.setIoStatus("Active");
				projectdata.setStatus("Approved");
				projectdata.setIoMappingKey(io_mapping_key);
				projectRepository.save(projectdata);
			} 
			
			else {
				    
				    List<IOMapping> IOMappingList = new ArrayList<>();
				
                   for(IOMappingRequest ioMappingData: ioMapping) {
					
					IOMapping ioData = new IOMapping();
					ioData.setIonumber(ioMappingData.getOrder_id());
					ioData.setYear(ioMappingData.getYear());
					IOMappingList.add(ioData);
				}
                   
                alreadyExistingIo.addAll(IOMappingList);
                int size = alreadyExistingIo.size();
                
                
   				IOMapping currentYearData = alreadyExistingIo.get(size-1);
   				
				projectdata.setStatus("Approved");
				projectdata.setIoStatus("Active");
				projectdata.setActiveIoNumber(currentYearData.getIonumber());
				projectdata.setActiveIoYear(currentYearData.getYear());
				projectdata.setIoMappingKey(io_mapping_key);
				projectdata.setIoMapping(alreadyExistingIo);
				projectRepository.save(projectdata);
			}

	
		BusinessCaseRequest bizCase = projectdata.getBizcase();
		bizCase.setStatus("Approved");
		bizcasereqrepo.save(bizCase);

		return projectdata;

	}
}

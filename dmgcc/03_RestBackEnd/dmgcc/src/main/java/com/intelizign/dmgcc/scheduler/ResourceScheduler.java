package com.intelizign.dmgcc.scheduler;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.intelizign.dmgcc.models.DailyCapacityPercent;
import com.intelizign.dmgcc.models.EmployeeCapacityReportModel;
import com.intelizign.dmgcc.models.G3CEmployeeMasterModel;
import com.intelizign.dmgcc.repositories.DailyCapacityPercentRepository;
import com.intelizign.dmgcc.repositories.EmployeeCapacityReporRepository;
import com.intelizign.dmgcc.repositories.G3CEmployeeRepository;

@Component
public class ResourceScheduler {

	public final Logger LOGGER = LogManager.getLogger(ResourceScheduler.class);

	@Autowired
	DailyCapacityPercentRepository dailyCapacityPercntRepo;

	@Autowired
	EmployeeCapacityReporRepository employeeCapacityReporRepository;

	@Autowired
	G3CEmployeeRepository g3cEmployeeRepository;

	@Scheduled(cron = "0   59   23   *   *   * ")
	public void scheduleDailyCapacityPercent() {

		List<G3CEmployeeMasterModel> empDatas = g3cEmployeeRepository.findAll();
		LocalDate currentdate = LocalDate.now();
		List<DailyCapacityPercent> monthData = new ArrayList<>();
		for (G3CEmployeeMasterModel empdata : empDatas) {
			DailyCapacityPercent dailypercentData = new DailyCapacityPercent();
			dailypercentData.setCapacity(empdata.getCapacity());
			dailypercentData.setEmployee(empdata);
			dailypercentData.setDate(currentdate);
			monthData.add(dailypercentData);

		}
		dailyCapacityPercntRepo.saveAll(monthData);
	}

	@Scheduled(cron = "0 59 23 28-31 * ?")
	public void scheduledMonthlyCapacity() {

		final Calendar c = Calendar.getInstance();
		
		 if (c.get(Calendar.DATE) == c.getActualMaximum(Calendar.DATE)) {
		       
			    SimpleDateFormat sdf = new SimpleDateFormat("MMMM");
				String strMonth = sdf.format(new Date());

				List<G3CEmployeeMasterModel> empDatas = g3cEmployeeRepository.findAll();
				List<EmployeeCapacityReportModel> monthlydata = new ArrayList<>();
				empDatas.stream().forEach(user_data -> {
					employeeCapacityReporRepository.deleteByMonth(user_data.getId(), strMonth);
					EmployeeCapacityReportModel monthlyCapacity = new EmployeeCapacityReportModel();
					Double particularMonthCapacity = dailyCapacityPercntRepo.findByMonth(user_data.getId());
					monthlyCapacity.setCapacity(particularMonthCapacity);
					monthlyCapacity.setUserinfo(user_data);
					monthlyCapacity.setMonth(strMonth);
					monthlydata.add(monthlyCapacity);
					dailyCapacityPercntRepo.deleteByMonth(user_data.getId());
				});

				employeeCapacityReporRepository.saveAll(monthlydata);
		   }
		
	}

}

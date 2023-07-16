package com.intelizign.dmgcc.scheduler;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.intelizign.dmgcc.models.othermaster.SLAProvisions;
import com.intelizign.dmgcc.repositories.othermaster.ProvisionsChartResponseRepository;
import com.intelizign.dmgcc.repositories.othermaster.SLAProvisionsRepository;
import com.intelizign.dmgcc.repositories.othermaster.SlaProvisionsArchiveRepository;
import com.intelizign.dmgcc.response.ProvisionsChartResponse;
import com.intelizign.dmgcc.services.othermaster.SlaProvisionsService;

@Component
@EnableScheduling
@Service
public class SlaProvisionChartScheduler {

	@Autowired
	private SLAProvisionsRepository slaProvisionsRepository;

	@Autowired
	private ProvisionsChartResponseRepository provisionsChartResponseRepository;

	@Autowired
	private SlaProvisionsArchiveRepository slaProvisionsArchiveRepository;

	@Autowired
	SlaProvisionsService slaProvisionsService;

	public final Logger LOGGER = LogManager.getLogger(SlaProvisionChartScheduler.class);

	// create and update slaprovisionchart response table of the given time to get
	// barchart data
	// 10 th 23.59 p.m. of Every Month
	@Scheduled(cron = "0 59 23 10 1/1 ? ")
	public void updateSlaProvisionChartResponse() {
		try {
			double total_required_sum = 0; // all year sum of (total_provision) where status = 'Required'
			double previousyears_total_required_sum = 0; // previous years sum of (total_provision) where status = 'Required'
			double provisions_required_sum = 0;
			double provisions_nonrequired_sum = 0;
			double reverse_provisions_sum = 0;
			double provisions_planned_sum = 0;
			double previousdec_provisions_planned_sum = 0;
			double previousdec_provisions_required_sum = 0;
			double previousdec_provisions_nonrequired_sum = 0;
			double previousdec_reverse_provisions_sum = 0;
			double superprev_provisions_required_sum = 0;
			double previousdec_current_provisions_sum = 0;

			ProvisionsChartResponse provisionsChartResponse = new ProvisionsChartResponse();
			LocalDate today_Date = LocalDate.now();
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM");
			String today_year = String.valueOf(today_Date.getYear());
			String previous_year = String.valueOf(today_Date.minusYears(1).getYear());
		

			LocalDate previous_month_date = today_Date.minusMonths(1);
			LocalDate superprevious_month_date = today_Date.minusMonths(2);
			String super_previous_month = superprevious_month_date.format(formatter);
			String today_month = today_Date.format(formatter);
			String previous_month = previous_month_date.format(formatter);
			String threeletter_previous_month = previous_month.substring(0, 3);

			// test
//			String super_previous_month = "January";
//			String today_month = "March";
//			String previous_month = "February";
//			String threeletter_previous_month = previous_month.substring(0, 3);

			int previous_month_numericvalue = SlaProvisionsService.getNumberFromMonthName(threeletter_previous_month,
					Locale.ENGLISH);

			total_required_sum = slaProvisionsRepository.findAllByStatusRequired();
			
			previousyears_total_required_sum = slaProvisionsRepository.findAllPreviousYearRequiredSum(previous_year);
					
			// used to save previous month december provisions data in chart response table
			if (previous_month.equalsIgnoreCase("December")) {
				List<SLAProvisions> previousdec_provisions_data = slaProvisionsRepository
						.findAllByMonthAndYearOrderById(previous_month, previous_year);
				if (previousdec_provisions_data != null) {
					if (today_month.equalsIgnoreCase("January")) {

						previousdec_provisions_planned_sum = slaProvisionsRepository.findAllByMonthAndYearSum(previous_month, previous_year);
						
						previousdec_provisions_required_sum = slaProvisionsRepository
								.findAllRequiredByMonthAndYearSum(previous_month, previous_year);
						previousdec_provisions_nonrequired_sum = slaProvisionsArchiveRepository
								.findAllNonRequiredByMonthAndYearSum(previous_month, previous_year);
						previousdec_reverse_provisions_sum = slaProvisionsArchiveRepository
								.findAllReverseProvisionByMonthAndYearSum(previous_month, previous_year);
						
						previousdec_current_provisions_sum = slaProvisionsRepository.findAllByYearAndStatusRequired(previous_year);
						
//						previousdec_provisions_planned_sum = previousdec_provisions_required_sum
//								+ previousdec_provisions_nonrequired_sum + previousdec_reverse_provisions_sum;

						provisionsChartResponse.setMonth(previous_month);
						provisionsChartResponse.setNumeric_month(previous_month_numericvalue);
						provisionsChartResponse.setYear(previous_year);
						provisionsChartResponse.setPlanned_value(previousdec_provisions_planned_sum);
						provisionsChartResponse.setActual_required_sum(previousdec_provisions_required_sum);
						provisionsChartResponse.setActual_nonrequired_sum(previousdec_provisions_nonrequired_sum);
						provisionsChartResponse.setActual_invoicesubmitted_sum(previousdec_reverse_provisions_sum);
						provisionsChartResponse.setCurrent_value(previousyears_total_required_sum);
						provisionsChartResponse.setDate(previous_month + "-" + previous_year);
					}
				}

				provisionsChartResponseRepository.save(provisionsChartResponse);
			}

			else {
				/*
				 * if previous month not exists we need to skip to calculate , means if we in
				 * jan , haven't got any data before that, to save new jan data without having
				 * previous year december data as well as other month data
				 */
				List<SLAProvisions> previous_provisions_data = slaProvisionsRepository
						.findAllByMonthAndYearOrderById(previous_month, today_year);
				if (previous_provisions_data != null) {
					provisions_planned_sum = slaProvisionsRepository.findAllByMonthAndYearSum(previous_month,
							today_year);
					provisions_required_sum = slaProvisionsRepository.findAllRequiredByMonthAndYearSum(previous_month,
							today_year);

					// if current month is february , then for Current_value calculation, use
					// superprev_provisions_required_sum+provisions_required_sum
					if (super_previous_month.equalsIgnoreCase("December")) {
						superprev_provisions_required_sum = slaProvisionsRepository
								.findAllRequiredByMonthAndYearSum(super_previous_month, previous_year);
					}

					else {
						superprev_provisions_required_sum = slaProvisionsRepository
								.findAllRequiredByMonthAndYearSum(super_previous_month, today_year);
					}
					
					
					provisions_nonrequired_sum = slaProvisionsRepository
							.findAllNotRequiredByMonthAndYearSum(previous_month, today_year);
					reverse_provisions_sum = slaProvisionsRepository
							.findAllReverseProvisionByMonthAndYearSum(previous_month, today_year);

					provisionsChartResponse.setMonth(previous_month);
					provisionsChartResponse.setNumeric_month(previous_month_numericvalue);
					provisionsChartResponse.setYear(today_year);
					provisionsChartResponse.setPlanned_value(provisions_planned_sum);
					provisionsChartResponse.setActual_required_sum(provisions_required_sum);
					provisionsChartResponse.setActual_nonrequired_sum(provisions_nonrequired_sum);
					provisionsChartResponse.setActual_invoicesubmitted_sum(reverse_provisions_sum);

					// for example if current month is March(current year) ,
					// then current value(February)= Sum(total_provision) if status ='Required' of
					// February + Sum(total_provision) if status ='Required' of January
					provisionsChartResponse
							.setCurrent_value(provisions_required_sum + superprev_provisions_required_sum);
					provisionsChartResponse.setDate(previous_month + "-" + today_year);
				}

				provisionsChartResponseRepository.save(provisionsChartResponse);

			}

		} catch (Exception e) {
			LOGGER.error("Internal Server Error:" + e.getMessage());

		}

	}
}

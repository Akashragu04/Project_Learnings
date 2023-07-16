package com.intelizign.dmgcc.controllers.othermaster;

import java.time.LocalDate;
import java.time.Month;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.intelizign.dmgcc.authendication.AzureUserInfo;
import com.intelizign.dmgcc.authendication.UserDetailsImpl;
import com.intelizign.dmgcc.models.CostCenterModel;
import com.intelizign.dmgcc.models.ProjectModel;
import com.intelizign.dmgcc.models.SLAModel;
import com.intelizign.dmgcc.models.othermaster.SLAProvisions;
import com.intelizign.dmgcc.pojoclass.othermaster.ProvisionFilterPojo;
import com.intelizign.dmgcc.repositories.CostCenterRepository;
import com.intelizign.dmgcc.repositories.G3CEmployeeRepository;
import com.intelizign.dmgcc.repositories.ProjectRepository;
import com.intelizign.dmgcc.repositories.SLARepository;
import com.intelizign.dmgcc.repositories.othermaster.ProvisionsChartResponseRepository;
import com.intelizign.dmgcc.repositories.othermaster.SLAProvisionsRepository;
import com.intelizign.dmgcc.repositories.othermaster.SlaProvisionsArchiveRepository;
import com.intelizign.dmgcc.response.ProvisionsChartResponse;
import com.intelizign.dmgcc.response.ProvisionsOverallChartResponse;
import com.intelizign.dmgcc.response.ProvisionsOverallChartResponse.ProvisionsChartResponsePojo;
import com.intelizign.dmgcc.response.ResponseHandler;
import com.intelizign.dmgcc.scheduler.SlaProvisionChartScheduler;
import com.intelizign.dmgcc.scheduler.SlaProvisionScheduler;
import com.intelizign.dmgcc.services.othermaster.SlaProvisionsService;
import com.intelizign.dmgcc.utils.CustomFields;

@RestController
@RequestMapping("/provisions")
public class ProvisionController {

	@Autowired
	SLARepository slarepository;

	@Autowired
	SLAProvisionsRepository slaProvisionsRepository;

	@Autowired
	G3CEmployeeRepository g3cEmployeeRepository;

	@Autowired
	SlaProvisionsService slaProvisionsService;

	@Autowired
	private ProvisionsChartResponseRepository provisionsChartResponseRepository;

	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private AzureUserInfo azureUserInfo;

	@Autowired
	private CostCenterRepository costcenterRepository;

	@Autowired
	private SlaProvisionScheduler slaProvisionScheduler;

	@Autowired
	private SlaProvisionChartScheduler slaProvisionChartScheduler;

	@Autowired
	private SlaProvisionsArchiveRepository slaProvisionsArchiveRepository;

	public final Logger LOGGER = LogManager.getLogger(ProvisionController.class);

	// get costcenters
	@GetMapping("/getcostcenter")
	public ResponseEntity<Object> getProvisions(Authentication authentication) {

		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		if (userDetails == null)
			return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);
		List<CostCenterModel> CostCenterModels = new ArrayList<>();

		switch (userDetails.getRolename()) {
		case "ADMIN","FINANCE":
			//cost_centers = g3cEmployeeRepository.findDistinctByCost_center();
			
			
			CostCenterModels = costcenterRepository.findAllByActive(true);
			return ResponseHandler.generateResponse("List of Cost centers", true, HttpStatus.OK, CostCenterModels);

		case "BUSINESS":
			Optional<CostCenterModel> costCenterModel = costcenterRepository
					.findByCostcenterByActive(userDetails.getCost_center(),true);

			if (costCenterModel.isPresent()) {
				CostCenterModels.add(costCenterModel.get());
			}
			return ResponseHandler.generateResponse("List of Cost centers", true, HttpStatus.OK, CostCenterModels);

		default:
			LOGGER.error("User doesn't have the access ");
			return ResponseHandler.generateResponse("User doesn't have the access", true, HttpStatus.OK, null);

		}
	}

	// get projects by costcenter
	@JsonView(CustomFields.MyResponseViews.class)
	@GetMapping("/getprojects/{costcenter}")
	public ResponseEntity<Object> getProjects(@PathVariable String costcenter) {
		try {

			List<ProjectModel> projects = projectRepository.findByCostCenter(costcenter);
			return ResponseHandler.generateResponse("List of Projects Retrieved Successfully", true, HttpStatus.OK,
					projects);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error getall projects : " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	// get slas by project id
	@JsonView(CustomFields.MyResponseViews.class)
	@GetMapping("/getslabyproject/{project_id}")
	public ResponseEntity<Object> findSLAByProjectId(@PathVariable Long project_id) {
		try {
			return projectRepository.findById(project_id).map(project_data -> {
				List<SLAModel> sladatas = slarepository.findByProjectIdAndIs_active(project_id, true);
				return ResponseHandler.generateResponse("SLA Data Retrieved Successfully", true, HttpStatus.OK,
						sladatas);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Project ID " + project_id + "  Doesn't exist");
				return ResponseHandler.generateResponse("Project ID: " + project_id + " Doesn't exist", false,
						HttpStatus.OK, null);
			});
		} catch (Exception e) {
			LOGGER.error("Exceptions happen!:Project ID " + project_id + " Doesn't exist DB Error: " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	// get Provision by id
	@GetMapping("/{id}")
	public ResponseEntity<Object> FindProvision(@PathVariable Long id) {
		try {
			return slaProvisionsRepository.findById(id).map(requestData -> {
				return ResponseHandler.generateResponse("Provision Data Retrieved Successfully", true, HttpStatus.OK,
						requestData);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: " + id + " Provision Doesn't exist");
				return ResponseHandler.generateResponse(id + " Provision Doesn't exist", false, HttpStatus.OK, null);
			});

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get Provision: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	// provision filter based on year ,month ,costcenter and status
	@PutMapping("")
	public ResponseEntity<Object> getProvisions(@RequestBody ProvisionFilterPojo provisionFilterPojo,
			Authentication authentication) {

		try {
			List<SLAProvisions> slaProvisions = null;
			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
			if (userDetails == null)
				return ResponseHandler.generateResponse("Invalid User", false, HttpStatus.OK, null);

			switch (userDetails.getRolename()) {
			case "ADMIN":

				if (provisionFilterPojo.getMonth().isBlank() || provisionFilterPojo.getYear().isBlank()) {
					LOGGER.error("Month and year must not be empty ");
					return ResponseHandler.generateResponse("Month and year must not be empty ", false, HttpStatus.OK,
							null);
				}

				else if (!provisionFilterPojo.getStatus().isBlank() && !provisionFilterPojo.getCostcenter().isBlank()) {
					slaProvisions = slaProvisionsRepository.findAllByCostcenterStatus(provisionFilterPojo.getMonth(),
							provisionFilterPojo.getYear(), provisionFilterPojo.getCostcenter(),
							provisionFilterPojo.getStatus());
				}

				else if (!provisionFilterPojo.getStatus().isBlank() && provisionFilterPojo.getCostcenter().isBlank()) {
					slaProvisions = slaProvisionsRepository.findAllByStatus(provisionFilterPojo.getMonth(),
							provisionFilterPojo.getYear(), provisionFilterPojo.getStatus());
				}

				else if (provisionFilterPojo.getStatus().isBlank() && !provisionFilterPojo.getCostcenter().isBlank()) {
					slaProvisions = slaProvisionsRepository.findAllByMonthAndYearAndCostcenterOrderById(
							provisionFilterPojo.getMonth(), provisionFilterPojo.getYear(),
							provisionFilterPojo.getCostcenter());
				} else {
					slaProvisions = slaProvisionsRepository.findAllByMonthAndYearOrderById(
							provisionFilterPojo.getMonth(), provisionFilterPojo.getYear());
				}
				break;

			case "BUSINESS", "FINANCE":

				if (provisionFilterPojo.getMonth().isBlank() || provisionFilterPojo.getYear().isBlank()
						|| provisionFilterPojo.getCostcenter().isBlank()) {
					LOGGER.error("Month and year and costcenter must not be empty ");
					return ResponseHandler.generateResponse("Month and year and costcenter must not be empty ", false,
							HttpStatus.OK, null);
				}

				else if (!provisionFilterPojo.getStatus().isBlank() && !provisionFilterPojo.getCostcenter().isBlank()) {
					slaProvisions = slaProvisionsRepository.findAllByCostcenterStatus(provisionFilterPojo.getMonth(),
							provisionFilterPojo.getYear(), provisionFilterPojo.getCostcenter(),
							provisionFilterPojo.getStatus());
				}

				else if (provisionFilterPojo.getStatus().isBlank() && !provisionFilterPojo.getCostcenter().isBlank()) {
					slaProvisions = slaProvisionsRepository.findAllByMonthAndYearAndCostcenterOrderById(
							provisionFilterPojo.getMonth(), provisionFilterPojo.getYear(),
							provisionFilterPojo.getCostcenter());
				}

				break;

			default:
				LOGGER.error("User doesn't have the access ");
				return ResponseHandler.generateResponse("User doesn't have the access", false, HttpStatus.OK, null);
			}
			return ResponseHandler.generateResponse("List of Provisions ", true, HttpStatus.OK, slaProvisions);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get provisions data: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}

	}

	// to delete provision , hard delete
	@DeleteMapping("/removeprovision/{id}")
	public ResponseEntity<Object> removeProvision(@PathVariable(value = "id") Long id) {

		try {
			return slaProvisionsRepository.findById(id).map(provision_data -> {
				slaProvisionsRepository.deleteById(id);
				return ResponseHandler.generateResponse("Provision Removed Successfully", true, HttpStatus.OK, null);
			}).orElseGet(() -> {
				LOGGER.error("Exceptions happen!: Provision ID " + id + " Doesn't Exist");
				return ResponseHandler.generateResponse("Provision ID " + id + " Doesn't Exist", false, HttpStatus.OK,
						null);
			});

		} catch (Exception e) {
			LOGGER.error("Exceptions happen!:Provision ID " + id + " Doesn't Exist DB Error: " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	// to check previuos months provisons status not empty
	@GetMapping("/checkaddprovision")
	public ResponseEntity<Object> checkaddprovision() {

		try {
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM");
			LocalDate today_Date = LocalDate.now();

			String today_year = String.valueOf(today_Date.getYear());
			LocalDate onemonth_before_date = today_Date.minusMonths(1);
			String onemonth_before = onemonth_before_date.format(formatter);
			String threeletter_previous_month = onemonth_before.substring(0, 3);
			int previous_month_numericvalue = SlaProvisionsService.getNumberFromMonthName(threeletter_previous_month,
					Locale.ENGLISH);

//			List<SLAProvisions> slaProvisions = slaProvisionsRepository.findAllByMonthOrderById(onemonth_before);

			List<SLAProvisions> slaProvisions = slaProvisionsRepository
					.findAllByPreviousMonthAndYearOrderById(previous_month_numericvalue, today_year);

			for (SLAProvisions slaProvision : slaProvisions) {
				if (slaProvision.getStatus() == null || slaProvision.getStatus().isBlank()
						|| slaProvision.getStatus().equals("")) {
					return ResponseHandler.generateResponse("Kindly update the previous month  "
							+ slaProvision.getMonth() + " and year " + slaProvision.getYear() + " status  ", false,
							HttpStatus.OK, null);
				}
			}
			return ResponseHandler.generateResponse("Provisions data can be added ", true, HttpStatus.OK, null);

		} catch (Exception e) {
			LOGGER.error("Internal Server Error while get checkaddprovision data: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	// save and update for provision
	@PutMapping("/update")
	public ResponseEntity<Object> updateSLAProvisions(@RequestBody List<SLAProvisions> request_data) {
		try {
			List<SLAProvisions> all_saved_provisions = new ArrayList<>();
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM");
			SLAProvisions saved_provision = null;
			int monthNumber = 0;
			LocalDate today_Date = LocalDate.now();
			String today_year = String.valueOf(today_Date.getYear());
			String today_month_text = today_Date.format(formatter);

			LocalDate onemonth_before_date = today_Date.minusMonths(1);
			String onemonth_before_text = onemonth_before_date.format(formatter);

			String threeletter_previous_month = onemonth_before_text.substring(0, 3);
			int previous_month_numericvalue = SlaProvisionsService.getNumberFromMonthName(threeletter_previous_month,
					Locale.ENGLISH);

			List<SLAProvisions> slaProvisions = slaProvisionsRepository
					.findAllByPreviousMonthAndYearOrderById(previous_month_numericvalue, today_year);

//			List<SLAProvisions> slaProvisions = slaProvisionsRepository.findAllByMonthOrderById(onemonth_before_text);

			for (SLAProvisions slaProvision : request_data) {
				slaProvision.setMonth(slaProvision.getMonth());

				if (!slaProvision.getMonth().isBlank()) {
					String new_month = slaProvision.getMonth().substring(0, 3);
					monthNumber = SlaProvisionsService.getNumberFromMonthName(new_month, Locale.ENGLISH);
					slaProvision.setNumeric_month(monthNumber);
				}

				if (slaProvision.getId() == 0) {
					slaProvision.setCreated_date(today_Date);
					for (SLAProvisions slaprovisiondata : slaProvisions) {
						if (slaprovisiondata.getStatus() == null || slaprovisiondata.getStatus().isBlank()
								|| slaprovisiondata.getStatus().equals("")) {
							return ResponseHandler.generateResponse(
									"Kindly update the previous month  " + onemonth_before_text + "  status  ", false,
									HttpStatus.OK, null);
						}
					}
					saved_provision = slaProvisionsRepository.save(slaProvision);
				} else {
					LocalDate limitDate = null;
					// Check if the current date is within the allowed date range
					LocalDate currentDate = LocalDate.now();

					if (Integer.valueOf(slaProvision.getYear()) < Integer.valueOf(today_year)) {

						Optional<SLAProvisions> existing_provision = slaProvisionsRepository
								.findById(slaProvision.getId());

						if (existing_provision.isPresent()) {
							existing_provision.get().setStatus(slaProvision.getStatus());
							existing_provision.get().setUpdated_date(today_Date);
							existing_provision.get().setIseditable(false);
							saved_provision = slaProvisionsRepository.save(existing_provision.get());
						}

					}

					// if the given year is equal to/greater than the current year
					else {

						if (slaProvision.getYear().equalsIgnoreCase(today_year)) {

							int numeric_next_month = monthNumber + 1;
							// Get the month value in String format
							String monthString = Month.of(numeric_next_month).name().toLowerCase();
							// Capitalize the first letter of the month name
							String next_month = monthString.substring(0, 1).toUpperCase() + monthString.substring(1);

							// next_month is next month of slaProvision.getMonth()
							limitDate = LocalDate.of(Integer.valueOf(slaProvision.getYear()),
									Month.valueOf(next_month.toUpperCase()), 10);

							// all fields can be editable on or before next month 10
							if (currentDate.isBefore(limitDate) || currentDate.isEqual(limitDate)) {
								slaProvision.setUpdated_date(today_Date);
								saved_provision = slaProvisionsRepository.save(slaProvision);
							}

							// only status field must be editable afer next month 10
							else if (currentDate.isAfter(limitDate)) {
								Optional<SLAProvisions> existing_provision = slaProvisionsRepository
										.findById(slaProvision.getId());

								if (existing_provision.isPresent()) {
									existing_provision.get().setStatus(slaProvision.getStatus());
									existing_provision.get().setUpdated_date(today_Date);
									existing_provision.get().setIseditable(false);
									saved_provision = slaProvisionsRepository.save(existing_provision.get());
								}
							}

						}

						// all fields must be editable for future year record
						else if (Integer.valueOf(slaProvision.getYear()) > Integer.valueOf(today_year)) {
							slaProvision.setUpdated_date(today_Date);
							saved_provision = slaProvisionsRepository.save(slaProvision);
						}
					}

					// to update slaprovision_chart response table provision current value based on
					// status changed
//					if (!slaProvision.getMonth().equalsIgnoreCase(today_month_text) && !slaProvision.getMonth().equalsIgnoreCase(today_month_text)
////							&& !slaProvision.getStatus().equalsIgnoreCase("Required")
//							&& !slaProvision.getStatus().isBlank()) {
//						slaProvisionsService.updateProvisionchart(slaProvision.getMonth(), slaProvision.getYear(),
//								saved_provision.getTotal_provision(), slaProvision.getStatus());
//					}

				}
				all_saved_provisions.add(saved_provision);

			}
			return ResponseHandler.generateResponse("Provisions Updated Successfully", true, HttpStatus.OK,
					all_saved_provisions);

		} catch (Exception e) {
			LOGGER.error("Exceptions happen!: While saving provisions data " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}

	}

	// provision archieve report
	@GetMapping("/provisionarchivereport")
	public ResponseEntity<Object> slaprovisionArchiveExport() {
		try {
			String file = slaProvisionsService.slaprovisionArchiveExport();
			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + "sla_archive_provision.xlsx")
					.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while downloading provision archieve report: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	// provision barchart report
	@GetMapping("/barchartreport")
	public ResponseEntity<Object> downloadslaprovisionreport() {
		try {
			ProvisionsOverallChartResponse provisionsOverallChartResponse = new ProvisionsOverallChartResponse();
			List<ProvisionsChartResponsePojo> provisionsChartResponsePojos = new ArrayList<>();

			double previousyears_total_required_sum = 0; // previous years sum of (total_provision) where status =
															// 'Required'

			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM");
			LocalDate today_Date = LocalDate.now();
			String today_year = String.valueOf(today_Date.getYear());
			String today_month = today_Date.format(formatter);
			int today_numericmonth = today_Date.getMonthValue();
			String previous_year = String.valueOf(today_Date.minusYears(1).getYear());
			LocalDate previous_month_date = today_Date.minusMonths(1);
			String previous_month = previous_month_date.format(formatter);
			LocalDate superprevious_month_date = today_Date.minusMonths(2);
			String super_previous_month = superprevious_month_date.format(formatter);

			// all previous year sum(total_provision) where status ='Required
			previousyears_total_required_sum = slaProvisionsRepository.findAllPreviousYearRequiredSum(previous_year);

			// if previous year december provision exists, need to show that in error
			List<SLAProvisions> previous_year_provisions = slaProvisionsRepository
					.findAllByYearOrderById(previous_year);

			// previous year december provision
			if (previous_year_provisions != null && !previous_year_provisions.isEmpty()) {

				double december_required_provision_sum = slaProvisionsRepository
						.findAllRequiredByMonthAndYearSum("December", previous_year);

				double december_nonrequired_provision_sum = slaProvisionsArchiveRepository
						.findAllNonRequiredByMonthAndYearSum("December", previous_year);

				double december_invoicesubmit_provision_sum = slaProvisionsArchiveRepository
						.findAllReverseProvisionByMonthAndYearSum("December", previous_year);

				double december_planned_provision_sum = december_required_provision_sum
						+ december_nonrequired_provision_sum + december_invoicesubmit_provision_sum;

				ProvisionsChartResponsePojo prev_provisionsChartResponsePojo = new ProvisionsChartResponsePojo(
						"December", previous_year, "December" + "-" + previous_year, december_planned_provision_sum,
						december_required_provision_sum, december_nonrequired_provision_sum,
						december_invoicesubmit_provision_sum, previousyears_total_required_sum);
				provisionsChartResponsePojos.add(prev_provisionsChartResponsePojo);

			}

			// current year provisions

			LocalDate limitDate = LocalDate.of(Integer.valueOf(today_year), Month.valueOf(today_month.toUpperCase()),
					11);

			// if current date is 11 or greater than 11, then need to show list<provisions>
			// with previous month provision
			if ((today_Date.isAfter(limitDate) || today_Date.isEqual(limitDate))) {
				
//				List<String> provision_with_previousmonth = slaProvisionsRepository
//						.findAllMonths(today_numericmonth - 1, today_year);

				for(int i=1 ; i<= today_numericmonth-1 ; i++) {
					
					// Get the month value in String format
					String monthString = Month.of(i).name().toLowerCase();
					// Capitalize the first letter of the month name
					String month = monthString.substring(0, 1).toUpperCase() + monthString.substring(1);
					
							double currentyear_diffmonth_total_required_sum = 0;
							double previousmonth_current_provision_sum = 0;
							double previousmonth_planned_provision_sum = slaProvisionsRepository
									.findAllByMonthAndYearSum(month, today_year);

							double previousmonth_required_provision_sum = slaProvisionsRepository
									.findAllRequiredByMonthAndYearSum(month, today_year);

							double previousmonth_nonrequired_provision_sum = slaProvisionsRepository
									.findAllNotRequiredByMonthAndYearSum(month, today_year);

							double previousmonth_invoicesubmit_provision_sum = slaProvisionsRepository
									.findAllReverseProvisionByMonthAndYearSum(month, today_year);

							// current month and below current month of current year -->sum(total_provision)
							// where status ='Required
							String threeletter_month = month.substring(0, 3);
							int month_numericvalue = SlaProvisionsService.getNumberFromMonthName(threeletter_month,
									Locale.ENGLISH);

							currentyear_diffmonth_total_required_sum = slaProvisionsRepository
									.findAllRequiredByDiffMonthAndYearSum(month_numericvalue, today_year);

							// all previous year sum(total_provision) where status ='Required
							previousyears_total_required_sum = slaProvisionsRepository
									.findAllPreviousYearRequiredSum(previous_year);
							previousmonth_current_provision_sum = previousyears_total_required_sum
									+ currentyear_diffmonth_total_required_sum;

							previousmonth_current_provision_sum = previousyears_total_required_sum
									+ currentyear_diffmonth_total_required_sum;

							ProvisionsChartResponsePojo prev_provisionsChartResponsePojo = new ProvisionsChartResponsePojo(
									month, today_year, month + "-" + today_year, previousmonth_planned_provision_sum,
									previousmonth_required_provision_sum, previousmonth_nonrequired_provision_sum,
									previousmonth_invoicesubmit_provision_sum, previousmonth_current_provision_sum);
							provisionsChartResponsePojos.add(prev_provisionsChartResponsePojo);
						

					
				}
			
			}

			// if current date is below 11 , then need to show list<provisions> without
			// previous month provision
			else if (today_Date.isBefore(limitDate)) {
				for(int i=1 ; i<= today_numericmonth-2 ; i++) {
//					List<String> provision_without_previousmonth = slaProvisionsRepository
//					.findAllMonths(today_numericmonth - 2, today_year);
					// Get the month value in String format
					String monthString = Month.of(i).name().toLowerCase();
					// Capitalize the first letter of the month name
					String month = monthString.substring(0, 1).toUpperCase() + monthString.substring(1);
					double currentyear_diffmonth_total_required_sum = 0;
					double previousmonth_current_provision_sum = 0;
					double previousmonth_planned_provision_sum = slaProvisionsRepository
							.findAllByMonthAndYearSum(month, today_year);

					double previousmonth_required_provision_sum = slaProvisionsRepository
							.findAllRequiredByMonthAndYearSum(month, today_year);

					double previousmonth_nonrequired_provision_sum = slaProvisionsRepository
							.findAllNotRequiredByMonthAndYearSum(month, today_year);

					double previousmonth_invoicesubmit_provision_sum = slaProvisionsRepository
							.findAllReverseProvisionByMonthAndYearSum(month, today_year);

					// current month and below current month of current year -->sum(total_provision)
					// where status ='Required
					String threeletter_month = month.substring(0, 3);
					int month_numericvalue = SlaProvisionsService.getNumberFromMonthName(threeletter_month,
							Locale.ENGLISH);
					currentyear_diffmonth_total_required_sum = slaProvisionsRepository
							.findAllRequiredByDiffMonthAndYearSum(month_numericvalue, today_year);

					// all previous year sum(total_provision) where status ='Required
					previousyears_total_required_sum = slaProvisionsRepository
							.findAllPreviousYearRequiredSum(previous_year);
					previousmonth_current_provision_sum = previousyears_total_required_sum
							+ currentyear_diffmonth_total_required_sum;

					previousmonth_current_provision_sum = previousyears_total_required_sum
							+ currentyear_diffmonth_total_required_sum;

					ProvisionsChartResponsePojo prev_provisionsChartResponsePojo = new ProvisionsChartResponsePojo(
							month, today_year, month + "-" + today_year, previousmonth_planned_provision_sum,
							previousmonth_required_provision_sum, previousmonth_nonrequired_provision_sum,
							previousmonth_invoicesubmit_provision_sum, previousmonth_current_provision_sum);
					provisionsChartResponsePojos.add(prev_provisionsChartResponsePojo);
				}

			}

			double current_year_required_sum = slaProvisionsRepository.findAllByYearAndStatusRequired(today_year);

			provisionsOverallChartResponse.setProvisionschart(provisionsChartResponsePojos);
			provisionsOverallChartResponse.setTotal_required_sum(current_year_required_sum);

			return ResponseHandler.generateResponse("Provisions barchart report retrieved Successfully", true,
					HttpStatus.OK, provisionsOverallChartResponse);

		} catch (Exception e) {
			LOGGER.error("Exceptions happen!: While getting provisions data " + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, null);
		}
	}

	// provision report
	@GetMapping("/provisionreport")
	public ResponseEntity<Object> slaprovisionExport() {
		try {
			String file = slaProvisionsService.slaprovisionExport();
			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + "sla_provision_data.xlsx")
					.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while downloading provision report: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}

	// provision report
	@GetMapping("/testchart")
	public ResponseEntity<Object> testchart() {
		try {
//				slaProvisionScheduler.updatSLAProvisionsToArchieves();
			slaProvisionChartScheduler.updateSlaProvisionChartResponse();
			return ResponseHandler.generateResponse("Test chart added Successfully", true, HttpStatus.OK, null);
		} catch (Exception e) {
			LOGGER.error("Internal Server Error while downloading provision report: " + e.getMessage());
			return ResponseHandler.generateResponse("Server Error, Please contact G3C Admin", false, HttpStatus.OK,
					null);
		}
	}
}

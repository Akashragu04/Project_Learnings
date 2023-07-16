package com.intelizign.dmgcc.services;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.NumberFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.intelizign.dmgcc.models.CostCenterModel;
import com.intelizign.dmgcc.models.FileUploadModel;
import com.intelizign.dmgcc.models.ProjectModel;
import com.intelizign.dmgcc.models.SLAModel;
import com.intelizign.dmgcc.pojoclass.RevenueCostCenterAllocation;
import com.intelizign.dmgcc.pojoclass.SLAContacts;
import com.intelizign.dmgcc.pojoclass.SLAPO;
import com.intelizign.dmgcc.repositories.CostCenterRepository;
import com.intelizign.dmgcc.repositories.FileUploadRepository;
import com.intelizign.dmgcc.repositories.ProjectRepository;
import com.intelizign.dmgcc.repositories.SLARepository;
import com.intelizign.dmgcc.request.C4Drequest;
import com.intelizign.dmgcc.request.SupportingFiles;
import com.intelizign.dmgcc.response.ResponseHandler;

@Service
@Transactional
public class C4DSLAService {

	private static String service_desc = "";
	private static String payment_condition = "";
	File inputFile;

	@Autowired
	FilesStorageServicePath storageServicepath;

	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private SLAService slaservice;

	private java.lang.String attachementsLoc;

	@Autowired
	private SLARepository slaRepository;

	@Autowired
	private CostCenterRepository costCenterRepository;

	@Autowired
	private FileUploadRepository fileUploadRepository;

	public final Logger LOGGER = LogManager.getLogger(C4DSLAService.class);

	public ResponseEntity<Object> createSLAAgreement(C4Drequest requestdata) {
		try {
			SupportingFiles filedata = new SupportingFiles();
			if (!requestdata.getFile().isEmpty()) {
				filedata = requestdata.getFile().get(0);
			} else {
				return ResponseHandler.generateResponse("File Information is Empty", false, HttpStatus.OK, null);
			}

			Optional<ProjectModel> projectData = projectRepository.findById(requestdata.getProject_id());
			if (projectData.isPresent()) {
				Path root = Paths.get("uploads/files");
				attachementsLoc = root.toAbsolutePath().toString();

				String uploadedFile = attachementsLoc + '/' + filedata.getSupporting_files_name();

				inputFile = new File(uploadedFile);

				File output = new File(attachementsLoc + '/' + "SampleText.txt"); // The text file where you are going
																					// to
																					// store the extracted data
				PDDocument pd = PDDocument.load(inputFile);

				PDFTextStripper stripper = new PDFTextStripper();
				stripper.setStartPage(1); // Start extracting from page 1
				stripper.setEndPage(2); // Extract till page 2
				BufferedWriter wr = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(output)));
				stripper.writeText(pd, wr);
				if (pd != null) {
					pd.close();
				}
				wr.close();
				DateTimeFormatter inputformat = DateTimeFormatter.ofPattern("dd-MMM-yy");
				DateTimeFormatter outputformat = DateTimeFormatter.ofPattern("dd-MM-yyyy");
				BufferedReader br = null;
				String strLine = "";
				String str_data = "";
				try {
					File file1 = new File(attachementsLoc + '/' + "SampleText.txt"); // java.io.File
					FileReader fr = new FileReader(file1); // java.io.FileReader
					br = new BufferedReader(fr); // java.io.BufferedReader

					while (strLine != null) {
						if (strLine == null)
							break;
						str_data += strLine;
						strLine = br.readLine();
					}

					SLAModel slaMdl = new SLAModel();
					String[] service_title = str_data.split("Service Agreement Title ");
					String Service_agreement_title_rest = service_title[1];

					String[] agreement_num = Service_agreement_title_rest.split("Service Agreement No.");
					slaMdl.setSlaname(agreement_num[0].trim());
					String agreement_num_rest = agreement_num[1];

					String[] agreement_num_str = agreement_num_rest.split("Effective Date");
					slaMdl.setSlaid(agreement_num_str[0].trim());
					if (Boolean.TRUE.equals(slaRepository.existBySLAId(agreement_num_str[0].trim()))) {
						return ResponseHandler.generateResponse(
								"SLA " + agreement_num_str[0].trim() + " Already Created", false, HttpStatus.OK, null);
					}
					String effecttiveDateRest = agreement_num_str[1];

					String[] effectiveDateStr = effecttiveDateRest.split("Period of Service:");

					LocalDate effective_date = LocalDate.parse(effectiveDateStr[0].trim(), inputformat);
					String formatted_effective_date = effective_date.format(outputformat);
					slaMdl.setEffective_date(formatted_effective_date);
					String period_of_service_rest = effectiveDateStr[1];

					String[] startADates = period_of_service_rest.split("End Date");
					String start_date_str = startADates[0];
					String[] start_date_arr = start_date_str.split("Start Date");
					LocalDate start_date = LocalDate.parse(start_date_arr[1].trim(), inputformat);
					String formatted_start_date = start_date.format(outputformat);
					slaMdl.setStart_date(formatted_start_date);
					String start_dates_rest = startADates[1];

					String[] EndDates = start_dates_rest.split("Service ProviderContact Person");
					LocalDate end_date = LocalDate.parse(EndDates[0].trim(), inputformat);
					String formatted_end_date = end_date.format(outputformat);
					slaMdl.setEnd_date(formatted_end_date);
					String end_date_rest = EndDates[1];

					String[] contactPer = end_date_rest.split("Company Name");
					slaMdl.setProvider_name(contactPer[0].trim());
					String contact_person_rest = contactPer[1];

					String[] companyName = contact_person_rest.split("Cost Center/ CO/WBS element");
					slaMdl.setProvider_company(companyName[0].trim());
					String company_name_rest = companyName[1];

					String[] elementName = company_name_rest.split("Street, House Number");
					slaMdl.setProvider_cost_center(elementName[0].trim());
					String element_name_rest = elementName[1];

					String[] street_name_arr = element_name_rest.split("Postal Code, City, Country");
					slaMdl.setProvider_address(street_name_arr[0].trim());

					String[] postal_code_arr = str_data.split("Postal Code, City, Country");
					String[] postal_code_arr_list = postal_code_arr[1].split("CustomerContact Person");
					slaMdl.setProvider_postal_code(postal_code_arr_list[0].trim());
					String postal_code_arr_arr_rest = postal_code_arr_list[1];

					String[] Customer_contact_name_arr = postal_code_arr_arr_rest.split("Company Name ");
					slaMdl.setCustomer_company(Customer_contact_name_arr[0].trim());
					String Customer_contact_name_arr_rest = Customer_contact_name_arr[1];

					String[] customer_company_name_arr = Customer_contact_name_arr_rest.split("Cost Center");
					slaMdl.setCustomer_company(customer_company_name_arr[0]);
					slaMdl.setCustomer_name(customer_company_name_arr[0]);
					String customer_company_name_arr_rest = customer_company_name_arr[1];

					String[] customer_cost_center_arr = customer_company_name_arr_rest.split("Street, House Number");
					slaMdl.setCustomer_cost_center(customer_cost_center_arr[0].trim());
					String customer_cost_center_arr_rest = customer_cost_center_arr[1];

					String[] customer_street_name_arr = customer_cost_center_arr_rest.split(" Cost Center Manager");

					String[] customer_cost_center_mngr_arr = str_data.split(" Cost Center Manager");
					String customer_cost_center_manager_rest = customer_cost_center_mngr_arr[1];

					String[] customer_cost_center_mngr_rest_arr = customer_cost_center_manager_rest
							.split("Postal Code, City, Country");
					slaMdl.setCustomer_cost_center_manager(customer_cost_center_mngr_rest_arr[0].trim());
					String customer_cost_center_mngr_rest_arr_rest = customer_cost_center_mngr_rest_arr[1];

					String[] customer_postal_code_arr = customer_cost_center_mngr_rest_arr_rest.split("PO-Number");
					String customer_postal_code_arr_rest = customer_postal_code_arr[1];

					slaMdl.setCustomer_address(
							customer_street_name_arr[0].trim() + " " + customer_postal_code_arr[0].trim());
					String[] po_num_arr = customer_postal_code_arr_rest.split("Service");
					if (po_num_arr[0] != null) {
						List<SLAPO> slapoList = new ArrayList<>();
						SLAPO poObj = new SLAPO();
						poObj.setPo_number(po_num_arr[0]);
						poObj.setValue("");
						poObj.setVendor("");
						slapoList.add(poObj);
						slaMdl.setSla_po(slapoList);
					}

					String[] service_descp_arr = str_data
							.split("(if available please add an Annex with further specification)");

					String[] service_descp_arr_list = service_descp_arr[1].split("Expected Total Costs");
					String service_desc_str = service_descp_arr_list[0];
					if (service_desc_str.startsWith(")")) {
						String[] words = service_desc_str.split("[\\s@&?$)+-]+");
						for (String w : words) {
							if (w.length() != 0) {
								service_desc = service_desc + w + " ";
							}
						}
						slaMdl.setService_description(service_desc);
					}

					String service_descp_arr_list_rest = service_descp_arr_list[1];

					String[] expected_total_cost_arr = service_descp_arr_list_rest.split("-");
					String[] currency_type = expected_total_cost_arr[0].split(" ");
					slaMdl.setCurrency(currency_type[1]);
					Number expe_total_cost = NumberFormat.getNumberInstance(java.util.Locale.US)
							.parse(currency_type[2]);
					slaMdl.setTotal_budget((Long) expe_total_cost);

					String[] payment_condition_arr_list = str_data.split(
							"(optional, in case of deviation from the General Terms and Conditions on Intra Group Services)");
					String[] payment_condition_arr = payment_condition_arr_list[1].split("Signatures");
					String payment_cond = payment_condition_arr[0];
					if (payment_cond.startsWith(")")) {
						String[] words = payment_cond.split("[\\s@&?$)+-]+");
						for (String w : words) {
							if (w.length() != 0) {
								payment_condition = payment_condition + w + " ";
							}
						}
						slaMdl.setBilling_cycle(requestdata.getBilling_cycle());
					}

					String[] name_dept_sign_arr = payment_condition_arr[1].split("SignatureName,Department");
					String[] name_dept_sign_arr_list = name_dept_sign_arr[1].split("Name,Department");

					String[] name_dept_sign_arr_two = name_dept_sign_arr_list[1]
							.split("CustomerPlace & DateSignaturePlace & Date SignatureName,Department");

					String[] customer_name_arr_list = str_data
							.split("CustomerPlace & DateSignaturePlace & DateSignatureName,Department");
					String[] customer_name_arr = customer_name_arr_list[1].split("Name,Department");

					String[] customer_name_arr_list_two = customer_name_arr[1].split("Travel costs shall be charged");

					List<SLAContacts> slaContactsList = new ArrayList<>();

					SLAContacts slaContactsObj = new SLAContacts();
					slaContactsObj.setName(name_dept_sign_arr_list[0].trim());
					slaContactsObj.setCustomer_type("Service Provider");
					slaContactsObj.setIs_sla(true);
					slaContactsObj.setIs_pre_invoice(true);

					SLAContacts slaContactsTwoObj = new SLAContacts();
					slaContactsTwoObj.setName(name_dept_sign_arr_two[0].trim());
					slaContactsTwoObj.setCustomer_type("Service Provider");
					slaContactsTwoObj.setIs_sla(true);

					slaContactsList.add(slaContactsObj);
					slaContactsList.add(slaContactsTwoObj);

					SLAContacts slaCustomerContactsObj = new SLAContacts();
					slaCustomerContactsObj.setName(customer_name_arr[0].trim());
					slaCustomerContactsObj.setCustomer_type("Service Receiver");
					slaCustomerContactsObj.setIs_sla(true);
					slaContactsObj.setIs_pre_invoice(true);

					SLAContacts slaCustomerContactsObjTwoObj = new SLAContacts();
					slaCustomerContactsObjTwoObj.setName(customer_name_arr_list_two[0].trim());
					slaCustomerContactsObjTwoObj.setCustomer_type("Service Receiver");
					slaCustomerContactsObjTwoObj.setIs_sla(true);

					slaContactsList.add(slaCustomerContactsObj);
					slaContactsList.add(slaCustomerContactsObjTwoObj);
					slaMdl.setSla_contacts(slaContactsList);

					br.close();
//					slaMdl.setStatus("Approved");
//					SLAModel slaData = slaRepository.save(slaMdl);
//					storageServicepath.delete(attachementsLoc + '/' + "SampleText.txt");
//					List<SLAcycle> slaCycles = slaservice.getSLAcycle(slaData);
//					slaData.setInvoice_cycle(slaCycles);
//					SLAModel preinvoice_generated_slaData = slaRepository.save(slaData);

					for (SupportingFiles sla_term : requestdata.getFile()) {
						FileUploadModel fileUploadModel = new FileUploadModel();
						fileUploadModel.setId(sla_term.getId());
						fileUploadModel.setSupporting_files_name(sla_term.getSupporting_files_name());
						fileUploadModel.setSupporting_files_url(sla_term.getSupporting_files_url());
						fileUploadModel.setMapped(true);
						fileUploadRepository.save(fileUploadModel);

					}

					slaMdl.setAttachments(requestdata.getFile());
					slaMdl.setProject(projectData.get());
					slaMdl.setProject_name(projectData.get().getProject_name());
					slaMdl.setProject_code(projectData.get().getProject_id());
					Optional<CostCenterModel> costcenter = costCenterRepository
							.findByCostcenter(projectData.get().getCost_center());

					List<RevenueCostCenterAllocation> revenue_costcenter = new ArrayList<>();

					RevenueCostCenterAllocation costcenterData = new RevenueCostCenterAllocation();

					costcenterData.setCost_center(slaMdl.getProvider_cost_center());

					revenue_costcenter.add(costcenterData);

					slaMdl.setRevenue_cost_center(revenue_costcenter);

					if (costcenter.isPresent()) {
						slaMdl.setTeam(costcenter.get().getTeam());
					}

					return ResponseHandler.generateResponse("sla agreement pdf has been read successfully ", true,
							HttpStatus.OK, slaMdl);
				}

				catch (IOException e) {
					LOGGER.error("Error while reading pdf form fields" + e.getMessage());
					e.printStackTrace();
				} finally {
					try {
						if (br != null)
							br.close();
					} catch (IOException e) {
						LOGGER.error("Error while reading pdf form fields" + e.getMessage());
						e.printStackTrace();
					}
				}

			} else {
				return ResponseHandler.generateResponse("project id " + requestdata.getProject_id() + " doesn't exist",
						true, HttpStatus.OK, null);
			}

		} catch (Exception e) {
			SupportingFiles filedata = new SupportingFiles();
			if (!requestdata.getFile().isEmpty()) {
				filedata = requestdata.getFile().get(0);
			}
			storageServicepath.delete(filedata.getSupporting_files_name());
			storageServicepath.delete(attachementsLoc + '/' + "SampleText.txt");
			LOGGER.error("Error while reading pdf form fields" + e.getMessage());
			return ResponseHandler.generateResponse("Internal Server Error, Please contact G3C Admin", false,
					HttpStatus.OK, e.getStackTrace());
		}
		return null;

	}

}

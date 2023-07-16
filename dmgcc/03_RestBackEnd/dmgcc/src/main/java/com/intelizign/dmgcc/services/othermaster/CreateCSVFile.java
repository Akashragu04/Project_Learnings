package com.intelizign.dmgcc.services.othermaster;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.apache.commons.csv.QuoteMode;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.intelizign.dmgcc.models.ProjectModel;
import com.intelizign.dmgcc.models.othermaster.ForexRatesModel;
import com.intelizign.dmgcc.models.othermaster.MaterailCodeModel;
import com.intelizign.dmgcc.repositories.ProjectRepository;
import com.intelizign.dmgcc.repositories.othermaster.ForexRatesRepository;
import com.intelizign.dmgcc.repositories.othermaster.MaterialCodeRepository;

@Service
public class CreateCSVFile {

	@Autowired
	private ProjectRepository projectRepo;

	@Autowired
	private MaterialCodeRepository materialRepo;

	@Autowired
	private ForexRatesRepository forexRepo;

	public final Logger LOGGER = LogManager.getLogger(CreateCSVFile.class);

	public ByteArrayInputStream loadMaterialObjs() {
		List<MaterailCodeModel> materialObjs = materialRepo.findAllByOrderById();
		return writeToCSV(materialObjs);
	}

	public ByteArrayInputStream writeToCSV(List<MaterailCodeModel> materialObjs) {

		final CSVFormat format = CSVFormat.DEFAULT.withQuoteMode(QuoteMode.MINIMAL);
		try (ByteArrayOutputStream out = new ByteArrayOutputStream();

				CSVPrinter csvPrinter = new CSVPrinter(new PrintWriter(out), format);) {

			List<Object> headers = new ArrayList<>();

			headers = Arrays.asList("CostCenter", "MaterialName", "Code", "Description", "SACCode", "Country",
					"HasMarkup", "IsActive", "IsTaxable", "Fx", "WHT");

			csvPrinter.printRecord(headers);
			int hashmarkupvalue;
			int isactivevalue;
			int istaxablevalue;
			int is_wht_value;
//			int isgstvalue;
			int isfxvalue;

			for (MaterailCodeModel materialCode : materialObjs) {
				if (Boolean.TRUE.equals(materialCode.getHas_markup())) {
					hashmarkupvalue = 1;
				} else {
					hashmarkupvalue = 0;
				}
				if (Boolean.TRUE.equals(materialCode.getIsactive())) {
					isactivevalue = 1;
				} else {
					isactivevalue = 0;
				}
				if (Boolean.TRUE.equals(materialCode.getHas_wht())) {
					is_wht_value = 1;
				} else {
					is_wht_value = 0;
				}
				if (Boolean.TRUE.equals(materialCode.getIs_taxable())) {
					istaxablevalue = 1;
				} else {
					istaxablevalue = 0;
				}
				if (Boolean.TRUE.equals(materialCode.getHas_fx())) {
					isfxvalue = 1;
				} else {
					isfxvalue = 0;
				}

				List<Object> values = new ArrayList<>();
				values = Arrays.asList(materialCode.getCostcenter(), materialCode.getMaterialname(),
						materialCode.getCode(), materialCode.getDescription(), materialCode.getSaccode(),
						materialCode.getCountry(), hashmarkupvalue, isactivevalue, istaxablevalue, isfxvalue,
						is_wht_value);
				csvPrinter.printRecord(values);
			}

			csvPrinter.flush();
			return new ByteArrayInputStream(out.toByteArray());
		} catch (IOException e) {
			LOGGER.error("fail to import data to CSV file: " + e.getMessage());
			return null;
		}
	}

	public ByteArrayInputStream loadForexObjs() {

		List<ForexRatesModel> forexObjs = forexRepo.findAllByOrderById();
		return writeTForexoCSV(forexObjs);

	}

	public ByteArrayInputStream writeTForexoCSV(List<ForexRatesModel> forexObjs) {

		final CSVFormat format = CSVFormat.DEFAULT.withQuoteMode(QuoteMode.MINIMAL);
		try (ByteArrayOutputStream out = new ByteArrayOutputStream();

				CSVPrinter csvPrinter = new CSVPrinter(new PrintWriter(out), format);) {

			List<Object> headers = new ArrayList<>();

			headers = Arrays.asList("Currency", "To INR", "Year");

			csvPrinter.printRecord(headers);
			for (ForexRatesModel forexrates : forexObjs) {
				List<Object> values = new ArrayList<>();
				values = Arrays.asList(forexrates.getCurrency(), forexrates.getTo_inr(), forexrates.getYear());
				csvPrinter.printRecord(values);
			}

			csvPrinter.flush();
			return new ByteArrayInputStream(out.toByteArray());
		} catch (IOException e) {

			LOGGER.error("fail to import data to CSV file: " + e.getMessage());
			return null;
		}
	}

	public ByteArrayInputStream loadProjects() {
		List<ProjectModel> projectObjs = projectRepo.findAllByOrderById();
		return writeProjectToCSV(projectObjs);
	}

	public ByteArrayInputStream writeProjectToCSV(List<ProjectModel> projectObjs) {

		final CSVFormat format = CSVFormat.DEFAULT.withQuoteMode(QuoteMode.MINIMAL);
		try (ByteArrayOutputStream out = new ByteArrayOutputStream();

				CSVPrinter csvPrinter = new CSVPrinter(new PrintWriter(out), format);) {

			List<Object> headers = new ArrayList<>();

			headers = Arrays.asList("Project ID", "Project Code", "Project Name", "Customer", "Status", "SLA Value",
					"Invoice Value", "IO Number", "Year", "Io Mapping key");

			csvPrinter.printRecord(headers);

			for (ProjectModel projects : projectObjs) {

				if (projects.getIoMapping() != null && !projects.getIoMapping().isEmpty()) {
					List<String> unique_years = projects.getIoMapping().stream().map(io_mapping -> io_mapping.getYear())
							.distinct().sorted().toList();

					if (unique_years != null && !unique_years.isEmpty()) {
						for (int year = 0; year < unique_years.size(); year++) {
							final int index = year;
							List<String> ionumbers = projects.getIoMapping().stream()
									.filter(e -> e.getYear().equals(unique_years.get(index))).map(e -> e.getIonumber())
									.collect(Collectors.toList());

							String ionumbersString = String.join(" - ", ionumbers);

							List<Object> values = new ArrayList<>();
							values = Arrays.asList(projects.getId(), projects.getProject_id(),
									projects.getProject_name(), projects.getService_provider(), projects.getStatus(),
									projects.getSla_value(), projects.getInvoice_value(), ionumbersString,
									unique_years.get(index), projects.getIoMappingKey());
							csvPrinter.printRecord(values);
						}
					}
				} else {
					List<Object> values = new ArrayList<>();
					values = Arrays.asList(projects.getId(), projects.getProject_id(), projects.getProject_name(),
							projects.getService_provider(), projects.getStatus(), projects.getSla_value(),
							projects.getInvoice_value(), projects.getActiveIoNumber(), projects.getActiveIoNumber(),
							projects.getIoMappingKey());
					csvPrinter.printRecord(values);
				}
//					else if (projects.getActiveIoNumber() != null && !projects.getActiveIoNumber().isEmpty()
//						&& projects.getIoMapping().isEmpty()) {
//
//					List<Object> values = new ArrayList<>();
//					values = Arrays.asList(projects.getId(), projects.getProject_id(), projects.getProject_name(),
//							projects.getService_provider(), projects.getStatus(), projects.getSla_value(),
//							projects.getInvoice_value(), projects.getActiveIoNumber(), projects.getActiveIoNumber(),
//							projects.getIoMappingKey());
//					csvPrinter.printRecord(values);
//				}

			}

			csvPrinter.flush();
			return new ByteArrayInputStream(out.toByteArray());
		} catch (IOException e) {

			LOGGER.error("fail to import data to CSV file: " + e.getMessage());
			return null;
		}
	}

}

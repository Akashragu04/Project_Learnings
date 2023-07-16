/*
 *
 */
package com.daimler.schematicbackend.service.async;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.ObjectUtils;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.daimler.schematicbackend.config.SchematicMiscConfig;
import com.daimler.schematicbackend.entity.file.CommodityRenderable;
import com.daimler.schematicbackend.entity.file.FileData;
import com.daimler.schematicbackend.entity.file.KeyForKitAndAssemblyValidation;
import com.daimler.schematicbackend.entity.file.SAMapping;
import com.daimler.schematicbackend.entity.file.SGMapping;
import com.daimler.schematicbackend.exception.file.SchematicFileException;
import com.daimler.schematicbackend.model.file.SchematicCommodityMappingExcelData;
import com.daimler.schematicbackend.model.master.SchematicA06MasterModel;
import com.daimler.schematicbackend.model.master.SchematicCommodityA06Model;
import com.daimler.schematicbackend.repository.file.SchematicFileDataRepository;
import com.daimler.schematicbackend.repository.file.SchematicRenderableRepository;
import com.daimler.schematicbackend.repository.file.SchematicSGMappingRepository;
import com.daimler.schematicbackend.repository.master.KitAndAssemblyValidationRepository;
import com.daimler.schematicbackend.repository.master.SchematicSAMappingRepository;
import com.poiji.bind.Poiji;

/**
 * The Class SchematicAsyncExcelService.
 */
@Service
public class SchematicAsyncExcelService {
	@Autowired
	SessionFactory sessionFactory;

	/**
	 * The repository.
	 */
	@Autowired
	SchematicSAMappingRepository repository;

	/**
	 * The schematic misc config.
	 */
	@Autowired
	SchematicMiscConfig schematicMiscConfig;

	/**
	 * The schematic misc config.
	 */
	@Autowired
	KitAndAssemblyValidationRepository kitAndAssemblyValidationRepository;

	/**
	 * The resource loader.
	 */
	@Autowired
	ResourceLoader resourceLoader;

	/**
	 * The renderable repository.
	 */
	@Autowired
	SchematicRenderableRepository renderableRepository;

	/**
	 * The Sg mapping repository.
	 */
	@Autowired
	SchematicSGMappingRepository sgMappingRepository;

	/**
	 * The File data repository.
	 */
	@Autowired
	SchematicFileDataRepository fileDataRepository;

	/**
	 * Insert master data.
	 *
	 * @throws IOException            Signals that an I/O exception has occurred.
	 * @throws SchematicFileException the schematic file exception
	 */
	@Async("schematicAsyncExcelExecutor")
	public void insertMasterData() throws IOException, SchematicFileException {

		if (checkIfDataExists()) {
			System.out.println("Entered Uploading");
			List<SAMapping> mappingList = new ArrayList<>();
			saveA06MasterDatafromExcel(mappingList);
			Resource resource = resourceLoader.getResource("classpath:static/excel-data/Commodity_A06_Mapping.xlsx");
			InputStream excelStream = resource.getInputStream();
			if (ObjectUtils.isNotEmpty(excelStream)) {

				File file = new File(System.getProperty("user.dir") + "Commodity_A06_Mapping.xlsx");
				FileUtils.copyInputStreamToFile(excelStream, file);
				List<SchematicCommodityA06Model> dataList = Poiji.fromExcel(file, SchematicCommodityA06Model.class);
//			Files.deleteIfExists(Paths.get(SchematicFileConstant.BASE_PATH, "Commodity_A06_Mapping.xlsx"));

				validateAndSaveDatabase(mappingList, dataList, "Commodity_A06_Mapping.xlsx");
			}
			if (ObjectUtils.isNotEmpty(mappingList)) {
				saveToDatabase(mappingList, true);
			}

		}
	}

	private void saveA06MasterDatafromExcel(List<SAMapping> mappingList) throws IOException, SchematicFileException {
//		File allFile = new File(System.getProperty("user.dir") + "\\src\\main\\resources\\static\\SA-Mapping");
		System.out.println(System.getProperty("user.dir"));
//		File[] files = allFile.listFiles();
		List<String> files = Arrays.asList("S67batch1.xlsx", "S67batch2.xlsx", "S67batch3.xlsx", "S67batch4.xlsx",
				"S67batch5.xlsx", "S67batch6.xlsx", "S67batch7.xlsx", "S68batch1.xlsx", "S69batch1.xlsx",
				"S70batch1.xlsx", "S72batch1.xlsx", "S76batch1.xlsx", "S80batch1.xlsx", "S81batch1.xlsx",
				"S81batch2.xlsx", "S82batch1.xlsx", "S85batch1.xlsx", "S83batch1.xlsx", "S87batch1.xlsx",
				"S88batch1.xlsx");
		for (String fileName : files) {

			Resource resource = resourceLoader.getResource("classpath:static/SA-Mapping/" + fileName);
			InputStream excelStream = resource.getInputStream();
			if (ObjectUtils.isNotEmpty(excelStream)) {
				File file = new File(System.getProperty("user.dir") + fileName);
				System.out.println("Loading " + fileName);
				FileUtils.copyInputStreamToFile(excelStream, file);
				List<SchematicCommodityA06Model> dataList = Poiji.fromExcel(file, SchematicCommodityA06Model.class);
//				Files.deleteIfExists(Paths.get(SchematicFileConstant.BASE_PATH, "Commodity_A06_Mapping.xlsx"));
				validateAndSaveDatabase(mappingList, dataList, file.getName());
			}

		}

	}

	/**
	 * Mark renderability.
	 */
//    @Async("schematicAsyncExcelExecutor")
//    public void markRenderability() {
//    	System.out.print("test "+ LocalDateTime.now());
//       List<CommodityRenderable> renderableList = renderableRepository.findByRenderableFalse();
//        renderableList.stream().forEach(elem -> {
//            List<SGMapping> sgMappingList = sgMappingRepository.findBySxxName(elem.getCommodityName());
//            
//            if (ObjectUtils.isNotEmpty(sgMappingList)) {
//                long count = sgMappingList.stream().map(SGMapping::getG06Name)
//                        .filter(val -> fileDataRepository.existsByFileNameAndUploadedTrue(val)).count();
//                System.out.print(sgMappingList.size()+"Sg  count"+count +" com "+elem.getCommodityName());
//              
//                if (count == sgMappingList.size()) {
//                	System.out.print("rended "+ LocalDateTime.now());
//                    elem.setRenderable(true);
//                    renderableRepository.save(elem);
//                }
//            }
//        });
//
//    }

	@Async("schematicAsyncExcelExecutor")
	public void markRenderability() {
		System.out.println("Assigning renderable to uplaoded commodity " + LocalDateTime.now());
		List<CommodityRenderable> renderableList = renderableRepository.findByRenderableFalse();
		List<SGMapping> sgMappingList = sgMappingRepository.findAll();
		List<FileData> fileDataList = fileDataRepository.findAll();
		renderableList.stream().forEach(elem -> {
			List<SGMapping> sgMappingLists = sgMappingList.stream()
					.filter(sg -> sg.getSxxName().equals(elem.getCommodityName())).collect(Collectors.toList());

			if (ObjectUtils.isNotEmpty(sgMappingLists)) {
				AtomicLong count = new AtomicLong(0);
				sgMappingLists.stream().forEach(sgData -> {
					fileDataList.stream().forEach(fileData -> {
						if (sgData.getG06Name().equals(fileData.getFileName())) {
							count.set(count.get() + 1);
						}
					});
				});
				if (count.get() == sgMappingLists.size()) {
					System.out.println("Renderable changed to Commodity the  " + elem.getCommodityName() + " "
							+ LocalDateTime.now());
					elem.setRenderable(true);
					renderableRepository.save(elem);
				}
			}
		});

	}

	/**
	 * Validate and save database.
	 *
	 * @param mappingList the mapping list
	 * @param dataList    the data list
	 * @throws SchematicFileException the schematic file exception
	 */
	private void validateAndSaveDatabase(List<SAMapping> mappingList, List<SchematicCommodityA06Model> dataList,
			String filename) throws SchematicFileException {
		ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
		Validator validator = factory.getValidator();
		for (SchematicCommodityA06Model data : dataList) {
			Set<ConstraintViolation<SchematicCommodityA06Model>> violations = validator.validate(data);
			if (ObjectUtils.isNotEmpty(violations)) {
				throw new SchematicFileException("Master Data " + filename + " sheet contains error");
			}
			mappingList.add(schematicMiscConfig.getModelMapper().map(data, SAMapping.class));
		}
	}

	/**
	 * Save to database.
	 *
	 * @param dataList the data list
	 */
	private void saveToDatabase(List<SAMapping> dataList, boolean isrenderablelist) {
//		repository.saveAll(dataList);
		int batchSize = 100;
		int numberOfElements = dataList.size();
		Session session = sessionFactory.openSession();
		Transaction tx;
		int j = 0;
		while (numberOfElements > 0 && numberOfElements != j) {
			System.out.println("Batch wise uploading is in process");
//			numberOfElements -= batchSize;
			tx = session.beginTransaction();

			for (int i = 0; i < batchSize; i++) {
				if (numberOfElements == j) {
					break;
				}
				session.save(dataList.get(j));
				j++;
			}
			tx.commit();
			session.clear();
		}

//		dataList.stream().forEach(data -> {
//			System.out.println("saving data");
//
//			repository.save(data);
//		});

		if (isrenderablelist) {
			List<CommodityRenderable> renderableList = dataList.stream()
					.map(elem -> CommodityRenderable.builder().commodityName(elem.getSxxName())
							.commodityDescription(elem.getSxxDescription()).renderable(false).build())
					.distinct().collect(Collectors.toList());
			if (ObjectUtils.isNotEmpty(renderableList)) {
				renderableList.stream()
						.filter(elem -> !renderableRepository.existsByCommodityName(elem.getCommodityName()))
						.forEach(elem -> renderableRepository.save(elem));
			}
		}
	}

	/**
	 * Check if data exists.
	 *
	 * @return true, if successful
	 */
	private boolean checkIfDataExists() {
		return repository.count() <= 0;
	}

	/**
	 * Remove kit part and assembly part in SA Maspping.
	 */

	@Async("schematicAsyncExcelExecutor")
	public void saveA06ValidatingMasterData() throws IOException, SchematicFileException {
		KeyForKitAndAssemblyValidation preValidation = getApprovetoValidate();
		if (preValidation.isValidateKitAndAssemble()) {
			List<SchematicA06MasterModel> masterA06s = new ArrayList<>();
			System.out.println("Removing Kit and Assembly Part in SA Mapping");
			List<String> files = Arrays.asList("Assembly_A06.xlsx", "Kit_A06.xlsx");
			for (String fileName : files) {

				Resource resource = resourceLoader.getResource("classpath:static/A06_Master/" + fileName);
				InputStream excelStream = resource.getInputStream();
				if (ObjectUtils.isNotEmpty(excelStream)) {
					File file = new File(System.getProperty("user.dir") + fileName);
					System.out.println("Loading " + fileName);
					FileUtils.copyInputStreamToFile(excelStream, file);
					List<SchematicA06MasterModel> dataList = Poiji.fromExcel(file, SchematicA06MasterModel.class);
					validatingA06MAster(dataList, fileName);
					masterA06s.addAll(dataList);
				}
			}
			if (ObjectUtils.isNotEmpty(masterA06s)) {
				changeKitAndAssemblyPart(masterA06s);
			}
		}

	}

	/**
	 * Remove comodities which are not in our project.
	 * 
	 * @throws IOException
	 * 
	 */
	@Async("schematicAsyncExcelExecutor")
	public void removeComoditiesFromSAmapping() throws IOException {

		KeyForKitAndAssemblyValidation preValidation = getApprovetoValidate();
		if (preValidation.isRemoveCommodities()) {
			System.out.println("Removing Commodities which are not in our project");
			String fileName = "Commodity_List.xlsx";
			Resource resource = resourceLoader.getResource("classpath:static/A06_Master/" + fileName);
			InputStream excelStream = resource.getInputStream();
			if (ObjectUtils.isNotEmpty(excelStream)) {
				File file = new File(System.getProperty("user.dir") + fileName);
				System.out.println("Loading " + fileName);
				FileUtils.copyInputStreamToFile(excelStream, file);
				List<SchematicCommodityMappingExcelData> dataList = Poiji.fromExcel(file,
						SchematicCommodityMappingExcelData.class);
				List<String> commodityList = dataList.stream().map(SchematicCommodityMappingExcelData::getSxxName)
						.distinct().collect(Collectors.toList());

				System.out.println("Total SA-Mapping before removing commodities " + repository.count());

				System.out.println(
						"Total Renderable commodity before removing commodities " + renderableRepository.count());

				repository.deleteAllSAmappingByCommodityName(commodityList);

				renderableRepository.deleteAllByCommodityName(commodityList);

				System.out.println("Total SA-Mapping after removing commodities " + repository.count());
				System.out.println(
						"Total Renderable commodity after removing commodities " + renderableRepository.count());

				preValidation.setRemoveCommodities(false);
				kitAndAssemblyValidationRepository.save(preValidation);

			}

		}
	}

	/**
	 * Remove kit part and Add assembly part in SA Maspping.
	 */

	private void changeKitAndAssemblyPart(List<SchematicA06MasterModel> masterA06s) {

		List<SAMapping> allNewSAData = new ArrayList<>();

		// get apart names

		List<String> a06AssemblyNames = masterA06s.stream()
				.filter(master -> master.getFileType().equals("ASSEMBLY A06"))
				.map(SchematicA06MasterModel::getA06Number).distinct().collect(Collectors.toList());

//		 Store sub A06s for assembly part in SA Mapping
		a06AssemblyNames.stream().forEach(data -> {
			List<SAMapping> saData = repository.findByA06Name(data);
			if (ObjectUtils.isNotEmpty(saData)) {

				// get sub-a06 for particular a06

				List<String> subA06s = masterA06s.stream().filter(subdata -> subdata.getA06Number().equals(data))
						.map(SchematicA06MasterModel::getSubApart).collect(Collectors.toList());

				// save sub-a06 in sa mapping
				subA06s.stream().forEach(subA06data -> {

					List<SAMapping> newSAData = new ArrayList<>();

					// save new SA MApping
					saData.stream().forEach(saMappingData -> {
						saMappingData.setA06Name(subA06data);
						newSAData.add(saMappingData);
					});

					allNewSAData.addAll(newSAData);

				});

			}

			System.out.println("Changes Happening for " + data);
		});

		System.out.println("Stored all new sub A06 " + allNewSAData.size());

		System.out.println("Total SA-Mapping before saving sub Aparts " + repository.count());

		// Save stored sub A06s

		saveToDatabase(allNewSAData, false);

		System.out.println("Total SA-Mapping after saving sub Aparts " + repository.count());

		System.out.println("Successfully Added sub A06 for all Assembly A06 part");

		// delete All Kit and Assembly part

		List<String> a06Names = masterA06s.stream().map(SchematicA06MasterModel::getA06Number).distinct()
				.collect(Collectors.toList());

		repository.deleteAllSAmappingApartName(a06Names);

		System.out.println("Total SA-Mapping after deleting Kit Part and Assemble A part" + repository.count());

		System.out.println("Successfully deleted Kit Part and Assemble A part");

		// stop validating again once its completed

		KeyForKitAndAssemblyValidation key = kitAndAssemblyValidationRepository.findById(1l).get();
		key.setValidateKitAndAssemble(false);
		kitAndAssemblyValidationRepository.save(key);
	}

	/**
	 * Validation of kit part and assembly part excel.
	 */

	private void validatingA06MAster(List<SchematicA06MasterModel> dataList, String fileName)
			throws SchematicFileException {
		ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
		Validator validator = factory.getValidator();
		for (SchematicA06MasterModel data : dataList) {
			Set<ConstraintViolation<SchematicA06MasterModel>> violations = validator.validate(data);
			if (ObjectUtils.isNotEmpty(violations)) {
				throw new SchematicFileException("A06 Master Data " + fileName + " sheet contains error");
			}
		}
	}

	public KeyForKitAndAssemblyValidation getApprovetoValidate() {
		KeyForKitAndAssemblyValidation key;
		if (kitAndAssemblyValidationRepository.count() <= 0) {
			key = kitAndAssemblyValidationRepository.save(new KeyForKitAndAssemblyValidation(1, true, true));
		} else {
			key = kitAndAssemblyValidationRepository.findById(1l).get();
		}
		return key;

	}

}

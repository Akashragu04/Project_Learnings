package com.daimler.schematicbackend.service.render;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.stream.Collectors;
import java.util.zip.DataFormatException;

import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.daimler.schematicbackend.embeddable.G06Embeddable;
import com.daimler.schematicbackend.entity.file.A06Data;
import com.daimler.schematicbackend.entity.file.CommodityDetails;
import com.daimler.schematicbackend.entity.file.CustomImage;
import com.daimler.schematicbackend.entity.file.DatabaseFileData;
import com.daimler.schematicbackend.entity.file.G06Data;
import com.daimler.schematicbackend.entity.file.SAMapping;
import com.daimler.schematicbackend.entity.file.SGMapping;
import com.daimler.schematicbackend.entity.render.CommodityMaximum;
import com.daimler.schematicbackend.entity.render.G06RenderData;
import com.daimler.schematicbackend.entity.render.RealignmentModel;
import com.daimler.schematicbackend.entity.render.RenderModel;
import com.daimler.schematicbackend.entity.render.RenderModel$;
import com.daimler.schematicbackend.entity.render.SchematicWireColor;
import com.daimler.schematicbackend.exception.file.SchematicFileException;
import com.daimler.schematicbackend.model.render.CommoditySearchRequest;
import com.daimler.schematicbackend.model.render.SchematicBasicConnectorData;
import com.daimler.schematicbackend.model.render.SchematicDestination;
import com.daimler.schematicbackend.model.render.SchematicRenderResponse;
import com.daimler.schematicbackend.model.render.SchematicSourceDestinationMapping;
import com.daimler.schematicbackend.repository.file.SchematicA06DataRepository;
import com.daimler.schematicbackend.repository.file.SchematicCommodityA06Repository;
import com.daimler.schematicbackend.repository.file.SchematicCommodityDetailsRepository;
import com.daimler.schematicbackend.repository.file.SchematicCustomImageRepository;
import com.daimler.schematicbackend.repository.file.SchematicDatabaseDataRepository;
import com.daimler.schematicbackend.repository.file.SchematicG06DataRepository;
import com.daimler.schematicbackend.repository.file.SchematicSGMappingRepository;
import com.daimler.schematicbackend.repository.render.RealignmentModelRepository;
import com.daimler.schematicbackend.repository.render.SchematicCommodityMaxRepository;
import com.daimler.schematicbackend.repository.render.SchematicG06Repository;
import com.daimler.schematicbackend.repository.render.SchematicRenderModelRepository;
import com.daimler.schematicbackend.repository.render.SchematicWireColorRepository;
import com.daimler.schematicbackend.utils.file.SchematicFileCompressionUtils;
import com.daimler.schematicbackend.utils.render.SchematicPortDesignationUtils;
import com.speedment.jpastreamer.application.JPAStreamer;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class SchematicRenderService {
//	@Autowired
//	SchematicAsyncExcelService test;

	@Autowired
	SchematicSGMappingRepository sgMappingRepository;

	@Autowired
	SchematicCommodityA06Repository schematicCommodityA06Repository;

	@Autowired
	SchematicDatabaseDataRepository mdRepo;

	@Autowired
	SchematicCommodityDetailsRepository commodityDetailsRepository;

	@Autowired
	SchematicG06DataRepository g06DataRepository;
	@Autowired
	SchematicA06DataRepository a06DataRepository;

	@Autowired
	SchematicCustomImageRepository imageRepository;

	@Autowired
	SchematicPortDesignationUtils connectorUtils;

	@Autowired
	JPAStreamer streamer;

	@Autowired
	SchematicG06Repository g06Repository;

	@Autowired
	SchematicRenderModelRepository repository;

	@Autowired
	SchematicCommodityMaxRepository maxRepository;

	@Autowired
	SchematicWireColorRepository schematicWireColorRepository;

	@Autowired
	RealignmentModelRepository realignmentModelRepository;

	public SchematicRenderResponse generateRenderModel(Map<String, DatabaseFileData> metadataMap,
			String commoditySearched) throws IOException, SchematicFileException {

//		test.insertMasterData();
//		test.saveA06ValidatingMasterData();
//		test.removeComoditiesFromSAmapping();

		List<String> errorMessage = new ArrayList<>();

		List<String> gPartMapping = getAllRelatedGParts(commoditySearched);
		List<String> aPartMapping = getAllRelatedAParts(commoditySearched);
		List<String> uploadedAPartMapping = a06DataRepository.findAll().stream().map(A06Data::getA06name)
				.collect(Collectors.toList());

		aPartMapping.stream().forEach(a06Name -> {
			boolean isPresent = false;
			for (String a06 : uploadedAPartMapping) {
				if (a06.equals(a06Name)) {
					isPresent = true;
				}
			}
			if (!isPresent) {
				errorMessage.add("A06 file " + a06Name + " is Missing");
			}

		});
//		if (ObjectUtils.isNotEmpty(errorMessage)) {
//			throw new SchematicFileException("Please upload all A06 files");
//			return new SchematicRenderResponse(errorMessage);
//		}

		List<G06Embeddable> excelData = createListForGParts(gPartMapping, commoditySearched);
		List<A06Data> excelDataAPart = createListForAParts(aPartMapping);
		// image list
		List<CustomImage> imagesList = imageRepository.findByCommodityName(commoditySearched);
		List<G06Embeddable> g06Data = excelData;
		Map<String, SchematicBasicConnectorData> basicConnectorData = new HashMap<>();
		LinkedHashMap<String, SchematicSourceDestinationMapping> map = new LinkedHashMap<>();
		List<RenderModel> renderModelList = new ArrayList<>();
		List<G06RenderData> validWireList = new ArrayList<>();
		Map<String, String> labelMap = generateLabelFromMetadata(metadataMap);
		HashSet<String> dualConnectorList = new HashSet<>();
		HashSet<String> singleConnectorList = new HashSet<>();
		HashSet<String> customImageList = new HashSet<>();
		List<String> uniqueCircuits = new ArrayList<>();
		List<String> renderedEntities = new ArrayList<>();
		List<Integer> xyRowColList = Arrays.asList(new Integer[] { 0, 0, 100, 50 });
		// int[][] pos= new int[5][5];
		try {
			for (G06Embeddable data : excelData) {
				String source = data.getOriginDes();
				String destination = data.getMatingDes();
				DatabaseFileData sourceMd = metadataMap.get(source);
				DatabaseFileData destMd = metadataMap.get(destination);
				String sourceImageName = ObjectUtils.isEmpty(sourceMd) || StringUtils.isEmpty(sourceMd.getImageName())
						? StringUtils.EMPTY
						: StringUtils.toRootUpperCase(sourceMd.getImageName()).replaceAll("[ _]", StringUtils.EMPTY)
								+ ".PNG";
				String destImageName = ObjectUtils.isEmpty(destMd) || StringUtils.isEmpty(destMd.getImageName())
						? StringUtils.EMPTY
						: StringUtils.toRootUpperCase(destMd.getImageName()).replaceAll("[ _]", StringUtils.EMPTY)
								+ ".PNG";
				byte[] sourceImage = ObjectUtils.isEmpty(sourceMd) ? null
						: getImage(sourceImageName, commoditySearched, imagesList);
				byte[] destImage = ObjectUtils.isEmpty(destMd) ? null
						: getImage(destImageName, commoditySearched, imagesList);
				if (metadataMap.containsKey(data.getOriginDes()) && metadataMap.containsKey(data.getMatingDes())) {
					generateSchematicBasicConnectorData(data.getOriginDes(), data.getSrcCavity(), sourceImage,
							basicConnectorData);
					generateSchematicBasicConnectorData(data.getMatingDes(), data.getDestCavity(), destImage,
							basicConnectorData);
					generateSrcDestMap(data.getOriginDes(), data.getSrcCavity(), data.getMatingDes(),
							data.getDestCavity(), data.getMatingConnectionType(), map, "SOURCE");
					generateSrcDestMap(data.getMatingDes(), data.getDestCavity(), data.getOriginDes(),
							data.getSrcCavity(), data.getMatingConnectionType(), map, "DEST");
				}
			}

//			metadataMap.forEach((key, value) -> {
//				if (value.getConnectorType().equals("CUSTOM IMAGE")) {
//					SchematicBasicConnectorData matingData = basicConnectorData.get(key);
//					if (matingData != null) {
//
//						DatabaseFileData dbData = metadataMap.get(key);
//						if (dbData.getPinSequence() != null) {
//							List<String> pinSequence = Arrays.asList(dbData.getPinSequence().split(","));
//
//							matingData.setPins(pinSequence);
//
//							basicConnectorData.put(key, null);
//							basicConnectorData.put(key, matingData);
//						}
//
//						List<G06Embeddable> g06datas = excelData.stream().filter(g06 -> g06.getMatingDes().equals(key))
//								.collect(Collectors.toList());
//						if (!g06datas.isEmpty()) {
//							G06Embeddable g06data = g06datas.get(0);
//							SchematicBasicConnectorData orginData = basicConnectorData.get(g06data.getOriginDes());
//							List<String> reArrangedOrginPins = new ArrayList<>();
//
//							matingData.getPins().forEach(orginPin -> {
//								reArrangedOrginPins.add("");
//							});
//
//							orginData.getPins().forEach(orginPin -> {
//								Integer matingPinOrder = matingData.getPins().indexOf(orginPin);
//								reArrangedOrginPins.set(matingPinOrder, orginPin);
//							});
//
//							if (orginData != null && reArrangedOrginPins.size() == matingData.getPins().size()) {
//								orginData.setPins(reArrangedOrginPins);
//
//								String orginConnector = orginData.getConnectorName();
//								basicConnectorData.put(orginConnector, null);
//								basicConnectorData.put(orginConnector, orginData);
//							}
//						}
//					}
//
//				}
//
//			});

			// for A A06Data
			for (A06Data data : excelDataAPart) {
				String source = data.getSrcConnectorName();
				String destination = data.getDestConnectorName();
				DatabaseFileData sourceMd = metadataMap.get(source);
				DatabaseFileData destMd = metadataMap.get(destination);
				String sourceImageName = ObjectUtils.isEmpty(sourceMd) || StringUtils.isEmpty(sourceMd.getImageName())
						? StringUtils.EMPTY
						: StringUtils.toRootUpperCase(sourceMd.getImageName()).replaceAll("[ _]", StringUtils.EMPTY)
								+ ".PNG";
				String destImageName = ObjectUtils.isEmpty(destMd) || StringUtils.isEmpty(destMd.getImageName())
						? StringUtils.EMPTY
						: StringUtils.toRootUpperCase(destMd.getImageName()).replaceAll("[ _]", StringUtils.EMPTY)
								+ ".PNG";
				byte[] sourceImage = ObjectUtils.isEmpty(sourceMd) ? null
						: getImage(sourceImageName, commoditySearched, imagesList);
				byte[] destImage = ObjectUtils.isEmpty(destMd) ? null
						: getImage(destImageName, commoditySearched, imagesList);
				if (metadataMap.containsKey(data.getSrcConnectorName())
						&& metadataMap.containsKey(data.getDestConnectorName())) {
					generateSchematicBasicConnectorData(data.getSrcConnectorName(), data.getSrcCavity(), sourceImage,
							basicConnectorData);
					generateSchematicBasicConnectorData(data.getDestConnectorName(), data.getDestCavity(), destImage,
							basicConnectorData);
					generateSrcDestMap(data.getSrcConnectorName(), data.getSrcCavity(), data.getDestConnectorName(),
							data.getDestCavity(), "WIRE", map, "SOURCE");
					generateSrcDestMap(data.getDestConnectorName(), data.getDestCavity(), data.getSrcConnectorName(),
							data.getSrcCavity(), "WIRE", map, "DEST");
				}
			}

			mapLogger(basicConnectorData, "Basic Connector Data");
			logSrcDestMap(map);

			for (Map.Entry<String, SchematicSourceDestinationMapping> entry : map.entrySet()) {

				if (metadataMap.get(entry.getKey()).getConnectorType() != null
						&& metadataMap.get(entry.getKey()).getConnectorType().equalsIgnoreCase("CUSTOM IMAGE")
						&& metadataMap.get(entry.getKey()).getImageName() != null
						&& !metadataMap.get(entry.getKey()).getImageName().contains("GND")) {
					customImageList.add(entry.getKey());
				} else if (entry.getValue().getConnectorMatedMap().size() > 1) {
					dualConnectorList.add(entry.getKey());
				} else if (entry.getValue().getConnectorMatedMap().size() == 1) {
					singleConnectorList.add(entry.getKey());
				}
				if (!uniqueCircuits.contains(StringUtils.trim(entry.getKey()))) {
					uniqueCircuits.add(entry.getKey());
				}
			}
			int matrixSize = 0, connectionsToBeEliminated = 0, matedConnectorSize = 0, singleConnectorSize = 0,
					xpos = 5, rightConnectors = 0, leftconnectors = 0, customImageWithGnd = 0;
			for (Map.Entry<String, SchematicSourceDestinationMapping> entry : map.entrySet()) {
				if (metadataMap.get(entry.getKey()).getConnectorType() != null
						&& metadataMap.get(entry.getKey()).getConnectorType().equalsIgnoreCase("CUSTOM IMAGE")
						&& metadataMap.get(entry.getKey()).getImageName() != null
						&& !metadataMap.get(entry.getKey()).getImageName().contains("GND")) {
					matrixSize += 1;
					if (metadataMap.get(entry.getKey()).getWireOrientationFrom().equalsIgnoreCase("RIGHT")) {
						rightConnectors += 1;
					} else if (metadataMap.get(entry.getKey()).getWireOrientationFrom().equalsIgnoreCase("LEFT")) {
						leftconnectors += 1;
					}
					connectionsToBeEliminated += entry.getValue().getConnectorMatedMap().size();
				} else if (metadataMap.get(entry.getKey()).getConnectorType() != null
						&& !metadataMap.get(entry.getKey()).getConnectorType().equalsIgnoreCase("CUSTOM IMAGE")
				/* && !metadataMap.get(entry.getKey()).getConnectorType().contains("SPLICE") */) {
					if (entry.getValue().getConnectorMatedMap().size() > 0) {
						matedConnectorSize += 1;
					} else {
						singleConnectorSize += 1;
					}
				} else {
					customImageWithGnd++;
//					System.err.println(entry.getKey());
				}
			}
			matedConnectorSize = (matedConnectorSize - connectionsToBeEliminated);
			matrixSize = matrixSize + matedConnectorSize + singleConnectorSize + customImageWithGnd;
//			System.err.println(matrixSize);
			if (matrixSize > 25) {
				xpos = matrixSize / 4;
				if (matrixSize % 4 > 0) {
					xpos += 1;
				}
			}
			if (xpos < leftconnectors) {
				xpos = leftconnectors;
			} else if (xpos < rightConnectors) {
				xpos = rightConnectors;
			}
			int[][] pos = new int[xpos][6];

			generateMatedConnectorsForCustomImage(renderModelList, metadataMap, basicConnectorData, xyRowColList,
					labelMap, commoditySearched, map, renderedEntities, customImageList, true, pos);
			uniqueCircuits.removeAll(renderedEntities);
			generateMatedConnectorsNew(renderModelList, metadataMap, basicConnectorData, xyRowColList, labelMap,
					commoditySearched, map, renderedEntities, uniqueCircuits, true, pos, 0);
			generateMatedConnectorsForRemaining(renderModelList, metadataMap, basicConnectorData, xyRowColList,
					labelMap, commoditySearched, map, renderedEntities, uniqueCircuits, true, pos, 0);
			generateMatedConnectorsForGNDWithSplice(renderModelList, metadataMap, basicConnectorData, xyRowColList,
					labelMap, commoditySearched, map, renderedEntities, uniqueCircuits, true, pos);

			// new function for connector mated missing
			generateMatedConnectorsForMissedRenderModel(renderModelList, metadataMap, basicConnectorData, xyRowColList,
					labelMap, commoditySearched, map, renderedEntities, uniqueCircuits, true, pos);

			List<String> positionData = new ArrayList<>();

			for (String name : uniqueCircuits) {
				if (!renderedEntities.contains(name)) {
					renderedEntities.add(name);
					generateSingleCircuit(name, renderModelList, basicConnectorData, xyRowColList, labelMap,
							commoditySearched, map, pos, false);

				}
			}

			// log.debug("Rendered Entities after all render are of size:{}, values:{}",
			// renderedEntities.size(),
			// renderedEntities);

			List<G06Embeddable> wireData = excelData.stream()
					.filter(elem -> StringUtils.equalsIgnoreCase("WIRE", elem.getMatingConnectionType()))
					.collect(Collectors.toList());
			// log.debug("No of wire connections:{}", wireData.size());

			List<String> keyList = new ArrayList<>();

			List<G06RenderData> wireDataListPreProcess = convertG06EmbeddableToRenderModel(wireData, commoditySearched,
					keyList);

			List<G06RenderData> g06DataList = new ArrayList<>();
//			for (int i = 0; i < aPartMapping.size(); i++) {
//				g06DataList.addAll(a06DataRepository.findByA06name(aPartMapping.get(i)).stream()
//						.map(elem -> convertA06ToG06RenderData(elem, commoditySearched)).collect(Collectors.toList()));
//
//			}

			g06DataList.addAll(excelDataAPart.stream().map(elem -> convertA06ToG06RenderData(elem, commoditySearched))
					.collect(Collectors.toList()));

			HashSet<String> wireSet = new HashSet<>();

			for (G06RenderData renderdatag06 : g06DataList) {
				G06Embeddable g06Embeddable = renderdatag06.getG06ExcelData();
				String key = g06Embeddable.getOriginDes() + g06Embeddable.getSrcCavity() + g06Embeddable.getMatingDes()
						+ g06Embeddable.getDestCavity();

				if (!keyList.contains(key)) {
					wireDataListPreProcess.add(renderdatag06);
				}
			}
			// log.debug("No of wire connections after preprocessing:{}",
			// wireDataListPreProcess.size());

			HashSet<String> connectors = new HashSet<>();
			for (G06RenderData renderData : wireDataListPreProcess) {
				connectors.add(renderData.getG06ExcelData().getOriginDes());
				connectors.add(renderData.getG06ExcelData().getMatingDes());
			}
			log.info("Actual Connectors:{}", connectors.size());

			validWireList = connectorUtils.executeConnectorAndWireRules(renderModelList, wireDataListPreProcess,
					metadataMap);

			for (G06RenderData data : validWireList) {
				if (!metadataMap.containsKey(data.getG06ExcelData().getOriginDes())) {
					wireSet.add(data.getG06ExcelData().getOriginDes());
				}
				if (!metadataMap.containsKey(data.getG06ExcelData().getMatingDes())) {
					wireSet.add(data.getG06ExcelData().getMatingDes());
				}
			}

			log.info("Connector missing in metadata sheet: {}", wireSet);
			validWireList = validWireList.stream()
					.filter(elem -> metadataMap.containsKey(elem.getG06ExcelData().getOriginDes())
							&& metadataMap.containsKey(elem.getG06ExcelData().getMatingDes()))
					.sorted(Comparator.comparingInt(G06RenderData::getConnectionType)).collect(Collectors.toList());

			// log.debug("No of wire connections after connector utils rule:{}",
			// wireDataListPreProcess.size());

			int row = 0;
			int col = 0;
			for (RenderModel rm : renderModelList) {
				row = rm.getRowInd() > row ? rm.getRowInd() : row;
				col = rm.getColumnInd() > col ? rm.getColumnInd() : col;
			}

			log.info("Rendered Connectors:{}", renderModelList.size());
			maxRepository.save(new CommodityMaximum(0L, row, col, commoditySearched));
			repository.saveAll(renderModelList);
			g06Repository.saveAll(validWireList);

		} catch (IOException | DataFormatException ex) {
			log.error("Error while processing image:{}", ex.getMessage());
		}

		basicConnectorData.forEach((key, value) -> {
			if (value.getImageData() == null && value.getPins() != null) {
				SchematicBasicConnectorData schematicBasicConnetor = value;
				List<String> uniquePins = value.getPins().stream().distinct().collect(Collectors.toList());
				schematicBasicConnetor.setPins(uniquePins);
				basicConnectorData.put(key, null);
				basicConnectorData.put(key, schematicBasicConnetor);
			}
//			 pin sequence changes
			if (value.getPins() != null) {
				SchematicBasicConnectorData schematicBasicConnetor = value;
				DatabaseFileData dbData = metadataMap.get(key);
				List<String> uniquePins = value.getPins().stream().distinct().collect(Collectors.toList());

				// image pin sequence changes
				if (dbData.getPinSequence() != null) {
					List<String> pinSequence = Arrays.asList(dbData.getPinSequence().split(","));
					if (pinSequence.containsAll(uniquePins)) {
						uniquePins = pinSequence;
					}
					schematicBasicConnetor.setPins(uniquePins);

					basicConnectorData.put(key, null);
					basicConnectorData.put(key, schematicBasicConnetor);
				}

			}

		});

		List<String> connectorsForManualAllignment = new ArrayList<>();

		metadataMap.forEach((key, value) -> {
			if (!value.getConnectorType().equals("CUSTOM IMAGE")) {
				SchematicBasicConnectorData orginData = basicConnectorData.get(key);
				if (orginData != null && orginData.getPins() != null) {
					List<G06Embeddable> g06datas = excelData.stream().filter(g06 -> (g06.getOriginDes().equals(key))
							&& g06.getMatingConnectionType().equals("CONNECTOR")).collect(Collectors.toList());

					// removing validation for multiple origin

					boolean multipleOrgin = false;

					if (!g06datas.isEmpty()) {
						String mattingName = g06datas.get(0).getMatingDes();
						List<String> mattingConnections = excelData.stream()
								.filter(data -> (data.getMatingDes().equals(mattingName))
										&& data.getMatingConnectionType().equals("CONNECTOR"))
								.map(G06Embeddable::getOriginDes).distinct().collect(Collectors.toList());

						if (mattingConnections.size() > 1) {
							multipleOrgin = true;
							connectorsForManualAllignment.add(mattingName);

						}

					}

					if (!g06datas.isEmpty() && !multipleOrgin) {
						G06Embeddable g06data = g06datas.get(0);
						SchematicBasicConnectorData matingData = basicConnectorData.get(g06data.getMatingDes());

						List<String> reArrangedOrginPins = new ArrayList<>();
						AtomicBoolean isreArrangablePin = new AtomicBoolean();

						matingData.getPins().forEach(orginPin -> reArrangedOrginPins.add(""));
						orginData.getPins().forEach(orginPin -> {
							isreArrangablePin.set(true);
							if (!matingData.getPins().contains(orginPin)) {
								if (matingData.getPins().size() == orginData.getPins().size()) {
									for (String matdata : matingData.getPins()) {
//										System.out.println(key);
										if (matdata.contains("-")) {
											if (matdata.split("-")[1].equals(orginPin)) {
												Integer matingPinOrder = matingData.getPins().indexOf(matdata);
												if (matingPinOrder != -1) {
													reArrangedOrginPins.set(matingPinOrder, orginPin);
													break;
												}

											} else {
												isreArrangablePin.set(false);
											}

										} else if (matdata.contains("~")) {
											if (matdata.split("~")[0].equals(orginPin)) {
												Integer matingPinOrder = matingData.getPins().indexOf(matdata);
												if (matingPinOrder != -1) {
													reArrangedOrginPins.set(matingPinOrder, orginPin);
													break;
												}

											} else {
												isreArrangablePin.set(false);
											}

										} else {
											isreArrangablePin.set(false);
										}
									}
								} else {
									isreArrangablePin.set(false);
								}

							} else {
								Integer matingPinOrder = matingData.getPins().indexOf(orginPin);
								if (matingPinOrder != -1) {
									reArrangedOrginPins.set(matingPinOrder, orginPin);
								}
							}

						});

						if (matingData != null && isreArrangablePin.get()
								&& reArrangedOrginPins.size() == matingData.getPins().size()) {
							orginData.setPins(reArrangedOrginPins);

							String orginConnector = orginData.getConnectorName();
							basicConnectorData.put(orginConnector, null);
							basicConnectorData.put(orginConnector, orginData);
						}

					}
				}

			}

		});

		List<G06RenderData> changedValidWireList = validWireList;

		// logic implentation of cavity of GND to Custom Image

		metadataMap.forEach((key, value) -> {
			if (value.getConnectorType().equals("CUSTOM IMAGE") && value.getImageName().equals("TERMINAL GND")) {

				SchematicBasicConnectorData basicData = basicConnectorData.get(key);
				if (basicData != null) {
					basicData.setPins(new ArrayList<>());
					basicConnectorData.put(key, null);
					basicConnectorData.put(key, basicData);
				}
				changedValidWireList.stream().forEach(wireData -> {
					String srcDescription = wireData.getG06ExcelData().getOriginDes();
					String destDescription = wireData.getG06ExcelData().getMatingDes();
					G06Embeddable g06data = wireData.getG06ExcelData();

					if (srcDescription != null && srcDescription.equals(value.getConnectorDesc())) {
						g06data.setSrcCavity("CUSTOM IMAGE");
					} else if (destDescription != null && destDescription.equals(value.getConnectorDesc())) {
						g06data.setDestCavity("CUSTOM IMAGE");
					}
					wireData.setG06ExcelData(g06data);
				});
			}
		});

		// remove duplicates from manual allign connectors

		List<String> uniqueConnectorsForManualAllignment = connectorsForManualAllignment.stream().distinct()
				.collect(Collectors.toList());

		RealignmentModel realignmentData = realignmentModelRepository.findByCommodityName(commoditySearched);

		return new SchematicRenderResponse(errorMessage, renderModelList, changedValidWireList, basicConnectorData,
				metadataMap, g06Data, realignmentData, uniqueConnectorsForManualAllignment);

	}

	private void reArrangeBasicConnectorData(Map<String, SchematicBasicConnectorData> basicConnectorData,
			HashMap<String, SchematicSourceDestinationMapping> map) {
	}

	private G06RenderData convertA06ToG06RenderData(A06Data a06Data, String commoditySearched) {
		G06RenderData g06RenderData = new G06RenderData();
		G06Embeddable g06Embeddable = new G06Embeddable();
		g06Embeddable.setDestCavity(a06Data.getDestCavity());
		g06Embeddable.setSrcCavity(a06Data.getSrcCavity());
		g06Embeddable.setMatingConnectionType("WIRE");
		g06Embeddable.setColor(a06Data.getColor());

		g06Embeddable.setDtnaCir(a06Data.getDtnaCir());
		g06Embeddable.setSaeCir(a06Data.getSaeCir());
		g06Embeddable.setOriginDes(a06Data.getSrcConnectorName());
		g06Embeddable.setMatingDes(a06Data.getDestConnectorName());
		g06RenderData.setG06ExcelData(g06Embeddable);
		g06RenderData.setCommodityName(commoditySearched);
		return g06RenderData;
	}

	private List<A06Data> createListForAParts(List<String> aPartMapping) {

		List<A06Data> schematicA06ExcelDataList = new ArrayList<>();
		aPartMapping.forEach(elem -> schematicA06ExcelDataList
				.addAll(a06DataRepository.findByA06name(elem).stream().collect(Collectors.toList())));
		return schematicA06ExcelDataList;
	}

	private List<G06RenderData> convertG06EmbeddableToRenderModel(List<G06Embeddable> wireData, String commodityName,
			List<String> keys) {
		List<G06RenderData> wireList = new ArrayList<>();
		for (G06Embeddable embeddable : wireData) {
			G06RenderData renderData = new G06RenderData();
			renderData.setCommodityName(commodityName);
			renderData.setG06ExcelData(embeddable);
			keys.add(embeddable.getOriginDes() + embeddable.getSrcCavity() + embeddable.getMatingDes()
					+ embeddable.getDestCavity());
			wireList.add(renderData);

		}
		return wireList;
	}

	private void generateMatedConnectorsForCustomImage(List<RenderModel> renderModelList,
			Map<String, DatabaseFileData> metadataMap, Map<String, SchematicBasicConnectorData> basicConnectorDataMap,
			List<Integer> xyRowColList, Map<String, String> labelMap, String commodityName,
			LinkedHashMap<String, SchematicSourceDestinationMapping> map, List<String> renderedEntities,
			HashSet<String> matedConnectors, boolean reArrangeFlag, int[][] pos) {
		for (String connectorName : matedConnectors) {
			SchematicSourceDestinationMapping data = map.get(connectorName);
			generateConnectorMatedCircuit(data, metadataMap, renderModelList, renderedEntities, basicConnectorDataMap,
					xyRowColList, commodityName, labelMap, reArrangeFlag, pos);
		}
	}

	private void generateMatedConnectorsNew(List<RenderModel> renderModelList,
			Map<String, DatabaseFileData> metadataMap, Map<String, SchematicBasicConnectorData> basicConnectorDataMap,
			List<Integer> xyRowColList, Map<String, String> labelMap, String commodityName,
			LinkedHashMap<String, SchematicSourceDestinationMapping> map, List<String> renderedEntities,
			List<String> uniqueCircuits, boolean reArrangeFlag, int[][] pos, int count) {

		List<RenderModel> tempRenderModelList = renderModelList;
		if (tempRenderModelList != null && !tempRenderModelList.isEmpty()) {
			Map<Integer, List<RenderModel>> columnIndexMap = tempRenderModelList.stream().collect(Collectors
					.groupingBy(RenderModel::getColumnInd, HashMap::new, Collectors.toCollection(ArrayList::new)));
			for (int i = 0; i <= 3; i++) {
				List<RenderModel> newRenderModel = columnIndexMap.get(i);
				List<RenderModel> newTempRenderModel = columnIndexMap.get(i);
				if (newRenderModel != null) {
					for (RenderModel renderModelByIndex : newRenderModel) {
						SchematicSourceDestinationMapping data = map.get(renderModelByIndex.getConnectorName());
						Map<String, SchematicDestination> wireMatedMap = data.getWireMatedMap();
						if (wireMatedMap != null && !wireMatedMap.isEmpty()) {
							int x = 0;
							for (Map.Entry<String, SchematicDestination> entry : wireMatedMap.entrySet()) {

								if (!renderedEntities.contains(entry.getKey())) {
									String connectorType = metadataMap.get(entry.getKey()).getConnectorType();
									String imageName = metadataMap.get(entry.getKey()).getImageName();
									if (/* "SPLICE".equalsIgnoreCase(connectorType) || */(imageName != null
											&& imageName.contains("GND"))) {
										Boolean isRightorLeft = isRightOrLeft(data, newRenderModel, renderModelByIndex);
										xyRowColList.set(0, renderModelByIndex.getRowInd());
										xyRowColList.set(1, renderModelByIndex.getColumnInd());
										if ((imageName != null && imageName.contains("GND"))
												&& !renderModelByIndex.isMated()) {
											isRightorLeft = true;
										}
										if (isRightorLeft) {
											xyRowColList.set(2, (int) (renderModelByIndex.getStartX() - 50));
										} else {
											xyRowColList.set(2, (int) (renderModelByIndex.getEndX() + 50));
										}
										xyRowColList.set(3, (int) renderModelByIndex.getEndY() + 20 + x);
										x = x + 30;
										generateSingleCircuit(entry.getKey(), renderModelList, basicConnectorDataMap,
												xyRowColList, labelMap, commodityName, map, pos, true);
										renderedEntities.add(entry.getKey());
									} else {
										SchematicSourceDestinationMapping newData = map.get(entry.getKey());
										if (newData.getConnectorMatedMap() != null
												&& !newData.getConnectorMatedMap().isEmpty()) {

											generateConnectorMatedCircuitNew(newData, metadataMap, renderModelList,
													renderedEntities, basicConnectorDataMap, xyRowColList,
													commodityName, labelMap, reArrangeFlag, pos, i);
										} else {
											generateSingleCircuit(entry.getKey(), renderModelList,
													basicConnectorDataMap, xyRowColList, labelMap, commodityName, map,
													pos, false);
											renderedEntities.add(entry.getKey());
										}
									}
								}
							}
						}
					}
				}
			}
			uniqueCircuits.removeAll(renderedEntities);
			if (!uniqueCircuits.isEmpty() && count != uniqueCircuits.size()) {
				count = uniqueCircuits.size();
				generateMatedConnectorsNew(renderModelList, metadataMap, basicConnectorDataMap, xyRowColList, labelMap,
						commodityName, map, renderedEntities, uniqueCircuits, true, pos, count);
			}

		}
	}

	private void generateMatedConnectorsForRemaining(List<RenderModel> renderModelList,
			Map<String, DatabaseFileData> metadataMap, Map<String, SchematicBasicConnectorData> basicConnectorDataMap,
			List<Integer> xyRowColList, Map<String, String> labelMap, String commodityName,
			LinkedHashMap<String, SchematicSourceDestinationMapping> map, List<String> renderedEntities,
			List<String> uniqueCircuits, boolean reArrangeFlag, int[][] pos, int count) {

		List<RenderModel> tempRenderModelList = renderModelList;

		if (tempRenderModelList != null && !tempRenderModelList.isEmpty()) {
			Map<Integer, List<RenderModel>> columnIndexMap = tempRenderModelList.stream().collect(Collectors
					.groupingBy(RenderModel::getColumnInd, HashMap::new, Collectors.toCollection(ArrayList::new)));

			List<RenderModel> newRenderModel = columnIndexMap.get(5);
			if (newRenderModel != null) {
				for (RenderModel renderModelByIndex : newRenderModel) {
					SchematicSourceDestinationMapping data = map.get(renderModelByIndex.getConnectorName());
					Map<String, SchematicDestination> wireMatedMap = data.getWireMatedMap();
					if (wireMatedMap != null && !wireMatedMap.isEmpty()) {
						int x = 0;
						for (Map.Entry<String, SchematicDestination> entry : wireMatedMap.entrySet()) {

							if (!renderedEntities.contains(entry.getKey())) {
								String connectorType = metadataMap.get(entry.getKey()).getConnectorType();
								String imageName = metadataMap.get(entry.getKey()).getImageName();
								if (/* "SPLICE".equalsIgnoreCase(connectorType) || */(imageName != null
										&& imageName.contains("GND"))) {

									xyRowColList.set(0, renderModelByIndex.getRowInd());
									xyRowColList.set(1, renderModelByIndex.getColumnInd());
									xyRowColList.set(2, (int) (renderModelByIndex.getStartX() - 50));
									xyRowColList.set(3, (int) renderModelByIndex.getEndY() + 20 + x);
									x = x + 30;
									generateSingleCircuit(entry.getKey(), renderModelList, basicConnectorDataMap,
											xyRowColList, labelMap, commodityName, map, pos, true);
									renderedEntities.add(entry.getKey());
								} else {
									SchematicSourceDestinationMapping newData = map.get(entry.getKey());
									if (newData.getConnectorMatedMap() != null
											&& !newData.getConnectorMatedMap().isEmpty()) {

										generateConnectorMatedCircuitNew(newData, metadataMap, renderModelList,
												renderedEntities, basicConnectorDataMap, xyRowColList, commodityName,
												labelMap, reArrangeFlag, pos, 4);
									} else {
										generateSingleCircuit(entry.getKey(), renderModelList, basicConnectorDataMap,
												xyRowColList, labelMap, commodityName, map, pos, false);
										renderedEntities.add(entry.getKey());
									}
								}
							}
						}
					}
				}
			}

			uniqueCircuits.removeAll(renderedEntities);
			if (!uniqueCircuits.isEmpty() && count != uniqueCircuits.size()) {
				count = uniqueCircuits.size();
				generateMatedConnectorsForRemaining(renderModelList, metadataMap, basicConnectorDataMap, xyRowColList,
						labelMap, commodityName, map, renderedEntities, uniqueCircuits, true, pos, count);
			}

		}

	}

	private void generateMatedConnectorsForGNDWithSplice(List<RenderModel> renderModelList,
			Map<String, DatabaseFileData> metadataMap, Map<String, SchematicBasicConnectorData> basicConnectorDataMap,
			List<Integer> xyRowColList, Map<String, String> labelMap, String commodityName,
			LinkedHashMap<String, SchematicSourceDestinationMapping> map, List<String> renderedEntities,
			List<String> uniqueCircuits, boolean reArrangeFlag, int[][] pos) {

		List<RenderModel> newRenderModel = new ArrayList<>(renderModelList);
		if (newRenderModel != null) {
			for (RenderModel renderModelByIndex : newRenderModel) {
				SchematicSourceDestinationMapping data = map.get(renderModelByIndex.getConnectorName());
				Map<String, SchematicDestination> wireMatedMap = data.getWireMatedMap();
				if (wireMatedMap != null && !wireMatedMap.isEmpty()) {
					int x = 0;
					for (Map.Entry<String, SchematicDestination> entry : wireMatedMap.entrySet()) {

						if (!renderedEntities.contains(entry.getKey())) {
							String connectorType = metadataMap.get(entry.getKey()).getConnectorType();
							String imageName = metadataMap.get(entry.getKey()).getImageName();
							if (/* "SPLICE".equalsIgnoreCase(connectorType) || */(imageName != null
									&& imageName.contains("GND"))) {

								xyRowColList.set(0, renderModelByIndex.getRowInd());
								xyRowColList.set(1, renderModelByIndex.getColumnInd());
								xyRowColList.set(2, (int) (renderModelByIndex.getStartX() - 50));
								xyRowColList.set(3, (int) renderModelByIndex.getEndY() + 20 + x);
								x = x + 30;
								generateSingleCircuit(entry.getKey(), renderModelList, basicConnectorDataMap,
										xyRowColList, labelMap, commodityName, map, pos, true);
								renderedEntities.add(entry.getKey());
							} else {
								SchematicSourceDestinationMapping newData = map.get(entry.getKey());
								if (newData.getConnectorMatedMap() != null
										&& !newData.getConnectorMatedMap().isEmpty()) {

									generateConnectorMatedCircuitNew(newData, metadataMap, renderModelList,
											renderedEntities, basicConnectorDataMap, xyRowColList, commodityName,
											labelMap, reArrangeFlag, pos, 4);
								} else {
									generateSingleCircuit(entry.getKey(), renderModelList, basicConnectorDataMap,
											xyRowColList, labelMap, commodityName, map, pos, false);
									renderedEntities.add(entry.getKey());
								}
							}
						}
					}
				}
			}
		}

		uniqueCircuits.removeAll(renderedEntities);

	}

	// new logic for connector mated map

	private void generateMatedConnectorsForMissedRenderModel(List<RenderModel> renderModelList,
			Map<String, DatabaseFileData> metadataMap, Map<String, SchematicBasicConnectorData> basicConnectorDataMap,
			List<Integer> xyRowColList, Map<String, String> labelMap, String commodityName,
			LinkedHashMap<String, SchematicSourceDestinationMapping> map, List<String> renderedEntities,
			List<String> uniqueCircuits, boolean reArrangeFlag, int[][] pos) {

//		List<RenderModel> newRenderModel = new ArrayList<>(renderModelList);
		if (uniqueCircuits != null) {
			for (String connectorName : uniqueCircuits) {
				SchematicSourceDestinationMapping data = map.get(connectorName);
				Map<String, SchematicDestination> wireMatedMap = data.getWireMatedMap();
				if (wireMatedMap != null && !wireMatedMap.isEmpty()) {
					int x = 0;
					for (Map.Entry<String, SchematicDestination> entry : wireMatedMap.entrySet()) {

						if (!renderedEntities.contains(entry.getKey())) {
							String connectorType = metadataMap.get(entry.getKey()).getConnectorType();

							SchematicSourceDestinationMapping newData = map.get(entry.getKey());
							if (newData.getConnectorMatedMap() != null && !newData.getConnectorMatedMap().isEmpty()) {

								generateConnectorMatedCircuitNew(newData, metadataMap, renderModelList,
										renderedEntities, basicConnectorDataMap, xyRowColList, commodityName, labelMap,
										reArrangeFlag, pos, 4);
							} else {
								generateSingleCircuit(entry.getKey(), renderModelList, basicConnectorDataMap,
										xyRowColList, labelMap, commodityName, map, pos, false);
								renderedEntities.add(entry.getKey());

							}
						}
					}
				}
			}
		}

		uniqueCircuits.removeAll(renderedEntities);

	}

	private boolean isRightOrLeft(SchematicSourceDestinationMapping data, List<RenderModel> newRenderModel,
			RenderModel renderModelByIndex) {

		if (data.getConnectorMatedMap() != null && !data.getConnectorMatedMap().isEmpty()) {
			HashMap<String, SchematicDestination> connectorMatedmap = data.getConnectorMatedMap();
			for (Map.Entry<String, SchematicDestination> matedMap : connectorMatedmap.entrySet()) {
				for (RenderModel renderModel : newRenderModel) {
					if (renderModel.getConnectorName().equalsIgnoreCase(matedMap.getKey())) {
						if (renderModelByIndex.getStartX() < renderModel.getStartX()) {
							return true;
						}
					}

				}
			}
			return false;
		}
		return false;
	}

	private void generateConnectorMatedCircuit(SchematicSourceDestinationMapping sourceDest,
			Map<String, DatabaseFileData> metadataMap, List<RenderModel> renderModelList, List<String> renderedEntities,
			Map<String, SchematicBasicConnectorData> basicConnectorData, List<Integer> xyRowColList,
			String commodityName, Map<String, String> labelMap, boolean reArrangeFlag, int[][] pos) {

		HashMap<String, SchematicDestination> connectorMatedMap = sourceDest.getConnectorMatedMap();
		boolean flag = false;
		List<String> destKeys = new ArrayList<>(sourceDest.getConnectorMatedMap().keySet());
		SchematicBasicConnectorData source = basicConnectorData.get(sourceDest.getConnectorName());

		// latest chnage for pin sequence
		String connectorName = sourceDest.getConnectorName();
		DatabaseFileData dataBasedata = metadataMap.get(connectorName);
		int pinheight = 0;
		if (dataBasedata.getPinSequence() != null) {
			List<String> pinSequence = Arrays.asList(dataBasedata.getPinSequence().split(","));
			pinheight = pinSequence.size();
		}

		String sourceLabelPosition = "";
		String destLabelPosition = "";
		double sourceX = 0.0;
		double sourceY = 0.0;
		double destX = 0.0;
		double destY = 0.0;
		boolean sourceIsSource = false;
		boolean sourceIsDest = false;
		boolean destIsSource = false;
		boolean destIsDest = false;
		String destPortDesignator = "";
		String srcPortDesignator = "";

		DatabaseFileData fd = metadataMap.get(sourceDest.getConnectorName());
		boolean destFlag = false;

		for (int i = 0; i < destKeys.size(); i++) {
			DatabaseFileData o = metadataMap.get(destKeys.get(i));
			if (ObjectUtils.isNotEmpty(o) && StringUtils.isNotEmpty(o.getWireOrientationFrom())) {
				destFlag = true;
				if ("RIGHT".equalsIgnoreCase(o.getWireOrientationFrom())) {
					getPositionForCustomImage(xyRowColList, pos, 0, false, pinheight);
					destX = xyRowColList.get(2);
					destY = xyRowColList.get(3);
					sourceX = destX + 25;
					sourceY = destY;
					sourceIsSource = false;
					sourceIsDest = true;
					destIsSource = true;
					destIsDest = false;
					sourceLabelPosition = "right";
					destLabelPosition = "left";
//                    destPortDesignator = "P'";
//                    srcPortDesignator = "P";

					srcPortDesignator = "P'";
					destPortDesignator = "P";
					break;
				} else if ("LEFT".equalsIgnoreCase(o.getWireOrientationFrom())) {
					getPositionForCustomImage(xyRowColList, pos, 5, true, pinheight);
					sourceX = xyRowColList.get(2);
					sourceY = xyRowColList.get(3);
					destX = sourceX + 25;
					destY = sourceY;
					sourceIsSource = true;
					sourceIsDest = false;
					destIsSource = false;
					destIsDest = true;
					sourceLabelPosition = "left";
					destLabelPosition = "right";
					destPortDesignator = "P";
					srcPortDesignator = "P'";
					break;
				}
			}
		}

		if ((StringUtils.isEmpty(fd.getWireOrientationFrom()) && !destFlag)
				|| StringUtils.isNotEmpty(fd.getWireOrientationFrom()) && !destFlag) {
			if ("RIGHT".equalsIgnoreCase(fd.getWireOrientationFrom())
					|| StringUtils.isEmpty(fd.getWireOrientationFrom())) {
				if (StringUtils.isEmpty(fd.getWireOrientationFrom())) {
					getPositionForConnectors(xyRowColList, pos);
					sourceLabelPosition = "right";
					destLabelPosition = "left";
					srcPortDesignator = "P'";
					destPortDesignator = "P";
					destX = xyRowColList.get(2);
					destY = xyRowColList.get(3);
					sourceX = destX + 25;
					sourceY = destY;
				} else {
					getPositionForCustomImage(xyRowColList, pos, 0, false, pinheight);
					sourceX = xyRowColList.get(2);
					sourceY = xyRowColList.get(3);
					destX = sourceX + 25;
					destY = sourceY;
					sourceLabelPosition = "left";
					destLabelPosition = "right";
					srcPortDesignator = "P'";
					destPortDesignator = "P";
				}

				sourceIsSource = true;
				sourceIsDest = false;
				destIsSource = false;
				destIsDest = true;

			} else {
				if (StringUtils.isEmpty(fd.getWireOrientationFrom())) {
					getPositionForConnectors(xyRowColList, pos);
				} else {
					getPositionForCustomImage(xyRowColList, pos, 5, true, pinheight);

				}
				destX = xyRowColList.get(2);
				destY = xyRowColList.get(3);
				sourceX = destX + 25;
				sourceY = destY;
				sourceIsSource = false;
				sourceIsDest = true;
				destIsSource = true;
				destIsDest = false;
				sourceLabelPosition = "right";
				destLabelPosition = "left";
//                destPortDesignator = "P";
//                srcPortDesignator = "P'";
				destPortDesignator = "P'";
				srcPortDesignator = "P";
			}
		}

		if (reArrangeFlag) {
			List<String> sourcePins = new ArrayList<>();
			for (int i = 0; i < destKeys.size(); i++) {
				SchematicDestination destination = connectorMatedMap.get(destKeys.get(i));
				sourcePins.addAll(destination.getDestPins());
				SchematicBasicConnectorData data = basicConnectorData.get(destination.getDestName());
				ArrayList<String> destinationList = new ArrayList<>(destination.getSrcPins());
				// data.setPins(destination.getSrcPins());
				data.setPins(destinationList);
				basicConnectorData.put(destination.getDestName(), data);
			}
			source.setPins(sourcePins);
			basicConnectorData.put(sourceDest.getConnectorName(), source);
		}

//		 dual circuit pin size
		int srcPinSize = source.getPins().size();
		int height = 20 * srcPinSize;
		// effects the image width

		int width = 50;

		int multiplier = 2 * (destKeys.size() - 1);

		RenderModel rm = RenderModel.builder().rowInd(xyRowColList.get(0)).columnInd(xyRowColList.get(1))
				.connectorName(source.getConnectorName()).defaultPortDesignator(srcPortDesignator)
				.height(height + multiplier).width(width).mated(true).sourceConnector(sourceIsSource)
				.destConnector(sourceIsDest).commodityName(commodityName).startX(sourceX).startY(sourceY)
				.labelPosition(sourceLabelPosition).endX(sourceX + width).endY(sourceY + height)
				.label(labelMap.get(source.getConnectorName())).build();

		if (!renderedEntities.contains(source.getConnectorName())) {
			renderedEntities.add(source.getConnectorName());
			renderModelList.add(rm);
			flag = true;
		} else {
			pos[xyRowColList.get(0)][xyRowColList.get(1)] = 0;
		}

		if (flag) {
			int ht = 0;
			int total = 0;
			for (int i = 0; i < destKeys.size(); i++) {
				SchematicDestination destination = connectorMatedMap.get(destKeys.get(i));
				total += destination.getDestPins().size();
			}
			for (int i = 0; i < destKeys.size(); i++) {
				SchematicDestination destination = connectorMatedMap.get(destKeys.get(i));
				int currentHeight = height * (destination.getDestPins().size()) / total;
				int currentWidth = 50;
				if (destKeys.size() == 1) {
					currentHeight = height;
				}

				RenderModel rm2 = RenderModel.builder().rowInd(xyRowColList.get(0)).columnInd(xyRowColList.get(1))
						.connectorName(destination.getDestName()).defaultPortDesignator(destPortDesignator)
						.height(currentHeight).width(currentWidth).commodityName(commodityName).startX(destX)
						.startY(destY + ht).labelPosition(destLabelPosition)
						.label(labelMap.get(destination.getDestName())).endX(destX + currentWidth)
						.endY(destY + ht + currentHeight).destConnector(destIsDest).sourceConnector(destIsSource)
						.mated(true).build();

				ht += currentHeight + 2;
				if (!renderedEntities.contains(destination.getDestName())) {
					renderedEntities.add(destination.getDestName());
					renderModelList.add(rm2);
				}

			}
			// updateList(xyRowColList);
		}

	}

	private void generateConnectorMatedCircuitNew(SchematicSourceDestinationMapping sourceDest,
			Map<String, DatabaseFileData> metadataMap, List<RenderModel> renderModelList, List<String> renderedEntities,
			Map<String, SchematicBasicConnectorData> basicConnectorData, List<Integer> xyRowColList,
			String commodityName, Map<String, String> labelMap, boolean reArrangeFlag, int[][] pos, int m) {

		HashMap<String, SchematicDestination> connectorMatedMap = sourceDest.getConnectorMatedMap();
		boolean flag = false;
		List<String> destKeys = new ArrayList<>(sourceDest.getConnectorMatedMap().keySet());
		SchematicBasicConnectorData source = basicConnectorData.get(sourceDest.getConnectorName());

		// latest chnage for pin sequence
		String connectorName = sourceDest.getConnectorName();
		DatabaseFileData dataBasedata = metadataMap.get(connectorName);
		int pinheight = 0;
		if (dataBasedata.getPinSequence() != null) {
			List<String> pinSequence = Arrays.asList(dataBasedata.getPinSequence().split(","));
			pinheight = pinSequence.size();
		}

		String sourceLabelPosition = "";
		String destLabelPosition = "";
		double sourceX = 0.0;
		double sourceY = 0.0;
		double destX = 0.0;
		double destY = 0.0;
		boolean sourceIsSource = false;
		boolean sourceIsDest = false;
		boolean destIsSource = false;
		boolean destIsDest = false;
		String destPortDesignator = "";
		String srcPortDesignator = "";

		DatabaseFileData fd = metadataMap.get(sourceDest.getConnectorName());
		boolean destFlag = false;

		for (int i = 0; i < destKeys.size(); i++) {
			DatabaseFileData o = metadataMap.get(destKeys.get(i));
			if (ObjectUtils.isNotEmpty(o) && StringUtils.isNotEmpty(o.getWireOrientationFrom())) {
				destFlag = true;
				if ("RIGHT".equalsIgnoreCase(o.getWireOrientationFrom())) {
					getPositionForCustomImage(xyRowColList, pos, 0, false, pinheight);
					destX = xyRowColList.get(2);
					destY = xyRowColList.get(3);
					sourceX = destX + 25;
					sourceY = destY;
					sourceIsSource = false;
					sourceIsDest = true;
					destIsSource = true;
					destIsDest = false;
					sourceLabelPosition = "right";
					destLabelPosition = "left";
//                    destPortDesignator = "P'";
//                    srcPortDesignator = "P";
					destPortDesignator = "P";
					srcPortDesignator = "P'";
					break;
				} else if ("LEFT".equalsIgnoreCase(o.getWireOrientationFrom())) {
					getPositionForCustomImage(xyRowColList, pos, 5, true, pinheight);
					sourceX = xyRowColList.get(2);
					sourceY = xyRowColList.get(3);
					destX = sourceX + 25;
					destY = sourceY;
					sourceIsSource = true;
					sourceIsDest = false;
					destIsSource = false;
					destIsDest = true;
					sourceLabelPosition = "left";
					destLabelPosition = "right";
					destPortDesignator = "P";
					srcPortDesignator = "P'";
					break;
				}
			}
		}

		if ((StringUtils.isEmpty(fd.getWireOrientationFrom()) && !destFlag)
				|| StringUtils.isNotEmpty(fd.getWireOrientationFrom()) && !destFlag) {
			if ("RIGHT".equalsIgnoreCase(fd.getWireOrientationFrom())
					|| StringUtils.isEmpty(fd.getWireOrientationFrom())) {
				if (StringUtils.isEmpty(fd.getWireOrientationFrom())) {
					if (m == 4) {
						getPositionForConnectorsNew(xyRowColList, pos, m);
					} else {
						getPositionForConnectorsNew(xyRowColList, pos, m + 1);
					}

					sourceLabelPosition = "left";
					destLabelPosition = "right";
					srcPortDesignator = "P'";
					destPortDesignator = "P";
					sourceX = xyRowColList.get(2);
					sourceY = xyRowColList.get(3);
					destX = sourceX + 25;
					destY = sourceY;
				} else {
					getPositionForCustomImage(xyRowColList, pos, 0, false, pinheight);
					sourceX = xyRowColList.get(2);
					sourceY = xyRowColList.get(3);
					destX = sourceX + 25;
					destY = sourceY;
					sourceLabelPosition = "left";
					destLabelPosition = "right";
//                    srcPortDesignator = "P";
//                    destPortDesignator = "P'";
					srcPortDesignator = "P'";
					destPortDesignator = "P";
				}

				sourceIsSource = true;
				sourceIsDest = false;
				destIsSource = false;
				destIsDest = true;

			} else {
				if (StringUtils.isEmpty(fd.getWireOrientationFrom())) {
					if (m == 3) {
						getPositionForConnectorsNew(xyRowColList, pos, m);
					} else {
						getPositionForConnectorsNew(xyRowColList, pos, m + 1);
					}
				} else {
					getPositionForCustomImage(xyRowColList, pos, 5, true, pinheight);

				}
				destX = xyRowColList.get(2);
				destY = xyRowColList.get(3);
				sourceX = destX + 25;
				sourceY = destY;
				sourceIsSource = false;
				sourceIsDest = true;
				destIsSource = true;
				destIsDest = false;
				sourceLabelPosition = "right";
				destLabelPosition = "left";
				destPortDesignator = "P'";
				srcPortDesignator = "P";
			}
		}

		if (reArrangeFlag) {
			List<String> sourcePins = new ArrayList<>();
			for (int i = 0; i < destKeys.size(); i++) {
				SchematicDestination destination = connectorMatedMap.get(destKeys.get(i));
				sourcePins.addAll(destination.getDestPins());
				SchematicBasicConnectorData data = basicConnectorData.get(destination.getDestName());
				ArrayList<String> destinationList = new ArrayList<>(destination.getSrcPins());
				data.setPins(destinationList);
				// data.setPins(destination.getSrcPins());
				basicConnectorData.put(destination.getDestName(), data);
			}
			source.setPins(sourcePins);
			basicConnectorData.put(sourceDest.getConnectorName(), source);
		}
		// dual circuit pin size
		int srcPinSize = source.getPins().size();
		int height = 20 * srcPinSize;
		int width = 50;

		int multiplier = 2 * (destKeys.size() - 1);

		RenderModel rm = RenderModel.builder().rowInd(xyRowColList.get(0)).columnInd(xyRowColList.get(1))
				.connectorName(source.getConnectorName()).defaultPortDesignator(srcPortDesignator)
				.height(height + multiplier).width(width).mated(true).sourceConnector(sourceIsSource)
				.destConnector(sourceIsDest).commodityName(commodityName).startX(sourceX).startY(sourceY)
				.labelPosition(sourceLabelPosition).endX(sourceX + width).endY(sourceY + height)
				.label(labelMap.get(source.getConnectorName())).build();

		if (!renderedEntities.contains(source.getConnectorName())) {
			renderedEntities.add(source.getConnectorName());
			renderModelList.add(rm);
			flag = true;
		} else {
			pos[xyRowColList.get(0)][xyRowColList.get(1)] = 0;
		}

		if (flag) {
			int ht = 0;
			int total = 0;
			for (int i = 0; i < destKeys.size(); i++) {
				SchematicDestination destination = connectorMatedMap.get(destKeys.get(i));
				total += destination.getDestPins().size();
			}
			for (int i = 0; i < destKeys.size(); i++) {
				SchematicDestination destination = connectorMatedMap.get(destKeys.get(i));
				int currentHeight = height * (destination.getDestPins().size()) / total;
				int currentWidth = 50;
				if (destKeys.size() == 1) {
					currentHeight = height;
				}

				RenderModel rm2 = RenderModel.builder().rowInd(xyRowColList.get(0)).columnInd(xyRowColList.get(1))
						.connectorName(destination.getDestName()).defaultPortDesignator(destPortDesignator)
						.height(currentHeight).width(currentWidth).commodityName(commodityName).startX(destX)
						.startY(destY + ht).labelPosition(destLabelPosition)
						.label(labelMap.get(destination.getDestName())).endX(destX + currentWidth)
						.endY(destY + ht + currentHeight).destConnector(destIsDest).sourceConnector(destIsSource)
						.mated(true).build();

				ht += currentHeight + 2;
				if (!renderedEntities.contains(destination.getDestName())) {
					renderedEntities.add(destination.getDestName());
					renderModelList.add(rm2);
				}
			}
			// updateList(xyRowColList);
		}
		// }

	}

	private Map<String, String> generateLabelFromMetadata(Map<String, DatabaseFileData> metadataMap) {
		Map<String, String> labelMap = new HashMap<>();
		int count = 1;
		for (Map.Entry<String, DatabaseFileData> entry : metadataMap.entrySet()) {
			String sourceConnectorNumber = checkNotEmptyAndBlank(entry.getValue().getConnectorNumber())
					? entry.getValue().getConnectorNumber()
					: "";
			String noOfCavity = checkNotEmptyAndBlank(entry.getValue().getNumberOfCav())
					? entry.getValue().getNumberOfCav()
					: "";
			if (StringUtils.isNotEmpty(entry.getValue().getConnectorDesc())) {
				if (StringUtils.isEmpty(sourceConnectorNumber)) {
					labelMap.put(entry.getKey(), "" + "\n" + entry.getValue().getConnectorDesc());
				}
				if (StringUtils.isEmpty(noOfCavity)) {
					labelMap.put(entry.getKey(), sourceConnectorNumber + "\n" + entry.getValue().getConnectorDesc());
				}
				if (StringUtils.isEmpty(noOfCavity) && StringUtils.isEmpty(sourceConnectorNumber)) {
					labelMap.put(entry.getKey(), "" + "\n" + entry.getValue().getConnectorDesc());
				}
				if (StringUtils.isNotEmpty(noOfCavity) && StringUtils.isNotEmpty(sourceConnectorNumber)) {
					labelMap.put(entry.getKey(),
							sourceConnectorNumber + "/" + noOfCavity + "\n" + entry.getValue().getConnectorDesc());
				}
			} else {
				log.error("Label Not Generated for DB File Row:{}.val:{}", count, entry.getValue().toString());
			}
			count++;
		}
		return labelMap;
	}

	private void generateSchematicBasicConnectorData(String connectorName, String cavity, byte[] imgData,
			Map<String, SchematicBasicConnectorData> basicConnectorData) {
		SchematicBasicConnectorData data = new SchematicBasicConnectorData();
		List<String> pins = new ArrayList<>();
		if (basicConnectorData.containsKey(connectorName)) {
			data = basicConnectorData.get(connectorName);
			pins = data.getPins();
		} else {
			data.setImageData(imgData);
			data.setConnectorName(connectorName);
		}
		pins.add(cavity);
		data.setPins(pins);
		basicConnectorData.put(connectorName, data);
	}

	private void generateSingleCircuit(String key, List<RenderModel> renderModelList,
			Map<String, SchematicBasicConnectorData> basicConnectorDataMap, List<Integer> xyRowColList,
			Map<String, String> labelMap, String commodityName,
			LinkedHashMap<String, SchematicSourceDestinationMapping> map, int[][] pos, boolean isSplice) {

		SchematicSourceDestinationMapping srcDest = map.get(key);
		SchematicBasicConnectorData basicConnectorData = basicConnectorDataMap.get(key);
		// Single circuit
		int pinSize = basicConnectorData.getPins().size();
		int height = 20 * pinSize;
		int width = 30;

		if (!isSplice) {
			getPositionForConnectors(xyRowColList, pos);
		}
//		int count = 0;
//		count++;
//		String test = count + " " + key + " Stat X " + xyRowColList.get(2) + " ,Start Y " + xyRowColList.get(3)
//				+ " ,End X " + (xyRowColList.get(2) + width) + " ,End Y " + (xyRowColList.get(3) + height);
//		System.err.println(test);
		RenderModel rm = RenderModel.builder().rowInd(xyRowColList.get(0)).columnInd(xyRowColList.get(1))
				.connectorName(key).height(height).width(width).commodityName(commodityName).startX(xyRowColList.get(2))
				.startY(xyRowColList.get(3)).labelPosition(StringUtils.EMPTY).endX(xyRowColList.get(2) + width)
				.endY(xyRowColList.get(3) + height).label(labelMap.get(key)).build();
		renderModelList.add(rm);
		// updateList(xyRowColList);
	}

	private void generateSrcDestMap(String src, String srcPin, String dest, String destPin, String matingConnectionType,
			LinkedHashMap<String, SchematicSourceDestinationMapping> map, String specification) {
		HashMap<String, SchematicDestination> connectorMatedMap = new HashMap<>();
		HashMap<String, SchematicDestination> wireMatedMap = new HashMap<>();
		LinkedHashSet<String> srcPins = new LinkedHashSet<>();
		LinkedHashSet<String> destPins = new LinkedHashSet<>();
		boolean isMated = false;
		boolean isDualConnector = false;
		String source = StringUtils.EMPTY;

		if (map.containsKey(src)) {
			if (ObjectUtils.isNotEmpty(map.get(src).getConnectorMatedMap()))
				connectorMatedMap = map.get(src).getConnectorMatedMap();
			if (ObjectUtils.isNotEmpty(map.get(src).getWireMatedMap()))
				wireMatedMap = map.get(src).getWireMatedMap();
		}

		String value = map.containsKey(src)
				&& StringUtils.equalsIgnoreCase("SOURCE", map.get(src).getTypeSpecification()) ? "SOURCE"
						: specification;

		if (StringUtils.equalsIgnoreCase("WIRE", matingConnectionType)) {
			if (wireMatedMap.containsKey(dest)) {
				srcPins = wireMatedMap.get(dest).getSrcPins();
				destPins = wireMatedMap.get(dest).getDestPins();
			}
			srcPins.add(srcPin);
			destPins.add(destPin);
			wireMatedMap.put(dest, new SchematicDestination(dest, srcPins, destPins));
		} else {
			if (connectorMatedMap.containsKey(dest)) {
				destPins = connectorMatedMap.get(dest).getSrcPins();
				srcPins = connectorMatedMap.get(dest).getDestPins();
			}
			if (connectorMatedMap.size() > 2) {
				isDualConnector = true;
			}
			source = StringUtils.equalsIgnoreCase(specification, "SOURCE") ? src : dest;
			srcPins.add(srcPin);
			destPins.add(destPin);

			connectorMatedMap.put(dest, new SchematicDestination(dest, srcPins, destPins));
			isMated = true;
		}
		map.put(src, new SchematicSourceDestinationMapping(src, isDualConnector, isMated, source, value,
				connectorMatedMap, wireMatedMap));
	}

	// *************************************************************************//
	// ** Intermediate Object Logging ******************************************//
	// *************************************************************************//
	public void mapLogger(Map map, String name) {
		map.forEach((k, v) -> log.debug("key:{},value:{}", k, v.toString()));

	}

	//
	private void logSrcDestMap(HashMap<String, SchematicSourceDestinationMapping> map) {
		map.forEach((k, v) -> {
			log.debug("======Source Dest Map ============");
			log.debug("key:{}", k);
			log.debug("value:{");
			log.debug("Is Dual Source:{}", v.isDualSourceConnector());
			log.debug("Specification :{}", v.getTypeSpecification());
			log.debug("Connector Mated map :---> ");
			mapLogger(v.getConnectorMatedMap(), "Connector Mating");
			log.debug("wire Mated map :---> ");
			mapLogger(v.getWireMatedMap(), "Wire Mating");
			log.debug("}");
			log.debug("======================================");
		});
	}

	// *************************************************************************************//
	// ****** Render Model Coordinates List
	// ***********************************************//
	// *************************************************************************************//

	private void updateList(List<Integer> list) {
		boolean flag = list.get(2) >= 1200;
		// row index
		list.set(0, flag ? list.get(0) + 1 : 0);
		// column index
		list.set(1, !flag ? list.get(1) + 1 : list.get(1));
		// Current X Position
		list.set(2, !flag ? list.get(2) + 300 : 100);
		// Current Y Position
		list.set(3, flag ? list.get(3) + 300 : list.get(3));
	}

	private void getPositionForCustomImage(List<Integer> list, int[][] pos, int j, boolean isLeft, int pinheight) {
		boolean flag = false;
		// latest changes
		int imageSpace;
		if (pinheight > 15) {
			imageSpace = 600;
		} else {
			imageSpace = 300;
		}
		// ------/
		int size = pos.length;
		for (int i = 0; i <= size - 1; i++) {
			if (pos[i][j] != 1) {
				list.set(0, i);
				list.set(1, j);
				pos[i][j] = 1;
				flag = true;
				break;
			}
		}
		if (flag) {
			list.set(2, list.get(1) * 300 + 100);
			list.set(3, list.get(0) * imageSpace + 100);
		} else {
			if (isLeft) {
				getPositionForCustomImage(list, pos, j - 1, true, pinheight);
			} else {
				getPositionForCustomImage(list, pos, j + 1, false, pinheight);
			}
		}
	}

	private void getPositionForConnectors(List<Integer> list, int[][] pos) {
		boolean flag = false;
		int size = pos.length;
		for (int i = 0; i <= size - 1; i++) {
			for (int j = 1; j <= 4; j++) {
				if (pos[i][j] != 1) {
					list.set(0, i);
					list.set(1, j);
					pos[i][j] = 1;
					flag = true;

					break;
				}
			}
			if (flag)
				break;

		}
		list.set(2, list.get(1) * 300 + 100);
		list.set(3, list.get(0) * 300 + 100);
	}

	private void getPositionForConnectorsNew(List<Integer> list, int[][] pos, int j) {
		int size = pos.length;
		for (int i = 0; i <= size - 1; i++) {
			if (pos[i][j] != 1) {
				list.set(0, i);
				list.set(1, j);
				pos[i][j] = 1;
				break;
			}
		}
		list.set(2, list.get(1) * 300 + 100);
		list.set(3, list.get(0) * 300 + 100);
	}

	// ****************************************************************************************//
	// *** Section for DB Calls Starts here
	// *************************************************//
	// ***************************************************************************************//

	public boolean checkIfFileExists(String commoditySearched) {
		return commodityDetailsRepository.existsByCommodityName(commoditySearched);
	}

	public Map<String, DatabaseFileData> getMetaData(String fileName) {
		return mdRepo.findByFileName(fileName).stream()
				.collect(Collectors.toMap(DatabaseFileData::getConnectorDesc, elem -> elem));
	}

	public Map<String, DatabaseFileData> getMetaData() {
		return mdRepo.findAll().stream().collect(Collectors.toMap(DatabaseFileData::getConnectorDesc, elem -> elem));
	}

	private boolean checkNotEmptyAndBlank(String imageName) {
		return StringUtils.isNotEmpty(imageName) && StringUtils.isNotBlank(imageName);
	}

	private List<String> getAllRelatedGParts(String commoditySearched) {
		return sgMappingRepository.findBySxxName(commoditySearched).stream().map(SGMapping::getG06Name)
				.collect(Collectors.toList());
	}

	private List<String> getAllRelatedAParts(String commoditySearched) {
//		List<SAMapping> SAMappingdata = schematicCommodityA06Repository.findAll();
//		return SAMappingdata.stream().filter(data -> data.getSxxName().equals(commoditySearched))
//				.map(SAMapping::getA06Name).collect(Collectors.toList());
		return schematicCommodityA06Repository.findBySxxName(commoditySearched).stream().map(SAMapping::getA06Name)
				.distinct().collect(Collectors.toList());
	}

	private List<G06Embeddable> createListForGParts(List<String> gPartMapping, String commoditySearched) {
		List<String> g06Names = new ArrayList<>();
		gPartMapping.forEach(elem -> {
			g06Names.add(elem.split("_")[1] + "_" + elem.split("_")[2]);
		});
		List<G06Embeddable> schematicG06ExcelDataList = new ArrayList<>();
		g06Names.forEach(elem -> schematicG06ExcelDataList.addAll(g06DataRepository.findByG06name(elem).stream()
				.map(G06Data::getGo6Embeddable).collect(Collectors.toList())));
		return schematicG06ExcelDataList.stream().filter(elem -> elem.getCommodity().equals(commoditySearched))
				.collect(Collectors.toList());
	}

	private byte[] getImage(String imageName, String commoditySearched, List<CustomImage> imagelist)
			throws IOException, DataFormatException {
//		CustomImage imageData = imageRepository.findByCustomImageNameAndCommodityName(imageName, commoditySearched);
//		return ObjectUtils.isEmpty(imageData) ? null
//				: SchematicFileCompressionUtils.decompress(imageData.getImageData());

		Optional<CustomImage> imageData = imagelist.stream().filter(data -> data.getCustomImageName().equals(imageName))
				.findFirst();
		if (imageData.isPresent()) {
			return SchematicFileCompressionUtils.decompress(imageData.get().getImageData());
		} else {
			return null;
		}
	}

	public boolean searchCommodity(CommoditySearchRequest searchRequest) {
		CommodityDetails cd = commodityDetailsRepository.findByCommodityName(searchRequest.getCommodityName());
		boolean retValue = false;
		if (ObjectUtils.isNotEmpty(cd) && (StringUtils.equalsIgnoreCase(cd.getAssignedTo(), searchRequest.getUserName())
				|| StringUtils.equalsIgnoreCase(searchRequest.getRole(), "ROLE_ADMIN"))) {
			retValue = true;
		}
		return retValue;
	}

	public List<RenderModel> findByCommodityName(String commodityName) {
		return streamer.stream(RenderModel.class).filter(RenderModel$.commodityName.equalIgnoreCase(commodityName))
				.collect(Collectors.toList());
	}

	public List<SchematicWireColor> getAllColors() {
		List<SchematicWireColor> schematicWireColors = schematicWireColorRepository.findAll();
		return schematicWireColors;
	}

	public void deleteByCommodityName(String commodityName) {
		repository.deleteByCommodityName(commodityName);
	}

	public Object saverealignmentData(RealignmentModel realignmentRequest) {
		RealignmentModel updatedData = realignmentModelRepository
				.findByCommodityName(realignmentRequest.getCommodityName());

		if (updatedData != null) {
			updatedData.setCommodityName(realignmentRequest.getCommodityName());
			updatedData.setRenderedData(realignmentRequest.getRenderedData());
			updatedData.setRenderedHeight(realignmentRequest.getRenderedHeight());
			updatedData.setRenderedWidth(realignmentRequest.getRenderedWidth());
			updatedData.setRealign(true);
			realignmentModelRepository.save(updatedData);
			return updatedData;
		}
		RealignmentModel saveData = realignmentModelRepository.save(realignmentRequest);
		return saveData;
	}

}

/*
 *
 */
package com.daimler.schematicbackend.service.file;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;
import java.util.stream.Collectors;

import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.daimler.schematicbackend.config.SchematicMiscConfig;
import com.daimler.schematicbackend.dto.file.request.SchematicCommodityAssignDto;
import com.daimler.schematicbackend.entity.file.CommodityDetails;
import com.daimler.schematicbackend.entity.file.CommodityRenderable;
import com.daimler.schematicbackend.entity.user.UserData;
import com.daimler.schematicbackend.exception.auth.SchematicAuthException;
import com.daimler.schematicbackend.model.file.SchematicCommodityAssignedResponse;
import com.daimler.schematicbackend.model.file.SchematicCommodityData;
import com.daimler.schematicbackend.model.file.SchematicCommodityLettersResponse;
import com.daimler.schematicbackend.model.file.SchematicCommodityStatus;
import com.daimler.schematicbackend.model.file.SchematicProjectStatusResponse;
import com.daimler.schematicbackend.repository.auth.SchematicUserRepository;
import com.daimler.schematicbackend.repository.file.SchematicCommodityDetailsRepository;
import com.daimler.schematicbackend.repository.file.SchematicRenderableRepository;
import com.daimler.schematicbackend.service.auth.SchematicUserService;
import com.speedment.jpastreamer.application.JPAStreamer;

import javafx.util.Pair;

/**
 * The Class SchematicCommodityAssignedService.
 */
@Service
public class SchematicCommodityAssignedService {

	/**
	 * The service.
	 */
	@Autowired
	SchematicUserService service;

	/**
	 * The commodity repository.
	 */
	@Autowired
	SchematicCommodityDetailsRepository commodityRepository;

	/**
	 * The misc config.
	 */
	@Autowired
	SchematicMiscConfig miscConfig;

	/**
	 * The streamer.
	 */
	@Autowired
	JPAStreamer streamer;

	@Autowired
	SchematicRenderableRepository renderRepository;

	@Autowired
	SchematicCommodityDetailsRepository commodityDetailsRepository;

	@Autowired
	SchematicRenderableRepository renderableRepository;

	@Autowired
	SchematicUserRepository userRepository;

	/**
	 * Assign commodity to user.
	 *
	 * @param request the request
	 * @return true, if successful
	 * @throws SchematicAuthException the schematic auth exception
	 */
	public boolean assignCommodityToUser(SchematicCommodityAssignDto request) throws SchematicAuthException {
		/** changing boolean value to list of values **/
		boolean retValue = false;
		validateIfUserValid(request.getAssignedBy(), "Kindly Register to Perform this action.");
		validateIfUserValid(request.getAssignedTo(), "The commodity cannot be assigned to an unregistered user.");
		CommodityDetails dataToBeSaved = miscConfig.getModelMapper().map(request, CommodityDetails.class);
		String commodity = request.getCommodityName();

		if (commodityRepository.existsByCommodityName(commodity)) {
			CommodityDetails commodityDetails = commodityRepository.findByCommodityName(commodity);
			commodityDetails.setAssignDate(LocalDateTime.now());
			commodityDetails.setAssignedBy(request.getAssignedBy());
			commodityDetails.setAssignedTo(request.getAssignedTo());
			commodityDetails.setStatus("ASSIGNED");
			commodityRepository.save(commodityDetails);
			retValue = true;
		} else if (ObjectUtils.isNotEmpty(dataToBeSaved)) {
			dataToBeSaved.setAssignDate(LocalDateTime.now());
			dataToBeSaved.setStatus("ASSIGNED");
			commodityRepository.save(dataToBeSaved);
			retValue = true;
		}

		return retValue;
	}

	public String assignCommodityToUser(SchematicCommodityAssignDto request, String commodity)
			throws SchematicAuthException {
		validateIfUserValid(request.getAssignedBy(), "Kindly Register to Perform this action.");
		validateIfUserValid(request.getAssignedTo(), "The commodity cannot be assigned to an unregistered user.");

		if (!renderRepository.existsByCommodityName(commodity)) {
			return "NotExit";
		}
		CommodityDetails dataToBeSaved = miscConfig.getModelMapper().map(request, CommodityDetails.class);

		if (commodityRepository.existsByCommodityName(commodity)) {
			return "exit";
		} else if (ObjectUtils.isNotEmpty(dataToBeSaved)) {
			dataToBeSaved.setCommodityName(commodity);
			dataToBeSaved.setAssignDate(LocalDateTime.now());
			dataToBeSaved.setStatus("ASSIGNED");
			commodityRepository.save(dataToBeSaved);
			return "Assigned";
		}
		return "";
	}

	/**
	 * Gets the display data.
	 *
	 * @return the display data
	 */
	public List<SchematicCommodityAssignedResponse> getDisplayData() {
		return commodityRepository.findAll(Sort.by("priority").descending()).stream()
				.filter(elem -> elem.isAssigned() && !elem.isRendered())
				.map(elem -> miscConfig.getModelMapper().map(elem, SchematicCommodityAssignedResponse.class))
				.collect(Collectors.toList());
	}

	/**
	 * Gets the assignable commodities.
	 *
	 * @return the assignable commodities
	 */
	public List<String> getAssignableCommodities() {
		return renderRepository.findAll().stream().filter(data -> Boolean.TRUE.equals(data.isRenderable()))
				.map(CommodityRenderable::getCommodityName).collect(Collectors.toList());

//		return streamer.stream(CommodityRenderable.class).filter(CommodityRenderable$.renderable.equal(true))
//				.map(CommodityRenderable$.commodityName).collect(Collectors.toList());
	}

	/**
	 * Validate if user valid.
	 *
	 * @param username     the username
	 * @param errorMessage the error message
	 * @throws SchematicAuthException the schematic auth exception
	 */
	private void validateIfUserValid(String username, String errorMessage) throws SchematicAuthException {
		if (!service.findIfUserNameExists(username)) {
			throw new SchematicAuthException(errorMessage);
		}

	}

	public SchematicCommodityStatus getCommoditesByUserName(String userName) {
		List<CommodityDetails> commodityDetailsList = commodityRepository.findByAssignedTo(userName);
		List<SchematicCommodityData> inQueue = new ArrayList<>();
		List<SchematicCommodityData> rendered = new ArrayList<>();
		for (CommodityDetails commodityDetails : commodityDetailsList) {
			CommodityRenderable data = renderRepository.findByCommodityName(commodityDetails.getCommodityName());
			if (commodityDetails.isRendered()) {
				rendered.add(new SchematicCommodityData(data.getCommodityName(), data.getCommodityDescription()));
			} else {
				inQueue.add(new SchematicCommodityData(data.getCommodityName(), data.getCommodityDescription()));
			}
		}
		return new SchematicCommodityStatus(inQueue, rendered);
	}

	public void updateStatus(String commodityName) {
		CommodityDetails commodityDetails = commodityRepository.findByCommodityName(commodityName);
		if (ObjectUtils.isNotEmpty(commodityDetails)) {
			commodityDetails.setRendered(true);
			commodityDetails.setStatus("RENDERED");
			commodityDetails.setRenderDate(LocalDateTime.now());
			commodityRepository.save(commodityDetails);
		}
	}

	public void assignCommoditiesToUser() {
		System.out.println("Assigning commodity to user");
		List<String> activeUsers = getActiveUsers();
		List<CommodityRenderable> renderableList = getRenderableCommodity();

		PriorityQueue<Pair<String, Long>> pq = new PriorityQueue<Pair<String, Long>>(activeUsers.size(),
				(a, b) -> (int) (a.getValue() - b.getValue()));
		Map<String, Integer> UserMap = new HashMap<>();

		for (String userName : activeUsers) {
			long count = commodityDetailsRepository.getUserCountByStaus(userName);
			pq.add(new Pair<>(userName, count));
		}
		for (CommodityRenderable commodity : renderableList) {
			if (!commodityRepository.existsByCommodityName(commodity.getCommodityName())) {
				CommodityDetails commodityDetails = new CommodityDetails();
				Pair<String, Long> userWithCount = pq.poll();
				commodityDetails.setAssigned(true);
				commodityDetails.setCommodityName(commodity.getCommodityName());
				commodityDetails.setAssignedBy("AUTO");
				commodityDetails.setAssignedTo(userWithCount.getKey());
				commodityDetails.setPriority(false);
				commodityDetails.setRendered(false);
				commodityDetails.setStatus("ASSIGNED");
				/**
				 * Changed data type for assign_date in table as well in CommodityDetails class
				 **/
				commodityDetails.setAssignDate(LocalDateTime.now());// add timestamp HH:MM:SS
				commodityDetailsRepository.save(commodityDetails);

				long count = userWithCount.getValue() + 1;
				pq.add(new Pair<>(userWithCount.getKey(), count));
			}
		}
	}

	public List<CommodityRenderable> getRenderableCommodity() {
		List<CommodityRenderable> renderableList = renderableRepository.findByRenderableTrue();
		return renderableList;
	}

	public List<String> getActiveUsers() {
		System.out.println("Active users found in database");
		UserData userdataEntity = new UserData();

		userdataEntity.setAccessType("ROLE_USER");
		userdataEntity.setActive(true);

		Example<UserData> activeUserdetails = Example.of(userdataEntity);
		List<String> userDataList = userRepository.getAllByActiveUsers();
		return userDataList;
	}

	public SchematicProjectStatusResponse getCommoditiesStatus() {
		long assignedCount = commodityDetailsRepository.getCountByStaus("ASSIGNED");
		long renderedCount = commodityDetailsRepository.getCountByStaus("RENDERED");
		long pendingCount = renderableRepository.countByRenderableFalse();

		SchematicProjectStatusResponse response = new SchematicProjectStatusResponse();
		response.setAssinged(assignedCount);
		response.setCompleted(renderedCount);
		response.setPending(pendingCount);
		response.setResponseBasedOnCommodityLetters(new ArrayList<>());

		List<CommodityRenderable> commodityDetailsList = new ArrayList<>();

		commodityDetailsList = renderableRepository.findAll();
		Map<String, Boolean> FirstLettersCommodity = new HashMap<>();

		for (CommodityRenderable commodityRenderable : commodityDetailsList) {
			String commodityletters = commodityRenderable.getCommodityName().substring(0, 3);
			if (!(FirstLettersCommodity.containsKey(commodityletters))) {
				FirstLettersCommodity.put(commodityletters, true);
				System.out.println(commodityletters);
			}

		}
		// List<SchematicProjectStatusResponse> commoditiesDetailList=new ArrayList<>();

		for (Map.Entry<String, Boolean> mapElement : FirstLettersCommodity.entrySet()) {
			long totalCount = renderableRepository.countByFirstletters(mapElement.getKey());
			long renderedCommodityCount = commodityDetailsRepository.getCountBylettersAndStatus(mapElement.getKey(),
					"RENDERED");
			long assignedCommodityCount = commodityDetailsRepository.getCountBylettersAndStatus(mapElement.getKey(),
					"ASSIGNED");
			totalCount -= renderedCommodityCount;
			totalCount -= assignedCommodityCount;
			SchematicCommodityLettersResponse commodityStatus = new SchematicCommodityLettersResponse();
			commodityStatus.setCommodity_Start(mapElement.getKey());
			commodityStatus.setPending(totalCount);
			commodityStatus.setAssinged(assignedCommodityCount);
			commodityStatus.setCompleted(renderedCommodityCount);
			response.getResponseBasedOnCommodityLetters().add(commodityStatus);
		}

		return response;
	}

	public List<String> getCommoditiesByStatus() {
		List<String> assignableCommodities = commodityDetailsRepository.getCommoditiesByStatus("RENDERED");
		return assignableCommodities;
	}
}

/*
 *
 */
package com.daimler.schematicbackend.service.file;

import com.daimler.schematicbackend.entity.file.*;
import com.daimler.schematicbackend.entity.user.UserData;
import com.daimler.schematicbackend.entity.user.UserData$;
import com.daimler.schematicbackend.exception.auth.SchematicAuthException;
import com.daimler.schematicbackend.exception.file.SchematicFileException;
import com.daimler.schematicbackend.model.file.SchematicCommodityA06Response;
import com.daimler.schematicbackend.model.file.SchematicCommodityDbResponse;
import com.daimler.schematicbackend.model.file.SchematicCommodityG06Response;
import com.daimler.schematicbackend.repository.file.SchematicFileDataRepository;
import com.speedment.jpastreamer.application.JPAStreamer;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * The Class SchematicCommodityDbService.
 */
@Service
public class SchematicCommodityDbService {

    /**
     * The streamer.
     */
    @Autowired
    JPAStreamer streamer;

    /**
     * The repository.
     */
    @Autowired
    SchematicFileDataRepository repository;

    /**
     * Gets the screen.
     *
     * @param userName
     *            the user name
     * @param commodityName
     *            the commodity name
     * @return the screen
     * @throws SchematicAuthException
     *             the schematic auth exception
     * @throws SchematicFileException
     *             the schematic file exception
     */
    public SchematicCommodityDbResponse getScreen(String userName, String commodityName)
            throws SchematicAuthException, SchematicFileException {
        List<SchematicCommodityA06Response> a06Responses = validateUserAndReturnA06List(userName, commodityName);
        List<SchematicCommodityG06Response> g06Responses = generateG06Response(commodityName);
        return new SchematicCommodityDbResponse(a06Responses, g06Responses);
    }

    /**
     * Generate G 06 response.
     *
     * @param commodityName
     *            the commodity name
     * @return the list
     */
    private List<SchematicCommodityG06Response> generateG06Response(String commodityName) {

        List<SGMapping> dbValue = streamer.stream(SGMapping.class)
                .filter(SGMapping$.sxxName.equalIgnoreCase(commodityName)).collect(Collectors.toList());
        List<SchematicCommodityG06Response> g06Responses = new ArrayList<>();
        if (ObjectUtils.isNotEmpty(dbValue)) {
            for (SGMapping sgMapping : dbValue) {
                g06Responses.add(SchematicCommodityG06Response.builder().g06Name(sgMapping.getG06Name())
                        .availability(repository.existsByFileName(sgMapping.getG06Name()) ? "YES" : "NO").build());
            }
        }
        return g06Responses;
    }

    /**
     * Validate user and return A 06 list.
     *
     * @param userName
     *            the user name
     * @param commodityName
     *            the commodity name
     * @return the list
     * @throws SchematicAuthException
     *             the schematic auth exception
     * @throws SchematicFileException
     *             the schematic file exception
     */
    private List<SchematicCommodityA06Response> validateUserAndReturnA06List(String userName, String commodityName)
            throws SchematicAuthException, SchematicFileException {
        Optional<UserData> userData = streamer.stream(UserData.class)
                .filter(UserData$.username.equalIgnoreCase(userName)).findFirst();
        List<SchematicCommodityA06Response> a06Responses;
        if (userData.isPresent()) {
            a06Responses = validateIfCommodityIsValid(commodityName);
            validateIfUserIsAuthoroized(userData.get().getAccessType(), userData.get().getUsername(), commodityName);
        } else {
            throw new SchematicAuthException("User Does not exist");
        }
        return a06Responses;
    }

    /**
     * Validate if user is authoroized.
     *
     * @param accessType
     *            the access type
     * @param userName
     *            the user name
     * @param commodityName
     *            the commodity name
     * @throws SchematicFileException
     *             the schematic file exception
     * @throws SchematicAuthException
     *             the schematic auth exception
     */
    private void validateIfUserIsAuthoroized(String accessType, String userName, String commodityName)
            throws SchematicFileException, SchematicAuthException {
        if (!StringUtils.equalsIgnoreCase("ROLE_ADMIN", accessType)) {

            Optional<CommodityDetails> fileDataOptional = streamer.stream(CommodityDetails.class)
                    .filter(CommodityDetails$.commodityName.equalIgnoreCase(commodityName)).findFirst();

            if (!fileDataOptional.isPresent()) {
                throw new SchematicFileException("Commodity:" + commodityName + " - is currently not assigned");
            }

            if (StringUtils.equalsIgnoreCase(fileDataOptional.get().getAssignedTo(), userName)) {
                throw new SchematicAuthException("You are not authorized to access this commodity");
            }
        }
    }

    /**
     * Validate if commodity is valid.
     *
     * @param commodityName
     *            the commodity name
     * @return the list
     * @throws SchematicFileException
     *             the schematic file exception
     */
    private List<SchematicCommodityA06Response> validateIfCommodityIsValid(String commodityName)
            throws SchematicFileException {

        List<SAMapping> dbValue = streamer.stream(SAMapping.class)
                .filter(SAMapping$.sxxName.equalIgnoreCase(commodityName)).collect(Collectors.toList());
        if (ObjectUtils.isEmpty(dbValue)) {
            throw new SchematicFileException("No Details for commodity:" + commodityName + "- found in  master data");
        }

        List<SchematicCommodityA06Response> a06Responses = new ArrayList<>();
        for (SAMapping saMapping : dbValue) {
            a06Responses.add(SchematicCommodityA06Response.builder().a06Name(saMapping.getA06Name())
                    .a06Description(saMapping.getA06Description())
                    .availability(repository.existsByFileName(saMapping.getA06Name()) ? "Yes" : "No").build());
        }
        return a06Responses;
    }

}

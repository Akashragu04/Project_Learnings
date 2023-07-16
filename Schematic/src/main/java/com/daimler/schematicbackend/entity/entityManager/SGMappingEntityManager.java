package com.daimler.schematicbackend.entity.entityManager;

import com.daimler.schematicbackend.entity.file.G06ModLogData;
import com.daimler.schematicbackend.entity.file.SGMappingModLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

/**
 * SGMappingEnitityManager
 *
 * Author by Sriramulu
 */
@Repository
public class SGMappingEntityManager {

    @Autowired
    EntityManager enitityManager;

    public List<G06ModLogData> getG06ModLogDetails(String g06name, Timestamp startDate, Timestamp endDate) {
        Query query = enitityManager
                .createNativeQuery(
                        "SELECT g06name g06name,user_name user_name,upload_date upload_date,commodity commodity, "
                                + " MIN(upload_date) AS creationDate, " + " MAX(upload_date) AS modifiedDate "
                                + " FROM schematic_g06_data where g06name = ? and upload_date between ?  and ? "
                                + " GROUP BY g06name, user_name ")
                .setParameter(1, g06name).setParameter(2, startDate).setParameter(3, endDate);

        List<Object[]> modLogsList = query.getResultList();
        List<G06ModLogData> g06ModLogDataList = new ArrayList<>();
        if (!modLogsList.isEmpty() && modLogsList != null) {
            for (Object[] obj : modLogsList) {
                G06ModLogData modLogData = new G06ModLogData();
                if (obj[0] != null)
                    modLogData.setG06name(obj[0].toString());
                if (obj[1] != null)
                    modLogData.setUserName(obj[1].toString());
                modLogData.setModifiedBy(obj[1].toString());
                if (obj[2] != null)
                    modLogData.setUploadDate(obj[2].toString());
                if (obj[3] != null)
                    modLogData.setCommodity(obj[3].toString());
                if (obj[4] != null)
                    modLogData.setCreationDate(obj[4].toString());
                if (obj[5] != null)
                    modLogData.setModifiedDate(obj[5].toString());
                g06ModLogDataList.add(modLogData);
                System.out.println(g06ModLogDataList);
            }
        }
        // g06ModLogDataList.removeAll(Collections.singleton(null));
        return g06ModLogDataList;
    }

    public List<SGMappingModLog> getModLogDetails(String commodity, Timestamp startDate, Timestamp endDate) {
        Query query = enitityManager.createNativeQuery("SELECT g06name g06name,sxx_name sxxName,user_name userName,"
                + "upload_date uploadDate,MIN(upload_date) AS creationDate,MAX(upload_date) AS modifiedDate FROM "
                + "schematic_commodity_g06_mapping where sxx_name = ? and upload_date between ? and ? ")
                .setParameter(1, commodity).setParameter(2, startDate).setParameter(3, endDate);

        List<Object[]> modLogs = query.getResultList();
        List<SGMappingModLog> sgModLogList = new ArrayList<>();
        if (!modLogs.isEmpty() && modLogs != null) {
            for (Object[] obj : modLogs) {
                SGMappingModLog sGMappingModLog = new SGMappingModLog();
                if (obj[0] != null)
                    sGMappingModLog.setG06Name(obj[0].toString());
                if (obj[1] != null)
                    sGMappingModLog.setSxxName(obj[1].toString());
                if (obj[2] != null)
                    sGMappingModLog.setUserName(obj[2].toString());
                if (obj[3] != null)
                    sGMappingModLog.setUploadDate(obj[3].toString());
                if (obj[4] != null)
                    sGMappingModLog.setModifiedDate(obj[4].toString());
                if (obj[5] != null)
                    sGMappingModLog.setCreationDate(obj[5].toString());
                sgModLogList.add(sGMappingModLog);
                System.out.println(sgModLogList);
            }
        }
        // sgModLogList.removeAll(Collections.singleton(null));
        return sgModLogList;
    }

}

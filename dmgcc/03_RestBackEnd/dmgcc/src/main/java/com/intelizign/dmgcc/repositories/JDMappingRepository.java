package com.intelizign.dmgcc.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.intelizign.dmgcc.models.JDMappingModel;

public interface JDMappingRepository extends JpaRepository<JDMappingModel, Long> {

	List<JDMappingModel> findByRequestId(Long bizid);

	void deleteByRequestId(Long requestid);

	@Query("SELECT u FROM JDMappingModel u WHERE u.id = ?1")
	Optional<JDMappingModel> findById(Long id);

	@Query("SELECT u FROM JDMappingModel u WHERE u.level = ?1 and u.monthandyear =?2 and u.request.id = ?3 ")
	List<JDMappingModel> findOverallActualByMonth(String level, String month, Long bizid);

	@Query("SELECT DISTINCT u.monthandyear FROM JDMappingModel u WHERE u.level = ?1 and u.request.id=?2 ")
	List<String> findJDByLevel(String level, Long bizid);

	@Query("SELECT u FROM JDMappingModel u WHERE u.level = ?1 and u.monthandyear =?2 and u.request.id=?3 ORDER BY u.id")
	List<JDMappingModel> findJDByLevelAndMonth(String level, String month, Long biz_id);

	@Query("SELECT u FROM JDMappingModel u WHERE u.request.id = ?1")
	List<JDMappingModel> findJDByBizCaseId(Long bizid);
	
	@Query("SELECT u FROM JDMappingModel u WHERE u.request.id = ?1 and u.monthandyear =?2 and u.position_code=?3")
    JDMappingModel findByRequestIdAndMonth(Long id,String month,String position_code);

	List<JDMappingModel> findAllByOrderById();
 

}

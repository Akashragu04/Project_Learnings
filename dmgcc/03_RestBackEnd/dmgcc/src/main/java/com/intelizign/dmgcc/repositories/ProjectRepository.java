package com.intelizign.dmgcc.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.intelizign.dmgcc.models.ProjectModel;

public interface ProjectRepository extends JpaRepository<ProjectModel, Long> {

	@Query("SELECT u FROM ProjectModel u WHERE u.service_provider_shortid = ?1 and u.bizcase.bizcasesetup != null ORDER BY u.id ASC")
	List<ProjectModel> findByService_provider_shortid(String businessid);

	@Query("SELECT u FROM ProjectModel u WHERE u.isActive = ?1 and LOWER(CONCAT( u.project_name, u.project_id, u.service_receiver)) LIKE %?2%"
			+ " or  UPPER(CONCAT( u.project_name, u.project_id, u.service_receiver)) LIKE %?2%")
	Page<ProjectModel> findByIsActive(boolean activestatus, String searchkeyword, Pageable pageable);

	@Query("SELECT u FROM ProjectModel u WHERE (u.service_provider_shortid = ?1 or u.service_receiver_shortid=?1) and LOWER(CONCAT( u.project_name, u.project_id, u.service_receiver, u.status)) LIKE %?2%"
			+ " or UPPER(CONCAT( u.project_name, u.project_id, u.service_receiver, u.status)) LIKE %?2%")
	Page<ProjectModel> findProjectBasedOnuser(String short_id, String Searchkeyword, Pageable pageable);

	@Query("SELECT u FROM ProjectModel u WHERE u.service_provider_shortid = ?1 or u.service_receiver_shortid=?1")
	List<ProjectModel> findProjectBasedOnuser(String short_id);

	@Query("SELECT u FROM ProjectModel u WHERE u.id = ?1")
	Optional<ProjectModel> findProjectByid(Long id);

	@Query("SELECT u FROM ProjectModel u WHERE  LOWER(CONCAT( u.project_name, u.project_id, u.service_receiver, u.status)) LIKE %?1%"
			+ " or UPPER(CONCAT( u.project_name, u.project_id, u.service_receiver, u.status)) LIKE %?1%")
	Page<ProjectModel> findAllbysearch(String searchkeyword, Pageable pageable);

	@Query("SELECT u FROM ProjectModel u WHERE u.cost_center = ?1")
	List<ProjectModel> findByCostCenter(String cost_center);

	@Query("SELECT u FROM ProjectModel u WHERE  LOWER(CONCAT( u.project_name, u.project_id,u.status)) LIKE %?1%"
			+ " or UPPER(CONCAT( u.project_name, u.project_id,u.status)) LIKE %?1%")
	List<ProjectModel> findAll(String searchKeyword);

	@Query("SELECT u FROM ProjectModel u WHERE  LOWER(CONCAT( u.project_name, u.project_id,u.status)) LIKE %?1% or UPPER(CONCAT( u.project_name, u.project_id,u.status)) LIKE %?1% and u.service_provider_shortid = ?2")
	List<ProjectModel> findAllByBusiness(String searchKeyword, String shortid);

	@Query("SELECT u FROM ProjectModel u WHERE u.service_provider_shortid = ?1")
	List<ProjectModel> findByServiceProvider(String short_id);

	@Query("SELECT u FROM ProjectModel u WHERE u.isActive = ?1 and LOWER(CONCAT( u.project_name, u.project_id, u.service_receiver)) LIKE %?2% or UPPER(CONCAT( u.project_name, u.project_id, u.service_receiver)) LIKE %?2%  and u.service_provider_shortid=?3")
	Page<ProjectModel> findByIsActive(boolean b, String serachkeyword, String shortid, Pageable pageable);

	List<ProjectModel> findAllByOrderById();

//	@Query("SELECT DISTINCT(m.activeIoNumber) from ProjectModel m where m.activeIoNumber IS NOT NULL")
	@Query(value = "SELECT DISTINCT ionumber FROM (SELECT DISTINCT obj->>'ionumber' AS ionumber   FROM project_details, jsonb_array_elements(project_details.io_mapping) obj   WHERE obj->>'year' = ?1 ) AS subquery WHERE ionumber IN (SELECT DISTINCT obj->>'ionumber' AS ionumber   FROM project_details, jsonb_array_elements(project_details.io_mapping) obj   WHERE obj->>'year' = ?1)", nativeQuery = true)
	List<String> findIONumber(String current_year);

//	@Query("SELECT DISTINCT(m.activeIoNumber) from ProjectModel m where m.cost_center = ?1 and m.activeIoNumber IS NOT NULL")
	@Query(value = "SELECT DISTINCT ionumber FROM (SELECT DISTINCT obj->>'ionumber' AS ionumber FROM project_details, jsonb_array_elements(project_details.io_mapping) obj  WHERE obj->>'year' = ?2 AND project_details.cost_center = ?1 ) AS subquery WHERE ionumber IN (SELECT DISTINCT obj->>'ionumber' AS ionumber   FROM project_details, jsonb_array_elements(project_details.io_mapping) obj   WHERE obj->>'year' = ?2 AND project_details.cost_center = ?1)", nativeQuery = true)
	List<String> findIONumberCostCenter(String costcenter, String current_year);

	@Query("SELECT u FROM ProjectModel u WHERE u.cost_center = ?1")
	List<ProjectModel> checkProjectIsAvailable(String costcenter);

	@Query("SELECT m.activeIoNumber from ProjectModel m where m.id= ?1 and m.activeIoNumber IS NOT NULL")
	String findIONumberByProjectId(long project_id);

	@Query("SELECT u FROM ProjectModel u WHERE  u.id=?1")
	ProjectModel findbyId(Long project_id);

	@Query("SELECT  u FROM ProjectModel u WHERE u.isActive = ?1")
	List<ProjectModel> getactiveProjects(boolean b);

	@Query("SELECT u FROM ProjectModel u WHERE  u.id=?1 and u.isActive=?2")
	ProjectModel findbyIdAndActive(Long project_id, boolean b);

	@Query("SELECT u FROM ProjectModel u WHERE u.bizcase.bizcasesetup != null")
	List<ProjectModel> findAllbizcasesetup();
	
	@Query(value = "SELECT DISTINCT ionumber FROM (SELECT DISTINCT obj->>'ionumber' AS ionumber   FROM project_details, jsonb_array_elements(project_details.io_mapping) obj   WHERE obj->>'year' = ?1  AND project_details.id = ?2) AS subquery WHERE ionumber IN (SELECT DISTINCT obj->>'ionumber' AS ionumber   FROM project_details, jsonb_array_elements(project_details.io_mapping) obj   WHERE obj->>'year' = ?1 AND project_details.id = ?2)", nativeQuery = true)
	List<String> findIONumberForProject(String current_year,Long id);

}

package com.intelizign.dmgcc.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.intelizign.dmgcc.models.ProjectModel;
import com.intelizign.dmgcc.models.SLAModel;

public interface SLARepository extends JpaRepository<SLAModel, Long> {

	Page<SLAModel> findByProjectId(Long ProjectId, Pageable pageable);

	List<SLAModel> findByProjectId(Long ProjectId);

	List<SLAModel> findByProjectIdAndTaskenable(Long ProjectId, Boolean status);

	@Query("SELECT u FROM SLAModel u WHERE u.status = ?1 ")
	List<SLAModel> findByStatus(String status);

	@Query("SELECT u FROM SLAModel u WHERE u.is_active = ?1  AND LOWER(CONCAT( u.slaname, u.slaid, u.customer_company,u.project_name,u.team,u.start_date)) LIKE %?2%"
			+ " or UPPER(CONCAT( u.slaname, u.slaid, u.customer_company,u.project_name,u.team,u.start_date)) LIKE %?2%")
	Page<SLAModel> findByIsactive(Boolean status, String SearchKey, Pageable pageable);

	@Query("SELECT u FROM SLAModel u WHERE u.project.service_provider_shortid = ?1 ORDER BY u.id ASC")
	List<SLAModel> findByService_provider_shortid(String shortid);

	@Query("Select  COALESCE(SUM(s.total_budget),0) FROM SLAModel s where s.project.id=?1 ")
	Long getTotalslaValues(Long projectid);

	@Query("Select s FROM SLAModel s where s.is_active=true AND s.project=?1  ")
	List<SLAModel> getSlaByProject(ProjectModel project);

	@Query("SELECT CASE WHEN COUNT(active) > 0 THEN true ELSE false END FROM SLAModel s where s.active=?1 AND s.project=?2")
	Boolean existByActive(String string, ProjectModel project);

	@Query("SELECT count(s)>0 FROM SLAModel s where s.slaid=?1 ")
	Boolean existBySLAId(String string);

	@Query("Select s FROM SLAModel s where s.is_active=true AND s.project=?1 ")
	Page<SLAModel> findAllSLAbyProject(ProjectModel requestData, Pageable pageable);

	@Query("Select s FROM SLAModel s where s.is_active=true AND s.project=?1 ")
	List<SLAModel> findAllSLAbyProject(ProjectModel requestData);

	@Query("Select COUNT(s) FROM SLAModel s where s.active=?1 AND s.project=?2 ")
	int countsOfActiveInSla(String string, ProjectModel project);

	@Query("Select s FROM SLAModel s where  s.project.id=?1 ")
	List<SLAModel> findByProject(Long ProjectId);

	@Query("SELECT u FROM SLAModel u WHERE u.id = ?1")
	Optional<SLAModel> findById(Long id);

	@Query("Select s FROM SLAModel s where s.is_active=?2 AND s.project.id=?1 AND s.capnitienable=?3 ")
	List<SLAModel> findSLABycapnitiEnable(long id, boolean b, boolean c);

	@Query("SELECT count(*) FROM SLAModel s where s.is_active= true ")
	long findActiveSLA();

	@Query("SELECT  s FROM SLAModel s where s.is_active= true  ORDER BY s.id ")
	List<SLAModel> findAllActive();

	@Query("SELECT u FROM SLAModel u WHERE u.id = ?1")
	SLAModel findbyId(Long sla_id);

	// sound
//	@Query("Select COUNT(s) FROM SLAModel s where s.is_active= true AND s.project.id=?2")
//	long countsOfActiveSlaAndProjectId(Long ProjectId);

	@Query("Select s FROM SLAModel s where  s.project.id=?1 and s.is_active=?2 ")
	List<SLAModel> findByProjectIdAndIs_active(Long project_id, boolean b);

	List<SLAModel> findAllByOrderById();

	@Query("Select s FROM SLAModel s where s.is_active=true ORDER BY s.id ")
	List<SLAModel> findAllByIs_activeOrderById();

	@Query("SELECT s FROM SLAModel s where s.is_active= true ")
	List<SLAModel> findActiveSLACostCenter();

	@Query("Select s.project FROM SLAModel s where  s.project.id=?1 and s.is_active= true")
	ProjectModel findByProjectID(Long ProjectId);

	@Query("Select s FROM SLAModel s where  s.project.id=?1 and s.active=?2 and s.is_active= true")
	List<SLAModel> findByProjectAndStatus(Long ProjectId, String status);

}

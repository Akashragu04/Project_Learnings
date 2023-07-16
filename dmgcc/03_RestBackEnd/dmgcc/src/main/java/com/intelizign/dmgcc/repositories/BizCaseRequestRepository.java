package com.intelizign.dmgcc.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.intelizign.dmgcc.models.businesscasemodels.BusinessCaseRequest;

public interface BizCaseRequestRepository
		extends CrudRepository<BusinessCaseRequest, Long>, JpaRepository<BusinessCaseRequest, Long> {

	Page<BusinessCaseRequest> findByLeadId(Long leadID, Pageable pageable);

	Page<BusinessCaseRequest> findByactive(Boolean status, Pageable pageable);

	@Query("SELECT u FROM BusinessCaseRequest u WHERE u.id = ?1")
	BusinessCaseRequest findbyid(Long id);

	@Query("SELECT u FROM BusinessCaseRequest u WHERE u.id = ?1")
	Optional<BusinessCaseRequest> findById(Long id);

	@Query("SELECT u FROM BusinessCaseRequest u WHERE u.active = ?1 and LOWER(CONCAT( u.id, u.lead.project_name, u.business_case_start_date, u.business_case_end_date, u.status)) LIKE %?2%"
			+ " or UPPER(CONCAT( u.id, u.lead.project_name, u.business_case_start_date, u.business_case_end_date, u.status)) LIKE %?2%")
	Page<BusinessCaseRequest> findbySearchActive(boolean active, String serachkeyword, Pageable pageable);

	@Query("SELECT u FROM BusinessCaseRequest u WHERE u.active = ?1 and u.costcenter = ?2 and LOWER(CONCAT( u.id, u.lead.project_name, u.business_case_start_date, u.business_case_end_date, u.status)) LIKE %?3%"
			+ " or UPPER(CONCAT( u.id, u.lead.project_name, u.business_case_start_date, u.business_case_end_date, u.status)) LIKE %?3%")
	Page<BusinessCaseRequest> findbyCostcenterAndSearchActive(boolean active, String costcenter, String serachkeyword,
			Pageable pageable);

	@Query("SELECT u FROM BusinessCaseRequest u WHERE u.active = ?1 and (u.hr_shortid = ?2 or u.it_shortid = ?2 or u.fac_shortid = ?2 or u.approved_receiver_Shortid=?2 or u.assign_finance_team=?2) and LOWER(CONCAT( u.id, u.lead.project_name, u.business_case_start_date, u.business_case_end_date, u.status)) LIKE %?3%"
			+ " or UPPER(CONCAT( u.id, u.lead.project_name, u.business_case_start_date, u.business_case_end_date, u.status)) LIKE %?3%")
	Page<BusinessCaseRequest> findbyShortIdAndSearchActive(boolean active, String shortid, String serachkeyword,
			Pageable pageable);

	@Query("SELECT u FROM BusinessCaseRequest u WHERE u.costcenter = ?1 and u.overall_status=true")
	List<BusinessCaseRequest> findByCostcenterAndApproved(String costcenter);

	@Query("SELECT u FROM BusinessCaseRequest u WHERE  u.overall_status=true")
	List<BusinessCaseRequest> findByApproved();

	@Query("SELECT u FROM BusinessCaseRequest u WHERE  u.approved_provider_Shortid=?1 AND u.costcenter=?2")
	List<BusinessCaseRequest> findByServiceProvider(String provier_shortid, String costcenter);

	@Query("SELECT u FROM BusinessCaseRequest u WHERE  u.project.id=?1")
	BusinessCaseRequest findBizData(long projectId);

	@Query("SELECT COUNT(*) FROM BusinessCaseRequest u WHERE  u.bizcasereport IS NOT NULL")
	long findPLReport();

	Optional<BusinessCaseRequest> findByIdAndActive(Long biz_id, boolean b);

	Optional<BusinessCaseRequest> findByProjectId(long project_id);

	@Query("SELECT u FROM BusinessCaseRequest u WHERE u.active = ?1 and u.business_days IS NOT NULL")
	List<BusinessCaseRequest> findBusinessDays(boolean active);

	@Query("SELECT u FROM BusinessCaseRequest u WHERE u.active = ?1 and u.costcenter = ?2 and u.business_days IS NOT NULL")
	List<BusinessCaseRequest> findBusinessDaysCostCenter(boolean b, String costcenter);

	@Query("SELECT COUNT(*) FROM BusinessCaseRequest u WHERE u.costcenter = ?1")
	long findBizCaseCostCenter(String costcenter);

	@Query("SELECT COUNT(*) FROM BusinessCaseRequest u WHERE u.costcenter = ?1 and u.bizcasereport IS NOT NULL")
	long findPLReportCostCenter(String costcenter);

	@Query("SELECT u FROM BusinessCaseRequest u WHERE u.active = ?1 and  u.project.id=?2 and u.business_days IS NOT NULL")
	List<BusinessCaseRequest> findBusinessDaysByProjectId(boolean active, long projectId);

	@Query("SELECT u FROM BusinessCaseRequest u WHERE u.active = ?1 and  u.project.id IS NOT NULL")
	List<BusinessCaseRequest> findAllByActive(boolean b);

}

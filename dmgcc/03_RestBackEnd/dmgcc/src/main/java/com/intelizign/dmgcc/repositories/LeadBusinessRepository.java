package com.intelizign.dmgcc.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.intelizign.dmgcc.models.LeadRequestModel;

public interface LeadBusinessRepository extends JpaRepository<LeadRequestModel, Long> {

	@Query("SELECT DISTINCT u.service_provider_department FROM LeadRequestModel u WHERE u.active = ?1")
	List<String> getAllDepartment(Boolean status);

	@Query("SELECT DISTINCT u.service_provider_department FROM LeadRequestModel  u WHERE u.active = ?1 and u.service_provider_short_id = ?2")
	List<String> getdepartmentforBusines(Boolean status, String shortid);

	Page<LeadRequestModel> findByactive(Boolean status, Pageable pageable);

	@Query("SELECT p FROM LeadRequestModel p WHERE p.active = ?1 and LOWER(CONCAT(p.id, p.service_receiver_entity, p.service_receiver_contact_name, p.project_name, p.category_name)) LIKE %?2% "
			+ " or UPPER(CONCAT(p.id, p.service_receiver_entity, p.service_receiver_contact_name, p.project_name, p.category_name)) LIKE %?2%")
	Page<LeadRequestModel> findByactiveandsearchkey(Boolean status, String SearchKey, Pageable pageable);

	@Query("SELECT u FROM LeadRequestModel u WHERE u.active = ?1 and (u.service_receiver_email_id = ?2 or u.service_provider_email_id = ?2) and LOWER(CONCAT(u.id, u.service_receiver_entity, u.service_receiver_contact_name, u.project_name, u.category_name)) LIKE %?3%"
			+ " or UPPER(CONCAT(u.id, u.service_receiver_entity, u.service_receiver_contact_name, u.project_name, u.category_name)) LIKE %?3%")
	Page<LeadRequestModel> findByactiveAndEmailidAndSearch(Boolean status, String email, String description,
			Pageable pageable);

	@Query("SELECT u FROM LeadRequestModel u WHERE u.active = ?1 and (u.service_receiver_email_id = ?2 or u.service_provider_email_id = ?2)")
	Page<LeadRequestModel> findByactiveAndEmailid(Boolean status, String email, Pageable pageable);

	@Query("SELECT p FROM LeadRequestModel p WHERE p.active = ?1 and (p.service_receiver_email_id = ?2 or p.service_provider_email_id = ?2) and LOWER(CONCAT(p.id, p.service_receiver_entity, p.service_receiver_entity, p.service_receiver_contact_name, p.project_name, p.category_name)) LIKE %?3%"
			+ " or UPPER(CONCAT(p.id, p.service_receiver_entity, p.service_receiver_entity, p.service_receiver_contact_name, p.project_name, p.category_name)) LIKE %?3%")
	Page<LeadRequestModel> Search(Boolean status, String email, String serachkeyword, Pageable pageable);

	@Query("SELECT u FROM LeadRequestModel u WHERE u.active = ?1 and (u.biz_id.hr_shortid = ?2 or u.biz_id.it_shortid = ?2 or u.biz_id.fac_shortid = ?2 or u.biz_id.assign_finance_team=?2) and LOWER(CONCAT(u.id, u.service_receiver_entity, u.service_receiver_contact_name, u.project_name, u.category_name)) LIKE %?3%"
			+ " or UPPER(CONCAT(u.id, u.service_receiver_entity, u.service_receiver_contact_name, u.project_name, u.category_name)) LIKE %?3%")
	Page<LeadRequestModel> findByLeadAndBizcaseInfo(Boolean status, String shortid, String serachkeyword,
			Pageable pageable);

	@Query("Select sum(t.delay_days) FROM LeadRequestModel e left join e.leadconversionreport t WHERE t.conversion_period = ?2 AND e.service_provider_cost_center = ?1 ")
	Integer findLeadConversionSum(String costcenter, String conversion);

	@Query("SELECT u FROM LeadRequestModel u WHERE u.service_provider_department = ?1")
	List<LeadRequestModel> findByDepartment(String department);

	@Query("SELECT u FROM LeadRequestModel u WHERE u.service_provider_cost_center = ?1")
	List<LeadRequestModel> findByCostCenter(String costcenter);

	@Query("SELECT project_name FROM LeadRequestModel u WHERE u.service_provider_department = ?1")
	List<String> getProjectSbasedOnDepartment(String department);

	@Query("SELECT u FROM LeadRequestModel u WHERE u.id = ?1")
	Optional<LeadRequestModel> findById(Long id);

	@Query("SELECT u FROM LeadRequestModel u WHERE u.biz_id.business_availability ='without_rate' and LOWER(CONCAT(u.id, u.service_receiver_entity, u.service_receiver_contact_name, u.project_name, u.short_description)) LIKE %?1%"
			+ " or UPPER(CONCAT(u.id, u.service_receiver_entity, u.service_receiver_contact_name, u.project_name, u.short_description)) LIKE %?1%")
	Page<LeadRequestModel> findbyBizRateCardForAdmin(String serachkeyword, Pageable pageable);

	@Query("SELECT u FROM LeadRequestModel u WHERE u.biz_id.business_availability ='without_rate' and LOWER(CONCAT(u.id, u.service_receiver_entity, u.service_receiver_contact_name, u.project_name, u.short_description)) LIKE %?1% or UPPER(CONCAT(u.id, u.service_receiver_entity, u.service_receiver_contact_name, u.project_name, u.short_description)) LIKE %?1%and (u.biz_id.approved_receiver_Shortid = ?2 or u.biz_id.approved_provider_Shortid = ?2 or u.biz_id.assign_finance_team = ?2)")
	Page<LeadRequestModel> findbyBizRateCardForBusinessOrFinance(String serachkeyword, String shortid,
			Pageable pageable);

	@Query("SELECT u FROM LeadRequestModel u WHERE u.service_provider_email_id = ?1")
	List<LeadRequestModel> findByServiceProviderEmail(String email);

	List<LeadRequestModel> findAllByActiveOrderById(boolean b);

	@Query("SELECT COUNT(*) FROM LeadRequestModel u WHERE u.service_provider_cost_center = ?1")
	long findLeadCostCenter(String costcenter);

	@Query("SELECT u FROM LeadRequestModel u WHERE u.active = ?1")
	List<LeadRequestModel> findAllByActive(boolean b);
}

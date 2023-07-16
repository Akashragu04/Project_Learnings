package com.intelizign.dmgcc.repositories;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.intelizign.dmgcc.models.SLAModel;
import com.intelizign.dmgcc.models.SLAPreInvoiceModel;

public interface SLAPreInvoiceRepository extends JpaRepository<SLAPreInvoiceModel, Long> {

	Page<SLAPreInvoiceModel> findBySlaId(Long SLAID, Pageable pageable);

	@Query("SELECT u FROM SLAPreInvoiceModel u WHERE u.active=?1 AND LOWER(CONCAT(u.team,COALESCE(u.project_name,''), u.customer,u.preinvoice_date,u.date_of_service,u.preinvoiceid,u.slaname)) LIKE %?2% "
			+ " or UPPER(CONCAT(u.team,COALESCE(u.project_name,''), u.customer,u.preinvoice_date,u.date_of_service,u.preinvoiceid,u.slaname)) LIKE %?2% ")
	Page<SLAPreInvoiceModel> findByActive(Boolean status, String Searchkey, Pageable pageable);

	@Query("Select SUM(p.total_budget) FROM SLAPreInvoiceModel p where p.sla=?1 ")
	Long getTotalPreinvoiceValues(SLAModel slaData);

	List<SLAPreInvoiceModel> findBySla(SLAModel sla);

	@Query("Select p FROM SLAPreInvoiceModel p where p.sla.id=?1 and p.preinvoice_period !='Others' and p.active=false ORDER BY p.id ASC")
	List<SLAPreInvoiceModel> findPreinvoicesBySla(Long sla);

	@Query("Select p FROM SLAPreInvoiceModel p where p.sla.id=?1  ")
	List<SLAPreInvoiceModel> findBySlaID(Long sla);

	@Query("Select p FROM SLAPreInvoiceModel p where p.sla.id=?1  and p.active=true ORDER BY p.preinvoice_cycle ASC")
	List<SLAPreInvoiceModel> findByAllActivePreInvoiceBySlaID(Long sla);

	@Query("Select p FROM SLAPreInvoiceModel p where p.sla.id=?1 ")
	List<SLAPreInvoiceModel> findBySla(Long sla);

	@Query("Select p FROM SLAPreInvoiceModel p where p.preinvoice_cycle=?1 AND p.sla=?2 ")
	SLAPreInvoiceModel findPreinvoicebyCycleAndSLA(Integer preinvoice_cycle, SLAModel sladata);

	@Query("Select p.active FROM SLAPreInvoiceModel p where p.preinvoice_cycle=?1 AND p.sla=?2 ")
	boolean findActiveStatus(Integer preinvoice_cycle, SLAModel sladata);

	@Query("SELECT u FROM SLAPreInvoiceModel u WHERE u.id = ?1")
	Optional<SLAPreInvoiceModel> findById(Long id);

	@Modifying
	@Transactional
	@Query("DELETE FROM SLAPreInvoiceModel u where u.sla.id=?1")
	void deleteBySla(Long id);

	@Query("Select p FROM SLAPreInvoiceModel p where p.sla.id=?1 AND p.preinvoice_period=?2 ")
	Optional<SLAPreInvoiceModel> findPReinvoiceByPeriod(Long id, String preinvoice_period);

	@Query("Select max(p.preinvoice_cycle) FROM SLAPreInvoiceModel p where p.sla.id=?1  ")
	Integer findMaxCylceBySla(Long id);

	@Query("Select max(p.preinvoice_cycle) FROM SLAPreInvoiceModel p where p.sla.id=?1 and p.active=true and p.is_invoiced=true")
	Integer findMaxCylceByActiveSla(Long id);

	@Query("Select sum(total_budget) FROM SLAPreInvoiceModel p where p.sla.id=?1 and p.active=true ")
	Long getAvailableSlaBudget(Long id);

	@Query("Select p FROM SLAPreInvoiceModel p where p.sla.id=?1 and p.active=true ")
	Optional<SLAPreInvoiceModel> getAvailableSlaBudgetavailable(Long id);

	@Query("Select sum(total_budget) FROM SLAPreInvoiceModel p where p.active=true and p.sla.id=?1 and  p.id!=?2")
	Long getAvailableSlaBudget(Long sla_id, Long PreId);

	@Query("Select p.active FROM SLAPreInvoiceModel p where p.preinvoice_cycle=?1 AND p.sla.id=?2 ")
	boolean findActiveStatus(Integer preinvoice_cycle, Long slaid);

	@Query("Select p FROM SLAPreInvoiceModel p where p.project_name=?1 and p.active=true ")
	Optional<SLAPreInvoiceModel> findByProjectName(String project_name);

	// scheduler methods

	@Query("Select max(p.preinvoice_cycle) FROM SLAPreInvoiceModel p where p.sla.id=?1  and p.active=true and p.preinvoice_period!=?2 ")
	Integer findMaxCylceBySlaForScheduler(Long id, String others);

	@Query("Select p FROM SLAPreInvoiceModel p where p.preinvoice_cycle=?1 AND p.sla.id=?2 ")
	SLAPreInvoiceModel findPreinvoiceByCycle(Integer preinvoice_cycle, Long slaid);

	@Query("Select p FROM SLAPreInvoiceModel p where p.preinvoice_cycle=?1 and p.sla.id=?2")
	SLAPreInvoiceModel findByCycle(Integer max_preinvoice, Long slaid);

	@Query("Select p.preinvoiceid FROM SLAPreInvoiceModel p where p.status !='Approved' and p.preinvoiceid !=null")
	List<String> getUnApprovedPreinvoiceID();

	@Query("Select p.preinvoiceid FROM SLAPreInvoiceModel p where p.status ='Approved' ")
	List<String> getApprovedPreinvoiceID();

	@Query("Select p FROM SLAPreInvoiceModel p where p.slaid=?1 and p.preinvoiceid=?2 ")
	Optional<SLAPreInvoiceModel> getByPreinvoiceAndSLAid(String sla_id, String preinvoice_id);

	@Query("Select p FROM SLAPreInvoiceModel p where  p.preinvoiceid=?1 ")
	Optional<SLAPreInvoiceModel> getByPreinvoiceId(String preinvoice_id);

	@Query("select COALESCE(SUM(p.total_budget),0) from SLAPreInvoiceModel p where year(CAST(p.end_date AS LocalDate)) = ?1 and month(CAST(p.end_date AS LocalDate)) = ?2")
	double findCurrentMonthRevenue(int year, int month);

	@Query("select p from SLAPreInvoiceModel p where year(CAST(p.end_date AS LocalDate)) = ?1 and month(CAST(p.end_date AS LocalDate)) = ?2")
	List<SLAPreInvoiceModel> findCurrentMonthRevenueCostCenter(int year, int month);

//	@Query("Select p FROM SLAPreInvoiceModel p where  p.preinvoiceid=?1 and p.sla_contacts.customer_type=?2")
//	SLAPreInvoiceModel getByPreinvoiceIdAndCustomerType(String preinvoice_id, String customer_type);
}

package com.intelizign.dmgcc.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.intelizign.dmgcc.models.SLAInvoiceModel;
import com.intelizign.dmgcc.models.SLAModel;
import com.intelizign.dmgcc.models.SLAPreInvoiceModel;

public interface SLAInvoiceRepository extends JpaRepository<SLAInvoiceModel, Long> {

	Page<SLAInvoiceModel> findBySlaId(Long SLAID, Pageable pageable);

	@Query("Select p FROM SLAInvoiceModel p where p.active=?1 AND LOWER(CONCAT( p.slaid, p.project_name, p.status)) LIKE %?2% "
			+ " or UPPER(CONCAT( p.slaid, p.project_name, p.status)) LIKE %?2% ")
	Page<SLAInvoiceModel> findByActive(Boolean status, String search, Pageable pageable);

	@Query("Select SUM(p.total_cost) FROM SLAInvoiceModel p where p.sla=?1 ")
	Long getTotalInvoiceValues(SLAModel slaData);

	@Query("Select COALESCE(SUM(p.total_cost),0) FROM SLAInvoiceModel p where p.sla.id=?1 ")
	Long getTotalInvoiceValuesBySLA(Long sla_id);

	@Query("Select p FROM SLAInvoiceModel p where p.slapreinvoice=?1 ")
	SLAInvoiceModel findbySlapreinvoice(SLAPreInvoiceModel preinvoice);

	@Query("SELECT u FROM SLAInvoiceModel u WHERE u.id = ?1")
	Optional<SLAInvoiceModel> findById(Long id);

	@Query("Select SUM(p.total_cost) FROM SLAInvoiceModel p where p.sla.project.id=?1 ")
	Long getTotalInvoiceValuesByproject(Long project_id);

	@Query("SELECT u FROM SLAInvoiceModel u WHERE u.slapreinvoice.id = ?1")
	SLAInvoiceModel findByPreinvoice(long id);

	@Query("SELECT u.invoice_id FROM SLAInvoiceModel u WHERE u.status != 'Payment Success'")
	List<String> findIncompleteInvoices();

	@Query("SELECT u FROM SLAInvoiceModel u WHERE u.invoice_id = ?1")
	Optional<SLAInvoiceModel> getByInvoiceID(String invoice_id);

	@Query("SELECT COALESCE(SUM(m.total_cost),0) FROM SLAInvoiceModel m")
	double findInvoiceRaiseAmount();

	@Query("select COALESCE(SUM(p.total_cost),0) from SLAInvoiceModel p where year(CAST(p.invoice_date AS LocalDate)) = ?1 and month(CAST(p.invoice_date AS LocalDate)) = ?2")
	double findCurrentMonthRevenue(int year, int month);

	@Query("SELECT COUNT(*) FROM SLAInvoiceModel m WHERE m.status = 'Invoiced'")
	double findInvoicedCount();

	@Query("SELECT COUNT(*) FROM SLAInvoiceModel m WHERE m.status != 'Invoiced'")
	double findPendingInvoiceCount();

	List<SLAInvoiceModel> findBySlaIdAndActiveOrderById(long id, boolean b);

	// copy 1
	@Query("select p from SLAInvoiceModel p where year(CAST(p.invoice_date AS LocalDate)) = ?1 and month(CAST(p.invoice_date AS LocalDate)) = ?2")
	List<SLAInvoiceModel> findCurrentMonthRevenueCostCenter(int year, int month);

	// sound
	@Query("Select COALESCE(SUM(p.total_cost),0) FROM SLAInvoiceModel p where p.sla.project.id=?1 and  p.status != 'Invoiced' ")
	Long getTotalInvoiceValuesByprojectByStatus(Long project_id);

	// sound
	@Query("Select COALESCE(SUM(p.total_cost),0) FROM SLAInvoiceModel p where p.sla.project.id=?1 and  p.status = 'Invoiced' ")
	Long getTotalPaymentByprojectByStatus(Long project_id);

	@Query("Select COALESCE(SUM(p.total_cost),0) FROM SLAInvoiceModel p where p.sla.id=?1 ")
	Long getTotalInvoiceValuesBySLAAndStatus(Long sla_id);
}

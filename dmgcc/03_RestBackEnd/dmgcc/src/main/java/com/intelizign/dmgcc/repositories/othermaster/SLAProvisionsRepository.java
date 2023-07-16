package com.intelizign.dmgcc.repositories.othermaster;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.intelizign.dmgcc.models.othermaster.SLAProvisions;



public interface SLAProvisionsRepository extends JpaRepository<SLAProvisions, Long> {

	@Query("Select p FROM SLAProvisions p where p.slaid=?1 ")
	SLAProvisions FindBySLA(Long sla_id);

	@Query("Select p FROM SLAProvisions p where p.status != 'Required' ")
	List<SLAProvisions> findAllByStatusNotRequired();

	@Modifying
	@Transactional
	@Query("delete from SLAProvisions s where s.status != 'Required' ")
	void deleteAllByStatusNotRequired();


	List<SLAProvisions> findAllByMonthAndYearAndStatusAndCostcenterOrderById(String month, String year, String status,
			String costcenter);
	
	List<SLAProvisions> findAllByYearOrderById(String year);

	List<SLAProvisions> findAllByMonthAndYearOrderById(String month, String year);

	List<SLAProvisions> findAllByMonthAndYearAndStatusOrderById(String month, String year, String status);

	List<SLAProvisions> findAllByMonthAndYearAndCostcenterOrderById(String month, String year, String costcenter);

	@Query("Select p FROM SLAProvisions p  where p.status = ?1  ORDER BY p.year, p.month ASC ")
	List<SLAProvisions> findAllByStatusOrderByMonthAndYear(String status);


	@Query("Select p FROM SLAProvisions p  where p.status = ?1 and p.costcenter = ?2 ORDER BY p.year, p.month ASC ")
	List<SLAProvisions> findAllByCostcenterOrderByMonthAndYear(String status, String costcenter);

	List<SLAProvisions> findAllByMonthOrderById(String onemonth_before);

	@Query("SELECT COALESCE(SUM(u.total_provision),0) FROM SLAProvisions u WHERE u.year = ?1 and u.status ='Required'")
	double findAllByYearAndStatusRequired(String year);

	

	@Query("SELECT DISTINCT u.month FROM SLAProvisions u WHERE u.numeric_month <= ?1 and u.year = ?2 ORDER BY u.month DESC")
	List<String> findAllMonths(int today_month, String today_year);

	@Query("SELECT COALESCE(SUM(u.total_provision),0) FROM SLAProvisions u WHERE u.month = ?1 and u.year = ?2")
	double findAllByMonthAndYearSum(String month, String today_year);
	
	@Query("SELECT COALESCE(SUM(u.total_provision),0) FROM SLAProvisions u WHERE u.month = ?1 and u.year = ?2 and status='Required'")
	double findAllRequiredByMonthAndYearSum(String month, String year);
	
	@Query("SELECT COALESCE(SUM(u.total_provision),0) FROM SLAProvisions u WHERE u.month = ?1 and u.year = ?2 and status='Not Required'")
	double findAllNotRequiredByMonthAndYearSum(String month, String year);
	
	@Query("SELECT COALESCE(SUM(u.total_provision),0) FROM SLAProvisions u WHERE u.month = ?1 and u.year = ?2 and status='Invoice Submitted'")
	double findAllReverseProvisionByMonthAndYearSum(String month, String year);

	List<SLAProvisions> findAllByOrderById();

	@Query("Select p FROM SLAProvisions p  where p.numeric_month <= ?1 and p.year <= ?2  ORDER BY id ")
	List<SLAProvisions> findAllByPreviousMonthAndYearOrderById(int onemonth_before, String today_year);

	@Query("Select p FROM SLAProvisions p  where p.month =?1 and p.year =?2 and p.costcenter =?3 and p.status =?4 ORDER BY id ")
	List<SLAProvisions> findAllByCostcenterStatus(String month, String year, String costcenter,
			String status);
	
	@Query("Select p FROM SLAProvisions p  where p.month =?1 and p.year =?2 and p.status =?3 ORDER BY id ")
	List<SLAProvisions> findAllByStatus(String month, String year, String status);

	@Query("SELECT COALESCE(SUM(u.total_provision),0) FROM SLAProvisions u WHERE u.status='Required'")
	double findAllByStatusRequired();
	
	@Query("SELECT COALESCE(SUM(u.total_provision),0) FROM SLAProvisions u WHERE u.year <= ?1 and u.status='Required'")
	double findAllPreviousYearRequiredSum(String year);

	@Query("SELECT COALESCE(SUM(u.total_provision),0) FROM SLAProvisions u WHERE u.numeric_month <= ?1 and u.year = ?2 and status='Required'")
	double findAllRequiredByDiffMonthAndYearSum(int month, String year);
}

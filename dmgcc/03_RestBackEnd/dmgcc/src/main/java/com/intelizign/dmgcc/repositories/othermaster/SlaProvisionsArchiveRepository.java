package com.intelizign.dmgcc.repositories.othermaster;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.intelizign.dmgcc.models.othermaster.SlaProvisionsArchive;

public interface SlaProvisionsArchiveRepository extends JpaRepository<SlaProvisionsArchive, Long> {

	List<SlaProvisionsArchive> findAllByOrderById();

	@Query("SELECT COALESCE(SUM(u.total_provision),0) FROM SlaProvisionsArchive u WHERE u.month = ?1 and u.year = ?2 and u.status='Not Required'")
	double findAllNonRequiredByMonthAndYearSum(String previous_month, String previous_year);
	
	@Query("SELECT COALESCE(SUM(u.total_provision),0) FROM SlaProvisionsArchive u WHERE u.month = ?1 and u.year = ?2 and u.status='Invoice Submitted'")
	double findAllReverseProvisionByMonthAndYearSum(String previous_month, String previous_year);


}

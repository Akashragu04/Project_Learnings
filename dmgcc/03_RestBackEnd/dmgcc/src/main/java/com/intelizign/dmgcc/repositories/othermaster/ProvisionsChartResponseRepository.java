package com.intelizign.dmgcc.repositories.othermaster;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.intelizign.dmgcc.response.ProvisionsChartResponse;

public interface ProvisionsChartResponseRepository extends JpaRepository<ProvisionsChartResponse, Long> {

	List<ProvisionsChartResponse> findAllByMonthAndYearOrderById(String month, String year);
	
	ProvisionsChartResponse findAllByMonthAndYear(String month, String year);

	@Query("Select p FROM ProvisionsChartResponse p where p.numeric_month <= ?1 and p.year = ?2 ORDER BY id ")
	List<ProvisionsChartResponse> findAllMonthAndYearOrderById(int today_numericmonth, String year);

}

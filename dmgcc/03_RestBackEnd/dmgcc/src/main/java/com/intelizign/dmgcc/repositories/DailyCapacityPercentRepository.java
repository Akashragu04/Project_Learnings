package com.intelizign.dmgcc.repositories;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.intelizign.dmgcc.models.DailyCapacityPercent;

public interface DailyCapacityPercentRepository extends JpaRepository<DailyCapacityPercent, Long> {

	@Query("SELECT u FROM DailyCapacityPercent u WHERE u.employee.id=?1")
	List<DailyCapacityPercent> findByResource(Long id);

	@Query("select AVG(e.capacity) from DailyCapacityPercent e where Month(e.date)=Month(now()) and e.employee.id=?1")
	Double findByMonth(Long id);

	@Modifying
	@Transactional
	@Query("delete  from DailyCapacityPercent e where Month(e.date)=Month(now()) and e.employee.id=?1")
	void deleteByMonth(Long id);
}

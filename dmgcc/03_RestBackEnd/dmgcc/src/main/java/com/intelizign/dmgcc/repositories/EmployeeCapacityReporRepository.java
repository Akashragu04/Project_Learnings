package com.intelizign.dmgcc.repositories;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.intelizign.dmgcc.models.EmployeeCapacityReportModel;

public interface EmployeeCapacityReporRepository extends JpaRepository<EmployeeCapacityReportModel, Long> {

	List<EmployeeCapacityReportModel> findByUserinfoId(Long userid);

	@Query("SELECT AVG(u.capacity) FROM EmployeeCapacityReportModel u WHERE u.userinfo.id = ?1")
	Float findByAverageCapacity(Long userid);

	@Query("SELECT u FROM EmployeeCapacityReportModel u WHERE u.id = ?1")
	Optional<EmployeeCapacityReportModel> findById(Long id);

	@Modifying
	@Transactional
	@Query("delete  from EmployeeCapacityReportModel e where e.userinfo.id=?1 and e.month=?2")
	void deleteByMonth(Long id, String month);
}

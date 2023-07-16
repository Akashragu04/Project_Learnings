package com.intelizign.dmgcc.repositories;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.intelizign.dmgcc.models.ProjectModel;
import com.intelizign.dmgcc.models.TimesheetModel;

public interface TimesheetRepository extends JpaRepository<TimesheetModel, Long> {

	Page<TimesheetModel> findByActive(boolean status, Pageable pageable);

	@Query("SELECT u FROM TimesheetModel u WHERE u.project.id = ?1 and u.user.id =?3 and LOWER(CONCAT( u.project_name, u.slaid, u.timesheet_date, u.start_time, u.end_time, u.task_name)) LIKE %?2% "
			+ "or UPPER(CONCAT( u.project_name, u.slaid, u.timesheet_date, u.start_time, u.end_time, u.task_name)) LIKE %?2%")
	Page<TimesheetModel> findByProjectId(Long projectid, String Searchkeyword, Long user_id, Pageable pageable);

	List<TimesheetModel> findBySlaId(Long slaid);

	List<TimesheetModel> findByUserId(Long userid);

	@Query("SELECT u FROM TimesheetModel u WHERE u.active = ?1 and ( u.project.service_provider_shortid =?2 or u.project.service_receiver_shortid =?2)")
	Page<TimesheetModel> findbyTimesheetsBasedOnRole(boolean active, String shoritd, Pageable pageable);

	@Query("SELECT u FROM TimesheetModel u WHERE u.active = ?1 and u.short_id = ?2")
	Page<TimesheetModel> findbyTimesheetsByEmployee(boolean active, String shoritd, Pageable pageable);

	@Query("SELECT u FROM TimesheetModel u WHERE u.id = ?1")
	Optional<TimesheetModel> findById(Long id);

	@Query("SELECT SUM(u.working_hours) FROM TimesheetModel u WHERE u.sla.id=?3 AND u.timesheet_date between ?1 and ?2")
	Long getPreinvoiceQuantity(LocalDate startdate, LocalDate enddate, Long slaid);

	@Query("SELECT SUM(u.working_hours) FROM TimesheetModel u WHERE u.sla.id=?1")
	Long getTotalWorkingHours(long id);

	@Query("SELECT SUM(u.working_hours) FROM TimesheetModel u WHERE u.sla.id=?1 and u.user.id=?2")
	Long getWorkingHoursBySLAandUser(long slaid, long userid);

	@Query("SELECT u FROM TimesheetModel u WHERE u.project.id = ?1 and LOWER(CONCAT( u.project_name, u.slaid, u.timesheet_date, u.start_time, u.end_time, u.task_name)) LIKE %?2%  "
			+ " or UPPER(CONCAT( u.project_name, u.slaid, u.timesheet_date, u.start_time, u.end_time, u.task_name)) LIKE %?2% ")
	List<TimesheetModel> findByprojects(long id, String Searchkeyword, Pageable pageable);

	@Query("SELECT u FROM TimesheetModel u WHERE u.project.id = ?1  and LOWER(CONCAT( u.project_name, u.slaid, u.timesheet_date, u.start_time, u.end_time, u.task_name,u.name)) LIKE %?2%  "
			+ " or UPPER(CONCAT( u.project_name, u.slaid, u.timesheet_date, u.start_time, u.end_time, u.task_name,u.name)) LIKE %?2% ")
	Page<TimesheetModel> findByProjectId(long id, String searchkeyword, Pageable pageable);

	@Query("SELECT u FROM TimesheetModel u WHERE u.project.id = ?1  and u.captinityleave= ?2 ")
	List<TimesheetModel> getTimeSheets(long id, boolean captinityleave);

	@Query("SELECT SUM(u.working_hours) FROM TimesheetModel u WHERE u.project.id = ?1  and u.captinityleave= ?2 ")
	Double getBillingHoursForProject(long project_id, boolean captinityleave);

	@Query("SELECT SUM(u.working_hours) FROM TimesheetModel u WHERE u.project.id = ?1 and u.sla.id=?2 and u.captinityleave= ?3 ")
	Double getLEavesTakenForProjectAndSLA(long project_id, long sla_id, boolean captinityleave);

	@Query("SELECT SUM(u.working_hours) FROM TimesheetModel u WHERE u.active= true and u.workingtype='Working'")
	double findBilledHours();

	@Query("SELECT u FROM TimesheetModel u WHERE u.user.cost_center = ?1  ORDER BY u.id  ")
	List<TimesheetModel> findAllByCostCenter(String cost_center);

	@Query("SELECT u FROM TimesheetModel u WHERE u.short_id =?1 and active = true ORDER BY u.id  ")
	List<TimesheetModel> findByShort_id(String shortid);

	@Query("SELECT SUM(u.working_hours) FROM TimesheetModel u WHERE u.task.id = ?1 and u.active= true and u.workingtype='Working' ")
	Long getTotalWorkingHoursbyTaskId(long id);

	@Query("SELECT u FROM TimesheetModel u WHERE u.project.id = ?1 and active = true ORDER BY u.id  ")
	List<TimesheetModel> findByProjectId(String project_id);

	@Query("SELECT u FROM TimesheetModel u WHERE  u.user.id= ?1 and u.project.id = ?2 and active = true ORDER BY u.id  ")
	List<TimesheetModel> findByUserIdAndprojectId(Long userid, Long project_id);

	@Query("SELECT COALESCE(count( distinct u.timesheet_date),0) FROM TimesheetModel u WHERE  u.user.id= ?1 and u.project.id = ?2 and active = true  ")
	int findCountByUserIdAndprojectId(long userid, long project_id);

	@Query("SELECT SUM(u.working_hours) FROM TimesheetModel u WHERE u.project.id = ?1 and u.active= true and u.workingtype='Working'")
	Double findBilledHoursbyProject(Long id);

	@Query("SELECT SUM(m.working_hours) FROM TimesheetModel m WHERE m.sla.id = ?1")
	Double findbySLAID(long id);
	
	List<TimesheetModel> findAllByOrderById();
	
	@Query("SELECT u FROM TimesheetModel u WHERE u.project.id = ?1 and active = true ORDER BY u.id  ")
	List<TimesheetModel> findByProject(long project_id);
	
	@Query("SELECT u FROM TimesheetModel u WHERE u.project.id = ?1 and u.user.id = ?2 and active = true ORDER BY u.id  ")
	List<TimesheetModel> findByProjectAndUser(long project_id, long user_id);

}

package com.intelizign.dmgcc.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.intelizign.dmgcc.models.ProjectModel;
import com.intelizign.dmgcc.models.TaskModel;

public interface TaskRepository extends JpaRepository<TaskModel, Long> {

	@Query("SELECT  u FROM TaskModel u WHERE u.active = ?1 and LOWER(CONCAT( u.projectid.project_name, u.tasktarget, u.slaid.slaid,u.taskid,u.taskname,u.assigned_name,u.task_status)) LIKE %?2%"
			+ " or UPPER(CONCAT( u.projectid.project_name, u.tasktarget, u.slaid.slaid,u.taskid,u.taskname,u.assigned_name,u.task_status)) LIKE %?2%")
	Page<TaskModel> findByactive(boolean b, String search, Pageable pageable);

	@Query("SELECT u FROM TaskModel u WHERE u.active = ?1 and ( u.projectid.service_provider_shortid =?2 or u.projectid.service_receiver_shortid =?2) and LOWER(CONCAT( u.projectid.project_name, u.projectid.project_id, u.tasktarget, u.slaid.slaid,u.taskid,u.taskname,u.assigned_name,u.task_status)) LIKE %?3%"
			+ " or UPPER(CONCAT( u.projectid.project_name, u.projectid.project_id, u.tasktarget, u.slaid.slaid,u.taskid,u.taskname,u.assigned_name,u.task_status)) LIKE %?3%")
	Page<TaskModel> findbyTaskBasedOnRole(boolean active, String shoritd, String search, Pageable pageable);

	@Query("SELECT u FROM TaskModel u WHERE u.active = ?1 and u.assigne_shortId = ?2 and LOWER(CONCAT( u.projectid.project_name, u.projectid.project_id, u.tasktarget, u.slaid.slaid,u.taskid,u.taskname,u.assigned_name,u.task_status)) LIKE %?3%"
			+ " or UPPER(CONCAT( u.projectid.project_name, u.projectid.project_id, u.tasktarget, u.slaid.slaid,u.taskid,u.taskname,u.assigned_name,u.task_status)) LIKE %?3%")
	Page<TaskModel> findbyTaskByEmployee(boolean active, String shoritd, String search, Pageable pageable);

	@Query("SELECT u FROM TaskModel u WHERE u.active = ?1 and u.slaid.id = ?2 and u.assigne.id =?3")
	List<TaskModel> findByTaskBasedOnUser(boolean status, Long sla_id, Long userid);

	@Query("SELECT u.projectid FROM TaskModel u WHERE u.assigne.id = ?1 and LOWER(CONCAT( u.projectid.project_name, u.projectid.project_id, u.projectid.service_receiver, u.projectid.status)) LIKE %?2% or UPPER(CONCAT( u.projectid.project_name, u.projectid.project_id, u.projectid.service_receiver, u.projectid.status)) LIKE %?2% ORDER BY u.projectid.id")
	Page<ProjectModel> findProjectBasedOnEmployee(Long userid, String SearchKey, Pageable pageable);

	@Query("SELECT u FROM TaskModel u WHERE u.id = ?1")
	Optional<TaskModel> findById(Long id);

	@Query("select max(u.id) from TaskModel u ")
	Integer getdataCount();

	@Query("SELECT u FROM TaskModel u WHERE u.projectid.id= ?1  and  u.active= true   order by  u.id")
	List<TaskModel> getTasksByProjectid(long project_id);

	@Query("SELECT u FROM TaskModel u WHERE u.projectid.id= ?1  and  u.active= true   order by  u.id")
	List<TaskModel> getTasksByid(long project_id);
}

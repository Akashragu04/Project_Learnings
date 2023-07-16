package com.intelizign.dmgcc.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.intelizign.dmgcc.models.G3CEmployeeMasterModel;
import com.intelizign.dmgcc.models.ProjectModel;
import com.intelizign.dmgcc.models.ResourceAllocationModel;

public interface ResourceAllocationRepository extends JpaRepository<ResourceAllocationModel, Long> {

	List<ResourceAllocationModel> findBySlaId(Long slaid);

	ResourceAllocationModel findByIdAndUserId(Long resourceidLong, Long userid);

	ResourceAllocationModel findBySlaIdAndUserId(Long slaid, Long userid);

	@Query("SELECT u FROM ResourceAllocationModel u WHERE u.id = ?1")
	Optional<ResourceAllocationModel> findById(Long id);

	@Query("SELECT u.project FROM ResourceAllocationModel u WHERE u.user.id = ?1 and u.sla.capnitienable='true' and LOWER(CONCAT( u.project.project_name, u.project.project_id, u.project.service_receiver, u.project.status)) LIKE %?2% "
			+ " or UPPER(CONCAT( u.project.project_name, u.project.project_id, u.project.service_receiver, u.project.status)) LIKE %?2%")
	List<ProjectModel> findProjects(Long id, String SearchKey, Pageable pageable);

	@Query("SELECT u.user FROM ResourceAllocationModel u WHERE u.sla.id = ?1")
	List<G3CEmployeeMasterModel> getUserBySLA(long id);

	@Query("SELECT count(*) FROM ResourceAllocationModel u WHERE u.project.id = ?1")
	Integer getCapacityByProject(Long id);

	@Query("SELECT u FROM ResourceAllocationModel u WHERE u.userid = ?1")
	List<ResourceAllocationModel> findByUserId(Long id);

	@Query("SELECT u.capcity FROM ResourceAllocationModel u WHERE u.project.id = ?1 and u.userid = ?2")
	Integer findCapacityByProjectIdAndUserId(long l, long id);

	List<ResourceAllocationModel> findAllByOrderById();
}

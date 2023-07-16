package com.intelizign.dmgcc.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.intelizign.dmgcc.models.CostCenterModel;

public interface CostCenterRepository extends JpaRepository<CostCenterModel, Long> {

	Optional<CostCenterModel> findByCostcenter(String costcenter);

	@Query("SELECT u FROM CostCenterModel u WHERE u.id = ?1")
	Optional<CostCenterModel> findById(Long id);

	@Query("SELECT u FROM CostCenterModel u WHERE u.team = ?1")
	Optional<CostCenterModel> findByTeamDep(String team);

	@Query("SELECT DISTINCT(u.team) FROM CostCenterModel u ")
	List<String> getAllDepartment();

	@Query("SELECT MAX(u.id) FROM CostCenterModel u ")
	Long getMaxCount();

	@Query("SELECT u FROM CostCenterModel u WHERE LOWER(CONCAT( u.costcenter, u.team_group,u.team)) LIKE %?1% or UPPER(CONCAT( u.costcenter, u.team_group,u.team)) LIKE %?1%")
	Page<CostCenterModel> findAll(String searchKeyword, Pageable pageable);

	List<CostCenterModel> findAllByOrderById();

	@Query(value = "SELECT c.* FROM cost_center_master c left JOIN biz_case_request  b ON c.cost_center = b.cost_center where  c.cost_center = b.cost_center ORDER BY c.id", nativeQuery = true)
	List<CostCenterModel> findAllBizcaseCostCenters();

	@Query("SELECT DISTINCT(u) FROM CostCenterModel u  where u.is_active= ?1")
	List<CostCenterModel> findAllByActive(boolean is_active);

	@Query("SELECT DISTINCT(u) FROM CostCenterModel u  where u.costcenter= ?1 and (u.is_active = ?2 or u.is_active is null)")
	Optional<CostCenterModel> findByCostcenterByActive(String costcenter, boolean is_active);

}

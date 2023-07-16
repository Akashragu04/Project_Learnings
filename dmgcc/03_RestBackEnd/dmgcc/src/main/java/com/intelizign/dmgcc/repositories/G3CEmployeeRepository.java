package com.intelizign.dmgcc.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.intelizign.dmgcc.models.G3CEmployeeMasterModel;
import com.intelizign.dmgcc.response.ReportResponse;

public interface G3CEmployeeRepository extends JpaRepository<G3CEmployeeMasterModel, Long> {

	Optional<G3CEmployeeMasterModel> findByUsername(String username);

	@Query("SELECT u FROM G3CEmployeeMasterModel u WHERE u.email=?1")
	Optional<G3CEmployeeMasterModel> findUserByEmail(String username);

	List<G3CEmployeeMasterModel> findByShortid(String shortid);

	G3CEmployeeMasterModel findByshortid(String shortid);

	@Query("SELECT u FROM G3CEmployeeMasterModel u WHERE u.shortid=?1")
	Optional<G3CEmployeeMasterModel> findByShortiD(String shortid);

	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);

	@Query("SELECT count(u) > 0 FROM G3CEmployeeMasterModel u WHERE u.email=?1 or u.shortid=?2")
	Boolean existsByEmailOrShortid(String email, String shortid);

	G3CEmployeeMasterModel findByEmail(String email);

	G3CEmployeeMasterModel findByresettoken(String resettoken);

	List<G3CEmployeeMasterModel> findByRolename(String role);

	@Query("SELECT u FROM G3CEmployeeMasterModel u WHERE  u.capacity < 100 and  u.capacity !=100 ORDER BY u.id ASC")
	List<G3CEmployeeMasterModel> findByAvailableResource();

	@Query("SELECT u FROM G3CEmployeeMasterModel u WHERE u.cost_center=?1 and u.capacity < 100 ORDER BY u.id ASC")
	List<G3CEmployeeMasterModel> findByAvailableResource(String costcenter);

	@Query("SELECT u FROM G3CEmployeeMasterModel u WHERE u.capacity > 0 ORDER BY u.id ASC")
	List<G3CEmployeeMasterModel> findByMappedUser();

	@Query("SELECT u FROM G3CEmployeeMasterModel u WHERE u.cost_center=?1 AND u.capacity > 0 ORDER BY u.id ASC")
	List<G3CEmployeeMasterModel> findByMappedUser(String cost_center);

	boolean existsByPassword(String oldpassword);

	@Query("SELECT u FROM G3CEmployeeMasterModel u WHERE u.id = ?1")
	Optional<G3CEmployeeMasterModel> findById(Long id);

	@Query("SELECT u FROM G3CEmployeeMasterModel u WHERE u.cost_center=?1  ORDER BY u.id ASC")
	List<G3CEmployeeMasterModel> findOnlyByCostcenter(String cost_center);

	@Query("SELECT u FROM G3CEmployeeMasterModel u WHERE u.cost_center=?1 and u.capacity < 100 and  u.capacity !=100 ORDER BY u.id ASC")
	List<G3CEmployeeMasterModel> findByCostcenter(String cost_center);

	@Query("SELECT u FROM G3CEmployeeMasterModel u WHERE u.cost_center=?1 and  u.rolename = 'BUSINESS' ORDER BY u.id ASC")
	List<G3CEmployeeMasterModel> findByCostcenterAndManager(String cost_center);

	@Query("SELECT u FROM G3CEmployeeMasterModel u WHERE u.cost_center=?1 and u.id=?2 ")
	List<G3CEmployeeMasterModel> findByCostcenterAndId(String cost_center, Long userid);

	@Query("SELECT AVG(u.capacity) FROM G3CEmployeeMasterModel u WHERE u.cost_center=?1")
	Double findUtlizationByCostcenter(String cost_center);

	@Query("SELECT u FROM G3CEmployeeMasterModel u WHERE u.supv_id=?1")
	G3CEmployeeMasterModel findEmployeeBySupvID(String supv_id);

	List<G3CEmployeeMasterModel> findAllByRolenameIsNull();

	@Query("SELECT u FROM G3CEmployeeMasterModel u WHERE LOWER(CONCAT( u.id, u.rolename, u.shortid, u.email, u.department)) LIKE %?1% or UPPER(CONCAT( u.id, u.rolename, u.shortid, u.email, u.department)) LIKE %?1% AND u.rolename is not null ")
	Page<G3CEmployeeMasterModel> findAllByRolenameNotNull(String Searchkeyword, Pageable pageable);

	@Query("SELECT u FROM G3CEmployeeMasterModel u WHERE LOWER(CONCAT( u.id, u.rolename, u.shortid, u.email, u.department)) LIKE %?1% or UPPER(CONCAT( u.id, u.rolename, u.shortid, u.email, u.department)) LIKE %?1% AND u.rolename = 'BUSINESS'")
	Page<G3CEmployeeMasterModel> findBusinessManager(String Searchkeyword, Pageable pageable);

	@Query("SELECT u FROM G3CEmployeeMasterModel u WHERE u.employee_type=?1 and LOWER(CONCAT(u.date_of_join, u.emp_name, u.shortid, u.email)) LIKE %?2% or UPPER(CONCAT(u.date_of_join, u.emp_name, u.shortid, u.email)) LIKE %?2%")
	Page<G3CEmployeeMasterModel> findByEmployeetype(String employeetype, String serachkeyword, Pageable pageable);

	@Query("SELECT u FROM G3CEmployeeMasterModel u WHERE u.employee_type='Third Party Resource'")
	List<G3CEmployeeMasterModel> findByExternalEmployee();

	@Query("SELECT u FROM G3CEmployeeMasterModel u WHERE u.employee_type=?1 and u.cost_center=?2 and u.status=?3 and LOWER(CONCAT(u.date_of_join, u.emp_name, u.shortid, u.email))  LIKE %?4% or UPPER(CONCAT(u.date_of_join, u.emp_name, u.shortid, u.email))  LIKE %?4%")
	Page<G3CEmployeeMasterModel> findByEmployeetype(String employeetype, String costcenter, Boolean stauts,
			String serachkeyword, Pageable pageable);

	@Query("SELECT u.id as id ,u.emp_name as emp_name,u.hrid as hrid, u.email as email,u.category as category,u.date_of_join as date_of_join, u.employee_type as employee_type FROM G3CEmployeeMasterModel u"
			+ " WHERE LOWER(CONCAT( COALESCE(u.date_of_join,''),COALESCE(u.emp_name,'') , COALESCE(u.shortid,''), COALESCE(u.email,''), COALESCE(u.category,''))) LIKE %?1% or UPPER(CONCAT( COALESCE(u.date_of_join,''),COALESCE(u.emp_name,'') , COALESCE(u.shortid,''), COALESCE(u.email,''), COALESCE(u.category,''))) LIKE %?1% ORDER BY u.id ASC ")
	Page<ReportResponse> findAllForReport(String Search_key, Pageable pageable);

	@Query("SELECT u.id as id ,u.emp_name as emp_name,u.hrid as hrid, u.email as email,u.category as category,u.date_of_join as date_of_join, u.employee_type as employee_type FROM G3CEmployeeMasterModel u "
			+ " WHERE u.cost_center=?1 AND LOWER(CONCAT( COALESCE(u.date_of_join,''),COALESCE(u.emp_name,'') , COALESCE(u.shortid,''), COALESCE(u.email,''), COALESCE(u.category,''))) LIKE %?2% or UPPER(CONCAT( COALESCE(u.date_of_join,''),COALESCE(u.emp_name,'') , COALESCE(u.shortid,''), COALESCE(u.email,''), COALESCE(u.category,''))) LIKE %?2% ORDER BY u.id ASC")
	Page<ReportResponse> findReportByCostcenter(String cost_center, String Search_key, Pageable pageable);

	@Query("SELECT u.id as id ,u.emp_name as emp_name,u.hrid as hrid, u.email as email,u.category as category,u.date_of_join as date_of_join, u.employee_type as employee_type FROM G3CEmployeeMasterModel u "
			+ " WHERE u.id=?1 AND LOWER(CONCAT( COALESCE(u.date_of_join,''),COALESCE(u.emp_name,'') , COALESCE(u.shortid,''), COALESCE(u.email,''), COALESCE(u.category,''))) LIKE %?2% or UPPER(CONCAT( COALESCE(u.date_of_join,''),COALESCE(u.emp_name,'') , COALESCE(u.shortid,''), COALESCE(u.email,''), COALESCE(u.category,''))) LIKE %?2% ORDER BY u.id ASC")
	Page<ReportResponse> findReportById(Long id, String Search_key, Pageable pageable);

	@Query("SELECT u FROM G3CEmployeeMasterModel u WHERE u.id != ?1 and u.rolename = 'BUSINESS' and u.cost_center= ?2")
	List<G3CEmployeeMasterModel> findAllBusinessManagers(Long userid, String costcenter);

	List<G3CEmployeeMasterModel> findAllByOrderById();

	@Query("SELECT u FROM G3CEmployeeMasterModel u WHERE   u.rolename = 'CUSTOMER' ORDER BY u.id ASC")
	List<G3CEmployeeMasterModel> findAllCustomer();

	@Query("SELECT u FROM G3CEmployeeMasterModel u WHERE   u.rolename = 'BUSINESS' ORDER BY u.id ASC")
	List<G3CEmployeeMasterModel> findAllBusiness();

	@Query("SELECT AVG(u.capacity) FROM G3CEmployeeMasterModel u WHERE u.status = true")
	double findEmpokyeeAvergae();

	@Query("SELECT u FROM G3CEmployeeMasterModel u WHERE u.bench_resource=true ORDER BY u.id")
	List<G3CEmployeeMasterModel> findBeachResource();

	@Query("SELECT u FROM G3CEmployeeMasterModel u WHERE u.status=false ORDER BY u.id ")
	List<G3CEmployeeMasterModel> findAttrition();

	List<G3CEmployeeMasterModel> findAllByStatusOrderById(boolean b);

	@Query("SELECT COALESCE(AVG(u.capacity),0) FROM G3CEmployeeMasterModel u WHERE u.status = true and u.cost_center= ?1")
	double findEmpokyeeAverageCostCenter(String costcenter);

	@Query("SELECT DISTINCT u.cost_center FROM G3CEmployeeMasterModel u  ")
	List<String> findDistinctByCost_center();

	List<G3CEmployeeMasterModel> findAllByStatus(boolean b);

	@Query("SELECT u FROM G3CEmployeeMasterModel u WHERE u.rolename = 'CUSTOMER' and CONCAT( u.shortid) LIKE %?1% ORDER BY u.id ASC")
	List<G3CEmployeeMasterModel> findAllCustomerShortid(String shortid);

}

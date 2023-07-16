package com.intelizign.dmgcc.repositories.othermaster;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.intelizign.dmgcc.models.othermaster.CCDumpModel;

public interface CCDumpRepository extends JpaRepository<CCDumpModel, Long> {

	@Query("Select u from CCDumpModel u where CONCAT( u.id, u.costcenter) LIKE %?1% ")
	Page<CCDumpModel> findbySearchandSort(String searchkeyword, Pageable pageable);

	List<CCDumpModel> findAllByOrderById();

	@Query("SELECT COALESCE(SUM(u.value_obj_crcy),0) FROM CCDumpModel u")
	Double findTotalAmount();

	@Query("select COALESCE(SUM(p.value_obj_crcy),0) from CCDumpModel p where year(p.posting_date) = ?1 and month(p.posting_date) = ?2")
	double findCurrentMonthExpense(int year, int month);

	@Query("SELECT COALESCE(SUM(u.value_obj_crcy),0) FROM CCDumpModel u where costcenter = ?1")
	double findTotalAmountCostCenter(String costcenter);

	@Query("select COALESCE(SUM(p.value_obj_crcy),0) from CCDumpModel p where year(p.posting_date) = ?1 and month(p.posting_date) = ?2 and p.costcenter = ?3")
	double findCurrentMonthExpenseCostCenter(int year, int month, String costcenter);

	@Query(value = "select  g.gl_grouping as description,COALESCE(SUM(i.value_obj_crcy),0)  as monthwise_expense  from cc_dump_model i join\r\n"
			+ "	  gl_grouping g on i.cost_element_name = g.gl_description group by\r\n"
			+ "	  g.gl_grouping", nativeQuery = true)
	List<String>  findByDescriptionAndExpense();
	
	@Query("SELECT COALESCE(SUM(u.value_obj_crcy),0) FROM CCDumpModel u where costcenter = ?1 and year(u.posting_date) = ?2")
	double findTotalAmountCostCenterForProject(String costcenter, int year);
}

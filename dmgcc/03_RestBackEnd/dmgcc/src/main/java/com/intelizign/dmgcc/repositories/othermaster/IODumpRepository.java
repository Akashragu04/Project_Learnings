package com.intelizign.dmgcc.repositories.othermaster;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.intelizign.dmgcc.models.othermaster.IODumpModel;

@Repository
public interface IODumpRepository extends JpaRepository<IODumpModel, Long> {

	@Query("SELECT u FROM IODumpModel u WHERE CONCAT(  u.id, u.fiscalyear) LIKE %?1%")
	Page<IODumpModel> findAll(String searchKeyword, Pageable pageable);

	@Query("SELECT u FROM IODumpModel u WHERE u.orders = ?1 and u.fiscalyear =?2")
	List<IODumpModel> findOrderIdAndYear(String order_id, String year);

	@Query("Select u from IODumpModel u WHERE LOWER(CONCAT( u.id, u.costelement)) LIKE %?1% or UPPER(CONCAT( u.id, u.costelement)) LIKE %?1%")
	Page<IODumpModel> findbySearchandSort(String searchkeyword, Pageable pageable);

	List<IODumpModel> findAllByOrderById();

	@Query("SELECT COALESCE(SUM(u.valuein_objectcurrency),0) FROM IODumpModel u WHERE u.orders in ?1")
	Double findTotalAmount(List<String> iONumber);

	@Query("select COALESCE(SUM(p.valuein_objectcurrency),0) from IODumpModel p where year(p.posting_date) = ?1 and month(p.posting_date) = ?2")
	double findCurrentMonthExpense(int year, int month);

	@Query("SELECT COALESCE(SUM(u.valuein_objectcurrency),0) FROM IODumpModel u WHERE u.orders in ?1")
	double findTotalAmountCostCenter(List<String> iONumber, String costcenter);

	@Query("select COALESCE(SUM(p.valuein_objectcurrency),0) from IODumpModel p where year(p.posting_date) = ?1 and month(p.posting_date) = ?2 and p.cost_center = ?3")
	double findCurrentMonthExpenseCostCenter(int year, int month, String costcenter);

	@Query("SELECT COALESCE(SUM(u.valuein_objectcurrency),0) FROM IODumpModel u WHERE u.orders = ?1")
	Double findTotalAmountByIoNumber(String iONumber);

	@Query("select COALESCE(SUM(p.valuein_objectcurrency),0) from IODumpModel p where year(p.posting_date) = ?1 and month(p.posting_date) = ?2")
	double findObjCurrentMonthExpense(int year, int month);

	@Query(value = "select  g.gl_grouping as description,COALESCE(SUM(i.valuein_objectcurrency),0)  as monthwise_expense  from io_dump_data i join\r\n"
			+ "	  gl_grouping g on i.cost_element_name = g.gl_description group by\r\n"
			+ "	  g.gl_grouping", nativeQuery = true)
	List<String> findByDescriptionAndExpense();
	
	@Query("SELECT COALESCE(SUM(u.valuein_objectcurrency),0) FROM IODumpModel u WHERE u.orders = ?1")
	Double findTotalAmountForProject(String iONumber);

}
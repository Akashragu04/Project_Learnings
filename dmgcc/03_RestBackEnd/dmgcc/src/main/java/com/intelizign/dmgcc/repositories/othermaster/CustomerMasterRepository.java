package com.intelizign.dmgcc.repositories.othermaster;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.intelizign.dmgcc.models.othermaster.CustomerMasterModel;
import com.intelizign.dmgcc.response.CustomerMasterResponse;

public interface CustomerMasterRepository extends JpaRepository<CustomerMasterModel, Long> {

	@Query("Select Distinct p.customername as customerName,p.address as address,p.country as country,p.genesiscode as genesiscode FROM CustomerMasterModel p  ")
	List<CustomerMasterResponse> getCustomerMaster();

	@Query("SELECT u FROM CustomerMasterModel u WHERE LOWER(CONCAT( u.customerid,u.customername, u.state,u.telephone,u.address)) LIKE %?1% or UPPER(CONCAT( u.customerid,u.customername, u.state,u.telephone,u.address)) LIKE %?1%")
	Page<CustomerMasterModel> findAll(String searchkeyword, Pageable pageable);

	@Query("SELECT u FROM CustomerMasterModel u WHERE LOWER(CONCAT( u.customerid,u.customername, u.state,u.telephone,u.address)) LIKE %?1% or LOWER(CONCAT( u.customerid,u.customername, u.state,u.telephone,u.address)) LIKE %?1%ORDER BY ?2 ")
	Page<CustomerMasterModel> findbySearchandSort(String search, String sortcolumn, Pageable pageable);

	List<CustomerMasterModel> findAllByOrderById();

}
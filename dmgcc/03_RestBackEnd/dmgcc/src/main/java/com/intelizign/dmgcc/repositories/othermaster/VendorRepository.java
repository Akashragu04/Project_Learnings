package com.intelizign.dmgcc.repositories.othermaster;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.intelizign.dmgcc.models.othermaster.VendorModel;

public interface VendorRepository extends JpaRepository<VendorModel, Long> {

	@Query("SELECT u FROM VendorModel u WHERE LOWER(CONCAT( u.id,u.vendorid,u.name)) LIKE %?1%  or UPPER(CONCAT( u.id,u.vendorid,u.name)) LIKE %?1%")
	Page<VendorModel> findAll(String searchkeyword, Pageable pageable);

	List<VendorModel> findAllByOrderById();

}

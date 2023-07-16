package com.intelizign.dmgcc.repositories.landingpage;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.intelizign.dmgcc.models.landingpage.ContactsModel;

public interface ContactsRepository extends JpaRepository<ContactsModel,Long>{

	@Query("SELECT  u FROM ContactsModel u WHERE u.active = ?1")
	List<ContactsModel> findByactive(boolean b);
}

package com.learning.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.learning.model.Email;

@Repository
public interface EmailRepository extends JpaRepository<Email, Long> {

	@Query("Select emails from Email emails where emails.user.id=?1")
	List<Email> findByUser(long id);

	@Query("Select emails from Email emails where emails.user.username=?1")
	List<Email> findByUsername(String name);

	@Transactional
	@Modifying
	@Query("delete from Email emails where emails.id=?1")
	void deleteEmailByUser(long id);

}

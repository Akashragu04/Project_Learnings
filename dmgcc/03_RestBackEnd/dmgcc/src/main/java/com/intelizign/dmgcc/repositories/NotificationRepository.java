package com.intelizign.dmgcc.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.intelizign.dmgcc.models.NotificationModel;

public interface NotificationRepository extends JpaRepository<NotificationModel, Long> {

	@Query("SELECT u FROM NotificationModel u WHERE u.shortid = ?1 and u.active= ?2 ORDER BY create_date DESC")
	List<NotificationModel> findByShortidAndActive(String shortid, Boolean active);

	@Query("SELECT u FROM NotificationModel u WHERE u.id = ?1")
	Optional<NotificationModel> findById(Long id);
}

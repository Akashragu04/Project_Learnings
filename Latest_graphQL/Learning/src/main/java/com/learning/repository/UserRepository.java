package com.learning.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learning.model.UserData;

public interface UserRepository extends JpaRepository<UserData, Long> {

	Optional<UserData> findByUsername(String user);

}

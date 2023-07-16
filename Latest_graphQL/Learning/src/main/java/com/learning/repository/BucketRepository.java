package com.learning.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learning.model.BucketToken;

public interface BucketRepository extends JpaRepository<BucketToken, Long> {

	Optional<BucketToken> findByUsername(String user);

}

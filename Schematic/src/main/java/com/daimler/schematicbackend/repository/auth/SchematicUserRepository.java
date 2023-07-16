/*
 *
 */
package com.daimler.schematicbackend.repository.auth;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.daimler.schematicbackend.entity.user.UserData;

/**
 * The Interface SchematicUserRepository.
 */
@Repository
public interface SchematicUserRepository extends JpaRepository<UserData, Long> {

	/**
	 *
	 */
	@Query(value = "select username from schematic_user where access_type ='ROLE_USER' and active = true", nativeQuery = true)
	List<String> getAllByActiveUsers();

	Optional<UserData> findByUsernameContainingIgnoreCase(String username);

}

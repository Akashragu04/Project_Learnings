/*
 *
 */
package com.daimler.schematicbackend.repository.auth;

import com.daimler.schematicbackend.entity.user.SecurityQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * The Interface SchematicSecurityQuestionRepository.
 */
@Repository
public interface SchematicSecurityQuestionRepository extends JpaRepository<SecurityQuestion, Long> {
}

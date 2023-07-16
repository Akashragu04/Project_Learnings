/*
 *
 */
package com.daimler.schematicbackend.service.auth;

import com.daimler.schematicbackend.entity.user.SecurityQuestion;
import com.daimler.schematicbackend.repository.auth.SchematicSecurityQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * The Class SchematicQuestionService.
 */
@Service
public class SchematicQuestionService {

    /**
     * The Question repository.
     */
    @Autowired
    SchematicSecurityQuestionRepository questionRepository;

    /**
     * Gets the all security question.
     *
     * @return the all security question
     */
    public List<String> getAllSecurityQuestion() {
        return questionRepository.findAll()
                .stream().map(SecurityQuestion::getSchematicSecurityQuestion)
                .collect(Collectors.toList());
    }

}

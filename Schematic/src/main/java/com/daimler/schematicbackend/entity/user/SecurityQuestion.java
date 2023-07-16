/*
 *
 */
package com.daimler.schematicbackend.entity.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * The Class SecurityQuestion.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "schematic_security_question")
public class SecurityQuestion {

    /**
     * The security question id.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long securityQuestionId;

    /**
     * The security question.
     */
    private String schematicSecurityQuestion;

}

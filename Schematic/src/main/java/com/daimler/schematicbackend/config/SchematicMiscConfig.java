/*
 *
 */
package com.daimler.schematicbackend.config;

import com.speedment.jpastreamer.application.JPAStreamer;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManagerFactory;

/**
 * The Class SchematicMiscConfig.
 */
@Configuration
@Data
@AllArgsConstructor
public class SchematicMiscConfig {

    private final EntityManagerFactory entityManagerFactory;

    /**
     * Gets the model mapper.
     *
     * @return the model mapper
     */
    @Bean
    public ModelMapper getModelMapper() {
        return new ModelMapper();
    }

    /**
     * Jpa streamer jpa streamer.
     *
     * @return the jpa streamer
     */
    @Bean
    public JPAStreamer jpaStreamer() {
        return JPAStreamer.of(entityManagerFactory);
    }

}

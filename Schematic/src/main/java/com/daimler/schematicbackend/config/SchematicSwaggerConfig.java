/*
 *
 */
package com.daimler.schematicbackend.config;

import com.google.common.base.Predicate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import static com.google.common.base.Predicates.or;
import static springfox.documentation.builders.PathSelectors.regex;

/**
 * The Class SchematicSwaggerConfig.
 */
@Configuration
@EnableSwagger2
public class SchematicSwaggerConfig {

    /**
     * Schematic api.
     *
     * @return the docket
     */
    @Bean
    public Docket schematicApi() {
        return new Docket(DocumentationType.SWAGGER_2).groupName("schematic-backend-api").apiInfo(apiInfo()).select()
                .paths(swaggerEnabledPaths()).build();
    }

    /**
     * Swagger enabled paths.
     *
     * @return the predicate
     */
    private Predicate<String> swaggerEnabledPaths() {
        return or(regex("/v1/auth.*"), regex("/v1/multiFile.*"), regex("/v1/statusLog.*"), regex("/v1/validate.*"),
                regex("/v1/commodityAssigned.*"), regex("/v1/user.*"), regex("/v1/a06Database.*"),
                regex("/v1/commodityDatabase"), regex("/v1/singleFile.*"), regex("/v1/render.*"));
    }

    /**
     * Api info.
     *
     * @return the api info
     */
    private ApiInfo apiInfo() {
        return new ApiInfoBuilder().title("Schematic Backend Application")
                .description("Java API for the Schematic Backend application")
                .termsOfServiceUrl("https://www.mercedes-benz.com/en/").version("1.0").build();
    }

}

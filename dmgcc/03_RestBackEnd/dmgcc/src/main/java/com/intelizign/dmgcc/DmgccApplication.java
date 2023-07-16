package com.intelizign.dmgcc;

import org.springdoc.core.GroupedOpenApi;
import org.springdoc.core.customizers.OpenApiCustomiser;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.data.envers.repository.support.EnversRevisionRepositoryFactoryBean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.models.parameters.HeaderParameter;

@EnableJpaRepositories(repositoryFactoryBeanClass = EnversRevisionRepositoryFactoryBean.class)
@SpringBootApplication
@EnableScheduling
@EnableCaching
@OpenAPIDefinition(info = @Info(title = "G3C Aplication API", version = "2.0", description = "G3C Aplication REST API"))
public class DmgccApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(DmgccApplication.class, args);
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(DmgccApplication.class);
	}

	@Bean
	public GroupedOpenApi publicGroup() {
		return GroupedOpenApi.builder().packagesToScan("com.intelizign.dmgcc").pathsToMatch("/**").setGroup("public")
				.addOpenApiCustomiser(globalHeaderCustomizer()) // --> you need this!
				.build();
	}

	private OpenApiCustomiser globalHeaderCustomizer() {
		return openApi -> openApi.getPaths().values().stream().flatMap(pathItem -> pathItem.readOperations().stream())
				.forEach(operation -> operation.addParametersItem(
						new HeaderParameter().$ref("#/components/parameters/myHeader1").name("Authorization")));
	}

}

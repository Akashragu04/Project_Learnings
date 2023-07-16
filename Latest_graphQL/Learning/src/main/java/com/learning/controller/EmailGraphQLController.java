package com.learning.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learning.model.Email;
import com.learning.model.UserData;
import com.learning.repository.BucketRepository;
import com.learning.repository.EmailRepository;
import com.learning.repository.UserRepository;
import com.learning.response.ResponseHandler;
import com.learning.service.EmailService;

import graphql.ExecutionResult;
import graphql.GraphQL;
import graphql.schema.DataFetcher;
import graphql.schema.GraphQLSchema;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.SchemaGenerator;
import graphql.schema.idl.SchemaParser;
import graphql.schema.idl.TypeDefinitionRegistry;
import io.github.bucket4j.Bucket;

@RestController
@RequestMapping("/email/graphql/")
public class EmailGraphQLController {

	@Autowired
	EmailService emailService;

	Bucket buckets;

	@Autowired
	EmailRepository emailRepo;

	@Autowired
	UserRepository userRepo;

	@Autowired
	BucketRepository bucketRepository;

	@Value("classpath:email.graphqls")
	private Resource schemaResource;

	private GraphQL graphQL;

	@PostConstruct
	public void loadSchema() throws IOException {
		File schemaFile = schemaResource.getFile();
		TypeDefinitionRegistry registry = new SchemaParser().parse(schemaFile);
		RuntimeWiring wiring = buildWiring();
		GraphQLSchema schema = new SchemaGenerator().makeExecutableSchema(registry, wiring);
		graphQL = GraphQL.newGraphQL(schema).build();
	}

	private RuntimeWiring buildWiring() {
		DataFetcher<List<Email>> fetcher1 = data -> {
			return (List<Email>) emailRepo.findByUsername(data.getArgument("user"));
		};

		return RuntimeWiring.newRuntimeWiring()
				.type("Query", typeWriting -> typeWriting.dataFetcher("getAllEmail", fetcher1)).build();

	}

	@PostMapping("/getAllByuser")
	public ResponseEntity<Object> getAll(@RequestBody String query, @RequestHeader String user) {

		try {

			// checking whether the user is present or not
			Optional<UserData> userData = userRepo.findByUsername(user);

			if (userData.isPresent()) {

				ExecutionResult result = graphQL.execute(query);
				return ResponseHandler.generateResponse("Get All Emails", HttpStatus.OK, result);
			} else {
				return ResponseHandler.generateResponse("User Not Found", HttpStatus.OK, null);
			}

		} catch (Exception e) {
			return ResponseHandler.generateResponse("Internal server Error", HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}

}

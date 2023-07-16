/*
 *
 */
package com.daimler.schematicbackend.config;

import com.daimler.schematicbackend.filter.auth.SchematicAuthFilter;
import com.daimler.schematicbackend.service.auth.SchematicUserDetailsService;
import com.daimler.schematicbackend.utils.auth.SchematicJwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.cors.CorsConfiguration;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * The Class SchematicSecurityConfig.
 */
@Configuration
public class SchematicSecurityConfig extends WebSecurityConfigurerAdapter {

    /**
     * The Role admin.
     */
    static final String ROLE_ADMIN = "ADMIN";
    /**
     * The Role user.
     */
    static final String ROLE_USER = "USER";
    /**
     * The auth utils.
     */
    @Autowired
    SchematicJwtUtils authUtils;
    /**
     * The auth user service.
     */
    @Autowired
    SchematicUserDetailsService authUserService;
    /**
     * The auth filter.
     */
    @Autowired
    SchematicAuthFilter authFilter;
    /**
     * The origins.
     */
    @Value("${schematics.origins}")
    List<String> origins = new ArrayList<>();

    /**
     * Configure.
     *
     * @param auth the auth
     * @throws Exception the exception
     */
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(authUserService).passwordEncoder(new BCryptPasswordEncoder());
    }

    /**
     * Configure.
     *
     * @param web
     *            the web
     * @throws Exception
     *             the exception
     */
    // swaggerExclusions
    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/v2/api-docs", "/configuration/ui", "/swagger-resources/**",
                "/configuration/security", "/swagger-ui.html", "/webjars/**", "/v1/endpoints/**");
    }

    /**
     * Configure.
     *
     * @param http
     *            the http
     * @throws Exception
     *             the exception
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().configurationSource(request -> {
            CorsConfiguration config = new CorsConfiguration();
            config.setAllowedOrigins(origins);
            config.setAllowedMethods(Collections.singletonList("*"));
            config.setAllowCredentials(true);
            config.setAllowedHeaders(Collections.singletonList("*"));
            config.setMaxAge(3600L);
            return config;
        }).and().csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()).and().authorizeRequests()
                .antMatchers("/v1/auth/**").permitAll().antMatchers("/v1/multiFile/**")
                .hasAnyRole(ROLE_ADMIN, ROLE_USER).antMatchers("/v1/singleFile/**").hasAnyRole(ROLE_ADMIN, ROLE_USER)
                .antMatchers("/v1/validate/**").hasAnyRole(ROLE_ADMIN, ROLE_USER)
                .antMatchers("/v1/commodityDatabase/**").hasAnyRole(ROLE_ADMIN, ROLE_USER)
                .antMatchers("/v1/a06Database/**").hasAnyRole(ROLE_ADMIN, ROLE_USER)
                .antMatchers("/v1/user/changePassword").hasAnyRole(ROLE_ADMIN, ROLE_USER).antMatchers("/v1/user/**")
                .hasRole(ROLE_ADMIN).antMatchers("/v1/statusLog/**").hasRole(ROLE_ADMIN).antMatchers("/v1/render/**")
                .hasAnyRole(ROLE_ADMIN, ROLE_USER).antMatchers("/v1/commodityAssigned/**").hasRole(ROLE_ADMIN).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class);
    }

    /**
     * Password encoder.
     *
     * @return the password encoder
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Authentication manager bean.
     *
     * @return the authentication manager
     * @throws Exception
     *             the exception
     */
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

}

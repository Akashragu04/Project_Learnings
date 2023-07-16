package com.intelizign.dmgcc.authendication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.intelizign.dmgcc.services.UserDetailsServiceImpl;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	UserDetailsServiceImpl userDetailsService;

	@Autowired
	private AuthEntryPointJwt unauthorizedHandler;

	@Bean
	public AuthTokenFilter authenticationJwtTokenFilter() {
		return new AuthTokenFilter();
	}

	@Override
	public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
		authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
	}

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable().exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().authorizeRequests()
				.antMatchers("/api/swagger-ui.html/**", "/api/swagger-ui/**", "/api/v3/api-docs/**", "/api/auth/**",
						"/api/G3C_Notification/**", "/api/public/**", "/api/uploads/**", "/api/report/**",
						"/api/landingpage/**", "/api/broucher/getall", "/api/broucher/viewfile/**","/api/broucher/attachments/**",
						"/api/broucher/get/**", "/api/newsletter/getall", "/api/newsletter/viewfile/**","/api/newsletter/attachments/",
						"/api/newsletter/get/**", "/api/content/getall", "/api/content/viewfile/**",
						"/api/content/get/**", "/api/rpa/**", "/api/employees/hrwtupload",
						"/api/accurals/accuralsexport", "/api/iomapping/download", "/api/materialcode/download",
						"/api/mysccCostcenter/download", "/api/ccdump/download", "/api/iodump/download",
						"/api/customer/download", "/api/forexRates/download", "/api/glgrouping/glgroupingreport",
						"/api/provisions/provisionarchivereport", "/api/provisions/provisionreport",
						"/api/vendor/download", "/api/bizpreview/**")
				.permitAll().antMatchers("/api/test/**").permitAll().anyRequest().authenticated();

		http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
	}

}

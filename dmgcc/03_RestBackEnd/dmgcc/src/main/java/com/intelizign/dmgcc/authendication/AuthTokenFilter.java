package com.intelizign.dmgcc.authendication;

import java.io.IOException;
import java.util.Arrays;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.intelizign.dmgcc.services.UserDetailsServiceImpl;
import com.intelizign.dmgcc.utils.JwtUtils;

public class AuthTokenFilter extends OncePerRequestFilter {

	@Autowired
	private JwtUtils jwtUtils;

	@Autowired
	private UserDetailsServiceImpl userDetailsService;

	private String token = null;

	@Autowired
	private Environment env;

	private static final Logger LOGGER = LoggerFactory.getLogger(AuthTokenFilter.class);

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		try {
			token = Arrays.stream(request.getCookies()).filter(c -> c.getName().equals("token")).findFirst()
					.map(Cookie::getValue).orElse(null);
			String jwt = parseJwt(token);
			if (jwt != null && jwtUtils.validateJwtToken(jwt)) {

				String username = jwtUtils.getUserNameFromJwtToken(jwt);

				UserDetails userDetails = userDetailsService.loadUserByUsername(username);
				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

				SecurityContextHolder.getContext().setAuthentication(authentication);

				// Refresh token
				String newToken = jwtUtils.generateTokenFromUsername(username);

				ResponseCookie tokencookie = ResponseCookie.from("token", newToken).httpOnly(false).secure(true)
						.domain(env.getProperty("newsletter.cookies.allow.domain")).path("/").maxAge(7 * 24 * 60 * 60)
						.build();

				response.addHeader("Set-Cookie", tokencookie.toString());

			}
		} catch (Exception e) {
			LOGGER.error("Cannot set user authentication: {}", e.getMessage());
		}

		filterChain.doFilter(request, response);
	}

	private String parseJwt(String token) {
		String headerAuth = token;
		if (StringUtils.hasText(headerAuth)) {
			return headerAuth;
		}

		return null;
	}

}

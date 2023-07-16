/*
 *
 */
package com.daimler.schematicbackend.filter.auth;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.daimler.schematicbackend.service.auth.SchematicUserDetailsService;
import com.daimler.schematicbackend.utils.auth.SchematicJwtUtils;

import io.jsonwebtoken.ExpiredJwtException;

/**
 * The Class SchematicAuthFilter.
 */
@Component
public class SchematicAuthFilter extends OncePerRequestFilter {

	/**
	 * The user details service.
	 */
	@Autowired
	SchematicUserDetailsService userDetailsService;

	/**
	 * The auth utils.
	 */
	@Autowired
	SchematicJwtUtils authUtils;

	/**
	 * Do filter internal.
	 *
	 * @param request     the request
	 * @param response    the response
	 * @param filterChain the filter chain
	 * @throws ServletException the servlet exception
	 * @throws IOException      Signals that an I/O exception has occurred.
	 */
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		try {

			String authheader = request.getHeader("Authorization");
			String userName = null;
			String token = null;
			if (authheader != null && authheader.startsWith("Bearer")) {
				token = authheader.substring(7);
				userName = authUtils.extractUsername(token);
			}
			if (userName != null && SecurityContextHolder.getContext().getAuthentication() == null) {
				UserDetails userDetails = userDetailsService.loadUserByUsername(userName);
				if (authUtils.validateToken(token, userDetails)) {
					UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
							userDetails, null, userDetails.getAuthorities());
					usernamePasswordAuthenticationToken
							.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
					SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
				}
			}
			filterChain.doFilter(request, response);

		} catch (ExpiredJwtException ex) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			((HttpServletResponse) response).sendError(HttpServletResponse.SC_BAD_REQUEST, "Expired JWT token");

		}
	}

}

package com.learning.configuration;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.learning.service.EmailService;

@Component
public class LoggingFilter extends OncePerRequestFilter {
	@Autowired
	EmailService emailService;

	private static final Logger LOGGER = LoggerFactory.getLogger(LoggingFilter.class);

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		ContentCachingRequestWrapper requestWrapper = new ContentCachingRequestWrapper(request);
		ContentCachingResponseWrapper responseWrapper = new ContentCachingResponseWrapper(response);

		long startTime = System.currentTimeMillis();
		long timeTaken = System.currentTimeMillis() - startTime;

		try {

			if (!emailService.getTokenByUser(request.getHeader("user"))) {
				throw new ServletException("Limit exceed");
			}

			filterChain.doFilter(requestWrapper, responseWrapper);
			generateAuthExceptionResponse(request, response, requestWrapper, responseWrapper, timeTaken);
		} catch (Exception e) {

			final Map<String, Object> body = new HashMap<>();
			if (e.getMessage().equals("Limit exceed")) {
				response.setContentType(MediaType.APPLICATION_JSON_VALUE);
				response.setStatus(HttpServletResponse.SC_OK);

				body.put("statuscode", HttpServletResponse.SC_OK);
				body.put("error", "Limit exceed");
				body.put("data", null);
				ObjectMapper mapper = new ObjectMapper();
				mapper.writeValue(response.getOutputStream(), body);

				responseWrapper = new ContentCachingResponseWrapper(response);
			}
			LOGGER.info(
					"FINISHED PROCESSING : METHOD={}; REQUESTURI={}; REQUEST PAYLOAD={}; RESPONSE CODE={}; RESPONSE={}; TIM TAKEN={}",
					request.getMethod(), request.getRequestURI(), "", response.getStatus(), body, timeTaken);

		}

	}

	private void generateAuthExceptionResponse(HttpServletRequest request, HttpServletResponse response,
			ContentCachingRequestWrapper requestWrapper, ContentCachingResponseWrapper responseWrapper, long timeTaken)
			throws IOException {
		String requestBody = getStringValue(requestWrapper.getContentAsByteArray(), request.getCharacterEncoding());
		String responseBody = getStringValue(responseWrapper.getContentAsByteArray(), response.getCharacterEncoding());
		responseWrapper.copyBodyToResponse();
		LOGGER.info(
				"FINISHED PROCESSING : METHOD={}; REQUESTURI={}; REQUEST PAYLOAD={}; RESPONSE CODE={}; RESPONSE={}; TIM TAKEN={}",
				request.getMethod(), request.getRequestURI(), requestBody, response.getStatus(), responseBody,
				timeTaken);

	}

	private String getStringValue(byte[] contentAsByteArray, String characterEncoding) {
		try {
			return new String(contentAsByteArray, 0, contentAsByteArray.length, characterEncoding);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return "";
	}

}

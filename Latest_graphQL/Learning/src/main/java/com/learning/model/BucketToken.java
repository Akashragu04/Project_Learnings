package com.learning.model;

import java.time.LocalDate;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import com.vladmihalcea.hibernate.type.json.JsonBinaryType;

@Entity

@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
public class BucketToken {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, updatable = false)
	private long id;

	@Column(name = "username")
	private String username;

	@Column(name = "generated_date")
	private LocalDate generatedDate;

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private TokenDetails state;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public TokenDetails getState() {
		return state;
	}

	public void setState(TokenDetails state) {
		this.state = state;
	}

	public BucketToken(String username, LocalDate generatedDate, TokenDetails state) {
		super();
		this.username = username;
		this.generatedDate = generatedDate;
		this.state = state;
	}

	public LocalDate getGeneratedDate() {
		return generatedDate;
	}

	public void setGeneratedDate(LocalDate generatedDate) {
		this.generatedDate = generatedDate;
	}

	public BucketToken() {
		super();
	}

}

package com.learning.model;

import java.io.Serializable;

public class TokenDetails implements Serializable {

	private long capacity;
	private long initialTokens;
	private long refillTokens;
	private long refillPeriodNanos;
	private long availableTokens;
	private String id;

	public long getCapacity() {
		return capacity;
	}

	public void setCapacity(long capacity) {
		this.capacity = capacity;
	}

	public long getInitialTokens() {
		return initialTokens;
	}

	public void setInitialTokens(long initialTokens) {
		this.initialTokens = initialTokens;
	}

	public long getRefillTokens() {
		return refillTokens;
	}

	public void setRefillTokens(long refillTokens) {
		this.refillTokens = refillTokens;
	}

	public long getRefillPeriodNanos() {
		return refillPeriodNanos;
	}

	public void setRefillPeriodNanos(long refillPeriodNanos) {
		this.refillPeriodNanos = refillPeriodNanos;
	}

	public long getAvailableTokens() {
		return availableTokens;
	}

	public void setAvailableTokens(long availableTokens) {
		this.availableTokens = availableTokens;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

}

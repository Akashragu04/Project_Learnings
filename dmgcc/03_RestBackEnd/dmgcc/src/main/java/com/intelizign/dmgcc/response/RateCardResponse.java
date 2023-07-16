package com.intelizign.dmgcc.response;

import java.util.List;

public class RateCardResponse {

	private long id;

	private String costcenter;

	private String team;

	private String department;

	private List<SubRatecard> ratecards;

	public static class SubRatecard {

		private long id;
		private double hourly_rate_inr=0;

		private double hourly_rate_usd=0;

		private double hourly_rate_ero=0;

		private String hourly_description;

		private String level;

		private String year;

		public SubRatecard() {
			super();
		}

		public double getHourly_rate_inr() {
			return hourly_rate_inr;
		}

		public void setHourly_rate_inr(double hourly_rate_inr) {
			this.hourly_rate_inr = hourly_rate_inr;
		}

		public double getHourly_rate_usd() {
			return hourly_rate_usd;
		}

		public void setHourly_rate_usd(double hourly_rate_usd) {
			this.hourly_rate_usd = hourly_rate_usd;
		}

		public double getHourly_rate_ero() {
			return hourly_rate_ero;
		}

		public void setHourly_rate_ero(double hourly_rate_ero) {
			this.hourly_rate_ero = hourly_rate_ero;
		}

		public String getHourly_description() {
			return hourly_description;
		}

		public void setHourly_description(String hourly_description) {
			this.hourly_description = hourly_description;
		}

		public String getLevel() {
			return level;
		}

		public void setLevel(String level) {
			this.level = level;
		}

		public String getYear() {
			return year;
		}

		public void setYear(String year) {
			this.year = year;
		}

		public long getId() {
			return id;
		}

		public void setId(long id) {
			this.id = id;
		}

	}

	public String getCostcenter() {
		return costcenter;
	}

	public void setCostcenter(String costcenter) {
		this.costcenter = costcenter;
	}

	public String getTeam() {
		return team;
	}

	public void setTeam(String team) {
		this.team = team;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public List<SubRatecard> getRatecards() {
		return ratecards;
	}

	public void setRatecards(List<SubRatecard> ratecards) {
		this.ratecards = ratecards;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

}

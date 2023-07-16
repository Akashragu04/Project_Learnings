package com.intelizign.dmgcc.response;

import java.util.List;

public class JdMappingDetails {
	private Long biz_id;
	private String level;
	private String total;
	private List<JDProperties> taleo_properties;
	private List<JDProperties> manual_properties;
	private Long hired_total;

	public static class JDProperties {
		private String month;
		private String plan;
		private String actual;
		private String status_color = "";

		public String getMonth() {
			return month;
		}

		public void setMonth(String month) {
			this.month = month;
		}

		public String getPlan() {
			return plan;
		}

		public void setPlan(String plan) {
			this.plan = plan;
		}

		public String getActual() {
			return actual;
		}

		public void setActual(String actual) {
			this.actual = actual;
		}

		public JDProperties() {
			super();
		}

		public String getStatus_color() {
			return status_color;
		}

		public void setStatus_color(String status_color) {
			this.status_color = status_color;
		}

	}

	public Long getBiz_id() {
		return biz_id;
	}

	public void setBiz_id(Long biz_id) {
		this.biz_id = biz_id;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public String getTotal() {
		return total;
	}

	public void setTotal(String total) {
		this.total = total;
	}

	public List<JDProperties> getTaleo_properties() {
		return taleo_properties;
	}

	public void setTaleo_properties(List<JDProperties> taleo_properties) {
		this.taleo_properties = taleo_properties;
	}

	public List<JDProperties> getManual_properties() {
		return manual_properties;
	}

	public void setManual_properties(List<JDProperties> manual_properties) {
		this.manual_properties = manual_properties;
	}

	public Long getHired_total() {
		return hired_total;
	}

	public void setHired_total(Long hired_total) {
		this.hired_total = hired_total;
	}

	public JdMappingDetails() {
		super();
	}

}

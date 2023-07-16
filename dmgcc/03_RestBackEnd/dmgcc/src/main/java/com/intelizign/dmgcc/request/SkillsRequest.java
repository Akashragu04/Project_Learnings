package com.intelizign.dmgcc.request;

import java.io.Serializable;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SkillsRequest implements Serializable {

	private String primaryskill;

	private List<Secondary> secondary;

	private Boolean bench_resource;

	public static class Secondary implements Serializable {

		private String secondaryskill;

		public Secondary() {
			super();
		}

		public String getSecondaryskill() {
			return secondaryskill;
		}

		public void setSecondaryskill(String secondaryskill) {
			this.secondaryskill = secondaryskill;
		}
	}

}

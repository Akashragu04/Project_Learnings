package com.intelizign.dmgcc.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MySSCLapServerResponce {

	private Boolean isSuccess;
	private Long httpStatusCode;
	private String statusMessage;
	private List<LDAPData> datas;

	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	public class LDAPData {
		private String Name;
		private String shortid;
		private String Mail;
		private String firstName;
		private String lastName;
		private String Department;
	}
}

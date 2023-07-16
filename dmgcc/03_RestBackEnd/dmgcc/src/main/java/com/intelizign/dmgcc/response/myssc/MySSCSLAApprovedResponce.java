package com.intelizign.dmgcc.response.myssc;

import com.intelizign.dmgcc.request.MySLAApprovalRequest;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MySSCSLAApprovedResponce {

	private Boolean isSuccess;
	private Long httpStatusCode;
	private String statusMessage;
	private MySLAApprovalRequest data;

}

package com.intelizign.dmgcc.pojoclass;

import java.util.List;

public class G3CEmployeeRole {

	private Long role_id;

	private List<Long> user_id;

	public Long getRole_id() {
		return role_id;
	}

	public void setRole_id(Long role_id) {
		this.role_id = role_id;
	}

	public List<Long> getUser_id() {
		return user_id;
	}

	public void setUser_id(List<Long> user_id) {
		this.user_id = user_id;
	}

	public G3CEmployeeRole() {
		super();
	}

}

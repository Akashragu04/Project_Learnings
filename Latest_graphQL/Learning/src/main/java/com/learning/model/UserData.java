package com.learning.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "userdata")
public class UserData {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, updatable = false)
	private long id;

	@Column(name = "username")
	private String username;

	@Column(name = "password")
	private String password;

//	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//	private Set<Email> inbox = new HashSet<>();

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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

//	public Set<Email> getInbox() {
//		return inbox;
//	}
//
//	public void setInbox(Set<Email> inbox) {
//		this.inbox = inbox;
//	}

	public UserData() {
	}

}

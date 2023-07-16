package com.intelizign.dmgcc.models;

import java.time.Instant;

import javax.persistence.*;


@Entity(name = "refreshtoken")
public class RefreshToken {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  @OneToOne
  @JoinColumn(name = "employee_id", referencedColumnName = "id")
  private G3CEmployeeMasterModel employee;

  @Column(nullable = false, unique = true)
  private String token;

  @Column(nullable = false)
  private Instant expiryDate;

  
  public long getId() {
	return id;
}

public void setId(long id) {
	this.id = id;
}


public G3CEmployeeMasterModel getEmployee() {
	return employee;
}

public void setEmployee(G3CEmployeeMasterModel employee) {
	this.employee = employee;
}

public String getToken() {
	return token;
}

public void setToken(String token) {
	this.token = token;
}

public Instant getExpiryDate() {
	return expiryDate;
}

public void setExpiryDate(Instant expiryDate) {
	this.expiryDate = expiryDate;
}

  //getters and setters

}
package com.intelizign.dmgcc.response;

import java.time.LocalDate;

public interface ReportResponse {

	Long getId();

	String getEmail();

	String getHrid();

	LocalDate getDate_of_join();

	String getCategory();

	String getEmp_name();

	String getEmployee_type();

}

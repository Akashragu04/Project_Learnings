package com.intelizign.dmgcc.models.excel;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import com.poiji.annotation.ExcelCellName;

import io.github.rushuat.ocell.annotation.FieldName;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ThirdPartyExcelData {

	@FieldName("ShortId")
	@NotBlank()
	@NotNull()
	@NotEmpty()
	@ExcelCellName("ShortId")
	private String short_id;

	@NotBlank()
	@NotNull()
	@NotEmpty()
	@FieldName("HR Id")
	@ExcelCellName("HR Id")
	private String hr_id;

	@NotBlank()
	@NotNull()
	@NotEmpty()
	@FieldName("Employee Name")
	@ExcelCellName("Employee Name")
	private String employee_name;

	@FieldName("Functions")
	@ExcelCellName("Functions")
	private String functions;

	@FieldName("Date of Joining")
	@ExcelCellName("Date of Joining")
	@Pattern(regexp = "^([0]?[1-9]|[1|2][0-9]|[3][0|1])[-]([0]?[1-9]|[1][0-2])[-]([0-9]{4}|[0-9]{2})$")
	private String date_of_joining;

	@FieldName("Designation/Role")
	@ExcelCellName("Designation/Role")
	private String designation;

	@NotBlank()
	@NotNull()
	@NotEmpty()
	@FieldName("Email")
	@ExcelCellName("Email")
	private String email;

}

package com.intelizign.dmgcc.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import io.github.rushuat.ocell.annotation.FieldName;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "organization_type")
public class OrganizationType {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, updatable = false)
	@FieldName("S.No")
//	@ExcelCellName("S.No")
	private long id;

	@Column(name = "name")
	@FieldName("Name")
//	@ExcelCellName("Name")
	private String name;

}

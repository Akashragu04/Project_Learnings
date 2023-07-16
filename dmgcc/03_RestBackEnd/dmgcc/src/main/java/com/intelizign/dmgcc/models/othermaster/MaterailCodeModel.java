package com.intelizign.dmgcc.models.othermaster;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Material_code")
public class MaterailCodeModel {

	@Id
	@GenericGenerator(name = "id", strategy = "com.intelizign.dmgcc.utils.MaterialCodeIdConfig")
	@GeneratedValue(generator = "id")
	@Column(name = "id", nullable = false, updatable = false)
	private long id;
	
	@Column(name = "costcenter")
	private String costcenter;

	@Column(name = "materialname")
	private String materialname;

	@Column(name = "code")
	private String code;

	@Column(name = "description")
	private String description;

	@Column(name = "has_markup")
	private Boolean has_markup;
	
	@Column(name = "is_active")
	private Boolean isactive = true;
	
	@Column(name = "saccode")
	private String saccode;

	@Column(name = "is_taxable")
	private Boolean is_taxable;

	@Column(name = "has_wht")
	private Boolean has_wht;

	@Column(name = "has_fx")
	private Boolean has_fx;

	@Column(name = "country")
	private String country;

}

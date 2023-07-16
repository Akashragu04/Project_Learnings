package com.intelizign.dmgcc.models.othermaster;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "gl_grouping")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GLGroupingModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, updatable = false)
	private long id;
	
	@Column(name = "glcode")
	private long glcode = 0;
	
	@Column(name = "gl_description")
	private String gl_description;
	
	@Column(name = "gl_grouping")
	private String gl_grouping;
}

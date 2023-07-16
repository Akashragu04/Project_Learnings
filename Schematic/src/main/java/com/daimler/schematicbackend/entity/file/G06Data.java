package com.daimler.schematicbackend.entity.file;

import java.io.Serializable;
import java.sql.Timestamp;
import java.time.LocalDateTime;

import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.daimler.schematicbackend.embeddable.G06Embeddable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The type G 06 data.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "schematic_g06_data")
public class G06Data implements Serializable {

	/**
	 * The g 06 id.
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long g06Id;

	/**
	 * The g 06 name.
	 */
	private String g06name;

	private String userName;

	private Timestamp uploadDate;

	private LocalDateTime modifiedDate;

	private String modifiedBy;

	@Embedded
	private G06Embeddable go6Embeddable;

}

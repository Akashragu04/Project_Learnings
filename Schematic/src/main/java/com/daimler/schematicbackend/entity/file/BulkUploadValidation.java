package com.daimler.schematicbackend.entity.file;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The Class CommodityDetails.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "bulk_upload_validation")
public class BulkUploadValidation {

	/**
	 * The commodity id.
	 */
	@Id
	private long uploadId;

	/**
	 * The enable.
	 */
	private boolean enable;

	/**
	 * The inprogress.
	 */
	private boolean inprogress;

}

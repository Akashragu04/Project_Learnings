package com.daimler.schematicbackend.entity.file;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
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
@Table(name = "bulk_upload_details")
public class BulkUploadDetails {

	/**
	 * The commodity id.
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long bulkUploadId;

	/**
	 * The commodity name.
	 */
	private String commodityName;

	/**
	 * The upload date.
	 */
	private LocalDateTime uploadDate;

	/**
	 * The status.
	 */
	private String status;

	/**
	 * The description.
	 */
	private String description;

	/**
	 * The uploadedBy.
	 */
	private String uploadedBy;

	public BulkUploadDetails(String commodityName, LocalDateTime uploadDate, String status, String description,
			String uploadedBy) {
		super();
		this.commodityName = commodityName;
		this.uploadDate = uploadDate;
		this.status = status;
		this.description = description;
		this.uploadedBy = uploadedBy;
	}

}

package com.daimler.schematicbackend.model.generic;

import java.util.List;

import com.daimler.schematicbackend.entity.file.BulkUploadDetails;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The Class SchematicBulkUploadResponse.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SchematicBulkUploadResponse {
	/**
	 * The response message.
	 */
	@ApiModelProperty(notes = "Success/Error Message", required = true, name = "responseMessage", value = "Operation Requested is successfully")
	private String responseMessage;

	/**
	 * The checks failed.
	 */
	@ApiModelProperty(notes = "Indicates the List of configuration mismatch", required = true, name = "genericErrors", value = "String List")
	private List<BulkUploadDetails> uploadReport;

}

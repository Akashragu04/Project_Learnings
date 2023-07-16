/*
 *
 */
package com.daimler.schematicbackend.utils.file;

import com.daimler.schematicbackend.entity.file.ErrorMessage;
import com.daimler.schematicbackend.repository.file.SchematicErrorMessageRepository;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * The Class SchematicFileErrorMessageUtils.
 */
@Component
public class SchematicFileErrorMessageUtils {

    /**
     * The repository.
     */
    @Autowired
    SchematicErrorMessageRepository repository;

    /**
     * Builds the error message.
     *
     * @param errorMessage the error message
     * @param sheetName    the sheet name
     * @param rowIndex     the row index
     */
    public void buildErrorMessage(String errorMessage, String sheetName, int rowIndex) {
        repository.save(ErrorMessage.builder().rowIndex(rowIndex).message(errorMessage).sheetName(sheetName).build());
    }

    /**
     * Delete by sheet name.
     *
     * @param sheetName
     *            the sheet name
     */
    public void deleteBySheetName(String sheetName) {
        if (checkIfSheetExists(sheetName)) {
            repository.deleteAllBySheetName(sheetName);
        }
    }

    /**
     * Check if sheet exists.
     *
     * @param sheetName
     *            the sheet name
     * @return true, if successful
     */
    public boolean checkIfSheetExists(String sheetName) {
        return repository.existsBySheetName(sheetName);
    }

    /**
     * Message list list.
     *
     * @param sheetName
     *            the sheet name
     * @return the list
     */
    public List<ErrorMessage> messageList(String sheetName) {
        return repository.findBySheetName(sheetName);
    }

    /**
     * Gets error type.
     *
     * @param genericErrors
     *            the generic errors
     * @param sheetErrors
     *            the sheet errors
     * @return the error type
     */
    public String getErrorType(List<String> genericErrors, List<ErrorMessage> sheetErrors) {
        boolean cond1 = ObjectUtils.isNotEmpty(genericErrors);
        boolean cond2 = ObjectUtils.isNotEmpty(sheetErrors);
        String type = StringUtils.EMPTY;
        if (cond1 && cond2) {
            type = "Uploaded file contains both formatting/naming and validation errors";
        } else if (cond1) {
            type = "Uploaded file contains formatting/naming validation errors";
        } else if (cond2) {
            type = "Uploaded file contains sheet validation failures";
        }
        return type;
    }

}

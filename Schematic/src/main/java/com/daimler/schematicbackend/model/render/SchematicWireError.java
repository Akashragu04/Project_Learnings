package com.daimler.schematicbackend.model.render;

public enum SchematicWireError {

    CHANGE_SOURCE_PORT_DESIGNATOR("Change the Source Port Designator"), CHANGE_DESIGNATION_PORT_DESIGNATOR(
            "Change the Destination Port Designator"), ERROR_FOR_SAME_Y("ERROR FOR SAME Y, Change X"), ERROR_FOR_SAME_X(
            "ERROR FOR SAME X, Change Y"), SOURCE_COORDINATE(
            "Source Coordinates are overlapping with Connector"), DEST_COORDINATE(
            "Destination Coordinates are overlapping with Connector"),
    ;

    private String errorMessage;

    SchematicWireError(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

}

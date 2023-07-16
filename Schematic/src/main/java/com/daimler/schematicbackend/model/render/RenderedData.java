package com.daimler.schematicbackend.model.render;

import java.io.Serializable;
import java.util.List;

public class RenderedData implements Serializable {

	private List<Object> cells;

	public List<Object> getCells() {
		return cells;
	}

	public void setCells(List<Object> cells) {
		this.cells = cells;
	}

	public RenderedData() {
		super();

	}

}

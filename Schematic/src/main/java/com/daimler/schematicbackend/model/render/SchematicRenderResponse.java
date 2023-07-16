package com.daimler.schematicbackend.model.render;

import java.util.List;
import java.util.Map;

import com.daimler.schematicbackend.embeddable.G06Embeddable;
import com.daimler.schematicbackend.entity.file.DatabaseFileData;
import com.daimler.schematicbackend.entity.render.G06RenderData;
import com.daimler.schematicbackend.entity.render.RealignmentModel;
import com.daimler.schematicbackend.entity.render.RenderModel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SchematicRenderResponse {
	List<String> errorMessage;
	List<RenderModel> renderModelList;
	List<G06RenderData> go6RenderDataList;
	Map<String, SchematicBasicConnectorData> basicConnectorData;
	Map<String, DatabaseFileData> metadataMap;
	List<G06Embeddable> g06Data;
	RealignmentModel realignmentData;
	List<String> manualAllignment;

	public SchematicRenderResponse(List<String> errorMessage) {
		this.errorMessage = errorMessage;
	}

	public SchematicRenderResponse(List<RenderModel> renderModelList, List<G06RenderData> go6RenderDataList,
			Map<String, SchematicBasicConnectorData> basicConnectorData, Map<String, DatabaseFileData> metadataMap,
			List<G06Embeddable> g06Data, RealignmentModel realignmentData, List<String> manualAllignment) {
		super();
		this.renderModelList = renderModelList;
		this.go6RenderDataList = go6RenderDataList;
		this.basicConnectorData = basicConnectorData;
		this.metadataMap = metadataMap;
		this.g06Data = g06Data;
		this.realignmentData = realignmentData;
		this.manualAllignment = manualAllignment;
	}

}
package com.daimler.schematicbackend.entity.render;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import com.daimler.schematicbackend.model.render.RenderedData;
import com.vladmihalcea.hibernate.type.json.JsonStringType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "realignment_data")
@EqualsAndHashCode
@TypeDef(name = "json", typeClass = JsonStringType.class)
public class RealignmentModel {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	private String commodityName;

	@Type(type = "json")
	@Column(columnDefinition = "json")
	private RenderedData renderedData;

	private double renderedWidth;

	private double renderedHeight;

	private boolean realign = false;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCommodityName() {
		return commodityName;
	}

	public void setCommodityName(String commodityName) {
		this.commodityName = commodityName;
	}

	public RenderedData getRenderedData() {
		return renderedData;
	}

	public void setRenderedData(RenderedData renderedData) {
		this.renderedData = renderedData;
	}

	public double getRenderedWidth() {
		return renderedWidth;
	}

	public void setRenderedWidth(double renderedWidth) {
		this.renderedWidth = renderedWidth;
	}

	public double getRenderedHeight() {
		return renderedHeight;
	}

	public void setRenderedHeight(double renderedHeight) {
		this.renderedHeight = renderedHeight;
	}

	public boolean isRealign() {
		return realign;
	}

	public void setRealign(boolean realign) {
		this.realign = realign;
	}

	public RealignmentModel() {
		super();
	}
	
	

}

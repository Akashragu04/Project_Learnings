package com.intelizign.dmgcc.models.othermaster;

import java.util.List;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.intelizign.dmgcc.models.SLAModel;
import com.intelizign.dmgcc.response.SLAAccuralsResponse;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "sla_accurals")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
public class SLAAccurals {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, updatable = false)
	private long id;

	@Column(name = "invoice_revenue")
	private Long invoice_revenue;

	@Column(name = "total_revenue")
	private Long total_revenue;

	@Column(name = "sla_name")
	private String sla_name;

	@Column(name = "slaid")
	private Long slaid;

	@Column(name = "billing_cycle")
	private String billing_cycle;
	

	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	@Basic(fetch = FetchType.LAZY)
	private List<SLAAccuralsResponse> accurals_tarriff_data;

	@OneToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "sla_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonBackReference
	private SLAModel sla;

}

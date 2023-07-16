package com.daimler.schematicbackend.entity.render;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class SchematicMetadataChangeHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String version;
    private LocalDateTime uploadedDate;
    private String uploadedBy;

}

package com.daimler.schematicbackend.repository.file;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daimler.schematicbackend.entity.file.CustomImage;

/**
 * The interface Custom image repository.
 */
public interface SchematicCustomImageRepository extends JpaRepository<CustomImage, Long> {
	/**
	 * Exists by custom image name boolean.
	 *
	 * @param filename the filename
	 * @return the boolean
	 */
	boolean existsByCustomImageName(String filename);

	CustomImage findByCustomImageName(String imageName);

	boolean existsByCustomImageNameAndCommodityName(String imageName, String fileName);

	CustomImage findByCustomImageNameAndCommodityName(String imageName, String fileName);

	List<CustomImage> findByCommodityName(String fileName);

	void deleteByCustomImageNameAndCommodityName(String imageName, String fileName);

}

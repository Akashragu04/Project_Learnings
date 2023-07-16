package com.daimler.schematicbackend.repository.file;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.daimler.schematicbackend.entity.file.CommodityRenderable;

/**
 * The Interface SchematicCommodityA06Repository.
 */
@Repository
public interface SchematicRenderableRepository extends JpaRepository<CommodityRenderable, Long> {

	/**
	 * Exists by commodity name boolean.
	 *
	 * @param commodityName the commodity name
	 * @return the boolean
	 */
	boolean existsByCommodityName(String commodityName);

	/**
	 * Find by commodity name commodity renderable.
	 *
	 * @param commodityName the commodity name
	 * @return the commodity renderable
	 */
	CommodityRenderable findByCommodityName(String commodityName);

	/**
	 * Find by renderable false list.
	 *
	 * @return the list
	 */
	List<CommodityRenderable> findByRenderableFalse();

	List<CommodityRenderable> findByRenderableTrue();

	@Query(value = "select count(*) from schematic_renderable_commodity src where src.renderable=false", nativeQuery = true)
	long countByRenderableFalse();

	@Query(value = "select count(*)  from schematic_renderable_commodity src where src.commodity_name like :letters%", nativeQuery = true)
	long countByFirstletters(String letters);

	@Transactional
	@Modifying
	@Query("delete from CommodityRenderable cr where cr.commodityName in ?1")
	void deleteAllByCommodityName(List<String> commodityName);
}

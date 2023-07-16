package com.intelizign.dmgcc.repositories.othermaster;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.intelizign.dmgcc.models.othermaster.MaterailCodeModel;

@Repository
public interface MaterialCodeRepository extends JpaRepository<MaterailCodeModel, Long> {

	@Query("SELECT u FROM MaterailCodeModel u WHERE LOWER(CONCAT(u.id, u.materialname, u.code, u.description)) LIKE %?1% or UPPER(CONCAT(u.id, u.materialname, u.code, u.description)) LIKE %?1%")
	Page<MaterailCodeModel> findAll(String searchkeyword, Pageable pageable);

	@Query("SELECT u FROM MaterailCodeModel u WHERE LOWER(CONCAT(u.id, u.materialname, u.code, u.description)) LIKE %?1% or UPPER(CONCAT(u.id, u.materialname, u.code, u.description)) LIKE %?1% ORDER BY ?2 ")
	Page<MaterailCodeModel> findbySearchandSort(String search, String sortcolumn, Pageable pageable);

	List<MaterailCodeModel> findByCode(String department);

	List<MaterailCodeModel> findAllByOrderById();

	@Query("SELECT DISTINCT u.description FROM MaterailCodeModel u order by u.description")
	List<String> DescriptionField();

	@Query("SELECT u FROM MaterailCodeModel u WHERE  u.costcenter=?1 and u.country = ?2 ORDER BY u.id ")
	List<MaterailCodeModel> findAllByCostcenterAndContractOption(String costcenter, String country);

	@Query("SELECT u FROM MaterailCodeModel u WHERE u.costcenter=?1 and u.description=?2 and u.country = ?3 ORDER BY u.id ")
	List<MaterailCodeModel> findAllByCostcenterAndContractAndDescription(String costcenter, String materialdescription,
			String country);

}
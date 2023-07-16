package com.intelizign.dmgcc.repositories.othermaster;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.intelizign.dmgcc.models.othermaster.MySccCostcenterModel;

public interface MySccCostcenterRepository extends JpaRepository<MySccCostcenterModel, Long> {

	MySccCostcenterModel findByCode(String cost_center);

	List<MySccCostcenterModel> findAllByOrderById();

}

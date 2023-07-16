package com.intelizign.dmgcc.repositories.othermaster;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.intelizign.dmgcc.models.othermaster.GLGroupingModel;

public interface GLGroupingRepository extends JpaRepository<GLGroupingModel, Long> {

	List<GLGroupingModel> findAllByOrderById();

}

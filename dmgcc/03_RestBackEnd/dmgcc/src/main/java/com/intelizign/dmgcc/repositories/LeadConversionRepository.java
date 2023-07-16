package com.intelizign.dmgcc.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.intelizign.dmgcc.models.LeadConversionModel;

public interface LeadConversionRepository extends JpaRepository<LeadConversionModel, Long> {

	@Query("SELECT u FROM LeadConversionModel u WHERE u.lead.id = ?1 and u.conversion_period = ?2")
	List<LeadConversionModel> findByLeadIdAndConversionPeriod(Long leadID, String Conversion_period);

	@Query("SELECT u FROM LeadConversionModel u WHERE u.id = ?1")
	Optional<LeadConversionModel> findById(Long id);

	@Query("SELECT COALESCE(AVG(u.delay_days),0) FROM LeadConversionModel u WHERE u.conversion_period = ?1")
	double findLeadConversion(String Conversion_period);

	@Query("SELECT COALESCE(AVG(u.delay_days),0) FROM LeadConversionModel u WHERE u.conversion_period = ?1 and u.lead.service_provider_cost_center = ?2")
	double findLeadConversionCostCenter(String Conversion_period, String costcenter);
}

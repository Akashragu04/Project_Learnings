package com.intelizign.dmgcc.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.intelizign.dmgcc.models.RefreshToken;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    @Override
    Optional<RefreshToken> findById(Long id);

    Optional<RefreshToken> findByToken(String token);

    void deleteByToken(String token);
	

}
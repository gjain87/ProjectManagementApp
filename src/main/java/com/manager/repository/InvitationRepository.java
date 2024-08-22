package com.manager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.manager.entity.Invitation;

public interface InvitationRepository extends JpaRepository<Invitation, Long> {

	Invitation findByToken(String token);
	
	Invitation findByEmail(String userEmail);
	
	
}

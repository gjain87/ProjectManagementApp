package com.manager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.manager.entity.Subscription;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
	
	Subscription findByUserId(Long userId);

}

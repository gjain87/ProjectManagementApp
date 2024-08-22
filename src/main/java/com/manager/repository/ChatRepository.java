package com.manager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.manager.entity.Chat;

public interface ChatRepository extends JpaRepository<Chat, Long> {

	
}

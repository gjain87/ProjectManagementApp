package com.manager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.manager.entity.User;



public interface UserRepository extends JpaRepository<User,Long > {
	
	User findByEmail(String email);

}

package com.manager.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.manager.entity.Project;
import com.manager.entity.User;

public interface projectRepository extends JpaRepository<Project, Long> {
	
//	List<Project>findByOwner(User user);
	
	List<Project>findByNameContainingAndTeamContains(String partialName, User user);
	
//	@Query("Select p from project p join p.team t where t=:user")
//	List<Project>findProjectByTeam(@Param("user")User user);

	List<Project>findByTeamContainingOrOwner(User user,User owner);
}

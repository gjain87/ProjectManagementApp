package com.manager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.manager.entity.Chat;
import com.manager.entity.Invitation;
import com.manager.entity.Project;
import com.manager.entity.User;
import com.manager.request.InviteRequest;
import com.manager.response.MessageResponse;
import com.manager.service.InvitationService;
import com.manager.service.UserService;
import com.manager.service.projectService;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

	@Autowired
	private projectService projectService;
	
	@Autowired
	private UserService  userService;
	
	@Autowired
	private InvitationService invitationService;
	
	@GetMapping
	public ResponseEntity<List<Project>>getProjects(
			@RequestParam(required = false)String category,
			@RequestParam(required = false)String tag,
			@RequestHeader("Authorization")String jwt) throws Exception
	{
		User user=userService.findUserProfileByJwt(jwt);
		List<Project>projects=projectService.getProjectByTeam(user, category, tag);
		return new ResponseEntity<>(projects,HttpStatus.OK);
	}
	
	@GetMapping("/{projectId}")
	public ResponseEntity<Project>getProjectById(
			@PathVariable Long projectId,
			@RequestHeader("Authorization")String jwt) throws Exception
	{
		User user=userService.findUserProfileByJwt(jwt);
		Project projects=projectService.getProjectById(projectId);
		return new ResponseEntity<>(projects,HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<Project>createProject(
			@RequestBody Project project,
			@RequestHeader("Authorization")String jwt) throws Exception
	{
		User user=userService.findUserProfileByJwt(jwt);
		Project createdProject=projectService.createProject(project,user);
		return new ResponseEntity<>(createdProject,HttpStatus.OK);
	}
	
	@PatchMapping("/{projectId}")
	public ResponseEntity<Project>updateProject(
			@PathVariable Long projectId,
			@RequestBody Project project,
			@RequestHeader("Authorization")String jwt) throws Exception
	{
		User user=userService.findUserProfileByJwt(jwt);
		Project updatedProject=projectService.updateProject(project,projectId);
		return new ResponseEntity<>(updatedProject,HttpStatus.OK);
	}
	
	@DeleteMapping("/{projectId}")
	public ResponseEntity<MessageResponse>deleteProject(
			@PathVariable Long projectId,
			@RequestHeader("Authorization")String jwt) throws Exception
	{
		User user=userService.findUserProfileByJwt(jwt);
		projectService.deleteProject(projectId,user.getId());
		MessageResponse response=new MessageResponse("project deleted successfully");
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
	
	@GetMapping("/search")
	public ResponseEntity<List<Project>>searchProjects(
			@RequestParam(required = false)String keyword,
			@RequestHeader("Authorization")String jwt) throws Exception
	{
		User user=userService.findUserProfileByJwt(jwt);
		List<Project>projects=projectService.searchProject(keyword,user);
		return new ResponseEntity<>(projects,HttpStatus.OK);
	}
	
	@GetMapping("/{projectId}/chat")
	public ResponseEntity<Chat>getChatProjectById(
			@PathVariable Long projectId,
			@RequestHeader("Authorization")String jwt) throws Exception
	{
		User user=userService.findUserProfileByJwt(jwt);
		Chat chat=projectService.getChatByProjectId(projectId);
		return new ResponseEntity<>(chat,HttpStatus.OK);
	}
	
	@PostMapping("/invite")
	public ResponseEntity<MessageResponse>inviteToProject(
			@RequestBody InviteRequest inviteRequest,
			@RequestHeader("Authorization")String jwt) throws Exception
	{
		User user=userService.findUserProfileByJwt(jwt);
		invitationService.sendInvitation(inviteRequest.getEmail(), inviteRequest.getProjectId());
		MessageResponse messageResponse=new MessageResponse("User successfully invited to the project");
		
		return new ResponseEntity<>(messageResponse,HttpStatus.OK);
	}
	
	
	@GetMapping("/accept_invitation")
	public ResponseEntity<Invitation>acceptInvitation(
			@RequestParam String token,
		
			@RequestHeader("Authorization")String jwt) throws Exception
	{
		User user=userService.findUserProfileByJwt(jwt);
		Invitation invitaion = invitationService.acceptInvitaion(token, user.getId());
		projectService.addUserToProject(invitaion.getProjectId(),user.getId());
		
		return new ResponseEntity<>(invitaion,HttpStatus.ACCEPTED);
	}
	
	
	

	
}

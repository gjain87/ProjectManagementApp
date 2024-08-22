package com.manager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.manager.entity.Chat;
import com.manager.entity.Message;
import com.manager.entity.User;
import com.manager.request.createMessageRequest;
import com.manager.service.MessageService;
import com.manager.service.UserService;
import com.manager.service.projectService;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
	
	@Autowired
	private MessageService messageService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private projectService projectService;
	
	@PostMapping("/send")
	public ResponseEntity<Message>sendMessage(@RequestBody createMessageRequest req)throws Exception
	{
		User user=userService.findUserById(req.getSenderId());
		if(user==null)throw new Exception("User not found with id: "+req.getSenderId());
		Chat chats=projectService.getProjectById(req.getProjectId()).getChat();
		if(chats==null)throw new Exception("No Chat found");
		
		Message sentMessage=messageService.sendMessage(req.getSenderId(), req.getProjectId(), req.getContent());
		return ResponseEntity.ok(sentMessage);
	}
	
	@GetMapping("/chat/{chatId}")
	public ResponseEntity<List<Message>>getMessagesByChatId(@PathVariable Long chatId)throws Exception
	{
		List<Message> messageByProjectId = messageService.getMessageByProjectId(chatId);
		return ResponseEntity.ok(messageByProjectId);
	}

}

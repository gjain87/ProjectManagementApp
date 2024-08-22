package com.manager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.manager.entity.Comment;
import com.manager.entity.User;
import com.manager.request.createCommentRequest;
import com.manager.response.MessageResponse;
import com.manager.service.CommentService;
import com.manager.service.UserService;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

	@Autowired
	private CommentService commentService;
	
	@Autowired
	private UserService userService;
	
	@PostMapping()
	public ResponseEntity<Comment>createComment(@RequestBody createCommentRequest req ,@RequestHeader("Authorization")String jwt) throws Exception
	{
		User user=userService.findUserProfileByJwt(jwt);
		Comment createdComment=commentService.createComment(req.getIssueId(),user.getId(), req.getContent());
		return new ResponseEntity<>(createdComment,HttpStatus.CREATED);
	}
	
	@DeleteMapping("/{commentId}")
	public ResponseEntity<MessageResponse>deleteComment(@PathVariable Long commentId,@RequestHeader("Authorization")String jwt) throws Exception
	{
		User user=userService.findUserProfileByJwt(jwt);
		commentService.deleteComment(commentId, user.getId());
		MessageResponse messageResponse=new MessageResponse();
		messageResponse.setMessage("Comment deleted Successfully");
		return new ResponseEntity<>(messageResponse,HttpStatus.OK);
	}
	
	@GetMapping("/{issueId}")
	public ResponseEntity<List<Comment>>getCommentsByIssueId(@PathVariable Long issueId)
	{
		List<Comment>comments=commentService.findCommentByIssueId(issueId);
		return new ResponseEntity<>(comments,HttpStatus.OK);
	}
}

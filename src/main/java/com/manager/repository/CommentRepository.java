package com.manager.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.manager.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {

	List<Comment>findCommentByIssueId(Long IssueId);
}

package com.manager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.manager.config.JwtProvider;
import com.manager.entity.User;
import com.manager.repository.UserRepository;
import com.manager.request.LoginRequest;
import com.manager.response.AuthResponse;
import com.manager.service.CustomUserDetailImpl;
import com.manager.service.SubscriptionService;

@RestController
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
	private UserRepository userRepo;

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private CustomUserDetailImpl customUserDetail;
	
	@Autowired
	private SubscriptionService subscriptionService;
	
	@PostMapping("/signup")
	public ResponseEntity<AuthResponse>createuserHandler(@RequestBody User user) throws Exception
	{
		User isUserExist=userRepo.findByEmail(user.getEmail()); 
		if(isUserExist!=null)
		{
			throw new Exception("User already exist with this email");
			
		}
		User createdUser=new User();
		createdUser.setPassword(passwordEncoder.encode(user.getPassword()));
		createdUser.setEmail(user.getEmail());
		createdUser.setFullName(user.getFullName());
		
		User savedUser=userRepo.save(createdUser);
		
		subscriptionService.createSubscription(savedUser);
		
		Authentication authentication=new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		String jwt=JwtProvider.generateToken(authentication);
		
		AuthResponse authResponse=new AuthResponse();
		authResponse.setMessage("Signup success");
		authResponse.setJwt(jwt);
		
		
		return new ResponseEntity<>(authResponse,HttpStatus.CREATED);
	}
	
	@PostMapping("/signin")
	public ResponseEntity<AuthResponse>SignIn(@RequestBody LoginRequest loginRequest)
	{
		String username=loginRequest.getEmail();
		String password=loginRequest.getPassword();
		
		Authentication authentication=authenticate(username,password);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		String jwt=JwtProvider.generateToken(authentication);
		
		AuthResponse authResponse=new AuthResponse();
		authResponse.setMessage("Signin success");
		authResponse.setJwt(jwt);
		
		return new ResponseEntity<>(authResponse,HttpStatus.CREATED);
	}

	private Authentication authenticate(String username, String password) {
		UserDetails details=customUserDetail.loadUserByUsername(username);
		if(details==null)
		{
			throw new BadCredentialsException("Invalid username...");
		}
		if(!passwordEncoder.matches(password, details.getPassword()))
		{
			throw new BadCredentialsException("Password is incorrect...");
		}
		
		return new UsernamePasswordAuthenticationToken(details, null,details.getAuthorities());
	}
	
}

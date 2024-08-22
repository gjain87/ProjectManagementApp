package com.manager.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.manager.entity.PlanType;
import com.manager.entity.User;
import com.manager.response.PaymentLinkResponse;
import com.manager.service.UserService;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;


@RestController
@RequestMapping("/api/payments")
public class PaymentController {
	
	@Value("${razorpay.api.key}")
	private String apiKey;
	
	@Value("${razorpay.api.secret}")
	private String apiSecret;

	@Autowired
	private UserService userService;
	
	@PostMapping("/{planType}")
	public ResponseEntity<PaymentLinkResponse>createPaymentLink(@PathVariable PlanType planType,@RequestHeader("Authorization")String jwt) throws Exception
	{
		User user=userService.findUserProfileByJwt(jwt);
		int amount=699*100;
		if(planType.equals(PlanType.ANNUALLY))
		{
			amount=amount*12;
			amount=(int)(amount*0.7);
		}
		
	 
			RazorpayClient rzp=new RazorpayClient(apiKey, apiSecret);
			
			JSONObject paymentlinkrequest=new JSONObject();
			paymentlinkrequest.put("amount",amount );
			paymentlinkrequest.put("currency", "INR");
			
			JSONObject customer=new JSONObject();
			customer.put("name", user.getFullName());
			customer.put("email", user.getEmail());
			paymentlinkrequest.put("customer", customer);
			
			JSONObject notify=new JSONObject();
			notify.put("email", true);
			paymentlinkrequest.put("notify", notify);
			paymentlinkrequest.put("callback_url", "http://localhost:5173/upgrade_plan/success?planType="+planType);
			
			PaymentLink paymentLink=rzp.paymentLink.create(paymentlinkrequest);
			String paymentLinkId=paymentLink.get("id");
			String paymentLinkUrl=paymentLink.get("short_url");
			
			PaymentLinkResponse res=new PaymentLinkResponse(paymentLinkId,paymentLinkUrl);
			res.setPayment_link_id(paymentLinkId);
			res.setPayment_link_url(paymentLinkUrl);
			
			return new ResponseEntity<>(res,HttpStatus.CREATED);
			
		
	}
}

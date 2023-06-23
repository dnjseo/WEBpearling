package com.pearling.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController extends BaseController {
	// 로그인 매핑
	@GetMapping("/login")
	public String login(){
		return "login";
	} 

	@GetMapping("/find-password")
	public String findPassword(Model model){
		return "find-password";
	}
}
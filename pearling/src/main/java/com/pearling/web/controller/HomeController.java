package com.pearling.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController extends BaseController {

	// public boolean headerShow() {
	// 	return true;
	// }
	
	@RequestMapping("/")
	public String index(
		Model model){

		model.addAttribute("headerShow", false);
		return "index";
	}
	
	@GetMapping("/login")
	public String login(){
		
		return "login";
	}

	// @PostMapping("/login")
	// public String login(String email, String pwd){
	// 	System.out.println(email+pwd);
	// 	return "redirect:/";
	// }

	
	
	@GetMapping("/signup")
	public String signup(Model model){
		return "signup";
	}

	@GetMapping("/find-password")
	public String findPassword(Model model){
		return "find-password";
	}

	// @GetMapping("layout")
	// public void layout(Model model) {
	// 	model.addAttribute("headerShow", headerShow());
	// }


}
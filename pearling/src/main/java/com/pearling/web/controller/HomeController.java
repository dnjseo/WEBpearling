package com.pearling.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController extends BaseController {

	// public boolean headerShow() {
	// 	return true;
	// }
	
	@GetMapping("/")
	public String index(Model model){

		model.addAttribute("headerShow", false);
		return "index";
	}
	
	@GetMapping("/login")
	public String login(Model model){
		
		return "login";
	}
	
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
package com.pearling.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("guestbook")
public class GuestbookController extends BaseController {

	@GetMapping("list")
	public String list(Model model) {
		model.addAttribute("headerShow", true);
		return "guestbook/list";
	}
	
	@GetMapping("post")
	public String post(Model model) {
		model.addAttribute("headerShow", false);
		return "guestbook/post";
	}
	
}

package com.pearling.web.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.pearling.web.controller.BaseController;

@Controller("")
@RequestMapping("/admin")
public class AdminController extends BaseController {

	@GetMapping("/index")
	public String list(Model model) {

	
		return "admin/index";
	}
	
	@GetMapping("/member/admin-member")
	public String mlist(Model model) {
	
		return "admin/member/admin-member";
	}

	@GetMapping("/board/admin-shell")
	public String slist(Model model) {
	
		return "admin/board/admin-shell";
	}

	@GetMapping("/board/admin-diary")
	public String dlist(Model model) {
	
		return "admin/board/admin-diary";
	}

	@GetMapping("/board/admin-guestbook")
	public String glist(Model model) {
	
		return "admin/board/admin-guestbook";
	}
}
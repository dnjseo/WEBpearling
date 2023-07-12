package com.pearling.web.adminController;

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

}

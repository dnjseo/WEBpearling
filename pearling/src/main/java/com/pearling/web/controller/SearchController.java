package com.pearling.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("search")
public class SearchController extends BaseController {

	@GetMapping("list")
	public String list(Model model) {

		model.addAttribute("headerShow", true);

		return "search/list";
	}
	
	@GetMapping("account")
	public String account(Model model) {

		model.addAttribute("headerShow", true);

		return "search/account";
	}
	
	@GetMapping("shell")
	public String shell(Model model) {

		model.addAttribute("headerShow", true);

		return "search/shell";
	}
	
}

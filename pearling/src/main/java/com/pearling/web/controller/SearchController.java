package com.pearling.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("search")
public class SearchController {

	@GetMapping("list")
	public String list() {
		return "search/list";
	}
	
	@GetMapping("account")
	public String account() {
		return "search/account";
	}
	
	@GetMapping("shell")
	public String shell() {
		return "search/shell";
	}
	
}

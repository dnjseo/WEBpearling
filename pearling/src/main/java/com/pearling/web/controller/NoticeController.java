package com.pearling.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("notice")
public class NoticeController extends BaseController {
	
	@GetMapping("list")
	public String list(Model model) {

		model.addAttribute("headerShow", false);

		return "notice/list";
	}
	
	@GetMapping("detail")
	public String detail(Model model) {

		model.addAttribute("headerShow", false);

		return "notice/detail";
	}

}

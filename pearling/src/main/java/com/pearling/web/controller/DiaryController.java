package com.pearling.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("diary")
public class DiaryController extends BaseController {
	
	@GetMapping("list")
	public String list(Model model) {

		model.addAttribute("headerShow", true);

		return "diary/list";
	}
	
	@GetMapping("post")
	public String post(Model model) {

		model.addAttribute("headerShow", false);
		model.addAttribute("editShow", false); 

		return "diary/post";
	}
	
	
}

package com.pearling.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("schedule")
public class ScheduleController extends BaseController {

	@GetMapping("detail")
	public String detail(Model model) {

		model.addAttribute("headerShow", false);

		return "schedule/detail";
	}
	
	@GetMapping("post")
	public String post(Model model) {

		model.addAttribute("headerShow", false);

		return "schedule/post";
	}
	
}

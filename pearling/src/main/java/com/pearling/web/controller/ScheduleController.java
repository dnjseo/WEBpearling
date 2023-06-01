package com.pearling.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("schedule")
public class ScheduleController {

	@GetMapping("detail")
	public String detail() {
		return "schedule/detail";
	}
	
	@GetMapping("post")
	public String post() {
		return "schedule/post";
	}
	
}

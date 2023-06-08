package com.pearling.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.pearling.web.entity.Schedule;
import com.pearling.web.service.ScheduleService;

@Controller
@RequestMapping("schedule")
public class ScheduleController extends BaseController {

	@Autowired
	private ScheduleService service;


	@GetMapping("detail")
	public String detail(Model model) {

		model.addAttribute("headerShow", false);
		
		List<Schedule> list = service.getList();
		model.addAttribute("list", list);
		
		return "schedule/detail";
	}
	
	@GetMapping("post")
	public String post(Model model) {

		model.addAttribute("headerShow", false);

		return "schedule/post";
	}
	
}

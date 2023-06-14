package com.pearling.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.pearling.web.entity.Schedule;
import com.pearling.web.service.ScheduleService;

@Controller
@RequestMapping("schedule")
public class ScheduleController extends BaseController {

	@Autowired
	private ScheduleService service;


	@GetMapping("detail")
	public String detail(
		@RequestParam(name = "id", required = false) Integer id,
		Model model) {

		String pageTitle = getPageTitle();
		pageTitle = "";

		model.addAttribute("pageTitle", pageTitle);
		model.addAttribute("headerShow", false);
		
		List<Schedule> list = service.getList();
		Schedule schedule = service.findById(id);

		model.addAttribute("list", list);
		model.addAttribute("schedule", schedule);
		
		return "schedule/detail";
	}
	
	@GetMapping("post")
	public String post(Model model) {

		String pageTitle = getPageTitle();
		pageTitle = "일정 추가";

		model.addAttribute("pageTitle", pageTitle);
		model.addAttribute("headerShow", false);

		return "schedule/post";
	}
	
}

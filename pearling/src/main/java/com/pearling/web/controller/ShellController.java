package com.pearling.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.pearling.web.entity.Schedule;
import com.pearling.web.service.ScheduleService;
import com.pearling.web.entity.Todo;
import com.pearling.web.service.TodoService;

@Controller
@RequestMapping("shell")
public class ShellController extends BaseController {
	@Autowired
	private TodoService service;
	
	@Autowired
	private ScheduleService sheduleService;
	
	@GetMapping("myshell")
	public String myShell(Model model) {
		model.addAttribute("headerShow", true);
		List<Todo> todoList = service.getList();
		model.addAttribute("todoList", todoList);

		List<Schedule> list = sheduleService.getList();
		model.addAttribute("list", list);
	
		return "shell/myshell";
	}

	

	@GetMapping("ourshell")
	public String ourShell(Model model) {

		model.addAttribute("headerShow", true);

		return "shell/ourshell";
	}

	@GetMapping("others-shell")
	public String othersShell(Model model) {

		model.addAttribute("headerShow", true);

		return "shell/others-shell";
	}


}

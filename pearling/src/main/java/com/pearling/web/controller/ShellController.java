package com.pearling.web.controller;

import java.io.Console;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import org.codehaus.groovy.runtime.dgmimpl.arrays.IntegerArrayGetAtMetaMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.pearling.web.entity.Member;
import com.pearling.web.entity.Schedule;
import com.pearling.web.service.MemberService;
import com.pearling.web.service.ScheduleService;
import com.pearling.web.entity.Todo;
import com.pearling.web.security.MyUserDetails;
import com.pearling.web.service.TodoService;

import jakarta.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("shell")
public class ShellController extends BaseController {
	
	@Autowired
	private TodoService service;
	
	@Autowired
	private ScheduleService scheduleService;

	@Autowired
	private MemberService memberService;
	
	@GetMapping("myshell")
	public String myShell(Model model) {
		SecurityContext context = SecurityContextHolder.getContext();
		MyUserDetails user = (MyUserDetails) context.getAuthentication().getPrincipal();

        int userId = user.getId();
		LocalDate todayDate = LocalDate.now();
		//System.out.println(todayDate);

		model.addAttribute("headerShow", true);
		
		List<Todo> todoList = service.getListByDate(userId, todayDate);
		List<Schedule> scheduleList = scheduleService.getListByDate(userId, todayDate);
		
		model.addAttribute("todoList", todoList);
		model.addAttribute("scheduleList", scheduleList);
		System.out.println(todoList);

		return "shell/myshell";
	}


@GetMapping("othershell/{id}")
public String otherShell(Model model, @PathVariable("id") int userId) {
    Member otherUser = memberService.getById(userId);
    LocalDate todayDate = LocalDate.now();
	System.out.println(otherUser);

    model.addAttribute("headerShow", true);
    
    List<Todo> todoList = service.getListByDate(otherUser.getId(), todayDate);
    List<Schedule> scheduleList1 = scheduleService.getListByDate(otherUser.getId(), todayDate);

    model.addAttribute("todoList", todoList);
    model.addAttribute("scheduleList", scheduleList1);

    return "shell/myshell";
}


	

	@GetMapping("ourshell")
	public String ourShell(Model model) {

		SecurityContext context = SecurityContextHolder.getContext();
		MyUserDetails user = (MyUserDetails) context.getAuthentication().getPrincipal();

        int userId = user.getId();
		
	
		model.addAttribute("headerShow", true);

		return "shell/ourshell";
	}

	// @GetMapping("others-shell")
	// public String othersShell(Model model) {


	// 	model.addAttribute("headerShow", true);

	// 	return "shell/others-shell";
	// }


}

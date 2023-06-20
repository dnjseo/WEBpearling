package com.pearling.web.controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.Point;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.pearling.web.entity.Diary;
import com.pearling.web.entity.Schedule;
import com.pearling.web.security.MyUserDetails;
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
		Schedule schedule = service.get(id);

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
	
	@PostMapping("post")
	public String post(
			@RequestParam(name = "startDate", required = false) LocalDate startDate,
			@RequestParam(name = "startTime", required = false) LocalTime startTime,
			@RequestParam(name = "endDate", required = false) LocalDate endDate,
			@RequestParam(name = "endTime", required = false) LocalTime endTime,
			@RequestParam(name = "title", required = false) String title,
			@RequestParam(name = "memberId", required = false) Integer memberId,
			@RequestParam(name = "backgroundColor", required = false) String backgroundColor,
			@RequestParam(name = "latitude", required = false) Double latitude,
            @RequestParam(name = "longitude", required = false) Double longitude,
			Model model, MyUserDetails user) {

		System.out.println("여러분 userId는 이것입니다! ::::: " + user.getId());

		SecurityContext context = SecurityContextHolder.getContext();
		user = (MyUserDetails) context.getAuthentication().getPrincipal();

		Schedule schedule = Schedule.builder()
				.startDate(startDate)
				.startTime(startTime)
				.endDate(endDate)
				.endTime(endTime)
				.title(title)
				.memberId(user.getId())
				.backgroundColor(backgroundColor)
				.latitude(latitude)
				.longitude(longitude)
				.build();

		service.addSchedule(schedule);

		System.out.println("startDate: " + startDate);
		System.out.println("endDate: " + endDate);
		System.out.println("startTime: " + startTime);
		System.out.println("endTime: " + endTime);
		System.out.println("title: " + title);
		System.out.println("backgroundColor: " + backgroundColor);
		System.out.println("latitude: " + latitude);
		System.out.println("longitude: " + longitude);

		System.out.println("Schedule 확인 : " + schedule);

		return "redirect:/shell/myshell";
	}

	@PostMapping("delete")
	public String delete(
			@RequestParam(name = "id", required = false) Integer id,
			Model model) {

		if (id != null) {
			Schedule schedule = service.findById(id);
			if (schedule != null) {
				service.deleteSchedule(schedule);
			}
		}

		return "redirect:/shell/myshell";
	}

	@PostMapping("update")
	public String update(
			@RequestParam(name = "id", required = false) Integer id,
			@RequestParam(name = "startDate", required = false) LocalDate startDate,
			@RequestParam(name = "startTime", required = false) LocalTime startTime,
			@RequestParam(name = "endDate", required = false) LocalDate endDate,
			@RequestParam(name = "endTime", required = false) LocalTime endTime,
			@RequestParam(name = "title", required = false) String title,
			@RequestParam(name = "backgroundColor", required = false) String backgroundColor,
			@RequestParam(name = "latitude", required = false) Double latitude,
            @RequestParam(name = "longitude", required = false) Double longitude,
			Model model, MyUserDetails user){
			
			Schedule schedule = Schedule.builder()
				.startDate(startDate)
				.startTime(startTime)
				.endDate(endDate)
				.endTime(endTime)
				.title(title)
				.backgroundColor(backgroundColor)
				.latitude(latitude)
				.longitude(longitude)
				.build();

			if(id != null){
				schedule.setId(id);
				service.updateSchedule(schedule);
			}
					
		return "redirect:/shell/myshell";

	}
	

}

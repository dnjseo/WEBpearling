package com.pearling.web.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.pearling.web.entity.Notice;
import com.pearling.web.service.NoticeService;

@Controller
@RequestMapping("notice")
public class NoticeController extends BaseController {
	
	@Autowired
	private NoticeService service;

	@GetMapping("list")
	public String list(Model model) {
		model.addAttribute("headerShow", false);
		List<Notice> list = service.getList();
		model.addAttribute("list", list);
		
		LocalDate currentDate = LocalDate.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		String formattedDate = currentDate.format(formatter);
		model.addAttribute("regdate", formattedDate);

		System.out.println(formattedDate);
		return "notice/list";
	}
	
	@GetMapping("detail")
	public String detail(Model model) {
		model.addAttribute("headerShow", false);
		model.addAttribute("currentDate", LocalDate.now());
		return "notice/detail";
	}
}
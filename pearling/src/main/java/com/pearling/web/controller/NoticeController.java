package com.pearling.web.controller;

import java.time.LocalDate;
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

		String pageTitle = getPageTitle();
		pageTitle = "공지사항";
		
		model.addAttribute("pageTitle", pageTitle);
		model.addAttribute("headerShow", false);
		List<Notice> list = service.getList();
		model.addAttribute("list", list);
		
		return "notice/list";
	}
	
	@GetMapping("detail")
	public String detail(Model model) {

		String pageTitle = getPageTitle();
		pageTitle = "공지사항";
		
		model.addAttribute("pageTitle", pageTitle);
		model.addAttribute("headerShow", false);
		model.addAttribute("currentDate", LocalDate.now());
		return "notice/detail";
	}
}
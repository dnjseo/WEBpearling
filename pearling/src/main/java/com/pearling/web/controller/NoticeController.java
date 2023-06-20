package com.pearling.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

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
	public String detail(Model model, @RequestParam int id) {
		String pageTitle = getPageTitle();
		pageTitle = "공지사항";
		model.addAttribute("pageTitle", pageTitle);
		model.addAttribute("headerShow", false);
		
		Notice notice = service.findById(id);
		model.addAttribute("notice", notice);

		return "notice/detail";
	}
}
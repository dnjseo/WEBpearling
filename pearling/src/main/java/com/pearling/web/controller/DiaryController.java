package com.pearling.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.pearling.web.entity.Diary;
import com.pearling.web.service.DiaryService;

@Controller
@RequestMapping("diary")
public class DiaryController extends BaseController {
	@Autowired
	private DiaryService service;
	
	@GetMapping("list")
	public String list(
			@RequestParam(name = "s", required = false) boolean editShow,
			Model model) {

		// if (editShow)
		// 	model.addAttribute("editShow", 1);
		// else
		// 	model.addAttribute("editShow", 2);

		model.addAttribute("headerShow", true);
		List<Diary> list = service.getList();
		model.addAttribute("list", list);

		return "diary/list";
	}

	@GetMapping("post")
	public String post(
			@RequestParam(name = "s", required = false) boolean editShow,
			Model model) {

		String pageTitle = getPageTitle();
		pageTitle = "";
		
		model.addAttribute("pageTitle", pageTitle);
		model.addAttribute("headerShow", false);

		if (editShow)
			model.addAttribute("editShow", 1);
		else
			model.addAttribute("editShow", 2);

		return "diary/post";
	}

}

package com.pearling.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.pearling.web.entity.Diary;
import com.pearling.web.service.DiaryService;

@Controller
@RequestMapping("diary")
public class DiaryController extends BaseController {
	
	@Autowired
	private DiaryService service;

	@GetMapping("list")
	public String list(Model model) {

		model.addAttribute("headerShow", true);
		List<Diary> list = service.getList();
		model.addAttribute("list", list);

		return "diary/list";
	}
	
	@GetMapping("post")
	public String post(Model model) {

		model.addAttribute("headerShow", false);
		model.addAttribute("editShow", false); 

		return "diary/post";
	}
	
	
}

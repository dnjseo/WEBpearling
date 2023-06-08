package com.pearling.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.pearling.web.entity.Qa;
import com.pearling.web.service.QaService;

@Controller
@RequestMapping("qa")
public class QaController extends BaseController {

	@Autowired
	private QaService service;

	@GetMapping("list")
	public String list(Model model) {
		model.addAttribute("headerShow", true);
		List<Qa> list = service.getList();
		model.addAttribute("list", list);
		
		return "qa/list";
	}
	
	@GetMapping("post")
	public String post(Model model) {

		model.addAttribute("headerShow", false);
		model.addAttribute("headerShow", false);

		return "qa/post";
	}
	
}

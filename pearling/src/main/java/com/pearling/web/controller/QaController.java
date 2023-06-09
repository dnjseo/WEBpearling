package com.pearling.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.pearling.web.entity.Qa;
import com.pearling.web.service.QaService;

@Controller
@RequestMapping("qa")
public class QaController extends BaseController {

	@Autowired
	private QaService service;

	@GetMapping("list")
	public String list(
			@RequestParam(name = "s", required = false) boolean editShow,
			Model model) {

		// if (editShow)
		// model.addAttribute("editShow", 1);
		// else
		// model.addAttribute("editShow", 2);

		model.addAttribute("headerShow", true);
		List<Qa> list = service.getList();
		model.addAttribute("list", list);

		return "qa/list";
	}

	@GetMapping("post")
	public String post(
			@RequestParam(name = "s", required = false) boolean editShow,
			Model model) {

		String pageTitle = getPageTitle();
		pageTitle = "문의하기";

		model.addAttribute("pageTitle", pageTitle);

		if(editShow) {
			model.addAttribute("headerShow", false);
			model.addAttribute("editShow", 1);
		} else {
			model.addAttribute("headerShow", false);
			model.addAttribute("editShow", 2);
		}
		return "qa/post";
	}

}

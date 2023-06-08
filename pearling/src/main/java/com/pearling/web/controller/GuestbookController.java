package com.pearling.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.pearling.web.entity.Guestbook;
import com.pearling.web.service.GuestbookService;

@Controller
@RequestMapping("guestbook")
public class GuestbookController extends BaseController {

	@Autowired
	private GuestbookService service;

	@GetMapping("list")
	public String list(Model model) {
		model.addAttribute("headerShow", true);
		List<Guestbook> list = service.getList();
		model.addAttribute("list", list);

		return "guestbook/list";
	}

	@GetMapping("post")
	public String post(Model model) {
		model.addAttribute("headerShow", false);
		model.addAttribute("editShow", true);
		return "guestbook/post";
	}
	
}

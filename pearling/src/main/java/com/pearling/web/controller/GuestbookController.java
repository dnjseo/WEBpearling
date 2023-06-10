package com.pearling.web.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

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
	Random random = new Random();

	@Autowired
	private GuestbookService service;

	@GetMapping("list")
	public String list(Model model) {
		model.addAttribute("headerShow", true);

		List<Guestbook> list = service.getList();

		List<String> imageUrls = Arrays.asList(
			"/images/guestbook/clam1.png",
			"/images/guestbook/clam2.png",
			"/images/guestbook/clam3.png"
		);

		List<String> imgs = new ArrayList<>();
		Random random = new Random();

		for (int i = 0; i < list.size(); i++) {
			int randomIndex = random.nextInt(imageUrls.size());
			imgs.add(imageUrls.get(randomIndex));
		}

		model.addAttribute("list", list);
		model.addAttribute("imgs", imgs);

		return "guestbook/list";
	}

	@GetMapping("post")
	public String post(Model model) {
		model.addAttribute("headerShow", false);
		model.addAttribute("editShow", true);
		return "guestbook/post";
	}
}

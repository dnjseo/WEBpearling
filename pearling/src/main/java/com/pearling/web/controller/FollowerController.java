package com.pearling.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("follow")
public class FollowerController extends BaseController {
	
    @GetMapping("followerList")
	public String followerList(Model model) {

		String pageTitle = getPageTitle();
		pageTitle = "팔로워";
		
		model.addAttribute("pageTitle", pageTitle);
		model.addAttribute("headerShow", false);

		return "follow/followerList";
	}
	
	@GetMapping("followingList")
	public String followingList(Model model) {

		String pageTitle = getPageTitle();
		pageTitle = "팔로잉";
		
		model.addAttribute("pageTitle", pageTitle);
		model.addAttribute("headerShow", false);

		return "follow/followingList";
	}
}

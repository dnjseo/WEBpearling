package com.pearling.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("follow")
public class FollowerController {
	
    @GetMapping("followerList")
	public String followerList() {
		return "follow/followerList";
	}
	
	@GetMapping("followingList")
	public String followingList() {
		return "follow/followingList";
	}
}

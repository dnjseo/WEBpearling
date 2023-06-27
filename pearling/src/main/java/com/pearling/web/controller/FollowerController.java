package com.pearling.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import com.pearling.web.security.MyUserDetails;
import com.pearling.web.service.FollowService;
import com.pearling.web.entity.Member;

@Controller
@RequestMapping("follow")
public class FollowerController extends BaseController {
	
	@Autowired
	FollowService service;
	
    @GetMapping("followerList")
	public String followerList(Model model) {

		SecurityContext context = SecurityContextHolder.getContext();
    	MyUserDetails user = (MyUserDetails) context.getAuthentication().getPrincipal();
    	int memberId = user.getId();

		List<Member> followerList = service.getFollowersList(memberId);
		
		String pageTitle = getPageTitle();
		pageTitle = "팔로워";
		
		model.addAttribute("pageTitle", pageTitle);
		model.addAttribute("headerShow", false);
		model.addAttribute("followers", followerList);

		return "follow/followerList";
	}
	
	
	@GetMapping("followingList")
	public String followingList(Model model) {

		SecurityContext context = SecurityContextHolder.getContext();
    	MyUserDetails user = (MyUserDetails) context.getAuthentication().getPrincipal();
    	int memberId = user.getId();

		List<Member> followingList = service.getFollowingsList(memberId);

		String pageTitle = getPageTitle();
		pageTitle = "팔로잉";
		
		model.addAttribute("pageTitle", pageTitle);
		model.addAttribute("headerShow", false);
		model.addAttribute("followings", followingList);


		return "follow/followingList";
	}
}

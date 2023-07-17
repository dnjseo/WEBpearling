package com.pearling.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.pearling.web.security.MyUserDetails;
import com.pearling.web.service.FollowService;
import com.pearling.web.entity.Follow;
import com.pearling.web.entity.Member;

@Controller
@RequestMapping("follow")
public class FollowerController extends BaseController {
	
	@Autowired
	FollowService service;
	
    @GetMapping("followerList")
	public String followerList(@RequestParam(name = "q", required = false) String query,	
								Model model) {

		SecurityContext context = SecurityContextHolder.getContext();
    	MyUserDetails user = (MyUserDetails) context.getAuthentication().getPrincipal();
    	int memberId = user.getId();

		List<Member> followerList = null;
		String searchResult = "";
		
		if(query == null)
			followerList = service.getFollowersList(memberId);
		else{
			followerList = service.getFollowersListByQuery(memberId, query);
			searchResult = query;
		}
    	
		String pageTitle = getPageTitle();
		pageTitle = user.getNickname();
		
		model.addAttribute("pageTitle", pageTitle);
		model.addAttribute("headerShow", false);
		model.addAttribute("searchResult", searchResult);
		model.addAttribute("followers", followerList);

		return "follow/followerList";
	}
	
	
	@GetMapping("followingList")
	public String followingList(@RequestParam(name = "q", required = false) String query,
								Model model) {

		SecurityContext context = SecurityContextHolder.getContext();
    	MyUserDetails user = (MyUserDetails) context.getAuthentication().getPrincipal();
    	int memberId = user.getId();

		List<Member> followingList = null;
		String searchResult = "";

		if(query == null)
			followingList = service.getFollowingsList(memberId);
		else{
			followingList = service.getFollowingsListByQuery(memberId, query);
			searchResult = query;
		}

		String pageTitle = getPageTitle();
		pageTitle = user.getNickname();
		
		model.addAttribute("pageTitle", pageTitle);
		model.addAttribute("headerShow", false);
		model.addAttribute("searchResult", searchResult);
		model.addAttribute("followings", followingList);


		return "follow/followingList";
	}
}

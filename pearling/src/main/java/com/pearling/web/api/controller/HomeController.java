package com.pearling.web.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pearling.web.entity.Member;
import com.pearling.web.security.MyUserDetails;
import com.pearling.web.service.FollowService;
import com.pearling.web.service.MemberService;

@RestController("apiAsideController")
@RequestMapping("api/aside")
public class HomeController {
    @Autowired
    FollowService service;
    
    @GetMapping
    public int[] count(@AuthenticationPrincipal MyUserDetails user) {
        int[] result = new int[2];
        result[0] = service.getFollowerCount(user.getId());
        result[1] = service.getFollowingCount(user.getId());
        return result;
    }

}
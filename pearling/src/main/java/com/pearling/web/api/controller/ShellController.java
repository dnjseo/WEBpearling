package com.pearling.web.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pearling.web.entity.Member;
import com.pearling.web.security.MyUserDetails;
import com.pearling.web.service.FollowService;

@RestController("apiShellController")
@RequestMapping("api/shell")
public class ShellController {

    @Autowired
    FollowService service;
    
    @GetMapping("ourshell")
      public List<Member> followingList(){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        MyUserDetails user = (MyUserDetails) authentication.getPrincipal();
        int memberId = user.getId();
        
        List<Member> friendList = service.getFollowingsList(memberId);

        return friendList;
    }
}

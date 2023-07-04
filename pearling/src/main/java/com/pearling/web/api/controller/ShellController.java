package com.pearling.web.api.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pearling.web.api.controller.FollowController.FollowRequest;
import com.pearling.web.entity.Follow;
import com.pearling.web.entity.Member;
import com.pearling.web.entity.Schedule;
import com.pearling.web.entity.Todo;
import com.pearling.web.security.MyUserDetails;
import com.pearling.web.service.FollowService;
import com.pearling.web.service.ScheduleService;
import com.pearling.web.service.TodoService;

@RestController("apiShellController")
@RequestMapping("api/shell")
public class ShellController {

    @Autowired
    FollowService service;

    @GetMapping("myshell")
      public List<Member> myFollowingList(){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        MyUserDetails user = (MyUserDetails) authentication.getPrincipal();
        int memberId = user.getId();
        
        List<Member> friendList = service.getFollowingsList(memberId);

        return friendList;
      }

    @PostMapping("myshell/{id}")
      public void addFollow(  @PathVariable("id") int id,
                              @RequestBody FollowRequest followRequest, 
                              @AuthenticationPrincipal MyUserDetails user){
        Follow follow = Follow.builder()
                        .followerId(followRequest.getFollowerId())
                        .followingId(user.getId())
                        .build();
        service.addFollow(follow);
      }
  
    @GetMapping("ourshell")
      public List<Member> followingList(){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        MyUserDetails user = (MyUserDetails) authentication.getPrincipal();
        int memberId = user.getId();
        
        List<Member> friendList = service.getFollowingsList(memberId);

        return friendList;
    }
  
}

